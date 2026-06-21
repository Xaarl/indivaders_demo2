import { ExternalLink } from "lucide-react";
import { ConfidenceTag, JobHeader, SignalFlow } from "./MarketIntelligencePrimitives.jsx";
import { layerLabels, layerOrder } from "./marketIntelligenceLayers.js";

const ledgerLayerMap = {
  facts: new Set(["confirmed", "reported"]),
  estimates: new Set(["estimated"]),
  interpretation: new Set(["inferred"]),
  actions: new Set(["missing"]),
};

function entriesForLayer(evidenceLedger, layer) {
  const levels = ledgerLayerMap[layer];
  return evidenceLedger.filter((item) => levels.has(item.level ?? item.confidence));
}

function EvidenceLedgerPage({ evidenceLedger }) {
  const factCount = entriesForLayer(evidenceLedger, "facts").length;
  const gapCount = entriesForLayer(evidenceLedger, "actions").length;

  return (
    <section className="refractured-module refractured-evidence-ledger-page">
      <JobHeader
        eyebrow="Evidence Ledger"
        title="Trace each claim to its confidence level."
        summary="Confirmed and reported sources anchor facts; estimated and inferred sources mark uncertainty; missing records become research actions."
      />

      <SignalFlow
        signal={`${factCount} confirmed or reported records are available in the V4 ledger.`}
        matter="The report can show what is public, what is modeled, and what still needs research."
        action={`${gapCount} missing evidence gaps should stay visible until the next research pass fills them.`}
      />

      <div className="refractured-layer-stack" aria-label="Evidence ledger by level">
        {layerOrder.map((layer) => {
          const items = entriesForLayer(evidenceLedger, layer);

          return (
            <section className={`refractured-layer-panel refractured-layer-${layer}`} key={layer}>
              <h2>{layerLabels[layer]}</h2>
              <div className="refractured-evidence-list">
                {items.map((item) => (
                  <article key={item.id}>
                    <div className="refractured-layer-item-meta">
                      <ConfidenceTag confidence={item.confidence} level={item.level} />
                      <span>{item.source}</span>
                    </div>
                    <h2>{item.label}</h2>
                    <p>{item.matters}</p>
                    <p>{item.unknown}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open source for ${item.label}`}>
                        <ExternalLink size={15} aria-hidden="true" />
                        Open source
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

export default EvidenceLedgerPage;
