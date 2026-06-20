import { useState } from "react";
import { Database } from "lucide-react";

function StrategicPathSelector({ onEvidenceOpen, paths }) {
  const [activePathId, setActivePathId] = useState(paths[0]?.id);
  const activePath = paths.find((path) => path.id === activePathId) ?? paths[0];

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Strategic Path Selector</p>
        <h1>Ambition should be earned by proof signals.</h1>
        <p>
          The first path is not the ambition ceiling. It is the cheapest way to learn whether Refractured has a market
          before the project expands.
        </p>
      </div>

      <div className="refractured-path-grid">
        {paths.map((path) => (
          <button
            aria-pressed={path.id === activePath.id}
            className={path.id === activePath.id ? "is-active" : ""}
            key={path.id}
            type="button"
            onClick={() => setActivePathId(path.id)}
          >
            <span>{path.label}</span>
            <strong>{path.when}</strong>
          </button>
        ))}
      </div>

      <article className="refractured-feature-panel">
        <span>{activePath.label}</span>
        <h2>{activePath.passSignal}</h2>
        <dl>
          <div>
            <dt>When</dt>
            <dd>{activePath.when}</dd>
          </div>
          <div>
            <dt>Commercial upside</dt>
            <dd>{activePath.buys}</dd>
          </div>
          <div>
            <dt>Risk</dt>
            <dd>{activePath.risks}</dd>
          </div>
        </dl>
        <button type="button" onClick={() => onEvidenceOpen(activePath.evidenceRefs)}>
          <Database size={16} aria-hidden="true" />
          Evidence
        </button>
      </article>
    </section>
  );
}

export default StrategicPathSelector;
