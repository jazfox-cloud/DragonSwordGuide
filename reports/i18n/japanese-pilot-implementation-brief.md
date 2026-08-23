# MULTILINGUAL_LANGUAGE_1_JAPANESE_PILOT Implementation Brief

Status: `READY_FOR_APPROVAL_NOT_STARTED`
Prepared: 2026-08-23
Scope: Japanese pilot only

This brief is executable only after user approval. Do not implement it automatically from Phase 0.

## Objective

Create a production-quality Japanese pilot for:

```text
/ja/
/ja/roadmap/
/ja/map/
/ja/systems/runes/
/ja/multiplayer/
/ja/builds/
```

Keep English at root. Do not create `/en/`. Do not add other languages.

## Non-Goals

- Do not translate every site page.
- Do not create placeholder Japanese routes.
- Do not bulk-copy map coordinates into locale-specific files.
- Do not create `/data/map/ja/chests/`.
- Do not add Korean, Traditional Chinese, Simplified Chinese, Thai, or other hreflang entries.
- Do not mark raw AI translation as human-reviewed.
- Do not index incomplete Japanese pages.

## Files To Create

```text
src/i18n/locales.ts
src/i18n/routes.ts
src/i18n/seo.ts
src/i18n/sourceRevision.ts
src/i18n/dictionaries/en.ts
src/i18n/dictionaries/ja.ts
src/i18n/map/ja.ts
src/content/ja/home.ts
src/content/ja/roadmap.ts
src/content/ja/map.ts
src/content/ja/runes.ts
src/content/ja/multiplayer.ts
src/content/ja/builds.ts
src/pages/ja/index.astro
src/pages/ja/roadmap/index.astro
src/pages/ja/map/index.astro
src/pages/ja/systems/runes/index.astro
src/pages/ja/multiplayer/index.astro
src/pages/ja/builds/index.astro
src/pages/sitemap-index.xml.ts
src/pages/sitemap-en.xml.ts
src/pages/sitemap-ja.xml.ts
scripts/i18n/check-source-staleness.mjs
scripts/i18n/check-hreflang.mjs
scripts/i18n/check-map-locale.mjs
```

Optional if the implementation prefers shared article wrappers:

```text
src/components/LocalizedArticle.astro
src/components/LocalizedHome.astro
src/components/LanguageSwitcher.astro
```

## Files To Modify

```text
astro.config.mjs
package.json
src/layouts/BaseLayout.astro
src/components/MobileNav.astro
src/components/Breadcrumbs.astro
src/components/SourceList.astro
src/components/InteractiveMap.astro
src/data/navigation.ts
src/pages/index.astro
src/pages/roadmap/index.astro
src/pages/map/index.astro
src/pages/systems/runes/index.astro
src/pages/multiplayer/index.astro
src/pages/builds/index.astro
```

Modify English pages only as needed to pass locale props, alternates, source revision metadata, and shared content extraction. Do not rewrite unrelated English copy.

## Locale Config

`src/i18n/locales.ts` should define:

```ts
export const locales = {
  en: {
    code: 'en',
    label: 'English',
    basePath: '',
    htmlLang: 'en',
    default: true
  },
  ja: {
    code: 'ja',
    label: '日本語',
    basePath: '/ja',
    htmlLang: 'ja',
    default: false
  }
} as const;
```

## Route Registry

`src/i18n/routes.ts` is the source of truth for localized counterparts:

```ts
export const localizedRoutes = [
  { id: 'home', en: '/', ja: '/ja/', published: { en: true, ja: true } },
  { id: 'roadmap', en: '/roadmap/', ja: '/ja/roadmap/', published: { en: true, ja: true } },
  { id: 'map', en: '/map/', ja: '/ja/map/', published: { en: true, ja: true } },
  { id: 'runes', en: '/systems/runes/', ja: '/ja/systems/runes/', published: { en: true, ja: true } },
  { id: 'multiplayer', en: '/multiplayer/', ja: '/ja/multiplayer/', published: { en: true, ja: true } },
  { id: 'builds', en: '/builds/', ja: '/ja/builds/', published: { en: true, ja: true } }
] as const;
```

Use this registry for:

- language switcher links
- canonical helper
- hreflang helper
- sitemap output
- stale translation checks
- tests

Do not infer URLs from string replacement.

## SEO Helper

`src/i18n/seo.ts` should expose:

- `absoluteUrl(path: string): string`
- `getCanonical(routeId, locale): string`
- `getAlternates(routeId): Array<{ lang: 'en' | 'ja' | 'x-default'; href: string }>`
- `getBreadcrumbSchema(locale, items)`
- `getArticleSchema(locale, pageMeta)`

Rules:

- Canonical is always self-canonical.
- Alternates are only emitted when both pages exist.
- `x-default` points to the English route in the same route family.
- Japanese schema uses `inLanguage: "ja"` and localized labels.

## BaseLayout Changes

`src/layouts/BaseLayout.astro` should accept:

```ts
locale?: 'en' | 'ja';
routeId?: string;
alternates?: Array<{ lang: string; href: string }>;
shell?: ShellDictionary;
```

Required output:

- `<html lang="ja">` on Japanese pages.
- Existing English pages remain `<html lang="en">`.
- `<link rel="alternate" hreflang="en" ...>`
- `<link rel="alternate" hreflang="ja" ...>`
- `<link rel="alternate" hreflang="x-default" ...>`
- localized nav/footer/common text.
- `LanguageSwitcher` with only real counterpart links.

## Navigation/Footer

Create dictionary entries for:

```text
Guides
Characters
Builds
Teams
Map
Systems
Updates
Unofficial fan-made guide
Steam
Official Discord
Official YouTube
Privacy
Terms
fan-site disclaimer
```

Japanese navigation labels:

```text
ガイド
キャラクター
ビルド
チーム編成
マップ
システム
アップデート
非公式ファンガイド
```

If a linked page has no Japanese counterpart, the Japanese nav should link to English only if that is an intentional English-only navigation choice and visibly remains English-context. For the six pilot pages, use Japanese links.

## Page Content Files

Each Japanese content file should contain:

```ts
export const page = {
  locale: 'ja',
  source_locale: 'en',
  routeId: '<route-id>',
  source_url: '<english-url>',
  localized_url: '<ja-url>',
  source_revision: {
    git_commit: '1177e67ab672f77242cf08d08ae316683767f35d',
    content_hash: '<fill during implementation>',
    source_updated_at: '<source page dateModified or last verified>'
  },
  translation_status: 'AI_TRANSLATED',
  last_translated_at: '2026-08-23',
  title: '<localized title>',
  description: '<localized description>',
  h1: '<localized h1>',
  sections: [...]
};
```

Publication should not claim `HUMAN_REVIEWED` unless a human review actually occurs.

## Page-Specific Implementation Notes

### `/ja/`

Use shared hub component or a compact route wrapper. Translate all visible shell and content blocks. Keep "DragonSword Guide" as brand.

### `/ja/roadmap/`

Use localized content file. Preserve:

- update 1.0.8 status
- update 1.0.7 history
- released/planned/unknown separation
- no inferred dates

### `/ja/map/`

Use shared `InteractiveMap.astro` with:

```text
locale="ja"
labels={mapJa}
```

Load the same marker and chest data:

```text
src/data/map-markers.json
public/data/map/chests/manifest.json
public/data/map/chests/*.json
```

Localized map dictionaries must not contain coordinates.

### `/ja/systems/runes/`

Preserve:

- `200 -> 500`
- `4-Star Rune Synthesis can yield 5-Star Runes`
- no guaranteed result
- no best Rune claim
- no drop rate/stat ceiling claim

### `/ja/multiplayer/`

Use official Japanese term `オンライン協力プレイ` where feature-level. Use `マルチプレイ` for search/title. Preserve all unknown boundaries:

- story co-op
- open-world co-op
- matchmaking details
- PvP
- cross-play

### `/ja/builds/`

Use `ビルド` and `チーム編成`. Preserve:

- no universal best build
- no fake tier list
- no unsupported skill priority
- Runes/Karma remain evidence-bounded

## Map Locale Layer

`src/i18n/map/ja.ts` should include:

```ts
export const mapJa = {
  categories: {
    EONAS_LEGACY: "Eona's Legacy",
    ORGANA_STATUE: 'Organa Statues',
    WARP_POINT: 'ウェイポイント',
    DUNGEON: 'ダンジョン',
    BOSS: 'ボス',
    CHEST: '宝箱'
  },
  statuses: {
    OFFICIAL_VERIFIED: '公式確認済み',
    FIRST_HAND_VERIFIED: '一次確認済み',
    VIDEO_VERIFIED: '動画で確認済み',
    SECONDARY_CORROBORATED: '複数ソースで確認',
    APPROXIMATE: 'おおよその位置',
    CONFLICTING: '情報が競合'
  },
  controls: {
    searchLabel: '場所を検索',
    searchPlaceholder: '名前または地域で検索',
    all: 'すべて',
    chestRegion: '宝箱の地域',
    allLoadedRegions: '読み込み済みの全地域',
    zoomIn: '拡大',
    zoomOut: '縮小',
    reset: 'リセット',
    noMatches: '一致する場所がありません'
  }
} as const;
```

Do not localize unresolved proper nouns as official:

- `Eona's Legacy`
- `Organa Statues`
- individual Eona/Organa marker names unless separately sourced.

## Chest Display Names

Implement generated display names in `InteractiveMap.astro` or a helper:

```text
ja chest display name = 宝箱 #<stable id suffix> - <region label>
```

Search aliases must include:

- Japanese generated name
- English source name
- chest subtype Japanese label
- chest subtype English label
- Japanese region label
- English region label

Coordinates remain loaded only from shared English-neutral JSON.

## Sitemap Implementation

Preferred deterministic approach:

1. Remove or disable default duplicate `@astrojs/sitemap` generation in `astro.config.mjs`.
2. Add:
   - `src/pages/sitemap-index.xml.ts`
   - `src/pages/sitemap-en.xml.ts`
   - `src/pages/sitemap-ja.xml.ts`
3. Generate XML from `src/i18n/routes.ts`.
4. Include hreflang alternates in sitemap entries.

If using Astro sitemap's built-in i18n support instead, verify it emits the exact same URL/canonical/hreflang set and does not create `/en/` URLs.

## Package Scripts

Add scripts:

```json
{
  "i18n:stale": "node scripts/i18n/check-source-staleness.mjs",
  "i18n:hreflang": "node scripts/i18n/check-hreflang.mjs",
  "i18n:map": "node scripts/i18n/check-map-locale.mjs"
}
```

Consider updating `npm test` to include these once stable:

```text
node scripts/map-mvp-check.mjs
node scripts/map/chest-pipeline-check.mjs
node scripts/i18n/check-hreflang.mjs
node scripts/i18n/check-map-locale.mjs
```

## Tests And Gates

Required before commit/deploy:

```text
npm run build
npm test
npm run i18n:stale
npm run i18n:hreflang
npm run i18n:map
git diff --check
```

Manual or Playwright smoke:

```text
/ja/
/ja/roadmap/
/ja/map/
/ja/systems/runes/
/ja/multiplayer/
/ja/builds/
```

Check:

- 200 status
- no horizontal overflow desktop/mobile
- Japanese nav/footer
- language switcher links
- canonical self points to `/ja/...`
- reciprocal hreflang exists
- structured data has `inLanguage: ja`
- no untranslated placeholder blocks
- map filter/search/detail/pan/zoom/reset works
- Japanese map search finds 宝箱, ウェイポイント, ダンジョン, フィールドボス
- English alias search still works on `/ja/map/`

## Deployment Gates

Only after tests pass:

1. Commit exact implementation files.
2. Push `main` or approved branch according to project release process.
3. Deploy through GitHub-backed Cloudflare Pages flow.
4. Confirm active production deployment SHA matches pushed commit.
5. Production smoke:
   - `https://dragonswordguide.com/ja/`
   - `https://dragonswordguide.com/ja/map/`
   - sitemap index
   - HTML canonical/hreflang
   - map interaction
6. Fetch fresh GSC baseline after deployment date is visible in Search Console.

## Indexing Gate

Japanese pages may be indexable only if:

```text
localized title
localized description
localized H1
localized main content
localized navigation
localized footer
localized map UI where applicable
html lang="ja"
self canonical
reciprocal hreflang
valid localized schema
source revision metadata
no placeholder blocks
no fake official terminology
no hidden evidence upgrades
```

If any check fails, keep the page out of sitemap and render `noindex`, or do not create the route.

## Success Criteria

```text
PILOT_URLS_PUBLISHED: 6
JAPANESE_ROUTES_WITH_SELF_CANONICAL: 6
JAPANESE_ROUTES_WITH_RECIPROCAL_HREFLANG: 6
JAPANESE_ROUTES_IN_JA_SITEMAP: 6
MAP_COORDINATE_DUPLICATION: 0
CHEST_LOCALE_COORDINATE_FILES_CREATED: 0
UNRESOLVED_TERMS_MARKED_OFFICIAL: 0
UNTRANSLATED_PLACEHOLDERS: 0
```

## Stop Condition

After implementation and production smoke, stop and report. Do not proceed to Korean, Traditional Chinese, Simplified Chinese, or any other language without a new user approval.
