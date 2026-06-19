# Refractured Steam Positioning Readiness Report

Date: 2026-06-19
Prepared by: Indievaders report review
Project stage: Pre-Steam, combat-foundation prototype
Evidence mode: Local project review plus public Steam/market research

## Executive Read

Refractured is ready for positioning discipline before it is ready for public Steam positioning. A potential client could use Indievaders now to turn a private combat prototype into a concrete demo-readiness brief: what the game can credibly promise, which player expectations it should avoid creating, and what must be proven before a Steam page, trailer, or public share copy exists. The current evidence supports a focused dark 2.5D combat-readability lane, not a broad feature or launch-readiness claim.

What this means now:

- The team can leave this pass with a pre-Steam promise sheet that defines what the game can claim before a page exists.
- The team can use a demo-readiness gate list and risk map to decide what must be proven before any trailer, Steam copy, or public share post.
- The team can turn the report into sprint priorities: revalidate combat feel, tighten first-minute proof, and keep feature language inside current evidence.

Do next:

- Prove the first-minute combat read: one enemy pressure loop, one satisfying hit, one clear defensive response, and one camera setup that makes all three understandable.
- Write a one-page Steam promise before building a Steam page, then test every sentence against current prototype proof.
- Keep the public claim narrow until animation intake, combat feel, camera readability, and performance expectations have local validation.

Refractured is not ready for public sharing claims yet. It is ready for a focused demo-readiness report that helps the team decide what to prove, what to defer, and what not to promise.

## Current Game Snapshot

- Confirmed: The active Godot project reviewed locally contains the main scene set: `combat_lab.tscn`, `animation_lab.tscn`, and `battle_stage_25d.tscn`.
- Confirmed: The project direction is a stylized 3D combat-first game aimed at controlled 3D/2.5D brawler readability, not broad open 3D action.
- Confirmed: The current playable baseline is intentionally small. It is centered on verified attack and defense checks mapped to the prototype inputs, not a final combo list or complete move set.
- Confirmed: Animation intake is a known project risk. Reallusion-ready intake is a documented project standard, with clips required to pass source, skeleton or retarget, root motion, return pose, combat speed, Animation Lab review, and runtime validation before promotion.
- Confirmed: Performance is being measured locally. Older PCs and Steam Deck-class hardware are treated as target constraints, and playable stages are expected to keep debug overlays, live reload, and heavy import paths out of normal runtime.
- Inferred: Refractured is stronger today as a demo-readiness candidate than as a public Steam-page candidate, because the local evidence supports a focused combat foundation but not yet a broad public feature promise.

## Market Lane

Refractured's clearest market lane is a dark, physical, combat-first 2.5D brawler / action-fighting prototype.

It should not sell itself as broad open 3D action yet. The public promise should stay centered on tight combat readability, not exploration breadth, systemic open-world depth, or a finished character-action feature set.

The first-session fantasy should be readable pressure: enemies closing space, hits landing with weight, defensive timing that feels intentional, and a controlled camera that lets the player understand threat, impact, and recovery without guessing.

Pre-Steam analysis is still useful even before a public page exists because it can prevent the wrong benchmark set, the wrong first trailer promise, and premature feature expansion. The safest positioning work now is to define what the prototype can credibly make players feel, then compare against public games only where they clarify expectations or warn against overpromising.

## True Comparables

These are reference comparables for positioning and expectation-setting, not commercial comps.

### Sifu

- Role: aspirational readability reference; unsafe production benchmark.
- Why it appears: Public summaries describe Sifu as a third-person beat-em-up by Sloclap, first released on 8 February 2022, with single-player mastery through practice, block/evade/parry play, environmental use, and a sharp learning curve. It is useful for combat readability and pressure fantasy, but it represents a very high execution bar.
- Safe lesson: Make defensive timing, enemy pressure, and environmental combat readable before expanding the promise.
- Unsafe assumption: Do not imply Refractured can match Sifu's authored combat density, animation polish, or mastery curve at the current prototype stage.
- Evidence: `Reported`.

### Midnight Fight Express

- Role: safe lesson.
- Why it appears: The Steam page confirms a 23 Aug 2022 action beat-em-up by Jacob Dzwinel and Balor Games, with Steam tags including Action, Beat 'em up, Fighting, 3D, Isometric, Combat, Singleplayer, Stylized, and Martial Arts. Its page emphasizes brutal hyper-kinetic brawling, mo-cap animation, skill-tree progression, weapons, environmental tools, cosmetics, and 41 hand-crafted levels.
- Safe lesson: Use it as a closer positioning reference for compact, readable, impact-heavy brawling rather than broad open 3D action.
- Unsafe assumption: Do not borrow its mission count, breadth of weapons, cosmetic volume, or mo-cap polish as a near-term promise.
- Evidence: `Confirmed`.

### Absolver

- Role: unsafe benchmark.
- Why it appears: The Steam page confirms Sloclap and Devolver Digital released Absolver on 29 Aug 2017 as an online multiplayer combat game with Fighting, Martial Arts, Action, Multiplayer, PvP, Open World, PvE, RPG, Character Customization, and Difficult tags. Its page highlights tactical stances, dodges, parries, combat-deck customization, PvP/PvE, and post-launch expansion content.
- Safe lesson: Treat it as a warning about how quickly deep combat-system language creates expectations for customization, online structure, and long-term mastery.
- Unsafe assumption: Do not frame Refractured as open-world, RPG, multiplayer, or combat-deck deep unless those systems are actually scoped and demonstrable.
- Evidence: `Confirmed`.

### Streets of Rage 4

- Role: safe lesson.
- Why it appears: The Steam page confirms Dotemu, Guard Crush, and Lizardcube developed the 30 Apr 2020 Dotemu-published beat-em-up revival, with tags including Beat 'em up, Action, 2D, Fighting, Arcade, Local Multiplayer, Online Co-op, and Side Scroller. Its public framing is a classic-series revival with new mechanics, hand-drawn visuals, co-op, and stage-based beat-em-up expectations.
- Safe lesson: Use it to understand mainstream beat-em-up expectations around clarity, immediate impact, co-op/stage assumptions, and legible enemy waves.
- Unsafe assumption: Do not let a 2D arcade revival benchmark push Refractured into promising co-op, retro arcade structure, or franchise-scale polish.
- Evidence: `Confirmed`.

### Fight'N Rage

- Role: safe lesson.
- Why it appears: The Steam page confirms sebagamesdev developed and published the 19 Sep 2017 old-school side-scroller beat-em-up, presenting classic 2D brawler structure, one to three local co-op, fast arcade routes, simplified controls, training mode, parry system, mastery difficulty, and responsive controls. It is especially useful as a small-team example of focused brawler feel.
- Safe lesson: Prioritize responsive controls, compact scope, and easy-to-read mastery pressure over raw feature count.
- Unsafe assumption: Do not assume Refractured should become a 2D arcade-route game or promise local co-op because Fight'N Rage does.
- Evidence: `Confirmed`.

## Production Reality

### Animation Intake And Retargeting Risk

- Current signal: Local documentation treats animation intake as a known production contract, with Reallusion-ready source, skeleton or retarget checks, root motion, return pose, combat speed, Animation Lab review, and runtime validation required before promotion.
- Why it matters: A combat game can lose trust quickly if attack, defense, recovery, or locomotion clips visibly fight the controls or camera before the player understands the combat promise.
- Mitigation: Keep demo-critical animation scope small and promote only clips that pass both lab review and in-context runtime checks.
- Evidence: `Confirmed`.

### Combat Feel Proof Risk

- Current signal: The playable baseline is intentionally small and centered on verified attack and defense checks, not a complete move set or final combat loop.
- Why it matters: The first public reaction will judge impact, responsiveness, and defensive clarity before it cares about future systems.
- Mitigation: Revalidate a compact combat baseline with one primary attack, one defensive action, one enemy pressure pattern, and a clear pass/fail feel review.
- Evidence: `Confirmed` for current scope; `Inferred` for public reaction risk.

### Camera/Readability Risk

- Current signal: The project direction favors controlled 3D/2.5D brawler readability rather than broad open 3D action.
- Why it matters: If players cannot read threat direction, hit timing, spacing, and recovery, the game may be perceived as unfair even when the underlying systems work.
- Mitigation: Treat camera framing, enemy staging, and impact readability as demo requirements, not polish tasks.
- Evidence: `Confirmed` for direction; `Inferred` for player-facing risk.

### Scope/Content-Depth Risk

- Current signal: Public comparables quickly imply high expectations for level count, weapons, mastery systems, multiplayer, co-op, customization, or authored combat density.
- Why it matters: A Steam promise that sounds broader than the prototype proof can create review risk before the project has enough content depth to defend it.
- Mitigation: Position Refractured around a focused combat slice until the team can show repeatable depth beyond the first encounter.
- Evidence: `Confirmed` for comparable signals; `Inferred` for positioning risk.

### Performance Expectation Risk

- Current signal: Local docs already treat older PCs and Steam Deck-class hardware as target constraints, with debug overlays, live reload, and heavy import paths kept out of normal runtime.
- Why it matters: Public players will not separate prototype overhead from game feel if frame pacing, load behavior, or input responsiveness breaks during the demo.
- Mitigation: Keep the demo environment lean, measure on target-like hardware, and avoid public performance language until the slice is validated.
- Evidence: `Confirmed`.

## Steam And Demo Promise Draft

### Focused Brawler Promise

- Positioning line: A dark, focused 2.5D brawler about readable pressure, heavy hits, and tight defensive timing.
- Best when: The demo can show a compact encounter that feels responsive and understandable from the first minute.
- Risk if used too early: "Brawler" can imply enemy variety, level flow, and repeatable combat depth that the current prototype has not yet proven.

### Combat-Readability Promise

- Positioning line: Internal pre-Steam positioning for a combat-first slice built around clear threat reads, intentional defense, and impact you can parse under pressure.
- Best when: Camera framing, enemy attack language, hit reactions, and defensive timing are the strongest parts of the slice.
- Risk if used too early: If animations or camera behavior are still uneven, the promise invites players to judge the weakest visible layer first.

### Dark Physical Action Promise

- Positioning line: A dark physical action game where close-range fights are meant to feel heavy, readable, and dangerous.
- Best when: The team wants a broader emotional hook while keeping public feature claims narrow.
- Risk if used too early: "Action game" may pull expectations toward broader 3D adventure, progression, or content scope unless the page tightly defines the playable slice.

## Review Risk Map

| Risk | Likely Player Reaction | Why It Could Happen | Mitigation | Evidence |
| --- | --- | --- | --- | --- |
| Weak first-hit feel | "The combat does not feel good yet." | The current baseline proves attack and defense checks, but public players judge impact before system intent. | Make the first landed hit a demo gate with animation, VFX, audio, hit stop, enemy response, and input recovery reviewed together. | `Confirmed` baseline scope; `Inferred` reaction |
| Confusing defensive language | "I cannot tell when to block, evade, or counter." | Defensive timing language can create mastery expectations before enemy tells and feedback are readable. | Demonstrate one defensive verb clearly before adding more defensive copy or mechanics language. | `Confirmed` combat baseline; `Inferred` reaction |
| Camera or enemy readability problems | "I got hit by things I could not see or understand." | Controlled 3D/2.5D combat depends on framing, enemy staging, and threat direction staying legible. | Validate encounter layout and camera behavior as part of the combat slice, not after content expansion. | `Confirmed` direction; `Inferred` reaction |
| Animation jank visible before combat promise lands | "The game looks rough before I understand what it is trying to do." | Animation intake and retargeting are known risks, and combat promises depend on believable motion. | Limit the public-facing move set to promoted clips that pass Animation Lab and runtime review. | `Confirmed` animation policy |
| Feature promise broader than demo proof | "The page makes it sound bigger than the demo is." | Comparables can imply weapons, levels, co-op, online systems, customization, or deep mastery that are not yet evidenced. | Use a narrow one-page promise and reject claims not supported by current slice proof. | `Confirmed` comparables; `Inferred` positioning risk |

## Prioritized Next Actions

### 1. Revalidate The Combat Baseline

- Action: Run a focused local review of one attack, one defensive response, one enemy pressure pattern, and one reset/retry loop.
- Why now: The report's safest promise depends on combat feeling responsive before any public page language exists.
- Evidence: `Confirmed` current baseline is small and combat-foundation focused.
- Expected output: A pass/fail demo-readiness note for first-hit feel, defense clarity, recovery, and repeatability.

### 2. Tighten First-Minute Proof

- Action: Build or curate the first minute around one readable encounter that shows pressure, impact, defense, and camera clarity without extra feature explanation.
- Why now: The first public impression will form before players understand long-term systems or production intent.
- Evidence: `Inferred` from market lane and comparable expectations.
- Expected output: A short first-minute checklist and capture target for internal review.

### 3. Write A One-Page Steam Promise Before Building A Page

- Action: Draft a one-page promise with the positioning line, player fantasy, supported features, deferred features, and evidence labels.
- Why now: It prevents the Steam page from inheriting unsafe language from aspirational comparables.
- Evidence: `Confirmed` comparables carry broad expectations; `Inferred` promise discipline is needed pre-Steam.
- Expected output: A team-approved promise sheet that can later become Steam copy only after proof improves.

### 4. Lock Demo-Critical Animation Promotion Rules

- Action: Identify the minimum promoted animation set required for the demo and reject clips that fail source, retarget, root motion, return pose, combat speed, lab review, or runtime checks.
- Why now: Animation jank can undermine combat readability before the player experiences the intended loop.
- Evidence: `Confirmed` animation intake and Reallusion-ready policy.
- Expected output: A demo animation acceptance list with pass/fail status for each required clip.

### 5. Validate Camera And Encounter Readability Together

- Action: Review camera framing, enemy spacing, threat direction, hit reaction, and recovery timing in the same encounter rather than as separate polish items.
- Why now: The clearest market lane depends on controlled 3D/2.5D readability.
- Evidence: `Confirmed` direction; `Inferred` player risk.
- Expected output: A readability review with specific layout, camera, and enemy-staging changes.

### 6. Define The Performance Claim Boundary

- Action: Measure the demo slice on target-like local hardware and remove debug/runtime overhead from the normal demo path before making public performance claims.
- Why now: Performance expectation risk is already documented locally, but public language should wait for slice validation.
- Evidence: `Confirmed` older PC and Steam Deck-class constraints.
- Expected output: A conservative performance note that says what was tested, what was not tested, and what should not be claimed yet.

## Source Appendix

### Local Sources

| Label | Source | Evidence Type | Used For |
| --- | --- | --- | --- |
| Confirmed | `README.md` | local_project_doc | active project identity and local project structure |
| Confirmed | `CURRENT_PROJECT_STATE.md` | local_project_doc | direction, scenes, combat baseline, risks |
| Confirmed | `Technical_Foundation_Handbook.md` | local_project_doc | architecture, performance, animation policy |
| Confirmed | `Asset_Source_Manifest.md` | local_project_doc | promoted assets and animation source policy |
| Confirmed | `Animation_Pipeline_Sandbox.md` | local_project_doc | animation intake workflow and promotion rules |
| Confirmed | `2026-06-02-combat-foundation-v2-slice-design.md` | local_project_doc | combat foundation slice intent |

### Public Sources

| Label | Source | URL | Accessed | Evidence Type | Used For |
| --- | --- | --- | --- | --- | --- |
| Confirmed | Midnight Fight Express Steam page | https://store.steampowered.com/app/1390410/Midnight_Fight_Express/ | 2026-06-19 | steam_store | Steam tag/store-page 3D/isometric action-brawler positioning reference |
| Confirmed | Absolver Steam page | https://store.steampowered.com/app/473690/Absolver/ | 2026-06-19 | steam_store | combat-system depth and scope-complexity reference |
| Confirmed | Streets of Rage 4 Steam page | https://store.steampowered.com/app/985890/Streets_of_Rage_4/ | 2026-06-19 | steam_store | mainstream beat-em-up expectation reference |
| Confirmed | Fight'N Rage Steam page | https://store.steampowered.com/app/674520/FightN_Rage/ | 2026-06-19 | steam_store | small-team brawler mastery and responsiveness reference |
| Reported | Sifu Wikipedia/public background summary | https://en.wikipedia.org/wiki/Sifu_(video_game) | 2026-06-19 | public_database | aspirational combat/readability reference and scope warning |
