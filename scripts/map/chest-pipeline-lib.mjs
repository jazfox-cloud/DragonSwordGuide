import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

export const ROOT = process.cwd();
export const PILOT_DIR = path.join(ROOT, 'reports/map-data/chest-pilot');
export const DATASET_VERSION = 'chest-pilot-2026-08-23';
export const SNAPSHOT_DATE = '2026-08-23';
export const GAME_BUILD = 'steam-24375914 source-context-only';
export const SOURCE_PATH = '/private/tmp/dsanet-orbis-map-points.json';

export const PILOT_REGIONS = [
  {
    slug: 'meadow-of-beginnings',
    name: 'Meadow of Beginnings',
    // Research-only pilot window around existing DSG schematic anchors.
    box: { minX: 0.18, maxX: 0.37, minY: 0.48, maxY: 0.66 },
    target: 40
  },
  {
    slug: 'field-of-plenty',
    name: 'Field of Plenty',
    box: { minX: 0.32, maxX: 0.52, minY: 0.62, maxY: 0.78 },
    target: 40
  }
];

export const SOURCE_INVENTORY = [
  {
    source: 'DragonSwordAwakening.net Orbis map sample',
    source_family: 'COMMON_GAME_DATA_FAMILY',
    url: 'https://dragonswordawakening.net/map',
    role: 'candidate_source_position_research_only',
    allowed_use: 'SINGLE_FACT_REFERENCE'
  },
  {
    source: 'DragonSword-Awakening.org public map',
    source_family: 'COMMON_GAME_DATA_FAMILY',
    url: 'https://dragonsword-awakening.org/maps?type=TOWN',
    role: 'count_category_context',
    allowed_use: 'COUNT_ONLY'
  },
  {
    source: 'GrandWiki Orbis map manifest',
    source_family: 'COMMON_GAME_DATA_FAMILY',
    url: 'https://dsawakening.grandwiki.com/map',
    role: 'count_version_context',
    allowed_use: 'SCHEMA_REFERENCE_ONLY'
  },
  {
    source: 'Steam store context',
    source_family: 'OFFICIAL',
    url: 'https://store.steampowered.com/app/4570720/DragonSword__Awakening/',
    role: 'official_world_context',
    allowed_use: 'SINGLE_FACT_REFERENCE'
  }
];

const SUBTYPE_MAP = new Map([
  ['Regular Chest', { source: 'Regular Chest', subtype: 'REGULAR_CHEST', canonical: 'NORMAL_CHEST' }],
  ['Premium Chest', { source: 'Premium Chest', subtype: 'PREMIUM_CHEST', canonical: 'SUPERIOR_CHEST' }],
  ['Hero Chest', { source: 'Hero Chest', subtype: 'HERO_CHEST', canonical: 'EPIC_CHEST' }],
  ['Rare Chest', { source: 'Rare Chest', subtype: 'RARE_CHEST', canonical: 'RARE_CHEST' }],
  ['Legendary Chest', { source: 'Legendary Chest', subtype: 'LEGENDARY_CHEST', canonical: 'LEGENDARY_CHEST' }]
]);

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getPointCoordinates(point) {
  const x = point.coordinates?.x ?? point.x;
  const y = point.coordinates?.y ?? point.y;
  return { x: Number(x), y: Number(y) };
}

export function getSubtype(title) {
  return SUBTYPE_MAP.get(title) ?? {
    source: title || 'Unknown Chest',
    subtype: 'UNKNOWN_CHEST',
    canonical: 'UNKNOWN_CHEST'
  };
}

export function sourceFamiliesFor(candidate) {
  return [...new Set(candidate.source_ids.map((source) => source.source_family))];
}

export function ensureCandidateShape(candidate) {
  const required = [
    'candidate_id',
    'source_ids',
    'source_families',
    'name',
    'category',
    'subtype',
    'source_subtype',
    'canonical_subtype',
    'region',
    'source_positions',
    'normalized_position',
    'coordinate_gate',
    'verification_status',
    'confidence',
    'game_build',
    'dataset_version',
    'source_snapshot_date',
    'last_checked',
    'dedupe',
    'conflicts',
    'publication',
    'notes'
  ];
  for (const field of required) {
    if (!(field in candidate)) {
      throw new Error(`candidate ${candidate.candidate_id || 'UNKNOWN'} missing ${field}`);
    }
  }
  if (candidate.category !== 'CHEST') {
    throw new Error(`candidate ${candidate.candidate_id} has invalid category ${candidate.category}`);
  }
  for (const position of candidate.source_positions) {
    if (position.x != null && (position.x < 0 || position.x > 1)) {
      throw new Error(`candidate ${candidate.candidate_id} source x out of bounds`);
    }
    if (position.y != null && (position.y < 0 || position.y > 1)) {
      throw new Error(`candidate ${candidate.candidate_id} source y out of bounds`);
    }
  }
  const normalized = candidate.normalized_position;
  if (normalized.x != null && (normalized.x < 0 || normalized.x > 1)) {
    throw new Error(`candidate ${candidate.candidate_id} normalized x out of bounds`);
  }
  if (normalized.y != null && (normalized.y < 0 || normalized.y > 1)) {
    throw new Error(`candidate ${candidate.candidate_id} normalized y out of bounds`);
  }
}

export function makeCandidate(point, region, ordinal) {
  const { x, y } = getPointCoordinates(point);
  const title = point.title || point.name || 'Unknown Chest';
  const subtype = getSubtype(title);
  const stableSuffix = String(ordinal).padStart(2, '0');
  const shortId = String(point.id || `unknown-${ordinal}`).replace(/^treasure-chest-/, '').slice(0, 8);
  const candidateId = `candidate:chest:${region.slug}:${stableSuffix}-${shortId}`;
  const candidate = {
    candidate_id: candidateId,
    source_ids: [
      {
        source: 'DragonSwordAwakening.net Orbis map sample',
        source_family: 'COMMON_GAME_DATA_FAMILY',
        record_id: point.id || null,
        url: 'https://dragonswordawakening.net/map',
        allowed_use: 'SINGLE_FACT_REFERENCE',
        snapshot_hash: null
      },
      {
        source: 'DragonSword-Awakening.org public map count context',
        source_family: 'COMMON_GAME_DATA_FAMILY',
        record_id: null,
        url: 'https://dragonsword-awakening.org/maps?type=TOWN',
        allowed_use: 'COUNT_ONLY',
        snapshot_hash: null
      },
      {
        source: 'GrandWiki Orbis map manifest count context',
        source_family: 'COMMON_GAME_DATA_FAMILY',
        record_id: null,
        url: 'https://dsawakening.grandwiki.com/map',
        allowed_use: 'SCHEMA_REFERENCE_ONLY',
        snapshot_hash: null
      },
      {
        source: 'Steam official open-world context',
        source_family: 'OFFICIAL',
        record_id: null,
        url: 'https://store.steampowered.com/app/4570720/DragonSword__Awakening/',
        allowed_use: 'SINGLE_FACT_REFERENCE',
        snapshot_hash: null
      }
    ],
    source_families: ['COMMON_GAME_DATA_FAMILY', 'OFFICIAL'],
    name: `Treasure Chest - ${region.name} #${stableSuffix}`,
    category: 'CHEST',
    subtype: subtype.subtype,
    source_subtype: subtype.source,
    canonical_subtype: subtype.canonical,
    region: {
      world: 'Orbis',
      region_name: region.name,
      subregion_name: null,
      landmark_hint: null
    },
    source_positions: [
      {
        source: 'DragonSwordAwakening.net Orbis map sample',
        coordinate_model: 'NORMALIZED_0_1',
        x: Number(x.toFixed(6)),
        y: Number(y.toFixed(6)),
        tile: null,
        precision: 'EXACT_SOURCE_VALUE',
        reuse_status: 'RESEARCH_ONLY_DO_NOT_COPY'
      }
    ],
    normalized_position: {
      map_base_id: null,
      x: null,
      y: null,
      coordinate_confidence: 'UNRESOLVED',
      precision: 'UNRESOLVED'
    },
    coordinate_gate: 'POSITION_RESEARCH_ONLY',
    verification_status: 'GAME_DATA_CORROBORATED',
    confidence: 'MEDIUM',
    game_build: GAME_BUILD,
    dataset_version: DATASET_VERSION,
    source_snapshot_date: SNAPSHOT_DATE,
    last_checked: SNAPSHOT_DATE,
    dedupe: {
      dedupe_status: 'UNREVIEWED',
      canonical_candidate_id: null,
      matches: []
    },
    conflicts: [],
    publication: {
      status: 'RESEARCH_ONLY',
      diff_status: 'NEW',
      published_marker_id: null
    },
    notes: 'Research-only pilot candidate. Region bucket is limited to the DragonSwordGuide pilot window; source coordinates are not production truth.'
  };
  ensureCandidateShape(candidate);
  return candidate;
}

export function loadCandidateSnapshot(filePath = path.join(PILOT_DIR, 'candidate-snapshot.json')) {
  const snapshot = readJson(filePath);
  if (!Array.isArray(snapshot.candidates)) {
    throw new Error(`${filePath} missing candidates array`);
  }
  return snapshot;
}

export function pointDistance(a, b) {
  const ax = a.source_positions[0]?.x;
  const ay = a.source_positions[0]?.y;
  const bx = b.source_positions[0]?.x;
  const by = b.source_positions[0]?.y;
  if ([ax, ay, bx, by].some((value) => typeof value !== 'number')) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.hypot(ax - bx, ay - by);
}

export function clusterCandidates(candidates, viewport = { width: 390, height: 844 }, zoom = 0.55) {
  const cell = zoom < 0.75 ? 64 : zoom < 1.4 ? 40 : 24;
  const buckets = new Map();
  for (const candidate of candidates) {
    const sourcePosition = candidate.source_positions[0];
    if (!sourcePosition || sourcePosition.x == null || sourcePosition.y == null) continue;
    const sx = sourcePosition.x * viewport.width * zoom;
    const sy = sourcePosition.y * viewport.height * zoom;
    const key = `${Math.floor(sx / cell)}:${Math.floor(sy / cell)}`;
    const bucket = buckets.get(key) || {
      count: 0,
      ids: [],
      x: 0,
      y: 0
    };
    bucket.count += 1;
    bucket.x += sourcePosition.x;
    bucket.y += sourcePosition.y;
    if (bucket.ids.length < 5) bucket.ids.push(candidate.candidate_id);
    buckets.set(key, bucket);
  }
  return [...buckets.values()].map((bucket) => ({
    count: bucket.count,
    x: Number((bucket.x / bucket.count).toFixed(6)),
    y: Number((bucket.y / bucket.count).toFixed(6)),
    sample_ids: bucket.ids
  }));
}

export function measure(fn) {
  const start = performance.now();
  const result = fn();
  return {
    ms: Number((performance.now() - start).toFixed(3)),
    result
  };
}
