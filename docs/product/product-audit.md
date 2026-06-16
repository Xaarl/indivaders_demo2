# Product Audit

Audited on 2026-06-16 against the current Vite/React prototype in `G:\Game Dev\Indievaders`.

## Current Implementation Snapshot

Indievaders is a static Vite React app with hash-based routing in `src/App.jsx`.

Current routes:

- `#` or empty hash: public landing page.
- `#sample-report`: interactive sample report.
- `#order-report`: early report intake.
- `#workspace/<id>`: local-only private workspace preview stored in browser `localStorage`.

Core implementation:

- Landing: `src/components/LandingPage.jsx`, `Hero.jsx`, `CaseTeasers.jsx`, `ReportDeliverables.jsx`, `OfferSection.jsx`.
- Product copy: `src/content/productCopy.js`, `src/content/ctaCopy.js`.
- Report data/schema: `src/data/interactiveSampleReport.js`, `src/data/reportSchema.js`, `src/data/caseStudies.js`.
- Interactive report: `src/components/interactive-report/*`.
- Intake/workspace: `src/components/report-workspace/*`, `src/lib/reportRequestStore.js`.
- Verification: `scripts/verify-report-data.mjs`, `scripts/verify-ui-copy.mjs`, `scripts/verify-workspace-model.mjs`.

`npm run verify` passed on 2026-06-16. It ran report-data checks, UI-copy checks, workspace-model checks, ESLint, and production build.

## What Is Strong

The hero direction is worth preserving. The arcade/invader/black-hole interaction gives the product a memorable metaphor: noisy market signals become clearer launch signals. It is not generic SaaS decoration.

The real-game case files are directionally right. TMNT as a licensed benchmark trap, Balatro as an outlier-pattern warning, and Dave the Diver as a production-reality warning give the product a useful point of view.

The interactive sample report is the strongest proof surface. It shows decisions, not a wall of text: comparables, unsafe assumptions, review-risk actions, price/scope bands, creator angles, next actions, and sources.

The evidence model already exists in code. `reportSchema.js` defines labels and evidence types, and report data uses source IDs. This is a major credibility advantage if the UI applies it consistently.

The workspace prototype points at the right long-term product. It frames the report as a private workspace with saved comparables, action state, source log, and future market watch.

## Main Product Problems

The product ladder was blurry before cleanup: sample brief, interactive sample report, paid report, private workspace, and Market Watch needed clearer separation. The current sprint should keep that hierarchy explicit.

The QA checklist now checks `#sample-report` and `#order-report`, which match the current app routes. Obsolete preview-route language has been removed from active user-facing docs.

The landing page sells two proof modes at once. It has case teasers, a free sample brief form, and an interactive sample report. Those can coexist, but the current hierarchy should be: interactive sample report as the proof, email sample as the lead capture, paid report as the purchase.

The case cards are promising but can become too teaser-like. The "aha" should happen before the visitor clicks away: "This game looks comparable, but the report tells me why using it as a benchmark would hurt me."

Evidence is present but not always visible at the right moment. Case evidence chips show source names but not the evidence label/type. The source drawer shows labels but does not teach the evidence model as clearly as it could. The trust model should be visible on demand, not repeated everywhere.

The workspace is local-only and seeded from sample data. That is acceptable for a prototype, but it must be named as a preview until a backend, account model, project-specific report generation, and persistence exist.

Market Watch is correctly marked as future in the data model, but the action "Preview refresh" can still feel more functional than it is. It should show the future shape without implying live monitoring.

Visual coherence below the hero needs a stronger system. The hero has a distinct arcade identity, while the report and workspace are more work-grade. The product needs a deliberate bridge: playful signal capture at the top, disciplined decision workspace below.

## Positioning Audit

The strongest positioning is:

> Steam positioning for indie teams before they polish the wrong demo.

This is sharper than "market research dashboard" because it names the customer, surface, timing, and consequence.

The first sellable product should stay narrow:

> $49 early Steam Positioning Report.

Avoid expanding the first offer into generic analytics, raw database access, full market monitoring, creator CRM, or AI copilot. Those may become modules later, but they dilute the current sale.

## Code And Content Risks

- All files are currently untracked in git. That is not a product flaw, but it increases coordination risk.
- The old sample brief preview component and data were removed after import checks. The active proof surface is the interactive sample report.
- Existing docs in `docs/product-offer.md` and `docs/report-methodology.md` are useful but now need to defer to the more complete `docs/product` source-of-truth set.
- Public copy should avoid internal method labels such as raw "Competitors" or "Review Audit"; the validator already guards several forbidden phrases.

## Product Decision

Do not reset the prototype. Improve it by tightening hierarchy:

1. Landing explains the offer and points to proof.
2. Interactive sample report creates the "I see the value" moment.
3. Intake collects the minimum project context.
4. Paid report delivers project-specific decisions.
5. Private workspace holds the report, actions, comparables, and sources.
6. Market Watch later gives customers a reason to return.
