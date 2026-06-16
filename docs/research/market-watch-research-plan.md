# Market Watch Research Plan

## Product Hypothesis

Market Watch becomes valuable only after the first report creates trust. Users will return if refreshes tell them what changed in their game's market lane and what decision should be reconsidered.

## What Market Watch Should Monitor

Decision-relevant signals:

- Tracked comparable price and discount changes.
- Steam page tag and category changes.
- Demo, release, and major update status.
- Review theme changes.
- New comparable candidates.
- Nearby event timing, including festival/demo windows.
- Publisher or production context changes when publicly reported.

Avoid monitoring for its own sake. A feed of raw changes is not enough.

## Refresh Output Shape

Each refresh should produce:

- Date.
- Changed signal.
- Evidence label.
- Source link or source note.
- Why it matters.
- Suggested reconsideration.

Example:

| Field | Example |
| --- | --- |
| Changed signal | Comparable discounted to a lower price band |
| Evidence label | Confirmed |
| Why it matters | The nearby value expectation may shift before Next Fest |
| Reconsider | Recheck price/page proof before public demo traffic |

## MVP Monitoring Scope

First beta should support one project and a small tracked comparable list.

Minimum modules:

- Saved comparables.
- Refresh run history.
- Source-labeled changed signals.
- Recommendation delta.

Do not build:

- Multi-project dashboard.
- Alert overload.
- Creator CRM.
- Raw database browser.
- Revenue forecasting as headline feature.

## Validation Criteria

Market Watch is worth building if:

- Early paid report users ask what changed after delivery.
- Refreshes change at least one user decision: page copy, tags, price, demo emphasis, outreach timing, or comparable set.
- Users understand evidence labels on changed signals.
- Users return without needing a general dashboard.

Market Watch should wait if:

- Users mainly want a one-off report.
- Refreshes produce low-signal noise.
- Live data collection quality cannot support trust labels.
- The product ladder is still confusing.

