import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateVerticalSliceReadinessPackage } from "../src/domain/game-guide/product-architecture.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "research/game-guide/pilot/sprint5-official-video-evidence.json");
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

function source(id) {
  return data.sources.find((entry) => entry.id === id);
}

function fact(id) {
  return data.canonical_facts.find((entry) => entry.id === id);
}

function hasTrace(entry) {
  return Boolean(
    entry?.source_id
    && entry?.source_type
    && entry?.evidence_subtype
    && entry?.game_version
    && entry?.last_verified
  );
}

run("Official YouTube source record is present and B-level", (failures) => {
  const youtube = source("source:youtube-dragonsword-awakening-official");
  check(youtube?.evidence_level === "B_OFFICIAL", "official YouTube channel must be B_OFFICIAL", failures);
  check(youtube?.url === "https://www.youtube.com/@DragonSwordAwakening", "official YouTube URL should be recorded", failures);
  check(youtube?.public_reuse === "PUBLIC_REUSE_UNCLEAR", "official video frames should not be public-reuse-cleared", failures);
});

run("B-DESCRIPTION facts recovered for Lute and the official combo", (failures) => {
  check(fact("fact:lute-johnny-mercenary-newest-recruit")?.evidence_subtype === "B-DESCRIPTION", "Lute identity fact should be B-DESCRIPTION", failures);
  check(fact("fact:lute-sword-based-combat")?.evidence_subtype === "B-DESCRIPTION", "Lute combat identity should be B-DESCRIPTION", failures);
  check(fact("fact:combo-lute-castella-aria-official-preview")?.evidence_subtype === "B-DESCRIPTION", "combo preview fact should be B-DESCRIPTION", failures);
});

run("B-OBSERVED skill behavior is not invented", (failures) => {
  check(data.evidence_summary.evidence_b_observed_skill_behaviors === 0, "B-OBSERVED skill behavior count should remain 0", failures);
  check(data.skills.every((entry) => entry.verification_status !== "VERIFIED"), "no exact Lute skill should be verified by B", failures);
});

run("Third-party C leads cannot satisfy B fields", (failures) => {
  for (const entry of data.third_party_candidates) {
    check(entry.evidence_level === "C_COMMUNITY", `${entry.id} should remain C_COMMUNITY`, failures);
    check(entry.status === "RESEARCH_LEAD", `${entry.id} should remain a research lead`, failures);
    check(entry.public_fact_allowed === false, `${entry.id} should not be production factual data`, failures);
  }
});

run("Official combo source creates the primary team relation", (failures) => {
  check(data.team_chain.primary_team_chain.join(" -> ") === "character:castella -> character:lute -> character:aria", "primary chain should switch to Castella -> Lute -> Aria", failures);
  check(data.team_relations.length === 2, "two relation records should exist for the primary chain", failures);
  for (const relation of data.team_relations) {
    check(relation.evidence_level === "B_OFFICIAL", `${relation.id} should be B_OFFICIAL`, failures);
    check(relation.evidence_subtype === "B-DESCRIPTION", `${relation.id} should be B-DESCRIPTION`, failures);
    check(relation.classification === "observed_relation", `${relation.id} should be observed_relation, not best-team`, failures);
  }
});

run("Roxy and Theresia no longer hard-block the primary chain", (failures) => {
  const roxy = data.reference_characters.find((entry) => entry.canonical_id === "character:roxy");
  const theresia = data.reference_characters.find((entry) => entry.canonical_id === "character:theresia");
  check(roxy?.identity_status === "C_LEVEL_ONLY", "Roxy should remain C-level only", failures);
  check(theresia?.identity_status === "C_LEVEL_ONLY", "Theresia should remain C-level only", failures);
  check(roxy?.blocks_primary_chain === false, "Roxy should not block the primary chain", failures);
  check(theresia?.blocks_primary_chain === false, "Theresia should not block the primary chain", failures);
});

run("Every upgraded B-level field has provenance trace", (failures) => {
  const upgraded = data.canonical_facts.filter((entry) => entry.evidence_level === "B_OFFICIAL");
  check(upgraded.length === data.evidence_summary.evidence_b_count, "B fact count summary should match canonical facts", failures);
  for (const entry of upgraded) {
    check(hasTrace(entry), `${entry.id} is missing source/type/subtype/version/verification trace`, failures);
  }
});

run("Copyrighted frame reuse remains blocked", (failures) => {
  check(data.frame_capture_policy.internal_evidence === "INTERNAL_EVIDENCE_ONLY", "internal capture policy should be explicit", failures);
  check(data.frame_capture_policy.public_reuse === "PUBLIC_REUSE_UNCLEAR", "public reuse should remain unclear/blocked", failures);
  check(data.frame_capture_policy.public_frame_publication_allowed === false, "public frame publication should be false", failures);
});

run("Readiness is re-scored to research-ready, not review-ready", (failures) => {
  const out = validateVerticalSliceReadinessPackage(data);
  check(out.reference_integrity_result === "PASS", "reference integrity should pass", failures);
  check(out.overall_vertical_slice_status === "VERTICAL_SLICE_RESEARCH_READY", "overall status should be research-ready", failures);
  check(out.ready_for_human_review === false, "slice should not be ready for human review", failures);
  check(data.readiness.skills === "INCOMPLETE", "skills should remain incomplete", failures);
  check(data.readiness.equipment === "INCOMPLETE", "equipment should remain incomplete", failures);
  check(data.readiness.karma === "INCOMPLETE", "karma should remain incomplete", failures);
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

const outputPath = path.join(root, "docs/superpowers/results/2026-08-22-game-guide-product-architecture-sprint-5-tests.json");
fs.writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");

console.log(`Sprint5 official video evidence tests: ${summary.pass_count}/${summary.total} passed`);
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
