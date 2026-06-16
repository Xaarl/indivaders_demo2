import { ArrowRight, Database, Eye, Target } from "lucide-react";

function DecisionDeck({ report, onSectionChange, onSourceDrawerOpen }) {
  const priorityActions = report.nextActions.slice(0, 3);

  return (
    <section className="decision-deck">
      <div className="decision-hero">
        <div>
          <p className="report-kicker">{report.meta.stage}</p>
          <h1>{report.meta.projectName}</h1>
          <p>{report.meta.promise}</p>
        </div>
        <aside className="report-summary-card">
          <span>{report.meta.title}</span>
          <strong>{report.meta.readTime}</strong>
          <p>Decision workspace: comparables, production reality, review risks, price pressure, actions, and sources.</p>
        </aside>
      </div>

      <div className="verdict-grid" aria-label="Report verdicts">
        {report.verdicts.map((verdict) => (
          <article className="verdict-card" key={verdict.id}>
            <span>{verdict.label}</span>
            <h2>{verdict.headline}</h2>
            <p>{verdict.decision}</p>
            <div className="card-footer">
              <strong>{verdict.confidence} confidence</strong>
              <button type="button" onClick={() => onSourceDrawerOpen(verdict.evidenceRefs)}>
                Sources
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="priority-panel">
        <div>
          <p className="report-kicker">Next moves</p>
          <h2>What this team should do first</h2>
        </div>
        <div className="priority-actions">
          {priorityActions.map((item, index) => (
            <article key={item.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.action}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="workspace-preview">
        <button type="button" onClick={() => onSectionChange("comparables")}>
          <Target size={18} aria-hidden="true" />
          Explore comparables
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onSectionChange("reviews")}>
          <Eye size={18} aria-hidden="true" />
          Inspect review risks
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onSectionChange("sources")}>
          <Database size={18} aria-hidden="true" />
          Open source log
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export default DecisionDeck;
