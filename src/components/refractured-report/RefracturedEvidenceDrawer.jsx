function RefracturedEvidenceDrawer({ activeRefs, evidence, onClose, open, variant = "drawer" }) {
  const activeSet = activeRefs ? new Set(activeRefs) : null;
  const visibleEvidence = activeSet ? evidence.filter((item) => activeSet.has(item.id)) : evidence;

  if (!open && variant !== "page") {
    return null;
  }

  return (
    <aside className={variant === "page" ? "refractured-evidence-page" : "refractured-evidence-drawer"}>
      <header>
        <span>{variant === "page" ? "Evidence archive" : `Selected evidence (${visibleEvidence.length})`}</span>
        {variant !== "page" ? (
          <button type="button" onClick={onClose}>
            Close
          </button>
        ) : null}
      </header>
      <div className="refractured-evidence-list">
        {visibleEvidence.map((item) => (
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
        ))}
      </div>
    </aside>
  );
}

export default RefracturedEvidenceDrawer;
