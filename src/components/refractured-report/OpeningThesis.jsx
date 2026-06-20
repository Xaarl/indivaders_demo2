import { ArrowRight, Database, Play } from "lucide-react";

function OpeningThesis({ onEvidenceOpen, onSectionChange, report }) {
  return (
    <section className="refractured-opening">
      <div className="refractured-opening-copy">
        <p className="refractured-kicker">{report.thesis.label}</p>
        <h1>{report.thesis.headline}</h1>
        <p>{report.thesis.body}</p>
        <div className="refractured-opening-actions">
          <button type="button" onClick={() => onSectionChange("steam")}>
            <Play size={18} aria-hidden="true" />
            Test Steam promise
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onEvidenceOpen(report.thesis.evidenceRefs)}>
            <Database size={18} aria-hidden="true" />
            Evidence behind thesis
          </button>
        </div>
      </div>
      <aside className="refractured-proof-card">
        <span>Proof question</span>
        <strong>{report.thesis.proofQuestion}</strong>
      </aside>
    </section>
  );
}

export default OpeningThesis;
