# Indievaders

Standalone Vite React project for the Indievaders public landing page, interactive sample report, early report intake flow, and local private workspace preview.

The canonical local root is:

```text
G:\Game Dev\Indievaders
```

Do not treat old external workspaces, generated output, or any unrelated folder as Indievaders source of truth.

## Scripts

- `npm run dev` starts the local Vite server.
- `npm run build` creates a production build in `dist`.
- `npm run preview` serves the production build locally.
- `npm run lint` checks the app with ESLint.
- `npm run verify` runs data, workspace, copy, lint, and build checks.

## Vercel

- Root directory: project root (`G:\Game Dev\Indievaders` locally)
- Build command: `npm run build`
- Output directory: `dist`

## Repository Docs

- [Repository documentation index](docs/repository/index.md)
- [Repository audit](docs/architecture/repository-audit.md)
- [Target structure](docs/architecture/target-structure.md)
- [Standalone migration plan](docs/migration/standalone-migration-plan.md)
- [Repository conventions](docs/repository/conventions.md)
- [Clean handoff audit](docs/repository/clean-handoff-audit.md)
- [PM workspace](docs/project-management/README.md)
- [Design direction](docs/design/00-design-index.md)
- [GitHub setup](docs/repository/github-setup.md)

## Safety Boundary

This app is static and safe to preview. Keep internal research tooling private until it is intentionally extracted into a separate backend or service package.

Do not commit local databases, raw scrape caches, logs, API keys, `.env` files, customer data, `node_modules`, or `dist`.


