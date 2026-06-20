import { refracturedPremiumReport } from "../src/data/refracturedPremiumReport.js";

const REQUIRED_TOP_LEVEL_ARRAYS = [
  ["readerLenses", 7],
  ["playerSignals", 4],
  ["rogueliteDirections", 3],
  ["comparables", 6],
  ["positioningAngles", 3],
  ["strategicPaths", 3],
  ["actionPlan", 6],
  ["evidence", 12],
];

const REQUIRED_EVIDENCE_REF_ARRAYS = [
  "readerLenses",
  "playerSignals",
  "rogueliteDirections",
  "comparables",
  "positioningAngles",
  "strategicPaths",
  "actionPlan",
];

const REQUIRED_UNIQUE_ID_ARRAYS = [
  "readerLenses",
  "playerSignals",
  "rogueliteDirections",
  "comparables",
  "positioningAngles",
  "strategicPaths",
  "actionPlan",
  "evidence",
];

const REQUIRED_UNIQUE_UI_ID_ARRAYS = [
  "readerLenses",
  "playerSignals",
  "rogueliteDirections",
  "comparables",
  "positioningAngles",
  "strategicPaths",
  "actionPlan",
];

const REQUIRED_THESIS_HEADLINE =
  "Refractured should sell the feeling of surviving a brutal retry loop, not the label of a 2.5D brawler.";

const FORBIDDEN_PRIMARY_COPY = [
  "dogfood",
  "prototype caution",
  "Market Fit Scorecard",
  "Roguelite Fit Matrix",
  "Comparable Evidence",
  "Review Theme Mining",
  "Evidence Confidence Ledger",
  "Data Analytics artifact is the primary",
  "as an AI language model",
];

function fail(message) {
  console.error(`Refractured report check failed: ${message}`);
  process.exitCode = 1;
}

function requireEvidenceRefs(path, item) {
  if (!Array.isArray(item?.evidenceRefs) || item.evidenceRefs.length === 0) {
    fail(`${path} must include at least one evidenceRef`);
    return;
  }

  item.evidenceRefs.forEach((ref, index) => {
    if (typeof ref !== "string" || ref.length === 0) {
      fail(`${path}.evidenceRefs[${index}] must be a non-empty string`);
    }
  });
}

function requireUniqueIds(key, items) {
  if (!Array.isArray(items)) {
    return;
  }

  const seen = new Set();
  items.forEach((item, index) => {
    if (!item || typeof item !== "object" || typeof item.id !== "string" || item.id.length === 0) {
      fail(`${key}[${index}] must include a non-empty id`);
      return;
    }

    if (seen.has(item.id)) {
      fail(`${key} contains duplicate id "${item.id}"`);
    }
    seen.add(item.id);
  });
}

function requireUniqueUiIdsAcrossSections(keys) {
  const seen = new Map();

  for (const key of keys) {
    const items = refracturedPremiumReport[key];
    if (!Array.isArray(items)) {
      continue;
    }

    items.forEach((item) => {
      if (!item || typeof item !== "object" || typeof item.id !== "string" || item.id.length === 0) {
        return;
      }

      const previousKey = seen.get(item.id);
      if (previousKey && previousKey !== key) {
        fail(`ui report id "${item.id}" is reused across sections`);
        return;
      }

      seen.set(item.id, key);
    });
  }
}

function collectEvidenceRefs(value, refs = []) {
  if (!value || typeof value !== "object") {
    return refs;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectEvidenceRefs(item, refs));
    return refs;
  }

  if (Array.isArray(value.evidenceRefs)) {
    refs.push(...value.evidenceRefs);
  }

  Object.values(value).forEach((item) => collectEvidenceRefs(item, refs));
  return refs;
}

if (refracturedPremiumReport.meta?.primaryRoute !== "#client-report/refractured") {
  fail("meta.primaryRoute must be #client-report/refractured");
}

if (refracturedPremiumReport.meta?.surface !== "interactive-client-report") {
  fail("meta.surface must be interactive-client-report");
}

if (refracturedPremiumReport.thesis?.headline !== REQUIRED_THESIS_HEADLINE) {
  fail("thesis.headline must match the required Refractured commercial thesis");
}

for (const [key, minimum] of REQUIRED_TOP_LEVEL_ARRAYS) {
  const value = refracturedPremiumReport[key];
  if (!Array.isArray(value) || value.length < minimum) {
    fail(`${key} must contain at least ${minimum} items`);
  }
}

requireEvidenceRefs("thesis", refracturedPremiumReport.thesis);

for (const key of REQUIRED_EVIDENCE_REF_ARRAYS) {
  const value = refracturedPremiumReport[key];
  if (!Array.isArray(value)) {
    continue;
  }

  value.forEach((item, index) => requireEvidenceRefs(`${key}[${index}]`, item));
}

for (const key of REQUIRED_UNIQUE_ID_ARRAYS) {
  requireUniqueIds(key, refracturedPremiumReport[key]);
}
requireUniqueUiIdsAcrossSections(REQUIRED_UNIQUE_UI_ID_ARRAYS);

const evidence = Array.isArray(refracturedPremiumReport.evidence) ? refracturedPremiumReport.evidence : [];
const evidenceIds = new Set(
  evidence
    .map((source) => (source && typeof source === "object" ? source.id : undefined))
    .filter((id) => typeof id === "string" && id.length > 0),
);
for (const ref of collectEvidenceRefs(refracturedPremiumReport)) {
  if (!evidenceIds.has(ref)) {
    fail(`missing evidence source for "${ref}"`);
  }
}

const serialized = JSON.stringify(refracturedPremiumReport);
for (const forbidden of FORBIDDEN_PRIMARY_COPY) {
  if (serialized.toLowerCase().includes(forbidden.toLowerCase())) {
    fail(`forbidden report copy found: ${forbidden}`);
  }
}

if (!process.exitCode) {
  console.log("Refractured report check passed");
}
