# DragonSword Official Freshness Correction

Date: 2026-08-26

## 1. Executive Status

Status: `PRODUCTION_VERIFIED`

This was a `FACTUAL_FRESHNESS_CORRECTION`. It updated current-version facts from official Steam primary sources without creating a URL, changing Map coordinates or marker counts, expanding an SEO cluster, or touching Product Architecture research.

- `NO_NEW_URL_CREATED`
- `NO_NEW_CLUSTER_CREATED`
- `NO_MAP_DATA_IMPACT`
- `NO_SITE_MOD_POLICY_CONTENT`
- Evidence class for all new game facts: `Evidence B — Official Primary Source`

## 2. Latest Official Patch

| Fact | Current Official Value | Source |
|---|---|---|
| Latest applied patch | Update Notes 1.0.10 | [Official Steam announcement](https://steamcommunity.com/games/4570720/announcements/detail/1841579228664485) |
| Patch date | 2026-08-19 | Official Steam announcement display date; Steam News API timestamp falls on 2026-08-20 UTC |
| Previous patch | Update Notes 1.0.9, 2026-08-12 | [Official Steam announcement](https://steamcommunity.com/games/4570720/announcements/detail/1840944183775546) |
| Multiplayer latest relevant change | Multiplayer lobbies disband the party when the party leader is unresponsive for a long time | Official 1.0.10 notes |
| Map latest relevant change | Corrected mismatched location images for Treasure Map of the Strong Horde, Treasure Map of the Stone Spine and Treasure Map of the Highlands | Official 1.0.10 notes |
| Workshop/mod current state | The advance notice and guidelines were retracted, nothing was applied, and Steam Workshop direction will be reconsidered from the beginning | [Official retraction](https://steamcommunity.com/games/4570720/announcements/detail/1841579228677116) |

Announcements newer than 1.0.10 were checked separately from patches:

- 2026-08-24: `[Retracted][Advance Notice] Steam Workshop Support Plan & Mod Policy` — type: `NOTICE`, later withdrawn.
- 2026-08-24: `[Notice] Retraction of Steam Workshop Support Plan & Mod Policy Announcement` — type: `RETRACTION`; this is the latest official state found.

Neither announcement is a game-version update. No patch newer than 1.0.10 was found in the official Steam announcement feed during this run.

## 3. Stale-Fact Inventory

### STALE_CURRENT_CLAIM — corrected

| File / surface | Stale state found before correction | Resolution |
|---|---|---|
| `src/data/sources.ts` | 1.0.8 was the newest shared patch record | Added 1.0.9 history, 1.0.10 official record and `latestAppliedPatch` |
| `src/pages/index.astro` | Homepage badge and live signal presented 1.0.8 as applied/latest; verification trail said August 10 | Changed to 1.0.10, August 19 patch date and August 26 verification |
| `src/pages/roadmap/index.astro` | Source note, hero, Quick Answer, timeline and Released list called 1.0.8 latest/current | Changed current Released status to 1.0.10 and previous patch to 1.0.9 |
| `src/pages/multiplayer/index.astro` | 1.0.8 was labeled the latest checked official update; badge date was stale | Changed to 1.0.10 and added only its directly relevant lobby behavior |
| `src/pages/ja/roadmap/index.astro` | Japanese Quick Answer, timeline and Released list used 1.0.8 as current | Changed to 1.0.10 with 1.0.9 previous-patch context |
| `src/pages/ja/multiplayer/index.astro` | Japanese source list called 1.0.8 the latest checked update | Changed to 1.0.10 and added only the official leader-unresponsive lobby behavior |
| `src/i18n/sourceRevision.ts` and affected `src/content/ja/*.ts` | EN source dates/hashes no longer represented the corrected source pages | Refreshed home, roadmap and multiplayer source metadata; translated-at dates changed only for JA pages whose copy changed |

### HISTORICAL_REFERENCE — deliberately retained

- 1.0.7 Quick Entry, lobby search range, Map pin capacity and Rune changes remain dated historical facts on their owning pages.
- 1.0.8 and 1.0.9 remain in shared source history; 1.0.9 is explicitly the previous patch.
- `src/data/map-markers.json` contains 72 `1.0.8 public update context` values. These are marker evidence/capture context, not latest-patch claims, and were not rewritten without a Map evidence recheck.
- Dated reports and research under `reports/seo-daily/`, `reports/gsc-opportunity/`, `reports/i18n/`, `reports/map-product/`, `research/map/` and `docs/superpowers/` remain historical snapshots or generic templates.
- `package-lock.json` version 1.0.9 is a package dependency version, not a DragonSword game-version claim.

### CURRENT_AND_CORRECT — no correction needed

- Generic component labels such as `Last verified` and research schema fields such as `current version verified` are metadata vocabulary, not game-version claims.
- `/characters/` links the general official announcement feed without claiming an older patch is current.
- Runes, Builds and Teams references to 1.0.7 describe specific historical changes and do not present 1.0.7 as the latest patch.

## 4. Homepage Changes

- Shared current patch badge now renders Update 1.0.10 and August 19, 2026.
- The current signal is a concise summary of inventory/item-info/team-setting improvements, hero acquisition cinematics, and the relevant multiplayer/Treasure Map fixes.
- The full update path remains `/roadmap/`, with the badge linking directly to the official 1.0.10 source.
- WebSite `dateModified` and visible verification trail changed to 2026-08-26.

## 5. Roadmap Changes

- Quick Answer, current update badge, hero summary, Released timeline and Released list now identify 1.0.10 as applied.
- Released/current, Announced/planned and Unknown remain separate.
- 1.0.9 is the previous patch; 1.0.7 is retained only as historical feature context.
- `Last Verified` and Article `dateModified` changed to 2026-08-26.
- The page remains a roadmap/status owner and does not duplicate the full patch notes.

## 6. Multiplayer Changes

- Current patch context now uses official 1.0.10.
- Added only this official fact: multiplayer lobbies disband the party when the party leader is unresponsive for a long time.
- No timeout duration, invite-code behavior, matchmaking rule, story/open-world co-op state, host rule, loot rule or player count was inferred.
- Existing 1.0.7 Quick Entry and lobby-search-range facts remain historical feature evidence.
- EN and JA `Last Verified` and Article `dateModified` changed to 2026-08-26.

## 7. Map 1.0.10 Impact

Classification: `NO_MAP_DATA_IMPACT`

Repository audit found no exact record for Treasure Map of the Strong Horde, Treasure Map of the Stone Spine or Treasure Map of the Highlands in the production source/data layers. No current marker, coordinate, screenshot, visual anchor or evidence record depends on those three corrected official Treasure Map images.

The map does contain Treasure Chest markers and Misty Veil Highlands region records, but these are not the named Treasure Map items corrected by 1.0.10. The repository's earlier Map evidence audit also records no first-hand gameplay/map screenshots. Therefore:

- no Map source or data file changed;
- no marker position or quantity changed;
- no coordinate changed;
- no Map or JA Map `Last Verified` date was advanced.

## 8. Workshop/Mod Policy Result

Classification: `NO_SITE_MOD_POLICY_CONTENT`

No rendered public page contains a Mods, Steam Workshop, Workshop-support or Mod-policy claim. No dedicated Mods/Workshop page was created. The non-rendered shared source registry records only the official retraction URL so future audits do not reuse the withdrawn notice as current policy.

Current evidence boundary: the prior notice/guidelines were retracted and were not applied; Steam Workshop direction is being reconsidered. This report does not claim Workshop is available or confirmed for launch.

## 9. Japanese Parity

- `/ja/roadmap/` now identifies 1.0.10 as the latest applied patch and 1.0.9 as the previous patch.
- `/ja/multiplayer/` now includes the same narrow 1.0.10 leader-unresponsive lobby behavior as EN.
- `/ja/` contained no older current-patch claim; its source revision hash/date was reviewed after the EN source change.
- `/ja/map/` contained no latest/current patch claim and shares the unchanged Map dataset, so no Map copy or freshness date was changed.
- Self canonicals, reciprocal EN/JA hreflang and x-default remain validated.

## 10. Claims Deliberately Not Added

- Steam Workshop availability, confirmed launch or opening date.
- Any withdrawn Mod-policy rule or enforcement claim.
- Invite-code flow, exact lobby timeout, matchmaking rules beyond published notes, host/guest rules, player count or shared loot/progression behavior.
- Story/open-world co-op availability.
- Corrected coordinates or marker quantities for the three Treasure Maps.
- A 1.0.10 standalone page, Mods page, Workshop page, Cooking page, character page, or additional Japanese page.

## 11. Tests

| Check | Result |
|---|---|
| `npm run build` | PASS — 23 generated pages |
| `npm test` | PASS — freshness, Map MVP/data/visual, hreflang and JA Map checks |
| Freshness regression | PASS — current/latest claims agree on shared 1.0.10 |
| `npm run i18n:stale` | PASS — all six EN/JA source relationships current |
| `npm run i18n:audit` | PASS |
| Existing ad placement contract | PASS |
| SEO/internal-link/canonical contract | PASS — 16 EN + 6 JA sitemap URLs, one H1, self canonical, indexable and internally resolved |
| Sitemap consistency | PASS — 16 EN and 6 JA URLs; no URL count change |
| `git diff --check` | PASS |

## 12. Production Verification

Status: `PASS`

- Content commit: `5f74fc327f32ffc6c5a956177f6d396cfd9e97d7`
- Remote `origin/main`: matched content commit before deployment verification.
- Cloudflare Pages deployment: `3b4d8a8f-13ae-49e2-96ad-a25fdc5661e5`
- Cloudflare environment/branch/source: `Production` / `main` / `5f74fc3`
- Preview: `https://3b4d8a8f.dragonswordguide.pages.dev`
- Custom domain: `https://dragonswordguide.com`

No-cache checks returned HTTP 200 on preview and custom domain for:

- `/`
- `/roadmap/`
- `/multiplayer/`
- `/map/`
- `/ja/`
- `/ja/roadmap/`
- `/ja/multiplayer/`
- `/ja/map/`
- `/sitemap.xml`
- `/sitemap-index.xml`
- `/sitemap-en.xml`
- `/sitemap-ja.xml`

The required 1.0.10/JA freshness markers rendered on affected pages. All eight HTML routes retained the expected self canonical, no accidental `noindex`, reciprocal EN/JA hreflang and x-default. Both sitemap indexes referenced the EN/JA sitemaps; sitemap counts remained 16 EN and 6 JA. Preview and custom-domain results agreed, so no propagation retry or Cloudflare/DNS change was required.

## 13. Remaining Freshness Risks

- Patch status is volatile; a later official applied patch will require the same shared-source/current-claim audit.
- Steam's official page displays August 19 for 1.0.10 while the News API timestamp is August 20 UTC; the site preserves the official displayed date requested for public copy.
- The withdrawn Workshop announcement remains accessible as a retracted historical notice. Future audits must use the later retraction, not its obsolete body.
- Map marker records retain their actual 1.0.8 evidence context. They should be reverified only if a future official change materially affects their source evidence, not bulk-renamed to the newest patch.
