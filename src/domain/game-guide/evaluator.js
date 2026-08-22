import {
  ArtifactClass,
  CANONICAL_ENTITY_TYPES,
  DERIVED_ARTIFACT_TYPES,
  EvidenceLevel,
  ErrorCode,
  ENTITY_CONTRACTS,
  HoldReason,
  PublicationState,
  ReadinessState,
  SourceType,
  TEAM_RELATION_TYPES,
} from "./contracts.js";
import { compareVersions, parseVersion } from "./ids.js";

const WRAPPER_KEYS = [
  "value",
  "source_id",
  "evidence_level",
  "game_version",
  "last_verified",
  "public_allowed",
  "editorial_judgment",
];

const JUDGMENT_REQUIRED_KEYS = [
  "kind",
  "basis_source_ids",
  "game_version",
  "author_editor_status",
  "last_reviewed",
  "confidence",
  "public_allowed",
];

const ENTITY_METRICS = new Set(["source_record", "game_version"]);

function artifactClassFor(entityType) {
  if (CANONICAL_ENTITY_TYPES.includes(entityType)) {
    return ArtifactClass.CANONICAL_ENTITY;
  }
  if (DERIVED_ARTIFACT_TYPES.includes(entityType)) {
    return ArtifactClass.DERIVED_EDITORIAL_ARTIFACT;
  }
  return undefined;
}

const RAW_FIELD_META = {
  source_record: new Set([
    "id",
    "source_type",
    "url_or_reference",
    "title",
    "publisher_or_owner",
    "retrieved_at",
    "evidence_level_ceiling",
    "copyright_or_license_note",
    "version_relevance",
    "stale_or_recheck_status",
    "public_allowed",
    "authors",
    "license_constraints",
    "notes",
  ]),
  game_version: new Set([
    "id",
    "version",
    "release_date",
    "source_id",
    "notes",
    "status",
  ]),
};

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isIsoDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T?\d{0,2}:?\d{0,2}:?\d{0,2}/.test(value);
}

function hasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

function asArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === undefined || value === null) {
    return [];
  }

  return [value];
}

function uniqueNormalized(values) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    const normalized = String(value).trim();
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    result.push(normalized);
  }

  return result;
}

function stableSerialize(value) {
  if (!isObject(value)) {
    return JSON.stringify(value);
  }

  const entries = Object.keys(value)
    .filter((key) => key !== "metadata" && key !== "audit")
    .sort()
    .map((key) => [key, value[key]]);

  const normalized = Object.fromEntries(
    entries.map(([key, raw]) => {
      if (Array.isArray(raw)) {
        return [key, raw.slice().sort()];
      }
      if (isObject(raw)) {
        return [key, JSON.parse(stableSerialize(raw))];
      }
      return [key, raw];
    }),
  );

  return JSON.stringify(normalized);
}

function emitIssue({ severity, code, entityType, entityId, field, message, resolver, owner }) {
  return {
    severity,
    code,
    entity_type: entityType,
    entity_id: entityId,
    field,
    message,
    resolver,
    owner,
  };
}

function hasEvidenceWrapper(value) {
  if (!isObject(value)) {
    return false;
  }

  if (!WRAPPER_KEYS.every((key) => Object.prototype.hasOwnProperty.call(value, key))) {
    return false;
  }

  return true;
}

function evidenceWrapperIssues(
  entityType,
  entityId,
  fieldName,
  fieldValue,
  sourceIndex,
  evidenceIssues,
) {
  if (!hasEvidenceWrapper(fieldValue)) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EVIDENCE_MISSING,
      entityType,
      entityId,
      field: fieldName,
      message: `${entityType}.${fieldName} must use the evidence wrapper.`,
      resolver: "Populate value/source/evidence metadata for this field.",
      owner: "Evidence",
    }));
    return false;
  }

  if (typeof fieldValue.value === "undefined") {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EVIDENCE_MISSING,
      entityType,
      entityId,
      field: `${fieldName}.value`,
      message: `${entityType}.${fieldName} missing wrapper value.`,
      resolver: "Attach the factual value with source metadata.",
      owner: "Evidence",
    }));
    return false;
  }

  if (typeof fieldValue.source_id !== "string" || !hasValue(fieldValue.source_id)) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EVIDENCE_MISSING,
      entityType,
      entityId,
      field: `${fieldName}.source_id`,
      message: `${entityType}.${fieldName} missing source_id.`,
      resolver: "Attach source_id that points to a source_record.",
      owner: "Evidence",
    }));
    return false;
  }

  if (!Object.values(EvidenceLevel).includes(fieldValue.evidence_level)) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EVIDENCE_MISSING,
      entityType,
      entityId,
      field: `${fieldName}.evidence_level`,
      message: `${entityType}.${fieldName} has invalid evidence_level.`,
      resolver: "Use A_FIRST_HAND | B_OFFICIAL | C_COMMUNITY.",
      owner: "Evidence",
    }));
    return false;
  }

  if (!hasValue(fieldValue.game_version)) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EVIDENCE_MISSING,
      entityType,
      entityId,
      field: `${fieldName}.game_version`,
      message: `${entityType}.${fieldName} missing game_version.`,
      resolver: "Attach the official current or explicit historical game-version id.",
      owner: "Evidence",
    }));
    return false;
  }

  if (!isIsoDate(fieldValue.last_verified)) {
    evidenceIssues.push(emitIssue({
      severity: "WARN",
      code: ErrorCode.ERR_EDITORIAL_MISSING_BASIS,
      entityType,
      entityId,
      field: `${fieldName}.last_verified`,
      message: `${entityType}.${fieldName} missing or invalid last_verified timestamp.`,
      resolver: "Add UTC ISO last_verified.",
      owner: "Evidence",
    }));
  }

  if (fieldValue.public_allowed !== true) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_FORBIDDEN_PUBLIC_FIELD,
      entityType,
      entityId,
      field: `${fieldName}.public_allowed`,
      message: `${entityType}.${fieldName} is not public_allowed=true.`,
      resolver: "Replace field value or block publish path for this field.",
      owner: "Compliance",
    }));
  }

  const source = sourceIndex.get(fieldValue.source_id);
  if (!source) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_INVALID_SOURCE_REF,
      entityType,
      entityId,
      field: `${fieldName}.source_id`,
      message: `Missing source_record ${fieldValue.source_id} for ${entityType}.${fieldName}`,
      resolver: "Create or reference a matching source_record first.",
      owner: "Evidence",
    }));
  } else if (source.public_allowed !== true) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_FORBIDDEN_PUBLIC_FIELD,
      entityType,
      entityId,
      field: `${fieldName}.source_id`,
      message: `source_record ${fieldValue.source_id} is not public_allowed.`,
      resolver: "Use a public-allowed source or keep blocked.",
      owner: "Compliance",
    }));
  }

  if (!isObject(fieldValue.editorial_judgment)) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EDITORIAL_MISSING_BASIS,
      entityType,
      entityId,
      field: `${fieldName}.editorial_judgment`,
      message: `${entityType}.${fieldName} missing editorial_judgment object.`,
      resolver: "Add editorial_judgment with basis source ids and review metadata.",
      owner: "Editorial",
    }));
    return false;
  }

  const judgment = fieldValue.editorial_judgment;
  if (!JUDGMENT_REQUIRED_KEYS.every((key) => Object.prototype.hasOwnProperty.call(judgment, key))) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EDITORIAL_MISSING_BASIS,
      entityType,
      entityId,
      field: `${fieldName}.editorial_judgment`,
      message: `${entityType}.${fieldName} editorial_judgment missing required metadata.`,
      resolver: "Add editorial_judgment kind/basis_source_ids/game_version/author/review/ confidence/public_allowed.",
      owner: "Editorial",
    }));
    return false;
  }

  if (!Array.isArray(judgment.basis_source_ids) || judgment.basis_source_ids.length === 0) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EDITORIAL_MISSING_BASIS,
      entityType,
      entityId,
      field: `${fieldName}.editorial_judgment.basis_source_ids`,
      message: `${entityType}.${fieldName} requires basis_source_ids for explicit editorial provenance.`,
      resolver: "Provide source ids that support the editorial judgment.",
      owner: "Editorial",
    }));
    return false;
  }

  if (!isIsoDate(judgment.last_reviewed)) {
    evidenceIssues.push(emitIssue({
      severity: "WARN",
      code: ErrorCode.ERR_EDITORIAL_MISSING_BASIS,
      entityType,
      entityId,
      field: `${fieldName}.editorial_judgment.last_reviewed`,
      message: `${entityType}.${fieldName} editorial_judgment missing/invalid last_reviewed.`,
      resolver: "Add UTC ISO last_reviewed.",
      owner: "Editorial",
    }));
  }

  if (fieldValue.public_allowed === true && judgment.public_allowed !== true) {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EDITORIAL_MISSING_BASIS,
      entityType,
      entityId,
      field: `${fieldName}.editorial_judgment.public_allowed`,
      message: "Mismatch in field/public allowed flags.",
      resolver: "Align editorial_judgment.public_allowed with field public_allowed=true.",
      owner: "Editorial",
    }));
  }

  if (fieldValue.evidence_level === EvidenceLevel.C_COMMUNITY && judgment.kind === "factual") {
    evidenceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EVIDENCE_MISSING,
      entityType,
      entityId,
      field: `${fieldName}.evidence_level`,
      message: `C_COMMUNITY cannot be used as a factual exact field for ${entityType}.${fieldName}.`,
      resolver: "Use factual source or mark as recommendation-level field with explicit context.",
      owner: "Evidence policy",
    }));
    return false;
  }

  return true;
}

function validateStaleVersion(fieldValue, currentVersion, entityType, entityId, fieldName, issues) {
  if (!currentVersion || !hasValue(fieldValue?.game_version)) {
    return;
  }

  if (!fieldValue.game_version.startsWith("game-version:")) {
    return;
  }

  if (compareVersions(fieldValue.game_version, currentVersion) !== 0) {
    issues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_STALE_VERSION,
      entityType,
      entityId,
      field: `${fieldName}.game_version`,
      message: `${entityType}.${fieldName} references ${fieldValue.game_version}, current is ${currentVersion}.`,
      resolver: "Re-verify and recapture this field in current version.",
      owner: "Version policy",
    }));
  }
}

function validateReference(value, targetType, entityType, entityId, fieldName, indexes, evidenceIssues) {
  const refs = uniqueNormalized(asArray(value));
  for (const reference of refs) {
    if (!indexes[targetType]?.has(reference)) {
      evidenceIssues.push(emitIssue({
        severity: "BLOCK",
        code: ErrorCode.ERR_DANGLING_REFERENCE,
        entityType,
        entityId,
        field: `${fieldName}.value`,
        message: `${fieldName} references ${targetType} ${reference} not found.`,
        resolver: `Create ${targetType}:${reference} before this relation is production-ready.`,
        owner: "Reference",
      }));
    }
  }
}

function validateSourceRecord(sourceRecord, entityId, sourceIssues) {
  const required = [
    "id",
    "source_type",
    "url_or_reference",
    "title",
    "publisher_or_owner",
    "retrieved_at",
    "evidence_level_ceiling",
    "copyright_or_license_note",
    "version_relevance",
    "stale_or_recheck_status",
    "public_allowed",
  ];

  if (!sourceRecord || !isObject(sourceRecord)) {
    sourceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EVIDENCE_MISSING,
      entityType: "source_record",
      entityId,
      field: "root",
      message: "Source record must be an object with required metadata fields.",
      resolver: "Create a valid source_record entity.",
      owner: "Source",
    }));
    return;
  }

  const allKeys = Object.keys(sourceRecord);
  const unknownKeys = allKeys.filter((field) => !RAW_FIELD_META.source_record.has(field));
  if (unknownKeys.length > 0) {
    sourceIssues.push(emitIssue({
      severity: "WARN",
      code: ErrorCode.ERR_EDITORIAL_MISSING_BASIS,
      entityType: "source_record",
      entityId: sourceRecord.id || entityId,
      field: "root",
      message: `source_record has non-standard fields: ${unknownKeys.join(", ")}.`,
      resolver: "Keep non-standard fields in optional metadata only.",
      owner: "Source",
    }));
  }

  if (!Object.values(SourceType).includes(sourceRecord.source_type)) {
    sourceIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_INVALID_SOURCE_REF,
      entityType: "source_record",
      entityId: sourceRecord.id || entityId,
      field: "source_type",
      message: "source_type must be official/first_hand/community/third_party/tool_export/analytics.",
      resolver: "Use one valid SourceType value.",
      owner: "Source",
    }));
  }

  for (const field of required) {
    if (!hasValue(sourceRecord[field])) {
      sourceIssues.push(emitIssue({
        severity: "BLOCK",
        code: ErrorCode.ERR_EVIDENCE_MISSING,
        entityType: "source_record",
        entityId: sourceRecord.id || entityId,
        field,
        message: `Source record missing ${field}.`,
        resolver: "Populate the source record with all required metadata.",
        owner: "Source",
      }));
    }
  }
}

function validateGameVersion(gameVersion, indexes, entityId, versionIssues) {
  if (!gameVersion || !isObject(gameVersion)) {
    versionIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_EVIDENCE_MISSING,
      entityType: "game_version",
      entityId,
      field: "root",
      message: "game_version must be an object with required metadata fields.",
      resolver: "Create a valid game_version entity.",
      owner: "Version",
    }));
    return;
  }

  const required = ["id", "version", "release_date", "source_id"];
  for (const field of required) {
    if (!hasValue(gameVersion[field])) {
      versionIssues.push(emitIssue({
        severity: "BLOCK",
        code: ErrorCode.ERR_EVIDENCE_MISSING,
        entityType: "game_version",
        entityId,
        field,
        message: `game_version missing ${field}.`,
        resolver: "Populate all required game_version fields.",
        owner: "Version",
      }));
    }
  }

  if (!isIsoDate(gameVersion.release_date)) {
    versionIssues.push(emitIssue({
      severity: "WARN",
      code: ErrorCode.ERR_EDITORIAL_MISSING_BASIS,
      entityType: "game_version",
      entityId,
      field: "release_date",
      message: "game_version.release_date should be ISO date-like.",
      resolver: "Use YYYY-MM-DD date format.",
      owner: "Version",
    }));
  }

  if (!indexes.source_record?.has(gameVersion.source_id)) {
    versionIssues.push(emitIssue({
      severity: "BLOCK",
      code: ErrorCode.ERR_INVALID_SOURCE_REF,
      entityType: "game_version",
      entityId,
      field: "source_id",
      message: `Missing source_record ${gameVersion.source_id} for this game_version.`,
      resolver: "Create referenced source_record first.",
      owner: "Version",
    }));
  }
}

function currentVersionFromVersions(gameVersions) {
  if (!gameVersions.length) {
    return null;
  }

  const current = gameVersions
    .filter((entry) => entry?.id && entry?.version)
    .slice()
    .sort((left, right) => {
      if ((left.status || "") === "CURRENT" && (right.status || "") !== "CURRENT") {
        return -1;
      }
      if ((right.status || "") === "CURRENT" && (left.status || "") !== "CURRENT") {
        return 1;
      }
      return compareVersions(`game-version:${right.version}`, `game-version:${left.version}`);
    })[0];

  return current?.id || null;
}

function resolveFieldValue(entity, fieldName) {
  const direct = entity?.fields?.[fieldName];
  if (isObject(direct)) {
    return direct;
  }
  return entity?.[fieldName];
}

function buildAcquisitionTask({
  entityType,
  entityId,
  fieldName,
  issueCode,
  issueMessage,
  publicationState = PublicationState.APPROVAL_REQUIRED,
}) {
  const safeId = String(entityId || "unknown").replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
  return {
    task_id: `acq-${safeId}-${String(fieldName).replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase()}`,
    entity_id: entityId,
    field_ids: [fieldName],
    goal: `Create production-ready value for ${entityType}.${fieldName}`,
    source_candidates: ["official source", "first-hand capture", "reproducible replay"],
    required_evidence_level: "B_OFFICIAL",
    collection_method: "Inspect source artifact or reproduce in game and capture reproducible proof.",
    validation_method: "Validate source_id, evidence fields, version freshness, and review metadata.",
    completion_criteria: "Field/value passes required metadata and reference checks.",
    unblock_condition: "All requested evidence and validation checks are satisfied.",
    publication_state: publicationState,
    ...(issueCode ? {
      invalid_or_missing_field: fieldName,
      current_problem: issueMessage || "Evidence/completeness issue.",
      required_correction: "Collect corrected factual value and metadata.",
    } : {}),
  };
}

function makeEntityEvalCounts(entity, requiredFields, optionalFields, presentRequired, presentOptional, evidenceCompletenessCount) {
  const requiredTotal = requiredFields.length || 0;
  const optionalTotal = optionalFields.length || 0;
  return {
    required_total: requiredTotal,
    required_present: presentRequired,
    optional_total: optionalTotal,
    optional_present: presentOptional,
    required_completeness: requiredTotal ? Number((presentRequired / requiredTotal).toFixed(2)) : 1,
    optional_completeness: optionalTotal ? Number((presentOptional / optionalTotal).toFixed(2)) : 1,
    evidence_completeness: requiredTotal ? Number((evidenceCompletenessCount / requiredTotal).toFixed(2)) : 1,
    version_freshness: requiredTotal
      ? Number((evidenceCompletenessCount / requiredTotal).toFixed(2))
      : 1,
  };
}

function buildIndexes(entities) {
  const indexes = {};
  for (const entityType of Object.keys(ENTITY_CONTRACTS)) {
    const map = new Map();
    for (const entity of entityPayloadForType(entities, entityType)) {
      if (entity?.id) {
        map.set(entity.id, entity);
      }
    }
    indexes[entityType] = map;
  }
  return indexes;
}

function entityPayloadForType(entities, type) {
  return Array.isArray(entities?.[type]) ? entities[type] : [];
}

export function evaluateGameGuideBundle(bundle = {}, options = {}) {
  const entities = bundle.entities || {};
  const evidenceErrors = [];
  const acquisitionTasks = [];
  const correctionTasks = [];
  const entityEvaluations = [];

  const indexes = buildIndexes(entities);
  const sourceRecords = entityPayloadForType(entities, "source_record");
  const gameVersions = entityPayloadForType(entities, "game_version");
  const sourceIndex = indexes.source_record;

  const versionIdByEntity = new Map();
  for (const sourceVersion of gameVersions) {
    if (sourceVersion?.id) {
      versionIdByEntity.set(sourceVersion.id, true);
    }
  }

  for (const sourceRecord of sourceRecords) {
    validateSourceRecord(sourceRecord, sourceRecord?.id, evidenceErrors);
  }

  for (const gameVersion of gameVersions) {
    validateGameVersion(gameVersion, indexes, gameVersion?.id, evidenceErrors);
  }

  const currentVersion = currentVersionFromVersions(gameVersions);
  const versionMetrics = {
    requiredWithEvidence: 0,
    totalRequired: 0,
    optionalWithValue: 0,
    optionalTotal: 0,
    versionFreshCount: 0,
    totalVersionChecks: 0,
  };

  for (const [entityType, contract] of Object.entries(ENTITY_CONTRACTS)) {
    const collection = entityPayloadForType(entities, entityType);
    const seenId = new Map();

    const requiredFields = contract.required_fields;
    const optionalFields = contract.optional_fields;

    for (const entity of collection) {
      const entityId = entity?.id;
      const holdMeta = entity?.metadata?.hold;
      const isHold = Boolean(holdMeta?.allowed);
      const blockingIssues = [];
      const entityEvidenceIssues = [];
      const entityMissingRequired = [];
      const entityMissingOptional = [];
      let presentRequired = 0;
      let presentOptional = 0;
      let requiredWithEvidence = 0;

      if (!entityId || typeof entityId !== "string") {
        blockingIssues.push(emitIssue({
          severity: "BLOCK",
          code: ErrorCode.ERR_EVIDENCE_MISSING,
          entityType,
          entityId,
          field: "id",
          message: `${entityType} entity id is required and must be canonical.`,
          resolver: "Assign a deterministic canonical id.",
          owner: "ID model",
        }));
      }

      if (entityId) {
        const signature = stableSerialize(entity.fields || entity);
        const prior = seenId.get(entityId);
        if (prior) {
          blockingIssues.push(emitIssue({
            severity: "BLOCK",
            code: ErrorCode.ERR_DUPLICATE_CANONICAL_ID,
            entityType,
            entityId,
            field: "id",
            message: `Duplicate canonical id in ${entityType}: ${entityId}.`,
            resolver: "Consolidate or split duplicated records with distinct canonical ids.",
            owner: "ID model",
          }));
          if (prior.signature !== signature) {
            blockingIssues.push(emitIssue({
              severity: "BLOCK",
              code: ErrorCode.ERR_CONFLICTING_CANONICAL_VALUE,
              entityType,
              entityId,
              field: "id",
              message: `Duplicate canonical id ${entityId} has conflicting canonical values.`,
              resolver: "Resolve duplicate canonical keys before publication.",
              owner: "Integrity",
            }));
          }
        } else {
          seenId.set(entityId, { signature });
        }
      }

      for (const fieldName of requiredFields) {
        const fieldValue = resolveFieldValue(entity, fieldName);
        const hasDirectValue = hasValue(fieldValue);

        if (!hasDirectValue) {
          entityMissingRequired.push(fieldName);
          blockingIssues.push(emitIssue({
            severity: "BLOCK",
            code: ErrorCode.ERR_EVIDENCE_MISSING,
            entityType,
            entityId,
            field: fieldName,
            message: `${entityType}.${fieldName} required field missing.`,
            resolver: "Collect required field data with evidence metadata.",
            owner: "Completeness",
          }));
          continue;
        }

        presentRequired += 1;
        if (!ENTITY_METRICS.has(entityType)) {
          const before = evidenceWrapperIssues(entityType, entityId, fieldName, fieldValue, sourceIndex, entityEvidenceIssues);
          if (before) {
            requiredWithEvidence += 1;
            if (!isObject(fieldValue)) {
              entityEvidenceIssues.push(emitIssue({
                severity: "BLOCK",
                code: ErrorCode.ERR_EVIDENCE_MISSING,
                entityType,
                entityId,
                field: fieldName,
                message: `${entityType}.${fieldName} must be evidence wrapper object.`,
                resolver: "Wrap required fields as evidence fields.",
                owner: "Evidence",
              }));
            }
          }
          validateStaleVersion(fieldValue, currentVersion, entityType, entityId, fieldName, entityEvidenceIssues);
          hasValue(fieldValue?.editorial_judgment?.basis_source_ids);
        }
      }

      for (const fieldName of optionalFields) {
        const fieldValue = resolveFieldValue(entity, fieldName);
        if (!hasValue(fieldValue)) {
          entityMissingOptional.push(fieldName);
          continue;
        }

        presentOptional += 1;
        if (!ENTITY_METRICS.has(entityType)) {
          const validEvidence = evidenceWrapperIssues(entityType, entityId, fieldName, fieldValue, sourceIndex, entityEvidenceIssues);
          if (validEvidence) {
            versionMetrics.optionalWithValue += 1;
          }
          validateStaleVersion(fieldValue, currentVersion, entityType, entityId, fieldName, entityEvidenceIssues);
          if (!isObject(fieldValue)) {
            entityEvidenceIssues.push(emitIssue({
              severity: "BLOCK",
              code: ErrorCode.ERR_EVIDENCE_MISSING,
              entityType,
              entityId,
              field: fieldName,
              message: `${entityType}.${fieldName} must be evidence wrapper object.`,
              resolver: "Wrap optional fields as evidence fields.",
              owner: "Evidence",
            }));
          }
        }
      }

      if (!ENTITY_METRICS.has(entityType)) {
        for (const [fieldName, targetType] of Object.entries(contract.reference_fields || {})) {
          const fieldValue = resolveFieldValue(entity, fieldName);
          if (hasValue(fieldValue)) {
            const value = fieldValue.value ?? fieldValue;
            validateReference(value, targetType, entityType, entityId, fieldName, indexes, entityEvidenceIssues);
          }
        }
      }

      if (entityType === "team_relation") {
        const relationType = resolveFieldValue(entity, "relation_type")?.value;
        if (!TEAM_RELATION_TYPES.includes(String(relationType || ""))) {
          entityEvidenceIssues.push(emitIssue({
            severity: "BLOCK",
            code: ErrorCode.ERR_EVIDENCE_MISSING,
            entityType,
            entityId,
            field: "relation_type",
            message: `Invalid relation_type ${String(relationType || "unknown")} for team_relation.`,
            resolver: `Use one of: ${TEAM_RELATION_TYPES.join(", ")}`,
            owner: "Model",
          }));
        }

        const fromId = resolveFieldValue(entity, "from_character_id")?.value;
        const toId = resolveFieldValue(entity, "to_character_id")?.value;
        if (fromId && toId && fromId === toId) {
          entityEvidenceIssues.push(emitIssue({
            severity: "BLOCK",
            code: ErrorCode.ERR_CONFLICTING_CANONICAL_VALUE,
            entityType,
            entityId,
            field: "from_character_id,to_character_id",
            message: "Team relation cannot reference the same character in both sides.",
            resolver: "Set distinct from/to character ids.",
            owner: "Model",
          }));
        }
      }

      const blockingFromEvidence = entityEvidenceIssues.filter((issue) => issue.severity === "BLOCK");
      const blockingFromEntity = blockingIssues.concat(blockingFromEvidence);
      evidenceErrors.push(...blockingFromEntity);

      if (!isHold) {
        for (const fieldName of entityMissingRequired) {
          acquisitionTasks.push(
            buildAcquisitionTask({
              entityType,
              entityId,
              fieldName,
              issueCode: ErrorCode.ERR_EVIDENCE_MISSING,
              issueMessage: `${entityType}.${fieldName} required data missing.`,
            }),
          );
        }

        for (const issue of blockingFromEvidence) {
          if (!["ERR_EVIDENCE_MISSING", "ERR_INVALID_SOURCE_REF", "ERR_STALE_VERSION", "ERR_EDITORIAL_MISSING_BASIS", "ERR_FORBIDDEN_PUBLIC_FIELD"].includes(issue.code)) {
            continue;
          }
          correctionTasks.push(
            buildAcquisitionTask({
              entityType,
              entityId,
              fieldName: issue.field || "unknown",
              issueCode: issue.code,
              issueMessage: issue.message,
            }),
          );
        }
      }

      const optionalCompleteness = makeEntityEvalCounts(
        entity,
        requiredFields,
        optionalFields,
        presentRequired,
        optionalFields.length ? presentOptional : 0,
        requiredWithEvidence,
      );

      const versionFreshness = requiredFields.length
        ? Number((requiredWithEvidence / requiredFields.length).toFixed(2))
        : 1;
      const completeness = {
        required_completeness: optionalCompleteness.required_completeness,
        optional_completeness: optionalCompleteness.optional_completeness,
        evidence_completeness: optionalCompleteness.evidence_completeness,
        version_freshness: versionFreshness,
      };

      let readiness;
      if (isHold) {
        readiness = ReadinessState.INCOMPLETE;
      } else if (entityMissingRequired.length > 0) {
        readiness = ReadinessState.INCOMPLETE;
      } else if (blockingFromEntity.length > 0) {
        readiness = ReadinessState.BLOCKED;
      } else if (entityMissingOptional.length > 0) {
        readiness = ReadinessState.RESEARCH_READY;
      } else {
        readiness = ReadinessState.READY_FOR_REVIEW;
      }

      versionMetrics.requiredWithEvidence += requiredWithEvidence;
      versionMetrics.totalRequired += requiredFields.length;
      versionMetrics.totalVersionChecks += requiredFields.length;
      versionMetrics.versionFreshCount += requiredWithEvidence;
      versionMetrics.optionalTotal += optionalFields.length;

      entityEvaluations.push({
        entity_id: entityId,
        entity_type: entityType,
        artifact_class: artifactClassFor(entityType),
        completeness,
        readiness_state: readiness,
        blocking_errors: blockingFromEntity,
        acquisition_tasks: isHold
          ? []
          : acquisitionTasks.filter((task) => task.entity_id === entityId),
        correction_tasks: isHold
          ? []
          : correctionTasks.filter((task) => task.entity_id === entityId),
        hold: isHold
          ? {
            allowed: true,
            reason: holdMeta?.reason || HoldReason.OUT_OF_SCOPE,
            explicit_unblock_condition: holdMeta?.unblock_condition || "Demand/legal blocker must be resolved or explicitly waived.",
          }
          : undefined,
      });
    }
  }

  const allReadiness = new Set(entityEvaluations.map((entry) => entry.readiness_state));
  let overallReadiness = ReadinessState.READY_FOR_REVIEW;
  if (options.legitimate_hold) {
    overallReadiness = ReadinessState.INCOMPLETE;
  } else if (allReadiness.has(ReadinessState.BLOCKED)) {
    overallReadiness = ReadinessState.BLOCKED;
  } else if (allReadiness.has(ReadinessState.INCOMPLETE)) {
    overallReadiness = ReadinessState.INCOMPLETE;
  } else if (allReadiness.has(ReadinessState.RESEARCH_READY)) {
    overallReadiness = ReadinessState.RESEARCH_READY;
  }

  const publication_gate = overallReadiness === ReadinessState.READY_FOR_REVIEW
    ? PublicationState.APPROVAL_REQUIRED
    : overallReadiness === ReadinessState.RESEARCH_READY
      ? PublicationState.RESEARCH_READY
      : PublicationState.BLOCKED;

  const requiredTotal = versionMetrics.totalRequired || 1;
  const optionalTotal = versionMetrics.optionalTotal || 1;
  const optionalWithEvidence = versionMetrics.optionalWithValue || 0;
  const dataset_readiness = {
    required_completeness: Number((versionMetrics.requiredWithEvidence / requiredTotal).toFixed(2)),
    optional_completeness: Number((optionalWithEvidence / optionalTotal).toFixed(2)),
    evidence_completeness: Number((versionMetrics.requiredWithEvidence / requiredTotal).toFixed(2)),
    version_freshness: versionMetrics.totalVersionChecks
      ? Number((versionMetrics.versionFreshCount / versionMetrics.totalVersionChecks).toFixed(2))
      : 1,
  };

  const uniqueAcquisition = acquisitionTasks.filter((task, index, list) =>
    index === list.findIndex((item) => item.task_id === task.task_id),
  );
  const uniqueCorrection = correctionTasks.filter((task, index, list) =>
    index === list.findIndex((item) => item.task_id === task.task_id),
  );

  return {
    overall_readiness_state: overallReadiness,
    dataset_readiness,
    publication_gate,
    evidence_errors: evidenceErrors,
    entity_evaluations: entityEvaluations,
    acquisition_tasks: uniqueAcquisition,
    correction_tasks: uniqueCorrection,
    canonical_index_sizes: Object.fromEntries(
      Object.entries(indexes).map(([type, map]) => [type, map.size]),
    ),
    current_version: currentVersion,
  };
}

export function runSelectionRubric(entityEvaluations = []) {
  return entityEvaluations
    .map((entry) => {
      const score = Math.round(
        (entry.completeness?.required_completeness || 0) * 35
        + (entry.completeness?.evidence_completeness || 0) * 35
        + (entry.entity_type === "build_recommendation" ? 10 : 0)
        + (entry.entity_type === "team_relation" ? 5 : 0)
        + (entry.completeness?.version_freshness || 0) * 15,
      );

      return {
        entity_id: entry.entity_id,
        entity_type: entry.entity_type,
        score,
        rationale: {
          required_completeness: entry.completeness?.required_completeness || 0,
          source_quality: entry.completeness?.evidence_completeness || 0,
          build_relevance: entry.entity_type === "build_recommendation" ? 1 : 0,
          team_relation_richness: entry.entity_type === "team_relation" ? 1 : 0,
          maintenance_feasibility: entry.completeness?.version_freshness || 0,
        },
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}
