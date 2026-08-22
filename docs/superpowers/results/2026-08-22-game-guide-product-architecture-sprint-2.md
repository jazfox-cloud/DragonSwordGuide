# Game Guide Product Architecture Sprint 2

## 1. Executive Status

Status: `SPRINT_2_PASS_WITH_GAPS`.

Sprint 2 resolved the `build_recommendation` entity boundary, created a governed temporary source for `game-guide-product-architecture`, added handoff/product contract tests, selected one evidence-safe pilot character, and created a non-public first vertical-slice readiness dataset.

The remaining gap is evidence acquisition: the Lute slice can proceed to structured acquisition, but Skill, Equipment/Karma, and Team Relation facts are not production-ready.

## 2. Entity Boundary Resolution

Decision: `build_recommendation` is `DERIVED_EDITORIAL_ARTIFACT`, not a 10th canonical entity.

Canonical entity set remains exactly:

| # | Entity |
| -: | --- |
| 1 | Character |
| 2 | Skill |
| 3 | Combat Status |
| 4 | Equipment |
| 5 | Karma |
| 6 | Material |
| 7 | Team Relation |
| 8 | Source Record |
| 9 | Game Version |

Implementation:

- `CANONICAL_ENTITY_TYPES` exports the canonical 9.
- `DERIVED_ARTIFACT_TYPES` contains `build_recommendation`.
- Evaluations now expose `artifact_class`.
- Derived artifacts still validate references, evidence, metadata, and version freshness.

## 3. Skill Governance

Chosen source repository: `/Users/jazfox/Documents/ChatGPT/DragonSwordGuide`

Source path: `docs/superpowers/skills/game-guide-product-architecture/SKILL.md`

Runtime path: `/Users/jazfox/.codex/skills/game-guide-product-architecture/SKILL.md`

Status: `TEMPORARY_GOVERNED_SOURCE`.

Reason: no existing governed Skill source repository with reusable Skill folders was found. `/Users/jazfox/Documents/website-operating-system/skills` exists in a git repository and has a registry, but no actual Skill source folders were present. It is the recommended future home after explicit cross-repo authorization.

Sync/install method: copy the reviewed source Skill folder to the runtime path after approval. No runtime install was performed in Sprint 2.

Drift detection: compare SHA-256 of the governed source `SKILL.md` against runtime `SKILL.md` before use.

## 4. Governed Skill Contract

Created minimal `game-guide-product-architecture` Skill source. It accepts:

- `ENTITY_CLUSTER`
- `UTILITY_TOOL`
- `RESEARCH_BACKLOG`
- `HOLD`

It owns:

- handoff validation
- canonical entity/readiness gate
- Evidence gate
- reference-integrity gate
- acquisition/correction tasks
- pilot scoring
- vertical-slice readiness

It forbids:

- public pages
- UI
- publishing
- deploy
- indexing
- bulk URLs
- invented game facts

## 5. Handoff Validation

Handoff contract is implemented in `src/domain/game-guide/product-architecture.js`.

Required fields:

```text
opportunity_type
user_task
primary_route
required_entities
required_fields
optional_fields
source_requirements
evidence_requirements
game_version
collection_tasks
publication_gate
next_action
```

Invalid input returns `HANDOFF_INVALID` with correction/acquisition tasks. `PUBLISHED` is rejected.

## 6. Skill Negative Tests

Synthetic handoff scenarios covered:

| Scenario | Result |
| --- | --- |
| valid ENTITY_CLUSTER | PASS |
| valid UTILITY_TOOL | PASS |
| missing required handoff field | PASS |
| dangling entity reference | PASS |
| community-only factual claim | PASS |
| missing game version | PASS |
| optional-only incompleteness | PASS |
| legitimate HOLD | PASS |
| auto-publish request | PASS |
| UI before readiness | PASS |
| pilot cap/gate criteria | PASS |

Result: 11/11 pass.

## 7. Pilot Candidate Inventory

Evidence sources used:

- Steam official game page: Evidence B.
- DragonSwordAwakening.net Team Builder: Evidence C.
- DragonSwordAwakening.net Builds: Evidence C.
- Steam Discussion team-combo thread: Evidence C.

GSC/search demand: `UNKNOWN` for Sprint 2 candidate scoring.

## 8. Selection Scores

| Character | Score | Evidence Strength | Major Gaps | Decision |
| --- | ---: | --- | --- | --- |
| Lute | 81 | B+C | exact skill wording, Equipment/Karma values, Roxy/Theresia relation verification | PILOT_READY |
| Roxy | 76 | C | official identity capture missing, skill facts C-only, build/team claims editorial | NEAR_READY |
| Theresia | 76 | C | official identity capture missing, demo/community skill reports need current verification | NEAR_READY |
| Castella | 69 | B+C | less direct first vertical relation, skill/equipment evidence C-only | NEAR_READY |
| Charlotte | 66 | C | official identity capture missing, not part of first vertical chain | NEAR_READY |

## 9. Selected Pilot Characters

Selected pilot: `character:lute`.

Why selected: Lute has direct official identity support from Steam and enough non-public C-level skill/build/team-chain leads to produce executable acquisition work without treating community claims as production facts.

Roxy and Theresia remain Team Relation candidates and acquisition targets, not selected pilots.

## 10. Vertical Slice Readiness

| Pilot | Character | Skills | Equipment/Karma | Team Relation | Overall |
| --- | --- | --- | --- | --- | --- |
| Lute | RESEARCH_READY | INCOMPLETE | INCOMPLETE | INCOMPLETE | APPROVAL_REQUIRED |

## 11. Acquisition Backlog

Acquisition task count: 4.

Tasks:

- `acq-lute-skill-current-verification`
- `acq-lute-karma-equipment-verification`
- `acq-lute-roxy-theresia-team-relation`
- `acq-roxy-theresia-official-identity`

No vague HOLD/research tasks were emitted.

## 12. Team Relation Candidates

Team Relation candidate count: 2.

| Candidate | Classification | Evidence | State |
| --- | --- | --- | --- |
| `team-relation:lute\|roxy\|starter_connector\|orbis-current` | editorial_recommendation | C_COMMUNITY | APPROVAL_REQUIRED |
| `team-relation:roxy\|theresia\|connector_finisher\|orbis-current` | editorial_recommendation | C_COMMUNITY | APPROVAL_REQUIRED |

Editorial recommendations do not masquerade as official relations.

## 13. Shared Data Reuse Demo

Canonical fact: `skill:stun-slash`.

Reused by:

- Character detail readiness
- Build readiness
- Team Relation readiness

Reference-integrity result: `PASS_NON_PUBLIC_REFERENCE_ONLY`.

## 14. Production Boundary Verification

Confirmed no changes to:

- public Character pages
- Build pages
- Team Builder UI
- public search/filter UI
- public URLs
- sitemap
- publish/deploy actions

Production path diff target remains empty for:

- `src/pages`
- `src/components`
- public route data
- sitemap/navigation/metadata paths

## 15. Remaining Gaps

- Lute exact current skill behavior needs Evidence A or B.
- Lute Equipment/Karma relation needs Evidence A or B.
- Lute/Roxy/Theresia Team Relation needs first-hand or official validation.
- Roxy and Theresia need official or first-hand identity capture before they can become pilot characters.
- Temporary Skill governance should migrate to a cross-project governed Skill source after authorization.

## 16. Sprint 3 Recommendation

Sprint 3 should be evidence acquisition only:

- capture current in-game or official Lute skill evidence
- capture Lute Equipment/Karma evidence
- reproduce or reject Lute -> Roxy -> Theresia Signal chain
- create Source Records and Evidence wrappers from captured proof
- rerun readiness and reference-integrity gates

Do not build public pages or Team Builder UI until the Lute vertical slice reaches review-ready data quality.
