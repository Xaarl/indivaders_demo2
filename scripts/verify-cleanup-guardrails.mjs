import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url);

async function readProjectFile(path) {
  return readFile(new URL(path, root), "utf8");
}

function assertNotContains(source, forbidden, label) {
  for (const needle of forbidden) {
    assert.equal(
      source.includes(needle),
      false,
      `${label} still contains forbidden cleanup marker: ${needle}`,
    );
  }
}

const viteConfig = await readProjectFile("vite.config.js");
const appSource = await readProjectFile("src/App.jsx");
const navbarSource = await readProjectFile("src/components/GlobalNavbar.jsx");
const reportSource = await readProjectFile("src/components/refractured-report/GuidedStoryReport.jsx");

assertNotContains(viteConfig, ["/api/sfx-browse", "/api/sfx-file", "/api/sfx-copy", "Ocular Creative Collection"], "vite.config.js");
assertNotContains(appSource, [
  "import BlackHoleSandbox",
  "import BlackHoleConcepts",
  "<BlackHoleSandbox",
  "<BlackHoleConcepts",
], "src/App.jsx static imports/routes");
assertNotContains(navbarSource, ["Å", "Ã"], "GlobalNavbar.jsx");
assertNotContains(reportSource, [
  "/api/sfx-browse",
  "/api/sfx-file",
  "/api/sfx-copy",
  "soundDropActive",
  "pianoImporting",
  "localDirEntries",
  "finalVortex",
  "Seeded Vortex",
  "finalRingShimmer",
  "finalVortexLift",
  "finalExplosionDrama",
  "drawFinalForegroundDisk",
  "drawFinalMergeFlash",
], "GuidedStoryReport.jsx");

const sfxDir = new URL("public/sfx/", root);
const sfxFiles = await readdir(sfxDir);
const allowedSfx = new Set([
  "DSGNBoom_BOOM-Distant_Ocular_Foundation.wav",
  "DSGNBoom_BOOM-Quake_Ocular_Foundation.wav",
  "pixel-burst.wav",
  "pixel-select.wav",
  "pixel-unlock.wav",
  "DSGNWhsh_WHOOSH-Two Steps_Ocular_Foundation.wav",
  "DSGNImpt_IMPACT-Time for Change_Ocular_Foundation.wav",
  "DSGNImpt_IMPACT-Not What You Think_Ocular_Foundation.wav",
]);

for (const file of sfxFiles) {
  assert.equal(
    allowedSfx.has(file),
    true,
    `Unexpected public SFX file remains: ${join("public", "sfx", file)}`,
  );
}

console.log("Cleanup guardrails passed");
