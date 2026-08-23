# Map Marker Verification Protocol

Last updated: 2026-08-22

This protocol is reusable for DragonSwordGuide map-marker upgrades. It is designed for `OWN_SCHEMATIC_ORBIS_BASE_MAP` and `IMAGE_RELATIVE_COORDINATES`, where marker placement is intentionally approximate unless first-hand or official evidence proves more.

## Workflow

1. Candidate
   - Select a small category-limited set.
   - Record marker id, name, category, region, current status, current precision and source leads.
   - Do not import research-only payloads or third-party coordinates into production.

2. Source Independence Check
   - Compare at least two sources.
   - Separate official system context from location evidence.
   - Treat translated mirrors, pages from the same site network and maps that share an upstream dataset as weaker independence.

3. Video / Official Search
   - Search official channels first, then public gameplay and guide videos.
   - A video can support `VIDEO_VERIFIED` only when the footage clearly shows map view or stable world context, the marker/object, region/location relationship and a timestampable source URL.
   - Article-embedded stills without a direct video URL and timestamp remain secondary evidence.

4. Region Match
   - Compare marker name, region, objective language and nearby named area.
   - Classify as `STRONG_MATCH`, `PARTIAL_MATCH`, `CONFLICT` or `INSUFFICIENT`.

5. Landmark Match
   - Compare durable landmarks such as tower, cliff, waterfall, pond, wall clue, cave, marked trial, web obstruction or hideout.
   - Route notes must be rewritten in DragonSwordGuide's own words.

6. Coordinate Review
   - Use only owned schematic placement.
   - Allowed precision: `REGION_APPROXIMATE`, `LANDMARK_APPROXIMATE`, `VISUALLY_CORROBORATED`.
   - Do not use `EXACT` without official coordinates, first-hand map capture, or direct video evidence good enough to recreate the placement.

7. Verification Classification
   - `OFFICIAL_VERIFIED`: official source explicitly shows or states the marker location.
   - `FIRST_HAND_VERIFIED`: DragonSwordGuide owns gameplay capture for map view plus world context.
   - `VIDEO_VERIFIED`: public video clearly verifies the marker with source URL and timestamp.
   - `SECONDARY_CORROBORATED`: independent non-official sources align on name, region and route/landmark.
   - `APPROXIMATE`: only broad region or weak source evidence exists.
   - `CONFLICTING`: sources disagree materially.

8. Production Publish
   - Update only markers whose production status, confidence, precision or detail genuinely changes.
   - Keep production JSON small: user-facing detail plus compact `evidence[]`.
   - Keep full provenance in reports, not in the client payload.
   - Run `npm run build`, `npm test`, `git diff --check` and browser smoke before deployment.

## Promotion Gates

| Target status | Minimum evidence |
| --- | --- |
| `SECONDARY_CORROBORATED` | Two independent secondary sources align on name, region and route/landmark; no conflict found. |
| `VIDEO_VERIFIED` | Direct public video URL, timestamp, visible marker/object and stable map/world context. |
| `OFFICIAL_VERIFIED` | Official source explicitly locates the marker, not just the system category. |
| `FIRST_HAND_VERIFIED` | DragonSwordGuide-owned capture with map view, world context and reproducible route note. |

## Stop Rules

- Stop if the only available material is copied coordinates, screenshots, marker JSON or a third-party map database.
- Stop if sources share a likely upstream dataset and no independent route or video evidence exists.
- Stop if adding markers would inflate count without improving verification quality.
- Stop category work after the sprint scope is complete.
