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
  'production/field-of-plenty.json',
  '../full-scale-validation.json',
  '../full-scale-performance.json',
  '../full-scale-dataset-diff.json',
  '../full-scale-region-report.json'
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

const recovery = readJson(path.join(PILOT_DIR, 'public-coordinate-recovery.json'));
if (recovery.sample_checked !== 20) fail('public recovery sample must check 20 markers');
if (recovery.public_position_recovery !== 'PUBLIC_POSITION_RECOVERY_VIABLE') {
  fail('public recovery should be viable after 20-marker sample');
}
if ((recovery.classification_counts?.STRONG_POSITION_AGREEMENT || 0) < 16) {
  fail('public recovery needs at least 16 strong agreements in the sample');
}

const scaleValidation = readJson(path.join(process.cwd(), 'reports/map-data/scale-validation.json'));
if (scaleValidation.scale_gate !== 'CHEST_SCALE_500_READY_FOR_PRODUCTION') {
  fail('scale validation must pass the 500 production gate');
}
if (scaleValidation.raw !== 400 || scaleValidation.chests_after !== 398) {
  fail('scale validation must check 400 candidates and publish 398 chests');
}
if (scaleValidation.rejected !== 2) {
  fail('scale validation must retain the two rejected weak/conflicting candidates');
}
if (scaleValidation.strong_moderate_rate < 0.95) {
  fail('scale validation strong+moderate agreement must be at least 95%');
}
if (scaleValidation.conflicting_rate > 0.01) {
  fail('scale validation conflicting rate must be at most 1%');
}
for (const [key, value] of Object.entries(scaleValidation.gate_checks || {})) {
  if (value !== true) fail(`scale gate check failed: ${key}`);
}

const datasetDiff = readJson(path.join(process.cwd(), 'reports/map-data/dataset-diff.json'));
if (!datasetDiff.stable_existing_80) fail('existing 80 chest marker IDs and metadata must stay stable');
if (datasetDiff.counts.added !== 318 || datasetDiff.counts.removed !== 0 || datasetDiff.counts.moved !== 0) {
  fail('dataset diff must add 318 chests without removing or moving the baseline 80');
}

const performance = readJson(path.join(process.cwd(), 'reports/map-data/performance-validation.json'));
if (performance.cluster_performance.max_visible_dom_markers > 250 || !performance.cluster_performance.dom_cap_respected) {
  fail('visible DOM marker cap must be respected at scale');
}
if (!performance.performance_gate.chunk_size_acceptable || !performance.performance_gate.no_multi_second_blocking_model) {
  fail('scale performance gate must pass static benchmark checks');
}

const fullValidation = readJson(path.join(process.cwd(), 'reports/map-data/full-scale-validation.json'));
if (fullValidation.full_scale_gate !== 'CHEST_FULL_SCALE_PUBLISHED') {
  fail('full-scale validation must publish only passed chest candidates');
}
if (fullValidation.raw_chest_candidates !== 1500 || fullValidation.chests_after !== 1484) {
  fail('full-scale validation must audit 1500 candidates and publish 1484 chests');
}
if (fullValidation.chests_rejected !== 16) {
  fail('full-scale validation must retain 16 weak/conflicting rejected candidates');
}
if (fullValidation.classification_counts.STRONG_POSITION_AGREEMENT !== 1290) {
  fail('full-scale validation strong agreement count changed unexpectedly');
}
if (fullValidation.classification_counts.MODERATE_POSITION_AGREEMENT !== 194) {
  fail('full-scale validation moderate agreement count changed unexpectedly');
}
if (fullValidation.classification_counts.WEAK_POSITION_AGREEMENT !== 7) {
  fail('full-scale validation weak agreement count changed unexpectedly');
}
if (fullValidation.classification_counts.CONFLICTING_POSITION !== 9) {
  fail('full-scale validation conflicting agreement count changed unexpectedly');
}
if (fullValidation.classification_counts.INSUFFICIENT_POSITION_DATA !== 0) {
  fail('full-scale validation should not publish insufficient position data');
}
for (const [key, value] of Object.entries(fullValidation.gate_checks || {})) {
  if (value !== true) fail(`full-scale gate check failed: ${key}`);
}

const fullDatasetDiff = readJson(path.join(process.cwd(), 'reports/map-data/full-scale-dataset-diff.json'));
if (!fullDatasetDiff.stable_existing_398) fail('existing 398 chest marker IDs and metadata must stay stable');
if (fullDatasetDiff.counts.added !== 1086 || fullDatasetDiff.counts.removed !== 0 || fullDatasetDiff.counts.moved !== 0 || fullDatasetDiff.counts.metadata_changed !== 0) {
  fail('full-scale dataset diff must add 1086 chests without removing, moving, or changing the baseline 398');
}

const fullPerformance = readJson(path.join(process.cwd(), 'reports/map-data/full-scale-performance.json'));
if (fullPerformance.cluster_performance.max_visible_dom_markers > 250 || !fullPerformance.cluster_performance.dom_cap_respected) {
  fail('full-scale visible DOM marker cap must be respected');
}
if (!fullPerformance.performance_gate.chunk_size_acceptable || !fullPerformance.performance_gate.no_multi_second_blocking_model) {
  fail('full-scale performance gate must pass static benchmark checks');
}
if (fullPerformance.region_filter.options < 20) {
  fail('full-scale Chest layer should expose region filter options');
}

const manifest = readJson(path.join(process.cwd(), 'public/data/map/chests/manifest.json'));
if (manifest.total_published !== 1484) fail(`public manifest should publish 1484 full-scale chest markers, got ${manifest.total_published}`);
if (manifest.region_count !== 20 || manifest.regions.length !== 20) fail('public manifest should contain twenty full-scale regions');
if (manifest.publication_gate !== 'CHEST_FULL_SCALE_PUBLISHED') fail('public manifest must retain the full-scale gate decision');
const publishedIds = new Set();
const publishedPositionKeys = new Set();
let searchableAliasCount = 0;
for (const region of manifest.regions) {
  const scaleChunkPath = path.join(process.cwd(), 'reports/map-data/chest-full-scale-1500/production', region.chunk);
  if (!fs.existsSync(scaleChunkPath)) fail(`missing scale production chunk ${region.chunk}`);
  const scaleChunk = readJson(scaleChunkPath);
  const publicChunkPath = path.join(process.cwd(), 'public/data/map/chests', region.chunk);
  if (!fs.existsSync(publicChunkPath)) fail(`missing public chunk ${region.chunk}`);
  const chunk = readJson(publicChunkPath);
  if (scaleChunk.marker_count !== chunk.marker_count) fail(`scale/public chunk count mismatch for ${region.chunk}`);
  if (chunk.marker_count !== chunk.markers.length) fail(`chunk count mismatch for ${region.chunk}`);
  if (chunk.marker_count < 1 || chunk.marker_count > 150) fail(`chunk ${region.chunk} should publish 1-150 chest markers`);
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
    if (marker.source_family_count < 3) fail(`chunk ${region.chunk} marker ${marker.id} has insufficient source-family metadata`);
    if (!Array.isArray(marker.position_sources) || marker.position_sources.length < 2) {
      fail(`chunk ${region.chunk} marker ${marker.id} must include two position sources`);
    }
    if (!Array.isArray(marker.context_sources) || marker.context_sources.length < 3) {
      fail(`chunk ${region.chunk} marker ${marker.id} must include context sources`);
    }
    if (typeof marker.x !== 'number' || marker.x < 0 || marker.x > 1 || typeof marker.y !== 'number' || marker.y < 0 || marker.y > 1) {
      fail(`chunk ${region.chunk} has invalid normalized coordinate`);
    }
    if (!Array.isArray(marker.aliases) || marker.aliases.length < 6) {
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
}
if (publishedIds.size !== 1484) fail(`expected 1484 unique published chest ids, got ${publishedIds.size}`);
if (searchableAliasCount < 1484 * 6) fail('published chest aliases are too sparse for search coverage');

const diff = readJson(path.join(PILOT_DIR, 'diff-report.json'));
for (const key of ['added', 'removed', 'moved', 'metadata_changed', 'unchanged']) {
  if (!Array.isArray(diff[key])) fail(`diff missing ${key}`);
}

const pilotPerformance = readJson(path.join(PILOT_DIR, 'performance-report.json'));
if (pilotPerformance.max_visible_dom_markers > 250) fail('pilot visible DOM marker cap too high');
if (pilotPerformance.published_count !== 80) fail('pilot performance report should retain the 80-chest baseline');

console.log(`chest:pipeline-check ok: pilot=${validation.published_count} scale500=${scaleValidation.chests_after} fullScale=${manifest.total_published} fullRejected=${fullValidation.chests_rejected}`);
