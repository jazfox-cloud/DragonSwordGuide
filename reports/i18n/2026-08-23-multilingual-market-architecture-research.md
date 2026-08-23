# DragonSwordGuide Whole-Site Multilingual Market & Architecture Research

Date: 2026-08-23
Site: `dragonswordguide.com`
Status: `MARKET_RESEARCH + SEO_ARCHITECTURE_RESEARCH + PILOT_RECOMMENDATION`

No production page, route, hreflang, translation, sitemap, commit, push, indexing request, or deployment action was performed.

## Executive Decision

```text
PRIMARY_LANGUAGE: English
PILOT_LANGUAGE: Japanese
SECOND_LANGUAGE: Traditional Chinese
THIRD_LANGUAGE: Korean
SIMPLIFIED_CHINESE: HOLD_FOR_SEPARATE_MAINLAND_DISTRIBUTION_PLAN
URL_MODEL: LANGUAGE_SUBDIRECTORIES_KEEP_ENGLISH_AT_ROOT
```

Japanese is the recommended first pilot because it is the only non-English query language already visible in DragonSwordGuide GSC, Japan is the strongest candidate-language country signal, Steam confirms official Japanese UI/subtitle support, and Japanese SERPs show content supply but not a clear dedicated high-quality interactive map page matching DragonSwordGuide's current `/map/` capability.

Do not launch all Asian languages at once. Korean has strong official support and Korean full audio, but current DragonSwordGuide GSC has no Korean-language queries and Korean SERP already exposes a dedicated Korean interactive map competitor. Simplified Chinese has strong community/video demand, but Google SEO is only a partial route for mainland demand; it needs a separate Baidu/Bilibili/TapTap distribution plan before site implementation.

## Source Boundaries

- GSC data source: authorized Google Search Console API, `sc-domain:dragonswordguide.com`, final data only.
- GSC window: `2026-08-01..2026-08-20`.
- Latest complete GSC date used: `2026-08-20`.
- Incomplete days starting `2026-08-21` were not used.
- SERP and community evidence is treated as `SERP_SIGNAL` / `COMMUNITY_SIGNAL`, not verified volume.
- Keyword volume is `UNKNOWN` unless GSC provides visible impressions for this site.

## Official Language Support

Steam's official store language table and SteamDB both show 11 supported text languages. Korean is the only full-audio language. Steam community announcements also show official community communication in Korean/English and note that English/Japanese subtitles were planned for a Korean developer livestream archive.

| Language | Official UI | Subtitles | Full Audio | Official support confidence |
| --- | --- | --- | --- | --- |
| English | Yes | Yes | No | HIGH |
| Korean | Yes | Yes | Yes | HIGH |
| Japanese | Yes | Yes | No | HIGH |
| Simplified Chinese | Yes | Yes | No | HIGH |
| Traditional Chinese | Yes | Yes | No | HIGH |
| French | Yes | Yes | No | HIGH |
| German | Yes | Yes | No | HIGH |
| Spanish - Spain | Yes | Yes | No | HIGH |
| Russian | Yes | Yes | No | HIGH |
| Thai | Yes | Yes | No | HIGH |
| Portuguese - Brazil | Yes | Yes | No | HIGH |

Important interpretation: Hound13 being Korean does not by itself make Korean the best international SEO pilot. Korean is official and voiced, but market entry must account for observed site demand and local SERP competition.

## GSC Geography

Top country signals and candidate-language countries:

| Country | Clicks | Impressions | CTR | Avg position | Interpretation |
| --- | ---: | ---: | ---: | ---: | --- |
| United States | 31 | 1,070 | 2.90% | 7.77 | English primary demand |
| Canada | 8 | 186 | 4.30% | 7.04 | Mostly English/French ambiguity |
| Brazil | 11 | 175 | 6.29% | 8.24 | Portuguese possible later; not in shortlist |
| United Kingdom | 6 | 173 | 3.47% | 7.54 | English primary demand |
| Australia | 7 | 117 | 5.98% | 7.52 | English primary demand |
| Thailand | 8 | 112 | 7.14% | 9.20 | Thai observable, but no current query-language signal |
| Japan | 7 | 75 | 9.33% | 9.15 | Strongest candidate-language country signal |
| Singapore | 0 | 66 | 0% | 6.58 | English/Chinese ambiguity |
| Vietnam | 4 | 47 | 8.51% | 9.38 | Watchlist only |
| South Korea | 0 | 27 | 0% | 8.59 | Country signal exists, no Korean query signal |
| Taiwan | 2 | 22 | 9.09% | 8.91 | Traditional Chinese candidate signal, low sample |
| Hong Kong | 1 | 20 | 5.00% | 10.60 | English/Traditional Chinese ambiguity |
| China | 0 | 3 | 0% | 7.00 | Google-visible sample too small |

## GSC Query-Language Analysis

| Language | Queries | Clicks | Impressions | Representative queries |
| --- | ---: | ---: | ---: | --- |
| English | 149 | 109 | 1,983 | `dragonsword awakening roadmap`, `dragonsword interactive map`, `dragonsword awakening runes`, `dragon sword awakening coop` |
| Japanese | 3 | 1 | 13 | `ドラゴンソード アウェイクニング ロードマップ`, `ドラゴンソード ロードマップ`, `ドラゴンソード アウェイクニング マルチプレイ` |
| Korean | 0 | 0 | 0 | None visible |
| Traditional Chinese | 0 | 0 | 0 | None visible |
| Simplified Chinese | 0 | 0 | 0 | None visible |
| Other / Unknown | 0 | 0 | 0 | None visible |

The Japanese signal is small, but it is the only non-English query-language evidence currently present. It should justify a controlled pilot, not a full multilingual rollout.

## Language-Specific Search Intent

### Japanese

Natural query clusters:

- `ドラゴンソード アウェイクニング`
- `ドラゴンソード 攻略`
- `ドラゴンソード アウェイクニング ロードマップ`
- `ドラゴンソード アウェイクニング マップ`
- `ドラゴンソード 宝箱`
- `ドラゴンソード ルーン`
- `ドラゴンソード ビルド`
- `ドラゴンソード 編成`
- `ドラゴンソード マルチプレイ`

Signals:

- `GSC_SIGNAL`: present but small, 13 impressions / 1 click.
- `SERP_SIGNAL`: AppMedia has a Japanese guide hub and gameplay pages, but its visible update date is June 25, 2026 and its focus appears more guide/wiki than full interactive map.
- `MAP_SIGNAL`: GrandWiki exposes localized Japanese guide/database pages and the global Orbis map, but there is still room for a focused Japanese `/ja/map/` page if DragonSwordGuide localizes map UI/search carefully.
- `VERIFIED_VOLUME`: UNKNOWN.

Decision: `NOW` as one-language pilot.

### Korean

Natural query clusters:

- `드래곤소드 어웨이크닝`
- `드래곤소드 공략`
- `드래곤소드 지도`
- `드래곤소드 보물상자`
- `드래곤소드 룬`
- `드래곤소드 빌드`
- `드래곤소드 파티`
- `드래곤소드 멀티플레이`
- `드래곤소드 협동`

Signals:

- `GSC_SIGNAL`: none in query language; South Korea country has 27 impressions / 0 clicks.
- `OFFICIAL_SIGNAL`: strongest official localization profile because Korean has UI, subtitles, and full audio.
- `SERP_SIGNAL`: `dsmaps.com` exposes a Korean interactive map with KO/EN/JA/RU toggles, search, map markers, and Korean location labels. DCInside has an active minor gallery.
- `MAP_SIGNAL`: strong competition; not an empty market.
- `VERIFIED_VOLUME`: UNKNOWN.

Decision: `LATER`, not first pilot.

### Traditional Chinese

Natural query clusters:

- `龍之劍 覺醒`
- `龍之劍 覺醒 攻略`
- `龍之劍 覺醒 地圖`
- `龍之劍 覺醒 寶箱`
- `龍之劍 覺醒 符文`
- `龍之劍 覺醒 隊伍`
- `龍之劍 覺醒 多人`
- `龍之劍 覺醒 配置`

Signals:

- `GSC_SIGNAL`: no Traditional Chinese queries; Taiwan + Hong Kong together have 42 impressions / 3 clicks.
- `SERP_SIGNAL`: GrandWiki has Traditional Chinese guide/database pages. Bahamut has community discussion around team/build play.
- `MAP_SIGNAL`: localized supply exists but appears less dominated by one native dedicated site than Korean.
- `VERIFIED_VOLUME`: UNKNOWN.

Decision: `NEXT` after Japanese pilot proves process and maintenance model.

### Simplified Chinese

Natural query clusters:

- `龙之剑 觉醒`
- `龙之剑觉醒 攻略`
- `龙之剑觉醒 地图`
- `龙之剑觉醒 宝箱`
- `龙之剑觉醒 符文`
- `龙之剑觉醒 配队`
- `龙之剑觉醒 多人`
- `龙之剑觉醒 配置要求`

Signals:

- `GSC_SIGNAL`: no Simplified Chinese query language; China Google-visible sample only 3 impressions.
- `COMMUNITY_SIGNAL`: Bilibili has high-engagement collection videos, including a 1.0 map/chest route video with 40k plays in the observed snippet. GamerSky and other Chinese media mirror or summarize Bilibili routes.
- `SERP_SIGNAL`: Mainland-visible demand likely exists, but Google SEO is not the whole acquisition channel.
- `MAP_SIGNAL`: strong content supply around chest collection; likely needs off-site distribution and community trust, not just `/zh-cn/` pages.
- `VERIFIED_VOLUME`: UNKNOWN.

Decision: `HOLD` for Google-first site build; create a separate mainland distribution plan before implementation.

## Competitor Inventory

| Domain | Language | Site type | Map | Roadmap | Builds | Runes | Wiki/database | Freshness | Classification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `dsawakening.grandwiki.com` | EN/JA/KO/TW/CN | Dedicated wiki/database/tools | Yes, broad | Some update coverage | Yes/tooling | Yes/database | Strong | Crawled today/yesterday | STRONG_COMPETITION |
| `dsmaps.com` | KO/EN/JA/RU visible | Dedicated interactive map/tool | Yes | Unknown | Visible nav | Unknown | Tool-like | Crawled 2 weeks ago | STRONG_COMPETITION for Korean map |
| `appmedia.jp/dragonsword_awakening` | Japanese | General game media/wiki | No full map observed | Limited | Characters/build-like | System guides | Medium | Last updated 2026-06-25 in snippet | MEDIA_DOMINATED, MAP_GAP |
| `dragonswordawakening.net/zh` | Simplified Chinese | Dedicated guide/map ecosystem | Yes | Unknown | Guide content | Guide content | Strong | Crawled last week | STRONG_COMPETITION |
| `dragonsword-awakening.org` | EN/ZH visible | Dedicated database/map | Yes | Unknown | Some guide/database | Some guide/database | Strong | Crawled 2 weeks ago | STRONG_COMPETITION |
| `dragonswordawakening.wiki` | EN/JA/KO/ZH summary | Community wiki/guides | Links/tool context | Guide hub | Guides | Guides | Medium | July 2026 | LOW_TO_MEDIUM_CONTENT_SUPPLY |
| `gamersky.com` | Simplified Chinese | General gaming media | Screenshot/video route article | No | Some articles | No | No | August 2026 | MEDIA_DOMINATED |
| `bilibili.com` | Simplified Chinese | Video/community | Route videos | No | Creator-specific | Creator-specific | No | July/August 2026 | COMMUNITY_DOMINATED |
| `forum.gamer.com.tw` | Traditional Chinese | Community forum | No | No | Discussion | No | No | July 2026 | COMMUNITY_DOMINATED |
| `gall.dcinside.com` | Korean | Community forum | No | No | Discussion | Discussion | No | Active around release | COMMUNITY_DOMINATED |

Main competitor gaps for DragonSwordGuide:

- Japanese: no clear SERP-dominant dedicated Japanese interactive map matching the current 1,555-marker DSG map.
- Traditional Chinese: community exists, but a clean guide + map architecture may still have room after one pilot validates terminology and freshness workflows.
- Korean: map opportunity exists but not a gap-first opportunity because `dsmaps.com` is already strong.
- Simplified Chinese: demand likely exists, but competition and distribution are community/video/media dominated rather than simple Google-page supply.

## Interactive Map Multilingual Opportunity

Current DragonSwordGuide `/map/` production state:

```text
TOTAL_MARKERS: 1555
CHESTS: 1484
WARP_POINTS: 20
DUNGEONS: 26
FIELD_BOSSES: 9
ORGANA: 13
EONA: 3
```

Map is still the strongest multilingual product candidate, but not by copying marker data per language. The key opportunity is localized discovery:

- localized category labels;
- localized marker names where official terms exist;
- English aliases retained for players who search mixed-language terms;
- local-language page copy explaining precision/provenance;
- localized search aliases and romanization where useful;
- no duplication of coordinate data.

## URL Architecture Options

### Option A: Language subdirectories

```text
/
/ja/
/ko/
/zh-tw/
/zh-cn/
```

Pros:

- keeps current English authority at root;
- easiest canonical and sitemap model;
- avoids risky `/en/` migration;
- works with static Astro routing;
- simplest analytics segmentation by path prefix.

Cons:

- localized slugs are less native;
- all language authority stays under one domain, so mistakes affect the main site.

Verdict: `RECOMMENDED`.

### Option B: Localized slugs

Examples:

```text
/ja/map/
/ja/マップ/
```

Pros:

- may feel more native to local users;
- can match query terms like `マップ`.

Cons:

- more routing complexity;
- harder internal linking and future tooling;
- mixed ASCII/non-ASCII URL maintenance cost;
- no clear evidence that slug localization is required before content usefulness.

Verdict: `NOT_FOR_PILOT`. Reconsider only after `/ja/map/` gets impressions and query data.

### Option C: Separate domains/subdomains

Examples:

```text
ja.dragonswordguide.com
```

Pros:

- operational isolation;
- local brand specialization possible.

Cons:

- splits authority;
- multiplies Search Console, sitemap, analytics, and deployment work;
- too heavy for current non-English demand.

Verdict: `HOLD`.

## Default English URL

Keep English at root:

```text
/roadmap/
/map/
/systems/runes/
```

Do not migrate to:

```text
/en/roadmap/
```

Reason: current English URLs already hold GSC winners and emerging winners. An `/en/` migration would create redirect/canonical risk without a demonstrated multilingual benefit. Use `x-default` at root/home and self-canonical English pages.

## hreflang Architecture

Recommended future model:

```text
en: https://dragonswordguide.com/map/
ja: https://dragonswordguide.com/ja/map/
ko: https://dragonswordguide.com/ko/map/
zh-Hant: https://dragonswordguide.com/zh-tw/map/
zh-Hans: https://dragonswordguide.com/zh-cn/map/
x-default: https://dragonswordguide.com/map/ or https://dragonswordguide.com/
```

Rules:

- each localized URL self-canonicalizes;
- English root remains self-canonical;
- only publish reciprocal hreflang among pages that actually exist;
- do not point hreflang to missing translations;
- if a page is untranslated, omit that language for that page instead of pointing to English as a fake alternate;
- use `zh-Hant` for Traditional Chinese language tagging and region-specific `zh-TW` only if the page is truly Taiwan-focused;
- use `zh-Hans` for Simplified Chinese language tagging and `zh-CN` only if mainland distribution/policy is explicitly targeted.

## Sitemap Architecture

Current scale is small enough for one sitemap, but multilingual growth should move to:

```text
sitemap-index.xml
  sitemap-en.xml
  sitemap-ja.xml
  sitemap-zh-tw.xml
  sitemap-ko.xml
```

Pilot phase can keep a sitemap index with English + Japanese. Add languages only when URLs exist. Include `lastmod` by page language update state, not by English source date if the translation is stale.

## Map I18n Architecture

Do not copy 1,555 coordinates per language.

Recommended model:

```json
{
  "markers": [
    {
      "id": "marker:chest:central-orbis:001",
      "x": 0.57012,
      "y": 0.488996,
      "category": "CHEST",
      "region_key": "central-orbis",
      "verification_status": "SECONDARY_CORROBORATED",
      "precision": "LANDMARK_APPROXIMATE"
    }
  ],
  "localized": {
    "ja": {
      "marker:chest:central-orbis:001": {
        "name": "宝箱 - Central Orbis #001",
        "aliases": ["宝箱", "Treasure Chest", "Central Orbis"]
      }
    }
  }
}
```

Localize:

- category labels;
- status labels;
- precision labels;
- page copy;
- search aliases;
- region names only when official/localized terms are locked;
- marker names only when official/localized terms are locked or generic label is safe.

Keep shared:

- marker IDs;
- x/y coordinates;
- category keys;
- coordinate provenance;
- source metadata;
- verification status;
- conflict/rejection states.

Search must match:

- localized marker names;
- English marker names;
- category labels;
- aliases;
- romanization where useful;
- stable local IDs such as `Chest local 001`.

## Dynamic Content Synchronization

Pages with high freshness risk:

- Roadmap;
- patch/update coverage;
- Runes;
- Multiplayer;
- Map data;
- Builds and Teams.

Recommended freshness model:

```text
English source updated
→ affected localized page status becomes SOURCE_STALE
→ refresh queue item is created
→ official terms and numeric facts are rechecked
→ translation becomes HUMAN_REVIEWED or NEEDS_REFRESH
```

Each localized page should store:

- source English URL and source content version;
- `last_translated_at`;
- `last_source_checked_at`;
- `translation_status`;
- locked official term set version;
- reviewer notes for facts that cannot be machine translated safely.

## Translation Quality Model

Use these states:

```text
OFFICIAL_TERM_LOCKED
AI_TRANSLATED
HUMAN_REVIEWED
SOURCE_STALE
NEEDS_REFRESH
```

Rules:

- game titles, proper nouns, official category names, prices, dates, version numbers, map counts, coordinates, and mechanics are protected fields;
- protected fields require exact source carryover or official localized terminology;
- machine translation is allowed only as a draft state;
- pages with `AI_TRANSLATED` can be preview/review artifacts but should not be production indexable until reviewed;
- route-sensitive pages such as Map and Roadmap need human review before publication.

## Content Parity Tiers

### Tier 1 for Japanese pilot

- `/ja/`
- `/ja/roadmap/`
- `/ja/map/`
- `/ja/systems/runes/`
- `/ja/multiplayer/`
- `/ja/builds/`

Rationale: these correspond to current English winners/emerging winners and Japanese GSC query examples. Map is included because product depth is the differentiator.

### Tier 2

- `/ja/teams/`
- `/ja/guides/beginner/`
- `/ja/system-requirements/`
- `/ja/gameplay/`

Rationale: useful, but current signals are weaker or content needs more maintenance.

### Tier 3 / Hold

- `/ja/price/`
- `/ja/is-it-gacha/`
- `/ja/characters/`

Rationale: current GSC/competition evidence does not justify these as first pilot URLs unless they become needed for internal links or Search Console shows query movement.

## Pilot Recommendation

```text
PILOT_LANGUAGE: Japanese
WHY:
- only visible non-English GSC query language;
- Japan has 75 impressions / 7 clicks, ahead of Korea/Taiwan/Hong Kong in candidate-language countries;
- official UI and subtitle support is confirmed;
- Japanese SERP has media/wiki supply but a clearer map-product gap than Korean;
- first pilot can reuse English root authority without changing English URLs.
```

Pilot pages:

```text
/ja/
/ja/roadmap/
/ja/map/
/ja/systems/runes/
/ja/multiplayer/
/ja/builds/
```

Do not include every page on day one.

## Success Criteria For Future Pilot

- localized URLs are indexable and self-canonical;
- reciprocal hreflang validates only among existing alternates;
- English root pages are unchanged and do not redirect to `/en/`;
- `/ja/map/` can load the same shared marker data with Japanese UI labels;
- English names and Japanese aliases both work in map search;
- GSC starts showing localized Japanese impressions without English-page cannibalization;
- translation status and stale-source flags are visible in the content workflow;
- sitemap includes only published localized URLs;
- no unreviewed machine translation is indexed.

## Language Priority Score

Scale: 1 low, 5 high. Scores are directional, not keyword-volume estimates.

| Language | Demand | Competition gap | Map opportunity | Maintenance | Overall | Decision |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Japanese | 4 | 3 | 4 | 3 | 4 | NOW / Pilot |
| Traditional Chinese | 2 | 3 | 3 | 3 | 3 | NEXT |
| Korean | 1 | 2 | 2 | 3 | 3 | LATER |
| Simplified Chinese | 2 | 2 | 2 | 2 | 2 | HOLD |

## Do-Not-Build Decisions

- Do not create `/ko/`, `/zh-tw/`, or `/zh-cn/` now.
- Do not migrate English URLs into `/en/`.
- Do not publish machine-translated full-site pages.
- Do not duplicate map coordinates per language.
- Do not implement hreflang until at least one real localized URL set exists.
- Do not use result counts as volume.
- Do not treat Chinese mainland demand as solved by Google-indexed `/zh-cn/` pages.

## Required Opportunity Contract

```yaml
opportunity_type: multilingual_seo_pilot
user_task: select one first multilingual pilot language and architecture for DragonSwordGuide
primary_route: ENTITY_CLUSTER
current_decision: RESEARCH_REQUIRED
required_entities:
  - localized_page
  - localized_term
  - shared_map_marker
  - hreflang_alternate
required_fields:
  - source_url
  - canonical_url
  - language_code
  - translation_status
  - official_term_status
  - source_content_version
  - localized_title
  - localized_meta_description
  - localized_map_labels
optional_fields:
  - localized_slugs
  - romanized_aliases
  - region-specific community examples
source_requirements:
  - official Steam language support
  - GSC country/query data
  - SERP competitor review
  - official/localized terminology where available
evidence_requirements:
  - GSC_SIGNAL for pilot justification
  - SERP_SIGNAL for competition gap
  - OFFICIAL_TERM_LOCKED for protected terms before publication
game_version: steam-24375914 source-context-only
last_verified: 2026-08-23
correction_task: N/A
acquisition_task:
  task_id: multilingual-ja-pilot-term-lock
  goal: lock Japanese official/community terminology before any production localized page
  invalid_or_missing_field: official localized terminology for map categories and protected game terms
  current_problem: Steam confirms Japanese support but not every DragonSwordGuide map label has an official Japanese term in the current dataset
  required_correction: collect official in-game or official-store Japanese terms for title, map categories, status labels, systems, and protected mechanics
  source_candidates:
    - Steam Japanese store/app language material
    - official announcements with Japanese subtitles
    - in-game Japanese UI screenshots if acquired later
    - high-confidence Japanese community pages for common search terms
  required_evidence_level: OFFICIAL_TERM_LOCKED preferred; COMMUNITY_COMMON allowed only for generic search aliases
  collection_method: screenshot/source capture plus term table
  validation_method: reviewer checks protected terms against source and marks AI draft text as HUMAN_REVIEWED only after validation
  completion_criteria: all Tier 1 protected terms have a source, status, and Japanese label or an explicit keep-English decision
  unblock_condition: terminology table passes protected-field review for Tier 1 pages
  publication_state: APPROVAL_REQUIRED
collection_tasks:
  - task_id: multilingual-ja-pilot-architecture-brief
    goal: prepare implementation brief for Japanese pilot without publishing
    data_needed: route list, hreflang matrix, sitemap plan, translation status schema, shared map localization keys
    fields_needed:
      - route
      - source_url
      - language_code
      - canonical_url
      - hreflang_targets
      - translation_status
      - term_status
      - map_label_keys
    source_candidates:
      - this research report
      - current Astro route inventory
      - current map manifest and marker JSON
    required_evidence_level: INTERNAL_ARCHITECTURE_REVIEW
    collection_method: design brief and file-level change plan
    validation_method: no production route created until user approval; check no English URL migration
    completion_criteria: pilot plan can be reviewed with exact files and no unresolved protected fields
    completion_artifact: reports/i18n/ja-pilot-implementation-brief.md
    unblock_condition: user approves MULTILINGUAL_LANGUAGE_1_PILOT
    stop_condition: stop before implementation
    publication_state: APPROVAL_REQUIRED
data_completeness: market and architecture research complete; implementation data incomplete until Japanese protected terminology is locked
handoff: PRODUCT_ARCHITECTURE_HANDOFF_REQUIRED
canonical_ids:
  - localized-page:ja-home
  - localized-page:ja-roadmap
  - localized-page:ja-map
  - localized-page:ja-runes
  - localized-page:ja-multiplayer
  - localized-page:ja-builds
  - source:steam-store
  - source:gsc-dragon-2026-08-20
consumer_reference_rules:
  - localized pages reference shared map marker IDs, not copied coordinates
  - presentation text is language-specific; game facts remain canonical
  - stale source pages mark translations SOURCE_STALE
integrity_checks:
  - reciprocal hreflang only for existing pages
  - self-canonical on every localized URL
  - no /en/ migration
  - no duplicated map coordinate database
  - protected terms locked before indexable publication
publication_gate: APPROVAL_REQUIRED
publication_authorized: false
update_trigger: new non-English GSC query growth, official localization update, or user approval for MULTILINGUAL_LANGUAGE_1_PILOT
next_action: user approval required before Japanese pilot implementation
```

## Sources Used

- Steam store official language table: https://store.steampowered.com/app/4570720/DragonSword__Awakening/
- SteamDB app language/localized-name corroboration: https://steamdb.info/app/4570720/info/
- Steam community official localization Q&A context: https://steamcommunity.com/app/4570720
- Official livestream/community language context: https://store.steampowered.com/news/posts/?enddate=1779342590&feed=steam_community_announcements
- Korean interactive map competitor: https://dsmaps.com/
- Japanese media/wiki competitor: https://appmedia.jp/dragonsword_awakening
- GrandWiki map/tool competitor: https://dsawakening.grandwiki.com/map
- GrandWiki Japanese guide example: https://dsawakening.grandwiki.com/ja/guides/beginner-progression-route
- GrandWiki Traditional Chinese guide example: https://dsawakening.grandwiki.com/tw/guides
- Simplified Chinese guide/media example: https://www.gamersky.com/handbook/202608/2184445.shtml
- Bilibili collection-route community signal: https://www.bilibili.com/video/BV1Gcg469EsP/
- Traditional Chinese community example: https://forum.gamer.com.tw/C.php?bsn=76636&snA=47
