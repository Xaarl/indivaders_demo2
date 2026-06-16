# Information Architecture

## IA Principle

Every surface should answer one question and move the user one step forward. The product should not ask users to understand the business model before they understand the value.

## Recommended Route Model

Current implementation:

- `#`: landing.
- `#sample-report`: interactive sample report.
- `#order-report`: early report intake.
- `#workspace/<id>`: local-only workspace preview.

Recommended public language:

- Landing: "Indievaders"
- Proof route: "Interactive sample report"
- Conversion route: "Early report request"
- Private route: "Project workspace"
- Future module: "Market Watch"

The old sample-brief preview route is not part of the current IA. Keep the public proof path focused on `#sample-report`.

## Landing IA

Landing purpose: answer "Is this for my Steam positioning problem?"

Required order:

1. Hero: promise, not methodology.
2. Trust strip: timing and audience.
3. Real-game traps: show why naive references mislead.
4. Report decisions: what the paid report helps decide.
5. Conversion band: sample report first, early report second.
6. Footer: sample report, report details, early report.

Primary action: open interactive sample report.

Secondary action: request email sample or early report.

Avoid:

- Long method explanations.
- Raw data screenshots.
- Product-roadmap copy.
- "How the UI works" copy.

## Interactive Sample Report IA

Sample report purpose: answer "Can this catch mistakes I would miss?"

Sections:

1. Overview: verdicts and top actions.
2. Comparables: safe lessons versus unsafe assumptions.
3. Production reality: visual similarity versus resource similarity.
4. Review risks: player signal to design meaning to action.
5. Price and scope: price bands as expectation checks.
6. Next actions: what changes before public traffic.
7. Sources: evidence log.

Primary action after reading: order early report.

The sample report should not require the user to read every section. The first screen should already show value.

## Early Report Flow IA

Early report purpose: answer "Can I request this for my game?"

Collect only what the report needs:

- Project title.
- Contact email.
- Short game description.
- Current stage.
- Steam URL if available.
- Reference games.
- Main concerns.
- Specific question or note.

Do not ask for:

- Full analytics access.
- Private revenue numbers.
- Full production budget.
- Account creation before value is proven.

The confirmation should state what happens next without promising instant generation unless the backend truly exists.

## Private Workspace IA

Workspace purpose: answer "Where do I act on this report?"

Tabs:

- Profile.
- Snapshot.
- Comparables.
- Review risks.
- Actions.
- Sources.
- Market Watch.

Current workspace state should be named as a preview until backend persistence exists.

Workspace hierarchy:

1. Project title and current status.
2. Current proof/report artifact.
3. Action progress.
4. Comparables and risks.
5. Source log.
6. Future refresh history.

## Future Market Watch IA

Market Watch purpose: answer "What changed since the report?"

Do not show it as a raw dashboard. Show refresh runs:

- Date.
- Changed signal.
- Evidence label.
- Why it matters.
- Suggested reconsideration.

First useful monitoring modules:

- Tracked comparable movement.
- New comparable candidates.
- Price/discount changes.
- Tag/page-message changes.
- Review-theme changes.
- Demo/event timing changes.

## Copy Hierarchy

Use these stable names:

- "Interactive sample report" for the public proof.
- "Sample brief" only for the email lead magnet.
- "$49 early Steam Positioning Report" for the first paid product.
- "Private project workspace" for the post-report surface.
- "Market Watch" for the future refresh layer.

Do not make the user reconcile multiple names for the same step.
