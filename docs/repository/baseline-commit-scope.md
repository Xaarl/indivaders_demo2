# Baseline Commit Scope

Date: 2026-06-16

## Purpose

The baseline commit establishes Indievaders as a standalone repository. It should include the current application, docs, verification scripts, static assets, and build configuration while excluding generated and local-only output.

## Include

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

## Exclude

- `dist/`
- `node_modules/`
- `.env`
- `.env.*`
- local logs
- screenshots
- raw scrape caches
- local databases
- generated QA artifacts
- unrelated external workspace files

## Verification Before Commit

Run:

```text
npm run verify
```

Expected:

- report data check passes;
- UI copy check passes;
- workspace model check passes;
- ESLint passes;
- production build passes.

## Commit Message

Recommended baseline commit message:

```text
chore: establish standalone Indievaders baseline
```

