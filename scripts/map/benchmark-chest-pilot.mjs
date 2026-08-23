import path from 'node:path';
import {
  PILOT_DIR,
  clusterCandidates,
  loadCandidateSnapshot,
  measure,
  readJson,
  writeJson
} from './chest-pipeline-lib.mjs';

const snapshot = loadCandidateSnapshot(path.join(PILOT_DIR, 'deduped-snapshot.json'));
const manifest = readJson(path.join(PILOT_DIR, 'production/manifest.json'));
const manifestBytes = Buffer.byteLength(JSON.stringify(manifest));
const chunkPayloadSize = manifest.regions.reduce((sum, region) => sum + region.payload_bytes, 0);

const mobileLow = measure(() => clusterCandidates(snapshot.candidates, { width: 390, height: 844 }, 0.55));
const mobileHigh = measure(() => clusterCandidates(snapshot.candidates, { width: 390, height: 844 }, 2.25));
const desktopLow = measure(() => clusterCandidates(snapshot.candidates, { width: 1440, height: 1000 }, 0.55));
const search = measure(() => snapshot.candidates.filter((candidate) =>
  `${candidate.name} ${candidate.region.region_name} ${candidate.canonical_subtype}`.toLowerCase().includes('meadow')
));

const report = {
  benchmark_type: 'REAL_PILOT_RESEARCH_ONLY_CLUSTER_MODEL',
  candidate_count: snapshot.candidates.length,
  published_count: manifest.total_published,
  manifest_bytes: manifestBytes,
  chunk_payload_size_bytes: chunkPayloadSize,
  mobile_low_zoom_cluster_ms: mobileLow.ms,
  mobile_low_zoom_clusters: mobileLow.result.length,
  mobile_high_zoom_cluster_ms: mobileHigh.ms,
  mobile_high_zoom_visible_nodes: Math.min(mobileHigh.result.length, 250),
  desktop_low_zoom_cluster_ms: desktopLow.ms,
  desktop_low_zoom_clusters: desktopLow.result.length,
  search_meadow_ms: search.ms,
  search_meadow_count: search.result.length,
  max_visible_dom_markers: 250,
  note: 'Benchmark uses research-only candidate source positions for clustering math only. Production chunks contain zero markers because coordinate provenance gate did not pass.'
};

writeJson(path.join(PILOT_DIR, 'performance-report.json'), report);

console.log(`benchmark: candidates=${report.candidate_count} mobileClusters=${report.mobile_low_zoom_clusters} published=${report.published_count}`);
