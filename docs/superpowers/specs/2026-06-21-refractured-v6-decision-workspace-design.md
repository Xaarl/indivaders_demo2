# Refractured V6 Decision Workspace Design

Date: 2026-06-21
Status: Draft for user review

## Decision

V6 rejects the current V5 workspace as the client-facing paid-product direction.
V5 proved that the report can render as an interactive React workspace, but the
visible experience still feels like a dense debug dashboard or AI research
report: too many cards, too much text, too much source noise, and not enough
clear client value in the first 30 seconds.

V6 will rebuild the opening experience around one product promise:

> Show where Refractured can compete, what must be proven first, and which
> module the client should inspect next.

The default first screen should be a decision workspace, not a full report. It
combines:

1. a short strategy brief;
2. a central `Market Lane Canvas`;
3. a contextual inspector;
4. a compact `Commercial Proof Path` strip.

## Why V5 Failed

User review identified these product failures:

- The workspace showed too much information at once.
- `Market Map` degraded into broken or fallback layout in browser review.
- `Roguelite Loop Lab` repeated the exact anti-pattern the user flagged:
  many same-looking cards in the center.
- `Action Plan` looked structurally broken when rendered in the browser.
- Evidence still exposed raw API pages and source mechanics too prominently.
- The first screen felt like a dense dashboard rather than a client
  orientation layer.
- Visual concepts drifted toward stock fantasy or generic dashboard UI instead
  of a credible market-intelligence product.
- The center of the proposed decision map looked abstract and did not create
  the core "aha": where Refractured sits in the market and why the lane matters.

The fix is not more polish on the existing card system. The fix is a different
information architecture.

## Product Principle

Every V6 screen must answer one job:

- `Opening`: where is the opportunity and what proof comes next?
- `Market Lane`: where does Refractured sit against useful comparables?
- `Steam Promise`: how can the game be sold clearly in five seconds?
- `Roguelite Proof`: what loop model creates repeat desire?
- `Action Plan`: what proof gates unlock the next ambition?
- `Evidence`: why should the client trust the claim?

The first screen must not attempt to answer all of these in full.

## Opening Screen

### First 30 Seconds

The client should immediately understand:

1. Refractured has a plausible commercial lane.
2. The lane is `brutal action roguelite`, not generic 2.5D brawler.
3. The opportunity depends on proving first-fight feel and second-run desire.
4. The report can show market context, Steam promise, loop proof, and proof
   gates without reading a long document.

Suggested visible verdict:

> Refractured can compete as a brutal action roguelite if the first fight and
> second-run desire are proven before promising scale.

Keep the opening copy under roughly 120 to 150 visible words above the fold.

### Layout

The opening screen uses four regions:

1. `Navigation`: narrow left rail with section names only. No large project art,
   no permanent at-a-glance card.
2. `Strategy Brief`: compact top band with verdict, confidence, and next best
   test.
3. `Market Lane Canvas`: main central artifact.
4. `Inspector`: right-side contextual panel for the selected lane, comparable,
   or Refractured marker.
5. `Proof Path`: bottom strip with proof gates.

The visual density should feel closer to a premium market-intelligence tool than
to a game site, spreadsheet, or research PDF.

## Market Lane Canvas

The central artifact is the first screen's value moment.

### Purpose

Show the client:

- where Refractured sits;
- which comparables are useful and why;
- where the promising whitespace is;
- which evidence layer is currently being inspected.

### Visual Model

Use a two-axis market lane canvas:

- X axis: `Combat immediacy` to `Systemic mastery`
- Y axis: `Arcade brawler` to `Action roguelite`

Visible markers:

- `Refractured`: active marker, visually distinct.
- `Absolum`: closest market promise.
- `Dead Cells`: loop clarity benchmark.
- `Curse of the Dead Gods`: dark risk/reward identity.
- `Rotwood`: co-op and content pressure warning.
- `Hades II`: expectation ceiling and unsafe scale benchmark.

The first view should show 5 to 6 comparables maximum. The full comparable set
belongs in a deeper module.

### Canvas Details

The canvas should include:

- a subtle white-space zone label: `Brutal readable combat + repeatable run
  fantasy`;
- marker labels with tiny image/capsule hints where useful;
- one selected marker at a time;
- layer toggles for `Facts`, `Estimates`, `Interpretation`, `Actions`;
- no full card grid inside the canvas;
- no source links inside the canvas.

Layer toggles change the overlay on the same canvas. They do not open separate
walls of text.

## Contextual Inspector

The inspector explains only the selected object.

For a comparable, show:

- role: closest promise, loop clarity, scope warning, identity reference, or
  unsafe benchmark;
- what to borrow;
- what not to copy;
- why it matters for Refractured;
- confidence;
- one button: `Why we believe this`.

For Refractured, show:

- current lane hypothesis;
- proof gap;
- next best test;
- what evidence is missing.

Raw URLs never appear as the primary action. If a raw source is available, it is
secondary inside the evidence reader as `Raw endpoint`.

## Commercial Proof Path

The bottom strip turns the market read into an action sequence:

1. `Hook`: can target players understand the promise in 45 to 90 seconds?
2. `First Fight`: does combat feel readable, heavy, and fair?
3. `Second Run`: does the roguelite layer change behavior, not just stats?
4. `Steam Promise`: do capsule, tags, and trailer sell one promise?
5. `Scope Decision`: what ambition is unlocked by the proof?

The strip is not a list of cards. It is a compact path with state:

- `ready to test`;
- `needs evidence`;
- `locked until proof`;
- `not evaluated yet`.

Use positive, ambition-unlocking language. Avoid framing the product as "do not
expand scope" unless the proof truly fails.

## Supporting Modules

### Market Lane Module

Expands the opening canvas into full comparable exploration:

- more comparables;
- filters by role;
- public Steam metrics;
- estimated owners/revenue caveats;
- tag overlap;
- release and review context;
- side-by-side compare.

This module can be denser than the opening screen, but it still must not become
a card wall.

### Steam Promise Lab

Answers:

> How can this game be sold clearly on Steam in five seconds?

Core artifact:

- capsule promise;
- tag stack;
- first trailer beats;
- screenshot priority;
- target player reaction;
- risk of wrong audience.

The user can switch positioning options, but only one option is expanded at a
time.

### Roguelite Proof Lab

Replaces card grids with a loop diagram:

`fight -> reward -> mutation -> retry -> intent`

The lab compares at most three loop models:

- combat mutation;
- route pressure;
- nightmare ritual.

Only one model is expanded at a time. The expanded model shows:

- what changes player behavior;
- why it creates replay desire;
- content burden;
- failure mode;
- playtest proof.

### Action Plan

Uses a proof-gate timeline, not action cards.

Each gate shows:

- test;
- artifact;
- success signal;
- decision unlocked.

The path should motivate the team by showing what new ambition becomes justified
when evidence appears.

### Evidence

Evidence is an audit layer, not the primary reading path.

The evidence reader shows:

- source name;
- source type;
- checked date or snapshot date where available;
- extracted fields;
- what it supports;
- known limits;
- confidence label;
- optional `Raw endpoint` as a secondary audit link.

The default user should never be thrown into a raw JSON API page from an
ordinary evidence click.

## Visual Direction

Use `Market Intelligence War Room` as the main visual direction, with
`Strategy Briefing Studio` restraint on the opening screen.

### Do

- Use restrained dark professional UI.
- Use compact, readable typography.
- Use small controlled game thumbnails only as market reference markers.
- Use amber for decisions and calls to action.
- Use teal/green for status and analytical overlays.
- Use red only for genuine risk.
- Use thin dividers, sharp panels, and small radii.
- Let one central artifact dominate each screen.

### Do Not

- Do not use stock-fantasy hero art.
- Do not use large character art or battle splash imagery on the opening screen.
- Do not use giant billboard headings inside tool screens.
- Do not use letter grades such as `B+`.
- Do not keep a permanent evidence rail.
- Do not show raw API links as normal sources.
- Do not use repeated card grids as the center of any primary module.
- Do not mix facts, estimates, interpretation, and actions into one undifferentiated block.

## Content Rules

- First viewport visible copy should stay under roughly 120 to 150 words.
- Opening screen comparables are capped at 5 to 6.
- Each module needs one primary artifact, not many equal panels.
- Every recommendation must connect to evidence, but evidence is not always
  visible.
- Estimates must be explicitly labeled and never presented as actual sales.
- Missing social/community listening should be visible as a research gap, not
  implied as completed.

## Implementation Boundaries

Keep in scope:

- React route `#client-report/refractured`;
- static repo-backed data;
- V6 component redesign;
- local browser preview;
- component smoke tests;
- manual visual QA.

Out of scope:

- backend;
- auth;
- payments;
- public sharing;
- live scraping;
- live Market Watch;
- paid or credit-consuming image generation above 100 credits without explicit
  user approval.

## Acceptance Criteria

V6 is acceptable only if:

- the first screen no longer reads as a dashboard or AI report;
- the central opening artifact clearly shows Refractured's market lane;
- the first 30 seconds answer "where is the opportunity?" and "what proof comes
  next?";
- no raw JSON/API endpoint opens from a normal source click;
- `Roguelite Loop Lab` is a loop diagram, not a card grid;
- `Action Plan` is a proof path or timeline, not a card list;
- evidence is readable as source interpretation before raw source access;
- desktop and narrow browser QA show no overlap, clipped text, fallback layout,
  or horizontal scroll;
- visual QA is performed against the accepted direction before committing an
  implementation sprint.

## Next Step

Do not implement immediately from V5.

First create a V6 implementation plan that decomposes the redesign into:

1. route IA and navigation cleanup;
2. opening Decision Workspace;
3. Market Lane Canvas;
4. Evidence reader behavior;
5. Roguelite Proof Lab;
6. Action Plan proof path;
7. visual system cleanup;
8. browser QA and regression tests.
