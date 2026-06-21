# Decision Log

Date created: 2026-06-16

Use this file for durable product and delivery decisions. Keep entries short and link to source docs when needed.

## Format

```text
Date:
Decision:
Context:
Options considered:
Chosen because:
Implications:
Owner:
Review date:
```

## Decisions

### 2026-06-16: Keep Indievaders As A Standalone Product Repository

Decision:

Indievaders work happens only under `G:\Game Dev\Indievaders`.

Context:

The product previously grew out of a mixed workspace. The repository now has its own source, docs, assets, scripts, and build flow.

Chosen because:

A single root removes accidental coupling, keeps PM/design handoff clear, and gives engineering a clean baseline.

Implications:

- External material must be inventoried before it is migrated.
- Generated output and local data stay ignored.
- Product, design, research, repository, and PM docs each have dedicated folders.

Owner:

Repository owner.

Review date:

After the first collaborative sprint.

### 2026-06-16: Do Not Add A Backend Yet

Decision:

Keep the current Vite React app as the active implementation. Do not create `services/api/` until persistence, auth, payment, customer-specific generation, or Market Watch refreshes become real requirements.

Context:

The current product is a prototype with landing, interactive sample report, early report intake, and local-only workspace preview.

Chosen because:

Adding backend structure before a real backend responsibility exists would create false maturity and extra maintenance.

Implications:

- Browser `localStorage` remains acceptable only for prototype workspace previews.
- Paid report delivery and private customer data require a backend decision before implementation.
- PM should not scope subscription or Market Watch work into Sprint 001.

Owner:

Engineering lead.

Review date:

Before building payment, account, report-generation, or market-refresh features.

### 2026-06-16: Use The Interactive Sample Report As The Primary Proof Surface

Decision:

The primary proof route is `#sample-report`. The old sample-brief preview route and component are removed from active source.

Context:

The product ladder is landing -> interactive sample report -> early report request -> paid report -> private workspace -> future Market Watch.

Chosen because:

The interactive sample report better demonstrates the product than a static brief preview.

Implications:

- Public CTAs should point to `#sample-report` first.
- The email sample brief remains a lead magnet concept, not the primary proof surface.
- QA should test `#sample-report` and `#order-report`.

Owner:

PM and engineering lead.

Review date:

After evaluating visitor behavior on the prototype.

### 2026-06-17: Keep Codex Continuity Outside Chat Memory

Decision:

Pin and clearly name the main Indievaders Codex thread, and record sprint-critical decisions in this decision log instead of relying on chat history alone.

Context:

Recent Codex threads appeared easy to lose track of from the app sidebar. The repository itself is healthy, but conversation history should not be the only durable handoff surface.

Chosen because:

Pinned/named threads help navigation, while repo-tracked decisions survive app state, thread filtering, and local UI confusion.

Implications:

- The active thread is named `Indievaders Prototype Hardening` and pinned.
- Sprint decisions that affect scope, product ladder, persistence, or handoff should be summarized here.
- Chat remains useful for collaboration, but docs remain the source of truth.

Owner:

Repository owner.

Review date:

After the next sprint handoff.

### 2026-06-18: Use GitHub Backup Before Share-Ready Sprint

Decision:

Use `https://github.com/Xaarl/Indievaders.git` as the remote backup for Indievaders work, and keep Sprint 003 focused on share-ready prototype polish rather than backend expansion.

Context:

Sprint 002 hardening was committed locally and pushed to `origin/codex/sprint-002-visual-focus`. The prototype now has a coherent main path, but it still needs reviewer-facing handoff and final mobile/share QA before it is useful outside the working thread.

Chosen because:

Remote backup protects the current state from local or Codex thread loss, while a share-ready sprint gives the project a useful external review checkpoint before introducing backend, auth, payment, or live Market Watch responsibilities.

Implications:

- Push meaningful sprint commits to GitHub before handoff.
- Sprint 003 should improve review readiness, QA docs, mobile polish, and handoff clarity.
- Backend persistence, payment, auth, customer-specific generation, and live monitoring remain out of scope.

Owner:

Repository owner.

Review date:

After Sprint 003 share-ready handoff.

### 2026-06-19: Review Refractured Privately Before Sharing

Decision:

The next product-learning step is a private Refractured client-ready report, not public sharing.

Context:

The previous share-ready sprint plan was useful, but Refractured gives Indievaders a stronger immediate test: a real pre-Steam game with local project docs, combat prototype constraints, and public comparable needs.

Chosen because:

The prototype needs proof that its report format creates value on a real early-stage game before distribution features matter.

Implications:

- Do not build sharing, auth, payment, or live Market Watch for this sprint.
- Use the client-ready report and internal workflow notes as the next proof point.
- Treat Refractured as a private validation case, not a public case study.

Owner:

Repository owner.

Review date:

After the Refractured client-ready report and workflow notes are reviewed.

### 2026-06-20: Reframe Refractured Report Around Commercial Positioning

Decision:

The Refractured report should be a commercial positioning and monetization
readiness artifact, not a defensive demo-readiness or scope-control memo.

Context:

The first client-ready HTML report was stronger than the Markdown draft, but it
still over-indexed on what Refractured should not promise yet. That made the
output feel demotivating and less useful for the core Indievaders value
proposition: helping indie developers understand whether their idea can become
sellable before they spend years building the wrong game.

Chosen because:

A paid client report should help a team see the project's market lane, buyer
fantasy, monetization options, niche gaps, creative tradeoffs, and short/mid/long
commercial plan. Competitor references should identify useful player
expectations and borrowable strategy, not only unsafe scope.

Implications:

- Refractured remains a private validation case.
- Future report templates should lead with commercial verdict, audience,
  market gap, strategic paths, monetization model, and roadmap.
- Risk language should be framed as requirements for the chosen ambition level.
- Public UI and client artifacts stay in English.
- Backend, sharing, payment, auth, and live Market Watch remain out of scope
  for this report sprint.

Owner:

Repository owner.

Review date:

After the rewritten Refractured commercial report is reviewed in browser.

### 2026-06-20: Treat Refractured Roguelite As Core Product Premise

Decision:

The Refractured client report must treat `brutal 2.5D action roguelite` as the
core product premise, not as one optional strategic path.

Context:

The commercial-positioning rewrite still missed a key local project fact:
Refractured's archived Game Director notes describe the project as a
combat-first action roguelite with a nightmare/ritual loop. User feedback
correctly challenged the report because the previous recommendation framed
roguelite as something to add later instead of a central source of player
fantasy, replayability, marketing, and monetization.

Chosen because:

If Indievaders misses the client's actual premise, the resulting report loses
trust even when the writing and visual design are polished. Future reports need
an explicit premise-confidence gate before strategic recommendations: identify
the project's intended genre loop, player fantasy, monetization loop, and
evidence confidence from local docs before applying market patterns.

Implications:

- The Refractured report title and content now focus on `2.5D Roguelite
  Market-Fit`, not generic commercial positioning.
- Strategic paths are rebuilt around roguelite: focused nightmare roguelite,
  content-forward rogue-em-up, and deep combat mastery platform.
- The default recommendation is now a solo-first roguelite proof path:
  one excellent arena, then a handcrafted 3-room micro-run with ritual choices.
- Report templates should include player-profile, niche reality,
  review-pattern mining, monetization strategy, and a market radar appendix.
- Reddit/social listening is marked as a required evidence gap when direct
  access is unavailable, not silently implied as completed.

Owner:

Repository owner.

Review date:

After the revised Refractured roguelite market-fit report is reviewed in
browser and compared against local Refractured premise docs.

### 2026-06-20: Make Refractured v2 Artifact-First With Repo Mirror

Decision:

The Refractured v2 report is a Data Analytics artifact first, with a static HTML
mirror, Markdown summary, and JSON snapshot tracked under
`docs/client-reports/`.

Context:

The previous static report improved the tone, but it still behaved too much like
a document. The user asked for the kind of polished, decision-support report a
client would actually read: cards, tables, scorecards, charts, KPI framework,
decision gates, and an evidence ledger.

Chosen because:

The artifact format better demonstrates the intended Indievaders product value:
turn local project evidence plus public market research into an interactive,
source-backed commercial strategy report. The repo mirror preserves continuity
and protects against chat or tool state loss.

Implications:

- Future report work should start from an artifact-ready data snapshot.
- Static HTML and Markdown remain fallback exports, not the primary client
  experience.
- Every major claim should carry a confidence label: confirmed, reported,
  estimated, inferred, or not publicly confirmed.
- KPI design is part of the report product, not a separate appendix.
- Backend, sharing, payment, auth, customer accounts, and live Market Watch
  remain out of scope for this validation sprint.

Owner:

Repository owner.

Review date:

After the Refractured artifact and repo mirror are reviewed in the app.

## 2026-06-20: Make Refractured V3 Interactive-First

Decision: Refractured V3 will use one private interactive client-report route, `#client-report/refractured`, as the primary experience. The Data Analytics artifact, HTML, Markdown, and JSON snapshots are supporting evidence/archive surfaces.

Reason: The v2 report looked too much like a generic AI deep-research output. A paid Indievaders product needs guided interaction, decision modules, source drawers, and premium visual hierarchy.

Impact: Implementation shifts from static report rewriting to a React report experience with local data and focused modules. Backend, auth, payments, public sharing, and live Market Watch remain out of scope.

## 2026-06-21: Rebuild Refractured V4 Around Market Evidence Layers

Decision: Refractured V4 should not continue polishing the current tabbed
presentation. The next report pass should rebuild the experience around three
explicit layers: market evidence, Indievaders interpretation, and action.

Reason: User review showed that V3 still feels like a generated report split
into clickable sections. The tabs are visually improved, but the value remains
too textual and too repetitive. Evidence, player signals, roguelite advice,
Steam-page suggestions, estimates, and recommendations are mixed together, which
makes the report feel less trustworthy and less premium.

Impact:

- The next implementation pass should start with one strong vertical slice:
  `Market Evidence / Comparables`.
- Raw public facts, third-party estimates, inferred insights, and recommended
  actions must be visibly separated.
- Evidence should behave like a useful ledger of proof, caveats, and gaps, not
  as decorative methodology cards.
- Community and review listening must be either genuinely sourced or explicitly
  marked as missing research.
- The report preview should be tested through the local Vite URL, not treated as
  reliable through `file://dist`.
