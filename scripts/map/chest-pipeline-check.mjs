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
  'public-coordinate-recovery.json',
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
if (validation.published_count !== 80) fail(`expected 80 published chests, got ${validation.published_count}`);
if (validation.rejected_count !== 0) fail(`expected 0 rejected chests after public recovery, got ${validation.rejected_count}`);
if (validation.coordinate_provenance !== 'MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION') {
  fail('validation must use multi-source public coordinate provenance');
}

const manifest = readJson(path.join(PILOT_DIR, 'production/manifest.json'));
if (manifest.total_published !== 80) fail('manifest should publish 80 recovered chest pilot markers');
if (manifest.regions.length !== 2) fail('manifest should contain two pilot regions');
const publishedIds = new Set();
const publishedPositionKeys = new Set();
let searchableAliasCount = 0;
for (const region of manifest.regions) {
  const chunk = readJson(path.join(PILOT_DIR, 'production', region.chunk));
  if (chunk.marker_count !== chunk.markers.length) fail(`chunk count mismatch for ${region.chunk}`);
  if (chunk.marker_count !== 40) fail(`chunk ${region.chunk} should publish 40 chest markers`);
  for (const marker of chunk.markers) {
    if (publishedIds.has(marker.id)) fail(`duplicate published chest marker id ${marker.id}`);
    publishedIds.add(marker.id);

    const positionKey = `${marker.region}:${marker.x}:${marker.y}:${marker.subtype}`;
    if (publishedPositionKeys.has(positionKey)) fail(`duplicate published chest position ${positionKey}`);
    publishedPositionKeys.add(positionKey);

    if (marker.category !== 'CHEST') fail(`chunk ${region.chunk} contains non-chest marker`);
    if (marker.status !== 'SECONDARY_CORROBORATED') fail(`chunk ${region.chunk} has invalid chest status`);
    if (marker.precision !== 'LANDMARK_APPROXIMATE') fail(`chunk ${region.chunk} has invalid chest precision`);
    if (marker.coordinate_provenance !== 'MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION') {
      fail(`chunk ${region.chunk} has invalid coordinate provenance`);
    }
    if (typeof marker.x !== 'number' || marker.x < 0 || marker.x > 1 || typeof marker.y !== 'number' || marker.y < 0 || marker.y > 1) {
      fail(`chunk ${region.chunk} has invalid normalized coordinate`);
    }
    if (!Array.isArray(marker.aliases) || marker.aliases.length < 4) {
      fail(`chunk ${region.chunk} marker ${marker.id} has sparse aliases`);
    }
    if (!marker.aliases.some((alias) => alias.toLowerCase().includes('treasure chest'))) {
      fail(`chunk ${region.chunk} marker ${marker.id} must include Treasure Chest alias`);
    }
    if (!marker.aliases.some((alias) => alias.toLowerCase().includes(marker.region.toLowerCase()))) {
      fail(`chunk ${region.chunk} marker ${marker.id} must include region alias`);
    }
    searchableAliasCount += marker.aliases.length;
  }
  const publicChunkPath = path.join(process.cwd(), 'public/data/map/chests', region.chunk);
  if (!fs.existsSync(publicChunkPath)) fail(`missing public chunk ${region.chunk}`);
  const publicChunk = readJson(publicChunkPath);
  if (publicChunk.marker_count !== chunk.marker_count) fail(`public chunk count mismatch for ${region.chunk}`);
}
if (publishedIds.size !== 80) fail(`expected 80 unique published chest ids, got ${publishedIds.size}`);
if (searchableAliasCount < 80 * 4) fail('published chest aliases are too sparse for search coverage');

const recovery = readJson(path.join(PILOT_DIR, 'public-coordinate-recovery.json'));
if (recovery.sample_checked !== 20) fail('public recovery sample must check 20 markers');
if (recovery.public_position_recovery !== 'PUBLIC_POSITION_RECOVERY_VIABLE') {
  fail('public recovery should be viable after 20-marker sample');
}
if ((recovery.classification_counts?.STRONG_POSITION_AGREEMENT || 0) < 16) {
  fail('public recovery needs at least 16 strong agreements in the sample');
}

const diff = readJson(path.join(PILOT_DIR, 'diff-report.json'));
for (const key of ['added', 'removed', 'moved', 'metadata_changed', 'unchanged']) {
  if (!Array.isArray(diff[key])) fail(`diff missing ${key}`);
}

const performance = readJson(path.join(PILOT_DIR, 'performance-report.json'));
if (performance.max_visible_dom_markers > 250) fail('visible DOM marker cap too high');
if (performance.published_count !== 80) fail('performance report should benchmark the published chest pilot');

console.log(`chest:pipeline-check ok: raw=${candidateSnapshot.candidates.length} published=${validation.published_count} rejected=${validation.rejected_count}`);
