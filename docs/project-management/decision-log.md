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
- The email sample brief remains a lead magnet concept, not the primary proof artifact.
- QA should test `#sample-report` and `#order-report`.

Owner:

PM and engineering lead.

Review date:

After evaluating visitor behavior on the prototype.

