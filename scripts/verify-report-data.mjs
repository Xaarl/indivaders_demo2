import { interactiveSampleReport } from "../src/data/interactiveSampleReport.js";

const REQUIRED_ARRAYS = [
  ["verdicts", 5],
  ["comparables", 3],
  ["reviewRisks", 5],
  ["creatorAngles", 3],
  ["nextActions", 5],
  ["sources", 8],
];

const REQUIRED_PRICE_BANDS = 3;
const REQUIRED_PRODUCTION_FACTS_OR_UNKNOWNS = 4;
const FORBIDDEN_TEXT = [
  "TODO",
  "TBD",
  "placeholder",
  "lorem",
  "stara aplikacja",
  "silnik",
  "zrobimy",
  "kiedys",
  "kiedyś",
  "old app",
  "engine not product",
  "after validation",
  "Creator Fit",
  "Competitors",
  "Review Audit",
];

function fail(message) {
  console.error(`Report data check failed: ${message}`);
  process.exitCode = 1;
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

for (const [key, minimum] of REQUIRED_ARRAYS) {
  const value = interactiveSampleReport[key];
  if (!Array.isArray(value) || value.length < minimum) {
    fail(`${key} must contain at least ${minimum} items`);
  }
}

if (!Array.isArray(interactiveSampleReport.priceScope?.bands) || interactiveSampleReport.priceScope.bands.length < REQUIRED_PRICE_BANDS) {
  fail(`priceScope.bands must contain at least ${REQUIRED_PRICE_BANDS} items`);
}

const productionItems = [
  ...(interactiveSampleReport.productionReality?.facts ?? []),
  ...(interactiveSampleReport.productionReality?.unknowns ?? []),
];
if (productionItems.length < REQUIRED_PRODUCTION_FACTS_OR_UNKNOWNS) {
  fail(`productionReality must contain at least ${REQUIRED_PRODUCTION_FACTS_OR_UNKNOWNS} facts or unknowns`);
}

const sourceIds = new Set(interactiveSampleReport.sources.map((source) => source.id));
for (const ref of collectEvidenceRefs(interactiveSampleReport)) {
  if (!sourceIds.has(ref)) {
    fail(`missing source for evidenceRef "${ref}"`);
  }
}

const serialized = JSON.stringify(interactiveSampleReport).toLowerCase();
for (const forbidden of FORBIDDEN_TEXT) {
  if (serialized.includes(forbidden.toLowerCase())) {
    fail(`forbidden text found: ${forbidden}`);
  }
}

if (!process.exitCode) {
  console.log("Report data check passed");
}
