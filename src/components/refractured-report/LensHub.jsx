import { ArrowRight } from "lucide-react";

function LensHub({ lenses, onSectionChange }) {
  return (
    <section className="refractured-lens-hub" aria-label="Choose report lens">
      <div className="refractured-section-heading">
        <p className="refractured-kicker">Choose your lens</p>
        <h2>Open the part of the report that answers your current decision.</h2>
      </div>
      <div className="refractured-lens-grid">
        {lenses.map((lens) => (
          <button key={lens.id} type="button" onClick={() => onSectionChange(lens.section)}>
            <span>{lens.label}</span>
            <strong>{lens.title}</strong>
            <p>{lens.summary}</p>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

export default LensHub;
