# Game Guide Product Architecture — Sprint 1 Result

Date: 2026-08-21
Project: DragonSword Awakening / DragonSwordGuide

## 1. Implementation Summary

Sprint 1 implemented a contract-only validation/evaluation layer under `src/domain/game-guide/` and local runnable validations in `scripts/`.

Scope achieved:
- canonical entity contracts for 9+ entity shapes (including a helper `build_recommendation` entity for current fixture use)
- canonical ID builders/normalizers/validators
- field-level evidence wrapper validation
- required vs optional field split in contracts
- source/version first-class modeling
- editorial judgment contract checks
- reference integrity checks
- completeness/readiness scoring
- acquisition/correction task generation
- synthetic fixture + contract tests + internal demo

## 2. Entity Contracts

Implemented entities in `src/domain/game-guide/contracts.js` (primary):

- `character`
- `skill`
- `combat_status`
- `equipment`
- `karma`
- `material`
- `team_relation`
- `source_record`
- `game_version`
- `build_recommendation` (scaffold/helper reference for current synthetic fixtures)

## 3. Canonical IDs

`src/domain/game-guide/ids.js`

Rules implemented:
- Prefix map in `CanonicalIdPrefix`:
  - `character:<slug>`
  - `skill:<slug>`
  - `combat-status:<slug>`
  - `equipment:<slug>`
  - `karma:<slug>`
  - `material:<slug>`
  - `team-relation:<a>|<b>|<relation_type>|<version>`
  - `source:<slug-or-hash>`
  - `game-version:<major.minor.patch>`
- normalization to lowercase, NFC, whitespace/underscore-to-`-`, illegal token cleanup
- deterministic collision handling (`-2`, `-3` suffixes)
- format validation by entity type and prefix

## 4. Required / Optional Matrix

Each contract defines `required_fields` and `optional_fields`.

- `character`: required `name`, `role`, `summary`, `skill_ids`, `status_ids`, `team_relation_ids`; optional `slug`, `build_recommendation_ids`, `lore`, `counterplay_notes`, `rotation_notes`
- `skill`: required `name`, `description`, `character_id`, `applies_status_ids`, `level`, `damage_type`; optional `cooldown_seconds`, `resource_cost`, `synergies`
- `combat_status`: required `name`, `description`; optional `duration`, `stacking_rules`, `counter_rules`, `interaction_notes`
- `equipment`: required `name`, `stats_summary`; optional `build_slots`, `acquisition_method`, `rarity`, `set_synergy`
- `karma`: required `name`, `effect`; optional `stacking`, `category`, `special_notes`
- `material`: required `name`, `category`; optional `recipe`, `sources`, `build_notes`
- `team_relation`: required `from_character_id`, `to_character_id`, `relation_type`, `status_ids`, `rationale`; optional `synergy_tags`, `rotation_context`, `counter_examples`, `official_relation`, `observed_relation`, `editorial_recommendation`
- `source_record`: required 9 metadata fields (`source_type`, `url_or_reference`, `title`, `publisher_or_owner`, `retrieved_at`, `evidence_level_ceiling`, `copyright_or_license_note`, `public_allowed`, `version_relevance`, `stale_or_recheck_status`)
- `game_version`: required `version`, `release_date`, `source_id`; optional `notes`, `status`

## 5. Evidence Contract

Wrapper fields enforced for public-facing/contractual fields:
`value`, `source_id`, `evidence_level`, `game_version`, `last_verified`, `public_allowed`, `editorial_judgment`.

Enforced constraints include:
- supported levels: `A_FIRST_HAND`, `B_OFFICIAL`, `C_COMMUNITY`
- public export requires `public_allowed === true`
- references must resolve to `source_record`
- `editorial_judgment` required with basis, version and reviewer metadata

## 6. Source Record

Implemented as first-class entity with required metadata and validity checks:
- id/type/reference/title/publisher/retrieved metadata/licensing/version/publication flags
- stale/recheck state and evidence ceiling captured
- source type enum constrained

## 7. Editorial Judgment

Modeled fields in `editorial_judgment`:
- `kind`
- `basis_source_ids`
- `game_version`
- `author_editor_status`
- `last_reviewed`
- `confidence`
- `public_allowed`

Validator blocks facts where basis is absent or insufficient.

## 8. Team Relation

Implemented with canonical fields, relation type enum and classification fields.

- relation types: `STARTER_CONNECTOR`, `CONNECTOR_FINISHER`, `STATUS_SETUP`, `STATUS_CONSUME`, `SIGNAL_INTERACTION`
- required refs to characters
- optional refs to related statuses
- supports `official_relation`, `observed_relation`, `editorial_recommendation`
- same-character self-relation explicitly blocked

## 9. Reference Integrity

`ErrorCode` set implemented:
- `ERR_DANGLING_REFERENCE`
- `ERR_DUPLICATE_CANONICAL_ID`
- `ERR_CONFLICTING_CANONICAL_VALUE`
- `ERR_INVALID_SOURCE_REF`
- `ERR_STALE_VERSION`
- `ERR_EVIDENCE_MISSING`
- `ERR_FORBIDDEN_PUBLIC_FIELD`
- `ERR_EDITORIAL_MISSING_BASIS`

Blocking errors drive fail-closed readiness.

## 10. Completeness / Readiness

`ReadinessState` + `PublicationState` transitions:
- `INCOMPLETE`
- `RESEARCH_READY`
- `BLOCKED`
- `READY_FOR_REVIEW`
- `APPROVAL_REQUIRED` (publication max, never `PUBLISHED`)

Readiness metrics:
- required_completeness
- optional_completeness
- evidence_completeness
- version_freshness

## 11. Acquisition Tasks

`buildAcquisitionTask` output includes:
- `task_id`
- `entity_id`
- `field_ids`
- `goal`
- `source_candidates`
- `required_evidence_level`
- `collection_method`
- `validation_method`
- `completion_criteria`
- `unblock_condition`
- `publication_state`
- correction metadata (`invalid_or_missing_field`, `current_problem`, `required_correction`) for invalid evidence cases

Legitimate HOLD entries suppress task emission while preserving hold reason/unblock condition.

## 12. Synthetic Fixtures & Demo

`docs/superpowers/results/2026-08-21-game-guide-product-architecture-sprint-1-tests.json` captures 16/16 passing contract cases.

`scripts/sprint1-game-guide-internal-demo.mjs` executed 5 synthetic scenarios and produced expected gating/task behavior. Notable cases:
- incomplete required field -> `INCOMPLETE` + acquisition task
- missing optional fields -> `RESEARCH_READY`
- invalid source -> correction task path
- missing required equipment field -> task + blocked state

## 13. Tests

Test harness: `scripts/sprint1-game-guide-contract-tests.mjs` (16 cases)

Result:
- Total: 16
- Passed: 16
- Failed: 0
- Pass rate: 100%

## 14. Production Boundary Verification

No files under `src/pages`, `src/components`, routes, sitemap, or public route/config changed by this sprint.

Checks run:
- `node --check` on all new/edited JS files
- `git diff --check`

## 15. Skill Governance

No governed `game-guide-product-architecture` Skill source created in this branch for this sprint.

Recommended next: create/align Skill source in governed location before Sprint 2 if handoff execution is approved.

## 16. Sprint Classification

**Classification:** `SPRINT_1_PASS_WITH_GAPS`

Gaps to close in next sprint:
- finalize/remove explicit handling for non-scope `build_recommendation` entity handling if strict 9-entity-only interpretation is enforced
- introduce governed `game-guide-product-architecture` Skill source and handoff contract tests when approved
- add more production-style fixture coverage for cross-entity completeness in real-data simulation
