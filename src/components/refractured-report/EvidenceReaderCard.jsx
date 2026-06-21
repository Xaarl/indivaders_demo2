import { ExternalLink } from "lucide-react";
import { ConfidenceTag } from "./MarketIntelligencePrimitives.jsx";

function EvidenceReaderCard({ item }) {
  return (
    <article className="refractured-evidence-reader">
      <header>
        <div className="refractured-layer-item-meta">
          <ConfidenceTag confidence={item.confidence} level={item.level} />
          <span>{item.source}</span>
        </div>
        <h2>{item.label}</h2>
      </header>

      <div className="refractured-evidence-reader-grid">
        <section>
          <span>Inspect evidence</span>
          <p>{item.matters}</p>
        </section>
        <section>
          <span>Known limits</span>
          <p>{item.unknown}</p>
        </section>
        <section>
          <span>Reader action</span>
          <p>
            Treat this as a {item.level ?? item.confidence} input to the report. Raw pages are available for audit,
            but the report interpretation lives here.
          </p>
        </section>
      </div>

      <footer>
        <small>{item.id}</small>
        {item.href ? (
          <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open raw source for ${item.label}`}>
            <ExternalLink size={15} aria-hidden="true" />
            Open raw source
          </a>
        ) : null}
      </footer>
    </article>
  );
}

export default EvidenceReaderCard;
