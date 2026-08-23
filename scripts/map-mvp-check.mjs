import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataPath = path.join(root, 'src/data/map-markers.json');
const htmlPath = path.join(root, 'dist/map/index.html');
const sourcePath = path.join(root, 'src/pages/map/index.astro');
const organaSprint2ReportPath = path.join(root, 'reports/map-product/2026-08-23-organa-expansion-sprint-2.md');
const allowedCategories = new Set(['EONAS_LEGACY', 'ORGANA_STATUE']);
const allowedVerificationStatuses = new Set([
  'OFFICIAL_VERIFIED',
  'FIRST_HAND_VERIFIED',
  'VIDEO_VERIFIED',
  'SECONDARY_CORROBORATED',
  'APPROXIMATE',
  'CONFLICTING',
]);
const allowedPrecisions = new Set([
  'REGION_APPROXIMATE',
  'LANDMARK_APPROXIMATE',
  'VISUALLY_CORROBORATED',
  'APPROXIMATE',
]);
const allowedConfidence = new Set(['LOW', 'MEDIUM', 'HIGH']);
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
  'evidence',
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

if (!Array.isArray(markerData.markers) || markerData.markers.length < 16) {
  fail('expected at least 16 production beta markers after Organa expansion sprint 2');
}

const ids = new Set();
let approximateCount = 0;
let verifiedCount = 0;
let eonaSecondaryCount = 0;
let organaCount = 0;

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

  if (!allowedVerificationStatuses.has(marker.verification_status)) {
    fail(`${marker.id} has invalid verification status ${marker.verification_status}`);
  }

  if (!allowedPrecisions.has(marker.precision)) {
    fail(`${marker.id} has invalid precision ${marker.precision}`);
  }

  if (!allowedConfidence.has(marker.confidence)) {
    fail(`${marker.id} has invalid confidence ${marker.confidence}`);
  }

  if (!Array.isArray(marker.evidence)) {
    fail(`${marker.id} evidence must be an array`);
  }

  for (const evidence of marker.evidence) {
    if (!evidence.type || !evidence.source || !evidence.url || !evidence.note) {
      fail(`${marker.id} has incomplete evidence item`);
    }

    if (evidence.type === 'RESEARCH_ONLY_NOT_FOR_PRODUCTION') {
      fail(`${marker.id} exposes research-only evidence`);
    }
  }

  if (typeof marker.x !== 'number' || marker.x < 0 || marker.x > 1 || typeof marker.y !== 'number' || marker.y < 0 || marker.y > 1) {
    fail(`${marker.id} must use normalized x/y coordinates`);
  }

  if (marker.precision === 'APPROXIMATE' || marker.precision.endsWith('_APPROXIMATE')) {
    approximateCount += 1;
  }

  if (marker.verification_status === 'FIRST_HAND_VERIFIED' || marker.verification_status === 'OFFICIAL_VERIFIED' || marker.verification_status === 'VIDEO_VERIFIED') {
    verifiedCount += 1;
  }

  if (marker.category === 'EONAS_LEGACY' && marker.verification_status === 'SECONDARY_CORROBORATED') {
    eonaSecondaryCount += 1;
  }

  if (marker.category === 'ORGANA_STATUE') {
    organaCount += 1;

    if (marker.id.includes('-beta') || marker.name.toLowerCase().includes('candidate')) {
      fail(`${marker.id} must be a named Organa production marker, not a generic beta placeholder`);
    }
  }
}

if (approximateCount < 4) {
  fail('MVP should clearly publish approximate beta markers');
}

if (verifiedCount !== 0) {
  fail('MVP must not claim verified markers without first-hand evidence');
}

if (eonaSecondaryCount < 3) {
  fail('expected at least 3 secondary-corroborated Eona markers');
}

if (organaCount < 13) {
  fail('expected at least 13 named Organa markers after expansion sprint 2');
}

if (markerData.category_status?.ORGANA_STATUE?.count_conflict !== '13_VS_14_CONFLICT_RETAINED') {
  fail('Organa 13 vs 14 count conflict must be retained in production metadata');
}

if (markerData.category_status?.ORGANA_STATUE?.published_count !== 13) {
  fail('Organa published_count must be 13 after expansion sprint 2');
}

if (markerData.category_status?.ORGANA_STATUE?.estimated_total !== '13-14') {
  fail('Organa estimated_total must remain 13-14 until the extra/missing entry is identified');
}

if (markerData.category_status?.ORGANA_STATUE?.conflict_verdict !== 'UNRESOLVED_13_VS_14') {
  fail('Organa conflict_verdict must stay UNRESOLVED_13_VS_14 without a named 14th entry');
}

if (!fs.existsSync(organaSprint2ReportPath)) {
  fail('missing reports/map-product/2026-08-23-organa-expansion-sprint-2.md');
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
  '13_VS_14_CONFLICT_RETAINED',
  'UNRESOLVED_13_VS_14',
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
