import { useState } from "react";
import { Database } from "lucide-react";

function SignalList({ items, label }) {
  return (
    <div className="refractured-signal-list">
      <span>{label}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function PlayerSignalInspector({ onEvidenceOpen, signals }) {
  const [activeSignalId, setActiveSignalId] = useState(signals[0]?.id);
  const activeSignal = signals.find((signal) => signal.id === activeSignalId) ?? signals[0];

  return (
    <section className="refractured-module">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Player DNA</p>
        <h1>The target player is loyal, curious, and unforgiving about feel.</h1>
        <p>
          This report treats the player as a judge of contact, fairness, retry desire, and visual clarity. The goal is
          not to please every action fan; it is to prove the brutal roguelite promise to the right one.
        </p>
      </div>

      <div className="refractured-signal-inspector">
        <div className="refractured-signal-selector" aria-label="Player archetypes">
          {signals.map((signal) => (
            <button
              aria-pressed={signal.id === activeSignal?.id}
              className={signal.id === activeSignal?.id ? "is-active" : ""}
              key={signal.id}
              type="button"
              onClick={() => setActiveSignalId(signal.id)}
            >
              <strong>{signal.title}</strong>
              <span>{signal.proofSignal}</span>
            </button>
          ))}
        </div>

        {activeSignal ? (
          <article className="refractured-signal-detail">
            <h2>{activeSignal.title}</h2>
            <div className="refractured-signal-columns">
              <SignalList items={activeSignal.rewards} label="Rewards" />
              <SignalList items={activeSignal.rejects} label="Rejects" />
            </div>
            <p className="refractured-proof-question">{activeSignal.proofSignal}</p>
            <button type="button" onClick={() => onEvidenceOpen(activeSignal.evidenceRefs)}>
              <Database size={16} aria-hidden="true" />
              Evidence
            </button>
          </article>
        ) : null}
      </div>
    </section>
  );
}

export default PlayerSignalInspector;
