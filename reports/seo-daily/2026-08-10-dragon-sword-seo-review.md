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
| GSC sitemap status | N/A — `sc-domain:dragonswordguide.com` is not authorized for the available read-only service account |
| Discovered URLs | N/A — GSC property access unavailable |
| Indexed P0 / total P0 | N/A / 5 — URL Inspection unavailable because the property is not authorized |
| Clicks | N/A — insufficient GSC access |
| Impressions | N/A — insufficient GSC access |
| CTR | N/A — insufficient GSC access |
| Average position | N/A — insufficient GSC access |
| Non-brand queries | N/A — insufficient GSC access |
| Top 50 URLs / queries | N/A — insufficient GSC access |
| Top 20 URLs / queries | N/A — insufficient GSC access |
| Top 10 URLs / queries | N/A — insufficient GSC access |
| GA4 production tracking | Present in live HTML; backend organic attribution not verified |
| GA4 organic sessions | N/A — no GA4 reporting access; test traffic not substituted |
| GA4 organic users | N/A — no GA4 reporting access; test traffic not substituted |

P0 URLs checked locally: `/`, `/multiplayer/`, `/is-it-gacha/`, `/characters/`, `/roadmap/`. All built P0 pages have a self canonical and an H1. Production was observed before this change set, so post-release verification is listed separately.

## Measurement baseline re-run — 2026-08-10

This re-run was read-only and made no production content/code, URL, sitemap, or homepage changes. The requested permission state was not available to the API credentials used for this run.

### GSC

- Property access: **FAIL / unavailable**. The service account's authorized property list does not include `sc-domain:dragonswordguide.com`; Search Analytics and URL Inspection return HTTP 403 `User does not have sufficient permission`.
- Sitemap discovered pages: **N/A** from GSC. The live sitemap itself returned HTTP 200 and contains 14 URLs; this is not a GSC discovered-pages count.
- Indexed status:
  - `/`: N/A — URL Inspection unavailable
  - `/multiplayer/`: N/A — URL Inspection unavailable
  - `/is-it-gacha/`: N/A — URL Inspection unavailable
  - `/characters/`: N/A — URL Inspection unavailable
  - `/roadmap/`: N/A — URL Inspection unavailable
- Last 7 days clicks: **N/A**
- Last 7 days impressions: **N/A**
- CTR: **N/A**
- Average position: **N/A**
- Non-brand queries: **N/A**
- Query → target URL mapping: **N/A**
- Crawl/indexing errors: **N/A** — issue detail and URL Inspection require property access; no zero/clean claim is made.

### GA4

- Property access: **FAIL / unavailable**. Production exposes measurement ID `G-8FSN3XDL1K`, but the Analytics Admin API is disabled for the service-account project and no GA4 property/report access was available.
- Last 7 days users: **N/A**
- Last 7 days sessions: **N/A**
- Organic Search users: **N/A**
- Organic Search sessions: **N/A**
- Organic Search landing pages: **N/A**
- Organic Search engagement rate: **N/A**
- Top organic landing pages: **N/A**

No first measurable GSC or GA4 baseline was produced in this re-run. The first baseline remains pending actual property access and API/report availability; no metric is inferred from HTML tracking presence.

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

**YELLOW** — no production content/code was changed in this re-run; deployment remains healthy, but GSC property authorization and GA4 backend access are still unavailable. The measurement baseline is intentionally incomplete rather than filled with zeros.

Biggest SEO problem after today’s work: **the authorized reporting path still cannot read this domain’s GSC property or GA4 property, so indexing, query demand, organic landing pages, and acquisition cannot yet be compared or used to prioritize the next SEO action.**
