import { useState } from "react";
import { Database } from "lucide-react";

const filters = [
  "All",
  "Closest market lane",
  "Useful mechanic lesson",
  "Audience expectation warning",
  "Scope trap",
  "Marketing clarity example",
  "Not safe as a benchmark",
];

function ComparableExplorer({ comparables, onEvidenceOpen }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleComparables =
    activeFilter === "All" ? comparables : comparables.filter((item) => item.filterTags.includes(activeFilter));

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Comparable Explorer</p>
        <h1>References are lessons, not forecasts.</h1>
        <p>
          Filter the market map by the job each comparable performs. The useful question is not whether Refractured is
          like this game, but what expectation this game teaches.
        </p>
      </div>

      <div className="refractured-choice-strip" aria-label="Comparable filters">
        {filters.map((filter) => (
          <button
            aria-pressed={filter === activeFilter}
            className={filter === activeFilter ? "is-active" : ""}
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="refractured-comparable-grid">
        {visibleComparables.map((item) => (
          <article key={item.id}>
            <span>{item.role}</span>
            <h2>{item.title}</h2>
            <p>{item.insight}</p>
            <dl>
              <div>
                <dt>Borrow</dt>
                <dd>{item.borrow}</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>{item.avoid}</dd>
              </div>
            </dl>
            <button type="button" onClick={() => onEvidenceOpen(item.evidenceRefs)}>
              <Database size={16} aria-hidden="true" />
              Evidence
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ComparableExplorer;
