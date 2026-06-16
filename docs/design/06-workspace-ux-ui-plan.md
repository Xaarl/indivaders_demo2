# Private Workspace UX/UI Plan

Date: 2026-06-16

## Workspace Role

The private workspace is where Indievaders stops being a landing page and becomes a tool.

It should hold:

- The submitted project profile.
- The generated Steam Positioning Report.
- Saved comparables.
- Review risks.
- Prioritized actions.
- Source evidence.
- Future Market Watch updates.

It should not feel like a placeholder admin page.

## Current Workspace Model

Current data and UI already include:

- Project profile.
- Report snapshot.
- Comparable board.
- Review risk map.
- Action items with done/open status.
- Source log.
- Market Watch preview runs.

This is a solid product model. The visual hierarchy needs to catch up.

## Primary Workspace Structure

### 1. Workspace Topbar

Purpose: orientation and escape routes.

Recommended content:

- Indievaders mark.
- Project title or compact project selector.
- Report status.
- Source log access.
- Back to landing.
- Open sample report.

The current topbar has links, but it does not yet establish workspace identity.

### 2. Project Header

Purpose: remind the user what this workspace is about.

Recommended content:

- Project title.
- One-sentence synopsis.
- Stage.
- Main concerns.
- Steam URL state.

Keep the header compact. Do not use hero-scale type in the workspace.

### 3. Command Strip

New component: `WorkspaceCommandStrip`.

Purpose: make the workspace feel operational immediately.

Tiles:

- Report state: Request received / Processing / Ready / Updated.
- Saved comps: count and next action.
- Open actions: count and priority.
- Sources: source coverage or unknowns.
- Market Watch: no refresh yet / preview ready / changes detected.

This replaces the current scattered status feeling.

### 4. Workspace Navigation

Current tabs are correct:

- Profile
- Snapshot
- Comparables
- Review risks
- Actions
- Sources
- Market Watch

Improve the nav:

- Add small status dots or counts where useful.
- Keep active state strong.
- On desktop, consider left rail if the workspace grows.
- On mobile, keep horizontal scroll but make tab labels compact.

## Workspace Modules

### Profile

Purpose: project dossier.

Recommended layout:

- Synopsis.
- Stage and Steam URL.
- Reference games.
- Main concerns.
- Notes.

Visual treatment:

- Dossier sections, not generic cards.
- Use labels sparingly.
- Show missing info as "Not added" with quiet slate styling.

### Snapshot

Purpose: executive report read.

Current issue: five equal cards make every decision feel equally important.

Recommended layout:

- Lead decision at top.
- Compact decision rows below.
- Confidence/source chips visible.
- Jump links into detail modules.

This should mirror the sample report overview.

### Comparables

Purpose: save useful references and separate unsafe benchmarks.

Recommended layout:

- Map/detail view for report-ready data.
- Board/list view for saved comparables.
- Unsafe benchmark warnings are amber.
- Saved state is green/cyan.

Important actions:

- Save comparable.
- Remove saved comparable.
- Open evidence.
- Mark as safe lesson, unsafe benchmark, or watch candidate.

### Review Risks

Purpose: translate nearby player friction into design checks.

Keep the pattern:

Player signal -> Design meaning -> Action.

Recommended layout:

- Risk list with severity.
- Active risk detail.
- Linked action item.
- Evidence drawer.

### Actions

Purpose: turn report into work.

Recommended layout:

- Action queue, sorted by priority.
- Status toggle.
- Effort.
- Impact.
- Linked evidence.
- Optional owner/date later.

Current done styling uses line-through. Keep status change, but reduce line-through intensity so completed items remain readable.

### Sources

Purpose: trust ledger.

Recommended layout:

- Filter by label: Confirmed, Reported, Estimated, Inferred, Not publicly confirmed.
- Filter by type: Steam store, official site, article, review method.
- Source rows, not large cards by default.
- Show what recommendation each source supports.

This is a differentiator. Treat it as a first-class workspace tool.

### Market Watch

Purpose: future subscription layer.

Current prototype correctly avoids pretending live data exists.

Recommended layout now:

- Watchlist setup state.
- Saved comparables count.
- Preview refresh button.
- Change ledger.
- "No live market scan connected yet" state.

Future live version:

- Tracked comparables.
- New candidate detections.
- Price/tag/review shifts.
- Alert severity.
- Source/confidence label.
- Recommended response.

Market Watch should feel like tracked change intelligence, not a generic analytics dashboard.

## Order Flow Into Workspace

After submitting intake:

- Route to workspace.
- Show "Request received" state.
- Show what was created from the form.
- Highlight next step: open sample report or wait for paid report processing.

The first workspace screen after intake should reduce anxiety:

- Your data is captured.
- The report format is visible.
- The private workspace is where future output will live.

## Visual Differences From Public Report

Sample report:

- Polished artifact.
- Designed to prove value quickly.
- More dramatic report cover.

Workspace:

- Tool shell.
- More compact.
- Persistent navigation.
- Project-specific status.
- Supports repeated use.

They should share components, not identical layouts.

## Empty, Pending, And Future States

Design these states intentionally:

- Empty comparables: prompt user to add or wait for generated report.
- No actions done: show first recommended action.
- No Market Watch run: explain what tracking will do later.
- Unknown source data: show "Not publicly confirmed" instead of blank.

Avoid placeholder language. Every empty state should tell the user what is true and what comes next.

## First Implementation Targets

1. Add `WorkspaceCommandStrip` under the project hero.
2. Reduce workspace hero heading scale.
3. Convert Snapshot cards into lead decision + decision rows.
4. Make Sources a ledger with filters.
5. Make Market Watch preview a change ledger with clear future boundary.
6. Strengthen action queue status without making completed actions unreadable.

## Acceptance Criteria

- The workspace can be understood in 10 seconds.
- It feels related to the sample report but more operational.
- Project state, saved comps, open actions, and evidence are visible without hunting.
- Market Watch feels like a real future layer, not filler.
- No surface reads as a default admin template.
