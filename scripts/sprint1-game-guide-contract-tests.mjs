import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  EvidenceLevel,
  ErrorCode,
  HoldReason,
  SourceType,
} from "../src/domain/game-guide/contracts.js";
import { buildFieldValue, buildSourceRecord, buildGameVersion, buildEntity } from "../src/domain/game-guide/factories.js";
import { makeCanonicalId, normalizeSlug, validateCanonicalId } from "../src/domain/game-guide/ids.js";
import { evaluateGameGuideBundle } from "../src/domain/game-guide/evaluator.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function baseWrapper() {
  return {
    source_id: "source:official-patch",
    evidence_level: "B_OFFICIAL",
    game_version: "game-version:1.2.0",
    last_verified: "2026-08-21T00:00:00Z",
    public_allowed: true,
    editorial_judgment: {
      kind: "factual",
      basis_source_ids: ["source:official-patch"],
      game_version: "game-version:1.2.0",
      author_editor_status: "verified_reviewer",
      last_reviewed: "2026-08-21T00:00:00Z",
      confidence: "MEDIUM",
      public_allowed: true,
    },
  };
}

function makeBaseBundle() {
  const wrappers = baseWrapper();
  return {
    entities: {
      source_record: [
        buildSourceRecord({
          id: "source:official-patch",
          source_type: SourceType.OFFICIAL,
          url_or_reference: "https://example.invalid/official/patch-1.2.0",
          title: "Official patch note sample",
          publisher_or_owner: "Dragon Sword Publisher",
          retrieved_at: "2026-08-20T00:00:00Z",
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
          release_date: "2026-08-20",
          source_id: "source:official-patch",
          status: "CURRENT",
        }),
      ],
      combat_status: [
        buildEntity("combat_status", "combat-status:burn", {
          name: buildFieldValue("Burn", wrappers),
          description: buildFieldValue("Target suffers burn damage over time.", wrappers),
          duration: buildFieldValue("12 seconds", wrappers),
        }),
      ],
      skill: [
        buildEntity("skill", "skill:flame-shot", {
          name: buildFieldValue("Flame Shot", wrappers),
          description: buildFieldValue("Single-target magic burst.", wrappers),
          applies_status_ids: buildFieldValue(["combat-status:burn"], wrappers),
          character_id: buildFieldValue("character:aria-rune", wrappers),
          level: buildFieldValue("1", wrappers),
          damage_type: buildFieldValue("magic", wrappers),
          cooldown_seconds: buildFieldValue("8", wrappers),
          resource_cost: buildFieldValue("30mp", wrappers),
          synergies: buildFieldValue(["team relation"], wrappers),
        }),
      ],
      character: [
        buildEntity("character", "character:aria-rune", {
          name: buildFieldValue("Aria Rune", wrappers),
          role: buildFieldValue("DPS", wrappers),
          summary: buildFieldValue("A precision DPS character.", wrappers),
          skill_ids: buildFieldValue(["skill:flame-shot"], wrappers),
          status_ids: buildFieldValue(["combat-status:burn"], wrappers),
          team_relation_ids: buildFieldValue(["team-relation:aria-rune|luna-orb|starter_connector|1-2-0"], wrappers),
          build_recommendation_ids: buildFieldValue(["build-recommendation:aria-mid"], wrappers),
          lore: buildFieldValue("Synthetic lore", wrappers),
          counterplay_notes: buildFieldValue("Counter when shield active.", wrappers),
          rotation_notes: buildFieldValue("Rotate every 8 sec.", wrappers),
        }),
        buildEntity("character", "character:luna-orb", {
          name: buildFieldValue("Luna Orb", wrappers),
          role: buildFieldValue("Support", wrappers),
          summary: buildFieldValue("Synthetic support profile.", wrappers),
          skill_ids: buildFieldValue(["skill:flame-shot"], wrappers),
          status_ids: buildFieldValue(["combat-status:burn"], wrappers),
          team_relation_ids: buildFieldValue([], wrappers),
          lore: buildFieldValue("Synthetic lore placeholder.", wrappers),
          counterplay_notes: buildFieldValue("Avoid unverified assumptions.", wrappers),
          rotation_notes: buildFieldValue("Rotate as needed.", wrappers),
        }),
      ],
      build_recommendation: [
        buildEntity("build_recommendation", "build-recommendation:aria-mid", {
          name: buildFieldValue("Aria Midline", wrappers),
          summary: buildFieldValue("Balanced burst-focused build.", wrappers),
          build_type: buildFieldValue("mid", wrappers),
          character_ids: buildFieldValue(["character:aria-rune"], wrappers),
          role_specific_tips: buildFieldValue("Focus single target burst windows.", wrappers),
          rotation_rationale: buildFieldValue("Use cooldown rotation.", wrappers),
        }),
      ],
      team_relation: [
        buildEntity("team_relation", "team-relation:aria-rune|luna-orb|starter_connector|1-2-0", {
          from_character_id: buildFieldValue("character:aria-rune", {
            ...wrappers,
            evidence_level: EvidenceLevel.A_FIRST_HAND,
            editorial_judgment: {
              ...wrappers.editorial_judgment,
              kind: "factual",
            },
          }),
          to_character_id: buildFieldValue("character:luna-orb", wrappers),
          relation_type: buildFieldValue("STARTER_CONNECTOR", wrappers),
          status_ids: buildFieldValue(["combat-status:burn"], wrappers),
          rationale: buildFieldValue("Starter synergy for burst windows.", {
            ...wrappers,
            editorial_judgment: {
              ...wrappers.editorial_judgment,
              kind: "factual",
            },
          }),
          synergy_tags: buildFieldValue(["fire"], wrappers),
          official_relation: buildFieldValue(true, wrappers),
          observed_relation: buildFieldValue("Observed in official scenario.", {
            ...wrappers,
            editorial_judgment: {
              ...wrappers.editorial_judgment,
              kind: "derived",
            },
          }),
          editorial_recommendation: buildFieldValue("Use under burst windows.", {
            ...wrappers,
            editorial_judgment: {
              ...wrappers.editorial_judgment,
              kind: "recommendation",
            },
          }),
        }),
      ],
    },
  };
}

function withOverrides(mutator) {
  const bundle = structuredClone(makeBaseBundle());
  mutator?.(bundle);
  return bundle;
}

function hasError(errors, code) {
  return errors.some((entry) => entry.code === code);
}

function evaluate(bundle) {
  return evaluateGameGuideBundle(bundle, { legitimate_hold: false });
}

function check(condition, message, failures) {
  if (!condition) {
    failures.push(message);
    return false;
  }
  return true;
}

const results = [];
const run = (name, fn) => {
  const failures = [];
  try {
    fn(failures);
    results.push({ test: name, status: failures.length ? "FAIL" : "PASS", failures });
  } catch (error) {
    results.push({ test: name, status: "ERROR", failures: [String(error.message)] });
  }
};

run("ID valid + malformed", (failures) => {
  const normalized = normalizeSlug("Aria Rune");
  const id = makeCanonicalId("character", normalized);
  check(id === "character:aria-rune", "normalized id should be character:aria-rune", failures);
  check(validateCanonicalId("character", id), "valid id should pass", failures);
  check(!validateCanonicalId("character", "character:bad id"), "space should fail", failures);
  check(!validateCanonicalId("team_relation", "team-relation:abc"), "team relation malformed should fail", failures);
});

run("ID collision-aware generation", (failures) => {
  const existing = new Set(["character:aria-rune"]);
  const id = makeCanonicalId("character", "Aria Rune", existing);
  check(id === "character:aria-rune-2", "collision suffix missing", failures);
  check(validateCanonicalId("character", id), "collision id invalid", failures);
});

run("Evidence: missing source reference fails", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.character[0].fields.summary = buildFieldValue("Broken", {
      ...baseWrapper(),
      source_id: "source:missing",
    });
  });
  const out = evaluate(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_INVALID_SOURCE_REF), "missing source should raise ERR_INVALID_SOURCE_REF", failures);
});

run("Evidence: missing required metadata fails", (failures) => {
  const bundle = withOverrides((data) => {
    const bad = { ...data.entities.character[0].fields.summary };
    bad.last_verified = "";
    bad.game_version = "";
    data.entities.character[0].fields.summary = bad;
  });
  const out = evaluate(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_EVIDENCE_MISSING), "missing metadata should fail", failures);
});

run("Evidence: public_allowed=false blocks", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.character[0].fields.summary.public_allowed = false;
  });
  const out = evaluate(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_FORBIDDEN_PUBLIC_FIELD), "public_allowed false should block", failures);
});

run("Evidence: C_COMMUNITY factual misuse blocked", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.character[0].fields.summary = {
      ...data.entities.character[0].fields.summary,
      evidence_level: "C_COMMUNITY",
      editorial_judgment: {
        ...data.entities.character[0].fields.summary.editorial_judgment,
        kind: "factual",
      },
    };
  });
  const out = evaluate(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_EVIDENCE_MISSING), "C factual misuse should fail", failures);
});

run("Completeness: required field missing -> acquisition", (failures) => {
  const bundle = withOverrides((data) => {
    delete data.entities.character[0].fields.summary;
  });
  const out = evaluate(bundle);
  check(out.overall_readiness_state === "INCOMPLETE", "required missing should be incomplete", failures);
  check(out.acquisition_tasks.length > 0, "missing required should create acquisition tasks", failures);
});

run("Completeness: optional field missing is research-ready", (failures) => {
  const bundle = withOverrides((data) => {
    delete data.entities.character[0].fields.lore;
    delete data.entities.character[0].fields.counterplay_notes;
    delete data.entities.character[0].fields.rotation_notes;
  });
  const out = evaluate(bundle);
  check(out.overall_readiness_state === "RESEARCH_READY", "should remain research-ready", failures);
});

run("Reference: dangling character ref fails", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.team_relation[0].fields.to_character_id = buildFieldValue("character:missing-char", baseWrapper());
  });
  const out = evaluate(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_DANGLING_REFERENCE), "dangling ref should fail", failures);
});

run("Reference: duplicate canonical id + conflict", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.character.push(buildEntity("character", "character:aria-rune", {
      name: buildFieldValue("Duplicate Aria", baseWrapper()),
      role: buildFieldValue("DPS", baseWrapper()),
      summary: buildFieldValue("Conflicting row", baseWrapper()),
      skill_ids: buildFieldValue(["skill:flame-shot"], baseWrapper()),
      status_ids: buildFieldValue(["combat-status:burn"], baseWrapper()),
      team_relation_ids: buildFieldValue(["team-relation:aria-rune|luna-orb|starter_connector|1-2-0"], baseWrapper()),
    }));
  });
  const out = evaluate(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_DUPLICATE_CANONICAL_ID), "duplicate id not detected", failures);
  check(hasError(out.evidence_errors, ErrorCode.ERR_CONFLICTING_CANONICAL_VALUE), "conflicting duplicates not detected", failures);
});

run("Editorial: missing basis fails, basis present passes", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.character[0].fields.summary = {
      ...data.entities.character[0].fields.summary,
      editorial_judgment: {
        ...data.entities.character[0].fields.summary.editorial_judgment,
        basis_source_ids: [],
      },
    };
  });
  const out = evaluate(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_EDITORIAL_MISSING_BASIS), "missing basis should fail", failures);
});

run("Version stale detection", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.character[0].fields.summary = buildFieldValue("Older", {
      ...baseWrapper(),
      game_version: "game-version:1.1.0",
    });
    data.entities.game_version[0].version = "1.1.0";
    data.entities.game_version[0].status = "ARCHIVED";
  });
  const out = evaluate(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_STALE_VERSION), "stale version should be detected", failures);
});

run("Acquisition task for correction", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.character[0].fields.summary = buildFieldValue("Bad source", {
      ...baseWrapper(),
      source_id: "source:missing",
    });
  });
  const out = evaluate(bundle);
  check(
    out.correction_tasks.length > 0 || out.acquisition_tasks.some((task) => task.field_ids.includes("summary")),
    "correction-oriented task expected",
    failures,
  );
});

run("Legitimate HOLD does not auto-generate tasks", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.character[0].metadata = {
      hold: {
        allowed: true,
        reason: HoldReason.DEMAND_INSUFFICIENT,
        unblock_condition: "Demand becomes verifiable.",
      },
    };
    delete data.entities.character[0].fields.summary;
  });
  const out = evaluate(bundle);
  const characterEval = out.entity_evaluations.find((entry) => entry.entity_id === "character:aria-rune");
  check(Boolean(characterEval?.hold?.allowed), "hold metadata should be preserved", failures);
  check(characterEval?.acquisition_tasks?.length === 0, "hold should not emit tasks", failures);
});

run("Source record and game version remain first-class contracts", (failures) => {
  const bundle = withOverrides((data) => {
    data.entities.source_record[0].title = "";
  });
  const out = evaluate(bundle);
  check(hasError(out.evidence_errors, ErrorCode.ERR_EVIDENCE_MISSING), "source_record missing required metadata should fail", failures);
});

run("Publication state has no PUBLISHED", (failures) => {
  for (const fixture of [makeBaseBundle(), withOverrides((data) => {
    delete data.entities.character[0].fields.summary;
  }), withOverrides((data) => {
    data.entities.team_relation[0].fields.to_character_id = buildFieldValue("character:missing-char", baseWrapper());
  })]) {
    const out = evaluate(fixture);
    check(out.publication_gate !== "PUBLISHED", "publication_gate should not be PUBLISHED", failures);
  }
});

const summary = {
  tests: results,
  pass_count: results.filter((entry) => entry.status === "PASS").length,
  fail_count: results.filter((entry) => entry.status !== "PASS").length,
  total: results.length,
};

const outputPath = path.join(root, "docs/superpowers/results/2026-08-21-game-guide-product-architecture-sprint-1-tests.json");
fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

const passRate = summary.total ? Number((summary.pass_count / summary.total).toFixed(2)) : 0;
console.log(`Sprint1 contract tests: ${summary.pass_count}/${summary.total} passed (${passRate * 100}%)`);
if (summary.fail_count > 0) {
  console.error("FAILED tests:");
  for (const entry of results.filter((item) => item.status !== "PASS")) {
    console.error(`- ${entry.test}`);
    for (const failure of entry.failures) {
      console.error(`  • ${failure}`);
    }
  }
  process.exit(1);
}
console.log(`Result file: ${outputPath}`);
