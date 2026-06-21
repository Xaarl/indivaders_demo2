import { useEffect, useRef } from "react";
import { ConfidenceTag } from "./MarketIntelligencePrimitives.jsx";

function RefracturedEvidenceDrawer({ activeRefs, evidence, onClose, open, showAll = false, variant = "drawer" }) {
  const closeButtonRef = useRef(null);
  const isPage = variant === "page";
  const selectedRefs = Array.isArray(activeRefs) ? activeRefs : [];
  const activeSet = new Set(selectedRefs);
  const shouldShowAll = isPage || showAll;
  const visibleEvidence = shouldShowAll ? evidence : evidence.filter((item) => activeSet.has(item.id));
  const titleId = isPage ? "refractured-evidence-page-title" : "refractured-evidence-drawer-title";
  const drawerTitle = shouldShowAll ? `Evidence ledger (${visibleEvidence.length})` : `Selected evidence (${visibleEvidence.length})`;

  useEffect(() => {
    if (!open || isPage) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPage, onClose, open]);

  if (!open && !isPage) {
    return null;
  }

  return (
    <aside
      aria-labelledby={titleId}
      aria-modal={isPage ? undefined : "true"}
      className={isPage ? "refractured-evidence-page" : "refractured-evidence-drawer"}
      role={isPage ? "complementary" : "dialog"}
    >
      <header>
        <h2 id={titleId}>{isPage ? "Evidence ledger" : drawerTitle}</h2>
        {!isPage ? (
          <button ref={closeButtonRef} type="button" onClick={onClose}>
            Close
          </button>
        ) : null}
      </header>
      <div className="refractured-evidence-list">
        {visibleEvidence.length > 0 ? (
          visibleEvidence.map((item) => (
            <article key={item.id}>
              <div className="refractured-layer-item-meta">
                <ConfidenceTag confidence={item.confidence} level={item.level} />
                <span>{item.source}</span>
              </div>
              <h2>{item.label}</h2>
              <p>{item.matters}</p>
              <p>{item.unknown}</p>
              <small>{item.id}</small>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open source for ${item.label}`}>
                  Open source
                </a>
              ) : null}
            </article>
          ))
        ) : (
          <article className="refractured-evidence-empty" role="status">
            <span>No matching records</span>
            <h2>No evidence found</h2>
            <p>The selected recommendation does not currently resolve to an evidence source.</p>
          </article>
        )}
      </div>
    </aside>
  );
}

export default RefracturedEvidenceDrawer;
