import { ExternalLink, X } from 'lucide-react';

function CaseLessonPanel({ caseStudy, onClose }) {
  const details = caseStudy.compactDetails;
  const rows = [
    ['Trap', details.whatIsDifferent],
    ['Use safely', details.decision],
    ['Next action', details.nextAction],
  ];

  return (
    <aside className="lesson-panel lesson-snapshot" aria-live="polite">
      <button className="icon-button panel-close" type="button" onClick={onClose} aria-label="Close lesson panel">
        <X size={18} aria-hidden="true" />
      </button>
      <div className="lesson-snapshot-lead">
        <p className="panel-label">{caseStudy.caseFile}</p>
        <h3>{caseStudy.title}</h3>
        <p>{caseStudy.lesson}</p>
      </div>
      <dl className="lesson-list lesson-snapshot-grid">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="evidence-row">
        {caseStudy.evidenceItems.map((item) => (
          <a
            href={item.sourceUrl || undefined}
            className="evidence-chip"
            key={`${caseStudy.id}-${item.label}-${item.type}`}
            target={item.sourceUrl ? '_blank' : undefined}
            rel={item.sourceUrl ? 'noreferrer' : undefined}
            title={item.claim}
          >
            <span>{item.label}</span>
            {item.sourceUrl ? <ExternalLink size={13} aria-hidden="true" /> : null}
          </a>
        ))}
      </div>
      <a className="panel-cta" href="#sample-report">
        Open sample report
      </a>
    </aside>
  );
}

export default CaseLessonPanel;

