# DragonSwordGuide Chest Data Pipeline Design

Date: 2026-08-23
Target URL: `https://dragonswordguide.com/map/`
Status: `CHEST_PIPELINE_DESIGN_READY`
Production impact: no `/map/` marker data changed, no chest markers imported, no deploy.

## Scope

This sprint designs the governed pipeline for an eventual Treasure Chest layer of roughly 1,500 markers. It does not publish chest locations.

The design goal is a pipeline that is deduped, provenance-aware, versioned, batch-released, and safe for the existing map frontend. It intentionally keeps the high-volume candidate dataset separate from the production client marker dataset.

## Current Map Baseline

| Category | Current production marker count |
| --- | ---: |
| Eona's Legacy | 3 |
| Organa Statues | 13 |
| Warp Points | 20 |
| Dungeons | 26 |
| Field Bosses | 9 |
| Total | 71 |

The current production page continues to say that it does not publish a chest database, exact route, copied community pin set, or official map asset.

## Source Inventory Audit

| Source | Reported chest count | Data transport | Coordinate model | IDs | Region fields | Category / subtype | Version / build metadata | Provenance | Reuse status |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| `dragonsword-awakening.org/maps?type=TOWN` | 1,500 page-level claim | Public SSR page plus client world-map explorer behavior; visible SSR only exposes a clustered subset | Normalized `data-map-x/y` in visible DOM; full layer not saved | `placementId`, `collectionId`, and localization-style clues observed in prior audit | Visible map labels and point types; full per-chest region fields not verified | `TREASURE_CHEST`; visible grade attributes such as rare | No public build metadata found on page | `COMMON_GAME_DATA_FAMILY` likely; license unverified | `COUNT_AND_SCHEMA_REFERENCE_ONLY`; do not copy marker payload or coordinates |
| `dragonswordawakening.net/map` and exploration guide | 1,500 in map icon guide and local technical audit | Runtime static map point model; local prior audit sampled only outside repo | Normalized 0-1 coordinates with percentage CSS | `treasure-chest-*` style IDs observed in local temp sample | Broad `Orbis` in sampled data; fine region not verified for all chests | Observed sample titles: Regular, Premium, Hero, Rare, Legendary | No public game build on map page | `COMMON_GAME_DATA_FAMILY` likely; license unverified | `COUNT_AND_TAXONOMY_REFERENCE_ONLY`; no bulk copy |
| GrandWiki map and public manifest | 1,500 in public manifest and launch post | Public manifest and layer files | 4096/tiled map model; chest layer not imported | Chest-level ID fields not audited in this sprint | World/layer model visible in manifest | Guide UI names normal, superior, rare, epic, legendary chest filters | `gameBuild: steam-24375914`, `sourceFingerprint`, `publicDataRevision: 4` | Strong technical corroboration, legal reuse unverified | `VERSION_SCHEMA_REFERENCE_ONLY`; do not copy treasures layer |
| DragonSword Companion, `dragonswordc.com` | No isolated 1,500 chest count confirmed; page claims 11,417 marked locations and 11,185 markers from level files | Public web app and downloadable overlay claims | Game-rendered terrain/overlay coordinate model not verified | Not audited | Claims 90 named regions | Public behavior exposes treasure boxes and grade colors | No public dataset version found | Claimed level-data extraction; not independently verified | `PRODUCT_BEHAVIOR_REFERENCE_ONLY` |
| DragonSword-Awakening Wiki collectible guide | No complete chest count | Public guide and achievement/context page | No coordinate dataset | None | Textual gameplay contexts only | Confirms treasure/chest collection concepts; no full subtype table | Mentions current game context, not a marker build | `INDEPENDENT_GUIDE` / context | `VERIFICATION_CONTEXT_ONLY` |
| Official Steam store and announcements | No complete chest count | Public official pages | No coordinates | None | World context only | Confirms open-world exploration contexts such as caves, dungeons, cellars, and treasure-related gameplay | Official release/update pages | `OFFICIAL` | `OFFICIAL_CONTEXT_ONLY` |
| Steam Community discussion | Single-point clue only | Public discussion thread | No reusable coordinate dataset | Single community comment mentions puzzle/chest IDs | Local puzzle context only | Puzzle/chest relationship clue | No build metadata | `COMMUNITY` | `SINGLE_POINT_CANDIDATE_ONLY` |

Public links used:

- https://dragonsword-awakening.org/maps?type=TOWN
- https://dragonswordawakening.net/map
- https://dragonswordawakening.net/guides/exploration-and-map-icons
- https://dsawakening.grandwiki.com/map
- https://grandwiki.com/blogs/dragonsword-awakening-wiki-launch
- https://www.dragonswordc.com/
- https://www.dragonsword-awakening.wiki/guides/guide/map-collectibles-treasure
- https://store.steampowered.com/app/4570720/DragonSword__Awakening/
- https://steamcommunity.com/app/4570720/discussions/0/581678051258071124/

## Chest Estimated Total

`CHEST_ESTIMATED_TOTAL: 1500`

Confidence: `HIGH` for the count as a public ecosystem count, because several independent public surfaces converge on 1,500. Confidence is `LOW` for legal reuse and exact coordinate publication because none of those public sources grants DragonSwordGuide the right to republish full coordinate databases.

## Source Strategy

Use public sources only for:

- count corroboration;
- subtype vocabulary discovery;
- candidate discovery;
- source-family grouping;
- schema and versioning patterns;
- product behavior reference.

Do not use public sources for:

- direct production coordinate truth;
- full marker JSON import;
- third-party map image or tile reuse;
- icons, source code, copied detail text, or complete database mirroring.

Recommended source-family model:

| Family | Meaning |
| --- | --- |
| `COMMON_GAME_DATA_FAMILY` | Third-party public maps that likely share an upstream extracted game-data model. Multiple members of this family do not count as independent sources by themselves. |
| `INDEPENDENT_GUIDE` | Human-authored guide/video/page that confirms a fact without exposing the same map dataset. |
| `OFFICIAL` | Steam, Hound13/Webzen, official patch notes, official media. |
| `COMMUNITY` | Forum, Reddit, Discord-public, Steam discussion. Candidate discovery only unless supported by stronger evidence. |
| `FIRST_HAND` | DragonSwordGuide-owned screenshots/video/session notes. |

## Candidate Schema

Saved at `reports/map-data/chest-candidate-schema.json`.

Required candidate fields:

- `candidate_id`
- `source_ids`
- `name`
- `category: CHEST`
- `subtype`
- `region`
- `source_positions`
- `normalized_position`
- `verification_status`
- `confidence`
- `source_families`
- `game_build`
- `dataset_version`
- `source_snapshot_date`
- `last_checked`
- `dedupe`
- `conflicts`
- `publication`
- `notes`

Candidate records remain research-only unless `publication.status` is upgraded by the legal, dedupe, coordinate, and evidence gates.

## Production Schema

Saved at `reports/map-data/chest-production-schema.json`.

The production schema is intentionally slim:

- client marker ID;
- name, aliases, subtype, region, and landmark hint;
- normalized `x/y`;
- status and precision labels;
- coordinate confidence;
- `dataset_version`;
- opaque `source_ref`;
- `chunk_key`.

Full source notes, raw source positions, and conflict records stay in research/build artifacts, not in the shipped client chunk.

## Dedupe Strategy

Use three tiers:

| Tier | Rule | Action |
| --- | --- | --- |
| `SAME_ENTITY` | Same stable internal/game ID from an approved/licensed/owned source | Auto-collapse under one canonical candidate after provenance review |
| `PROBABLE_SAME_ENTITY` | Same region and normalized coordinates within tolerance | Queue for review; merge only if subtype and surrounding context agree |
| `POSSIBLE_DUPLICATE` | Fuzzy name, subtype, landmark, or nearby location similarity | Do not auto-merge |

Recommended tolerances:

- exact normalized key: round to 6 decimals for same-frame comparison;
- same-source-family coordinate duplicate: distance <= `0.0015` in normalized units, roughly 6 px on a 4096 base;
- cross-frame or first-hand schematic comparison: distance <= `0.003`, flag only;
- same coordinate with different entity: `CONFLICTING_IDENTITY`, not merge.

Conflict statuses:

- `CONFLICTING_COORDINATE`
- `CONFLICTING_REGION`
- `CONFLICTING_IDENTITY`
- `SOURCE_ONLY`

Published output must have `unresolved_conflicts = 0`.

## Coordinate Strategy

Target coordinate system:

```text
OWN_SCHEMATIC_ORBIS_BASE_MAP
IMAGE_RELATIVE_COORDINATES
0 <= x <= 1
0 <= y <= 1
```

Accepted normalization inputs for research:

| Input model | Normalization |
| --- | --- |
| 0-1 normalized | Keep as source position only; do not publish unless legally owned/licensed/first-hand |
| pixel 4096 | `x / 4096`, `y / 4096` |
| pixel 1024 | `x / 1024`, `y / 1024` |
| percent | `value / 100` |
| tile local | `(tile_col * tile_size + local_x) / world_width`, same for y |
| schematic placement | DragonSwordGuide-owned placement on its own map base |

Validation gates:

- bounds check;
- finite numeric values;
- region consistency check against the chosen schematic region;
- duplicate/overlap scan;
- outlier scan within region cluster;
- coordinate confidence label required: `HIGH`, `MEDIUM`, `LOW`, or `UNRESOLVED`;
- exact-looking positions from public maps remain `RESEARCH_ONLY_DO_NOT_COPY`.

## Verification Strategy

Allowed verification statuses:

- `GAME_DATA_CORROBORATED`
- `MULTI_SOURCE_CORROBORATED`
- `VIDEO_VERIFIED`
- `FIRST_HAND_VERIFIED`
- `OFFICIAL_VERIFIED`
- `CONFLICTING`
- `SOURCE_ONLY`

Production recommendation:

```text
minimum = MULTI_SOURCE_CORROBORATED
and coordinate_confidence in HIGH|MEDIUM
and precision explicitly labeled
and source_families include at least one non-common-data corroborator
and unresolved_conflicts = 0
```

If the only agreement is among public maps that likely share the same upstream game data, keep the record at `GAME_DATA_CORROBORATED` or `SOURCE_ONLY` and do not bulk-publish it as an independent DragonSwordGuide marker.

## Chest Taxonomy

Observed public subtype vocabulary is not fully normalized across sources.

| Public wording | Candidate subtype | Production subtype decision |
| --- | --- | --- |
| Regular Chest | `REGULAR_CHEST` | Map to `NORMAL_CHEST` only after source review |
| Normal Chest | `NORMAL_CHEST` | Publish as `NORMAL_CHEST` |
| Premium Chest | `PREMIUM_CHEST` | Hold until meaning is confirmed; possible `SUPERIOR_CHEST` alias, not assumed |
| Superior Chest | `SUPERIOR_CHEST` | Publish as `SUPERIOR_CHEST` |
| Hero Chest | `HERO_CHEST` | Hold until meaning is confirmed; possible `EPIC_CHEST` alias, not assumed |
| Rare Chest | `RARE_CHEST` | Publish as `RARE_CHEST` |
| Epic Chest | `EPIC_CHEST` | Publish as `EPIC_CHEST` |
| Legendary Chest | `LEGENDARY_CHEST` | Publish as `LEGENDARY_CHEST` |

Pilot rule: preserve source subtype in candidate data; production export uses the smaller normalized enum only after a mapping note exists.

## Versioning Strategy

Each candidate snapshot should carry:

- `game_build`;
- `dataset_version`;
- `source_snapshot_date`;
- `last_checked`;
- per-source snapshot hash where lawful;
- source-family classification;
- export script version.

Diff statuses:

- `NEW`
- `UNCHANGED`
- `MOVED`
- `REMOVED`
- `CONFLICTING`

Recommended directory shape:

```text
research/map/chests/
  source-inventory.json
  candidates/
    chest-candidates.vYYYYMMDD.json
  normalized/
    chest-normalized.vYYYYMMDD.json
  deduped/
    chest-deduped.vYYYYMMDD.json
  conflicts/
    chest-conflicts.vYYYYMMDD.json
  exports/
    chest-production-manifest.vYYYYMMDD.json
    chest-region-<slug>.vYYYYMMDD.json
```

## Chunking Strategy

Do not inline 1,500 chest markers into `src/data/map-markers.json`.

Recommended option:

```text
tiny manifest + region chunks + lazy load only when CHEST is enabled
```

Comparison:

| Option | Pros | Cons | Decision |
| --- | --- | --- | --- |
| Single `all-chests.json` | Simple; acceptable for internal testing | Adds 300 KB+ raw synthetic payload before compression; harder mobile UX | Use only in local benchmark |
| Region chunks | Keeps initial map fast; natural search/filter scoping | Requires manifest and loader state | Recommended MVP/pilot |
| Viewport/tile lazy load | Best at very high density | More code and cache complexity | Defer unless chest plus resource layers exceed performance budget |

## Rendering Strategy

Rendering should treat chests as a separate high-density layer:

- disabled by default or lazy until user enables `CHEST`;
- cluster at low and mid zoom;
- render individual DOM markers only for visible or selected high-zoom subset;
- cap visible DOM chest markers around 250 before forcing clusters;
- keep active marker detail outside the dense marker loop;
- defer canvas/WebGL until real browser smoke shows DOM clustering is insufficient.

The current 71-marker map is safe as-is. The chest layer should not share the same eager static marker array without chunking.

## Clustering Strategy

Use deterministic grid clustering in screen space:

- low zoom: 56-64 px cells;
- mid zoom: 32-40 px cells;
- high zoom: 20-24 px cells, then expand individual markers;
- cluster key derived from transformed screen x/y, not raw normalized coordinate;
- cluster label uses count and dominant subtype color;
- clicking cluster zooms or filters to its bounding box;
- marker detail opens only for one marker or a small disambiguation list.

## Search Strategy

Avoid returning 1,500 indistinguishable results.

Search index fields:

- marker ID;
- subtype;
- canonical region;
- subregion;
- landmark hint;
- source-visible chest wording;
- candidate aliases.

Result grouping:

- first show region/subtype buckets;
- allow "show all in this region";
- only list individual chest records after a region or subtype is selected;
- keep hidden-layer search explicit: if `CHEST` is off, search can show a count with an enable-layer action.

## Synthetic Benchmark

Saved at `reports/map-data/chest-pipeline-benchmark.json`.

Benchmark model: Node synthetic virtual render model with seeded fake points only.

Key observations:

| Points | Raw JSON bytes | Desktop low-zoom clusters | Mobile low-zoom clusters | Search meadow ms desktop | High-zoom nodes capped |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 100 | 20,381 | 62 | 28 | 0.042 | 99 |
| 500 | 102,745 | 114 | 32 | 0.085 | 250 |
| 1,500 | 309,689 | 117 | 32 | 0.244 | 250 |
| 3,000 | 621,560 | 117 | 32 | 0.595 | 250 |

Conclusion: data operations are cheap at 1,500 points, but client payload and DOM count need discipline. A region-chunked, clustered chest layer is sufficient for the pilot. Browser-level Playwright smoke should be added when actual frontend code is implemented.

## Pipeline Automation Plan

Planned scripts:

| Script | Input | Output | Gate |
| --- | --- | --- | --- |
| `scripts/map/ingest-chest-candidates.mjs` | approved source inventory and manually allowed source facts | raw candidate records | refuses unknown source family or forbidden reuse status |
| `scripts/map/normalize-chest-records.mjs` | candidate records | normalized research records | validates schema, subtype, bounds |
| `scripts/map/dedupe-chests.mjs` | normalized records | deduped candidates and conflict report | classifies three dedupe tiers |
| `scripts/map/diff-chest-dataset.mjs` | previous and current candidate snapshots | diff report | emits `NEW`, `UNCHANGED`, `MOVED`, `REMOVED`, `CONFLICTING` |
| `scripts/map/validate-map-data.mjs` | candidate and production exports | validation report | duplicate IDs = 0, invalid coords = 0, unresolved published conflicts = 0 |
| `scripts/map/export-production-chests.mjs` | approved candidates | manifest and region chunks | blocks research-only, conflicting, or unverified records |

Required CI/report counters:

- `candidate_count`
- `deduped_count`
- `published_count`
- `rejected_count`
- `conflicting_count`
- `invalid_coordinate_count`
- `duplicate_id_count`
- `unknown_subtype_count`
- `research_only_published_count`

## Legal Provenance Gate

`LEGAL_PROVENANCE_GATE: REQUIRED_BEFORE_PILOT_DATA_IMPORT`

Public endpoint availability is not permission. If the only feasible path is "download a competitor JSON layer and republish it," then the pipeline status must become:

```text
PIPELINE_NOT_APPROVED
```

Allowed pilot paths:

- first-hand DragonSwordGuide captures and own schematic placement;
- explicitly licensed source data;
- local game-data route only after EULA/legal review and only if it requires no DRM, encryption, anti-cheat, authentication, private API, or memory bypass;
- small manually reviewed candidate set using fact-level public references plus independent corroboration.

Forbidden:

- complete competitor marker JSON import;
- complete coordinate database copy;
- third-party map image or tile copy;
- icon pack copy;
- copied descriptive text;
- iframe as the primary product.

## Evidence Gate

Publication requires all of the following:

```text
category = CHEST
verification_status in MULTI_SOURCE_CORROBORATED | VIDEO_VERIFIED | FIRST_HAND_VERIFIED | OFFICIAL_VERIFIED
source_families has independent corroboration beyond COMMON_GAME_DATA_FAMILY
normalized_position.x/y are owned, licensed, or first-hand placed
0 <= x <= 1
0 <= y <= 1
unresolved_conflicts = 0
publication.status = PILOT_ELIGIBLE or PUBLISHED
```

If coordinates remain from a public third-party map only, the record is research-only.

## Pilot Recommendation

`PILOT_SIZE: 50-100`

Recommended pilot regions:

1. `Meadow of Beginnings`
2. `Field of Plenty`

Reasoning:

- early-game regions are likely highest utility for searchers;
- existing DragonSwordGuide schematic map already has nearby Eona, dungeon, warp, and boss context;
- smaller geography makes first-hand/guide corroboration and outlier review easier;
- the pilot can validate search grouping, cluster detail, mobile controls, and conflict gates without pretending the full 1,500 set is ready.

Pilot exit criteria:

- source/legal gate passed;
- candidate schema validation passed;
- dedupe report clean or explicitly reviewed;
- production chunk contains only approved pilot records;
- `/map/` browser smoke passes with chest layer enabled on desktop/mobile;
- production page still exposes precision/status honestly.

## Decision

`CHEST_PIPELINE_DESIGN_READY`

The architecture is ready for a constrained pilot, but not ready for full 1,500-marker production import. The next step should be `CHEST_PIPELINE_PILOT`, not a bulk chest upload.
