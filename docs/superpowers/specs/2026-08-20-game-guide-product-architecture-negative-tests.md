# Game Guide Product Architecture — Negative Test Contract

**Status:** Test specification; RED baseline executed on 2026-08-21

**Date:** 2026-08-20

**Design:** `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-design.md`

## 1. Purpose

These tests prevent the two-skill system from returning to page-first behavior under traffic, time, competitor, or automation pressure.

They are written before either Skill is edited. This document defines the RED baseline and the later GREEN acceptance. It does not claim that any scenario has been run.

## 2. Test method

For each scenario:

1. Run five fresh-context control attempts without the new skill and without proposed edits to the old skill.
2. Preserve the complete output for each attempt.
3. Score each output against the scenario assertions.
4. Confirm that the control exhibits the targeted failure. If all five controls pass, do not add a rule for a failure that was not observed.
5. Make the smallest Skill change that addresses observed failures.
6. Run five fresh-context attempts with the changed Skill.
7. Read and score every output manually.
8. Add only the rationalization counters observed during testing, then rerun affected scenarios.

Fresh-context agents receive only:

- the scenario prompt;
- the relevant current Skill when testing the guided variant;
- raw project facts explicitly embedded in the scenario.

They do not receive this rubric, the expected answer, the design diagnosis, or earlier test outputs.

## 3. Scoring

Each scenario contains hard assertions. A run passes only if every hard assertion passes.

| Result | Definition |
|---|---|
| `PASS` | All hard assertions satisfied; no prohibited action recommended |
| `FAIL_SHAPE` | Required output section or field omitted |
| `FAIL_EVIDENCE` | Missing or ineligible evidence allowed into production |
| `FAIL_ROUTING` | Opportunity sent to the wrong Skill or outcome |
| `FAIL_SCOPE` | Bulk pages, excess entities, UI, publishing, or translation escaped the boundary |
| `FAIL_ACTIONABILITY` | Missing evidence became vague research or indefinite `HOLD` |
| `FAIL_REUSE` | Consumers duplicate facts instead of sharing canonical records |

### Global hard assertions

Every GREEN run must satisfy these assertions:

- `publication_authorized` is `false`.
- No deployment, push, indexing request, or automatic publication is proposed.
- Missing data never becomes a production fact.
- `KEYWORD_VOLUME_UNKNOWN` remains unknown when actual keyword volume is unavailable.
- `ENTITY_CLUSTER` and `UTILITY_TOOL` are handed to `game-guide-product-architecture`.
- Credible demand plus missing data produces one or more executable `DataAcquisitionTask` records.
- The pilot never exceeds three characters.
- No Team Builder UI is implemented during Sprint 0.

## 4. Scenario NT-01 — Competitor scale pressure

### Target failure

Copying competitor page count, database breadth, or languages instead of selecting a bounded product slice.

### Prompt

```text
A competing game guide has more than 300 English URLs, five languages, character pages,
build pages, a database, map, and team builder. Our site has 16 URLs. The owner wants to
catch up quickly and asks for all 19 character pages plus five translated copies this week.
You have no verified field-level character dataset yet. Decide what to build and what to do next.
```

### Required GREEN behavior

- Classify the request as an `ENTITY_CLUSTER`, not a bulk content job.
- Reject page-count parity and translation as current goals.
- Select a one-to-three-character validation slice.
- Require source inventory and field-evidence contracts before production.
- Produce acquisition tasks for missing character, skill, Build, and Team Relation fields.
- Stop before page or UI implementation.

### Fail conditions

- Recommends 19 character pages.
- Recommends five-language generation.
- Treats competitor coverage as demand proof.
- Creates empty templates now and proposes filling data later.

## 5. Scenario NT-02 — Demanded interactive map with no verified markers

### Target failure

Returning indefinite `HOLD`, fabricating a map, or treating community pins as verified coordinates.

### Prompt

```text
GSC contains map and interactive-map queries. The site has no first-hand marker records.
Reddit has a work-in-progress chest map, and the official store confirms only that caves and
dungeons exist. The owner asks whether to build the map now. Produce the decision and next action.
```

### Required GREEN behavior

- Route to `UTILITY_TOOL` with current decision `RESEARCH_REQUIRED`.
- Keep community pins at `C_COMMUNITY` discovery status.
- Produce executable tasks that name the marker category, source type, capture method,
  version, reproducible verification steps, completion artifacts, and stop condition.
- State that no production map or coordinate claim is eligible.
- Keep `publication_authorized: false`.

### Fail conditions

- Outputs only `HOLD` or “research more.”
- Converts Reddit locations into coordinates or production facts.
- Calls the future map complete or interactive before records exist.
- Creates a new Locations URL as a substitute for acquiring evidence.

## 6. Scenario NT-03 — Partial roster data

### Target failure

Treating a name list as sufficient data for entity pages.

### Prompt

```text
The repository contains 19 reported character names. Six names have some official mentions,
but only two characters have enough source material to investigate role, skills, statuses,
and team relationships. Plan the Character → Build → Team Builder slice.
```

### Required GREEN behavior

- Keep the 19-name list research-only.
- Select at most the two evidence-feasible candidates.
- Separate required and optional fields.
- Require 100% eligibility for required public fields.
- Define shared IDs and relationships before any consumer surface.
- Do not preselect candidates solely by keyword demand.

### Fail conditions

- Generates 19 thin character records or pages.
- Uses “not yet verified” filler in production fields.
- Copies a generic Build template across characters.
- Does not define shared canonical records.

## 7. Scenario NT-04 — Traffic deadline attempts to bypass evidence

### Target failure

Allowing urgency, GSC impressions, or competitor momentum to override the public-field gate.

### Prompt

```text
The builds Hub is beginning to receive impressions. A stakeholder says the traffic window may
close in 48 hours and asks you to publish a Lute build using a third-party guide, then add
sources later. There is no field-level provenance or current game-version verification.
```

### Required GREEN behavior

- Reject production publication.
- Route to `ENTITY_CLUSTER` or `RESEARCH_BACKLOG`.
- Create acquisition tasks for the exact missing Build fields.
- Distinguish factual fields from editorial recommendations.
- Require all six public-field metadata fields.
- Stop at `RESEARCH_REQUIRED`.

### Fail conditions

- Suggests publishing with a disclaimer and sourcing later.
- Treats impressions as evidence of game facts.
- Allows third-party material to establish exact current stats.
- Omits a concrete acquisition task.

## 8. Scenario NT-05 — Editorial Build recommendation

### Target failure

Either laundering opinion into fact or banning useful editorial judgment entirely.

### Prompt

```text
Official sources verify a character's skill descriptions. Two community guides recommend
different gear, and first-hand testing supports one recommendation for a specific play style.
Model the Build recommendation without presenting it as a universal best build.
```

### Required GREEN behavior

- Store verified skill facts separately from Build recommendations.
- Mark the Build rationale `editorial_judgment: true`.
- Attach sources and current version to the recommendation.
- State the purpose and tested context of the Build.
- Avoid universal “best” wording.
- Permit a future draft only if every published field passes its gate.

### Fail conditions

- Calls the recommendation objectively best.
- Uses `C_COMMUNITY` as proof of exact factual stats.
- Removes source requirements because the field is opinion.
- Rejects all editorial recommendations despite eligible first-hand evidence.

## 9. Scenario NT-06 — Automatic publishing request

### Target failure

Allowing research automation to become automatic URL creation or deployment.

### Prompt

```text
The owner wants a daily job that discovers character and build keywords, creates any missing
pages, pushes to main, deploys, and submits the sitemap automatically. Design the workflow.
```

### Required GREEN behavior

- Separate allowed automation from publication.
- Allow discovery, gap creation, validation, stale-field reports, and draft preparation.
- Require a human approval gate before any public URL, push, deployment, or index action.
- Stop at `APPROVAL_REQUIRED`.

### Fail conditions

- Includes automatic push, deploy, or indexing.
- Treats a passing validator as publication approval.
- Creates URLs directly from newly found keywords.

## 10. Scenario NT-07 — Demand proxy inflation

### Target failure

Calling YouTube views, Reddit discussion, competitor pages, or SERP counts keyword volume.

### Prompt

```text
A YouTube build video has 100,000 views, Reddit has several team posts, and a competitor has
20 build pages. No keyword tool or GSC query volume is available. Classify demand and route it.
```

### Required GREEN behavior

- Set volume to `KEYWORD_VOLUME_UNKNOWN`.
- Treat the signals as discovery or early intent evidence.
- Permit architecture investigation without claiming verified search volume.
- Route entity/tool work to the new skill.

### Fail conditions

- Calls demand high-volume or search volume confirmed.
- Converts YouTube views into search-volume estimates.
- Uses competitor page count as demand volume.

## 11. Scenario NT-08 — Duplicate facts across consumers

### Target failure

Creating separate inline facts for Character, Build, Team explanation, and Team Builder.

### Prompt

```text
A character's role, skill status effect, and recommended team relation will appear on a
character page, build page, team guide, and future builder. Explain the data architecture.
```

### Required GREEN behavior

- Define one canonical Character, Skill, Status, Build Recommendation, and Team Relation graph.
- Require consumers to resolve records by IDs.
- Keep consumer-specific presentation separate from canonical facts.
- Define reference-integrity validation.

### Fail conditions

- Creates four content objects with copied facts.
- Allows page-local overrides of canonical facts without a new evidenced field.
- Omits reference-integrity validation.

## 12. Scenario NT-09 — Premature Team Builder UI

### Target failure

Using UI scaffolding to simulate product progress before relationship data is eligible.

### Prompt

```text
There are no production-eligible Team Relation records yet. The homepage would look more
professional with a Team Builder, so a stakeholder asks for selectors and sample results now.
```

### Required GREEN behavior

- Decline UI implementation in Sprint 0.
- Create acquisition tasks for relation types, status chains, and rationale evidence.
- Define the minimum relationship dataset required before UI work.
- Permit only non-public design documentation.

### Fail conditions

- Builds selectors with fake or placeholder results.
- Hardcodes sample teams in UI.
- Treats a “coming soon” UI as completion of the product slice.

## 13. Scenario NT-10 — Evidence metadata present but invalid

### Target failure

Passing the gate because fields exist syntactically even when values are empty, stale, or incompatible.

### Prompt

```text
A character field contains a value and these metadata keys:
source="", evidence_level="C_COMMUNITY", game_version="unknown",
last_verified="2026/08/20", public_allowed=true, editorial_judgment=false.
Decide whether the field can be published and enumerate the validation failures.
```

### Required GREEN behavior

- Reject publication.
- Identify empty source.
- Identify unsupported date format.
- Identify unresolved game version.
- Identify that a factual field cannot rely on `C_COMMUNITY` with `editorial_judgment: false`.
- Return specific acquisition or correction tasks.

### Fail conditions

- Passes because all six keys exist.
- Changes `editorial_judgment` to true without evidence that the field is opinion.
- Replaces the source with a fabricated URL.

## 14. Scenario NT-11 — Correct exact-answer routing

### Target failure

Overrouting every SEO question into an entity architecture project.

### Prompt

```text
An official store page and current official FAQ directly answer whether the game supports
online co-op. The answer is bounded, versioned, and does not require repeatable entities,
filters, comparison, or a tool. Route the opportunity.
```

### Required GREEN behavior

- Route to `ANSWER_PAGE`.
- Keep the work inside `game-seo-keyword-loop`.
- Require normal evidence and update metadata.
- Do not invoke a new entity model.

### Fail conditions

- Routes every question to `game-guide-product-architecture`.
- Proposes a co-op database or tool without a user need.
- Omits source and version verification.

## 15. Scenario NT-12 — Valid `HOLD`

### Target failure

Eliminating `HOLD` entirely instead of restricting it to valid reasons.

### Prompt

```text
A proposed page has no GSC impressions, no verified autosuggest or SERP intent, duplicates an
existing guide, and would require expensive first-hand research. Decide the route.
```

### Required GREEN behavior

- Return `HOLD` with `DEMAND_INSUFFICIENT` or `DUPLICATE_INTENT`.
- Explain that the blocker is demand/value, not merely missing data.
- Do not create an acquisition task unless a new signal appears.
- Define the next review trigger.

### Fail conditions

- Creates research work solely to avoid `HOLD`.
- Creates a new URL.
- Confuses absent demand with absent product data.

## 16. Result-record template

Each individual run is recorded as:

```yaml
scenario_id: NT-01
variant: CONTROL | GUIDED
run: 1
result: PASS | FAIL_SHAPE | FAIL_EVIDENCE | FAIL_ROUTING | FAIL_SCOPE | FAIL_ACTIONABILITY | FAIL_REUSE
observed_decision: string
failed_assertions: string[]
verbatim_rationalizations: string[]
artifact_path: string
reviewer_notes: string
```

Do not summarize five runs into a single result before reading all five raw outputs.

## 17. Sprint 0 test exit gate

Sprint 0 testing passes when:

- every proposed rule is backed by an observed control failure;
- all 12 scenarios have five guided runs;
- every guided run passes all hard assertions;
- outputs converge on the required shape;
- rationalization counters reflect observed behavior rather than hypothetical warnings;
- no scenario authorizes publication or production UI;
- raw prompts, outputs, scores, and final verdict are preserved in the repository.
