# Indievaders Visual Audit

Date: 2026-06-16

## Executive Read

Indievaders has a strong product spine: true comparables, unsafe benchmarks, review risks, price/scope sanity, next actions, and source confidence. The accepted hero turns that spine into a distinctive interaction: noisy arcade signals get pulled into a black-hole core and reform as clearer positioning decisions.

The problem is not lack of direction. The problem is uneven translation. The hero feels bespoke, while several lower sections still rely on repeated cards, oversized headings, and generic dark-product layout patterns. The sample report and workspace already contain the right interaction primitives, but they need stronger visual hierarchy, clearer click targets, and a shared instrument language.

## Hero

Relevant files:

- `src/components/Hero.jsx`
- `src/styles/landing.css`

### What Works

- The hero has a real interaction, not just decoration. Click/drag signals into the core is a good metaphor for filtering weak Steam-positioning signals.
- The invader shapes, black-hole core, signal list, sound toggle, and progress count create a memorable first viewport.
- The copy and interaction align: "Before you polish the wrong demo" matches the act of removing noisy assumptions.
- The dark-to-light state gives the hero a useful transformation moment instead of a static visual.
- The color base is distinctive without defaulting to purple SaaS: near-black, cyan, amber, coral, and warm white.

### What Is Not Working Yet

- The hero solves a visual moment but does not strongly hand the user into the report architecture below it.
- "Noise 0/6" and the instruction text are useful, but they read like a game HUD rather than a research-product state.
- The solution state is underused. When the hero is completed, the page should reveal report decision categories in a way that previews the product.
- The signal list panel is visually light and easy to miss. It contains the bridge between pain and solution, so it should be treated as product evidence, not peripheral HUD.
- Mobile composition is risky because the hero copy is pushed far down after the visual field, and the black-hole interaction competes with navigation and controls.

### Design Action

Preserve the hero. Upgrade it into the first "signal capture" module:

- Rename the control language from game progress to analysis progress.
- Let completion expose the report categories: True comps, Tag promise, Review risks, Price/scope, Creator angle, Next move.
- Convert the trust strip below the hero into a captured-signal ledger, not a generic three-item reassurance strip.
- Keep the black-hole metaphor only for filtering noisy assumptions, not as a universal site motif.

## Landing Below The Fold

Relevant files:

- `src/components/CaseTeasers.jsx`
- `src/components/CaseLessonPanel.jsx`
- `src/components/ReportDeliverables.jsx`
- `src/components/OfferSection.jsx`
- `src/styles/landing.css`

### What Works

- The public content boundary is strong. The landing does not dump the full paid report onto the page.
- The three real-game cases are the right kind of proof: TMNT as licensed benchmark trap, Balatro as outlier pattern, Dave the Diver as production-context warning.
- The report deliverables section has started moving away from small card grids toward a wider editorial/instrument layout.
- The conversion section correctly separates free sample report interest from the paid early report.

### What Is Not Working Yet

- The landing still has too many repeated card patterns. Case cards, deliverables, offer items, and form surfaces all share similar rectangular treatment.
- The case teaser area risks feeling like a blog grid because the game thumbnails dominate before the diagnostic logic does.
- The active case detail panel should feel like a live diagnosis panel, not a companion card.
- The trust strip is too generic relative to the hero. It repeats credibility claims rather than translating the captured signals into report outcomes.
- Section headings are often too large for operational content. Hero-scale type appears in places that need scanning and comparison.
- The conversion section is visually coherent but needs clearer sequence: sample report first, paid report second, private workspace after order.

### Design Action

The landing should become:

1. Hero signal capture.
2. Captured-signal ledger.
3. Real-game diagnostic console.
4. Report decision system.
5. Sample report preview.
6. Early report intake invitation.

This is not a long marketing page. It is a guided product preview.

## Interactive Sample Report

Relevant files:

- `src/components/interactive-report/ReportFrame.jsx`
- `DecisionDeck.jsx`
- `ComparableMap.jsx`
- `ReviewRiskExplorer.jsx`
- `PriceScopeSimulator.jsx`
- `NextActionsBoard.jsx`
- `SourceDrawer.jsx`
- `src/styles/interactive-report.css`

### What Works

- The report is genuinely interactive. It has tabs, verdict cards, a clickable comparable map, risk flow, price selector, source drawer, and action board.
- The source drawer is a major trust feature. It differentiates the product from a static PDF or generic AI summary.
- The comparable map is the strongest report module because it is both visual and product-native.
- The risk explorer translates player signal -> design meaning -> action. That is exactly the product's job.
- The price selector is simple, useful, and easy to understand.

### What Is Not Working Yet

- The overview uses five verdict cards at equal weight, which creates a wall of same-shaped decisions.
- Several report modules use the same dark panel/card language as the landing. The report needs a more precise "instrument" feel.
- Click targets are functional but not always narratively clear. The user should understand what will happen before clicking.
- The detail transition from teaser to module is abrupt. The overview should let users expand or jump into a relevant detail with stronger continuity.
- Confidence and evidence labels exist, but they are visually secondary. They should be persistent trust affordances.
- The top report nav is useful but looks close to a tab strip from any dashboard.

### Design Action

Treat the sample report as an interactive artifact:

- Replace equal verdict cards with a ranked decision deck: one lead decision, four compact decision rows.
- Use persistent source/confidence chips on every major claim.
- Make each overview decision behave like a doorway into a specific module.
- Turn module transitions into "teaser -> detail" motion: active state, anchored scroll, or tab transition with retained context.
- Make maps, flows, selectors, and ledgers the core visual language.

## Order Flow

Relevant files:

- `src/components/report-workspace/EarlyReportIntakePage.jsx`
- `src/styles/report-workspace.css`

### What Works

- The form asks for the right minimum context: title, email, description, stage, Steam URL, references, concerns, notes.
- The order flow explains that the private workspace is the immediate proof artifact.
- Concern chips are a good interaction pattern for non-technical users.
- The $49 early report framing is clear.

### What Is Not Working Yet

- The page visually resembles the workspace and sample report too closely. Intake should feel like a guided submission console.
- The form has no progress or context summary. Serious teams need to know why each input matters.
- The price/status aside is useful but too small to anchor the flow.
- The form does not preview what the workspace will do with the submitted inputs.

### Design Action

Order flow should become a short intake sequence:

- Step 1: project identity.
- Step 2: market references.
- Step 3: concerns and report focus.
- Step 4: confirmation and workspace preview.

It can still be a single page, but the visual system should imply a sequence rather than a raw form.

## Private Workspace

Relevant files:

- `src/components/report-workspace/ProjectWorkspacePage.jsx`
- `src/lib/reportRequestStore.js`
- `src/styles/report-workspace.css`

### What Works

- The workspace has a real model: project profile, report snapshot, comparables, risks, actions, sources, and future Market Watch.
- Saved comparables and toggleable action items already make it feel more useful than a static report.
- Market Watch is present as the future subscription layer without over-promising live data.
- The tabs cover the correct product hierarchy.

### What Is Not Working Yet

- It still reads too much like a styled admin page: large header, cards, tabs, and grids.
- The workspace status card is not strong enough to act as a command center.
- Project context, report status, saved comparables, actions, and watch state are scattered across separate blocks.
- The tab nav is functional but generic. It should feel like a workspace navigation system.
- Market Watch needs a visual grammar now, even before live data exists.

### Design Action

Design the workspace as a private command surface:

- Persistent app shell with project identity, status, and source confidence.
- Left or top navigation with clear tool sections.
- A command summary strip: report state, saved comps, open actions, source coverage, next refresh.
- Tool panels for comparables, risks, actions, and sources.
- Market Watch as a change ledger and tracked-comparable radar, not a chart-heavy dashboard.

## Cross-System Issues

### Typography

Current typography is clear, but the scale is too dramatic across too many surfaces. Hero-scale headings should be reserved for hero and major report covers. Workspace panels and repeated items need tighter type.

### Spacing

The prototype uses generous spacing, which helps premium feel, but some sections become too sparse for tool use. Public landing can breathe; report and workspace need denser, scannable layouts.

### Surface Logic

Cards are overused. A card should mean "a repeated item" or "a contained tool." Full-width bands should handle narrative transitions. Open layouts should handle comparisons. Framed panels should be reserved for actual instruments.

### Color

Cyan and amber are working. The system needs semantic rules so color is not just atmosphere:

- Cyan: signal, source, navigation, active instrument.
- Amber: warning, risk, attention, commercial pressure.
- Coral: primary conversion or destructive assumption.
- Green: completed or verified.
- Slate: unknown, disabled, pending.

### Motion

The hero earns motion. The report and workspace should use calmer motion: hover states, selected state changes, drawer transitions, and subtle map-node movement only where it aids understanding.

### Game Feeling

Game feeling should appear as interaction feel, not decoration. Use pixel invaders in the hero and occasional signal markers. Do not cover the workspace in arcade imagery.
