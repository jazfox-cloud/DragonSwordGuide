# DragonSwordGuide Eona Marker Verification Sprint A1

Date: 2026-08-22
Category: `EONAS_LEGACY`
URL: `https://dragonswordguide.com/map/`

## Outcome

This sprint investigated five Eona candidates and upgraded three production Eona markers from generic beta placeholders into named, source-corroborated records. No marker count was added. No marker was promoted to `VIDEO_VERIFIED`, `OFFICIAL_VERIFIED` or `FIRST_HAND_VERIFIED`.

## Source Review

- Official Webzen guide: confirms the Eona's Legacy system, Alvwyn prerequisite, fog clearing, warp and wind path behavior, but does not locate individual towers.
- Steam global achievements: confirms a tracked full-set Eona achievement, not individual positions.
- DragonSword Awakening Wiki Eona guide and interactive map: source-linked secondary reference with approximate pins and 11 Eona locations.
- DragonSwordAwakening.net Eona guide: independent secondary route guide aligning on the 11-location set and key puzzle/route descriptions.
- Nerdschalk Shadowed Woods guide: useful secondary article with gameplay stills credited to YouTube/WoW Quests; not enough for `VIDEO_VERIFIED` because no direct timestamped video URL was verified.

## Investigation Table

| Marker | Before | After | Evidence | Precision | Decision |
| --- | --- | --- | --- | --- | --- |
| Eona's Legacy - Meadow of Beginnings | Generic Eona placeholder, low confidence | `SECONDARY_CORROBORATED`, medium confidence | Official system context plus two secondary guides align on missing-cog route | `LANDMARK_APPROXIMATE` | Production upgraded |
| Eona's Legacy - Shadowed Woods | Generic Eona placeholder, low confidence | `SECONDARY_CORROBORATED`, medium confidence | Two secondary guides plus a secondary article with gameplay stills align on web-covered tower/fire solution | `LANDMARK_APPROXIMATE` | Production upgraded |
| Eona's Legacy - Dragonrise Basin | Generic Eona placeholder, low confidence | `SECONDARY_CORROBORATED`, medium confidence | Source-linked map reference plus two secondary guides align on platform-trial route | `REGION_APPROXIMATE` | Production upgraded |
| Eona's Legacy - Field of Plenty / Echo Canyon | Research-only candidate | No production change | Secondary sources align, but production marker slots were limited to three Eona pilots and no first-hand/video evidence was found | `LANDMARK_APPROXIMATE` candidate | Remain approximate |
| Eona's Legacy - Starshade Forest | Research-only candidate | No production change | Secondary sources align on waterfall/cave route, but no direct video or first-hand capture was found | `LANDMARK_APPROXIMATE` candidate | Remain approximate |

## Video Evidence Search

Searches covered:

- `DragonSword Awakening Eona's Legacy Meadow of Beginnings video`
- `DragonSword Awakening Dragonrise Basin Eona's Legacy video`
- `site:youtube.com/watch DragonSword Awakening Eona's Legacy`
- `DragonSword Awakening Shadowed Woods WoW Quests`

Result: no direct public video URL with a timestampable map view, region, marker/object and world context was verified. The Nerdschalk Shadowed Woods page contains article-embedded gameplay stills credited to YouTube/WoW Quests, but this was classified as secondary evidence only.

## Counts

INVESTIGATED: 5
UPGRADED: 3
REMAIN_APPROXIMATE: 2
CONFLICTING: 0

PRODUCTION_MARKER_COUNT: 6
OFFICIAL_VERIFIED: 0
VIDEO_VERIFIED: 0
FIRST_HAND_VERIFIED: 0
SECONDARY_CORROBORATED: 3
APPROXIMATE: 3

## Files Changed

- `src/data/map-markers.json`
- `src/components/InteractiveMap.astro`
- `src/pages/map/index.astro`
- `scripts/map-mvp-check.mjs`
- `reports/map-evidence/map-marker-verification-protocol.md`
- `reports/map-product/2026-08-22-eona-marker-verification-sprint.md`

## Main Evidence Gaps

- No DragonSwordGuide-owned gameplay capture.
- No direct public video URL with verified timestamp for the three upgraded production markers.
- No official source naming individual Eona tower locations.
- No permission to reuse third-party map coordinates or map assets.

## Next Recommendation

Run one first-hand capture pass for Meadow of Beginnings and Dragonrise Basin before expanding to Organa. If first-hand capture remains unavailable, the next category should stay limited to `ORGANA_STATUE` source-corroboration, not chest bulk import.
