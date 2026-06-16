# Handoff Checklist

Date: 2026-06-16

Use this checklist before inviting a project manager, graphic designer, or another engineer into the repository.

## Repository

- [ ] Baseline commit exists.
- [ ] `git status --short` is clean after the baseline commit.
- [ ] `dist/` is not staged.
- [ ] `node_modules/` is not staged.
- [ ] `.env` files are not staged.
- [ ] Local logs, screenshots, caches, and databases are not staged.
- [ ] `npm run verify` passes.

## Product Manager

- [ ] PM has read `docs/repository/team-handoff.md`.
- [ ] PM has read `docs/product/README.md`.
- [ ] PM has read `docs/product/product-definition.md`.
- [ ] PM has read `docs/product/product-stages-roadmap.md`.
- [ ] PM has turned `docs/product/next-sprint-recommendations.md` into issues.
- [ ] Product decisions are recorded in `docs/project-management/decision-log.md`.

## Graphic Designer

- [ ] Designer has read `docs/design/00-design-index.md`.
- [ ] Designer has read `docs/design/01-visual-audit.md`.
- [ ] Designer has read `docs/design/02-visual-direction.md`.
- [ ] Designer has read `docs/design/04-component-system.md`.
- [ ] Designer has read `docs/design/07-redesign-priorities.md`.
- [ ] Design work preserves the current hero direction.
- [ ] Design work does not imply live Market Watch or real account persistence.

## Engineering

- [ ] New app work goes under `src/`.
- [ ] Static web assets go under `public/`.
- [ ] Verification scripts go under `scripts/`.
- [ ] Repository docs go under the appropriate `docs/` subfolder.
- [ ] Backend work is not started without a new architecture note.

## First Review

- [ ] Landing route works.
- [ ] `#sample-report` works.
- [ ] `#order-report` works.
- [ ] `#workspace/<id>` local preview works after creating a report request.
- [ ] Evidence/source labels remain visible where claims are made.
- [ ] Workspace is clearly local/prototype until real persistence exists.

