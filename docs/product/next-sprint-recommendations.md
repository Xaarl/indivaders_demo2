# Next Sprint Recommendations

## Sprint Goal

Make the public prototype easier to understand and more credible without expanding scope. The sprint should sharpen the path from landing to sample report to early report request, while preserving the hero, interactive sample report, and workspace direction.

## Priority 1: Align Product Ladder And Routes

Problem:

The product currently mixes "sample reports", "sample brief", "sample report", and old preview route language.

Engineering work:

- Update public copy to consistently use:
  - "Interactive sample report"
  - "Sample brief" only for email lead capture
  - "$49 early Steam Positioning Report"
  - "Private project workspace"
  - "Market Watch"
- Keep `docs/qa-checklist.md` aligned with `#sample-report` and `#order-report`.
- Keep obsolete preview-route language out of public docs and UI.

Acceptance criteria:

- No public UI asks the user to reconcile sample brief versus sample report.
- The primary landing CTA path reaches `#sample-report`.
- QA checklist matches actual routes.
- `npm run verify` passes.

## Priority 2: Strengthen The First Aha In The Interactive Sample Report

Problem:

The report is strong, but the first screen should make the value unmistakable faster.

Engineering/content work:

- Add a sharper above-the-fold "wrong benchmark caught" moment.
- Make the top 3 next actions visibly tied to specific risks or evidence.
- Add small evidence labels to verdict/source buttons without clutter.
- Consider changing "Decision workspace" wording if it reads like product meta-copy rather than user value.

Acceptance criteria:

- First report screen communicates: "This helps me avoid a bad positioning decision."
- At least one verdict shows a clear safe lesson and unsafe assumption.
- Source access remains one click away.
- No new wall of text.

## Priority 3: Make Case Cards Deliver Value Before Click-Through

Problem:

The real-game traps are good, but the landing should reveal the lesson immediately.

Design/content work:

- Give each case card one compact "looks like / actually" contrast.
- Keep images and titles prominent.
- Make the active lesson panel feel like a decision note, not a modal essay.

Acceptance criteria:

- A user can scan the three cases and understand three different trap types.
- TMNT is never framed as a direct small-team benchmark.
- Balatro is not used as a normal forecast.
- Dave the Diver is clearly about production reality.

## Priority 4: Clarify Workspace Preview Status

Problem:

The local workspace is useful for product direction, but it is not yet a real paid customer workspace.

Engineering/content work:

- Label the generated workspace as a local preview when no backend exists.
- Keep "private workspace" as the long-term concept, but avoid implying durable access.
- Add a clear "what will happen in the real paid version" note after intake.

Acceptance criteria:

- Users understand the current workspace exists only in their browser.
- The paid product promise remains the report, not a fully launched SaaS.
- Market Watch is marked future and not live.

## Priority 5: Evidence UX Consistency

Problem:

Evidence labels exist in data but are not equally visible across surfaces.

Engineering/content work:

- Add label/type display to case evidence chips or panel source rows.
- Add evidence-label definitions in the report source section only, not everywhere.
- Ensure every major action/verdict can open the source log.

Acceptance criteria:

- Users can tell confirmed facts from inferred recommendations.
- There is one source of evidence definitions.
- No repeated disclaimer blocks.

## Priority 6: Visual System Below The Hero

Problem:

The hero has a memorable game-like identity; lower sections need a clearer bridge into work-grade decision UI.

Design work:

- Keep hero expressive.
- Make report/case/workspace surfaces feel like decision tools.
- Use consistent evidence chips, action cards, source panels, and section hierarchy.
- Avoid decorative elements that compete with report logic.

Acceptance criteria:

- Landing, sample report, and workspace feel related but not visually identical.
- Important decisions and CTAs outrank ornament.
- No section explains the design itself.

## Priority 7: Do Not Build Yet

Delay these until the product ladder is clean and the first paid report flow works:

- Subscription billing.
- AI copilot.
- Creator CRM.
- Raw database explorer.
- Multi-project dashboards.
- Live Steam scraping UI.
- Revenue estimate headline features.
