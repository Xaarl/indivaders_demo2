# Indievaders Guided Report Unlocks Design

Date: 2026-06-22
Status: Draft for user review

## Decision

Indievaders reports should not be dense dashboards, AI-style research pages, or
walls of cards. The client-facing report should become a guided, interactive
strategy quest that unlocks deeper tools as the reader moves through the story.

The product model is:

1. A paid report run creates a frozen intelligence snapshot using the best
   available public, paid, or limited research sources.
2. The report presents the snapshot as a guided strategic story.
3. Each chapter unlocks an interactive module that lets the client explore the
   implications.
4. After the story is complete, the client has a private workspace built on the
   report snapshot, public/free data, and their own inputs.

This lets the report feel complete and paid-worthy while still turning into an
interactive playground for clients who want to test hypotheses.

## Why The Current Direction Failed

The current Refractured V6 direction still feels wrong because it preserves the
wrong interaction model:

- It still looks like an admin dashboard.
- Too many elements have the same visual weight.
- Text boxes remain the main unit of value.
- The UI uses repeated bordered cards instead of memorable interactive scenes.
- The first screen does not create curiosity or a sense of progress.
- The visual language differs from the more playful, game-like landing page.
- Evidence and metrics feel like exposed machinery rather than supporting
  proof.

The fix is not to remove content or polish the same card layout. The fix is to
change the report format.

## Product Principle

The report should lead. The workspace should unlock.

The first experience should answer:

- What is the strongest read on this game?
- What will the target player need to feel?
- What does the niche reward and punish?
- What does the market already understand?
- What proof should unlock the next move?

The later workspace should answer:

- What happens if we change the target player?
- What happens if we reposition the hook?
- What happens if the project leans harder into one niche?
- What price, scope, demo, and store promise make the most sense?
- Which evidence supports the current recommendation?

## Experience Model

Use a guided report with symbolic/progressive unlocks.

The report opens with a short strategic read, then moves through a mission track.
Unlockable modules are visible from the beginning, but they are symbolically
locked until the relevant chapter gives enough context.

This is a pacing device, not a hard product restriction. The goal is to keep the
client oriented while giving them a game-like sense of progress.

## Universal Mission Track

The mission track must work for any game, not only Refractured.

Use these universal chapters:

1. **Market Read**  
   Where the project stands and what the core opportunity appears to be.

2. **Player Pull**  
   What should make the right player click, remember, wishlist, and come back.

3. **Niche Rules**  
   What this niche rewards, what it punishes, and what players will not forgive.

4. **Rival Signals**  
   What comparable games show about market expectations, language, scope, and
   proof.

5. **Storefront Hook**  
   How the Steam-facing promise should work: capsule, tags, trailer opening,
   screenshot priority, and demo call to action.

6. **Business Shape**  
   Pricing, scope, demo strategy, Early Access fit, wishlist funnel, funding
   path, and commercial risk.

7. **Proof Plan**  
   What should be proven in 30, 90, and 365 days before bigger ambition is
   justified.

## Unlockable Modules

Avoid naming every module "Lab." Use names that feel like report tools or
game-like modules.

Recommended module names:

- **Market Map**
- **Player DNA**
- **Niche Rules**
- **Rival Signals**
- **Storefront Hook**
- **Business Shape**
- **Scenario Board**
- **Evidence Vault**

For a specific game, a module can expose a more tailored sub-object. For
Refractured, **Niche Rules** can include a **One-More-Run Engine** or
**Return Loop** because the roguelite return loop is central to the project's
commercial question.

## Refractured-Specific Read

Refractured should not be framed as "a 2.5D brawler with roguelite elements" if
that buries the player fantasy. The report should investigate whether the game
can own a sharper promise:

> readable brutal combat that makes players want one more run.

The important commercial question is not whether the project can become large.
The important question is whether the first fight and the retry loop are hard to
put down.

Draft opening copy direction:

> Make the first fight hard to put down.
>
> A small demo can work.
> A vague one usually cannot.
>
> This report shows what Refractured needs players to feel first, what this
> niche will demand, and what proof should unlock the next move.

This copy establishes the required tone for the narrative review: plain, human,
tense, and useful.

## Narrative And Copy Rules

Add a dedicated narrative/copy review step before implementation.

The report copy should:

- sound like a skilled human strategist talking to a game creator;
- address the creator's real anxiety: "Will anyone remember this? Will anyone
  care enough to wishlist, buy, and return?";
- use concrete verbs and player behavior instead of consulting phrases;
- avoid generic AI wording such as "commercial path," "unlock potential,"
  "strategic opportunity," and "market positioning" unless the sentence earns
  them;
- avoid clickbait, hype, and false certainty;
- keep headings meaningful when read out of context;
- use short paragraphs and one idea per block;
- make the reader want to continue because the next section answers a real
  creative or commercial question.

Copy should not sound like:

> Your strongest commercial path is a brutal action roguelite.

Copy should sound closer to:

> Can the first fight give players a reason to come back?

or:

> Make the part players remember strong enough before asking them to believe in
> the whole game.

These are examples, not locked final headlines.

## Visual Direction

The visual language should unify the landing page and report.

Use a sleek, game-adjacent report interface inspired by:

- interactive premium reports with smooth narrative pacing;
- design-system sites with geometric grids, subtle depth, and satisfying hover
  states;
- data storytelling sites that reveal complexity through interaction instead of
  showing everything at once;
- game mission boards and progression tracks, without becoming juvenile or
  fantasy-themed.

Do:

- make one strong interactive scene dominate each chapter;
- use geometric grids, nodes, lines, paths, soft glow, and subtle parallax;
- reveal detail through hover, click, scroll, and unlock states;
- keep text short and intentional;
- use motion to create clarity, not decoration;
- keep evidence behind "why" actions;
- make unlocked modules feel satisfying to open.

Do not:

- build another card wall;
- use a permanent evidence rail;
- show every metric at once;
- make the report look like a CRM/admin dashboard;
- use generic stock-fantasy visuals;
- make the design one-note dark panels with amber borders;
- hide useful content by simply deleting it.

## Chapter Pattern

Each chapter should have one primary visual artifact.

Recommended pattern:

1. **Lead:** one human headline and one short explanation.
2. **Scene:** one interactive object such as a map, board, loop, mock page, or
   scenario surface.
3. **Choice:** a small number of meaningful interactions.
4. **Unlock:** a module becomes available.
5. **Evidence:** optional supporting proof on demand.

Examples:

- **Market Read** unlocks **Market Map**.
- **Player Pull** unlocks **Player DNA**.
- **Niche Rules** unlocks a game-specific niche module; for Refractured, this is
  the **One-More-Run Engine**.
- **Rival Signals** unlocks **Rival Signals** or a comparable explorer.
- **Storefront Hook** unlocks a Steam-facing interactive mock.
- **Business Shape** unlocks **Scenario Board**.
- **Proof Plan** unlocks **Evidence Vault** and action tracking.

## Evidence Model

Evidence is the proof layer, not the main reading path.

Each recommendation should be traceable to:

- facts;
- estimates;
- interpretation;
- actions or gaps.

But the default reader should see evidence only when asking "why should I
believe this?" Evidence should explain what the source supports, what its limits
are, and whether it is confirmed, reported, estimated, inferred, or missing.

Raw endpoints and source mechanics should never be the main call to action in
the client report.

## Content Preservation

Reducing dashboard noise must not mean cutting useful content.

Detailed comparables, review themes, pricing assumptions, owner ranges, Steam
signals, and caveats should remain available, but they should move into
appropriate interactive modules:

- short insights in the guided chapter;
- detailed rows/cards only after the module is unlocked;
- source evidence in the vault;
- raw data in export or audit views.

The report should feel simpler because it is staged well, not because it is
emptier.

## Implementation Boundaries

Keep in scope for the next implementation sprint:

- Refractured client report route;
- guided report opening;
- mission track and symbolic unlock state;
- first-pass visual system aligned with landing;
- replacement of current dashboard overview;
- at least two real unlocked modules, likely **Market Map** and
  **Player DNA** or **Storefront Hook**;
- evidence kept on demand;
- responsive QA.

Out of scope for the next implementation sprint:

- backend;
- auth;
- payments;
- real paid API integration;
- live scraping;
- full public sharing;
- making every future module feature-complete.

## Acceptance Criteria

The redesign is acceptable only if:

- the first screen no longer resembles an admin dashboard;
- the report reads as a guided strategic story, not a data dump;
- unlockable modules are visible from the beginning;
- the user feels progression while staying oriented;
- the first chapter has one dominant visual scene;
- at least two unlocked modules are genuinely interactive;
- useful detailed data remains accessible, not deleted;
- evidence is available on demand, not dominant by default;
- the visual language feels related to the landing page;
- desktop and narrow viewport QA show no clipping, overlap, or horizontal
  scrolling;
- copy passes a narrative review for natural human tone.

## First Prototype Decisions

The first implementation pass should use these defaults:

1. Implement **Market Map** and **Player DNA** as the first two real unlocked
   modules after **Market Read**. These create the strongest early contrast with
   the current dashboard and establish the "report unlocks tools" pattern.
2. Store unlock progress in local UI state for the prototype. A generated report
   should replay the guided sequence by default, with unlocked modules becoming
   available as the user advances.
3. Add a low-emphasis "skip to workspace" action only after the first chapter
   completes. Do not show it on the opening screen.
4. Use restrained motion: hover lift, line activation, node glow, smooth section
   transitions, and subtle grid/parallax. Do not add motion that delays reading
   or hides controls.
5. Treat dark game-adjacent backgrounds, geometric grids, node lines, amber
   decision highlights, teal analytical states, sharp panels, and satisfying
   click transitions as the shared visual language for landing and report.

## Next Step

After user review, create a focused implementation plan. The plan should start
with a visual/narrative prototype instead of directly editing the current V6
dashboard components.
