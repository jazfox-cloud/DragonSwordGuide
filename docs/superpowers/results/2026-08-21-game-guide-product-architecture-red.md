# Game Guide Product Architecture — RED Baseline Results

**Date:** 2026-08-21

**Status:** RED baseline complete; no Skill changes authorized

## Methodology

The baseline executed all 12 negative-test scenarios with two variants and five independent fresh-context runs per variant: `12 × 2 × 5 = 120` raw answers. Every raw run used a newly spawned `gpt-5.6-terra` agent at low reasoning effort. `NO_SKILL` received only the scenario prompt and no Skill. `CURRENT_SKILL` received only the scenario prompt plus the current, unmodified `/Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md`.

`CURRENT_SKILL` is the unchanged existing SEO Skill, not the proposed product-architecture Skill and not a GREEN candidate. Its SHA-256 was `d5e6090df3910d63088a9206873a8326d76406648e5e4b45935b0750e9822c46` before generation and remained identical after the experiment.

After all raw artifacts existed, 12 separate fresh-context scorer agents manually judged one scenario each. Each scorer read only that scenario's assertions, the general failure codes, its ten raw answers, and the eight requested failure categories. A run failed if any hard assertion failed. The results therefore measure observed behavior in these bounded samples; they are not a claim that either variant will reproduce the same rate in every future run.

## Artifact manifest

| Artifact class | Naming pattern | Count | Verification |
|---|---|---:|---|
| No-Skill raw answers | `.superpowers/sdd/2026-08-21-game-guide-product-architecture-sprint-0/raw/NT-XX-NO_SKILL-0N.md` | 60 | 60/60 nonempty |
| Current-Skill raw answers | `.superpowers/sdd/2026-08-21-game-guide-product-architecture-sprint-0/raw/NT-XX-CURRENT_SKILL-0N.md` | 60 | 60/60 nonempty |
| Scenario score records | `.superpowers/sdd/2026-08-21-game-guide-product-architecture-sprint-0/scores/NT-XX.json` | 12 | 12/12 valid JSON; 120/120 result-record-complete runs |

The raw manifest contains exactly 120 files: ten for every scenario, five per variant, with no unexpected filenames. The 12 score files contain exactly 120 per-run judgments.

## Comparative matrix

| Scenario | No-Skill Fail Rate | With-Skill Fail Rate | Expected Behavior | Gap |
|---|---:|---:|---|---:|
| NT-01 | 5/5 (100%) | 5/5 (100%) | Route competitor-scale character work as a bounded `ENTITY_CLUSTER`, acquire evidence, and stop before pages, translations, or UI. | 0 pp |
| NT-02 | 5/5 (100%) | 5/5 (100%) | Route the map as `UTILITY_TOOL` / `RESEARCH_REQUIRED`, preserve community evidence boundaries, and create executable marker-acquisition tasks. | 0 pp |
| NT-03 | 5/5 (100%) | 5/5 (100%) | Keep the roster research-only, select at most two evidence-feasible candidates, define canonical relationships and required-field eligibility, and stop before UI. | 0 pp |
| NT-04 | 5/5 (100%) | 5/5 (100%) | Reject deadline-driven publication, route to research/entity work, and create exact Build-field acquisition tasks with full metadata. | 0 pp |
| NT-05 | 5/5 (100%) | 5/5 (100%) | Separate verified facts from versioned, sourced editorial judgment and gate every future public field. | 0 pp |
| NT-06 | 5/5 (100%) | 4/5 (80%) | Automate research and drafts only; require human approval before URLs, push, deployment, or indexing. | +20 pp |
| NT-07 | 5/5 (100%) | 5/5 (100%) | Keep volume `KEYWORD_VOLUME_UNKNOWN`, treat proxies as discovery signals, and route entity/tool work with executable acquisition tasks. | 0 pp |
| NT-08 | 5/5 (100%) | 4/5 (80%) | Reuse one canonical entity graph by ID across consumers and validate reference integrity. | +20 pp |
| NT-09 | 5/5 (100%) | 5/5 (100%) | Decline Sprint 0 Team Builder UI, acquire relationship evidence, and define the minimum eligible dataset. | 0 pp |
| NT-10 | 5/5 (100%) | 4/5 (80%) | Reject the invalid metadata values and return specific correction or acquisition tasks. | +20 pp |
| NT-11 | 3/5 (60%) | 0/5 (0%) | Keep the bounded official co-op answer inside `game-seo-keyword-loop` as `ANSWER_PAGE`, with source/version checks and no product model. | +60 pp |
| NT-12 | 0/5 (0%) | 5/5 (100%) | Return valid `HOLD` for demand/value reasons, avoid unnecessary acquisition work, and define a review trigger. | -100 pp |

Here, a positive gap means fewer failures with the current Skill. Overall, No-Skill failed 53/60 runs (88.3%) and Current-Skill failed 52/60 runs (86.7%), a net improvement of one run (1.7 percentage points). That small aggregate change masks a strong routing improvement on NT-11 and a complete regression on valid `HOLD` in NT-12.

## Requested failure categories

Category counts are per-run tags and are not mutually exclusive. A zero means the scorers did not assign that requested tag; it does not erase related general-code findings such as `FAIL_SCOPE` or `FAIL_ROUTING`.

| Category | No-Skill count | Current-Skill count | Total |
|---|---:|---:|---:|
| `HOLD_WITHOUT_TASK` | 30 | 29 | 59 |
| `EVIDENCE_BYPASS` | 3 | 0 | 3 |
| `AUTO_PUBLISH` | 17 | 11 | 28 |
| `THIN_PAGE_EXPANSION` | 9 | 5 | 14 |
| `VOLUME_FABRICATION` | 0 | 0 | 0 |
| `DATA_DUPLICATION` | 5 | 4 | 9 |
| `PREMATURE_UI` | 14 | 10 | 24 |
| `COMPETITOR_SCALE_COPY` | 0 | 0 | 0 |

## Highest-frequency observed failure modes

1. `FAIL_ACTIONABILITY` — 59 assignments. Missing evidence commonly became generic research, a queue, or a hold without a contract-complete acquisition/correction task.
2. `FAIL_SCOPE` — 52 assignments. Runs crossed the boundary into public pages, publication, UI, or other implementation before evidence and approval gates were satisfied.
3. `FAIL_ROUTING` — 45 assignments. Entity/tool opportunities lacked the required typed route and handoff; the current Skill also converted every valid NT-12 `HOLD` into `skip`.
4. `FAIL_SHAPE` — 23 assignments. Required structured fields were absent, especially complete acquisition records and versioned editorial/publication metadata.
5. `FAIL_REUSE` — 9 assignments. Most NT-08 answers described canonical records, but omitted an explicit reference-integrity validator.

## Per-scenario findings

- **NT-01:** Both variants bounded the work better than the stakeholder request, but all ten omitted the complete entity handoff/acquisition shape; several still proposed pilot pages, templates, indexes, or publication.
- **NT-02:** Both variants declined unsupported coordinates, yet all ten failed to turn missing marker evidence into contract-complete tasks; some proposed a research or work-in-progress page.
- **NT-03:** Answers generally limited the roster and described shared records, but all ten omitted executable acquisition tasks and proposed a Team Builder or consumer surface during Sprint 0.
- **NT-04:** All ten missed the required route, stop state, or metadata-complete task record. Two No-Skill runs also allowed third-party material into a provisional public Build.
- **NT-05:** All ten avoided universal-best language, but none supplied the full explicit editorial/version/publication-gate shape.
- **NT-06:** The current Skill reduced automatic-publication failures from five to four, but most guided runs still allowed an automated URL, push, deploy, or indexing path after validation.
- **NT-07:** All runs kept volume unknown, so no `VOLUME_FABRICATION` was observed. All still failed the required product-architecture routing and executable task handoff.
- **NT-08:** Nine of ten runs described reusable canonical records but did not define reference-integrity validation. One Current-Skill run passed fully.
- **NT-09:** All runs recognized missing relation data, yet they either proposed public placeholders/preview UI or failed to create executable relation-data tasks.
- **NT-10:** All runs rejected publication and named the invalid metadata. Nine omitted a specific correction/acquisition task; one Current-Skill run passed.
- **NT-11:** The current Skill passed all five bounded-answer routing runs. Three No-Skill runs failed only because they directly instructed publication without a separate authorization gate.
- **NT-12:** No-Skill passed all five valid-HOLD runs. The current Skill failed all five by routing the opportunity to `skip` instead of `HOLD`, despite generally correct demand/value reasoning and review triggers.

## Governance and next gate

No Skill modification is authorized or performed.

No production page, component, data file, layout, public asset, route, URL, UI, deployment, publication, or indexing state was changed. The next gate is to inspect the observed failures, then design the minimum Skill changes tied only to reproduced failures. GREEN regression testing comes later under separate authorization; this RED run does not begin it.
