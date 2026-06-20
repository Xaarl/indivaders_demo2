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

const sectionPlaceholders = {
  player: {
    title: "Player DNA",
    description:
      "This module is wired and will be replaced by the dedicated interactive component in the next implementation tasks.",
  },
  roguelite: {
    title: "Roguelite loop",
    description:
      "This module is wired and will be replaced by the dedicated interactive component in the next implementation tasks.",
  },
  comparables: {
    title: "Comparables",
    description:
      "This module is wired and will be replaced by the dedicated interactive component in the next implementation tasks.",
  },
  steam: {
    title: "Steam page",
    description:
      "This module is wired and will be replaced by the dedicated interactive component in the next implementation tasks.",
  },
  paths: {
    title: "Paths",
    description:
      "This module is wired and will be replaced by the dedicated interactive component in the next implementation tasks.",
  },
  actions: {
    title: "Plan",
    description:
      "This module is wired and will be replaced by the dedicated interactive component in the next implementation tasks.",
  },
  evidence: {
    title: "Evidence",
    description:
      "This module is wired and will be replaced by the dedicated interactive component in the next implementation tasks. Evidence drawer arrives with the evidence module task.",
  },
};

function RefracturedReportPage() {
  const [activeSection, setActiveSection] = useState("overview");

  function openEvidenceDrawer() {
    setActiveSection("evidence");
  }

  const activePlaceholder = sectionPlaceholders[activeSection];

  return (
    <RefracturedReportFrame
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSourceDrawerOpen={openEvidenceDrawer}
      report={refracturedPremiumReport}
      sections={sections}
    >
      {activeSection === "overview" ? (
        <>
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
        </>
      ) : (
        <section className="refractured-module">
          <p className="refractured-kicker">Private interactive report</p>
          <h2>{activePlaceholder.title}</h2>
          <p>{activePlaceholder.description}</p>
        </section>
      )}
    </RefracturedReportFrame>
  );
}

export default RefracturedReportPage;
