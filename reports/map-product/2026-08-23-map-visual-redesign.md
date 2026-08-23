# DragonSwordGuide Map Visual Redesign

Date: 2026-08-23

## Scope

Redesigned the `/map/` visual layer only. The marker dataset, stable IDs, normalized x/y coordinates, manifest/chunk loading, category taxonomy, Chest default-off behavior, clustering, 250 DOM marker cap, search, region filters, category filters and EN/JA shared data model were preserved.

## Design Direction Selected

Selected Direction A: game-map inspired terrain.

Rationale: competitor maps make the world-map canvas the primary object and keep dense POI layers secondary to terrain readability. Direction A best fixes the temporary schematic feel without requiring a marker coordinate migration. Direction B would be more illustrative but riskier for data alignment; Direction C would be clean but would still feel too tool-like.

Reference review:

- <https://dsawakening.grandwiki.com/map> - strong layer/search model and grouped dense map behavior.
- <https://dragonswordawakening.net/map> - world-map-first layout, POI category controls and zoom controls.
- <https://dragonsword-awakening.org/maps> - dense chest/boss map behavior, visible clustering and category filtering.

No competitor source code, coordinate database, icon pack, descriptive text or map image was copied.

## Base Map

Before: inline temporary schematic SVG inside `InteractiveMap.astro`, labeled as an unofficial schematic.

After: DragonSwordGuide-owned standalone Orbis atlas asset at `/map/orbis-atlas-v1.svg` with coastline, ocean, mountain ranges, forest texture, fields, central settlement, river/road gestures and restrained region labels.

Dimensions: 1600 x 1088 SVG coordinate frame.

File size: 5,807 bytes.

Coordinate behavior: the atlas fills the existing normalized 0..1 coordinate frame via `object-fit: fill` and `preserveAspectRatio="none"` so existing marker positions remain deterministic.

## Layout

Before: map and detail panel had near-equal visual weight, with technical base-map constants visible below the map.

After: the map dominates the experience. The detail panel is an overlay drawer on desktop and a bottom sheet on smaller viewports. Technical constants were removed from user-facing copy and replaced with human-readable approximate placement language.

## Marker System

Markers were restyled with compact, high-contrast game-map shapes:

- Eona: mint circular POI.
- Organa: gold diamond.
- Warp Point: blue ring.
- Dungeon: warm doorway shape.
- Boss: red triangular marker.
- Chest: smaller gold diamond.

Hover, focus and selected states remain visible.

## Cluster System

Chest clustering was preserved and visually redesigned as compact gold count bubbles. Low-zoom clustering now uses a coarser cell to avoid visual noise, and dynamically inserted Chest markers/clusters use global CSS so they render as map objects instead of default browser buttons.

Final local browser metrics:

- Desktop low-zoom clusters: 39.
- Mobile low-zoom clusters: 15.
- High-zoom rendered markers: 250 on desktop and mobile.
- DOM cap respected: yes.

## Controls

Controls were compacted into a map toolbar with search, category pills, Chest region select and zoom/reset controls. Category counts remain visible, Chest remains off by default, and search aliases continue to work.

## Detail Panel

The marker detail panel now prioritizes name, category, region, precision, status and confidence. Provenance remains present but no longer dominates the map. Long precision/status values wrap inside the panel without horizontal scrolling.

## Visual Review

Desktop 1440 x 900:

- Default map: pass.
- Chest enabled / cluster state: pass.
- Zoomed-in selected marker: pass.
- No horizontal overflow: pass.

Mobile 390 x 844:

- Full-width map: pass.
- Filters/search/zoom controls: pass.
- Chest lazy load and selected marker bottom-sheet behavior: pass.
- No horizontal overflow: pass.

Japanese map:

- Shared visual system: pass.
- Locale strings and Japanese controls: pass.
- No English UI regression in audited shared map labels: pass.

## Functional Regression Check

No functional regressions found in local build, unit/data checks, i18n checks or real Chrome map smoke.

## I18N Regression Check

EN and JA pages use the same visual component and shared data. Japanese labels were updated from schematic language to independent Orbis map language. `npm run i18n:audit` passed.

## Performance

Base map asset is a 5.8 KB SVG. The Chest layer still lazy-loads separately, remains off by default and respects the 250-marker DOM cap after cluster expansion.

Real Chrome smoke:

- Desktop Chest enable: 55 ms.
- Mobile Chest enable: 32 ms.
- Desktop search: 21 ms.
- Mobile search: 21 ms.
- Desktop pan/zoom controls: 14 ms / 25 ms.
- Mobile pan/zoom controls: 14 ms / 24 ms.

## Known Visual Limitations

The atlas is still an independent approximate interpretation rather than an official game map capture. Some dense Chest clusters overlap the overlay detail panel on desktop because the panel intentionally floats over the map instead of reserving a side column. Mobile controls are functional but remain information-dense because all required filters are kept visible.

## Files Changed

- `public/map/orbis-atlas-v1.svg`
- `src/components/InteractiveMap.astro`
- `src/i18n/map/ja.ts`
- `src/pages/map/index.astro`
- `src/pages/ja/map/index.astro`
- `scripts/map-mvp-check.mjs`
- `scripts/i18n/audit-localization-parity.mjs`
- `reports/map-data/full-scale-browser-performance.json`
- `reports/map-data/full-scale-performance.json`
- `reports/map-product/2026-08-23-map-visual-redesign.md`

## Verification

- `npm run build` - pass.
- `npm test` - pass.
- `npm run i18n:audit` - pass.
- `git diff --check` - pass.
- `node scripts/map/browser-smoke-chest-scale.mjs` - pass.
- `BASE_URL=http://127.0.0.1:4324 node scripts/i18n/browser-smoke.mjs` - pass.
- Impeccable detector - pass after removing side-tab warning styles.

## Deployment

Completed through GitHub-backed Cloudflare Pages production deployment.

Production smoke:

- Cloudflare Pages production deployment active for commit `01b2930` during visual-release smoke.
- `https://dragonswordguide.com/map/` - HTTP 200.
- `https://dragonswordguide.com/ja/map/` - HTTP 200.
- `https://dragonswordguide.com/map/orbis-atlas-v1.svg` - HTTP 200, `image/svg+xml`.
- `BASE_URL=https://dragonswordguide.com node scripts/i18n/browser-smoke.mjs` - pass.
