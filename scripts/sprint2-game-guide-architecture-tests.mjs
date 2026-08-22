import {
  CANONICAL_ENTITY_TYPES,
  DERIVED_ARTIFACT_TYPES,
  ErrorCode,
  EvidenceLevel,
  SourceType,
} from "../src/domain/game-guide/contracts.js";
import { buildEntity, buildFieldValue, buildGameVersion, buildSourceRecord } from "../src/domain/game-guide/factories.js";
import { evaluateGameGuideBundle } from "../src/domain/game-guide/evaluator.js";

function wrapper(overrides = {}) {
  return {
    source_id: "source:official-patch",
    evidence_level: EvidenceLevel.B_OFFICIAL,
    game_version: "game-version:1.2.0",
    last_verified: "2026-08-22T00:00:00Z",
    public_allowed: true,
    editorial_judgment: {
      kind: "factual",
      basis_source_ids: ["source:official-patch"],
      game_version: "game-version:1.2.0",
      author_editor_status: "verified_reviewer",
      last_reviewed: "2026-08-22T00:00:00Z",
      confidence: "MEDIUM",
      public_allowed: true,
    },
    ...overrides,
  };
}

function recommendationWrapper() {
  return wrapper({
    editorial_judgment: {
      ...wrapper().editorial_judgment,
      kind: "recommendation",
    },
  });
}

function makeBundle() {
  return {
    entities: {
      source_record: [
        buildSourceRecord({
          id: "source:official-patch",
          source_type: SourceType.OFFICIAL,
          url_or_reference: "https://example.invalid/official/patch-1.2.0",
          title: "Official patch note sample",
          publisher_or_owner: "Dragon Sword Publisher",
          retrieved_at: "2026-08-22T00:00:00Z",
          evidence_level_ceiling: EvidenceLevel.B_OFFICIAL,
          copyright_or_license_note: "internal synthetic fixture",
          public_allowed: true,
          version_relevance: "1.2.0",
          stale_or_recheck_status: "FRESH",
        }),
      ],
      game_version: [
        buildGameVersion({
          id: "game-version:1.2.0",
          version: "1.2.0",
          release_date: "2026-08-22",
          source_id: "source:official-patch",
          status: "CURRENT",
        }),
      ],
      combat_status: [
        buildEntity("combat_status", "combat-status:burn", {
          name: buildFieldValue("Burn", wrapper()),
          description: buildFieldValue("Burn damage over time.", wrapper()),
        }),
      ],
      skill: [
        buildEntity("skill", "skill:flame-shot", {
          name: buildFieldValue("Flame Shot", wrapper()),
          description: buildFieldValue("Single-target burst.", wrapper()),
          character_id: buildFieldValue("character:aria-rune", wrapper()),
          applies_status_ids: buildFieldValue(["combat-status:burn"], wrapper()),
          level: buildFieldValue("1", wrapper()),
          damage_type: buildFieldValue("magic", wrapper()),
        }),
      ],
      character: [
        buildEntity("character", "character:aria-rune", {
          name: buildFieldValue("Aria Rune", wrapper()),
          role: buildFieldValue("DPS", wrapper()),
          summary: buildFieldValue("A synthetic DPS character.", wrapper()),
          skill_ids: buildFieldValue(["skill:flame-shot"], wrapper()),
          status_ids: buildFieldValue(["combat-status:burn"], wrapper()),
          team_relation_ids: buildFieldValue([], wrapper()),
          build_recommendation_ids: buildFieldValue(["build-recommendation:aria-mid"], recommendationWrapper()),
        }),
      ],
      build_recommendation: [
        buildEntity("build_recommendation", "build-recommendation:aria-mid", {
          name: buildFieldValue("Aria Midline", recommendationWrapper()),
          summary: buildFieldValue("Burst-oriented editorial build.", recommendationWrapper()),
          build_type: buildFieldValue("mid", recommendationWrapper()),
          character_ids: buildFieldValue(["character:aria-rune"], recommendationWrapper()),
          role_specific_tips: buildFieldValue("Use during burst windows.", recommendationWrapper()),
        }),
      ],
      team_relation: [],
    },
  };
}

function check(condition, message, failures) {
  if (!condition) {
    failures.push(message);
  }
}

function hasError(errors, code) {
  return errors.some((entry) => entry.code === code);
}

const results = [];
function run(test, fn) {
  const failures = [];
  try {
    fn(failures);
    results.push({ test, status: failures.length ? "FAIL" : "PASS", failures });
  } catch (error) {
    results.push({ test, status: "ERROR", failures: [error.message] });
  }
}

run("Entity boundary: build_recommendation is derived, not canonical", (failures) => {
  check(CANONICAL_ENTITY_TYPES.length === 9, "canonical entity set should contain exactly 9 entries", failures);
  check(!CANONICAL_ENTITY_TYPES.includes("build_recommendation"), "build_recommendation must not be canonical", failures);
  check(DERIVED_ARTIFACT_TYPES.includes("build_recommendation"), "build_recommendation should be a derived artifact", failures);
});

run("Derived artifact: invalid referenced canonical fact fails closed", (failures) => {
  const bundle = makeBundle();
  bundle.entities.build_recommendation[0].fields.character_ids = buildFieldValue(["character:missing"], recommendationWrapper());
  const out = evaluateGameGuideBundle(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_DANGLING_REFERENCE), "dangling character reference should fail", failures);
  check(out.publication_gate === "BLOCKED", "publication gate should fail closed", failures);
});

run("Derived artifact: valid recommendation stays review-bound", (failures) => {
  const out = evaluateGameGuideBundle(makeBundle());
  const buildEval = out.entity_evaluations.find((entry) => entry.entity_id === "build-recommendation:aria-mid");
  check(buildEval?.artifact_class === "DERIVED_EDITORIAL_ARTIFACT", "derived artifact class should be explicit", failures);
  check(out.publication_gate !== "PUBLISHED", "publication gate must never be PUBLISHED", failures);
});

const summary = {
  tests: results,
  pass_count: results.filter((entry) => entry.status === "PASS").length,
  fail_count: results.filter((entry) => entry.status !== "PASS").length,
  total: results.length,
};

console.log(`Sprint2 architecture tests: ${summary.pass_count}/${summary.total} passed`);
if (summary.fail_count > 0) {
  for (const entry of results.filter((item) => item.status !== "PASS")) {
    console.error(`- ${entry.test}`);
    for (const failure of entry.failures) {
      console.error(`  - ${failure}`);
    }
  }
  process.exit(1);
}
