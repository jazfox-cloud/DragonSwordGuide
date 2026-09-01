# DragonSword Awakening 1.0.11 Planned Freshness Correction

Date: 2026-09-01

Sprint: `OFFICIAL_PLANNED_FRESHNESS_CORRECTION`

Scope: factual freshness correction only; no content expansion and no new URL

## 1. Official facts checked

- Pre-flight production branch/HEAD: `main` at `cea658f5f95c1141a8c4c208d2ebac4d693c8134`; `origin/main` matched after a fresh fetch.
- The latest official Steam announcement list was checked before editing. No applied patch newer than 1.0.10 was present.
- Latest applied patch: 1.0.10, applied 2026-08-19.
  - Source: <https://steamcommunity.com/games/4570720/announcements/detail/1841579228664485>
- Next announced patch: 1.0.11, planned for 2026-09-03 KST.
  - Source: <https://steamcommunity.com/games/4570720/announcements/detail/1842212951302260>
- The 1.0.11 source describes a development preview. It states that actual update details and the schedule may differ.
- Previewed 1.0.11 scope is limited to Retry and stronger matchmaking, Just Dodge, Lock-On and Switching improvements, balance work for Tarte/Lute/Aria/Roxy/Astria/Kalsion, QoL improvements, and additional bug fixes.
- Ryza, Othello Hero Quest, and Hunt Hell Mode appear separately under “Coming Next”; the source does not guarantee that all three ship on September 3.

## 2. Stale claims found

| Surface | Classification | Finding | Action |
| --- | --- | --- | --- |
| EN Roadmap hero / Quick Answer | `STALE_PLANNED_CLAIM` | Sweeping wording said future content had no confirmed release dates. | Corrected to distinguish the 1.0.11 official target from later date-unknown items. |
| EN Roadmap timeline | `STALE_PLANNED_CLAIM` | The planned block said official material did not provide a confirmed date for each item without acknowledging the dated 1.0.11 preview. | Added an explicit 1.0.11 planned block and a separate later/date-unknown block. |
| JA Roadmap Quick Answer / timeline | `STALE_PLANNED_CLAIM` | Japanese copy likewise treated future timing as wholly unconfirmed. | Corrected to the same applied/planned/date-unknown hierarchy as EN. |
| Earlier dated SEO report | `HISTORICAL_CONTEXT` | Recorded what the page said on 2026-08-13. | Retained unchanged as historical evidence. |
| Later roadmap items without dependable dates | `STILL_CORRECT` | Jerome, Veronica, Logan, broader Hero Quest/Rift/Raid direction, console/crossplay/co-op details still lack dependable dates or current confirmation. | Kept date-unknown and clearly scoped. |

The final full-repository scan found the removed sweeping phrases only in the regression test's prohibited-claim fixtures, not in live page copy.

## 3. Shared-source changes

- `latestAppliedPatch` remains 1.0.10 and now carries explicit `status: RELEASED`.
- Added `nextAnnouncedPatch` for 1.0.11 with:
  - `status: PLANNED`
  - `targetDate: 2026-09-03`
  - `targetTimezone: KST`
  - `appliedDate: null`
  - `scheduleConfidence: OFFICIAL_TARGET_SUBJECT_TO_CHANGE`
  - the official Steam preview source
- The existing 1.0.10 official source was retained.

## 4. EN Roadmap changes

- Kept the title, H1, canonical, Article structured-data intent, internal links, and existing URL.
- Updated the description, Quick Answer, current/next block, timeline, source attribution, `Last Verified`, and `dateModified` only.
- Preserved the visible hierarchy:
  - `Released / current`: 1.0.10 applied
  - `Announced / planned`: 1.0.11 targeted for September 3, 2026 KST, subject to change
  - `Later / date unknown`: official items without dependable dates
- Included only the high-level items present in the official preview.
- Kept “Coming Next” separate from guaranteed September 3 content.

## 5. JA Roadmap changes

- Updated `/ja/roadmap/` to the same factual state with natural Japanese copy.
- It now states that 1.0.10 is currently applied, 1.0.11 is officially announced for 2026年9月3日 KST, and the content/schedule may change because it is still in development.
- Canonical, reciprocal hreflang, x-default, source links, and revision metadata were preserved and refreshed.

## 6. Homepage decision

`NO_HOMEPAGE_CHANGE_REQUIRED`

- EN homepage says 1.0.10 is applied and links to `/roadmap/`; it does not claim that no successor exists.
- JA homepage does not publish a contradictory current/next patch claim and links to `/ja/roadmap/`.
- No patch-article copy was added to either homepage.

## 7. Multiplayer decision

`NO_MULTIPLAYER_CHANGE_REQUIRED`

- EN and JA Multiplayer pages remain live-fact-first and describe current 1.0.10 behavior.
- Neither page claims that no future multiplayer improvements exist.
- Planned Retry and stronger matchmaking were therefore not mixed into current/live mechanics.

## 8. Claims deliberately excluded

- No exact Retry flow.
- No exact Lock-On behavior.
- No exact hero balance values, damage changes, or cooldown changes.
- No claim that Ryza, Othello Hero Quest, or Hunt Hell Mode is guaranteed for September 3.
- No Mods/Workshop expansion. The retracted Workshop notice was not treated as a patch: `NO_MOD_POLICY_CHANGE_IN_THIS_SPRINT`.
- No Map, markers, Builds, Teams, DNS, Cloudflare configuration, GSC, or GA4 changes.

## 9. Tests

- TDD RED: the extended freshness contract failed because `latestAppliedPatch.status` and `nextAnnouncedPatch` did not exist.
- TDD GREEN: the contract passed after shared state and EN/JA Roadmap corrections.
- `npm run build`: passed; 23 generated pages.
- `npm test`: passed, including freshness/status, Map, chest pipeline, visual integration, hreflang, and Japanese Map checks.
- `npm run i18n:stale`: passed for all six localized source pairs.
- `npm run i18n:audit`: passed.
- SEO contract: passed for 16 EN + 6 JA sitemap URLs; exactly one H1, self-canonical, indexable, and internal links resolved.
- `git diff --check`: passed.
- Sitemap before/after: 16 EN + 6 JA = 22 indexable URLs before; 16 EN + 6 JA = 22 after.

## 10. Global consistency audit

| Surface | Current applied | Next announced | Status | Result |
| --- | --- | --- | --- | --- |
| EN homepage | 1.0.10 | Not surfaced; links to Roadmap | Current-only, no stale denial | PASS |
| EN Roadmap | 1.0.10 | 1.0.11 / Sep 3 KST | Planned; subject to change | PASS |
| EN Multiplayer | 1.0.10 live facts | Not surfaced | Live-fact-first | PASS |
| JA homepage | Not surfaced | Not surfaced; links to JA Roadmap | No contradictory claim | PASS |
| JA Roadmap | 1.0.10 | 1.0.11 / 2026年9月3日 KST | 公式予告; 変更可能性あり | PASS |
| JA Multiplayer | 1.0.10 live facts | Not surfaced | Live-fact-first | PASS |

Historical 1.0.7, 1.0.8, and 1.0.9 references remain where they describe earlier patch history.

## 11. Production verification

- Content commit: `27b73e9` (`Align DragonSword roadmap with 1.0.11 preview`).
- Push: `cea658f..27b73e9  HEAD -> main`.
- Cloudflare Pages project: `dragonswordguide` (GitHub-backed production deployment).
- Deployment: `9ed14888-34aa-43d1-81ba-f324c04bd899`, Production / Active, source `27b73e9`.
- Preview: <https://9ed14888.dragonswordguide.pages.dev>
- Custom domain: <https://dragonswordguide.com>
- Preview and custom domain both passed the required-route verification for `/`, `/roadmap/`, `/multiplayer/`, `/ja/`, `/ja/roadmap/`, and `/ja/multiplayer/`:
  - HTTP 200
  - self-canonical to the custom domain
  - no accidental `noindex`
  - reciprocal EN/JA hreflang and x-default
  - Roadmap shows 1.0.10 as applied and 1.0.11 as planned for September 3 KST with the development/schedule caveat
  - Ryza, Othello Hero Quest, and Hunt Hell Mode remain separate from guaranteed September 3 content
  - Multiplayer remains live-fact-first and does not present planned Retry/matchmaking changes as available
  - sitemap counts remain 16 EN + 6 JA
- No propagation retry was required.

## 12. Final status

`PASS`
