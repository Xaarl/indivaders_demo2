import { useState } from "react";
import { Database, DollarSign, ExternalLink, Star, Tags, Users } from "lucide-react";

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
  const [activeComparableId, setActiveComparableId] = useState(comparables[0]?.id);
  const visibleComparables =
    activeFilter === "All" ? comparables : comparables.filter((item) => item.filterTags.includes(activeFilter));
  const activeComparable =
    visibleComparables.find((item) => item.id === activeComparableId) ?? visibleComparables[0] ?? comparables[0];

  function handleFilterChange(filter) {
    const nextComparables =
      filter === "All" ? comparables : comparables.filter((item) => item.filterTags.includes(filter));

    setActiveFilter(filter);
    setActiveComparableId(nextComparables[0]?.id ?? comparables[0]?.id);
  }

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Comparable Explorer</p>
        <h1>Comparables should show market shape, not just vibes.</h1>
        <p>
          Filter the reference set, inspect current public Steam signals, then decide what Refractured can borrow,
          avoid, or prove before it has a Steam page.
        </p>
      </div>

      <div className="refractured-choice-strip" aria-label="Comparable filters">
        {filters.map((filter) => (
          <button
            aria-pressed={filter === activeFilter}
            className={filter === activeFilter ? "is-active" : ""}
            key={filter}
            type="button"
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {activeComparable ? (
        <div className="refractured-comparable-board">
          <div className="refractured-comparable-rail" aria-label="Comparable games">
            {visibleComparables.map((item) => (
              <button
                aria-pressed={item.id === activeComparable.id}
                className={item.id === activeComparable.id ? "is-active" : ""}
                key={item.id}
                type="button"
                onClick={() => setActiveComparableId(item.id)}
              >
                <img alt="" src={item.imageUrl} />
                <span>{item.role}</span>
                <strong>{item.title}</strong>
                <small>{item.marketLane}</small>
              </button>
            ))}
          </div>

          <article className="refractured-comparable-detail">
            <div className="refractured-comparable-hero">
              <img alt="" src={activeComparable.imageUrl} />
              <div>
                <span>{activeComparable.role}</span>
                <h2>{activeComparable.title}</h2>
                <p>{activeComparable.insight}</p>
              </div>
            </div>

            <div className="refractured-market-metrics" aria-label={`${activeComparable.title} Steam snapshot`}>
              <div>
                <Star size={17} aria-hidden="true" />
                <span>Reviews</span>
                <strong>{activeComparable.steamSnapshot.reviewTone}</strong>
                <small>
                  {activeComparable.steamSnapshot.reviews} total / {activeComparable.steamSnapshot.positiveRate}
                </small>
              </div>
              <div>
                <Users size={17} aria-hidden="true" />
                <span>Current players</span>
                <strong>{activeComparable.steamSnapshot.currentPlayers}</strong>
                <small>Steam Web API pulse</small>
              </div>
              <div>
                <DollarSign size={17} aria-hidden="true" />
                <span>Revenue proxy</span>
                <strong>{activeComparable.revenueProxy.grossRange}</strong>
                <small>{activeComparable.revenueProxy.unitRange}</small>
              </div>
              <div>
                <Tags size={17} aria-hidden="true" />
                <span>Store basics</span>
                <strong>{activeComparable.steamSnapshot.price}</strong>
                <small>{activeComparable.steamSnapshot.release}</small>
              </div>
            </div>

            <div className="refractured-chip-row" aria-label={`${activeComparable.title} tags`}>
              {activeComparable.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="refractured-comparable-read">
              <section>
                <span>Player signal</span>
                <p>{activeComparable.playerSignal}</p>
              </section>
              <section>
                <span>Refractured read</span>
                <p>{activeComparable.refracturedRead}</p>
              </section>
            </div>

            <dl className="refractured-comparable-lessons">
              <div>
                <dt>Borrow</dt>
                <dd>{activeComparable.borrow}</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>{activeComparable.avoid}</dd>
              </div>
              <div>
                <dt>Data caveat</dt>
                <dd>{activeComparable.revenueProxy.caveat}</dd>
              </div>
            </dl>

            <div className="refractured-comparable-actions">
              <a href={activeComparable.steamUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={16} aria-hidden="true" />
                Open Steam
              </a>
              <button type="button" onClick={() => onEvidenceOpen(activeComparable.evidenceRefs)}>
                <Database size={16} aria-hidden="true" />
                Evidence
              </button>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}

export default ComparableExplorer;
