# GitHub Issue Backlog

Date: 2026-06-16

These are GitHub-ready issue drafts for Sprint 001. Create them after the repository has a remote.

## Labels To Create

- `pm`
- `design`
- `engineering`
- `sprint-001`
- `copy`
- `evidence`
- `workspace`
- `qa`

## S001-01: Align Product Ladder And Public Routes

Type: PM + Engineering

Labels: `pm`, `engineering`, `copy`, `sprint-001`

Source:

- `docs/product/next-sprint-recommendations.md`
- `docs/product/information-architecture.md`
- `docs/qa-checklist.md`

Goal:

Make public language consistently distinguish Interactive sample report, Sample brief, Early Steam Positioning Report, Private project workspace, and future Market Watch.

Acceptance criteria:

- No public UI asks users to reconcile sample brief versus sample report.
- Primary landing CTA reaches `#sample-report`.
- Early report CTA reaches `#order-report`.
- QA checklist matches actual routes.
- `npm run verify` passes.

## S001-02: Strengthen The First Aha In The Interactive Sample Report

Type: Product + Engineering

Labels: `engineering`, `evidence`, `sprint-001`

Source:

- `docs/product/next-sprint-recommendations.md`
- `docs/design/07-redesign-priorities.md`

Goal:

Make the sample report first screen immediately communicate that Indievaders catches bad positioning decisions.

Acceptance criteria:

- First screen contains a clear wrong-benchmark or unsafe-comparable moment.
- At least one verdict shows safe lesson and unsafe assumption.
- Top actions visibly connect to risks or evidence.
- Source access remains one click away.
- No new long-form wall of text.

## S001-03: Convert Case Cards Into A Diagnostic Console

Type: Design + Engineering

Labels: `design`, `engineering`, `evidence`, `sprint-001`

Source:

- `docs/design/07-redesign-priorities.md`
- `docs/design/04-component-system.md`

Goal:

Make the three real-game cases readable as diagnostic benchmark traps before click-through.

Acceptance criteria:

- Each case shows looks comparable, hidden distortion, safe lesson, unsafe assumption, next action, and evidence.
- TMNT is never framed as a direct small-team benchmark.
- Balatro is not presented as a normal forecast.
- Dave the Diver is clearly about production reality.
- Mobile layout remains scannable.

## S001-04: Clarify Workspace Preview Status

Type: Engineering + PM

Labels: `engineering`, `workspace`, `sprint-001`

Source:

- `docs/product/next-sprint-recommendations.md`
- `docs/design/06-workspace-ux-ui-plan.md`

Goal:

Make the local workspace preview useful without implying backend persistence or a finished customer portal.

Acceptance criteria:

- Workspace states clearly that it is stored locally in the current browser.
- Paid product promise remains the report, not a complete SaaS.
- Market Watch remains marked future and not live.
- Intake confirmation explains what happens in the real paid version.

## S001-05: Make Evidence UX Consistent

Type: Design + Engineering

Labels: `design`, `engineering`, `evidence`, `sprint-001`

Source:

- `docs/product/trust-evidence-model.md`
- `docs/design/04-component-system.md`

Goal:

Make evidence labels visible enough to build trust without repeating disclaimers everywhere.

Acceptance criteria:

- Case evidence chips show label or type consistently.
- Report source drawer remains the single place for full evidence definitions.
- Major verdicts and actions can reach the source log.
- Users can distinguish confirmed facts from inferred recommendations.

## S001-06: Consolidate Visual Tokens

Type: Design + Engineering

Labels: `design`, `engineering`, `sprint-001`

Source:

- `docs/design/04-component-system.md`
- `docs/design/07-redesign-priorities.md`

Goal:

Create a small shared token layer for colors, spacing, radius, text, borders, shadows, and transitions across landing, report, and workspace CSS.

Acceptance criteria:

- Shared variables exist in the CSS entrypoint or a clearly documented shared style section.
- Surface-specific layout rules remain in their current files.
- Buttons, chips, panels, source states, and labels use consistent tokens.
- The UI does not become a generic dark SaaS palette.

## S001-07: Reframe Early Report Intake

Type: Design + Engineering

Labels: `design`, `engineering`, `sprint-001`

Source:

- `docs/design/07-redesign-priorities.md`
- `docs/product/information-architecture.md`

Goal:

Make intake feel like the start of a report/workspace, not a generic form page.

Acceptance criteria:

- Fields are grouped by project, references, concerns, and confirmation.
- A side summary explains how inputs become report/workspace outputs.
- The page remains clean on mobile and desktop.
- It does not promise instant generation or backend persistence.

## S001-08: Repository And Handoff Guardrails

Type: PM + Engineering

Labels: `pm`, `engineering`, `qa`, `sprint-001`

Source:

- `docs/repository/team-handoff.md`
- `docs/project-management/handoff-checklist.md`
- `docs/repository/baseline-commit-scope.md`

Goal:

Keep collaboration clean after PM and designer enter the project.

Acceptance criteria:

- PM decisions are added to `docs/project-management/decision-log.md`.
- Design handoff links are recorded in the related issue.
- Generated output remains unstaged.
- Every implementation PR uses `.github/PULL_REQUEST_TEMPLATE.md`.

