# DragonSword Awakening SEO Daily Review — 2026-08-13

## 1. V2.1 Status

**GREEN with a small-sample limitation.** Production health is normal. Search signals now include repeat Rune impressions, the first Rune click, multiple Rune-related queries, repeat roadmap/build/map/multiplayer intent, and expanded Organic Search landing pages. This is not a claim of stable long-term growth; the latest API window is 2026-07-14 through 2026-08-11.

## 2. GSC Delta

The latest available Search Console date is **2026-08-11**. The refresh used `sc-domain:dragonswordguide.com`, Search type `web`, 2026-07-14 through 2026-08-11. The previous 16-impression baseline covered 2026-08-04 through 2026-08-10, so the totals below are directional rather than a like-for-like daily delta.

| Metric | Previous baseline | Latest available window | Delta / note |
|---|---:|---:|---:|
| Clicks | 0 | 31 | +31; window lengths differ |
| Impressions | 16 | 412 | +396; window lengths differ |
| Query rows | 2 | 60 | +58 |
| Non-brand query rows | 2 | 60* | +58* |
| Top 50 queries | 2 | 60 | +58 |
| Top 20 queries | 2 | 54 | +52 |
| Top 10 queries | 2 | 43 | +41 |
| Pages with impressions | 2 | 8 | +6 |

\* Search Console does not supply the site's brand/non-brand classification. The 60 figure follows the prior review's convention of treating game-intent rows as non-brand; it should not be read as an independently verified brand taxonomy.

### Runes

| Query | URL | Impressions | Clicks | CTR | Position |
|---|---|---:|---:|---:|---:|
| `dragon sword awakening runes` | `/systems/runes/` | 15 | 1 | 6.7% | 8.33 |
| `dragon sword awakening runes` | `/systems/runes/` | 3 | 0 | 0% | 9.67 |
| `runes dragonsword awakening` | `/systems/runes/` | 1 | 0 | 0% | 9.00 |
| `dragonsword runes` | `/systems/runes/` | 8 | 2 | 25.0% | 8.25 |
| `dragon sword awakening rune synthesis` | `/systems/runes/` | 3 | 1 | 33.3% | 4.00 |

The exact query is **IMPROVING / repeated**: it has a click, remains on `/systems/runes/`, and its observed position is better than the previous position 10.0. A second Rune-related query is present (`dragonsword runes`), plus synthesis intent. It has not established a Top 5 average for the exact query.

### Roadmap

Roadmap ownership is **OWNERSHIP_IMPROVING**. The exact `dragon sword roadmap` query still has one homepage row (1 impression, position 2), but also has a `/roadmap/` row (2 impressions, position 6). The larger roadmap query family lands on `/roadmap/`, including `dragon sword awakening roadmap` (56 impressions, 6 clicks) and `dragonsword awakening roadmap` (133 impressions, 4 clicks). Ownership is improving, not yet exclusive.

### Builds

`dragonsword awakening builds` (4 impressions, 2 clicks, position 16.25), `dragonsword awakening build` (5 impressions, 1 click, position 16.6), and related build rows are now present. This is a **BUILD_QUERY_SIGNAL**, not a reason to create a new URL; `/builds/` is receiving the intent.

### Teams

The latest GSC window contains multiplayer/team-adjacent intent but no new team-composition query rows. `/teams/` has 17 impressions in the page report and 4 Organic Search sessions in the GA4 window below. It remains an existing page to observe; no edit is authorized by today's gate.

## 3. GA4 Delta

GA4 property `549210618`, Organic Search only, latest available window 2026-07-14 through 2026-08-11:

| Landing page | Previous Organic sessions | Latest Organic sessions | Delta / note |
|---|---:|---:|---:|
| `/systems/runes/` | 3 | 11 | +8; windows differ |
| `/roadmap/` | 2 | 21 | +19; windows differ |
| `/teams/` | 1 | 4 | +3; windows differ |
| `/builds/` | 0 / N/A | 6 | new observed landing |
| `/map/` | 0 / N/A | 4 | new observed landing |
| `/characters/` | 0 / N/A | 3 | new observed landing |
| `/` | 0 / N/A | 3 | observed landing |
| `/guides/beginner/` | 0 / N/A | 2 | observed landing |

Latest Organic sessions across these landing pages: **54**. Direct, referral, and realtime traffic were excluded.

## 4. Runes Decision

**RUNES = VALIDATED_CLUSTER**

Gate evidence: Signal A repeated impressions; Signal B Organic Search sessions increased directionally; Signal C a second independent Rune query exists; Signal D first organic clicks; Signal E position improved from 10.0 to about 8.33. This does **not** authorize new Rune URLs today.

### Rune sub-intent research — research only

Search results were noisy for several exact long-tail terms. Third-party build/wiki pages show community interest in Rune stats/build choices, but they are not official evidence for game facts.

| Query | SERP intent / competitor type | Official evidence | Community demand | Overlap | Standalone intent | Score D/E/S/F | Action |
|---|---|---|---|---|---|---:|---|
| rune farming | acquisition/how-to; sparse mixed SERP | none found | weak | high | No | 5/8/9/13 = 35 | OBSERVE |
| best runes | recommendation/build pages | none for “best” | moderate | high | No | 9/7/10/14 = 40 | OBSERVE |
| rune synthesis | system explainer | Steam supports synthesis boundary | direct GSC query | medium | Maybe | 14/21/18/20 = 73 | POTENTIAL_CHILD_INTENT |
| 5 star runes | upgrade/result question | Steam supports 4-Star synthesis can yield 5-Star | weak SERP | medium | Maybe | 8/20/12/18 = 58 | OBSERVE |
| rune stats | database/build pages | no complete official stat table | moderate | high | No | 9/8/8/14 = 39 | OBSERVE |
| rune locations | location/how-to; sparse exact SERP | no complete official route | weak | medium | No | 5/7/9/15 = 36 | OBSERVE |

No child URL was created.

## 5. Existing Cluster Candidates

| Page | Evidence | Decision |
|---|---|---|
| `/map/` | GSC has `dragonsword awakening interactive map` (4 impressions, 1 click), `dragon sword interactive map` (2 impressions), and the page has 88 impressions / 4 Organic sessions. | **MAP = STRENGTHEN_CANDIDATE**; no edit today |
| `/characters/` | `dragonsword : awakening all character` (1 impression, position 25), `dragonsword awakening characters` (1 impression, position 22); 17 page impressions / 3 Organic sessions. | **OBSERVE** |
| `/multiplayer/` | Multiple query rows, including `is dragonsword awakening multiplayer` (16 impressions), `dragon sword awakening multiplayer` (8), and matchmaking; 178 page impressions but no latest Organic landing row. Steam discussion confirms players ask about co-op scope, but community is not official fact. | **STRENGTHEN_CANDIDATE**; no edit today |

Character query rows observed:

| Query | URL | Impressions | Clicks | Position |
|---|---|---:|---:|---:|
| `dragonsword : awakening all character` | `/characters/` | 1 | 0 | 25.0 |
| `dragonsword awakening characters` | `/characters/` | 1 | 0 | 22.0 |

## 6. New Demand Signals

| Topic | Source type | Signal | Existing URL | Action |
|---|---|---|---|---|
| Interactive map / chest locations | Community + GSC | Reddit discussion links a WIP all-chests interactive map; GSC already shows interactive-map queries. | `/map/` | STRENGTHEN_EXISTING |
| Multiplayer scope / co-op | Steam Discussion + GSC | Players ask whether co-op covers the open world; GSC has repeated multiplayer, co-op, and matchmaking queries. | `/multiplayer/` | STRENGTHEN_EXISTING |
| Roadmap / next update | GSC + official Steam context | Roadmap family is the strongest cluster and lands mostly on `/roadmap/`. | `/roadmap/` | STRENGTHEN_EXISTING |
| Rune synthesis / 5-Star result | GSC + official Steam evidence | Rune synthesis has a direct query and position 4; official evidence supports the synthesis boundary. | `/systems/runes/` | RESEARCH_NEXT |
| Beginner progression / gear and Karma questions | Community / third-party SERP | Guides and community notes show interest, but third-party claims require verification before factual expansion. | `/guides/beginner/` | OBSERVE |

The Reddit, Steam Discussion, and YouTube/third-party scan is demand evidence only; it is not used to establish official game facts. No new reliable YouTube-specific signal was strong enough to list separately today.

## 7. Single Biggest SEO Problem

**Measurement comparability:** current GSC and GA4 signals are clearly stronger than the prior snapshot, but the available windows differ and the data remains small enough that daily decisions can overreact. The next priority is a same-window incremental comparison, not more page production.

## 8. Tomorrow — three highest-impact actions

1. Pull a same-length GSC/GA4 window ending on the newest available date and compare Rune, roadmap, builds, map, and multiplayer query/page ownership.
2. Recheck `/systems/runes/` and `/roadmap/` for exact-query landing ownership, clicks, and Top 5 movement; keep Rune child URLs at research-only.
3. Validate one evidence-backed existing-page gap, prioritizing `/map/` or `/multiplayer/`, and change nothing unless the single-page Decision Gate still passes.

## Phase 2 — Controlled Expansion

### Rune Cluster Research

The parent page `/systems/runes/` already answers the strongest validated Rune intent: synthesis and the possible 5-Star result. No candidate meets the child-page gate in this phase.

| Query / cluster | Existing GSC signal | Search intent | SERP pattern | Official evidence | Community demand | Parent overlap | Cannibalization risk | Recommended ownership | Decision |
|---|---|---|---|---|---|---|---|---|---|
| `dragon sword awakening rune synthesis` | 3 impressions, 1 click, position 4 | informational / how-to | generic Rune pages and sparse exact results | HIGH for the narrow synthesis boundary | MEDIUM | HIGH | HIGH | parent page | MERGE_PARENT |
| `dragon sword awakening 5 star runes` | no exact row; adjacent Rune rows present | informational | sparse/noisy | MEDIUM for “can yield,” LOW for rates | LOW | HIGH | HIGH | parent page | MERGE_PARENT |
| `dragon sword awakening rune farming` | no exact row | how-to | weak/noisy exact SERP | LOW | LOW | HIGH | HIGH | parent page only if verified later | OBSERVE |
| `dragon sword awakening rune stats` | no exact row | optimization / database | community build/database patterns | LOW | MEDIUM | HIGH | HIGH | parent page only if official data appears | OBSERVE |
| `dragon sword awakening best runes` | no exact row | optimization | third-party build pages | LOW | MEDIUM | HIGH | HIGH | ignore until first-party data exists | REJECT |
| `dragon sword awakening rune locations` | no exact row | location / how-to | sparse exact SERP | LOW | LOW | MEDIUM | MEDIUM | parent page | OBSERVE |

Best next Rune opportunity: **improve the parent synthesis explanation only if a future same-window query repeats**. `NO_CHILD_PAGE_READY`.

### Map Decision

**STRENGTHENED** — `/map/` had a real gap: it stated that an interactive map was unavailable but did not explain the observed chest/map demand, the community-evidence boundary, or where future location guides should belong. Added a small evidence-labeled section, updated verification date, a community source, and relevant links to existing guides. No chest count, complete map, exact coordinates, or bulk location URL was added.

### Multiplayer Decision

**STRENGTHENED** — `/multiplayer/` already covered the official feature questions. Added only a clear `Community signal / not fully verified` boundary for recurring co-op-scope discussions, clarified that no invite-code/menu sequence is being inferred, and updated the verification date/schema. Added no unsupported story co-op, open-world co-op, raid, lobby, or PvP claim.

### Internal-Link Reinforcement

- `/map/` → `/`, `/guides/beginner/`, `/characters/`, `/gameplay/`.
- `/multiplayer/` existing related links remain scoped to beginner/combat/roadmap; no sitewide rewrite was performed.
- `/systems/runes/` existing links to `/builds/`, `/characters/`, and `/teams/` were preserved.

### Comparable Window Baseline

The API returned complete data through 2026-08-11. Search Console query/page rows are reported using the prior review convention for non-brand rows; the API does not expose the site's brand classification.

| Window | Clicks | Impressions | CTR | Avg position | Query rows | Non-brand rows | Pages with impressions | Organic sessions |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Latest 2 days: Aug 10–11 | 31 | 410 | 7.56% | 8.30 | 60 | 60* | 8 | 36 |
| Previous 2 days: Aug 8–9 | 0 | 2 | 0% | 6.00 | 2 | 2* | 2 | 0 |
| Delta | +31 | +408 | +7.56pp | +2.30 positions** | +58 | +58* | +6 | +36 |
| Latest 7 days: Aug 5–11 | 31 | 412 | 7.52% | 8.29 | 60 | 60* | 8 | 36 |
| Previous 7 days: Jul 29–Aug 4 | 0 | 0 | N/A | N/A | 0 | 0* | 0 | 0 |
| Delta | +31 | +412 | N/A | N/A | +60 | +60* | +8 | +36 |

\* Classification follows the previous report's game-intent convention, not a Search Console-provided brand field. **Higher numeric average position is weaker; the aggregate is influenced by query mix and is not a winner-page movement claim.**

Winner URL Organic Search sessions in the latest 7-day window: `/systems/runes/` 11, `/roadmap/` 21, `/builds/` 6, `/map/` 4, `/multiplayer/` 0. The previous comparable windows returned 0 sessions for these individual winner URLs.

### Evidence Boundary

Deliberately excluded: complete chest coverage, exact chest count, exact coordinates, official interactive-map status, Rune farming routes/drop rates/stat ceilings/best Rune rankings, invite-code instructions, story/open-world co-op availability beyond the reviewed primary evidence, and PvP claims. Community posts and third-party guides remain `Evidence C — Demand Signal`, not official facts.

### Next Expansion Gate

**NO_CHILD_PAGE_READY**. The strongest next expansion cluster is `/map/` because it has both repeat GSC map intent and a clear parent-page information gap. No new URL is justified for the next sprint: the Rune child gate is not met, while map and multiplayer intent can still be served by their existing pages.

## Production Health Check

- Homepage, `/systems/runes/`, `/builds/`, `/roadmap/`, `/teams/`, `/map/`, `/characters/`, and `/multiplayer/`: HTTP 200.
- All checked HTML pages: one H1, self-canonical, no accidental noindex.
- `robots.txt`: HTTP 200, allows crawling, points to `https://dragonswordguide.com/sitemap-index.xml`.
- `sitemap-index.xml`: HTTP 200.
- No DNS, Cloudflare, GA4, or GSC configuration changes were made. No URL was created.

## Validation and Files

- `npm run build`: PASS.
- `git diff --check`: PASS.
- Production HTTP checks: PASS.
- Changed only `src/pages/map/index.astro`, `src/pages/multiplayer/index.astro`, and this report; existing untracked `.DS_Store`, brand-pack files, and `doct/` were preserved.
- Before branch / HEAD: `main` / `dbba5bd`.
- Commit / push / deployment: **not performed**; report-only scope.

## Sources

- [Official DragonSword: Awakening Steam store page](https://store.steampowered.com/app/4570720/DragonSword__Awakening/)
- [Steam Discussion: multiplayer scope](https://steamcommunity.com/app/4570720/discussions/0/581677493394789225/)
- [Reddit: all chests interactive map demand signal](https://www.reddit.com/r/DSwordAwakening/comments/1vap7qr/all_chests_locations_interactive_map/)
- [Reddit: community activity and moderation discussion](https://www.reddit.com/r/DragonSwordAwakening/comments/1umity3/im_excited/)
