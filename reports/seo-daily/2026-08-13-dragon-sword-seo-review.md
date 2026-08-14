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
- No DNS, Cloudflare, GA4, or GSC configuration changes were made.
- Content deployment source: `f602124`; the report-only follow-up `979fb79` was the active production source at the final verification check. Preview: `https://af9cf500.dragonswordguide.pages.dev`.
- Preview verification: `/`, `/guides/beginner/`, `/price/`, and `/sitemap-index.xml` returned HTTP 200; the new pages had self-canonical, one H1, no noindex, and expected sprint markers.
- Custom-domain verification: initially served the previous release (`/price/` returned 404), then converged after one bounded 20-second no-cache recheck. Final custom-domain responses for `/`, `/guides/beginner/`, `/price/`, and `/sitemap-index.xml` returned HTTP 200; `/price/` exposed the new marker. Classified as `TRANSIENT_PROPAGATION_DELAY`; no DNS or Cloudflare configuration change was needed.

## Validation and Files

- `npm run build`: PASS.
- `git diff --check`: PASS.
- Production HTTP checks: PASS after bounded propagation recheck.
- Changed only the Phase 2 files plus the allowed Beginner/Price sprint files: `src/pages/guides/beginner/index.astro`, `src/pages/index.astro`, `src/pages/price/index.astro`, and this report; existing untracked `.DS_Store`, brand-pack files, and `doct/` were preserved.
- Before branch / HEAD: `main` / `1cb2700`.
- Phase 2 commit: `d528d84a0e9fc4d7479838ecf733469fcd552fd9`.
- Sprint commit: `f602124f87e3dda865121be3268b88e4c28e1fee` (`Add DragonSword beginner and pricing guides`).
- Push: `origin/main` updated successfully; content deployment and final report-only production source were both verified in the Pages deployment list.
- Final status: **PASS_WITH_LIMITATION** — the release is verified after transient custom-domain propagation delay; the search sample remains small.

## Sources

- [Official DragonSword: Awakening Steam store page](https://store.steampowered.com/app/4570720/DragonSword__Awakening/)
- [Steam Discussion: multiplayer scope](https://steamcommunity.com/app/4570720/discussions/0/581677493394789225/)
- [Reddit: all chests interactive map demand signal](https://www.reddit.com/r/DSwordAwakening/comments/1vap7qr/all_chests_locations_interactive_map/)
- [Reddit: community activity and moderation discussion](https://www.reddit.com/r/DragonSwordAwakening/comments/1umity3/im_excited/)

## Competitor Coverage Gap Sprint

### Beginner SERP Baseline

Target queries: `dragon sword awakening beginner guide`, `dragon sword awakening beginners guide`, `dragon sword awakening getting started`, `dragon sword awakening tips`, and `dragon sword awakening beginner tips`.

The observed result types were specialist fan-guide hubs, third-party beginner guides, combat/tag-system explainers, and broad walkthrough hubs. The strongest coverage pattern combines first-hours combat, progression framing, exploration, and links into deeper systems. Reddit/YouTube presence was not reliably separable in this non-localized API result set: `SERP_LOCALIZED_UNVERIFIED`.

Decision: **BUILD / strengthen existing `/guides/beginner/`**. The route already existed, but its prior content was a shorter first-hours page. It now functions as the Getting Started Hub with the required combat flow, functional-team framework, build-vs-team distinction, exploration, co-op boundary, low-regret prioritization, mistakes, and next-guide links. It does not publish a first Hero, best starter, or optimal progression route.

### Price SERP Baseline

Target queries: `dragon sword awakening price`, `dragon sword awakening deluxe edition`, `dragon sword awakening editions`, `dragon sword awakening buy`, and `dragon sword awakening steam price`.

The observed result types were the official Steam store page, Steam bundle/product listings, third-party price trackers, and launch/price reporting. The official Steam result directly answers base price, Deluxe Pack, bundle contents and Windows/Steam purchase intent. Localized price display is region-dependent; this page records the US listing and explicitly warns that Steam regional pricing can vary. Reddit/YouTube presence was not reliably separable: `SERP_LOCALIZED_UNVERIFIED`.

Decision: **BUILD `/price/`**. Official Steam data was sufficient at the August 13, 2026 check: Standard `$29.99`, Deluxe Pack `$19.99`, and Deluxe Edition bundle `$44.98` after the displayed 10% bundle discount. The bundle contains the base game and Deluxe Pack. No affiliate urgency, historical-price claim, or unverified console date was added.

### Progression / Who to Build First — Research Only

| Query cluster | SERP intent | Demand | Evidence | Existing-page overlap | Risk | Decision |
|---|---|---|---|---|---|---|
| who to build first / who to awaken first | hero-investment recommendation | third-party guide interest; no confirmed GSC row | LOW for a universal priority | HIGH with `/teams/` and `/builds/` | high meta/cannibalization risk | MERGE_TEAMS |
| investment priority | resource optimization | third-party recommendation pattern | LOW | HIGH with `/builds/` | high unsupported-stat risk | MERGE_BUILDS |
| progression guide / early progression | informational how-to | competitor coverage exists | MEDIUM for broad official loop, LOW for exact route | MEDIUM with Beginner/Builds/Roadmap | medium | OBSERVE |
| best character to invest in | ranking/recommendation | weak exact evidence | LOW | HIGH with Characters/Teams/Builds | high tier-list risk | REJECT |

Final decision: **OBSERVE**, with narrow questions merged into `/teams/` or `/builds/` only when actual GSC intent repeats. `POTENTIAL_NEW_PAGE` is not met and no progression URL was created.

### Competitor Coverage Audit

| Topic | Competitor coverage | Our coverage | Intent quality | Evidence feasibility | Action |
|---|---|---|---|---|---|
| Beginner Guide | strong; multiple specialist guides/hubs | `/guides/beginner/` now covers the hub intent | high | high | BUILD_NOW / COVERED |
| Price / Editions | official Steam plus third-party price pages | `/price/` | high | high from Steam | BUILD_NOW |
| Progression | broad competitor hubs and speculative route pages | framework only; no route claim | medium | medium for framework, low for exact route | RESEARCH_NEXT |
| Walkthrough | specialist story/walkthrough competitors | no dedicated walkthrough | high | low until official chapter/quest evidence is organized | RESEARCH_NEXT |
| PC / System Requirements | competitor/platform guides; Steam has primary requirements | no dedicated page | high | high from Steam | RESEARCH_NEXT |
| Gear / Karma | third-party guides | `/builds/` mentions Karma but keeps exact optimization unverified | medium | low for recommendations | HOLD |
| Familiars | covered in competitor hubs and official Steam description | `/gameplay/`, Beginner and homepage references | medium | high for broad facts | COVERED |
| Cooking | covered in competitor beginner pages and official Steam description | `/gameplay/` and Beginner references | medium | high for broad facts | COVERED |
| Dungeon | walkthrough/map competitors mention dungeons | `/map/` and `/gameplay/` broad coverage only | medium | medium | RESEARCH_NEXT |
| Tier List | common in third-party competitor pages | intentionally absent | high demand but unsafe fact pattern | low | HOLD |
| Character Builds | competitor pages publish individual builds | `/builds/` framework only | medium | low without retail testing | HOLD |

Third-party competitor pages were used for SERP intent and coverage structure only. Their numbers, character rankings, routes and conclusions were not copied into the new pages.

### Sprint Files and Decisions

- `/guides/beginner/` existed before this sprint and was strengthened in place; no new path was created for it.
- `/price/` was the only new URL created.
- Homepage received one necessary link to `/price/`; no sitewide navigation rewrite was made.
- Existing protected pages `/systems/runes/`, `/builds/`, `/teams/`, `/roadmap/`, `/map/`, and `/multiplayer/` were not modified.
- Sitemap is expected to grow from 14 to 15 indexable URLs: one actual new URL, not two.
- Remaining next research gap: **Walkthrough**, subject to first-hand quest/chapter evidence. PC/System Requirements passed this sprint and is now covered by `/system-requirements/`.

## PC + Walkthrough Gap Gate

### PC Decision

**`BUILD_PC_REQUIREMENTS_PAGE` — BUILD `/system-requirements/`.** Existing homepage, `/gameplay/`, `/price/`, and `/guides/beginner/` mentioned platform or SSD context but did not provide a standalone minimum/recommended answer. The exact PC/spec intent is therefore not sufficiently covered by an existing page. The URL `/system-requirements/` was chosen because it matches the exact query family and is narrower and clearer than a broader `/platforms/pc/` taxonomy.

Official Steam Evidence B is sufficient: Windows 10, 64-bit processor/OS, Intel i5-9400F / i7-9700F, 8 GB / 16 GB RAM, GTX 1660 / RTX 3060, DirectX 12, 25 GB storage, and the official SSD warning are all listed. No third-party hardware claims were used.

| Demand | Evidence | SERP Opportunity | Site Fit | Total | Standalone | Cannibalization | Decision |
|---:|---:|---:|---:|---:|---|---|---|
| 22/25 | 25/25 | 22/25 | 23/25 | **92/100** | YES | acceptable | BUILD |

### PC SERP Audit

The observed result set contains the official Steam listing, specialist PC/system-requirements pages, generic game databases, performance/setup pages, Reddit Steam Deck and troubleshooting discussions, and YouTube/community setup content. Steam has the strongest answer and exposes a complete minimum/recommended table. Specialist competitors show that a dedicated answer page is a normal SERP shape, but their benchmark, Steam Deck and optimization claims were not copied. The Steam Deck result is community-led and not an official verified/playable status.

### Walkthrough Decision

**`RESEARCH_ONLY` — do not create `/walkthrough/` yet.** Walkthrough is a clear standalone intent, but the current project lacks verified first-hand chapter/quest structure, screenshots, or a reliable tested route. Existing `/guides/beginner/`, `/gameplay/`, and `/map/` cover first-hours, broad exploration, and world context; they do not justify a full route claim. A thin hub would be navigation without enough verified guide inventory.

| Demand | Evidence | SERP Opportunity | Site Fit | Total | Standalone | Cannibalization | Decision |
|---:|---:|---:|---:|---:|---|---|---|
| 23/25 | 10/25 | 23/25 | 20/25 | **76/100** | YES | acceptable | RESEARCH_ONLY |

### Walkthrough SERP Audit

The observed SERP is led by full walkthrough hubs, chapter 1–8 routes, prologue/part videos, quest/puzzle pages, dungeon/boss pages, and wiki-style guides. This confirms standalone demand and a future hub-and-spoke shape. However, competitor chapter and quest details are Evidence C structure/demand signals only; no chapter count, quest sequence, boss route, puzzle solution, or ending claim was imported as project fact.

### GSC / GA4 Opportunity Signals

Latest available GSC date remains **2026-08-11**, with the existing read-only window 2026-07-14 through 2026-08-11. No matching PC/system-requirements or walkthrough/quest/chapter/dungeon/boss query row was present in the available reviewed breakdown. No exact PC or Walkthrough landing page appeared in the latest GA4 Organic Search landing-page table. This is `NO_EXACT_GSC_SIGNAL`, not an automatic reject: official answer quality and SERP shape were decisive for PC, while missing first-hand evidence blocked Walkthrough.

### Competitor Gap Comparison

| Competitor | PC/System Requirements | Walkthrough | Quest/Chapter Depth | Notes |
|---|---|---|---|---|
| Whisper of the House | no primary PC table in the sampled result | full Chapter 1–8 hub | high | useful hub structure; chapter/route claims remain third-party Evidence C |
| Into Indie Games | no dedicated PC answer in sampled result | prologue/Part 1 walkthrough | low-to-medium | editorial walkthrough format, but partial coverage |
| DragonSword Awakening Wiki pages | dedicated PC/system page appears in site navigation | chapter, puzzle and quest pages | high | claims are not evidence for our facts; use only coverage pattern |
| Steam official store | complete minimum/recommended table | no walkthrough | none | authoritative PC facts; no chapter route |

### URLs, Claims and Execution

- Created exactly one URL: `/system-requirements/`.
- Added necessary internal links from homepage, `/guides/beginner/`, `/price/`, and `/gameplay/`; no batch navigation rewrite.
- Walkthrough created no URL and no child Quest, Chapter, Dungeon, or Boss pages.
- Deliberately excluded FPS guarantees, best settings, RTX 3060 frame-rate claims, Steam Deck verified/playable claims, performance tiers, optimization tips, official chapter count, complete quest route, exact boss/puzzle solutions, screenshots, and ending claims.
- Required PC page sections are present: Quick Answer, minimum, recommended, plain-language spec meaning, performance status, Steam Deck boundary, source attribution, schema, Last Verified, breadcrumbs, and related guides.
- Validation: `npm run build` PASS (17 generated pages including 404; 16 indexable sitemap URLs), SEO contract PASS for `/system-requirements/`, `/guides/beginner/`, and `/price/`, internal-link check PASS with no broken routes, and `git diff --check` PASS.
- Sitemap expectation: **15 → 16** indexable URLs if the PC page is released; Walkthrough does not change the count.
- Next gap to build: none immediately; the next candidate is Walkthrough only after verified gameplay evidence, a repeat GSC signal, or repeated community demand supports real guide inventory.

### Gate Sprint Production Verification

- Before branch / HEAD: `main` / `a517f4f4a5d2718cad3662947efcfd15611feb47`.
- Content commit: `75f832e31ab965e67c5df3dfbb4b64891f8afb42` (`Evaluate DragonSword PC and walkthrough gaps`).
- Push: `origin/main` updated successfully.
- Cloudflare Pages: Production deployment for source `75f832e` is active at `https://74a53782.dragonswordguide.pages.dev`.
- Preview and custom-domain verification: `/system-requirements/`, `/guides/beginner/`, `/price/`, and `/sitemap-index.xml` returned HTTP 200; the new PC page and existing pages had one H1, self-canonical, no accidental noindex, and expected markers. Sitemap contains 16 URLs and includes `/system-requirements/`.
- Final status: **PASS**. No DNS, Cloudflare global settings, GSC, GA4, AIOS, WOS, or unrelated project changes were made.

---

# 16-URL Winner / Laggard Portfolio Review — 2026-08-13

## 1. Executive Status

**GREEN.** Three pages are real current search winners (`/roadmap/`, `/systems/runes/`, `/map/`), emerging signals exist for `/builds/`, `/`, and `/characters/`, and production technical health is normal. The sample is still small, and the latest GSC and GA4 complete dates differ; no public page changes are justified by this measurement-only sprint.

## 2. Measurement Windows

| Source | Latest complete window | Previous complete window | Result |
|---|---|---|---|
| GSC, page | 2026-08-10 to 2026-08-11 | 2026-08-08 to 2026-08-09 | complete; latest page totals 43 clicks / 833 impressions vs 0 / 16 |
| GSC, query + page | 2026-08-05 to 2026-08-11 | 2026-07-29 to 2026-08-04 | complete request; previous returned no rows, so delta is `NO_PRIOR_ROWS`, not a like-for-like growth claim |
| GA4 Organic Search | 2026-08-11 to 2026-08-12 | 2026-08-09 to 2026-08-10 | complete; `(not set)` excluded from URL totals |
| GA4 Organic Search | 2026-08-06 to 2026-08-12 | 2026-07-30 to 2026-08-05 | complete; previous returned no rows, so delta is `NO_PRIOR_ROWS` |

GSC latest complete date is **2026-08-11**. GA4 coverage is available through **2026-08-12**. Search Console does not expose brand/non-brand classification; non-brand query count is therefore `N/A` rather than inferred.

### Fixed-window totals

| Window | GSC clicks | GSC impressions | GA4 Organic sessions on URL landings | GA4 Organic users |
|---|---:|---:|---:|---:|
| GSC latest 2d / GA4 latest 2d | 43 | 833 | 52 | 52 |
| Previous complete 2d | 0 | 16 | 6 | 6 |
| GSC latest 7d / GA4 latest 7d | 47 | 849 | 58 | 58 |
| Previous complete 7d | 0 rows | 0 rows | 0 rows | 0 rows |

The GA4 totals exclude `(not set)` and include only `Organic Search`; Direct, Referral, testing and realtime traffic were not included.

## 3. Full 16-URL Portfolio Scorecard

GSC values use the latest complete 2-day page window unless noted. `N/A` means the endpoint returned no row; it is not converted to zero. Best-query and Top 50/20/10 values use the latest complete 7-day query+page response. Repeated-day count is based on the dated query+page response.

| URL | Page type / primary intent | GSC clicks | Impressions | CTR | Position | Query count | Non-brand queries | Best query by clicks / impressions | Top 50 / 20 / 10 | Repeat days | GA4 organic sessions | Classification | Action |
|---|---|---:|---:|---:|---:|---:|---:|---|---|---:|---:|---|---|
| `/roadmap/` | content / official updates | 25 | 405 | 6.17% | 7.18 | 17 | N/A | `dragon sword awakening roadmap` / `dragonsword awakening roadmap` | 17 / 16 / 16 | 2 | 34 | **WINNER** | `EXPAND_RESEARCH` |
| `/systems/runes/` | content / Rune system answer | 10 | 107 | 9.35% | 6.77 | 8 | N/A | `dragonsword runes` / `dragonsword awakening runes` | 8 / 8 / 8 | 3 | 6 | **WINNER** | `EXPAND_RESEARCH` |
| `/map/` | hub / map and location reference | 4 | 88 | 4.55% | 8.91 | 9 | N/A | `dragonsword awakening interactive map` / `dragonsword interactive map` | 9 / 7 / 4 | 2 | 7 | **WINNER** | `STRENGTHEN_LATER` |
| `/builds/` | content / build framework | 4 | 16 | 25.00% | 13.13 | 5 | N/A | `dragonsword awakening builds` / `dragonsword awakening build` | 5 / 5 / 2 | 2 | 3 | **EMERGING** | `EXPAND_RESEARCH` |
| `/` | hub / broad guide discovery | 0 | 18 | 0.00% | 11.44 | 6 | N/A | `N/A` / `dragonsword awakening guide` | 6 / 5 / 3 | 3 | 1 | **EMERGING** | `STRENGTHEN_LATER` |
| `/characters/` | hub / character directory | 0 | 17 | 0.00% | 13.47 | 2 | N/A | `N/A` / `dragonsword : awakening all character` | 2 / 0 / 0 | 1 | 1 | **EMERGING** | `WAIT_FOR_DATA` |
| `/multiplayer/` | exact-answer / co-op scope | 0 | 178 | 0.00% | 8.16 | 16 | N/A | `N/A` / `is dragonsword awakening multiplayer` | 16 / 16 / 12 | 2 | N/A | **INDEXED_NO_SIGNAL** | `WAIT_FOR_DATA` |
| `/gameplay/` | hub / gameplay overview | N/A | N/A | N/A | N/A | N/A | N/A | `N/A` / `N/A` | N/A | N/A | N/A | **INDEXED_NO_SIGNAL** | `WAIT_FOR_DATA` |
| `/guides/combat-system/` | content / combat explainer | N/A | N/A | N/A | N/A | N/A | N/A | `N/A` / `N/A` | N/A | N/A | N/A | **INDEXED_NO_SIGNAL** | `WAIT_FOR_DATA` |
| `/is-it-gacha/` | exact-answer / purchase model | N/A | N/A | N/A | N/A | N/A | N/A | `N/A` / `N/A` | N/A | N/A | N/A | **INDEXED_NO_SIGNAL** | `WAIT_FOR_DATA` |
| `/teams/` | hub / team composition framework | N/A | N/A | N/A | N/A | N/A | N/A | `N/A` / `N/A` | N/A | N/A | N/A | **INDEXED_NO_SIGNAL** | `WAIT_FOR_DATA` |
| `/guides/beginner/` | content / first-hours guide | N/A | N/A | N/A | N/A | N/A | N/A | `N/A` / `N/A` | N/A | N/A | N/A | **NOT_ENOUGH_DATA** | `WAIT_FOR_DATA` |
| `/price/` | exact-answer / Steam price and editions | N/A | N/A | N/A | N/A | N/A | N/A | `N/A` / `N/A` | N/A | N/A | N/A | **NOT_ENOUGH_DATA** | `WAIT_FOR_DATA` |
| `/system-requirements/` | exact-answer / PC requirements | N/A | N/A | N/A | N/A | N/A | N/A | `N/A` / `N/A` | N/A | N/A | N/A | **NOT_ENOUGH_DATA** | `WAIT_FOR_DATA` |
| `/privacy/` | structural / legal | N/A | N/A | N/A | N/A | N/A | N/A | `N/A` / `N/A` | N/A | N/A | N/A | **STRUCTURAL_PAGE** | `STRUCTURAL_KEEP` |
| `/terms/` | structural / legal | N/A | N/A | N/A | N/A | N/A | N/A | `N/A` / `N/A` | N/A | N/A | N/A | **STRUCTURAL_PAGE** | `STRUCTURAL_KEEP` |

The scorecard deliberately does not call a low-traffic page a loser. `INDEXED_NO_SIGNAL` means no current GSC/GA4 row in the fixed window while the live URL is healthy; `NOT_ENOUGH_DATA` is reserved for the recently added or materially refreshed pages whose first fair post-change window has not completed.

## 4. Winners

- `/roadmap/`: 405 impressions, 25 clicks, 17 query rows, 16 Top-10 queries, and 34 GA4 Organic sessions in the latest 2-day GA4 window.
- `/systems/runes/`: 107 impressions, 10 clicks, repeated Rune queries across three days, and 6 GA4 Organic sessions.
- `/map/`: 88 impressions, 4 clicks, position 8.91, repeated interactive-map queries, and 7 GA4 Organic sessions.

These are winners by repeated search and/or organic evidence, not by page count or word count.

## 5. Emerging Pages

`/builds/` has 16 impressions, 4 clicks, five query rows, repeated days and 3 GA4 Organic sessions. `/` and `/characters/` have limited query/impression signal plus 1 GA4 Organic session each, but neither is stable enough to guide a new URL.

## 6. Indexed / No Signal

`/multiplayer/` has a large impression footprint (178) and strong average position (8.16) but no click or current GA4 Organic landing row. `/gameplay/`, `/guides/combat-system/`, `/is-it-gacha/`, and `/teams/` returned no current fixed-window GSC/GA4 row. These remain `WAIT_FOR_DATA`, not delete/noindex candidates.

## 7. New Pages / Not Enough Data

`/guides/beginner/` was materially refreshed, while `/price/` and `/system-requirements/` were newly published after the latest complete GSC date. They are `NOT_ENOUGH_DATA`; no ranking or content judgment is made yet.

Top five URLs needing patience or more data: `/system-requirements/`, `/price/`, `/guides/beginner/`, `/guides/combat-system/`, and `/gameplay/`.

## 8. Structural Pages

`/privacy/` and `/terms/` are `STRUCTURAL_PAGE`. Their success criterion is accessibility and policy coverage, not search traffic. Do not score them as SEO laggards.

## 9. Second Validated Cluster Decision

Runes remains the first validated cluster. The comparison below excludes Runes as required:

| Cluster | Search Validation /30 | Organic Validation /20 | Sub-intent Depth /20 | Evidence /20 | Cannibalization Safety /10 | Total | Decision |
|---|---:|---:|---:|---:|---:|---:|---|
| `/roadmap/` | 29 | 20 | 18 | 20 | 9 | **96** | `NEXT_VALIDATED_CLUSTER` |
| `/builds/` | 22 | 12 | 15 | 15 | 8 | **72** | strong emerging |
| `/map/` | 21 | 12 | 14 | 14 | 8 | **69** | emerging, below gate |
| `/multiplayer/` | 19 | 0 | 14 | 15 | 8 | **56** | observe |
| `/teams/` | 0 | 0 | 12 | 15 | 8 | **35** | observe |

### A. What is the second strongest validated cluster after Runes?

**`/roadmap/` — the Roadmap / Official Updates cluster.** It is the only compared cluster that clears the 70-point gate with repeated GSC signal, organic landing sessions, multiple independent update intents, official Evidence B, and acceptable cannibalization risk.

## 10. Leading Cluster Child-Intent Research

No pages were created. Candidate child intents for Roadmap remain conservative:

| Child intent | Demand | GSC signal | SERP independence | Evidence | Cannibalization risk | Decision |
|---|---|---|---|---|---|---|
| next update / future updates | medium | `next update` 1 impression / 1 click; future-updates rows present | medium | high from official announcements | high with parent | `MERGE_PARENT` |
| roadmap date / current status | high | roadmap family dominates current rows | low | high | high | `MERGE_PARENT` |
| multiplayer roadmap | low-medium | current roadmap and multiplayer rows, no isolated child demand | medium | high from official roadmap | medium-high with `/multiplayer/` | `OBSERVE` |
| new heroes / planned content | low | no independent repeated child row | medium | official roadmap may support future facts | medium | `OBSERVE` |
| patch / update history | low-medium | 1.0.7 and 1.0.8 signals are sparse | medium | high from official announcements | high with parent | `MERGE_PARENT` |

No child URL is justified yet. The parent already owns the strongest roadmap intent.

## 11. Walkthrough Evidence Backlog

Walkthrough remains `RESEARCH_ONLY`; no `/walkthrough/` or child pages were created.

| Topic | Demand signal | Current evidence | Missing evidence | Can publish reliably? |
|---|---|---|---|---|
| Prologue / chapters | competitor walkthrough hubs | official Steam describes the game, not a chapter index | first-hand chapter list and save-state checkpoints | No |
| Main-story sequence | third-party full-route pages | no project-tested route | gameplay recording, screenshots, objective transitions | No |
| Main / side quests | quest-style SERP pages | no verified quest inventory in this project | exact names, unlock conditions, completion state | No |
| Dungeons | map/walkthrough demand and broad Steam mention | dungeon existence only at broad level | names, entry conditions, objectives, exits | No |
| Bosses | video and walkthrough demand | no project encounter log | boss identity, context, phases, route proof | No |
| Puzzles | puzzle pages in competitor SERP | no first-hand puzzle capture | screenshots, interaction sequence, version check | No |

First-hand work required before publishing: play the relevant route, record screenshots/video, note quest and region names, reproduce objective state changes, verify the same route on the current build, and preserve enough evidence to support each claim. The previous Evidence score of `10/25` remains justified; this sprint produced no new primary gameplay evidence, so it is not raised.

### Walkthrough-related GSC signals

`NO_WALKTHROUGH_GSC_SIGNAL`: no query rows containing `walkthrough`, `quest`, `quests`, `chapter`, `dungeon`, `boss`, `puzzle`, `story`, or `prologue` were present in the latest complete 2026-08-05 to 2026-08-11 GSC query+page response.

## 12. New URL Approval Decision

**`NO_NEW_URL_YET`.** No new URL is justified for the next sprint. Roadmap is validated, but its child intents still merge into the parent; Builds is emerging but below the independent-child gate; Walkthrough lacks primary evidence; and the new PC/Price pages have not completed a fair measurement window.

### B. Is any new URL justified for the next sprint?

**No.** Exact result: `NO_NEW_URL_YET`.

## 13. Single Biggest SEO Problem

**Measurement maturity and ownership separation.** Roadmap already captures most current demand, but the site still has too little complete-window history to distinguish stable winners from launch/update spikes or to safely split child URLs. The fix is more comparable observation, not another page.

## 14. Next Sprint Recommendation

1. Re-run the same complete 2-day and 7-day GSC/GA4 windows after the new PC/Price/Beginner pages have a full post-publication window.
2. Continue Roadmap parent ownership and test whether Builds develops repeated independent sub-intent without creating a child page.
3. Collect first-hand Walkthrough evidence for one bounded route or puzzle only; do not publish a Hub or child page until the evidence backlog closes.

## 15. Technical Health Sanity Check

- Production sitemap: HTTP 200, 16 URLs, exact route inventory matches the built sitemap.
- All 16 sitemap URLs: HTTP 200, one H1, self-canonical, no accidental noindex, no redirect.
- No production defect found; no code, configuration, DNS, Cloudflare, GSC or GA4 changes made.

## 16. Portfolio Review Validation

- Latest GSC/GA4 read-only retrieval: PASS.
- Fixed-window aggregation and scorecard: PASS; unavailable values retained as `N/A`.
- Production URL health check: PASS, 16/16.
- `git diff --check`: PASS.
- Files changed in the earlier measurement-only review: this report only.

## Winner Optimization Sprint

### Scope and measurement boundary

This sprint used the latest complete Search Console snapshot available to the checkout: `sc-domain:dragonswordguide.com`, web search, through **2026-08-11**. The requested comparable windows are recorded as GSC `2026-08-10` to `2026-08-11` vs `2026-08-08` to `2026-08-09`, and GSC/GA4 `2026-08-05` to `2026-08-11` vs `2026-07-29` to `2026-08-04`. No newer GSC rows were available locally on 2026-08-13. SERP checks were performed on 2026-08-13; competitor/community results remain Evidence C unless they are official sources.

### Roadmap query decomposition

The available query/page evidence supports these meaningful rows. CTR is calculated from clicks divided by impressions; `N/A` is retained where the saved GSC summary did not preserve the row-level metric.

| Query | Landing URL | Clicks | Impressions | CTR | Position |
|---|---|---:|---:|---:|---:|
| `dragon sword awakening roadmap` | `/roadmap/` | 6 | 56 | 10.71% | N/A |
| `dragonsword awakening roadmap` | `/roadmap/` | 4 | 133 | 3.01% | N/A |
| `dragon sword roadmap` | `/` | 0 | 1 | 0% | 2.00 |
| `dragon sword roadmap` | `/roadmap/` | 0 | 2 | 0% | 6.00 |

Supported intent buckets: **roadmap**, **future content / planned updates**, and **current update status**. The larger roadmap family is owned by `/roadmap/`; the exact shorter query is still mixed with the homepage. Status: **`OWNERSHIP_IMPROVING`**, not `OWNERSHIP_STRONG`.

### Roadmap changes

`/roadmap/` received a narrow winner optimization: title and description now lead with latest updates and future plans; `dateModified` and `LastVerified` are `2026-08-13`; and a Quick Answer states that 1.0.8 is applied while future release dates remain unconfirmed. Released, announced/planned, and unknown sections were preserved and no speculative date or update was added.

The homepage description now says **current game updates** rather than **roadmap updates**. This is the smallest ownership adjustment justified by the homepage row; the homepage still links to and summarizes the roadmap.

### Multiplayer query-level CTR audit

The saved GSC summary contains 16 query rows for `/multiplayer/`, 178 page impressions, 0 clicks, average position 8.16, and the strongest named query `is dragonsword awakening multiplayer` at 16 impressions. The preserved meaningful rows are:

| Query | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| `is dragonsword awakening multiplayer` | 0 | 16 | 0% | N/A |
| `dragon sword awakening multiplayer` | 0 | 8 | 0% | N/A |
| Other multiplayer / co-op / matchmaking rows | 0 | N/A | N/A | N/A |

Supported groups: **multiplayer**, **co-op**, and **matchmaking**. No preserved row supports separate lobby, invite-friends, raids, PvP, or story/open-world-co-op buckets with enough detail to report independently.

### Multiplayer SERP diagnosis and decision

Current metadata is already direct: the title begins with `Is DragonSword Awakening Multiplayer?`, the description begins with `Yes`, and the first-screen Quick Answer says selected activities support online co-op. The current SERP also contains community/wikis with broader claims, but those do not justify copying unsupported scope. Classification: **`INSUFFICIENT_DATA`** for a further CTR rewrite, with no clear title/description gap. Decision: **`HOLD_INSUFFICIENT_EVIDENCE`**; no Multiplayer content change.

### Map child-intent scores

The parent has 88 impressions, 4 clicks, 4.55% CTR, average position 8.91, 9 query rows, and 7 GA4 Organic sessions in the latest available page summary. Query evidence includes `dragonsword awakening interactive map` (4 impressions, 1 click) and `dragon sword interactive map` (2 impressions, 0 clicks).

| Child intent | Search validation /30 | Demand /20 | SERP independence /20 | Evidence /20 | Cannibalization safety /10 | Total | Decision |
|---|---:|---:|---:|---:|---:|---:|---|
| interactive map | 21 | 14 | 18 | 10 | 7 | 70 | `OBSERVE` |
| chest locations | 12 | 12 | 16 | 8 | 7 | 55 | `OBSERVE` |
| locations | 10 | 8 | 14 | 8 | 7 | 47 | `OBSERVE` |
| treasure / chests | 8 | 6 | 12 | 7 | 8 | 41 | `OBSERVE` |

Interactive-map demand is real and the SERP is independently shaped, but the project lacks first-hand coordinates, a stable marker inventory, and enough evidence to publish a useful child page. The gate therefore does not reach `POTENTIAL_CHILD`; no map child page was created. The existing parent already labels the community interactive-map result as Evidence C and states the missing-data boundary. Decision: **`OBSERVE`** / `HOLD_MAP_PARENT`.

### Decision summary

| Cluster | Decision |
|---|---|
| Roadmap | `OPTIMIZED_WINNER` |
| Multiplayer | `HOLD_INSUFFICIENT_EVIDENCE` |
| Map | `OBSERVE` |

**`NO_NEW_URL_CREATED`**. No Roadmap child, Map/Chest/Location child, or Multiplayer child was created. Protected pages and unrelated projects were not modified.

### Sprint validation

- `npm run build`: PASS.
- Generated sitemap route count: 16 indexable URLs; no route loss.
- SEO checks: all generated routes have one H1, self-canonical, and no accidental noindex.
- Internal-link and sitemap consistency: PASS.
- `git diff --check`: PASS.
- Production health sanity: live route verification was not repeated after this local edit; deployment and custom-domain verification remain a separate release gate.
