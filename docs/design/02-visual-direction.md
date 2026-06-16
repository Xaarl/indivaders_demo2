# Indievaders Visual Direction

Date: 2026-06-16

## Positioning

Indievaders should feel like a premium research instrument for indie game developers, not a generic SaaS dashboard and not an arcade toy. The visual language should say:

- This product understands games.
- This product respects commercial reality.
- This product turns messy public signals into decisions.
- This product is interactive before it is decorative.

The core metaphor is **signal vs noise**. The invaders and black hole are the expressive gateway into that metaphor. The report and workspace should express the same idea through instruments: maps, flows, ledgers, source drawers, decision decks, and action queues.

## Design Principles

### 1. Keep The Hero Strange, Make The Product Sharp

The hero can be high-character: arcade signals, black-hole capture, sound, motion, transformation. Everything after it should become more precise. The user should feel the product becoming useful, not less designed.

### 2. Every Surface Must Answer "What Decision Does This Help Me Make?"

No decorative module should survive if it does not help the user understand comparables, risk, price/scope, evidence, or next action.

### 3. Use Density Where The User Is Working

Landing sections can be dramatic and spacious. Report and workspace surfaces should be denser, more scannable, and easier to revisit.

### 4. Cards Are Not The Default

Use cards for repeated items and contained tools. Use rows for decision lists, maps for positioning, flows for cause/effect, ledgers for sources, and strips for status.

### 5. Game Feeling Comes From Interaction

Do not add random pixel decorations. Use game-adjacent feeling through target acquisition, scan states, responsive controls, signal capture, and clear feedback.

## Typography

Current base: Inter / system sans, with mono labels referenced in CSS.

Recommendation:

- Keep Inter or a similar neutral sans for UI clarity.
- Use a real loaded mono face or system mono consistently for labels, evidence tags, counters, and source metadata.
- Do not rely on unimported custom fonts in CSS unless they are intentionally loaded.

### Scale

- Hero H1: 72-96px desktop, 48-64px tablet, 40-52px mobile.
- Landing section H2: 48-76px desktop only for major narrative sections.
- Report module H1: 44-64px desktop. Do not match hero scale.
- Workspace H1: 40-56px desktop. Work surfaces need scanning, not spectacle.
- Panel H2: 24-36px.
- Card/item title: 18-24px.
- Body: 16-18px.
- Dense metadata: 11-13px mono, uppercase only when it improves scanning.

### Rules

- Reserve massive type for entry points and report covers.
- Keep workspace headings compact.
- Avoid uppercase labels on every small item. Use them for state, source, severity, and confidence.
- Keep letter spacing at 0 for normal text. Use modest positive spacing only on short mono labels.

## Color System

The current palette works best when it is restrained:

- Base black: `#05070b`
- Panel black: `#070b12`
- Raised panel: `#0a0f18`
- Warm text: `#fff9ed`
- Body text: `#dce6f2`
- Muted text: `#7f8da3`
- Signal cyan: `#7ed4ff`
- Warning amber: `#ffcb73`
- Action coral: `#ff6f4f`
- Verified green: `#67d29f`

### Color Logic

- Cyan means signal, active navigation, evidence access, and instrument focus.
- Amber means warning, risk, unsafe assumption, price pressure, or commercial attention.
- Coral means primary conversion, strong correction, or high-friction assumption.
- Green means completed, verified, saved, or cleared.
- Slate means unknown, pending, disabled, or quiet metadata.

### Avoid

- Generic purple-blue SaaS gradients.
- One-note dark blue/slate interfaces.
- Decorative color that does not map to state or meaning.
- Overusing amber until every warning feels equally urgent.

## Spacing

Use an 8px spacing system:

- 4px: tiny internal gaps.
- 8px: icon/text gaps, compact controls.
- 12px: chip padding, tight form groups.
- 16px: item gaps, dense panel internals.
- 24px: card/panel padding.
- 32px: section internals.
- 48px: major layout gaps.
- 72px+: public landing section rhythm.

### Surface Density

- Landing: dramatic spacing is acceptable.
- Sample report: medium density. Users should compare decisions without scrolling forever.
- Workspace: high density with clear grouping.
- Order flow: medium density with progressive steps.

## Radius And Borders

The existing 8px radius is right. Keep it.

Rules:

- 8px radius for panels, cards, buttons, inputs, and map nodes.
- 999px only for chips, pills, and progress/status capsules.
- 1px borders for instrument surfaces.
- Use border color to indicate active state, warning, or evidence status.
- Avoid nested cards inside cards.

## Surface Logic

### Full-Width Bands

Use for:

- Hero.
- Landing phase changes.
- Case teaser stage.
- Report decision preview.
- Conversion stage.

Do not make full-width bands look like floating cards.

### Open Layouts

Use for:

- Case diagnosis.
- Comparable maps.
- Workspace summary.
- Market Watch change views.

Open layouts should feel like a workbench.

### Framed Tool Panels

Use for:

- Source drawer.
- Risk explorer.
- Price selector.
- Intake form.
- Workspace tool modules.

Tool panels should always contain an interaction, status, or decision.

### Cards

Use for:

- Repeated case items.
- Saved comparables.
- Action items.
- Source entries.
- Compact verdicts.

Do not use card grids as the default page structure.

## Interaction Language

Reusable controls:

- Segmented tabs for switching tool sections.
- Map nodes for comparables, tracked games, and market position.
- Source chips for evidence access.
- Confidence badges for trust.
- Severity chips for risk.
- Status strips for workspace progress.
- Detail drawers for sources and supporting context.
- Row expansion for "teaser -> detail."

### Click Target Rules

- Important click targets need visible affordance before hover.
- Every clickable card must show what clicking will do.
- Use icon + label for commands.
- Use icon-only only for familiar compact controls and provide an accessible label.
- Selected states must be visually stronger than hover states.

## Motion

### Hero

The hero can use the richest motion:

- Drifting invaders.
- Capture/absorption.
- Burst/reform state.
- Sound feedback.
- Mouse flashlight.

### Report And Workspace

Use calmer motion:

- 120-180ms hover/focus transitions.
- 180-240ms drawer open/close.
- 160-220ms tab/content transition.
- Subtle map-node emphasis on selection.

Avoid:

- Constant ambient motion in tool panels.
- Large transform animations during reading.
- Decorative movement behind dense text.

## Iconography

Use lucide icons where available. Icons should describe command or state, not decorate headings.

Recommended mappings:

- Target: comparable target, positioning.
- Database: sources, evidence.
- AlertTriangle or ShieldAlert: risk, unsafe assumption.
- SlidersHorizontal: price/scope tuning.
- CheckCircle2: completed action, saved decision.
- RadioTower: market watch, creator/outreach signals.
- RefreshCw: market refresh.
- Eye: preview, inspect.
- ArrowRight: move deeper or continue.

## Arcade / Invader / Signal / Black-Hole Metaphor Rules

Use:

- Invaders as noisy assumptions, weak signals, or draggable problems in the hero.
- Black hole as filtering, collapsing, or resolving noisy inputs.
- Orbit/map language for comparables and market watch.
- Signal language for Steam tags, player review friction, creator angles, price pressure, and source confidence.

Do not use:

- Black holes as generic section backgrounds.
- Invaders as random page decoration.
- Arcade language for serious workspace controls.
- Cosmic metaphors for every product feature.

## Design Sentence

Indievaders is an interactive signal instrument: the hero captures noisy assumptions, the sample report shows how they become decisions, and the private workspace turns those decisions into tracked work.
