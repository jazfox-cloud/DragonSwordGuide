# DragonSwordGuide Multiplayer Content Strengthening

Date: 2026-08-22
URL: `https://dragonswordguide.com/multiplayer/`
Scope: evidence-safe strengthening of the existing `/multiplayer/` owner page. No new URL, canonical change, GSC write, sitemap submission, indexing request, Roadmap edit, Runes edit, Map edit, or Interactive Map work was performed.

## Before

Page baseline from the focused CTR diagnosis:

| Metric | Value |
| ------ | ----: |
| Clicks | 0 |
| Impressions | 728 |
| CTR | 0.00% |
| Avg position | 8.20 |

`MULTIPLAYER_COOP` visible cluster baseline:

| Metric | Value |
| ------ | ----: |
| Clicks | 0 |
| Impressions | 220 |
| CTR | 0.00% |
| Avg position | 9.00 |

Primary diagnosis: `RANKING_POSITION_PROBLEM`

Secondary diagnosis: `CONTENT_GAP_BLOCKED_BY_EVIDENCE` plus possible `SERP_SNIPPET_PROBLEM`

## Changes

- Preserved the existing title, meta description, H1, canonical URL, page owner, Article schema type, Breadcrumb schema, and Adsterra Native placement.
- Strengthened the Quick Answer with the core verified co-op answer plus a short unknown-mechanics boundary.
- Rebuilt the opening status block around four verified facts: Online Co-op, Subjugation and Raids, Quick Entry, and lobby search range.
- Expanded `How Does Multiplayer Work in DragonSword: Awakening?` into a scan-friendly explanation and mechanism status table.
- Added a near-top `What We Still Need to Verify` section so player count, unlock flow, crossplay, progression, loot and host/guest details remain explicit unknowns.
- Added natural internal links to `/gameplay/` and `/teams/`, and updated related guides to include `/gameplay/`, `/teams/`, `/guides/beginner/`, and `/roadmap/`.
- Updated Article JSON-LD `dateModified` to `2026-08-22` because the page content changed.

## Evidence

| Claim | Status | Source boundary |
| ----- | ------ | --------------- |
| Steam lists Single-player and Online Co-op | `OFFICIAL_VERIFIED` | Official Steam store page already used by the project. |
| Subjugation and Raids are co-op activities | `OFFICIAL_VERIFIED` | Hound13 developer discussion already used by the project. |
| Quick Entry exists for multiplayer content | `OFFICIAL_VERIFIED` | Official 1.0.7 update notes already used by the project. |
| Lobby search range setting exists for multiplayer matching | `OFFICIAL_VERIFIED` | Official 1.0.7 update notes already used by the project. |
| 1.0.8 did not add a new co-op mode in the reviewed project source | `OFFICIAL_VERIFIED` | Existing project source attribution via `patch108`. |
| Exact player count | `UNKNOWN` | Not stated as fact. |
| Unlock level, quest, invite flow or menu path | `UNKNOWN` | Not stated as fact. |
| Crossplay or cross-save | `UNKNOWN` | Not stated as fact. |
| Shared progression, shared world progression or loot rules | `UNKNOWN` | Not stated as fact. |
| Current story co-op or open-world co-op | `UNKNOWN` | Not stated as current verified feature. |

## Queries Addressed

- `is dragonsword awakening multiplayer`
- `is dragonsword multiplayer`
- `dragonsword awakening multiplayer`
- `dragon sword awakening coop`
- `dragonsword awakening coop`
- `dragonsword awakening how does coop work`
- `dragonsword awakening coop gameplay`
- `dragonsword awakening matchmaking`

## Validation

- `npm run build`: PASS
- `node scripts/adsterra-native-banner-tests.mjs`: PASS
- Built-output multiplayer SEO/link/layout check: PASS
  - Title exists.
  - Meta description exists.
  - Canonical remains `https://dragonswordguide.com/multiplayer/`.
  - No accidental `noindex`.
  - One H1.
  - Article JSON-LD parses and has `dateModified: 2026-08-22`.
  - Breadcrumb JSON-LD parses.
  - Internal links to `/gameplay/`, `/teams/`, `/guides/beginner/`, and `/roadmap/` exist.
  - Tables retain horizontal overflow protection.
  - Mobile status-grid layout rule exists.
- `git diff --check`: PASS

## Observation

Production deployment verification time: `2026-08-22T15:23:09Z`

Observation start: `2026-08-22T15:23:09Z`, after commit `bdb64f1` was verified on `https://dragonswordguide.com/multiplayer/`.

Do not judge SEO success immediately. Recheck after at least one complete GSC data window and compare against:

| Metric | Baseline |
| ------ | -------: |
| Page clicks | 0 |
| Page impressions | 728 |
| Page CTR | 0.00% |
| Page avg position | 8.20 |
| Visible cluster clicks | 0 |
| Visible cluster impressions | 220 |
| Visible cluster CTR | 0.00% |
| Visible cluster avg position | 9.00 |

Primary success signals: ranking movement from positions 6-10 toward stronger page-one placement, first clicks without material ranking loss, and broader mechanism-intent coverage. Do not optimize again from 1-2 days of incomplete Search Console data.
