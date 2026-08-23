# DragonSwordGuide Chest Full Scale 1500

Date: 2026-08-23

## Decision

```text
CHEST_FULL_SCALE_PUBLISHED
```

The Chest layer was expanded from 398 to 1484 published markers after auditing 1500 public chest candidates. 16 candidates were rejected because their public position agreement was weak or conflicting. Published rows keep `SECONDARY_CORROBORATED`, `LANDMARK_APPROXIMATE`, and `MULTI_SOURCE_PUBLIC_POSITION_CORROBORATION`.

## Candidate Inventory

| Metric | Count |
| --- | ---: |
| Raw chest candidates | 1500 |
| Deduped candidates | 1500 |
| Companion treasure boxes | 1506 |
| Chests before | 398 |
| Chests after | 1484 |
| New chests published | 1086 |
| Chests rejected | 16 |
| Regions published | 20 |
| Total map markers | 1555 |

## Position Agreement

| Classification | Count |
| --- | ---: |
| STRONG_POSITION_AGREEMENT | 1290 |
| MODERATE_POSITION_AGREEMENT | 194 |
| WEAK_POSITION_AGREEMENT | 7 |
| CONFLICTING_POSITION | 9 |
| INSUFFICIENT_POSITION_DATA | 0 |

Strong + moderate rate: 98.93%

## Region Report

| Region | Raw | Deduped | Strong | Moderate | Weak | Conflicts | Published | Rejected | Payload |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| North Skyridge | 13 | 13 | 13 | 0 | 0 | 0 | 13 | 0 | 19213 |
| Skyridge Uplands | 101 | 101 | 101 | 0 | 0 | 0 | 101 | 0 | 148062 |
| West Skyridge | 34 | 34 | 34 | 0 | 0 | 0 | 34 | 0 | 49670 |
| Shadowed Woods | 121 | 121 | 121 | 0 | 0 | 0 | 121 | 0 | 174939 |
| Shadowed Woodlands East | 35 | 35 | 35 | 0 | 0 | 0 | 35 | 0 | 54949 |
| Meadow West | 21 | 21 | 21 | 0 | 0 | 0 | 21 | 0 | 30276 |
| Meadow of Beginnings | 123 | 123 | 123 | 0 | 0 | 0 | 123 | 0 | 186653 |
| Meadow East | 74 | 74 | 69 | 0 | 1 | 4 | 69 | 5 | 99226 |
| Central Orbis | 77 | 77 | 75 | 0 | 0 | 2 | 75 | 2 | 109306 |
| Orbis Castle Approach | 99 | 99 | 99 | 0 | 0 | 0 | 99 | 0 | 150968 |
| Misty Veil Highlands | 130 | 130 | 129 | 0 | 1 | 0 | 129 | 1 | 195522 |
| Eastern Highlands | 88 | 88 | 29 | 59 | 0 | 0 | 88 | 0 | 129976 |
| Field West | 71 | 71 | 69 | 0 | 1 | 1 | 69 | 2 | 98336 |
| Field of Plenty | 117 | 117 | 117 | 0 | 0 | 0 | 117 | 0 | 170534 |
| Field East | 85 | 85 | 82 | 0 | 1 | 2 | 82 | 3 | 116824 |
| Dragonrise West | 77 | 77 | 74 | 0 | 3 | 0 | 74 | 3 | 109480 |
| Dragonrise Basin | 115 | 115 | 84 | 31 | 0 | 0 | 115 | 0 | 168975 |
| Dragonrise East | 103 | 103 | 5 | 98 | 0 | 0 | 103 | 0 | 152778 |
| Southwest Lowlands | 8 | 8 | 8 | 0 | 0 | 0 | 8 | 0 | 12249 |
| Southeast Coast | 8 | 8 | 2 | 6 | 0 | 0 | 8 | 0 | 12021 |

## Deduplication And Dataset Diff

```text
SAME_ENTITY: 0
PROBABLE_SAME_ENTITY: 11
POSSIBLE_DUPLICATE: 165
DUPLICATE_PRODUCTION_IDS: 0
UNRESOLVED_DUPLICATE_PRODUCTION_ROWS: 0
existing unchanged: 398
existing moved: 0
existing metadata_changed: 0
existing removed: 0
new added: 1086
```

The existing 398 Chest production markers were preserved by source record ID. New marker IDs were assigned only for newly published source records.

## Performance

```text
TOTAL_CHEST_DATA_SIZE: 2194093
MAX_REGION_CHUNK_SIZE: 195522
MEDIAN_REGION_CHUNK_SIZE: 109480
MAX_VISIBLE_DOM_MARKERS: 250
```

The production UI still leaves Chest off by default, loads the manifest and region chunks only when Chest is enabled, clusters at low and mid zoom, and caps visible high-zoom individual Chest DOM markers at 250.

## Sources Used

- DragonSwordAwakening.net public map: https://dragonswordawakening.net/map
- Dragonsword Companion public map: https://www.dragonswordc.com/
- GrandWiki Orbis map: https://dsawakening.grandwiki.com/map
- DragonSword-Awakening.org public map: https://dragonsword-awakening.org/maps?type=TOWN
- Steam achievements context: https://steamcommunity.com/stats/4570720/achievements

## Remaining Data Gaps

- 7 weak-position candidates remain research-only.
- 9 conflicting-position candidates remain excluded from production.
- Published Chest markers are approximate planning markers, not exact in-game pins.
