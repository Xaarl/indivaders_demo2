# Product Stages Roadmap

## Stage 0: Current Prototype

Status: exists locally.

What exists:

- Public landing page.
- Interactive invader/black-hole hero.
- Real-game case teasers.
- Interactive sample report at `#sample-report`.
- Early report intake at `#order-report`.
- Local-only workspace preview at `#workspace/<id>`.
- Data verification scripts for report, UI copy, and workspace model.

What is not real yet:

- Backend persistence.
- Payment.
- Customer-specific report generation.
- Email delivery.
- Authentication.
- Live market refresh.
- Subscription.

Stage 0 should be treated as a strong prototype, not a finished product.

## Stage 1: Public Funnel And Proof Tightening

Goal: make a visitor understand the product ladder quickly and feel the first "aha" before being asked to order.

Build:

- Align public terminology: sample report, sample brief, paid report, workspace, market watch.
- Keep QA/doc route references aligned with the current app.
- Make the interactive sample report the primary proof CTA.
- Add clearer evidence-label treatment where claims appear.
- Strengthen the first-screen sample-report verdicts around false comparables and next actions.
- Make case cards deliver a small aha before click-through.

Exit criteria:

- A new visitor can explain within 30 seconds: "This helps me avoid wrong Steam positioning decisions."
- The page has one clear primary path: landing to sample report to early report intake.
- No public surface implies live backend, payment, or monitoring exists.
- `npm run verify` passes.

## Stage 2: Sellable Early Report

Goal: sell and manually/semiautomatically deliver the first paid reports without pretending to be a mature SaaS.

Build:

- A production-safe intake path.
- Payment or payment-request handoff.
- Internal report production checklist.
- Customer-specific report data model.
- Deliverable format based on the interactive sample report.
- Source appendix and evidence labels.
- Basic private delivery, even if accountless at first.

Exit criteria:

- A customer can request, pay for, and receive one project-specific report.
- The delivered report contains no sample data.
- Every major claim has a source, label, or explicit inference.
- Unknown production/budget/sales facts are marked instead of guessed.
- The report produces at least 3 concrete next actions.

## Stage 3: Private Project Workspace

Goal: turn a delivered report into a workspace customers can revisit.

Build:

- Real persistence for one project.
- Auth or secure magic-link access.
- Saved comparables.
- Action status.
- Source log.
- Report versioning.
- Export/share controls if needed.

Exit criteria:

- A customer can return to the same workspace from another browser/device.
- The workspace clearly distinguishes report facts, inferred recommendations, and user-added notes.
- The workspace is useful even without market monitoring.

## Stage 4: Market Watch Beta

Goal: validate refreshable intelligence for one game before charging subscription fees.

Build:

- Tracked comparable list.
- Refresh runs with dated summaries.
- Changed signal types: price, discount, tags, demo/release status, review themes, page messaging.
- Evidence-labeled change log.
- Recommendation delta: "what changed since the last report?"

Exit criteria:

- Refreshes produce decision-relevant changes, not just raw updates.
- Customers can tell which changes are confirmed versus inferred.
- At least one repeat-use workflow is clear: Steam page update, demo prep, Next Fest prep, launch check, post-launch adjustment.

## Stage 5: Subscription Intelligence Layer

Goal: charge for ongoing market intelligence after retention is proven.

Build only after Stage 4 shows demand:

- Subscription billing.
- Monitoring cadence controls.
- Multi-refresh history.
- Alert preferences.
- Multi-project support only if users ask for it.

Exit criteria:

- Users return because the product changes decisions over time.
- Refresh quality is trusted.
- The product still feels like a focused positioning workspace, not a generic analytics dashboard.

## Cut, Merge, Delay, Rework

Cut now:

- Any public copy that sells "database access."
- Any UI that implies live monitoring is already available.
- Repeated disclaimers on every claim.

Merge:

- "Sample reports" and "interactive sample report" into one primary proof concept.
- "Free sample brief" into lead capture, not a competing product surface.

Delay:

- AI copilot.
- Creator CRM.
- Multi-project publisher dashboard.
- Revenue/sales estimates as a headline promise.

Rework:

- QA checklist route references when routes change.
- Evidence display in case cards and report drawer.
- Workspace language around local-only preview.
