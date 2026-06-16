# Indievaders Repository Audit

Date: 2026-06-16

## Scope

The canonical Indievaders root is:

```text
G:\Game Dev\Indievaders
```

This audit treats only that root as source of truth. External legacy workspaces, unrelated projects, research folders, and scrape locations are not source material unless explicitly inventoried and migrated.

## Current State

Indievaders is currently a standalone Vite React project. The app contains the public landing page, interactive report sample, early report intake route, and local private workspace preview.

Current top-level layout:

```text
.
|-- .git/
|-- dist/                 generated production build, ignored
|-- docs/                 product, design, research, QA, repository, and migration docs
|-- node_modules/         installed dependencies, ignored
|-- public/               static browser assets
|-- scripts/              Node verification scripts
|-- src/                  active frontend source
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- run_public_web.bat
|-- vite.config.js
|-- vite-*.log            generated dev-server logs, ignored
```

## Build System

The project uses:

- Vite 8
- React 19
- ESLint 10
- `lucide-react`
- npm with `package-lock.json`

Defined scripts:

- `npm run dev`: starts the Vite development server.
- `npm run build`: creates `dist/`.
- `npm run preview`: serves the production build.
- `npm run lint`: checks source with ESLint.
- `npm run verify`: runs report data, UI copy, workspace model, lint, and build checks.
- `npm run verify:report`: validates interactive sample report data.
- `npm run verify:ui-copy`: blocks stale public UI wording.
- `npm run verify:workspace`: validates local workspace request behavior.

## Active Source

Active frontend source currently lives under `src/`:

- `src/App.jsx`: hash-route switch for landing, sample report, order report, and local workspace.
- `src/main.jsx`: React entrypoint and stylesheet imports.
- `src/components/`: landing, report, intake, and workspace components.
- `src/components/interactive-report/`: interactive sample report modules.
- `src/components/report-workspace/`: early intake and local workspace preview.
- `src/content/`: public product and CTA copy.
- `src/data/`: static sample report, report schema, and case-study data.
- `src/lib/reportRequestStore.js`: local browser storage model for prototype report requests.
- `src/styles/`: route-specific CSS files.

The frontend structure is still appropriate for the next stage as long as the product remains a static prototype with local-only workspace previews. It should not absorb backend, scraping, payment, auth, or private customer-data logic.

## Static Assets

Static browser assets currently live under `public/`:

- `favicon.svg`
- `icons.svg`
- `sfx/pixel-burst.wav`
- `sfx/pixel-select.wav`
- `sfx/pixel-unlock.wav`

These are product assets and should remain in `public/` unless an asset pipeline is introduced later.

## Documentation

Current docs:

- `docs/product/`: active product source-of-truth set for product definition, IA, evidence model, roadmap, user journey, and next-sprint recommendations.
- `docs/design/`: active visual direction, component-system guidance, page architecture, and redesign priorities.
- `docs/research/`: active research assumptions and Market Watch research plan.
- `docs/project-management/`: PM-facing workspace for sprint planning and decision logs.
- `docs/product-offer.md`: older compact product offer boundary. Keep as a bridge until reconciled into `docs/product/`.
- `docs/report-methodology.md`: older compact evidence/report methodology. Keep as a bridge until reconciled into `docs/product/`.
- `docs/qa-checklist.md`: active QA checklist.

Historical agent workflow docs were removed from the active tree during the cleanup pass because they mixed migration history, obsolete route notes, and absolute local paths into the handoff surface.

## Generated Output

Generated or local-only output currently includes:

- `dist/`: build output.
- `node_modules/`: dependency install output.
- `vite-*.log`: local development logs.

These are correctly ignored by `.gitignore` and should not be committed.

## Git State

The repository is initialized at `G:\Game Dev\Indievaders`, on branch `master`, with no configured remote at the time of audit.

All meaningful project files currently appear untracked. Before future work, create a clean baseline commit that intentionally stages only source, docs, scripts, config, public assets, and lockfile. Do not stage `dist/`, `node_modules/`, local logs, local databases, raw scrape caches, or secrets.

## Legacy External Confusion Audit

Searches inside the canonical root found no active runtime or frontend-source dependency on old external workspaces, unrelated game projects, or old asset-review tooling.

Before cleanup, hard legacy-project references were limited to historical agent workflow docs and boundary language. Those historical files were removed, and active docs now refer generically to external legacy workspaces instead of naming unrelated projects.

Absolute local path references remain only where they document the canonical local root or local setup commands.

## Current Hygiene Issues

1. All project files are untracked, so the repository has no reliable baseline commit yet.
2. `docs/product/`, `docs/product-offer.md`, and `docs/report-methodology.md` overlap. Treat `docs/product/` as the richer product source of truth and reconcile the older compact docs before they diverge.
3. The app stores private workspace preview data in browser `localStorage`; this is acceptable for prototype state, but not for real paid reports, account data, or customer research artifacts.
4. There is no backend package yet. That is appropriate for the current static prototype, but the boundary must be explicit before adding paid intake, auth, generated reports, or market monitoring.

## Backend Recommendation

Do not create a backend package yet.

Create one when at least one of these becomes true:

- paid report intake needs durable storage;
- customer workspaces need authentication;
- reports need server-side generation;
- market monitoring needs scheduled refreshes;
- Steam or market data ingestion requires caches, rate limiting, or audit logs;
- subscription intelligence needs account-specific data.

Until then, keep `src/lib/reportRequestStore.js` as a clearly local prototype model and avoid mixing production backend concerns into the frontend app.
