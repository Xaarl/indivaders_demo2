# Target Repository Structure

Date: 2026-06-16

## Goal

Indievaders should read as one standalone web product repository with one root, one active frontend source tree, clear docs ownership, and explicit holding areas for legacy material, experiments, generated output, and future backend work.

## Target Layout

Recommended stable layout:

```text
.
|-- public/
|   |-- favicon.svg
|   |-- icons.svg
|   `-- sfx/
|
|-- src/
|   |-- App.jsx
|   |-- main.jsx
|   |-- components/
|   |   |-- interactive-report/
|   |   `-- report-workspace/
|   |-- content/
|   |-- data/
|   |-- lib/
|   `-- styles/
|
|-- scripts/
|   |-- verify-report-data.mjs
|   |-- verify-ui-copy.mjs
|   `-- verify-workspace-model.mjs
|
|-- docs/
|   |-- architecture/
|   |-- design/
|   |-- migration/
|   |-- product/
|   |-- project-management/
|   |-- research/
|   |-- repository/
|   |-- product-offer.md
|   |-- qa-checklist.md
|   `-- report-methodology.md
|
|-- experiments/          optional, non-production prototypes only
|
|-- services/             optional later backend boundary
|   `-- api/
|
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- run_public_web.bat
`-- vite.config.js
```

## Active Source Of Truth

The active product source of truth is:

- `src/` for frontend source.
- `public/` for static browser assets.
- `scripts/` for repository verification scripts.
- `package.json` and `package-lock.json` for build and dependency definition.
- `docs/architecture/`, `docs/migration/`, and `docs/repository/` for repository architecture and migration guidance.
- `docs/product/` for the product source of truth.
- `docs/design/` for the design source of truth.
- `docs/research/` for validated and unvalidated research assumptions.
- `docs/project-management/` for PM planning, sprint notes, and decision logs.
- `docs/product-offer.md`, `docs/report-methodology.md`, and `docs/qa-checklist.md` for compact operational summaries and QA rules.

## Archive Boundary

Do not create an archive folder by default. If legacy material must be retained, create it only after a file-level classification and keep it out of normal PM/design handoff paths.

## Experiments Boundary

Use `experiments/` only for exploratory work that is not part of the production app. Each experiment should live in a dated folder:

```text
experiments/YYYY-MM-DD-short-name/
```

Each experiment should include a short `README.md` with:

- purpose;
- owner or initiating request;
- source data used;
- whether it can be deleted;
- how it differs from active product source.

Do not import from `experiments/` into `src/`.

## Future Backend Boundary

Do not add backend logic to `src/`.

When backend work becomes necessary, create a separate package boundary rather than mixing server behavior into the Vite app. Two acceptable future shapes are:

```text
services/api/
```

for a small service beside the current frontend, or:

```text
apps/web/
services/api/
packages/shared/
```

for a later monorepo split.

Do not move to the monorepo shape until there is real shared code or independent deployable services.

## Generated Output

Generated files stay out of version control:

- `dist/`
- `node_modules/`
- local dev-server logs;
- coverage output;
- temporary screenshots;
- raw scrape caches;
- local databases;
- `.env` files.

If generated artifacts need to be shared, document how to reproduce them instead of committing them.
