# DragonSwordGuide Map Data Expansion Sprint B4: Bosses

Date: 2026-08-23
Target: https://dragonswordguide.com/map/
Scope: BOSSES only

## Summary

This sprint published open-world Field Boss map markers only. Dungeon, raid and internal boss encounters were treated as location-unresolved for the world map and were not added as production markers.

Coordinates use `OWN_SCHEMATIC_ORBIS_BASE_MAP` plus `IMAGE_RELATIVE_COORDINATES`. They are DragonSwordGuide-owned schematic placements, not copied competitor coordinates.

## Candidate Inventory

Boss location-level candidates found: 9 Field Bosses.
Estimated mapped Field Boss total: 9.
Published: 9.
Held back: dungeon/raid/internal boss encounters and any boss names without world-map location evidence.

## Published Bosses

| Boss | Type | Region | Sources | Status | Precision | Published |
|---|---|---|---|---|---|---|
| Scraping Brack | FIELD_BOSS | Autumnleaf Zone | DragonSword-Awakening.org map labels; DragonSwordAwakening.net map-icon guide; GrandWiki map; world-boss name guide; official Steam context | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |
| Horg the Roamer | FIELD_BOSS | Hill of Journey | DragonSword-Awakening.org map labels; DragonSwordAwakening.net map data; GrandWiki map; world-boss name guide; official Steam context | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |
| Hagen the Dark Necromancer | FIELD_BOSS | Ruined Temple | DragonSword-Awakening.org map labels; DragonSwordAwakening.net map-icon guide; GrandWiki map; world-boss name guide; official Steam context | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |
| Andras the Cave Predator | FIELD_BOSS | Bluehill Wetlands | DragonSword-Awakening.org map labels; DragonSwordAwakening.net map-icon guide; GrandWiki map; world-boss name guide; official Steam context | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |
| Barpedin, the Crushing Darkness | FIELD_BOSS | A Forgotten Haven | DragonSword-Awakening.org map labels; DragonSwordAwakening.net map-icon guide; GrandWiki map; world-boss name guide; official Steam context | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |
| Karon the Tyrant | FIELD_BOSS | Dragon's Stonepeak | DragonSword-Awakening.org map labels; DragonSwordAwakening.net map data; GrandWiki map; world-boss name guide; official Steam context | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |
| Pakirus the Specter of Thirst | FIELD_BOSS | Slumbering Star Tree | DragonSword-Awakening.org map labels; DragonSwordAwakening.net map-icon guide; GrandWiki map; world-boss name guide; official Steam context | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |
| Hungry Eyes Octavia | FIELD_BOSS | Starshade Forest | DragonSword-Awakening.org map labels; DragonSwordAwakening.net map-icon guide; GrandWiki map; world-boss name guide; official Steam context | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |
| Flaming Ash Feather Lavanis | FIELD_BOSS | Skyfeather Ridge | DragonSword-Awakening.org map labels; DragonSwordAwakening.net map-icon guide; GrandWiki map; world-boss name guide; official Steam context | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |

## Alias Normalization

World Boss and Field Boss language is normalized into aliases so users can search either term. Known name variants were retained as aliases instead of treated as conflicts:

- Barpedin, the Crushing Darkness / Barpedin the Crushing Darkness
- Hungry Eyes Octavia / Hungry Eye Octavia
- Flaming Ash Feather Lavanis / Lavanis Feather of Burning Ashes

## Evidence Boundary

Published facts are limited to boss name, boss type, region/nearby public map label, approximate placement on DragonSwordGuide's schematic map and source provenance.

This sprint does not publish exact in-game coordinates, dynamic timing, reward tables, route safety, recommended power, party size or internal dungeon/raid boss locations.

## Sources Used

- https://dragonsword-awakening.org/maps?type=TOWN
- https://dragonswordawakening.net/map
- https://dragonswordawakening.net/guides/exploration-and-map-icons
- https://dsawakening.grandwiki.com/map
- https://dragonsword-awakening.wiki/guides/guide/world-boss-rewards-1-0-4
- https://store.steampowered.com/app/4570720/DragonSword__Awakening/

## Result

Boss coverage: 9 published / 9 mapped Field Bosses.
Boss confidence: LOW.
Boss verification status: SECONDARY_CORROBORATED.
Boss precision: REGION_APPROXIMATE.
Conflicting Boss markers: 0.
