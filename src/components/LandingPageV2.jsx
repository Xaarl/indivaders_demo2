import productCopy from '../content/productCopy.js';
import ctaCopy from '../content/ctaCopy.js';
import Hero from './Hero.jsx';
import CaseTeasers from './CaseTeasers.jsx';
import ReportDeliverables from './ReportDeliverables.jsx';
import OfferSection from './OfferSection.jsx';

function LandingPageV2() {
  return (
    <main className="site-shell landing-page-v2">
      <div className="landing-space" aria-hidden="true">
        <div className="landing-stars" />
      </div>
      <Hero copy={productCopy.hero} />

      <section className="visual-scan-strip" aria-label="Steam positioning scan">
        {productCopy.trustStrip.items.map((item) => (
          <article key={item.label}>
            <span>{item.code}</span>
            <strong>{item.label}</strong>
            <small>{item.detail}</small>
          </article>
        ))}
      </section>

      <CaseTeasers />
      <ReportDeliverables />

      <OfferSection
        reportCopy={productCopy.earlyReportOffer}
        sampleCopy={ctaCopy.leadMagnetForm}
        labels={ctaCopy.labels}
      />

      <footer className="site-footer">
        <p>{productCopy.footer.tagline}</p>
        <nav aria-label="Footer links">
          {productCopy.footer.links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}

export default LandingPageV2;
