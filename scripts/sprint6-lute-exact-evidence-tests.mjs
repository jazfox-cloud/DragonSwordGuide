import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateVerticalSliceReadinessPackage } from "../src/domain/game-guide/product-architecture.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "research/game-guide/pilot/sprint6-lute-exact-evidence.json");
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

function requiredCapture(id) {
  return data.human_capture_request_package.items.find((entry) => entry.id === id);
}

run("Official timestamp review records attempts without inventing timestamps", (failures) => {
  check(data.official_video_timestamp_review.reviewed_videos.length === 2, "two official videos should be reviewed", failures);
  check(data.official_video_timestamp_review.timestamp_evidence_count === 0, "timestamp evidence count should remain 0 when no frame-level evidence is available", failures);
  check(data.official_video_timestamp_review.stop_condition === "OFFICIAL_EVIDENCE_EXHAUSTED", "official evidence exhaustion should be explicit", failures);
  for (const attempt of data.official_video_timestamp_review.reviewed_videos) {
    check(attempt.review_status === "REVIEWED_NO_EXACT_FIELD_RECOVERY", `${attempt.id} should be reviewed without exact-field recovery`, failures);
  }
});

run("Exact Lute Skill gate remains closed", (failures) => {
  check(data.exact_lute_skill_gate.result === "EXACT_LUTE_SKILL_B_EVIDENCE_NOT_FOUND", "exact skill gate should report not found", failures);
  check(data.evidence_summary.exact_lute_skill_b_count === 0, "exact Lute Skill B count should be 0", failures);
  check(data.skills.every((entry) => entry.verification_status === "RESEARCH_LEAD"), "skill records should remain research leads", failures);
  check(data.skills.every((entry) => entry.evidence_level === "C_COMMUNITY"), "third-party skills should not be promoted", failures);
});

run("Status and Signal exact identifiers are not inferred", (failures) => {
  check(data.status_signal_observation.named_status_ids_recovered.length === 0, "named Status IDs should be empty", failures);
  check(data.status_signal_observation.named_signal_ids_recovered.length === 0, "named Signal IDs should be empty", failures);
  check(data.evidence_summary.b_observed_behavior_count === 0, "B-observed behavior count should be 0", failures);
});

run("Equipment and Karma remain unresolved by official evidence", (failures) => {
  check(data.equipment_karma_official_search.equipment_result === "NOT_FOUND", "equipment should be NOT_FOUND from official sources", failures);
  check(data.equipment_karma_official_search.karma_result === "NOT_FOUND", "karma should be NOT_FOUND from official sources", failures);
  check(data.equipment.every((entry) => entry.evidence_level === "C_COMMUNITY"), "equipment lead remains C-level", failures);
  check(data.karma.every((entry) => entry.evidence_level === "C_COMMUNITY"), "karma lead remains C-level", failures);
});

run("Primary team relation remains composition-level only", (failures) => {
  const castellaLute = data.team_relations.find((entry) => entry.id.includes("castella|lute"));
  const luteAria = data.team_relations.find((entry) => entry.id.includes("lute|aria"));
  check(castellaLute?.relation_status === "COMPOSITION_B_CONFIRMED_EXACT_CHAIN_BLOCKED", "Castella→Lute relation should be composition-confirmed but exact-chain blocked", failures);
  check(luteAria?.relation_status === "COMPOSITION_B_CONFIRMED_EXACT_CHAIN_BLOCKED", "Lute→Aria relation should be composition-confirmed but exact-chain blocked", failures);
  check(data.team_chain.primary_team_chain.join(" -> ") === "character:castella -> character:lute -> character:aria", "primary chain should remain Castella -> Lute -> Aria", failures);
});

run("Human capture package is precise and complete", (failures) => {
  check(requiredCapture("capture:lute-skill-panel")?.required_fields.includes("skill names"), "Lute skill panel request should include skill names", failures);
  check(requiredCapture("capture:lute-equipment-screen")?.required_fields.includes("Lute identity visible if possible"), "equipment request should ask for Lute identity visibility", failures);
  check(requiredCapture("capture:lute-karma-screen")?.required_fields.includes("description/effect text"), "karma request should ask for effect text", failures);
  check(requiredCapture("capture:castella-lute-aria-combo")?.required_fields.includes("Status/Signal UI"), "combo request should ask for Status/Signal UI", failures);
});

run("Promotion rule prevents C evidence from satisfying A/B gates", (failures) => {
  check(data.evidence_promotion_rule.allowed.includes("C_TO_B_OFFICIAL_PRIMARY_SOURCE_ONLY"), "C to B should require official primary source", failures);
  check(data.evidence_promotion_rule.forbidden.includes("MULTIPLE_THIRD_PARTY_AGREEMENT"), "multiple third-party agreement should be forbidden", failures);
  check(data.third_party_candidates.every((entry) => entry.status === "RESEARCH_LEAD"), "third-party candidates should remain research leads", failures);
});

run("Readiness reflects first-hand capture required", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(out.reference_integrity_result === "PASS", "reference integrity should pass", failures);
  check(out.overall_vertical_slice_status === "OFFICIAL_EVIDENCE_EXHAUSTED_FIRST_HAND_REQUIRED", "overall status should require first-hand capture", failures);
  check(data.readiness.overall === "OFFICIAL_EVIDENCE_EXHAUSTED_FIRST_HAND_REQUIRED", "readiness overall should match final classification", failures);
  check(data.field_evidence_matrix.summary.required_complete === 4, "required complete should remain 4", failures);
  check(data.field_evidence_matrix.summary.required_total === 9, "required total should remain 9", failures);
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

const outputPath = path.join(root, "docs/superpowers/results/2026-08-22-game-guide-product-architecture-sprint-6-tests.json");
fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(`Sprint6 Lute exact evidence tests: ${summary.pass_count}/${summary.total} passed`);
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
