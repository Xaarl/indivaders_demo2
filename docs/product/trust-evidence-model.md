# Trust And Evidence Model

## Trust Principle

Indievaders should sound useful because it is careful, not because it pretends to know everything. The product can make strong recommendations, but the factual basis and inference boundary must be visible.

## Evidence Labels

Use exactly these labels.

| Label | Meaning | Product Rule |
| --- | --- | --- |
| Confirmed | Visible in a primary public source such as Steam, an official site, press kit, or publisher page | Can be stated as a fact |
| Reported | Stated by a developer, publisher, interview, article, talk, or other public account | Attribute to public reporting/account |
| Estimated | Provided by a third-party estimator or calculated from public signals with uncertainty preserved | Never present as confirmed sales/revenue |
| Inferred | Reasoned from multiple public signals; useful for positioning, not treated as fact | Can support recommendations, not factual claims |
| Not publicly confirmed | Unavailable in reliable public sources | Must not be guessed or silently omitted |

## Evidence Types

Use the existing schema:

- `steam_store`
- `steam_reviews`
- `official_site`
- `press_kit`
- `developer_interview`
- `postmortem`
- `publisher_page`
- `public_database`
- `article`
- `reddit_ama`
- `youtube_or_podcast`
- `third_party_estimate`

## Claim Anatomy

Every meaningful claim should have:

- Claim: what the report says.
- Label: confirmed, reported, estimated, inferred, or not publicly confirmed.
- Source type: where the signal comes from.
- Source reference: URL or internal method note.
- Decision meaning: why the claim matters.

Example:

> TMNT is useful for readability lessons but unsafe as a small-team commercial benchmark.

This combines:

- Confirmed: Steam/publisher context shows the licensed/publisher frame.
- Inferred: that context makes sales/scope benchmarking unsafe for a small unlicensed team.
- Decision: add smaller unlicensed comparables before setting price or scope expectations.

## Where Evidence Appears

Landing:

- Minimal evidence chips on case details.
- Do not explain the whole method.
- Show source names and confidence on demand.

Interactive sample report:

- Source drawer for every major verdict/action.
- Evidence labels visible in source cards.
- Short source-confidence note in the source section.

Paid report:

- Evidence label near each major claim or section-level claim group.
- Source appendix at the end.
- Unknowns list for missing production, budget, team, sales, and marketing data.

Workspace:

- Source log remains accessible.
- Actions should preserve evidence refs from the originating report.
- User-added notes must be visually separate from report claims.

## Caveat Placement

Do not repeat disclaimers everywhere. Repetition makes the product sound defensive and less credible.

Use this pattern:

- Put a compact trust note near the first evidence interaction.
- Put full definitions in the source log or methodology appendix.
- Put local caveats only where the user might otherwise misread a claim.

Good local caveat:

> Exact marketing spend: Not publicly confirmed.

Bad repeated caveat:

> This is only an estimate and may be wrong, and we do not guarantee results.

## Confidence Versus Evidence Label

Evidence label describes the source basis. Confidence describes how strongly the product trusts the recommendation.

Example:

- Evidence label: Confirmed source says a publisher is involved.
- Recommendation confidence: High that this is an unsafe small-team benchmark.

Do not replace labels with vague confidence words. "High confidence" without source basis is not enough.

## Unknown Data Rules

- Unknown budget, team, sales, revenue, and marketing data must be represented as `Not publicly confirmed`.
- Third-party sales or revenue estimates must be labeled `Estimated`.
- Missing public data can still change the recommendation.
- Never fill unknowns with invented precision.

## Credibility Killers

Avoid:

- Repeating boilerplate disclaimers on every card.
- Treating Steam tags as full market truth.
- Treating review snippets as statistically complete truth without scope notes.
- Turning third-party estimates into confirmed facts.
- Hiding inference behind "AI says."
- Saying "competitors" when the product really means comparables, references, or unsafe benchmarks.

