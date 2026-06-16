# Repository Conventions

Date: 2026-06-16

## Source Boundary

`G:\Game Dev\Indievaders` is the only canonical root for Indievaders work.

Do not import source from old external workspaces, unrelated projects, desktop scratch folders, or old research tooling. If external material matters, classify and migrate it through `docs/migration/` first.

## Frontend Work

Add public and prototype frontend work under `src/`:

- route orchestration: `src/App.jsx`;
- route-level surfaces: `src/components/`;
- interactive report modules: `src/components/interactive-report/`;
- local workspace prototype modules: `src/components/report-workspace/`;
- static structured product data: `src/data/`;
- copy constants: `src/content/`;
- local-only browser behavior: `src/lib/`;
- route-specific styling: `src/styles/`.

Keep frontend modules focused by product surface. Do not add scraping, payment, auth, or server persistence to the browser app.

## Documents

Use these locations:

- `docs/architecture/`: structural decisions, target architecture, backend/package boundaries.
- `docs/migration/`: inventories, migration plans, move/archive/delete decisions.
- `docs/repository/`: working agreements and repository hygiene rules.
- `docs/product/`: product source of truth, including product definition, IA, evidence model, journey, roadmap, and next-sprint recommendations.
- `docs/product-offer.md`: older compact offer summary. Keep aligned with `docs/product/` until reconciled.
- `docs/report-methodology.md`: older compact methodology summary. Keep aligned with `docs/product/` until reconciled.
- `docs/design/`: design direction, visual audit, page architecture, component system, and redesign priorities.
- `docs/research/`: research assumptions and validation plans.
- `docs/project-management/`: PM plans, sprint notes, decision logs, and handoff checklists.
- `docs/qa-checklist.md`: manual and release QA.

## Scripts

Use `scripts/` for deterministic local checks. Script names should describe the contract they verify.

Current required checks:

```text
npm run verify
```

Run the full verification suite before declaring repository-structure work complete, unless the change only edits prose and the reason for skipping is recorded.

## Generated Output

Do not commit:

- `dist/`
- `node_modules/`
- dev-server logs;
- coverage folders;
- local screenshots;
- local databases;
- raw scrape caches;
- `.env` files;
- API keys or customer-specific data.

If an output is useful, document the command to regenerate it instead of checking it in.

## Experiments

Experiments must be isolated from active source:

```text
experiments/YYYY-MM-DD-short-name/
```

Experiment code must not be imported from `src/`. Promote an experiment by copying only the reviewed, cleaned implementation into the active source tree.

## Archive

Create `archive/legacy/` only when there is classified legacy material to keep. Each archived area needs a short README explaining why it exists and what can delete it later.

Archived files are not active source of truth.

## Local Data

Prototype user input may use browser `localStorage` only for local demos. Real paid report data, private customer workspaces, market refreshes, and subscription intelligence must use a backend storage boundary.

Do not store private or customer data as committed fixtures unless it is fully synthetic.

## Backend Boundary

No backend package exists now, and that is intentional.

Add `services/api/` only when the product needs server-owned responsibilities such as:

- authentication;
- payment webhooks;
- private workspace persistence;
- report generation;
- market monitoring jobs;
- scrape/data ingestion;
- audit logs.

Before adding it, write the backend architecture note first.

## Baseline Workflow

1. Keep work inside `G:\Game Dev\Indievaders`.
2. Add source to the established folder for that product surface.
3. Add or update a verification script when the change introduces a structural contract.
4. Update docs when routes, data boundaries, build flow, or repository layout change.
5. Run `npm run verify`.
6. Stage only intentional source, docs, scripts, config, public assets, and lockfile changes.
