# Sprint 001 Plan

Date: 2026-06-16

## Sprint Goal

Make the current prototype clearer, more credible, and ready for early user review without expanding product scope.

## Scope

In scope:

- clarify the landing -> sample report -> early report request path;
- improve first-screen value in the interactive sample report;
- make case cards communicate the benchmark trap faster;
- make evidence labels and source access more consistent;
- label local workspace preview state clearly;
- preserve the current hero direction.

Out of scope:

- backend persistence;
- customer accounts;
- payment automation;
- live Steam scraping;
- subscription billing;
- creator CRM;
- AI assistant;
- multi-project dashboard.

## Workstream 1: Product And PM

Source docs:

- `docs/product/product-definition.md`
- `docs/product/product-stages-roadmap.md`
- `docs/product/next-sprint-recommendations.md`
- `docs/repository/team-handoff.md`

Tasks:

1. Convert the seven priorities in `docs/product/next-sprint-recommendations.md` into issues.
2. Define acceptance criteria for the primary path: landing -> `#sample-report` -> `#order-report`.
3. Decide whether `docs/product-offer.md` and `docs/report-methodology.md` remain operational summaries or get merged into `docs/product/`.
4. Keep scope limited to prototype hardening.

Acceptance criteria:

- The sprint board has one primary user journey epic.
- Every issue has a source doc link.
- No issue depends on backend persistence, payment, or live monitoring.

## Workstream 2: Design

Source docs:

- `docs/design/00-design-index.md`
- `docs/design/01-visual-audit.md`
- `docs/design/02-visual-direction.md`
- `docs/design/04-component-system.md`
- `docs/design/07-redesign-priorities.md`

Tasks:

1. Produce a landing hierarchy pass focused on one primary CTA path.
2. Define case-card layout for visible trap, safe lesson, and unsafe assumption.
3. Define evidence/source component rules for cards, drawers, and report sections.
4. Produce a workspace-preview status treatment that does not imply real persistence.

Acceptance criteria:

- The hero remains recognizable.
- Lower sections feel calmer and more operational.
- Design does not imply Market Watch is live.
- Component rules are usable by engineering without a full redesign reset.

## Workstream 3: Engineering

Source docs:

- `README.md`
- `docs/repository/conventions.md`
- `docs/architecture/target-structure.md`
- `docs/qa-checklist.md`

Tasks:

1. Keep changes inside `src/`, `public/`, `scripts/`, and the appropriate `docs/` folder.
2. Add checks only when they protect a real product or repository contract.
3. Run `npm run verify` before handoff.
4. Keep generated output unstaged.

Acceptance criteria:

- `npm run verify` passes.
- No `dist/`, `node_modules/`, logs, `.env`, screenshots, caches, or local databases are staged.
- No references to old external workspaces are introduced.

## Sprint Exit Criteria

- A new visitor can identify the product and primary next action within the first minute.
- The interactive sample report creates a clear false-comparable or benchmark-trap aha moment.
- Early report request language does not promise backend behavior that does not exist.
- PM and designer have updated their source docs or linked design artifacts.
- Full verification passes.

