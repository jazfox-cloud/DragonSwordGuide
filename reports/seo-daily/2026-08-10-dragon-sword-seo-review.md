# DragonSword Awakening SEO Daily Review — 2026-08-10

## Scope and evidence

- Repository: `DragonSwordGuide`, `main`
- Before HEAD: `9c318118f44386503feaebf29413df743e02f72d`
- Data date: 2026-08-10 (America/Los_Angeles)
- Evidence policy: Evidence B = official Steam store/announcement/roadmap/livestream sources; Evidence C = community or SERP observation only.
- No new pages were created. The sitemap remains 14 indexable URLs.

## Official freshness review

- Latest verified official update: **1.0.8**, applied 2026-08-06. The page now keeps 1.0.7 as historical context rather than calling it current/latest.
- Official roadmap facts added to existing pages: four planned second-half-2026 Heroes (Ryza, Jerome, Veronica, Logan); post-launch direction covering QoL work, Hero Quests, Rifts and multiplayer Raids.
- The Aug 10 KST official livestream is recorded as scheduled roadmap/AMA/developer-playthrough coverage. Livestream outcomes, dates, platforms and unannounced systems remain unconfirmed until an official post is published.
- No claim was added for story co-op, open-world co-op, cross-platform play, console launch timing, or a specific roadmap release date.

## SEO measurement baseline

| Metric | 2026-08-10 |
|---|---:|
| Sitemap HTTP status / URL count | 200 / 14 URLs observed in production sitemap |
| GSC access / property | Working / `sc-domain:dragonswordguide.com` |
| GSC permission | `siteFullUser` |
| Homepage index status | Submitted and indexed |
| Homepage last crawl | `2026-08-09T03:45:02Z` |
| Homepage fetch / robots / canonical | Successful / Allowed / Correct |
| Search Analytics last 7 days | Empty / 0 query rows |
| GA4 Property ID | `549210618` |
| GA4 date range | `2026-08-04` to `2026-08-10` |
| GA4 active users / sessions | 33 / 34 |
| GA4 Organic Search active users / sessions | 1 / 1 |
| GA4 Organic landing page | `/teams/` |
| GA4 Realtime active users | 1 |

P0 URLs checked locally: `/`, `/multiplayer/`, `/is-it-gacha/`, `/characters/`, `/roadmap/`. All built P0 pages have a self canonical and an H1. Production was observed before this change set, so post-release verification is listed separately.

## Measurement baseline re-run — 2026-08-10

This re-run was read-only and made no production content/code, URL, sitemap, or homepage changes.

### GSC

- Access: **Working** for `sc-domain:dragonswordguide.com` with permission `siteFullUser`.
- Sitemap discovered pages: **N/A** — the live sitemap returned HTTP 200 and contains 14 URLs; the minimal Search Analytics query returned an empty result, not a discovered-page count.
- Indexed status:
  - `/`: **Submitted and indexed**; last crawl `2026-08-09T03:45:02Z`; fetch Successful; robots Allowed; canonical Correct.
  - `/multiplayer/`, `/is-it-gacha/`, `/characters/`, `/roadmap/`: N/A — not inspected in this minimal rerun.
- Search Analytics last 7 days: **empty / 0 query rows** for `2026-08-04` to `2026-08-10`.
- Query → target URL mapping: **empty / 0 query rows**.
- Crawl/indexing errors: **N/A** — no issue-detail query was requested in this minimal rerun.

### GA4

- Data API: **Working**
- Property: `DragonSword Guide` (`549210618`)
- Date range: `2026-08-04` to `2026-08-10`
- Active users: **33**
- Sessions: **34**
- Organic Search active users: **1**
- Organic Search sessions: **1**
- Organic landing page: **`/teams/`**
- Realtime active users: **1**
- Admin API: **Not enabled, but not blocking reporting**

The measurement pipeline is now operational. GSC query data is still empty and the organic sample is too small for a content-expansion decision.

## SERP and multiplayer baseline

The 2026-08-10 SERP check for `Dragon Sword Awakening multiplayer`, `co-op`, `matchmaking`, `co-op raids`, and `invite friends` found the official Steam store page plus several third-party/community guide pages. These are demand/competition observations, not ranking metrics. No third-party claim was upgraded to Evidence B.

The existing `/multiplayer/` page was strengthened in place:

- title/H1 and first-view answer remain aligned to multiplayer intent;
- latest verification moved to August 10;
- 1.0.8 is shown as the latest checked update;
- official Steam Online Co-op, Subjugation/Raids, Quick Entry, and lobby search-range evidence remain separated from unverified story/open-world co-op;
- a 1.0.8 source was added, plus internal Roadmap and related-guide links remain present;
- canonical remains `https://dragonswordguide.com/multiplayer/` and the page is indexable.

## Changed URLs and evidence

| URL | Change | Evidence |
|---|---|---|
| `/` | Live Signal now leads with 1.0.8 and preserves 1.0.7 as history | B |
| `/roadmap/` | Current update, Aug 10 scheduled livestream, roadmap scope, dates/platform uncertainty | B |
| `/multiplayer/` | Freshness/source attribution updated; no unsupported co-op scope added | B + C labeled boundary |
| `/characters/` | Four roadmap Heroes added as planned, not launch roster/current availability | B |

## Verification

- `npm run build`: PASS (15 static routes; sitemap generated)
- `git diff --check`: PASS
- SEO audit: PASS by built-output checks for P0 canonical/H1, indexable static output, robots/sitemap generation, and stale `current/latest 1.0.7` label review. No project-specific automated SEO script exists.
- Production deployment: Cloudflare Pages project `dragonswordguide`, Git Provider = Yes, Production deployment `edbe16c4-c01d-4a84-9ae7-ae451ce26aec`, source `a562f5b`, preview `https://edbe16c4.dragonswordguide.pages.dev`.
- Post-deployment custom-domain verification: `https://dragonswordguide.com/`, `/multiplayer/`, `/is-it-gacha/`, `/characters/`, `/roadmap/`, `/robots.txt`, and `/sitemap-index.xml` all returned HTTP 200. P0 HTML exposed self canonicals and GA4; `/roadmap/` exposed 1.0.8, Ryza, and the scheduled livestream wording; `/characters/` exposed Ryza; the custom domain matched the new Pages deployment.

## Decision

**YELLOW** — measurement pipeline is operational, homepage is indexed, and the site has recorded its first Organic Search session. GSC query data is still empty and the organic sample is too small for content expansion.

Highest-priority action: **collect several more days of GSC query/impression data before selecting the next Planned keyword cluster.**
