# Refractured Premium Interactive Report Design

Date: 2026-06-20
Status: Approved direction, pending implementation plan

## Decision

Rebuild the Refractured deliverable as a premium interactive report experience,
not as a static research document, Markdown article, or table-heavy analytics
artifact.

The current v2 report is useful as an evidence and data snapshot, but it fails
as a paid client product because it reads like a generated deep-research report:
too much framework language, too many tables, too little guided interaction, and
not enough product-grade experience. V3 should make the reader feel that
Indievaders is a decision tool for their game, not a text generator.

## Product Goal

Create a client-facing Refractured report that a small indie developer would
want to click through, explore, and act on.

The first paid value moment should be:

> "This understands my game, shows the real buyer fantasy, exposes market risk,
> and gives me a way to test whether this can sell before I spend years on the
> wrong version."

## Success Criteria

- The report does not open with a wall of text, scorecard, or large table.
- The first screen gives a strong commercial thesis in under 30 seconds.
- The reader can choose what to inspect next instead of being forced through a
  long linear document.
- Interactions reveal analysis: path selection, benchmark filtering, player
  segment focus, roguelite-loop choices, Steam page/trailer beats, and evidence.
- Tables are moved into appendix/detail states unless they are compact and
  visibly useful.
- The report feels like a premium product surface inside Indievaders, not an
  exported research memo.
- Claims remain defensible through source/evidence drawers, but evidence does
  not dominate the main reading path.

## Non-Goals

- Do not build backend, auth, payments, public sharing, or live Market Watch.
- Do not turn this into a general analytics dashboard.
- Do not lead with KPI cards, matrices, or framework labels.
- Do not make hard revenue forecasts without data.
- Do not copy raw private Refractured assets into Indievaders.
- Do not make Data Analytics artifact the main client experience for this pass.

## Primary Surface

V3 should be implemented as an interactive report route in the Indievaders React
prototype, using the existing `#sample-report` product pattern as the closest
internal reference:

- section navigation;
- short decision-led panels;
- source drawer;
- clickable comparables;
- focused modules instead of one long article;
- local static data for now.

The static HTML and Markdown can remain as backup exports, but they are not the
premium experience. The Data Analytics artifact becomes an internal appendix and
evidence snapshot, not the customer-facing report.

There should be one primary client route. Static HTML, Markdown, and JSON
snapshots may mirror the content for backup and review, but the implementation
must not ask the user to choose between multiple "official" report versions.

## Reader Experience

### 1. Opening Thesis

The first screen should feel like a strategic read, not a methodology page.

It should answer:

- What is Refractured trying to sell?
- Why could this niche work?
- What could kill it commercially?
- What should be proven next?

Example thesis direction:

> Refractured should not sell itself as "a 2.5D brawler with roguelite
> elements." Its stronger commercial promise is a brutal retry loop where every
> run tests whether the player can turn violent contact, readable pressure, and
> ritual choices into mastery.

This wording is a draft, not final copy. The important rule is that the thesis
must be Refractured-specific and buyer-facing.

### 2. Choose Your Lens

Below the thesis, the user chooses what they want to inspect:

- `Can this sell?`
- `Who is the player?`
- `What should the roguelite loop prove?`
- `Which games are actually comparable?`
- `How should the Steam page and trailer open?`
- `What should we build in the next 30/90/365 days?`
- `What evidence supports this?`

Each lens should be a compact interactive module, not a full essay.

### 3. Player DNA

This module should describe the target player in plain, specific language.

It should cover:

- beat-em-up loyalists who punish weak contact feel, cheap damage, floaty hits,
  and unclear depth collision;
- action roguelite players who expect fast retry, meaningful run variation, fair
  failure, and build choices that change behavior;
- dark-action mood buyers who respond to brutality, ritual identity, and
  memorable threat;
- creator-viewer dynamics: what makes a moment clip-worthy.

The module should avoid generic persona cards. It should behave more like a
"what this player rewards / what this player rejects" inspector.

### 4. Roguelite Loop Lab

The roguelite premise is core, not optional. The report should let the client
compare possible roguelite directions:

- `Combat Mutation`: run choices change parry, stagger, bleed, overkill, spacing,
  enemy manipulation, or risk/reward timing.
- `Route Pressure`: short chains of rooms create escalating fatigue, resource
  decisions, and enemy-role combinations.
- `Nightmare Ritual`: meta progression changes identity, consequences, or
  rituals without hiding weak moment-to-moment combat.

The module should explain which direction is most sellable for the current
stage, what proof is required, and what would make the team pivot.

### 5. Comparable Explorer

Replace broad comparison tables with a visual explorer.

The reader should be able to filter references by role:

- `Closest market lane`
- `Useful mechanic lesson`
- `Audience expectation warning`
- `Scope trap`
- `Marketing clarity example`
- `Not safe as a benchmark`

Each game card should answer:

- why it appears;
- what to borrow;
- what not to copy;
- which player expectation it teaches;
- source confidence.

The default view should show insight, not columns.

### 6. Steam Page And Trailer Builder

This should be one of the most product-like parts of the report.

It should show:

- alternative one-line Steam promises;
- first 5 seconds of trailer framing;
- capsule-message candidates;
- tag stack implications;
- demo CTA;
- creator pitch angle.

The user should be able to select a positioning angle and see how it changes the
trailer beats and Steam page promise.

### 7. Strategic Path Selector

The old Path A/B/C should become an interactive selector, not a recommendation
table.

Paths should be conditional:

- `Proof Sprint`: best first market test when no public Steam page exists.
- `Content Expansion`: only when players already want more routes, enemies,
  weapons, or co-op after the core loop works.
- `Mastery Platform`: only when combat mastery itself becomes the reason people
  return and funding supports the burden.

The interface should show:

- what must be true before choosing the path;
- what the path buys commercially;
- what it risks;
- what proof would move the project to another path.

### 8. Action Plan

The plan should be short, visual, and decision-oriented:

- 0-30 days: prove hook and combat feel.
- 30-90 days: prove second-run desire and Steam page clarity.
- 3-12 months: decide whether to scale content, deepen mastery, seek funding, or
  stay focused.

Each action should have:

- outcome;
- artifact to produce;
- test signal;
- owner-facing rationale;
- source/evidence access.

### 9. Evidence Drawer And Appendix

Evidence should be one click away from every major claim, but it should not own
the main page.

The drawer should include:

- source name;
- link/path where safe;
- evidence level: confirmed, reported, estimated, inferred, or not publicly
  confirmed;
- why the evidence matters;
- what remains unknown.

Long tables, complete KPI definitions, and the full evidence ledger belong here,
not in the primary narrative flow.

## Visual Direction

The report should feel like a premium strategy tool for games:

- dark, high-contrast, game-adjacent but not noisy;
- fewer cards, stronger modules;
- visual hierarchy built around decisions;
- compact text blocks;
- large thesis moments;
- interactive controls that feel purposeful;
- source chips as trust affordances, not disclaimers;
- no decorative clutter that competes with the analysis.

Avoid:

- generic SaaS dashboard grids;
- "AI report" formatting;
- large comparison tables above the fold;
- endless cards with equal weight;
- generic matrix labels as visible product language.

## Data Model

Use static data for this pass, likely under `src/data/`, with a structure closer
to product modules than report sections:

- `thesis`
- `readerLenses`
- `playerSignals`
- `rogueliteDirections`
- `comparables`
- `positioningAngles`
- `trailerBeats`
- `strategicPaths`
- `actionPlan`
- `evidence`

The existing `docs/client-reports/refractured-report-v2-artifact.json` can feed
parts of this data, but the visible model should be rewritten for the
interactive experience.

## Source And Evidence Requirements

Use the same evidence discipline as v2:

- confirmed;
- reported;
- estimated;
- inferred;
- not publicly confirmed.

However, the visible report should translate evidence into insight. It should
not expose raw evidence structure unless the user opens the source drawer or an
appendix.

Public research should remain current and conservative:

- Steam pages and tags;
- official game pages;
- public review aggregates where accessible;
- SteamDB/Gamalytic/VG Insights/GameDiscoverCo-style market references when
  usable and properly labeled;
- Reddit/Discord/social listening only when actually sourced, otherwise marked
  as an evidence gap.

## Implementation Shape

Likely app structure:

- add a Refractured-specific interactive report route or local preview route;
- create a Refractured report data file;
- add focused components for the major modules;
- reuse or adapt the existing source drawer and report frame patterns;
- keep static HTML/Markdown exports as secondary mirrors;
- update workflow notes and decision log after implementation.

The exact implementation plan should be written separately after this spec is
reviewed.

## Quality Bar

Before calling V3 ready:

- Open the report in desktop and narrow/mobile viewport.
- Confirm the first screen is not text-heavy.
- Confirm a skeptical developer can find value without reading the whole report.
- Confirm no section looks like a generic ChatGPT/Gemini deep-research output.
- Confirm tables appear only in detail or appendix states.
- Confirm every major recommendation has evidence access.
- Confirm the report clearly answers:
  - who the player is;
  - why the niche is viable but hard;
  - how roguelite systems can make the game more sellable;
  - what to test before Steam;
  - how the team avoids a five-year commercial miss.
- Run `npm run verify` after any app/source changes.

## Expected Follow-Up

After this spec is reviewed, create an implementation plan for the V3
interactive report. The implementation plan should split work into:

1. data model rewrite;
2. interactive module design;
3. React route/components;
4. visual polish;
5. static mirror cleanup;
6. QA and review.

The plan should explicitly identify the primary route, backup files, and which
older v2 surfaces are kept only as evidence archives.
