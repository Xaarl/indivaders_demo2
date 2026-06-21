import { useState } from "react";
import {
  ChipRow,
  ConfidenceTag,
  DefinitionGrid,
  EvidenceButton,
  JobHeader,
  LayerSummaryStrip,
  SignalFlow,
} from "./MarketIntelligencePrimitives.jsx";

function SteamPositioningBuilder({ onEvidenceOpen, steamPageLab }) {
  const positioningAngles = steamPageLab.positioningAngles ?? [];
  const [activeAngleId, setActiveAngleId] = useState(positioningAngles[0]?.id);
  const activeAngle = positioningAngles.find((angle) => angle.id === activeAngleId) ?? positioningAngles[0];
  const risk = steamPageLab.estimates.find((item) => item.confidence === "missing") ?? steamPageLab.estimates[0];

  return (
    <section className="refractured-module refractured-steam-page-lab">
      <JobHeader
        eyebrow="Steam Page Lab"
        title="Choose a promise and see the page shape change."
        summary="The lab keeps the opening promise, trailer beats, tags, CTA, creator pitch, and risk in one testable frame."
      />

      <SignalFlow
        signal={steamPageLab.facts[1]?.statement}
        matter={steamPageLab.interpretation[0]?.statement}
        action={steamPageLab.actions[0]?.recommendation}
      />

      <div className="refractured-choice-strip" aria-label="Positioning angles">
        {positioningAngles.map((angle) => (
          <button
            aria-pressed={angle.id === activeAngle?.id}
            className={angle.id === activeAngle?.id ? "is-active" : ""}
            key={angle.id}
            type="button"
            onClick={() => setActiveAngleId(angle.id)}
          >
            {angle.label}
          </button>
        ))}
      </div>
      <LayerSummaryStrip
        ariaLabel="Steam Page Lab evidence layer shortcuts"
        context="the Steam Page Lab"
        module={steamPageLab}
        onEvidenceOpen={onEvidenceOpen}
      />

      {activeAngle ? (
        <article className="refractured-feature-panel refractured-steam-simulator">
          <div className="refractured-layer-item-meta">
            <span>{activeAngle.label}</span>
            <ConfidenceTag confidence={activeAngle.confidence} />
          </div>
          <h2>{activeAngle.steamPromise}</h2>

          <DefinitionGrid
            items={[
              { label: "Short description", value: activeAngle.steamPromise },
              { label: "CTA", value: activeAngle.demoCta },
              { label: "Creator pitch", value: activeAngle.creatorPitch },
              { label: "Risk", value: risk?.statement },
            ]}
          />

          <section className="refractured-trailer-sequence" aria-labelledby="steam-trailer-beats">
            <h2 id="steam-trailer-beats">Trailer beats</h2>
            <ol className="refractured-trailer-beats">
              {activeAngle.trailerBeats.map((beat) => (
                <li key={beat}>{beat}</li>
              ))}
            </ol>
          </section>

          <ChipRow items={activeAngle.tagStack} label={`${activeAngle.label} tag stack`} />

          <EvidenceButton
            context={`${activeAngle.label} positioning angle`}
            evidenceRefs={activeAngle.evidenceRefs}
            onEvidenceOpen={onEvidenceOpen}
          />
        </article>
      ) : null}
    </section>
  );
}

export default SteamPositioningBuilder;
