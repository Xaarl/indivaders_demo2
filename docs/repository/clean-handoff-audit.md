# Clean Handoff Audit

Date: 2026-06-16

## Verdict

Indievaders is now clean enough to hand to a project manager and graphic designer as a standalone product repository.

The repository is ready for a baseline git commit before normal collaboration starts.

## What Is Clean Now

- The canonical root is `G:\Game Dev\Indievaders`.
- Active frontend source lives under `src/`.
- Static browser assets live under `public/`.
- Verification scripts live under `scripts/`.
- Product source of truth lives under `docs/product/`.
- Design direction lives under `docs/design/`.
- Research assumptions live under `docs/research/`.
- Repository, migration, and conventions docs live under `docs/repository/`, `docs/migration/`, and `docs/architecture/`.
- PM planning has a dedicated area under `docs/project-management/`.

## Cleanup Completed

Removed from the active tree:

- historical agent workflow plans from the previous migration phase;
- old migration spec material that mixed external-project context into Indievaders;
- dead `SampleBriefPreview.jsx` route component;
- dead `sampleBrief.js` preview data;
- stale route references from active product docs;
- external-project names from active repository docs and README;
- root development logs.

Kept intentionally:

- `src/data/reportSchema.js`, because `src/data/caseStudies.js` imports its evidence labels and evidence types.
- `docs/product-offer.md` and `docs/report-methodology.md`, as compact operational summaries until their content is reconciled into `docs/product/`.
- `dist/`, because build verification recreates it; it remains ignored and should not be staged.
- `node_modules/`, because dependencies are installed locally; it remains ignored and should not be staged.

## Current Architecture Risk

The current frontend structure is acceptable for the prototype stage:

- public landing;
- interactive sample report;
- early report intake;
- local-only workspace preview.

Do not add a backend yet. Add `services/api/` only when there is a real need for durable report requests, authentication, payments, project-specific report generation, scheduled Market Watch refreshes, or private customer data.

## Remaining Cleanup Before Team Work

1. Create a baseline commit that includes source, docs, scripts, config, public assets, and lockfile.
2. Do not stage `dist/`, `node_modules/`, `.env`, logs, local databases, screenshots, or caches.
3. Reconcile `docs/product-offer.md` and `docs/report-methodology.md` into the richer `docs/product/` set, or explicitly mark them as short summaries.
4. Decide where external design files live. Recommended: keep editable design source in the design tool, export only final web-ready assets into `public/` or documented source assets into a future `assets/` folder.
5. Turn `docs/project-management/sprint-001-plan.md` into the actual PM task board.
6. Use `docs/design/07-redesign-priorities.md` as the first designer work queue.

## Collaboration Readiness

Project manager can start from:

- `docs/product/README.md`
- `docs/product/product-definition.md`
- `docs/product/product-stages-roadmap.md`
- `docs/product/next-sprint-recommendations.md`
- `docs/project-management/README.md`
- `docs/project-management/sprint-001-plan.md`
- `docs/project-management/decision-log.md`
- `docs/project-management/handoff-checklist.md`

Graphic designer can start from:

- `docs/design/00-design-index.md`
- `docs/design/01-visual-audit.md`
- `docs/design/02-visual-direction.md`
- `docs/design/04-component-system.md`
- `docs/design/07-redesign-priorities.md`

Engineer/agent can start from:

- `README.md`
- `docs/repository/index.md`
- `docs/repository/conventions.md`
- `docs/architecture/target-structure.md`
- `docs/qa-checklist.md`
