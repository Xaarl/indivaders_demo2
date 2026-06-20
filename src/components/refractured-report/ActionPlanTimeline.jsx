import { Database } from "lucide-react";

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

function ActionPlanTimeline({ actions, onEvidenceOpen }) {
  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">30 / 90 / 365 Day Plan</p>
        <h1>The plan is not build more. It is prove, then scale.</h1>
        <p>Each step creates a visible artifact and a test signal that can change the next decision.</p>
      </div>

      <div className="refractured-timeline">
        {groupByPeriod(actions).map((group) => (
          <section key={group.period}>
            <h2>{group.period}</h2>
            <div className="refractured-action-list">
              {group.actions.map((action) => (
                <article key={action.id}>
                  <span>{action.title}</span>
                  <p>{action.outcome}</p>
                  <dl>
                    <div>
                      <dt>Artifact</dt>
                      <dd>{action.artifact}</dd>
                    </div>
                    <div>
                      <dt>Signal</dt>
                      <dd>{action.signal}</dd>
                    </div>
                  </dl>
                  <button type="button" onClick={() => onEvidenceOpen(action.evidenceRefs)}>
                    <Database size={16} aria-hidden="true" />
                    Evidence
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default ActionPlanTimeline;
