# Game Guide Product Architecture Sprint 0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify and install a narrow SEO router plus a separate evidence-governed game data-product architecture Skill, while freezing DragonSword production pages and URLs.

**Architecture:** `game-seo-keyword-loop` remains the demand and routing layer. New `game-guide-product-architecture` owns entity contracts, evidence gaps, acquisition tasks, vertical slices, shared consumers, and a publication stop gate. Sprint 0 finishes with tested Skills and a stable DragonSword data contract; it does not implement site data, pages, or UI.

**Tech Stack:** Markdown Skill files, YAML frontmatter, Codex Skill Creator validation scripts, fresh-context agent pressure tests, Astro/TypeScript contract references only

**Spec:** `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-design.md`

## Global Constraints

- Any opportunity blocked by missing data must become an executable data-acquisition task, not remain in `HOLD`.
- Any opportunity with demand must not bypass evidence and the shared data model to become a page.
- `game-seo-keyword-loop` owns opportunity discovery, classification, routing, and feedback only.
- `game-guide-product-architecture` owns data-product architecture and never authorizes publication.
- Every public field requires `source`, `evidence_level`, `game_version`, `last_verified`, `public_allowed`, and `editorial_judgment`.
- The DragonSword pilot is limited to one to three characters.
- Do not change production pages, routes, navigation, sitemap, deployment, or indexing state.
- Do not create Team Builder UI.
- Do not select final pilot character names during Sprint 0.
- Do not modify the existing untracked `.DS_Store`, `DragonSwordGuide-brand-pack.zip`, `DragonSwordGuide-brand-pack/`, or `doct/` paths.
- Run RED controls before editing either Skill.
- Stop after Sprint 0 acceptance; Sprint 1 requires a separate plan and approval.

---

## File map

### Tracked project artifacts

- `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-design.md` — approved behavior and data contracts
- `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-negative-tests.md` — pressure scenarios and scoring contract
- `docs/superpowers/results/2026-08-21-game-guide-product-architecture-red.md` — raw-control index, scores, and observed rationalizations
- `docs/superpowers/results/2026-08-21-game-guide-product-architecture-green.md` — guided-run index, scores, refactor iterations, and final verdict
- `docs/product/dragon-sword-character-build-team-data-contract.md` — project-local Sprint 1 input contract copied exactly from the approved design and narrowed to DragonSword

### User Skill artifacts

- `/Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md` — minimal route classification and handoff change
- `/Users/jazfox/.codex/skills/game-guide-product-architecture/SKILL.md` — concise core workflow and hard gates
- `/Users/jazfox/.codex/skills/game-guide-product-architecture/agents/openai.yaml` — generated discovery metadata
- `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/data-contract.md` — entity graph and `PublicField<T>` contract
- `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/evidence-gates.md` — evidence eligibility, completeness, staleness, and publication decisions
- `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/output-contracts.md` — routing handoff, acquisition task, vertical slice, and fixed output shapes

No additional Skill documentation files are created.

---

### Task 1: Record the RED baseline before any Skill edit

**Files:**
- Read: `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-negative-tests.md`
- Read: `/Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md`
- Create: `docs/superpowers/results/2026-08-21-game-guide-product-architecture-red.md`

**Interfaces:**
- Consumes: scenario prompts and hard assertions `NT-01` through `NT-12`
- Produces: one indexed record for every control run plus the observed failure/rationalization set that may be addressed in Tasks 2–4

- [ ] **Step 1: Confirm a clean test boundary**

Run:

```bash
git status --short
```

Expected: only known user-owned untracked paths plus the three approved design artifacts; no Skill files have changed.

- [ ] **Step 2: Create the RED result shell**

Use this exact top-level structure:

```markdown
# Game Guide Product Architecture RED Baseline

**Skill state:** Unmodified `game-seo-keyword-loop`; no `game-guide-product-architecture`
**Runs per scenario:** 5

## Run index
| Scenario | Run | Artifact | Result | Failed assertions |
|---|---:|---|---|---|

## Observed failure patterns

## Verbatim rationalizations

## Rules justified by observed failures

## Control verdict
```

- [ ] **Step 3: Run five independent controls for `NT-01`**

Use the exact `NT-01` prompt from the negative-test spec. Give each fresh-context agent only the current unmodified `game-seo-keyword-loop` and the prompt. Save raw outputs under a temporary test directory outside the repository, and record their paths and scores in the RED result.

Expected: at least one run exhibits the targeted scale, routing, evidence, or actionability failure. If all five pass, mark the proposed `NT-01`-specific rule `NOT_JUSTIFIED` and do not add it to a Skill.

- [ ] **Step 4: Repeat the five-run control for `NT-02` through `NT-12`**

Use each prompt verbatim and score against its own hard assertions. Do not combine scenarios in one agent context.

Expected: 60 individually scored control runs.

- [ ] **Step 5: Extract observed rationalizations verbatim**

For each failed run, copy only the sentence that justified the bad action, such as publishing first, using a placeholder, treating a proxy as volume, or leaving vague `HOLD`. Group identical rationalizations without rewriting their meaning.

Expected: every proposed prohibition in Tasks 2–4 traces to at least one raw failed output.

- [ ] **Step 6: Verify the RED baseline is real**

Check:

```bash
rg -n "NOT_RUN|unscored|missing artifact" docs/superpowers/results/2026-08-21-game-guide-product-architecture-red.md
```

Expected: no matches.

- [ ] **Step 7: Commit the RED evidence only**

```bash
git add docs/superpowers/results/2026-08-21-game-guide-product-architecture-red.md
git commit -m "test: capture game product architecture red baseline"
```

---

### Task 2: Add minimal product routing to `game-seo-keyword-loop`

**Files:**
- Modify: `/Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md`
- Read: `docs/superpowers/results/2026-08-21-game-guide-product-architecture-red.md`
- Read: `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-design.md`

**Interfaces:**
- Consumes: seed evidence, keyword score, user job, entity/tool dependency, observed RED failures
- Produces: `OpportunityRoute` with one of `ANSWER_PAGE`, `ENTITY_CLUSTER`, `UTILITY_TOOL`, `RESEARCH_BACKLOG`, `HOLD`, or `SKIP`

- [ ] **Step 1: Back up the current Skill for diff review**

Run:

```bash
cp /Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md /tmp/game-seo-keyword-loop.SKILL.before.md
```

Expected: `/tmp/game-seo-keyword-loop.SKILL.before.md` exists and matches the current file.

- [ ] **Step 2: Replace the page-only decision with the approved route contract**

The Skill must define exactly these routes and no product implementation logic:

```text
ANSWER_PAGE       bounded verified answer; remain in this Skill
ENTITY_CLUSTER    repeatable entities or relationships; hand off
UTILITY_TOOL      search/filter/compare/calculate/build/locate behavior; hand off
RESEARCH_BACKLOG  credible demand with missing production data; create acquisition task
HOLD              insufficient demand, duplicate intent, out of scope, non-actionable external blocker, or excessive risk
SKIP              unsafe, irrelevant, or no distinct user value
```

- [ ] **Step 3: Add the fixed handoff output**

The Skill output must include every field below:

```yaml
opportunity_id: string
route: ANSWER_PAGE | ENTITY_CLUSTER | UTILITY_TOOL | RESEARCH_BACKLOG | HOLD | SKIP
user_job: string
demand_evidence:
  status: CONFIRMED | EARLY_SIGNAL | KEYWORD_VOLUME_UNKNOWN | INSUFFICIENT
  sources: string[]
data_dependency:
  required_entities: string[]
  missing_fields: string[]
handoff_skill: game-guide-product-architecture | null
next_action: string
publication_authorized: false
```

- [ ] **Step 4: Add only RED-justified hard rules**

At minimum, retain these approved invariants when their corresponding control failed:

```text
Credible demand + missing fields => executable acquisition task, never missing-data-only HOLD.
ENTITY_CLUSTER or UTILITY_TOOL => handoff_skill is game-guide-product-architecture.
No actual keyword volume => KEYWORD_VOLUME_UNKNOWN.
Routing never authorizes publication.
```

Do not add entity schemas, tool design, page-generation steps, or deployment instructions.

- [ ] **Step 5: Check that the old Skill did not inflate**

Run:

```bash
wc -w /tmp/game-seo-keyword-loop.SKILL.before.md /Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md
diff -u /tmp/game-seo-keyword-loop.SKILL.before.md /Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md
```

Expected: the diff is limited to route classification, handoff, missing-data actionability, and output shape. No architecture or publishing workflow is present.

---

### Task 3: Initialize the new Skill with only required resources

**Files:**
- Create: `/Users/jazfox/.codex/skills/game-guide-product-architecture/SKILL.md`
- Create: `/Users/jazfox/.codex/skills/game-guide-product-architecture/agents/openai.yaml`
- Create: `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/data-contract.md`
- Create: `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/evidence-gates.md`
- Create: `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/output-contracts.md`

**Interfaces:**
- Consumes: `OpportunityRoute` from Task 2
- Produces: a discoverable Skill scaffold with one-level references and no placeholder files

- [ ] **Step 1: Initialize the Skill**

Run from the Skill Creator directory:

```bash
python3 scripts/init_skill.py game-guide-product-architecture \
  --path /Users/jazfox/.codex/skills \
  --resources references \
  --interface display_name="Game Guide Product Architecture" \
  --interface short_description="Design evidence-governed game data products" \
  --interface default_prompt="Design the smallest evidence-governed entity or utility slice for this game-guide opportunity."
```

Expected: the Skill directory, `SKILL.md`, `agents/openai.yaml`, and `references/` exist.

- [ ] **Step 2: Remove generated placeholder reference files**

Use `apply_patch` to delete every generated example or placeholder file not in the approved file map.

Expected:

```text
SKILL.md
agents/openai.yaml
references/data-contract.md
references/evidence-gates.md
references/output-contracts.md
```

- [ ] **Step 3: Set discovery metadata**

Use exactly this frontmatter:

```yaml
---
name: game-guide-product-architecture
description: Use when a game-guide opportunity needs repeatable entities, relationships, field-level provenance, search/filter/compare/map/builder behavior, or a demanded Hub is blocked by missing structured data
---
```

The description states trigger conditions only; it does not summarize the workflow.

---

### Task 4: Write the minimal Skill and data-product references

**Files:**
- Modify: `/Users/jazfox/.codex/skills/game-guide-product-architecture/SKILL.md`
- Create: `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/data-contract.md`
- Create: `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/evidence-gates.md`
- Create: `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/output-contracts.md`
- Read: `docs/superpowers/results/2026-08-21-game-guide-product-architecture-red.md`

**Interfaces:**
- Consumes: `OpportunityRoute`, project evidence sources, user job, observed RED rationalizations
- Produces: `ProductDecision`, `DataAcquisitionTask[]`, `EntityContract`, `VerticalSlice`, `PublicationGate`

- [ ] **Step 1: Write the concise `SKILL.md` core**

Keep the body below 500 lines and organize it in this order:

```text
Overview
Core principle
Boundary with game-seo-keyword-loop
Workflow: user job → source inventory → minimal entities → acquisition tasks → slice → shared consumers → gate
Required output order
Stop states
Observed rationalizations and counters
Quick reference
Common mistakes
Reference routing
```

The core principle must appear verbatim:

```text
Any opportunity blocked by missing data must become an executable data-acquisition task, not remain in HOLD; any opportunity with demand must not bypass evidence and the shared data model to become a page.
```

- [ ] **Step 2: Write `references/data-contract.md`**

Copy the approved `EvidenceLevel`, `PublicField<T>`, `SourceRecord`, `CharacterRecord`, `SkillRecord`, `CombatStatusRecord`, `BuildRecommendationRecord`, and `TeamRelationRecord` contracts from design sections 8.1–8.3. Add these reference-integrity rules:

```text
Every referenced ID resolves exactly once.
No canonical fact is duplicated in a consumer record.
Required public fields are 100% eligible.
Optional absent fields are omitted, never rendered as filler.
Pilot candidate count is 1–3.
```

- [ ] **Step 3: Write `references/evidence-gates.md`**

Define:

```text
A_FIRST_HAND: reproducible first-hand observation within a named version.
B_OFFICIAL: only facts explicitly supported by an official source.
C_COMMUNITY: discovery/terminology; production only as sourced, labeled editorial judgment.
```

Define the validator decision sequence:

```text
value non-empty
→ source non-empty
→ evidence level valid for claim type
→ game version non-empty and current for version-sensitive fields
→ last_verified is YYYY-MM-DD
→ public_allowed is true
→ editorial judgment label agrees with claim type
→ referenced IDs resolve
→ eligible or research-only
```

Define only these publication decisions: `RESEARCH_REQUIRED`, `DATA_CONTRACT_READY`, `DRAFT_READY`, `APPROVAL_REQUIRED`, `REJECTED`. State that none authorizes publication.

- [ ] **Step 4: Write `references/output-contracts.md`**

Include the exact `OpportunityRoute` and `DataAcquisitionTask` contracts from design sections 5.2 and 7. Define the new Skill output order exactly as:

```text
ProductDecision
UserJob
SourceInventory
EntityContract
EvidenceGaps
DataAcquisitionTasks
VerticalSlice
SharedConsumers
PublicationGate
NextReviewTrigger
```

- [ ] **Step 5: Add only observed rationalization counters**

For each rationalization recorded in the RED results, add one direct counter to `SKILL.md`. Do not add hypothetical warnings that did not occur in control runs.

- [ ] **Step 6: Validate structure and token economy**

Run:

```bash
wc -l /Users/jazfox/.codex/skills/game-guide-product-architecture/SKILL.md
wc -w /Users/jazfox/.codex/skills/game-guide-product-architecture/SKILL.md
find /Users/jazfox/.codex/skills/game-guide-product-architecture -maxdepth 2 -type f -print | sort
```

Expected: `SKILL.md` is under 500 lines; only the five approved files exist; heavy contracts live in references instead of duplicating the Skill body.

---

### Task 5: Run GREEN tests and close observed loopholes

**Files:**
- Read: `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-negative-tests.md`
- Read: `/Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md`
- Read: `/Users/jazfox/.codex/skills/game-guide-product-architecture/SKILL.md`
- Create: `docs/superpowers/results/2026-08-21-game-guide-product-architecture-green.md`
- Modify if tests fail: the smallest relevant Skill or reference file from Tasks 2–4

**Interfaces:**
- Consumes: the same 12 prompts used in RED plus both changed Skills
- Produces: 60 guided scores, observed post-guidance rationalizations, focused refactors, and the Sprint 0 test verdict

- [ ] **Step 1: Create the GREEN result shell**

Use this exact structure:

```markdown
# Game Guide Product Architecture GREEN Verification

**Router:** changed `game-seo-keyword-loop`
**Product Skill:** `game-guide-product-architecture`
**Runs per scenario:** 5

## Run index
| Scenario | Run | Artifact | Result | Failed assertions |
|---|---:|---|---|---|

## New rationalizations

## Refactor iterations

## Final assertion matrix

## GREEN verdict
```

- [ ] **Step 2: Run five fresh guided attempts for each scenario**

For `ANSWER_PAGE` scenarios, provide the router Skill. For `ENTITY_CLUSTER`, `UTILITY_TOOL`, and `RESEARCH_BACKLOG` scenarios, provide both Skills through the normal routing sequence. Do not give agents the scoring rubric or expected answer.

Expected: 60 individually scored guided runs.

- [ ] **Step 3: Refactor only on observed failure**

When a guided run fails, record the exact rationalization, identify whether the failure is route shape, evidence, scope, actionability, or reuse, and make the smallest corresponding change. Rerun all five attempts for that scenario after the change.

Expected: no unrelated Skill expansion.

- [ ] **Step 4: Verify all hard assertions**

Run:

```bash
rg -n "FAIL_|NOT_RUN|unscored|missing artifact" docs/superpowers/results/2026-08-21-game-guide-product-architecture-green.md
```

Expected: no unresolved failure or missing-run matches in the final assertion matrix.

---

### Task 6: Freeze the DragonSword Sprint 1 data contract

**Files:**
- Create: `docs/product/dragon-sword-character-build-team-data-contract.md`
- Read: `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-design.md`
- Read: `/Users/jazfox/.codex/skills/game-guide-product-architecture/references/data-contract.md`
- Read: `src/data/characters.ts`
- Read: `src/data/sources.ts`

**Interfaces:**
- Consumes: the verified generic `PublicField<T>` and entity contracts
- Produces: the exact project-local contract that a later Sprint 1 implementation must follow

- [ ] **Step 1: Document current-to-target mapping**

Map current fields without migrating them:

```text
reportedRoster[]       → research-only candidate names
previewCharacters[]    → research-only candidate summaries
sourceUrls             → candidate inputs for SourceRecord, not automatic field evidence
```

State explicitly that existing arrays remain unchanged in Sprint 0.

- [ ] **Step 2: Copy the approved TypeScript contracts exactly**

Include `EvidenceLevel`, `PublicField<T>`, `SourceRecord`, `CharacterRecord`, `SkillRecord`, `CombatStatusRecord`, `BuildRecommendationRecord`, and `TeamRelationRecord` from the verified Skill reference. Do not add UI fields or route metadata.

- [ ] **Step 3: Define candidate-selection and completeness gates**

Record these exact gates:

```text
Candidate count: 1–3.
Selection basis: required-field evidence completeness, demonstrable team relation, non-generic Build rationale, reuse across 3+ consumers, maintenance cost.
Required-field eligibility: 100%.
Broken references allowed: 0.
Unsourced public fields allowed: 0.
Production routes created in Sprint 0: 0.
```

- [ ] **Step 4: Define the Sprint 1 handoff**

The document must require Sprint 1 to start with failing deterministic contract tests and end before any public page change. It must list these future validator behaviors:

```text
reject empty source
reject invalid evidence/claim pairing
reject unknown or empty game version
reject non-ISO verification date
reject public_allowed=false
reject unresolved IDs
reject more than three pilot characters
reject duplicated canonical facts in consumer records
```

This is a contract, not implementation authorization.

---

### Task 7: Validate the Skills and close Sprint 0

**Files:**
- Read: all files from the File map
- Modify only if validation fails: the exact failing Skill metadata or contract line

**Interfaces:**
- Consumes: final Skills, RED/GREEN evidence, and DragonSword contract
- Produces: a binary Sprint 0 acceptance verdict and a stop before Sprint 1

- [ ] **Step 1: Run Skill structural validation**

Run:

```bash
python3 /Users/jazfox/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/jazfox/.codex/skills/game-guide-product-architecture
python3 /Users/jazfox/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/jazfox/.codex/skills/game-seo-keyword-loop
```

Expected: both commands exit successfully.

- [ ] **Step 2: Verify forbidden production changes are absent**

Run:

```bash
git diff -- src/pages src/components src/data src/layouts public astro.config.mjs
git status --short
```

Expected: no diff under production paths; only explicitly created Sprint 0 documentation is new in the repository.

- [ ] **Step 3: Run design-contract checks**

Run:

```bash
rg -n "source|evidence_level|game_version|last_verified|public_allowed|editorial_judgment" \
  docs/product/dragon-sword-character-build-team-data-contract.md
rg -n "publication_authorized: false|APPROVAL_REQUIRED|RESEARCH_REQUIRED" \
  /Users/jazfox/.codex/skills/game-guide-product-architecture
rg -n "ENTITY_CLUSTER|UTILITY_TOOL|RESEARCH_BACKLOG|KEYWORD_VOLUME_UNKNOWN" \
  /Users/jazfox/.codex/skills/game-seo-keyword-loop/SKILL.md
```

Expected: every required contract term is present in its owning artifact.

- [ ] **Step 4: Self-review spec coverage and placeholders**

Run:

```bash
rg -n "TB[D]|TO[D]O|implement[[:space:]]+later|fill[[:space:]]+in[[:space:]]+details|similar[[:space:]]+to[[:space:]]+Task" \
  docs/superpowers/specs/2026-08-20-game-guide-product-architecture-design.md \
  docs/superpowers/specs/2026-08-20-game-guide-product-architecture-negative-tests.md \
  docs/superpowers/plans/2026-08-21-game-guide-product-architecture-sprint-0.md \
  docs/product/dragon-sword-character-build-team-data-contract.md
```

Expected: no matches.

- [ ] **Step 5: Check exact-path staging**

Run:

```bash
git diff --check
git status --short
```

Stage only tracked Sprint 0 artifacts. Do not use `git add -A`.

- [ ] **Step 6: Commit tracked Sprint 0 artifacts**

```bash
git add \
  docs/superpowers/specs/2026-08-20-game-guide-product-architecture-design.md \
  docs/superpowers/specs/2026-08-20-game-guide-product-architecture-negative-tests.md \
  docs/superpowers/plans/2026-08-21-game-guide-product-architecture-sprint-0.md \
  docs/superpowers/results/2026-08-21-game-guide-product-architecture-red.md \
  docs/superpowers/results/2026-08-21-game-guide-product-architecture-green.md \
  docs/product/dragon-sword-character-build-team-data-contract.md
git commit -m "docs: define evidence-governed game product architecture"
```

- [ ] **Step 7: Stop at the Sprint 1 gate**

Report:

```text
Sprint 0 verdict: PASS or FAIL
Router Skill validation: PASS or FAIL
Product Skill validation: PASS or FAIL
Negative tests: passed runs / total runs
Production path diff: empty or non-empty
New URLs: 0
Team Builder UI changes: 0
Pilot characters selected: 0
Sprint 1 authorization: NOT GRANTED
```

Do not begin data implementation, candidate research, page work, or UI work.

---

## Plan self-review

- Spec coverage: each design boundary maps to Tasks 2–7.
- TDD integrity: Task 1 is a mandatory predecessor to all Skill edits.
- Scope separation: the router, product Skill, and DragonSword contract are independently reviewable.
- Type consistency: `OpportunityRoute`, `DataAcquisitionTask`, `PublicField<T>`, and publication decisions match the approved design.
- Publication safety: all paths stop at `APPROVAL_REQUIRED`; no deployment task exists.
- Production freeze: no task modifies `src/pages`, `src/components`, `src/data`, `public`, sitemap, or navigation.
- Sprint boundary: this plan stops before Sprint 1.
