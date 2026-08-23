import path from 'node:path';
import {
  PILOT_DIR,
  ensureCandidateShape,
  getSubtype,
  loadCandidateSnapshot,
  writeJson
} from './chest-pipeline-lib.mjs';

const snapshot = loadCandidateSnapshot();
const normalized = snapshot.candidates.map((candidate) => {
  const subtype = getSubtype(candidate.source_subtype);
  const next = {
    ...candidate,
    subtype: subtype.subtype,
    canonical_subtype: subtype.canonical,
    coordinate_gate: candidate.coordinate_gate || 'POSITION_RESEARCH_ONLY',
    normalized_position: {
      map_base_id: null,
      x: null,
      y: null,
      coordinate_confidence: 'UNRESOLVED',
      precision: 'UNRESOLVED'
    },
    publication: {
      ...candidate.publication,
      status: 'RESEARCH_ONLY'
    }
  };
  ensureCandidateShape(next);
  return next;
});

const regionCounts = normalized.reduce((counts, candidate) => {
  const region = candidate.region.region_name || 'REGION_UNRESOLVED';
  counts[region] = (counts[region] || 0) + 1;
  return counts;
}, {});

writeJson(path.join(PILOT_DIR, 'normalized-snapshot.json'), {
  ...snapshot,
  normalized_count: normalized.length,
  region_counts: regionCounts,
  candidates: normalized
});

console.log(`normalize: ${normalized.length} candidates`);
