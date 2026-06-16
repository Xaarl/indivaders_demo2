# Standalone Migration Plan

Date: 2026-06-16

## Migration Principle

Do not delete or move legacy material until it has been classified. The immediate goal is a clean source-of-truth map, then a safe baseline commit, then targeted cleanup.

## Current Decision Table

| Area | Classification | Action |
| --- | --- | --- |
| `src/` | Active source of truth | Keep. Continue organizing by product surface. |
| `public/` | Active static assets | Keep. Do not mix source assets and generated assets here. |
| `scripts/` | Active verification tooling | Keep. Add future checks here when they verify repository behavior. |
| `docs/product/` | Active product source of truth | Keep. Product direction, IA, evidence model, journey, and roadmap live here. |
| `docs/product-offer.md` | Older compact product boundary | Keep temporarily. Reconcile into `docs/product/` before changing both. |
| `docs/report-methodology.md` | Older compact report rules | Keep temporarily. Reconcile into `docs/product/` before changing both. |
| `docs/qa-checklist.md` | Active QA gate | Keep and keep route names current. |
| `docs/architecture/` | Active repository architecture | Keep. New architecture decisions go here. |
| `docs/migration/` | Active migration tracking | Keep. Migration records go here. |
| `docs/repository/` | Active repo conventions | Keep. Working agreements go here. |
| `dist/` | Generated output | Ignore. Delete locally only when cleaning workspace output. |
| `node_modules/` | Generated dependency install | Ignore. Recreate with `npm install`. |
| `vite-*.log` | Local generated logs | Ignore. Delete locally when stale. |
| `.env` and `.env.*` | Local secrets/config | Ignore. Do not commit. |
| Historical agent workflow docs | Obsolete migration history | Removed from active tree on 2026-06-16. |
| `src/components/SampleBriefPreview.jsx` | Dead legacy route component | Removed on 2026-06-16 after import check. |
| `src/data/sampleBrief.js` | Dead legacy preview data | Removed on 2026-06-16 after import check. |
| `src/data/reportSchema.js` | Active shared report/case schema | Keep. Imported by `src/data/caseStudies.js`. |

## External Material

No external folders were inspected during this pass because `G:\Game Dev\Indievaders` is the only valid source of truth for this work.

If Indievaders material still exists outside this root, migrate it through an explicit intake list:

```text
External path:
Material type: source | docs | asset | generated output | research | secret | unknown
Owner:
Last known use:
Contains customer/private data: yes | no | unknown
Recommended action: move | archive | ignore | delete later | leave external temporarily
Target path under Indievaders:
Notes:
```

Never move raw scrape caches, local databases, private customer data, API keys, or generated build output into the repository as tracked source.

## Phase 1: Baseline Repository

1. Keep all active Indievaders material under `G:\Game Dev\Indievaders`.
2. Run the verification suite.
3. Review untracked files and intentionally stage only source, docs, scripts, config, public assets, and lockfile.
4. Create a baseline commit before large moves.
5. Add a remote only when the repository name and visibility are intentional.

Baseline commit should include:

- `.gitignore`
- `README.md`
- `docs/`
- `eslint.config.js`
- `index.html`
- `package-lock.json`
- `package.json`
- `public/`
- `run_public_web.bat`
- `scripts/`
- `src/`
- `vite.config.js`

Baseline commit should not include:

- `dist/`
- `node_modules/`
- `vite-*.log`
- `.env`
- raw scrape caches;
- local databases;
- screenshots or QA captures;
- unrelated legacy workspace files.

## Phase 2: Classify Legacy In Root

Review these items:

- `docs/product-offer.md`
- `docs/report-methodology.md`
- `src/data/reportSchema.js`

Recommended outcomes:

- Reconcile `docs/product-offer.md` and `docs/report-methodology.md` into `docs/product/`, or label them as short operational summaries.
- Keep `reportSchema.js` because active case-study data imports evidence labels and types from it.

## Phase 3: External Intake

If the team identifies Indievaders material in old external workspaces, old research tooling, or desktop scratch folders:

1. Copy an inventory into `docs/migration/external-inventory.md`.
2. Classify each item before moving it.
3. Move source files only into the matching active folder.
4. Move historical docs only into `archive/legacy/` or `docs/migration/`.
5. Leave raw/generated/private material external unless there is a clean sanitized fixture requirement.
6. Record every move in this migration document or a dated follow-up under `docs/migration/`.

## Phase 4: Backend Decision Point

Do not create a backend during repository cleanup.

Create `services/api/` later only when the product needs durable private state, authenticated workspaces, server-generated reports, scheduled market refreshes, payment webhooks, or controlled data ingestion.

Before creating that package, write a focused architecture note under `docs/architecture/` covering:

- service responsibility;
- storage boundary;
- private data rules;
- deployment target;
- local development flow;
- frontend/API contract.

## Immediate Recommendations

Move immediately:

- Nothing outside the root was proven safe to move in this pass.

Archive later:

- Older compact product docs after `docs/product/` fully owns their content.

Ignore:

- `dist/`
- `node_modules/`
- `vite-*.log`
- `.env` files
- local caches and generated QA screenshots

Delete later:

- Local generated logs once no longer needed.
- Local `dist/` when cleaning the workspace.

Leave untouched temporarily:

- Any external legacy material until it is inventoried and classified.
