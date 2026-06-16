import { ArrowRight, Mail } from 'lucide-react';

function EarlyReportOffer({ copy, labels }) {
  return (
    <section className="section-band early-report-band" id="early-report">
      <div className="early-report-panel">
        <div className="early-report-copy">
          <p className="section-kicker">{copy.eyebrow}</p>
          <h2>{copy.headline}</h2>
          <p>{copy.body}</p>
        </div>

        <div className="early-report-details">
          <ul>
            {copy.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{copy.note}</p>
          <div className="early-report-actions">
            <a className="button button-primary" href="#sample-brief">
              <Mail size={18} aria-hidden="true" />
              {copy.cta}
            </a>
            <a className="button button-ghost" href="mailto:hello@indievaders.com?subject=Early%20automated%20report%20interest">
              <ArrowRight size={18} aria-hidden="true" />
              {labels.earlyReport}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EarlyReportOffer;


