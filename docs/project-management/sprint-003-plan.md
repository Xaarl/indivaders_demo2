# Sprint 003 Plan

Date: 2026-06-18

## Sprint Goal

Make the current prototype safe to share with a small external audience without expanding product scope.

## Current Baseline

- Branch backed up to GitHub: `codex/sprint-002-visual-focus`.
- Remote: `https://github.com/Xaarl/Indievaders.git`.
- Latest verified commit: `555e908 feat: harden prototype report path`.
- `npm run verify` passes on the Sprint 002 implementation.
- Main user path exists: landing -> `#sample-report` -> `#order-report` -> local `#workspace/<id>`.

## Scope

In scope:

- polish the prototype for external review;
- make the first three minutes of the product path easier to follow;
- add durable handoff notes for reviewers and future Codex threads;
- tighten mobile layouts below the hero;
- add a small share/review checklist;
- keep all persistence language honest about browser-only local preview;
- keep the branch backed up after each meaningful commit.

Out of scope:

- backend persistence;
- authentication;
- payment automation;
- customer-specific report generation;
- email delivery;
- live Steam scraping;
- live Market Watch refreshes;
- subscription UX;
- multi-project dashboard.

## Workstream 1: Share-Ready Narrative

Source docs:

- `docs/product/product-stages-roadmap.md`
- `docs/product/next-sprint-recommendations.md`
- `docs/project-management/decision-log.md`

Tasks:

1. Add a short reviewer-facing "what to look at first" section to the repo README or a dedicated preview handoff doc.
2. Define the review script for a first-time visitor:
   - start at landing;
   - click `Open sample report`;
   - open a source drawer;
   - return to landing;
   - click `Request early report`;
   - create a local workspace;
   - refresh the same browser and confirm the workspace remains;
   - open the workspace link in a clean browser/profile and confirm the missing-data explanation.
3. Record the Sprint 003 scope decision in `docs/project-management/decision-log.md`.

Acceptance criteria:

- A reviewer can run the prototype without reading chat history.
- The script names exact routes and expected outcomes.
- No doc implies backend, payment, or live monitoring exists.

## Workstream 2: Mobile And Layout Polish

Source files:

- `src/styles/landing.css`
- `src/styles/interactive-report.css`
- `src/styles/report-workspace.css`
- `src/components/Hero.jsx`
- `src/components/CaseTeasers.jsx`
- `src/components/report-workspace/EarlyReportIntakePage.jsx`
- `src/components/report-workspace/ProjectWorkspacePage.jsx`

Tasks:

1. Check mobile landing after the first hero viewport:
   - visual scan strip;
   - case cards;
   - selected lesson panel;
   - report decision lane;
   - conversion/early report section.
2. Check mobile `#sample-report`:
   - top navigation wraps cleanly;
   - source drawer remains usable;
   - overview cards do not create horizontal scroll;
   - priority source chips remain tappable.
3. Check mobile `#order-report` and `#workspace/<id>`:
   - form fields remain readable;
   - submit row does not crowd the button;
   - workspace command strip stacks cleanly;
   - tab navigation remains usable without hiding content.
4. Fix only concrete issues found in QA. Do not redesign the whole visual system.

Acceptance criteria:

- No horizontal scroll at 390px width on landing, `#sample-report`, `#order-report`, or workspace.
- Primary CTAs remain visible and readable.
- No buttons or labels are clipped.
- Source drawer is usable on mobile.

## Workstream 3: Review-Safe Copy And Persistence Boundaries

Source files:

- `src/content/productCopy.js`
- `src/content/ctaCopy.js`
- `src/components/report-workspace/EarlyReportIntakePage.jsx`
- `src/components/report-workspace/ProjectWorkspacePage.jsx`
- `scripts/verify-product-ladder.mjs`
- `scripts/verify-workspace-model.mjs`

Tasks:

1. Scan public UI for words that imply completed commerce or durable SaaS:
   - `buy`;
   - `checkout`;
   - `subscribe`;
   - `account`;
   - `dashboard`;
   - `live scan`;
   - `instant report`;
   - `AI generated`.
2. Keep allowed language explicit:
   - `Request early report`;
   - `Browser-only local preview`;
   - `Market Watch` as `Future layer`;
   - paid report work as manual review after request.
3. Extend verification scripts only if the scan reveals a recurring risky phrase.

Acceptance criteria:

- Public UI does not imply payment, auth, backend persistence, or live monitoring.
- Local preview copy is visible before and after workspace creation.
- `npm run verify` passes.

## Workstream 4: Lightweight Reviewer QA

Source files:

- `docs/qa-checklist.md`
- `scripts/verify-landing-visual-focus.mjs`
- `scripts/verify-product-ladder.mjs`
- `scripts/verify-workspace-model.mjs`

Tasks:

1. Add a "Share Preview Gate" section to `docs/qa-checklist.md` covering:
   - desktop landing first screen;
   - mobile landing first screen;
   - sample report source drawer;
   - early report intake submit flow;
   - generated workspace;
   - missing workspace in clean browser/profile.
2. Keep automated checks focused on stable contracts:
   - routes;
   - key CTA copy;
   - local preview boundary;
   - source chips/drawer availability.
3. Do not add brittle screenshot tests to the repo in this sprint.

Acceptance criteria:

- Manual QA has exact route steps and expected outcomes.
- Automated checks still run through `npm run verify`.
- No generated screenshots are committed.

## Workstream 5: Backup And Handoff Discipline

Source docs:

- `docs/project-management/handoff-checklist.md`
- `docs/project-management/decision-log.md`
- `docs/repository/team-handoff.md`

Tasks:

1. After each meaningful Sprint 003 commit, push `codex/sprint-002-visual-focus` or the active Sprint 003 branch to `origin`.
2. If a new branch is created, use `codex/sprint-003-share-ready`.
3. Keep generated output unstaged:
   - `dist/`;
   - screenshots;
   - logs;
   - local databases;
   - `.env` files.
4. End the sprint with:
   - `npm run verify`;
   - browser smoke on the main path;
   - clean `git status`;
   - pushed branch.

Acceptance criteria:

- Repository has a remote backup for the final sprint commit.
- Handoff docs tell the next thread what was changed and how it was verified.
- No work depends on Codex chat history.

## Suggested Task Order

1. Create or update reviewer handoff docs.
2. Run desktop and mobile browser QA on current build.
3. Fix only confirmed mobile/layout/copy issues.
4. Update QA checklist with the final share-preview gate.
5. Run `npm run verify`.
6. Run browser smoke for landing, `#sample-report`, `#order-report`, workspace creation, and missing workspace.
7. Commit with `chore: prepare share-ready prototype handoff` or a more specific feature/fix message.
8. Push the active branch to `origin`.

## Test Plan

Run:

```powershell
npm run verify
```

Manual browser smoke:

1. Open `http://127.0.0.1:5176/`.
2. Check landing desktop first screen.
3. Check landing mobile at 390px width.
4. Open `#sample-report`.
5. Click `Open evidence`.
6. Open `#order-report`.
7. Fill the intake form and submit.
8. Confirm generated `#workspace/<id>` says `Browser-only local preview`.
9. Refresh the same browser and confirm the workspace remains.
10. Clear local storage or use a clean profile, then open the workspace hash and confirm the browser-only missing-data explanation.

## Sprint Exit Criteria

- The prototype is safe to send to a reviewer as a link plus short instructions.
- The reviewer can understand the product path without chat context.
- Mobile does not undermine the first impression.
- The local-preview limitation is clear.
- Verification passes.
- Final branch is pushed to GitHub.
