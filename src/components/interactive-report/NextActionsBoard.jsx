import { CheckCircle2 } from "lucide-react";

function NextActionsBoard({ report, onSourceDrawerOpen }) {
  return (
    <section className="report-module actions-module">
      <div className="module-heading">
        <p className="report-kicker">Next actions</p>
        <h1>What changes before players or creators see the page?</h1>
      </div>

      <div className="action-board">
        {report.nextActions.map((item, index) => (
          <article className="action-card" key={item.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{item.title}</h2>
            <p>{item.action}</p>
            <div>
              <strong>{item.impact}</strong>
              <small>{item.effort} effort</small>
            </div>
            <button type="button" onClick={() => onSourceDrawerOpen(item.evidenceRefs)}>
              <CheckCircle2 size={16} aria-hidden="true" />
              Evidence
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NextActionsBoard;
