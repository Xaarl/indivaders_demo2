import { ArrowLeft, Database } from "lucide-react";

const reportSections = [
  { id: "overview", label: "Overview" },
  { id: "comparables", label: "Comparables" },
  { id: "production", label: "Reality check" },
  { id: "reviews", label: "Review risks" },
  { id: "price", label: "Price and scope" },
  { id: "actions", label: "Next actions" },
  { id: "sources", label: "Sources" },
];

function ReportFrame({ report, activeSection, onSectionChange, onSourceDrawerOpen, children }) {
  return (
    <main className="interactive-report-shell">
      <header className="report-topbar">
        <a className="report-back-link" href="#">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to Indievaders
        </a>
        <div className="report-topbar-meta">
          <span>{report.meta.title}</span>
          <strong>{report.meta.projectName}</strong>
        </div>
        <button className="report-source-button" type="button" onClick={() => onSourceDrawerOpen()}>
          <Database size={17} aria-hidden="true" />
          Source log
        </button>
      </header>

      <nav className="report-section-nav" aria-label="Report sections">
        {reportSections.map((section) => (
          <button
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

export default ReportFrame;
