import { ArrowLeft, Database } from "lucide-react";

function RefracturedReportFrame({ activeSection, children, onSectionChange, onSourceDrawerOpen, report, sections }) {
  return (
    <main className="refractured-report-shell">
      <header className="refractured-topbar">
        <a className="refractured-back-link" href="#">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to Indievaders
        </a>
        <div className="refractured-topbar-meta">
          <span>{report.meta.stage}</span>
          <strong>{report.meta.title}</strong>
        </div>
        <button
          aria-label="Open full evidence ledger"
          className="refractured-source-button"
          type="button"
          onClick={() => onSourceDrawerOpen()}
        >
          <Database size={17} aria-hidden="true" />
          Evidence
        </button>
      </header>

      <nav className="refractured-section-nav" aria-label="Refractured report sections">
        {sections.map((section) => (
          <button
            aria-current={section.id === activeSection ? "page" : undefined}
            className={section.id === activeSection ? "is-active" : ""}
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {children}
    </main>
  );
}

export default RefracturedReportFrame;
