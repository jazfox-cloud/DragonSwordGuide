# DragonSwordGuide Chest Scale Gate 500

Date: 2026-08-23

## Decision

```text
CHEST_SCALE_500_PUBLISHED
```

The Chest layer was expanded from 80 to 398 published markers after a 400-candidate scale gate. Two candidates were rejected: one weak position agreement and one conflicting position agreement. The full 1,500-marker dataset was not imported.

## Coverage

| Metric | Count |
| --- | ---: |
| Chests before | 80 |
| Chests after | 398 |
| New chests published | 318 |
| Regions before | 2 |
| Regions after | 8 |
| Total map markers | 469 |

Regions:

| Region | Candidates | Published | Position agreement | Chunk size |
| --- | ---: | ---: | --- | ---: |
| Meadow of Beginnings | 50 | 50 | 50/50 strong_or_moderate | 72,170 |
| Field of Plenty | 50 | 50 | 50/50 strong_or_moderate | 70,904 |
| Skyridge Uplands | 50 | 50 | 50/50 strong_or_moderate | 72,025 |
| Shadowed Woods | 50 | 50 | 50/50 strong_or_moderate | 72,191 |
| Misty Veil Highlands | 50 | 50 | 50/50 strong_or_moderate | 72,433 |
| Eastern Highlands | 50 | 50 | 50/50 strong_or_moderate | 74,631 |
| Orbis Castle Approach | 50 | 48 | 48/50 strong_or_moderate | 71,620 |
| Dragonrise Basin | 50 | 50 | 50/50 strong_or_moderate | 72,413 |

## Position Agreement

| Classification | Count |
| --- | ---: |
| STRONG_POSITION_AGREEMENT | 353 |
| MODERATE_POSITION_AGREEMENT | 45 |
| WEAK_POSITION_AGREEMENT | 1 |
| CONFLICTING_POSITION | 1 |

Strong + moderate rate: 99.5%

Conflicting rate: 0.25%

Gate result:

```text
STRONG + MODERATE >= 95%: PASS
CONFLICTING <= 1%: PASS
```

## Dedupe And Conflict Gate

```text
RAW: 400
DEDUPED: 400
SAME_ENTITY: 0
PROBABLE_SAME_ENTITY: 0
POSSIBLE_DUPLICATE: 17
UNRESOLVED: 0
REJECTED: 2
CONFLICTS_FOUND: 1
CONFLICTS_REJECTED: 1
```

The possible duplicates were retained as distinct source records because they were nearby but not the same source record / same subtype identity. No unresolved duplicate or conflicting row was published.

## Dataset Diff

Baseline: 80-Chest production snapshot.

```text
added: 318
removed: 0
moved: 0
metadata_changed: 0
unchanged: 80
```

The existing 80 marker IDs and metadata stayed stable.

## Chunk Gate

```text
TOTAL_CHEST_DATA_SIZE: 583489
MIN_CHUNK_SIZE: 70904
MAX_CHUNK_SIZE: 74631
MEDIAN_CHUNK_SIZE: 72191
MAX_VISIBLE_DOM_MARKERS: 250
```

No region currently needs subregion chunking for the 398-marker layer. Repeated source metadata was compressed into manifest-level `source_catalog` plus per-marker source keys to avoid unnecessary payload growth.

## Browser Performance

Real Chrome headless smoke was run through the DevTools protocol against local Astro preview.

Desktop 1440x900:

```text
Chest layer enable: 12ms
low zoom clusters: 76
cluster expansion: 4ms
visible high-zoom markers: 250
marker open: 0ms
zoom: 6ms
pan: 6ms
search: 2ms
disable-layer cleanup: 0ms
horizontal overflow: false
```

Mobile 390x844:

```text
Chest layer enable: 15ms
low zoom clusters: 28
cluster expansion: 4ms
visible high-zoom markers: 250
marker open: 0ms
zoom: 6ms
pan: 7ms
search: 2ms
disable-layer cleanup: 0ms
horizontal overflow: false
```

Browser gate:

```text
No browser freeze: PASS
No severe interaction lag: PASS
No horizontal overflow: PASS
No multi-second blocking interaction: PASS
DOM cap respected: PASS
Map controls remain usable: PASS
```

## Source Boundary

Position sources:

- DragonSwordAwakening.net public map: https://dragonswordawakening.net/map
- Dragonsword Companion public map: https://www.dragonswordc.com/

Context sources:

- GrandWiki Orbis map: https://dsawakening.grandwiki.com/map
- DragonSword-Awakening.org public map: https://dragonsword-awakening.org/maps?type=TOWN
- Steam achievements: https://steamcommunity.com/stats/4570720/achievements

Production markers remain:

```text
COORDINATE_PROVENANCE: MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION
VERIFICATION_STATUS: SECONDARY_CORROBORATED
PRECISION: LANDMARK_APPROXIMATE
```

## Full 1500 Readiness

```text
FULL_1500_READY_WITH_ADDITIONAL_OPTIMIZATION
```

Reason: the 398-marker layer performs acceptably with current lazy loading, chunking and clustering, but a full 1,500-marker layer should add either region-selective loading or subregion chunking before production. The current implementation loads all Chest chunks when the Chest filter is enabled, which is acceptable at 398 markers but should not be assumed safe at 1,500.

## Files

- `reports/map-data/scale-validation.json`
- `reports/map-data/performance-validation.json`
- `reports/map-data/browser-performance-validation.json`
- `reports/map-data/dataset-diff.json`
- `reports/map-data/chest-scale-500/production/*.json`
- `public/data/map/chests/*.json`
- `scripts/map/scale-chest-500.mjs`
- `scripts/map/browser-smoke-chest-scale.mjs`

## Next Step

```text
CHEST_FULL_SCALE_1500
```

Requires separate approval and an additional optimization plan. Do not auto-import the full 1,500 Chest dataset.
