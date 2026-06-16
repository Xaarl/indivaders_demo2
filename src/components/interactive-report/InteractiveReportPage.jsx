import { useState } from "react";
import interactiveSampleReport from "../../data/interactiveSampleReport.js";
import ComparableMap from "./ComparableMap.jsx";
import DecisionDeck from "./DecisionDeck.jsx";
import NextActionsBoard from "./NextActionsBoard.jsx";
import PriceScopeSimulator from "./PriceScopeSimulator.jsx";
import ProductionReality from "./ProductionReality.jsx";
import ReportFrame from "./ReportFrame.jsx";
import ReviewRiskExplorer from "./ReviewRiskExplorer.jsx";
import SourceDrawer from "./SourceDrawer.jsx";

function InteractiveReportPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [drawerState, setDrawerState] = useState({ open: false, refs: null });

  function openSourceDrawer(refs = null) {
    setDrawerState({ open: true, refs });
  }

  function closeSourceDrawer() {
    setDrawerState({ open: false, refs: null });
  }

  return (
    <ReportFrame
      report={interactiveSampleReport}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSourceDrawerOpen={openSourceDrawer}
    >
      {activeSection === "overview" ? (
        <DecisionDeck
          report={interactiveSampleReport}
          onSectionChange={setActiveSection}
          onSourceDrawerOpen={openSourceDrawer}
        />
      ) : null}
      {activeSection === "comparables" ? (
        <ComparableMap report={interactiveSampleReport} onSourceDrawerOpen={openSourceDrawer} />
      ) : null}
      {activeSection === "production" ? (
        <ProductionReality report={interactiveSampleReport} onSourceDrawerOpen={openSourceDrawer} />
      ) : null}
      {activeSection === "reviews" ? (
        <ReviewRiskExplorer report={interactiveSampleReport} onSourceDrawerOpen={openSourceDrawer} />
      ) : null}
      {activeSection === "price" ? <PriceScopeSimulator report={interactiveSampleReport} /> : null}
      {activeSection === "actions" ? (
        <NextActionsBoard report={interactiveSampleReport} onSourceDrawerOpen={openSourceDrawer} />
      ) : null}
      {activeSection === "sources" ? (
        <SourceDrawer
          open
          sources={interactiveSampleReport.sources}
          activeRefs={null}
          onClose={() => setActiveSection("overview")}
          variant="page"
        />
      ) : null}
      <SourceDrawer
        open={drawerState.open}
        sources={interactiveSampleReport.sources}
        activeRefs={drawerState.refs}
        onClose={closeSourceDrawer}
      />
    </ReportFrame>
  );
}

export default InteractiveReportPage;
