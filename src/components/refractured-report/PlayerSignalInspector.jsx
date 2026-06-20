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
      <div className="refractured-signal-grid">
        {signals.map((signal) => (
          <article key={signal.id}>
            <h2>{signal.title}</h2>
            <div className="refractured-signal-columns">
              <SignalList items={signal.rewards} label="Rewards" />
              <SignalList items={signal.rejects} label="Rejects" />
            </div>
            <p className="refractured-proof-question">{signal.proofSignal}</p>
            <button type="button" onClick={() => onEvidenceOpen(signal.evidenceRefs)}>
              <Database size={16} aria-hidden="true" />
              Evidence
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PlayerSignalInspector;
