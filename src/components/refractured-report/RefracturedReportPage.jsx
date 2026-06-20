import { useState } from "react";
import refracturedPremiumReport from "../../data/refracturedPremiumReport.js";
import LensHub from "./LensHub.jsx";
import OpeningThesis from "./OpeningThesis.jsx";
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
  const [activeLensId, setActiveLensId] = useState(refracturedPremiumReport.readerLenses[0]?.id ?? null);
  const [activeEvidenceRefs, setActiveEvidenceRefs] = useState([]);

  function handleSectionChange(sectionId) {
    const matchingLens = refracturedPremiumReport.readerLenses.find((lens) => lens.section === sectionId);

    setActiveLensId(matchingLens?.id ?? null);
    setActiveSection(sectionId);
    if (sectionId !== "evidence") {
      setActiveEvidenceRefs([]);
    }
  }

  function handleLensSelect(lens) {
    setActiveLensId(lens.id);
    setActiveSection(lens.section);
    if (lens.section === "evidence") {
      setActiveEvidenceRefs(lens.evidenceRefs ?? []);
    }
  }

  function openEvidenceDrawer(refs = []) {
    setActiveEvidenceRefs(Array.isArray(refs) ? refs : []);
    setActiveSection("evidence");
  }

  const activePlaceholder = sectionPlaceholders[activeSection];
  const selectedEvidenceCopy =
    activeEvidenceRefs.length > 0 ? `Selected evidence: ${activeEvidenceRefs.join(", ")}` : "Selected evidence: none selected.";

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
      ) : (
        <section className="refractured-module">
          <p className="refractured-kicker">Private interactive report</p>
          <h2>{activePlaceholder.title}</h2>
          <p>{activePlaceholder.description}</p>
          {activeSection === "evidence" ? <p className="refractured-selected-evidence">{selectedEvidenceCopy}</p> : null}
        </section>
      )}
    </RefracturedReportFrame>
  );
}

export default RefracturedReportPage;
