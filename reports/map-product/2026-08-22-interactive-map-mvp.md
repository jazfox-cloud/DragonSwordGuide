# DragonSwordGuide Interactive Map MVP

Date: 2026-08-22

## Status

`/map/` has been upgraded from a static locations hub into the DragonSword Awakening Interactive Map beta.

## Production Boundary

- URL: `https://dragonswordguide.com/map/`
- Canonical: `https://dragonswordguide.com/map/`
- Base map: `OWN_SCHEMATIC_ORBIS_BASE_MAP`
- Coordinate system: `IMAGE_RELATIVE_COORDINATES`
- Data policy: `PRODUCTION_BETA_APPROXIMATE_MARKERS_ONLY`
- Research-only pilot import: not used
- Competitor tiles, base maps, marker databases or copied coordinates: not used

## Marker Dataset

- Markers published: 6
- Categories: `EONAS_LEGACY`, `ORGANA_STATUE`
- Approximate markers: 6
- First-hand verified markers: 0
- Game version context: 1.0.8 public update context
- Last checked: 2026-08-22

## MVP Features

- Pan by dragging the schematic map.
- Zoom in and out with map controls.
- Reset map view.
- Search markers by name or region.
- Filter markers by category.
- Select marker details with category, region, precision, status, confidence and source boundary.
- Responsive desktop and mobile layout.
- Static SEO sections for how to use, mapped scope, verification and updates.

## Verification

- `npm run build`: PASS, 17 static pages built.
- `npm test`: PASS, `map:mvp-check ok: 6 markers, 6 approximate, 0 verified`.
- `git diff --check`: PASS.
- Local preview HTTP smoke: PASS, `GET /map/` returned `200 OK`.
- Browser smoke: PASS via bundled Playwright after sandbox escalation.
  - Desktop 1440x1000: H1, title, base map id, 6 markers, search, filters, controls, Organa detail click and zoom all passed.
  - Mobile 390x844: H1, title, base map id, 6 markers, search, filters, controls, Organa detail click and zoom all passed.

## Known Limitations

- No marker is first-hand verified.
- Marker positions are broad schematic placements, not exact in-game coordinates.
- The page does not publish chest locations, a complete collectible database, copied third-party pins or official map artwork.
- Analytics events for search/filter/marker clicks are not yet instrumented.

## Next Step

Collect first-hand screenshots, stable landmarks and route notes for one marker category, then upgrade individual records from approximate beta markers only when evidence supports it.
