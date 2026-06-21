import { refracturedPremiumReport } from "../src/data/refracturedPremiumReport.js";

const REQUIRED_TOP_LEVEL_KEYS = [
  "meta",
  "marketEvidence",
  "audienceSignals",
  "reviewCommunityThemes",
  "steamPageLab",
  "rogueliteLoopLab",
  "actionPlan",
  "evidenceLedger",
];

const REQUIRED_LAYERED_MODULES = [
  "marketEvidence",
  "audienceSignals",
  "reviewCommunityThemes",
  "steamPageLab",
  "rogueliteLoopLab",
  "actionPlan",
];

const REQUIRED_LAYERS = ["facts", "estimates", "interpretation", "actions"];

const ALLOWED_CONFIDENCE = new Set(["confirmed", "reported", "estimated", "inferred", "missing"]);
const FACT_CONFIDENCE = new Set(["confirmed", "reported"]);

const REQUIRED_CONFIDENCE_ARRAYS = [
  ["readerLenses", refracturedPremiumReport.readerLenses],
  ["playerSignals", refracturedPremiumReport.playerSignals],
  ["marketEvidence.comparables", refracturedPremiumReport.marketEvidence?.comparables],
  ["rogueliteDirections", refracturedPremiumReport.rogueliteDirections],
  ["positioningAngles", refracturedPremiumReport.positioningAngles],
  ["strategicPaths", refracturedPremiumReport.strategicPaths],
  ["actionPlan.timeline", refracturedPremiumReport.actionPlan?.timeline],
  ["legacyActionTimeline", refracturedPremiumReport.legacyActionTimeline],
];

const FORBIDDEN_COPY_TARGETS = [
  ["meta", refracturedPremiumReport.meta],
  ["thesis", refracturedPremiumReport.thesis],
  ["marketEvidence", refracturedPremiumReport.marketEvidence],
  ["audienceSignals", refracturedPremiumReport.audienceSignals],
  ["reviewCommunityThemes", refracturedPremiumReport.reviewCommunityThemes],
  ["steamPageLab", refracturedPremiumReport.steamPageLab],
  ["rogueliteLoopLab", refracturedPremiumReport.rogueliteLoopLab],
  ["actionPlan", refracturedPremiumReport.actionPlan],
  ["evidenceLedger", refracturedPremiumReport.evidenceLedger],
  ["readerLenses", refracturedPremiumReport.readerLenses],
  ["playerSignals", refracturedPremiumReport.playerSignals],
  ["rogueliteDirections", refracturedPremiumReport.rogueliteDirections],
  ["comparables", refracturedPremiumReport.comparables],
  ["positioningAngles", refracturedPremiumReport.positioningAngles],
  ["strategicPaths", refracturedPremiumReport.strategicPaths],
  ["legacyActionTimeline", refracturedPremiumReport.legacyActionTimeline],
  ["evidence", refracturedPremiumReport.evidence],
];

const FORBIDDEN_FACT_COPY = [
  "estimate",
  "estimated",
  "inferred",
  "proxy",
  "owners",
  "ownership",
  "revenue",
  "sales",
  "assume",
  "assumption",
  "likely",
  "directional",
];

const FACT_CLAIM_TEXT_FIELDS = ["statement", "summary", "description", "note", "body", "title", "recommendation"];

const FORBIDDEN_PRIMARY_COPY = [
  "dogfood",
  "prototype caution",
  "Data Analytics artifact is the primary",
  "Market Fit Scorecard",
  "Roguelite Fit Matrix",
  "Evidence Confidence Ledger",
  "Comparable Evidence",
  "Review Theme Mining",
  "as an AI language model",
];

function fail(message) {
  console.error(`Refractured report check failed: ${message}`);
  process.exitCode = 1;
}

function isObject(value) {
  return Boolean(value) && typeof value === "object";
}

function isPlainObject(value) {
  return isObject(value) && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function collectionItems(collection) {
  if (Array.isArray(collection)) {
    return collection.map((item, index) => [index, item]);
  }

  if (isPlainObject(collection)) {
    return Object.entries(collection);
  }

  return [];
}

function collectionHasItems(collection) {
  return collectionItems(collection).length > 0;
}

function requireEvidenceRefs(path, item) {
  if (!Array.isArray(item?.evidenceRefs) || item.evidenceRefs.length === 0) {
    fail(`${path} must include at least one evidenceRef`);
    return;
  }

  item.evidenceRefs.forEach((ref, index) => {
    if (!isNonEmptyString(ref)) {
      fail(`${path}.evidenceRefs[${index}] must be a non-empty string`);
    }
  });
}

function requireConfidence(path, item, allowed = ALLOWED_CONFIDENCE) {
  if (!allowed.has(item?.confidence)) {
    fail(`${path}.confidence must be one of: ${Array.from(allowed).join(", ")}`);
  }
}

function requireLayeredModule(moduleKey) {
  const module = refracturedPremiumReport[moduleKey];
  if (!isPlainObject(module)) {
    fail(`${moduleKey} must be a plain V4 module object, not an array`);
    return;
  }

  for (const layer of REQUIRED_LAYERS) {
    if (!collectionHasItems(module[layer])) {
      fail(`${moduleKey}.${layer} must contain at least one V4 layer item`);
      continue;
    }

    for (const [index, item] of collectionItems(module[layer])) {
      const path = `${moduleKey}.${layer}[${index}]`;
      if (!isObject(item)) {
        fail(`${path} must be an object`);
        continue;
      }

      if (!isNonEmptyString(item.id)) {
        fail(`${path}.id must be a non-empty string`);
      }

      requireConfidence(path, item, layer === "facts" ? FACT_CONFIDENCE : ALLOWED_CONFIDENCE);

      if (layer === "facts") {
        blockEstimatesInFacts(path, item);
      }

      requireEvidenceRefs(path, item);
    }
  }
}

function blockEstimatesInFacts(path, item) {
  for (const field of FACT_CLAIM_TEXT_FIELDS) {
    const value = item?.[field];
    if (!isNonEmptyString(value)) {
      continue;
    }

    const text = value.toLowerCase();
    for (const forbidden of FORBIDDEN_FACT_COPY) {
      if (text.includes(forbidden)) {
        fail(`${path}.${field} appears to treat an estimate or recommendation as a fact: "${forbidden}"`);
      }
    }
  }
}

function requireUniqueIds(key, items) {
  const seen = new Set();

  for (const [index, item] of collectionItems(items)) {
    if (!isObject(item)) {
      continue;
    }

    if (!isNonEmptyString(item.id)) {
      fail(`${key}[${index}] must include a non-empty id`);
      continue;
    }

    if (seen.has(item.id)) {
      fail(`${key} contains duplicate id "${item.id}"`);
    }
    seen.add(item.id);
  }
}

function requireNoSharedIds(leftPath, leftItems, rightPath, rightItems) {
  const leftIds = new Set();

  for (const [, item] of collectionItems(leftItems)) {
    if (isNonEmptyString(item?.id)) {
      leftIds.add(item.id);
    }
  }

  for (const [index, item] of collectionItems(rightItems)) {
    if (isNonEmptyString(item?.id) && leftIds.has(item.id)) {
      fail(`${rightPath}[${index}].id duplicates ${leftPath} id "${item.id}"`);
    }
  }
}

function requireCollectionConfidence(path, items) {
  if (!Array.isArray(items)) {
    fail(`${path} must be an array`);
    return;
  }

  items.forEach((item, index) => {
    requireConfidence(`${path}[${index}]`, item);
  });
}

function requireEvidenceSourceConfidence(path, source) {
  requireConfidence(path, source);

  if (!ALLOWED_CONFIDENCE.has(source?.level)) {
    fail(`${path}.level must be one of: ${Array.from(ALLOWED_CONFIDENCE).join(", ")}`);
    return;
  }

  if (source.confidence !== source.level) {
    fail(`${path}.confidence and ${path}.level must match when both exist`);
  }
}

function requireNoForbiddenCopy(path, value) {
  const serialized = JSON.stringify(value ?? null);

  for (const forbidden of FORBIDDEN_PRIMARY_COPY) {
    if (serialized.toLowerCase().includes(forbidden.toLowerCase())) {
      fail(`forbidden report copy found in ${path}: ${forbidden}`);
    }
  }
}

function requireUniqueLayerIds(moduleKey) {
  for (const layer of REQUIRED_LAYERS) {
    requireUniqueIds(`${moduleKey}.${layer}`, refracturedPremiumReport[moduleKey]?.[layer]);
  }
}

function requireComparableMarketData(item, index) {
  const path = `marketEvidence.comparables[${index}]`;

  if (typeof item?.appId !== "number") {
    fail(`${path}.appId must be a Steam app id`);
  }

  for (const key of ["title", "steamUrl", "imageUrl", "marketLane", "publicSignal", "refracturedUse"]) {
    if (!isNonEmptyString(item?.[key])) {
      fail(`${path}.${key} must be a non-empty string`);
    }
  }

  if (!Array.isArray(item?.tags) || item.tags.length < 4) {
    fail(`${path}.tags must contain at least four public Steam/SteamSpy-style tags`);
  }

  if (!Array.isArray(item?.genres) || item.genres.length === 0) {
    fail(`${path}.genres must contain at least one public Steam genre`);
  }

  for (const key of ["release", "price", "reviewTone", "positiveRate", "retrievedAt"]) {
    if (!isNonEmptyString(item?.steamSnapshot?.[key])) {
      fail(`${path}.steamSnapshot.${key} must be a non-empty string`);
    }
  }

  for (const key of ["reviewsTotal", "reviewsPositive", "reviewsNegative", "currentPlayers"]) {
    if (typeof item?.steamSnapshot?.[key] !== "number") {
      fail(`${path}.steamSnapshot.${key} must be a number`);
    }
  }

  for (const key of ["ownerRange", "unitRange", "grossRange", "caveat"]) {
    if (!isNonEmptyString(item?.estimateSnapshot?.[key])) {
      fail(`${path}.estimateSnapshot.${key} must be a non-empty string`);
    }
  }

  for (const key of ["store", "reviews", "currentPlayers", "owners", "revenueProxy"]) {
    if (!ALLOWED_CONFIDENCE.has(item?.sourceConfidence?.[key])) {
      fail(`${path}.sourceConfidence.${key} must be one of: ${Array.from(ALLOWED_CONFIDENCE).join(", ")}`);
    }
  }

  requireEvidenceRefs(path, item);
}

function collectEvidenceRefs(value, refs = []) {
  if (!isObject(value)) {
    return refs;
  }

  if (Array.isArray(value.evidenceRefs)) {
    refs.push(...value.evidenceRefs);
  }

  for (const [, item] of collectionItems(value)) {
    collectEvidenceRefs(item, refs);
  }

  return refs;
}

for (const key of REQUIRED_TOP_LEVEL_KEYS) {
  if (!(key in refracturedPremiumReport)) {
    fail(`missing required V4 top-level key: ${key}`);
  }
}

if (refracturedPremiumReport.meta?.id !== "refractured-premium-market-intelligence-v4") {
  fail("meta.id must be refractured-premium-market-intelligence-v4");
}

if (refracturedPremiumReport.meta?.primaryRoute !== "#client-report/refractured") {
  fail("meta.primaryRoute must be #client-report/refractured");
}

if (refracturedPremiumReport.meta?.surface !== "interactive-client-report") {
  fail("meta.surface must be interactive-client-report");
}

if (refracturedPremiumReport.meta?.language !== "en") {
  fail("meta.language must be en");
}

if (!String(refracturedPremiumReport.meta?.stage ?? "").toLowerCase().includes("private pre-steam validation")) {
  fail("meta.stage must preserve private pre-Steam validation framing");
}

for (const moduleKey of REQUIRED_LAYERED_MODULES) {
  requireLayeredModule(moduleKey);
  requireUniqueLayerIds(moduleKey);
}

for (const [path, items] of REQUIRED_CONFIDENCE_ARRAYS) {
  requireCollectionConfidence(path, items);
}

if (!Array.isArray(refracturedPremiumReport.actionPlan?.timeline) || refracturedPremiumReport.actionPlan.timeline.length === 0) {
  fail("actionPlan.timeline must contain the JSON-visible action timeline");
}

if ("steps" in (refracturedPremiumReport.actionPlan ?? {})) {
  fail("actionPlan.steps is a deprecated duplicate alias; use actionPlan.timeline or legacyActionTimeline");
}

requireNoSharedIds(
  "actionPlan.actions",
  refracturedPremiumReport.actionPlan?.actions,
  "actionPlan.timeline",
  refracturedPremiumReport.actionPlan?.timeline,
);

if (!Array.isArray(refracturedPremiumReport.marketEvidence?.comparables) || refracturedPremiumReport.marketEvidence.comparables.length !== 6) {
  fail("marketEvidence.comparables must contain the six comparable games");
} else {
  refracturedPremiumReport.marketEvidence.comparables.forEach(requireComparableMarketData);
}

if (
  !Array.isArray(refracturedPremiumReport.reviewCommunityThemes?.communityGaps) ||
  refracturedPremiumReport.reviewCommunityThemes.communityGaps.length === 0
) {
  fail("reviewCommunityThemes.communityGaps must record missing Reddit/Discord/social listening gaps");
} else {
  for (const [index, gap] of collectionItems(refracturedPremiumReport.reviewCommunityThemes.communityGaps)) {
    if (gap?.confidence !== "missing") {
      fail(`reviewCommunityThemes.communityGaps[${index}].confidence must be missing`);
    }
  }
}

const evidenceLedger = refracturedPremiumReport.evidenceLedger;
if (!Array.isArray(evidenceLedger) || evidenceLedger.length < 12) {
  fail("evidenceLedger must contain at least 12 source records");
}

const evidenceIds = new Set();
for (const [index, source] of collectionItems(evidenceLedger)) {
  if (!isObject(source) || !isNonEmptyString(source.id)) {
    fail(`evidenceLedger[${index}] must include a non-empty id`);
    continue;
  }

  if (evidenceIds.has(source.id)) {
    fail(`evidenceLedger contains duplicate id "${source.id}"`);
  }
  evidenceIds.add(source.id);

  requireEvidenceSourceConfidence(`evidenceLedger[${index}]`, source);

  for (const key of ["label", "source", "matters", "unknown"]) {
    if (!isNonEmptyString(source[key])) {
      fail(`evidenceLedger[${index}].${key} must be a non-empty string`);
    }
  }
}

for (const ref of collectEvidenceRefs(refracturedPremiumReport)) {
  if (!evidenceIds.has(ref)) {
    fail(`missing evidence source for "${ref}"`);
  }
}

for (const [path, value] of FORBIDDEN_COPY_TARGETS) {
  requireNoForbiddenCopy(path, value);
}

if (!process.exitCode) {
  console.log("Refractured report check passed");
}
