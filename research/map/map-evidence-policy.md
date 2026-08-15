# Map Evidence Policy

## Evidence levels

- **Evidence A — first-hand:** own gameplay/map screenshot, own route verification, own observed in-game location or reproducible navigation steps. A useful record should preferably have two independent first-hand artifacts.
- **Evidence B — official:** developer material, official Steam announcement, official game screenshot or official quest/location information. Evidence B supports only what the source explicitly states.
- **Evidence C — community:** Reddit, Steam Discussions, YouTube, community maps and third-party guides. Evidence C supports demand, terminology and candidate discovery only.

Evidence C cannot alone establish exact coordinates, completeness, exact totals, “all chests” or an official map.

## Record requirements before a future guide

Each Evidence A/B location record should include marker, category, region, approximate location, exact coordinate only when genuinely available, route, screenshot reference, game version, verified date, evidence source, confidence and notes.

If only a broad area is known, use `APPROXIMATE_LOCATION_ONLY`. Do not convert a community pin into a first-party coordinate.

## Completeness boundary

Allowed wording: “verified sample,” “currently documented locations,” “partial location guide,” and “community-reported, not yet verified.”

Forbidden until independently proven: “complete map,” “all chests,” “every location,” “100% complete,” “official map,” and “all markers.”

## Maintenance model

Use a small JSON/Markdown record set rather than a database. Every record must carry:

- `gameVersion`
- `firstVerifiedDate`
- `lastVerifiedDate`
- `evidence`
- `source`
- `status`
- `staleOrRecheck`

Statuses: `VERIFIED_CURRENT`, `COMMUNITY_LEAD`, `NEEDS_RECHECK`, `STALE`, `REJECTED`.

## Future build gate

A future Static Locations Guide requires at least five genuinely verified records, Evidence Strength ≥18/25, a clear partial-coverage statement and a maintainable version/date/source workflow. An interactive map additionally requires marker density, reliable map anchoring, a repeatable schema and technical value beyond a static verified index.
