import { readFile } from "node:fs/promises";

const files = {
  hero: new URL("../src/components/Hero.jsx", import.meta.url),
  landing: new URL("../src/components/LandingPage.jsx", import.meta.url),
  cases: new URL("../src/components/CaseTeasers.jsx", import.meta.url),
  lesson: new URL("../src/components/CaseLessonPanel.jsx", import.meta.url),
  report: new URL("../src/components/ReportDeliverables.jsx", import.meta.url),
  sampleReport: new URL("../src/components/interactive-report/DecisionDeck.jsx", import.meta.url),
  workspace: new URL("../src/components/report-workspace/ProjectWorkspacePage.jsx", import.meta.url),
  css: new URL("../src/styles/landing.css", import.meta.url),
};

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([key, url]) => [key, await readFile(url, "utf8")]),
  ),
);

const failures = [];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

const boundsMatch = sources.hero.match(/const DRIFT_BOUNDS = \{\s*minX: ([\d.]+),\s*maxX: ([\d.]+),\s*minY: ([\d.]+),\s*maxY: ([\d.]+),\s*\};/m);
assert(boundsMatch, "Hero should declare explicit DRIFT_BOUNDS.");

if (boundsMatch) {
  const [, minX, maxX, minY, maxY] = boundsMatch.map(Number);
  assert(minX <= 12, "Hero aliens must be draggable across the screen, not locked to the right side.");
  assert(maxX >= 96, "Hero aliens need a near-full-width playfield.");
  assert(minY <= 12, "Hero playfield should include the upper scan area.");
  assert(maxY >= 88, "Hero playfield should include the lower scan area.");
}

assert(
  /\.signal-field\s*\{[\s\S]*?inset:\s*0;[\s\S]*?pointer-events:\s*none;[\s\S]*?\}/m.test(sources.css),
  "The hero signal field should cover the full hero without blocking empty space.",
);
assert(
  /\.alien-signal\s*\{[\s\S]*?pointer-events:\s*auto;[\s\S]*?\}/m.test(sources.css),
  "Only alien buttons should catch pointer events inside the hero signal field.",
);
assert(
  sources.css.includes("Visual focus sprint: reduce reading load"),
  "Landing CSS should include the visual-focus override block.",
);
assert(
  /\.hero-flashlight\s*\{[\s\S]*?opacity:\s*0\.(3|4)\d?;[\s\S]*?\}/m.test(sources.css),
  "Hero flashlight should be toned down below 0.5 opacity.",
);

assert(
  sources.landing.includes("visual-scan-strip"),
  "The post-hero trust strip should become a compact visual scan strip.",
);
assert(
  sources.cases.includes("case-card-art"),
  "Case cards should lead with artwork, not stacked text.",
);
assert(
  !sources.cases.includes("<p>{caseStudy.hook}</p>") && !sources.cases.includes("<small>{caseStudy.teaser}</small>"),
  "Case cards should not render both hook and teaser paragraphs in the grid.",
);
assert(
  sources.lesson.includes("lesson-snapshot"),
  "The selected case detail should be a compact lesson snapshot.",
);
assert(
  sources.lesson.includes("Looks like") && sources.lesson.includes("Actually") && sources.lesson.includes("Unsafe if copied"),
  "The selected case detail should show a direct looks-like / actually / unsafe-if-copied diagnostic.",
);
assert(
  sources.report.includes("report-decision-lane"),
  "Report decisions should render as a visual lane, not another card wall.",
);
assert(
  !sources.report.includes("<p>{item.body}</p>"),
  "Report decision rows should not expose every body paragraph in the first landing scan.",
);
assert(
  sources.sampleReport.includes("decision-lead") && sources.sampleReport.includes("wrong-benchmark"),
  "The sample report overview should lead with a wrong-benchmark-caught moment.",
);
assert(
  sources.sampleReport.includes("priority-source-chip") && sources.sampleReport.includes("onSourceDrawerOpen(item.evidenceRefs)"),
  "Top next actions should show source/confidence chips and open their evidence.",
);
assert(
  sources.workspace.includes("workspace-command-strip") && sources.workspace.includes("Browser-only local preview"),
  "The workspace should expose a command strip and clear browser-only preview status.",
);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Landing visual focus check passed");
