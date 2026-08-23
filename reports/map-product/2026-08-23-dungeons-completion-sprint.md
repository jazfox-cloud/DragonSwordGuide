# DragonSwordGuide Map Data Expansion Sprint B5: Complete Dungeon Entrances

Date: 2026-08-23
Target: https://dragonswordguide.com/map/
Scope: DUNGEON only

## Summary

This sprint reconciled the five held Dungeon entrance candidates from Sprint B2 and completed the world-map Dungeon entrance set at 26 / 26 mapped entrances.

No internal dungeon boss, raid-only stage, difficulty variant, reward variant or activity-only duplicate was added as a separate world-map marker.

Coordinates use `OWN_SCHEMATIC_ORBIS_BASE_MAP` plus `IMAGE_RELATIVE_COORDINATES`. They are DragonSwordGuide-owned schematic placements, not copied competitor coordinates.

## Inventory Reconciliation

EXISTING_DUNGEONS: 21

REMAINING_CANDIDATES: 5

- Dragon Worshipper Hideout, normalized to `Dragon Disciple's Hideout`
- Nest of the Great Worm
- Altar of the Dragon
- Tomb of Greed
- Where the Giant Sleeps

TRUE_MAPPED_ENTRANCE_TOTAL: 26

Decision: all five remaining candidates have world-map entrance/location meaning after checking public map-layer evidence against public technical-marker data and independent quest, walkthrough, activity or access context.

## Candidate Decisions

| Dungeon | Existing/New | Subtype | Evidence | Decision |
|---|---|---|---|---|
| Dragon Worshipper Ruins | Existing | CURRENCY_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Rusted Tusk Bandits' Treasure Vault | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Goblin Bandits' Cave | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Silver Tusk Bandits' Supply Depot | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Residual Worm Cleanup Zone | Existing | CURRENCY_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Fang Bandits' Arena | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Corrupted Bedchamber | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Warg Cave | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Endless Summoning Grounds | Existing | CURRENCY_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Mantius of Amplitude | Existing | TRAIT_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Underground Goblin Village | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Eroded Underground Cemetery | Existing | CURRENCY_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Coastal Cliff Cave Outpost | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Dark Swamp | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Warg Enclosure | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Rock Tribe Base | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Collapsed Sanctuary | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| The Graveyard Where Tragedy Sleeps | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Forest of Entangled Roots | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Trace of the Giant | Existing | CURRENCY_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Ashen Ruins | Existing | NORMAL_DUNGEON | Public map layer; dungeon database; dungeon guide; Steam context | Keep existing |
| Dragon Disciple's Hideout | New | STORY_DUNGEON | DragonSword-Awakening.org map label; GrandWiki marker layer; DragonSwordAwakening.net dungeon data; Into Indie Games walkthrough; Steam context | Publish as canonical marker; retain Dragon Worshipper Hideout as alias |
| Nest of the Great Worm | New | STORY_DUNGEON | DragonSword-Awakening.org map label; GrandWiki marker layer; DragonSwordAwakening.net dungeon data; Steam access discussion context; Steam context | Publish |
| Altar of the Dragon | New | STORY_DUNGEON | DragonSword-Awakening.org map label; GrandWiki marker layer; DragonSwordAwakening.net dungeon data; GCZ quest guide; Into Indie Games walkthrough; Steam context | Publish |
| Tomb of Greed | New | STORY_DUNGEON | DragonSword-Awakening.org map label; GrandWiki marker layer; DragonSwordAwakening.net dungeon data; Steam access discussion; official patch-context mirror | Publish |
| Where the Giant Sleeps | New | STORY_DUNGEON | DragonSword-Awakening.org map label; GrandWiki marker layer; DragonSwordAwakening.net dungeon data; GCZ quest guide; official patch-context mirror | Publish |

## Alias Normalization

`Dragon Worshipper Hideout` is treated as an observed public-map label and alias. `Dragon Disciple's Hideout` is used as the canonical name because public technical layers and independent walkthrough context use that name.

Each new marker also includes searchable aliases for:

- canonical name
- `The <name>`
- `<name> Dungeon`
- `<name> Entrance`
- `Story Dungeon - <name>`
- region-level dungeon search

## Evidence Boundary

Published facts are limited to dungeon name, subtype, broad region, entrance/location eligibility, approximate schematic placement and source provenance.

This sprint does not publish exact in-game coordinates, route steps, unlock state, recommended level, party size, drop tables, internal dungeon boss markers or raid stages.

## Sources Used

- https://dragonsword-awakening.org/maps?type=TOWN
- https://dsawakening.grandwiki.com/map
- https://dragonswordawakening.net/database/dungeons
- https://dragonswordawakening.net/guides/dungeons
- https://gcz.gg/en/games/dragon-sword-awakening/quests/where-the-giant-sleeps
- https://gcz.gg/en/games/dragon-sword-awakening/quests/ornette-s-request
- https://intoindiegames.com/walkthroughs/dragonsword-awakening-walkthrough-part-2-chapter-1/
- https://intoindiegames.com/walkthroughs/dragonsword-awakening-walkthrough-part-3-chapter-2/
- https://steamcommunity.com/app/4570720/discussions/0/581678051258051230/
- https://store.steampowered.com/app/4570720/DragonSword__Awakening/

## Result

DUNGEON_BEFORE: 21

DUNGEON_AFTER: 26

DUNGEON_TRUE_TOTAL: 26

DUNGEON_COVERAGE: 26 published / 26 mapped entrances

DUNGEON_SECONDARY_CORROBORATED: 26

DUNGEON_APPROXIMATE: 26

DUNGEON_CONFLICTING: 0
