import { useState } from "react";
import {
  ConfidenceTag,
  DefinitionGrid,
  EvidenceButton,
  JobHeader,
  LayerSummaryStrip,
  SignalFlow,
} from "./MarketIntelligencePrimitives.jsx";

function LoopModelCard({ contentBurden, direction, isActive, onEvidenceOpen, onSelect }) {
  return (
    <article className={isActive ? "refractured-loop-model is-active" : "refractured-loop-model"}>
      <button aria-pressed={isActive} type="button" onClick={() => onSelect(direction.id)}>
        <span>{direction.label}</span>
        <strong>{direction.promise}</strong>
      </button>
      <DefinitionGrid
        items={[
          { label: "Play change", value: direction.promise },
          { label: "Replay reason", value: direction.bestFor },
          { label: "Content burden", value: contentBurden },
          { label: "Market promise", value: direction.promise },
          { label: "Failure mode", value: direction.risk },
          { label: "Playtest proof", value: direction.proof },
        ]}
      />
      <div className="refractured-layer-item-meta">
        <ConfidenceTag confidence={direction.confidence} />
        <EvidenceButton
          context={`${direction.label} loop model`}
          evidenceRefs={direction.evidenceRefs}
          label="Sources"
          onEvidenceOpen={onEvidenceOpen}
        />
      </div>
    </article>
  );
}

function RogueliteLoopLab({ onEvidenceOpen, rogueliteLoopLab }) {
  const directions = rogueliteLoopLab.directions ?? [];
  const [activeDirectionId, setActiveDirectionId] = useState(directions[0]?.id);
  const activeDirection = directions.find((direction) => direction.id === activeDirectionId) ?? directions[0];
  const contentRisk =
    rogueliteLoopLab.estimates.find((item) => item.id === "content-risk") ?? rogueliteLoopLab.estimates[0];

  return (
    <section className="refractured-module refractured-roguelite-loop-lab">
      <JobHeader
        eyebrow="Roguelite Loop Lab"
        title="Compare loop models by play change, not feature count."
        summary="The useful model is the one players can feel, replay, explain, and test before content scope expands."
      />

      <SignalFlow
        signal={rogueliteLoopLab.facts[0]?.statement}
        matter={rogueliteLoopLab.interpretation[0]?.statement}
        action={rogueliteLoopLab.actions[0]?.recommendation}
      />

      <LayerSummaryStrip
        ariaLabel="Roguelite Loop Lab evidence layer shortcuts"
        context="the Roguelite Loop Lab"
        module={rogueliteLoopLab}
        onEvidenceOpen={onEvidenceOpen}
      />

      <div className="refractured-loop-model-grid" aria-label="Roguelite loop models">
        {directions.map((direction) => (
          <LoopModelCard
            contentBurden={contentRisk?.statement}
            direction={direction}
            isActive={direction.id === activeDirection?.id}
            key={direction.id}
            onEvidenceOpen={onEvidenceOpen}
            onSelect={setActiveDirectionId}
          />
        ))}
      </div>

      {activeDirection ? (
        <article className="refractured-feature-panel">
          <div className="refractured-layer-item-meta">
            <span>Selected model</span>
            <ConfidenceTag confidence={activeDirection.confidence} />
          </div>
          <h2>{activeDirection.label}</h2>
          <SignalFlow
            signal={activeDirection.promise}
            matter={activeDirection.bestFor}
            action={activeDirection.proof}
          />
          <DefinitionGrid
            items={[
              { label: "Failure mode", value: activeDirection.risk },
              { label: "Content burden", value: contentRisk?.statement },
            ]}
          />
        </article>
      ) : null}
    </section>
  );
}

export default RogueliteLoopLab;
