import { ArrowLeft, CheckCircle2, ExternalLink, Plus, RefreshCw } from "lucide-react";
import { useState } from "react";
import {
  addComparableToWorkspace,
  createWorkspaceRefreshPreview,
  getStoredReportRequest,
  toggleWorkspaceAction,
} from "../../lib/reportRequestStore.js";

const workspaceTabs = [
  { id: "profile", label: "Profile" },
  { id: "snapshot", label: "Snapshot" },
  { id: "comparables", label: "Comparables" },
  { id: "risks", label: "Review risks" },
  { id: "actions", label: "Actions" },
  { id: "sources", label: "Sources" },
  { id: "watch", label: "Market Watch" },
];

function ProjectWorkspacePage({ requestId }) {
  const [request, setRequest] = useState(() => getStoredReportRequest(requestId));
  const [activeTab, setActiveTab] = useState("snapshot");

  if (!request) {
    return (
      <main className="workspace-shell">
        <header className="workspace-topbar">
          <a href="#">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to landing
          </a>
        </header>
        <section className="workspace-empty">
          <p className="workspace-kicker">Workspace not found</p>
          <h1>This private workspace only exists in your browser for now.</h1>
          <p>Create a new early report request to generate a local workspace preview.</p>
          <a className="button button-primary" href="#order-report">
            Create report request
          </a>
        </section>
      </main>
    );
  }

  const { projectProfile, workspace } = request;
  const doneActions = workspace.actionItems.filter((item) => item.status === "done").length;

  function saveComparable(comparableId) {
    const result = addComparableToWorkspace(request.id, comparableId);
    if (result.ok) {
      setRequest(result.request);
    }
  }

  function toggleAction(actionId) {
    const result = toggleWorkspaceAction(request.id, actionId);
    if (result.ok) {
      setRequest(result.request);
    }
  }

  function runRefreshPreview() {
    const result = createWorkspaceRefreshPreview(request.id);
    if (result.ok) {
      setRequest(result.request);
      setActiveTab("watch");
    }
  }

  return (
    <main className="workspace-shell">
      <header className="workspace-topbar">
        <a href="#">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to landing
        </a>
        <a href="#sample-report">Open sample report</a>
      </header>

      <section className="workspace-hero">
        <div>
          <p className="workspace-kicker">Private project workspace</p>
          <h1>{projectProfile.title}</h1>
          <p>{projectProfile.synopsis}</p>
        </div>
        <aside className="workspace-status-card">
          <span>Status</span>
          <strong>Request received</strong>
          <p>{doneActions}/{workspace.actionItems.length} actions marked done. {workspace.comparableBoard.savedComparables.length} comparables saved.</p>
        </aside>
      </section>

      <section className="workspace-profile-grid" aria-label="Project profile">
        <article>
          <span>Stage</span>
          <strong>{projectProfile.stage}</strong>
        </article>
        <article>
          <span>References</span>
          <strong>{projectProfile.referenceGames.length || "Not added"}</strong>
        </article>
        <article>
          <span>Concerns</span>
          <strong>{projectProfile.mainConcerns.join(", ") || "General positioning"}</strong>
        </article>
        <article>
          <span>Steam page</span>
          {projectProfile.steamUrl ? (
            <a href={projectProfile.steamUrl} target="_blank" rel="noreferrer">
              Open
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : (
            <strong>Not available yet</strong>
          )}
        </article>
      </section>

      <section className="workspace-next-step">
        <div>
          <p className="workspace-kicker">Current report preview</p>
          <h2>{workspace.nextStep.label}</h2>
          <p>{workspace.nextStep.note}</p>
        </div>
        <a className="button button-primary" href={workspace.nextStep.href}>
          Open sample report
        </a>
      </section>

      <nav className="workspace-tab-nav" aria-label="Workspace sections">
        {workspaceTabs.map((tab) => (
          <button
            className={activeTab === tab.id ? "is-active" : ""}
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "profile" ? <ProfilePanel projectProfile={projectProfile} /> : null}
      {activeTab === "snapshot" ? <SnapshotPanel workspace={workspace} /> : null}
      {activeTab === "comparables" ? (
        <ComparableBoard workspace={workspace} onSaveComparable={saveComparable} />
      ) : null}
      {activeTab === "risks" ? <RiskMap workspace={workspace} /> : null}
      {activeTab === "actions" ? (
        <ActionBoard actionItems={workspace.actionItems} onToggleAction={toggleAction} />
      ) : null}
      {activeTab === "sources" ? <SourceLog sources={workspace.sourceLog} /> : null}
      {activeTab === "watch" ? (
        <MarketWatchPanel workspace={workspace} onRunRefreshPreview={runRefreshPreview} />
      ) : null}
    </main>
  );
}

function ProfilePanel({ projectProfile }) {
  return (
    <section className="workspace-panel profile-panel">
      <div className="panel-heading">
        <p className="workspace-kicker">Project profile</p>
        <h2>What the report knows about this game.</h2>
      </div>
      <div className="profile-detail-grid">
        <article>
          <span>Synopsis</span>
          <p>{projectProfile.synopsis}</p>
        </article>
        <article>
          <span>Reference games</span>
          <ul>
            {projectProfile.referenceGames.length ? (
              projectProfile.referenceGames.map((game) => <li key={game}>{game}</li>)
            ) : (
              <li>No references added yet</li>
            )}
          </ul>
        </article>
        <article>
          <span>Concern focus</span>
          <p>{projectProfile.mainConcerns.join(", ") || "General positioning"}</p>
        </article>
        <article>
          <span>Notes</span>
          <p>{projectProfile.notes || "No extra notes added."}</p>
        </article>
      </div>
    </section>
  );
}

function SnapshotPanel({ workspace }) {
  return (
    <section className="workspace-panel">
      <div className="panel-heading">
        <p className="workspace-kicker">Report snapshot</p>
        <h2>Executive read from the current sample format.</h2>
      </div>
      <div className="snapshot-grid">
        {workspace.reportSnapshot.executiveRead.map((item) => (
          <article key={item.id}>
            <span>{item.confidence} confidence</span>
            <h3>{item.headline}</h3>
            <p>{item.decision}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ComparableBoard({ workspace, onSaveComparable }) {
  const savedIds = new Set(workspace.comparableBoard.savedComparables.map((item) => item.id));

  return (
    <section className="workspace-panel">
      <div className="panel-heading split-heading">
        <div>
          <p className="workspace-kicker">Comparable board</p>
          <h2>Save useful references and separate unsafe benchmarks.</h2>
        </div>
        <strong>{workspace.comparableBoard.savedComparables.length} saved</strong>
      </div>
      <div className="workspace-card-grid">
        {workspace.comparableBoard.suggestedComparables.map((game) => (
          <article className="workspace-data-card" key={game.id}>
            <span>{game.role}</span>
            <h3>{game.title}</h3>
            <p>{game.safeLesson}</p>
            <small>{game.risk}</small>
            <button type="button" onClick={() => onSaveComparable(game.id)} disabled={savedIds.has(game.id)}>
              {savedIds.has(game.id) ? <CheckCircle2 size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
              {savedIds.has(game.id) ? "Saved" : "Save comparable"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function RiskMap({ workspace }) {
  return (
    <section className="workspace-panel">
      <div className="panel-heading">
        <p className="workspace-kicker">Review risk map</p>
        <h2>Player friction translated into design checks.</h2>
      </div>
      <div className="risk-workspace-list">
        {workspace.reviewRiskMap.risks.map((risk) => (
          <article key={risk.id}>
            <span>{risk.severity}</span>
            <h3>{risk.label}</h3>
            <p>{risk.signal}</p>
            <strong>{risk.action}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActionBoard({ actionItems, onToggleAction }) {
  return (
    <section className="workspace-panel">
      <div className="panel-heading">
        <p className="workspace-kicker">Next actions</p>
        <h2>Turn the report into work you can actually do.</h2>
      </div>
      <div className="workspace-action-list">
        {actionItems.map((item) => (
          <article className={item.status === "done" ? "is-done" : ""} key={item.id}>
            <button type="button" onClick={() => onToggleAction(item.id)} aria-label={`Toggle ${item.title}`}>
              <CheckCircle2 size={18} aria-hidden="true" />
            </button>
            <div>
              <span>{item.effort} effort</span>
              <h3>{item.title}</h3>
              <p>{item.action}</p>
              <strong>{item.impact}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SourceLog({ sources }) {
  return (
    <section className="workspace-panel">
      <div className="panel-heading">
        <p className="workspace-kicker">Source log</p>
        <h2>Every strong claim needs a source or a confidence label.</h2>
      </div>
      <div className="source-workspace-grid">
        {sources.map((source) => (
          <article key={source.id}>
            <span>{source.label}</span>
            <h3>{source.name}</h3>
            <p>{source.note}</p>
            {source.url ? (
              <a href={source.url} target="_blank" rel="noreferrer">
                Open source
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function MarketWatchPanel({ workspace, onRunRefreshPreview }) {
  return (
    <section className="workspace-panel market-watch-panel">
      <div className="panel-heading split-heading">
        <div>
          <p className="workspace-kicker">Market Watch</p>
          <h2>Refresh becomes the reason to come back.</h2>
        </div>
        <button type="button" onClick={onRunRefreshPreview}>
          <RefreshCw size={17} aria-hidden="true" />
          Preview refresh
        </button>
      </div>
      <div className="refresh-run-list">
        {workspace.refreshRuns.length ? (
          workspace.refreshRuns.map((run) => (
            <article key={run.id}>
              <span>{run.status}</span>
              <h3>{run.summary}</h3>
              <ul>
                {run.changedSignals.map((signal) => (
                  <li key={signal.id}>
                    <strong>{signal.label}</strong>
                    <small>{signal.confidence}</small>
                    <p>{signal.note}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))
        ) : (
          <article>
            <span>Future layer</span>
            <h3>No refresh runs yet.</h3>
            <p>Save comparables first, then preview the shape of future market monitoring.</p>
          </article>
        )}
      </div>
    </section>
  );
}

export default ProjectWorkspacePage;
