# Indievaders Redesign Priorities

Date: 2026-06-16

## Priority Order

### 1. Consolidate Visual Tokens

Files:

- `src/styles/landing.css`
- `src/styles/interactive-report.css`
- `src/styles/report-workspace.css`

Problem:

The three style files share a palette and surface language, but the rules are duplicated and drift by surface.

Action:

- Add shared CSS variables for color, spacing, radius, typography, shadow, and transition.
- Keep surface-specific layout rules in their current files.
- Standardize labels, chips, buttons, panels, and source states.

Why first:

The rest of the redesign will be easier and more consistent if the system has shared tokens.

### 2. Rebuild The Hero Bridge

Files:

- `src/components/Hero.jsx`
- `src/components/LandingPage.jsx`
- `src/content/productCopy.js`
- `src/styles/landing.css`

Problem:

The hero is strong but the next section does not feel like hero output.

Action:

- Change hero HUD copy to scan/report language.
- Add completion CTAs.
- Map solution labels to report modules.
- Replace the current trust strip with a signal ledger.

Why second:

This is the most important product-coherence fix. It preserves the strongest approved direction and makes the page feel intentional after the first viewport.

### 3. Convert Case Teasers Into A Diagnostic Console

Files:

- `src/components/CaseTeasers.jsx`
- `src/components/CaseLessonPanel.jsx`
- `src/data/caseStudies.js`
- `src/styles/landing.css`

Problem:

The current case grid can read like blog cards or thumbnails. The value is the diagnostic logic, not the images.

Action:

- Use case selectors as compact files.
- Make the active panel the main visual object.
- Show the diagnostic structure: looks comparable, hidden distortion, safe lesson, unsafe assumption, next action, evidence.
- Reduce thumbnail dominance.

Why third:

Real-game cases are the public proof layer. They need to feel like Indievaders analysis.

### 4. Strengthen The Sample Report Overview

Files:

- `src/components/interactive-report/DecisionDeck.jsx`
- `src/components/interactive-report/ReportFrame.jsx`
- `src/components/interactive-report/SourceDrawer.jsx`
- `src/styles/interactive-report.css`

Problem:

Five equal verdict cards create weak pacing and make the report look more static than it is.

Action:

- Use one lead decision and compact decision rows.
- Add persistent confidence/source chips.
- Make each decision clearly jump to a detail module.
- Improve selected/hover/focus states for report nav and decision links.

Why fourth:

The sample report is the first proof that Indievaders is more than a landing page.

### 5. Add Workspace Command Layer

Files:

- `src/components/report-workspace/ProjectWorkspacePage.jsx`
- `src/styles/report-workspace.css`
- `src/lib/reportRequestStore.js`

Problem:

The workspace has the right modules but does not yet feel like a command surface.

Action:

- Add a command strip under the project header.
- Reduce header scale.
- Show report state, saved comps, open actions, source status, and Market Watch status in one place.
- Convert Snapshot to lead decision + decision rows.

Why fifth:

This makes the private workspace feel real without needing backend features.

### 6. Reframe The Order Flow

Files:

- `src/components/report-workspace/EarlyReportIntakePage.jsx`
- `src/styles/report-workspace.css`

Problem:

The intake page is functional but looks like a form page.

Action:

- Add step/progress structure.
- Group fields by project, references, concerns, and confirmation.
- Add a side summary explaining how inputs become workspace/report outputs.
- Keep the page single-screen friendly on desktop and cleanly stacked on mobile.

Why sixth:

It improves conversion clarity after the higher-value proof surfaces are fixed.

### 7. Give Market Watch A Visual Grammar

Files:

- `src/components/report-workspace/ProjectWorkspacePage.jsx`
- `src/lib/reportRequestStore.js`
- `src/styles/report-workspace.css`

Problem:

Market Watch exists as a future module but lacks a distinctive product shape.

Action:

- Use watchlist + change ledger + severity/confidence model.
- Keep the "no live scan connected" boundary.
- Make saved comparables become watch candidates.

Why seventh:

This supports the long-term subscription layer without overbuilding it now.

## What Not To Redesign First

Do not start with:

- Replacing the hero.
- Adding authentication.
- Adding payment UI.
- Expanding public methodology.
- Creating a full public dashboard.
- Adding more decorative assets.
- Adding more real-game thumbnails.

These would increase surface area without fixing the coherence problem.

## Specific Code Notes

### `landing.css`

This file contains legacy sections, newer repair passes, and final overrides. It should be organized into:

- Tokens.
- Base elements.
- Hero.
- Signal ledger.
- Case console.
- Report band.
- Conversion.
- Responsive rules.

Do not rewrite it blindly. First isolate repeated button, chip, panel, and heading rules.

### `Hero.jsx`

Keep the interaction model. Adjust labels, completion state, and handoff behavior.

### `CaseTeasers.jsx` / `CaseLessonPanel.jsx`

The component relationship is right. The layout and information hierarchy should change from card grid + side panel to diagnostic console.

### `DecisionDeck.jsx`

This is the best place to introduce `DecisionRow` and source/confidence chips.

### `ProjectWorkspacePage.jsx`

The file is doing a lot. Before it grows further, extract:

- Workspace top/header.
- Command strip.
- Tab nav.
- Individual panels.

Keep behavior unchanged during the visual refactor.

### `EarlyReportIntakePage.jsx`

Keep fields and validation. Improve grouping, progress, and summary.

## Acceptance Checklist

- Hero direction is preserved.
- Landing no longer feels like one cool hero followed by generic sections.
- Sample report feels interactive before it feels textual.
- Order flow explains how input becomes workspace value.
- Workspace feels like a real tool, not a placeholder admin page.
- Source/confidence labels are visible and consistent.
- Cards are used only where they are the right structure.
- Public UI remains English-only.
- The $49 early automated report remains the public offer.
- The design avoids generic dark-purple SaaS styling.
