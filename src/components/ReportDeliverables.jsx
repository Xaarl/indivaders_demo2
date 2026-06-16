import productCopy from '../content/productCopy.js';

function ReportDeliverables() {
  return (
    <section className="section-band report-band" id="report">
      <div className="report-shell">
        <div className="section-heading">
          <p className="section-kicker">{productCopy.reportDeliverables.eyebrow}</p>
          <h2>{productCopy.reportDeliverables.headline}</h2>
          <p>{productCopy.reportDeliverables.intro}</p>
        </div>

        <div className="deliverable-grid report-decision-lane">
          {productCopy.reportDeliverables.items.map((item, index) => (
            <article className="deliverable-card decision-step" key={item.title}>
              <span className="deliverable-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="deliverable-main">
                <h3>{item.title}</h3>
                <strong>{item.example}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReportDeliverables;
