# Game Guide Product Architecture — Skill Design

**Status:** Approved direction; design only

**Date:** 2026-08-20

**Pilot:** DragonSwordGuide

**First vertical slice:** Character → Build → Team Relation → Team Builder

**Companion negative tests:** `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-negative-tests.md`

## 1. Decision

Keep `game-seo-keyword-loop` small. It remains the opportunity discovery and routing skill. Add a separate `game-guide-product-architecture` skill for data-product design and evidence-governed vertical slices.

The first pilot proves that one to three verified character records can drive Character, Build, Team Relation, and a future Team Builder from the same structured data. Sprint 0 does not change production pages, create URLs, or implement Team Builder UI.

## 2. Core principle

> Any opportunity blocked by missing data must become an executable data-acquisition task, not remain in `HOLD`; any opportunity with demand must not bypass evidence and the shared data model to become a page.

This principle is a hard gate. It is not guidance that an implementer may weaken for speed, traffic, competitor pressure, or apparent completeness.

## 3. Problem being solved

The current SEO loop can discover demand, score keywords, map URLs, and review GSC feedback. It cannot reliably decide when an opportunity is a reusable data product rather than an answer page, and it has no required bridge from missing evidence to data acquisition.

That produces two failure modes:

1. A demanded entity or tool is reduced to a thin Hub or generic article.
2. Missing evidence becomes an indefinite `HOLD`, so the product layer never starts.

The new architecture separates four concerns:

| Concern | Owner |
|---|---|
| Demand discovery, opportunity classification, routing, URL feedback | `game-seo-keyword-loop` |
| Entity model, field provenance, vertical slice, shared product capabilities | `game-guide-product-architecture` |
| Project-specific data and validation | DragonSwordGuide repository |
| Publication, deployment, index submission | Existing approval-gated release workflow; out of scope here |

## 4. Non-negotiable boundaries

### 4.1 `game-seo-keyword-loop` remains narrow

It may:

- discover and score opportunities;
- classify intent and demand evidence;
- recommend an exact-answer page;
- route an entity cluster or utility tool to the product-architecture skill;
- review GSC feedback and feed validated opportunities back into routing.

It must not:

- define game entity schemas;
- invent fields or game data;
- design tool internals;
- create product UI;
- manage automatic publication;
- absorb the full product-architecture workflow.

### 4.2 `game-guide-product-architecture` manages data products, not publishing

It owns:

- user task definition;
- entity and relationship modeling;
- source inventory and evidence classification;
- field completeness and publication eligibility;
- executable data-acquisition tasks;
- vertical-slice selection;
- rules for reusing one dataset across pages and tools;
- versioning, staleness, and update workflow;
- draft readiness and publication-gate output.

It does not:

- deploy;
- push or merge;
- submit indexing requests;
- create production URLs without a separate approval;
- mass-generate translations;
- automatically publish discovered opportunities;
- calculate keyword volume from proxies.

### 4.3 DragonSword pilot remains deliberately small

The pilot contains one to three characters selected by source completeness, not by a desire to cover the roster. It does not claim complete character coverage or a complete meta.

The pilot proves these relationships:

```text
Character
  ├── has Skill
  ├── applies / consumes Combat Status
  ├── uses Equipment and Karma in Build Recommendation
  └── participates in Team Relation

The same records feed:
  Character detail → Build view → Team explanation → future Team Builder
```

### 4.4 Field-level evidence is mandatory

Every public field must carry:

- `source`
- `evidence_level`
- `game_version`
- `last_verified`
- `public_allowed`
- `editorial_judgment`

No source means no production field.

## 5. Routing contract for `game-seo-keyword-loop`

The current `build / watchlist / skip` verdict is replaced by a typed opportunity route.

### 5.1 Route types

| Route | Use when | Owner after routing |
|---|---|---|
| `ANSWER_PAGE` | A bounded question can be answered from verified facts without a reusable entity system | `game-seo-keyword-loop` |
| `ENTITY_CLUSTER` | The intent depends on repeatable entities, relationships, filters, or multiple detail views | `game-guide-product-architecture` |
| `UTILITY_TOOL` | The user must search, compare, calculate, assemble, locate, or simulate an outcome | `game-guide-product-architecture` |
| `RESEARCH_BACKLOG` | Demand is credible but required production data is missing | Data-acquisition workflow |
| `HOLD` | Demand itself is insufficient, the opportunity is out of scope, or an external blocker makes the acquisition task non-actionable | Review loop |
| `SKIP` | The opportunity is unsafe, irrelevant, duplicative, or cannot produce distinct user value | Closed |

### 5.2 Required routing output

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

### 5.3 Missing-data rule

If `demand_evidence.status` is `CONFIRMED` or `EARLY_SIGNAL` and `missing_fields` is non-empty, the output must include a `DataAcquisitionTask` and the route must be `RESEARCH_BACKLOG`, `ENTITY_CLUSTER`, or `UTILITY_TOOL`. Missing data alone cannot produce `HOLD`.

`HOLD` is valid only when one of these reasons is explicit:

- `DEMAND_INSUFFICIENT`
- `OUT_OF_SCOPE`
- `DUPLICATE_INTENT`
- `EXTERNAL_BLOCKER_NON_ACTIONABLE`
- `RISK_EXCEEDS_VALUE`

## 6. New `game-guide-product-architecture` skill contract

### 6.1 Trigger conditions

Use the new skill when a game-site opportunity involves:

- character, item, skill, quest, location, build, team, status, or versioned entities;
- search, filter, compare, map, calculator, builder, planner, or database behavior;
- repeated facts across more than one page or tool;
- a Hub that cannot solve its user task because the underlying data is missing;
- competitor scale that should be reduced to a feasible vertical slice;
- evidence or versioning requirements at field level.

Do not use it for a single bounded answer page that does not need a reusable data model.

### 6.2 Workflow

1. Define the user job and a concrete completion test.
2. Inventory sources, permissions, versions, and missing fields.
3. Define only the entities and relationships required by the chosen job.
4. Convert every evidence gap into an executable `DataAcquisitionTask`.
5. Score candidate vertical slices by task value, evidence feasibility, reuse leverage, and maintenance cost.
6. Select the smallest slice that can complete a real task.
7. Define field completeness and publication gates.
8. Define which pages and tools consume the same records.
9. Define version and staleness handling.
10. Return a draft-readiness decision; never publish.

### 6.3 Required outputs

Every run returns these sections in order:

1. `ProductDecision`
2. `UserJob`
3. `SourceInventory`
4. `EntityContract`
5. `EvidenceGaps`
6. `DataAcquisitionTasks`
7. `VerticalSlice`
8. `SharedConsumers`
9. `PublicationGate`
10. `NextReviewTrigger`

The fixed shape prevents an agent from returning a generic site map while omitting the acquisition work or evidence gate.

## 7. Executable data-acquisition task

Every demanded but missing field must map to a task with this contract:

```yaml
task_id: string
opportunity_id: string
target_entities: string[]
required_fields: string[]
acceptable_sources:
  - evidence_level: A_FIRST_HAND | B_OFFICIAL | C_COMMUNITY
    source_type: string
acquisition_method: string
verification_steps: string[]
completion_evidence: string[]
stop_condition: string
status: READY | BLOCKED_EXTERNAL | COMPLETE | REJECTED
```

Rules:

- `acquisition_method` must name a real action such as inspect an official patch note, capture an in-game skill panel, or reproduce a combat chain.
- `verification_steps` must be repeatable by another reviewer.
- `completion_evidence` must specify the artifact required, such as source URL, screenshot reference, version, and observation notes.
- `stop_condition` prevents endless research.
- `BLOCKED_EXTERNAL` must identify the unavailable access or artifact; it cannot be shorthand for “research needed.”

## 8. DragonSword field-evidence contract

### 8.1 Evidence levels

| Value | Meaning | Permitted production use |
|---|---|---|
| `A_FIRST_HAND` | Reproducible first-hand gameplay observation or capture | Factual or measured field within the observed version |
| `B_OFFICIAL` | Developer, publisher, official store, official patch note, or official in-game text | Only the fact explicitly supported by the source |
| `C_COMMUNITY` | Community post, video, third-party guide, or competitor | Discovery and terminology; opinion may be published only as labeled editorial judgment |

Community evidence cannot establish exact stats, completeness, official status, coordinates, or universal “best” claims.

### 8.2 Generic public field

```ts
export type EvidenceLevel = 'A_FIRST_HAND' | 'B_OFFICIAL' | 'C_COMMUNITY';

export interface PublicField<T> {
  value: T;
  source: string;
  evidence_level: EvidenceLevel;
  game_version: string;
  last_verified: string; // YYYY-MM-DD
  public_allowed: boolean;
  editorial_judgment: boolean;
}
```

Production eligibility requires all six metadata fields plus a non-empty value.

Additional rules:

- `public_allowed` must be `true`.
- `source`, `game_version`, and `last_verified` must be non-empty.
- Factual fields require `A_FIRST_HAND` or `B_OFFICIAL`.
- `C_COMMUNITY` requires `editorial_judgment: true` and explicit user-facing labeling as opinion or community-reported.
- `editorial_judgment: true` cannot override a missing source.
- A version-sensitive field becomes stale when the game version changes until reverified.

### 8.3 Minimum pilot entities

```ts
export interface SourceRecord {
  id: string;
  url: string;
  title: string;
  publisher: string;
  evidence_level: EvidenceLevel;
  accessed_at: string;
  public_allowed: boolean;
}

export interface CharacterRecord {
  id: string;
  slug: string;
  name: PublicField<string>;
  role: PublicField<string>;
  summary: PublicField<string>;
  skill_ids: string[];
  status_ids: string[];
  build_ids: string[];
  team_relation_ids: string[];
}

export interface SkillRecord {
  id: string;
  character_id: string;
  name: PublicField<string>;
  description: PublicField<string>;
  cooldown_seconds?: PublicField<number>;
  applies_status_ids: string[];
}

export interface CombatStatusRecord {
  id: string;
  name: PublicField<string>;
  description: PublicField<string>;
}

export interface BuildRecommendationRecord {
  id: string;
  character_id: string;
  purpose: PublicField<string>;
  skill_priority: PublicField<string[]>;
  equipment_ids: string[];
  karma_ids: string[];
  rationale: PublicField<string>;
}

export interface TeamRelationRecord {
  id: string;
  from_character_id: string;
  to_character_id: string;
  relation_type: 'STARTER_CONNECTOR' | 'CONNECTOR_FINISHER' | 'SUPPORTS';
  status_ids: string[];
  rationale: PublicField<string>;
}
```

Equipment and Karma records use the same `PublicField<T>` wrapper. They are included only when the selected one-to-three-character slice has eligible source data.

### 8.4 Completeness gate

For each pilot character:

- all required fields in `CharacterRecord` must be production-eligible;
- every referenced ID must resolve;
- every Build and Team rationale must have its own field evidence;
- all required fields must reach 100% completeness;
- optional fields may be absent, but cannot appear publicly as unknown filler;
- a character with incomplete required fields remains research-only and receives no production route.

## 9. First vertical slice

### 9.1 Selection rule

Select one to three characters after source inventory. Do not preselect names solely from search demand or competitor coverage.

Rank candidates by:

1. required-field evidence completeness;
2. ability to demonstrate a real status or team relationship;
3. ability to support a non-generic Build rationale;
4. reuse across at least three consumers;
5. expected maintenance cost.

### 9.2 Required shared consumers

The slice is architecturally valid only if the same canonical records can feed:

- Character presentation;
- Build presentation;
- Team-relation explanation;
- future Team Builder logic.

No consumer may carry a separate inline copy of a canonical fact.

### 9.3 User completion tests

The slice must be able to answer, from eligible data:

- What role does this character play?
- Which verified skills or statuses define that role?
- What is the purpose of this Build recommendation?
- Why do two characters connect in a team chain?
- Which part is fact and which part is editorial judgment?

## 10. Publication gate

The product-architecture skill returns one of:

| Decision | Meaning |
|---|---|
| `RESEARCH_REQUIRED` | Acquisition tasks exist; no draft is eligible |
| `DATA_CONTRACT_READY` | Schema and gates are stable; records are not yet eligible |
| `DRAFT_READY` | A bounded draft may be prepared from eligible fields |
| `APPROVAL_REQUIRED` | Draft and acceptance evidence are ready for human publication approval |
| `REJECTED` | The slice is unsafe, duplicative, infeasible, or not useful |

None of these decisions authorizes publication. `APPROVAL_REQUIRED` is a stop state.

## 11. Update and staleness workflow

```text
Version/source change detected
  → identify affected fields and relationships
  → mark fields NEEDS_RECHECK
  → create acquisition tasks
  → reverify and update metadata
  → validate completeness and references
  → prepare review evidence
  → stop at APPROVAL_REQUIRED
```

Automation may detect changes, validate records, prepare drafts, and report stale fields. It may not invent facts, create bulk URLs, publish, deploy, translate at scale, or change rankings without approval.

## 12. What to learn from the reference competitor

Learn:

- entity detail that answers a concrete task;
- one data graph feeding Character, Build, team logic, filters, and search;
- product navigation rather than isolated articles;
- explicit trust, source, editorial, and correction surfaces;
- incremental additions from structured records.

Do not learn:

- page count as a goal;
- unverified database totals;
- immediate five-language expansion;
- third-party claims presented as first-party facts;
- universal “best” rankings without versioned editorial evidence;
- automated keyword-to-page-to-deploy pipelines.

## 13. Phase roadmap

| Phase | Deliverable | Exit gate |
|---|---|---|
| Sprint 0 | Two-skill contract, RED/GREEN negative tests, evidence schema, routing and publication gates | All negative tests pass; no production changes |
| Sprint 1 | DragonSword typed records and deterministic validation for one to three candidates | Required fields and references validate; no new URL |
| Sprint 2 | One internal vertical slice consuming shared records | Character, Build, and Team Relation use the same data; still no publication without approval |
| Sprint 3 | Approved production Character and Build surfaces | User completion tests pass; exact paths approved |
| Sprint 4 | Approved Team Builder UI backed only by eligible records | No inline duplicate facts; relationship logic validated |
| Sprint 5 | Operational ingestion, stale-field reporting, and draft workflow | Automation stops at `APPROVAL_REQUIRED` |
| Sprint 6 | Evidence-led expansion; map handled as a separate data product | Expansion justified by demand, completeness, and maintenance capacity |

Each sprint stops for its own acceptance gate. Completing a sprint does not authorize the next sprint.

## 14. Sprint 0 acceptance

Sprint 0 passes only when all statements are true:

- The old skill routes but does not absorb product architecture.
- The new skill does not publish or deploy.
- Missing data plus credible demand always produces executable acquisition work.
- Demand never bypasses field evidence or the shared data model.
- The public-field contract contains all six required metadata fields.
- One-to-three-character scope is enforced.
- Negative tests have a recorded RED baseline before either skill is edited.
- The same tests pass after the minimal skill changes.
- Skill validation succeeds.
- No production page, URL, sitemap, Team Builder UI, deployment, or indexing state changes.

## 15. Explicitly out of scope for Sprint 0

- Choosing the final pilot character names
- Collecting or publishing game facts
- Replacing `src/data/characters.ts`
- Creating character detail routes
- Creating Build routes
- Implementing Team Builder UI
- Changing navigation or sitemap
- Editing existing production copy
- Deploying or requesting indexing
- Map implementation
- Multilingual expansion
