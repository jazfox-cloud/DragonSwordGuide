import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateVerticalSliceReadinessPackage } from "../src/domain/game-guide/product-architecture.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "research/game-guide/pilot/sprint3-lute-vertical-slice.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

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

run("Lute canonical record remains internal and source-resolved", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(out.reference_integrity_result === "PASS", "references should resolve", failures);
  check(data.character.canonical_id === "character:lute", "canonical id should be character:lute", failures);
  check(data.metadata.public_dataset === false, "package must remain non-public", failures);
});

run("Evidence B identity exists but skill records remain unverified", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(out.evidence_counts.B_OFFICIAL >= 1, "at least one Evidence B source expected", failures);
  check(out.skill_records_verified.A_FIRST_HAND === 0, "no first-hand skill records should be present", failures);
  check(out.skill_records_verified.B_OFFICIAL === 0, "no official exact skill records should be present", failures);
});

run("Evidence C is rejected for factual public fields", (failures) => {
  const mutated = structuredClone(data);
  mutated.skills[0].public_fact_allowed = true;
  const out = validateVerticalSliceReadinessPackage(mutated);
  check(out.reference_integrity_result === "FAIL", "C factual promotion should fail", failures);
  check(out.errors.some((entry) => entry.code === "ERR_C_EVIDENCE_FACT_PROMOTION"), "C promotion error expected", failures);
});

run("derived Build artifact is review-bounded and references canonical IDs", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(data.build_artifact.artifact_class === "DERIVED_EDITORIAL_ARTIFACT", "build artifact should be derived", failures);
  check(data.build_artifact.publication_gate !== "PUBLISHED", "build artifact must not publish", failures);
  check(out.errors.every((entry) => entry.code !== "ERR_DERIVED_ARTIFACT_DUPLICATES_FACT"), "derived artifact should not duplicate facts", failures);
});

run("team relation remains editorial or research-only", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(data.team_chain.classification === "TEAM_CHAIN_RESEARCH_REQUIRED", "team chain should remain research required", failures);
  check(out.team_relation_readiness === "INCOMPLETE", "team relation should be incomplete", failures);
});

run("first-hand verification blocked is explicit", (failures) => {
  check(data.first_hand_verification.status === "FIRST_HAND_LUTE_SKILL_VERIFICATION_BLOCKED", "first-hand blocked status expected", failures);
  check(data.first_hand_verification.evidence_records_created === 0, "no simulated first-hand evidence should exist", failures);
});

run("reuse integrity fails when canonical source changes", (failures) => {
  const mutated = structuredClone(data);
  mutated.canonical_facts[0].source_id = "source:missing";
  const out = validateVerticalSliceReadinessPackage(mutated);
  check(out.reference_integrity_result === "FAIL", "missing canonical source should fail reuse integrity", failures);
  check(out.errors.some((entry) => entry.code === "ERR_MISSING_SOURCE"), "missing source error expected", failures);
});

run("stale game version blocks readiness", (failures) => {
  const mutated = structuredClone(data);
  mutated.canonical_facts[0].game_version = "game-version:old";
  const out = validateVerticalSliceReadinessPackage(mutated);
  check(out.reference_integrity_result === "FAIL", "stale version should fail", failures);
  check(out.errors.some((entry) => entry.code === "ERR_STALE_VERSION"), "stale version error expected", failures);
});

run("acquisition task lifecycle remains executable", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(out.acquisition_lifecycle.BLOCKED >= 1, "blocked first-hand or official acquisition tasks expected", failures);
  check(out.acquisition_lifecycle.PARTIALLY_COMPLETED >= 1, "partial acquisition progress expected", failures);
});

run("readiness transitions stop before public review", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(out.overall_vertical_slice_status === "VERTICAL_SLICE_RESEARCH_READY", "overall status should be research-ready", failures);
  check(out.ready_for_human_review === false, "slice should not be review-ready", failures);
});

const summary = {
  tests: results,
  pass_count: results.filter((entry) => entry.status === "PASS").length,
  fail_count: results.filter((entry) => entry.status !== "PASS").length,
  total: results.length,
};

const outputPath = path.join(root, "docs/superpowers/results/2026-08-22-game-guide-product-architecture-sprint-3-tests.json");
fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(`Sprint3 Lute vertical slice tests: ${summary.pass_count}/${summary.total} passed`);
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
