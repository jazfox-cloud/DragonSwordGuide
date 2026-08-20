# DragonSword GSC Fresh Data Retrieval Investigation

Date: 2026-08-19 (America/Los_Angeles)

Final classification: `FIXED_FRESH_DATA_AVAILABLE`

## Scope and ownership

- Authoritative property: `sc-domain:dragonswordguide.com`
- Access scope: `webmasters.readonly`
- Reader used by the previous DragonSword daily reviews: `/private/tmp/dragon-gsc-2026-08-15.mjs`
- Ownership category: external/manual temporary helper; it is not tracked by `jazfox-cloud/DragonSwordGuide` or another identified repository.
- No public page, metadata, sitemap, Cloudflare, DNS, GA4, GSC property, or other-site change was made.

## Root cause

The historical helper explicitly sent `dataState: "final"` and also hard-coded its newest comparison windows to end on `2026-08-12`. It therefore could not expose fresh/incomplete rows and repeatedly presented the fixed window boundary as the newest complete date.

This is root cause **B + C**:

1. `dataState: "final"` was explicitly used.
2. Recent dates after 2026-08-12 were manually excluded by fixed window definitions.

No evidence indicated a cache, static reused API response, credential mismatch, or property mismatch. Direct calls with the same read-only credential convention and property succeeded.

## Direct FINAL and ALL probes

Probe interval: `2026-08-10` through `2026-08-19`, dimension `date`.

| Date | Clicks | Impressions | Data status |
|---|---:|---:|---|
| 2026-08-10 | 11 | 205 | CONFIRMED |
| 2026-08-11 | 31 | 623 | CONFIRMED |
| 2026-08-12 | 25 | 539 | CONFIRMED |
| 2026-08-13 | 24 | 447 | CONFIRMED |
| 2026-08-14 | 12 | 336 | CONFIRMED |
| 2026-08-15 | 13 | 347 | CONFIRMED |
| 2026-08-16 | 12 | 405 | CONFIRMED |
| 2026-08-17 | 19 | 320 | CONFIRMED |
| 2026-08-18 | 14 | 293 | EARLY_SIGNAL |
| 2026-08-19 | 5 | 133 | EARLY_SIGNAL |

- Latest FINAL date: `2026-08-17`
- Latest ALL/available date: `2026-08-19`
- Google response metadata: `firstIncompleteDate = 2026-08-18`
- Normalized helper field: `first_incomplete_date = 2026-08-18`

## Minimal helper fix

The external/manual helper was extended locally to keep legacy finalized `windows` and `reports` intact while adding:

- `latest_final_date`
- `latest_available_date`
- `first_incomplete_date`
- `final_rows`
- `early_rows`

Classification is fail-closed:

- `CONFIRMED`: a date returned by the FINAL query, or a date strictly before `first_incomplete_date`.
- `EARLY_SIGNAL`: an ALL-query date not confirmed by the above rule.
- If metadata is missing, only dates returned by FINAL are confirmed; ALL-only dates are early.
- Confirmed-window aggregation rejects any row whose status is not `CONFIRMED`.

External/manual files used for the fix and verification:

- `/private/tmp/dragon-gsc-2026-08-15.mjs`
- `/private/tmp/dragon-gsc-data-tracks.mjs`
- `/private/tmp/dragon-gsc-data-tracks.test.mjs`
- `/private/tmp/dragon-gsc-direct-probe-2026-08-19.mjs`

These files are intentionally not committed to DragonSword because the helper has no identified repository owner.

## Reporting contract

Future DragonSword reports must use CONFIRMED rows only for V2.1 status, comparable 2-day/7-day windows, winner confirmation, CTR experiments, and URL expansion gates. EARLY_SIGNAL rows may be used only for recent direction, anomaly warning, new-query discovery, and latest landing-page observation.

Do not calculate growth across a window containing both statuses. Do not convert ALL-query availability into a complete comparison window.

## Verification

- Direct FINAL probe: succeeded with final rows through `2026-08-17`.
- Direct ALL probe: succeeded with rows through `2026-08-19` and `firstIncompleteDate=2026-08-18`.
- Unit tests: 6 passed, 0 failed.
- Live run of the extended existing helper: exit 0; legacy report keys remained present and all five new fields were returned.
- Repository content pages changed: none.
- Shared infrastructure push: not performed.

## Durability limitation

The current source of truth is a temporary external/manual helper under `/private/tmp`; the local fix is therefore not a durable shared-infrastructure release. Persisting it requires an explicit ownership decision and approval to move the tested helper into a governed repository. Until then, this report is the durable DragonSword reporting contract and evidence record.
