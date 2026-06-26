import { useMemo, useState } from "react";
import { DollarSign, ExternalLink, Sliders, Star, Tags, Users } from "lucide-react";
import {
  ChipRow,
  ConfidenceTag,
  EvidenceButton,
  JobHeader,
  LayerSummaryStrip,
  SignalFlow,
} from "./MarketIntelligencePrimitives.jsx";

const emptyComparables = [];
const roleFitScores = {
  "Closest market lane": 86,
  "Loop clarity benchmark": 78,
  "Dark mechanical identity": 74,
  "Hero variety and co-op pressure": 68,
  "Content pressure warning": 62,
  "Expectation ceiling": 56,
};
const sortOptions = [
  { id: "market-fit", label: "Market fit", compare: (left, right) => marketFitScore(right) - marketFitScore(left) },
  {
    id: "reviews",
    label: "Review volume",
    compare: (left, right) => (right.steamSnapshot?.reviewsTotal ?? 0) - (left.steamSnapshot?.reviewsTotal ?? 0),
  },
  {
    id: "players",
    label: "Current players",
    compare: (left, right) => (right.steamSnapshot?.currentPlayers ?? 0) - (left.steamSnapshot?.currentPlayers ?? 0),
  },
  {
    id: "newest",
    label: "Newest release",
    compare: (left, right) => releaseTime(right) - releaseTime(left),
  },
];

function collectFilters(comparables) {
  const tags = new Set();
  comparables.forEach((item) => item.filterTags?.forEach((tag) => tags.add(tag)));
  return ["All", ...Array.from(tags)];
}

function marketFitScore(item) {
  if (!item) return 0;
  if (typeof item.simulatedMarketFitScore === "number") {
    return item.simulatedMarketFitScore;
  }
  if (item.role && roleFitScores[item.role]) {
    return roleFitScores[item.role];
  }

  const positiveRate = Number.parseInt(item.steamSnapshot?.positiveRate, 10) || 70;
  const reviewVolume = Math.min(Number(item.steamSnapshot?.reviewsTotal ?? 0) / 5000, 12);
  return Math.round(Math.min(88, 42 + positiveRate * 0.34 + reviewVolume));
}

function formatPlayers(value) {
  if (!Number.isFinite(value)) {
    return "Missing";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

function releaseTime(item) {
  const timestamp = Date.parse(item.steamSnapshot?.release ?? "");
  return Number.isFinite(timestamp) ? timestamp : 0;
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

function ComparableCard({ active, item, onEvidenceOpen, onInspect, onToggleCompare, selected }) {
  const score = marketFitScore(item);

  return (
    <article className={`refractured-comparable-card${active ? " is-active" : ""}`}>
      <button className="refractured-card-inspect" type="button" onClick={() => onInspect(item.id)}>
        <img alt="" src={item.imageUrl} />
        <span className="refractured-market-fit-badge">{score} fit</span>
      </button>
      <div className="refractured-card-body">
        <div className="refractured-layer-item-meta">
          <span>{item.role}</span>
          <ConfidenceTag confidence={item.confidence} />
        </div>
        <h2>{item.title}</h2>
        <p>{item.marketLane}</p>

        <dl className="refractured-card-metrics" aria-label={`${item.title} public market snapshot`}>
          <div>
            <dt>Price</dt>
            <dd>{item.steamSnapshot.price}</dd>
          </div>
          <div>
            <dt>Reviews</dt>
            <dd>{item.steamSnapshot.reviews}</dd>
          </div>
          <div>
            <dt>Positive</dt>
            <dd>{item.steamSnapshot.positiveRate}</dd>
          </div>
          <div>
            <dt>CCU</dt>
            <dd>{formatPlayers(item.steamSnapshot.currentPlayers)}</dd>
          </div>
        </dl>

        <div className="refractured-card-layer-list" aria-label={`${item.title} insight layers`}>
          <p>
            <span>Facts</span>
            {item.steamSnapshot.reviewTone} / {item.steamSnapshot.release}
          </p>
          <p>
            <span>Estimates</span>
            {item.estimateSnapshot.ownerRange}
          </p>
          <p>
            <span>Interpretation</span>
            {item.refracturedRead}
          </p>
          <p>
            <span>Actions</span>
            {item.borrow}
          </p>
        </div>

        <ChipRow items={item.tags.slice(0, 5)} label={`${item.title} key tags`} />

        <div className="refractured-comparable-actions">
          <button type="button" onClick={() => onToggleCompare(item.id)}>
            {selected ? "Added to compare" : "Add to compare"}
          </button>
          <EvidenceButton
            context={`${item.title} comparable`}
            evidenceRefs={item.evidenceRefs}
            label="Sources"
            onEvidenceOpen={onEvidenceOpen}
          />
          <a href={item.steamUrl} target="_blank" rel="noreferrer" aria-label={`Open Steam page for ${item.title}`}>
            <ExternalLink size={16} aria-hidden="true" />
            Steam
          </a>
        </div>
      </div>
    </article>
  );
}

function ComparisonDock({ comparables, selectedIds, onClear, onToggleCompare }) {
  const selectedComparables = selectedIds
    .map((id) => comparables.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <section className="refractured-compare-dock" aria-label="Selected comparable comparison">
      <header>
        <div>
          <span>Comparing {selectedComparables.length} games</span>
          <strong>
            {selectedComparables.length
              ? selectedComparables.map((item) => item.title).join(" / ")
              : "Add games to compare"}
          </strong>
        </div>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </header>
      <div className="refractured-compare-table" role="table" aria-label="Comparable core metrics">
        <div role="row">
          <span role="columnheader">Metric</span>
          {selectedComparables.map((item) => (
            <span role="columnheader" key={item.id}>
              {item.title}
            </span>
          ))}
        </div>
        {[
          ["Market fit", (item) => `${marketFitScore(item)}/100`],
          ["Price", (item) => item.steamSnapshot.price],
          ["Review tone", (item) => `${item.steamSnapshot.reviewTone} (${item.steamSnapshot.positiveRate})`],
          ["Current players", (item) => formatPlayers(item.steamSnapshot.currentPlayers)],
          ["Owners proxy", (item) => item.estimateSnapshot.ownerRange],
          ["Gross proxy", (item) => item.estimateSnapshot.grossRange],
        ].map(([label, reader]) => (
          <div role="row" key={label}>
            <span role="rowheader">{label}</span>
            {selectedComparables.map((item) => (
              <span role="cell" key={item.id}>
                {reader(item)}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="refractured-compare-pills" aria-label="Remove comparables">
        {selectedComparables.map((item) => (
          <button key={item.id} type="button" onClick={() => onToggleCompare(item.id)}>
            {item.title}
          </button>
        ))}
      </div>
    </section>
  );
}

function MarketPositionStrip({ activeComparable, sortedComparables }) {
  return (
    <div className="refractured-market-position-strip">
      <section>
        <h2>Market Position Map</h2>
        <p>Bubble position is a planning read, not a sales forecast.</p>
        <div className="refractured-position-map" aria-label="Market fit position map">
          {sortedComparables.map((item, index) => (
            <span
              aria-label={`${item.title}: ${marketFitScore(item)} market fit`}
              className={item.id === activeComparable.id ? "is-active" : ""}
              key={item.id}
              style={{
                "--rf-x": `${16 + index * 13}%`,
                "--rf-y": `${82 - marketFitScore(item) * 0.72}%`,
              }}
            >
              {item.title}
            </span>
          ))}
        </div>
      </section>
      <section>
        <h2>Selected Read</h2>
        <p>{activeComparable.insight}</p>
        <div className="refractured-market-metrics" aria-label={`${activeComparable.title} Steam snapshot`}>
          <MetricTile icon={Star} label="Reviews" value={activeComparable.steamSnapshot.reviewTone}>
            <small>
              {activeComparable.steamSnapshot.reviews} total / {activeComparable.steamSnapshot.positiveRate}
            </small>
          </MetricTile>
          <MetricTile
            icon={Users}
            label="Current players"
            value={formatPlayers(activeComparable.steamSnapshot.currentPlayers)}
          >
            <small>{activeComparable.sourceConfidence.currentPlayers} public API pulse</small>
          </MetricTile>
          <MetricTile icon={DollarSign} label="Gross proxy" value={activeComparable.estimateSnapshot.grossRange}>
            <small>{activeComparable.estimateSnapshot.unitRange}</small>
          </MetricTile>
          <MetricTile icon={Tags} label="Store basics" value={activeComparable.steamSnapshot.price}>
            <small>{activeComparable.steamSnapshot.release}</small>
          </MetricTile>
        </div>
      </section>
      <section>
        <h2>White Space Indicators</h2>
        <ul>
          <li>2.5D brawler plus roguelite tactical depth</li>
          <li>Brutal contact feel with readable fairness</li>
          <li>Run choices that change combat behavior</li>
          <li>Steam page promise that avoids generic dark brawler framing</li>
        </ul>
      </section>
    </div>
  );
}

function ComparableExplorer({ marketEvidence, onEvidenceOpen }) {
  const comparables = marketEvidence.comparables ?? emptyComparables;
  const filters = useMemo(() => collectFilters(comparables), [comparables]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeComparableId, setActiveComparableId] = useState(comparables[0]?.id);
  const [viewMode, setViewMode] = useState("grid");
  const [sortMode, setSortMode] = useState(sortOptions[0].id);
  const [selectedComparableIds, setSelectedComparableIds] = useState(() =>
    comparables.slice(0, 3).map((item) => item.id),
  );

  // What-If Sandbox local states
  const [minCcu, setMinCcu] = useState(0);
  const [maxPrice, setMaxPrice] = useState(60);
  const [positiveWeight, setPositiveWeight] = useState(0.34);
  const [baseOffset, setBaseOffset] = useState(42);
  const [reviewsWeight, setReviewsWeight] = useState(1.0);

  function resetSandbox() {
    setMinCcu(0);
    setMaxPrice(60);
    setPositiveWeight(0.34);
    setBaseOffset(42);
    setReviewsWeight(1.0);
  }

  const simulatedComparables = useMemo(() => {
    return comparables.map((item) => {
      const baseScore = roleFitScores[item.role]
        ? roleFitScores[item.role]
        : Math.round(
            42 +
              (Number.parseInt(item.steamSnapshot?.positiveRate, 10) || 70) * positiveWeight +
              Math.min(Number(item.steamSnapshot?.reviewsTotal ?? 0) / 5000, 12) * reviewsWeight,
          );
      const score = Math.max(0, Math.min(100, baseScore + (baseOffset - 42)));
      return {
        ...item,
        simulatedMarketFitScore: score,
      };
    });
  }, [comparables, positiveWeight, baseOffset, reviewsWeight]);

  const visibleComparables = useMemo(() => {
    let filtered = activeFilter === "All"
      ? simulatedComparables
      : simulatedComparables.filter((item) => item.filterTags?.includes(activeFilter));

    // CCU filter
    if (minCcu > 0) {
      filtered = filtered.filter(
        (item) => (item.steamSnapshot?.currentPlayers ?? 0) >= minCcu
      );
    }

    // Price filter
    filtered = filtered.filter((item) => {
      const priceStr = item.steamSnapshot?.price ?? "$0.00";
      if (/free/i.test(priceStr)) return true;
      const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
      return isNaN(num) || num <= maxPrice;
    });

    return filtered;
  }, [simulatedComparables, activeFilter, minCcu, maxPrice]);

  const activeSort = sortOptions.find((option) => option.id === sortMode) ?? sortOptions[0];
  const sortedComparables = useMemo(() => {
    return [...visibleComparables].sort(activeSort.compare);
  }, [visibleComparables, activeSort]);

  const activeComparable = useMemo(() => {
    return sortedComparables.find((item) => item.id === activeComparableId) ?? sortedComparables[0] ?? simulatedComparables[0];
  }, [sortedComparables, activeComparableId, simulatedComparables]);

  function handleFilterChange(filter) {
    const nextComparables =
      filter === "All" ? simulatedComparables : simulatedComparables.filter((item) => item.filterTags?.includes(filter));

    setActiveFilter(filter);
    setActiveComparableId(nextComparables[0]?.id ?? simulatedComparables[0]?.id);
  }

  function toggleCompare(comparableId) {
    setSelectedComparableIds((current) => {
      if (current.includes(comparableId)) {
        return current.filter((id) => id !== comparableId);
      }

      return [...current.slice(-2), comparableId];
    });
  }

  function clearComparison() {
    setSelectedComparableIds([]);
  }

  function cycleSortMode() {
    const activeIndex = sortOptions.findIndex((option) => option.id === sortMode);
    const nextSort = sortOptions[(activeIndex + 1) % sortOptions.length] ?? sortOptions[0];
    setSortMode(nextSort.id);
  }

  return (
    <section className="refractured-module refractured-comparable-explorer">
      <JobHeader
        eyebrow="Comparable Market Board"
        title="Start with the market board, then decide what Refractured should prove."
        summary="Use Steam-facing facts, rough estimates, interpretation, and actions as separate layers. The goal is not to copy any one game; it is to see which proof would make Refractured more sellable."
      />

      <SignalFlow
        signal={marketEvidence.facts[1]?.statement}
        matter={marketEvidence.interpretation[1]?.statement}
        action={marketEvidence.actions[1]?.recommendation}
      />

      {/* What-If Simulation Sandbox Panel */}
      <div className="refractured-what-if-sandbox">
        <div className="sandbox-header">
          <Sliders size={18} />
          <h3>What-If Simulation Sandbox</h3>
          <p className="sandbox-tagline">Adjust weights & thresholds locally to model different market hypotheses</p>
        </div>
        
        <div className="sandbox-controls">
          <div className="control-group">
            <label>
              <span>Min CCU (Current Players): <strong>{minCcu === 0 ? "Any" : `${minCcu}+`}</strong></span>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500" 
                value={minCcu} 
                onChange={(e) => setMinCcu(Number(e.target.value))} 
              />
            </label>
          </div>
          
          <div className="control-group">
            <label>
              <span>Max Price: <strong>${maxPrice}</strong></span>
              <input 
                type="range" 
                min="0" 
                max="60" 
                step="5" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))} 
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              <span>Positive Review Weight: <strong>{positiveWeight.toFixed(2)}</strong></span>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05" 
                value={positiveWeight} 
                onChange={(e) => setPositiveWeight(Number(e.target.value))} 
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              <span>Review Vol Importance: <strong>{reviewsWeight.toFixed(1)}x</strong></span>
              <input 
                type="range" 
                min="0.2" 
                max="2.5" 
                step="0.1" 
                value={reviewsWeight} 
                onChange={(e) => setReviewsWeight(Number(e.target.value))} 
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              <span>Base Offset: <strong>{baseOffset}</strong></span>
              <input 
                type="range" 
                min="20" 
                max="60" 
                step="1" 
                value={baseOffset} 
                onChange={(e) => setBaseOffset(Number(e.target.value))} 
              />
            </label>
          </div>
        </div>
        
        <button className="sandbox-reset-btn" type="button" onClick={resetSandbox}>
          Reset Parameters
        </button>
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
      <LayerSummaryStrip
        ariaLabel="Comparable Market Board evidence layer shortcuts"
        context="the Comparable Market Board"
        module={marketEvidence}
        onEvidenceOpen={onEvidenceOpen}
      />

      {activeComparable ? (
        <div className={`refractured-comparable-board${viewMode === "map" ? " is-map-mode" : ""}`}>
          <div className="refractured-comparable-toolbar">
            <p>{sortedComparables.length} games match</p>
            <div className="refractured-comparable-view-switch">
              <button
                aria-pressed={viewMode === "grid"}
                className={viewMode === "grid" ? "is-active" : ""}
                type="button"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
              <button
                aria-pressed={viewMode === "map"}
                className={viewMode === "map" ? "is-active" : ""}
                type="button"
                onClick={() => setViewMode("map")}
              >
                Market map
              </button>
              <button type="button" onClick={cycleSortMode}>
                Sort by: {activeSort.label}
              </button>
            </div>
          </div>

          {viewMode === "map" ? <MarketPositionStrip activeComparable={activeComparable} sortedComparables={sortedComparables} /> : null}

          <div className="refractured-comparable-card-grid" aria-label="Steam comparable cards">
            {sortedComparables.map((item) => (
              <ComparableCard
                active={item.id === activeComparable.id}
                item={item}
                key={item.id}
                onEvidenceOpen={onEvidenceOpen}
                onInspect={setActiveComparableId}
                onToggleCompare={toggleCompare}
                selected={selectedComparableIds.includes(item.id)}
              />
            ))}
          </div>

          {viewMode === "grid" ? <MarketPositionStrip activeComparable={activeComparable} sortedComparables={sortedComparables} /> : null}

          <ComparisonDock
            comparables={simulatedComparables}
            onClear={clearComparison}
            onToggleCompare={toggleCompare}
            selectedIds={selectedComparableIds}
          />

          <article className="refractured-comparable-active-read">
            <div>
              <span>Raw signal</span>
              <p>{activeComparable.publicSignal}</p>
            </div>
            <div>
              <span>Why it matters</span>
              <p>{activeComparable.refracturedRead}</p>
            </div>
            <div>
              <span>What to do next</span>
              <p>{activeComparable.borrow}</p>
            </div>
            <div>
              <span>Caveat</span>
              <p>{activeComparable.estimateSnapshot.caveat}</p>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}

export default ComparableExplorer;
