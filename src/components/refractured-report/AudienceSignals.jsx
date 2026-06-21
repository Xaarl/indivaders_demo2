import { useState } from "react";
import {
  ConfidenceTag,
  DefinitionGrid,
  EvidenceButton,
  JobHeader,
  LayerSummaryStrip,
  SignalFlow,
} from "./MarketIntelligencePrimitives.jsx";

function ExpectationList({ items, label }) {
  return (
    <div className="refractured-expectation-list">
      <span>{label}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function AudienceSignals({ audienceSignals, onEvidenceOpen }) {
  const segments = audienceSignals.segments ?? [];
  const [activeSegmentId, setActiveSegmentId] = useState(segments[0]?.id);
  const activeSegment = segments.find((segment) => segment.id === activeSegmentId) ?? segments[0];

  return (
    <section className="refractured-module refractured-audience-signals">
      <JobHeader
        eyebrow="Audience Signals"
        title="Audience clusters are expectations to prove, not personas to decorate."
        summary="Each cluster turns public-market evidence into a testable expectation for the first playable slice."
      />

      <SignalFlow
        signal={audienceSignals.facts[0]?.statement}
        matter={audienceSignals.interpretation[0]?.statement}
        action={audienceSignals.actions[0]?.recommendation}
      />

      <div className="refractured-signal-inspector">
        <LayerSummaryStrip
          ariaLabel="Audience Signals evidence layer shortcuts"
          context="the Audience Signals module"
          module={audienceSignals}
          onEvidenceOpen={onEvidenceOpen}
        />
        <div className="refractured-signal-selector" aria-label="Audience expectation clusters">
          {segments.map((segment) => (
            <button
              aria-pressed={segment.id === activeSegment?.id}
              className={segment.id === activeSegment?.id ? "is-active" : ""}
              key={segment.id}
              type="button"
              onClick={() => setActiveSegmentId(segment.id)}
            >
              <strong>{segment.title}</strong>
              <span>{segment.proofSignal}</span>
            </button>
          ))}
        </div>

        {activeSegment ? (
          <article className="refractured-signal-detail">
            <div className="refractured-layer-item-meta">
              <ConfidenceTag confidence={activeSegment.confidence} />
              <EvidenceButton
                context={`${activeSegment.title} audience cluster`}
                evidenceRefs={activeSegment.evidenceRefs}
                label="Sources"
                onEvidenceOpen={onEvidenceOpen}
              />
            </div>
            <h2>{activeSegment.title}</h2>
            <div className="refractured-signal-columns">
              <ExpectationList items={activeSegment.rewards} label="Rewards" />
              <ExpectationList items={activeSegment.rejects} label="Rejects" />
            </div>
            <DefinitionGrid
              items={[
                { label: "Raw signal", value: activeSegment.proofSignal },
                { label: "Why it matters", value: activeSegment.rewards.join(", ") },
                { label: "What to do next", value: audienceSignals.actions[1]?.recommendation },
              ]}
            />
          </article>
        ) : null}
      </div>
    </section>
  );
}

export default AudienceSignals;
