# DragonSwordGuide Japanese Pilot Implementation

Date: 2026-08-23
Status: DEPLOYED

## Scope

Published Japanese pilot URL set:

| Route ID | English URL | Japanese URL | Status |
| --- | --- | --- | --- |
| home | `/` | `/ja/` | Implemented |
| roadmap | `/roadmap/` | `/ja/roadmap/` | Implemented |
| map | `/map/` | `/ja/map/` | Implemented |
| runes | `/systems/runes/` | `/ja/systems/runes/` | Implemented |
| multiplayer | `/multiplayer/` | `/ja/multiplayer/` | Implemented |
| builds | `/builds/` | `/ja/builds/` | Implemented |

No `/en/` path was created. English remains the root/default URL model.

## Translation Status

- `TRANSLATION_STATUS`: PILOT_HUMAN_REVIEW_READY
- `UNRESOLVED_TERMS`: none in the approved pilot scope.
- Locked terminology source: `reports/i18n/japanese-terminology-lock.json`.
- Japanese copy follows the approved Phase 0 artifacts and avoids silently replacing locked terms.
- Pages intentionally not created in this pilot: `/ja/price/`, `/ja/teams/`, `/ja/system-requirements/`.

## URL Model, Canonicals, Hreflang

- Japanese pages emit `<html lang="ja">`.
- English pages remain `<html lang="en">`.
- Every pilot page has a self-canonical URL.
- Every real EN/JA pair has reciprocal hreflang:
  - `en`
  - `ja`
  - `x-default`
- Hreflang is only emitted for real counterparts in the pilot route map.
- Lightweight language switcher is available on paired pages and points only to real counterpart URLs.

## Sitemaps

- `src/pages/sitemap-index.xml.ts`: sitemap index.
- `src/pages/sitemap-en.xml.ts`: English URLs.
- `src/pages/sitemap-ja.xml.ts`: six Japanese pilot URLs.
- `src/pages/sitemap.xml.ts`: compatibility alias for sitemap index.
- `public/robots.txt` already references `https://dragonswordguide.com/sitemap-index.xml`.

## Map Localization

- `MAP_SHARED_COORDINATES`: PASS. `/ja/map/` reuses the existing shared marker and chest datasets.
- `MAP_JA_LABELS`: PASS. Marker UI, categories, regions, statuses, controls, search shell, and detail panel labels are localized.
- `CHEST_JA_LOCALIZATION`: PASS. Chest Japanese display names are generated deterministically from shared chest IDs/regions/types; no duplicate Japanese chest coordinate dataset was created.
- Search supports Japanese labels/aliases and English labels/aliases. English map search remains covered by existing map tests.

## Source Stale Check

Source revision tracking was added for the six pilot pages. Current validation result:

```text
[i18n:stale] home: current
[i18n:stale] roadmap: current
[i18n:stale] map: current
[i18n:stale] runes: current
[i18n:stale] multiplayer: current
[i18n:stale] builds: current
```

## GSC Baseline

Fresh GSC baseline was collected before deployment using final data only.

- Property: `sc-domain:dragonswordguide.com`
- Baseline window: 2026-08-01 to 2026-08-20
- Latest final date: 2026-08-20
- Excluded incomplete dates: 2026-08-21 and 2026-08-22
- Japanese-language query sample:
  - queries: 3
  - clicks: 1
  - impressions: 13
  - representative queries:
    - `ドラゴンソード アウェイクニング ロードマップ`
    - `ドラゴンソード アウェイクニング マルチプレイ`
    - `ドラゴンソード ロードマップ`
- Japan country baseline:
  - clicks: 7
  - impressions: 75
  - CTR: 9.33%
  - average position: 9.15

No indexing request was submitted.

## Validation

Local validation:

```text
npm run build: PASS
npm test: PASS
npm run i18n:stale: PASS
git diff --check: PASS
scripts/i18n/browser-smoke.mjs: PASS
```

Browser smoke coverage:

- Desktop and mobile smoke for all six Japanese URLs.
- `/ja/map/`: chest filter, Japanese search, alias search, marker detail, cluster/lazy loading, pan, zoom, reset, and no horizontal overflow.
- English map: existing map tests still pass.

## Files

Created:

- `scripts/i18n/browser-smoke.mjs`
- `scripts/i18n/check-hreflang.mjs`
- `scripts/i18n/check-map-locale.mjs`
- `scripts/i18n/check-source-staleness.mjs`
- `src/components/LanguageSwitcher.astro`
- `src/components/SourceRevisionMeta.astro`
- `src/content.config.ts`
- `src/content/ja/*`
- `src/i18n/*`
- `src/pages/ja/*`
- `src/pages/sitemap-en.xml.ts`
- `src/pages/sitemap-index.xml.ts`
- `src/pages/sitemap-ja.xml.ts`
- `src/pages/sitemap.xml.ts`

Changed:

- `astro.config.mjs`
- `package.json`
- shared layout/components for localized labels and route-aware SEO.
- six English counterpart pages to declare route IDs.

## Deployment

- Site content commit: `635c9dd` (`Add Japanese pilot pages`)
- Push: PASS, `origin/main`
- Cloudflare Pages deployment: PASS
  - Project: `dragonswordguide`
  - Environment: Production
  - Deployment ID: `3d832f06-7a4b-4452-971f-46915949c11f`
  - Source: `635c9dd`
  - Preview URL: `https://3d832f06.dragonswordguide.pages.dev`
- Custom-domain smoke:
  - `https://dragonswordguide.com/ja/`: HTTP 200
  - `https://dragonswordguide.com/sitemap-ja.xml`: HTTP 200
- Production browser smoke: PASS for the six Japanese pilot URLs and `/ja/map/` interactions.
- Follow-up validation note: the browser smoke harness was hardened to wait for production page readiness and chest chunk lazy loading. This changed validation tooling only, not public Japanese page content or map data.

## Pilot Gate

`PILOT_GATE`: PASS

The Japanese pilot is deployed and production-smoked. No indexing request was submitted.
