---
name: game-guide-product-architecture
description: Use when a game-guide SEO route becomes an entity cluster, utility tool, research backlog, vertical-slice selection, or shared data readiness problem.
---

# Game Guide Product Architecture

Own the data-product layer after `game-seo-keyword-loop` hands off an `ENTITY_CLUSTER`, `UTILITY_TOOL`, `RESEARCH_BACKLOG`, or valid `HOLD`. Stop at `READY_FOR_REVIEW` or `APPROVAL_REQUIRED`; never publish, deploy, index, create URLs, or build UI.

## Inputs

Require every handoff field:

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

If any field is missing, or `publication_gate` is `PUBLISHED`, return `HANDOFF_INVALID` with correction tasks. Do not infer missing fields.

## Entity Boundary

The canonical entity set is exactly:

```text
Character
Skill
Combat Status
Equipment
Karma
Material
Team Relation
Source Record
Game Version
```

`build_recommendation` is a `DERIVED_EDITORIAL_ARTIFACT`, not a canonical entity. It may reference canonical IDs, but it has no standalone fact authority, cannot duplicate canonical facts, must carry editorial judgment and game version metadata, and fails closed when referenced facts are invalid or stale.

## Gates

Run these gates before recommending a page, UI, URL, search/filter product, Team Builder, or publishing flow:

1. user task is explicit
2. required canonical entities are named
3. required fields are named
4. evidence availability is eligible
5. data completeness is known
6. canonical references resolve
7. update/maintenance feasibility is acceptable

If a gate fails, return `BLOCKED` or `RESEARCH_READY` and create acquisition/correction tasks. Missing optional fields may stay `RESEARCH_READY`; missing required fields block review.

## Evidence Rules

- Evidence A: first-hand verified gameplay.
- Evidence B: official Steam, developer, publisher, or official game material.
- Evidence C: community, Reddit, Steam Discussions, YouTube, third-party guides.
- Evidence C can prioritize research or support editorial hypotheses, but cannot create public factual fields.
- Editorial build/team recommendations must be labeled as editorial judgment.

Every public-eligible field needs source, evidence level, game version, last verified date, public allowance, and editorial judgment metadata.

## Output Contract

Return every field, using `N/A` when not applicable:

```text
product_route
user_task
canonical_entities
required_fields
optional_fields
evidence_gaps
reference_errors
data_completeness
acquisition_tasks
vertical_slice_candidates
recommended_slice
publication_gate
next_action
```

Allowed publication states:

```text
BLOCKED
RESEARCH_READY
READY_FOR_REVIEW
APPROVAL_REQUIRED
```

Never return `PUBLISHED`.

## Acquisition Tasks

When data is missing but acquirable, produce executable tasks with:

```text
task_id
goal
data_needed
fields_needed
source_candidates
required_evidence_level
collection_method
validation_method
completion_criteria
unblock_condition
publication_state
```

Do not output vague "research more" instructions.

## Vertical Slice Selection

Select at most three pilot characters. Score candidates using:

```text
required completeness: 0-25
source quality: 0-20
build relevance: 0-20
team relation richness: 0-15
search/user demand: 0-10
maintenance feasibility: 0-10
```

Only select `PILOT_READY` candidates with score >= 70, factual identity evidence, one meaningful Skill relation, one Equipment/Karma or progression relation, one potential Team Relation, and acceptable maintenance burden. If none pass, return `NO_PILOT_CHARACTER_READY`.

## Shared Reuse

When the same fact supports Character detail readiness, Build readiness, or Team Relation readiness, reference the same canonical entity ID. Validate dangling references, duplicate canonical entities, conflicting canonical values, stale version references, and missing source/evidence metadata. Any integrity error fails closed.

## Boundary

This Skill can define data contracts, validate readiness, create acquisition tasks, select pilots, and prepare review artifacts. It cannot create public pages, public datasets, UI, Team Builder, navigation, sitemap, deployment, indexing, or automatic publishing.
