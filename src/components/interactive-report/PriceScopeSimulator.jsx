import { RadioTower, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

function PriceScopeSimulator({ report }) {
  const [activeBandId, setActiveBandId] = useState(report.priceScope.bands[1]?.id ?? report.priceScope.bands[0]?.id);
  const activeBand = useMemo(
    () => report.priceScope.bands.find((band) => band.id === activeBandId) ?? report.priceScope.bands[0],
    [activeBandId, report.priceScope.bands],
  );

  return (
    <section className="report-module price-module">
      <div className="module-heading">
        <p className="report-kicker">Price and scope</p>
        <h1>Does the visible game promise match the price?</h1>
      </div>

      <div className="price-layout">
        <div className="price-selector" aria-label="Price bands">
          {report.priceScope.bands.map((band) => (
            <button
              className={band.id === activeBandId ? "is-active" : ""}
              key={band.id}
              type="button"
              onClick={() => setActiveBandId(band.id)}
            >
              {band.price}
            </button>
          ))}
        </div>

        <article className="price-card">
          <SlidersHorizontal size={24} aria-hidden="true" />
          <span>Selected band</span>
          <h2>{activeBand.price}</h2>
          <div className="price-grid">
            <div>
              <strong>Interpretation</strong>
              <p>{activeBand.interpretation}</p>
            </div>
            <div>
              <strong>Risk</strong>
              <p>{activeBand.risk}</p>
            </div>
            <div>
              <strong>Action</strong>
              <p>{activeBand.action}</p>
            </div>
          </div>
        </article>

        <aside className="creator-angle-card">
          <RadioTower size={22} aria-hidden="true" />
          <span>Creator starter angles</span>
          <div>
            {report.creatorAngles.map((angle) => (
              <article key={angle.id}>
                <h3>{angle.angle}</h3>
                <p>{angle.whyItFits}</p>
                <small>{angle.action}</small>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default PriceScopeSimulator;
