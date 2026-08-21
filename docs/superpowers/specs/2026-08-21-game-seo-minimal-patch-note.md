# Game SEO Skill Minimal Patch Note

**Date:** 2026-08-21

**Scope:** Patch only the five failure classes observed in the RED baseline. This note does not define the future `game-guide-product-architecture` Skill or any production implementation.

| Failure | Existing behavior | Minimal required behavior | Skill section to change |
|---|---|---|---|
| `FAIL_ACTIONABILITY` | Thin evidence commonly ends in `watchlist`, `HOLD`, “research,” or “wait” without bounded work. | When demand is credible and missing evidence is acquirable, emit a complete acquisition task; reserve `HOLD` for an intentional stop and include its blocker and unblock trigger. | Add `Acquisition and HOLD contract`; replace the thin-data guardrail. |
| `FAIL_SCOPE` | Page mapping and briefs occur before the user task, entity/field needs, evidence, completeness, and maintenance readiness are established. | Run six readiness checks before recommending any page, URL, UI, product, or publishing flow; if a check fails, route to research or a valid hold and stop implementation. | Insert `Readiness gate` before page mapping; constrain `Map pages` and `Write the page brief`. |
| `FAIL_ROUTING` | The Skill uses `build / watchlist / skip` and has no single route or product-architecture handoff. | Assign exactly one of `ANSWER_PAGE`, `ENTITY_CLUSTER`, `UTILITY_TOOL`, `RESEARCH_BACKLOG`, or `HOLD`; hand entity/tool work to `game-guide-product-architecture`, or return `PRODUCT_ARCHITECTURE_HANDOFF_REQUIRED` while it is unavailable. | Replace the verdict contract with `Primary routing` and `Product-architecture handoff`. |
| `FAIL_SHAPE` | Architecture-relevant answers omit critical readiness, evidence, maintenance, task, or publication fields. | Emit the fixed opportunity contract, using `N/A` instead of omission, with a fail-closed publication gate that never returns `PUBLISHED`. | Replace `Output Format` with `Required opportunity output`. |
| `FAIL_REUSE` | Canonical data is advisory; consumers may still copy the same facts. | Require canonical entity IDs, reference-based consumers, integrity checks, and a failed publication gate when references or evidence metadata are invalid. | Add `Shared-data contract and integrity gate`. |

No rule is added primarily for `VOLUME_FABRICATION` or `COMPETITOR_SCALE_COPY`; their RED counts were zero. Existing evidence and thin-page guardrails remain where they support the five observed classes.
