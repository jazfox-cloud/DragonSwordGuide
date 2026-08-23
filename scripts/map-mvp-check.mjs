import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataPath = path.join(root, 'src/data/map-markers.json');
const htmlPath = path.join(root, 'dist/map/index.html');
const sourcePath = path.join(root, 'src/pages/map/index.astro');
const allowedCategories = new Set(['EONAS_LEGACY', 'ORGANA_STATUE']);
const requiredMarkerFields = [
  'id',
  'name',
  'category',
  'region',
  'x',
  'y',
  'precision',
  'verification_status',
  'confidence',
  'source_summary',
  'game_version',
  'last_checked',
  'description',
];

function fail(message) {
  console.error(`map:mvp-check failed: ${message}`);
  process.exit(1);
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`missing ${path.relative(root, filePath)}`);
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const markerData = readJson(dataPath);

if (markerData.base_map_id !== 'OWN_SCHEMATIC_ORBIS_BASE_MAP') {
  fail('base_map_id must be OWN_SCHEMATIC_ORBIS_BASE_MAP');
}

if (markerData.coordinate_system !== 'IMAGE_RELATIVE_COORDINATES') {
  fail('coordinate_system must be IMAGE_RELATIVE_COORDINATES');
}

if (String(markerData.data_policy).includes('RESEARCH_ONLY_NOT_FOR_PRODUCTION')) {
  fail('production data must not be research-only');
}

if (!Array.isArray(markerData.markers) || markerData.markers.length < 4) {
  fail('expected at least 4 production beta markers');
}

const ids = new Set();
let approximateCount = 0;
let verifiedCount = 0;

for (const marker of markerData.markers) {
  for (const field of requiredMarkerFields) {
    if (!(field in marker)) {
      fail(`${marker.id || 'unknown marker'} is missing ${field}`);
    }
  }

  if (ids.has(marker.id)) {
    fail(`duplicate marker id ${marker.id}`);
  }
  ids.add(marker.id);

  if (!allowedCategories.has(marker.category)) {
    fail(`${marker.id} has invalid category ${marker.category}`);
  }

  if (typeof marker.x !== 'number' || marker.x < 0 || marker.x > 1 || typeof marker.y !== 'number' || marker.y < 0 || marker.y > 1) {
    fail(`${marker.id} must use normalized x/y coordinates`);
  }

  if (marker.precision === 'APPROXIMATE') {
    approximateCount += 1;
  }

  if (marker.verification_status === 'FIRST_HAND_VERIFIED' || marker.verification_status === 'OFFICIAL_VERIFIED') {
    verifiedCount += 1;
  }
}

if (approximateCount < 4) {
  fail('MVP should clearly publish approximate beta markers');
}

if (verifiedCount !== 0) {
  fail('MVP must not claim verified markers without first-hand evidence');
}

const source = fs.readFileSync(sourcePath, 'utf8');

if (source.includes('2026-08-22-map-data-pipeline-pilot.json')) {
  fail('map page must not import the research-only pipeline pilot');
}

if (!fs.existsSync(htmlPath)) {
  fail('missing dist/map/index.html; run npm run build before this check');
}

const html = fs.readFileSync(htmlPath, 'utf8');
const expectedSnippets = [
  '<title>DragonSword Awakening Interactive Map',
  '<link rel="canonical" href="https://dragonswordguide.com/map/">',
  'data-map-mvp',
  'data-marker-count',
  'data-map-action="zoom-in"',
  'data-map-action="zoom-out"',
  'data-map-action="reset"',
  'data-marker-search',
  'data-category-filter',
  'Unofficial schematic map',
  'Not to exact in-game scale',
];

for (const snippet of expectedSnippets) {
  if (!html.includes(snippet)) {
    fail(`dist map page missing ${snippet}`);
  }
}

if (!/<h1[^>]*>\s*DragonSword Awakening Interactive Map\s*<\/h1>/.test(html)) {
  fail('dist map page missing exact H1 text');
}

console.log(`map:mvp-check ok: ${markerData.markers.length} markers, ${approximateCount} approximate, ${verifiedCount} verified`);
