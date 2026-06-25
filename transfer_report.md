# Handover & Transfer Report: Indievaders - Guided Story Report Premium

This report outlines the current status, file architecture, completed features, and deployment instructions for the **Guided Story Report (Story Mode)** prototype. It is designed to allow another AI agent or developer to seamlessly continue development or deploy a public-facing demo.

---

## 1. Active Workspace & Branch Info
* **Workspace Directory**: `g:\Game Dev\Indievaders`
* **Worktree Directory**: `g:\Game Dev\Indievaders\.worktrees\refractured-v7-unified`
* **Active Git Branch**: `codex/refractured-v7-unified` (tracked to `demo/main`)

---

## 2. Completed Features

### A. Advanced Physics-Based Starfield & Parallax
* **3 Depth Layers**: Stars are dynamically divided into background dust (Layer 0: small, dim, near-static), midground stars (Layer 1), and foreground interactable stars (Layer 2: large, bright, highly responsive).
* **Parallax Scrolling**: Stars move vertically relative to depth/factor when scrolling.
* **Resizing Coherence**: Coordinates are scaled proportionally upon viewport resizing, ensuring no blank spots or layout tearing.

### B. Accurate Singularity (Black Hole) Physics & Accretion Ring
* **Aesthetics**: Pitch black event horizon (`#000000`) surrounded by a clean white accretion ring and a radial white-gray glow. The canvas background is solid dark space, eliminating distracting color gradients.
* **Player Feeding & Mass Growth**: Foreground stars are pulled into the singularity within a `320px` radius. Active feeding (stars pulled near cursor) grows the mass significantly, triggers a shockwave ripple, and plays the `burst` sound.
* **Growth Rate UI**: Slider is labeled **"Black Hole Growth Speed"** showing the active percentage increase per star (e.g. `+25%`).

### C. Unified Sound Library, Mapper & Audio Mechanics
* **Dynamic Library**: Managed in `soundLibrary` state and saved to local storage. Features 5 default high-quality WAV files, file-upload integration, and local system directory browser (`F:\SFX & More\Ocular Creative Collection` mapping `/api/sfx-browse`, `/api/sfx-file`, and `/api/sfx-copy` on Vite dev server).
* **Simplified Event Mapper**: Maps event triggers directly to library sounds with individual **Volume** sliders.
* **Combo Pitch Scaling**: Consecutive star ingestions (less than `800ms` apart) increase the playback rate (`playbackRate` starting at `1.0` up to `1.4` or `1.72` for piano cascades), creating a satisfying auditory feedback loop. Clicks and hovers have a ±5% random pitch shift.
* **Double-Tap Singularity Explosion**: Collapsing triggers a two-stage explosion: immediate `collapse` + custom `unlock` sound, followed by a secondary `impact` sound after a `120ms` delay for maximum weight.
* **Ingestion Cacophony Prevention**: Triggering collapse sets a 1-second `justCollapsedRef` flag that mutes the ingestion `burst` sound for all stars absorbed by the newly spawned singularity.

### D. Crystal Glassmorphism Tiles
* **Low Blur Glass**: Backdrop blur set to `blur(4px)` instead of `blur(25px)`, letting background stars remain visible under widgets.
* **Liquid Light Shine**: Implemented as a CSS pseudo-element `::after` with `mix-blend-mode: overlay`. The cursor-aligned radial light reflection retains its last coordinate when the mouse leaves, rather than resetting to center.
* **Visual Color Customizers**: Pickers added in the UX panel for Tile Background, Tile Border, and Tile Glow/Shine, dynamically mapping to CSS variables `--story-card-bg`, `--story-card-border`, and `--story-card-glow`.

### E. Independent Text Styler (TXT) & Drag Width Resizer
* **Decoupled Operation**: Text styler panel (TXT) operates independently of the visual settings panel (UX). Text blocks are immediately editable on click.
* **Interactive Resizing**: Drag handles appear on active text elements, allowing real-time width resizing (`maxWidth` styling saved to local storage).
* **System Font Stack**: Dropdown includes common web-safe system fonts (`Arial`, `Segoe UI`, `Calibri`, `Trebuchet MS`, `Impact`, `Garamond`, `Consolas`) with custom fallback entry input.

---

## 3. Deployment Instructions: Public Demo Mode (Vercel / GitHub Pages)

To publish a public demo for stakeholders/users, **all editing features must be disabled** to show only a clean, interactive, high-fidelity scrollytelling experience. This has been fully automated using **Public Demo Runtime** detection.

### How it Works:
Demo mode is automatically triggered if:
1. The Vite build process runs with env variable `VITE_PUBLIC_DEMO=true`.
2. The URL query parameter `?demo=true` is present (e.g. `https://yoursite.com/?demo=true`).
3. The hostname contains `indievaders-demo`.

When Demo Mode is active:
* The Visual Editor (UX) and Text Styler (TXT) buttons in the edit bar are hidden.
* Text boxes do not display active edit boxes, bounding borders, drag handles, or have `contentEditable` set.
* The settings drawers and customizer menus are completely inaccessible.
* Interactive elements (black hole, sound toggle, music, and animations) remain fully functional.

### Deploying on Vercel:
1. Connect your repository to Vercel.
2. In your Vercel Project Dashboard, navigate to **Settings > Environment Variables**.
3. Add a new variable:
   * **Key**: `VITE_PUBLIC_DEMO`
   * **Value**: `true`
4. Set the **Build Command** to `npm run build` and **Output Directory** to `dist`.
5. Deploy. Vercel will automatically build the site in public demo mode, locking down all editing options.

### Deploying on GitHub Pages:
Ensure your GitHub Action workflow injects `VITE_PUBLIC_DEMO=true` during the build step. 
Example GitHub Actions workflow step:
```yaml
      - name: Build Project
        env:
          VITE_PUBLIC_DEMO: true
        run: npm run build
```

---

## 4. Key Files Architecture
* [GuidedStoryReport.jsx](file:///g:/Game%20Dev/Indievaders/.worktrees/refractured-v7-unified/src/components/refractured-report/GuidedStoryReport.jsx): Main story scrollytelling engine, customizer interface, sound player, canvas loops, and widgets.
* [refractured-story-prototype.css](file:///g:/Game%20Dev/Indievaders/.worktrees/refractured-v7-unified/src/styles/refractured-story-prototype.css): Visual rules for glassmorphism, overlays, animations, and typography tokens.
* [App.jsx](file:///g:/Game%20Dev/Indievaders/.worktrees/refractured-v7-unified/src/App.jsx): Routing hub that triggers the public demo state.
* [vite.config.js](file:///g:/Game%20Dev/Indievaders/.worktrees/refractured-v7-unified/vite.config.js): Handles local file listing, file copying, and audio streaming routes for Vite.
