import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  EvidenceLevel,
  PublicationState,
  SourceType,
} from "../src/domain/game-guide/contracts.js";
import { buildEntity, buildFieldValue, buildGameVersion, buildSourceRecord } from "../src/domain/game-guide/factories.js";
import {
  evaluateProductArchitectureOpportunity,
  scorePilotCandidate,
  selectPilotCharacters,
  validateProductArchitectureHandoff,
} from "../src/domain/game-guide/product-architecture.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function wrapper(overrides = {}) {
  return {
    source_id: "source:official-steam",
    evidence_level: EvidenceLevel.B_OFFICIAL,
    game_version: "game-version:orbis-current",
    last_verified: "2026-08-22T00:00:00Z",
    public_allowed: true,
    editorial_judgment: {
      kind: "factual",
      basis_source_ids: ["source:official-steam"],
      game_version: "game-version:orbis-current",
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

function validHandoff(overrides = {}) {
  return {
    opportunity_type: "dragon-sword-character-team-slice",
    user_task: "Compare character build readiness and team relation candidates.",
    primary_route: "ENTITY_CLUSTER",
    required_entities: ["character", "skill", "combat_status", "equipment", "karma", "team_relation"],
    required_fields: ["name", "role", "skill_ids", "status_ids", "rationale"],
    optional_fields: ["equipment", "karma", "rotation_context"],
    source_requirements: ["official identity", "first-hand skill validation", "community leads for prioritization"],
    evidence_requirements: ["B_OFFICIAL for factual public fields", "C_COMMUNITY only for hypotheses"],
    game_version: "game-version:orbis-current",
    collection_tasks: [],
    publication_gate: PublicationState.APPROVAL_REQUIRED,
    next_action: "Validate readiness records.",
    ...overrides,
  };
}

function validBundle() {
  const w = wrapper();
  const r = recommendationWrapper();
  return {
    entities: {
      source_record: [
        buildSourceRecord({
          id: "source:official-steam",
          source_type: SourceType.OFFICIAL,
          url_or_reference: "https://store.steampowered.com/app/4570720/DragonSword__Awakening/",
          title: "DragonSword : Awakening on Steam",
          publisher_or_owner: "HOUND13",
          retrieved_at: "2026-08-22T00:00:00Z",
          evidence_level_ceiling: EvidenceLevel.B_OFFICIAL,
          copyright_or_license_note: "internal evidence pointer only",
          public_allowed: true,
          version_relevance: "orbis-current",
          stale_or_recheck_status: "FRESH",
        }),
      ],
      game_version: [
        buildGameVersion({
          id: "game-version:orbis-current",
          version: "orbis-current",
          release_date: "2026-07-23",
          source_id: "source:official-steam",
          status: "CURRENT",
        }),
      ],
      combat_status: [
        buildEntity("combat_status", "combat-status:stun", {
          name: buildFieldValue("Stun", w),
          description: buildFieldValue("Control status used in Signal Skill chains.", w),
        }),
      ],
      skill: [
        buildEntity("skill", "skill:stun-slash", {
          name: buildFieldValue("Stun Slash", r),
          description: buildFieldValue("Applies Stun in the researched sample chain.", r),
          character_id: buildFieldValue("character:lute", r),
          applies_status_ids: buildFieldValue(["combat-status:stun"], r),
          level: buildFieldValue("unknown", r),
          damage_type: buildFieldValue("UNKNOWN", r),
        }),
      ],
      character: [
        buildEntity("character", "character:lute", {
          name: buildFieldValue("Lute", w),
          role: buildFieldValue("Protagonist / opener candidate", r),
          summary: buildFieldValue("Officially named protagonist; build role requires verification.", r),
          skill_ids: buildFieldValue(["skill:stun-slash"], r),
          status_ids: buildFieldValue(["combat-status:stun"], r),
          team_relation_ids: buildFieldValue([], r),
        }),
      ],
      equipment: [],
      karma: [],
      material: [],
      team_relation: [],
      build_recommendation: [],
    },
  };
}

function check(condition, message, failures) {
  if (!condition) {
    failures.push(message);
  }
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

run("valid ENTITY_CLUSTER handoff is accepted", (failures) => {
  const out = validateProductArchitectureHandoff(validHandoff());
  check(out.status === "HANDOFF_VALID", "valid ENTITY_CLUSTER should pass", failures);
});

run("valid UTILITY_TOOL handoff is accepted", (failures) => {
  const out = validateProductArchitectureHandoff(validHandoff({ primary_route: "UTILITY_TOOL" }));
  check(out.status === "HANDOFF_VALID", "valid UTILITY_TOOL should pass", failures);
});

run("missing required handoff field returns HANDOFF_INVALID", (failures) => {
  const handoff = validHandoff();
  delete handoff.game_version;
  const out = evaluateProductArchitectureOpportunity(handoff);
  check(out.product_route === "HANDOFF_INVALID", "missing field should invalidate handoff", failures);
  check(out.acquisition_tasks.length > 0, "invalid handoff should emit correction task", failures);
});

run("dangling entity reference blocks publication", (failures) => {
  const bundle = validBundle();
  bundle.entities.skill[0].fields.character_id = buildFieldValue("character:missing", recommendationWrapper());
  const out = evaluateProductArchitectureOpportunity(validHandoff(), { bundle });
  check(out.reference_errors.length > 0, "dangling reference should be reported", failures);
  check(out.publication_gate === PublicationState.BLOCKED, "dangling reference should block", failures);
});

run("community-only factual claim does not become review-ready", (failures) => {
  const bundle = validBundle();
  bundle.entities.character[0].fields.summary = buildFieldValue("Community factual claim", {
    ...wrapper(),
    evidence_level: EvidenceLevel.C_COMMUNITY,
  });
  const out = evaluateProductArchitectureOpportunity(validHandoff(), { bundle });
  check(out.publication_gate === PublicationState.BLOCKED, "C community factual claim should block", failures);
  check(out.acquisition_tasks.length > 0, "blocked evidence should emit correction task", failures);
});

run("missing game version fails handoff validation", (failures) => {
  const out = evaluateProductArchitectureOpportunity(validHandoff({ game_version: "" }));
  check(out.product_route === "HANDOFF_INVALID", "missing game version should invalidate", failures);
});

run("optional-only incompleteness stays research-ready or approval-bound", (failures) => {
  const out = evaluateProductArchitectureOpportunity(validHandoff(), { bundle: validBundle() });
  check(out.publication_gate !== "PUBLISHED", "must not publish", failures);
  check(out.product_route === "ENTITY_CLUSTER", "route should remain ENTITY_CLUSTER", failures);
});

run("legitimate HOLD remains HOLD", (failures) => {
  const out = evaluateProductArchitectureOpportunity(validHandoff({
    primary_route: "HOLD",
    collection_tasks: [],
    next_action: "Review when demand appears.",
  }));
  check(out.product_route === "HOLD", "HOLD should stay HOLD", failures);
  check(out.publication_gate === PublicationState.BLOCKED, "HOLD should not publish", failures);
});

run("request to auto-publish fails closed", (failures) => {
  const out = evaluateProductArchitectureOpportunity(validHandoff({ publication_gate: "PUBLISHED" }));
  check(out.product_route === "HANDOFF_INVALID", "PUBLISHED handoff should be invalid", failures);
  check(out.publication_gate === PublicationState.BLOCKED, "PUBLISHED handoff should block", failures);
});

run("request to build UI before readiness stays acquisition-first", (failures) => {
  const out = evaluateProductArchitectureOpportunity(validHandoff({
    primary_route: "UTILITY_TOOL",
    user_task: "Build Team Builder UI now.",
    collection_tasks: [
      {
        task_id: "acq-team-relation-minimum-dataset",
        goal: "Validate minimum team relation dataset before UI review.",
        publication_state: PublicationState.APPROVAL_REQUIRED,
      },
    ],
  }));
  check(out.product_route === "UTILITY_TOOL", "route should remain UTILITY_TOOL", failures);
  check(out.next_action.includes("Complete acquisition"), "next action should stay acquisition-first", failures);
  check(out.publication_gate !== "PUBLISHED", "must not publish", failures);
});

run("pilot selection caps at three and requires gate criteria", (failures) => {
  const base = {
    required_completeness: 25,
    source_quality: 16,
    build_relevance: 18,
    team_relation_richness: 13,
    search_user_demand: 7,
    maintenance_feasibility: 8,
    required_factual_identity_available: true,
    non_public_readiness_record_possible: true,
    meaningful_skill_relation: true,
    equipment_or_karma_relation: true,
    potential_team_relation: true,
    maintenance_burden_acceptable: true,
    evidence_strength: "B+C",
    major_gaps: [],
  };
  const selected = selectPilotCharacters([
    { ...base, canonical_id: "character:lute", official_display_name: "Lute" },
    { ...base, canonical_id: "character:roxy", official_display_name: "Roxy" },
    { ...base, canonical_id: "character:theresia", official_display_name: "Theresia" },
    { ...base, canonical_id: "character:aria", official_display_name: "Aria" },
    { ...base, canonical_id: "character:weak", official_display_name: "Weak", required_factual_identity_available: false },
  ]);
  check(selected.length === 3, "selection should cap at three", failures);
  check(scorePilotCandidate({ ...base, required_factual_identity_available: false }).decision !== "PILOT_READY", "missing identity should fail gate", failures);
});

const summary = {
  tests: results,
  pass_count: results.filter((entry) => entry.status === "PASS").length,
  fail_count: results.filter((entry) => entry.status !== "PASS").length,
  total: results.length,
};

const outputPath = path.join(root, "docs/superpowers/results/2026-08-22-game-guide-product-architecture-sprint-2-tests.json");
fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(`Sprint2 product architecture contract tests: ${summary.pass_count}/${summary.total} passed`);
if (summary.fail_count > 0) {
  for (const entry of results.filter((item) => item.status !== "PASS")) {
    console.error(`- ${entry.test}`);
    for (const failure of entry.failures) {
      console.error(`  - ${failure}`);
    }
  }
  process.exit(1);
}
console.log(`Result file: ${outputPath}`);
