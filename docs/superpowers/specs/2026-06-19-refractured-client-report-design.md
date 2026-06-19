# Refractured Client Report Dogfood Design

Date: 2026-06-19
Status: Approved for implementation planning

## Decision

Create a client-facing dogfood report for Refractured before building more sharing, account, backend, or public distribution features in Indievaders.

The report should show what an early-stage game team could gain from Indievaders before a Steam page exists. It must combine local project evidence from the Refractured Godot workspace with public Steam and market context, while preserving uncertainty labels for anything not directly confirmed.

## Goals

- Produce one polished report artifact that reads like a paid Indievaders deliverable.
- Evaluate both the market promise and the production reality of Refractured.
- Demonstrate how Indievaders handles pre-Steam projects with local source material.
- Identify next actions that help Refractured move toward a stronger demo and eventual Steam positioning.
- Surface product gaps in Indievaders report methodology without changing the app yet.

## Non-Goals

- Do not add backend, auth, payments, customer sharing, or live Market Watch.
- Do not modify the public Indievaders UI during this pass.
- Do not copy raw Refractured assets, source files, or generated Godot data into this repository.
- Do not treat public sales, budget, team size, or marketing spend as known unless a reliable public source supports them.
- Do not make a final Steam page, trailer script, press kit, or marketing launch plan.

## Inputs

Local Refractured inputs are read-only observations from the owner-provided Godot workspace:

- `README.md`
- `CURRENT_PROJECT_STATE.md`
- `Technical_Foundation_Handbook.md`
- `Asset_Source_Manifest.md`
- `Animation_Pipeline_Sandbox.md`
- combat foundation slice design notes
- active scene and script inventory when needed for claim validation

Public inputs start with Steam and official/public pages for comparable games:

- `Sifu`: aspirational readability and combat mastery reference, unsafe as a direct production benchmark.
- `Midnight Fight Express`: closer action-brawler positioning reference, especially for mo-cap, violent impact, mission structure, and solo-player promise.
- `Absolver`: combat-system depth reference and warning about scope complexity.
- `Streets of Rage 4`: mainstream beat-em-up language and player expectation reference.
- `Fight'N Rage`: small-team brawler reference for mastery, responsiveness, parry, and arcade-session framing.

Additional public sources may be added only when they clarify a report claim. Each new source must be listed in the source appendix.

## Evidence Model

Use the existing Indievaders labels:

- `Confirmed`: visible in a primary source such as local project docs, Steam, official site, press kit, or publisher page.
- `Reported`: stated by a developer, publisher, interview, article, talk, or other public account.
- `Estimated`: provided by a third-party estimator or calculated from public signals with uncertainty preserved.
- `Inferred`: reasoned from multiple public signals or from local project structure.
- `Not publicly confirmed`: unavailable in reliable public sources.

Every recommendation must be tied to at least one evidence label. Unknown budget, sales, wishlist, team-size, and marketing-spend data must stay unknown instead of being guessed.

## Report Shape

The dogfood report should be written as a client-facing Markdown artifact in `docs/dogfood/refractured-client-report.md`.

Recommended sections:

1. `Executive Read`
   - One-page verdict separating market promise from production reality.
   - Clear answer to: "What could a potential client learn before Steam?"

2. `Current Game Snapshot`
   - What Refractured currently appears to have: combat lab, 2.5D battle stage, attack data, animation pipeline, local performance snapshot, and known constraints.
   - No hype beyond what local evidence supports.

3. `Market Lane`
   - Likely genre and audience lane before Steam.
   - The first-session fantasy Refractured should prove before broader marketing claims.

4. `True Comparables`
   - Separate aspirational references from usable benchmarks.
   - Explain why `Sifu` is useful for readability lessons but unsafe for scope.
   - Use smaller or more structurally relevant comparables for scope, messaging, and demo expectations.

5. `Production Reality`
   - Animation intake risk.
   - Combat feel risk.
   - Camera/readability risk.
   - Scope and content-depth risk.
   - Older-PC/Steam Deck performance expectation.

6. `Steam And Demo Promise Draft`
   - Two or three possible early positioning statements.
   - Mark them as drafts, not final marketing copy.

7. `Review Risk Map`
   - Likely negative-review triggers if the project reaches public demo traffic too early.
   - Link each risk to a concrete mitigation.

8. `Prioritized Next Actions`
   - Small, sprint-sized actions for Refractured.
   - Ordered by impact on Steam/demo readiness.

9. `Source Appendix`
   - Local source list.
   - Public source list.
   - Claim labels and retrieval date.

## Data Flow

1. Read local Refractured docs and source inventory.
2. Extract only report-relevant facts into notes.
3. Browse public Steam and official/public pages for comparables.
4. Build a comparable matrix with role, safe lesson, unsafe assumption, and evidence labels.
5. Convert findings into report sections.
6. Run a self-review for unsupported claims, hidden guesses, and unclear recommendations.
7. Record Indievaders product learnings separately from the client-facing report.

## Error Handling

- If a local project claim cannot be validated from docs or file inventory, mark it `Inferred` or remove it.
- If a public fact is behind an age gate or cannot be read directly, use another reliable source and label it accordingly.
- If public sales, budget, team, or marketing data is unavailable, write `Not publicly confirmed`.
- If a comparable is inspiring but unsafe as a benchmark, keep it in the report and explicitly state the unsafe assumption.
- If the report discovers that Refractured is not ready for public Steam positioning, say so and convert the output into a demo-readiness plan.

## Quality Bar

- The report should feel like a useful paid deliverable, not an internal audit.
- The first page must answer what the team should do next.
- The recommendations must be actionable for a pre-Steam project.
- The source appendix must make the report defensible.
- The tone should be direct, calm, and business-readable.
- The report must not overstate what Indievaders knows.

## Verification

Before treating the report as ready for review:

- Check every public source link opens.
- Check every strong claim has an evidence label.
- Check every recommendation maps to a Refractured-specific action.
- Check the report does not imply backend persistence, live data, or production automation.
- Check no raw private assets or sensitive local-only files were copied into Indievaders.
- Run the normal Indievaders verification only if app source, scripts, or package files change.

## Expected Follow-Up

After this spec is reviewed, create an implementation plan for the report-writing pass. The first implementation pass should create the dogfood report and a short internal note listing what the report exposed about Indievaders' future report workflow.
