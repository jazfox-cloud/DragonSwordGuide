import { CanonicalIdPrefix } from "./contracts.js";

const illegalTokenChars = /[^a-z0-9\.\-_|]/g;

export function normalizeSlug(raw) {
  if (typeof raw !== "string") {
    return "";
  }

  const normalized = raw
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[/?#%]/g, "")
    .replace(/-+/g, "-")
    .replace(illegalTokenChars, "-")
    .replace(/-{2,}/g, "-")
    .replace(/(^-+)|(-+$)/g, "");

  return normalized || "entity";
}

function isPrefixValid(entityType, prefix) {
  return Object.prototype.hasOwnProperty.call(CanonicalIdPrefix, entityType)
    && CanonicalIdPrefix[entityType] === prefix;
}

function normalizeBase(entityType, seed) {
  if (entityType === "team_relation") {
    const chars = [seed?.from_character_slug, seed?.to_character_slug].filter(Boolean);
    if (chars.length !== 2) {
      return "invalid";
    }
    const sorted = chars.slice().sort();
    const relation = normalizeSlug(seed?.relation_type || "") || "relation";
    const version = normalizeSlug(seed?.version || "");
    return `${sorted[0]}|${sorted[1]}|${relation}|${version}`;
  }

  const body = normalizeSlug(seed?.slug || seed?.version || seed || "");
  return body;
}

export function makeCanonicalId(entityType, seed = "", existingIds = new Set()) {
  const prefix = CanonicalIdPrefix[entityType];
  if (!prefix) {
    return "";
  }

  const normalizedBody = normalizeBase(entityType, seed);
  if (!normalizedBody || normalizedBody === "invalid") {
    return "";
  }

  let candidate = `${prefix}:${normalizedBody}`;
  if (!existingIds.has(candidate)) {
    return candidate;
  }

  for (let index = 2; index < 100; index += 1) {
    const suffixed = `${candidate}-${index}`;
    if (!existingIds.has(suffixed)) {
      return suffixed;
    }
  }

  return "";
}

export function validateCanonicalId(entityType, id, knownIds = new Set()) {
  if (typeof id !== "string" || !id.includes(":")) {
    return false;
  }

  const [prefix, body] = id.split(":", 2);
  if (!body) {
    return false;
  }

  if (!isPrefixValid(entityType, prefix)) {
    return false;
  }

  if (/[^a-z0-9\.\-|]/g.test(body) && entityType !== "team_relation") {
    return false;
  }

  if (entityType === "team_relation" && !/^.+\|.+\|.+\|.+$/.test(body)) {
    return false;
  }

  if (knownIds.has(id) && knownIds instanceof Set) {
    return false;
  }

  return true;
}

export function parseVersion(versionLike) {
  if (typeof versionLike !== "string") {
    return [];
  }

  const version = versionLike.replace(/^game-version:/, "");
  return version
    .split(".")
    .map((part) => Number.parseInt(part, 10))
    .map((value) => (Number.isFinite(value) ? value : 0));
}

export function compareVersions(a, b) {
  const left = parseVersion(a);
  const right = parseVersion(b);
  const max = Math.max(left.length, right.length);

  for (let i = 0; i < max; i += 1) {
    const diff = (left[i] || 0) - (right[i] || 0);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}

