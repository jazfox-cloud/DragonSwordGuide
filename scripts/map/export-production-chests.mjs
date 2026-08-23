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

function subtypeLabel(subtype) {
  return subtype
    .replace('_CHEST', '')
    .split('_')
    .map((part) => `${part.slice(0, 1)}${part.slice(1).toLowerCase()}`)
    .join(' ');
}

for (const region of PILOT_REGIONS) {
  const markers = publishable
    .filter((candidate) => candidate.region.region_name === region.name)
    .map((candidate, index) => {
      const markerNumber = String(index + 1).padStart(2, '0');
      const label = subtypeLabel(candidate.canonical_subtype);
      return {
        id: `marker:chest:${region.slug}:${markerNumber}`,
        name: candidate.name,
        category: 'CHEST',
        subtype: candidate.canonical_subtype,
        region: candidate.region.region_name,
        x: candidate.normalized_position.x,
        y: candidate.normalized_position.y,
        status: candidate.verification_status,
        verification_status: candidate.verification_status,
        precision: candidate.normalized_position.precision,
        coordinate_confidence: candidate.normalized_position.coordinate_confidence,
        coordinate_provenance: candidate.coordinate_gate,
        confidence: candidate.confidence,
        dataset_version: DATASET_VERSION,
        source_ref: candidate.publication.published_marker_id || candidate.candidate_id,
        chunk_key: region.slug,
        aliases: [
          candidate.name,
          `Treasure Chest ${region.name}`,
          `${label} Chest`,
          `${region.name} ${label} Chest`,
          `Chest ${region.name} #${markerNumber}`,
          `Treasure Box ${region.name}`
        ],
        game_version: candidate.game_build,
        last_checked: candidate.last_checked,
        description: `${candidate.name} is a source-corroborated, approximate Treasure Chest planning marker in ${region.name}. It is not an exact in-game pin.`,
        source_summary: 'Position is derived from multi-source public position corroboration across public map products and then placed on DragonSwordGuide schematic coordinates.'
      };
    });
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
