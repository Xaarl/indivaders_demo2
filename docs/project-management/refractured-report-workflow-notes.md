# Refractured Report Workflow Notes

Date: 2026-06-19
Audience: Indievaders product planning

## 2026-06-20 Direction Correction

The report should be treated as a client-facing commercial strategy artifact,
not a defensive demo-readiness memo.

What changed:

- This first correction introduced the commercial positioning frame. It was
  superseded later the same day by the more precise roguelite market-fit frame.
- The main question is now: how can the project become sellable, fundable, and
  market-testable before a long production bet is locked?
- Competitor games are used as expectation maps and borrowable strategy
  references, not as a list of reasons to avoid ambition.
- Risk language should describe the requirements for each ambition level rather
  than telling the client what not to do.
- The default recommendation is Path A first: build a focused premium combat
  thesis and a demo/wishlist proof loop, while keeping the option to graduate
  toward a content-forward brawler or deep combat-system title if player and
  funding signals justify it.

## What Worked

- Local docs gave enough project state to create a pre-Steam report.
- Evidence labels prevented false certainty.
- Comparable separation made `Sifu` useful without making it a bad forecast benchmark.
- The report can create value before accounts, payments, backend, or sharing.
- A real client-style HTML report is a better proof artifact than a Markdown
  wall of text.

## Method Gaps

- No structured intake schema for local project docs yet.
- No report-claim ledger outside the final Markdown.
- No automated source checker.
- No standard export format for client review.
- No clear privacy boundary copy for local project material beyond current methodology docs.

## Product Opportunities

- Project-doc intake checklist to make local source review repeatable.
- Commercial-positioning intake questions: target buyer fantasy, desired
  production ambition, monetization model, public proof assets, funding path,
  and acceptable scope risk.
- Claim ledger to separate evidence review from final prose.
- Local evidence chips to show confidence without overstating certainty.
- Client report template with visible strategic paths, monetization guidance,
  market-gap framing, and short/mid/long roadmap.

## Do Not Build Yet

- Backend.
- Customer sharing.
- Payment.
- Live Market Watch.
- Public Refractured case study.

## Follow-Up Sprint Candidates

- Commercial positioning report template with required evidence labels.
- Claim/source ledger before final prose.
- Local project intake checklist.
- Privacy boundary copy for local project material.
- In-product report view that avoids Markdown-style wall-of-text delivery.

## 2026-06-20 Roguelite Premise Correction

The commercial report needed a second correction after user review: Refractured
is not merely a brawler that could later add roguelite systems. Local
Refractured docs already frame it as a combat-first action roguelite with a
nightmare/ritual loop.

What changed:

- The visible report title is now `Refractured 2.5D Roguelite Market-Fit Report`.
- The core recommendation is now a focused solo-first rogue-em-up proof path:
  one excellent fight, then a handcrafted 3-room micro-run with ritual choices.
- The player profile is explicit: skill-first roguelite brawler players reward
  contact feel, fair pressure, fast retry, role-based enemy variety, and
  behavior-changing builds.
- The market section now treats beat 'em up as a smaller loyal niche and
  roguelite as a larger but more crowded discovery lane.
- Review mining now includes Steam store/review aggregate signals and a small
  Steam review API sample for Absolum, Rotwood, Ravenswatch, Curse of the Dead
  Gods, and Dead Cells.
- The report includes a bonus market radar for current Steam roguelite and demo
  discovery signals.
- Direct Reddit access was blocked during this pass, so Reddit/social listening
  is recorded as a gap instead of claimed as completed.

Method lesson:

Indievaders needs a premise-confidence gate before writing strategy. Minimum
fields:

- confirmed intended genre loop;
- player fantasy;
- run/content/progression loop;
- commercial platform assumption;
- evidence confidence;
- unresolved premise questions.

If local docs and market assumptions disagree, the local premise wins until the
report explicitly asks the client to confirm or change it.

## 2026-06-20 Client-Grade Artifact v2

The next correction moved the Refractured output from a static client report to
a Data Analytics report artifact with a repo-tracked mirror.

What changed:

- The primary client experience is now the Data Analytics artifact:
  `Refractured 2.5D Roguelite Market-Fit Report v2`.
- The repo mirror now includes:
  - `docs/client-reports/refractured-report-v2-artifact.json`;
  - `docs/client-reports/refractured-steam-positioning-readiness.html`;
  - `docs/client-reports/refractured-steam-positioning-readiness.md`.
- The now-archived report was structured around decision support instead of
  prose, with verdict, player, roguelite, comparable, review-theme, decision,
  KPI, Steam funnel, roadmap, and evidence-ledger sections.
- The north star is now `Qualified Wishlist Intent from Playable Proof`.
- Path A/B/C is no longer an arbitrary recommendation:
  - Path A is the first market test;
  - Path B is earned by demand for routes, enemies, content, and co-op;
  - Path C is earned by evidence that combat mastery itself drives return play
    and by funding that supports the burden.
- Steam review API sampling was attempted but unavailable in the local Windows
  TLS environment, so the report uses public store aggregates and marks API
  sampling as an evidence gap.
- Logged-in Reddit, Discord, creator comments, and broader social listening are
  explicit evidence gaps for the next research pass.

Method lesson:

Future premium reports should be artifact-first, not Markdown-first. The durable
repo mirror is still required, but the client-facing product should start from a
bounded dataset, source list, KPI framework, chart/table blocks, and evidence
ledger. Static HTML and Markdown are backups, not the main reading experience.

Template requirements for the next report:

- Every major claim needs `confirmed`, `reported`, `estimated`, `inferred`, or
  `not publicly confirmed`.
- Every strategy recommendation needs a decision gate and a measurable signal.
- Every competitor reference should explain what to borrow, what to avoid, and
  why it matters for the target player.
- Pricing, wishlist, and revenue language must remain hypothetical until real
  traffic or telemetry exists.
- No backend, customer sharing, accounts, payment, or live Market Watch is
  required for this validation stage.

## 2026-06-20 Premium Interactive Report Correction

The v2 artifact-first pass preserved evidence, but it failed as a paid client experience because the visible report looked like a generated deep-research document. V3 changes the product direction:

- one primary interactive route: `#client-report/refractured`;
- static HTML, Markdown, and JSON become backup/archive surfaces;
- evidence remains one click away, but it no longer dominates the reading path;
- the report is organized around decisions, player psychology, roguelite proof, Steam positioning, comparables, and action planning;
- tables and long ledgers belong in appendix states, not above the fold.

Method lesson:

Premium report value comes from guided judgment and productized interaction, not from presenting every source and matrix in the primary view.

## 2026-06-21 V4 Market Intelligence Workspace

The V4 pass changed the Refractured route from an AI-report reading surface into
a market intelligence workspace. The active structure is now Facts / Estimates /
Interpretation / Actions across the report modules, with contextual evidence
available when the reader needs to inspect a source.

What changed:

- `Market Map` and `Comparable Explorer` lead with the board/workspace view
  instead of a full evidence layer stack.
- `Audience Signals`, `Review Community Themes`, `Steam Positioning Builder`,
  `Roguelite Loop Lab`, and `Action Plan Timeline` now separate confirmed or
  reported facts, estimates or missing evidence, interpretation, and actions.
- `Evidence Ledger` remains available as a filterable proof/caveat/gap surface,
  but empty contextual evidence requests show an empty state instead of opening
  the full ledger.
- Comparable cards use Steam-facing images, tags, public store signals,
  third-party estimate caveats, and decision relevance.
- Review/community listening is represented as a review radar with sourced Steam
  signals and clearly marked gaps for Reddit, Discord, creator, and broader
  social listening.
- Standard verification now includes the V4 component smoke verifier after the
  data-shape verifier, covering empty evidence refs, board-first market modules,
  unique layer ids, contextual evidence labels, and the review radar surface.

QA status:

- Headless Chrome screenshots were created for desktop and mobile review.
- The desktop cockpit looked good in the screenshot pass.
- Mobile navigation was changed to non-sticky after review so it does not crowd
  the workspace while scrolling.
- Full manual browser interaction is still pending.

Method lesson:

A premium Indievaders report should behave like a workspace for market judgment:
inspect facts, understand estimates, read interpretation, and choose actions.
Interactive controls should make those layers easier to use, not just paginate a
report.

Delivery lesson:

The local `file://dist` launcher is only a fallback. For browser review, use the
Vite dev server URL such as `http://127.0.0.1:5176/#client-report/refractured`
so the React route and assets load consistently.

## 2026-06-21 V6 Decision Workspace Correction

The V5 workspace pass is not sufficient for a paid product. It made the report
interactive, but user review showed the experience still looked like a dense
debug panel or AI-generated research dashboard.

What changes next:

- Treat V5 as a rejected product direction, not as a surface to polish.
- Rebuild the first screen as a decision workspace:
  - short commercial verdict;
  - central Market Lane Canvas;
  - contextual inspector;
  - compact Commercial Proof Path.
- Remove the permanent evidence rail from the primary reading experience.
- Replace raw source clicks with an evidence reader that explains source,
  extracted fields, limits, and confidence before exposing any raw endpoint.
- Replace `Roguelite Loop Lab` card piles with a loop diagram:
  `fight -> reward -> mutation -> retry -> intent`.
- Replace `Action Plan` card lists with proof gates that unlock ambition when
  evidence appears.

Method lesson:

Premium report UX starts from one clear first-screen job. For Refractured, that
job is: show where the game can compete on Steam and what proof must come next.
Every module then expands one decision, instead of showing all evidence and all
interpretation at once.

Tooling lesson:

Do not use paid or credit-consuming design generation above 100 credits without
explicit user approval. Use local/built-in image generation for low-cost concept
work, and prefer written design specs before any further visual generation.
