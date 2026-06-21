import {
  ConfidenceTag,
  EvidenceButton,
  JobHeader,
  LayerSummaryStrip,
  SignalFlow,
} from "./MarketIntelligencePrimitives.jsx";

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

function periodLabel(period) {
  if (period === "0-30 days") {
    return "Now";
  }

  if (period === "30-90 days") {
    return "Next";
  }

  return "Scale decision";
}

function ProofGateCard({ action, index, onEvidenceOpen }) {
  return (
    <article className="refractured-proof-gate-card">
      <div className="refractured-proof-gate-index">{String(index + 1).padStart(2, "0")}</div>
      <div className="refractured-proof-gate-body">
        <div className="refractured-layer-item-meta">
          <span>Proof gate</span>
          <ConfidenceTag confidence={action.confidence} />
        </div>
        <h3>{action.title}</h3>
        <dl className="refractured-proof-gate-metrics">
          <div>
            <dt>Artifact</dt>
            <dd>{action.artifact}</dd>
          </div>
          <div>
            <dt>Success signal</dt>
            <dd>{action.signal}</dd>
          </div>
          <div>
            <dt>Decision</dt>
            <dd>{action.outcome}</dd>
          </div>
        </dl>
      </div>
      <EvidenceButton
        context={`${action.title} proof gate`}
        evidenceRefs={action.evidenceRefs}
        onEvidenceOpen={onEvidenceOpen}
      />
    </article>
  );
}

function ActionPlanTimeline({ actionPlan, onEvidenceOpen, strategicPaths = [] }) {
  return (
    <section className="refractured-module refractured-action-plan">
      <JobHeader
        eyebrow="Action Plan"
        title="Prove the market promise before expanding scope."
        summary="The plan turns the report into proof gates, timeline artifacts, and path decisions that can change with evidence."
      />

      <SignalFlow
        signal={actionPlan.facts[0]?.statement}
        matter={actionPlan.interpretation[0]?.statement}
        action={actionPlan.actions[0]?.recommendation}
      />

      <div className="refractured-proof-gate-shell">
        <LayerSummaryStrip
          ariaLabel="Action Plan evidence layer shortcuts"
          context="the Action Plan"
          module={actionPlan}
          onEvidenceOpen={onEvidenceOpen}
        />
        <div className="refractured-proof-gate-timeline" aria-label="Proof-gate timeline">
          {groupByPeriod(actionPlan.timeline ?? []).map((group) => (
            <section className="refractured-proof-gate-period" key={group.period}>
              <header>
                <span>{periodLabel(group.period)}</span>
                <h2>{group.period}</h2>
                <p>{group.actions.length} decision gate{group.actions.length === 1 ? "" : "s"}</p>
              </header>
              <div className="refractured-proof-gate-track">
                {group.actions.map((action, index) => (
                  <ProofGateCard action={action} index={index} key={action.id} onEvidenceOpen={onEvidenceOpen} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="refractured-path-gates" aria-labelledby="path-gates-title">
        <div className="refractured-subsection-heading">
          <h2 id="path-gates-title">Path gates</h2>
          <p>Strategic ambition is earned by behavior signals, not by the first scope wish.</p>
        </div>
        <div className="refractured-path-decision-ladder" role="group" aria-label="Strategic path gates">
          {strategicPaths.map((path) => (
            <article key={path.id} className="refractured-path-card">
              <div className="refractured-layer-item-meta">
                <span>{path.label}</span>
                <ConfidenceTag confidence={path.confidence} />
              </div>
              <h2>{path.passSignal}</h2>
              <dl className="refractured-proof-gate-metrics">
                <div>
                  <dt>When</dt>
                  <dd>{path.when}</dd>
                </div>
                <div>
                  <dt>Commercial upside</dt>
                  <dd>{path.buys}</dd>
                </div>
                <div>
                  <dt>Risk</dt>
                  <dd>{path.risks}</dd>
                </div>
              </dl>
              <EvidenceButton
                context={`${path.label} path gate`}
                evidenceRefs={path.evidenceRefs}
                label="Sources"
                onEvidenceOpen={onEvidenceOpen}
              />
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default ActionPlanTimeline;
