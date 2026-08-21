# Game SEO Minimal Patch — GREEN Regression

**Date:** 2026-08-21

**Pilot:** DragonSword Awakening / DragonSwordGuide

**Decision:** `GREEN_PASS_WITH_GAPS`

## 1. Result

The minimal patch materially improved the five failure classes observed in RED, but it did not reach the negative-test contract's strict 60/60 acceptance gate.

- No Skill RED: **53/60 failed (88.3%)**
- Original Skill RED: **52/60 failed (86.7%)**
- Patched Skill GREEN: **10/60 failed (16.7%)**
- Delta versus original Skill: **-42 failed runs; -70.0 percentage points**

All 10 remaining failures are confined to two narrow gaps:

1. `NT-03`: five `FAIL_SHAPE` results because the output identifies required fields but does not explicitly separate optional fields.
2. `NT-10`: five `FAIL_ACTIONABILITY` results because the field validator identifies every evidence defect but does not instantiate a specific correction/acquisition task.

No further patch was made after the full GREEN results. These gaps belong to a later narrow regression cycle.

## 2. Frozen boundaries and governance

- RED baseline commit: `2103c2162b601938299ad40ff364997d810c5450`
- Original Skill SHA-256: `d5e6090df3910d63088a9206873a8326d76406648e5e4b45935b0750e9822c46`
- Patched Skill SHA-256: `81871ab805de1605f59539370c711a8b8a385a8a0fb873bd4451a61848089852`
- Skill governance path: `/Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md`
- The Skill directory is not a Git repository. Search found one installed `game-seo-keyword-loop` copy, so the external path is the current authoritative source.
- The DragonSword repository does not contain or claim to commit that external Skill file.
- No full `game-guide-product-architecture` Skill was implemented. The SEO Skill contains only its routing/handoff contract.

The exact before/after Skill diff was inspected against `/private/tmp/game-seo-keyword-loop-SKILL.before-2026-08-21.md`:

- 86 lines before; 167 lines after
- 149 insertions; 68 deletions
- one file changed

## 3. Exact Skill sections changed

| Previous section | Patched section / behavior |
|---|---|
| Frontmatter description | Trigger now covers answer/entity/tool routing and eligible SEO work. |
| Intro and core rule | Defines SEO ownership and excludes product implementation, publish, deploy, and index actions. |
| `Workflow` | Replaced with eight ordered stages: user task, evidence, one primary route, readiness gate, acquisition/HOLD, handoff, reuse, eligible SEO continuation. |
| Page mapping before readiness | Removed as a default. Answer-page briefs occur only after readiness; entity/tool work is handed off. |
| `build / watchlist / skip` output | Replaced by `ANSWER_PAGE / ENTITY_CLUSTER / UTILITY_TOOL / RESEARCH_BACKLOG / HOLD`. |
| Vague thin-data watchlist | Replaced by complete acquisition-task and legitimate-HOLD contracts. |
| No reuse enforcement | Added canonical IDs, ID resolution, presentation separation, and fail-closed integrity checks. |
| `Output Format` | Replaced by the stable required opportunity contract with explicit `N/A` values and publication state. |
| Guardrails | Added hard automation/publication boundary; retained evidence and thin-page controls. |

No special rule was added primarily for `VOLUME_FABRICATION` or `COMPETITOR_SCALE_COPY`; both were zero in RED.

## 4. Targeted smoke regression

The smoke set used fresh-context generation and separate scoring for `NT-01`, `NT-02`, `NT-04`, `NT-06`, `NT-08`, `NT-09`, and `NT-12`.

| Round | Runs | Result | Narrow response |
|---|---:|---|---|
| Smoke 1 | 7 | 3 PASS, 4 FAIL | Added explicit completion artifact/stop condition, entity-family task coverage, and consumer ID-resolution output. |
| Smoke 2 | 4 affected scenarios | 3 PASS, 1 FAIL | NT-01 still omitted Team Relation acquisition coverage. |
| Smoke 3 | NT-01 only | PASS | Added the already-approved DragonSword vertical-chain acquisition boundary. |

Final smoke gate: **7/7 targeted scenarios passed on the final candidate**. No smoke run modified production code, URLs, data, UI, or publishing state.

## 5. Full GREEN method and artifact validity

- 12 scenarios × 5 fresh-context patched-Skill runs = **60 GREEN runs**.
- Every generation used a new `gpt-5.6-terra` context at low reasoning effort.
- Generation agents received only the patched Skill, exact scenario prompt, and output path.
- Expected behavior, hard assertions, failure labels, RED results, and earlier answers were excluded from generation prompts.
- Twelve separate fresh-context scorers evaluated one scenario each after all raw answers were frozen.
- The rubric was unchanged; its SHA-256 remained `69e9cf623f29d91ea2dd47c4a1f8a8023e5101e650a317a3881b4e8418ab7ca9`.

Validation:

- 60/60 raw answers present and nonempty; exactly five per scenario
- 12/12 scoring JSON files parse successfully
- 60/60 score records contain the required audit fields
- 60/60 artifact paths exist and are unique
- 15/15 failure rationalizations are exact nonempty raw-answer substrings
- 50/50 PASS records contain no failure codes, specialty tags, failed assertions, or failure quotes
- scoring manifest recomputation matches: 50 PASS, 10 FAIL
- `rubric_unchanged: true`
- `rubric_leakage_into_prompts: false`

Raw and scoring artifacts remain in the plan-specific ignored workspace under `.superpowers/sdd/2026-08-21-game-seo-minimal-patch-green/`, consistent with the RED experiment's repository-noise decision. The aggregate report is tracked; the 60 raw model answers and 12 score files are local audit artifacts, not Git-tracked production inputs.

## 6. Per-scenario comparison

| Scenario | No Skill fail rate | Original Skill fail rate | Patched Skill fail rate | Delta vs original |
|---|---:|---:|---:|---:|
| NT-01 | 100% (5/5) | 100% (5/5) | 0% (0/5) | -100 pp |
| NT-02 | 100% (5/5) | 100% (5/5) | 0% (0/5) | -100 pp |
| NT-03 | 100% (5/5) | 100% (5/5) | 100% (5/5) | 0 pp |
| NT-04 | 100% (5/5) | 100% (5/5) | 0% (0/5) | -100 pp |
| NT-05 | 100% (5/5) | 100% (5/5) | 0% (0/5) | -100 pp |
| NT-06 | 100% (5/5) | 80% (4/5) | 0% (0/5) | -80 pp |
| NT-07 | 100% (5/5) | 100% (5/5) | 0% (0/5) | -100 pp |
| NT-08 | 100% (5/5) | 80% (4/5) | 0% (0/5) | -80 pp |
| NT-09 | 100% (5/5) | 100% (5/5) | 0% (0/5) | -100 pp |
| NT-10 | 100% (5/5) | 80% (4/5) | 100% (5/5) | +20 pp |
| NT-11 | 60% (3/5) | 0% (0/5) | 0% (0/5) | 0 pp |
| NT-12 | 0% (0/5) | 100% (5/5) | 0% (0/5) | -100 pp |
| **Overall** | **88.3% (53/60)** | **86.7% (52/60)** | **16.7% (10/60)** | **-70.0 pp** |

## 7. Five primary failure classes

Counts are failed-run tags and are not mutually exclusive.

| Failure class | Original Skill | Patched Skill | Change |
|---|---:|---:|---:|
| `FAIL_ACTIONABILITY` | 29 | 5 | -24 (-82.8%) |
| `FAIL_SCOPE` | 21 | 0 | -21 (-100%) |
| `FAIL_ROUTING` | 25 | 0 | -25 (-100%) |
| `FAIL_SHAPE` | 13 | 5 | -8 (-61.5%) |
| `FAIL_REUSE` | 4 | 0 | -4 (-100%) |

## 8. Tracked specialty failures

| Specialty failure | Original Skill | Patched Skill | Change |
|---|---:|---:|---:|
| `HOLD_WITHOUT_TASK` | 29 | 5 | -24 |
| `AUTO_PUBLISH` | 11 | 0 | -11 |
| `THIN_PAGE_EXPANSION` | 5 | 0 | -5 |
| `DATA_DUPLICATION` | 4 | 0 | -4 |
| `PREMATURE_UI` | 10 | 0 | -10 |
| `EVIDENCE_BYPASS` | 0 | 0 | no regression |
| `VOLUME_FABRICATION` | 0 | 0 | no measured change |
| `COMPETITOR_SCALE_COPY` | 0 | 0 | no measured change |

The patched `HOLD_WITHOUT_TASK` tag is retained for rubric comparability, but its five GREEN instances are NT-10 validation responses that blocked publication without literally returning `HOLD`. Their primary classification is correctly `FAIL_ACTIONABILITY`.

## 9. Safety and regression gates

- NT-11 Exact Answer: **5/5 PASS**; every answer routes to `ANSWER_PAGE`, keeps `handoff: N/A`, and avoids entity/tool expansion.
- NT-12 legitimate HOLD: **5/5 PASS**; every answer returns `HOLD` / `DUPLICATE_INTENT`, creates no unnecessary acquisition task, and gives a measurable review trigger.
- `AUTO_PUBLISH`: 11 → 0.
- `PREMATURE_UI`: 10 → 0.
- `DATA_DUPLICATION`: 4 → 0.
- `EVIDENCE_BYPASS`: 0 → 0.
- All 41 GREEN `ENTITY_CLUSTER` or `UTILITY_TOOL` answers return `PRODUCT_ARCHITECTURE_HANDOFF_REQUIRED` because the future Skill is not installed.
- Zero GREEN answers authorize publication. Fifty-five explicitly emit `publication_authorized: false`; the five NT-10 answers explicitly state the field cannot be published.

## 10. Required decision answers

**A. Did the patch materially reduce `FAIL_ACTIONABILITY`?** Yes: 29 → 5, an 82.8% count reduction, with one remaining validator-specific gap.

**B. Did it stop premature product/page/UI work before data readiness?** Yes in this sample: `FAIL_SCOPE` 21 → 0, `PREMATURE_UI` 10 → 0, and `AUTO_PUBLISH` 11 → 0.

**C. Can it distinguish the five routes reliably?** Yes in this sample: `FAIL_ROUTING` 25 → 0. The remaining failures concern output shape and task instantiation, not route selection.

**D. Does legitimate `HOLD` remain valid rather than becoming skip?** Yes: NT-12 passed 5/5 as a legitimate HOLD with no busywork task.

**E. Does shared-data work require canonical references and integrity validation?** Yes: `FAIL_REUSE` 4 → 0 and NT-08 passed 5/5.

**F. Is the SEO Skill ready to hand off entity/tool work?** Yes for routing and boundary enforcement: all 41 entity/tool answers required the future product-architecture handoff. It is not the downstream product-architecture implementation.

## 11. Final classification and next narrow cycle

`GREEN_PASS_WITH_GAPS`

The patch materially fixes the real RED failure modes and is suitable for continued Skill integration, but the strict all-runs-pass gate is not met. The next cycle, if approved, should address only:

1. an explicit `optional_fields` boundary for partial-entity slices; and
2. mandatory correction/acquisition-task instantiation for invalid evidence-metadata validation.

Do not reopen UI, URL expansion, publishing, production data models, or the full product-architecture Skill in that cycle.

## 12. Production and repository validation

- Production-path diff under `src/pages`, `src/components`, and `src/data`: empty.
- No page, component, data, route, URL, navigation, sitemap, deployment, analytics, GSC, Cloudflare, AIOS, or WOS change.
- `git diff --check`: clean.
- Unrelated `.DS_Store`, brand assets, and `doct/` remain untouched and untracked.
- No push was performed.
