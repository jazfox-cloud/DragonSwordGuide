# Game Guide Product Architecture — Sprint 1 Implementation Plan (Contract-only)

## 1) Scope and non-scope

**Date:** 2026-08-21
**Pilot:** DragonSword Awakening / DragonSwordGuide
**Status:** Implementation-ready contract; no production pages, no URLs, no UI.

Sprint 1 is contract-only groundwork for the first product-architecture skill implementation.

- In scope: entity contracts, evidence contracts, validators, route/selection/rule boundaries, and test plan.
- Out of scope: `src/pages`, `src/components`, `src/data`, public URLs, Team Builder UI, deployment, publishing.

The scope matches the approved design:
- `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-design.md`
- `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-negative-tests.md`
- `docs/superpowers/results/2026-08-21-game-guide-product-architecture-red.md`
- `docs/superpowers/results/2026-08-21-game-guide-product-architecture-green.md`

## 2) Sprint 1 canonical entities (exact list)

1. Character
2. Skill
3. Combat Status
4. Equipment
5. Karma
6. Material
7. Team Relation
8. Source Record
9. Game Version

No new entity types (Quest / Map Location / Dungeon / Boss) are added in Sprint 1.

## 3) Canonical ID contract

### 3.1 Canonical ID format

```text
character:<slug>
skill:<slug>
combat-status:<slug>
equipment:<slug>
karma:<slug>
material:<slug>
team-relation:<id>
source:<slug-or-hash>
game-version:<major.minor.patch>
```

### 3.2 Normalization rules

- Lowercase.
- Trim and normalize unicode to NFC.
- Replace whitespace with `-`.
- Collapse consecutive separators (`-`, `_`) to `-`.
- Remove illegal characters (`/` `?` `#` `%` space).
- For `team-relation`, deterministic `<charA_slug>|<charB_slug>|<relation_type>|<version>`; ordering is canonical by sorted character slug list.
- IDs are deterministic from source facts; do not generate from display names alone when collisions are possible.

## 4) Field-level evidence contract

Every public field must expose:

```text
value
source_id
evidence_level
game_version
last_verified
public_allowed
editorial_judgment
```

Hard gate rules:

- `value`, `source_id`, `evidence_level`, `game_version`, `last_verified` are required and non-empty.
- `public_allowed` must be `true`.
- `evidence_level ∈ {A_FIRST_HAND, B_OFFICIAL, C_COMMUNITY}`.
- `editorial_judgment` may be `true` only with explicit context and cannot replace missing source metadata.
- Missing or invalid evidence metadata blocks publication/brief eligibility (`publication_gate` cannot be `READY_FOR_REVIEW` or higher).

## 5) Required vs optional fields per entity

| Entity | Required Fields | Optional Fields | Ready condition |
|---|---|---|---|
| Character | `id`, `slug`, `name`, `role`, `summary`, `skill_ids`, `status_ids`, `team_relation_ids` | `build_recommendation_ids`, `lore`, `counterplay_notes`, `rotation_notes` | All required fields must be field-level evidence-complete, reference-valid, and evidence-level eligible. |
| Skill | `id`, `character_id`, `name`, `description`, `applies_status_ids` | `cooldown_seconds`, `damage_type`, `resource_cost`, `synergies` | Required facts evidence-complete and relation-resolved (`character_id`, `applies_status_ids`). |
| Combat Status | `id`, `name`, `description` | `duration`, `stacking_rules`, `counter_rules`, `interaction_notes` | Required fields must be complete and version-correct. |
| Equipment | `id`, `name`, `stats_summary` | `build_slots`, `acquisition_method`, `rarity`, `set_synergy` | Required fields complete; optional fields may be empty until available. |
| Karma | `id`, `name`, `effect` | `stacking`, `category`, `special_notes` | Required fields complete; no required relation fields in Sprint 1. |
| Material | `id`, `name`, `category` | `recipe`, `sources`, `build_notes` | Required fields complete with source evidence. |
| Team Relation | `id`, `from_character_id`, `to_character_id`, `relation_type`, `status_ids`, `rationale` | `synergy_tags`, `rotation_context`, `counter_examples` | Required fields evidence-complete and both character IDs resolve to canonical character records. |
| Source Record | `id`, `source_type`, `url`, `publisher`, `evidence_level`, `retrieved_at`, `public_allowed`, `version_relevance`, `copyright_notes` | `authors`, `license_constraints`, `notes` | Source is valid only when `id` is stable, URL/retrieved_at are valid, and constraints are machine-readable. |
| Game Version | `version`, `release_date`, `source_id` | `notes`, `status` | Version must resolve to an existing `Source Record` and be used consistently across produced records. |

## 6) Source Record contract

`Source Record` is first-class. Minimum required fields:

- `id`
- `source_type` (`official`, `first_hand`, `community`, `third_party`, `tool_export`, `analytics`)
- `url` / `reference` (machine-linkable identifier)
- `title`
- `publisher_or_owner`
- `retrieved_at` (ISO-8601)
- `evidence_level`
- `copyright_or_license_note`
- `public_allowed`
- `version_relevance`
- `stale_or_recheck_status` (`FRESH`, `STALE`, `NEEDS_RECHECK`, `INVALID`)

Source text/copy should not be flattened into the field model; keep as reference and evidence attachment.

## 7) Editorial Judgment contract

Editorial judgments are separate from facts.

- `kind`: factual / derived / recommendation
- `basis`: `source_ids[]`, evidence snippets, replay logs, or explicit gameplay checks
- `game_version`
- `author_editor_status`: `editor`, `analyst`, `verified_reviewer`
- `last_reviewed`
- `confidence` (`LOW|MEDIUM|HIGH`)
- `public_allowed`

Constraints:

- Editorial fields cannot be promoted as facts without corresponding factual source fields.
- `C_COMMUNITY` facts without local gameplay/official cross-check must always carry `editorial_judgment=true` and purpose framing.

## 8) Team Relation contract

Team relations model future Team Builder readiness but do not imply UI implementation.

- `relation_type` must be one of:
  - `STARTER_CONNECTOR`
  - `CONNECTOR_FINISHER`
  - `STATUS_SETUP`
  - `STATUS_CONSUME`
  - `SIGNAL_INTERACTION`
- Keep facts split from recommendations:
  - `official_relation` (factual, sourced)
  - `observed_relation` (replicable observation, versioned)
  - `editorial_recommendation` (opinion/context)

## 9) Reference integrity validator spec

### 9.1 Required validation set

- `ERR_DANGLING_REFERENCE`: referenced id does not exist.
- `ERR_DUPLICATE_CANONICAL_ID`: duplicate id across entity family.
- `ERR_CONFLICTING_CANONICAL_VALUE`: two values conflict for same canonical field.
- `ERR_INVALID_SOURCE_REF`: `source_id` missing or missing source record.
- `ERR_STALE_VERSION`: field `game_version` stale against `game-version` policy.
- `ERR_EVIDENCE_MISSING`: any required metadata missing from public field.
- `ERR_FORBIDDEN_PUBLIC_FIELD`: public field without `public_allowed=true`.
- `ERR_EDITORIAL_MISSING_BASIS`: editorial item lacks basis, reviewer, or review time.

### 9.2 Fail-closed behavior

- Any validation error with severity `BLOCK` sets `publication_gate=BLOCKED`.
- Warnings are returned as `needs_attention` but do not block `APPROVAL_REQUIRED` when required fields are complete.
- `FAIL` outputs include `error_code`, `resolver`, `expected_fix`, and `owner`.

## 10) Data completeness model

State machine:

- `INCOMPLETE` — one or more required fields fail evidence/completeness rules.
- `RESEARCH_READY` — required fields complete, acquisition tasks exist for missing optional scope only.
- `READY_FOR_REVIEW` — all required fields complete and references resolve.
- `APPROVAL_REQUIRED` — all above plus explicit review artifacts and freshness checks satisfied.

Scoring model:

- `required_completeness`: percent of required fields complete.
- `optional_completeness`: percent of optional fields present.
- `evidence_completeness`: percent required fields with valid `source_id/evidence_level/game_version/last_verified/public_allowed/editorial_judgment`.
- `version_freshness`: percent fields on current version or explicitly reverified.

Only required completeness gates movement; optional scores are informational.

## 11) Acquisition task contract

Canonical task object to reuse from SEO Skill:

```text
task_id
entity_id
field_ids
goal
source_candidates
required_evidence_level
collection_method
validation_method
completion_criteria
unblock_condition
```

`publication_state` in a routed task is restricted to `APPROVAL_REQUIRED` or `BLOCKED`.

## 12) First vertical slice selection gate

No character is selected in Sprint 1. The contract defines selection criteria only:

- required completeness score
- source quality (evidence level distribution)
- build relevance (exists a valid purpose and equipment/karma graph)
- team relation richness (`team_relation_ids` coverage)
- maintenance feasibility (version cadence, stale-risk, staleness cost)

Selection output: rubric score + ranked shortlist (1–3 candidates) but no final names in Sprint 1.

## 13) Publication boundary for Sprint 1 skill

Allowed max state: `APPROVAL_REQUIRED`.

Disallowed in all cases:
- `publish`, `deploy`, `index`, `sitemap`, `create_many_urls`, `auto_push`.

Decision output must always include:
- `publication_gate`
- `publication_authorized` (must be `false`)
- `next_action` and acquisition trigger list.

## 14) Sprint 1 implementation plan

### 14.1 Target files

- `docs/superpowers/plans/2026-08-21-game-guide-product-architecture-sprint-1.md` (this file, contract and plan)
- `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-design.md`
- `docs/superpowers/specs/2026-08-20-game-guide-product-architecture-negative-tests.md`
- future governed skill files for `game-guide-product-architecture`

### 14.2 Execution order

1. Finalize entity/field/reference schema schema (this document).
2. Codify canonical ID and source-ID registries.
3. Implement validator function set (errors above).
4. Implement completeness score output.
5. Implement acquisition task generator.
6. Implement handoff contract from SEO skill (consume `correction_task` / `acquisition_task` inputs).
7. Define selection rubric and produce 1–3 pilot shortlist payload.
8. Add RED/GREEN contract tests (same matrix style).

### 14.3 Checkpoints

- No production file edits in first checkpoint.
- Schema/validator passes.
- No `PUBLISHED` or auto-publish states.
- All checkpoints remain reproducible with fresh-context scoring.

## 15) Review checkpoints

- Contract review: entity schema + source contracts.
- Integrity dry-run: fail-closed on all reference errors.
- Gate review: no `RESEARCH_BACKLOG` without actionable task; no false-negative `READY_FOR_REVIEW`.
- Handoff review: no inline fact duplication across consumers.

## 16) Governance recommendation

Recommended governed location for future controlled skill source:

- Keep a dedicated repository (recommended): `<project-root>/Skills` (or existing org skills repo if available) for:
  - `game-seo-keyword-loop`
  - `game-guide-product-architecture`
- Keep `~/.codex/skills` as local install/runtime cache only.
- Migration now: **NO** automatic migration unless a governed skill repo already exists and team policy is explicit for this domain.

Current blocker:
- No explicit governed git repository currently contains these two Skill source files, so full source migration authority is blocked.
