import { AlertTriangle, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

function ReviewRiskExplorer({ report, onSourceDrawerOpen }) {
  const [activeRiskId, setActiveRiskId] = useState(report.reviewRisks[0]?.id);
  const activeRisk = useMemo(
    () => report.reviewRisks.find((risk) => risk.id === activeRiskId) ?? report.reviewRisks[0],
    [activeRiskId, report.reviewRisks],
  );

  return (
    <section className="report-module review-module">
      <div className="module-heading">
        <p className="report-kicker">Review risk explorer</p>
        <h1>Turn nearby player friction into demo decisions.</h1>
      </div>

      <div className="risk-layout">
        <div className="risk-list" role="list">
          {report.reviewRisks.map((risk) => (
            <button
              className={risk.id === activeRiskId ? "is-active" : ""}
              key={risk.id}
              type="button"
              onClick={() => setActiveRiskId(risk.id)}
            >
              <span>{risk.severity}</span>
              <strong>{risk.label}</strong>
            </button>
          ))}
        </div>

        <article className="risk-detail">
          <div className="risk-title-row">
            <AlertTriangle size={24} aria-hidden="true" />
            <div>
              <span>{activeRisk.severity} risk</span>
              <h2>{activeRisk.label}</h2>
            </div>
          </div>
          <div className="risk-flow">
            <div>
              <span>Player signal</span>
              <p>{activeRisk.playerSignal}</p>
            </div>
            <ArrowRight size={18} aria-hidden="true" />
            <div>
              <span>Design meaning</span>
              <p>{activeRisk.designMeaning}</p>
            </div>
            <ArrowRight size={18} aria-hidden="true" />
            <div>
              <span>Action</span>
              <p>{activeRisk.action}</p>
            </div>
          </div>
          <button className="inline-source-link" type="button" onClick={() => onSourceDrawerOpen(activeRisk.evidenceRefs)}>
            Show evidence
          </button>
        </article>
      </div>
    </section>
  );
}

export default ReviewRiskExplorer;
