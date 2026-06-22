# Indievaders Guided Report Unlocks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Refractured report's dashboard-style opening with a guided, game-adjacent report experience that progressively unlocks interactive modules.

**Architecture:** Add a focused guided-report presentation layer under `src/components/refractured-report/guided-report/` and route `#client-report/refractured` into it by default. Keep the existing V5 market workspace modules as source material and deeper data surfaces, but do not use the current cockpit shell as the opening experience. Store unlock progress in local React state for the prototype.

**Tech Stack:** React 19, Vite SSR smoke tests, lucide-react icons, static report data from `src/data/refracturedPremiumReport.js`, CSS in `src/styles/refractured-report.css`, browser QA through the in-app browser.

---

## Scope Check

This plan covers one subsystem: the private Refractured client report route at `#client-report/refractured`.

This plan intentionally does not implement backend report generation, auth, payments, public sharing, paid API refreshes, or a full long-term workspace. It builds the first guided report prototype with two real unlocked modules: **Market Map** and **Player DNA**.

Use a fresh execution branch/worktree from `codex/refractured-v5-premium-workspace`. Do not continue from the abandoned `codex/refractured-v6-decision-workspace` worktree without explicitly diff-reviewing it first; it represents a rejected dashboard direction.

## File Structure

Create:

- `src/components/refractured-report/guided-report/guidedReportCopy.js`  
  Owns human-facing opening copy, forbidden copy patterns, and a small narrative validation helper.

- `src/components/refractured-report/guided-report/guidedReportModel.js`  
  Derives mission track, unlockable modules, Market Map nodes, Player DNA nodes, and evidence refs from `refracturedPremiumReport`.

- `src/components/refractured-report/guided-report/GuidedReportExperience.jsx`  
  Owns the guided report state: active chapter, unlocked module ids, selected module, and evidence drawer callbacks.

- `src/components/refractured-report/guided-report/GuidedReportShell.jsx`  
  Provides the new non-dashboard layout: brand rail, progress rail, stage area, and unlock tray.

- `src/components/refractured-report/guided-report/MarketReadScene.jsx`  
  First report scene: human opening copy, one dominant interactive mission board, and first unlock action.

- `src/components/refractured-report/guided-report/UnlockTray.jsx`  
  Shows visible symbolic unlockable modules from the beginning.

- `src/components/refractured-report/guided-report/MarketMapModule.jsx`  
  First unlocked module. Visual node map using Refractured and key comparables.

- `src/components/refractured-report/guided-report/PlayerDNAModule.jsx`  
  Second unlocked module. Interactive player-segment constellation with rewards/rejects.

Modify:

- `src/components/refractured-report/RefracturedReportPage.jsx`  
  Route the report into `GuidedReportExperience` by default while keeping existing evidence drawer wiring.

- `scripts/verify-refractured-components.mjs`  
  Add SSR tests for the guided report model, route, copy guardrails, unlock UI, and CSS selectors. Convert outdated V5 opening tests so they block the rejected cockpit as the default opening.

- `src/styles/refractured-report.css`  
  Add a guided report visual system with grid/depth/nodes/progress/unlock states and responsive behavior.

- `docs/project-management/decision-log.md`  
  Record the decision to replace the report opening with guided unlocks.

- `docs/project-management/refractured-report-workflow-notes.md`  
  Record prototype QA and remaining product risk.

## Task 1: Guided Model And Copy Guardrails

**Files:**

- Create: `src/components/refractured-report/guided-report/guidedReportCopy.js`
- Create: `src/components/refractured-report/guided-report/guidedReportModel.js`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add failing verifier imports**

In `scripts/verify-refractured-components.mjs`, add these imports inside the existing `try` block after the report data import:

```js
  const { guidedReportCopy, validateNarrativeCopy } = await server.ssrLoadModule(
    "/src/components/refractured-report/guided-report/guidedReportCopy.js",
  );
  const { buildGuidedReportModel } = await server.ssrLoadModule(
    "/src/components/refractured-report/guided-report/guidedReportModel.js",
  );
```

- [ ] **Step 2: Add failing model and copy tests**

Add these tests before the current `"V5 report page opens as a market workspace cockpit"` test:

```js
    test("guided report model uses universal mission chapters and visible unlockables", () => {
      const model = buildGuidedReportModel(report);

      assert.deepEqual(
        model.missionTrack.map((chapter) => chapter.label),
        ["Market Read", "Player Pull", "Niche Rules", "Rival Signals", "Storefront Hook", "Business Shape", "Proof Plan"],
      );
      assert.deepEqual(
        model.unlockables.map((item) => item.label),
        ["Market Map", "Player DNA", "Niche Rules", "Rival Signals", "Storefront Hook", "Business Shape", "Scenario Board", "Evidence Vault"],
      );
      assert.equal(model.unlockables[0].initialState, "locked");
      assert.equal(model.unlockables[0].unlockedBy, "market-read");
      assert.ok(model.marketMap.nodes.some((node) => node.id === "refractured"));
      assert.ok(model.marketMap.nodes.some((node) => node.id === "absolum"));
      assert.ok(model.playerDNA.nodes.length >= 3);
      assert.doesNotMatch(JSON.stringify(model.unlockables), /\bLab\b/);
    }),
    test("guided report copy uses human tension instead of generic strategic slogans", () => {
      const issues = validateNarrativeCopy(guidedReportCopy);

      assert.equal(issues.length, 0, issues.join("\\n"));
      assert.match(guidedReportCopy.hero.title, /first fight/i);
      assert.match(guidedReportCopy.hero.lines.join(" "), /small demo/i);
      assert.doesNotMatch(JSON.stringify(guidedReportCopy), /strongest commercial path/i);
      assert.doesNotMatch(JSON.stringify(guidedReportCopy), /unlock potential/i);
      assert.doesNotMatch(JSON.stringify(guidedReportCopy), /strategic opportunity/i);
    }),
```

- [ ] **Step 3: Run the component verifier to confirm failure**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because `guidedReportCopy.js` and `guidedReportModel.js` do not exist.

- [ ] **Step 4: Create `guidedReportCopy.js`**

Create `src/components/refractured-report/guided-report/guidedReportCopy.js` with this content:

```js
export const guidedReportCopy = {
  reportTitle: "Refractured Market Quest",
  hero: {
    eyebrow: "Market Read",
    title: "Make the first fight hard to put down.",
    lines: [
      "A small demo can work.",
      "A vague one usually cannot.",
      "This report shows what Refractured needs players to feel first, what this niche will demand, and what proof should unlock the next move.",
    ],
  },
  progressLabel: "Mission Track",
  unlockLabel: "Unlockable tools",
  primaryAction: "Begin the report",
  skipAction: "Skip to unlocked workspace",
};

const forbiddenCopyPatterns = [
  /strongest commercial path/i,
  /unlock potential/i,
  /strategic opportunity/i,
  /market positioning/i,
  /comprehensive solution/i,
  /game[- ]changing insights/i,
  /data[- ]driven decision/i,
];

function collectStrings(value) {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }

  return [];
}

export function validateNarrativeCopy(copy) {
  const strings = collectStrings(copy);
  const issues = [];

  for (const text of strings) {
    if (text.length > 180) {
      issues.push(`Copy line is too long: ${text}`);
    }

    for (const pattern of forbiddenCopyPatterns) {
      if (pattern.test(text)) {
        issues.push(`Forbidden phrase matched ${pattern}: ${text}`);
      }
    }
  }

  return issues;
}
```

- [ ] **Step 5: Create `guidedReportModel.js`**

Create `src/components/refractured-report/guided-report/guidedReportModel.js` with this content:

```js
const missionTrack = [
  {
    id: "market-read",
    label: "Market Read",
    prompt: "Where does the game stand right now?",
    unlocks: ["market-map"],
  },
  {
    id: "player-pull",
    label: "Player Pull",
    prompt: "What should make the right player remember it?",
    unlocks: ["player-dna"],
  },
  {
    id: "niche-rules",
    label: "Niche Rules",
    prompt: "What does this niche reward and punish?",
    unlocks: ["niche-rules"],
  },
  {
    id: "rival-signals",
    label: "Rival Signals",
    prompt: "What does the market already understand?",
    unlocks: ["rival-signals"],
  },
  {
    id: "storefront-hook",
    label: "Storefront Hook",
    prompt: "What should the Steam page make obvious first?",
    unlocks: ["storefront-hook"],
  },
  {
    id: "business-shape",
    label: "Business Shape",
    prompt: "What scope, price, and release shape fit the proof?",
    unlocks: ["business-shape", "scenario-board"],
  },
  {
    id: "proof-plan",
    label: "Proof Plan",
    prompt: "What should be proven before the next ambition?",
    unlocks: ["evidence-vault"],
  },
];

const unlockables = [
  {
    id: "market-map",
    label: "Market Map",
    description: "Place Refractured against the games that make the opportunity legible.",
    unlockedBy: "market-read",
    initialState: "locked",
  },
  {
    id: "player-dna",
    label: "Player DNA",
    description: "See what each target player rewards, rejects, and needs to feel.",
    unlockedBy: "player-pull",
    initialState: "locked",
  },
  {
    id: "niche-rules",
    label: "Niche Rules",
    description: "Track the expectations this niche will enforce.",
    unlockedBy: "niche-rules",
    initialState: "locked",
  },
  {
    id: "rival-signals",
    label: "Rival Signals",
    description: "Compare what similar games teach without copying their scope.",
    unlockedBy: "rival-signals",
    initialState: "locked",
  },
  {
    id: "storefront-hook",
    label: "Storefront Hook",
    description: "Test capsule, tags, trailer opening, and demo call to action.",
    unlockedBy: "storefront-hook",
    initialState: "locked",
  },
  {
    id: "business-shape",
    label: "Business Shape",
    description: "Connect scope, price, demo, and funding assumptions.",
    unlockedBy: "business-shape",
    initialState: "locked",
  },
  {
    id: "scenario-board",
    label: "Scenario Board",
    description: "Play with alternative scope and positioning choices.",
    unlockedBy: "business-shape",
    initialState: "locked",
  },
  {
    id: "evidence-vault",
    label: "Evidence Vault",
    description: "Audit the facts, estimates, interpretations, and gaps.",
    unlockedBy: "proof-plan",
    initialState: "locked",
  },
];

const marketNodePositions = {
  refractured: { x: 52, y: 55 },
  absolum: { x: 36, y: 62 },
  "dead-cells": { x: 66, y: 30 },
  "curse-of-the-dead-gods": { x: 64, y: 52 },
  rotwood: { x: 38, y: 36 },
  "hades-ii": { x: 80, y: 34 },
};

const marketNodeIds = ["absolum", "dead-cells", "curse-of-the-dead-gods", "rotwood", "hades-ii"];

function comparableNode(comparable) {
  const position = marketNodePositions[comparable.id] ?? { x: 50, y: 50 };

  return {
    id: comparable.id,
    title: comparable.title,
    role: comparable.role,
    x: position.x,
    y: position.y,
    imageUrl: comparable.imageUrl,
    marketLane: comparable.marketLane,
    read: comparable.refracturedRead,
    borrow: comparable.borrow,
    avoid: comparable.avoid,
    tags: comparable.tags?.slice(0, 5) ?? [],
    steamSnapshot: comparable.steamSnapshot,
    estimateSnapshot: comparable.estimateSnapshot,
    evidenceRefs: comparable.evidenceRefs ?? [],
  };
}

function playerNode(segment, index, total) {
  const safeTotal = Math.max(total, 1);
  const angle = (Math.PI * 2 * index) / safeTotal - Math.PI / 2;
  const radius = index % 2 === 0 ? 34 : 42;

  return {
    id: segment.id,
    title: segment.title,
    x: Math.round(50 + Math.cos(angle) * radius),
    y: Math.round(50 + Math.sin(angle) * radius),
    proofSignal: segment.proofSignal,
    rewards: segment.rewards ?? [],
    rejects: segment.rejects ?? [],
    evidenceRefs: segment.evidenceRefs ?? [],
    confidence: segment.confidence,
  };
}

export function buildGuidedReportModel(report) {
  const comparables = Array.isArray(report?.marketEvidence?.comparables) ? report.marketEvidence.comparables : [];
  const segments = Array.isArray(report?.audienceSignals?.segments) ? report.audienceSignals.segments : [];
  const selectedComparables = comparables.filter((item) => marketNodeIds.includes(item.id));

  return {
    meta: {
      projectName: report?.meta?.projectName ?? "Refractured",
      updatedAt: report?.meta?.updatedAt,
      route: report?.meta?.primaryRoute ?? "#client-report/refractured",
    },
    missionTrack,
    unlockables,
    marketRead: {
      title: "Make the first fight hard to put down.",
      summary:
        "A small demo can work. A vague one usually cannot. Refractured needs to prove what players feel first and why they would want another run.",
      currentObjective: "Prove first-fight feel and one-more-run pull before expanding the promise.",
      evidenceRefs: ["local-refractured-premise", "revenue-proxy-model"],
    },
    marketMap: {
      title: "Market Map",
      subtitle: "A visual read of where Refractured can be legible without copying another game's scope.",
      axes: {
        x: "Combat immediacy -> Systemic mastery",
        y: "Arcade brawler -> Action roguelite",
      },
      nodes: [
        {
          id: "refractured",
          title: "Refractured",
          role: "Current hypothesis",
          x: marketNodePositions.refractured.x,
          y: marketNodePositions.refractured.y,
          marketLane: "Readable brutal combat + one-more-run pull",
          read: "The opportunity is strongest if players can feel the repeat loop before the game promises breadth.",
          borrow: "Keep the first fight readable, heavy, and fast to retry.",
          avoid: "Selling scale before the return loop is proven.",
          tags: ["Action Roguelite", "2.5D", "Brutal Combat"],
          evidenceRefs: ["local-refractured-premise"],
        },
        ...selectedComparables.map(comparableNode),
      ],
    },
    playerDNA: {
      title: "Player DNA",
      subtitle: "A quick read of the people most likely to care, and what they will punish.",
      nodes: segments.map((segment, index) => playerNode(segment, index, segments.length)),
    },
  };
}
```

- [ ] **Step 6: Run the component verifier**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS for the two new tests while existing tests keep their current status.

- [ ] **Step 7: Commit**

Run:

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/guided-report/guidedReportCopy.js src/components/refractured-report/guided-report/guidedReportModel.js
git commit -m "feat: add guided report model"
```

## Task 2: Route The Report Into A Guided Experience

**Files:**

- Create: `src/components/refractured-report/guided-report/GuidedReportExperience.jsx`
- Create: `src/components/refractured-report/guided-report/GuidedReportShell.jsx`
- Create: `src/components/refractured-report/guided-report/UnlockTray.jsx`
- Modify: `src/components/refractured-report/RefracturedReportPage.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add failing SSR tests for the new default route**

Replace the existing `"V5 report page opens as a market workspace cockpit"` test with:

```js
    test("guided report route opens as a story experience instead of the old cockpit", () => {
      const markup = renderToStaticMarkup(React.createElement(RefracturedReportPage));

      assert.match(markup, /indie-guided-report/);
      assert.match(markup, /Refractured Market Quest/);
      assert.match(markup, /Make the first fight hard to put down/);
      assert.match(markup, /Mission Track/);
      assert.match(markup, /Unlockable tools/);
      assert.match(markup, /Market Map/);
      assert.match(markup, /Player DNA/);
      assert.doesNotMatch(markup, /refractured-market-workspace/);
      assert.doesNotMatch(markup, /refractured-insight-rail/);
      assert.doesNotMatch(markup, /At a glance/);
      assert.doesNotMatch(markup, /Market Intelligence Workspace/);
      assert.doesNotMatch(markup, /Comparable Explorer/);
    }),
```

Add this second test after it:

```js
    test("guided report unlock tray shows locked tools without using Lab naming", () => {
      const markup = renderToStaticMarkup(React.createElement(RefracturedReportPage));

      assert.match(markup, /data-unlock-state="locked"/);
      assert.match(markup, /Market Map/);
      assert.match(markup, /Player DNA/);
      assert.match(markup, /Evidence Vault/);
      assert.doesNotMatch(markup, />[^<]*Lab[^<]*</);
    }),
```

- [ ] **Step 2: Run the component verifier to confirm failure**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because `RefracturedReportPage` still renders the V5 cockpit.

- [ ] **Step 3: Create `UnlockTray.jsx`**

Create `src/components/refractured-report/guided-report/UnlockTray.jsx`:

```jsx
import { Lock, Sparkles } from "lucide-react";

function UnlockTray({ activeModuleId, onModuleSelect, unlockedIds = [], unlockables = [] }) {
  return (
    <aside className="indie-unlock-tray" aria-label="Unlockable tools">
      <header>
        <span>Unlockable tools</span>
        <strong>{unlockedIds.length} / {unlockables.length} open</strong>
      </header>
      <div className="indie-unlock-grid">
        {unlockables.map((item) => {
          const unlocked = unlockedIds.includes(item.id);
          const active = item.id === activeModuleId;
          const Icon = unlocked ? Sparkles : Lock;

          return (
            <button
              aria-pressed={active}
              className={active ? "is-active" : ""}
              data-unlock-state={unlocked ? "unlocked" : "locked"}
              disabled={!unlocked}
              key={item.id}
              type="button"
              onClick={() => onModuleSelect(item.id)}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{item.label}</span>
              <small>{unlocked ? "Unlocked" : `Unlocks after ${item.unlockedBy.replaceAll("-", " ")}`}</small>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default UnlockTray;
```

- [ ] **Step 4: Create `GuidedReportShell.jsx`**

Create `src/components/refractured-report/guided-report/GuidedReportShell.jsx`:

```jsx
import { ChevronRight } from "lucide-react";
import UnlockTray from "./UnlockTray.jsx";
import { guidedReportCopy } from "./guidedReportCopy.js";

function MissionTrack({ activeChapterId, missionTrack = [], unlockedChapterIds = [] }) {
  return (
    <nav className="indie-mission-track" aria-label="Mission Track">
      <span>{guidedReportCopy.progressLabel}</span>
      <ol>
        {missionTrack.map((chapter, index) => {
          const active = chapter.id === activeChapterId;
          const complete = unlockedChapterIds.includes(chapter.id);

          return (
            <li className={active ? "is-active" : complete ? "is-complete" : ""} key={chapter.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{chapter.label}</strong>
                <small>{chapter.prompt}</small>
              </div>
              <ChevronRight size={15} aria-hidden="true" />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function GuidedReportShell({
  activeChapterId,
  activeModuleId,
  children,
  missionTrack,
  onModuleSelect,
  unlockedChapterIds,
  unlockedModuleIds,
  unlockables,
}) {
  return (
    <main className="refractured-report-shell indie-guided-report">
      <div className="indie-guided-bg" aria-hidden="true" />
      <header className="indie-guided-topbar">
        <a className="indie-guided-brand" href="#">
          <span aria-hidden="true" />
          <strong>INDIEVADERS</strong>
          <small>{guidedReportCopy.reportTitle}</small>
        </a>
        <p>Report snapshot / interactive unlocks</p>
      </header>
      <div className="indie-guided-layout">
        <MissionTrack
          activeChapterId={activeChapterId}
          missionTrack={missionTrack}
          unlockedChapterIds={unlockedChapterIds}
        />
        <section className="indie-guided-stage" aria-label="Guided report">
          {children}
        </section>
        <UnlockTray
          activeModuleId={activeModuleId}
          onModuleSelect={onModuleSelect}
          unlockedIds={unlockedModuleIds}
          unlockables={unlockables}
        />
      </div>
    </main>
  );
}

export default GuidedReportShell;
```

- [ ] **Step 5: Create `GuidedReportExperience.jsx` with the opening scene placeholder**

Create `src/components/refractured-report/guided-report/GuidedReportExperience.jsx`:

```jsx
import { useMemo, useState } from "react";
import GuidedReportShell from "./GuidedReportShell.jsx";
import { guidedReportCopy } from "./guidedReportCopy.js";
import { buildGuidedReportModel } from "./guidedReportModel.js";

function OpeningScene({ marketRead, onAdvance }) {
  return (
    <article className="indie-opening-scene">
      <p className="refractured-kicker">{guidedReportCopy.hero.eyebrow}</p>
      <h1>{guidedReportCopy.hero.title}</h1>
      <div className="indie-opening-copy">
        {guidedReportCopy.hero.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="indie-current-objective">
        <span>Current objective</span>
        <strong>{marketRead.currentObjective}</strong>
      </div>
      <button className="indie-primary-action" type="button" onClick={onAdvance}>
        {guidedReportCopy.primaryAction}
      </button>
    </article>
  );
}

function GuidedReportExperience({ onEvidenceOpen, report }) {
  const model = useMemo(() => buildGuidedReportModel(report), [report]);
  const [activeChapterId, setActiveChapterId] = useState("market-read");
  const [unlockedChapterIds, setUnlockedChapterIds] = useState([]);
  const [unlockedModuleIds, setUnlockedModuleIds] = useState([]);
  const [activeModuleId, setActiveModuleId] = useState(null);

  function unlockChapter(chapterId) {
    const chapter = model.missionTrack.find((item) => item.id === chapterId);
    const nextUnlocks = chapter?.unlocks ?? [];

    setUnlockedChapterIds((current) => (current.includes(chapterId) ? current : [...current, chapterId]));
    setUnlockedModuleIds((current) => Array.from(new Set([...current, ...nextUnlocks])));
    setActiveModuleId((current) => current ?? nextUnlocks[0] ?? null);
    setActiveChapterId("player-pull");
  }

  return (
    <GuidedReportShell
      activeChapterId={activeChapterId}
      activeModuleId={activeModuleId}
      missionTrack={model.missionTrack}
      onModuleSelect={setActiveModuleId}
      unlockedChapterIds={unlockedChapterIds}
      unlockedModuleIds={unlockedModuleIds}
      unlockables={model.unlockables}
    >
      <OpeningScene marketRead={model.marketRead} onAdvance={() => unlockChapter("market-read")} />
      <button
        className="indie-evidence-link"
        type="button"
        onClick={() => onEvidenceOpen(model.marketRead.evidenceRefs)}
      >
        Why this read?
      </button>
    </GuidedReportShell>
  );
}

export default GuidedReportExperience;
```

- [ ] **Step 6: Route `RefracturedReportPage` into the guided experience**

In `src/components/refractured-report/RefracturedReportPage.jsx`, add:

```js
import GuidedReportExperience from "./guided-report/GuidedReportExperience.jsx";
```

Replace the `return (` block with:

```jsx
  return (
    <>
      <GuidedReportExperience onEvidenceOpen={openEvidenceDrawer} report={refracturedPremiumReport} />
      <RefracturedEvidenceDrawer
        activeRefs={activeEvidenceRefs}
        evidence={refracturedPremiumReport.evidenceLedger}
        onClose={closeEvidenceDrawer}
        open={evidenceDrawerOpen}
        showAll={showAllEvidence}
      />
    </>
  );
```

Remove the now-unused imports and state from `RefracturedReportPage.jsx`:

```js
import ActionPlanTimeline from "./ActionPlanTimeline.jsx";
import AudienceSignals from "./AudienceSignals.jsx";
import ComparableExplorer from "./ComparableExplorer.jsx";
import EvidenceLedgerPage from "./EvidenceLedgerPage.jsx";
import MarketMap from "./MarketMap.jsx";
import MarketWorkspaceShell from "./MarketWorkspaceShell.jsx";
import ReviewCommunityThemes from "./ReviewCommunityThemes.jsx";
import RogueliteLoopLab from "./RogueliteLoopLab.jsx";
import SteamPositioningBuilder from "./SteamPositioningBuilder.jsx";
```

Delete `sections`, `sectionModules`, `activeSection`, `handleSectionChange`, `openEvidenceLedger`, `activeModuleKey`, and `activeModule`.

- [ ] **Step 7: Run the component verifier**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS for the route tests and existing module tests.

- [ ] **Step 8: Commit**

Run:

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/RefracturedReportPage.jsx src/components/refractured-report/guided-report/GuidedReportExperience.jsx src/components/refractured-report/guided-report/GuidedReportShell.jsx src/components/refractured-report/guided-report/UnlockTray.jsx
git commit -m "feat: route refractured report to guided unlock experience"
```

## Task 3: Market Read Scene With A Real Unlock Moment

**Files:**

- Create: `src/components/refractured-report/guided-report/MarketReadScene.jsx`
- Modify: `src/components/refractured-report/guided-report/GuidedReportExperience.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add failing SSR test for the first scene**

Add this test after the guided route test:

```js
    test("guided market read scene has one dominant scene and no dashboard metrics", () => {
      const markup = renderToStaticMarkup(React.createElement(RefracturedReportPage));

      assert.match(markup, /indie-market-read-scene/);
      assert.match(markup, /indie-quest-board/);
      assert.match(markup, /One-more-run pull/);
      assert.match(markup, /Unlock Market Map/);
      assert.doesNotMatch(markup, /Facts \\/ estimates \\/ interpretation \\/ actions/);
      assert.doesNotMatch(markup, /71\\/100/);
      assert.doesNotMatch(markup, /Gross proxy/);
    }),
```

- [ ] **Step 2: Run the component verifier to confirm failure**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because `MarketReadScene` is not implemented.

- [ ] **Step 3: Create `MarketReadScene.jsx`**

Create `src/components/refractured-report/guided-report/MarketReadScene.jsx`:

```jsx
import { ArrowRight, Database, Sparkles } from "lucide-react";
import { guidedReportCopy } from "./guidedReportCopy.js";

function QuestSignal({ label, value }) {
  return (
    <div className="indie-quest-signal">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MarketReadScene({ marketRead, onAdvance, onEvidenceOpen }) {
  return (
    <article className="indie-market-read-scene">
      <section className="indie-report-lead">
        <p className="refractured-kicker">{guidedReportCopy.hero.eyebrow}</p>
        <h1>{guidedReportCopy.hero.title}</h1>
        <div className="indie-opening-copy">
          {guidedReportCopy.hero.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section className="indie-quest-board" aria-label="Market read quest board">
        <div className="indie-grid-card indie-grid-card-primary">
          <span>Current objective</span>
          <strong>{marketRead.currentObjective}</strong>
        </div>
        <div className="indie-quest-line" aria-hidden="true" />
        <QuestSignal label="Player pull" value="One-more-run pull" />
        <QuestSignal label="Niche demand" value="Readable combat" />
        <QuestSignal label="Next proof" value="First fight + retry desire" />
      </section>

      <footer className="indie-scene-actions">
        <button className="indie-primary-action" type="button" onClick={onAdvance}>
          <Sparkles size={17} aria-hidden="true" />
          Unlock Market Map
          <ArrowRight size={17} aria-hidden="true" />
        </button>
        <button className="indie-secondary-action" type="button" onClick={() => onEvidenceOpen(marketRead.evidenceRefs)}>
          <Database size={16} aria-hidden="true" />
          Why this read?
        </button>
      </footer>
    </article>
  );
}

export default MarketReadScene;
```

- [ ] **Step 4: Use `MarketReadScene` in `GuidedReportExperience.jsx`**

In `src/components/refractured-report/guided-report/GuidedReportExperience.jsx`, add:

```js
import MarketReadScene from "./MarketReadScene.jsx";
```

Remove the local `OpeningScene` function.

Replace the current children inside `GuidedReportShell` with:

```jsx
      <MarketReadScene
        marketRead={model.marketRead}
        onAdvance={() => unlockChapter("market-read")}
        onEvidenceOpen={onEvidenceOpen}
      />
```

- [ ] **Step 5: Run the component verifier**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/guided-report/GuidedReportExperience.jsx src/components/refractured-report/guided-report/MarketReadScene.jsx
git commit -m "feat: add guided market read scene"
```

## Task 4: Interactive Market Map Unlock

**Files:**

- Create: `src/components/refractured-report/guided-report/MarketMapModule.jsx`
- Modify: `src/components/refractured-report/guided-report/GuidedReportExperience.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add failing SSR test for Market Map module**

Load `MarketMapModule` near the other verifier imports:

```js
  const { default: MarketMapModule } = await server.ssrLoadModule(
    "/src/components/refractured-report/guided-report/MarketMapModule.jsx",
  );
```

Add this test after the Market Read scene test:

```js
    test("guided market map module renders a node map instead of comparable cards", () => {
      const model = buildGuidedReportModel(report);
      const markup = renderToStaticMarkup(
        React.createElement(MarketMapModule, {
          marketMap: model.marketMap,
          onEvidenceOpen: noop,
        }),
      );

      assert.match(markup, /indie-market-map-module/);
      assert.match(markup, /indie-node-map/);
      assert.match(markup, /Refractured/);
      assert.match(markup, /Absolum/);
      assert.match(markup, /Dead Cells/);
      assert.doesNotMatch(markup, /refractured-comparable-card-grid/);
      assert.doesNotMatch(markup, /Gross proxy/);
    }),
```

- [ ] **Step 2: Run the component verifier to confirm failure**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because `MarketMapModule.jsx` does not exist.

- [ ] **Step 3: Create `MarketMapModule.jsx`**

Create `src/components/refractured-report/guided-report/MarketMapModule.jsx`:

```jsx
import { useState } from "react";
import { Database, ExternalLink } from "lucide-react";

function NodeButton({ active, node, onSelect }) {
  const style = {
    "--node-x": `${node.x}%`,
    "--node-y": `${node.y}%`,
  };

  return (
    <button
      aria-pressed={active}
      className={active ? "is-active" : ""}
      style={style}
      type="button"
      onClick={() => onSelect(node.id)}
    >
      {node.imageUrl ? <img alt="" src={node.imageUrl} /> : null}
      <strong>{node.title}</strong>
      <span>{node.role}</span>
    </button>
  );
}

function MarketMapModule({ marketMap, onEvidenceOpen }) {
  const nodes = marketMap.nodes ?? [];
  const [activeNodeId, setActiveNodeId] = useState(nodes[0]?.id);
  const activeNode = nodes.find((node) => node.id === activeNodeId) ?? nodes[0];

  return (
    <article className="indie-market-map-module">
      <header className="indie-module-header">
        <span>Unlocked / Market Map</span>
        <h2>{marketMap.title}</h2>
        <p>{marketMap.subtitle}</p>
      </header>

      <div className="indie-node-map-layout">
        <section className="indie-node-map" aria-label="Refractured market map">
          <span className="indie-axis indie-axis-x">{marketMap.axes.x}</span>
          <span className="indie-axis indie-axis-y">{marketMap.axes.y}</span>
          <div className="indie-opportunity-zone">Readable combat + return pull</div>
          {nodes.map((node) => (
            <NodeButton active={node.id === activeNode?.id} key={node.id} node={node} onSelect={setActiveNodeId} />
          ))}
        </section>

        {activeNode ? (
          <aside className="indie-node-inspector">
            <span>{activeNode.role}</span>
            <h3>{activeNode.title}</h3>
            <p>{activeNode.read}</p>
            <dl>
              <div>
                <dt>Borrow</dt>
                <dd>{activeNode.borrow}</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>{activeNode.avoid}</dd>
              </div>
            </dl>
            <div className="indie-tag-line">
              {(activeNode.tags ?? []).map((tag) => (
                <small key={tag}>{tag}</small>
              ))}
            </div>
            <footer>
              <button type="button" onClick={() => onEvidenceOpen(activeNode.evidenceRefs)}>
                <Database size={16} aria-hidden="true" />
                Why this node?
              </button>
              {activeNode.steamSnapshot ? (
                <span>
                  <ExternalLink size={14} aria-hidden="true" />
                  Steam snapshot: {activeNode.steamSnapshot.reviewTone}
                </span>
              ) : null}
            </footer>
          </aside>
        ) : null}
      </div>
    </article>
  );
}

export default MarketMapModule;
```

- [ ] **Step 4: Render Market Map after unlocking**

In `GuidedReportExperience.jsx`, import:

```js
import MarketMapModule from "./MarketMapModule.jsx";
```

Add this helper inside `GuidedReportExperience` before the return:

```js
  const activeModule =
    activeModuleId === "market-map" ? (
      <MarketMapModule marketMap={model.marketMap} onEvidenceOpen={onEvidenceOpen} />
    ) : null;
```

Render the module after `MarketReadScene`:

```jsx
      {activeModule ? <section className="indie-unlocked-module">{activeModule}</section> : null}
```

- [ ] **Step 5: Run the component verifier**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/guided-report/GuidedReportExperience.jsx src/components/refractured-report/guided-report/MarketMapModule.jsx
git commit -m "feat: add guided market map unlock"
```

## Task 5: Interactive Player DNA Unlock

**Files:**

- Create: `src/components/refractured-report/guided-report/PlayerDNAModule.jsx`
- Modify: `src/components/refractured-report/guided-report/GuidedReportExperience.jsx`
- Modify: `src/components/refractured-report/guided-report/MarketReadScene.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add failing SSR test for Player DNA**

Load `PlayerDNAModule` near the other verifier imports:

```js
  const { default: PlayerDNAModule } = await server.ssrLoadModule(
    "/src/components/refractured-report/guided-report/PlayerDNAModule.jsx",
  );
```

Add this test after the Market Map module test:

```js
    test("guided player DNA module renders interactive audience nodes", () => {
      const model = buildGuidedReportModel(report);
      const markup = renderToStaticMarkup(
        React.createElement(PlayerDNAModule, {
          onEvidenceOpen: noop,
          playerDNA: model.playerDNA,
        }),
      );

      assert.match(markup, /indie-player-dna-module/);
      assert.match(markup, /indie-player-orbit/);
      assert.match(markup, /Rewards/);
      assert.match(markup, /Rejects/);
      assert.doesNotMatch(markup, /refractured-signal-selector/);
      assert.doesNotMatch(markup, /Audience clusters are expectations to prove/);
    }),
```

- [ ] **Step 2: Run the component verifier to confirm failure**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because `PlayerDNAModule.jsx` does not exist.

- [ ] **Step 3: Create `PlayerDNAModule.jsx`**

Create `src/components/refractured-report/guided-report/PlayerDNAModule.jsx`:

```jsx
import { useState } from "react";
import { Database } from "lucide-react";

function PlayerNode({ active, node, onSelect }) {
  const style = {
    "--node-x": `${node.x}%`,
    "--node-y": `${node.y}%`,
  };

  return (
    <button
      aria-pressed={active}
      className={active ? "is-active" : ""}
      style={style}
      type="button"
      onClick={() => onSelect(node.id)}
    >
      <span>{node.title}</span>
    </button>
  );
}

function BulletList({ items = [], title }) {
  return (
    <section>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function PlayerDNAModule({ onEvidenceOpen, playerDNA }) {
  const nodes = playerDNA.nodes ?? [];
  const [activeNodeId, setActiveNodeId] = useState(nodes[0]?.id);
  const activeNode = nodes.find((node) => node.id === activeNodeId) ?? nodes[0];

  return (
    <article className="indie-player-dna-module">
      <header className="indie-module-header">
        <span>Unlocked / Player DNA</span>
        <h2>{playerDNA.title}</h2>
        <p>{playerDNA.subtitle}</p>
      </header>

      <div className="indie-player-dna-layout">
        <section className="indie-player-orbit" aria-label="Player DNA audience map">
          <div className="indie-orbit-core">
            <strong>Player pull</strong>
            <span>Click, remember, return</span>
          </div>
          {nodes.map((node) => (
            <PlayerNode active={node.id === activeNode?.id} key={node.id} node={node} onSelect={setActiveNodeId} />
          ))}
        </section>

        {activeNode ? (
          <aside className="indie-player-inspector">
            <span>{activeNode.confidence}</span>
            <h3>{activeNode.title}</h3>
            <p>{activeNode.proofSignal}</p>
            <div className="indie-player-columns">
              <BulletList items={activeNode.rewards} title="Rewards" />
              <BulletList items={activeNode.rejects} title="Rejects" />
            </div>
            <button type="button" onClick={() => onEvidenceOpen(activeNode.evidenceRefs)}>
              <Database size={16} aria-hidden="true" />
              Why this player read?
            </button>
          </aside>
        ) : null}
      </div>
    </article>
  );
}

export default PlayerDNAModule;
```

- [ ] **Step 4: Allow the opening scene to unlock the second chapter**

In `GuidedReportExperience.jsx`, import:

```js
import PlayerDNAModule from "./PlayerDNAModule.jsx";
```

Update the `activeModule` helper to:

```jsx
  const activeModule =
    activeModuleId === "market-map" ? (
      <MarketMapModule marketMap={model.marketMap} onEvidenceOpen={onEvidenceOpen} />
    ) : activeModuleId === "player-dna" ? (
      <PlayerDNAModule onEvidenceOpen={onEvidenceOpen} playerDNA={model.playerDNA} />
    ) : null;
```

Add this function after `unlockChapter`:

```js
  function unlockPlayerPull() {
    setActiveChapterId("player-pull");
    setUnlockedChapterIds((current) => (current.includes("player-pull") ? current : [...current, "player-pull"]));
    setUnlockedModuleIds((current) => Array.from(new Set([...current, "market-map", "player-dna"])));
    setActiveModuleId("player-dna");
  }
```

Pass it into `MarketReadScene`:

```jsx
        onUnlockPlayerDNA={unlockPlayerPull}
```

In `MarketReadScene.jsx`, update the function signature:

```js
function MarketReadScene({ marketRead, onAdvance, onEvidenceOpen, onUnlockPlayerDNA }) {
```

Add a secondary action in the footer after `Unlock Market Map`:

```jsx
        <button className="indie-secondary-action" type="button" onClick={onUnlockPlayerDNA}>
          Preview Player DNA
        </button>
```

- [ ] **Step 5: Run the component verifier**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/guided-report/GuidedReportExperience.jsx src/components/refractured-report/guided-report/MarketReadScene.jsx src/components/refractured-report/guided-report/PlayerDNAModule.jsx
git commit -m "feat: add guided player dna unlock"
```

## Task 6: Guided Visual System CSS

**Files:**

- Modify: `src/styles/refractured-report.css`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add failing CSS selector test**

Add `import fs from "node:fs";` at the top of `scripts/verify-refractured-components.mjs`.

Add this test near the end of the test array:

```js
    test("guided report CSS defines scene, unlock, node, and responsive systems", () => {
      const css = fs.readFileSync("src/styles/refractured-report.css", "utf8");

      [
        ".indie-guided-report",
        ".indie-guided-layout",
        ".indie-market-read-scene",
        ".indie-quest-board",
        ".indie-unlock-tray",
        ".indie-node-map",
        ".indie-market-map-module",
        ".indie-player-dna-module",
        ".indie-player-orbit",
      ].forEach((selector) => {
        assert.match(css, new RegExp(`${selector.replaceAll(".", "\\.")}\\s*\\{`));
      });
      assert.match(css, /@media \(max-width: 980px\)[\s\S]*\.indie-guided-layout/);
      assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.indie-node-map/);
    }),
```

- [ ] **Step 2: Run the component verifier to confirm failure**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because the new CSS selectors are missing.

- [ ] **Step 3: Append guided report CSS**

Append this CSS to `src/styles/refractured-report.css` before the final responsive blocks if practical, or at the end of the file if that is safer:

```css
/* Indievaders guided report unlock prototype */
.indie-guided-report {
  --ig-bg: #050707;
  --ig-panel: rgba(13, 17, 17, 0.78);
  --ig-panel-strong: rgba(20, 26, 25, 0.92);
  --ig-line: rgba(241, 234, 220, 0.12);
  --ig-line-strong: rgba(214, 168, 91, 0.48);
  --ig-glow: rgba(98, 184, 166, 0.22);
  position: relative;
  overflow: hidden;
  padding: 0;
  background:
    radial-gradient(circle at 64% 14%, rgba(98, 184, 166, 0.14), transparent 34%),
    radial-gradient(circle at 18% 82%, rgba(214, 168, 91, 0.1), transparent 32%),
    #050707;
}

.indie-guided-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(241, 234, 220, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(241, 234, 220, 0.045) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(circle at 50% 20%, #000 0%, transparent 74%);
}

.indie-guided-topbar,
.indie-guided-layout {
  position: relative;
  width: min(1540px, calc(100% - 28px));
  margin-inline: auto;
}

.indie-guided-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: 76px;
  border-bottom: 1px solid var(--ig-line);
}

.indie-guided-brand {
  display: inline-grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  color: var(--rf-text);
  text-decoration: none;
}

.indie-guided-brand > span {
  width: 22px;
  height: 22px;
  border: 2px solid var(--rf-amber);
  transform: rotate(45deg);
}

.indie-guided-brand strong,
.indie-guided-brand small {
  display: block;
}

.indie-guided-brand small,
.indie-guided-topbar p {
  color: var(--rf-muted);
  font-size: 0.78rem;
}

.indie-guided-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 320px;
  gap: 18px;
  align-items: start;
  padding-block: 22px 56px;
}

.indie-mission-track,
.indie-unlock-tray,
.indie-market-read-scene,
.indie-market-map-module,
.indie-player-dna-module {
  border: 1px solid var(--ig-line);
  background: var(--ig-panel);
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
}

.indie-mission-track,
.indie-unlock-tray {
  position: sticky;
  top: 18px;
  display: grid;
  gap: 14px;
  padding: 14px;
  border-radius: 10px;
}

.indie-mission-track > span,
.indie-unlock-tray header span,
.indie-report-lead .refractured-kicker,
.indie-module-header span,
.indie-quest-signal span,
.indie-current-objective span {
  color: var(--rf-amber);
  font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, ui-monospace, monospace;
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
}

.indie-mission-track ol {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.indie-mission-track li {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 18px;
  gap: 10px;
  align-items: center;
  min-height: 62px;
  padding: 9px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--rf-muted);
}

.indie-mission-track li.is-active,
.indie-mission-track li.is-complete {
  border-color: var(--ig-line-strong);
  background: rgba(214, 168, 91, 0.08);
  color: var(--rf-text);
}

.indie-mission-track li small {
  display: block;
  margin-top: 3px;
  color: var(--rf-muted);
  font-size: 0.72rem;
}

.indie-guided-stage {
  display: grid;
  gap: 18px;
}

.indie-market-read-scene {
  display: grid;
  gap: 24px;
  min-height: 640px;
  padding: clamp(22px, 4vw, 48px);
  border-radius: 16px;
}

.indie-report-lead h1 {
  max-width: 820px;
  margin: 8px 0 16px;
  color: #fff4dc;
  font-size: clamp(2.4rem, 6vw, 5.8rem);
  line-height: 0.94;
}

.indie-opening-copy {
  display: grid;
  gap: 8px;
  max-width: 680px;
}

.indie-opening-copy p {
  margin: 0;
  color: var(--rf-soft);
  font-size: clamp(1rem, 1.5vw, 1.22rem);
  line-height: 1.44;
}

.indie-quest-board {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) repeat(3, minmax(130px, 0.42fr));
  gap: 12px;
  align-items: stretch;
  padding: 14px;
  border: 1px solid rgba(98, 184, 166, 0.22);
  border-radius: 14px;
  background:
    linear-gradient(rgba(241, 234, 220, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(241, 234, 220, 0.04) 1px, transparent 1px),
    rgba(0, 0, 0, 0.18);
  background-size: 34px 34px;
}

.indie-grid-card,
.indie-quest-signal,
.indie-current-objective {
  display: grid;
  align-content: center;
  gap: 8px;
  min-height: 116px;
  padding: 14px;
  border: 1px solid var(--ig-line);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.035);
}

.indie-grid-card-primary {
  border-color: rgba(98, 184, 166, 0.38);
  box-shadow: inset 0 0 0 1px rgba(98, 184, 166, 0.08);
}

.indie-grid-card strong,
.indie-quest-signal strong,
.indie-current-objective strong {
  color: #fff2d7;
  font-size: 1rem;
  line-height: 1.22;
}

.indie-scene-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.indie-primary-action,
.indie-secondary-action,
.indie-evidence-link,
.indie-node-inspector button,
.indie-player-inspector button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 10px 14px;
  border: 1px solid var(--ig-line-strong);
  border-radius: 9px;
  background: rgba(214, 168, 91, 0.13);
  color: #fff2d7;
  cursor: pointer;
  font-weight: 900;
}

.indie-secondary-action,
.indie-evidence-link,
.indie-node-inspector button,
.indie-player-inspector button {
  border-color: var(--ig-line);
  background: rgba(255, 255, 255, 0.035);
}

.indie-unlock-tray header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.indie-unlock-grid {
  display: grid;
  gap: 8px;
}

.indie-unlock-grid button {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  gap: 8px 10px;
  align-items: center;
  min-height: 64px;
  padding: 10px;
  border: 1px solid var(--ig-line);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--rf-muted);
  text-align: left;
}

.indie-unlock-grid button small {
  grid-column: 2;
  color: var(--rf-muted);
  font-size: 0.68rem;
}

.indie-unlock-grid button[data-unlock-state="unlocked"] {
  border-color: rgba(98, 184, 166, 0.42);
  color: var(--rf-text);
  cursor: pointer;
  box-shadow: 0 0 32px rgba(98, 184, 166, 0.08);
}

.indie-unlocked-module {
  display: grid;
}

.indie-market-map-module,
.indie-player-dna-module {
  display: grid;
  gap: 18px;
  padding: 18px;
  border-radius: 16px;
}

.indie-module-header h2 {
  margin: 5px 0 6px;
  color: #fff2d7;
  font-size: clamp(1.5rem, 3vw, 2.8rem);
}

.indie-module-header p {
  max-width: 780px;
  margin: 0;
  color: var(--rf-soft);
}

.indie-node-map-layout,
.indie-player-dna-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.34fr);
  gap: 16px;
}

.indie-node-map,
.indie-player-orbit {
  position: relative;
  min-height: 520px;
  overflow: hidden;
  border: 1px solid rgba(98, 184, 166, 0.22);
  border-radius: 14px;
  background:
    radial-gradient(circle at 54% 44%, rgba(98, 184, 166, 0.14), transparent 32%),
    linear-gradient(rgba(241, 234, 220, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(241, 234, 220, 0.045) 1px, transparent 1px);
  background-size: auto, 48px 48px, 48px 48px;
}

.indie-node-map button,
.indie-player-orbit button {
  position: absolute;
  left: var(--node-x);
  top: var(--node-y);
  transform: translate(-50%, -50%);
  display: grid;
  gap: 4px;
  width: 136px;
  min-height: 78px;
  padding: 8px;
  border: 1px solid rgba(241, 234, 220, 0.16);
  border-radius: 10px;
  background: rgba(8, 12, 12, 0.9);
  color: var(--rf-text);
  cursor: pointer;
  text-align: left;
}

.indie-node-map button.is-active,
.indie-player-orbit button.is-active {
  border-color: var(--rf-amber);
  box-shadow: 0 0 0 2px rgba(214, 168, 91, 0.18), 0 0 36px rgba(214, 168, 91, 0.12);
}

.indie-node-map img {
  width: 100%;
  aspect-ratio: 16 / 5;
  object-fit: cover;
  border-radius: 6px;
}

.indie-axis {
  position: absolute;
  color: rgba(241, 234, 220, 0.42);
  font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, ui-monospace, monospace;
  font-size: 0.66rem;
  font-weight: 900;
  text-transform: uppercase;
}

.indie-axis-x {
  right: 16px;
  bottom: 14px;
}

.indie-axis-y {
  left: 14px;
  top: 14px;
  writing-mode: vertical-rl;
}

.indie-opportunity-zone,
.indie-orbit-core {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 240px;
  min-height: 112px;
  padding: 14px;
  border: 1px dashed rgba(98, 184, 166, 0.42);
  border-radius: 999px;
  color: #d9fff6;
  text-align: center;
  transform: translate(-50%, -50%);
}

.indie-node-inspector,
.indie-player-inspector {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--ig-line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
}

.indie-node-inspector h3,
.indie-player-inspector h3 {
  margin: 0;
  color: #fff2d7;
  font-size: 1.35rem;
}

.indie-node-inspector p,
.indie-player-inspector p {
  margin: 0;
  color: var(--rf-soft);
  line-height: 1.45;
}

.indie-node-inspector dl,
.indie-player-columns {
  display: grid;
  gap: 10px;
}

.indie-node-inspector dt,
.indie-player-columns h4 {
  color: var(--rf-amber);
  font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, ui-monospace, monospace;
  font-size: 0.68rem;
  text-transform: uppercase;
}

.indie-node-inspector dd {
  margin: 4px 0 0;
  color: var(--rf-soft);
}

.indie-tag-line {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.indie-tag-line small {
  padding: 4px 7px;
  border: 1px solid var(--ig-line);
  border-radius: 999px;
  color: var(--rf-soft);
}

.indie-player-orbit {
  min-height: 500px;
}

.indie-orbit-core strong,
.indie-orbit-core span {
  display: block;
}

.indie-player-columns ul {
  display: grid;
  gap: 6px;
  margin: 6px 0 0;
  padding-left: 18px;
  color: var(--rf-soft);
}

@media (max-width: 980px) {
  .indie-guided-layout,
  .indie-node-map-layout,
  .indie-player-dna-layout {
    grid-template-columns: 1fr;
  }

  .indie-mission-track,
  .indie-unlock-tray {
    position: static;
  }

  .indie-mission-track ol,
  .indie-unlock-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .indie-quest-board {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .indie-guided-topbar {
    align-items: flex-start;
    flex-direction: column;
    padding-block: 12px;
  }

  .indie-mission-track ol,
  .indie-unlock-grid,
  .indie-quest-board {
    grid-template-columns: 1fr;
  }

  .indie-report-lead h1 {
    font-size: clamp(2.1rem, 14vw, 3.5rem);
  }

  .indie-node-map,
  .indie-player-orbit {
    display: grid;
    gap: 8px;
    min-height: auto;
    padding: 12px;
  }

  .indie-node-map button,
  .indie-player-orbit button {
    position: static;
    width: 100%;
    transform: none;
  }

  .indie-axis,
  .indie-opportunity-zone,
  .indie-orbit-core {
    position: static;
    width: auto;
    min-height: auto;
    transform: none;
    writing-mode: horizontal-tb;
  }
}
```

- [ ] **Step 4: Run the component verifier**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```powershell
git add scripts/verify-refractured-components.mjs src/styles/refractured-report.css
git commit -m "style: add guided report visual system"
```

## Task 7: Evidence Behavior And Narrative Guardrails

**Files:**

- Modify: `src/components/refractured-report/EvidenceReaderCard.jsx`
- Modify: `src/components/refractured-report/RefracturedEvidenceDrawer.jsx`
- Modify: `scripts/verify-refractured-components.mjs`

- [ ] **Step 1: Add failing tests for evidence not acting like a raw API launcher**

Replace the existing `"V5.2 Evidence Ledger renders a client evidence reader before raw links"` test with:

```js
    test("evidence reader keeps raw endpoints out of ordinary client CTAs", () => {
      const markup = renderToStaticMarkup(
        React.createElement(EvidenceLedgerPage, {
          evidenceLedger: report.evidenceLedger,
        }),
      );

      assert.match(markup, /refractured-evidence-reader/);
      assert.match(markup, /What it supports/);
      assert.match(markup, /Known limits/);
      assert.match(markup, /Source recorded/);
      assert.doesNotMatch(markup, /Raw endpoint/);
      assert.doesNotMatch(markup, />Open raw source</);
      assert.doesNotMatch(markup, />Open source</);
    }),
```

- [ ] **Step 2: Run the component verifier to confirm failure**

Run:

```powershell
npm run verify:refractured-components
```

Expected: FAIL because the current evidence reader still exposes raw source actions.

- [ ] **Step 3: Update `EvidenceReaderCard.jsx`**

In `src/components/refractured-report/EvidenceReaderCard.jsx`, remove:

```js
import { ExternalLink } from "lucide-react";
```

Replace the confidence paragraph with:

```jsx
          <p>
            Treat this as a {item.level ?? item.confidence} input. Indievaders interpretation lives in the report; the
            source record is kept for audit.
          </p>
```

Replace the footer link block with:

```jsx
        {item.href ? <span className="refractured-evidence-source-chip">Source recorded</span> : null}
```

- [ ] **Step 4: Add source chip CSS**

In `src/styles/refractured-report.css`, add this near the existing evidence reader footer styles:

```css
.refractured-evidence-source-chip {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 5px 9px;
  border: 1px solid rgba(124, 211, 190, 0.22);
  border-radius: 6px;
  background: rgba(124, 211, 190, 0.08);
  color: var(--rf-soft);
  font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, ui-monospace, monospace;
  font-size: 0.68rem;
  text-transform: uppercase;
}
```

- [ ] **Step 5: Run the component verifier**

Run:

```powershell
npm run verify:refractured-components
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```powershell
git add scripts/verify-refractured-components.mjs src/components/refractured-report/EvidenceReaderCard.jsx src/styles/refractured-report.css
git commit -m "fix: keep evidence inside client report"
```

## Task 8: Full Verification And Browser QA

**Files:**

- Modify: `docs/project-management/decision-log.md`
- Modify: `docs/project-management/refractured-report-workflow-notes.md`

- [ ] **Step 1: Run full verification**

Run:

```powershell
npm run verify
```

Expected: all report checks, component checks, UI copy checks, landing checks, workspace checks, lint, and Vite build pass.

- [ ] **Step 2: Run whitespace check**

Run:

```powershell
git diff --check
```

Expected: no whitespace errors. Windows LF/CRLF warnings are acceptable when no error lines are shown.

- [ ] **Step 3: Start or reuse local preview**

Use:

```powershell
npm run dev -- --host 127.0.0.1 --port 5176
```

Open:

```text
http://127.0.0.1:5176/#client-report/refractured
```

If port `5176` is occupied by a stale server, use the next free port and state the exact URL in the QA notes.

- [ ] **Step 4: Browser QA desktop**

At a desktop viewport around `1440x900`, verify:

- first screen shows `Refractured Market Quest`;
- first screen does not resemble the old cockpit;
- mission track is visible;
- unlockable tools are visible as locked;
- clicking `Unlock Market Map` unlocks and opens **Market Map**;
- Market Map node clicks change the inspector;
- clicking `Preview Player DNA` unlocks and opens **Player DNA**;
- Player DNA node clicks change rewards/rejects;
- evidence opens as a report drawer and does not navigate to a raw endpoint;
- no horizontal scroll, clipped text, broken layout, or repeated card wall.

- [ ] **Step 5: Browser QA narrow/mobile**

At a narrow viewport around `390x900`, verify:

- mission track stacks without covering the report;
- unlockable tools stack without horizontal scroll;
- Market Map switches from absolute nodes to readable list nodes;
- Player DNA switches from orbit to readable list nodes;
- buttons remain readable and reachable;
- no vertical letter-by-letter text appears.

- [ ] **Step 6: Update workflow notes**

Append to `docs/project-management/refractured-report-workflow-notes.md`:

```markdown
## 2026-06-22 Guided Report Unlock Prototype

The Refractured client route was redirected away from the rejected dashboard
opening and into a guided report prototype.

Verified:

- The report opens with a guided Market Read instead of a market cockpit.
- Unlockable tools are visible from the first screen.
- Market Map and Player DNA are implemented as the first two real unlocked
  modules.
- Evidence stays inside the report as a readable audit layer.
- `npm run verify` passes.

Manual browser QA:

- Desktop route: record pass/fail and the tested URL.
- Narrow route: record pass/fail and the tested URL.
```

- [ ] **Step 7: Update decision log**

Append to `docs/project-management/decision-log.md`:

```markdown
## 2026-06-22: Move Refractured Report To Guided Unlocks

Decision: The Refractured client report now opens as a guided strategic report
with symbolic unlockable tools instead of the V5 market cockpit.

Reason: User review rejected the dashboard/card-wall direction. The paid report
must feel like a premium, interactive experience for game creators: guided at
first, exploratory after context is earned.

Impact:

- `#client-report/refractured` starts with Market Read.
- Market Map and Player DNA are the first unlocked modules.
- Evidence is available on demand instead of exposed as a rail or raw endpoint.
- Future modules should follow the guided chapter pattern before expanding the
  workspace.
```

- [ ] **Step 8: Commit docs and QA notes**

Run:

```powershell
git add docs/project-management/refractured-report-workflow-notes.md docs/project-management/decision-log.md
git commit -m "docs: record guided report unlock qa"
```

## Task 9: Final Review Gate

**Files:**

- Read-only review of all changed files

- [ ] **Step 1: Inspect final diff**

Run:

```powershell
git diff --stat HEAD~8..HEAD
git log --oneline -8
```

Expected: commits show focused steps for model, route, scene, Market Map, Player DNA, visual system, evidence, and docs.

- [ ] **Step 2: Search for rejected patterns**

Run:

```powershell
rg "Market Intelligence Workspace|Insight Layers|At a glance|Raw endpoint|strongest commercial path|unlock potential|strategic opportunity|refractured-comparable-card-grid" src scripts docs
```

Expected: no matches in the new guided opening files or route default. Matches in old legacy components are acceptable only if those components are no longer the default report route.

- [ ] **Step 3: Re-run full verification**

Run:

```powershell
npm run verify
```

Expected: PASS.

- [ ] **Step 4: Prepare final implementation summary**

Summarize:

- what changed for the user;
- exact tested URL;
- desktop and mobile QA result;
- commands run;
- remaining limitations: only Market Map and Player DNA are complete in this sprint; the rest are visible unlockables but not full interactive modules yet.

Do not claim the full product is finished. Claim only the guided prototype pass.

## Self-Review Checklist

Spec coverage:

- Guided report opening: Tasks 2 and 3.
- Symbolic/progressive unlocks: Tasks 2, 4, and 5.
- Universal mission track: Task 1.
- Module names without repeated "Lab": Task 1 and route tests in Task 2.
- First two real modules: Tasks 4 and 5.
- Evidence on demand: Task 7.
- Visual system aligned with landing: Task 6.
- Browser QA: Task 8.
- Copy/narrative guardrails: Task 1 and Task 9.

Placeholder scan:

- The plan contains no placeholder markers or unspecified "add tests" steps.
- Each code-creation step includes concrete file content or exact replacement blocks.
- Each verification step includes a concrete command and expected result.

Type consistency:

- `buildGuidedReportModel(report)` is created in Task 1 and consumed by `GuidedReportExperience`, `MarketMapModule`, and `PlayerDNAModule`.
- `unlockables[].id` values match `unlockedModuleIds` and module ids used in `GuidedReportExperience`.
- `missionTrack[].unlocks` values match existing unlockable ids.
- `marketMap.nodes` and `playerDNA.nodes` both expose `evidenceRefs` for evidence drawer calls.

Execution note:

- Use subagent-driven development for execution unless the user explicitly chooses inline execution.
- Create a fresh worktree for implementation at execution time.
