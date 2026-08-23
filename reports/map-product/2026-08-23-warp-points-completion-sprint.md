# DragonSwordGuide — Map Data Expansion Sprint B3: Complete Warp Points

Date: 2026-08-23
Scope: `/map/` `WARP_POINT` only

## Status

`WARP_POINTS_COMPLETION_PUBLISHED`

This sprint expands Warp Points from the B1 pilot set to the full public count supported by current secondary map evidence. The production markers remain `SECONDARY_CORROBORATED` and `REGION_APPROXIMATE`.

## Candidate Inventory

| Field | Value |
|---|---|
| WARP_EXISTING | 8 B1 pilot anchors |
| WARP_REMAINING_CANDIDATES | 12 net-new markers needed to reach the public count |
| WARP_ESTIMATED_TOTAL | ~20 |
| WARP_PUBLISHED | 20 |
| WARP_COVERAGE | 20 published / 20 known |

The public technical models expose the object name as generic `Warp Point`, so canonical names use the nearest public location or area anchor. Generic terms remain searchable aliases: `Waypoint`, `Fast Travel`, `Teleport`, and `Warp`.

## Published Warp Points

| Marker | Region | Sources | Status | Precision | Published |
|---|---|---|---|---|---|
| Warp Point - Orbis Royal Castle | Orbis Castle | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Autumnleaf Zone | Autumnleaf Zone | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Ruined Temple | Ruined Temple | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Starshade Forest | Starshade Forest | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Bluehill Wetlands | Bluehill Wetlands | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Stronghold Ridge | Stronghold Ridge | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Blue Plateau | Blue Plateau | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Seagull Village | Seagull Village | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Dusktone Slope | Dusktone Slope | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Two Lakes Hill | Two Lakes Hill | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Morninglight Farm | Morninglight Farm | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Twilight Field | Twilight Field | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Amber Harbor | Amber Harbor | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Mistflower Village | Mistflower Village | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Blue Lake Island | Blue Lake Island | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Tranquil Wind Meadow Entrance | Tranquil Wind Meadow Entrance | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Skyspire Rock Mountain | Skyspire Rock Mountain | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - The Serene Forest | The Serene Forest | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Silver Ford Lake | Silver Ford Lake | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warp Point - Dragon's Stonepeak | Dragon's Stonepeak | `.net` map layer; GrandWiki technical model; Steam achievements; Waypoints guide | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |

## Unpublished Warp Candidates

None in this sprint. Current public count is 20 and production coverage is 20/20. If future game data exposes additional named Waypoints, they should be treated as new candidates, not silently merged into this set.

## Evidence Boundary

- Public map-data-family evidence and a separate public technical model agree on 20 waypoint-category markers.
- Steam achievement evidence confirms a finite Waypoint activation system, but not individual coordinates.
- Independent guide context supports Waypoints as fast-travel planning objects.
- Exact third-party coordinates, marker IDs, source JSON, map tiles, icons and UI code were not imported.
- No marker claims an exact in-game coordinate, unlock condition, cost or cooldown.

## Next Recommended Category

`BOSSES`
