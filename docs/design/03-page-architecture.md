# Indievaders Page Architecture Recommendation

Date: 2026-06-16

## Product Path

The product should scale through this path:

1. Landing creates curiosity and trust.
2. Interactive sample report proves the format.
3. Order flow collects project context.
4. Private workspace holds the paid report and project work.
5. Market Watch becomes the subscription intelligence layer.

The landing should not explain everything. It should guide the user toward interaction.

## Landing Architecture

### 1. Hero: Signal Capture

Purpose: make the product memorable and explain the core job.

Keep:

- Invaders.
- Black-hole core.
- Click/drag signal capture.
- Dark-to-light transformation.
- Primary promise and two CTAs.

Improve:

- Change the control panel from "Noise 0/6" to a more product-like scan status.
- After completion, reveal solution tokens that match the report modules.
- Make the bottom of the hero visually lead into the next band.

Recommended hero completion labels:

- True comps
- Tag promise
- Review risks
- Price/scope
- Creator angle
- Next move

### 2. Captured-Signal Ledger

Current equivalent: `trust-strip`.

Replace the generic trust strip with a narrow product ledger:

- Signal captured: Broad tags -> Sharper tag promise.
- Signal captured: Wrong competitors -> True comps.
- Signal captured: Demo friction -> Review risk map.

This connects the hero to the report system and avoids generic reassurance copy.

### 3. Real-Game Diagnostic Console

Current equivalent: `CaseTeasers`.

Recommended layout:

- Left/top: three case selectors with game title, trap type, and short warning.
- Center: active diagnosis panel.
- Right/bottom: evidence/source strip.

The case UI should feel like opening a file in a research tool, not selecting a blog card.

Active diagnosis panel structure:

- Looks comparable.
- Hidden distortion.
- Safe lesson.
- Unsafe assumption.
- Next action.
- Evidence.

### 4. Report Decision System

Current equivalent: `ReportDeliverables`.

Keep the wider report-band direction. Improve the rows so each report decision feels like a module preview:

- Number.
- Decision category.
- User question.
- Example output.
- "See this in sample report" link where appropriate.

This should be the first place where users understand the paid report as a decision artifact.

### 5. Interactive Sample Report Preview

The landing needs a stronger direct bridge into `#sample-report`.

Do not embed the whole sample report on the landing. Instead, add a compact preview panel:

- One lead decision.
- Three source/confidence chips.
- One "open interactive sample" button.

This preserves curiosity and avoids turning the landing into a static report wall.

### 6. Conversion: Free Sample, Then Paid Report

Current equivalent: `OfferSection`.

Structure:

- Left: free sample report invitation and email form.
- Right: $49 early automated report summary.
- Bottom or inline: "Private workspace comes after order."

The visual sequence should make it clear that the sample report is the trust step and the paid report is the next commitment.

## Interactive Sample Report Architecture

Current route: `#sample-report`.

### Current Modules

- Overview / DecisionDeck
- Comparables / ComparableMap
- Reality check / ProductionReality
- Review risks / ReviewRiskExplorer
- Price and scope / PriceScopeSimulator
- Next actions / NextActionsBoard
- Sources / SourceDrawer page

### Recommended Structure

#### Report Cover

Keep the top report identity, but make it more artifact-like:

- Project name.
- Stage.
- Report type.
- Updated date.
- Source coverage.
- Confidence note.

#### Overview

Replace five equal verdict cards with:

- One lead decision panel.
- Four compact decision rows.
- Persistent source/confidence chips.
- Three primary jumps: comparables, risks, actions.

#### Detail Modules

Each module should follow a consistent logic:

- What question is this answering?
- What is the current signal?
- What does it mean?
- What should the team do?
- What sources support it?

#### Source System

Source access should be persistent:

- Source log button stays in topbar.
- Each claim has a source chip.
- Drawer can filter by active refs.
- The Sources page is a ledger, not a card dump.

## Order Flow Architecture

Current route: `#order-report`.

The order flow should feel like a guided intake console.

### Recommended Sections

1. Header: $49 early automated report, private workspace promise.
2. Progress strip: Project -> References -> Concerns -> Submit.
3. Main form: one visible group at a time on desktop or stacked groups on mobile.
4. Side summary: what the report will produce from the answers.
5. Submit row: clear next step and privacy boundary.

### Field Grouping

Project identity:

- Project title.
- Contact email.
- Short description.
- Stage.

Market context:

- Steam URL.
- Reference games.

Report focus:

- Concern chips.
- Specific question notes.

Confirmation:

- "Workspace preview will be created in this browser."
- "Payment confirmation follows when report slot is available."

## Private Workspace Architecture

Current route: `#workspace/:id`.

### Top-Level Layout

Use a private workspace shell:

- Topbar: back link, sample report link, project identity, status.
- Project header: title, synopsis, stage, concerns.
- Command strip: report state, saved comps, open actions, source coverage, refresh state.
- Navigation: Profile, Snapshot, Comparables, Risks, Actions, Sources, Market Watch.
- Active tool panel.

### Workspace Hierarchy

The first screen should answer:

- What project is this?
- What is the report status?
- What should I do next?
- What changed since last time?
- Which evidence can I trust?

The current workspace has the data, but it needs a stronger command-strip layer.

## Future Market Watch Architecture

Market Watch should not become a generic analytics dashboard.

It should become a tracked-signal system:

- Watchlist: saved comparables and candidate games.
- Change ledger: what changed since the last refresh.
- Signal severity: changed tag, review phrase, price move, new comparable, visibility shift.
- Confidence/source labels.
- Action recommendation: ignore, inspect, update page, revisit price, update pitch.

### Market Watch Visual Model

Use a radar/map metaphor carefully:

- Comparable nodes around the user's game.
- Change pulses only when something changed.
- Ledger rows for actual reading.
- Source drawer for evidence.

Do not use chart-heavy dashboard composition unless the data actually supports it.

## Surface Relationship

Landing, sample report, order flow, workspace, and Market Watch should feel related but not identical:

- Landing: dramatic, guided, curiosity-building.
- Sample report: interactive artifact.
- Order flow: guided intake.
- Workspace: operational command surface.
- Market Watch: change intelligence layer.

The shared language is signals, evidence, decisions, and actions.
