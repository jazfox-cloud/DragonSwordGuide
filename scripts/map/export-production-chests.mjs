import path from 'node:path';
import {
  DATASET_VERSION,
  GAME_BUILD,
  PILOT_DIR,
  PILOT_REGIONS,
  SNAPSHOT_DATE,
  loadCandidateSnapshot,
  readJson,
  writeJson
} from './chest-pipeline-lib.mjs';

const snapshot = loadCandidateSnapshot(path.join(PILOT_DIR, 'deduped-snapshot.json'));
const validation = readJson(path.join(PILOT_DIR, 'validation-report.json'));
const rejectedIds = new Set(validation.rejected.map((item) => item.candidate_id));
const publishable = snapshot.candidates.filter((candidate) => !rejectedIds.has(candidate.candidate_id));

const productionDir = path.join(PILOT_DIR, 'production');
const regions = [];

for (const region of PILOT_REGIONS) {
  const markers = publishable
    .filter((candidate) => candidate.region.region_name === region.name)
    .map((candidate, index) => ({
      id: `marker:chest:${region.slug}:${String(index + 1).padStart(2, '0')}`,
      name: candidate.name,
      category: 'CHEST',
      subtype: candidate.canonical_subtype,
      region: candidate.region.region_name,
      x: candidate.normalized_position.x,
      y: candidate.normalized_position.y,
      status: candidate.verification_status,
      precision: candidate.normalized_position.precision
    }));
  const chunk = {
    dataset_version: DATASET_VERSION,
    region: region.name,
    chunk_key: region.slug,
    marker_count: markers.length,
    markers
  };
  writeJson(path.join(productionDir, `${region.slug}.json`), chunk);
  regions.push({
    slug: region.slug,
    name: region.name,
    chunk: `${region.slug}.json`,
    published_count: markers.length,
    payload_bytes: Buffer.byteLength(JSON.stringify(chunk))
  });
}

const manifest = {
  dataset_version: DATASET_VERSION,
  total_published: publishable.length,
  regions,
  game_build: GAME_BUILD,
  updated_at: SNAPSHOT_DATE,
  publication_gate: publishable.length > 0 ? 'PILOT_EXPORT_READY' : 'CHEST_PIPELINE_PILOT_BLOCKED_BY_COORDINATE_PROVENANCE'
};

writeJson(path.join(productionDir, 'manifest.json'), manifest);

console.log(`export: published=${publishable.length} -> reports/map-data/chest-pilot/production`);
