import {
  ConfidenceTag,
  DefinitionGrid,
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

      <div className="refractured-timeline">
        <LayerSummaryStrip
          ariaLabel="Action Plan evidence layer shortcuts"
          context="the Action Plan"
          module={actionPlan}
          onEvidenceOpen={onEvidenceOpen}
        />
        {groupByPeriod(actionPlan.timeline ?? []).map((group) => (
          <section key={group.period}>
            <h2>{group.period}</h2>
            <div className="refractured-action-list">
              {group.actions.map((action) => (
                <article key={action.id}>
                  <div className="refractured-layer-item-meta">
                    <span>{action.title}</span>
                    <ConfidenceTag confidence={action.confidence} />
                  </div>
                  <p>{action.outcome}</p>
                  <DefinitionGrid
                    items={[
                      { label: "Artifact", value: action.artifact },
                      { label: "Decision signal", value: action.signal },
                      { label: "What to do next", value: action.outcome },
                    ]}
                  />
                  <EvidenceButton
                    context={`${action.title} action`}
                    evidenceRefs={action.evidenceRefs}
                    onEvidenceOpen={onEvidenceOpen}
                  />
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="refractured-path-gates" aria-labelledby="path-gates-title">
        <div className="refractured-subsection-heading">
          <h2 id="path-gates-title">Path gates</h2>
          <p>Strategic ambition is earned by behavior signals, not by the first scope wish.</p>
        </div>
        <div className="refractured-path-grid" role="group" aria-label="Strategic path gates">
          {strategicPaths.map((path) => (
            <article key={path.id} className="refractured-path-card">
              <div className="refractured-layer-item-meta">
                <span>{path.label}</span>
                <ConfidenceTag confidence={path.confidence} />
              </div>
              <h2>{path.passSignal}</h2>
              <DefinitionGrid
                items={[
                  { label: "When", value: path.when },
                  { label: "Commercial upside", value: path.buys },
                  { label: "Risk", value: path.risks },
                ]}
              />
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
