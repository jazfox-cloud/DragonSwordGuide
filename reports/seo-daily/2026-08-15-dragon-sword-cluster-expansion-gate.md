# DragonSword Awakening SEO — Validated Cluster Expansion Gate Sprint

## 1. Executive Status

**GREEN.** Parent clusters remain healthy and production is technically normal. The strongest independent child signal is `/map/` → interactive map, but evidence feasibility and parent overlap are not sufficient for the 75-point gate. **`NO_CHILD_INTENT_READY`**. No public URL or page was created.

## 2. Latest Data Coverage

| Source | Latest complete / verified coverage | Status |
|---|---|---|
| GSC | 2026-08-12 | Read-only API refresh returned final rows; no newer complete date was available. |
| GA4 | 2026-08-12 | Latest verified Organic Search coverage remains 2026-08-12; no new credential/configuration was introduced. |
| Production | 2026-08-15 | Sitemap index and all 16 sitemap URLs checked. |

## 3. Comparable Windows

| Window | Clicks | Impressions | CTR | Avg position | Query rows | Pages with impressions | GA4 Organic sessions |
|---|---:|---:|---:|---:|---:|---:|---:|
| GSC latest 2d, Aug 11–12 | 56 | 1,162 | 4.82% | 7.83 | API row limit | 8 | — |
| GSC previous 2d, Aug 9–10 | 11 | 221 | 4.98% | 7.90 | API row limit | 5 | — |
| GA4 latest 2d, Aug 11–12 | — | — | — | — | — | — | 52 |
| GA4 previous 2d, Aug 9–10 | — | — | — | — | — | — | 6 |
| GSC latest 7d, Aug 6–12 | 67 | 1,383 | 4.84% | 7.84 | API row limit | 8 | — |
| GSC previous 7d, Jul 30–Aug 5 | `NO_PRIOR_ROWS` | `NO_PRIOR_ROWS` | N/A | N/A | 0 | 0 | — |
| GA4 latest 7d, Aug 6–12 | — | — | — | — | — | — | 58 |
| GA4 previous 7d, Jul 30–Aug 5 | `NO_PRIOR_ROWS` | — | — | — | — | — | 0 |

The GSC collector intentionally used a 25,000-row limit; the aggregate endpoint returns one total row, so page/query breakdowns are used for cluster decisions. No percentage growth is claimed for the 7-day comparison.

## 4. Parent Cluster Ranking

Scores use Search Strength /25, Child Evidence /25, Evidence Quality /20, Expansion Value /20 and Cannibalization Safety /10.

| Parent cluster | Score | Best child intent | Gate result |
|---|---:|---|---|
| Roadmap | 80 | Latest update / patch | `NEAR_READY` |
| Map | 71 | Interactive map | `NEAR_READY` |
| Runes | 68 | Rune synthesis | `OBSERVE` |
| Builds | 58 | Character-specific build | `OBSERVE` |
| Characters | 34 | Named hero guide | `HOLD` |

Roadmap is the strongest parent cluster. Map has the strongest independent child shape, but neither passes the expansion gate.

## 5. Roadmap Child Analysis

| Query | Landing URL | Clicks | Impressions | CTR | Position | Intent bucket |
|---|---|---:|---:|---:|---:|---|
| `dragon sword awakening roadmap` | `/roadmap/` | 11 | 80 | 13.75% | 7.15 | roadmap |
| `dragonsword roadmap` | `/roadmap/` | 8 | 45 | 17.78% | 4.64 | roadmap |
| `dragonsword awakening roadmap` | `/roadmap/` | 6 | 232 | 2.59% | 7.57 | roadmap |
| `roadmap dragonsword` | `/roadmap/` | 2 | 9 | 22.22% | 3.78 | roadmap |
| `dragonsword awakening next update` | `/roadmap/` | 1 | 2 | 50.00% | 7.00 | latest update |
| `dragon sword roadmap` | `/` | 0 | 1 | 0% | 2.00 | mixed ownership |
| `dragon sword roadmap` | `/roadmap/` | 0 | 4 | 0% | 6.25 | mixed ownership |
| `dragonsword awakening future updates` | `/roadmap/` | 0 | 1 | 0% | 6.00 | future content |

Child decisions:

| Candidate | Standalone SERP | Repeated GSC | Evidence B | Parent overlap / decision |
|---|---|---|---|---|
| Upcoming Heroes | Unclear | No specific named-hero rows | Insufficient current official schedule | High / `OBSERVE` |
| Latest Update / Patch | Partly | One small next-update row; roadmap family is large | Good for confirmed updates | High / `MERGE_PARENT` |
| Future Content | Unclear | Sparse future-update rows | Official roadmap can support parent facts | High / `MERGE_PARENT` |
| Update Schedule | No clear independent shape | No repeated schedule rows | Not enough schedule evidence | High / `OBSERVE` |
| Named system / feature | No | No repeated named child intent | Not established | `REJECT` |

## 6. Runes Child Analysis

| Query / intent | GSC signal | SERP independence | Evidence | Parent overlap | Decision |
|---|---|---|---|---|---|
| Rune synthesis | 1 click / 3 impressions / position 4 | Medium | Strong narrow official boundary | High | `MERGE_PARENT` |
| 5-star runes | No actual current row | Medium | Partial official support only | High | `OBSERVE` |
| Rune farming | No actual current row | Weak | No verified route/drop evidence | High | `REJECT` |
| Rune stats / best runes | No actual current row | Third-party pattern only | Weak without first-hand testing | High | `OBSERVE` |
| Rune locations | No actual current row | Weak / noisy | No complete official route | Medium | `OBSERVE` |

The parent owns the only current synthesis query and can satisfy it more safely than a separate page.

## 7. Map Child Analysis

| Intent | GSC clicks | Impressions | Position | SERP independence | Evidence feasibility | Decision |
|---|---:|---:|---:|---|---|---|
| Interactive map | 3 | 32 | mixed, about 8–15 on primary rows | Yes | Medium-low; no stable first-hand marker inventory | `OBSERVE` |
| Chest locations / all chests | 0 | 1 | 20 | Yes | Low; community WIP only | `OBSERVE` |
| Locations | 0 | 9 | mixed | Partial | Low | `OBSERVE` |
| Treasure | 0 | 0 | N/A | Unknown | Low | `REJECT` |
| Puzzles / points of interest | 0 | 0 | N/A | Unknown | Low | `REJECT` |

The interactive-map cluster is the strongest child candidate in shape, but the evidence gate fails: Reddit demand is Evidence C and the existing parent still has substantial overlap.

## 8. Builds Child Analysis

| Query / intent | Landing URL | Clicks | Impressions | Position | Decision |
|---|---|---:|---:|---:|---|
| `dragonsword awakening build` | `/builds/` | 2 | 8 | 16.25 | `OBSERVE` |
| `dragonsword awakening builds` | `/builds/` | 2 | 4 | 16.25 | `OBSERVE` |
| `dragon sword awakening build` | `/builds/` | 1 | 3 | 5.67 | `OBSERVE` |
| `dragon sword awakening build` | `/systems/runes/` | 1 | 1 | 8.00 | `MERGE_PARENT` |
| Character-specific / Karma-specific / Rune-specific build | No current named query | 0 | 0 | N/A | `REJECT` |

External community discussion about “best Karmas, Runes & Stats” supports demand observation, not a publishable character or build page. It does not overcome low GSC volume and high overlap with `/characters/`, `/teams/` and `/systems/runes/`.

## 9. Characters Child Analysis

| Hero query | Landing URL | Clicks | Impressions | Position |
|---|---|---:|---:|---:|
| `dragonsword : awakening all character` | `/characters/` | 0 | 1 | 25.00 |
| `dragonsword awakening characters` | `/characters/` | 0 | 2 | 42.50 |

No named hero, unlock, skill or character-guide query has current GSC evidence. Decision: `HOLD`; no character child candidate is expansion-ready.

## 10. Approved Candidate

**`NO_CHILD_INTENT_READY`**

Strongest near-candidate: `/map/` → **interactive map**. Score: **71/100**. It fails the full gate because Evidence Strength is below 15, first-hand feasibility is incomplete, and parent overlap remains material. No URL is proposed for creation.

## 11. Roadmap Post-Change Status

`/roadmap/` current latest 2-day metrics: **38 clicks, 589 impressions, 6.45% CTR, position 6.98**. Query ownership is concentrated on `/roadmap/`, while `dragon sword roadmap` still has a homepage row. Classification: **`WINNER_WAIT_MORE_DATA`**. The 2-day post-change sample is positive but not yet sufficient for confirmed causality.

## 12. Multiplayer Observation

Latest 2-day: **0 clicks, 252 impressions, 0% CTR, position 8.10**. Latest 7-day: 0 clicks, 304 impressions, 0% CTR, position 8.08. It remains `HIGH_IMPRESSIONS_ZERO_CLICK`; it was not considered for expansion and no CTR experiment was run.

## 13. Structural Page Observation

| Page | Status |
|---|---|
| `/guides/beginner/` | `NOT_ENOUGH_DATA` |
| `/price/` | `NOT_ENOUGH_DATA` |
| `/system-requirements/` | `NOT_ENOUGH_DATA` |

## 14. External Demand Signals

| Topic | Source Type | New Signal | Relevant Parent | Impact |
|---|---|---|---|---|
| Interactive chest map | Reddit / Evidence C | WIP map received another positive response on Aug 14. | `/map/` | `SUPPORTS_PARENT_ONLY` |
| Karma / Rune / stats comparison | Reddit / Evidence C | Aug 14 post reports a new comparison spreadsheet and positive user response. | `/builds/`, `/systems/runes/` | `OBSERVE` |
| Story / chapter discussion | Reddit / Evidence C | Aug 13–14 discussion reaches chapter 29–32, but provides no verified route inventory. | `/guides/beginner/` | `OBSERVE` |
| Multiplayer scope | Reddit / Evidence C | Older developer/community FAQ distinguishes raids/boss co-op from open-world co-op; not a new child signal. | `/multiplayer/` | `SUPPORTS_PARENT_ONLY` |
| Community channel friction | Reddit / Evidence C | Moderation requests continue for the locked subreddit; this is distribution friction, not content evidence. | none | `IGNORE` |

No recent YouTube result met the threshold for a separate child-intent signal. Sources: [interactive map thread](https://www.reddit.com/r/DSwordAwakening/comments/1vap7qr/all_chests_locations_interactive_map/), [build comparison thread](https://www.reddit.com/r/DragonSwordAwakening/comments/1vnnt1cw/new_findings_change-your-entire-build-best-karmas-runes-stats/), [story thread](https://www.reddit.com/r/DSwordAwakening/comments/1vnf2cm/jaw_dropping_moment/), [community FAQ](https://www.reddit.com/r/DragonSwordAwakening/comments/1t83k1i/faq_dragonsword_awakening/).

## 15. Single Biggest SEO Constraint

**Independent child evidence is still weaker than parent demand.** The site has meaningful parent-level traffic, but child candidates either have sparse GSC rows, high parent overlap, or Evidence C without first-hand/official depth. Creating a URL now would convert an interesting signal into an unsupported expansion.

## 16. Next Sprint

1. Re-run the fixed GSC/GA4 windows after another complete reporting delay and keep the Roadmap change boundary fixed.
2. Recheck `/map/` interactive-map ownership and collect first-hand marker/coordinate evidence before reconsidering a child page.
3. Recheck Builds/Rune query separation; keep all character-specific and Karma-specific ideas at `OBSERVE` until current GSC evidence repeats.

## 17. Technical Health Sanity Check

- Sitemap index: HTTP 200; one sitemap listed and 16 route URLs returned.
- Homepage and all 16 sitemap URLs: HTTP 200, one H1, self-canonical, no accidental noindex.
- No page, source, metadata, internal-link, DNS, Cloudflare, GSC, GA4, AIOS or WOS changes.
- `git diff --check`: run after report creation.

## 18. Files Changed

Only this report is expected to change. Existing untracked `.DS_Store`, brand-pack files and `doct/` are preserved.
