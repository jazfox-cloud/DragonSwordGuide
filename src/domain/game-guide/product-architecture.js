import {
  CANONICAL_ENTITY_TYPES,
  DERIVED_ARTIFACT_TYPES,
  ErrorCode,
  PublicationState,
  VALID_ROUTING_STATES,
} from "./contracts.js";
import { evaluateGameGuideBundle } from "./evaluator.js";

export const PRODUCT_ARCHITECTURE_HANDOFF_FIELDS = Object.freeze([
  "opportunity_type",
  "user_task",
  "primary_route",
  "required_entities",
  "required_fields",
  "optional_fields",
  "source_requirements",
  "evidence_requirements",
  "game_version",
  "collection_tasks",
  "publication_gate",
  "next_action",
]);

export const PRODUCT_ARCHITECTURE_ROUTES = Object.freeze([
  "ENTITY_CLUSTER",
  "UTILITY_TOOL",
  "RESEARCH_BACKLOG",
  "HOLD",
]);

const FIXABLE_ROUTE_SET = new Set(["ENTITY_CLUSTER", "UTILITY_TOOL", "RESEARCH_BACKLOG"]);

function hasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

function asArray(value) {
  return Array.isArray(value) ? value : value === undefined || value === null ? [] : [value];
}

function acquisitionTask({ taskId, goal, field, problem, correction, state = PublicationState.APPROVAL_REQUIRED }) {
  return {
    task_id: taskId,
    goal,
    data_needed: problem,
    fields_needed: [field],
    source_candidates: ["official source", "first-hand capture", "versioned community lead for prioritization only"],
    required_evidence_level: "B_OFFICIAL",
    collection_method: "Collect from official material or reproducible first-hand verification before public use.",
    validation_method: "Run handoff, evidence, data completeness, and reference-integrity gates.",
    completion_criteria: correction,
    unblock_condition: correction,
    publication_state: state,
  };
}

export function validateProductArchitectureHandoff(handoff = {}) {
  const missingFields = PRODUCT_ARCHITECTURE_HANDOFF_FIELDS.filter((field) => !hasValue(handoff[field]));
  const errors = [];

  for (const field of missingFields) {
    errors.push({
      code: "HANDOFF_FIELD_MISSING",
      field,
      message: `handoff.${field} is required.`,
    });
  }

  if (hasValue(handoff.primary_route) && !PRODUCT_ARCHITECTURE_ROUTES.includes(handoff.primary_route)) {
    errors.push({
      code: "HANDOFF_ROUTE_INVALID",
      field: "primary_route",
      message: "Product architecture accepts ENTITY_CLUSTER, UTILITY_TOOL, RESEARCH_BACKLOG, or HOLD.",
    });
  }

  if (hasValue(handoff.primary_route) && !VALID_ROUTING_STATES.includes(handoff.primary_route)) {
    errors.push({
      code: "HANDOFF_ROUTE_UNKNOWN",
      field: "primary_route",
      message: "primary_route must remain one of the shared routing states.",
    });
  }

  if (handoff.publication_gate === "PUBLISHED") {
    errors.push({
      code: "HANDOFF_PUBLICATION_FORBIDDEN",
      field: "publication_gate",
      message: "Product architecture cannot accept a PUBLISHED autonomous state.",
    });
  }

  const correctionTasks = errors.map((error) => acquisitionTask({
    taskId: `correct-handoff-${String(error.field).replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`,
    goal: `Correct product architecture handoff field ${error.field}`,
    field: error.field,
    problem: error.message,
    correction: "Provide the required handoff field with explicit route, evidence, version, collection, and gate metadata.",
    state: PublicationState.BLOCKED,
  }));

  return {
    valid: errors.length === 0,
    status: errors.length === 0 ? "HANDOFF_VALID" : "HANDOFF_INVALID",
    errors,
    correction_tasks: correctionTasks,
  };
}

function outputContract(overrides = {}) {
  return {
    product_route: overrides.product_route || "HANDOFF_INVALID",
    user_task: overrides.user_task || "N/A",
    canonical_entities: overrides.canonical_entities || [],
    required_fields: overrides.required_fields || [],
    optional_fields: overrides.optional_fields || [],
    evidence_gaps: overrides.evidence_gaps || [],
    reference_errors: overrides.reference_errors || [],
    data_completeness: overrides.data_completeness || {
      required_completeness: 0,
      optional_completeness: 0,
      evidence_completeness: 0,
      version_freshness: 0,
    },
    acquisition_tasks: overrides.acquisition_tasks || [],
    vertical_slice_candidates: overrides.vertical_slice_candidates || [],
    recommended_slice: overrides.recommended_slice || "N/A",
    publication_gate: overrides.publication_gate || PublicationState.BLOCKED,
    next_action: overrides.next_action || "Correct handoff before architecture work.",
  };
}

function referenceErrorsFrom(evidenceErrors = []) {
  return evidenceErrors.filter((error) => [
    ErrorCode.ERR_DANGLING_REFERENCE,
    ErrorCode.ERR_DUPLICATE_CANONICAL_ID,
    ErrorCode.ERR_CONFLICTING_CANONICAL_VALUE,
    ErrorCode.ERR_STALE_VERSION,
    ErrorCode.ERR_INVALID_SOURCE_REF,
  ].includes(error.code));
}

export function evaluateProductArchitectureOpportunity(handoff = {}, options = {}) {
  const validation = validateProductArchitectureHandoff(handoff);
  if (!validation.valid) {
    return outputContract({
      product_route: validation.status,
      user_task: handoff.user_task || "N/A",
      acquisition_tasks: validation.correction_tasks,
      evidence_gaps: validation.errors,
      publication_gate: PublicationState.BLOCKED,
    });
  }

  if (handoff.primary_route === "HOLD") {
    return outputContract({
      product_route: "HOLD",
      user_task: handoff.user_task,
      canonical_entities: asArray(handoff.required_entities),
      required_fields: asArray(handoff.required_fields),
      optional_fields: asArray(handoff.optional_fields),
      acquisition_tasks: asArray(handoff.collection_tasks),
      publication_gate: PublicationState.BLOCKED,
      next_action: "Keep HOLD until the explicit unblock condition is met.",
    });
  }

  if (!FIXABLE_ROUTE_SET.has(handoff.primary_route)) {
    return outputContract({
      product_route: "HANDOFF_INVALID",
      user_task: handoff.user_task,
      evidence_gaps: [{ code: "HANDOFF_ROUTE_INVALID", field: "primary_route" }],
      publication_gate: PublicationState.BLOCKED,
    });
  }

  const bundleEvaluation = options.bundle ? evaluateGameGuideBundle(options.bundle) : null;
  const evidenceGaps = bundleEvaluation?.evidence_errors || [];
  const referenceErrors = referenceErrorsFrom(evidenceGaps);
  const acquisitionTasks = [
    ...asArray(handoff.collection_tasks),
    ...(bundleEvaluation?.acquisition_tasks || []),
    ...(bundleEvaluation?.correction_tasks || []),
  ];

  const publicationGate = referenceErrors.length || evidenceGaps.some((entry) => entry.severity === "BLOCK")
    ? PublicationState.BLOCKED
    : bundleEvaluation?.publication_gate || PublicationState.APPROVAL_REQUIRED;
  const hasAcquisitionWork = acquisitionTasks.length > 0;

  return outputContract({
    product_route: handoff.primary_route,
    user_task: handoff.user_task,
    canonical_entities: asArray(handoff.required_entities).filter((entity) => CANONICAL_ENTITY_TYPES.includes(entity)),
    required_fields: asArray(handoff.required_fields),
    optional_fields: asArray(handoff.optional_fields),
    evidence_gaps: evidenceGaps,
    reference_errors: referenceErrors,
    data_completeness: bundleEvaluation?.dataset_readiness,
    acquisition_tasks: acquisitionTasks,
    vertical_slice_candidates: options.vertical_slice_candidates || [],
    recommended_slice: options.recommended_slice || "N/A",
    publication_gate: publicationGate,
    next_action: publicationGate === PublicationState.BLOCKED || hasAcquisitionWork
      ? "Complete acquisition/correction tasks before product work."
      : "Prepare review package; do not publish or build UI without explicit approval.",
  });
}

export function scorePilotCandidate(candidate = {}) {
  const score = Math.round(
    (candidate.required_completeness || 0)
    + (candidate.source_quality || 0)
    + (candidate.build_relevance || 0)
    + (candidate.team_relation_richness || 0)
    + (candidate.search_user_demand || 0)
    + (candidate.maintenance_feasibility_score || candidate.maintenance_feasibility || 0),
  );

  const passesGate = score >= 70
    && candidate.required_factual_identity_available === true
    && candidate.non_public_readiness_record_possible === true
    && candidate.meaningful_skill_relation === true
    && candidate.equipment_or_karma_relation === true
    && candidate.potential_team_relation === true
    && candidate.maintenance_burden_acceptable === true;

  return {
    canonical_id: candidate.canonical_id,
    character: candidate.official_display_name,
    score,
    evidence_strength: candidate.evidence_strength || "UNKNOWN",
    major_gaps: candidate.major_gaps || [],
    decision: passesGate ? "PILOT_READY" : score >= 60 ? "NEAR_READY" : "RESEARCH_REQUIRED",
  };
}

export function selectPilotCharacters(candidates = []) {
  return candidates
    .map(scorePilotCandidate)
    .filter((candidate) => candidate.decision === "PILOT_READY")
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

export const PRODUCT_ARCHITECTURE_ENTITY_BOUNDARY = Object.freeze({
  canonical_entity_types: CANONICAL_ENTITY_TYPES,
  derived_artifact_types: DERIVED_ARTIFACT_TYPES,
});

function indexById(records = []) {
  return new Map(records.filter((entry) => entry?.id).map((entry) => [entry.id, entry]));
}

function countByEvidence(records = []) {
  return records.reduce((counts, record) => {
    const level = record?.evidence_level || "UNKNOWN";
    counts[level] = (counts[level] || 0) + 1;
    return counts;
  }, {});
}

function lifecycleCounts(tasks = []) {
  return tasks.reduce((counts, task) => {
    const status = task?.status || "UNKNOWN";
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {
    COMPLETED: 0,
    PARTIALLY_COMPLETED: 0,
    BLOCKED: 0,
    SUPERSEDED: 0,
  });
}

function verifiedSkillCount(skills = []) {
  return skills.reduce((counts, skill) => {
    if (skill?.verification_status === "VERIFIED" && skill?.evidence_level) {
      counts[skill.evidence_level] = (counts[skill.evidence_level] || 0) + 1;
    }
    return counts;
  }, {
    A_FIRST_HAND: 0,
    B_OFFICIAL: 0,
    C_COMMUNITY: 0,
  });
}

export function validateVerticalSliceReadinessPackage(pkg = {}) {
  const errors = [];
  const sourceIndex = indexById(pkg.sources || []);
  const currentVersion = pkg.game_version?.id;

  function requireSource(sourceId, owner) {
    if (!sourceIndex.has(sourceId)) {
      errors.push({
        code: "ERR_MISSING_SOURCE",
        owner,
        source_id: sourceId,
      });
    }
  }

  for (const source of pkg.sources || []) {
    if (!source.id || !source.evidence_level || !source.last_verified) {
      errors.push({
        code: "ERR_SOURCE_METADATA",
        owner: source.id || "source:unknown",
      });
    }
  }

  for (const fact of pkg.canonical_facts || []) {
    requireSource(fact.source_id, fact.id);
    if (currentVersion && fact.game_version !== currentVersion) {
      errors.push({
        code: "ERR_STALE_VERSION",
        owner: fact.id,
        game_version: fact.game_version,
      });
    }
    if (fact.evidence_level === "C_COMMUNITY" && fact.public_fact_allowed === true) {
      errors.push({
        code: "ERR_C_EVIDENCE_FACT_PROMOTION",
        owner: fact.id,
      });
    }
  }

  for (const skill of pkg.skills || []) {
    requireSource(skill.source_id, skill.id);
    if (skill.evidence_level === "C_COMMUNITY" && skill.public_fact_allowed === true) {
      errors.push({
        code: "ERR_C_EVIDENCE_FACT_PROMOTION",
        owner: skill.id,
      });
    }
  }

  for (const relation of pkg.team_relations || []) {
    for (const sourceId of relation.source_ids || []) {
      requireSource(sourceId, relation.id);
    }
    if (relation.classification === "official_relation" && relation.evidence_level === "C_COMMUNITY") {
      errors.push({
        code: "ERR_COMMUNITY_OFFICIAL_RELATION",
        owner: relation.id,
      });
    }
  }

  const build = pkg.build_artifact || {};
  if (build.artifact_class !== "DERIVED_EDITORIAL_ARTIFACT") {
    errors.push({
      code: "ERR_BUILD_ARTIFACT_CLASS",
      owner: build.id || "build-artifact:unknown",
    });
  }
  if (build.publication_gate === "PUBLISHED") {
    errors.push({
      code: "ERR_PUBLISHED_FORBIDDEN",
      owner: build.id || "build-artifact:unknown",
    });
  }
  if (build.duplicated_fact_values?.length > 0) {
    errors.push({
      code: "ERR_DERIVED_ARTIFACT_DUPLICATES_FACT",
      owner: build.id || "build-artifact:unknown",
    });
  }
  for (const ref of build.references || []) {
    const allKnownIds = new Set([
      pkg.character?.canonical_id,
      ...(pkg.skills || []).map((entry) => entry.id),
      ...(pkg.equipment || []).map((entry) => entry.id),
      ...(pkg.karma || []).map((entry) => entry.id),
      ...(pkg.team_relations || []).map((entry) => entry.id),
      ...(pkg.canonical_facts || []).map((entry) => entry.id),
    ].filter(Boolean));
    if (!allKnownIds.has(ref)) {
      errors.push({
        code: "ERR_DANGLING_REFERENCE",
        owner: build.id || "build-artifact:unknown",
        reference: ref,
      });
    }
  }

  const counts = pkg.field_evidence_matrix?.summary || {};
  const allRequiredComplete = counts.required_complete === counts.required_total;
  const noBlockingErrors = errors.length === 0;
  const noEvidenceCRequired = counts.required_evidence_c_only === 0;
  const readyForReview = allRequiredComplete && noBlockingErrors && noEvidenceCRequired;

  return {
    reference_integrity_result: noBlockingErrors ? "PASS" : "FAIL",
    errors,
    evidence_counts: countByEvidence(pkg.sources || []),
    skill_records_verified: verifiedSkillCount(pkg.skills || []),
    acquisition_lifecycle: lifecycleCounts(pkg.acquisition_tasks || []),
    team_relation_readiness: pkg.readiness?.team_relation || "INCOMPLETE",
    ready_for_human_review: readyForReview,
    overall_vertical_slice_status: readyForReview
      ? "VERTICAL_SLICE_READY_FOR_REVIEW"
      : pkg.vertical_slice_classification || "VERTICAL_SLICE_RESEARCH_READY",
  };
}
