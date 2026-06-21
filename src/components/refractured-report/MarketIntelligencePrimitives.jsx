import { useId } from "react";
import { Database } from "lucide-react";
import { layerLabels, layerOrder } from "./marketIntelligenceLayers.js";

function refsFor(item) {
  return Array.isArray(item?.evidenceRefs) ? item.evidenceRefs : [];
}

export function ConfidenceTag({ confidence, level }) {
  const text = level && level !== confidence ? `${confidence} / ${level}` : confidence;

  if (!text) {
    return null;
  }

  return <span className={`refractured-confidence refractured-confidence-${String(confidence)}`}>{text}</span>;
}

function textForItem(item) {
  return item?.statement ?? item?.recommendation ?? item?.title ?? item?.label ?? item?.id ?? "evidence";
}

function refsForItems(items) {
  return items.flatMap((item) => refsFor(item));
}

export function EvidenceButton({ context, evidenceRefs, label = "Evidence", onEvidenceOpen }) {
  const refs = Array.isArray(evidenceRefs) ? evidenceRefs : [];
  const ariaLabel = context ? `${label}: ${context}` : `${label}${refs.length === 0 ? " unavailable" : ""}`;

  return (
    <button
      aria-label={ariaLabel}
      className="refractured-evidence-button"
      type="button"
      onClick={() => onEvidenceOpen(refs)}
    >
      <Database size={16} aria-hidden="true" />
      {label}
    </button>
  );
}

export function JobHeader({ eyebrow, title, summary }) {
  return (
    <div className="refractured-section-heading refractured-job-header">
      <p className="refractured-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      {summary ? <p>{summary}</p> : null}
    </div>
  );
}

export function LayerPanel({ idPrefix = "layer", items = [], layer, onEvidenceOpen }) {
  const label = layerLabels[layer] ?? layer;
  const titleId = `${idPrefix}-${layer}`;

  return (
    <section className={`refractured-layer-panel refractured-layer-${layer}`} aria-labelledby={titleId}>
      <h2 id={titleId}>{label}</h2>
      <div className="refractured-layer-items">
        {items.map((item) => (
          <article key={item.id}>
            <div className="refractured-layer-item-meta">
              <ConfidenceTag confidence={item.confidence} />
              <EvidenceButton
                context={`${label} layer: ${textForItem(item)}`}
                evidenceRefs={refsFor(item)}
                label="Sources"
                onEvidenceOpen={onEvidenceOpen}
              />
            </div>
            <p>{item.statement ?? item.recommendation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LayerStack({ idPrefix, module, onEvidenceOpen }) {
  const generatedId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const layerIdPrefix = idPrefix ?? `refractured-layer-${generatedId}`;

  return (
    <div className="refractured-layer-stack" aria-label="Evidence layers">
      {layerOrder.map((layer) => (
        <LayerPanel
          idPrefix={layerIdPrefix}
          items={Array.isArray(module?.[layer]) ? module[layer] : []}
          key={layer}
          layer={layer}
          onEvidenceOpen={onEvidenceOpen}
        />
      ))}
    </div>
  );
}

export function LayerSummaryStrip({ ariaLabel = "Evidence layer shortcuts", context = "this module", module, onEvidenceOpen }) {
  return (
    <div className="refractured-choice-strip" aria-label={ariaLabel}>
      {layerOrder.map((layer) => {
        const items = Array.isArray(module?.[layer]) ? module[layer] : [];
        const refs = refsForItems(items);
        const label = layerLabels[layer] ?? layer;

        return (
          <button
            aria-label={`Open ${label.toLowerCase()} evidence for ${context}`}
            key={layer}
            type="button"
            onClick={() => onEvidenceOpen(refs)}
          >
            {label} {items.length}
          </button>
        );
      })}
    </div>
  );
}

export function SignalFlow({ action, matter, signal }) {
  return (
    <div className="refractured-signal-flow" aria-label="Signal read">
      <section>
        <span>Raw signal</span>
        <p>{signal}</p>
      </section>
      <section>
        <span>Why it matters</span>
        <p>{matter}</p>
      </section>
      <section>
        <span>What to do next</span>
        <p>{action}</p>
      </section>
    </div>
  );
}

export function ChipRow({ items = [], label }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="refractured-chip-row" aria-label={label}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function DefinitionGrid({ items }) {
  return (
    <dl className="refractured-definition-grid">
      {items
        .filter((item) => item.value)
        .map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
    </dl>
  );
}
