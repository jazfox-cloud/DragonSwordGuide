import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateVerticalSliceReadinessPackage } from "../src/domain/game-guide/product-architecture.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "research/game-guide/pilot/sprint4-lute-evidence-capture.json");
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

run("Sprint 4 record remains non-public and blocked", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(data.metadata.public_dataset === false, "capture package must remain non-public", failures);
  check(out.overall_vertical_slice_status === "VERTICAL_SLICE_BLOCKED", "overall classification should be blocked", failures);
});

run("No real Evidence A/B Lute Skill capture exists", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(out.skill_records_verified.A_FIRST_HAND === 0, "Evidence A skill count should be 0", failures);
  check(out.skill_records_verified.B_OFFICIAL === 0, "Evidence B skill count should be 0", failures);
  check(data.capture_attempts.find((entry) => entry.target === "Lute skill panel")?.status === "FIRST_HAND_CAPTURE_STILL_BLOCKED", "first-hand capture should be explicitly blocked", failures);
});

run("C-level Lute skill leads are not upgraded", (failures) => {
  for (const skill of data.skills) {
    check(skill.new_evidence_level === "C_COMMUNITY", `${skill.id} should remain C_COMMUNITY`, failures);
    check(skill.public_fact_allowed === false, `${skill.id} should not be public factual data`, failures);
  }
});

run("Equipment and Karma facts remain unbacked by A/B evidence", (failures) => {
  check(data.equipment.every((entry) => entry.new_evidence_level === "C_COMMUNITY" && entry.public_fact_allowed === false), "equipment should remain C-only lead", failures);
  check(data.karma.every((entry) => entry.new_evidence_level === "C_COMMUNITY" && entry.public_fact_allowed === false), "karma should remain C-only lead", failures);
});

run("Roxy and Theresia identities remain unresolved", (failures) => {
  const roxy = data.reference_characters.find((entry) => entry.canonical_id === "character:roxy");
  const theresia = data.reference_characters.find((entry) => entry.canonical_id === "character:theresia");
  check(roxy?.identity_readiness === "BLOCKED", "Roxy identity should be blocked", failures);
  check(theresia?.identity_readiness === "BLOCKED", "Theresia identity should be blocked", failures);
});

run("Team chain was not reproduced", (failures) => {
  check(data.team_chain.reproduction_status === "TEAM_CHAIN_REPRODUCTION_BLOCKED", "team chain reproduction should be blocked", failures);
  check(data.team_chain.observed_relation_count === 0, "observed relation count should be 0", failures);
  check(data.team_chain.editorial_relation_count === 0, "editorial relation count should be 0", failures);
});

run("Acquisition lifecycle is fully blocked", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(out.acquisition_lifecycle.BLOCKED === 4, "all four existing acquisition tasks should be blocked", failures);
  check(out.acquisition_lifecycle.COMPLETED === 0, "no acquisition task should be completed", failures);
});

run("Production boundary remains closed", (failures) => {
  for (const [key, value] of Object.entries(data.production_boundary)) {
    check(value === false, `${key} should be false`, failures);
  }
});

const summary = {
  tests: results,
  pass_count: results.filter((entry) => entry.status === "PASS").length,
  fail_count: results.filter((entry) => entry.status !== "PASS").length,
  total: results.length
};

const outputPath = path.join(root, "docs/superpowers/results/2026-08-22-game-guide-product-architecture-sprint-4-tests.json");
fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(`Sprint4 Lute evidence capture tests: ${summary.pass_count}/${summary.total} passed`);
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
