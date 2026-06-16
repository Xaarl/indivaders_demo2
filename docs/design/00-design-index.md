# Indievaders Design Direction Index

Date: 2026-06-16

This folder defines the visual and product-experience direction for the current Indievaders prototype. It is grounded in the existing React/Vite app, the current product docs, and the accepted invaders / black-hole hero direction.

## Prototype Surfaces Reviewed

- Landing page: `src/components/LandingPage.jsx`, `Hero.jsx`, `CaseTeasers.jsx`, `ReportDeliverables.jsx`, `OfferSection.jsx`, and `src/styles/landing.css`.
- Interactive sample report: `src/components/interactive-report/*`, `src/data/interactiveSampleReport.js`, and `src/styles/interactive-report.css`.
- Order flow: `src/components/report-workspace/EarlyReportIntakePage.jsx` and `src/styles/report-workspace.css`.
- Private workspace: `src/components/report-workspace/ProjectWorkspacePage.jsx`, `src/lib/reportRequestStore.js`, and `src/styles/report-workspace.css`.
- Product docs: `docs/product/README.md`, `docs/product/product-definition.md`, `docs/product/information-architecture.md`, `docs/product/trust-evidence-model.md`, `docs/product/next-sprint-recommendations.md`, and `docs/qa-checklist.md`.

## Core Recommendation

Use one coherent product language: **a signal intelligence instrument for Steam positioning**.

The hero can stay expressive and arcade-adjacent. Below the hero, the product should become calmer, sharper, and more operational: maps, ledgers, source drawers, segmented controls, decision rows, risk flows, and action queues. This keeps the game-adjacent identity without making the report or workspace feel childish.

## Included Artifacts

- `01-visual-audit.md`: what is working and what is not across hero, landing, sample report, order flow, and workspace.
- `02-visual-direction.md`: typography, spacing, surface, color, motion, iconography, and metaphor rules.
- `03-page-architecture.md`: recommended structure for landing, sample report, order flow, workspace, and future Market Watch.
- `04-component-system.md`: reusable component and layout system recommendations.
- `05-hero-integration-plan.md`: how to preserve and integrate the accepted hero direction.
- `06-workspace-ux-ui-plan.md`: how the private workspace should mature into a real tool.
- `07-redesign-priorities.md`: concrete first redesign targets in the current code.

## Approach Options Considered

### Recommended: Signal Intelligence Instrument

The hero stays distinctive, then the rest of the product behaves like a research instrument. The arcade / invader language becomes a controlled layer for signals, capture, scanning, and alert states. This is the best fit for serious indie developers because it feels memorable but still useful.

### Not Recommended: Arcade Maximalism

This would push pixel art, invaders, black holes, glowing panels, and playful motion across every surface. It would create a stronger first impression, but it would weaken trust in the report and make the workspace feel less serious.

### Not Recommended: Generic Premium SaaS Cleanup

This would tame the hero into standard dark SaaS sections, clean cards, polished dashboards, and generic gradients. It would improve polish but destroy the strongest approved direction and make Indievaders visually interchangeable.

## Verification Baseline

`npm run build` passed on 2026-06-16. The browser plugin could not be used in this environment because the local browser runtime failed to start, so the audit is based on source inspection, product docs, existing styling, and a production build check.
