import { useState } from "react";
import refracturedPremiumReport from "../../data/refracturedPremiumReport.js";
import RefracturedReportFrame from "./RefracturedReportFrame.jsx";

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
  const [activeEvidenceRefs, setActiveEvidenceRefs] = useState(null);

  function openEvidenceDrawer(refs = null) {
    setActiveEvidenceRefs(refs ?? refracturedPremiumReport.evidence.map((source) => source.id));
    setActiveSection((current) => (current === "evidence" ? current : current));
  }

  return (
    <RefracturedReportFrame
      activeEvidenceRefs={activeEvidenceRefs}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSourceDrawerOpen={openEvidenceDrawer}
      report={refracturedPremiumReport}
      sections={sections}
    >
      <section className="refractured-module">
        <p className="refractured-kicker">Private interactive report</p>
        <h1>{refracturedPremiumReport.thesis.headline}</h1>
        <p>{refracturedPremiumReport.thesis.body}</p>
        <p className="refractured-proof-question">{refracturedPremiumReport.thesis.proofQuestion}</p>
      </section>
      <section className="refractured-module">
        <p className="refractured-kicker">Implementation checkpoint</p>
        <h2>Route is wired. Interactive modules land in the next tasks.</h2>
      </section>
    </RefracturedReportFrame>
  );
}

export default RefracturedReportPage;
