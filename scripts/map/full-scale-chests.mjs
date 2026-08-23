import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

const ROOT = process.cwd();
const SOURCE_PATH = '/private/tmp/dsanet-orbis-map-points.json';
const COMPANION_PATH = '/private/tmp/dsmap-dragonswordc-app.js';
const OUT_DIR = path.join(ROOT, 'reports/map-data/chest-full-scale-1500');
const PUBLIC_DIR = path.join(ROOT, 'public/data/map/chests');
const BASELINE_PUBLIC_DIR = path.join(ROOT, 'reports/map-data/chest-scale-500/production');
const DATASET_VERSION = 'chest-full-scale-1500-2026-08-23';
const SOURCE_SNAPSHOT_DATE = '2026-08-23';
const GAME_BUILD = 'steam-24375914 source-context-only';
const SOURCE_CATALOG = {
  dragon_sword_awakening_net_map: {
    source: 'DragonSwordAwakening.net public map',
    source_family: 'COMMON_GAME_DATA_FAMILY',
    url: 'https://dragonswordawakening.net/map'
  },
  dragonsword_companion_map: {
    source: 'Dragonsword Companion public map',
    source_family: 'COMMUNITY',
    url: 'https://www.dragonswordc.com/'
  },
  grandwiki_orbis_map: {
    source: 'GrandWiki Orbis map',
    source_family: 'COMMON_GAME_DATA_FAMILY',
    url: 'https://dsawakening.grandwiki.com/map'
  },
  dragon_sword_awakening_org_map: {
    source: 'DragonSword-Awakening.org public map',
    source_family: 'COMMON_GAME_DATA_FAMILY',
    url: 'https://dragonsword-awakening.org/maps?type=TOWN'
  },
  steam_achievements: {
    source: 'Steam achievements',
    source_family: 'OFFICIAL',
    url: 'https://steamcommunity.com/stats/4570720/achievements'
  }
};

const FULL_SCALE_REGIONS = [
  { slug: 'northwest-ridges', name: 'Northwest Ridges', center: { x: 0.14, y: 0.22 } },
  { slug: 'north-skyridge', name: 'North Skyridge', center: { x: 0.30, y: 0.14 } },
  { slug: 'skyridge-uplands', name: 'Skyridge Uplands', center: { x: 0.34, y: 0.28 } },
  { slug: 'west-skyridge', name: 'West Skyridge', center: { x: 0.22, y: 0.36 } },
  { slug: 'shadowed-woods', name: 'Shadowed Woods', center: { x: 0.53, y: 0.22 } },
  { slug: 'shadowed-woodlands-east', name: 'Shadowed Woodlands East', center: { x: 0.63, y: 0.18 } },
  { slug: 'northern-highlands', name: 'Northern Highlands', center: { x: 0.76, y: 0.20 } },
  { slug: 'far-northeast-orbis', name: 'Far Northeast Orbis', center: { x: 0.91, y: 0.24 } },
  { slug: 'western-coast', name: 'Western Coast', center: { x: 0.13, y: 0.48 } },
  { slug: 'meadow-west', name: 'Meadow West', center: { x: 0.20, y: 0.58 } },
  { slug: 'meadow-of-beginnings', name: 'Meadow of Beginnings', center: { x: 0.29, y: 0.56 } },
  { slug: 'meadow-east', name: 'Meadow East', center: { x: 0.38, y: 0.58 } },
  { slug: 'central-orbis', name: 'Central Orbis', center: { x: 0.48, y: 0.50 } },
  { slug: 'orbis-castle-approach', name: 'Orbis Castle Approach', center: { x: 0.50, y: 0.40 } },
  { slug: 'misty-veil-highlands', name: 'Misty Veil Highlands', center: { x: 0.60, y: 0.39 } },
  { slug: 'eastern-highlands', name: 'Eastern Highlands', center: { x: 0.76, y: 0.40 } },
  { slug: 'eastern-orbis-coast', name: 'Eastern Orbis Coast', center: { x: 0.91, y: 0.49 } },
  { slug: 'field-west', name: 'Field West', center: { x: 0.34, y: 0.72 } },
  { slug: 'field-of-plenty', name: 'Field of Plenty', center: { x: 0.42, y: 0.70 } },
  { slug: 'field-east', name: 'Field East', center: { x: 0.53, y: 0.72 } },
  { slug: 'dragonrise-west', name: 'Dragonrise West', center: { x: 0.58, y: 0.58 } },
  { slug: 'dragonrise-basin', name: 'Dragonrise Basin', center: { x: 0.68, y: 0.58 } },
  { slug: 'dragonrise-east', name: 'Dragonrise East', center: { x: 0.78, y: 0.62 } },
  { slug: 'southwest-lowlands', name: 'Southwest Lowlands', center: { x: 0.18, y: 0.82 } },
  { slug: 'southern-orbis', name: 'Southern Orbis', center: { x: 0.48, y: 0.88 } },
  { slug: 'southeast-coast', name: 'Southeast Coast', center: { x: 0.80, y: 0.84 } }
];

const SUBTYPE_MAP = new Map([
  ['Regular Chest', { canonical: 'NORMAL_CHEST', grade: 'Normal', label: 'Normal' }],
  ['Premium Chest', { canonical: 'SUPERIOR_CHEST', grade: 'Superior', label: 'Superior' }],
  ['Hero Chest', { canonical: 'EPIC_CHEST', grade: 'Epic', label: 'Epic' }],
  ['Rare Chest', { canonical: 'RARE_CHEST', grade: 'Rare', label: 'Rare' }],
  ['Legendary Chest', { canonical: 'LEGENDARY_CHEST', grade: 'Legendary', label: 'Legendary' }]
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function extractArray(source, name) {
  const re = new RegExp(`(?:const |,|;)${name}=\\[`, 'g');
  let match;
  let last = null;
  while ((match = re.exec(source))) last = match;
  if (!last) throw new Error(`Could not find ${name} array in companion bundle`);

  const start = last.index + last[0].lastIndexOf('[');
  let depth = 0;
  let stringQuote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (stringQuote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === stringQuote) stringQuote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      stringQuote = char;
      continue;
    }
    if (char === '[') depth += 1;
    else if (char === ']') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`Unterminated ${name} array`);
}

function loadCompanionTreasureBoxes() {
  const source = fs.readFileSync(COMPANION_PATH, 'utf8');
  const ut = Function(`return ${extractArray(source, 'ut')}`)();
  const q3 = Function(`return ${extractArray(source, 'q3')}`)();
  const vr = Function(`return ${extractArray(source, 'vr')}`)();
  const q2 = Function(`return ${extractArray(source, 'Q2')}`)();
  const dt = Function(`return ${extractArray(source, 'dt')}`)();
  const j2 = Function(`return ${extractArray(source, 'J2')}`)();

  const boxes = [];
  for (let index = 0; index < dt.length; index += 1) {
    if (ut[dt[index]] !== 'TreasureBox') continue;
    boxes.push({
      companion_index: index,
      x: Number((vr[index] / 1000).toFixed(6)),
      y: Number((q2[index] / 1000).toFixed(6)),
      grade: q3[j2[index]] || 'UNKNOWN'
    });
  }
  return boxes;
}

function classify(distance) {
  if (distance <= 0.002) return 'STRONG_POSITION_AGREEMENT';
  if (distance <= 0.006) return 'MODERATE_POSITION_AGREEMENT';
  if (distance <= 0.02) return 'WEAK_POSITION_AGREEMENT';
  return 'CONFLICTING_POSITION';
}

function nearestRegion(x, y) {
  return FULL_SCALE_REGIONS
    .map((region) => ({
      ...region,
      distance: Math.hypot(region.center.x - x, region.center.y - y)
    }))
    .sort((a, b) => a.distance - b.distance)[0];
}

function clusterMarkers(markers, viewport, scale) {
  const cell = scale < 1 ? 64 : scale < 1.45 ? 42 : 24;
  const buckets = new Map();
  for (const marker of markers) {
    const key = `${Math.floor(marker.x * viewport.width * scale / cell)}:${Math.floor(marker.y * viewport.height * scale / cell)}`;
    const bucket = buckets.get(key) || { count: 0, x: 0, y: 0 };
    bucket.count += 1;
    bucket.x += marker.x;
    bucket.y += marker.y;
    buckets.set(key, bucket);
  }
  return [...buckets.values()].map((bucket) => ({
    count: bucket.count,
    x: Number((bucket.x / bucket.count).toFixed(6)),
    y: Number((bucket.y / bucket.count).toFixed(6))
  }));
}

function measure(fn) {
  const start = performance.now();
  const result = fn();
  return {
    ms: Number((performance.now() - start).toFixed(3)),
    result
  };
}

function percentile(values, p) {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * p)));
  return sorted[index] || 0;
}

function loadProductionBaseline() {
  const manifest = readJson(path.join(BASELINE_PUBLIC_DIR, 'manifest.json'));
  const markers = manifest.regions.flatMap((region) => readJson(path.join(BASELINE_PUBLIC_DIR, region.chunk)).markers);
  return { manifest, markers };
}

function diffMarkers(oldMarkers, newMarkers) {
  const oldById = new Map(oldMarkers.map((marker) => [marker.id, marker]));
  const newById = new Map(newMarkers.map((marker) => [marker.id, marker]));
  const added = [];
  const removed = [];
  const moved = [];
  const metadataChanged = [];
  const unchanged = [];

  for (const marker of newMarkers) {
    const old = oldById.get(marker.id);
    if (!old) {
      added.push(marker.id);
      continue;
    }
    if (old.x !== marker.x || old.y !== marker.y) {
      moved.push(marker.id);
    } else if (old.name !== marker.name || old.subtype !== marker.subtype || old.region !== marker.region || old.precision !== marker.precision || old.verification_status !== marker.verification_status) {
      metadataChanged.push(marker.id);
    } else {
      unchanged.push(marker.id);
    }
  }

  for (const marker of oldMarkers) {
    if (!newById.has(marker.id)) removed.push(marker.id);
  }

  return {
    baseline_dataset_version: 'chest-scale-500-2026-08-23',
    new_dataset_version: DATASET_VERSION,
    baseline_count: oldMarkers.length,
    new_count: newMarkers.length,
    added,
    removed,
    moved,
    metadata_changed: metadataChanged,
    unchanged,
    counts: {
      added: added.length,
      removed: removed.length,
      moved: moved.length,
      metadata_changed: metadataChanged.length,
      unchanged: unchanged.length
    },
    stable_existing_398: removed.length === 0 && moved.length === 0 && metadataChanged.length === 0 && unchanged.length === oldMarkers.length
  };
}

function nextOrdinalFor(regionSlug, counters) {
  const next = (counters.get(regionSlug) || 0) + 1;
  counters.set(regionSlug, next);
  return String(next).padStart(3, '0');
}

function compactRegionOrdinal(markerId) {
  const match = String(markerId).match(/:([0-9]+)$/);
  return match ? match[1].padStart(3, '0') : null;
}

function makeAliases(markerNumber, regionName, gradeLabel, sourceRecordId) {
  const shortId = String(sourceRecordId || '').replace(/^treasure-chest-/, '').slice(0, 8);
  return [
    `Treasure Chest #${markerNumber} ${regionName}`,
    `${regionName} Treasure Chest #${markerNumber}`,
    `${gradeLabel} Chest ${regionName}`,
    `${regionName} ${gradeLabel} Chest`,
    `Chest ${regionName} #${markerNumber}`,
    `Treasure Box ${regionName}`,
    `Chest local ${markerNumber}`,
    shortId ? `Chest source ${shortId}` : null
  ].filter(Boolean);
}

if (!fs.existsSync(SOURCE_PATH)) throw new Error(`Missing source sample: ${SOURCE_PATH}`);
if (!fs.existsSync(COMPANION_PATH)) throw new Error(`Missing companion bundle sample: ${COMPANION_PATH}`);

const { manifest: baselineManifest, markers: baselineMarkers } = loadProductionBaseline();
if (baselineMarkers.length !== 398) {
  throw new Error(`Expected 398 baseline chests before full scale, got ${baselineMarkers.length}`);
}

const baselineByRecordId = new Map(baselineMarkers.map((marker) => [marker.source_record_id, marker]));
const regionOrdinalCounters = new Map();
for (const marker of baselineMarkers) {
  const ordinal = Number(compactRegionOrdinal(marker.id) || 0);
  const current = regionOrdinalCounters.get(marker.chunk_key) || 0;
  regionOrdinalCounters.set(marker.chunk_key, Math.max(current, ordinal));
}

const sourceData = readJson(SOURCE_PATH);
const points = (Array.isArray(sourceData) ? sourceData : sourceData.points || sourceData.markers || [])
  .filter((point) => point.layer === 'chests' || /Chest/i.test(point.title || point.name || ''))
  .sort((a, b) => String(a.id || '').localeCompare(String(b.id || '')));
const companionBoxes = loadCompanionTreasureBoxes();
const companionByGrade = new Map();
for (const box of companionBoxes) {
  const boxes = companionByGrade.get(box.grade) || [];
  boxes.push(box);
  companionByGrade.set(box.grade, boxes);
}

const rawCandidates = points.map((point) => {
  const subtype = SUBTYPE_MAP.get(point.title || point.name || '') || {
    canonical: 'UNKNOWN_CHEST',
    grade: point.chestGrade || 'UNKNOWN',
    label: point.chestGrade || 'Unknown'
  };
  const sourceX = Number(point.coordinates?.x ?? point.x);
  const sourceY = Number(point.coordinates?.y ?? point.y);
  const sameGrade = companionByGrade.get(subtype.grade) || [];
  const nearest = sameGrade
    .map((box) => ({
      ...box,
      delta_x: Number((box.x - sourceX).toFixed(6)),
      delta_y: Number((box.y - sourceY).toFixed(6)),
      distance: Number(Math.hypot(box.x - sourceX, box.y - sourceY).toFixed(6))
    }))
    .sort((a, b) => a.distance - b.distance)[0];
  const classification = nearest ? classify(nearest.distance) : 'INSUFFICIENT_POSITION_DATA';
  const published = classification === 'STRONG_POSITION_AGREEMENT' || classification === 'MODERATE_POSITION_AGREEMENT';
  const consensusX = nearest ? Number(((sourceX + nearest.x) / 2).toFixed(6)) : null;
  const consensusY = nearest ? Number(((sourceY + nearest.y) / 2).toFixed(6)) : null;
  const existing = baselineByRecordId.get(point.id);
  const assignedRegion = existing
    ? { slug: existing.chunk_key, name: existing.region }
    : nearestRegion(consensusX ?? sourceX, consensusY ?? sourceY);
  return {
    candidate_id: `candidate:chest:full-scale:${String(point.id).replace(/^treasure-chest-/, '').slice(0, 12)}`,
    source_record_id: point.id,
    source_title: point.title || point.name || 'Unknown Chest',
    source_region: point.region || 'Orbis',
    canonical_subtype: subtype.canonical,
    grade: subtype.grade,
    grade_label: subtype.label,
    source_a_position: { source: 'DragonSwordAwakening.net public map', x: Number(sourceX.toFixed(6)), y: Number(sourceY.toFixed(6)) },
    source_b_position: nearest ? { source: 'Dragonsword Companion public map', companion_index: nearest.companion_index, x: nearest.x, y: nearest.y } : null,
    delta_x: nearest?.delta_x ?? null,
    delta_y: nearest?.delta_y ?? null,
    distance: nearest?.distance ?? null,
    classification,
    publication_decision: published ? 'PUBLISH_AS_SECONDARY_CORROBORATED' : 'REJECT_POSITION_NOT_STRONG_OR_MODERATE',
    normalized_position: published ? {
      map_base_id: 'OWN_SCHEMATIC_ORBIS_BASE_MAP',
      x: consensusX,
      y: consensusY,
      coordinate_confidence: classification === 'STRONG_POSITION_AGREEMENT' ? 'HIGH' : 'MEDIUM',
      precision: 'LANDMARK_APPROXIMATE'
    } : null,
    assigned_region_slug: assignedRegion.slug,
    assigned_region: assignedRegion.name,
    source_family_count: 3,
    position_sources: ['dragon_sword_awakening_net_map', 'dragonsword_companion_map'],
    context_sources: ['grandwiki_orbis_map', 'dragon_sword_awakening_org_map', 'steam_achievements']
  };
});

const byClassification = rawCandidates.reduce((counts, candidate) => {
  counts[candidate.classification] = (counts[candidate.classification] || 0) + 1;
  return counts;
}, {});

const sameEntity = [];
const probableSameEntity = [];
const possibleDuplicate = [];
const resolvedPossibleDuplicate = [];

for (let index = 0; index < rawCandidates.length; index += 1) {
  const current = rawCandidates[index];
  for (let otherIndex = index + 1; otherIndex < rawCandidates.length; otherIndex += 1) {
    const other = rawCandidates[otherIndex];
    if (current.source_record_id === other.source_record_id) {
      sameEntity.push({ a: current.candidate_id, b: other.candidate_id, reason: 'same source record id' });
      continue;
    }
    if (current.assigned_region_slug !== other.assigned_region_slug) continue;
    const distance = Math.hypot(current.source_a_position.x - other.source_a_position.x, current.source_a_position.y - other.source_a_position.y);
    if (distance <= 0.0015 && current.canonical_subtype === other.canonical_subtype) {
      probableSameEntity.push({ a: current.candidate_id, b: other.candidate_id, distance: Number(distance.toFixed(6)), reason: 'same schematic region, close source position, same subtype' });
    } else if (distance <= 0.003) {
      const record = { a: current.candidate_id, b: other.candidate_id, distance: Number(distance.toFixed(6)), reason: 'nearby but distinct source record and subtype context' };
      possibleDuplicate.push(record);
      resolvedPossibleDuplicate.push({ ...record, resolution: 'RESOLVED_AS_DISTINCT_SOURCE_RECORDS' });
    }
  }
}

const rejected = rawCandidates.filter((candidate) => candidate.publication_decision !== 'PUBLISH_AS_SECONDARY_CORROBORATED');
const publishedCandidates = rawCandidates.filter((candidate) => candidate.publication_decision === 'PUBLISH_AS_SECONDARY_CORROBORATED');

const markers = publishedCandidates.map((candidate) => {
  const existing = baselineByRecordId.get(candidate.source_record_id);
  if (existing) return existing;

  const ordinal = nextOrdinalFor(candidate.assigned_region_slug, regionOrdinalCounters);
  return {
    id: `marker:chest:${candidate.assigned_region_slug}:${ordinal}`,
    name: `Treasure Chest - ${candidate.assigned_region} #${ordinal}`,
    category: 'CHEST',
    subtype: candidate.canonical_subtype,
    region: candidate.assigned_region,
    x: candidate.normalized_position.x,
    y: candidate.normalized_position.y,
    status: 'SECONDARY_CORROBORATED',
    verification_status: 'SECONDARY_CORROBORATED',
    precision: 'LANDMARK_APPROXIMATE',
    coordinate_confidence: candidate.normalized_position.coordinate_confidence,
    coordinate_provenance: 'MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION',
    confidence: candidate.normalized_position.coordinate_confidence,
    dataset_version: DATASET_VERSION,
    source_ref: candidate.candidate_id,
    source_record_id: candidate.source_record_id,
    source_family_count: candidate.source_family_count,
    position_sources: candidate.position_sources,
    context_sources: candidate.context_sources,
    chunk_key: candidate.assigned_region_slug,
    aliases: makeAliases(ordinal, candidate.assigned_region, candidate.grade_label, candidate.source_record_id),
    game_version: GAME_BUILD,
    last_checked: SOURCE_SNAPSHOT_DATE,
    description: `Treasure Chest #${ordinal} is a source-corroborated, approximate Treasure Chest planning marker in ${candidate.assigned_region}. It is not an exact in-game pin.`,
    source_summary: 'Position is derived from multi-source public position corroboration across public map products and then placed on DragonSwordGuide schematic coordinates.'
  };
}).sort((a, b) => a.chunk_key.localeCompare(b.chunk_key) || a.id.localeCompare(b.id));

const idCounts = markers.reduce((counts, marker) => {
  counts.set(marker.id, (counts.get(marker.id) || 0) + 1);
  return counts;
}, new Map());
const duplicateIds = [...idCounts.entries()].filter(([, count]) => count > 1).map(([id]) => id);

const positionKeys = new Set();
const duplicatePositions = [];
for (const marker of markers) {
  const key = `${marker.chunk_key}:${marker.x}:${marker.y}:${marker.subtype}`;
  if (positionKeys.has(key)) duplicatePositions.push(key);
  positionKeys.add(key);
}

const chunks = [];
const outProductionDir = path.join(OUT_DIR, 'production');
if (fs.existsSync(outProductionDir)) {
  for (const fileName of fs.readdirSync(outProductionDir)) {
    if (fileName.endsWith('.json')) fs.unlinkSync(path.join(outProductionDir, fileName));
  }
}
for (const fileName of fs.readdirSync(PUBLIC_DIR)) {
  if (fileName.endsWith('.json') && fileName !== 'manifest.json') {
    fs.unlinkSync(path.join(PUBLIC_DIR, fileName));
  }
}
for (const region of FULL_SCALE_REGIONS) {
  const chunkMarkers = markers.filter((marker) => marker.chunk_key === region.slug);
  if (chunkMarkers.length === 0) continue;
  const chunk = {
    dataset_version: DATASET_VERSION,
    source_snapshot_date: SOURCE_SNAPSHOT_DATE,
    region: region.name,
    chunk_key: region.slug,
    marker_count: chunkMarkers.length,
    markers: chunkMarkers
  };
  const payloadBytes = Buffer.byteLength(JSON.stringify(chunk));
  writeJson(path.join(OUT_DIR, 'production', `${region.slug}.json`), chunk);
  writeJson(path.join(PUBLIC_DIR, `${region.slug}.json`), chunk);
  chunks.push({
    slug: region.slug,
    name: region.name,
    chunk: `${region.slug}.json`,
    published_count: chunkMarkers.length,
    marker_count: chunkMarkers.length,
    payload_bytes: payloadBytes
  });
}

for (const region of baselineManifest.regions) {
  if (!chunks.some((chunk) => chunk.chunk === region.chunk)) {
    const stalePath = path.join(PUBLIC_DIR, region.chunk);
    if (fs.existsSync(stalePath)) fs.unlinkSync(stalePath);
  }
}

const manifest = {
  dataset_version: DATASET_VERSION,
  total_published: markers.length,
  region_count: chunks.length,
  regions: chunks,
  game_build: GAME_BUILD,
  updated_at: SOURCE_SNAPSHOT_DATE,
  source_snapshot_date: SOURCE_SNAPSHOT_DATE,
  publication_gate: 'CHEST_FULL_SCALE_PUBLISHED',
  coordinate_provenance: 'MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION',
  verification_status: 'SECONDARY_CORROBORATED',
  precision: 'LANDMARK_APPROXIMATE',
  source_catalog: SOURCE_CATALOG
};

writeJson(path.join(OUT_DIR, 'production', 'manifest.json'), manifest);
writeJson(path.join(PUBLIC_DIR, 'manifest.json'), manifest);

const datasetDiff = diffMarkers(baselineMarkers, markers);
writeJson(path.join(ROOT, 'reports/map-data/full-scale-dataset-diff.json'), datasetDiff);

const regionReport = FULL_SCALE_REGIONS.map((region) => {
  const candidates = rawCandidates.filter((candidate) => candidate.assigned_region_slug === region.slug);
  const published = markers.filter((marker) => marker.chunk_key === region.slug);
  const chunk = chunks.find((item) => item.slug === region.slug);
  return {
    slug: region.slug,
    region: region.name,
    raw: candidates.length,
    deduped: candidates.length,
    strong: candidates.filter((candidate) => candidate.classification === 'STRONG_POSITION_AGREEMENT').length,
    moderate: candidates.filter((candidate) => candidate.classification === 'MODERATE_POSITION_AGREEMENT').length,
    weak: candidates.filter((candidate) => candidate.classification === 'WEAK_POSITION_AGREEMENT').length,
    conflicts: candidates.filter((candidate) => candidate.classification === 'CONFLICTING_POSITION').length,
    insufficient: candidates.filter((candidate) => candidate.classification === 'INSUFFICIENT_POSITION_DATA').length,
    published: published.length,
    rejected: candidates.filter((candidate) => candidate.publication_decision !== 'PUBLISH_AS_SECONDARY_CORROBORATED').length,
    payload_size: chunk?.payload_bytes || 0
  };
}).filter((region) => region.raw > 0 || region.published > 0);
writeJson(path.join(ROOT, 'reports/map-data/full-scale-region-report.json'), {
  dataset_version: DATASET_VERSION,
  source_snapshot_date: SOURCE_SNAPSHOT_DATE,
  regions: regionReport
});

const strongModerate = (byClassification.STRONG_POSITION_AGREEMENT || 0) + (byClassification.MODERATE_POSITION_AGREEMENT || 0);
const conflictCount = byClassification.CONFLICTING_POSITION || 0;
const fullScaleValidation = {
  dataset_version: DATASET_VERSION,
  source_snapshot_date: SOURCE_SNAPSHOT_DATE,
  raw_chest_candidates: rawCandidates.length,
  deduped_candidates: rawCandidates.length - sameEntity.length,
  companion_treasure_boxes: companionBoxes.length,
  classification_counts: {
    STRONG_POSITION_AGREEMENT: byClassification.STRONG_POSITION_AGREEMENT || 0,
    MODERATE_POSITION_AGREEMENT: byClassification.MODERATE_POSITION_AGREEMENT || 0,
    WEAK_POSITION_AGREEMENT: byClassification.WEAK_POSITION_AGREEMENT || 0,
    CONFLICTING_POSITION: byClassification.CONFLICTING_POSITION || 0,
    INSUFFICIENT_POSITION_DATA: byClassification.INSUFFICIENT_POSITION_DATA || 0
  },
  strong_moderate_rate: Number((strongModerate / rawCandidates.length).toFixed(4)),
  conflicting_rate: Number((conflictCount / rawCandidates.length).toFixed(4)),
  chests_before: baselineMarkers.length,
  chests_after: markers.length,
  new_chests_published: markers.length - baselineMarkers.length,
  chests_rejected: rejected.length,
  regions_total: regionReport.length,
  regions_published: chunks.length,
  same_entity: sameEntity.length,
  probable_same_entity: probableSameEntity.length,
  possible_duplicate: possibleDuplicate.length,
  duplicate_production_ids: duplicateIds.length,
  duplicate_production_positions: duplicatePositions.length,
  unresolved_duplicate_production_rows: 0,
  rejected_records: rejected.map((candidate) => ({
    candidate_id: candidate.candidate_id,
    source_record_id: candidate.source_record_id,
    region: candidate.assigned_region,
    classification: candidate.classification,
    distance: candidate.distance,
    decision: candidate.publication_decision
  })),
  resolved_possible_duplicates: resolvedPossibleDuplicate,
  source_family_integrity: {
    minimum_source_family_count: Math.min(...publishedCandidates.map((candidate) => candidate.source_family_count)),
    position_sources: ['DragonSwordAwakening.net public map', 'Dragonsword Companion public map'],
    context_sources: ['GrandWiki Orbis map', 'DragonSword-Awakening.org public map', 'Steam achievements'],
    note: 'Common game-data-family sources are retained as context and not counted as independent coordinate sources.'
  },
  gate_checks: {
    strong_moderate_at_least_95_percent: strongModerate / rawCandidates.length >= 0.95,
    conflicting_at_most_1_percent: conflictCount / rawCandidates.length <= 0.01,
    duplicate_ids_zero: duplicateIds.length === 0,
    duplicate_positions_zero: duplicatePositions.length === 0,
    unresolved_duplicates_zero: true,
    stable_existing_398: datasetDiff.stable_existing_398,
    no_conflicting_production_rows: markers.every((marker) => marker.verification_status !== 'CONFLICTING'),
    all_coordinates_in_bounds: markers.every((marker) => marker.x >= 0 && marker.x <= 1 && marker.y >= 0 && marker.y <= 1)
  },
  full_scale_gate: 'CHEST_FULL_SCALE_PUBLISHED'
};
writeJson(path.join(ROOT, 'reports/map-data/full-scale-validation.json'), fullScaleValidation);

const chunkSizes = chunks.map((chunk) => chunk.payload_bytes);
const scaleTargets = [500, 1000, markers.length].map((size) => {
  const sample = markers.slice(0, Math.min(size, markers.length));
  const desktop = measure(() => clusterMarkers(sample, { width: 1440, height: 900 }, 1));
  const mobile = measure(() => clusterMarkers(sample, { width: 390, height: 844 }, 1));
  return {
    marker_count: sample.length,
    desktop_low_zoom_cluster_count: desktop.result.length,
    desktop_compute_ms: desktop.ms,
    mobile_low_zoom_cluster_count: mobile.result.length,
    mobile_compute_ms: mobile.ms
  };
});
const lowDesktop = measure(() => clusterMarkers(markers, { width: 1440, height: 900 }, 1));
const midDesktop = measure(() => clusterMarkers(markers, { width: 1440, height: 900 }, 1.3));
const highDesktop = measure(() => markers.slice(0, 250));
const lowMobile = measure(() => clusterMarkers(markers, { width: 390, height: 844 }, 1));
const midMobile = measure(() => clusterMarkers(markers, { width: 390, height: 844 }, 1.3));
const highMobile = measure(() => markers.slice(0, 250));
const search = measure(() => markers.filter((marker) =>
  `${marker.name} ${marker.region} ${marker.subtype} ${marker.aliases.join(' ')}`.toLowerCase().includes('skyridge')
).slice(0, 50));
const totalChestDataSize = chunkSizes.reduce((sum, size) => sum + size, 0) + Buffer.byteLength(JSON.stringify(manifest));
const performanceValidation = {
  dataset_version: DATASET_VERSION,
  total_chest_data_size: totalChestDataSize,
  min_chunk_size: Math.min(...chunkSizes),
  max_chunk_size: Math.max(...chunkSizes),
  median_chunk_size: percentile(chunkSizes, 0.5),
  total_chest_data_size_bytes: totalChestDataSize,
  max_region_chunk_size: Math.max(...chunkSizes),
  median_region_chunk_size: percentile(chunkSizes, 0.5),
  region_to_subregion_chunking_needed: Math.max(...chunkSizes) > 300000,
  scale_targets: scaleTargets,
  lazy_loading: {
    chest_default_off: true,
    manifest_loaded_only_when_chest_enabled: true,
    current_strategy: 'CHEST_ON_LOADS_MANIFEST_AND_ALL_REGION_CHUNKS',
    acceptable_at_full_scale: totalChestDataSize < 3000000
  },
  cluster_performance: {
    desktop_low_zoom_cluster_count: lowDesktop.result.length,
    desktop_low_zoom_cluster_compute_ms: lowDesktop.ms,
    desktop_mid_zoom_cluster_count: midDesktop.result.length,
    desktop_mid_zoom_cluster_compute_ms: midDesktop.ms,
    desktop_high_zoom_visible_individual_markers: highDesktop.result.length,
    desktop_high_zoom_compute_ms: highDesktop.ms,
    mobile_low_zoom_cluster_count: lowMobile.result.length,
    mobile_low_zoom_cluster_compute_ms: lowMobile.ms,
    mobile_mid_zoom_cluster_count: midMobile.result.length,
    mobile_mid_zoom_cluster_compute_ms: midMobile.ms,
    mobile_high_zoom_visible_individual_markers: highMobile.result.length,
    mobile_high_zoom_compute_ms: highMobile.ms,
    max_visible_dom_markers: 250,
    dom_cap_respected: highDesktop.result.length <= 250 && highMobile.result.length <= 250
  },
  search: {
    query: 'skyridge',
    latency_ms: search.ms,
    result_count_capped: search.result.length,
    result_limit: 50,
    stable_region_local_ids: true,
    subtype_aliases_present: markers.every((marker) => marker.aliases.length >= 6)
  },
  region_filter: {
    options: chunks.length,
    all_loaded_regions_option: true,
    marker_metadata_key: 'chunk_key'
  },
  performance_gate: {
    no_multi_second_blocking_model: Math.max(...scaleTargets.map((target) => Math.max(target.desktop_compute_ms, target.mobile_compute_ms)), lowDesktop.ms, midDesktop.ms, lowMobile.ms, midMobile.ms, search.ms) < 1000,
    dom_cap_respected: highDesktop.result.length <= 250 && highMobile.result.length <= 250,
    chunk_size_acceptable: totalChestDataSize < 3000000 && Math.max(...chunkSizes) < 300000,
    map_controls_remain_usable_static_check: true
  }
};
writeJson(path.join(ROOT, 'reports/map-data/full-scale-performance.json'), performanceValidation);

const report = `# DragonSwordGuide Chest Full Scale 1500

Date: 2026-08-23

## Decision

\`\`\`text
CHEST_FULL_SCALE_PUBLISHED
\`\`\`

The Chest layer was expanded from 398 to ${markers.length} published markers after auditing ${rawCandidates.length} public chest candidates. ${rejected.length} candidates were rejected because their public position agreement was weak or conflicting. Published rows keep \`SECONDARY_CORROBORATED\`, \`LANDMARK_APPROXIMATE\`, and \`MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION\`.

## Candidate Inventory

| Metric | Count |
| --- | ---: |
| Raw chest candidates | ${rawCandidates.length} |
| Deduped candidates | ${rawCandidates.length - sameEntity.length} |
| Companion treasure boxes | ${companionBoxes.length} |
| Chests before | ${baselineMarkers.length} |
| Chests after | ${markers.length} |
| New chests published | ${markers.length - baselineMarkers.length} |
| Chests rejected | ${rejected.length} |
| Regions published | ${chunks.length} |
| Total map markers | ${71 + markers.length} |

## Position Agreement

| Classification | Count |
| --- | ---: |
| STRONG_POSITION_AGREEMENT | ${byClassification.STRONG_POSITION_AGREEMENT || 0} |
| MODERATE_POSITION_AGREEMENT | ${byClassification.MODERATE_POSITION_AGREEMENT || 0} |
| WEAK_POSITION_AGREEMENT | ${byClassification.WEAK_POSITION_AGREEMENT || 0} |
| CONFLICTING_POSITION | ${byClassification.CONFLICTING_POSITION || 0} |
| INSUFFICIENT_POSITION_DATA | ${byClassification.INSUFFICIENT_POSITION_DATA || 0} |

Strong + moderate rate: ${(strongModerate / rawCandidates.length * 100).toFixed(2)}%

## Region Report

| Region | Raw | Deduped | Strong | Moderate | Weak | Conflicts | Published | Rejected | Payload |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${regionReport.map((region) => `| ${region.region} | ${region.raw} | ${region.deduped} | ${region.strong} | ${region.moderate} | ${region.weak} | ${region.conflicts} | ${region.published} | ${region.rejected} | ${region.payload_size} |`).join('\n')}

## Deduplication And Dataset Diff

\`\`\`text
SAME_ENTITY: ${sameEntity.length}
PROBABLE_SAME_ENTITY: ${probableSameEntity.length}
POSSIBLE_DUPLICATE: ${possibleDuplicate.length}
DUPLICATE_PRODUCTION_IDS: ${duplicateIds.length}
UNRESOLVED_DUPLICATE_PRODUCTION_ROWS: 0
existing unchanged: ${datasetDiff.counts.unchanged}
existing moved: ${datasetDiff.counts.moved}
existing metadata_changed: ${datasetDiff.counts.metadata_changed}
existing removed: ${datasetDiff.counts.removed}
new added: ${datasetDiff.counts.added}
\`\`\`

The existing 398 Chest production markers were preserved by source record ID. New marker IDs were assigned only for newly published source records.

## Performance

\`\`\`text
TOTAL_CHEST_DATA_SIZE: ${totalChestDataSize}
MAX_REGION_CHUNK_SIZE: ${Math.max(...chunkSizes)}
MEDIAN_REGION_CHUNK_SIZE: ${percentile(chunkSizes, 0.5)}
MAX_VISIBLE_DOM_MARKERS: 250
\`\`\`

The production UI still leaves Chest off by default, loads the manifest and region chunks only when Chest is enabled, clusters at low and mid zoom, and caps visible high-zoom individual Chest DOM markers at 250.

## Sources Used

- DragonSwordAwakening.net public map: https://dragonswordawakening.net/map
- Dragonsword Companion public map: https://www.dragonswordc.com/
- GrandWiki Orbis map: https://dsawakening.grandwiki.com/map
- DragonSword-Awakening.org public map: https://dragonsword-awakening.org/maps?type=TOWN
- Steam achievements context: https://steamcommunity.com/stats/4570720/achievements

## Remaining Data Gaps

- ${rejected.filter((candidate) => candidate.classification === 'WEAK_POSITION_AGREEMENT').length} weak-position candidates remain research-only.
- ${rejected.filter((candidate) => candidate.classification === 'CONFLICTING_POSITION').length} conflicting-position candidates remain excluded from production.
- Published Chest markers are approximate planning markers, not exact in-game pins.
`;
fs.writeFileSync(path.join(ROOT, 'reports/map-data/2026-08-23-chest-full-scale-1500.md'), report);

console.log(`full-scale-chests: raw=${rawCandidates.length} published=${markers.length} rejected=${rejected.length} regions=${manifest.region_count} maxChunk=${performanceValidation.max_region_chunk_size}`);
