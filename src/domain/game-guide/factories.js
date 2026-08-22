import { EvidenceLevel, SourceType, EditorialKind, Confidence, EditorialReviewerStatus } from "./contracts.js";

export function buildFieldValue(value, options = {}) {
  const {
    source_id,
    evidence_level = EvidenceLevel.B_OFFICIAL,
    game_version = "",
    last_verified = "",
    public_allowed = true,
    editorial_judgment,
  } = options;

  return {
    value,
    source_id,
    evidence_level,
    game_version,
    last_verified,
    public_allowed,
    editorial_judgment: editorial_judgment || {
      kind: EditorialKind.FACTUAL,
      basis_source_ids: source_id ? [source_id] : [],
      game_version,
      author_editor_status: EditorialReviewerStatus.VERIFIED_REVIEWER,
      last_reviewed: last_verified,
      confidence: Confidence.MEDIUM,
      public_allowed,
    },
  };
}

export function buildEditorialJudgment({
  kind = EditorialKind.RECOMMENDATION,
  basis_source_ids = [],
  game_version = "",
  author_editor_status = EditorialReviewerStatus.VERIFIED_REVIEWER,
  last_reviewed = "",
  confidence = Confidence.MEDIUM,
  public_allowed = true,
} = {}) {
  return {
    kind,
    basis_source_ids,
    game_version,
    author_editor_status,
    last_reviewed,
    confidence,
    public_allowed,
  };
}

export function buildSourceRecord(overrides = {}) {
  return {
    id: overrides.id || `source:${overrides.slug || "source-record"}`,
    source_type: overrides.source_type || SourceType.OFFICIAL,
    url_or_reference: overrides.url_or_reference || "",
    title: overrides.title || "",
    publisher_or_owner: overrides.publisher_or_owner || "",
    retrieved_at: overrides.retrieved_at || "",
    evidence_level_ceiling: overrides.evidence_level_ceiling || EvidenceLevel.B_OFFICIAL,
    copyright_or_license_note: overrides.copyright_or_license_note || "",
    public_allowed: overrides.public_allowed !== false,
    version_relevance: overrides.version_relevance || "",
    stale_or_recheck_status: overrides.stale_or_recheck_status || "FRESH",
    authors: overrides.authors || [],
    license_constraints: overrides.license_constraints || "",
    notes: overrides.notes || "",
  };
}

export function buildGameVersion(overrides = {}) {
  return {
    id: overrides.id || `game-version:${overrides.version || "0.0.0"}`,
    version: overrides.version || "0.0.0",
    release_date: overrides.release_date || "",
    source_id: overrides.source_id || "",
    notes: overrides.notes || "",
    status: overrides.status || "CURRENT",
  };
}

export function buildEntity(type, id, fields = {}, metadata = {}) {
  return {
    type,
    id,
    fields,
    metadata,
  };
}

