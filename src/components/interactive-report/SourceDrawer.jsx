import { ExternalLink, X } from "lucide-react";

function SourceDrawer({ open, sources, activeRefs, onClose, variant = "drawer" }) {
  if (!open) {
    return null;
  }

  const visibleSources = activeRefs?.length
    ? sources.filter((source) => activeRefs.includes(source.id))
    : sources;

  return (
    <aside className={`source-drawer ${variant === "page" ? "is-page" : ""}`} aria-label="Source log" aria-live="polite">
      <div className="source-drawer-header">
        <div>
          <span>Evidence log</span>
          <h2>{activeRefs?.length ? "Sources for this claim" : "All sample sources"}</h2>
        </div>
        {variant === "drawer" ? (
          <button type="button" onClick={onClose} aria-label="Close source log">
            <X size={18} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="source-list">
        {visibleSources.map((source) => (
          <article className="source-card" key={source.id}>
            <div>
              <span>{source.label}</span>
              <small>{source.type}</small>
            </div>
            <h3>{source.name}</h3>
            <p>{source.note}</p>
            <footer>
              <small>Retrieved {source.retrievedAt}</small>
              {source.url ? (
                <a href={source.url} target="_blank" rel="noreferrer">
                  Open
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              ) : null}
            </footer>
          </article>
        ))}
      </div>
    </aside>
  );
}

export default SourceDrawer;
