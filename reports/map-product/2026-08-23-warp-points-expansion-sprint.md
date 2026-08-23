# DragonSwordGuide Map Data Expansion Sprint B1: Warp Points

Date: 2026-08-23

## Status

`WARP_POINTS_PILOT_PUBLISHED`

Sprint B1 expanded `/map/` with a Warp Point category and eight source-corroborated, region-approximate planning anchors. Exact third-party coordinates were not copied, and no unlock condition, cost, cooldown, or route requirement is presented as verified.

## Candidate Inventory

| Field | Value |
| --- | --- |
| WARP_CANDIDATES_FOUND | 20 mapped Warp Points reported by one public map-data-family source |
| ESTIMATED_TOTAL | ~20 |
| SOURCE_COUNT | 4 source groups |
| Publication threshold | COMMON_GAME_DATA_FAMILY + OFFICIAL + INDEPENDENT_GUIDE_CONTEXT |
| Published in Sprint B1 | 8 |
| Coverage | 8 published / ~20 known |

## Source Classification

| Source | Classification | Use |
| --- | --- | --- |
| DragonSwordAwakening.net exploration and map icons guide | COMMON_GAME_DATA_FAMILY | Reports `Warp Points` as a travel category with 20 mapped entries. |
| Steam global achievements | OFFICIAL | Confirms `Fast Travel Expert` for activating all Waypoints. |
| DragonSword Awakening Wiki Waypoints guide | INDEPENDENT_GUIDE | Explains Waypoints as fast-travel progression objects and states exact coordinates/region totals remain unverified. |
| DragonSwordAwakening.net beginner roadmap | INDEPENDENT_GUIDE_CONTEXT | Supports practical guidance to activate Waypoints while moving through routes. |

## Published Markers

| Marker | Region | Sources | Status | Precision | Published |
| --- | --- | --- | --- | --- | --- |
| Warp Point - Orbis Castle | Orbis Castle | map-data-family + Steam + Waypoints guide + beginner roadmap | SECONDARY_CORROBORATED | REGION_APPROXIMATE | yes |
| Warp Point - Meadow of Beginnings | Meadow of Beginnings | map-data-family + Steam + Waypoints guide + beginner roadmap | SECONDARY_CORROBORATED | REGION_APPROXIMATE | yes |
| Warp Point - Autumnleaf Zone | Autumnleaf Zone | map-data-family + Steam + Waypoints guide + beginner roadmap | SECONDARY_CORROBORATED | REGION_APPROXIMATE | yes |
| Warp Point - Echo Canyon | Echo Canyon | map-data-family + Steam + Waypoints guide + beginner roadmap | SECONDARY_CORROBORATED | REGION_APPROXIMATE | yes |
| Warp Point - Dragonrise Basin | Dragonrise Basin | map-data-family + Steam + Waypoints guide + beginner roadmap | SECONDARY_CORROBORATED | REGION_APPROXIMATE | yes |
| Warp Point - Skyfeather Ridge | Skyfeather Ridge | map-data-family + Steam + Waypoints guide + beginner roadmap | SECONDARY_CORROBORATED | REGION_APPROXIMATE | yes |
| Warp Point - Starshade Forest | Starshade Forest | map-data-family + Steam + Waypoints guide + beginner roadmap | SECONDARY_CORROBORATED | REGION_APPROXIMATE | yes |
| Warp Point - Ruined Temple | Ruined Temple | map-data-family + Steam + Waypoints guide + beginner roadmap | SECONDARY_CORROBORATED | REGION_APPROXIMATE | yes |

## Evidence Boundary

- `WARP_POINT` is the single production category value.
- `aliases[]` supports Waypoint, Fast Travel, Teleport, and Warp search strings.
- Coordinates use DragonSwordGuide's own schematic map only.
- No public third-party marker JSON, coordinate database, source code, map images, or icon packs were imported.
- No marker claims an exact in-game pin.
- No marker claims a verified unlock condition, quest prerequisite, level, cost, or cooldown.
- Current published Warp coverage is a pilot subset: 8 published / ~20 known.

## Organa Conflict Carryover

`13_VS_14_CONFLICT_RETAINED`

Sprint B1 did not actively pursue the unresolved Organa 13 vs 14 conflict. The production data continues to expose `UNRESOLVED_13_VS_14` and `UNKNOWN_UNNAMED_14TH_MAP_LAYER_ENTRY`.

## Next Recommended Category

`DUNGEONS`

Reason: Dungeons are likely lower-volume and higher-navigation-utility than a full chest pipeline. Chest expansion should wait for a separate high-volume data pipeline decision.
