import path from 'node:path';
import {
  PILOT_DIR,
  ensureCandidateShape,
  loadCandidateSnapshot,
  writeJson
} from './chest-pipeline-lib.mjs';

const snapshot = loadCandidateSnapshot(path.join(PILOT_DIR, 'deduped-snapshot.json'));

const ids = new Set();
const rejected = [];
const publishable = [];
const conflicts = [];

for (const candidate of snapshot.candidates) {
  ensureCandidateShape(candidate);
  const reasons = [];
  if (ids.has(candidate.candidate_id)) reasons.push('DUPLICATE_ID');
  ids.add(candidate.candidate_id);
  if (candidate.category !== 'CHEST') reasons.push('UNKNOWN_CATEGORY');
  if (candidate.conflicts.some((conflict) => conflict.status === 'OPEN')) {
    reasons.push('UNRESOLVED_CONFLICT');
    conflicts.push(candidate.candidate_id);
  }
  if (candidate.coordinate_gate !== 'OWNED_OR_LICENSED' && candidate.coordinate_gate !== 'FIRST_HAND' && candidate.coordinate_gate !== 'INDEPENDENTLY_ESTABLISHED') {
    reasons.push('COORDINATE_PROVENANCE_NOT_PUBLISHABLE');
  }
  if (candidate.normalized_position.x == null || candidate.normalized_position.y == null) {
    reasons.push('NORMALIZED_POSITION_UNRESOLVED');
  }
  if (candidate.verification_status !== 'MULTI_SOURCE_CORROBORATED' && candidate.verification_status !== 'VIDEO_VERIFIED' && candidate.verification_status !== 'FIRST_HAND_VERIFIED' && candidate.verification_status !== 'OFFICIAL_VERIFIED') {
    reasons.push('INSUFFICIENT_INDEPENDENT_CORROBORATION');
  }
  if (candidate.publication.status === 'RESEARCH_ONLY') {
    reasons.push('RESEARCH_ONLY_ROW');
  }
  if (reasons.length > 0) {
    rejected.push({ candidate_id: candidate.candidate_id, reasons });
  } else {
    publishable.push(candidate);
  }
}

const report = {
  dataset_version: snapshot.dataset_version,
  candidate_count: snapshot.candidates.length,
  deduped_count: snapshot.candidates.length,
  published_count: publishable.length,
  rejected_count: rejected.length,
  conflict_count: conflicts.length,
  duplicate_id_count: snapshot.candidates.length - ids.size,
  invalid_coordinate_count: snapshot.candidates.filter((candidate) =>
    candidate.source_positions.some((position) =>
      position.x == null || position.y == null || position.x < 0 || position.x > 1 || position.y < 0 || position.y > 1
    )
  ).length,
  unknown_category_count: snapshot.candidates.filter((candidate) => candidate.category !== 'CHEST').length,
  unresolved_published_conflicts: publishable.filter((candidate) => candidate.conflicts.some((conflict) => conflict.status === 'OPEN')).length,
  research_only_published_count: publishable.filter((candidate) => candidate.publication.status === 'RESEARCH_ONLY').length,
  coordinate_provenance: 'POSITION_RESEARCH_ONLY',
  verification_level: 'GAME_DATA_CORROBORATED_RESEARCH_ONLY',
  rejected
};

writeJson(path.join(PILOT_DIR, 'validation-report.json'), report);

console.log(`validate: published=${report.published_count} rejected=${report.rejected_count} conflicts=${report.conflict_count}`);
