import fs from 'node:fs';
import path from 'node:path';
import {
  DATASET_VERSION,
  GAME_BUILD,
  PILOT_DIR,
  PILOT_REGIONS,
  SNAPSHOT_DATE,
  ensureCandidateShape,
  loadCandidateSnapshot,
  readJson,
  writeJson
} from './chest-pipeline-lib.mjs';

const companionPath = '/private/tmp/dsmap-dragonswordc-app.js';

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
  if (!fs.existsSync(companionPath)) {
    throw new Error(`Missing companion public bundle sample: ${companionPath}`);
  }

  const source = fs.readFileSync(companionPath, 'utf8');
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

function canonicalGrade(candidate) {
  return candidate.canonical_subtype
    .replace('_CHEST', '')
    .split('_')
    .map((part) => `${part.slice(0, 1)}${part.slice(1).toLowerCase()}`)
    .join(' ');
}

function classify(distance) {
  if (distance <= 0.002) return 'STRONG_POSITION_AGREEMENT';
  if (distance <= 0.006) return 'MODERATE_POSITION_AGREEMENT';
  if (distance <= 0.02) return 'WEAK_POSITION_AGREEMENT';
  return 'CONFLICTING_POSITION';
}

function updateCandidate(candidate, match) {
  const sourcePosition = candidate.source_positions[0];
  const consensusX = Number(((sourcePosition.x + match.x) / 2).toFixed(6));
  const consensusY = Number(((sourcePosition.y + match.y) / 2).toFixed(6));

  const next = {
    ...candidate,
    source_ids: [
      ...candidate.source_ids,
      {
        source: 'Dragonsword Companion public map',
        source_family: 'COMMUNITY',
        record_id: `companion-index-${match.companion_index}`,
        url: 'https://www.dragonswordc.com/',
        allowed_use: 'SINGLE_FACT_REFERENCE',
        snapshot_hash: null
      }
    ],
    source_families: ['COMMON_GAME_DATA_FAMILY', 'COMMUNITY', 'OFFICIAL'],
    source_positions: [
      ...candidate.source_positions,
      {
        source: 'Dragonsword Companion public map',
        coordinate_model: 'NORMALIZED_0_1',
        x: match.x,
        y: match.y,
        tile: null,
        precision: 'APPROXIMATE',
        reuse_status: 'RESEARCH_ONLY_DO_NOT_COPY'
      }
    ],
    normalized_position: {
      map_base_id: 'OWN_SCHEMATIC_ORBIS_BASE_MAP',
      x: consensusX,
      y: consensusY,
      coordinate_confidence: match.classification === 'STRONG_POSITION_AGREEMENT' ? 'HIGH' : 'MEDIUM',
      precision: 'LANDMARK_APPROXIMATE'
    },
    coordinate_gate: 'MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION',
    verification_status: 'SECONDARY_CORROBORATED',
    confidence: match.classification === 'STRONG_POSITION_AGREEMENT' ? 'HIGH' : 'MEDIUM',
    publication: {
      status: 'PUBLISHED',
      diff_status: 'NEW',
      published_marker_id: candidate.candidate_id.replace('candidate:', 'marker:')
    },
    notes: `${candidate.notes} Public position recovery: ${match.classification}, distance ${match.distance}.`
  };

  ensureCandidateShape(next);
  return next;
}

const snapshot = loadCandidateSnapshot(path.join(PILOT_DIR, 'deduped-snapshot.json'));
const companionBoxes = loadCompanionTreasureBoxes();

const recoveryRecords = snapshot.candidates.map((candidate) => {
  const sourcePosition = candidate.source_positions[0];
  const grade = canonicalGrade(candidate);
  const nearest = companionBoxes
    .filter((box) => box.grade === grade)
    .map((box) => ({
      ...box,
      delta_x: Number((box.x - sourcePosition.x).toFixed(6)),
      delta_y: Number((box.y - sourcePosition.y).toFixed(6)),
      distance: Number(Math.hypot(box.x - sourcePosition.x, box.y - sourcePosition.y).toFixed(6))
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  if (!nearest) throw new Error(`No companion match for ${candidate.candidate_id}`);

  return {
    candidate_id: candidate.candidate_id,
    region: candidate.region.region_name,
    source_subtype: candidate.source_subtype,
    canonical_subtype: candidate.canonical_subtype,
    source_a_position: {
      source: 'DragonSwordAwakening.net public map sample',
      x: sourcePosition.x,
      y: sourcePosition.y
    },
    source_b_position: {
      source: 'Dragonsword Companion public map',
      companion_index: nearest.companion_index,
      x: nearest.x,
      y: nearest.y
    },
    delta_x: nearest.delta_x,
    delta_y: nearest.delta_y,
    distance: nearest.distance,
    classification: classify(nearest.distance),
    publication_decision: classify(nearest.distance) === 'CONFLICTING_POSITION' ? 'DO_NOT_PUBLISH' : 'PUBLISH_AS_SECONDARY_CORROBORATED'
  };
});

const sampleIds = new Set();
for (const region of PILOT_REGIONS) {
  snapshot.candidates
    .filter((candidate) => candidate.region.region_name === region.name)
    .slice(0, 10)
    .forEach((candidate) => sampleIds.add(candidate.candidate_id));
}

const sample = recoveryRecords.filter((record) => sampleIds.has(record.candidate_id));
const sampleStrongOrModerate = sample.filter((record) =>
  record.classification === 'STRONG_POSITION_AGREEMENT' ||
  record.classification === 'MODERATE_POSITION_AGREEMENT'
).length;

const viable = sampleStrongOrModerate >= 16;
const approvedCandidates = snapshot.candidates.map((candidate) => {
  const match = recoveryRecords.find((record) => record.candidate_id === candidate.candidate_id);
  if (!viable || match.publication_decision !== 'PUBLISH_AS_SECONDARY_CORROBORATED') return candidate;
  return updateCandidate(candidate, {
    x: match.source_b_position.x,
    y: match.source_b_position.y,
    companion_index: match.source_b_position.companion_index,
    classification: match.classification,
    distance: match.distance
  });
});

const byClassification = recoveryRecords.reduce((counts, record) => {
  counts[record.classification] = (counts[record.classification] || 0) + 1;
  return counts;
}, {});

const report = {
  dataset_version: DATASET_VERSION,
  source_snapshot_date: SNAPSHOT_DATE,
  last_checked: SNAPSHOT_DATE,
  game_build: GAME_BUILD,
  method: 'MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION',
  sample_checked: sample.length,
  sample_strong_or_moderate: sampleStrongOrModerate,
  public_position_recovery: viable ? 'PUBLIC_POSITION_RECOVERY_VIABLE' : 'PUBLIC_POSITION_RECOVERY_INSUFFICIENT',
  classification_counts: byClassification,
  companion_treasure_box_count: companionBoxes.length,
  sample,
  reviewed: recoveryRecords
};

writeJson(path.join(PILOT_DIR, 'public-coordinate-recovery.json'), report);
writeJson(path.join(PILOT_DIR, 'deduped-snapshot.json'), {
  ...snapshot,
  candidates: approvedCandidates,
  public_position_recovery: report.public_position_recovery,
  published_count: approvedCandidates.filter((candidate) => candidate.publication.status === 'PUBLISHED').length
});

console.log(`recover-public: sample=${sample.length} strongOrModerate=${sampleStrongOrModerate} published=${approvedCandidates.filter((candidate) => candidate.publication.status === 'PUBLISHED').length}`);
