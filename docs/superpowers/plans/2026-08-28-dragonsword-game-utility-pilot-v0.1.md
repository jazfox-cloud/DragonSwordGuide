# DragonSword Game Utility Pilot v0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the evidence-safe P0 map utility upgrade while explicitly blocking unsupported Rune and Build recommendations.

**Architecture:** Extend the existing inline `InteractiveMap.astro` controller with versioned LocalStorage completion state and stable marker deep links. Reuse the existing map data and GA4 initialization; add no dependencies, backend, account, database, API, or new route.

**Tech Stack:** Astro 5, TypeScript-compatible Astro components, browser-native JavaScript, LocalStorage, URLSearchParams, existing GA4 `gtag`, headless Chrome CDP.

**Spec:** `docs/superpowers/specs/2026-08-28-dragonsword-game-utility-pilot-v0.1-design.md`

## Global Constraints

- DragonSwordGuide only; preserve the dirty main checkout and work in the isolated feature worktree.
- Do not change `/systems/runes/` or `/builds/` recommendations while their data gate is `INSUFFICIENT_VERIFIED_DATA`.
- Never convert map completion into evidence verification.
- Preserve existing URL, canonical, metadata, schema, indexability, explanatory copy, source labels, and sitemap behavior.
- Add no dependency, server runtime, API, AI integration, account, database, payment, or new indexable URL.
- Stage exact paths only.

---

### Task 1: Add the map utility browser contract (RED)

**Files:**

- Create: `scripts/map/utility-browser-smoke.mjs`

**Interfaces:**

- Consumes: built `/map/` and its existing `data-map-mvp`, search, category, marker, and panel hooks.
- Produces: a real-browser exit-code contract for the new progress/deep-link behavior.

- [ ] **Step 1: Write the failing headless-Chrome test**

The test must start `astro preview`, start an isolated Chrome profile, inject a `window.gtag` recorder before navigation, and exercise these literal behaviors:

```js
const expectedStorageKey = 'dragonswordguide.map.completed.v1';
// /map/?marker=<first marker id> selects the matching detail.
// toggle-completed stores that id and changes the count from 0 to 1.
// reload restores the completed style and count.
// hide-completed hides that marker.
// reset-completed removes the key and returns the count to 0.
// tool_open, tool_result_generated, map_marker_completed, and tool_reset are emitted.
// the page retains an Approximate label and has no horizontal overflow at 390x844.
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node scripts/map/utility-browser-smoke.mjs`
Expected: non-zero with a missing completion/deep-link control, because production code does not yet expose it.

### Task 2: Implement map progress, deep links, and measurement (GREEN)

**Files:**

- Modify: `src/components/InteractiveMap.astro`
- Modify: `src/i18n/map/ja.ts`

**Interfaces:**

- Consumes: stable `marker.id`, `root.dataset.markerCount`, current `selectMarker`, `applyFilters`, and existing `window.gtag` when configured.
- Produces: `?marker=`, `dragonswordguide.map.completed.v1`, `data-map-progress-*` UI hooks, and the five scoped event names.

- [ ] **Step 1: Add localized progress controls**

Add default English labels and Japanese overrides for found/not-found actions, hide found, reset found markers, and the completion summary. Render the toolbar controls and panel action without changing evidence/status text.

- [ ] **Step 2: Add fail-safe LocalStorage state**

Implement minimal inline helpers that parse only an array of non-empty string IDs, serialize a sorted de-duplicated array, and catch storage read/write/remove errors. Initialize from `dragonswordguide.map.completed.v1`.

- [ ] **Step 3: Connect completion to all marker rendering paths**

Apply completed styling to base and dynamically rendered chest markers. Exclude completed markers from base filtering and chest clustering only when “Hide found” is checked. Update count and percentage from the existing total marker count.

- [ ] **Step 4: Add marker-panel actions and URL state**

Track the selected marker ID, render the correct toggle label/state in the panel, update `?marker=` with `history.replaceState`, and load/select a valid deep-link marker without changing canonical markup. Ignore invalid IDs safely.

- [ ] **Step 5: Add existing-GA4-only events**

Use:

```js
function trackToolEvent(name, parameters = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, {
    tool_name: 'interactive_map',
    page_path: window.location.pathname,
    ...parameters,
  });
}
```

Do not create or configure another tag.

- [ ] **Step 6: Run the browser contract and verify GREEN**

Run: `node scripts/map/utility-browser-smoke.mjs`
Expected: exit 0 with desktop/mobile progress, persistence, deep-link, analytics, and overflow assertions passing.

### Task 3: Preserve existing product, SEO, and data contracts

**Files:**

- Modify only if required by the new behavior: `scripts/map-mvp-check.mjs`
- Preserve: `src/pages/map/index.astro`, `src/pages/systems/runes/index.astro`, `src/pages/builds/index.astro`

**Interfaces:**

- Consumes: existing build output and repository checks.
- Produces: evidence that the map remains approximate and SEO surfaces remain intact.

- [ ] **Step 1: Build before running generated-output tests**

Run: `npm run build`
Expected: 23 static pages and exit 0.

- [ ] **Step 2: Run the existing repository tests**

Run: `npm test`
Expected: freshness, map, chest pipeline, visual integration, hreflang, and map locale checks all pass; map data remains `71 approximate / 0 verified` before the lazy chest layer.

- [ ] **Step 3: Inspect generated route invariants**

Check generated `/map/`, `/systems/runes/`, and `/builds/` HTML for exactly one H1, self-canonical, no accidental noindex, explanatory copy, existing Article schema, valid internal links, and sitemap membership.

- [ ] **Step 4: Check the exact diff**

Run: `git diff --check` and `git status --short`.
Expected: only the spec, plan, browser smoke, map component, and Japanese map labels are changed.

### Task 4: Release the verified P0 slice and prove production

**Files:**

- Stage only the five intended paths from Tasks 1–3.

**Interfaces:**

- Consumes: a locally verified exact diff and the existing GitHub-backed Cloudflare Pages workflow.
- Produces: commit SHA, remote `main` SHA, active deployment evidence, and live `/map/` behavior evidence.

- [ ] **Step 1: Load and follow `github-cloudflare-pages-publish`**

Confirm `origin`, `main`, Git Provider state, existing Pages project, and no remote drift. Do not create a new deployment mechanism.

- [ ] **Step 2: Commit exact paths**

Commit message: `feat: add persistent map progress utility`

- [ ] **Step 3: Push only if remote main still equals the recorded base**

Push the verified commit to `origin/main`; stop on non-fast-forward or unexpected remote changes.

- [ ] **Step 4: Verify Pages and custom domain**

Require remote SHA, active Pages source SHA, preview response, custom-domain `/map/`, canonical, robots, sitemap, and new UI markers. Run a bounded production browser smoke for completion/reset if the deployed build exposes the new commit.

- [ ] **Step 5: Report the correct overall state**

Report `PARTIAL — DATA GAP` even if P0 is production-verified. Record Rune Planner and Build Planner as `INSUFFICIENT_VERIFIED_DATA`; do not call the full v0.1 pilot `PASS`.
