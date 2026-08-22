export const EvidenceLevel = Object.freeze({
  A_FIRST_HAND: "A_FIRST_HAND",
  B_OFFICIAL: "B_OFFICIAL",
  C_COMMUNITY: "C_COMMUNITY",
});

export const EvidenceLevelOrder = Object.freeze({
  [EvidenceLevel.A_FIRST_HAND]: 3,
  [EvidenceLevel.B_OFFICIAL]: 2,
  [EvidenceLevel.C_COMMUNITY]: 1,
});

export const SourceType = Object.freeze({
  OFFICIAL: "official",
  FIRST_HAND: "first_hand",
  COMMUNITY: "community",
  THIRD_PARTY: "third_party",
  TOOL_EXPORT: "tool_export",
  ANALYTICS: "analytics",
});

export const TEAM_RELATION_TYPES = Object.freeze([
  "STARTER_CONNECTOR",
  "CONNECTOR_FINISHER",
  "STATUS_SETUP",
  "STATUS_CONSUME",
  "SIGNAL_INTERACTION",
]);

export const EditorialKind = Object.freeze({
  FACTUAL: "factual",
  DERIVED: "derived",
  RECOMMENDATION: "recommendation",
});

export const EditorialReviewerStatus = Object.freeze({
  EDITOR: "editor",
  ANALYST: "analyst",
  VERIFIED_REVIEWER: "verified_reviewer",
});

export const Confidence = Object.freeze({
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
});

export const PublicationState = Object.freeze({
  BLOCKED: "BLOCKED",
  RESEARCH_READY: "RESEARCH_READY",
  READY_FOR_REVIEW: "READY_FOR_REVIEW",
  APPROVAL_REQUIRED: "APPROVAL_REQUIRED",
});

export const ReadinessState = Object.freeze({
  INCOMPLETE: "INCOMPLETE",
  RESEARCH_READY: "RESEARCH_READY",
  READY_FOR_REVIEW: "READY_FOR_REVIEW",
  APPROVAL_REQUIRED: "APPROVAL_REQUIRED",
  BLOCKED: "BLOCKED",
});

export const ErrorCode = Object.freeze({
  ERR_DANGLING_REFERENCE: "ERR_DANGLING_REFERENCE",
  ERR_DUPLICATE_CANONICAL_ID: "ERR_DUPLICATE_CANONICAL_ID",
  ERR_CONFLICTING_CANONICAL_VALUE: "ERR_CONFLICTING_CANONICAL_VALUE",
  ERR_INVALID_SOURCE_REF: "ERR_INVALID_SOURCE_REF",
  ERR_STALE_VERSION: "ERR_STALE_VERSION",
  ERR_EVIDENCE_MISSING: "ERR_EVIDENCE_MISSING",
  ERR_FORBIDDEN_PUBLIC_FIELD: "ERR_FORBIDDEN_PUBLIC_FIELD",
  ERR_EDITORIAL_MISSING_BASIS: "ERR_EDITORIAL_MISSING_BASIS",
});

export const HoldReason = Object.freeze({
  DEMAND_INSUFFICIENT: "DEMAND_INSUFFICIENT",
  OUT_OF_SCOPE: "OUT_OF_SCOPE",
  EVIDENCE_UNAVAILABLE: "EVIDENCE_UNAVAILABLE",
  MAINTENANCE_UNJUSTIFIED: "MAINTENANCE_UNJUSTIFIED",
  LEGAL_OR_SOURCE_BLOCK: "LEGAL_OR_SOURCE_BLOCK",
});

export const CanonicalIdPrefix = Object.freeze({
  character: "character",
  skill: "skill",
  combat_status: "combat-status",
  equipment: "equipment",
  karma: "karma",
  material: "material",
  team_relation: "team-relation",
  source_record: "source",
  game_version: "game-version",
  build_recommendation: "build-recommendation",
});

export const CANONICAL_ENTITY_TYPES = Object.freeze([
  "character",
  "skill",
  "combat_status",
  "equipment",
  "karma",
  "material",
  "team_relation",
  "source_record",
  "game_version",
]);

export const DERIVED_ARTIFACT_TYPES = Object.freeze([
  "build_recommendation",
]);

export const ArtifactClass = Object.freeze({
  CANONICAL_ENTITY: "CANONICAL_ENTITY",
  DERIVED_EDITORIAL_ARTIFACT: "DERIVED_EDITORIAL_ARTIFACT",
});

export const REQUIRED_FIELD_IDS = Object.freeze([
  "value",
  "source_id",
  "evidence_level",
  "game_version",
  "last_verified",
  "public_allowed",
  "editorial_judgment",
]);

export const ENTITY_CONTRACTS = {
  character: {
    entityLabel: "Character",
    required_fields: [
      "name",
      "role",
      "summary",
      "skill_ids",
      "status_ids",
      "team_relation_ids",
    ],
    optional_fields: [
      "slug",
      "build_recommendation_ids",
      "lore",
      "counterplay_notes",
      "rotation_notes",
    ],
    reference_fields: {
      skill_ids: "skill",
      status_ids: "combat_status",
      team_relation_ids: "team_relation",
      build_recommendation_ids: "build_recommendation",
    },
  },
  skill: {
    entityLabel: "Skill",
    required_fields: [
      "name",
      "description",
      "character_id",
      "applies_status_ids",
      "level",
      "damage_type",
    ],
    optional_fields: ["cooldown_seconds", "resource_cost", "synergies"],
    reference_fields: {
      character_id: "character",
      applies_status_ids: "combat_status",
    },
  },
  combat_status: {
    entityLabel: "Combat Status",
    required_fields: ["name", "description"],
    optional_fields: ["duration", "stacking_rules", "counter_rules", "interaction_notes"],
    reference_fields: {},
  },
  equipment: {
    entityLabel: "Equipment",
    required_fields: ["name", "stats_summary"],
    optional_fields: ["build_slots", "acquisition_method", "rarity", "set_synergy"],
    reference_fields: {},
  },
  karma: {
    entityLabel: "Karma",
    required_fields: ["name", "effect"],
    optional_fields: ["stacking", "category", "special_notes"],
    reference_fields: {},
  },
  material: {
    entityLabel: "Material",
    required_fields: ["name", "category"],
    optional_fields: ["recipe", "sources", "build_notes"],
    reference_fields: {},
  },
  team_relation: {
    entityLabel: "Team Relation",
    required_fields: [
      "from_character_id",
      "to_character_id",
      "relation_type",
      "status_ids",
      "rationale",
    ],
    optional_fields: [
      "synergy_tags",
      "rotation_context",
      "counter_examples",
      "official_relation",
      "observed_relation",
      "editorial_recommendation",
    ],
    reference_fields: {
      from_character_id: "character",
      to_character_id: "character",
      status_ids: "combat_status",
    },
  },
  source_record: {
    entityLabel: "Source Record",
    required_fields: [
      "source_type",
      "url_or_reference",
      "title",
      "publisher_or_owner",
      "retrieved_at",
      "evidence_level_ceiling",
      "copyright_or_license_note",
      "public_allowed",
      "version_relevance",
      "stale_or_recheck_status",
    ],
    optional_fields: ["authors", "license_constraints", "notes"],
    reference_fields: {},
  },
  game_version: {
    entityLabel: "Game Version",
    required_fields: ["version", "release_date", "source_id"],
    optional_fields: ["notes", "status"],
    reference_fields: {
      source_id: "source_record",
    },
  },
  build_recommendation: {
    entityLabel: "Build Recommendation",
    required_fields: ["name", "summary", "build_type", "character_ids", "role_specific_tips"],
    optional_fields: ["rotation_rationale", "gear_examples", "playstyle_context"],
    reference_fields: {
      character_ids: "character",
    },
  },
};

export const SEQUENCE_OF_FIELDS = Object.fromEntries(
  Object.entries(ENTITY_CONTRACTS).map(([entityType, contract]) => [
    entityType,
    [...contract.required_fields, ...contract.optional_fields],
  ]),
);

export const VALID_ROUTING_STATES = Object.freeze([
  "ANSWER_PAGE",
  "ENTITY_CLUSTER",
  "UTILITY_TOOL",
  "RESEARCH_BACKLOG",
  "HOLD",
]);
