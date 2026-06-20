import { useEffect, useRef } from "react";

function RefracturedEvidenceDrawer({ activeRefs, evidence, onClose, open, variant = "drawer" }) {
  const closeButtonRef = useRef(null);
  const activeSet = activeRefs ? new Set(activeRefs) : null;
  const visibleEvidence = activeSet ? evidence.filter((item) => activeSet.has(item.id)) : evidence;
  const isPage = variant === "page";
  const titleId = isPage ? "refractured-evidence-page-title" : "refractured-evidence-drawer-title";

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
        <h2 id={titleId}>{isPage ? "Evidence archive" : `Selected evidence (${visibleEvidence.length})`}</h2>
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
              <span>{item.level}</span>
              <h2>{item.label}</h2>
              <p>{item.matters}</p>
              <p>{item.unknown}</p>
              <small>{item.source}</small>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer">
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
