# DragonSwordGuide — Map Data Expansion Sprint B2: Dungeons

Date: 2026-08-23
Scope: `/map/` Dungeon category only

## Status

`PUBLISHED_SECONDARY_CORROBORATED_APPROXIMATE`

This sprint adds Dungeon entrance planning markers to DragonSwordGuide's owned schematic Orbis map. It does not copy third-party coordinates, map imagery, icon packs, source code or descriptive text. Activity existence and entrance-location evidence are tracked separately.

## Candidate Inventory

- Public mapped Dungeon entrance candidates found: 26
- DragonSwordAwakening.net Normal/Trait/Currency activity records observed: 30
- DragonSword-Awakening.org broad dungeon taxonomy records observed: 69
- Published in this sprint: 21
- Held as `KNOWN_ACTIVITY_LOCATION_UNRESOLVED`: 5

The five held candidates are Dragon Worshipper Hideout, Nest of the Great Worm, Altar of the Dragon, Tomb of Greed and Where the Giant Sleeps. They were visible as public mapped Dungeon titles, but were not independently corroborated in this pass by the selected activity/database sources at a publication-safe threshold.

## Taxonomy

Published subtypes:

- `NORMAL_DUNGEON`
- `TRAIT_DUNGEON`
- `CURRENCY_DUNGEON`

Observed but not fully published in this sprint:

- `STORY_DUNGEON`
- `RAID`
- `SUPPRESSION`
- `PLATFORM_DUNGEON`
- `ABILITY_DUNGEON`
- `MATERIAL_DUNGEON`
- `TRIAL_TOWER`
- `CRACK_DUNGEON`

## Published Markers

| Dungeon | Subtype | Region | Sources | Status | Precision | Published |
|---|---|---|---|---|---|---|
| Dragon Worshipper Ruins | `CURRENCY_DUNGEON` | Meadow of Beginnings | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Rusted Tusk Bandits' Treasure Vault | `NORMAL_DUNGEON` | Skyridge Uplands | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Goblin Bandits' Cave | `NORMAL_DUNGEON` | Meadow of Beginnings | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Silver Tusk Bandits' Supply Depot | `NORMAL_DUNGEON` | Field of Plenty | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Residual Worm Cleanup Zone | `CURRENCY_DUNGEON` | Skyridge Uplands | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Fang Bandits' Arena | `NORMAL_DUNGEON` | Orbis Castle Approach | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Corrupted Bedchamber | `NORMAL_DUNGEON` | Shadowed Woods | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warg Cave | `NORMAL_DUNGEON` | Shadowed Woods | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Endless Summoning Grounds | `CURRENCY_DUNGEON` | Field of Plenty | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Mantius of Amplitude | `TRAIT_DUNGEON` | Shadowed Woods | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Underground Goblin Village | `NORMAL_DUNGEON` | Shadowed Woods | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Eroded Underground Cemetery | `CURRENCY_DUNGEON` | Misty Veil Highlands | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Coastal Cliff Cave Outpost | `NORMAL_DUNGEON` | Silver Ford Lake | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Dark Swamp | `NORMAL_DUNGEON` | Misty Veil Highlands | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Warg Enclosure | `NORMAL_DUNGEON` | Steelheart Fortress | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Rock Tribe Base | `NORMAL_DUNGEON` | Dragonrise Basin | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Collapsed Sanctuary | `NORMAL_DUNGEON` | Dragonrise Basin | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| The Graveyard Where Tragedy Sleeps | `NORMAL_DUNGEON` | Moss Forest Logging Site | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Forest of Entangled Roots | `NORMAL_DUNGEON` | Starshade Forest | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Trace of the Giant | `CURRENCY_DUNGEON` | Dragonrise Basin | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |
| Ashen Ruins | `NORMAL_DUNGEON` | Moss Forest Logging Site | `.org` map layer; `.net` database; `.net` guide; Steam context | `SECONDARY_CORROBORATED` | `REGION_APPROXIMATE` | Yes |

## Evidence Boundary

- `.net` dungeon records corroborate activity names and Normal/Trait/Currency subtype.
- `.org` public map layer corroborates that a named Dungeon entrance exists in a public Orbis map layer.
- Official Steam context confirms the game world includes caves and dungeons, but does not confirm individual entrance coordinates.
- No marker is upgraded to `OFFICIAL_VERIFIED`, `VIDEO_VERIFIED` or `FIRST_HAND_VERIFIED`.
- Coordinates are DragonSwordGuide schematic placements only.

## Product Checks

- Dungeon category is available as a map filter.
- Search supports canonical names, aliases, region text and subtype text.
- Marker detail panels show Name, Subtype, Region, Verification and Precision.
- Activity notes deliberately exclude recommended levels, party size, unlock conditions, loot and route mechanics.

## Next Recommended Category

Compare remaining Warp Points against Bosses before starting Chest data. Bosses may offer higher user utility than attempting a complete chest pipeline while evidence quality is still uneven.
