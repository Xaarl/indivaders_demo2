# Refractured Premium Interactive Report V3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium interactive Refractured client report in the Indievaders prototype, with one primary route and evidence-backed modules instead of a static wall of text and tables.

**Architecture:** The primary client experience is a new private hash route, `#client-report/refractured`, implemented in React with local static data. The existing Data Analytics JSON, Markdown, and HTML report files become backup/evidence surfaces, not the main product. The app reuses the established interactive report patterns where useful, but Refractured gets its own focused components so the sample report does not absorb private client-report concerns.

**Tech Stack:** Vite, React, plain CSS, lucide-react, local static data modules, existing npm verification scripts, browser visual QA.

---

## File Structure

- Create: `src/data/refracturedPremiumReport.js`
  - Owns the static client-report data model for the Refractured V3 route.
  - Exports `refracturedPremiumReport`.
  - Contains modules for thesis, reader lenses, player signals, roguelite directions, comparables, positioning angles, strategic paths, action plan, and evidence.

- Create: `src/components/refractured-report/RefracturedReportPage.jsx`
  - Top-level page state, active lens selection, evidence drawer state, and module routing.

- Create: `src/components/refractured-report/RefracturedReportFrame.jsx`
  - Private report shell: topbar, route metadata, section navigation, source log button, and return link.

- Create: `src/components/refractured-report/OpeningThesis.jsx`
  - Above-the-fold thesis, commercial read, current proof question, and entry actions.

- Create: `src/components/refractured-report/LensHub.jsx`
  - Clickable lens chooser that replaces a linear report table of contents.

- Create: `src/components/refractured-report/PlayerSignalInspector.jsx`
  - Player DNA module: rewards, punishments, proof signals, and evidence access.

- Create: `src/components/refractured-report/RogueliteLoopLab.jsx`
  - Interactive roguelite direction selector for combat mutation, route pressure, and nightmare ritual.

- Create: `src/components/refractured-report/ComparableExplorer.jsx`
  - Filterable game-reference explorer focused on what to borrow, avoid, and validate.

- Create: `src/components/refractured-report/SteamPositioningBuilder.jsx`
  - Interactive Steam promise, tag, capsule, trailer, demo CTA, and creator pitch module.

- Create: `src/components/refractured-report/StrategicPathSelector.jsx`
  - Conditional path selector for Proof Sprint, Content Expansion, and Mastery Platform.

- Create: `src/components/refractured-report/ActionPlanTimeline.jsx`
  - Visual 0-30 / 30-90 / 3-12 month action plan.

- Create: `src/components/refractured-report/RefracturedEvidenceDrawer.jsx`
  - Evidence drawer and appendix view for confidence labels, source links, unknowns, and archived v2 data references.

- Create: `src/styles/refractured-report.css`
  - V3 visual system for the private premium report route.

- Create: `scripts/verify-refractured-report.mjs`
  - Static data and copy guardrail for the V3 report.

- Modify: `package.json`
  - Add `verify:refractured-report`.
  - Include it in `npm run verify`.

- Modify: `src/App.jsx`
  - Add hash route support for `#client-report/refractured`.

- Modify: `src/main.jsx`
  - Import `src/styles/refractured-report.css`.

- Modify: `docs/client-reports/refractured-steam-positioning-readiness.html`
  - Convert from primary report surface to static backup mirror.
  - The first screen should state that the primary client experience is the interactive route.

- Modify: `docs/client-reports/refractured-steam-positioning-readiness.md`
  - Convert from primary narrative report to editorial backup and source notes.

- Rename or keep with clear status: `docs/client-reports/refractured-report-v2-artifact.json`
  - Keep as evidence archive snapshot. Do not present it as the primary report.

- Modify: `docs/project-management/refractured-report-workflow-notes.md`
  - Record the V3 correction from artifact-first to product-experience-first.

- Modify: `docs/project-management/decision-log.md`
  - Add the V3 product decision.

## Implementation Rules

- Do not revert existing uncommitted v2 report changes. Treat them as material to archive, rewrite, or mirror intentionally.
- Keep public UI in English.
- Keep this as a frontend prototype. Do not add backend, auth, payment, public sharing, live Steam scraping, or account logic.
- Keep all Refractured-specific client-report code behind the private route. Do not add it to landing CTAs.
- Do not copy raw private Refractured assets or project files into Indievaders.
- Avoid top-level tables and matrix-heavy sections in the primary route.
- Every major recommendation must expose evidence through the drawer or appendix.

---

### Task 1: Add V3 Data Guardrail

**Files:**
- Create: `scripts/verify-refractured-report.mjs`

- [ ] **Step 1: Create the failing V3 verifier**

Use `apply_patch` to create `scripts/verify-refractured-report.mjs`:

```js
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

if (!refracturedPremiumReport.thesis?.headline || refracturedPremiumReport.thesis.headline.length < 30) {
  fail("thesis.headline must contain a specific commercial thesis");
}

for (const [key, minimum] of REQUIRED_TOP_LEVEL_ARRAYS) {
  const value = refracturedPremiumReport[key];
  if (!Array.isArray(value) || value.length < minimum) {
    fail(`${key} must contain at least ${minimum} items`);
  }
}

const evidenceIds = new Set(refracturedPremiumReport.evidence.map((source) => source.id));
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
```

- [ ] **Step 2: Run the verifier and confirm it fails because data does not exist yet**

Run:

```powershell
node scripts/verify-refractured-report.mjs
```

Expected: FAIL with a module-not-found error for `src/data/refracturedPremiumReport.js`.

- [ ] **Step 3: Keep the verifier unstaged until Task 2 passes**

Do not add this verifier to `npm run verify` yet. The script is intentionally failing until the data module exists, so committing it with package verification enabled would leave the branch in a broken intermediate state.

---

### Task 2: Create The Refractured V3 Data Model

**Files:**
- Create: `src/data/refracturedPremiumReport.js`
- Modify: `package.json`

- [ ] **Step 1: Add the static report data module**

Use `apply_patch` to create `src/data/refracturedPremiumReport.js` with this shape:

```js
export const refracturedPremiumReport = {
  meta: {
    id: "refractured-premium-interactive-v3",
    title: "Refractured Commercial Strategy Report",
    projectName: "Refractured",
    stage: "Private pre-Steam validation case",
    surface: "interactive-client-report",
    primaryRoute: "#client-report/refractured",
    backupSurfaces: [
      "docs/client-reports/refractured-steam-positioning-readiness.html",
      "docs/client-reports/refractured-steam-positioning-readiness.md",
      "docs/client-reports/refractured-report-v2-artifact.json",
    ],
    updatedAt: "2026-06-20",
  },
  thesis: {
    label: "Commercial thesis",
    headline:
      "Refractured should sell the feeling of surviving a brutal retry loop, not the label of a 2.5D brawler.",
    body:
      "The strongest lane is a combat-first action roguelite where readable violence, fast restart, and ritual choices make every run feel earned. The risk is not that the niche is too small; the risk is reaching Steam with weak contact feel, generic roguelite upgrades, or a trailer that looks like another dark brawler.",
    proofQuestion:
      "Can target players understand the hook in under 45 seconds, enjoy the first fight, and want a second run before they are promised a bigger game?",
    evidenceRefs: ["local-premise", "steamdb-discovery", "next-fest-pressure"],
  },
  readerLenses: [
    {
      id: "sellability",
      label: "Can this sell?",
      title: "The commercial lane is viable if the demo proves feel before scope.",
      summary:
        "Beat-em-up is a loyal but unforgiving lane; roguelite adds replay language, but only if choices change behavior.",
      section: "overview",
      evidenceRefs: ["local-premise", "indie-saturation"],
    },
    {
      id: "player",
      label: "Who is the player?",
      title: "The target player rewards fair brutality and rejects fake depth.",
      summary:
        "This player wants heavy contact, readable pressure, quick retry, and build decisions that change how they fight.",
      section: "player",
      evidenceRefs: ["beat-em-up-expectations", "roguelite-expectations"],
    },
    {
      id: "roguelite",
      label: "What should the run prove?",
      title: "The roguelite layer must create second-run desire, not decorate combat.",
      summary:
        "The first proof should show one tactical choice changing how the player handles danger.",
      section: "roguelite",
      evidenceRefs: ["local-premise", "dead-cells-loop"],
    },
    {
      id: "comparables",
      label: "What is comparable?",
      title: "Use references as lessons, not forecasts.",
      summary:
        "Absolum, Rotwood, Dead Cells, Hades II, Ravenswatch, and Curse of the Dead Gods teach different risks.",
      section: "comparables",
      evidenceRefs: ["absolum-steam", "rotwood-steam"],
    },
    {
      id: "steam",
      label: "How should Steam open?",
      title: "The first five seconds must show threat, read, punish, and changed next run.",
      summary:
        "The page should sell a playable fantasy before it lists systems.",
      section: "steam",
      evidenceRefs: ["steamworks-coming-soon", "steamworks-utm"],
    },
    {
      id: "paths",
      label: "Which path is earned?",
      title: "Path selection should depend on proof signals, not ambition alone.",
      summary:
        "Proof Sprint comes first; Content Expansion and Mastery Platform require evidence.",
      section: "paths",
      evidenceRefs: ["pre-release-experimentation", "local-premise"],
    },
    {
      id: "evidence",
      label: "What supports this?",
      title: "Evidence is available on demand without taking over the report.",
      summary:
        "Each recommendation exposes source level, uncertainty, and remaining gap.",
      section: "evidence",
      evidenceRefs: ["v2-artifact-archive", "steam-review-api-gap"],
    },
  ],
  playerSignals: [
    {
      id: "beat-em-up-loyalist",
      title: "Beat-em-up loyalist",
      rewards: ["heavy impact", "readable depth collision", "enemy-wave rhythm", "fair contact"],
      rejects: ["floaty hits", "cheap damage", "unclear z-axis contact", "samey enemy pressure"],
      proofSignal: "Players describe hits as heavy and fair without being prompted.",
      evidenceRefs: ["beat-em-up-expectations"],
    },
    {
      id: "action-roguelite-optimizer",
      title: "Action roguelite optimizer",
      rewards: ["fast retry", "behavior-changing builds", "fair RNG", "mastery across runs"],
      rejects: ["flat stat soup", "grind masking weak combat", "unreadable deaths", "slow restart"],
      proofSignal: "Players start a second run or ask how the next run can differ.",
      evidenceRefs: ["dead-cells-loop", "roguelite-expectations"],
    },
    {
      id: "dark-action-mood-buyer",
      title: "Dark-action mood buyer",
      rewards: ["brutal tone", "ritual identity", "violent audiovisual consequence", "memorable enemies"],
      rejects: ["generic dark fantasy", "gore without mechanics", "muddy silhouettes", "style without play meaning"],
      proofSignal: "Viewers remember the nightmare ritual identity after the first clip.",
      evidenceRefs: ["local-premise"],
    },
    {
      id: "creator-viewer",
      title: "Creator and viewer",
      rewards: ["clear reversal", "visible perfect read", "punishing hit", "surprising build change"],
      rejects: ["slow setup", "menu-heavy proof", "unclear stakes", "non-visual progression"],
      proofSignal: "A short clip communicates threat, read, punish, and the reason to retry.",
      evidenceRefs: ["next-fest-pressure"],
    },
  ],
  rogueliteDirections: [
    {
      id: "combat-mutation",
      label: "Combat Mutation",
      promise: "Run choices alter parry, stagger, bleed, overkill, spacing, or enemy manipulation.",
      bestFor: "Proving that roguelite choices change how the player fights.",
      risk: "Flat modifiers create fake roguelite perception.",
      proof: "Players can explain the tactical difference after one run.",
      evidenceRefs: ["local-premise", "dead-cells-loop"],
    },
    {
      id: "route-pressure",
      label: "Route Pressure",
      promise: "Short room chains turn fatigue, resources, and enemy-role combinations into decisions.",
      bestFor: "Testing replay desire without needing a large content map.",
      risk: "Rooms feel repetitive if enemy roles are shallow.",
      proof: "Players ask for another route after the core loop works.",
      evidenceRefs: ["curse-steam", "ravenswatch-steam"],
    },
    {
      id: "nightmare-ritual",
      label: "Nightmare Ritual",
      promise: "Meta consequences and rituals create identity without hiding weak moment-to-moment combat.",
      bestFor: "Differentiating the dark fantasy from generic roguelite language.",
      risk: "Meta progression becomes grind if the fight is not fun without it.",
      proof: "Players recall the ritual identity and still judge combat as the reason to return.",
      evidenceRefs: ["local-premise", "hades-steam"],
    },
  ],
  comparables: [
    {
      id: "absolum",
      title: "Absolum",
      role: "Closest market lane",
      filterTags: ["Closest market lane", "Marketing clarity example"],
      insight: "Useful for showing that beat-em-up plus roguelite can be legible when the page makes the hybrid obvious.",
      borrow: "Hybrid framing, demo logic, impact readability.",
      avoid: "Assuming comparable production scale or content expectations.",
      evidenceRefs: ["absolum-steam"],
    },
    {
      id: "rotwood",
      title: "Rotwood",
      role: "Audience expectation warning",
      filterTags: ["Useful mechanic lesson", "Audience expectation warning"],
      insight: "Shows how combat mastery and progression can attract players while recent sentiment can expose content and pacing pressure.",
      borrow: "Combat learning, gear/build progression language.",
      avoid: "Blurred solo/co-op expectation if Refractured is solo-first.",
      evidenceRefs: ["rotwood-steam"],
    },
    {
      id: "dead-cells",
      title: "Dead Cells",
      role: "Loop clarity benchmark",
      filterTags: ["Marketing clarity example", "Not safe as a benchmark"],
      insight: "Useful for loop language and retry clarity, unsafe as a content-depth comparison.",
      borrow: "Short, memorable loop promise and fast retry expectation.",
      avoid: "Direct scale comparison before Refractured earns long-tail depth.",
      evidenceRefs: ["dead-cells-loop"],
    },
    {
      id: "hades-ii",
      title: "Hades II",
      role: "Expectation ceiling",
      filterTags: ["Audience expectation warning", "Not safe as a benchmark"],
      insight: "Sets the polish and replay expectation ceiling for action roguelite players.",
      borrow: "Clarity of repeatable fantasy and run identity.",
      avoid: "Hades-like positioning without narrative, content, and polish proof.",
      evidenceRefs: ["hades-steam"],
    },
    {
      id: "ravenswatch",
      title: "Ravenswatch",
      role: "Route and hero variety lesson",
      filterTags: ["Useful mechanic lesson", "Scope trap"],
      insight: "Useful for replayability, hero variety, and co-op expectation pressure.",
      borrow: "Visible run variety and clear character/build identity.",
      avoid: "Co-op-first assumptions if Refractured is selling solo brutality.",
      evidenceRefs: ["ravenswatch-steam"],
    },
    {
      id: "curse-of-the-dead-gods",
      title: "Curse of the Dead Gods",
      role: "Dark mechanical identity",
      filterTags: ["Useful mechanic lesson", "Audience expectation warning"],
      insight: "Useful for fair danger, curses, relics, and dark run identity.",
      borrow: "Danger that feels systematic instead of arbitrary.",
      avoid: "Run friction or repetition without strong combat payoffs.",
      evidenceRefs: ["curse-steam"],
    },
  ],
  positioningAngles: [
    {
      id: "brutal-retry-loop",
      label: "Brutal retry loop",
      steamPromise: "Survive a brutal 2.5D action roguelite where every death teaches the next ritual.",
      trailerBeats: ["threat enters", "player reads tell", "violent punish lands", "ritual choice changes next run"],
      tagStack: ["Action Roguelite", "Beat 'em up", "Dark Fantasy", "Action", "Difficult"],
      demoCta: "Play the first nightmare loop and see if your second run changes how you fight.",
      creatorPitch: "A dark rogue-em-up built around readable violence, quick retry, and ritual combat mutations.",
      evidenceRefs: ["local-premise", "steamworks-coming-soon"],
    },
    {
      id: "mastery-under-pressure",
      label: "Mastery under pressure",
      steamPromise: "Read the crowd, control the space, and turn punishment into mastery across repeat runs.",
      trailerBeats: ["crowd pressure", "near failure", "perfect counter", "new build route"],
      tagStack: ["Action Roguelite", "Character Action", "Beat 'em up", "Difficult", "Singleplayer"],
      demoCta: "Test whether you can master the first arena before the nightmare mutates.",
      creatorPitch: "A combat-first roguelite for players who want fair brutality rather than stat grinding.",
      evidenceRefs: ["beat-em-up-expectations", "roguelite-expectations"],
    },
    {
      id: "nightmare-ritual",
      label: "Nightmare ritual",
      steamPromise: "Enter a violent ritual loop where each run reshapes how your fighter survives the nightmare.",
      trailerBeats: ["ritual visual", "combat consequence", "death or escape", "changed rule on retry"],
      tagStack: ["Action Roguelite", "Dark Fantasy", "Hack and Slash", "Beat 'em up", "Atmospheric"],
      demoCta: "Try the first ritual and decide which violence you carry into the next run.",
      creatorPitch: "A brutal dark-action roguelite where progression is felt through combat consequences.",
      evidenceRefs: ["local-premise", "hades-steam"],
    },
  ],
  strategicPaths: [
    {
      id: "proof-sprint",
      label: "Proof Sprint",
      when: "Use before a public Steam page, trailer, or larger content promise.",
      buys: "Fast evidence on hook comprehension, combat feel, and second-run desire.",
      risks: "Can look small if the first fight is not dense and replayable.",
      passSignal: "Target players understand the hook, rate combat feel strongly, and want another run.",
      evidenceRefs: ["pre-release-experimentation", "local-premise"],
    },
    {
      id: "content-expansion",
      label: "Content Expansion",
      when: "Use only after players ask for more enemies, routes, weapons, and run variety.",
      buys: "Supports higher price expectations and broader retention if content density is real.",
      risks: "Expands production burden before the core loop is proven.",
      passSignal: "Positive players request breadth after they already enjoy the core loop.",
      evidenceRefs: ["rotwood-steam", "ravenswatch-steam"],
    },
    {
      id: "mastery-platform",
      label: "Mastery Platform",
      when: "Use only if combat mastery becomes the return reason and funding supports depth.",
      buys: "Creates a stronger long-tail identity for expert action players.",
      risks: "Highest proof burden; weak feel or unreadable pressure will be exposed immediately.",
      passSignal: "Players return for skill expression, not only unlocks or content curiosity.",
      evidenceRefs: ["hades-steam", "dead-cells-loop"],
    },
  ],
  actionPlan: [
    {
      id: "hook-test",
      period: "0-30 days",
      title: "Run a 45-second hook comprehension test",
      outcome: "Know whether players understand the fantasy before systems are explained.",
      artifact: "Short gameplay clip with one threat, read, punish, and retry implication.",
      signal: "70% of target viewers describe the intended brutal action roguelite promise.",
      evidenceRefs: ["steamworks-coming-soon"],
    },
    {
      id: "feel-test",
      period: "0-30 days",
      title: "Polish one fight until contact feels sellable",
      outcome: "Block the biggest negative-review risk before content expansion.",
      artifact: "One capture-ready arena with tuned impact, camera, enemy tells, and restart.",
      signal: "Combat feel score reaches 4/5 with low unclear-damage complaints.",
      evidenceRefs: ["beat-em-up-expectations"],
    },
    {
      id: "micro-run",
      period: "30-90 days",
      title: "Build a three-room micro-run",
      outcome: "Prove second-run desire with controlled scope.",
      artifact: "Three connected encounters with one meaningful ritual choice.",
      signal: "50% of qualified players voluntarily retry or ask what changes next.",
      evidenceRefs: ["pre-release-experimentation", "dead-cells-loop"],
    },
    {
      id: "choice-recall",
      period: "30-90 days",
      title: "Test whether ritual choices change behavior",
      outcome: "Separate real roguelite fit from flat stat progression.",
      artifact: "Eight to twelve run-local choices affecting combat behavior.",
      signal: "Players can name how a choice changed tactics after one run.",
      evidenceRefs: ["roguelite-expectations"],
    },
    {
      id: "steam-page-test",
      period: "30-90 days",
      title: "A/B test Steam page promise and trailer opening",
      outcome: "Find the language that makes the game legible without overpromising scope.",
      artifact: "Three promise variants, tag stacks, and opening trailer beat lists.",
      signal: "Target viewers pick the intended fantasy and state wishlist intent.",
      evidenceRefs: ["steamworks-utm", "next-fest-pressure"],
    },
    {
      id: "scale-decision",
      period: "3-12 months",
      title: "Choose scale only after proof gates pass",
      outcome: "Avoid spending years on a larger version before demand is visible.",
      artifact: "Path decision: stay Proof Sprint, move Content Expansion, or seek Mastery Platform funding.",
      signal: "Path trigger is backed by player behavior, not ambition alone.",
      evidenceRefs: ["pre-release-experimentation", "v2-artifact-archive"],
    },
  ],
  evidence: [
    {
      id: "local-premise",
      label: "Local Refractured premise docs",
      level: "confirmed",
      source: "Read-only local project documentation",
      href: null,
      matters: "Confirms Refractured as a combat-first action roguelite premise.",
      unknown: "Public store positioning does not exist yet.",
    },
    {
      id: "steamdb-discovery",
      label: "SteamDB discovery surfaces",
      level: "reported",
      source: "SteamDB public pages",
      href: "https://steamdb.info/",
      matters: "Shows current Steam discovery pressure, popular releases, tags, and event context.",
      unknown: "SteamDB is not a sales oracle and is not affiliated with Valve.",
    },
    {
      id: "next-fest-pressure",
      label: "Steam Next Fest discovery pressure",
      level: "reported",
      source: "SteamDB and public market coverage",
      href: "https://steamdb.info/",
      matters: "Supports the need for an immediately legible demo hook.",
      unknown: "Exact future Next Fest cohort competition is not known before submission.",
    },
    {
      id: "indie-saturation",
      label: "Steam indie saturation reporting",
      level: "reported",
      source: "Public games market reporting",
      href: "https://www.gamesradar.com/games/a-terrifying-20-282-games-were-released-on-steam-in-2025-and-just-608-managed-to-get-1-000-reviews-expert-finds-we-might-be-in-a-bit-of-an-indie-golden-age/",
      matters: "Frames why clear positioning matters for small teams.",
      unknown: "Genre-specific success rates need dedicated paid-source validation.",
    },
    {
      id: "beat-em-up-expectations",
      label: "Beat-em-up player expectation synthesis",
      level: "inferred",
      source: "Comparable public reviews and Steam positioning signals",
      href: null,
      matters: "Supports focus on contact feel, readability, and fairness.",
      unknown: "Logged-in community listening is still required for stronger confidence.",
    },
    {
      id: "roguelite-expectations",
      label: "Action roguelite player expectation synthesis",
      level: "inferred",
      source: "Comparable public reviews and Steam positioning signals",
      href: null,
      matters: "Supports focus on retry speed, build behavior, and fair failure.",
      unknown: "Steam review API sampling remains a desired upgrade.",
    },
    {
      id: "absolum-steam",
      label: "Absolum Steam page",
      level: "confirmed",
      source: "Steam store",
      href: "https://store.steampowered.com/",
      matters: "Closest hybrid-lane reference for beat-em-up plus roguelite framing.",
      unknown: "Production budget and marketing spend are not confirmed here.",
    },
    {
      id: "rotwood-steam",
      label: "Rotwood Steam page",
      level: "confirmed",
      source: "Steam store",
      href: "https://store.steampowered.com/",
      matters: "Useful for combat progression and content-pacing expectation risk.",
      unknown: "Recent sentiment must be rechecked at implementation time.",
    },
    {
      id: "dead-cells-loop",
      label: "Dead Cells public loop positioning",
      level: "confirmed",
      source: "Steam and official/public pages",
      href: "https://store.steampowered.com/",
      matters: "Useful for clear retry-loop promise and long-running roguelite expectations.",
      unknown: "Not safe as a scale benchmark for Refractured.",
    },
    {
      id: "hades-steam",
      label: "Hades II Steam page",
      level: "confirmed",
      source: "Steam store",
      href: "https://store.steampowered.com/",
      matters: "Expectation ceiling for polish, replayability, and genre literacy.",
      unknown: "Unsafe as direct content or production benchmark.",
    },
    {
      id: "ravenswatch-steam",
      label: "Ravenswatch Steam page",
      level: "confirmed",
      source: "Steam store",
      href: "https://store.steampowered.com/",
      matters: "Useful for run variety, hero identity, and co-op expectation risks.",
      unknown: "Solo-first transferability must be validated.",
    },
    {
      id: "curse-steam",
      label: "Curse of the Dead Gods Steam page",
      level: "confirmed",
      source: "Steam store",
      href: "https://store.steampowered.com/",
      matters: "Useful for dark mechanical identity and fair danger.",
      unknown: "Player complaints need deeper review mining.",
    },
    {
      id: "steamworks-coming-soon",
      label: "Steamworks coming soon and store guidance",
      level: "confirmed",
      source: "Steamworks documentation",
      href: "https://partner.steamgames.com/doc/store/coming_soon",
      matters: "Supports store-page and pre-release readiness framing.",
      unknown: "Exact Refractured traffic behavior does not exist yet.",
    },
    {
      id: "steamworks-utm",
      label: "Steamworks UTM Analytics",
      level: "confirmed",
      source: "Steamworks documentation",
      href: "https://partner.steamgames.com/doc/marketing/utm_analytics",
      matters: "Supports later campaign attribution once a Steam page exists.",
      unknown: "No Refractured Steam UTM data exists yet.",
    },
    {
      id: "pre-release-experimentation",
      label: "Pre-release experimentation in indie game development",
      level: "reported",
      source: "Public research paper",
      href: "https://arxiv.org/abs/2411.17183",
      matters: "Supports qualitative playtest and proof-gate framing for early indie teams.",
      unknown: "Paper findings are general and must be adapted to Refractured.",
    },
    {
      id: "v2-artifact-archive",
      label: "Refractured v2 artifact snapshot",
      level: "inferred",
      source: "docs/client-reports/refractured-report-v2-artifact.json",
      href: null,
      matters: "Preserves prior research structure while removing it from the primary client surface.",
      unknown: "V2 should not be treated as the final client experience.",
    },
    {
      id: "steam-review-api-gap",
      label: "Steam review API sampling gap",
      level: "not publicly confirmed",
      source: "Local tooling limitation from v2 pass",
      href: null,
      matters: "Marks missing deeper review mining instead of pretending it was completed.",
      unknown: "Review API and Reddit/Discord listening need a later dedicated pass.",
    },
  ],
};

export default refracturedPremiumReport;
```

- [ ] **Step 2: Run the V3 verifier directly**

Run:

```powershell
node scripts/verify-refractured-report.mjs
```

Expected: PASS with `Refractured report check passed`.

- [ ] **Step 3: Wire the verifier into npm scripts**

Modify `package.json` so the scripts block contains:

```json
"verify": "npm run verify:report && npm run verify:refractured-report && npm run verify:ui-copy && npm run verify:product-ladder && npm run verify:landing-focus && npm run verify:workspace && npm run lint && npm run build",
"verify:refractured-report": "node scripts/verify-refractured-report.mjs"
```

Keep the existing script names and ordering around the inserted verifier.

- [ ] **Step 4: Run the npm verifier**

Run:

```powershell
npm run verify:refractured-report
```

Expected: PASS with `Refractured report check passed`.

- [ ] **Step 5: Commit the verifier and data model together**

Run:

```powershell
git add package.json scripts/verify-refractured-report.mjs src/data/refracturedPremiumReport.js
git commit -m "feat: add refractured report data"
```

Expected: commit succeeds. If Git author identity is missing, use the existing local convention:

```powershell
git -c user.name=Codex -c user.email=codex@local commit -m "feat: add refractured report data"
```

---

### Task 3: Add The Private Report Route And Page Shell

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/main.jsx`
- Create: `src/components/refractured-report/RefracturedReportPage.jsx`
- Create: `src/components/refractured-report/RefracturedReportFrame.jsx`
- Create: `src/styles/refractured-report.css`

- [ ] **Step 1: Add the route import**

Modify `src/App.jsx` imports:

```jsx
import RefracturedReportPage from './components/refractured-report/RefracturedReportPage.jsx';
```

- [ ] **Step 2: Add hash parsing for the private client report**

In `getRouteFromHash()`, add this block before the landing fallback:

```jsx
  if (window.location.hash === '#client-report/refractured') {
    return { name: 'refractured-report' };
  }
```

- [ ] **Step 3: Render the private report page**

In `App()`, add this block before the landing return:

```jsx
  if (route.name === 'refractured-report') {
    return <RefracturedReportPage />;
  }
```

- [ ] **Step 4: Import the V3 stylesheet**

Modify `src/main.jsx`:

```jsx
import './styles/refractured-report.css';
```

- [ ] **Step 5: Create the report frame component**

Use `apply_patch` to create `src/components/refractured-report/RefracturedReportFrame.jsx`:

```jsx
import { ArrowLeft, Database } from "lucide-react";

function RefracturedReportFrame({ activeSection, children, onSectionChange, onSourceDrawerOpen, report, sections }) {
  return (
    <main className="refractured-report-shell">
      <header className="refractured-topbar">
        <a className="refractured-back-link" href="#">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to Indievaders
        </a>
        <div className="refractured-topbar-meta">
          <span>{report.meta.stage}</span>
          <strong>{report.meta.title}</strong>
        </div>
        <button className="refractured-source-button" type="button" onClick={() => onSourceDrawerOpen()}>
          <Database size={17} aria-hidden="true" />
          Evidence
        </button>
      </header>

      <nav className="refractured-section-nav" aria-label="Refractured report sections">
        {sections.map((section) => (
          <button
            className={section.id === activeSection ? "is-active" : ""}
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {children}
    </main>
  );
}

export default RefracturedReportFrame;
```

- [ ] **Step 6: Create the page shell**

Use `apply_patch` to create `src/components/refractured-report/RefracturedReportPage.jsx`:

```jsx
import { useState } from "react";
import refracturedPremiumReport from "../../data/refracturedPremiumReport.js";
import RefracturedReportFrame from "./RefracturedReportFrame.jsx";

const sections = [
  { id: "overview", label: "Thesis" },
  { id: "player", label: "Player DNA" },
  { id: "roguelite", label: "Roguelite loop" },
  { id: "comparables", label: "Comparables" },
  { id: "steam", label: "Steam page" },
  { id: "paths", label: "Paths" },
  { id: "actions", label: "Plan" },
  { id: "evidence", label: "Evidence" },
];

function RefracturedReportPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeEvidenceRefs, setActiveEvidenceRefs] = useState(null);

  function openEvidenceDrawer(refs = null) {
    setActiveEvidenceRefs(refs ?? refracturedPremiumReport.evidence.map((source) => source.id));
    setActiveSection((current) => (current === "evidence" ? current : current));
  }

  return (
    <RefracturedReportFrame
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSourceDrawerOpen={openEvidenceDrawer}
      report={refracturedPremiumReport}
      sections={sections}
    >
      <section className="refractured-module">
        <p className="refractured-kicker">Private interactive report</p>
        <h1>{refracturedPremiumReport.thesis.headline}</h1>
        <p>{refracturedPremiumReport.thesis.body}</p>
        <p className="refractured-proof-question">{refracturedPremiumReport.thesis.proofQuestion}</p>
      </section>
      <section className="refractured-module">
        <p className="refractured-kicker">Implementation checkpoint</p>
        <h2>Route is wired. Interactive modules land in the next tasks.</h2>
      </section>
    </RefracturedReportFrame>
  );
}

export default RefracturedReportPage;
```

- [ ] **Step 7: Add minimal route CSS**

Use `apply_patch` to create `src/styles/refractured-report.css`:

```css
.refractured-report-shell {
  min-height: 100vh;
  padding: 24px clamp(18px, 4vw, 72px) 72px;
  background: #07090d;
  color: #f7f3ea;
}

.refractured-topbar,
.refractured-section-nav,
.refractured-module {
  width: min(1480px, 100%);
  margin-inline: auto;
}

.refractured-topbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
  min-height: 58px;
}

.refractured-back-link,
.refractured-source-button,
.refractured-section-nav button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid rgba(233, 197, 124, 0.28);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #f7f3ea;
  cursor: pointer;
  font-weight: 800;
  text-decoration: none;
}

.refractured-source-button {
  justify-self: end;
}

.refractured-topbar-meta {
  display: grid;
  gap: 4px;
  text-align: center;
}

.refractured-topbar-meta span,
.refractured-kicker {
  color: #e9c57c;
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.refractured-section-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 0;
  margin-top: 18px;
  background: rgba(7, 9, 13, 0.92);
  backdrop-filter: blur(14px);
}

.refractured-section-nav button {
  color: rgba(247, 243, 234, 0.72);
}

.refractured-section-nav button.is-active {
  border-color: rgba(233, 197, 124, 0.72);
  background: rgba(233, 197, 124, 0.14);
  color: #fff7df;
}

.refractured-module {
  padding-top: clamp(34px, 6vw, 86px);
}

.refractured-module h1 {
  max-width: 1040px;
  margin: 0;
  font-size: clamp(2.7rem, 6.2vw, 7rem);
  line-height: 0.94;
  letter-spacing: 0;
}

.refractured-module h2 {
  max-width: 860px;
  margin: 0;
  font-size: clamp(1.8rem, 3.4vw, 4rem);
  line-height: 1;
}

.refractured-module p:not(.refractured-kicker) {
  max-width: 780px;
  color: rgba(247, 243, 234, 0.76);
  font-size: clamp(1rem, 1.15vw, 1.18rem);
  line-height: 1.58;
}

.refractured-proof-question {
  padding: 18px 20px;
  border-left: 3px solid #e9c57c;
  background: rgba(233, 197, 124, 0.08);
}

@media (max-width: 760px) {
  .refractured-topbar {
    grid-template-columns: 1fr;
  }

  .refractured-topbar-meta {
    text-align: left;
  }

  .refractured-source-button {
    justify-self: start;
  }
}
```

- [ ] **Step 8: Verify the route builds**

Run:

```powershell
npm run verify:refractured-report
npm run lint
npm run build
```

Expected: all pass.

- [ ] **Step 9: Commit the route shell**

Run:

```powershell
git add src/App.jsx src/main.jsx src/components/refractured-report src/styles/refractured-report.css
git commit -m "feat: add refractured report route"
```

Expected: commit succeeds.

---

### Task 4: Build The Opening Thesis And Lens Hub

**Files:**
- Modify: `src/components/refractured-report/RefracturedReportPage.jsx`
- Create: `src/components/refractured-report/OpeningThesis.jsx`
- Create: `src/components/refractured-report/LensHub.jsx`

- [ ] **Step 1: Create `OpeningThesis`**

Use `apply_patch` to create `src/components/refractured-report/OpeningThesis.jsx`:

```jsx
import { ArrowRight, Database, Play } from "lucide-react";

function OpeningThesis({ onEvidenceOpen, onSectionChange, report }) {
  return (
    <section className="refractured-opening">
      <div className="refractured-opening-copy">
        <p className="refractured-kicker">{report.thesis.label}</p>
        <h1>{report.thesis.headline}</h1>
        <p>{report.thesis.body}</p>
        <div className="refractured-opening-actions">
          <button type="button" onClick={() => onSectionChange("steam")}>
            <Play size={18} aria-hidden="true" />
            Test Steam promise
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onEvidenceOpen(report.thesis.evidenceRefs)}>
            <Database size={18} aria-hidden="true" />
            Evidence behind thesis
          </button>
        </div>
      </div>
      <aside className="refractured-proof-card">
        <span>Proof question</span>
        <strong>{report.thesis.proofQuestion}</strong>
      </aside>
    </section>
  );
}

export default OpeningThesis;
```

- [ ] **Step 2: Create `LensHub`**

Use `apply_patch` to create `src/components/refractured-report/LensHub.jsx`:

```jsx
import { ArrowRight } from "lucide-react";

function LensHub({ lenses, onSectionChange }) {
  return (
    <section className="refractured-lens-hub" aria-label="Choose report lens">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Choose your lens</p>
        <h2>Open the part of the report that answers your current decision.</h2>
      </div>
      <div className="refractured-lens-grid">
        {lenses.map((lens) => (
          <button key={lens.id} type="button" onClick={() => onSectionChange(lens.section)}>
            <span>{lens.label}</span>
            <strong>{lens.title}</strong>
            <p>{lens.summary}</p>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

export default LensHub;
```

- [ ] **Step 3: Wire the overview module**

Modify `RefracturedReportPage.jsx` imports:

```jsx
import LensHub from "./LensHub.jsx";
import OpeningThesis from "./OpeningThesis.jsx";
```

Replace the temporary route checkpoint sections with:

```jsx
      {activeSection === "overview" ? (
        <>
          <OpeningThesis
            onEvidenceOpen={openEvidenceDrawer}
            onSectionChange={setActiveSection}
            report={refracturedPremiumReport}
          />
          <LensHub lenses={refracturedPremiumReport.readerLenses} onSectionChange={setActiveSection} />
        </>
      ) : null}
```

- [ ] **Step 4: Add overview CSS**

Append to `src/styles/refractured-report.css`:

```css
.refractured-opening,
.refractured-lens-hub {
  width: min(1480px, 100%);
  margin-inline: auto;
}

.refractured-opening {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  gap: clamp(28px, 6vw, 88px);
  align-items: end;
  padding-top: clamp(44px, 7vw, 102px);
}

.refractured-opening-copy h1 {
  max-width: 1080px;
  margin: 0;
  font-size: clamp(2.8rem, 6.5vw, 7.2rem);
  line-height: 0.92;
  letter-spacing: 0;
}

.refractured-opening-copy p:not(.refractured-kicker),
.refractured-section-heading p:not(.refractured-kicker) {
  max-width: 780px;
  color: rgba(247, 243, 234, 0.76);
  font-size: clamp(1rem, 1.15vw, 1.18rem);
  line-height: 1.58;
}

.refractured-opening-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.refractured-opening-actions button,
.refractured-lens-grid button {
  border: 1px solid rgba(233, 197, 124, 0.28);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #f7f3ea;
  cursor: pointer;
}

.refractured-opening-actions button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 10px 14px;
  font-weight: 900;
}

.refractured-proof-card {
  display: grid;
  gap: 12px;
  padding: 24px;
  border: 1px solid rgba(233, 197, 124, 0.26);
  border-radius: 8px;
  background: linear-gradient(145deg, rgba(233, 197, 124, 0.14), rgba(255, 255, 255, 0.05));
}

.refractured-proof-card span,
.refractured-lens-grid span {
  color: #e9c57c;
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.refractured-proof-card strong {
  color: #fff7df;
  font-size: 1.3rem;
  line-height: 1.25;
}

.refractured-lens-hub {
  padding-top: clamp(42px, 6vw, 86px);
}

.refractured-section-heading h2 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(2rem, 3.8vw, 4.4rem);
  line-height: 0.98;
}

.refractured-lens-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;
}

.refractured-lens-grid button {
  display: grid;
  gap: 10px;
  min-height: 220px;
  padding: 20px;
  text-align: left;
}

.refractured-lens-grid strong {
  color: #fff7df;
  font-size: 1.18rem;
  line-height: 1.2;
}

.refractured-lens-grid p {
  margin: 0;
  color: rgba(247, 243, 234, 0.68);
  line-height: 1.5;
}

@media (max-width: 940px) {
  .refractured-opening,
  .refractured-lens-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Verify and commit**

Run:

```powershell
npm run verify
```

Expected: PASS.

Run:

```powershell
git add src/components/refractured-report src/styles/refractured-report.css
git commit -m "feat: add refractured report opening"
```

Expected: commit succeeds.

---

### Task 5: Build Player DNA And Roguelite Loop Modules

**Files:**
- Modify: `src/components/refractured-report/RefracturedReportPage.jsx`
- Create: `src/components/refractured-report/PlayerSignalInspector.jsx`
- Create: `src/components/refractured-report/RogueliteLoopLab.jsx`
- Modify: `src/styles/refractured-report.css`

- [ ] **Step 1: Create `PlayerSignalInspector`**

Use `apply_patch` to create `src/components/refractured-report/PlayerSignalInspector.jsx`:

```jsx
import { Database } from "lucide-react";

function SignalList({ items, label }) {
  return (
    <div className="refractured-signal-list">
      <span>{label}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function PlayerSignalInspector({ onEvidenceOpen, signals }) {
  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Player DNA</p>
        <h1>The target player is loyal, curious, and unforgiving about feel.</h1>
        <p>
          This report treats the player as a judge of contact, fairness, retry desire, and visual clarity.
          The goal is not to please every action fan; it is to prove the brutal roguelite promise to the right one.
        </p>
      </div>
      <div className="refractured-signal-grid">
        {signals.map((signal) => (
          <article key={signal.id}>
            <h2>{signal.title}</h2>
            <div className="refractured-signal-columns">
              <SignalList items={signal.rewards} label="Rewards" />
              <SignalList items={signal.rejects} label="Rejects" />
            </div>
            <p className="refractured-proof-question">{signal.proofSignal}</p>
            <button type="button" onClick={() => onEvidenceOpen(signal.evidenceRefs)}>
              <Database size={16} aria-hidden="true" />
              Evidence
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PlayerSignalInspector;
```

- [ ] **Step 2: Create `RogueliteLoopLab`**

Use `apply_patch` to create `src/components/refractured-report/RogueliteLoopLab.jsx`:

```jsx
import { useState } from "react";
import { Database } from "lucide-react";

function RogueliteLoopLab({ directions, onEvidenceOpen }) {
  const [activeDirectionId, setActiveDirectionId] = useState(directions[0]?.id);
  const activeDirection = directions.find((direction) => direction.id === activeDirectionId) ?? directions[0];

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Roguelite Loop Lab</p>
        <h1>The roguelite layer has to change behavior, not decorate the brawler.</h1>
        <p>
          Refractured should test which run structure makes the combat more sellable before committing to large content production.
        </p>
      </div>

      <div className="refractured-choice-strip" role="tablist" aria-label="Roguelite directions">
        {directions.map((direction) => (
          <button
            aria-selected={direction.id === activeDirection.id}
            className={direction.id === activeDirection.id ? "is-active" : ""}
            key={direction.id}
            type="button"
            onClick={() => setActiveDirectionId(direction.id)}
          >
            {direction.label}
          </button>
        ))}
      </div>

      <article className="refractured-feature-panel">
        <span>{activeDirection.label}</span>
        <h2>{activeDirection.promise}</h2>
        <dl>
          <div>
            <dt>Best for</dt>
            <dd>{activeDirection.bestFor}</dd>
          </div>
          <div>
            <dt>Risk</dt>
            <dd>{activeDirection.risk}</dd>
          </div>
          <div>
            <dt>Proof</dt>
            <dd>{activeDirection.proof}</dd>
          </div>
        </dl>
        <button type="button" onClick={() => onEvidenceOpen(activeDirection.evidenceRefs)}>
          <Database size={16} aria-hidden="true" />
          Evidence
        </button>
      </article>
    </section>
  );
}

export default RogueliteLoopLab;
```

- [ ] **Step 3: Wire modules into the page**

Modify `RefracturedReportPage.jsx` imports:

```jsx
import PlayerSignalInspector from "./PlayerSignalInspector.jsx";
import RogueliteLoopLab from "./RogueliteLoopLab.jsx";
```

Add below the overview block:

```jsx
      {activeSection === "player" ? (
        <PlayerSignalInspector
          onEvidenceOpen={openEvidenceDrawer}
          signals={refracturedPremiumReport.playerSignals}
        />
      ) : null}
      {activeSection === "roguelite" ? (
        <RogueliteLoopLab
          directions={refracturedPremiumReport.rogueliteDirections}
          onEvidenceOpen={openEvidenceDrawer}
        />
      ) : null}
```

- [ ] **Step 4: Add module CSS**

Append focused CSS for `.refractured-signal-grid`, `.refractured-choice-strip`, and `.refractured-feature-panel`. Use the same color tokens already defined in `src/styles/refractured-report.css`; keep cards at `border-radius: 8px`.

CSS content:

```css
.refractured-signal-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 28px;
}

.refractured-signal-grid article,
.refractured-feature-panel {
  border: 1px solid rgba(233, 197, 124, 0.22);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  padding: 22px;
}

.refractured-signal-grid h2,
.refractured-feature-panel h2 {
  margin: 0;
  color: #fff7df;
  font-size: clamp(1.45rem, 2.4vw, 2.4rem);
  line-height: 1.05;
}

.refractured-signal-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.refractured-signal-list span,
.refractured-feature-panel span,
.refractured-feature-panel dt {
  color: #e9c57c;
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.refractured-signal-list ul {
  display: grid;
  gap: 8px;
  margin: 10px 0 0;
  padding-left: 18px;
  color: rgba(247, 243, 234, 0.75);
}

.refractured-signal-grid button,
.refractured-feature-panel button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  margin-top: 16px;
  padding: 8px 12px;
  border: 1px solid rgba(233, 197, 124, 0.28);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #f7f3ea;
  cursor: pointer;
  font-weight: 900;
}

.refractured-choice-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.refractured-choice-strip button {
  min-height: 42px;
  padding: 9px 14px;
  border: 1px solid rgba(233, 197, 124, 0.26);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  color: rgba(247, 243, 234, 0.76);
  cursor: pointer;
  font-weight: 900;
}

.refractured-choice-strip button.is-active {
  border-color: rgba(233, 197, 124, 0.78);
  background: rgba(233, 197, 124, 0.14);
  color: #fff7df;
}

.refractured-feature-panel {
  margin-top: 18px;
}

.refractured-feature-panel dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 22px 0 0;
}

.refractured-feature-panel dd {
  margin: 8px 0 0;
  color: rgba(247, 243, 234, 0.74);
  line-height: 1.5;
}

@media (max-width: 860px) {
  .refractured-signal-grid,
  .refractured-signal-columns,
  .refractured-feature-panel dl {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Verify and commit**

Run:

```powershell
npm run verify
```

Expected: PASS.

Run:

```powershell
git add src/components/refractured-report src/styles/refractured-report.css
git commit -m "feat: add refractured player and roguelite modules"
```

Expected: commit succeeds.

---

### Task 6: Build Comparables, Steam Builder, Paths, Plan, And Evidence

**Files:**
- Modify: `src/components/refractured-report/RefracturedReportPage.jsx`
- Create: `src/components/refractured-report/ComparableExplorer.jsx`
- Create: `src/components/refractured-report/SteamPositioningBuilder.jsx`
- Create: `src/components/refractured-report/StrategicPathSelector.jsx`
- Create: `src/components/refractured-report/ActionPlanTimeline.jsx`
- Create: `src/components/refractured-report/RefracturedEvidenceDrawer.jsx`
- Modify: `src/styles/refractured-report.css`

- [ ] **Step 1: Create the comparable explorer**

Use `apply_patch` to create `src/components/refractured-report/ComparableExplorer.jsx`:

```jsx
import { useState } from "react";
import { Database } from "lucide-react";

const filters = [
  "All",
  "Closest market lane",
  "Useful mechanic lesson",
  "Audience expectation warning",
  "Scope trap",
  "Marketing clarity example",
  "Not safe as a benchmark",
];

function ComparableExplorer({ comparables, onEvidenceOpen }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleComparables =
    activeFilter === "All"
      ? comparables
      : comparables.filter((item) => item.filterTags.includes(activeFilter));

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Comparable Explorer</p>
        <h1>References are lessons, not forecasts.</h1>
        <p>
          Filter the market map by the job each comparable performs. The useful question is not
          "is Refractured like this game?" but "what expectation does this game teach?"
        </p>
      </div>

      <div className="refractured-choice-strip" aria-label="Comparable filters">
        {filters.map((filter) => (
          <button
            className={filter === activeFilter ? "is-active" : ""}
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="refractured-comparable-grid">
        {visibleComparables.map((item) => (
          <article key={item.id}>
            <span>{item.role}</span>
            <h2>{item.title}</h2>
            <p>{item.insight}</p>
            <dl>
              <div>
                <dt>Borrow</dt>
                <dd>{item.borrow}</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>{item.avoid}</dd>
              </div>
            </dl>
            <button type="button" onClick={() => onEvidenceOpen(item.evidenceRefs)}>
              <Database size={16} aria-hidden="true" />
              Evidence
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ComparableExplorer;
```

- [ ] **Step 2: Create the Steam positioning builder**

Use `apply_patch` to create `src/components/refractured-report/SteamPositioningBuilder.jsx`:

```jsx
import { useState } from "react";
import { Database } from "lucide-react";

function SteamPositioningBuilder({ onEvidenceOpen, positioningAngles }) {
  const [activeAngleId, setActiveAngleId] = useState(positioningAngles[0]?.id);
  const activeAngle = positioningAngles.find((angle) => angle.id === activeAngleId) ?? positioningAngles[0];

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Steam Page And Trailer Builder</p>
        <h1>The first five seconds should sell the playable fantasy, not list systems.</h1>
        <p>
          Select a positioning angle and inspect how it changes the Steam promise, tag stack,
          trailer opening, demo call to action, and creator pitch.
        </p>
      </div>

      <div className="refractured-choice-strip" aria-label="Positioning angles">
        {positioningAngles.map((angle) => (
          <button
            className={angle.id === activeAngle.id ? "is-active" : ""}
            key={angle.id}
            type="button"
            onClick={() => setActiveAngleId(angle.id)}
          >
            {angle.label}
          </button>
        ))}
      </div>

      <article className="refractured-feature-panel">
        <span>{activeAngle.label}</span>
        <h2>{activeAngle.steamPromise}</h2>
        <div className="refractured-chip-row">
          {activeAngle.tagStack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <ol className="refractured-trailer-beats">
          {activeAngle.trailerBeats.map((beat) => (
            <li key={beat}>{beat}</li>
          ))}
        </ol>
        <dl>
          <div>
            <dt>Demo CTA</dt>
            <dd>{activeAngle.demoCta}</dd>
          </div>
          <div>
            <dt>Creator pitch</dt>
            <dd>{activeAngle.creatorPitch}</dd>
          </div>
        </dl>
        <button type="button" onClick={() => onEvidenceOpen(activeAngle.evidenceRefs)}>
          <Database size={16} aria-hidden="true" />
          Evidence
        </button>
      </article>
    </section>
  );
}

export default SteamPositioningBuilder;
```

- [ ] **Step 3: Create the strategic path selector**

Use `apply_patch` to create `src/components/refractured-report/StrategicPathSelector.jsx`:

```jsx
import { useState } from "react";
import { Database } from "lucide-react";

function StrategicPathSelector({ onEvidenceOpen, paths }) {
  const [activePathId, setActivePathId] = useState(paths[0]?.id);
  const activePath = paths.find((path) => path.id === activePathId) ?? paths[0];

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Strategic Path Selector</p>
        <h1>Ambition should be earned by proof signals.</h1>
        <p>
          The first path is not the ambition ceiling. It is the cheapest way to learn whether
          Refractured has a market before the project expands.
        </p>
      </div>

      <div className="refractured-path-grid">
        {paths.map((path) => (
          <button
            className={path.id === activePath.id ? "is-active" : ""}
            key={path.id}
            type="button"
            onClick={() => setActivePathId(path.id)}
          >
            <span>{path.label}</span>
            <strong>{path.when}</strong>
          </button>
        ))}
      </div>

      <article className="refractured-feature-panel">
        <span>{activePath.label}</span>
        <h2>{activePath.passSignal}</h2>
        <dl>
          <div>
            <dt>When</dt>
            <dd>{activePath.when}</dd>
          </div>
          <div>
            <dt>Commercial upside</dt>
            <dd>{activePath.buys}</dd>
          </div>
          <div>
            <dt>Risk</dt>
            <dd>{activePath.risks}</dd>
          </div>
        </dl>
        <button type="button" onClick={() => onEvidenceOpen(activePath.evidenceRefs)}>
          <Database size={16} aria-hidden="true" />
          Evidence
        </button>
      </article>
    </section>
  );
}

export default StrategicPathSelector;
```

- [ ] **Step 4: Create the action plan timeline**

Use `apply_patch` to create `src/components/refractured-report/ActionPlanTimeline.jsx`:

```jsx
import { Database } from "lucide-react";

function groupByPeriod(actions) {
  return actions.reduce((groups, action) => {
    const existingGroup = groups.find((group) => group.period === action.period);
    if (existingGroup) {
      existingGroup.actions.push(action);
      return groups;
    }

    groups.push({ period: action.period, actions: [action] });
    return groups;
  }, []);
}

function ActionPlanTimeline({ actions, onEvidenceOpen }) {
  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">30 / 90 / 365 Day Plan</p>
        <h1>The plan is not "build more." It is prove, then scale.</h1>
        <p>
          Each step creates a visible artifact and a test signal that can change the next decision.
        </p>
      </div>

      <div className="refractured-timeline">
        {groupByPeriod(actions).map((group) => (
          <section key={group.period}>
            <h2>{group.period}</h2>
            <div className="refractured-action-list">
              {group.actions.map((action) => (
                <article key={action.id}>
                  <span>{action.title}</span>
                  <p>{action.outcome}</p>
                  <dl>
                    <div>
                      <dt>Artifact</dt>
                      <dd>{action.artifact}</dd>
                    </div>
                    <div>
                      <dt>Signal</dt>
                      <dd>{action.signal}</dd>
                    </div>
                  </dl>
                  <button type="button" onClick={() => onEvidenceOpen(action.evidenceRefs)}>
                    <Database size={16} aria-hidden="true" />
                    Evidence
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default ActionPlanTimeline;
```

- [ ] **Step 5: Create the evidence drawer and evidence page**

Create `RefracturedEvidenceDrawer.jsx` that supports two modes:

```jsx
function RefracturedEvidenceDrawer({ activeRefs, evidence, onClose, open, variant = "drawer" }) {
  const activeSet = activeRefs ? new Set(activeRefs) : null;
  const visibleEvidence = activeSet ? evidence.filter((item) => activeSet.has(item.id)) : evidence;

  if (!open && variant !== "page") {
    return null;
  }

  return (
    <aside className={variant === "page" ? "refractured-evidence-page" : "refractured-evidence-drawer"}>
      <header>
        <span>Evidence</span>
        {variant !== "page" ? <button type="button" onClick={onClose}>Close</button> : null}
      </header>
      <div className="refractured-evidence-list">
        {visibleEvidence.map((item) => (
          <article key={item.id}>
            <span>{item.level}</span>
            <h2>{item.label}</h2>
            <p>{item.matters}</p>
            <p>{item.unknown}</p>
            {item.href ? <a href={item.href} target="_blank" rel="noreferrer">Open source</a> : null}
          </article>
        ))}
      </div>
    </aside>
  );
}

export default RefracturedEvidenceDrawer;
```

- [ ] **Step 6: Wire all modules into `RefracturedReportPage.jsx`**

Import the new modules and render them under their active sections:

```jsx
      {activeSection === "comparables" ? (
        <ComparableExplorer
          comparables={refracturedPremiumReport.comparables}
          onEvidenceOpen={openEvidenceDrawer}
        />
      ) : null}
      {activeSection === "steam" ? (
        <SteamPositioningBuilder
          onEvidenceOpen={openEvidenceDrawer}
          positioningAngles={refracturedPremiumReport.positioningAngles}
        />
      ) : null}
      {activeSection === "paths" ? (
        <StrategicPathSelector
          onEvidenceOpen={openEvidenceDrawer}
          paths={refracturedPremiumReport.strategicPaths}
        />
      ) : null}
      {activeSection === "actions" ? (
        <ActionPlanTimeline
          actions={refracturedPremiumReport.actionPlan}
          onEvidenceOpen={openEvidenceDrawer}
        />
      ) : null}
      {activeSection === "evidence" ? (
        <RefracturedEvidenceDrawer
          evidence={refracturedPremiumReport.evidence}
          open
          variant="page"
        />
      ) : null}
      <RefracturedEvidenceDrawer
        activeRefs={activeEvidenceRefs}
        evidence={refracturedPremiumReport.evidence}
        onClose={() => setActiveEvidenceRefs(null)}
        open={Boolean(activeEvidenceRefs)}
      />
```

- [ ] **Step 7: Add module CSS**

Append this CSS to `src/styles/refractured-report.css`:

```css
.refractured-comparable-grid,
.refractured-path-grid,
.refractured-action-list,
.refractured-evidence-list {
  display: grid;
  gap: 14px;
}

.refractured-comparable-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 22px;
}

.refractured-comparable-grid article,
.refractured-path-grid button,
.refractured-action-list article,
.refractured-evidence-list article {
  border: 1px solid rgba(233, 197, 124, 0.22);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  color: #f7f3ea;
}

.refractured-comparable-grid article,
.refractured-action-list article,
.refractured-evidence-list article {
  padding: 20px;
}

.refractured-comparable-grid span,
.refractured-path-grid span,
.refractured-action-list span,
.refractured-evidence-list span,
.refractured-chip-row span {
  color: #e9c57c;
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.refractured-comparable-grid h2,
.refractured-evidence-list h2 {
  margin: 8px 0 0;
  color: #fff7df;
  font-size: 1.4rem;
}

.refractured-comparable-grid p,
.refractured-action-list p,
.refractured-evidence-list p {
  color: rgba(247, 243, 234, 0.72);
  line-height: 1.5;
}

.refractured-comparable-grid dl,
.refractured-action-list dl {
  display: grid;
  gap: 10px;
  margin: 16px 0 0;
}

.refractured-comparable-grid dt,
.refractured-action-list dt {
  color: #e9c57c;
  font-weight: 900;
}

.refractured-comparable-grid dd,
.refractured-action-list dd {
  margin: 4px 0 0;
  color: rgba(247, 243, 234, 0.72);
  line-height: 1.45;
}

.refractured-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.refractured-chip-row span {
  padding: 7px 9px;
  border: 1px solid rgba(233, 197, 124, 0.24);
  border-radius: 999px;
  background: rgba(233, 197, 124, 0.09);
}

.refractured-trailer-beats {
  display: grid;
  gap: 8px;
  margin: 20px 0 0;
  padding-left: 24px;
  color: rgba(247, 243, 234, 0.78);
}

.refractured-path-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 24px;
}

.refractured-path-grid button {
  display: grid;
  gap: 10px;
  min-height: 160px;
  padding: 18px;
  text-align: left;
  cursor: pointer;
}

.refractured-path-grid button.is-active {
  border-color: rgba(233, 197, 124, 0.78);
  background: rgba(233, 197, 124, 0.13);
}

.refractured-path-grid strong {
  color: #fff7df;
  line-height: 1.25;
}

.refractured-timeline {
  display: grid;
  gap: 28px;
  margin-top: 28px;
}

.refractured-timeline h2 {
  margin: 0 0 12px;
  color: #fff7df;
  font-size: clamp(1.5rem, 2.4vw, 2.5rem);
}

.refractured-action-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.refractured-comparable-grid button,
.refractured-action-list button,
.refractured-evidence-list a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  min-height: 38px;
  margin-top: 14px;
  padding: 8px 12px;
  border: 1px solid rgba(233, 197, 124, 0.28);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #f7f3ea;
  cursor: pointer;
  font-weight: 900;
  text-decoration: none;
}

.refractured-evidence-drawer,
.refractured-evidence-page {
  color: #f7f3ea;
}

.refractured-evidence-drawer {
  position: fixed;
  inset: 0 0 0 auto;
  z-index: 50;
  width: min(520px, 100%);
  overflow: auto;
  padding: 24px;
  border-left: 1px solid rgba(233, 197, 124, 0.22);
  background: rgba(7, 9, 13, 0.98);
  box-shadow: -24px 0 80px rgba(0, 0, 0, 0.35);
}

.refractured-evidence-page {
  width: min(1180px, 100%);
  margin-inline: auto;
  padding-top: clamp(34px, 6vw, 86px);
}

.refractured-evidence-drawer header,
.refractured-evidence-page header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.refractured-evidence-drawer header span,
.refractured-evidence-page header span {
  color: #e9c57c;
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.refractured-evidence-drawer header button {
  min-height: 38px;
  padding: 8px 12px;
  border: 1px solid rgba(233, 197, 124, 0.28);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #f7f3ea;
  cursor: pointer;
  font-weight: 900;
}

@media (max-width: 980px) {
  .refractured-comparable-grid,
  .refractured-path-grid,
  .refractured-action-list {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 8: Verify and commit**

Run:

```powershell
npm run verify
```

Expected: PASS.

Run:

```powershell
git add src/components/refractured-report src/styles/refractured-report.css
git commit -m "feat: complete refractured interactive modules"
```

Expected: commit succeeds.

---

### Task 7: Convert V2 Static Files Into Backup Surfaces

**Files:**
- Modify: `docs/client-reports/refractured-steam-positioning-readiness.html`
- Modify: `docs/client-reports/refractured-steam-positioning-readiness.md`
- Keep or add: `docs/client-reports/refractured-report-v2-artifact.json`

- [ ] **Step 1: Update Markdown status**

Modify the top of `docs/client-reports/refractured-steam-positioning-readiness.md` so it begins with:

```markdown
# Refractured Commercial Strategy Report

Status: Static backup mirror
Primary experience: `#client-report/refractured`
Date: 2026-06-20

This file is not the primary client experience. The primary report is the interactive Indievaders route `#client-report/refractured`. This Markdown keeps the core thesis, source notes, and evidence archive in repo-friendly form.
```

- [ ] **Step 2: Replace table-first sections**

In the Markdown file, remove the table-led `Market Fit Scorecard`, `Roguelite Fit Matrix`, `Comparable Evidence`, `Review Theme Mining`, and `Evidence Confidence Ledger` as main sections. Replace them with short backup sections:

- `Core Thesis`;
- `Interactive Modules`;
- `Evidence Archive Notes`;
- `Source Gaps`.

Each section should be readable in under one screen.

- [ ] **Step 3: Update HTML status**

Modify the first visible screen of `docs/client-reports/refractured-steam-positioning-readiness.html` so it states:

```text
Static backup mirror. The primary client experience is the interactive Indievaders route #client-report/refractured.
```

The HTML should no longer present the Data Analytics artifact as the primary report.

- [ ] **Step 4: Keep JSON as archive**

If `docs/client-reports/refractured-report-v2-artifact.json` remains untracked, add it as an archive only if it contains no private raw Refractured assets or secrets. If it contains only bounded report datasets and source metadata, keep the filename and make the docs call it an evidence archive.

- [ ] **Step 5: Verify static files do not use old positioning**

Run:

```powershell
rg "dogfood|prototype caution|Primary report surface: Data Analytics artifact|Market Fit Scorecard|Roguelite Fit Matrix" docs/client-reports docs/project-management
```

Expected: no matches except intentional historical notes that explicitly mark V2 as archived.

- [ ] **Step 6: Commit static cleanup**

Run:

```powershell
git add docs/client-reports/refractured-steam-positioning-readiness.html docs/client-reports/refractured-steam-positioning-readiness.md docs/client-reports/refractured-report-v2-artifact.json
git commit -m "docs: archive refractured v2 surfaces"
```

Expected: commit succeeds.

---

### Task 8: Update Workflow Notes And Decision Log

**Files:**
- Modify: `docs/project-management/refractured-report-workflow-notes.md`
- Modify: `docs/project-management/decision-log.md`

- [ ] **Step 1: Add workflow correction note**

Append to `docs/project-management/refractured-report-workflow-notes.md`:

```markdown
## 2026-06-20 Premium Interactive Report Correction

The v2 artifact-first pass preserved evidence, but it failed as a paid client experience because the visible report looked like a generated deep-research document. V3 changes the product direction:

- one primary interactive route: `#client-report/refractured`;
- static HTML, Markdown, and JSON become backup/archive surfaces;
- evidence remains one click away, but it no longer dominates the reading path;
- the report is organized around decisions, player psychology, roguelite proof, Steam positioning, comparables, and action planning;
- tables and long ledgers belong in appendix states, not above the fold.

Method lesson:

Premium report value comes from guided judgment and productized interaction, not from presenting every source and matrix in the primary view.
```

- [ ] **Step 2: Add decision-log entry**

Append to `docs/project-management/decision-log.md`:

```markdown
## 2026-06-20: Make Refractured V3 Interactive-First

Decision: Refractured V3 will use one private interactive client-report route, `#client-report/refractured`, as the primary experience. The Data Analytics artifact, HTML, Markdown, and JSON snapshots are supporting evidence/archive surfaces.

Reason: The v2 report looked too much like a generic AI deep-research output. A paid Indievaders product needs guided interaction, decision modules, source drawers, and premium visual hierarchy.

Impact: Implementation shifts from static report rewriting to a React report experience with local data and focused modules. Backend, auth, payments, public sharing, and live Market Watch remain out of scope.
```

- [ ] **Step 3: Verify docs**

Run:

```powershell
rg "interactive-first|#client-report/refractured|deep-research" docs/project-management docs/superpowers
```

Expected: matches show the new direction in the V3 spec, workflow notes, and decision log.

- [ ] **Step 4: Commit docs**

Run:

```powershell
git add docs/project-management/refractured-report-workflow-notes.md docs/project-management/decision-log.md
git commit -m "docs: record refractured interactive report direction"
```

Expected: commit succeeds.

---

### Task 9: Visual QA And Final Verification

**Files:**
- No planned source edits unless QA finds issues.

- [ ] **Step 1: Run full verification**

Run:

```powershell
npm run verify
git diff --check
```

Expected: `npm run verify` passes. `git diff --check` has no whitespace errors.

- [ ] **Step 2: Start or reuse Vite**

Run:

```powershell
npm run dev -- --host 127.0.0.1 --port 5176
```

Expected: Vite serves the app at `http://127.0.0.1:5176/`. If port `5176` is busy, use the next open port and record it in the handoff.

- [ ] **Step 3: Manually inspect desktop route**

Open:

```text
http://127.0.0.1:5176/#client-report/refractured
```

Check desktop viewport:

- first screen is not a wall of text;
- thesis is specific to Refractured;
- lens hub is clickable;
- every nav section renders;
- evidence buttons open a drawer;
- no large table appears as the main reading experience.

- [ ] **Step 4: Manually inspect narrow/mobile route**

Use a narrow viewport around `390px` width.

Check:

- no horizontal scroll;
- nav wraps cleanly;
- text does not clip inside buttons;
- module cards do not overlap;
- evidence drawer remains readable.

- [ ] **Step 5: Check static backup surfaces**

Open:

```text
file:///G:/Game%20Dev/Indievaders/docs/client-reports/refractured-steam-positioning-readiness.html
```

Check:

- it clearly says static backup mirror;
- it points to `#client-report/refractured`;
- it no longer claims Data Analytics artifact is primary.

- [ ] **Step 6: Search for old language**

Run:

```powershell
rg "dogfood|prototype caution|Primary report surface: Data Analytics artifact|as an AI language model|Market Fit Scorecard|Roguelite Fit Matrix" src docs
```

Expected: no user-facing current-report matches. Historical mentions are acceptable only when they explicitly mark V2 as archived or rejected.

- [ ] **Step 7: Final commit**

If QA fixes were needed, commit them:

```powershell
git add src docs scripts package.json
git commit -m "fix: polish refractured interactive report qa"
```

If no QA fixes were needed, do not create an empty commit.

## Self-Review Checklist For Implementer

- The primary route is `#client-report/refractured`.
- There is one primary client experience.
- V2 JSON, HTML, and Markdown are not presented as the paid report surface.
- Tables and ledgers are not the main reading path.
- The report answers who the player is, why the niche is viable but hard, how roguelite systems help sell the game, what to test before Steam, and how to avoid a five-year commercial miss.
- Every major recommendation has evidence access.
- `npm run verify` passes.
- Desktop and narrow/mobile visual QA are completed.
