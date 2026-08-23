# DragonSwordGuide Organa Expansion Sprint 2

Run date: 2026-08-23

## Scope

This sprint only touched `ORGANA_STATUE` production-safe map data for `https://dragonswordguide.com/map/`.

Eona markers stayed unchanged. Chests, Warp Points, Bosses, Mining, Gathering, NPCs and Dungeons were not started.

## Published marker table

| Marker | Sources | Region | Status | Precision | Published? |
| --- | --- | --- | --- | --- | --- |
| Statue of Organa - Shaded Tree Hill | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Shaded Tree Hill | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - Autumnleaf Zone | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Autumnleaf Zone | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - Worm's Valley | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Worm's Valley | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - Ruined Temple | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Ruined Temple | SECONDARY_CORROBORATED | REGION_APPROXIMATE | Yes |
| Statue of Organa - Echo Canyon | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Echo Canyon | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - Dragon's Stonepeak | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Dragon's Stonepeak | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - Skyfeather Ridge | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Skyfeather Ridge | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - The Barren Old Trading Post | Wiki, GAMES.GG, SmartCDKeys, VGTimes | The Barren Old Trading Post | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - A Forgotten Haven | Wiki, GAMES.GG, SmartCDKeys, VGTimes | A Forgotten Haven | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - Two Lakes Hill | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Two Lakes Hill | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - Stronghold Ridge | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Stronghold Ridge | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - Hill of Journey | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Hill of Journey | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |
| Statue of Organa - Seagull Village | Wiki, GAMES.GG, SmartCDKeys, VGTimes | Seagull Village | SECONDARY_CORROBORATED | LANDMARK_APPROXIMATE | Yes |

## New markers published in Sprint 2

- `marker:organa-statue:dragons-stonepeak`
- `marker:organa-statue:skyfeather-ridge`
- `marker:organa-statue:barren-old-trading-post`
- `marker:organa-statue:a-forgotten-haven`
- `marker:organa-statue:two-lakes-hill`
- `marker:organa-statue:stronghold-ridge`
- `marker:organa-statue:hill-of-journey`
- `marker:organa-statue:seagull-village`

All placements use DragonSwordGuide-owned schematic coordinates. No third-party marker JSON, full coordinate database, source code, map image, icon pack or copyrighted guide text was copied.

## 13 vs 14 investigation

| Source | Claimed total | Named entries | Duplicate-like entries | Version/date |
| --- | ---: | --- | --- | --- |
| DragonSword Awakening Wiki Organa guide | 13 | Shaded Tree Hill, Autumnleaf Zone, Worm's Valley, Ruined Temple, Dragon's Stonepeak, Skyfeather Ridge, The Barren Old Trading Post, A Forgotten Haven, Two Lakes Hill, Stronghold Ridge, Hill of Journey, Seagull Village, Echo Canyon | None visible | Release build 1.0.6, updated 2026-07-28 |
| GAMES.GG Organa guide | 13 | Same 13 regions as above | None visible | Updated 2026-07-29 |
| SmartCDKeys Organa guide | 13 | Same 13 regions as above | None visible in accessible public page | Published around 2026-07 |
| VGTimes Organa guide | 13 restoration entries plus a non-location troubleshooting section | Same 13 regions as above | The table of contents has a 14th section, but it is "What to Do If a Statue of Organa Will Not Restore", not a statue location | Published 2026-08-04 |
| DragonSwordAwakening.net trophies | 13 | Trophy target says restore Goddess Statue of Organa, target 13 | None visible | Crawled 2026-08 |
| DragonSwordAwakening.net exploration/map guide | 14 mapped | Does not expose a named 14th restoration entry in the public guide snippet/page text reviewed | Possible map-layer count or category-boundary entry | Accessed 2026-08 |

### Difference

The named restoration set converges on 13 entries. The only 14 signal found in this sprint is a public map-guide count saying `Statues of Organa 14 mapped`, without a visible extra named restoration location.

### Explanation

The strongest explanation is a category-boundary or map-layer-count mismatch: one source may be counting a mapped layer point that is not a separate restoration statue, while the guide/trophy-style completion intent counts 13 restorations. However, because the 14th entry is not named, the conflict is not fully resolved.

### Final verdict

`UNRESOLVED_13_VS_14`

`EXTRA_OR_MISSING_ENTRY: UNKNOWN_UNNAMED_14TH_MAP_LAYER_ENTRY`

The production dataset therefore publishes the 13 corroborated named restoration entries and keeps `13_VS_14_CONFLICT_RETAINED`.

## Coverage

`ORGANA_PUBLISHED: 13`

`ORGANA_CANDIDATES_KNOWN: 13 named restoration entries + 1 unnamed map-layer count discrepancy`

`ORGANA_ESTIMATED_TOTAL: 13-14`

`ORGANA_COVERAGE: 13 published / 13-14 known`

## Sources used

- https://www.dragonsword-awakening.wiki/guides/guide/goddess-statues-organa-locations
- https://games.gg/dragonsword-awakening/guides/dragonsword-awakening-guide-how-to-restore-all-statues-of-organa/
- https://smartcdkeys.com/en/blog/dragonsword-awakening-where-to-find-all-statue-of-organa-pieces
- https://vgtimes.com/guides/163103-dragonsword-awakening-statue-of-organa-locations-guide.html
- https://dragonswordawakening.net/records/trophies
- https://dragonswordawakening.net/guides/exploration-and-map-icons

## Verification plan

- `npm run build`
- `npm test`
- `git diff --check`
- local browser smoke: desktop and mobile
- production custom-domain smoke after deployment
