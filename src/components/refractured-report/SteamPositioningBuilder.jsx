import { useState } from "react";
import { Database } from "lucide-react";

function SteamPositioningBuilder({ onEvidenceOpen, positioningAngles }) {
  const [activeAngleId, setActiveAngleId] = useState(positioningAngles[0]?.id);
  const activeAngle = positioningAngles.find((angle) => angle.id === activeAngleId) ?? positioningAngles[0];

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Steam Page And Trailer Builder</p>
        <h1>The first five seconds should sell the playable fantasy, not list systems.</h1>
        <p>
          Select a positioning angle and inspect how it changes the Steam promise, tag stack, trailer opening, demo call
          to action, and creator pitch.
        </p>
      </div>

      <div className="refractured-choice-strip" aria-label="Positioning angles">
        {positioningAngles.map((angle) => (
          <button
            aria-pressed={angle.id === activeAngle.id}
            className={angle.id === activeAngle.id ? "is-active" : ""}
            key={angle.id}
            type="button"
            onClick={() => setActiveAngleId(angle.id)}
          >
            {angle.label}
          </button>
        ))}
      </div>

      <article className="refractured-feature-panel">
        <span>{activeAngle.label}</span>
        <h2>{activeAngle.steamPromise}</h2>
        <div className="refractured-chip-row">
          {activeAngle.tagStack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <ol className="refractured-trailer-beats">
          {activeAngle.trailerBeats.map((beat) => (
            <li key={beat}>{beat}</li>
          ))}
        </ol>
        <dl>
          <div>
            <dt>Demo CTA</dt>
            <dd>{activeAngle.demoCta}</dd>
          </div>
          <div>
            <dt>Creator pitch</dt>
            <dd>{activeAngle.creatorPitch}</dd>
          </div>
        </dl>
        <button type="button" onClick={() => onEvidenceOpen(activeAngle.evidenceRefs)}>
          <Database size={16} aria-hidden="true" />
          Evidence
        </button>
      </article>
    </section>
  );
}

export default SteamPositioningBuilder;
