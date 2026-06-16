import { useState } from 'react';
import { Eye, Send } from 'lucide-react';

function SampleBriefForm({ copy, labels }) {
  const [email, setEmail] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section-band sample-band" id={copy.id}>
      <div className="sample-form-panel">
        <div>
          <p className="section-kicker">Email sample brief</p>
          <h2>{copy.headline}</h2>
          <p>{copy.body}</p>
          <a className="preview-link" href="#sample-report">
            <Eye size={18} aria-hidden="true" />
            Preview the brief first
          </a>
        </div>

        <form className="sample-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="success-message" role="status">
              <h3>{copy.successTitle}</h3>
              <p>{copy.successBody}</p>
            </div>
          ) : (
            <>
              <label htmlFor="sample-email">{copy.emailLabel}</label>
              <input
                id="sample-email"
                type="email"
                required
                value={email}
                placeholder={copy.emailPlaceholder}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label htmlFor="sample-project">{copy.projectLabel}</label>
              <textarea
                id="sample-project"
                value={projectNote}
                placeholder={copy.projectPlaceholder}
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
                <span>{copy.consent}</span>
              </label>
              <button className="button button-primary" type="submit" disabled={!consent}>
                <Send size={18} aria-hidden="true" />
                {labels.submit}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default SampleBriefForm;

