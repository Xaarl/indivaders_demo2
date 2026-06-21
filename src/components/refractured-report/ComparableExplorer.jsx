import { useMemo, useState } from "react";
import { DollarSign, ExternalLink, Star, Tags, Users } from "lucide-react";
import {
  ChipRow,
  ConfidenceTag,
  DefinitionGrid,
  EvidenceButton,
  JobHeader,
  LayerSummaryStrip,
  SignalFlow,
} from "./MarketIntelligencePrimitives.jsx";

const emptyComparables = [];

function collectFilters(comparables) {
  const tags = new Set();
  comparables.forEach((item) => item.filterTags?.forEach((tag) => tags.add(tag)));
  return ["All", ...Array.from(tags)];
}

function MetricTile({ children, icon: Icon, label, value }) {
  return (
    <div>
      <Icon size={17} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
      {children}
    </div>
  );
}

function ComparableExplorer({ marketEvidence, onEvidenceOpen }) {
  const comparables = marketEvidence.comparables ?? emptyComparables;
  const filters = useMemo(() => collectFilters(comparables), [comparables]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeComparableId, setActiveComparableId] = useState(comparables[0]?.id);
  const visibleComparables =
    activeFilter === "All" ? comparables : comparables.filter((item) => item.filterTags?.includes(activeFilter));
  const activeComparable =
    visibleComparables.find((item) => item.id === activeComparableId) ?? visibleComparables[0] ?? comparables[0];

  function handleFilterChange(filter) {
    const nextComparables =
      filter === "All" ? comparables : comparables.filter((item) => item.filterTags?.includes(filter));

    setActiveFilter(filter);
    setActiveComparableId(nextComparables[0]?.id ?? comparables[0]?.id);
  }

  return (
    <section className="refractured-module refractured-comparable-explorer">
      <JobHeader
        eyebrow="Comparable Explorer"
        title="Inspect references as market instruments."
        summary="Filter by decision use, then read one comparable through public signals, estimates, and transfer caveats."
      />

      <SignalFlow
        signal={marketEvidence.facts[1]?.statement}
        matter={marketEvidence.interpretation[1]?.statement}
        action={marketEvidence.actions[1]?.recommendation}
      />

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
      <LayerSummaryStrip
        ariaLabel="Comparable Explorer evidence layer shortcuts"
        context="the Comparable Explorer"
        module={marketEvidence}
        onEvidenceOpen={onEvidenceOpen}
      />

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
                <div className="refractured-layer-item-meta">
                  <span>{activeComparable.role}</span>
                  <ConfidenceTag confidence={activeComparable.confidence} />
                </div>
                <h2>{activeComparable.title}</h2>
                <p>{activeComparable.insight}</p>
              </div>
            </div>

            <div className="refractured-market-metrics" aria-label={`${activeComparable.title} Steam snapshot`}>
              <MetricTile icon={Star} label="Reviews" value={activeComparable.steamSnapshot.reviewTone}>
                <small>
                  {activeComparable.steamSnapshot.reviews} total / {activeComparable.steamSnapshot.positiveRate}
                </small>
              </MetricTile>
              <MetricTile icon={Users} label="Current players" value={activeComparable.steamSnapshot.currentPlayers}>
                <small>{activeComparable.sourceConfidence.currentPlayers} public API pulse</small>
              </MetricTile>
              <MetricTile icon={DollarSign} label="Gross proxy" value={activeComparable.estimateSnapshot.grossRange}>
                <small>{activeComparable.estimateSnapshot.unitRange}</small>
              </MetricTile>
              <MetricTile icon={Tags} label="Store basics" value={activeComparable.steamSnapshot.price}>
                <small>{activeComparable.steamSnapshot.release}</small>
              </MetricTile>
            </div>

            <ChipRow items={activeComparable.tags} label={`${activeComparable.title} tags`} />

            <DefinitionGrid
              items={[
                { label: "Raw public signal", value: activeComparable.publicSignal },
                { label: "Why it matters", value: activeComparable.refracturedRead },
                { label: "What to do next", value: activeComparable.borrow },
                { label: "Avoid", value: activeComparable.avoid },
                { label: "Tag caveat", value: activeComparable.sourceConfidence.owners },
                { label: "Revenue caveat", value: activeComparable.estimateSnapshot.caveat },
                { label: "Decision relevance", value: activeComparable.refracturedUse },
              ]}
            />

            <div className="refractured-comparable-actions">
              <a
                href={activeComparable.steamUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open Steam page for ${activeComparable.title}`}
              >
                <ExternalLink size={16} aria-hidden="true" />
                Open Steam
              </a>
              <EvidenceButton
                context={`${activeComparable.title} comparable`}
                evidenceRefs={activeComparable.evidenceRefs}
                onEvidenceOpen={onEvidenceOpen}
              />
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}

export default ComparableExplorer;
