import { ExternalLink } from "lucide-react";
import {
  ConfidenceTag,
  EvidenceButton,
  JobHeader,
  LayerSummaryStrip,
  SignalFlow,
} from "./MarketIntelligencePrimitives.jsx";

function MarketMap({ marketEvidence, onEvidenceOpen, thesis }) {
  const closest = marketEvidence.comparables.find((item) => item.id === "absolum") ?? marketEvidence.comparables[0];
  const unsafeBenchmarks = marketEvidence.comparables.filter((item) =>
    item.filterTags?.includes("Not safe as a benchmark"),
  );

  return (
    <section className="refractured-module refractured-market-map">
      <JobHeader
        eyebrow="Market Map"
        title="Map the lane before choosing the promise."
        summary={thesis.body}
      />

      <SignalFlow
        signal={marketEvidence.facts[0]?.statement}
        matter={marketEvidence.interpretation[0]?.statement}
        action={marketEvidence.actions[0]?.recommendation}
      />

      <section className="refractured-market-map-board" aria-labelledby="market-map-comparables">
        <div className="refractured-subsection-heading">
          <h2 id="market-map-comparables">Comparable lane map</h2>
          <p>Use each reference for a decision, not as a target to copy.</p>
        </div>
        <LayerSummaryStrip
          ariaLabel="Market Map evidence layer shortcuts"
          context="the Market Map"
          module={marketEvidence}
          onEvidenceOpen={onEvidenceOpen}
        />

        <div className="refractured-market-map-list">
          {marketEvidence.comparables.map((item) => (
            <article key={item.id} className="refractured-market-map-row">
              <div>
                <span>{item.role}</span>
                <h3>{item.title}</h3>
                <p>{item.marketLane}</p>
              </div>
              <div>
                <span>Raw public signal</span>
                <p>{item.publicSignal}</p>
              </div>
              <div>
                <span>Decision relevance</span>
                <p>{item.refracturedUse}</p>
              </div>
              <div className="refractured-row-actions">
                <ConfidenceTag confidence={item.confidence} />
                <a href={item.steamUrl} target="_blank" rel="noreferrer" aria-label={`Open Steam page for ${item.title}`}>
                  <ExternalLink size={15} aria-hidden="true" />
                  Steam
                </a>
                <EvidenceButton
                  context={`${item.title} comparable`}
                  evidenceRefs={item.evidenceRefs}
                  label="Sources"
                  onEvidenceOpen={onEvidenceOpen}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="refractured-market-map-note">
        <h2>Benchmark guardrails</h2>
        <p>
          Closest lane: {closest?.title}. Unsafe scale references:{" "}
          {unsafeBenchmarks.map((item) => item.title).join(", ") || "none marked"}.
        </p>
      </aside>
    </section>
  );
}

export default MarketMap;
