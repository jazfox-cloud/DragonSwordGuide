import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scorePilotCandidate, selectPilotCharacters } from "../src/domain/game-guide/product-architecture.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "research/game-guide/pilot/sprint2-pilot-readiness.json");
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

run("pilot selection uses real evidence gates and selects only Lute", (failures) => {
  const selected = selectPilotCharacters(data.candidate_inventory);
  check(selected.length === 1, "exactly one pilot should pass Sprint 2 gate", failures);
  check(selected[0]?.canonical_id === "character:lute", "Lute should be selected", failures);
});

run("community-only candidates do not become pilot-ready", (failures) => {
  const roxy = scorePilotCandidate(data.candidate_inventory.find((entry) => entry.canonical_id === "character:roxy"));
  const theresia = scorePilotCandidate(data.candidate_inventory.find((entry) => entry.canonical_id === "character:theresia"));
  check(roxy.decision !== "PILOT_READY", "Roxy should not be pilot-ready without identity gate", failures);
  check(theresia.decision !== "PILOT_READY", "Theresia should not be pilot-ready without identity gate", failures);
});

run("vertical slice remains non-public and acquisition-first", (failures) => {
  const pilot = data.selected_pilots[0];
  check(pilot.vertical_slice_readiness.character === "RESEARCH_READY", "character layer should be research-ready", failures);
  check(pilot.vertical_slice_readiness.skills === "INCOMPLETE", "skill layer should require acquisition", failures);
  check(data.acquisition_backlog.length >= 4, "missing fields should produce executable backlog", failures);
  check(data.metadata.public_dataset === false, "pilot data must not be public", failures);
});

run("team relations are editorial candidates, not official facts", (failures) => {
  check(data.team_relation_candidates.length === 2, "two relation candidates expected", failures);
  check(data.team_relation_candidates.every((entry) => entry.classification === "editorial_recommendation"), "relations should be editorial recommendations", failures);
});

run("shared reuse demo references one canonical fact in three contexts", (failures) => {
  const demo = data.selected_pilots[0].canonical_reuse_demo;
  check(demo.canonical_fact_id === "skill:stun-slash", "reuse demo should reference canonical skill ID", failures);
  check(demo.used_by.length >= 3, "canonical fact should be reused by three contexts", failures);
  check(demo.reference_integrity_result === "PASS_NON_PUBLIC_REFERENCE_ONLY", "reference integrity result should be explicit", failures);
});

run("production boundary remains closed", (failures) => {
  for (const [key, value] of Object.entries(data.production_boundary)) {
    check(value === false, `${key} should be false`, failures);
  }
});

const summary = {
  tests: results,
  pass_count: results.filter((entry) => entry.status === "PASS").length,
  fail_count: results.filter((entry) => entry.status !== "PASS").length,
  total: results.length,
};

const outputPath = path.join(root, "docs/superpowers/results/2026-08-22-game-guide-product-architecture-sprint-2-pilot-tests.json");
fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(`Sprint2 pilot readiness tests: ${summary.pass_count}/${summary.total} passed`);
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
