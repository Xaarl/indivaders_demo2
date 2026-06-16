import { ExternalLink, ShieldAlert, Target } from "lucide-react";
import { useMemo, useState } from "react";

function ComparableMap({ report, onSourceDrawerOpen }) {
  const [activeId, setActiveId] = useState(report.comparables[0]?.id);
  const activeComparable = useMemo(
    () => report.comparables.find((game) => game.id === activeId) ?? report.comparables[0],
    [activeId, report.comparables],
  );

  return (
    <section className="report-module comparable-module">
      <div className="module-heading">
        <p className="report-kicker">Comparable map</p>
        <h1>Which references are useful, and which ones distort the target?</h1>
      </div>

      <div className="comparable-layout">
        <div className="comparable-map" aria-label="Clickable comparable map">
          <span className="map-axis map-axis-y">Resource pressure</span>
          <span className="map-axis map-axis-x">Audience clarity</span>
          <div className="map-target">
            <Target size={18} aria-hidden="true" />
            Your game
          </div>

          {report.comparables.map((game) => (
            <button
              className={`map-node ${game.id === activeId ? "is-active" : ""}`}
              key={game.id}
              type="button"
              style={{ "--node-x": `${game.x}%`, "--node-y": `${game.y}%` }}
              onClick={() => setActiveId(game.id)}
            >
              <span>{game.title}</span>
              <small>{game.role}</small>
            </button>
          ))}
        </div>

        <article className="comparable-detail">
          <img src={activeComparable.imageUrl} alt="" />
          <span className="detail-label">{activeComparable.role}</span>
          <h2>{activeComparable.title}</h2>
          <div className="detail-grid">
            <div>
              <h3>Why it appears</h3>
              <p>{activeComparable.whyItAppears}</p>
            </div>
            <div>
              <h3>Why it is risky</h3>
              <p>{activeComparable.whyItIsRisky}</p>
            </div>
            <div>
              <h3>Safe lesson</h3>
              <p>{activeComparable.safeLesson}</p>
            </div>
            <div>
              <h3>Unsafe assumption</h3>
              <p>{activeComparable.unsafeAssumption}</p>
            </div>
          </div>
          <div className="detail-actions">
            <button type="button" onClick={() => onSourceDrawerOpen(activeComparable.evidenceRefs)}>
              <ShieldAlert size={17} aria-hidden="true" />
              Evidence
            </button>
            <a href={report.sources.find((source) => source.id === activeComparable.evidenceRefs[0])?.url} target="_blank" rel="noreferrer">
              <ExternalLink size={17} aria-hidden="true" />
              Open source
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ComparableMap;
