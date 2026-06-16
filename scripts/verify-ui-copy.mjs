import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../src/", import.meta.url);

const forbiddenStrings = [
  "sample-brief-preview",
  "Creator Fit",
  "Competitors",
  "Review Audit",
  "old app",
  "engine not product",
  "after validation",
  "Market contradictions",
  "local heuristic",
  "2D Action Positioning",
  "pilot validation",
  "sample pack",
];

async function* walk(directoryUrl) {
  const entries = await readdir(directoryUrl, { withFileTypes: true });

  for (const entry of entries) {
    const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directoryUrl);
    if (entry.isDirectory()) {
      yield* walk(entryUrl);
    } else if (/\.(js|jsx|css)$/.test(entry.name)) {
      yield entryUrl;
    }
  }
}

const failures = [];

for await (const fileUrl of walk(root)) {
  const source = await readFile(fileURLToPath(fileUrl), "utf8");
  for (const forbidden of forbiddenStrings) {
    if (source.includes(forbidden)) {
      failures.push(`${fileURLToPath(fileUrl)}: contains "${forbidden}"`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("UI copy check passed");
