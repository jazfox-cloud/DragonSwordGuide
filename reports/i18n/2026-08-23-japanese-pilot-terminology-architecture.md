# DragonSwordGuide Japanese Pilot Phase 0: Terminology & Architecture

Date: 2026-08-23
Status: `PHASE_0_COMPLETE_NOT_IMPLEMENTED`
Pilot language: Japanese (`ja`)
Implementation project code: `MULTILINGUAL_LANGUAGE_1_JAPANESE_PILOT`

No `/ja/` route, sitemap, hreflang tag, production content, commit, push, indexing request, or deployment was created in this phase.

## Source Boundary

Primary official evidence used:

- Steam Japanese store: `https://store.steampowered.com/app/4570720/DragonSword__Awakening/?l=japanese`
- SteamDB app metadata: `https://steamdb.info/app/4570720/info/`
- Steam Japanese community page / announcements: `https://steamcommunity.com/app/4570720/?l=japanese`
- Steam community Q&A / news context: `https://steamcommunity.com/app/4570720`

Community and SERP-language evidence used:

- AppMedia Japanese hub: `https://appmedia.jp/dragonsword_awakening`
- AppMedia puzzle / reward page: `https://appmedia.jp/dragonsword_awakening/80109265`
- GrandWiki Orbis map: `https://dsawakening.grandwiki.com/map`
- GrandWiki Japanese beginner guide: `https://dsawakening.grandwiki.com/ja/guides/beginner-progression-route`
- DragonSword Awakening Japanese guide index: `https://dragonswordawakening.wiki/ja/guides/`

Evidence interpretation:

- Official Japanese UI/store wording locks core game title, Orbis, dungeon, co-op feature wording, team composition wording, system requirements heading, and roadmap wording.
- Community wording is acceptable for natural Japanese guide/search language, but it is not promoted to official terminology.
- Proper nouns without reliable official Japanese strings remain English. Japanese explanatory wording may be added around them, but not as a fake official name.

## Terminology Lock Summary

Machine-readable lock file: `reports/i18n/japanese-terminology-lock.json`

```text
TERMS_REVIEWED: 26
OFFICIAL_TERM_LOCKED: 7
COMMUNITY_STANDARD: 15
KEEP_ENGLISH: 2
UNRESOLVED: 2
```

| English | Preferred Japanese / site term | Status | Notes |
| --- | --- | --- | --- |
| DragonSword: Awakening | ドラゴンソード:アウェイクニング | `OFFICIAL_TERM_LOCKED` | Steam Japanese + SteamDB agree. |
| Orbis | オルビス | `OFFICIAL_TERM_LOCKED` | Steam Japanese uses オルビス大陸. |
| Roadmap | ロードマップ | `OFFICIAL_TERM_LOCKED` | Steam Japanese community announcement uses ロードマップ生放送. |
| Interactive Map | インタラクティブマップ | `COMMUNITY_STANDARD` | No official JP product term found. |
| Treasure Chest | 宝箱 | `COMMUNITY_STANDARD` | AppMedia and map context support. |
| Warp Point | ウェイポイント | `COMMUNITY_STANDARD` | Keep aliases ワープポイント / Warp Point / Waypoint / Fast Travel. |
| Dungeon | ダンジョン | `OFFICIAL_TERM_LOCKED` | Steam Japanese page uses ダンジョン. |
| Normal Dungeon | 通常ダンジョン | `COMMUNITY_STANDARD` | Official English subtype exists; JP subtype not official-locked. |
| Trait Dungeon | Trait Dungeon | `UNRESOLVED` | Do not publish 特性ダンジョン as official. |
| Currency Dungeon | Currency Dungeon | `UNRESOLVED` | Avoid awkward literal 通貨ダンジョン unless in-game source appears. |
| Field Boss | フィールドボス | `COMMUNITY_STANDARD` | Natural JP gaming term; no official JP source found. |
| Rune | ルーン | `COMMUNITY_STANDARD` | Source-bound to official English system evidence and JP natural term. |
| Rune Synthesis | ルーン合成 | `COMMUNITY_STANDARD` | Must preserve "can yield" uncertainty. |
| Build | ビルド | `COMMUNITY_STANDARD` | Avoid unsupported 最強ビルド / tier claims. |
| Team | チーム編成 | `OFFICIAL_TERM_LOCKED` | Steam Japanese uses チームを編成. |
| Multiplayer | マルチプレイ | `COMMUNITY_STANDARD` | Search wording; official feature lock is online co-op. |
| Co-op | オンライン協力プレイ | `OFFICIAL_TERM_LOCKED` | Steam Japanese feature list. |
| System Requirements | 動作環境 | `OFFICIAL_TERM_LOCKED` | Steam official heading is システム要件; title can use 動作環境 for natural JP SEO. |
| Beginner Guide | 序盤攻略 | `COMMUNITY_STANDARD` | Japanese guide intent favors 序盤攻略. |
| Statue of Organa | Organa Statue | `KEEP_ENGLISH` | Use Japanese explanation only; no official JP proper noun confirmed. |
| Eona's Legacy | Eona's Legacy | `KEEP_ENGLISH` | Use Japanese explanation only; no official JP proper noun confirmed. |

## Japanese Search Intent Lock

Use the following query-intent language for the pilot. Query volume remains `UNKNOWN` except for the existing GSC baseline already captured in the prior multilingual report.

| Pilot URL | Primary Japanese intent | Secondary variants | Natural title terminology | Terms to avoid |
| --- | --- | --- | --- | --- |
| `/ja/` | `ドラゴンソード アウェイクニング 攻略` | `ドラゴンソード 攻略`, `ドラゴンソード wiki`, `ドラゴンソード マップ` | `ドラゴンソード:アウェイクニング 攻略ガイド` | Official wiki, complete database, 最強 without evidence |
| `/ja/roadmap/` | `ドラゴンソード ロードマップ` | `ドラゴンソード アウェイクニング ロードマップ`, `アップデート`, `今後の予定` | `ロードマップと最新アップデート` | Confirmed release dates when unknown, leaked, future content guaranteed |
| `/ja/map/` | `ドラゴンソード マップ` | `ドラゴンソード インタラクティブマップ`, `宝箱`, `ウェイポイント`, `ダンジョン 場所` | `インタラクティブマップ` | Exact official map, all exact locations, first-hand verified |
| `/ja/systems/runes/` | `ドラゴンソード ルーン` | `ルーン合成`, `ルーン 上限`, `5星 ルーン`, `合成 確率` | `ルーンとルーン合成` | Best Rune, drop rate, guaranteed synthesis |
| `/ja/multiplayer/` | `ドラゴンソード マルチプレイ` | `協力プレイ`, `オンライン協力プレイ`, `フレンド`, `マッチング` | `マルチプレイ・協力プレイ` | Open-world co-op confirmed, PvP, cross-play unless verified |
| `/ja/builds/` | `ドラゴンソード ビルド` | `編成`, `チーム編成`, `ルーン ビルド`, `最強キャラ` | `ビルドとチーム編成` | 最強ビルド, tier list, DPS ranking, exact skill priority |

## Pilot Page Translation Specs

### `/ja/`

- Source URL: `/`
- Localized URL: `/ja/`
- Page type: home / guide hub
- Japanese search intent: `ドラゴンソード アウェイクニング 攻略`
- Proposed title: `ドラゴンソード:アウェイクニング 攻略ガイド - マップ・ビルド・ロードマップ`
- Proposed description: `ドラゴンソード:アウェイクニングの非公式攻略ガイド。インタラクティブマップ、ビルド、ルーン、マルチプレイ、ロードマップを出典と検証状況つきで整理します。`
- Proposed H1: `ドラゴンソード:アウェイクニング 攻略ガイド`
- Sections needing translation: hero header, guide cards, map/build/roadmap summaries, evidence/fan-site disclaimers, common CTAs.
- Facts/numbers locked: 19 heroes from official store/source pages; current map total must resolve from shared data at build/runtime; unofficial fan-made status.
- Dynamic/freshness-sensitive sections: roadmap link label, latest verified date, map marker count.
- Map/shared-data dependencies: link to `/ja/map/`; counts should be imported from the shared map manifest, not translated manually.
- Content model: shared hub component + localized string/content config.

### `/ja/roadmap/`

- Source URL: `/roadmap/`
- Localized URL: `/ja/roadmap/`
- Page type: article / update timeline
- Japanese search intent: `ドラゴンソード ロードマップ`
- Proposed title: `ドラゴンソード:アウェイクニング ロードマップ - 最新アップデートと今後の予定`
- Proposed description: `ドラゴンソード:アウェイクニングのロードマップ、リリース済みアップデート、発表済みの予定、未確定の内容を分けて確認できます。`
- Proposed H1: `ドラゴンソード:アウェイクニング ロードマップ`
- Sections needing translation: source timeline, released/planned/unknown blocks, evidence boundary, links to Rune/build pages.
- Facts/numbers locked: July 22/23 release date must keep region/timezone context; update 1.0.7 / 1.0.8 labels; four planned heroes only if source remains current.
- Dynamic/freshness-sensitive sections: latest official update, planned content, dateModified, LastVerified.
- Map/shared-data dependencies: none direct, but roadmap page links to map/runes/builds.
- Content model: separate localized content file; this page changes often and should stale independently.

### `/ja/map/`

- Source URL: `/map/`
- Localized URL: `/ja/map/`
- Page type: utility / interactive map article
- Japanese search intent: `ドラゴンソード マップ`
- Proposed title: `ドラゴンソード:アウェイクニング インタラクティブマップ - オルビスの宝箱・ウェイポイント・ダンジョン`
- Proposed description: `オルビスの宝箱、ウェイポイント、ダンジョン、フィールドボス、Eona's Legacy、Organa Statueを検索・絞り込みできる非公式インタラクティブマップです。位置はおおよその目安です。`
- Proposed H1: `ドラゴンソード:アウェイクニング インタラクティブマップ`
- Sections needing translation: quick answer, map controls, marker detail panel, category filters, "how to use", mapped coverage, verification/provenance copy, sources intro.
- Facts/numbers locked: total markers 1,555; chests 1,484; warp points 20; dungeons 26; field bosses 9; Organa 13 with 13 vs 14 conflict retained; Eona 3; 0 official/video/first-hand verified markers.
- Dynamic/freshness-sensitive sections: marker counts, category counts, chest manifest counts, Organa conflict text, source summary.
- Map/shared-data dependencies: `src/data/map-markers.json`; `public/data/map/chests/manifest.json`; `public/data/map/chests/*.json`; localized string layer only.
- Content model: shared map component + locale dictionary + localized article copy.

### `/ja/systems/runes/`

- Source URL: `/systems/runes/`
- Localized URL: `/ja/systems/runes/`
- Page type: article / system guide
- Japanese search intent: `ドラゴンソード ルーン`
- Proposed title: `ドラゴンソード:アウェイクニング ルーン - 上限・ルーン合成・ビルドでの扱い`
- Proposed description: `ドラゴンソード:アウェイクニングのルーンについて、所持上限500、4星ルーン合成から5星が出る可能性、未検証のドロップ率や最適ルートを分けて解説します。`
- Proposed H1: `ドラゴンソード:アウェイクニング ルーン`
- Sections needing translation: quick answer, 1.0.7 badge, Rune definition, inventory changes, synthesis, build relevance, unknowns, FAQ.
- Facts/numbers locked: capacity 200 -> 500; owned count display; 4-Star Rune Synthesis can yield 5-Star Runes; no guaranteed outcome; drop rates/stat ceilings/farming routes not verified.
- Dynamic/freshness-sensitive sections: patch note reference, LastVerified, source note.
- Map/shared-data dependencies: links to build/map only; no map data.
- Content model: shared article component possible, but safer as localized content file due to careful evidence language.

### `/ja/multiplayer/`

- Source URL: `/multiplayer/`
- Localized URL: `/ja/multiplayer/`
- Page type: article / FAQ
- Japanese search intent: `ドラゴンソード マルチプレイ`
- Proposed title: `ドラゴンソード:アウェイクニングはマルチプレイ対応？協力プレイの確認状況`
- Proposed description: `ドラゴンソード:アウェイクニングのオンライン協力プレイ、マッチング、Raids、ストーリー協力、オープンワールド協力、PvPの確認状況を整理します。`
- Proposed H1: `ドラゴンソード:アウェイクニングはマルチプレイ対応？`
- Sections needing translation: confirmation summary, co-op table/cards, unresolved multiplayer claims, story co-op FAQ, open-world co-op FAQ, matchmaking/PvP FAQ.
- Facts/numbers locked: official Steam feature is online co-op; selected activities only where source supports; unknown/open-world/story boundaries must remain cautious.
- Dynamic/freshness-sensitive sections: post-launch Q&A, matchmaking range, raid/story/open-world status, LastVerified.
- Map/shared-data dependencies: none.
- Content model: separate localized content file, because this page has high freshness and evidence-bound nuance.

### `/ja/builds/`

- Source URL: `/builds/`
- Localized URL: `/ja/builds/`
- Page type: article / framework
- Japanese search intent: `ドラゴンソード ビルド`
- Proposed title: `ドラゴンソード:アウェイクニング ビルド - ルーン・役割・チーム編成の考え方`
- Proposed description: `ドラゴンソード:アウェイクニングのビルドを、英雄の役割、状態異常、シグナルスキル、ルーン、Karma、チーム編成の文脈で整理します。未検証の最強ビルドは掲載しません。`
- Proposed H1: `ドラゴンソード:アウェイクニング ビルド`
- Sections needing translation: quick answer, build definition, build vs team composition, Runes/Karma context, verification queue, no-meta-list warning.
- Facts/numbers locked: 19 heroes, status ailment abilities, active/signal skills, switching, no universal build template.
- Dynamic/freshness-sensitive sections: character/build evidence source, Rune page facts, any future character data.
- Map/shared-data dependencies: no direct map data; should link to `/ja/systems/runes/` and `/ja/map/` only when routes exist.
- Content model: localized content file using shared article primitives.

## URL, Canonical, Hreflang, Sitemap

URL model: `LANGUAGE_SUBDIRECTORIES_KEEP_ENGLISH_AT_ROOT`

```text
English root: /
Japanese root: /ja/
English pages stay: /roadmap/, /map/, /systems/runes/, /multiplayer/, /builds/
Japanese pages use English slugs under /ja/: /ja/roadmap/, /ja/map/, /ja/systems/runes/, /ja/multiplayer/, /ja/builds/
Do not create /en/
Do not translate slugs
```

Canonical model:

- Every English page self-canonicalizes to its English URL.
- Every Japanese page self-canonicalizes to its Japanese URL.
- `/ja/map/` canonical must be `https://dragonswordguide.com/ja/map/`, never `/map/`.
- Incomplete Japanese pages should not exist; if a route must exist temporarily during staging, pass `noindex`.

Hreflang model:

- Emit alternates only for real published counterpart pages.
- Each implemented pilot page gets:
  - `hreflang="en"` pointing to English counterpart.
  - `hreflang="ja"` pointing to Japanese counterpart.
  - `hreflang="x-default"` pointing to the English root/counterpart by route family.
- Alternates must be self-referential and reciprocal.
- Do not emit `ko`, `zh-TW`, `zh-CN`, or any language whose page does not exist.

Sitemap model:

- Preferred pilot model: sitemap index with `sitemap-en.xml` and `sitemap-ja.xml`.
- Reason: split language coverage makes GSC validation and future per-locale stale checks easier, while preserving one canonical URL source.
- Implementation should avoid duplicate sitemap systems. Either configure Astro sitemap to generate the needed alternates safely, or replace the current default `@astrojs/sitemap` output with deterministic XML endpoints driven by a shared route registry.
- Every sitemap URL must match its self-canonical and the same reciprocal hreflang set emitted in HTML.

Language switcher model:

- Global lightweight switcher: `English` / `日本語`.
- If a counterpart exists, link to the counterpart.
- If no counterpart exists, hide the missing language option or show it disabled without linking.
- Do not guess translated URLs and do not redirect missing Japanese pages to English.

## Map i18n Architecture

Current production map state:

```text
TOTAL_MARKERS: 1555
BASE_NON_CHEST_MARKERS: 71
CHESTS: 1484
WARP_POINTS: 20
DUNGEONS: 26
FIELD_BOSSES: 9
ORGANA: 13
EONA: 3
BASE_MAP_ID: OWN_SCHEMATIC_ORBIS_BASE_MAP
COORDINATE_SYSTEM: IMAGE_RELATIVE_COORDINATES
```

Shared data model:

- Keep coordinates, marker IDs, verification status, precision, source summaries, category IDs, subtype IDs, and chunk manifests in shared data.
- Reuse:
  - `src/data/map-markers.json`
  - `public/data/map/chests/manifest.json`
  - `public/data/map/chests/*.json`
- Do not create `/data/map/ja/chests/` or duplicate 1,484 chest coordinates.

Localized data model:

- Add locale dictionaries and localized overlays only:
  - category labels
  - status labels
  - UI labels
  - region display labels where safely localized
  - marker display names/aliases only where official/community lock exists
  - localized descriptions for the small 71 base markers only where needed
- Resolve data at render time:
  - structural marker record by stable ID
  - localized name/alias layer by locale
  - fallback to English structural name if no Japanese term is locked

Chest localization model:

- Chests keep shared coordinates and IDs.
- Most chests should not get manually translated unique names.
- Generate Japanese display names from stable shared fields:

```text
宝箱 #<stable ordinal or source id suffix> - <localized region or English fallback>
```

- Chest subtype labels:
  - `NORMAL_CHEST`: `通常宝箱`
  - `SUPERIOR_CHEST`: `上級宝箱`
  - `RARE_CHEST`: `レア宝箱`
  - `EPIC_CHEST`: `エピック宝箱`
  - `LEGENDARY_CHEST`: `レジェンダリー宝箱`
- Keep English aliases searchable for all chest grades and regions.

Map UI labels to centralize:

| English | Japanese |
| --- | --- |
| Interactive Map | インタラクティブマップ |
| Search locations | 場所を検索 |
| All | すべて |
| Treasure Chests | 宝箱 |
| Warp Points | ウェイポイント |
| Dungeons | ダンジョン |
| Bosses | ボス |
| Eona's Legacy | Eona's Legacy |
| Organa Statues | Organa Statues |
| Region | 地域 |
| Approximate location | おおよその位置 |
| Source corroborated | 複数ソースで確認 |
| Reset | リセット |
| Zoom in | 拡大 |
| Zoom out | 縮小 |
| Show | 表示 |
| Hide | 非表示 |
| No matching locations | 一致する場所がありません |

Search model:

- `/ja/map/` search must check:
  - Japanese localized marker name
  - English source name
  - Japanese aliases
  - English aliases
  - localized region label
  - English region label
  - romanized/common variants when useful
- No competitor coordinate data, source code, map images, icon packs, or copied marker JSON should be imported.

## Content & Component Architecture

Current Astro observations:

- `src/layouts/BaseLayout.astro` hardcodes `<html lang="en">`, English nav, English footer, canonical, schema injection, and no alternate link support.
- Pages are mostly direct `.astro` files with localized metadata constants inside the page file.
- `src/components/InteractiveMap.astro` hardcodes English labels in both Astro and inline JavaScript.
- `src/data/navigation.ts` is English-only.
- `astro.config.mjs` currently uses `@astrojs/sitemap` with default behavior.

Minimum implementation architecture:

- Add `src/i18n/locales.ts` with locale definitions, labels, direction, base path, and fallback locale.
- Add `src/i18n/routes.ts` as the single registry for counterpart URLs and publication readiness.
- Add `src/i18n/seo.ts` helpers for canonical, alternates, breadcrumbs, `inLanguage`, and source revision metadata.
- Add `src/i18n/dictionaries/en.ts` and `src/i18n/dictionaries/ja.ts` for shared shell/nav/footer/UI labels.
- Add `src/content/ja/*.ts` or `src/content/i18n/ja/*.json` for the six page content specs.
- Modify `BaseLayout.astro` to accept `locale`, `alternates`, localized shell labels, and self-canonical values.
- Modify `MobileNav.astro`, `Breadcrumbs.astro`, and `SourceList.astro` to accept localized labels or read from locale context.
- Modify `InteractiveMap.astro` to accept `locale` and `labels`, and localize inline JS status/category/detail labels from JSON dictionaries.

Do not duplicate six full English page files long-term without shared helpers. A small route wrapper per Japanese page is acceptable if it delegates to a shared component or localized content model.

Recommended page content model:

| Page | Model |
| --- | --- |
| `/ja/` | Shared hub component + localized data |
| `/ja/roadmap/` | Separate localized content file + shared article primitives |
| `/ja/map/` | Shared map component + localized article copy + locale map dictionary |
| `/ja/systems/runes/` | Localized content file + shared article primitives |
| `/ja/multiplayer/` | Localized content file + shared article/FAQ primitives |
| `/ja/builds/` | Localized content file + shared article primitives |

## Structured Data

For Japanese pages:

- `inLanguage: "ja"`
- localized `headline`
- localized `description`
- localized Breadcrumb labels
- `mainEntityOfPage` equals the Japanese canonical URL
- `dateModified` reflects source content freshness, not translation day alone

Do not copy English schema text into Japanese pages.

## HTML Language & Navigation

- English remains `<html lang="en">`.
- Japanese pages must render `<html lang="ja">`.
- Japanese pages need Japanese navigation, footer, common CTA, source-section intro, map controls, and mobile nav.
- Proper nouns and unsupported terms may remain English when the terminology lock says `KEEP_ENGLISH` or `UNRESOLVED`.

## Translation Quality & Freshness

Per localized page metadata:

```json
{
  "locale": "ja",
  "source_locale": "en",
  "source_url": "/map/",
  "source_revision": {
    "git_commit": "1177e67ab672f77242cf08d08ae316683767f35d",
    "content_hash": "<sha256-of-source-content>",
    "source_updated_at": "2026-08-23"
  },
  "translation_status": "AI_TRANSLATED",
  "last_translated_at": "2026-08-23"
}
```

Allowed statuses:

- `AI_TRANSLATED`
- `HUMAN_REVIEWED`
- `SOURCE_STALE`
- `NEEDS_REFRESH`

Publication rule:

- Raw one-shot AI translation is not `HUMAN_REVIEWED`.
- Indexable pages must pass the publication quality gate.
- Material English changes mark Japanese as `SOURCE_STALE`; do not immediately unpublish unless the stale claim creates user harm or contradicts evidence.
- Stale Japanese pages enter a refresh queue with source diff, priority, and required reviewer action.

Source revision strategy:

- Store `source_revision.git_commit`.
- Store `source_revision.content_hash` from normalized main content, title, description, schema-relevant fields, and key source facts.
- Store `source_revision.source_updated_at`.
- Add a script to compare current English page hashes against localized metadata and emit stale pages.

## Indexing Gate

A Japanese URL may be indexable only when all are true:

```text
localized title
localized description
localized H1
localized main content
localized navigation/footer/common UI
correct html lang="ja"
self canonical
reciprocal hreflang
valid localized schema
no untranslated placeholder blocks
source revision recorded
translation_status at least AI_TRANSLATED_AND_REVIEWED_FOR_PUBLICATION or HUMAN_REVIEWED
```

If not ready:

```text
NOINDEX_UNTIL_READY
```

Preferred approach: do not create incomplete routes at all.

## Pilot Validation Plan

Next implementation phase must run:

```text
npm run build
npm test
git diff --check
```

Additional implementation checks:

- route existence: all six Japanese URLs return 200 locally
- no extra `/ja/` placeholders
- `html lang="ja"` on Japanese pages
- self-canonical consistency
- reciprocal hreflang in HTML
- sitemap URL/canonical/hreflang consistency
- localized structured data with `inLanguage: ja`
- no untranslated shell/nav/footer blocks
- map filter labels localized
- map search finds Japanese and English aliases
- mobile language switcher and mobile nav usable
- no horizontal overflow
- no duplicate canonical
- no English/Japanese URL collision

## Observation Baseline

Current research baseline from prior multilingual research:

```text
Japanese query-language:
3 queries
1 click
13 impressions

Japan:
7 clicks
75 impressions
```

Implementation launch must fetch the latest complete GSC data again and record:

- deployment date
- latest complete GSC date
- Japanese query-language baseline
- Japan country baseline
- indexed Japanese URL count after sitemap discovery

## Phase 0 Decision

`MULTILINGUAL_LANGUAGE_1_JAPANESE_PILOT` is ready for user approval as the next phase, but implementation is not authorized in this turn.
