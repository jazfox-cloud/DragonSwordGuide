# DragonSword Awakening SEO Daily Review — 2026-08-11

## 1. Executive Status

**RED** — the first non-brand Search Console rows have appeared and GA4 organic landings expanded, but the active Pages deployment is not yet reflected on the custom domain. The custom-domain mismatch blocks production acceptance of the `/teams/` refresh.

## 2. Today's strongest signal

GSC now has two non-brand query rows: `dragon sword awakening runes` mapped to `/systems/runes/` at position 10.0, and `dragon sword roadmap` mapped to `/` at position 2.0. This is the first confirmed query/impression validation in the available baseline. GA4 also shows 6 Organic Search sessions across three landing pages: `/systems/runes/` (3), `/roadmap/` (2), and `/teams/` (1).

## 3. GSC delta

Property access is working for `sc-domain:dragonswordguide.com`; the latest Search Analytics window available to this review is 2026-08-04 through 2026-08-10. The Search Console API returned two query rows, 16 total impressions, and 0 clicks. Query/page rows were:

| Query | URL | Clicks | Impressions | Position | Brand / Non-brand |
|---|---|---:|---:|---:|---|
| dragon sword awakening runes | `/systems/runes/` | 0 | 1 | 10.0 | Non-brand |
| dragon sword roadmap | `/` | 0 | 1 | 2.0 | Non-brand |

Page-level rows contained 10 impressions for `/` and 6 for `/systems/runes/`; the dimension totals are not additive to query totals because Search Console dimensions expose different aggregation views.

Sitemap: `https://dragonswordguide.com/sitemap-index.xml` returned `warnings=0`, `errors=0`, 14 submitted URLs, and `indexed=0` in the sitemap aggregate. This is treated as a stale/low-volume aggregate, not an indexing blocker: homepage inspection is PASS / Submitted and indexed, with successful fetch, robots allowed, self canonical, and last crawl `2026-08-11T02:08:04Z`. `/teams/` inspection is `Discovered - currently not indexed`; live URL is HTTP 200 and remains in the sitemap.

| Metric | 2026-08-10 baseline | 2026-08-11 current | Change |
|---|---:|---:|---:|
| Indexed core URLs confirmed | 1 | 1 | 0 |
| Clicks | 0 | 0 | 0 |
| Impressions | Empty / unavailable as rows | 16 page-view rows | First signal |
| Query count | 0 | 2 | +2 |
| Non-brand query count | 0 | 2 | +2 |
| Top 50 queries | 0 | 2 | +2 |
| Top 20 queries | 0 | 2 | +2 |
| Top 10 queries | 0 | 2 | +2 |
| Organic sessions | 1 | 6 | +5 |

The indexed-URL comparison is limited to URLs inspected in each baseline; it is not a claim that only one URL can be indexed.

## 4. GA4 delta

GA4 Data API worked for property `549210618`, latest available range 2026-08-05 through 2026-08-10: 45 active users and 46 sessions overall. Organic Search contributed 6 sessions / 6 active users across:

| Landing page | Organic sessions |
|---|---:|
| `/systems/runes/` | 3 |
| `/roadmap/` | 2 |
| `/teams/` | 1 |

`/teams/` is no longer the only organic landing page, but its signal is still one session and not yet repeatable enough to justify a larger team-composition expansion. Realtime showed 3 active users and is excluded from SEO conclusions.

## 5. First queries / ranking movement

First confirmed non-brand rows are the two queries listed above. `dragon sword roadmap` is the first Top 20 and Top 10 row at position 2.0. `dragon sword awakening runes` is the first Top 50 row at position 10.0. No clicks or repeat query pattern are confirmed yet.

## 6. `/teams/` decision

**STRENGTHEN**

Decision gate C is met: current SERP results show a clear team-composition question, and community discussion shows demand around synergy and investment choices. The page had not directly answered early-team decision logic or how to prioritize investment. The change is intentionally small: updated `dateModified`/last-verified date, clarified the official Steam evidence boundary, added a practical Starter → Connector → Finisher investment test order, and linked to the existing character/build pages. No specific “best team,” tier ranking, damage number, or unsupported hero priority was added.

Current SERP/community sources are Evidence C for demand and player-experience observation only; the official Steam store is Evidence B for 19 Heroes, Status Ailments, Signal Skills, and Switching Signals. Third-party team lists are not treated as official balance data.

## 7. Keyword cluster ranking

Scores use Demand / Evidence / SERP Opportunity / Site Fit, each 0–25. Scores are conservative observations, not keyword-tool volume.

| Candidate cluster | Score / 100 | Overlap risk | Action |
|---|---:|---|---|
| Co-op raids / matchmaking | 66 | High with `/multiplayer/` | OBSERVE; refresh existing page only if query evidence repeats |
| Steam Deck / PC performance | 63 | Low-medium | OBSERVE |
| Rift System | 61 | Medium with `/roadmap/` and systems | OBSERVE |
| Ryza | 60 | High with `/characters/` and roadmap | OBSERVE |
| New heroes / upcoming characters | 58 | High with `/characters/` | OBSERVE |
| Hero Quests | 56 | Medium with roadmap/gameplay | OBSERVE |
| Map / chest locations | 51 | Low, but evidence depth is thin | OBSERVE |

No candidate passes the full `READY_TO_BUILD` gate today: none combines a validated standalone query with enough demand evidence and low cannibalization risk. Therefore there is no `NEXT_PLANNED_CLUSTER`; continue waiting for repeated query/page evidence.

## 8. Biggest current SEO problem

**Deployment mismatch:** Cloudflare Pages reports active production source `b66e260`, and the deployment preview serves the new `/teams/` content, but `https://dragonswordguide.com/teams/` still serves the previous Aug 8 page. This is a production acceptance blocker; DNS/Cloudflare global changes were not made.

## 9. Tomorrow recommendation

1. Recheck the custom domain against active Pages source `b66e260`; investigate the Pages/custom-domain propagation or routing mismatch before claiming production success.
2. Recheck GSC query/page rows and URL Inspection after another data delay, especially `/teams/`, `/systems/runes/`, and `/roadmap/`.
3. Keep all new clusters at `OBSERVE`; only promote a cluster after repeated query intent or a clearly non-overlapping validated need.

## Production health and verification

- Local `npm run build`: PASS; 15 static routes generated and sitemap output created.
- Local SEO contract checks: PASS for the homepage and six core pages — HTTP build output exists, one H1, self canonical, no accidental noindex, Article JSON-LD present, and robots/sitemap generated.
- `git diff --check`: PASS.
- Pages deployment lookup: **active**, production source `b66e260`, preview `https://2bf99fdd.dragonswordguide.pages.dev`.
- Preview verification: **PASS** — `/teams/` HTTP 200, canonical self-reference, no noindex, Article schema, Aug 11 date, and the new early-team section present.
- Custom-domain verification: **FAIL / mismatch** — core custom-domain URLs returned HTTP 200 with canonical and Article schema, but `/teams/` still exposed Aug 8 content and did not contain the new section. No DNS, Cloudflare global setting, GSC write, sitemap submission, or new URL creation was performed.

## Files changed

- `src/pages/teams/index.astro` — minimal evidence-gated intent enhancement.
- `reports/seo-daily/2026-08-11-dragon-sword-seo-review.md` — this dated review.

## Sources

- [Official DragonSword: Awakening Steam store page](https://store.steampowered.com/app/4570720/DragonSword__Awakening/)
- [Current team-composition SERP observation — Destructoid](https://www.destructoid.com/best-team-compositions-in-dragonsword-awakening/)
- [Current team-composition SERP observation — Games.GG](https://games.gg/dragonsword-awakening/guides/dragonsword-awakening--best-team-compositions/)
- [Community FAQ observation — Reddit](https://www.reddit.com/r/DragonSwordAwakening/comments/1t83k1i/faq_dragonsword_awakening/)
