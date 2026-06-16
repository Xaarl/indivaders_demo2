import { CheckCircle2, HelpCircle } from "lucide-react";

function ProductionReality({ report, onSourceDrawerOpen }) {
  const { productionReality } = report;

  return (
    <section className="report-module production-module">
      <div className="module-heading">
        <p className="report-kicker">Production reality</p>
        <h1>{productionReality.headline}</h1>
      </div>

      <div className="reality-strip">
        <article>
          <span>Looks similar</span>
          <p>{productionReality.realityStrip.looksSimilar}</p>
        </article>
        <article>
          <span>Actually different</span>
          <p>{productionReality.realityStrip.resourceDifference}</p>
        </article>
        <article>
          <span>Safe lesson</span>
          <p>{productionReality.realityStrip.safeLesson}</p>
        </article>
      </div>

      <div className="evidence-columns">
        <div>
          <h2>Confirmed or reported context</h2>
          {productionReality.facts.map((fact) => (
            <button className="fact-card" key={fact.label} type="button" onClick={() => onSourceDrawerOpen(fact.evidenceRefs)}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{fact.status}</span>
              <strong>{fact.label}</strong>
              <p>{fact.value}</p>
            </button>
          ))}
        </div>
        <div>
          <h2>Not used as facts</h2>
          {productionReality.unknowns.map((unknown) => (
            <article className="fact-card unknown-fact" key={unknown.label}>
              <HelpCircle size={18} aria-hidden="true" />
              <span>{unknown.status}</span>
              <strong>{unknown.label}</strong>
              <p>{unknown.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductionReality;
