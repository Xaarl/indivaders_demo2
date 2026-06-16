import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const srcRoot = new URL("../src/", import.meta.url);

const forbiddenCopy = [
  {
    text: "$49 early automated report",
    reason: "Use the canonical paid offer: $49 early Steam Positioning Report.",
  },
  {
    text: "$49 early automated Steam Positioning Report",
    reason: "Use the canonical paid offer without automated in the title.",
  },
  {
    text: "early automated report",
    reason: "Use early Steam Positioning Report for the paid product.",
  },
  {
    text: "Early automated report",
    reason: "Use Early Steam Positioning Report for the paid product.",
  },
  {
    text: "Sample reports",
    reason: "Use Interactive sample report for the public proof surface.",
  },
  {
    text: "Preview the brief first",
    reason: "The primary proof link should open the interactive sample report.",
  },
  {
    text: "Decision workspace:",
    reason: "Avoid product-meta copy on the sample report first screen.",
  },
  {
    text: "proof artifact",
    reason: "Use user-facing report/workspace language, not internal proof-artifact language.",
  },
];

const requiredCopy = [
  {
    text: "Interactive sample report",
    reason: "The public proof surface must use the canonical name.",
  },
  {
    text: "$49 early Steam Positioning Report",
    reason: "The paid offer must use the canonical name.",
  },
  {
    text: "Private project workspace",
    reason: "The long-term workspace surface must use the canonical name.",
  },
  {
    text: "local workspace preview",
    reason: "The current browser-only workspace must be clearly labelled as local preview.",
  },
];

async function* walk(directoryUrl) {
  const entries = await readdir(directoryUrl, { withFileTypes: true });

  for (const entry of entries) {
    const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directoryUrl);
    if (entry.isDirectory()) {
      yield* walk(entryUrl);
    } else if (/\.(js|jsx)$/.test(entry.name)) {
      yield entryUrl;
    }
  }
}

const failures = [];
const sources = [];

for await (const fileUrl of walk(srcRoot)) {
  const filePath = fileURLToPath(fileUrl);
  const source = await readFile(filePath, "utf8");
  sources.push(source);

  for (const rule of forbiddenCopy) {
    if (source.includes(rule.text)) {
      failures.push(`${filePath}: contains "${rule.text}" - ${rule.reason}`);
    }
  }
}

const joinedSource = sources.join("\n");
for (const rule of requiredCopy) {
  if (!joinedSource.includes(rule.text)) {
    failures.push(`src: missing "${rule.text}" - ${rule.reason}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Product ladder check passed");
