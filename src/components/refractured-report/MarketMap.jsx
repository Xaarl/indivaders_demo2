import { useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  ConfidenceTag,
  EvidenceButton,
  JobHeader,
  LayerSummaryStrip,
  SignalFlow,
} from "./MarketIntelligencePrimitives.jsx";

const marketPositions = {
  absolum: { x: 58, y: 62, lane: "closest" },
  rotwood: { x: 74, y: 52, lane: "scope" },
  "dead-cells": { x: 68, y: 82, lane: "loop" },
  "hades-ii": { x: 86, y: 76, lane: "ceiling" },
  ravenswatch: { x: 78, y: 42, lane: "scope" },
  "curse-of-the-dead-gods": { x: 50, y: 70, lane: "identity" },
};

function reviewsSize(item) {
  const reviews = item.steamSnapshot?.reviewsTotal ?? 0;
  return Math.max(34, Math.min(84, 30 + Math.log10(Math.max(reviews, 10)) * 9));
}

function marketPosition(item, index) {
  return marketPositions[item.id] ?? { x: 30 + index * 8, y: 48 + index * 5, lane: "reference" };
}

function MarketMap({ marketEvidence, onEvidenceOpen, thesis }) {
  const closest = marketEvidence.comparables.find((item) => item.id === "absolum") ?? marketEvidence.comparables[0];
  const unsafeBenchmarks = marketEvidence.comparables.filter((item) =>
    item.filterTags?.includes("Not safe as a benchmark"),
  );
  const [activeComparableId, setActiveComparableId] = useState(closest?.id);
  const activeComparable =
    marketEvidence.comparables.find((item) => item.id === activeComparableId) ?? closest ?? marketEvidence.comparables[0];

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

        <div className="refractured-market-map-workspace">
          <div className="refractured-market-bubble-map" aria-label="Comparable market position map">
            <span className="refractured-axis refractured-axis-x">Combat focus</span>
            <span className="refractured-axis refractured-axis-y">Roguelite depth</span>
            {marketEvidence.comparables.map((item, index) => {
              const position = marketPosition(item, index);
              return (
                <button
                  aria-pressed={item.id === activeComparable.id}
                  aria-label={`${item.title}: ${item.role}`}
                  className={`refractured-market-bubble refractured-market-lane-${position.lane}${
                    item.id === activeComparable.id ? " is-active" : ""
                  }`}
                  key={item.id}
                  style={{
                    "--rf-x": `${position.x}%`,
                    "--rf-y": `${100 - position.y}%`,
                    "--rf-size": `${reviewsSize(item)}px`,
                  }}
                  type="button"
                  onClick={() => setActiveComparableId(item.id)}
                >
                  <strong>{item.title}</strong>
                  <small>{item.steamSnapshot.positiveRate}</small>
                </button>
              );
            })}
          </div>

          <article className="refractured-market-map-detail-panel">
            <img alt="" src={activeComparable.imageUrl} />
            <div>
              <div className="refractured-layer-item-meta">
                <span>{activeComparable.role}</span>
                <ConfidenceTag confidence={activeComparable.confidence} />
              </div>
              <h2>{activeComparable.title}</h2>
              <p>{activeComparable.marketLane}</p>
            </div>
            <dl>
              <div>
                <dt>Raw public signal</dt>
                <dd>{activeComparable.publicSignal}</dd>
              </div>
              <div>
                <dt>Decision relevance</dt>
                <dd>{activeComparable.refracturedUse}</dd>
              </div>
              <div>
                <dt>Transfer risk</dt>
                <dd>{activeComparable.avoid}</dd>
              </div>
            </dl>
            <div className="refractured-row-actions">
              <a
                href={activeComparable.steamUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open Steam page for ${activeComparable.title}`}
              >
                <ExternalLink size={15} aria-hidden="true" />
                Steam
              </a>
              <EvidenceButton
                context={`${activeComparable.title} comparable`}
                evidenceRefs={activeComparable.evidenceRefs}
                label="Sources"
                onEvidenceOpen={onEvidenceOpen}
              />
            </div>
          </article>
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
