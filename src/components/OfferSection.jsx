import { useState } from 'react';
import { ArrowRight, Eye, Mail, Send } from 'lucide-react';

function OfferSection({ reportCopy, sampleCopy, labels }) {
  const [email, setEmail] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="conversion-band" id="early-report">
      <div className="conversion-shell">
        <div className="conversion-copy" id="sample-brief">
          <p className="section-kicker">Free sample</p>
          <h2>{sampleCopy.headline}</h2>
          <p>{sampleCopy.body}</p>
          <a className="preview-link" href="#sample-report">
            <Eye size={18} aria-hidden="true" />
            Preview the brief first
          </a>

          <form className="sample-form compact-sample-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="success-message" role="status">
                <h3>{sampleCopy.successTitle}</h3>
                <p>{sampleCopy.successBody}</p>
              </div>
            ) : (
              <>
                <label htmlFor="sample-email">{sampleCopy.emailLabel}</label>
                <input
                  id="sample-email"
                  type="email"
                  required
                  value={email}
                  placeholder={sampleCopy.emailPlaceholder}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="sample-project">{sampleCopy.projectLabel}</label>
                <textarea
                  id="sample-project"
                  value={projectNote}
                  placeholder={sampleCopy.projectPlaceholder}
                  onChange={(event) => setProjectNote(event.target.value)}
                  rows={3}
                />
                <label className="checkbox-row" htmlFor="sample-consent">
                  <input
                    id="sample-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                  />
                  <span>{sampleCopy.consent}</span>
                </label>
                <button className="button button-primary" type="submit" disabled={!consent}>
                  <Send size={18} aria-hidden="true" />
                  {labels.submit}
                </button>
              </>
            )}
          </form>
        </div>

        <aside className="paid-report-card">
          <p className="section-kicker">{reportCopy.eyebrow}</p>
          <h3>{reportCopy.headline}</h3>
          <p>{reportCopy.body}</p>
          <ul className="offer-list">
            {reportCopy.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="offer-note">{reportCopy.note}</p>
          <div className="early-report-actions">
            <a className="button button-primary" href="#sample-report">
              <Mail size={18} aria-hidden="true" />
              {reportCopy.cta}
            </a>
            <a className="button button-ghost" href="#order-report">
              <ArrowRight size={18} aria-hidden="true" />
              {labels.earlyReport}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default OfferSection;
