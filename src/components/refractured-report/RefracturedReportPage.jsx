import { useState } from "react";
import refracturedPremiumReport from "../../data/refracturedPremiumReport.js";
import ActionPlanTimeline from "./ActionPlanTimeline.jsx";
import ComparableExplorer from "./ComparableExplorer.jsx";
import LensHub from "./LensHub.jsx";
import OpeningThesis from "./OpeningThesis.jsx";
import PlayerSignalInspector from "./PlayerSignalInspector.jsx";
import RefracturedEvidenceDrawer from "./RefracturedEvidenceDrawer.jsx";
import RefracturedReportFrame from "./RefracturedReportFrame.jsx";
import RogueliteLoopLab from "./RogueliteLoopLab.jsx";
import SteamPositioningBuilder from "./SteamPositioningBuilder.jsx";
import StrategicPathSelector from "./StrategicPathSelector.jsx";

const sections = [
  { id: "overview", label: "Thesis" },
  { id: "player", label: "Player DNA" },
  { id: "roguelite", label: "Roguelite loop" },
  { id: "comparables", label: "Comparables" },
  { id: "steam", label: "Steam page" },
  { id: "paths", label: "Paths" },
  { id: "actions", label: "Plan" },
  { id: "evidence", label: "Evidence" },
];

function RefracturedReportPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeLensId, setActiveLensId] = useState(refracturedPremiumReport.readerLenses[0]?.id ?? null);
  const [activeEvidenceRefs, setActiveEvidenceRefs] = useState([]);
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);

  function handleSectionChange(sectionId) {
    const matchingLens = refracturedPremiumReport.readerLenses.find((lens) => lens.section === sectionId);

    setActiveLensId(matchingLens?.id ?? null);
    setActiveSection(sectionId);
    setActiveEvidenceRefs([]);
    setEvidenceDrawerOpen(false);
  }

  function handleLensSelect(lens) {
    setActiveLensId(lens.id);
    setActiveSection(lens.section);
    setActiveEvidenceRefs([]);
    setEvidenceDrawerOpen(false);
  }

  function openEvidenceDrawer(refs = []) {
    setActiveEvidenceRefs(Array.isArray(refs) ? refs : []);
    setEvidenceDrawerOpen(true);
  }

  return (
    <RefracturedReportFrame
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      onSourceDrawerOpen={openEvidenceDrawer}
      report={refracturedPremiumReport}
      sections={sections}
    >
      {activeSection === "overview" ? (
        <>
          <OpeningThesis
            onEvidenceOpen={openEvidenceDrawer}
            onSectionChange={handleSectionChange}
            report={refracturedPremiumReport}
          />
          <LensHub
            activeLensId={activeLensId}
            activeSection={activeSection}
            lenses={refracturedPremiumReport.readerLenses}
            onLensSelect={handleLensSelect}
          />
        </>
      ) : null}
      {activeSection === "player" ? (
        <PlayerSignalInspector
          onEvidenceOpen={openEvidenceDrawer}
          signals={refracturedPremiumReport.playerSignals}
        />
      ) : null}
      {activeSection === "roguelite" ? (
        <RogueliteLoopLab
          directions={refracturedPremiumReport.rogueliteDirections}
          onEvidenceOpen={openEvidenceDrawer}
        />
      ) : null}
      {activeSection === "comparables" ? (
        <ComparableExplorer comparables={refracturedPremiumReport.comparables} onEvidenceOpen={openEvidenceDrawer} />
      ) : null}
      {activeSection === "steam" ? (
        <SteamPositioningBuilder
          onEvidenceOpen={openEvidenceDrawer}
          positioningAngles={refracturedPremiumReport.positioningAngles}
        />
      ) : null}
      {activeSection === "paths" ? (
        <StrategicPathSelector onEvidenceOpen={openEvidenceDrawer} paths={refracturedPremiumReport.strategicPaths} />
      ) : null}
      {activeSection === "actions" ? (
        <ActionPlanTimeline actions={refracturedPremiumReport.actionPlan} onEvidenceOpen={openEvidenceDrawer} />
      ) : null}
      {activeSection === "evidence" ? (
        <RefracturedEvidenceDrawer evidence={refracturedPremiumReport.evidence} open variant="page" />
      ) : null}
      <RefracturedEvidenceDrawer
        activeRefs={activeEvidenceRefs.length > 0 ? activeEvidenceRefs : null}
        evidence={refracturedPremiumReport.evidence}
        onClose={() => setEvidenceDrawerOpen(false)}
        open={evidenceDrawerOpen}
      />
    </RefracturedReportFrame>
  );
}

export default RefracturedReportPage;
