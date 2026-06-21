import { useCallback, useState } from "react";
import refracturedPremiumReport from "../../data/refracturedPremiumReport.js";
import ActionPlanTimeline from "./ActionPlanTimeline.jsx";
import AudienceSignals from "./AudienceSignals.jsx";
import ComparableExplorer from "./ComparableExplorer.jsx";
import EvidenceLedgerPage from "./EvidenceLedgerPage.jsx";
import MarketMap from "./MarketMap.jsx";
import MarketWorkspaceShell from "./MarketWorkspaceShell.jsx";
import RefracturedEvidenceDrawer from "./RefracturedEvidenceDrawer.jsx";
import ReviewCommunityThemes from "./ReviewCommunityThemes.jsx";
import RogueliteLoopLab from "./RogueliteLoopLab.jsx";
import SteamPositioningBuilder from "./SteamPositioningBuilder.jsx";

const sections = [
  { id: "comparable-explorer", label: "Comparable Explorer" },
  { id: "market-map", label: "Market Map" },
  { id: "audience-signals", label: "Audience Signals" },
  { id: "review-community-themes", label: "Review & Community Themes" },
  { id: "steam-page-lab", label: "Steam Page Lab" },
  { id: "roguelite-loop-lab", label: "Roguelite Loop Lab" },
  { id: "action-plan", label: "Action Plan" },
  { id: "evidence-ledger", label: "Evidence Ledger" },
];

const sectionModules = {
  "market-map": "marketEvidence",
  "audience-signals": "audienceSignals",
  "comparable-explorer": "marketEvidence",
  "review-community-themes": "reviewCommunityThemes",
  "steam-page-lab": "steamPageLab",
  "roguelite-loop-lab": "rogueliteLoopLab",
  "action-plan": "actionPlan",
  "evidence-ledger": "marketEvidence",
};

function RefracturedReportPage() {
  const [activeSection, setActiveSection] = useState("comparable-explorer");
  const [activeEvidenceRefs, setActiveEvidenceRefs] = useState([]);
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);
  const [evidenceReturnFocusTo, setEvidenceReturnFocusTo] = useState(null);
  const [showAllEvidence, setShowAllEvidence] = useState(false);
  const activeModuleKey = sectionModules[activeSection] ?? "marketEvidence";
  const activeModule = refracturedPremiumReport[activeModuleKey] ?? refracturedPremiumReport.marketEvidence;

  const closeEvidenceDrawer = useCallback(() => {
    setEvidenceDrawerOpen(false);
    window.requestAnimationFrame(() => {
      evidenceReturnFocusTo?.focus?.({ preventScroll: true });
    });
  }, [evidenceReturnFocusTo]);

  function handleSectionChange(sectionId) {
    setActiveSection(sectionId);
    setActiveEvidenceRefs([]);
    setEvidenceDrawerOpen(false);
    setShowAllEvidence(false);
  }

  function openEvidenceDrawer(refs = []) {
    setEvidenceReturnFocusTo(document.activeElement);
    setActiveEvidenceRefs(Array.isArray(refs) ? refs : []);
    setShowAllEvidence(false);
    setEvidenceDrawerOpen(true);
  }

  function openEvidenceLedger() {
    setEvidenceReturnFocusTo(document.activeElement);
    setActiveEvidenceRefs([]);
    setShowAllEvidence(true);
    setEvidenceDrawerOpen(true);
  }

  return (
    <MarketWorkspaceShell
      activeModule={activeModule}
      activeSection={activeSection}
      marketEvidence={refracturedPremiumReport.marketEvidence}
      onEvidenceOpen={openEvidenceDrawer}
      onFullEvidenceOpen={openEvidenceLedger}
      onSectionChange={handleSectionChange}
      report={refracturedPremiumReport}
      sections={sections}
    >
      {activeSection === "market-map" ? (
        <MarketMap
          marketEvidence={refracturedPremiumReport.marketEvidence}
          onEvidenceOpen={openEvidenceDrawer}
          thesis={refracturedPremiumReport.thesis}
        />
      ) : null}
      {activeSection === "audience-signals" ? (
        <AudienceSignals
          audienceSignals={refracturedPremiumReport.audienceSignals}
          onEvidenceOpen={openEvidenceDrawer}
        />
      ) : null}
      {activeSection === "comparable-explorer" ? (
        <ComparableExplorer
          marketEvidence={refracturedPremiumReport.marketEvidence}
          onEvidenceOpen={openEvidenceDrawer}
        />
      ) : null}
      {activeSection === "review-community-themes" ? (
        <ReviewCommunityThemes
          onEvidenceOpen={openEvidenceDrawer}
          reviewCommunityThemes={refracturedPremiumReport.reviewCommunityThemes}
        />
      ) : null}
      {activeSection === "steam-page-lab" ? (
        <SteamPositioningBuilder
          onEvidenceOpen={openEvidenceDrawer}
          steamPageLab={refracturedPremiumReport.steamPageLab}
        />
      ) : null}
      {activeSection === "roguelite-loop-lab" ? (
        <RogueliteLoopLab
          onEvidenceOpen={openEvidenceDrawer}
          rogueliteLoopLab={refracturedPremiumReport.rogueliteLoopLab}
        />
      ) : null}
      {activeSection === "action-plan" ? (
        <ActionPlanTimeline
          actionPlan={refracturedPremiumReport.actionPlan}
          onEvidenceOpen={openEvidenceDrawer}
          strategicPaths={refracturedPremiumReport.strategicPaths}
        />
      ) : null}
      {activeSection === "evidence-ledger" ? (
        <EvidenceLedgerPage evidenceLedger={refracturedPremiumReport.evidenceLedger} />
      ) : null}
      <RefracturedEvidenceDrawer
        activeRefs={activeEvidenceRefs}
        evidence={refracturedPremiumReport.evidenceLedger}
        onClose={closeEvidenceDrawer}
        open={evidenceDrawerOpen}
        showAll={showAllEvidence}
      />
    </MarketWorkspaceShell>
  );
}

export default RefracturedReportPage;
