# DragonSwordGuide Chest Pipeline Pilot

Date: 2026-08-23
Status: `CHEST_PIPELINE_PILOT_VALIDATED_RESEARCH_ONLY`
Target URL: `https://dragonswordguide.com/map/`
Pilot regions: `Meadow of Beginnings`, `Field of Plenty`

## Executive Result

The first real Chest pipeline pilot ran end to end:

```text
candidate ingestion
-> normalization
-> dedupe
-> validation
-> production export
-> diff fixture
-> pilot clustering benchmark
```

Result: the pipeline is technically validated for research-only data, but 0 Chest markers are production-publishable because every candidate's coordinate is still third-party source-position evidence and no candidate has independent per-marker corroboration.

Publication gate:

```text
CHEST_PIPELINE_PILOT_BLOCKED_BY_COORDINATE_PROVENANCE
```

No `/map/` production marker data changed. No Chest layer was added to the live UI. No deploy was performed.

## Sources Used

Public source roles:

| Source | Role | Source family | Use in pilot |
| --- | --- | --- | --- |
| https://dragonswordawakening.net/map | limited research-only candidate source positions from a temporary prior audit sample | `COMMON_GAME_DATA_FAMILY` | candidate discovery and coordinate-handling test only |
| https://dragonsword-awakening.org/maps?type=TOWN | public count/category context | `COMMON_GAME_DATA_FAMILY` | corroborates 1,500 chest layer existence at count/category level |
| https://dsawakening.grandwiki.com/map | public count/version/model context | `COMMON_GAME_DATA_FAMILY` | schema/version context; not treated as independent per-marker source |
| https://store.steampowered.com/app/4570720/DragonSword__Awakening/ | official open-world context | `OFFICIAL` | official game-world context only, not per-marker verification |

Important boundary: `.net`, `.org`, and GrandWiki are not counted as three independent per-marker sources because prior technical evidence indicates a likely shared upstream game-data family.

## Pipeline Outputs

| Artifact | Path |
| --- | --- |
| Candidate snapshot | `reports/map-data/chest-pilot/candidate-snapshot.json` |
| Normalized snapshot | `reports/map-data/chest-pilot/normalized-snapshot.json` |
| Deduped snapshot | `reports/map-data/chest-pilot/deduped-snapshot.json` |
| Dedupe report | `reports/map-data/chest-pilot/dedupe-report.json` |
| Validation report | `reports/map-data/chest-pilot/validation-report.json` |
| Diff report | `reports/map-data/chest-pilot/diff-report.json` |
| Performance report | `reports/map-data/chest-pilot/performance-report.json` |
| Research source inventory | `reports/map-data/chest-pilot/source-inventory.json` |
| Production manifest export | `reports/map-data/chest-pilot/production/manifest.json` |
| Meadow production chunk | `reports/map-data/chest-pilot/production/meadow-of-beginnings.json` |
| Field production chunk | `reports/map-data/chest-pilot/production/field-of-plenty.json` |

## Candidate Counts

| Metric | Count |
| --- | ---: |
| Raw candidates | 80 |
| Meadow of Beginnings raw candidates | 40 |
| Field of Plenty raw candidates | 40 |
| Deduped candidates | 80 |
| Auto-merged duplicates | 0 |
| Review-required duplicates | 0 |
| Unresolved duplicate candidates | 0 |
| Published chests | 0 |
| Rejected | 80 |
| Conflicts | 0 |

Subtype normalization result:

| Canonical subtype | Count |
| --- | ---: |
| `NORMAL_CHEST` | 16 |
| `SUPERIOR_CHEST` | 40 |
| `RARE_CHEST` | 12 |
| `EPIC_CHEST` | 8 |
| `LEGENDARY_CHEST` | 4 |

## Rejection Reasons

Every candidate was rejected for the same four publication-gate reasons:

| Reason | Count |
| --- | ---: |
| `COORDINATE_PROVENANCE_NOT_PUBLISHABLE` | 80 |
| `NORMALIZED_POSITION_UNRESOLVED` | 80 |
| `INSUFFICIENT_INDEPENDENT_CORROBORATION` | 80 |
| `RESEARCH_ONLY_ROW` | 80 |

This is the expected safe outcome. The pilot used third-party source positions only to verify ingestion, dedupe, coordinate handling, clustering, and export behavior. Those positions were not converted into DragonSwordGuide production truth.

## Coordinate Provenance

Coordinate status:

```text
POSITION_RESEARCH_ONLY
```

Production coordinates require at least one of:

- owned placement;
- licensed placement;
- first-hand placement;
- independently established placement.

None of those gates was met for this pilot. The production export therefore contains empty chunks.

## Dedupe Result

The dedupe script ran all three checks:

- stable source record ID check;
- close-position same-region same-subtype check;
- possible nearby duplicate check.

Result:

```text
RAW_COUNT: 80
DEDUPED_COUNT: 80
AUTO_MERGED: 0
REVIEW_REQUIRED: 0
UNRESOLVED_DUPLICATES: 0
```

## Manifest And Region Chunks

Production export is intentionally empty:

```text
total_published: 0
publication_gate: CHEST_PIPELINE_PILOT_BLOCKED_BY_COORDINATE_PROVENANCE
```

Payload sizes:

| File | Bytes on disk |
| --- | ---: |
| `production/manifest.json` | 617 |
| `production/meadow-of-beginnings.json` | 163 |
| `production/field-of-plenty.json` | 153 |

The benchmark records a 488-byte minified manifest and 272 bytes of minified region chunks. Both are tiny because no production markers passed the gate.

## Clustering And Search Pilot

The real pilot benchmark used the 80 research-only candidate source positions for cluster math only. It did not publish those positions.

| Metric | Result |
| --- | ---: |
| Mobile viewport | 390 x 844 |
| Mobile low-zoom cluster time | 0.150 ms |
| Mobile low-zoom clusters | 5 |
| Mobile high-zoom cluster time | 0.146 ms |
| Mobile high-zoom visible nodes | 65 |
| Desktop low-zoom cluster time | 0.073 ms |
| Desktop low-zoom clusters | 8 |
| Search `meadow` time | 0.086 ms |
| Search `meadow` results | 40 |
| Max visible DOM marker cap | 250 |

Conclusion: the cluster/search architecture is adequate for a 50-100 candidate pilot and remains compatible with the prior synthetic benchmark. Browser smoke with a live Chest UI was not run because the publication gate blocked all Chest rows before UI exposure.

## Dataset Diff Fixture

The diff script simulated an old snapshot against the current pilot snapshot and emitted all required diff buckets:

| Diff bucket | Count |
| --- | ---: |
| `added` | 69 |
| `removed` | 1 |
| `moved` | 1 |
| `metadata_changed` | 1 |
| `unchanged` | 9 |

## Scripts Added

| Script | Purpose |
| --- | --- |
| `scripts/map/ingest-chest-candidates.mjs` | build the 80-row research-only pilot candidate snapshot |
| `scripts/map/normalize-chests.mjs` | normalize subtype and keep production position unresolved |
| `scripts/map/dedupe-chests.mjs` | run stable-ID, probable-position, and possible-duplicate checks |
| `scripts/map/validate-chests.mjs` | enforce coordinate, evidence, conflict, and research-only gates |
| `scripts/map/export-production-chests.mjs` | export manifest and region chunks while excluding rejected rows |
| `scripts/map/diff-chest-dataset.mjs` | test added/removed/moved/metadata/unchanged diff buckets |
| `scripts/map/benchmark-chest-pilot.mjs` | benchmark clustering/search on the 80-row pilot |
| `scripts/map/chest-pipeline-check.mjs` | test all pilot artifacts and quality gates |
| `scripts/map/chest-pipeline-lib.mjs` | shared pipeline helpers |

`npm test` now runs both the existing map MVP check and the Chest pipeline check.

## Quality Gate

| Gate | Result |
| --- | --- |
| duplicate IDs | 0 |
| invalid coordinates | 0 |
| unknown categories | 0 |
| unresolved conflicts published | 0 |
| research-only rows published | 0 |
| manifest totals match chunks | Pass |
| candidate parse | Pass |
| region normalization | Pass |
| chunk export | Pass |
| dataset diff | Pass |

## Final Gate

```text
CHEST_PIPELINE_PILOT_VALIDATED_RESEARCH_ONLY
```

Next allowed step:

```text
CHEST_PIPELINE_SCALE_UP_BLOCKED_UNTIL_COORDINATE_PROVENANCE
```

Do not scale to all 1,500 chests until a lawful coordinate source exists: owned capture, licensed source, first-hand placement, or independently established placement.
