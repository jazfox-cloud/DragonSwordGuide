import path from 'node:path';
import {
  PILOT_DIR,
  ensureCandidateShape,
  loadCandidateSnapshot,
  pointDistance,
  writeJson
} from './chest-pipeline-lib.mjs';

const snapshot = loadCandidateSnapshot(path.join(PILOT_DIR, 'normalized-snapshot.json'));
const candidates = snapshot.candidates.map((candidate) => ({
  ...candidate,
  dedupe: {
    dedupe_status: 'UNIQUE',
    canonical_candidate_id: candidate.candidate_id,
    matches: []
  }
}));

const byRecordId = new Map();
const autoMerged = [];
const reviewRequired = [];
const unresolvedDuplicates = [];
const removed = new Set();

for (const candidate of candidates) {
  const recordId = candidate.source_ids[0]?.record_id;
  if (!recordId) continue;
  if (byRecordId.has(recordId)) {
    const canonical = byRecordId.get(recordId);
    candidate.dedupe = {
      dedupe_status: 'SAME_ENTITY',
      canonical_candidate_id: canonical.candidate_id,
      matches: [
        {
          candidate_id: canonical.candidate_id,
          match_type: 'SAME_ENTITY',
          reason: 'same source record id'
        }
      ]
    };
    autoMerged.push({ from: candidate.candidate_id, into: canonical.candidate_id, reason: 'same source record id' });
    removed.add(candidate.candidate_id);
  } else {
    byRecordId.set(recordId, candidate);
  }
}

for (let index = 0; index < candidates.length; index += 1) {
  const current = candidates[index];
  if (removed.has(current.candidate_id)) continue;
  for (let otherIndex = index + 1; otherIndex < candidates.length; otherIndex += 1) {
    const other = candidates[otherIndex];
    if (removed.has(other.candidate_id)) continue;
    if (current.region.region_name !== other.region.region_name) continue;
    const distance = pointDistance(current, other);
    if (distance <= 0.0015 && current.canonical_subtype === other.canonical_subtype) {
      reviewRequired.push({
        a: current.candidate_id,
        b: other.candidate_id,
        match_type: 'PROBABLE_SAME_ENTITY',
        distance: Number(distance.toFixed(6)),
        reason: 'same region, close source position, same canonical subtype'
      });
    } else if (distance <= 0.003) {
      unresolvedDuplicates.push({
        a: current.candidate_id,
        b: other.candidate_id,
        match_type: 'POSSIBLE_DUPLICATE',
        distance: Number(distance.toFixed(6)),
        reason: 'same region and nearby source position'
      });
    }
  }
}

const deduped = candidates.filter((candidate) => !removed.has(candidate.candidate_id));
for (const candidate of deduped) ensureCandidateShape(candidate);

const report = {
  dataset_version: snapshot.dataset_version,
  raw_count: candidates.length,
  deduped_count: deduped.length,
  auto_merged: autoMerged.length,
  review_required: reviewRequired.length,
  unresolved_duplicates: unresolvedDuplicates.length,
  auto_merged_records: autoMerged,
  review_required_records: reviewRequired,
  unresolved_duplicate_records: unresolvedDuplicates
};

writeJson(path.join(PILOT_DIR, 'deduped-snapshot.json'), {
  ...snapshot,
  deduped_count: deduped.length,
  candidates: deduped
});
writeJson(path.join(PILOT_DIR, 'dedupe-report.json'), report);

console.log(`dedupe: raw=${report.raw_count} deduped=${report.deduped_count} review=${report.review_required}`);
