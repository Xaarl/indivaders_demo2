# Refractured V4 Market Intelligence Report Design

Date: 2026-06-21
Status: Draft for user review

## Decision

Rebuild the Refractured report from a tabbed interactive presentation into a
market-intelligence workspace with three explicit layers:

1. `Market Evidence`: public data, source material, community signals, review
   themes, and local premise facts.
2. `Interpretation`: what the evidence means for Refractured's audience,
   positioning, roguelite loop, risk, and opportunity.
3. `Action`: Steam page, trailer, demo, playtest, roadmap, and validation moves
   generated from the evidence and interpretation.

The current V3 route is useful as a proof that a React report surface can exist,
but it is not yet a paid product experience. It still feels like a generated
research report split into tabs. V4 must feel like a tool that helps the client
see what is true, what is inferred, what is unknown, and what they should do
next.

## Why V3 Is Not Enough

User review exposed the following product problems:

- Sections use the same pattern: large thesis, small selector, text cards,
  evidence button.
- Evidence feels like decorative source cards instead of usable proof.
- Player DNA reads like invented personas because it does not expose the data
  trail, player behaviors, or how the developer should use each segment.
- Roguelite Loop is too abstract. It states directions but does not help choose
  or test a run structure.
- Steam Page is not product-like enough. A few text variants do not justify a
  separate tab.
- Comparables improved after adding Steam images and market metrics, but narrow
  layouts duplicate imagery and the interaction does not yet feel like a real
  market explorer.
- Clean data, sourced facts, estimates, interpretation, recommendations, and
  unknowns are mixed together.

The core fix is not more text or more cards. The core fix is information
architecture: separate facts from interpretation, then make actions traceable to
the facts.

## Product Benchmark Lessons

V4 should borrow patterns from market-intelligence products rather than report
templates:

- SteamDB: quick scans of player activity, price, releases, tags, rankings, and
  charts before analysis.
- Gamalytic and VG Insights style tools: estimated owners/revenue, review
  counts, tags, release timing, and genre filters as market signals, not prose.
- Newzoo and Sensor Tower: clear separation between game performance data,
  audience research, market intelligence, store intelligence, and recommended
  action.
- Steamworks guidance: wishlists, visibility, tags, demos, traffic, and
  conversion each mean different things and should not be collapsed into one
  generic "Steam readiness" statement.
- GameDiscoverCo and How To Market A Game: discovery is a funnel of player
  attention, Steam page clarity, event timing, creator/community fit, and
  audience proof.

## V4 Experience Model

The report should open as a cockpit, not as a document.

The first screen should answer:

- What is the current commercial read?
- What evidence did we actually inspect?
- What is still missing?
- Which decision should the developer make next?

Primary navigation should move by job, not by essay topic:

1. `Market Map`
2. `Audience Signals`
3. `Comparable Explorer`
4. `Review & Community Themes`
5. `Steam Page Lab`
6. `Roguelite Loop Lab`
7. `Action Plan`
8. `Evidence Ledger`

Each module must show the same three-layer discipline:

- source-backed fact;
- Indievaders interpretation;
- recommended action or test.

## Module Design

### 1. Market Map

Purpose:

Show where Refractured sits before strategy advice appears.

Content:

- market lane: brutal 2.5D action roguelite / rogue-em-up;
- neighboring lanes: beat 'em up, hack and slash, action roguelite,
  character-action, dark fantasy action;
- known constraints: pre-Steam, private validation case, no live traffic,
  no actual wishlist data;
- opportunity: small but loyal brawler niche plus larger but crowded roguelite
  discovery lane;
- warning: players in this lane punish weak combat feel, fake roguelite depth,
  unclear hit readability, and generic dark fantasy.

UI:

- lane map with tag clusters;
- confidence chips for each cluster;
- clickable raw sources;
- "why it matters for Refractured" side panel.

### 2. Audience Signals

Purpose:

Replace vague Player DNA with evidence-backed player behavior.

Segments should not be presented as fictional personas. They should be presented
as expectation clusters:

- `Combat Feel Purists`: reward weight, readability, enemy tells, fair contact;
  punish floaty hits, cheap damage, weak impact, unclear depth collision.
- `Run Optimizers`: reward meaningful run-local choices, fast restart,
  behavior-changing builds, fair failure; punish flat stat soup and grind that
  hides weak combat.
- `Dark Action Buyers`: reward ritual identity, memorable threat, audiovisual
  consequence; punish generic dark fantasy and style without mechanics.
- `Creator-Clip Viewers`: reward instantly readable reversal, failure, punish,
  and build consequence; punish slow setup and menu-heavy proof.

Each cluster must show:

- source basis: reviews, Steam tags, public commentary, local premise, or
  inferred gap;
- what the player wants;
- what this means for design;
- what this means for Steam page/trailer;
- one test question to validate it.

### 3. Comparable Explorer

Purpose:

Make comparables feel like a real market instrument.

Required data per comparable:

- Steam app ID and link;
- Steam capsule/header image;
- release date;
- current price;
- review count and review tone;
- point-in-time current players where available;
- SteamSpy/Gamalytic-style owners estimate when available and clearly labeled;
- revenue proxy where useful and clearly labeled as estimated;
- public tag stack;
- market lane;
- why it is included;
- what to borrow;
- what not to copy;
- which Refractured decision it informs.

UI:

- no duplicate large image stack on narrow layouts;
- left-side or top compact game selector;
- main detail panel with one hero image, metrics, tag overlap, player signal,
  and decision relevance;
- comparison mode for two selected games;
- filter by role: closest lane, mechanic lesson, audience warning, scope trap,
  marketing clarity, unsafe benchmark.

### 4. Review & Community Themes

Purpose:

Answer: "What do players in this area actually praise and punish?"

Sources:

- Steam review API/theme sampling where accessible;
- Steam Discussions when public and relevant;
- Reddit when public and search-accessible;
- YouTube/Twitch creator coverage where public;
- X/Twitter only when public and relevant;
- Discord only if the client provides access or quotes.

UI:

- theme clusters, not persona cards;
- praise vs complaint split;
- source confidence;
- sample-size and access caveat;
- direct implication for Refractured.

If social listening is not completed, the module must show it as a research gap,
not as a weak placeholder.

### 5. Steam Page Lab

Purpose:

Make the Steam page section feel like a product tool.

The user should choose a positioning angle and see it change:

- first five-second trailer beat;
- short description;
- tag stack;
- capsule promise;
- screenshot priority;
- demo CTA;
- creator pitch;
- risk created by that promise.

The module should look like a lightweight Steam page simulator, not three cards.

### 6. Roguelite Loop Lab

Purpose:

Help the developer choose what the roguelite loop should prove.

It should compare concrete loop models:

- `Combat Mutation`: run choices change parry, stagger, bleed, overkill,
  spacing, enemy manipulation, or risk timing.
- `Route Pressure`: short room chains create fatigue, resources, and enemy-role
  decisions.
- `Nightmare Ritual`: death and ritual consequence reshape the next run and
  identity.

Each model must include:

- what changes in moment-to-moment play;
- why a player would run again;
- content burden;
- market promise;
- failure mode;
- playtest proof.

### 7. Action Plan

Purpose:

Turn evidence into a concrete next path.

Plan format:

- 0-30 days: hook test, combat feel test, one clipable fight.
- 30-90 days: 3-room micro-run, behavior-changing ritual choices, Steam page
  promise test.
- 3-12 months: scale decision based on proof, not ambition.

Each action must connect back to:

- source evidence;
- player expectation;
- metric or observation;
- artifact to produce.

### 8. Evidence Ledger

Purpose:

Make evidence useful, not decorative.

The ledger should be filterable by:

- public fact;
- third-party estimate;
- local project fact;
- review/community signal;
- inference;
- missing evidence.

Each item should answer:

- what was inspected;
- what it proves;
- what it does not prove;
- confidence level;
- what decision it supports;
- link or local path where safe.

## Data Model Direction

Do not keep all report content as one flat object.

Split the data into:

- `marketSources`
- `marketFacts`
- `comparables`
- `tagClusters`
- `playerExpectationClusters`
- `reviewThemeClusters`
- `communitySignals`
- `steamPageVariants`
- `rogueliteLoopModels`
- `recommendedActions`
- `evidenceLedger`

Each recommendation should include references to the facts and evidence items
that support it. The UI should be able to show "show evidence behind this"
without duplicating text across modules.

## Prototype Scope For Next Implementation Pass

Build one strong vertical slice before rewriting the whole report:

1. Fix report preview delivery through local Vite URL instead of relying on
   `file://dist`.
2. Replace the current `Comparables` tab with a V4 `Market Evidence` prototype.
3. Include real Steam images and metrics for the current comparable set.
4. Add a source/estimate mode toggle:
   - `Facts`
   - `Estimates`
   - `Interpretation`
   - `Actions`
5. Add a compact evidence side drawer that shows raw source, confidence, and
   supported decision.
6. QA desktop and narrow viewport before touching the remaining modules.

Only after this vertical slice feels premium should the same model be applied to
Audience Signals, Steam Page Lab, Roguelite Loop Lab, and Action Plan.

## Acceptance Criteria

- A skeptical indie developer can tell which parts are facts, estimates,
  interpretations, and recommendations.
- The report no longer feels like ChatGPT prose distributed across tabs.
- The first useful interaction provides something more valuable than manually
  browsing Steam pages.
- Comparables show real market shape: images, price, release, review scale,
  player activity pulse, tags, estimate caveats, and decision relevance.
- Evidence exposes useful proof and gaps, not generic methodology cards.
- Player segments are expectation clusters with source basis and use cases.
- Steam Page Lab behaves like a simulator, not copy blocks.
- Community and review listening are either genuinely sourced or explicitly
  marked as missing research.
- Narrow layouts do not duplicate large images or bury the active detail below
  repeated cards.
- Public UI remains English.

## Non-Goals

- No backend.
- No account system.
- No payment flow.
- No public sharing.
- No live Market Watch automation.
- No hard sales forecast.
- No claim that SteamSpy, Gamalytic, review multipliers, or other third-party
  estimates are actual revenue.

## Open Questions Before Full V4

- Should Refractured V4 remain a route inside the prototype, or should it become
  the first internal report-renderer pattern?
- Should the first paid product still be positioned as a `$49 early Steam
  Positioning Report`, or should this richer V4 imply a higher tier?
- How much manual expert review is required before community/review themes feel
  trustworthy?
- Which social listening channels are realistically available without client
  login: Reddit, Steam Discussions, YouTube, Twitch, X, or public Discord
  exports?
- Should the report include generated visual mockups of Steam capsule/trailer
  framing, or keep visuals limited to public comparable assets for now?
