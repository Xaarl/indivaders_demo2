import { evidenceLabels, evidenceTypes } from "./reportSchema.js";

export const caseStudyEvidenceLabels = evidenceLabels;
export const caseStudyEvidenceTypes = evidenceTypes;

export const caseStudies = [
  {
    id: "case-file-001",
    caseFile: "Real Game Case File 001",
    title: "TMNT: Shredder's Revenge",
    imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1361510/header.jpg",
    hook: "The licensed benchmark trap.",
    teaser:
      "Looks relevant if you make a 2D action game, but the license, publisher, nostalgia, and production context change the signal.",
    lesson:
      "Use it for genre clarity cues, not for sales, wishlist, or scope expectations.",
    ctaText: "Open the trap",
    compactDetails: {
      whatLooksComparable:
        "Fast 2D action, clear co-op appeal, readable combat fantasy, and a strong arcade beat-'em-up promise.",
      whatIsDifferent:
        "The Teenage Mutant Ninja Turtles license, Dotemu publishing context, nostalgia pull, and production support make it unsafe as a small-team benchmark.",
      whatTheReportFlags:
        "The report separates useful page-language cues from unsafe assumptions about demand, reach, budget, and audience awareness.",
      decision:
        "Use it for beat-'em-up readability cues, not as a small-team commercial target.",
      nextAction:
        "Add smaller unlicensed beat-'em-ups to the comparison set before setting price, wishlist, or scope expectations.",
    },
    evidenceItems: [
      {
        label: "Steam page",
        type: "steam_store",
        sourceName: "Steam Store",
        sourceUrl: "https://store.steampowered.com/app/1361510/Teenage_Mutant_Ninja_Turtles_Shredders_Revenge/",
        claim: "Steam presents the game around the Teenage Mutant Ninja Turtles license.",
      },
      {
        label: "Publisher context",
        type: "publisher_page",
        sourceName: "Dotemu",
        sourceUrl: "https://www.dotemu.com/games/teenage-mutant-ninja-turtles-shredders-revenge/",
        claim: "Publisher-facing materials identify Dotemu as publisher.",
      },
    ],
  },
  {
    id: "case-file-002",
    caseFile: "Real Game Case File 002",
    title: "Balatro",
    imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2379780/header.jpg",
    hook: "Learn the pattern, not the miracle.",
    teaser:
      "A breakout hit can reveal repeatable hook clarity, but its outcome should not become your forecast.",
    lesson:
      "Study hook clarity and replayability. Do not use an outlier as your baseline.",
    ctaText: "Open the pattern",
    compactDetails: {
      whatLooksComparable:
        "Compact presentation, clear rules hook, replayable structure, and strong word-of-mouth potential.",
      whatIsDifferent:
        "A breakout outlier is useful for pattern recognition, but dangerous as a sales forecast or default launch target.",
      whatTheReportFlags:
        "The report checks whether your first-read promise is as legible as the reference, and whether the comparison is becoming fake precision.",
      decision: "Copy the clarity discipline, not the miracle outcome.",
      nextAction:
        "Compare against several smaller deckbuilders and roguelikes before deciding price, tags, or launch ambition.",
    },
    evidenceItems: [
      {
        label: "Steam page",
        type: "steam_store",
        sourceName: "Steam Store",
        sourceUrl: "https://store.steampowered.com/app/2379780/Balatro/",
        claim: "Steam positions Balatro around poker-inspired roguelike deckbuilding.",
      },
      {
        label: "Public context",
        type: "public_database",
        sourceName: "Wikipedia",
        sourceUrl: "https://en.wikipedia.org/wiki/Balatro",
        claim: "Public references describe Balatro as a notable breakout case.",
      },
    ],
  },
  {
    id: "case-file-003",
    caseFile: "Real Game Case File 003",
    title: "Dave the Diver",
    imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1868140/header.jpg",
    hook: "Indie-looking is not always indie-scale.",
    teaser:
      "Pixel art and cozy tone can hide publisher context, content breadth, and production support.",
    lesson: "Compare resource reality before copying scope.",
    ctaText: "Open the reality check",
    compactDetails: {
      whatLooksComparable:
        "Pixel art, approachable tone, hybrid loops, strong screenshots, and an inviting adventure/management fantasy.",
      whatIsDifferent:
        "MINTROCKET/Nexon context and visible content breadth make it risky as a tiny-team scope benchmark.",
      whatTheReportFlags:
        "The report separates visual inspiration from production reality so small teams do not inherit scope they cannot support.",
      decision:
        "Use it for content-loop and tone lessons, not as proof that broad hybrid scope is cheap.",
      nextAction:
        "Choose references with public team/resource context closer to your own before expanding scope.",
    },
    evidenceItems: [
      {
        label: "Steam page",
        type: "steam_store",
        sourceName: "Steam Store",
        sourceUrl: "https://store.steampowered.com/app/1868140/DAVE_THE_DIVER/",
        claim: "Steam presents Dave the Diver as an adventure, RPG, and management hybrid.",
      },
      {
        label: "Studio context",
        type: "official_site",
        sourceName: "MINTROCKET",
        sourceUrl: "https://mintrocketgames.com/en/DaveTheDiver",
        claim: "Official materials associate Dave the Diver with MINTROCKET.",
      },
      {
        label: "Production context",
        type: "article",
        sourceName: "Video Games Chronicle",
        sourceUrl:
          "https://www.videogameschronicle.com/news/dave-the-diver-director-says-theres-nothing-indie-about-it-and-he-didnt-apply-for-its-controversial-game-awards-nod/",
        claim: "Public reporting discusses why Dave the Diver is not a typical indie benchmark.",
      },
    ],
  },
];

export default caseStudies;

