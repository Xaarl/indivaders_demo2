import { useState } from "react";
import {
  BarChart3,
  Bookmark,
  Boxes,
  ClipboardList,
  Download,
  FileSearch,
  Layers3,
  LineChart,
  Map,
  MessageSquareText,
  RefreshCw,
  Share2,
  Swords,
  Tag,
} from "lucide-react";
import { layerLabels, layerOrder } from "./marketIntelligenceLayers.js";

const sectionIcons = {
  "market-map": Map,
  "audience-signals": Swords,
  "comparable-explorer": Boxes,
  "review-community-themes": MessageSquareText,
  "steam-page-lab": FileSearch,
  "roguelite-loop-lab": RefreshCw,
  "action-plan": ClipboardList,
  "evidence-ledger": Layers3,
};

const quickViews = [
  { label: "Wishlist Funnel", icon: LineChart, targetSection: "steam-page-lab" },
  { label: "Price Proxy", icon: BarChart3, targetSection: "comparable-explorer" },
  { label: "Tag Performance", icon: Tag, targetSection: "market-map" },
  { label: "Demo Benchmarks", icon: ClipboardList, targetSection: "action-plan" },
];

function layerItems(module, layer) {
  return Array.isArray(module?.[layer]) ? module[layer] : [];
}

function layerEvidenceRefs(module, layer) {
  return layerItems(module, layer).flatMap((item) => item.evidenceRefs ?? []);
}

function InsightLayerPanel({ activeModule, onEvidenceOpen }) {
  return (
    <aside className="refractured-insight-rail" aria-label="Insight Layers">
      <header>
        <h2>Insight Layers</h2>
        <span>Facts / estimates / interpretation / actions</span>
      </header>
      <div className="refractured-insight-tabs" aria-label="Insight layer counts">
        {layerOrder.map((layer) => (
          <button
            className={`refractured-layer-${layer}`}
            key={layer}
            type="button"
            onClick={() => onEvidenceOpen(layerEvidenceRefs(activeModule, layer))}
          >
            {layerLabels[layer]}
            <span>{layerItems(activeModule, layer).length}</span>
          </button>
        ))}
      </div>
      <div className="refractured-insight-stack">
        {layerOrder.map((layer) => {
          const allItems = layerItems(activeModule, layer);
          const items = allItems.slice(0, 2);
          const evidenceRefs = layerEvidenceRefs(activeModule, layer);
          return (
            <section className={`refractured-insight-panel refractured-layer-${layer}`} key={layer}>
              <h3>{layerLabels[layer]}</h3>
              {items.map((item) => (
                <article key={item.id}>
                  <p>{item.statement ?? item.recommendation}</p>
                  <span>{item.confidence}</span>
                </article>
              ))}
              <button
                type="button"
                onClick={() => onEvidenceOpen(evidenceRefs)}
              >
                View all {layerLabels[layer].toLowerCase()} ({allItems.length})
              </button>
            </section>
          );
        })}
      </div>
    </aside>
  );
}

function WorkspaceSidebar({ activeSection, marketEvidence, onSectionChange, report, sections }) {
  const closest = marketEvidence.comparables?.[0];

  return (
    <aside className="refractured-workspace-sidebar" aria-label="Refractured workspace navigation">
      <a className="refractured-workspace-brand" href="#">
        <span aria-hidden="true" />
        <strong>REFRACTURED</strong>
        <small>Market Intelligence Workspace</small>
      </a>
      <section className="refractured-workspace-project-card">
        {closest?.imageUrl ? <img alt="" src={closest.imageUrl} /> : null}
        <div>
          <strong>{report.meta.projectName}</strong>
          <span>Action Roguelite / 2.5D</span>
          <small>Private</small>
        </div>
      </section>
      <nav className="refractured-workspace-nav" aria-label="Market cockpit">
        <span>Market Cockpit</span>
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
      <nav className="refractured-quick-views" aria-label="Quick views">
        <span>Quick Views</span>
        {quickViews.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} type="button" onClick={() => onSectionChange(item.targetSection)}>
              <Icon size={15} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <section className="refractured-at-glance">
        <span>At a glance</span>
        <dl>
          <div>
            <dt>Market Fit</dt>
            <dd>71/100</dd>
          </div>
          <div>
            <dt>Commercial Potential</dt>
            <dd>High</dd>
          </div>
          <div>
            <dt>Competition Intensity</dt>
            <dd>Medium</dd>
          </div>
        </dl>
      </section>
    </aside>
  );
}

function WorkspaceTopbar({ activeSection, onFullEvidenceOpen, report }) {
  const [status, setStatus] = useState("Ready");

  async function copyWorkspaceLink() {
    const fallbackUrl = `${report.meta.primaryRoute}`;
    const href = typeof window === "undefined" ? fallbackUrl : window.location.href;

    try {
      await navigator.clipboard.writeText(href);
      setStatus("Workspace link copied");
    } catch {
      setStatus("Copy unavailable; use the browser address bar");
    }
  }

  function exportReportJson() {
    const payload = {
      exportedAt: new Date().toISOString(),
      activeSection,
      report,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.meta.projectName.toLowerCase()}-market-workspace.json`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("JSON export downloaded");
  }

  function saveWorkspaceView() {
    const savedView = {
      activeSection,
      savedAt: new Date().toISOString(),
      reportId: report.meta.id,
    };

    localStorage.setItem("refractured-market-workspace-view", JSON.stringify(savedView));
    setStatus("View saved in this browser");
  }

  return (
    <header className="refractured-workspace-topbar">
      <div>
        <span>Project</span>
        <strong>{report.meta.projectName}</strong>
      </div>
      <div>
        <span>Build</span>
        <strong>V5 / {report.meta.updatedAt}</strong>
      </div>
      <p className="refractured-workspace-status" aria-live="polite">
        {status}
      </p>
      <nav aria-label="Workspace actions">
        <button type="button" onClick={copyWorkspaceLink}>
          <Share2 size={15} aria-hidden="true" />
          Copy link
        </button>
        <button type="button" onClick={exportReportJson}>
          <Download size={15} aria-hidden="true" />
          Export JSON
        </button>
        <button type="button" onClick={saveWorkspaceView}>
          <Bookmark size={15} aria-hidden="true" />
          Save view
        </button>
        <button type="button" onClick={onFullEvidenceOpen}>
          <Layers3 size={15} aria-hidden="true" />
          Evidence
        </button>
      </nav>
    </header>
  );
}

function MarketWorkspaceShell({
  activeModule,
  activeSection,
  children,
  marketEvidence,
  onEvidenceOpen,
  onFullEvidenceOpen,
  onSectionChange,
  report,
  sections,
}) {
  return (
    <main className="refractured-report-shell refractured-market-workspace">
      <WorkspaceSidebar
        activeSection={activeSection}
        marketEvidence={marketEvidence}
        onSectionChange={onSectionChange}
        report={report}
        sections={sections}
      />
      <div className="refractured-workspace-main">
        <WorkspaceTopbar activeSection={activeSection} onFullEvidenceOpen={onFullEvidenceOpen} report={report} />
        {children}
      </div>
      <InsightLayerPanel activeModule={activeModule} onEvidenceOpen={onEvidenceOpen} />
    </main>
  );
}

export default MarketWorkspaceShell;
