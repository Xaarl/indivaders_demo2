# Hero Integration Plan

Date: 2026-06-16

## Decision

Preserve the current invaders / black-hole hero direction. It is the strongest visual and interaction asset in the prototype, and it expresses the product's core idea better than a generic SaaS hero would.

The goal is not to replace it. The goal is to make the rest of Indievaders feel like the same product.

## Current Hero Model

Current behavior in `Hero.jsx`:

- Six signal items drift in a bounded field.
- User clicks or drags signals into the black-hole core.
- Signals can be absorbed.
- After all are absorbed, the hero enters a burst/light phase.
- The displayed signal list changes from problems to solutions.
- Controls show reset, sound, and progress.

This maps well to the product:

- Noisy assumptions -> filtered signals.
- False benchmarks -> safer decisions.
- Broad tags -> sharper positioning.
- Demo friction -> review risk map.

## Integration Problem

The hero currently feels like a brilliant standalone scene. Below it, the page becomes more conventional. The user should not feel like they moved from a custom product to a template landing page.

The bridge needs to happen immediately after the hero.

## Hero Improvements

### 1. Change HUD Language

Current:

- "Noise 0/6"
- "Click or drag signals into the core"

Recommended:

- "Scan 0/6"
- "Filter weak signals"
- Completed: "6 decisions unlocked"

This keeps the interaction understandable while making it feel like product analysis rather than a mini-game.

### 2. Make Solution State Product-Specific

When the hero reaches light phase, the solution labels should map directly to report modules:

- True comps
- Tag promise
- Review risks
- Price/scope
- Creator angle
- Next move

These labels should appear as a compact solution strip or signal ledger, not only in a small aside.

### 3. Add A Completion CTA State

After completion, the control panel should expose:

- Primary: "Open sample report"
- Secondary: "See case files"
- Reset as a smaller icon action.

Do not show the full conversion CTA before the user understands the report.

### 4. Strengthen The Signal List Panel

The current `signal-list-panel` is useful but visually secondary. Upgrade it into a small "signal decoder" panel:

- Problem state: weak signals.
- Solution state: report outputs.
- One line of context: "The report turns noisy assumptions into specific decisions."

Keep it compact. It should not become a text card.

### 5. Make The Bottom Edge A Transition

The first section below the hero should look like it is receiving output from the hero.

Recommended:

- A full-width captured-signal ledger.
- Thin cyan/amber scan line.
- Three entries showing problem -> report output.

This is stronger than a generic trust strip.

## Landing Bridge

Replace `trust-strip` with:

### Signal Ledger

Entry 1:

- Weak signal: Broad tags.
- Report output: Tag promise check.

Entry 2:

- Weak signal: Wrong competitors.
- Report output: True comparable map.

Entry 3:

- Weak signal: Demo friction.
- Report output: Review risk actions.

This makes the landing page feel like it is continuing the hero's logic.

## Metaphor Boundaries

Use the black-hole metaphor for:

- Filtering noise.
- Collapsing false assumptions.
- Transforming problems into decisions.

Do not use it for:

- Every section background.
- Every CTA.
- Workspace empty states.
- Generic marketing copy.

Use invaders for:

- Hero signals.
- Very small signal markers if needed.
- Possibly Market Watch alert glyphs in a restrained way.

Do not use invaders for:

- Form fields.
- Report source rows.
- Serious workspace controls.

## Mobile Plan

The hero needs mobile-specific composition rules:

- Keep the black hole and signal field in the upper third.
- Keep hero copy readable without pushing it too far below the interaction.
- Move the control panel into a compact bottom strip.
- Hide or compress secondary signal panels.
- Ensure CTA buttons do not wrap awkwardly.
- Make touch targets at least 44px.

Mobile users should understand the product without needing to complete the interaction.

## Motion Rules

Keep:

- Alien drift.
- Capture.
- Burst.
- Reform.
- Mouse/touch spotlight where usable.

Reduce:

- Any motion that makes text harder to read.
- Excess glow behind body copy.
- Competing panel animations below the hero.

## Implementation Notes

Likely first code targets:

- `src/components/Hero.jsx`
- `src/styles/landing.css`
- `src/content/productCopy.js`
- `src/components/LandingPage.jsx`

Suggested changes:

- Rename progress and completion copy.
- Add completion CTA state.
- Add solution category labels that match report modules.
- Replace trust strip content and styling with signal ledger content.
- Tune mobile hero layout.

## Acceptance Criteria

- The hero still feels like Indievaders, not a SaaS template.
- A new visitor can explain what the report does after the hero and signal ledger.
- Completion state previews the actual report categories.
- The next section feels like product output, not a disconnected content block.
- Mobile users can read and act without completing the interaction.
