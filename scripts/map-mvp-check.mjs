import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataPath = path.join(root, 'src/data/map-markers.json');
const htmlPath = path.join(root, 'dist/map/index.html');
const sourcePath = path.join(root, 'src/pages/map/index.astro');
const chestManifestPath = path.join(root, 'public/data/map/chests/manifest.json');
const organaSprint2ReportPath = path.join(root, 'reports/map-product/2026-08-23-organa-expansion-sprint-2.md');
const warpSprintReportPath = path.join(root, 'reports/map-product/2026-08-23-warp-points-expansion-sprint.md');
const warpCompletionSprintReportPath = path.join(root, 'reports/map-product/2026-08-23-warp-points-completion-sprint.md');
const dungeonSprintReportPath = path.join(root, 'reports/map-product/2026-08-23-dungeons-expansion-sprint.md');
const dungeonCompletionSprintReportPath = path.join(root, 'reports/map-product/2026-08-23-dungeons-completion-sprint.md');
const bossesSprintReportPath = path.join(root, 'reports/map-product/2026-08-23-bosses-expansion-sprint.md');
const allowedCategories = new Set(['EONAS_LEGACY', 'ORGANA_STATUE', 'WARP_POINT', 'DUNGEON', 'BOSS']);
const allowedDungeonSubtypes = new Set(['NORMAL_DUNGEON', 'TRAIT_DUNGEON', 'CURRENCY_DUNGEON', 'STORY_DUNGEON']);
const allowedBossSubtypes = new Set(['FIELD_BOSS', 'WORLD_BOSS', 'OTHER']);
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
const chestManifest = readJson(chestManifestPath);
const chestPublishedCount = chestManifest.total_published;

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

if (chestPublishedCount !== 1484) {
  fail('expected 1484 full-scale Treasure Chest markers in public chest manifest');
}

for (const region of chestManifest.regions || []) {
  const chunk = readJson(path.join(root, 'public/data/map/chests', region.chunk));
  if (chunk.marker_count < 1 || chunk.marker_count > 150 || chunk.markers.length !== chunk.marker_count) {
    fail(`expected 1-150 Treasure Chest markers in ${region.chunk}`);
  }
}

const ids = new Set();
let approximateCount = 0;
let verifiedCount = 0;
let eonaSecondaryCount = 0;
let organaCount = 0;
let warpCount = 0;
let warpSecondaryCount = 0;
let warpApproximateCount = 0;
let warpAliasCount = 0;
let dungeonCount = 0;
let dungeonSecondaryCount = 0;
let dungeonApproximateCount = 0;
let dungeonAliasCount = 0;
let bossCount = 0;
let bossSecondaryCount = 0;
let bossApproximateCount = 0;
let bossAliasCount = 0;
const dungeonCanonicalNames = new Set();
const bossCanonicalNames = new Set();

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

  if ('aliases' in marker && (!Array.isArray(marker.aliases) || marker.aliases.some((alias) => typeof alias !== 'string' || alias.trim().length < 3))) {
    fail(`${marker.id} aliases must be an array of searchable strings`);
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

  if (marker.category === 'WARP_POINT') {
    warpCount += 1;

    if (marker.verification_status === 'SECONDARY_CORROBORATED') {
      warpSecondaryCount += 1;
    }

    if (marker.precision === 'APPROXIMATE' || marker.precision.endsWith('_APPROXIMATE')) {
      warpApproximateCount += 1;
    }

    if (!Array.isArray(marker.aliases) || marker.aliases.length < 3) {
      fail(`${marker.id} must include searchable Warp/Fast Travel/Waypoint aliases`);
    }

    if (!marker.aliases.some((alias) => alias.toLowerCase().includes('fast travel'))) {
      fail(`${marker.id} must include a Fast Travel alias`);
    }

    if (!marker.navigation_note || marker.navigation_note.includes('unlock condition verified')) {
      fail(`${marker.id} must include an honest navigation_note without unverified unlock claims`);
    }

    warpAliasCount += marker.aliases.length;
  }

  if (marker.category === 'DUNGEON') {
    dungeonCount += 1;

    const canonicalName = marker.name.toLowerCase();
    if (dungeonCanonicalNames.has(canonicalName)) {
      fail(`duplicate canonical Dungeon marker name ${marker.name}`);
    }
    dungeonCanonicalNames.add(canonicalName);

    if (!marker.subtype || !allowedDungeonSubtypes.has(marker.subtype)) {
      fail(`${marker.id} must include a valid Dungeon subtype`);
    }

    if (marker.verification_status === 'SECONDARY_CORROBORATED') {
      dungeonSecondaryCount += 1;
    }

    if (marker.precision === 'APPROXIMATE' || marker.precision.endsWith('_APPROXIMATE')) {
      dungeonApproximateCount += 1;
    }

    if (!Array.isArray(marker.aliases) || marker.aliases.length < 3) {
      fail(`${marker.id} must include searchable Dungeon aliases`);
    }

    if (!marker.aliases.some((alias) => alias.toLowerCase().includes('entrance'))) {
      fail(`${marker.id} must include an entrance alias`);
    }

    if (!marker.activity_note || /recommended level|party size|loot table|unlock condition/i.test(marker.activity_note)) {
      fail(`${marker.id} must include a safe activity_note without unverified mechanics`);
    }

    dungeonAliasCount += marker.aliases.length;
  }

  if (marker.category === 'BOSS') {
    bossCount += 1;

    const canonicalName = marker.name.toLowerCase();
    if (bossCanonicalNames.has(canonicalName)) {
      fail(`duplicate canonical Boss marker name ${marker.name}`);
    }
    bossCanonicalNames.add(canonicalName);

    if (!marker.subtype || !allowedBossSubtypes.has(marker.subtype)) {
      fail(`${marker.id} must include a valid Boss subtype`);
    }

    if (marker.verification_status === 'SECONDARY_CORROBORATED') {
      bossSecondaryCount += 1;
    }

    if (marker.precision === 'APPROXIMATE' || marker.precision.endsWith('_APPROXIMATE')) {
      bossApproximateCount += 1;
    }

    if (!Array.isArray(marker.aliases) || marker.aliases.length < 3) {
      fail(`${marker.id} must include searchable Boss aliases`);
    }

    if (!marker.aliases.some((alias) => alias.toLowerCase().includes('field boss'))) {
      fail(`${marker.id} must include a Field Boss alias`);
    }

    if (!marker.location_note || /respawn|spawn schedule|drop rate|loot table|recommended power|party size/i.test(marker.location_note)) {
      fail(`${marker.id} must include a safe location_note without unverified mechanics`);
    }

    if (/respawn|spawn schedule|drop rate|loot table|recommended power|party size/i.test(marker.description)) {
      fail(`${marker.id} description must not claim unverified boss mechanics`);
    }

    bossAliasCount += marker.aliases.length;
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

if (markerData.markers.length < 24) {
  fail('expected at least 24 production beta markers after Warp Points sprint B1');
}

if (warpCount < 20) {
  fail('expected 20 Warp Point markers after completion sprint B3');
}

if (warpSecondaryCount !== warpCount) {
  fail('all published Warp Point pilot markers should be SECONDARY_CORROBORATED');
}

if (warpApproximateCount !== warpCount) {
  fail('all published Warp Point pilot markers should retain approximate precision');
}

if (warpAliasCount < warpCount * 3) {
  fail('Warp Point aliases are too sparse for search coverage');
}

if (markerData.markers.length < 57) {
  fail('expected at least 57 production beta markers after Warp completion sprint B3');
}

if (markerData.markers.length < 66) {
  fail('expected at least 66 production beta markers after Boss sprint B4');
}

if (markerData.markers.length < 71) {
  fail('expected at least 71 production beta markers after Dungeon completion sprint B5');
}

if (dungeonCount < 26) {
  fail('expected at least 26 Dungeon pilot markers after completion sprint B5');
}

if (dungeonSecondaryCount !== dungeonCount) {
  fail('all published Dungeon pilot markers should be SECONDARY_CORROBORATED');
}

if (dungeonApproximateCount !== dungeonCount) {
  fail('all published Dungeon pilot markers should retain approximate precision');
}

if (dungeonAliasCount < dungeonCount * 3) {
  fail('Dungeon aliases are too sparse for search coverage');
}

if (bossCount < 9) {
  fail('expected at least 9 open-world Boss markers after sprint B4');
}

if (bossSecondaryCount !== bossCount) {
  fail('all published Boss pilot markers should be SECONDARY_CORROBORATED');
}

if (bossApproximateCount !== bossCount) {
  fail('all published Boss pilot markers should retain approximate precision');
}

if (bossAliasCount < bossCount * 3) {
  fail('Boss aliases are too sparse for search coverage');
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

if (!fs.existsSync(warpSprintReportPath)) {
  fail('missing reports/map-product/2026-08-23-warp-points-expansion-sprint.md');
}

if (!fs.existsSync(warpCompletionSprintReportPath)) {
  fail('missing reports/map-product/2026-08-23-warp-points-completion-sprint.md');
}

if (!fs.existsSync(dungeonSprintReportPath)) {
  fail('missing reports/map-product/2026-08-23-dungeons-expansion-sprint.md');
}

if (!fs.existsSync(dungeonCompletionSprintReportPath)) {
  fail('missing reports/map-product/2026-08-23-dungeons-completion-sprint.md');
}

if (!fs.existsSync(bossesSprintReportPath)) {
  fail('missing reports/map-product/2026-08-23-bosses-expansion-sprint.md');
}

const warpStatus = markerData.category_status?.WARP_POINT;

if (!warpStatus) {
  fail('missing category_status.WARP_POINT');
}

if (warpStatus.published_count !== warpCount) {
  fail('WARP_POINT published_count must match production markers');
}

if (warpStatus.estimated_total !== '~20') {
  fail('WARP_POINT estimated_total must be ~20 until better evidence is available');
}

if (warpStatus.known_candidates !== 20) {
  fail('WARP_POINT known_candidates must retain the public 20 mapped count');
}

if (warpStatus.source_count < 4) {
  fail('WARP_POINT source_count must include at least four source groups');
}

if (warpStatus.coverage !== '20 published / 20 known') {
  fail('WARP_POINT coverage must stay honest for Sprint B3');
}

const dungeonStatus = markerData.category_status?.DUNGEON;

if (!dungeonStatus) {
  fail('missing category_status.DUNGEON');
}

if (dungeonStatus.published_count !== dungeonCount) {
  fail('DUNGEON published_count must match production markers');
}

if (dungeonStatus.known_candidates !== 26) {
  fail('DUNGEON known_candidates must retain the public 26 mapped entrance count');
}

if (dungeonStatus.true_mapped_entrance_total !== 26) {
  fail('DUNGEON true_mapped_entrance_total must reconcile the 26 independent world-map entrances');
}

if (dungeonStatus.estimated_total !== '26 mapped entrances / 30 activity records / 69 broad taxonomy records') {
  fail('DUNGEON estimated_total must separate mapped entrances from activity databases');
}

if (dungeonStatus.coverage !== '26 published / 26 mapped entrances') {
  fail('DUNGEON coverage must stay honest for Sprint B5');
}

if (Array.isArray(dungeonStatus.unpublished_location_unresolved) && dungeonStatus.unpublished_location_unresolved.length !== 0) {
  fail('DUNGEON unpublished_location_unresolved should be empty after Sprint B5 reconciliation');
}

const bossStatus = markerData.category_status?.BOSS;

if (!bossStatus) {
  fail('missing category_status.BOSS');
}

if (bossStatus.published_count !== bossCount) {
  fail('BOSS published_count must match production markers');
}

if (bossStatus.known_candidates !== 9) {
  fail('BOSS known_candidates must retain the public 9 mapped Field Boss count');
}

if (bossStatus.estimated_total !== '9 mapped Field Bosses') {
  fail('BOSS estimated_total must separate open-world Field Bosses from dungeon/raid/internal bosses');
}

if (bossStatus.field_boss_count !== 9) {
  fail('BOSS field_boss_count must be 9 for the Sprint B4 published set');
}

if (bossStatus.coverage !== '9 published / 9 mapped Field Bosses') {
  fail('BOSS coverage must stay honest for Sprint B4');
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
  'data-marker-aliases',
  'data-category-filter',
  'data-marker-category="WARP_POINT"',
  'data-marker-category="DUNGEON"',
  'data-marker-category="BOSS"',
  'data-chest-marker-count="1484"',
  'data-chest-manifest-url="/data/map/chests/manifest.json"',
  'data-chest-region-filter',
  'data-marker-subtype',
  'Treasure Chests',
  'Warp Points',
  'Dungeons',
  'Bosses',
  'marker:warp-point:orbis-royal-castle',
  'marker:warp-point:twilight-field',
  'marker:warp-point:seagull-village',
  'marker:dungeon:warg-cave',
  'marker:dungeon:dragon-worshipper-ruins',
  'marker:dungeon:dragon-disciples-hideout',
  'marker:dungeon:nest-of-the-great-worm',
  'marker:dungeon:altar-of-the-dragon',
  'marker:dungeon:tomb-of-greed',
  'marker:dungeon:where-the-giant-sleeps',
  'marker:boss:scraping-brack',
  'marker:boss:horg-the-roamer',
  'marker:boss:flaming-ash-feather-lavanis',
  '20 published / 20 known',
  '26 published / 26 mapped entrances',
  '9 published / 9 mapped Field Bosses',
  '1,484 Treasure Chest planning markers across 20 schematic regions',
  'Chest coverage is full-scale published for strong and moderate public position agreement',
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

const chestFilterMatch = html.match(/<input[^>]+data-category-filter[^>]+value="CHEST"[^>]*>/);
if (!chestFilterMatch) {
  fail('dist map page missing CHEST category filter');
}

if (/\schecked(?:\s|>|=)/.test(chestFilterMatch[0])) {
  fail('CHEST category filter must be unchecked by default');
}

if (!html.includes('<strong data-astro-cid-nky5wbf5>1555</strong> beta markers') && !html.includes('1555</strong> beta markers')) {
  fail('dist map page missing total 1555 beta marker count');
}

if (!/<h1[^>]*>\s*DragonSword Awakening Interactive Map\s*<\/h1>/.test(html)) {
  fail('dist map page missing exact H1 text');
}

console.log(`map:mvp-check ok: ${markerData.markers.length} markers, ${approximateCount} approximate, ${verifiedCount} verified`);
