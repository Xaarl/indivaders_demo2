export const evidenceLabels = [
  "Confirmed",
  "Reported",
  "Estimated",
  "Inferred",
  "Not publicly confirmed",
];

export const evidenceTypes = [
  "steam_store",
  "steam_reviews",
  "official_site",
  "press_kit",
  "developer_interview",
  "postmortem",
  "publisher_page",
  "public_database",
  "article",
  "reddit_ama",
  "youtube_or_podcast",
  "third_party_estimate",
];

export const evidenceLabelDefinitions = {
  Confirmed: "Visible in a primary public source such as Steam, an official site, a press kit, or a publisher page.",
  Reported: "Stated by a developer, publisher, interview, article, talk, or other public account.",
  Estimated: "Provided by a third-party estimator or calculated from public signals with uncertainty preserved.",
  Inferred: "Reasoned from multiple public signals; useful for positioning, not treated as fact.",
  "Not publicly confirmed": "Unavailable in reliable public sources; never filled with a guess.",
};

export const unknownHandlingRules = [
  "Budget, team size, marketing spend, sales, and revenue stay `Not publicly confirmed` unless a reliable public source states them.",
  "Third-party sales or revenue estimates must use `Estimated` and name the estimate type.",
  "Recommendations must cite a visible signal, reported fact, estimate, or explicit inference.",
  "A missing public fact is still evidence: it changes how confidently a game can be used as a benchmark.",
];

export const paidReportSchema = {
  productName: "Steam Positioning Report",
  audience: "Serious solo indie developers and small teams preparing a Steam page, demo, Next Fest beat, publisher pitch, or launch.",
  sections: [
    {
      id: "executive-read",
      title: "Executive Read",
      purpose: "State the current positioning problem, strongest visible hook, and highest-risk mismatch in plain language.",
      outputs: ["One-page read", "Primary recommendation", "Confidence note"],
    },
    {
      id: "market-lane",
      title: "Market Lane",
      purpose: "Identify the Steam lane the game appears to compete in and where that lane may be too broad or misleading.",
      outputs: ["Genre and tag lane", "Player expectation read", "Positioning risk"],
    },
    {
      id: "true-comparables",
      title: "True Comparables",
      purpose: "Separate useful reference games from attractive but misleading benchmarks.",
      outputs: ["Comparable set", "Rejected benchmark notes", "Evidence table"],
    },
    {
      id: "production-reality",
      title: "Production Reality",
      purpose: "Check whether visual ambition, content scope, publisher context, and visible polish match the team's likely constraints.",
      outputs: ["Scope read", "Resource-context warnings", "Unknowns list"],
    },
    {
      id: "tag-and-positioning",
      title: "Tag And Positioning",
      purpose: "Recommend how the Steam page should signal genre, fantasy, audience, and differentiator.",
      outputs: ["Tag suggestions", "Short description angle", "Capsule promise notes"],
    },
    {
      id: "review-risk-map",
      title: "Review Risk Map",
      purpose: "Use review language from nearby games to flag expectation failures before launch.",
      outputs: ["Risk themes", "Evidence snippets", "Mitigation ideas"],
    },
    {
      id: "price-and-scope-sanity",
      title: "Price And Scope Sanity",
      purpose: "Check whether public price, content promise, and perceived scale are aligned with nearby games.",
      outputs: ["Price-context read", "Scope expectation notes", "Confidence label"],
    },
    {
      id: "launch-timing",
      title: "Launch Timing",
      purpose: "Note visible launch-window constraints, demo-readiness risks, and timing considerations from public signals.",
      outputs: ["Timing watchouts", "Demo/page readiness notes", "Next milestone advice"],
    },
    {
      id: "creator-starter-list",
      title: "Creator Starter List",
      purpose: "Suggest creator or community angles using audience fit, not raw follower counts.",
      outputs: ["Creator angle types", "Search phrases", "Outreach caveats"],
    },
    {
      id: "prioritized-next-actions",
      title: "Prioritized Next Actions",
      purpose: "Turn the report into a short action list the team can use immediately.",
      outputs: ["Top 3 actions", "This-week page edits", "Evidence behind each action"],
    },
    {
      id: "source-appendix",
      title: "Source Appendix",
      purpose: "Show the evidence trail, labels, source types, unknowns, and inference boundaries.",
      outputs: ["Evidence log", "Unknowns", "Method notes"],
    },
  ],
};

export default paidReportSchema;

