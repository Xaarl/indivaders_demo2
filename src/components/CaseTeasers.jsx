import { useState } from 'react';
import { caseStudies } from '../data/caseStudies.js';
import CaseLessonPanel from './CaseLessonPanel.jsx';

function CaseTeasers() {
  const [activeId, setActiveId] = useState(caseStudies[0]?.id);
  const activeCase = caseStudies.find((caseStudy) => caseStudy.id === activeId);

  return (
    <section className="section-band cases-band" id="case-teasers">
      <div className="section-heading">
        <p className="section-kicker">Interactive sample report</p>
        <h2>Three games, three traps worth spotting.</h2>
        <p>
          Click a case to see the kind of mistake the report is designed to catch before you lock your tags, price, demo promise, or reference list.
        </p>
      </div>

      <div className="case-layout">
        <div className="case-grid" role="list">
          {caseStudies.map((caseStudy) => (
            <button
              className={`case-card ${caseStudy.id === activeId ? 'is-active' : ''}`}
              key={caseStudy.id}
              type="button"
              onClick={() => setActiveId(caseStudy.id)}
            >
              <span className="case-card-art">
                <img src={caseStudy.imageUrl} alt="" loading="lazy" />
              </span>
              <span className="case-card-copy">
                <span>{caseStudy.caseFile.replace('Real Game ', '')}</span>
                <span className="case-card-title">{caseStudy.title}</span>
                <strong>{caseStudy.hook}</strong>
                <span className="case-card-contrast">
                  <span>
                    <small>Looks like</small>
                    {caseStudy.cardContrast.looksLike}
                  </span>
                  <span>
                    <small>Actually</small>
                    {caseStudy.cardContrast.actually}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>

        {activeCase ? (
          <CaseLessonPanel
            caseStudy={activeCase}
            onClose={() => setActiveId(caseStudies[0]?.id)}
          />
        ) : null}
      </div>
    </section>
  );
}

export default CaseTeasers;

