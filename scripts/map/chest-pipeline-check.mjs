import fs from 'node:fs';
import path from 'node:path';
import {
  PILOT_DIR,
  PILOT_REGIONS,
  ensureCandidateShape,
  loadCandidateSnapshot,
  readJson
} from './chest-pipeline-lib.mjs';

function fail(message) {
  console.error(`chest:pipeline-check failed: ${message}`);
  process.exit(1);
}

for (const file of [
  'candidate-snapshot.json',
  'normalized-snapshot.json',
  'deduped-snapshot.json',
  'dedupe-report.json',
  'validation-report.json',
  'diff-report.json',
  'performance-report.json',
  'production/manifest.json',
  'production/meadow-of-beginnings.json',
  'production/field-of-plenty.json'
]) {
  if (!fs.existsSync(path.join(PILOT_DIR, file))) {
    fail(`missing ${file}`);
  }
}

const candidateSnapshot = loadCandidateSnapshot(path.join(PILOT_DIR, 'candidate-snapshot.json'));
if (candidateSnapshot.candidates.length < 50 || candidateSnapshot.candidates.length > 100) {
  fail(`expected 50-100 raw candidates, got ${candidateSnapshot.candidates.length}`);
}
for (const candidate of candidateSnapshot.candidates) ensureCandidateShape(candidate);

const normalized = loadCandidateSnapshot(path.join(PILOT_DIR, 'normalized-snapshot.json'));
if (normalized.candidates.some((candidate) => !candidate.canonical_subtype || candidate.canonical_subtype === 'UNKNOWN_CHEST')) {
  fail('normalization produced unknown canonical subtype');
}
if (normalized.candidates.some((candidate) => !PILOT_REGIONS.map((region) => region.name).includes(candidate.region.region_name))) {
  fail('candidate outside pilot regions');
}

const dedupe = readJson(path.join(PILOT_DIR, 'dedupe-report.json'));
if (dedupe.raw_count !== candidateSnapshot.candidates.length) fail('dedupe raw_count mismatch');
if (dedupe.deduped_count > dedupe.raw_count) fail('dedupe count exceeds raw count');

const validation = readJson(path.join(PILOT_DIR, 'validation-report.json'));
if (validation.duplicate_id_count !== 0) fail('duplicate ids found');
if (validation.invalid_coordinate_count !== 0) fail('invalid coordinates found');
if (validation.unknown_category_count !== 0) fail('unknown categories found');
if (validation.unresolved_published_conflicts !== 0) fail('unresolved conflicts published');
if (validation.research_only_published_count !== 0) fail('research-only rows published');
if (validation.published_count !== 0) fail('pilot unexpectedly published chests');
if (validation.rejected_count !== validation.candidate_count) fail('coordinate gate should reject every research-only candidate');

const manifest = readJson(path.join(PILOT_DIR, 'production/manifest.json'));
if (manifest.total_published !== 0) fail('manifest should not publish research-only chests');
if (manifest.regions.length !== 2) fail('manifest should contain two pilot regions');
for (const region of manifest.regions) {
  const chunk = readJson(path.join(PILOT_DIR, 'production', region.chunk));
  if (chunk.marker_count !== chunk.markers.length) fail(`chunk count mismatch for ${region.chunk}`);
  if (chunk.marker_count !== 0) fail(`chunk ${region.chunk} should be empty while provenance is blocked`);
}

const diff = readJson(path.join(PILOT_DIR, 'diff-report.json'));
for (const key of ['added', 'removed', 'moved', 'metadata_changed', 'unchanged']) {
  if (!Array.isArray(diff[key])) fail(`diff missing ${key}`);
}

const performance = readJson(path.join(PILOT_DIR, 'performance-report.json'));
if (performance.max_visible_dom_markers > 250) fail('visible DOM marker cap too high');

console.log(`chest:pipeline-check ok: raw=${candidateSnapshot.candidates.length} published=${validation.published_count} rejected=${validation.rejected_count}`);
