# DragonSword Awakening SEO — Map Evidence Gate + Roadmap Observation + Multiplayer Query Decomposition

## 1. Executive Status

**GREEN.** Production is healthy. Map demand is real, but the evidence audit does not support a complete, maintainable interactive map yet. Roadmap remains a strong winner awaiting a longer post-change window. Multiplayer's zero CTR is mainly an answer-visible, low-sample SERP problem rather than a proven metadata defect. No public URL or production page was created.

## 2. Latest Data Coverage

| Source | Latest complete / verified date | Status |
|---|---|---|
| GSC | 2026-08-12 | Read-only API refresh; no newer complete date available. |
| GA4 | 2026-08-12 | Latest verified Organic Search coverage; no configuration changes. |
| Production | 2026-08-15 | Sitemap index plus all 16 sitemap URLs checked. |

## 3. Comparable Windows

| Window | Clicks | Impressions | CTR | Avg position | Pages with impressions | GA4 Organic sessions |
|---|---:|---:|---:|---:|---:|---:|
| GSC latest 2d, Aug 11–12 | 56 | 1,162 | 4.82% | 7.83 | 8 | — |
| GSC previous 2d, Aug 9–10 | 11 | 221 | 4.98% | 7.90 | 5 | — |
| GA4 latest 2d, Aug 11–12 | — | — | — | — | — | 52 |
| GA4 previous 2d, Aug 9–10 | — | — | — | — | — | 6 |
| GSC latest 7d, Aug 6–12 | 67 | 1,383 | 4.84% | 7.84 | 8 | — |
| GSC previous 7d, Jul 30–Aug 5 | `NO_PRIOR_ROWS` | `NO_PRIOR_ROWS` | N/A | N/A | 0 | — |
| GA4 latest 7d, Aug 6–12 | — | — | — | — | — | 58 |
| GA4 previous 7d, Jul 30–Aug 5 | `NO_PRIOR_ROWS` | — | — | — | — | 0 |

## 4. Map Query Decomposition

All rows below land on `/map/` in the latest complete 7-day GSC window. Repeat means the query was observed in more than one dated query/page response; the current data supports repeated intent, not complete location coverage.

| Query | Clicks | Impressions | CTR | Position | Repeat signal |
|---|---:|---:|---:|---:|---|
| `dragonsword interactive map` | 1 | 18 | 5.56% | 7.94 | YES |
| `dragonsword awakening interactive map` | 1 | 8 | 12.50% | 14.63 | YES |
| `dragon sword interactive map` | 0 | 3 | 0% | 9.67 | YES |
| `dragon sword awakening interactive map` | 1 | 1 | 100% | 14.00 | INSUFFICIENT_DATA |
| `dragon sword map` | 1 | 1 | 100% | 7.00 | INSUFFICIENT_DATA |
| `dragonsword map` | 0 | 3 | 0% | 22.67 | YES |
| `dragonsword map interactive` | 0 | 2 | 0% | 12.00 | INSUFFICIENT_DATA |
| `interactive map dragonsword awakening` | 0 | 1 | 0% | 10.00 | INSUFFICIENT_DATA |
| `dragonsword awakening map` | 0 | 1 | 0% | 23.00 | INSUFFICIENT_DATA |

The parent page total is 7 clicks / 127 impressions / 5.51% CTR / position 9.84 in the latest 2 days, and 7 / 141 / 4.96% / 9.64 in the latest 7 days.

## 5. Interactive Map Evidence Audit

### Marker inventory

The current project can name broad categories from official material: caves, dungeons, watchtower cellars, treasure, resources, quests and NPCs. It cannot currently verify a complete marker inventory for chests, bosses, NPCs, resources, landmarks, dungeons or puzzles. The local parent page explicitly avoids claiming a complete chest index, exact total or verified coordinates.

### Location precision

No first-hand gameplay capture, stable coordinate system, reproducible route set or screenshot-backed region index is present in this checkout. Community maps show candidate locations and user pain points, including underground/city chest uncertainty, but do not establish exact official coordinates or completeness.

### Completeness

The only honest current statement is **verified subset / research in progress**. “Full coverage,” “all chests,” exact totals and complete marker coverage are unsupported.

### Freshness

Freshness is maintainable only if every marker stores game-version/date, source and verification state. Current official evidence confirms broad world/features and a 1.0.7 increase in saved World Map pins from 100 to 200, but not a versioned external marker dataset.

## 6. Map Source Audit

| Source | Evidence level | What it can support | Reliability | Reusable? |
|---|---|---|---|---|
| First-hand gameplay, screenshots and route verification | Evidence A | Exact marker, screenshot, route and versioned subset | Highest if reproduced | Yes, after capture and logging |
| Official Steam store page | Evidence B | Orbis, broad exploration areas, caves, dungeons and treasure context | High for broad facts | Yes, for parent framing |
| Official Steam update notes | Evidence B | Map-pin limit change and official feature changes | High for stated changes | Yes, version/date bound |
| Reddit WIP interactive-map thread | Evidence C | Demand, candidate chest/puzzle pain points, community terminology | Medium for demand; low for completeness | Demand only |
| Third-party interactive maps / wikis | Evidence C | Existing SERP shape, candidate markers and product expectations | Unknown unless independently verified | Research lead only |
| YouTube/community guides | Evidence C | Demand and possible candidate routes | Variable | Research lead only |

Evidence C cannot establish complete coverage, exact totals or official coordinates without independent verification.

## 7. Map Product Feasibility

| Product form | Score | Feasible now? | Notes |
|---|---:|---|---|
| Static locations guide | 74/100 | Partially, parent-only | Best near-term form after first-hand sections exist; current parent already covers broad intent. |
| Interactive map | 59/100 | No | Strong intent fit, but marker inventory, coordinates, completeness and maintenance data are missing. |
| Verified map index | 65/100 | No | Could work for a small verified subset, but no actual verified marker dataset exists yet. |

Scoring dimensions: User Value /25, Evidence Feasibility /25, Maintenance Cost /20, Search Intent Fit /20, Technical Complexity /10.

## 8. Map Re-score

| Dimension | Score |
|---|---:|
| Search Validation | 23/30 |
| SERP Independence | 18/20 |
| Evidence Strength | 8/20 |
| User Value | 16/20 |
| Cannibalization Safety | 6/10 |
| **Total** | **71/100** |

Decision: **`RESEARCH_REQUIRED`**. The query and SERP case is strong enough to justify evidence collection, but evidence strength is below the required 15 and the product cannot honestly promise complete map coverage. No `/interactive-map/` URL was created.

## 9. Roadmap Post-Change Review

Latest 2-day `/roadmap/` metrics: **38 clicks, 589 impressions, 6.45% CTR, position 6.98**. Latest 7-day metrics: **44 clicks, 657 impressions, 6.70% CTR, position 6.97**. Verified GA4 Organic sessions for `/roadmap/` in the latest 2-day coverage: **34**.

Classification: **`WINNER_WAIT_MORE_DATA`**. Clicks and ownership remain strong, but only two complete post-change days are available and GSC delay/query mix prevent causal attribution.

## 10. Roadmap Ownership

| Query | Landing URL | Clicks | Impressions | Position |
|---|---|---:|---:|---:|
| `dragon sword awakening roadmap` | `/roadmap/` | 11 | 80 | 7.15 |
| `dragonsword roadmap` | `/roadmap/` | 8 | 45 | 4.64 |
| `dragonsword awakening roadmap` | `/roadmap/` | 6 | 232 | 7.57 |
| `roadmap dragonsword` | `/roadmap/` | 2 | 9 | 3.78 |
| `dragonsword awakening next update` | `/roadmap/` | 1 | 2 | 7.00 |
| `dragon sword roadmap` | `/` | 0 | 1 | 2.00 |
| `dragon sword roadmap` | `/roadmap/` | 0 | 4 | 6.25 |

Status: **`OWNERSHIP_IMPROVING`**. The broad family is owned by `/roadmap/`; the short exact query remains mixed with the homepage.

## 11. Multiplayer Query Decomposition

Latest 2-day page total: **0 clicks, 252 impressions, 0% CTR, position 8.10**. Latest 7-day total: **0 clicks, 304 impressions, 0% CTR, position 8.08**.

| Query | Clicks | Impressions | CTR | Position | Likely intent |
|---|---:|---:|---:|---:|---|
| `is dragonsword awakening multiplayer` | 0 | 20 | 0% | 10.35 | multiplayer yes/no |
| `dragon sword awakening multiplayer` | 0 | 16 | 0% | 7.25 | multiplayer scope |
| `dragon sword awakening coop` | 0 | 13 | 0% | 8.46 | co-op scope |
| `dragonsword awakening multiplayer` | 0 | 9 | 0% | 10.11 | multiplayer scope |
| `is dragon sword awakening multiplayer` | 0 | 7 | 0% | 6.43 | multiplayer yes/no |
| `is dragonsword multiplayer` | 0 | 5 | 0% | 8.00 | multiplayer yes/no |
| `does dragonsword awakening have coop` | 0 | 4 | 0% | 8.00 | co-op yes/no |
| `dragonsword awakening matchmaking` | 0 | 3 | 0% | 6.00 | matchmaking |

No current GSC rows support separate invite, lobby, PvP, raids or play-with-friends child intent at meaningful volume.

## 12. Multiplayer CTR Root Cause

Diagnosis: **`ANSWER_VISIBLE_IN_SERP` + `COMPETITOR_SNIPPET_STRONGER` + `LOW_SAMPLE` + possible `SERP_FEATURE_SUPPRESSION`**.

The page title and description already answer the yes/no query directly, and the first-screen Quick Answer states that selected activities support online co-op. Search results also contain dedicated co-op guides and community FAQ material that answer limitations in a compact table. Rankings around positions 6–10 are competitive but not dominant. There is no isolated, clearly identifiable title/description mismatch to test safely.

CTR experiment gate: **`NOT_READY`**. No metadata or page change was made.

## 13. Structural Page Observation

| Page | Status |
|---|---|
| `/guides/beginner/` | `NOT_ENOUGH_DATA` |
| `/price/` | `NOT_ENOUGH_DATA` |
| `/system-requirements/` | `NOT_ENOUGH_DATA` |

## 14. Fresh Demand Signals

| Topic | Source type | Signal | Relevant URL | Action |
|---|---|---|---|---|
| Interactive map recommendations | Reddit / Evidence C | Aug 14 users compare two interactive maps and report unresolved underground/city chest uncertainty. | `/map/` | `SUPPORTS_MAP_RESEARCH` |
| Community WIP chest map | Reddit / Evidence C | Aug 14 positive response to a WIP all-chests map confirms demand, not completeness. | `/map/` | `SUPPORTS_MAP_RESEARCH` |
| Map product competition | Community wiki / Evidence C | Existing map products advertise versioned/source-linked markers and focused map guides. | `/map/` | `SUPPORTS_MAP_RESEARCH` |
| Multiplayer scope | Steam / community | Steam lists Online Co-op; third-party/community results emphasize selected modes and no full shared-world certainty. | `/multiplayer/` | `SUPPORTS_MULTIPLAYER_RESEARCH` |
| Karmas, Runes and Stats | Reddit / Evidence C | Aug 14 comparison-spreadsheet discussion shows build-system demand, but no verified data set. | `/builds/`, `/systems/runes/` | `OBSERVE` |

Sources: [Steam store](https://store.steampowered.com/app/4570720/DragonSword__Awakening/), [WIP chest map](https://www.reddit.com/r/DSwordAwakening/comments/1vap7qr/all_chests_locations_interactive_map/), [map recommendation thread](https://www.reddit.com/r/DSwordAwakening/comments/1vo8eg7/interractive_map_recommandation/), [community map product](https://dragonsword-awakening.wiki/), [build comparison thread](https://www.reddit.com/r/DragonSwordAwakening/comments/1vnnt1cw/new_findings_change-your-entire-build-best-karmas-runes-stats/).

## 15. Final Decisions

| Area | Decision |
|---|---|
| Map | `RESEARCH_REQUIRED` |
| Roadmap | `WINNER_WAIT_MORE_DATA` |
| Multiplayer | `NOT_READY` for CTR experiment |
| New URL today | `NO_NEW_URL_CREATED` |
| V2.1 | `GREEN` |

## 16. Single Biggest SEO Constraint

**The evidence gap between map demand and verifiable map data.** Searchers clearly want an interactive map, but the project lacks first-hand marker inventory, exact location proof, completeness boundaries and a versioned maintenance process.

## 17. Next Sprint

1. Capture a small first-hand Map evidence subset: named region, screenshot, route steps, marker type, version/date and verification status.
2. Re-run the fixed GSC/GA4 windows after another complete reporting delay; keep Roadmap unchanged and test whether ownership stays concentrated.
3. Keep Multiplayer unchanged; only reconsider CTR testing if a specific snippet mismatch emerges with sustained impressions.

## 18. Production Health and Validation

- Homepage, requested core routes and sitemap index: HTTP 200.
- All 16 sitemap URLs: HTTP 200, one H1, self-canonical, no accidental noindex.
- Sitemap consistency: one sitemap listed, 16 route URLs resolved.
- No source, metadata, internal-link, DNS, Cloudflare, GSC, GA4, AIOS or WOS changes.
- `git diff --check`: run after report creation.

## 19. Files Changed

Only this report is expected to change. Existing untracked `.DS_Store`, brand-pack files and `doct/` are preserved.
