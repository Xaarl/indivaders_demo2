# Refractured Client Report Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a client-facing Indievaders client report for the early-stage Refractured Godot project, backed by local project evidence and public Steam/market sources.

**Architecture:** This is a documentation and research deliverable, not an app change. The client-facing report lives in `docs/client-reports/refractured-steam-positioning-readiness.html`, with `docs/client-reports/refractured-steam-positioning-readiness.md` kept as the editorial source. The internal workflow/product-learning note lives in `docs/project-management/refractured-report-workflow-notes.md` and is clearly separated from the client-facing artifact. Source confidence follows the existing Indievaders evidence model, and raw Refractured assets or source files are not copied into this repository.

**Tech Stack:** Markdown, Git, local filesystem inspection, public web research, existing Indievaders evidence labels.

---

## File Structure

- Create: `docs/client-reports/refractured-steam-positioning-readiness.html`
  - Client-facing HTML report that reads like a paid Indievaders deliverable.
  - This is the primary reading artifact.

- Create: `docs/client-reports/refractured-steam-positioning-readiness.md`
  - Editorial source for report text and evidence labels.
  - This is not the primary reading artifact.
  - Contains executive read, current game snapshot, market lane, true comparables, production reality, demo/Steam promise drafts, review risks, prioritized actions, and source appendix.

- Create: `docs/project-management/refractured-report-workflow-notes.md`
  - Internal note about what the report validation pass reveals about the future Indievaders report workflow.
  - Keeps product-process observations out of the client-facing report.

- Modify: `docs/project-management/decision-log.md`
  - Add one short decision entry that the next sprint shifts from public sharing toward a Refractured client report.

- Read only: `E:\Projekty Gier\Godot\Refractured\README.md`
- Read only: `E:\Projekty Gier\Godot\Refractured\godot_game_project\documentation\CURRENT_PROJECT_STATE.md`
- Read only: `E:\Projekty Gier\Godot\Refractured\godot_game_project\documentation\Technical_Foundation_Handbook.md`
- Read only: `E:\Projekty Gier\Godot\Refractured\godot_game_project\documentation\Asset_Source_Manifest.md`
- Read only: `E:\Projekty Gier\Godot\Refractured\godot_game_project\documentation\Animation_Pipeline_Sandbox.md`
- Read only: `E:\Projekty Gier\Godot\Refractured\docs\superpowers\specs\2026-06-02-combat-foundation-v2-slice-design.md`

## Task 1: Create client report Skeleton

**Files:**
- Create: `docs/client-reports/refractured-steam-positioning-readiness.md`
- Create: `docs/project-management/refractured-report-workflow-notes.md`

- [ ] **Step 1: Create the client report directory**

Run:

```powershell
New-Item -ItemType Directory -Path 'docs\\client-reports' -Force
```

Expected: PowerShell reports `G:\Game Dev\Indievaders\docs\\client-reports`.

- [ ] **Step 2: Add the client-facing report skeleton**

Use `apply_patch` to create `docs/client-reports/refractured-steam-positioning-readiness.md` with this exact structure:

```markdown
# Refractured Steam Positioning Readiness Report

Date: 2026-06-19
Prepared by: Indievaders report validation pass
Project stage: Pre-Steam, combat-foundation prototype
Evidence mode: Local project review plus public Steam/market research

## Executive Read

## Current Game Snapshot

## Market Lane

## True Comparables

## Production Reality

## Steam And Demo Promise Draft

## Review Risk Map

## Prioritized Next Actions

## Source Appendix
```

- [ ] **Step 3: Add the internal workflow note skeleton**

Use `apply_patch` to create `docs/project-management/refractured-report-workflow-notes.md` with this exact structure:

```markdown
# Refractured Report Workflow Notes

Date: 2026-06-19
Audience: Indievaders product planning

## What Worked

## Method Gaps

## Product Opportunities

## Do Not Build Yet

## Follow-Up Sprint Candidates
```

- [ ] **Step 4: Verify skeleton files exist**

Run:

```powershell
Get-ChildItem -LiteralPath 'docs\\client-reports' -File | Select-Object Name,Length
```

Expected: output includes `refractured-client-report.md` and `refractured-indievaders-workflow-notes.md`.

## Task 2: Validate Local Refractured Facts

**Files:**
- Modify: `docs/client-reports/refractured-steam-positioning-readiness.md`

- [ ] **Step 1: Re-read the local source files**

Run these file reads, one file per command:

```powershell
Get-Content -LiteralPath 'E:\Projekty Gier\Godot\Refractured\README.md'
```

```powershell
Get-Content -LiteralPath 'E:\Projekty Gier\Godot\Refractured\godot_game_project\documentation\CURRENT_PROJECT_STATE.md'
```

```powershell
Get-Content -LiteralPath 'E:\Projekty Gier\Godot\Refractured\godot_game_project\documentation\Technical_Foundation_Handbook.md'
```

```powershell
Get-Content -LiteralPath 'E:\Projekty Gier\Godot\Refractured\godot_game_project\documentation\Asset_Source_Manifest.md'
```

```powershell
Get-Content -LiteralPath 'E:\Projekty Gier\Godot\Refractured\godot_game_project\documentation\Animation_Pipeline_Sandbox.md'
```

```powershell
Get-Content -LiteralPath 'E:\Projekty Gier\Godot\Refractured\docs\superpowers\specs\2026-06-02-combat-foundation-v2-slice-design.md'
```

Expected: each command prints the requested document. If a file is missing, remove claims that depend on it or mark the claim `Inferred` only when another local file supports it.

- [ ] **Step 2: Confirm the active Godot scenes and script inventory**

Run:

```powershell
Get-ChildItem -LiteralPath 'E:\Projekty Gier\Godot\Refractured\godot_game_project\scenes' -Recurse -File | Select-Object FullName
```

Run:

```powershell
Get-ChildItem -LiteralPath 'E:\Projekty Gier\Godot\Refractured\godot_game_project\scripts' -Recurse -File -Filter '*.gd' | Select-Object FullName
```

Expected: scene output includes `combat_lab.tscn`, `animation_lab.tscn`, and `battle_stage_25d.tscn`; script output includes combat/runtime scripts. Use this only to validate the existence of broad systems, not to document private implementation details.

- [ ] **Step 3: Fill `Current Game Snapshot`**

Use `apply_patch` to replace the empty `## Current Game Snapshot` section with concise bullets covering:

- `Confirmed`: active Godot project path and main scenes.
- `Confirmed`: 3D/2.5D combat-first direction.
- `Confirmed`: current playable baseline is small and centered on J/K runtime combat checks, not a full move set.
- `Confirmed`: animation pipeline is a known risk and Reallusion intake is a project contract.
- `Confirmed`: performance is being measured locally, with older PCs and Steam Deck treated as target constraints.
- `Inferred`: the project is stronger as a demo-readiness candidate than as a public Steam-page candidate today.

Do not include raw script internals, private file dumps, or unverified asset claims.

- [ ] **Step 4: Add local sources to `Source Appendix`**

Use `apply_patch` to add a `### Local Sources` subsection with one row per local source:

```markdown
| Label | Source | Evidence Type | Used For |
| --- | --- | --- | --- |
| Confirmed | `README.md` | local_project_doc | active project identity and Godot path |
| Confirmed | `CURRENT_PROJECT_STATE.md` | local_project_doc | direction, scenes, combat baseline, risks |
| Confirmed | `Technical_Foundation_Handbook.md` | local_project_doc | architecture, performance, animation policy |
| Confirmed | `Asset_Source_Manifest.md` | local_project_doc | promoted assets and animation source policy |
| Confirmed | `Animation_Pipeline_Sandbox.md` | local_project_doc | animation intake workflow and promotion rules |
| Confirmed | `2026-06-02-combat-foundation-v2-slice-design.md` | local_project_doc | combat foundation slice intent |
```

## Task 3: Research Public Comparables

**Files:**
- Modify: `docs/client-reports/refractured-steam-positioning-readiness.md`

- [ ] **Step 1: Browse required public sources**

Open or search the web for these pages and collect only facts that are visible from public sources:

```text
https://store.steampowered.com/app/1390410/Midnight_Fight_Express/
https://store.steampowered.com/app/473690/Absolver/
https://store.steampowered.com/app/985890/Streets_of_Rage_4/
https://store.steampowered.com/app/674520/FightN_Rage/
https://en.wikipedia.org/wiki/Sifu_(video_game)
```

Expected: enough public context to support release dates, developer/publisher where visible, tags/features, and why each comparable is useful or unsafe.

- [ ] **Step 2: Add public sources to `Source Appendix`**

Use `apply_patch` to add `### Public Sources` with this structure:

```markdown
| Label | Source | Evidence Type | Used For |
| --- | --- | --- | --- |
| Confirmed | Midnight Fight Express Steam page | steam_store | closer 3D/isometric action-brawler positioning reference |
| Confirmed | Absolver Steam page | steam_store | combat-system depth and scope-complexity reference |
| Confirmed | Streets of Rage 4 Steam page | steam_store | mainstream beat-em-up expectation reference |
| Confirmed | Fight'N Rage Steam page | steam_store | small-team brawler mastery and responsiveness reference |
| Reported | Sifu public background summary | public_database | aspirational combat/readability reference and scope warning |
```

If a better primary source for `Sifu` is available during execution, use it and change the row from `Reported` to the appropriate label.

- [ ] **Step 3: Fill `Market Lane`**

Use `apply_patch` to replace the empty `## Market Lane` section with:

- A concise lane statement: `dark, physical, combat-first 2.5D brawler / action-fighting prototype`.
- A direct warning that Refractured should not sell itself as broad open 3D action yet.
- A first-session fantasy: readable pressure, impact, defensive timing, and controlled camera clarity.
- One paragraph on why pre-Steam analysis is still useful: it can prevent wrong benchmarks, wrong first trailer promise, and premature feature expansion.

- [ ] **Step 4: Fill `True Comparables`**

Use `apply_patch` to add one subsection per comparable with this pattern:

```markdown
### Comparable Name

- Role: safe lesson or unsafe benchmark.
- Why it appears: one or two sentences.
- Safe lesson: one sentence.
- Unsafe assumption: one sentence.
- Evidence: `Confirmed`, `Reported`, or `Inferred`.
```

Required comparables:

- `Sifu`
- `Midnight Fight Express`
- `Absolver`
- `Streets of Rage 4`
- `Fight'N Rage`

## Task 4: Draft Client-Facing Findings

**Files:**
- Modify: `docs/client-reports/refractured-steam-positioning-readiness.md`

- [ ] **Step 1: Fill `Executive Read`**

Use `apply_patch` to replace the empty `## Executive Read` section with:

- A verdict paragraph.
- Three `What this means now` bullets.
- Three `Do next` bullets.
- A short note that Refractured is not ready for public sharing claims yet, but is ready for a focused demo-readiness report.

The executive read must answer this client question: `What could a potential client achieve with Indievaders before their Steam page exists?`

- [ ] **Step 2: Fill `Production Reality`**

Use `apply_patch` to add five risk blocks:

```markdown
### Risk Name

- Current signal:
- Why it matters:
- Mitigation:
- Evidence:
```

Required risks:

- Animation intake and retargeting risk.
- Combat feel proof risk.
- Camera/readability risk.
- Scope/content-depth risk.
- Performance expectation risk.

- [ ] **Step 3: Fill `Steam And Demo Promise Draft`**

Use `apply_patch` to add three clearly labeled draft options:

- Focused brawler promise.
- Combat-readability promise.
- Dark physical action promise.

Each draft must include:

- `Positioning line`
- `Best when`
- `Risk if used too early`

- [ ] **Step 4: Fill `Review Risk Map`**

Use `apply_patch` to add a table:

```markdown
| Risk | Likely Player Reaction | Why It Could Happen | Mitigation | Evidence |
| --- | --- | --- | --- | --- |
```

Required rows:

- Weak first-hit feel.
- Confusing defensive language.
- Camera or enemy readability problems.
- Animation jank visible before combat promise lands.
- Feature promise broader than demo proof.

- [ ] **Step 5: Fill `Prioritized Next Actions`**

Use `apply_patch` to add 5-7 actions ordered by impact. Each action must have:

- Action.
- Why now.
- Evidence.
- Expected output.

At least three actions must be sprint-sized and local to Refractured, such as revalidating the combat baseline, tightening first-minute proof, or writing a one-page Steam promise before building a page.

## Task 5: Write Internal Workflow Notes

**Files:**
- Modify: `docs/project-management/refractured-report-workflow-notes.md`
- Modify: `docs/project-management/decision-log.md`

- [ ] **Step 1: Fill `What Worked`**

Use `apply_patch` to list the useful Indievaders workflow signals:

- Local docs gave enough project state to create a pre-Steam report.
- Evidence labels prevented false certainty.
- Comparable separation made `Sifu` useful without making it a bad forecast benchmark.
- The report can create value before accounts, payments, backend, or sharing.

- [ ] **Step 2: Fill `Method Gaps`**

Use `apply_patch` to list concrete workflow gaps:

- No structured intake schema for local project docs yet.
- No report-claim ledger outside the final Markdown.
- No automated source checker.
- No standard export format for client review.
- No clear privacy boundary copy for local project material beyond current methodology docs.

- [ ] **Step 3: Fill `Product Opportunities` and `Do Not Build Yet`**

Use `apply_patch` to add:

- Product opportunities: project-doc intake checklist, claim ledger, local evidence chips, pre-Steam report template.
- Do not build yet: backend, customer sharing, payment, live Market Watch, public Refractured case study.

- [ ] **Step 4: Add decision-log entry**

Use `apply_patch` to append this decision to `docs/project-management/decision-log.md`:

```markdown
## 2026-06-19 - Review Refractured Privately Before Sharing

The next product-learning step is a private Refractured client-ready report, not public sharing.

Reason:
- The prototype needs proof that its report format creates value on a real early-stage game before distribution features matter.
- Refractured provides a realistic pre-Steam case with local docs, combat prototype constraints, and public comparable needs.

Implications:
- Do not build sharing, auth, payment, or live Market Watch for this sprint.
- Create a client-ready report and internal workflow notes first.
```

## Task 6: Review And Verify The Report

**Files:**
- Modify if needed: `docs/client-reports/refractured-steam-positioning-readiness.md`
- Modify if needed: `docs/project-management/refractured-report-workflow-notes.md`

- [ ] **Step 1: Scan for placeholders and weak wording**

Run:

```powershell
Select-String -Path 'docs\\client-reports\*.md' -Pattern 'TBD|TODO|PLACEHOLDER|\?\?|should probably|seems to|maybe'
```

Expected: no matches. If there are matches, use `apply_patch` to replace them with explicit claims, evidence labels, or removals.

- [ ] **Step 2: Check evidence labels exist**

Run:

```powershell
Select-String -Path 'docs\\client-reports\\refractured-steam-positioning-readiness.md' -Pattern 'Confirmed|Reported|Estimated|Inferred|Not publicly confirmed'
```

Expected: evidence labels appear in the body and source appendix.

- [ ] **Step 3: Check no raw Refractured files were copied**

Run:

```powershell
Get-ChildItem -LiteralPath 'docs\\client-reports' -Recurse -File | Select-Object FullName,Length
```

Expected: the client report HTML and its Markdown editorial source exist in `docs\\client-reports`; workflow notes live under `docs\\project-management`.

- [ ] **Step 4: Check no app source changed**

Run:

```powershell
git status --short
```

Expected: changed files are only docs unless an intentional docs-only plan update is also staged. If files under `src/`, `scripts/`, `package.json`, or `package-lock.json` changed, run `npm run verify` before committing.

- [ ] **Step 5: Commit the report deliverable**

Run:

```powershell
git add docs/client-reports/refractured-steam-positioning-readiness.html docs/client-reports/refractured-steam-positioning-readiness.md docs/project-management/refractured-report-workflow-notes.md docs/project-management/decision-log.md
```

Run:

```powershell
git commit -m "docs: add refractured client report"
```

Expected: one local commit containing the report, workflow notes, and decision-log entry.

## Task 7: Final Handoff

**Files:**
- Read: `docs/client-reports/refractured-steam-positioning-readiness.html`
- Read: `docs/client-reports/refractured-steam-positioning-readiness.md`
- Read: `docs/project-management/refractured-report-workflow-notes.md`

- [ ] **Step 1: Summarize the client-facing result**

Read the report and prepare a short handoff containing:

- The main verdict.
- The top three Refractured actions.
- Any public-source limitations.
- Whether app verification was skipped or run, with reason.

- [ ] **Step 2: Summarize product-learning result**

Read the workflow note and prepare a short handoff containing:

- The strongest Indievaders workflow signal.
- The most important product gap.
- Recommended next sprint direction.

- [ ] **Step 3: Confirm Git state**

Run:

```powershell
git status --branch --short
```

Expected: clean working tree or only explicitly deferred changes.
