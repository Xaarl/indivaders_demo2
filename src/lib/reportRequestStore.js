import interactiveSampleReport from "../data/interactiveSampleReport.js";

const STORAGE_KEY = "indievaders.reportRequests";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const defaultStorage = {
  getItem(key) {
    if (typeof window === "undefined") {
      return null;
    }
    return window.localStorage.getItem(key);
  },
  setItem(key, value) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  },
  removeItem(key) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  },
};

function getStorage(options = {}) {
  return options.storage ?? defaultStorage;
}

function readRequests(storage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRequests(storage, requests) {
  storage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function updateStoredRequest(id, updater, options = {}) {
  const storage = getStorage(options);
  const requests = readRequests(storage);
  const index = requests.findIndex((request) => request.id === id);

  if (index === -1) {
    return { ok: false, error: "Workspace not found." };
  }

  const updated = updater(requests[index]);
  const nextRequests = [...requests];
  nextRequests[index] = updated;
  writeRequests(storage, nextRequests);

  return { ok: true, request: updated };
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
}

function createReportId(projectTitle, createdAt) {
  const slug = slugify(projectTitle) || "project";
  const stamp = createdAt.replace(/[^0-9]/g, "").slice(0, 14);
  return `report_${slug}_${stamp}`;
}

export function parseReferenceGames(value) {
  return String(value ?? "")
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export function validateReportRequest(input) {
  const errors = {};

  if (!input.projectTitle?.trim()) {
    errors.projectTitle = "Project title is required.";
  }

  if (!emailPattern.test(input.contactEmail?.trim() ?? "")) {
    errors.contactEmail = "Valid contact email is required.";
  }

  if (!input.description?.trim()) {
    errors.description = "Short game description is required.";
  }

  return errors;
}

function buildWorkspace(projectProfile) {
  const reportSnapshot = {
    title: interactiveSampleReport.meta.title,
    executiveRead: interactiveSampleReport.verdicts.map((verdict) => ({
      id: verdict.id,
      label: verdict.label,
      headline: verdict.headline,
      decision: verdict.decision,
      confidence: verdict.confidence,
      evidenceRefs: verdict.evidenceRefs,
    })),
  };
  const comparableBoard = {
    suggestedComparables: interactiveSampleReport.comparables.map((game) => ({
      id: game.id,
      title: game.title,
      role: game.role,
      reason: game.whyItAppears,
      risk: game.whyItIsRisky,
      safeLesson: game.safeLesson,
      evidenceRefs: game.evidenceRefs,
    })),
    savedComparables: [],
  };
  const reviewRiskMap = {
    risks: interactiveSampleReport.reviewRisks.map((risk) => ({
      id: risk.id,
      label: risk.label,
      severity: risk.severity,
      signal: risk.playerSignal,
      meaning: risk.designMeaning,
      action: risk.action,
      evidenceRefs: risk.evidenceRefs,
    })),
  };
  const actionItems = interactiveSampleReport.nextActions.map((item) => ({
    ...item,
    status: "open",
  }));
  const sourceLog = interactiveSampleReport.sources;

  return {
    title: `${projectProfile.title} workspace`,
    state: "request_received",
    previewStatus: {
      label: "Browser-only local preview",
      summary: "This prototype workspace is saved in this browser only until a real backend exists.",
    },
    nextStep: {
      label: "Open the interactive sample report",
      href: "#sample-report",
      note: "This local workspace preview shows the shape of the paid report surface; custom analysis still happens after manual review.",
    },
    reportSnapshot,
    comparableBoard,
    reviewRiskMap,
    productionReality: interactiveSampleReport.productionReality,
    actionItems,
    sourceLog,
    refreshRuns: [],
    modules: [
      {
        id: "project-profile",
        title: "Project Profile",
        status: "ready",
        summary: "Synopsis, stage, tags, references, price assumptions, and current concerns.",
      },
      {
        id: "report-snapshot",
        title: "Report Snapshot",
        status: "ready",
        summary: "A sample-format report snapshot is available now; the paid version will replace it after processing.",
      },
      {
        id: "comparable-board",
        title: "Comparable Board",
        status: "ready",
        summary: "True comparables, unsafe benchmarks, and visual references for the project.",
      },
      {
        id: "review-risk-map",
        title: "Review Risk Map",
        status: "ready",
        summary: "Design risks inferred from nearby game reviews and player expectations.",
      },
      {
        id: "production-reality",
        title: "Production Reality",
        status: "pending",
        summary: "Team, publisher, timeline, and budget context where public sources exist.",
      },
      {
        id: "next-actions",
        title: "Next Actions",
        status: "ready",
        summary: "Prioritized tasks before Steam page, demo, Next Fest, pitch, or launch.",
      },
      {
        id: "source-log",
        title: "Source Log",
        status: "ready",
        summary: "Evidence labels for major claims: Confirmed, Reported, Estimated, Inferred, or Not publicly confirmed.",
      },
      {
        id: "market-watch",
        title: "Market Watch",
        status: "future",
        summary: "Refreshable market changes become a later subscription layer after report quality is proven.",
      },
    ],
  };
}

export function createReportRequest(input, options = {}) {
  const errors = validateReportRequest(input);
  if (Object.keys(errors).length) {
    return { ok: false, errors };
  }

  const storage = getStorage(options);
  const createdAt = options.now ?? new Date().toISOString();
  const projectProfile = {
    title: input.projectTitle.trim(),
    contactEmail: input.contactEmail.trim(),
    synopsis: input.description.trim(),
    stage: input.stage || "prototype",
    steamUrl: input.steamUrl?.trim() ?? "",
    referenceGames: parseReferenceGames(input.referenceGames),
    mainConcerns: Array.isArray(input.mainConcerns) ? input.mainConcerns : [],
    notes: input.notes?.trim() ?? "",
  };
  const id = createReportId(projectProfile.title, createdAt);
  const request = {
    id,
    createdAt,
    workspaceHash: `#workspace/${id}`,
    projectProfile,
    workspace: buildWorkspace(projectProfile),
  };
  const requests = readRequests(storage).filter((item) => item.id !== id);
  writeRequests(storage, [request, ...requests]);

  return { ok: true, request };
}

export function getStoredReportRequest(id, options = {}) {
  return readRequests(getStorage(options)).find((request) => request.id === id) ?? null;
}

export function listStoredReportRequests(options = {}) {
  return readRequests(getStorage(options));
}

export function resetReportRequestStore(storage = defaultStorage) {
  storage.removeItem(STORAGE_KEY);
}

export function addComparableToWorkspace(requestId, comparableId, options = {}) {
  return updateStoredRequest(
    requestId,
    (request) => {
      const comparable = request.workspace.comparableBoard.suggestedComparables.find((item) => item.id === comparableId);
      if (!comparable) {
        return request;
      }

      const alreadySaved = request.workspace.comparableBoard.savedComparables.some((item) => item.id === comparableId);
      if (alreadySaved) {
        return request;
      }

      return {
        ...request,
        workspace: {
          ...request.workspace,
          comparableBoard: {
            ...request.workspace.comparableBoard,
            savedComparables: [
              ...request.workspace.comparableBoard.savedComparables,
              {
                ...comparable,
                savedAt: options.now ?? new Date().toISOString(),
              },
            ],
          },
        },
      };
    },
    options,
  );
}

export function toggleWorkspaceAction(requestId, actionId, options = {}) {
  return updateStoredRequest(
    requestId,
    (request) => ({
      ...request,
      workspace: {
        ...request.workspace,
        actionItems: request.workspace.actionItems.map((item) =>
          item.id === actionId
            ? {
                ...item,
                status: item.status === "done" ? "open" : "done",
              }
            : item,
        ),
      },
    }),
    options,
  );
}

export function createWorkspaceRefreshPreview(requestId, options = {}) {
  return updateStoredRequest(
    requestId,
    (request) => {
      const run = {
        id: `refresh_${(options.now ?? new Date().toISOString()).replace(/[^0-9]/g, "").slice(0, 14)}`,
        date: options.now ?? new Date().toISOString(),
        status: "preview",
        summary: "Market Watch is ready to compare changes once live data refresh is connected.",
        changedSignals: [
          {
            id: "tracked-comparables",
            label: "Tracked comparable movement",
            confidence: "Inferred",
            note: `${request.workspace.comparableBoard.savedComparables.length} saved comparables are ready for future refresh.`,
          },
          {
            id: "new-candidates",
            label: "New candidate detection",
            confidence: "Not publicly confirmed",
            note: "No live market scan is connected in this prototype workspace.",
          },
        ],
      };

      return {
        ...request,
        workspace: {
          ...request.workspace,
          refreshRuns: [run, ...request.workspace.refreshRuns],
        },
      };
    },
    options,
  );
}
