# Indievaders Component And System Recommendation

Date: 2026-06-16

## System Goal

Create a small set of components that make Indievaders feel like one product across landing, report, order flow, workspace, and future Market Watch.

The system should reduce repeated card grids and replace them with purpose-built product primitives.

## Design Tokens

### Color Tokens

- `--color-bg-deep`: `#05070b`
- `--color-bg-page`: `#060910`
- `--color-bg-panel`: `#070b12`
- `--color-bg-raised`: `#0a0f18`
- `--color-border-soft`: rgba white at 0.12-0.16
- `--color-border-signal`: cyan at 0.22-0.38
- `--color-text-strong`: `#fff9ed`
- `--color-text-body`: `#dce6f2`
- `--color-text-muted`: `#7f8da3`
- `--color-signal`: `#7ed4ff`
- `--color-warning`: `#ffcb73`
- `--color-action`: `#ff6f4f`
- `--color-success`: `#67d29f`

### Type Tokens

- `--font-ui`: Inter or system sans.
- `--font-mono`: loaded mono or system monospace.
- `--type-hero`: 72-96px desktop, 40-52px mobile.
- `--type-section`: 48-76px desktop, 32-44px mobile.
- `--type-module`: 40-64px desktop, 30-40px mobile.
- `--type-panel`: 24-36px.
- `--type-item`: 18-24px.
- `--type-body`: 16-18px.
- `--type-meta`: 11-13px.

### Spacing Tokens

- `--space-1`: 4px
- `--space-2`: 8px
- `--space-3`: 12px
- `--space-4`: 16px
- `--space-6`: 24px
- `--space-8`: 32px
- `--space-12`: 48px
- `--space-18`: 72px

### Shape Tokens

- `--radius-panel`: 8px
- `--radius-control`: 8px
- `--radius-chip`: 999px

## Core Components

### ProductTopbar

Use on:

- Landing nav.
- Sample report.
- Order flow.
- Workspace.

Rules:

- Keep brand identity compact.
- Primary actions on the right.
- Do not overfill with navigation.
- In workspace, include project status and source/report access.

### SurfaceBand

Use on landing for major narrative phases.

Variants:

- `hero`
- `signal-ledger`
- `case-console`
- `report-preview`
- `conversion`

Rules:

- Full-width.
- No floating section cards.
- Constrained inner content.
- Different bands should have clear purpose, not just different gradients.

### SectionHeader

Use for public page sections.

Fields:

- Kicker.
- Headline.
- Short intro.
- Optional action.

Rules:

- Do not use hero-scale type inside dense panels.
- On landing, split heading layout can be used for major sections.
- In report/workspace, keep headers tighter.

### InstrumentPanel

Use for any real interactive tool:

- Comparable map detail.
- Risk explorer.
- Price selector.
- Source drawer.
- Intake form.
- Workspace tab panel.

Rules:

- Must contain a decision, control, data state, or next action.
- Border and background should be subtle.
- Header should say the user question, not a vague feature name.

### DecisionRow

Use instead of repeated verdict cards when decisions need comparison.

Fields:

- Index.
- Decision category.
- Headline.
- Recommendation.
- Confidence.
- Sources.
- Next action link.

Use on:

- Landing report preview.
- Sample report overview.
- Workspace snapshot.

### SourceChip

Use on every major claim.

Fields:

- Label: Confirmed, Reported, Estimated, Inferred, Not publicly confirmed.
- Optional source count.
- Click target to open drawer.

Rules:

- Source chips are trust affordances, not decoration.
- Source chips should be visible before hover.

### ConfidenceBadge

Use with recommendations.

Variants:

- High.
- Medium.
- Low.
- Unknown.

Rules:

- Confidence must not be confused with severity.
- Use color sparingly: high can be cyan/green, medium amber, unknown slate.

### SeverityChip

Use for review risks and unsafe assumptions.

Variants:

- High.
- Medium.
- Low.

Rules:

- Severity uses amber/coral logic.
- Do not use severity chips for neutral categories.

### SignalNode

Use for map points and tracked comparables.

Fields:

- Title.
- Role.
- State.
- Optional change marker.

Rules:

- Nodes must be clickable only if they open detail.
- Active state must be obvious.
- Avoid tiny unlabeled dots for important decisions.

### ComparableMap

Current base exists in `ComparableMap.jsx`.

Improve with:

- Stronger axes.
- Active detail connection line or highlight.
- Role chips.
- Legend explaining resource pressure and audience clarity.
- Mobile fallback list.

### RiskFlow

Current base exists in `ReviewRiskExplorer.jsx`.

Pattern:

Player signal -> Design meaning -> Action.

Rules:

- Keep this pattern. It is product-native.
- Use it anywhere the product translates evidence into work.
- On mobile, stack as numbered steps.

### ActionQueue

Use for next actions in report and workspace.

Fields:

- Priority.
- Title.
- Action.
- Impact.
- Effort.
- Status.
- Evidence.

Rules:

- Workspace version should support toggling status.
- Report version should support evidence inspection.
- Actions should sort by priority, not by arbitrary card order.

### SourceDrawer

Current base exists in `SourceDrawer.jsx`.

Improve with:

- Active source filter summary.
- Evidence label definition.
- Source type icon or label.
- Claim preview tied to selected recommendation.

Rules:

- This is a core trust feature.
- It should feel more like an evidence ledger than a modal.

### WorkspaceCommandStrip

New recommended component.

Fields:

- Report state.
- Saved comparables.
- Open actions.
- Source coverage.
- Market Watch refresh state.

Use immediately under workspace hero/header.

Purpose:

- Replace scattered status cards with one command overview.
- Make the workspace feel like a real tool.

## Layout Recipes

### Narrative Band

Use for landing sections:

- Full-width background.
- Constrained content.
- One large heading area.
- One primary interaction.

### Diagnostic Console

Use for cases:

- Selector rail or top row.
- Active diagnosis panel.
- Evidence strip.
- Next action.

### Map + Detail

Use for comparables and Market Watch:

- Map canvas.
- Active detail panel.
- Legend.
- Source access.

### List + Detail

Use for risks and sources:

- Left/top list.
- Right/bottom detail.
- Persistent selected state.

### Decision Deck

Use for report and snapshot:

- Lead decision.
- Compact rows.
- Source/confidence chips.
- Jump controls.

### Workspace Tool Shell

Use for private workspace:

- Project header.
- Command strip.
- Navigation.
- Active tool panel.

## Anti-Patterns

Avoid:

- Repeating three-card or five-card grids for every section.
- Using screenshots/thumbnails where a decision panel would communicate better.
- Hiding evidence labels inside hover-only states.
- Applying hero-scale typography to workspace tools.
- Adding arcade icons to every panel.
- Nesting cards inside cards.
- Making Market Watch a generic chart dashboard before the product has live data to justify it.

## First Component Refactor Targets

1. Extract shared buttons, chips, and source/confidence badges.
2. Create `DecisionRow` and use it in sample report overview and workspace snapshot.
3. Convert `trust-strip` into a signal ledger.
4. Convert case cards + lesson panel into a diagnostic console pattern.
5. Add `WorkspaceCommandStrip`.
