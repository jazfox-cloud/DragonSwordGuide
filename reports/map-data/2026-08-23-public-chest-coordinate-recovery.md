# DragonSwordGuide Public Chest Coordinate Recovery Sprint

Date: 2026-08-23

## Status

CHEST_PIPELINE_PUBLIC_POSITION_METHOD_VALIDATED

The 80-marker Treasure Chest pilot for Meadow of Beginnings and Field of Plenty passed the public-position recovery gate. The map now publishes these chests as a limited pilot layer, default off, using DragonSwordGuide's owned schematic Orbis base map and honest approximate precision.

## Scope

This sprint reviewed only the existing 80 pilot chest candidates:

| Region | Reviewed | Published |
| --- | ---: | ---: |
| Meadow of Beginnings | 40 | 40 |
| Field of Plenty | 40 | 40 |
| Total | 80 | 80 |

No chest data outside these two pilot regions was imported or published.

## Public Position Recovery Sample

The sample gate checked 20 candidates, split as 10 Meadow of Beginnings and 10 Field of Plenty. The position comparison used one game-data-family public map source and one independent public companion-map source. Shared upstream map/database families were not counted as multiple independent coordinate sources.

| Result | Count |
| --- | ---: |
| SAMPLE_CHECKED | 20 |
| STRONG_POSITION_AGREEMENT | 20 |
| MODERATE_POSITION_AGREEMENT | 0 |
| WEAK_POSITION_AGREEMENT | 0 |
| CONFLICTING_POSITION | 0 |

Gate decision:

```text
PUBLIC_POSITION_RECOVERY_VIABLE
```

## Expanded Review

After the sample gate passed, the same comparison method was applied to all 80 pilot candidates.

| Result | Count |
| --- | ---: |
| STRONG_POSITION_AGREEMENT | 80 |
| MODERATE_POSITION_AGREEMENT | 0 |
| WEAK_POSITION_AGREEMENT | 0 |
| CONFLICTING_POSITION | 0 |

## Publication Decision

Published markers use:

```text
category: CHEST
verification_status: SECONDARY_CORROBORATED
coordinate_provenance: MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION
precision: LANDMARK_APPROXIMATE
map_base_id: OWN_SCHEMATIC_ORBIS_BASE_MAP
coordinate_system: IMAGE_RELATIVE_COORDINATES
```

The published coordinates are consensus placements on DragonSwordGuide's schematic map. They are not represented as exact in-game coordinates, not first-hand verified, and not official/video verified.

## Evidence Summary

| Source | Used for | Decision |
| --- | --- | --- |
| DragonSwordAwakening.net public map | Public chest category and first public position source | Used as one public coordinate source, not bulk-copied |
| Dragonsword Companion public map | Independent public position comparison source | Used for same-grade nearest-position corroboration |
| dragonsword-awakening.org public map | Chest-layer context | Not enough locally visible SSR chest records for sample gate |
| GrandWiki Orbis map | Dense-map/search/layer behavior context | Not used as a coordinate table |
| Steam achievements | Treasure Chest gameplay mechanic context | Mechanic evidence only; no position evidence |
| Public YouTube search | Attempted official/gameplay position evidence | No usable timestamped pilot-region chest coordinate evidence found |

## Pipeline Gate

Before:

```text
CHEST_PIPELINE_PILOT_BLOCKED_BY_COORDINATE_PROVENANCE
```

After:

```text
PILOT_EXPORT_READY
CHEST_PIPELINE_PUBLIC_POSITION_METHOD_VALIDATED
```

## UI And Delivery

- Treasure Chests were added as a `CHEST` map category.
- Chest filter is unchecked by default.
- Chest marker data is lazy-loaded from region chunks only after the Chest filter is enabled.
- Low-zoom chest display uses clustering.
- High-zoom chest display caps individual rendered chest markers.
- Search includes chest names, regions, aliases and subtypes after the chest layer is loaded.
- Marker detail panels display Chest status, precision, confidence and source summary.

## Files

- `scripts/map/recover-public-chest-coordinates.mjs`
- `reports/map-data/chest-pilot/public-coordinate-recovery.json`
- `reports/map-data/chest-pilot/deduped-snapshot.json`
- `reports/map-data/chest-pilot/validation-report.json`
- `reports/map-data/chest-pilot/performance-report.json`
- `reports/map-data/chest-pilot/production/manifest.json`
- `reports/map-data/chest-pilot/production/meadow-of-beginnings.json`
- `reports/map-data/chest-pilot/production/field-of-plenty.json`
- `public/data/map/chests/manifest.json`
- `public/data/map/chests/meadow-of-beginnings.json`
- `public/data/map/chests/field-of-plenty.json`
- `src/components/InteractiveMap.astro`
- `src/pages/map/index.astro`
- `scripts/map/chest-pipeline-check.mjs`
- `scripts/map-mvp-check.mjs`

## Next Step

Move to `CHEST_DATA_PIPELINE_SCALE_DECISION` only after reviewing performance, provenance quality, dedupe safety and chunking strategy for larger chest batches. Do not bulk-import the remaining chest database from competitor maps.
