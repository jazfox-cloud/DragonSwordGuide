# Map Visual Integration

Date: 2026-08-23

Status: USER_APPROVAL_APPROVED_DEPLOYMENT_IN_PROGRESS

## Scope

Integrated the user-approved `public/map/base-map-candidate-v2.png` candidate into the `/map/` renderer. User approval for production deployment was received on 2026-08-23.

Preserved:

- 1555 total markers
- 1484 Chest markers
- 20 Warp Points
- 26 Dungeons
- 9 Field Bosses
- 13 Organa
- 3 Eona
- Chest default off
- Chest lazy loading
- Chest region chunks
- Existing stable marker IDs and source datasets
- EN/JA map parity
- `public/map/orbis-atlas-v1.svg` rollback asset

## Coordinate Transform

COORDINATE_GATE: COORDINATE_TRANSFORM_PASS

- ANCHORS_CHECKED: 47
- TRANSFORM_MODEL: Model C - smooth IDW control-point warp
- MEAN_ALIGNMENT_ERROR: 0.028753 normalized
- MAX_ALIGNMENT_ERROR: 0.068046 normalized
- OUTLIERS: 0
- REPORT: `reports/map-product/2026-08-23-map-coordinate-transform-gate.json`

Implementation:

- New utility: `src/lib/map-coordinate-transform.js`
- Transform is applied in rendering/export layer.
- Source marker JSON and Chest chunk coordinates were not rewritten.
- Chest lazy-load records preserve `original_x` and `original_y` in memory before assigning transformed render coordinates.

Transform model comparison:

- Model A: global affine transform
- Model B: region-aware centroid displacement
- Model C: smooth IDW control-point warp

Model C was selected because it gave the lowest leave-one-out mean error while keeping the implementation maintainable and source data rollback-safe.

## Base Map

- BASE_MAP: `public/map/base-map-candidate-v2.png`
- OPTIMIZED_FORMAT: WebP primary with PNG fallback
- OPTIMIZED_WEBP_SIZE: 512,500 bytes
- PNG_FALLBACK_SIZE: 3,244,909 bytes
- AVIF_TEST_SIZE: 393,161 bytes

Decision:

- WebP was selected for integration because it passed visual inspection and is well below the approximate 1.5 MB target.
- AVIF was generated for comparison but not selected because local review tooling could not visually inspect it in this run.

## Marker Integration

MARKERS_INTEGRATED: YES

- CHESTS: 1484
- WARP: 20
- DUNGEONS: 26
- BOSSES: 9
- ORGANA: 13
- EONA: 3

Marker visual system:

- Smaller markers than the previous system.
- Lower saturation and dark outlines for visibility on dense terrain.
- Highest visual weight: selected marker, Warp, Boss, Dungeon.
- Medium: Eona, Organa.
- Lowest/dense: Treasure Chest.

Cluster visual system:

- Chest clusters remain compact and count-readable.
- Chest default remains off.
- Chest lazy loading and region filtering remain active.
- Low zoom keeps clustered coverage for all visible Chest markers.
- High zoom individual rendering now uses an explicit DOM guard with observable `chestRenderedCount` and `chestRenderLimited`.

Region labels:

- Large old region text overlays were removed to preserve terrain visibility.

Detail drawer:

- Desktop drawer narrowed.
- Selected markers auto-pan away from the top-right drawer where needed.
- Mobile bottom sheet uses a solid high-contrast background for reliable text rendering.
- Raw engineering enum values are hidden from users; labels now show friendly strings such as `Source corroborated`, `Approximate location`, and Japanese equivalents.

## Independent Visual Review

INDEPENDENT_VISUAL_REVIEW: PASS

CHEAP_OR_TEMPORARY_VS_BENCHMARK: NO

MARKER_ALIGNMENT_REVIEW: CLEARLY_REASONABLE

Scores:

| Dimension | Rating |
|---|---|
| BASE_MAP_QUALITY | ABOVE_BENCHMARK |
| MARKER_READABILITY | ACCEPTABLE |
| CLUSTER_READABILITY | BENCHMARK_LEVEL |
| MAP_IMMERSION | BENCHMARK_LEVEL |
| VISUAL_HIERARCHY | ACCEPTABLE |
| DETAIL_PANEL_BALANCE | ACCEPTABLE |
| TERRAIN_VISIBILITY | BENCHMARK_LEVEL |
| ZOOMED_QUALITY | BENCHMARK_LEVEL |
| MOBILE_USABILITY | ACCEPTABLE |
| JA_VISUAL_PARITY | ACCEPTABLE |

Reviewer findings:

- The integrated map does not look cheaper or temporary next to the benchmarks.
- Base art is richer and more immersive than the benchmark set.
- Marker alignment is broadly coherent against landforms, regions, islands, and coastlines.
- Main visual weakness is density: selected/detail panels cover a lot of map space, especially mobile, but this is not a major blocker.
- Japanese view maintains visual parity, though some content remains English.

## Technical Review

Initial technical review: FAIL

Issues found:

- Client/browser exact-anchor transform returned old coordinates for exact anchor hits.
- High-zoom Chest individual rendering silently capped visible markers at 250.

Fixes:

- Client exact-anchor handling now returns the transformed anchor coordinate.
- The silent 250 cap was removed.
- Individual Chest render guard is now 420 globally or 520 for focused region, with observable dataset state.
- Added `scripts/map/visual-integration-check.mjs`.

Re-review:

- TECHNICAL_REVIEW: PASS
- Critical issues: none.
- Important issues: none for the two prior failure areas.

## Performance

PERFORMANCE_RESULT: PASS_FOR_PRE_DEPLOY_REVIEW

- PNG candidate: 3,244,909 bytes
- WebP selected: 512,500 bytes
- AVIF comparison: 393,161 bytes
- Chest JSON remains lazy-loaded and default off.
- Current Chest toggle still fetches all 20 chunks; acceptable only while default off and lazy-loaded.

## Screenshots

Review package:

- `reports/map-product/map-integration-review-assets/en-default-desktop.png`
- `reports/map-product/map-integration-review-assets/en-chests-desktop.png`
- `reports/map-product/map-integration-review-assets/en-zoom-desktop.png`
- `reports/map-product/map-integration-review-assets/en-selected-desktop.png`
- `reports/map-product/map-integration-review-assets/ja-default-desktop.png`
- `reports/map-product/map-integration-review-assets/mobile-default.png`
- `reports/map-product/map-integration-review-assets/mobile-selected.png`
- `reports/map-product/map-integration-review-assets/coordinate-anchor-calibration-desktop.png`
- `reports/map-product/map-integration-review-assets/marker-alignment-50-sample.png`
- `reports/map-product/map-integration-review-assets/manifest.json`

## Tests

Passed:

- `node scripts/map/coordinate-transform-gate.mjs`
- `node scripts/map/visual-integration-check.mjs`
- `npm run build`
- `npm test`
- `npm run i18n:audit`
- `npm run i18n:stale`
- `git diff --check`
- Browser smoke for EN desktop, JA desktop, EN mobile, JA mobile:
  - base map renders
  - marker open
  - search
  - filters
  - Chest lazy loading
  - Chest region filter
  - cluster drilldown
  - zoom/reset
  - language switcher
  - no horizontal overflow
  - raw enum hidden

## Deployment

- USER_APPROVAL: APPROVED
- COMMIT: PENDING
- DEPLOYMENT: PENDING
- PRODUCTION_SMOKE: PENDING

## Rollback

Rollback path remains available:

- Old asset retained: `public/map/orbis-atlas-v1.svg`
- Base layer is centralized in `src/lib/map-coordinate-transform.js`
- Source coordinates were not mutated
- Production rollback is available by restoring the base layer asset selection.

## Known Limitations

- Mobile selected panel is usable but visually dense.
- Some Japanese map content remains in English because canonical marker names/source summaries are shared source data.
- Chest toggle still downloads all 20 chunks after the user enables Chest.
- High-zoom all-region Chest individual rendering uses an explicit DOM guard; use region filter for more complete individual inspection.

## Gate Result

COORDINATE_TRANSFORM_RESULT: PASS

INDEPENDENT_VISUAL_REVIEW_RESULT: PASS

TECHNICAL_REVIEW_RESULT: PASS

PERFORMANCE_RESULT: PASS_FOR_PRE_DEPLOY_REVIEW

USER_APPROVAL: APPROVED

NEXT_STEP: DEPLOY_APPROVED_MAP_VISUAL_INTEGRATION
