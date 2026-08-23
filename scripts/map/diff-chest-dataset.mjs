import path from 'node:path';
import {
  PILOT_DIR,
  loadCandidateSnapshot,
  writeJson
} from './chest-pipeline-lib.mjs';

const snapshot = loadCandidateSnapshot(path.join(PILOT_DIR, 'deduped-snapshot.json'));

const oldCandidates = snapshot.candidates.slice(0, 12).map((candidate, index) => {
  const clone = JSON.parse(JSON.stringify(candidate));
  if (index === 0) {
    clone.source_positions[0].x = Number((clone.source_positions[0].x + 0.01).toFixed(6));
  }
  if (index === 1) {
    clone.source_subtype = `${clone.source_subtype} Legacy`;
  }
  return clone;
});
oldCandidates.pop();
oldCandidates.push({
  ...JSON.parse(JSON.stringify(snapshot.candidates[12])),
  candidate_id: 'candidate:chest:fixture-removed:01',
  source_ids: [{ ...snapshot.candidates[12].source_ids[0], record_id: 'fixture-removed-record' }]
});

const oldById = new Map(oldCandidates.map((candidate) => [candidate.candidate_id, candidate]));
const newById = new Map(snapshot.candidates.map((candidate) => [candidate.candidate_id, candidate]));

const added = [];
const removed = [];
const moved = [];
const metadataChanged = [];
const unchanged = [];

for (const candidate of snapshot.candidates) {
  const old = oldById.get(candidate.candidate_id);
  if (!old) {
    added.push(candidate.candidate_id);
    continue;
  }
  const oldPosition = old.source_positions[0];
  const newPosition = candidate.source_positions[0];
  if (oldPosition.x !== newPosition.x || oldPosition.y !== newPosition.y) {
    moved.push(candidate.candidate_id);
  } else if (old.source_subtype !== candidate.source_subtype || old.canonical_subtype !== candidate.canonical_subtype) {
    metadataChanged.push(candidate.candidate_id);
  } else {
    unchanged.push(candidate.candidate_id);
  }
}

for (const candidate of oldCandidates) {
  if (!newById.has(candidate.candidate_id)) {
    removed.push(candidate.candidate_id);
  }
}

const report = {
  dataset_version: snapshot.dataset_version,
  fixture_mode: true,
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
  }
};

writeJson(path.join(PILOT_DIR, 'diff-report.json'), report);

console.log(`diff: added=${added.length} removed=${removed.length} moved=${moved.length} metadata=${metadataChanged.length} unchanged=${unchanged.length}`);
