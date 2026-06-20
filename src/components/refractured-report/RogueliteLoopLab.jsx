import { useState } from "react";
import { Database } from "lucide-react";

function RogueliteLoopLab({ directions, onEvidenceOpen }) {
  const [activeDirectionId, setActiveDirectionId] = useState(directions[0]?.id);
  const activeDirection = directions.find((direction) => direction.id === activeDirectionId) ?? directions[0];

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Roguelite Loop Lab</p>
        <h1>The roguelite layer has to change behavior, not decorate the brawler.</h1>
        <p>
          Refractured should test which run structure makes the combat more sellable before committing to large content
          production.
        </p>
      </div>

      <div className="refractured-choice-strip" role="tablist" aria-label="Roguelite directions">
        {directions.map((direction) => (
          <button
            aria-selected={direction.id === activeDirection.id}
            className={direction.id === activeDirection.id ? "is-active" : ""}
            key={direction.id}
            type="button"
            onClick={() => setActiveDirectionId(direction.id)}
          >
            {direction.label}
          </button>
        ))}
      </div>

      <article className="refractured-feature-panel">
        <span>{activeDirection.label}</span>
        <h2>{activeDirection.promise}</h2>
        <dl>
          <div>
            <dt>Best for</dt>
            <dd>{activeDirection.bestFor}</dd>
          </div>
          <div>
            <dt>Risk</dt>
            <dd>{activeDirection.risk}</dd>
          </div>
          <div>
            <dt>Proof</dt>
            <dd>{activeDirection.proof}</dd>
          </div>
        </dl>
        <button type="button" onClick={() => onEvidenceOpen(activeDirection.evidenceRefs)}>
          <Database size={16} aria-hidden="true" />
          Evidence
        </button>
      </article>
    </section>
  );
}

export default RogueliteLoopLab;
