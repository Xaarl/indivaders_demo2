import {
  ConfidenceTag,
  DefinitionGrid,
  EvidenceButton,
  JobHeader,
  LayerSummaryStrip,
  SignalFlow,
} from "./MarketIntelligencePrimitives.jsx";

function themeCandidatesFrom(statement = "") {
  const fallbackThemes = ["combat feel", "fair failure", "content cadence", "co-op expectations", "replay clarity"];
  const marker = "candidates are ";
  const markerIndex = statement.indexOf(marker);

  if (markerIndex < 0) {
    return fallbackThemes;
  }

  const candidateText = statement
    .slice(markerIndex + marker.length)
    .replace(/\.$/, "")
    .replace(", and ", ", ")
    .replace(" and ", ", ");
  const candidates = candidateText
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return candidates.length > 0 ? candidates : fallbackThemes;
}

function ReviewCommunityThemes({ onEvidenceOpen, reviewCommunityThemes }) {
  const publicThemes =
    reviewCommunityThemes.estimates.find((item) => item.id === "public-review-theme-synthesis") ??
    reviewCommunityThemes.estimates[0];
  const listeningGap =
    reviewCommunityThemes.estimates.find((item) => item.id === "community-listening-gap") ??
    reviewCommunityThemes.estimates[1];
  const themeSignals = themeCandidatesFrom(publicThemes?.statement);

  return (
    <section className="refractured-module refractured-review-community-themes">
      <JobHeader
        eyebrow="Review & Community Themes"
        title="Use review signals, but mark what was not listened to."
        summary="This view separates public Steam review/API evidence from missing Reddit, Discord, creator, and social-comment research."
      />

      <SignalFlow
        signal={reviewCommunityThemes.facts[0]?.statement}
        matter={reviewCommunityThemes.interpretation[0]?.statement}
        action={reviewCommunityThemes.actions[0]?.recommendation}
      />

      <LayerSummaryStrip
        ariaLabel="Review and Community Themes evidence layer shortcuts"
        context="the Review and Community Themes module"
        module={reviewCommunityThemes}
        onEvidenceOpen={onEvidenceOpen}
      />

      <div className="refractured-review-radar" aria-label="Review radar signals and gaps">
        <section className="refractured-feature-panel" aria-labelledby="review-radar-signals">
          <div className="refractured-subsection-heading">
            <h2 id="review-radar-signals">Theme signals</h2>
            <p>{reviewCommunityThemes.facts[1]?.statement}</p>
          </div>
          <div className="refractured-action-list">
            {themeSignals.map((theme, index) => (
              <article key={theme}>
                <div className="refractured-layer-item-meta">
                  <span>Signal {index + 1}</span>
                  <ConfidenceTag confidence={publicThemes?.confidence} />
                </div>
                <h3>{theme}</h3>
                <DefinitionGrid
                  items={[
                    { label: "Status", value: "Inferred from public Steam review/API summaries" },
                    { label: "Missing proof", value: "Needs sampled review-text coding before final page copy" },
                  ]}
                />
                <EvidenceButton
                  context={`${theme} review signal`}
                  evidenceRefs={publicThemes?.evidenceRefs}
                  label="Sources"
                  onEvidenceOpen={onEvidenceOpen}
                />
              </article>
            ))}
          </div>
        </section>

        <section className="refractured-feature-panel refractured-gap-panel" aria-labelledby="review-radar-gaps">
          <div className="refractured-subsection-heading">
            <h2 id="review-radar-gaps">Listening gaps</h2>
            <p>{listeningGap?.statement}</p>
          </div>
          <div className="refractured-action-list">
            {reviewCommunityThemes.communityGaps.map((gap) => (
              <article key={gap.id}>
                <div className="refractured-layer-item-meta">
                  <span>{gap.channel}</span>
                  <ConfidenceTag confidence={gap.confidence} />
                </div>
                <h3>Missing channel read</h3>
                <p>{gap.note}</p>
                <EvidenceButton
                  context={`${gap.channel} community listening gap`}
                  evidenceRefs={gap.evidenceRefs}
                  label="Sources"
                  onEvidenceOpen={onEvidenceOpen}
                />
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default ReviewCommunityThemes;
