import {
  addComparableToWorkspace,
  createReportRequest,
  createWorkspaceRefreshPreview,
  getStoredReportRequest,
  resetReportRequestStore,
  toggleWorkspaceAction,
} from "../src/lib/reportRequestStore.js";

const memoryStorage = (() => {
  const store = new Map();
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
})();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

resetReportRequestStore(memoryStorage);

const invalid = createReportRequest(
  {
    projectTitle: "",
    contactEmail: "not-an-email",
    description: "",
    stage: "demo",
    referenceGames: "",
    mainConcerns: [],
  },
  { storage: memoryStorage },
);

assert(!invalid.ok, "Invalid report request should fail validation");
assert(invalid.errors.projectTitle, "Missing project title should be reported");
assert(invalid.errors.contactEmail, "Invalid email should be reported");
assert(invalid.errors.description, "Missing description should be reported");

const created = createReportRequest(
  {
    projectTitle: "Night City Brawler",
    contactEmail: "dev@example.com",
    description: "A noir 2D action roguelite about brawling through corrupt districts.",
    stage: "Steam page",
    steamUrl: "https://store.steampowered.com/app/123/Night_City_Brawler/",
    referenceGames: "Hades, TMNT: Shredder's Revenge\nStreets of Rage 4",
    mainConcerns: ["positioning", "reviews", "creators"],
    notes: "Need to know if the combat pitch is too broad.",
  },
  { storage: memoryStorage },
);

assert(created.ok, "Valid report request should be created");
assert(created.request.id.startsWith("report_"), "Request should get a stable report id");
assert(created.request.workspaceHash === `#workspace/${created.request.id}`, "Request should expose a private workspace hash");
assert(created.request.projectProfile.referenceGames.length === 3, "Reference games should be split by commas and new lines");
assert(created.request.projectProfile.referenceGames[0] === "Hades", "Reference games should be trimmed");
assert(created.request.workspace.modules.length >= 7, "Workspace should include the planned long-term modules");
assert(created.request.workspace.reportSnapshot.executiveRead.length >= 5, "Workspace should seed the report snapshot");
assert(created.request.workspace.comparableBoard.suggestedComparables.length >= 3, "Workspace should seed suggested comparables");
assert(created.request.workspace.reviewRiskMap.risks.length >= 5, "Workspace should seed review risks");
assert(created.request.workspace.actionItems.length >= 5, "Workspace should seed action items");
assert(
  created.request.workspace.modules.some((module) => module.id === "market-watch" && module.status === "future"),
  "Workspace should show market watch as future subscription layer, not fake live data",
);

const stored = getStoredReportRequest(created.request.id, { storage: memoryStorage });
assert(stored?.projectProfile?.title === "Night City Brawler", "Created request should be stored locally");
assert(stored.workspace.nextStep.href === "#sample-report", "Workspace should keep sample report as the current proof artifact");

const tracked = addComparableToWorkspace(created.request.id, "balatro", { storage: memoryStorage });
assert(tracked.ok, "Comparable should be saved to the workspace");
assert(tracked.request.workspace.comparableBoard.savedComparables.length === 1, "Saved comparable should be persisted");

const duplicate = addComparableToWorkspace(created.request.id, "balatro", { storage: memoryStorage });
assert(duplicate.request.workspace.comparableBoard.savedComparables.length === 1, "Duplicate comparables should not be added twice");

const firstActionId = created.request.workspace.actionItems[0].id;
const toggled = toggleWorkspaceAction(created.request.id, firstActionId, { storage: memoryStorage });
assert(toggled.ok, "Workspace action should be toggleable");
assert(
  toggled.request.workspace.actionItems.find((item) => item.id === firstActionId).status === "done",
  "Workspace action status should persist as done",
);

const refresh = createWorkspaceRefreshPreview(created.request.id, { storage: memoryStorage, now: "2026-06-14T18:00:00.000Z" });
assert(refresh.ok, "Refresh preview should be created");
assert(refresh.request.workspace.refreshRuns.length === 1, "Refresh preview should be stored");
assert(refresh.request.workspace.refreshRuns[0].status === "preview", "Refresh should be clearly marked as preview");
assert(
  refresh.request.workspace.refreshRuns[0].changedSignals.every((signal) => signal.confidence !== "Confirmed"),
  "Refresh preview must not pretend to contain confirmed live market data",
);

console.log("Workspace model check passed");
