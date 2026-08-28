# DragonSword Game Utility Pilot v0.1 Design

**Date:** 2026-08-28
**Project:** DragonSwordGuide
**Status:** `BUILD / HOLD`
**Approved input:** User-provided “Codex Task — DragonSword Game Utility Pilot v0.1”

## Objective

Turn the existing `/map/`, `/systems/runes/`, and `/builds/` content owners into a first utility-layer pilot without AI, accounts, a database, a server runtime, or new indexable URLs.

## Current evidence decision

### Map: approved P0 slice

The existing map already has stable marker IDs, search, category filtering, marker details, pan/zoom, an owned schematic base map, and explicit approximate/unverified status. The safe incremental slice is:

- `?marker=<stable-id>` deep links;
- LocalStorage-backed “Mark as found” state;
- hide-completed filtering;
- resettable completion state;
- completed count and percentage;
- low-risk GA4 events through the existing `gtag` instance only.

Completion state means only “the visitor marked this marker found.” It does not upgrade a marker’s evidence status, precision, or confidence.

### Rune Planner: blocked

The repository and official sources support Rune inventory capacity `200 → 500`, owned-count display, and the possibility that 4-Star synthesis yields 5-Star Runes. They do not provide Rune names, verified stat tables, weapon mappings, stage mappings, playstyle mappings, or a defensible recommended setup.

Decision: `INSUFFICIENT_VERIFIED_DATA`. Do not ship a selector that always fails, and do not turn community meta claims into facts.

### Build Planner: blocked

The repository and official sources support the 19-Hero, Status Ailment, Signal Skill, Switching Signal, character-specific equipment, and flexible 2-set/3-set design context. They do not provide an evidence-complete weapon/category inventory or a reproducible preset connecting weapon, progress stage, playstyle, Runes, equipment, and priority.

Decision: `INSUFFICIENT_VERIFIED_DATA`. Keep the explanatory `/builds/` page unchanged.

## Map architecture

Keep the implementation inside the existing `InteractiveMap.astro` because this is one real consumer and the behavior is tightly coupled to its current inline map controller. Do not add a state library or speculative cross-site framework.

Use one versioned local key:

```text
dragonswordguide.map.completed.v1
```

The stored value is a JSON array of stable marker IDs. Invalid or inaccessible LocalStorage falls back to an empty set. No sensitive information is stored.

The URL contract is:

```text
/map/?marker=<marker-id>
```

Selecting a marker updates the current URL with `history.replaceState`; opening a valid deep link selects the marker. Invalid IDs leave the existing default panel unchanged and do not throw.

## UX

- Show a compact completion summary beside existing map stats.
- Put “Mark as found” / “Mark as not found” in the marker detail panel.
- Add “Hide found” and “Reset found markers” to the current toolbar.
- Preserve mobile stacking and tap-target behavior.
- Keep all approximate/status labels visible before and after completion.
- Add Japanese labels because the same component powers `/ja/map/`.

## Measurement

Call the existing `window.gtag` only when it exists. Never initialize GA4 again.

Events:

- `tool_open` on map initialization;
- `tool_input_change` for search/category/hide-completed changes;
- `tool_result_generated` when a marker detail is selected;
- `map_marker_completed` when completion is toggled;
- `tool_reset` when stored completion is cleared.

Every event includes `tool_name: "interactive_map"` and `page_path`. Marker events may include stable marker ID and category; no personal data is collected.

## SEO and performance

Keep `/map/`, its canonical, title, description, Article schema, explanatory copy, sources, sitemap membership, and indexability unchanged. Do not add a dependency or server runtime. Local state work is linear in the published marker set and reuses the existing lazy-loaded chest layer.

## Verification

- RED/GREEN headless-Chrome behavior test for deep links, persistence, hide/reset, event calls, mobile overflow, and retained approximate labeling.
- Existing build-first test suite.
- Generated HTML checks for canonical, robots, sitemap, H1, and explanatory content.
- `git diff --check` and exact-path review.

## Release decision

The user conditionally authorized the repository’s existing stable GitHub-backed Cloudflare Pages workflow. A P0-only release may proceed after local verification, with the final overall status remaining `PARTIAL — DATA GAP` because P1/P2 are blocked.
