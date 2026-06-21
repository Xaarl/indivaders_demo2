# Refractured V6 Decision Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Refractured client report opening from the rejected V5 cockpit into a premium V6 decision workspace centered on a Market Lane Canvas, contextual inspector, evidence reader, roguelite loop diagram, and proof path.

**Architecture:** Keep the existing React/Vite route and static data, but add a focused V6 presentation layer instead of polishing the current card-heavy V5 layout. The route opens on a new `overview` section, derives opening data from `refracturedPremiumReport`, and pushes evidence behind contextual reader actions instead of permanent rails or raw API links.

**Tech Stack:** React 19, Vite SSR smoke tests, lucide-react icons, repo-local CSS in `src/styles/refractured-report.css`, static report data in `src/data/refracturedPremiumReport.js`.

---

## Scope Check

This plan intentionally covers one subsystem: the private Refractured client-report route at `#client-report/refractured`.

Out of scope:

- backend, auth, payments, public sharing, and live scraping;
- new paid or credit-consuming design generation above 100 credits;
- broader Indievaders landing-page redesign;
- changing the public contract of unrelated report request/workspace routes.

## File Structure

Create:

- `src/components/refractured-report/v6DecisionWorkspaceModel.js`  
  Derives the V6 opening model from `refracturedPremiumReport`: verdict, marker positions, proof path, and selected-lane defaults.

- `src/components/refractured-report/DecisionWorkspaceOverview.jsx`  
  Owns the V6 opening screen: strategy brief, Market Lane Canvas, contextual inspector, and proof path.

- `src/components/refractured-report/MarketLaneCanvas.jsx`  
  Renders the central two-axis market lane canvas with 5 to 6 markers and layer overlays.

- `src/components/refractured-report/CommercialProofPath.jsx`  
  Renders compact connected proof gates for overview and full action-plan module.

Modify:

- `src/components/refractured-report/RefracturedReportPage.jsx`  
  Adds `overview` as default section, updates section labels, routes overview to `DecisionWorkspaceOverview`.

- `src/components/refractured-report/MarketWorkspaceShell.jsx`  
  Removes permanent `InsightLayerPanel`, heavy project art, quick-view rail, and `At a glance` block from the primary V6 shell.

- `src/components/refractured-report/EvidenceReaderCard.jsx`  
  Changes evidence UX from raw-source-forward cards to readable source cards with secondary `Raw endpoint`.

- `src/components/refractured-report/RefracturedEvidenceDrawer.jsx`  
  Uses the revised evidence reader and labels the drawer as supporting evidence, not source navigation.

- `src/components/refractured-report/RogueliteLoopLab.jsx`  
  Replaces loop-model card grid with one loop diagram and one expanded model.

- `src/components/refractured-report/ActionPlanTimeline.jsx`  
  Reuses `CommercialProofPath` and removes broken-looking repeated proof cards as the primary view.

- `src/styles/refractured-report.css`  
  Adds V6 visual system and retires V5 opening-grid styles from primary usage.

- `scripts/verify-refractured-components.mjs`  
  Adds V6 smoke tests and converts V5 guardrails so tests block card-heavy regressions.

Docs:

- `docs/project-management/refractured-report-workflow-notes.md`
- `docs/project-management/decision-log.md`

## Task 1: V6 Model And Smoke-Test Foundation

**Files:**

- Create: `src/components/refractured-report/v6DecisionWorkspaceModel.js`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add V6 model tests**

Add imports near the existing Vite-loaded modules:

```js
  const { buildDecisionWorkspaceModel } = await server.ssrLoadModule(
    "/src/components/refractured-report/v6DecisionWorkspaceModel.js",
  );
```

Add this test before the existing `V5 report page opens...` test:

```js
    test("V6 decision workspace model caps opening comparables and avoids rating grades", () => {
      const model = buildDecisionWorkspaceModel(report);

      assert.equal(model.verdict.status, "Promising lane, proof required");
      assert.match(model.verdict.nextBestTest, /second-run intent/i);
      assert.ok(model.marketLane.markers.length <= 6);
      assert.ok(model.marketLane.markers.some((marker) => marker.id === "refractured"));
      assert.ok(model.marketLane.markers.some((marker) => marker.id === "absolum"));
      assert.ok(model.marketLane.markers.every((marker) => typeof marker.x === "number"));
      assert.ok(model.marketLane.markers.every((marker) => typeof marker.y === "number"));
      assert.doesNotMatch(JSON.stringify(model), /\b[A-F][+-]\b/);
      assert.deepEqual(
        model.proofPath.steps.map((step) => step.id),
        ["hook", "first-fight", "second-run", "steam-promise", "scope-decision"],
      );
    }),
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because `v6DecisionWorkspaceModel.js` does not exist.

- [ ] **Step 3: Create the V6 model helper**

Create `src/components/refractured-report/v6DecisionWorkspaceModel.js`:

```js
const marketLanePositions = {
  refractured: {
    id: "refractured",
    title: "Refractured",
    role: "Current lane hypothesis",
    lane: "Brutal action roguelite",
    x: 58,
    y: 68,
    confidence: "inferred",
    summary: "Can own brutal readable combat if retry desire is proven.",
    borrow: "Keep the first fight readable, heavy, and repeatable.",
    avoid: "Selling breadth before the loop is proven.",
    evidenceRefs: ["local-refractured-premise", "revenue-proxy-model"],
  },
  absolum: { x: 46, y: 58 },
  "dead-cells": { x: 72, y: 84 },
  "curse-of-the-dead-gods": { x: 62, y: 76 },
  rotwood: { x: 42, y: 72 },
  "hades-ii": { x: 86, y: 88 },
};

const openingComparableIds = ["absolum", "dead-cells", "curse-of-the-dead-gods", "rotwood", "hades-ii"];

function mapComparableToMarker(comparable) {
  const position = marketLanePositions[comparable.id] ?? { x: 50, y: 50 };

  return {
    id: comparable.id,
    title: comparable.title,
    role: comparable.role,
    lane: comparable.marketLane,
    x: position.x,
    y: position.y,
    confidence: comparable.confidence,
    summary: comparable.refracturedRead,
    borrow: comparable.borrow,
    avoid: comparable.avoid,
    imageUrl: comparable.imageUrl,
    evidenceRefs: comparable.evidenceRefs ?? [],
    steamSnapshot: comparable.steamSnapshot,
  };
}

export function buildDecisionWorkspaceModel(report) {
  const comparables = report.marketEvidence.comparables
    .filter((item) => openingComparableIds.includes(item.id))
    .map(mapComparableToMarker);

  return {
    verdict: {
      label: "Commercial Verdict",
      status: "Promising lane, proof required",
      statement:
        "Refractured can compete as a brutal action roguelite if first-fight feel and second-run desire are proven before promising scale.",
      nextBestTest: "45-90 second hook test plus second-run intent check.",
      confidence: "inferred",
      evidenceRefs: ["local-refractured-premise", "revenue-proxy-model"],
    },
    marketLane: {
      title: "Market Lane Canvas",
      xAxis: "Combat immediacy -> Systemic mastery",
      yAxis: "Arcade brawler -> Action roguelite",
      whitespace: "Brutal readable combat + repeatable run fantasy",
      defaultMarkerId: "refractured",
      markers: [marketLanePositions.refractured, ...comparables],
    },
    proofPath: {
      title: "Commercial Proof Path",
      steps: [
        {
          id: "hook",
          label: "Hook",
          status: "Ready to test",
          test: "Can target players understand the promise in 45-90 seconds?",
        },
        {
          id: "first-fight",
          label: "First Fight",
          status: "Needs evidence",
          test: "Does combat feel readable, heavy, and fair?",
        },
        {
          id: "second-run",
          label: "Second Run",
          status: "Needs evidence",
          test: "Does the roguelite layer change behavior, not just stats?",
        },
        {
          id: "steam-promise",
          label: "Steam Promise",
          status: "Locked until proof",
          test: "Do capsule, tags, and trailer sell one clear promise?",
        },
        {
          id: "scope-decision",
          label: "Scope Decision",
          status: "Not evaluated",
          test: "Which ambition is unlocked by the proof?",
        },
      ],
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS for the new V6 model test and all existing tests.

- [ ] **Step 5: Commit**

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/v6DecisionWorkspaceModel.js
git commit -m "feat: add refractured v6 workspace model"
```

## Task 2: Route IA And V6 Shell Cleanup

**Files:**

- Modify: `src/components/refractured-report/RefracturedReportPage.jsx`
- Modify: `src/components/refractured-report/MarketWorkspaceShell.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add route IA smoke test**

In `scripts/verify-refractured-components.mjs`, replace the V5 page-opening test with:

```js
    test("V6 report page opens on the decision workspace without permanent evidence rails", () => {
      const markup = renderToStaticMarkup(React.createElement(RefracturedReportPage));

      assert.match(markup, /refractured-decision-workspace/);
      assert.match(markup, /Commercial Verdict/);
      assert.match(markup, /Market Lane Canvas/);
      assert.match(markup, /Commercial Proof Path/);
      assert.match(markup, /Overview/);
      assert.doesNotMatch(markup, /refractured-insight-rail/);
      assert.doesNotMatch(markup, /At a glance/);
      assert.doesNotMatch(markup, /refractured-workspace-project-card/);
      assert.doesNotMatch(markup, /B\+/);
    }),
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because the page still opens with `Comparable Explorer` and renders the V5 shell rails.

- [ ] **Step 3: Update route sections**

In `src/components/refractured-report/RefracturedReportPage.jsx`, change the section array to:

```js
const sections = [
  { id: "overview", label: "Overview" },
  { id: "market-lane", label: "Market Lane" },
  { id: "steam-page-lab", label: "Steam Promise" },
  { id: "roguelite-loop-lab", label: "Roguelite Proof" },
  { id: "action-plan", label: "Action Plan" },
  { id: "evidence-ledger", label: "Evidence" },
];
```

Change `sectionModules` to:

```js
const sectionModules = {
  overview: "marketEvidence",
  "market-lane": "marketEvidence",
  "steam-page-lab": "steamPageLab",
  "roguelite-loop-lab": "rogueliteLoopLab",
  "action-plan": "actionPlan",
  "evidence-ledger": "marketEvidence",
};
```

Change default state:

```js
const [activeSection, setActiveSection] = useState("overview");
```

In the render body, replace the `market-map` conditional with:

```jsx
{activeSection === "overview" ? (
  <DecisionWorkspaceOverview
    onEvidenceOpen={openEvidenceDrawer}
    report={refracturedPremiumReport}
  />
) : null}
{activeSection === "market-lane" ? (
  <MarketMap
    marketEvidence={refracturedPremiumReport.marketEvidence}
    onEvidenceOpen={openEvidenceDrawer}
    thesis={refracturedPremiumReport.thesis}
  />
) : null}
```

Add the import:

```js
import DecisionWorkspaceOverview from "./DecisionWorkspaceOverview.jsx";
```

- [ ] **Step 4: Simplify the shell**

In `src/components/refractured-report/MarketWorkspaceShell.jsx`:

Remove these imports:

```js
BarChart3,
LineChart,
Tag,
```

Delete `quickViews`, `layerItems`, `layerEvidenceRefs`, and `InsightLayerPanel`.

Replace `WorkspaceSidebar` with:

```jsx
function WorkspaceSidebar({ activeSection, onSectionChange, report, sections }) {
  return (
    <aside className="refractured-workspace-sidebar refractured-workspace-sidebar-v6" aria-label="Refractured workspace navigation">
      <a className="refractured-workspace-brand" href="#">
        <span aria-hidden="true" />
        <strong>REFRACTURED</strong>
        <small>Decision Workspace</small>
      </a>
      <nav className="refractured-workspace-nav" aria-label="Report sections">
        <span>{report.meta.projectName}</span>
        {sections.map((section) => {
          const Icon = sectionIcons[section.id] ?? Bookmark;
          return (
            <button
              aria-current={section.id === activeSection ? "page" : undefined}
              className={section.id === activeSection ? "is-active" : ""}
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
            >
              <Icon size={16} aria-hidden="true" />
              {section.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
```

Update `sectionIcons`:

```js
const sectionIcons = {
  overview: Map,
  "market-lane": Boxes,
  "steam-page-lab": FileSearch,
  "roguelite-loop-lab": RefreshCw,
  "action-plan": ClipboardList,
  "evidence-ledger": Layers3,
};
```

Update `MarketWorkspaceShell` return to remove `InsightLayerPanel`:

```jsx
return (
  <main className="refractured-report-shell refractured-market-workspace refractured-market-workspace-v6">
    <WorkspaceSidebar
      activeSection={activeSection}
      onSectionChange={onSectionChange}
      report={report}
      sections={sections}
    />
    <div className="refractured-workspace-main">
      <WorkspaceTopbar activeSection={activeSection} onFullEvidenceOpen={onFullEvidenceOpen} report={report} />
      {children}
    </div>
  </main>
);
```

- [ ] **Step 5: Run test to verify it now fails only because overview component is missing**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL with missing `DecisionWorkspaceOverview.jsx`.

No commit yet. Task 3 creates the overview and completes this route change.

## Task 3: Decision Workspace Overview

**Files:**

- Create: `src/components/refractured-report/DecisionWorkspaceOverview.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add overview component import test**

Add the import in the verifier:

```js
  const { default: DecisionWorkspaceOverview } = await server.ssrLoadModule(
    "/src/components/refractured-report/DecisionWorkspaceOverview.jsx",
  );
```

Add this test:

```js
    test("V6 decision workspace keeps the opening viewport focused", () => {
      const markup = renderToStaticMarkup(
        React.createElement(DecisionWorkspaceOverview, {
          onEvidenceOpen: noop,
          report,
        }),
      );

      assert.match(markup, /refractured-decision-workspace/);
      assert.match(markup, /Commercial Verdict/);
      assert.match(markup, /Promising lane, proof required/);
      assert.match(markup, /Market Lane Canvas/);
      assert.match(markup, /Selected: Refractured lane/);
      assert.match(markup, /Commercial Proof Path/);
      assert.doesNotMatch(markup, /refractured-comparable-card-grid/);
      assert.doesNotMatch(markup, /refractured-evidence-list/);
      assert.doesNotMatch(markup, /Raw endpoint/);
    }),
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because `DecisionWorkspaceOverview.jsx` does not exist.

- [ ] **Step 3: Create overview component**

Create `src/components/refractured-report/DecisionWorkspaceOverview.jsx`:

```jsx
import { useMemo, useState } from "react";
import CommercialProofPath from "./CommercialProofPath.jsx";
import MarketLaneCanvas from "./MarketLaneCanvas.jsx";
import { buildDecisionWorkspaceModel } from "./v6DecisionWorkspaceModel.js";

function DecisionInspector({ marker, onEvidenceOpen }) {
  return (
    <aside className="refractured-decision-inspector" aria-label="Selected market lane detail">
      <header>
        <span>Selected: {marker.id === "refractured" ? "Refractured lane" : marker.title}</span>
        <strong>{marker.role}</strong>
      </header>
      <section>
        <h2>What this means</h2>
        <p>{marker.summary}</p>
      </section>
      <section>
        <h2>Proof gap</h2>
        <p>{marker.avoid}</p>
      </section>
      <section>
        <h2>Next move</h2>
        <p>{marker.borrow}</p>
      </section>
      <section>
        <h2>Confidence</h2>
        <p>{marker.confidence}</p>
      </section>
      <button type="button" onClick={() => onEvidenceOpen(marker.evidenceRefs ?? [])}>
        Why we believe this
      </button>
    </aside>
  );
}

function DecisionWorkspaceOverview({ onEvidenceOpen, report }) {
  const model = useMemo(() => buildDecisionWorkspaceModel(report), [report]);
  const [activeMarkerId, setActiveMarkerId] = useState(model.marketLane.defaultMarkerId);
  const activeMarker =
    model.marketLane.markers.find((marker) => marker.id === activeMarkerId) ?? model.marketLane.markers[0];

  return (
    <section className="refractured-module refractured-decision-workspace">
      <header className="refractured-strategy-brief">
        <div>
          <span>{model.verdict.label}</span>
          <h1>{model.verdict.status}</h1>
          <p>{model.verdict.statement}</p>
        </div>
        <div>
          <span>Next best test</span>
          <p>{model.verdict.nextBestTest}</p>
        </div>
      </header>

      <div className="refractured-decision-grid">
        <MarketLaneCanvas
          activeMarkerId={activeMarker.id}
          marketLane={model.marketLane}
          onMarkerSelect={setActiveMarkerId}
        />
        <DecisionInspector marker={activeMarker} onEvidenceOpen={onEvidenceOpen} />
      </div>

      <CommercialProofPath proofPath={model.proofPath} />
    </section>
  );
}

export default DecisionWorkspaceOverview;
```

- [ ] **Step 4: Run tests**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because `MarketLaneCanvas.jsx` and `CommercialProofPath.jsx` do not exist.

No commit yet. Task 4 creates those files and makes Tasks 2 and 3 pass.

## Task 4: Market Lane Canvas And Proof Path Components

**Files:**

- Create: `src/components/refractured-report/MarketLaneCanvas.jsx`
- Create: `src/components/refractured-report/CommercialProofPath.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add canvas and proof path tests**

Add imports:

```js
  const { default: MarketLaneCanvas } = await server.ssrLoadModule(
    "/src/components/refractured-report/MarketLaneCanvas.jsx",
  );
  const { default: CommercialProofPath } = await server.ssrLoadModule(
    "/src/components/refractured-report/CommercialProofPath.jsx",
  );
```

Add tests:

```js
    test("V6 Market Lane Canvas renders a map, not comparable cards", () => {
      const model = buildDecisionWorkspaceModel(report);
      const markup = renderToStaticMarkup(
        React.createElement(MarketLaneCanvas, {
          activeMarkerId: "refractured",
          marketLane: model.marketLane,
          onMarkerSelect: noop,
        }),
      );

      assert.match(markup, /refractured-market-lane-canvas/);
      assert.match(markup, /Combat immediacy/);
      assert.match(markup, /Action roguelite/);
      assert.match(markup, /Brutal readable combat/);
      assert.equal(countOccurrences(markup, "refractured-lane-marker"), model.marketLane.markers.length);
      assert.ok(countOccurrences(markup, "refractured-lane-marker") <= 6);
      assert.doesNotMatch(markup, /refractured-comparable-card/);
    }),
    test("V6 Commercial Proof Path renders compact connected gates", () => {
      const model = buildDecisionWorkspaceModel(report);
      const markup = renderToStaticMarkup(React.createElement(CommercialProofPath, { proofPath: model.proofPath }));

      assert.match(markup, /refractured-commercial-proof-path/);
      assert.match(markup, /Hook/);
      assert.match(markup, /First Fight/);
      assert.match(markup, /Second Run/);
      assert.match(markup, /Scope Decision/);
      assert.doesNotMatch(markup, /refractured-proof-gate-card/);
    }),
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because the new components do not exist.

- [ ] **Step 3: Create Market Lane Canvas**

Create `src/components/refractured-report/MarketLaneCanvas.jsx`:

```jsx
function MarketLaneCanvas({ activeMarkerId, marketLane, onMarkerSelect }) {
  return (
    <section className="refractured-market-lane-canvas" aria-label="Market Lane Canvas">
      <header>
        <span>{marketLane.title}</span>
        <div className="refractured-layer-toggle" aria-label="Insight layers">
          {["Facts", "Estimates", "Interpretation", "Actions"].map((layer) => (
            <button key={layer} type="button">
              {layer}
            </button>
          ))}
        </div>
      </header>
      <div className="refractured-market-lane-map">
        <span className="refractured-lane-axis refractured-lane-axis-x">{marketLane.xAxis}</span>
        <span className="refractured-lane-axis refractured-lane-axis-y">{marketLane.yAxis}</span>
        <span className="refractured-whitespace-zone">{marketLane.whitespace}</span>
        {marketLane.markers.map((marker) => (
          <button
            aria-pressed={marker.id === activeMarkerId}
            className={`refractured-lane-marker${marker.id === activeMarkerId ? " is-active" : ""}`}
            key={marker.id}
            style={{ "--rf-x": `${marker.x}%`, "--rf-y": `${100 - marker.y}%` }}
            type="button"
            onClick={() => onMarkerSelect(marker.id)}
          >
            {marker.imageUrl ? <img alt="" src={marker.imageUrl} /> : null}
            <strong>{marker.title}</strong>
            <span>{marker.role}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default MarketLaneCanvas;
```

- [ ] **Step 4: Create Commercial Proof Path**

Create `src/components/refractured-report/CommercialProofPath.jsx`:

```jsx
function CommercialProofPath({ proofPath }) {
  return (
    <section className="refractured-commercial-proof-path" aria-label="Commercial Proof Path">
      <header>
        <span>{proofPath.title}</span>
        <strong>Proof unlocks ambition</strong>
      </header>
      <ol>
        {proofPath.steps.map((step) => (
          <li key={step.id}>
            <span>{step.status}</span>
            <strong>{step.label}</strong>
            <p>{step.test}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default CommercialProofPath;
```

- [ ] **Step 5: Run tests**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS for V6 route, overview, model, canvas, and proof path tests.

- [ ] **Step 6: Commit**

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/RefracturedReportPage.jsx src/components/refractured-report/MarketWorkspaceShell.jsx src/components/refractured-report/DecisionWorkspaceOverview.jsx src/components/refractured-report/MarketLaneCanvas.jsx src/components/refractured-report/CommercialProofPath.jsx
git commit -m "feat: add refractured v6 decision workspace"
```

## Task 5: Evidence Reader Stops Sending Users To Raw APIs

**Files:**

- Modify: `src/components/refractured-report/EvidenceReaderCard.jsx`
- Modify: `src/components/refractured-report/RefracturedEvidenceDrawer.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Replace V5.2 evidence test**

Replace the V5.2 evidence test with:

```js
    test("V6 evidence reader explains sources before exposing raw endpoints", () => {
      const markup = renderToStaticMarkup(
        React.createElement(EvidenceLedgerPage, {
          evidenceLedger: report.evidenceLedger,
        }),
      );

      assert.match(markup, /refractured-evidence-reader/);
      assert.match(markup, /What it supports/);
      assert.match(markup, /Known limits/);
      assert.match(markup, /Raw endpoint/);
      assert.doesNotMatch(markup, />Open raw source</);
      assert.doesNotMatch(markup, />Open source</);
    }),
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because the evidence card still renders `Inspect evidence` and `Open raw source`.

- [ ] **Step 3: Update EvidenceReaderCard copy and structure**

In `src/components/refractured-report/EvidenceReaderCard.jsx`, replace the sections with:

```jsx
      <div className="refractured-evidence-reader-grid">
        <section>
          <span>What it supports</span>
          <p>{item.matters}</p>
        </section>
        <section>
          <span>Known limits</span>
          <p>{item.unknown}</p>
        </section>
        <section>
          <span>Confidence</span>
          <p>
            Treat this as a {item.level ?? item.confidence} input. Indievaders interpretation lives in the report;
            raw endpoints are audit-only.
          </p>
        </section>
      </div>
```

Replace the footer link label and aria label:

```jsx
        {item.href ? (
          <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open raw endpoint for ${item.label}`}>
            <ExternalLink size={15} aria-hidden="true" />
            Raw endpoint
          </a>
        ) : null}
```

- [ ] **Step 4: Update drawer label**

In `src/components/refractured-report/RefracturedEvidenceDrawer.jsx`, ensure the drawer header uses client-facing language:

```jsx
<h2>{showAll ? "Evidence ledger" : "Why we believe this"}</h2>
```

- [ ] **Step 5: Run tests**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/EvidenceReaderCard.jsx src/components/refractured-report/RefracturedEvidenceDrawer.jsx
git commit -m "feat: refine refractured evidence reader"
```

## Task 6: Roguelite Proof Lab Loop Diagram

**Files:**

- Modify: `src/components/refractured-report/RogueliteLoopLab.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add loop-diagram smoke test**

Import `RogueliteLoopLab` in the verifier if it is not already imported:

```js
  const { default: RogueliteLoopLab } = await server.ssrLoadModule(
    "/src/components/refractured-report/RogueliteLoopLab.jsx",
  );
```

Add this test:

```js
    test("V6 Roguelite Proof Lab renders a loop diagram instead of model cards", () => {
      const markup = renderToStaticMarkup(
        React.createElement(RogueliteLoopLab, {
          onEvidenceOpen: noop,
          rogueliteLoopLab: report.rogueliteLoopLab,
        }),
      );

      assert.match(markup, /refractured-loop-diagram/);
      assert.match(markup, /Fight/);
      assert.match(markup, /Reward/);
      assert.match(markup, /Mutation/);
      assert.match(markup, /Retry/);
      assert.match(markup, /Intent/);
      assert.match(markup, /refractured-loop-model-tabs/);
      assert.doesNotMatch(markup, /refractured-loop-model-grid/);
      assert.doesNotMatch(markup, /refractured-definition-grid/);
    }),
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because the current component renders `refractured-loop-model-grid` and definition grids.

- [ ] **Step 3: Replace loop card grid with diagram**

In `src/components/refractured-report/RogueliteLoopLab.jsx`, keep `useState`, `ConfidenceTag`, `EvidenceButton`, `JobHeader`, `LayerSummaryStrip`, and `SignalFlow`.

Replace `LoopModelCard` with:

```jsx
function LoopDiagram({ activeDirection }) {
  const steps = [
    { label: "Fight", text: "Readable threat and punish window." },
    { label: "Reward", text: "Run-local choice with tactical meaning." },
    { label: "Mutation", text: activeDirection.promise },
    { label: "Retry", text: activeDirection.bestFor },
    { label: "Intent", text: activeDirection.proof },
  ];

  return (
    <ol className="refractured-loop-diagram" aria-label="Roguelite loop proof diagram">
      {steps.map((step) => (
        <li key={step.label}>
          <span>{step.label}</span>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
```

Replace the model grid block with:

```jsx
      <div className="refractured-loop-model-tabs" aria-label="Roguelite loop models">
        {directions.map((direction) => (
          <button
            aria-pressed={direction.id === activeDirection?.id}
            className={direction.id === activeDirection?.id ? "is-active" : ""}
            key={direction.id}
            type="button"
            onClick={() => setActiveDirectionId(direction.id)}
          >
            <span>{direction.label}</span>
            <strong>{direction.promise}</strong>
          </button>
        ))}
      </div>

      {activeDirection ? (
        <article className="refractured-loop-proof-panel">
          <div className="refractured-layer-item-meta">
            <span>Selected loop model</span>
            <ConfidenceTag confidence={activeDirection.confidence} />
          </div>
          <h2>{activeDirection.label}</h2>
          <LoopDiagram activeDirection={activeDirection} />
          <dl className="refractured-loop-proof-summary">
            <div>
              <dt>Content burden</dt>
              <dd>{contentRisk?.statement}</dd>
            </div>
            <div>
              <dt>Failure mode</dt>
              <dd>{activeDirection.risk}</dd>
            </div>
            <div>
              <dt>Playtest proof</dt>
              <dd>{activeDirection.proof}</dd>
            </div>
          </dl>
          <EvidenceButton
            context={`${activeDirection.label} loop model`}
            evidenceRefs={activeDirection.evidenceRefs}
            label="Why we believe this"
            onEvidenceOpen={onEvidenceOpen}
          />
        </article>
      ) : null}
```

- [ ] **Step 4: Run tests**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/RogueliteLoopLab.jsx
git commit -m "feat: redesign refractured roguelite proof lab"
```

## Task 7: Action Plan Proof Path

**Files:**

- Modify: `src/components/refractured-report/ActionPlanTimeline.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Replace action-plan smoke test**

Replace the V5.2 action-plan test with:

```js
    test("V6 Action Plan renders proof path gates instead of repeated proof cards", () => {
      const markup = renderToStaticMarkup(
        React.createElement(ActionPlanTimeline, {
          actionPlan: report.actionPlan,
          onEvidenceOpen: noop,
          strategicPaths: report.strategicPaths,
        }),
      );

      assert.match(markup, /refractured-action-proof-path/);
      assert.match(markup, /Hook/);
      assert.match(markup, /First Fight/);
      assert.match(markup, /Second Run/);
      assert.match(markup, /Scope Decision/);
      assert.doesNotMatch(markup, /refractured-proof-gate-card/);
      assert.doesNotMatch(markup, /refractured-action-list/);
    }),
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because the current component uses `refractured-proof-gate-card`.

- [ ] **Step 3: Replace card timeline with compact proof path**

In `src/components/refractured-report/ActionPlanTimeline.jsx`, remove `ProofGateCard`.

Add this helper:

```jsx
const actionStageLabels = {
  "Run a 45-second hook comprehension test": "Hook",
  "Polish one fight until contact feels sellable": "First Fight",
  "Build a three-room micro-run": "Second Run",
  "Test whether ritual choices change behavior": "Roguelite Proof",
  "A/B test Steam page promise and trailer opening": "Steam Promise",
  "Choose scale only after proof gates pass": "Scope Decision",
};

function ActionProofPath({ actions, onEvidenceOpen }) {
  return (
    <ol className="refractured-action-proof-path" aria-label="Action proof gates">
      {actions.map((action) => (
        <li key={action.id}>
          <span>{action.period}</span>
          <strong>{actionStageLabels[action.title] ?? action.title}</strong>
          <p>{action.signal}</p>
          <small>{action.artifact}</small>
          <EvidenceButton
            context={`${action.title} proof gate`}
            evidenceRefs={action.evidenceRefs}
            label="Why we believe this"
            onEvidenceOpen={onEvidenceOpen}
          />
        </li>
      ))}
    </ol>
  );
}
```

Replace the proof-gate shell content with:

```jsx
      <div className="refractured-proof-gate-shell">
        <LayerSummaryStrip
          ariaLabel="Action Plan evidence layer shortcuts"
          context="the Action Plan"
          module={actionPlan}
          onEvidenceOpen={onEvidenceOpen}
        />
        <ActionProofPath actions={actionPlan.timeline ?? []} onEvidenceOpen={onEvidenceOpen} />
      </div>
```

- [ ] **Step 4: Run tests**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/ActionPlanTimeline.jsx
git commit -m "feat: redesign refractured action proof path"
```

## Task 8: V6 Visual System CSS

**Files:**

- Modify: `src/styles/refractured-report.css`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add CSS-selector regression test**

Add Node imports at the top of the verifier:

```js
import fs from "node:fs";
```

Add this test near the end:

```js
    test("V6 CSS includes decision workspace layout selectors", () => {
      const css = fs.readFileSync("src/styles/refractured-report.css", "utf8");

      assert.match(css, /\.refractured-market-workspace-v6/);
      assert.match(css, /\.refractured-decision-workspace/);
      assert.match(css, /\.refractured-market-lane-canvas/);
      assert.match(css, /\.refractured-lane-marker/);
      assert.match(css, /\.refractured-commercial-proof-path/);
      assert.match(css, /\.refractured-loop-diagram/);
      assert.match(css, /\.refractured-action-proof-path/);
    }),
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because the V6 CSS selectors are missing.

- [ ] **Step 3: Add V6 CSS section**

Append a clearly marked V6 section near the existing workspace CSS:

```css
/* Refractured V6 decision workspace */
.refractured-market-workspace-v6 {
  grid-template-columns: 212px minmax(0, 1fr);
  background: linear-gradient(180deg, #071010 0%, #050707 100%);
}

.refractured-market-workspace-v6 .refractured-workspace-main {
  border-right: 0;
}

.refractured-workspace-sidebar-v6 {
  background: #071010;
}

.refractured-decision-workspace {
  display: grid;
  gap: 14px;
}

.refractured-strategy-brief {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 0.34fr);
  gap: 12px;
  padding: 14px;
  border: 1px solid rgba(241, 234, 220, 0.12);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.035);
}

.refractured-strategy-brief span,
.refractured-decision-inspector h2,
.refractured-commercial-proof-path header span {
  color: var(--rf-amber);
  font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, ui-monospace, monospace;
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
}

.refractured-strategy-brief h1 {
  margin: 4px 0 6px;
  color: var(--rf-text);
  font-size: clamp(1.35rem, 2vw, 2rem);
  line-height: 1.05;
}

.refractured-strategy-brief p {
  margin: 0;
  color: var(--rf-soft);
  font-size: 0.88rem;
  line-height: 1.42;
}

.refractured-decision-grid {
  display: grid;
  grid-template-columns: minmax(520px, 1fr) 320px;
  gap: 12px;
  min-height: 460px;
}

.refractured-market-lane-canvas,
.refractured-decision-inspector,
.refractured-commercial-proof-path {
  border: 1px solid rgba(241, 234, 220, 0.12);
  border-radius: 6px;
  background: rgba(5, 7, 7, 0.72);
}

.refractured-market-lane-canvas {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  overflow: hidden;
}

.refractured-market-lane-canvas > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid rgba(241, 234, 220, 0.1);
}

.refractured-layer-toggle {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.refractured-layer-toggle button {
  min-height: 28px;
  border: 1px solid rgba(241, 234, 220, 0.14);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--rf-soft);
  padding: 4px 8px;
  font-size: 0.7rem;
  font-weight: 800;
}

.refractured-market-lane-map {
  position: relative;
  min-height: 410px;
  overflow: hidden;
  background:
    linear-gradient(rgba(241, 234, 220, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(241, 234, 220, 0.045) 1px, transparent 1px),
    rgba(4, 7, 7, 0.4);
  background-size: 56px 56px;
}

.refractured-lane-axis {
  position: absolute;
  color: rgba(241, 234, 220, 0.44);
  font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, ui-monospace, monospace;
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
}

.refractured-lane-axis-x {
  right: 14px;
  bottom: 12px;
}

.refractured-lane-axis-y {
  left: 14px;
  top: 14px;
  writing-mode: vertical-rl;
}

.refractured-whitespace-zone {
  position: absolute;
  left: 50%;
  top: 26%;
  width: 34%;
  min-height: 112px;
  border: 1px dashed rgba(98, 184, 166, 0.48);
  border-radius: 999px;
  color: rgba(190, 232, 222, 0.86);
  display: grid;
  place-items: center;
  padding: 12px;
  text-align: center;
  transform: translateX(-50%);
}

.refractured-lane-marker {
  position: absolute;
  left: var(--rf-x);
  top: var(--rf-y);
  transform: translate(-50%, -50%);
  display: grid;
  gap: 3px;
  min-width: 112px;
  max-width: 146px;
  border: 1px solid rgba(98, 184, 166, 0.38);
  border-radius: 6px;
  background: rgba(8, 14, 14, 0.92);
  color: var(--rf-text);
  padding: 7px;
  text-align: left;
  cursor: pointer;
}

.refractured-lane-marker.is-active {
  border-color: var(--rf-amber);
  box-shadow: 0 0 0 2px rgba(214, 168, 91, 0.18);
}

.refractured-lane-marker img {
  width: 100%;
  aspect-ratio: 16 / 5;
  object-fit: cover;
  border-radius: 4px;
}

.refractured-lane-marker strong {
  font-size: 0.76rem;
  line-height: 1.1;
}

.refractured-lane-marker span {
  color: var(--rf-muted);
  font-size: 0.66rem;
  line-height: 1.2;
}

.refractured-decision-inspector {
  display: grid;
  align-content: start;
  gap: 11px;
  padding: 14px;
}

.refractured-decision-inspector header {
  display: grid;
  gap: 4px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(241, 234, 220, 0.1);
}

.refractured-decision-inspector header span {
  color: var(--rf-amber);
  font-size: 0.72rem;
  text-transform: uppercase;
}

.refractured-decision-inspector header strong {
  color: var(--rf-text);
  font-size: 1rem;
}

.refractured-decision-inspector section {
  display: grid;
  gap: 4px;
}

.refractured-decision-inspector p {
  margin: 0;
  color: var(--rf-soft);
  font-size: 0.82rem;
  line-height: 1.38;
}

.refractured-commercial-proof-path {
  display: grid;
  gap: 10px;
  padding: 12px;
}

.refractured-commercial-proof-path header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.refractured-commercial-proof-path ol,
.refractured-action-proof-path {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.refractured-commercial-proof-path li,
.refractured-action-proof-path li {
  display: grid;
  gap: 5px;
  min-height: 104px;
  padding: 10px;
  border: 1px solid rgba(241, 234, 220, 0.1);
  border-top: 3px solid rgba(214, 168, 91, 0.65);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.035);
}

.refractured-commercial-proof-path li span,
.refractured-action-proof-path li span {
  color: var(--rf-amber);
  font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, ui-monospace, monospace;
  font-size: 0.64rem;
  font-weight: 900;
  text-transform: uppercase;
}

.refractured-commercial-proof-path li strong,
.refractured-action-proof-path li strong {
  color: var(--rf-text);
  font-size: 0.86rem;
  line-height: 1.16;
}

.refractured-commercial-proof-path li p,
.refractured-action-proof-path li p {
  margin: 0;
  color: var(--rf-muted);
  font-size: 0.74rem;
  line-height: 1.34;
}
```

- [ ] **Step 4: Add responsive V6 CSS**

Add this near the existing responsive blocks:

```css
@media (max-width: 1180px) {
  .refractured-market-workspace-v6 {
    grid-template-columns: 196px minmax(0, 1fr);
  }

  .refractured-decision-grid {
    grid-template-columns: 1fr;
  }

  .refractured-commercial-proof-path ol,
  .refractured-action-proof-path {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .refractured-market-workspace-v6 {
    grid-template-columns: 1fr;
  }

  .refractured-strategy-brief,
  .refractured-decision-grid,
  .refractured-commercial-proof-path ol,
  .refractured-action-proof-path {
    grid-template-columns: 1fr;
  }

  .refractured-market-lane-map {
    min-height: 520px;
  }

  .refractured-lane-marker {
    min-width: 96px;
  }
}
```

- [ ] **Step 5: Run tests**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add scripts/verify-refractured-components.mjs src/styles/refractured-report.css
git commit -m "style: add refractured v6 decision workspace system"
```

## Task 9: Browser QA, Full Verify, And Docs

**Files:**

- Modify: `docs/project-management/refractured-report-workflow-notes.md`
- Modify: `docs/project-management/decision-log.md`

- [ ] **Step 1: Run full verification**

Run:

```powershell
npm run verify
```

Expected: all report verifiers, lint, and Vite build pass.

- [ ] **Step 2: Run whitespace check**

Run:

```powershell
git diff --check
```

Expected: no whitespace errors. Windows LF/CRLF warnings are acceptable if there are no error lines.

- [ ] **Step 3: Open browser route**

Use:

```text
http://127.0.0.1:5176/#client-report/refractured
```

If the server is not running, start it:

```powershell
npm run dev -- --host 127.0.0.1 --port 5176
```

Expected first screen:

- `Overview` is active.
- First viewport shows `Commercial Verdict`, `Market Lane Canvas`, contextual inspector, and `Commercial Proof Path`.
- No permanent evidence rail.
- No `At a glance` block.
- No raw JSON/API source link on the first screen.
- No card grid in the center.

- [ ] **Step 4: Manual desktop QA**

At a desktop-sized viewport, verify:

- clicking `Absolum`, `Dead Cells`, `Curse of the Dead Gods`, `Rotwood`, and `Hades II` changes the inspector;
- `Why we believe this` opens the evidence drawer;
- evidence drawer shows `What it supports`, `Known limits`, and `Raw endpoint`;
- navigation opens `Market Lane`, `Steam Promise`, `Roguelite Proof`, `Action Plan`, and `Evidence`;
- no overlap, clipped text, fallback layout, or horizontal scroll.

- [ ] **Step 5: Manual narrow QA**

At a narrow/mobile viewport, verify:

- sidebar collapses into a vertical top flow instead of covering content;
- Market Lane markers remain clickable;
- inspector stacks below the canvas;
- proof path stacks without horizontal scroll;
- evidence drawer remains readable.

- [ ] **Step 6: Update workflow notes**

Append to `docs/project-management/refractured-report-workflow-notes.md`:

```markdown
## 2026-06-21 V6 Implementation QA

V6 implementation rebuilt the Refractured opening route around a decision
workspace instead of the rejected V5 cockpit.

Verified:

- `Overview` opens by default.
- The first screen shows commercial verdict, Market Lane Canvas, contextual
  inspector, and Commercial Proof Path.
- Evidence clicks open a source reader before exposing raw endpoints.
- Roguelite proof is diagram-led instead of a card grid.
- Action plan is proof-path led instead of a repeated card list.
- `npm run verify` passes.

Manual browser QA result:

- Desktop: record pass/fail during execution.
- Narrow viewport: record pass/fail during execution.
```

- [ ] **Step 7: Update decision log**

Append to `docs/project-management/decision-log.md`:

```markdown
## 2026-06-21: Implement Refractured V6 Decision Workspace

Decision: The Refractured route now opens on a V6 decision workspace rather than
the V5 cockpit.

Reason: User and design review rejected the card-heavy dashboard direction. The
paid-product opening must show the market lane, proof gap, and next action
before asking the client to inspect modules.

Impact:

- `#client-report/refractured` opens on `Overview`.
- The opening screen centers Market Lane Canvas and Commercial Proof Path.
- Evidence is contextual and raw endpoints are secondary.
- Roguelite and action-plan modules use diagrams/proof paths instead of card
  piles.
```

- [ ] **Step 8: Commit final implementation**

```powershell
git add docs/project-management/refractured-report-workflow-notes.md docs/project-management/decision-log.md
git commit -m "docs: record refractured v6 implementation qa"
```

- [ ] **Step 9: Push branch after user approval**

Run only after the user agrees to push:

```powershell
git push origin codex/refractured-v5-premium-workspace
```

Expected: branch updates on `https://github.com/Xaarl/Indievaders.git`.

## Self-Review Checklist

- Spec coverage:
  - Opening decision workspace: Tasks 2-4 and 8.
  - Market Lane Canvas: Tasks 1, 3, 4, and 8.
  - Contextual inspector: Task 3.
  - Evidence reader behavior: Task 5.
  - Roguelite Proof Lab: Task 6.
  - Action Plan proof path: Task 7.
  - Visual system cleanup: Task 8.
  - Browser QA and regression tests: Task 9.

- Type consistency:
  - `buildDecisionWorkspaceModel(report)` is defined in Task 1 and imported by Tasks 3 and 4.
  - `proofPath.steps` has `id`, `label`, `status`, and `test` in Task 1 and is consumed by `CommercialProofPath`.
  - `marketLane.markers` has `id`, `title`, `role`, `x`, `y`, `confidence`, `summary`, `borrow`, `avoid`, and `evidenceRefs`.

- Regression blockers:
  - Tests block permanent insight rail, at-a-glance block, V5 card grid on opening, evidence raw-source labels, loop model card grid, proof-gate card timeline, and missing V6 CSS selectors.
