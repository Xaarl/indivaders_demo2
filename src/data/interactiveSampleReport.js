export const interactiveSampleReport = {
  meta: {
    id: "sample-small-indie-positioning",
    title: "Steam Positioning Report Sample",
    projectName: "Small 2D Action Prototype",
    stage: "Steam page / demo prep",
    readTime: "Interactive sample",
    updatedAt: "2026-06-14",
    promise:
      "A decision workspace that separates useful references from unsafe benchmarks before a team locks its Steam page, demo promise, price, or launch plan.",
  },
  verdicts: [
    {
      id: "true-comps",
      label: "True comparables",
      headline: "Do not benchmark against the biggest-looking reference first.",
      decision:
        "Use large recognizable games for readability lessons, not scope, wishlist, or sales expectations.",
      confidence: "High",
      evidenceRefs: ["tmnt-steam", "tmnt-dotemu"],
    },
    {
      id: "tag-promise",
      label: "Tag promise",
      headline: "Broad tags can attract the wrong expectations.",
      decision:
        "Use tags that explain the actual first-session fantasy, not every genre your game touches.",
      confidence: "Medium",
      evidenceRefs: ["review-method", "tmnt-steam"],
    },
    {
      id: "review-risk",
      label: "Review risks",
      headline: "The demo must prove feel before players forgive rough edges.",
      decision:
        "Put the strongest feedback loop and clearest combat promise in the first playable minute.",
      confidence: "Medium",
      evidenceRefs: ["review-method"],
    },
    {
      id: "resource-reality",
      label: "Production reality",
      headline: "Indie-looking references can hide publisher or team context.",
      decision:
        "Separate visual inspiration from resource benchmarking before expanding scope.",
      confidence: "High",
      evidenceRefs: ["dave-official", "dave-vgc"],
    },
    {
      id: "price-scope",
      label: "Price and scope",
      headline: "A higher price needs stronger proof of content breadth.",
      decision:
        "If the page cannot show breadth yet, position the game as focused rather than expansive.",
      confidence: "Medium",
      evidenceRefs: ["review-method", "dave-steam"],
    },
  ],
  comparables: [
    {
      id: "tmnt",
      title: "TMNT: Shredder's Revenge",
      role: "Unsafe commercial benchmark",
      x: 82,
      y: 36,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1361510/header.jpg",
      whyItAppears:
        "Readable 2D action, arcade combat promise, co-op appeal, and strong beat-'em-up clarity.",
      whyItIsRisky:
        "Licensed IP and publisher context change demand, reach, audience awareness, and production assumptions.",
      safeLesson: "Study page readability, enemy readability, and combat fantasy clarity.",
      unsafeAssumption:
        "Do not use it as a small-team sales, wishlist, scope, or launch visibility baseline.",
      evidenceRefs: ["tmnt-steam", "tmnt-dotemu"],
    },
    {
      id: "balatro",
      title: "Balatro",
      role: "Outlier pattern",
      x: 56,
      y: 26,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2379780/header.jpg",
      whyItAppears:
        "Compact presentation, clear hook, repeatable loop, and strong first-read marketability.",
      whyItIsRisky:
        "A breakout outlier is useful for studying hook clarity, but unsafe as a normal forecast.",
      safeLesson: "Study how quickly the page communicates the core loop and player fantasy.",
      unsafeAssumption:
        "Do not assume a compact idea automatically creates breakout demand.",
      evidenceRefs: ["balatro-steam", "balatro-wikipedia"],
    },
    {
      id: "dave",
      title: "Dave the Diver",
      role: "Production-reality warning",
      x: 68,
      y: 72,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1868140/header.jpg",
      whyItAppears:
        "Pixel art, approachable tone, hybrid loops, strong screenshots, and a broad adventure fantasy.",
      whyItIsRisky:
        "MINTROCKET/Nexon context and visible content breadth make it risky as a tiny-team scope reference.",
      safeLesson: "Study tone, loop layering, and store-page charm.",
      unsafeAssumption:
        "Do not treat broad hybrid scope as cheap just because the surface looks indie.",
      evidenceRefs: ["dave-steam", "dave-official", "dave-vgc"],
    },
  ],
  productionReality: {
    headline: "Visual similarity is not resource similarity.",
    realityStrip: {
      looksSimilar: "Pixel art, 2D action, arcade clarity, strong screenshots.",
      resourceDifference:
        "Some references carry license, publisher, team, or content-depth advantages that a small team cannot copy directly.",
      safeLesson:
        "Copy communication patterns and player promise clarity. Do not copy assumed scope.",
    },
    facts: [
      {
        label: "Licensed reference",
        value:
          "TMNT: Shredder's Revenge is built around the Teenage Mutant Ninja Turtles license.",
        status: "Confirmed",
        evidenceRefs: ["tmnt-steam"],
      },
      {
        label: "Publisher context",
        value: "Dotemu is presented publicly as publisher for TMNT: Shredder's Revenge.",
        status: "Confirmed",
        evidenceRefs: ["tmnt-dotemu"],
      },
      {
        label: "Dave the Diver studio context",
        value:
          "Official materials associate Dave the Diver with MINTROCKET, and public reporting discusses why it is not a typical tiny indie benchmark.",
        status: "Reported",
        evidenceRefs: ["dave-official", "dave-vgc"],
      },
    ],
    unknowns: [
      {
        label: "Exact marketing spend",
        value: "No reliable public source is used in this sample.",
        status: "Not publicly confirmed",
      },
      {
        label: "Exact production budget",
        value: "No reliable public source is used in this sample.",
        status: "Not publicly confirmed",
      },
    ],
  },
  reviewRisks: [
    {
      id: "demo-feel",
      label: "Demo feel",
      playerSignal: "Players in action lanes punish weak feedback quickly.",
      designMeaning:
        "The first session must prove responsiveness before asking for patience.",
      action: "Put the strongest hit feedback, dodge/impact clarity, or core verb in the first playable minute.",
      severity: "High",
      evidenceRefs: ["review-method"],
    },
    {
      id: "scope-expectation",
      label: "Scope expectation",
      playerSignal:
        "Broad genre language can make players expect more modes, progression, or content depth than a demo can show.",
      designMeaning:
        "The Steam page should signal a focused promise instead of an implied giant feature set.",
      action: "Rewrite the short description around one clear fantasy and one core loop.",
      severity: "High",
      evidenceRefs: ["review-method"],
    },
    {
      id: "onboarding-clarity",
      label: "Onboarding clarity",
      playerSignal:
        "If players do not understand the loop fast, they describe friction as design failure.",
      designMeaning:
        "The demo must teach by doing, not by front-loading explanation.",
      action: "Move the first interesting decision earlier and cut nonessential tutorial text.",
      severity: "Medium",
      evidenceRefs: ["review-method"],
    },
    {
      id: "value-doubt",
      label: "Value doubt",
      playerSignal:
        "Players compare perceived content depth against price and nearby games.",
      designMeaning:
        "A premium price needs visible breadth, replayability, or production quality proof.",
      action: "Show content depth signals with screenshots, trailer beats, and feature ordering.",
      severity: "Medium",
      evidenceRefs: ["review-method", "dave-steam"],
    },
    {
      id: "hook-visibility",
      label: "Hook visibility",
      playerSignal:
        "A strong idea can still be ignored if the page looks like a familiar genre clone.",
      designMeaning:
        "The differentiator must appear before players decide the game is generic.",
      action: "Lead capsule, trailer opening, and first paragraph with the unique player fantasy.",
      severity: "High",
      evidenceRefs: ["balatro-steam", "review-method"],
    },
  ],
  priceScope: {
    bands: [
      {
        id: "low",
        price: "$9.99",
        interpretation: "Focused, tight promise. Lower content breadth pressure.",
        risk: "Can look disposable if the hook is not instantly clear.",
        action: "Lead with the strongest hook and avoid broad scope language.",
      },
      {
        id: "mid",
        price: "$14.99",
        interpretation: "Healthy indie premium if the page proves polish, replayability, or clear depth.",
        risk: "Players may expect more content proof than a short demo currently shows.",
        action: "Show breadth through trailer structure, screenshots, and feature hierarchy.",
      },
      {
        id: "high",
        price: "$19.99",
        interpretation: "Higher expectation band. The page must prove depth, polish, and staying power.",
        risk: "A small visible scope can create value doubt before players reach the demo.",
        action: "Use this band only if the page can demonstrate content depth with confidence.",
      },
    ],
  },
  creatorAngles: [
    {
      id: "arcade-action",
      angle: "Readable arcade action with a tight first-session hook.",
      whyItFits:
        "Works for creators who cover compact indie action, demos, and Steam Next Fest discoveries.",
      risk: "Generic action pitches get ignored.",
      action: "Pitch the specific player fantasy, not a feature list.",
    },
    {
      id: "design-breakdown",
      angle: "Show the design problem the demo solves.",
      whyItFits:
        "Works for creators who like explaining mechanics, friction, and game-feel choices.",
      risk: "Too technical if the pitch forgets the player fantasy.",
      action: "Use one sentence about the fantasy, then one sentence about the mechanic.",
    },
    {
      id: "next-fest-discovery",
      angle: "A focused Next Fest discovery with a quick playable hook.",
      whyItFits:
        "Works for creators who cover demo roundups and short-form discovery content.",
      risk: "Late outreach gives creators no time to test the demo.",
      action: "Prepare a short creator brief before public demo traffic starts.",
    },
  ],
  nextActions: [
    {
      id: "replace-benchmark",
      title: "Replace one aspirational benchmark",
      action: "Add two smaller unlicensed games to the comparison set before deciding price or scope.",
      impact: "Prevents false confidence from large references.",
      effort: "Medium",
      evidenceRefs: ["tmnt-steam", "tmnt-dotemu"],
    },
    {
      id: "rewrite-short-description",
      title: "Rewrite the first promise",
      action: "Rewrite the first two Steam-page sentences around player fantasy, not feature inventory.",
      impact: "Improves first-read clarity and creator pitch usability.",
      effort: "Low",
      evidenceRefs: ["review-method"],
    },
    {
      id: "prove-feel-early",
      title: "Move proof of feel earlier",
      action: "Put the strongest responsive moment in the first playable minute of the demo.",
      impact: "Reduces early review risk around controls, clarity, and feedback.",
      effort: "Medium",
      evidenceRefs: ["review-method"],
    },
    {
      id: "price-proof",
      title: "Match price to visible proof",
      action: "Choose price language only after the page proves content breadth or focused value.",
      impact: "Reduces value doubt before players try the demo.",
      effort: "Low",
      evidenceRefs: ["review-method", "dave-steam"],
    },
    {
      id: "creator-angle",
      title: "Prepare one creator angle",
      action: "Write a 2-sentence pitch that leads with the player fantasy and one concrete hook.",
      impact: "Makes outreach easier without building a full creator CRM yet.",
      effort: "Low",
      evidenceRefs: ["balatro-steam", "review-method"],
    },
  ],
  sources: [
    {
      id: "tmnt-steam",
      name: "Steam Store",
      url: "https://store.steampowered.com/app/1361510/Teenage_Mutant_Ninja_Turtles_Shredders_Revenge/",
      label: "Confirmed",
      type: "steam_store",
      retrievedAt: "2026-06-14",
      note: "Steam page for TMNT: Shredder's Revenge.",
    },
    {
      id: "tmnt-dotemu",
      name: "Dotemu",
      url: "https://www.dotemu.com/games/teenage-mutant-ninja-turtles-shredders-revenge/",
      label: "Confirmed",
      type: "publisher_page",
      retrievedAt: "2026-06-14",
      note: "Publisher-facing page for TMNT: Shredder's Revenge.",
    },
    {
      id: "balatro-steam",
      name: "Steam Store",
      url: "https://store.steampowered.com/app/2379780/Balatro/",
      label: "Confirmed",
      type: "steam_store",
      retrievedAt: "2026-06-14",
      note: "Steam page for Balatro.",
    },
    {
      id: "balatro-wikipedia",
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Balatro",
      label: "Reported",
      type: "public_database",
      retrievedAt: "2026-06-14",
      note: "Public background reference for Balatro as a notable breakout case.",
    },
    {
      id: "dave-steam",
      name: "Steam Store",
      url: "https://store.steampowered.com/app/1868140/DAVE_THE_DIVER/",
      label: "Confirmed",
      type: "steam_store",
      retrievedAt: "2026-06-14",
      note: "Steam page for Dave the Diver.",
    },
    {
      id: "dave-official",
      name: "MINTROCKET",
      url: "https://mintrocketgames.com/en/DaveTheDiver",
      label: "Confirmed",
      type: "official_site",
      retrievedAt: "2026-06-14",
      note: "Official page for Dave the Diver.",
    },
    {
      id: "dave-vgc",
      name: "Video Games Chronicle",
      url: "https://www.videogameschronicle.com/news/dave-the-diver-director-says-theres-nothing-indie-about-it-and-he-didnt-apply-for-its-controversial-game-awards-nod/",
      label: "Reported",
      type: "article",
      retrievedAt: "2026-06-14",
      note: "Public reporting discussing Dave the Diver's indie classification context.",
    },
    {
      id: "review-method",
      name: "Indievaders review-risk method",
      url: "",
      label: "Inferred",
      type: "steam_reviews",
      retrievedAt: "2026-06-14",
      note: "Positioning inference from nearby review-language patterns. This sample does not quote live review text.",
    },
  ],
};

export default interactiveSampleReport;
