# Team Handoff

Date: 2026-06-16

## Product Stage

Indievaders is in prototype hardening.

What exists:

- public landing page;
- interactive invader/black-hole hero;
- interactive sample report;
- early report intake;
- local-only private workspace preview;
- product, design, research, repository, and QA docs.

What does not exist yet:

- backend persistence;
- customer accounts;
- payments;
- customer-specific report generation;
- email delivery;
- live Market Watch refreshes;
- subscription system.

## Source Of Truth By Role

Project manager:

- `docs/product/README.md`
- `docs/product/product-definition.md`
- `docs/product/product-stages-roadmap.md`
- `docs/product/next-sprint-recommendations.md`
- `docs/project-management/README.md`
- `docs/project-management/sprint-001-plan.md`
- `docs/project-management/github-issue-backlog.md`
- `docs/project-management/decision-log.md`
- `docs/project-management/handoff-checklist.md`

Graphic designer:

- `docs/design/00-design-index.md`
- `docs/design/01-visual-audit.md`
- `docs/design/02-visual-direction.md`
- `docs/design/03-page-architecture.md`
- `docs/design/04-component-system.md`
- `docs/design/designer-brief.md`
- `docs/design/07-redesign-priorities.md`

Engineer:

- `README.md`
- `docs/repository/index.md`
- `docs/repository/conventions.md`
- `docs/architecture/target-structure.md`
- `docs/qa-checklist.md`

## First PM Sprint

Recommended sprint goal:

Make the prototype clearer and more credible without expanding scope.

Recommended PM tasks:

1. Convert `docs/project-management/sprint-001-plan.md` into prioritized issues.
2. Define acceptance criteria for the landing-to-sample-report-to-intake path.
3. Decide whether `docs/product-offer.md` and `docs/report-methodology.md` remain compact summaries or get merged into `docs/product/`.
4. Keep product ladder decisions in `docs/project-management/decision-log.md`.
5. Keep Market Watch, subscriptions, creator CRM, and AI assistant out of the immediate sprint.

## First Design Sprint

Recommended design goal:

Make the current product surfaces feel like one coherent signal intelligence instrument without changing the approved product direction.

Recommended design tasks:

1. Start from `docs/design/07-redesign-priorities.md`.
2. Tighten the landing hierarchy around one primary path: sample report to early report.
3. Define a reusable evidence/source component language.
4. Improve case-card scan value: visible trap, safe lesson, unsafe assumption.
5. Keep the hero direction, but make lower sections calmer and more operational.
6. Do not make Market Watch look live until backend refresh data exists.

## Asset Rules

- Web-ready static assets go in `public/`.
- Source design files should stay in the design tool unless there is a clear reason to version them.
- If a future asset source folder is needed, create `assets/README.md` first and define what belongs there.
- Do not put screenshots, moodboards, temporary exports, or raw design dumps in the repo root.

## Engineering Rules For Team Work

- Keep new app code in `src/`.
- Keep docs in the matching `docs/` subfolder.
- Keep generated output ignored.
- Run `npm run verify` before handing work back.
- Use `docs/repository/baseline-commit-scope.md` before staging baseline changes.
