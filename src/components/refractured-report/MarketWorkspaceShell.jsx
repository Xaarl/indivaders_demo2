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
  { label: "Wishlist Funnel", icon: LineChart },
  { label: "Price Proxy", icon: BarChart3 },
  { label: "Tag Performance", icon: Tag },
  { label: "Demo Benchmarks", icon: ClipboardList },
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
            <button key={item.label} type="button">
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

function WorkspaceTopbar({ onFullEvidenceOpen, report }) {
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
      <nav aria-label="Workspace actions">
        <button type="button">
          <Share2 size={15} aria-hidden="true" />
          Share internal
        </button>
        <button type="button">
          <Download size={15} aria-hidden="true" />
          Export
        </button>
        <button type="button">
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
        <WorkspaceTopbar onFullEvidenceOpen={onFullEvidenceOpen} report={report} />
        {children}
      </div>
      <InsightLayerPanel activeModule={activeModule} onEvidenceOpen={onEvidenceOpen} />
    </main>
  );
}

export default MarketWorkspaceShell;
