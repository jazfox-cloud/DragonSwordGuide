# DragonSwordGuide Map Expansion - Eona Stop-Loss and Organa Start

Run date: 2026-08-23

## Scope

This sprint followed the updated map data expansion rule: official and video evidence were checked first, but first-hand verification is no longer required before publishing honest, approximate, source-corroborated markers.

The Eona review focused on:

- Eona's Legacy - Meadow of Beginnings
- Eona's Legacy - Dragonrise Basin

The post-Eona expansion started:

- ORGANA_STATUE_VERIFICATION_AND_EXPANSION

## Eona result

No new individual-location `OFFICIAL_VERIFIED`, `VIDEO_VERIFIED` or `FIRST_HAND_VERIFIED` evidence was found during the limited stop-loss recheck. The three published Eona markers remain:

- `marker:eonas-legacy:meadow-of-beginnings`
- `marker:eonas-legacy:shadowed-woods`
- `marker:eonas-legacy:dragonrise-basin`

All three are `SECONDARY_CORROBORATED`, `MEDIUM` confidence and approximate schematic placements.

## Organa result

Organa expansion started by replacing the three generic beta placeholders with five named markers:

- `marker:organa-statue:shaded-tree-hill`
- `marker:organa-statue:autumnleaf-zone`
- `marker:organa-statue:worms-valley`
- `marker:organa-statue:ruined-temple`
- `marker:organa-statue:echo-canyon`

Each marker uses at least two independent public secondary sources for name, category, region and nearby landmark agreement. Coordinates are DragonSwordGuide-owned schematic placements only. No third-party marker JSON, coordinate database, map image, icon pack, source code or descriptive copy was imported.

The `Organa 13 vs 14` count conflict is retained in production metadata as `13_VS_14_CONFLICT_RETAINED`. This sprint does not assert a complete statue set count.

## Sources used

- Webzen official Eona guide: https://dragonsword.webzen.co.kr/gameinfo/guide/detail/3138
- Steam achievements: https://steamcommunity.com/stats/4570720/achievements
- DragonSword Awakening Wiki Eona guide: https://www.dragonsword-awakening.wiki/guides/guide/eonas-legacy-locations
- DragonSword Awakening Wiki Eona map reference: https://www.dragonsword-awakening.wiki/tools/map?marker=eona-dragonrise-basin
- DragonSwordAwakening.net Eona guide: https://dragonswordawakening.net/guides/eonas-legacy-and-windmills
- DragonSword Awakening Wiki Organa guide: https://www.dragonsword-awakening.wiki/guides/guide/goddess-statues-organa-locations
- GAMES.GG Organa guide: https://games.gg/dragonsword-awakening/guides/dragonsword-awakening-guide-how-to-restore-all-statues-of-organa/
- SmartCDKeys Organa guide: https://smartcdkeys.com/en/blog/dragonsword-awakening-where-to-find-all-statue-of-organa-pieces
- VGTimes Organa guide: https://vgtimes.com/guides/163103-dragonsword-awakening-statue-of-organa-locations-guide.html

## Verification

- `npm test` failed before data changes with `expected at least 8 production beta markers after Organa expansion start`.
- After implementation, `npm run build`, `npm test`, browser smoke and production smoke should verify marker count, filters, search, source badges and retained conflict metadata.
