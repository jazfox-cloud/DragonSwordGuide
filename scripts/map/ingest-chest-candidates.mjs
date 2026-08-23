import fs from 'node:fs';
import path from 'node:path';
import {
  DATASET_VERSION,
  GAME_BUILD,
  PILOT_DIR,
  PILOT_REGIONS,
  SNAPSHOT_DATE,
  SOURCE_INVENTORY,
  SOURCE_PATH,
  getPointCoordinates,
  makeCandidate,
  readJson,
  writeJson
} from './chest-pipeline-lib.mjs';

const sourcePath = process.argv[2] || SOURCE_PATH;

if (!fs.existsSync(sourcePath)) {
  throw new Error(`source sample not found: ${sourcePath}`);
}

const sourceData = readJson(sourcePath);
const points = Array.isArray(sourceData) ? sourceData : sourceData.points || sourceData.markers || [];
const chests = points
  .filter((point) => point.layer === 'chests' || /Chest/i.test(point.title || point.name || ''))
  .sort((a, b) => String(a.id || '').localeCompare(String(b.id || '')));

const usedIds = new Set();
const candidates = [];
const regionCounts = {};

for (const region of PILOT_REGIONS) {
  let ordinal = 1;
  regionCounts[region.slug] = 0;
  for (const point of chests) {
    if (usedIds.has(point.id)) continue;
    const { x, y } = getPointCoordinates(point);
    const inRegion =
      x >= region.box.minX &&
      x <= region.box.maxX &&
      y >= region.box.minY &&
      y <= region.box.maxY;
    if (!inRegion) continue;
    candidates.push(makeCandidate(point, region, ordinal));
    usedIds.add(point.id);
    regionCounts[region.slug] += 1;
    ordinal += 1;
    if (regionCounts[region.slug] >= region.target) break;
  }
}

const snapshot = {
  dataset_version: DATASET_VERSION,
  source_snapshot_date: SNAPSHOT_DATE,
  last_checked: SNAPSHOT_DATE,
  game_build: GAME_BUILD,
  source_policy: 'Limited research-only pilot sample. Full source JSON is not copied into the repository; source coordinates are not production truth.',
  pilot_regions: PILOT_REGIONS.map(({ slug, name, target, box }) => ({ slug, name, target, box })),
  source_inventory: SOURCE_INVENTORY,
  raw_count: candidates.length,
  region_counts: regionCounts,
  candidates
};

writeJson(path.join(PILOT_DIR, 'source-inventory.json'), {
  dataset_version: DATASET_VERSION,
  source_snapshot_date: SNAPSHOT_DATE,
  source_inventory: SOURCE_INVENTORY
});
writeJson(path.join(PILOT_DIR, 'candidate-snapshot.json'), snapshot);

console.log(`ingest: ${candidates.length} chest candidates -> reports/map-data/chest-pilot/candidate-snapshot.json`);
