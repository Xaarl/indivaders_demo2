# Public Web QA Checklist

Run this before sharing a preview link.

## Build Gate

- `npm run lint` passes.
- `npm run build` passes.
- `npm run preview` starts locally.
- Browser console has no runtime errors on the landing page.
- Browser console has no runtime errors on `#sample-report`.
- Browser console has no runtime errors on `#order-report`.

## Text Gate

Public UI must not contain:

- Polish copy,
- mojibake characters such as `Ã…`, `Ãƒ`, `Ã„`,
- `old app`,
- `engine not product`,
- `after validation`,
- `sample pack`,
- `Creator Fit`,
- `Competitors`,
- `Review Audit`,
- `Market contradictions`,
- `local heuristic`,
- `2D Action Positioning`,
- `$99 pilot report`,
- vague price ranges such as `$79-$99`,
- `pilot validation`.

## Product Logic Gate

- Landing explains the product within the first viewport.
- Case cards are teasers, not full reports.
- All case cards use real game titles.
- TMNT is framed as a licensed benchmark trap.
- Balatro is framed as an outlier pattern case.
- Dave the Diver is framed as a production-context warning.
- Full sample brief is separate from the landing page.
- Paid report outline is compact and does not become a dashboard.
- Public price is `$49 early automated report`.

## Interaction Gate

- Primary hero CTA scrolls or routes to the intended section.
- Secondary hero CTA scrolls or routes to the intended section.
- Every case card opens a compact lesson panel.
- Evidence links with URLs open in a new tab.
- Email sample form accepts a valid email and shows demo success.
- Interactive sample report route works via `#sample-report`.
- Early report intake route works via `#order-report`.
- Back link from sample report returns to landing.

## Layout Gate

- Desktop: no horizontal scroll.
- Desktop: case cards fit within viewport.
- Mobile: nav does not overlap hero copy.
- Mobile: cards stack cleanly.
- Mobile: sample brief remains readable.
- Buttons have visible focus states.

## Deploy Safety Gate

- `node_modules` is not staged.
- `dist` is not staged.
- No `.env` files are staged.
- No databases, raw scrape caches, logs, or API keys are staged.
- Build command is `npm run build`.
- Output directory is `dist`.

