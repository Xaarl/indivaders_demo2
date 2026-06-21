import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

function countOccurrences(text, needle) {
  return text.split(needle).length - 1;
}

function test(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(
      () => ({ name, ok: true }),
      (error) => ({ name, ok: false, error }),
    );
}

const server = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const { default: MarketMap } = await server.ssrLoadModule("/src/components/refractured-report/MarketMap.jsx");
  const { default: ComparableExplorer } = await server.ssrLoadModule(
    "/src/components/refractured-report/ComparableExplorer.jsx",
  );
  const { default: RefracturedEvidenceDrawer } = await server.ssrLoadModule(
    "/src/components/refractured-report/RefracturedEvidenceDrawer.jsx",
  );
  const { default: ReviewCommunityThemes } = await server.ssrLoadModule(
    "/src/components/refractured-report/ReviewCommunityThemes.jsx",
  );
  const { EvidenceButton, LayerStack } = await server.ssrLoadModule(
    "/src/components/refractured-report/MarketIntelligencePrimitives.jsx",
  );
  const { default: report } = await server.ssrLoadModule("/src/data/refracturedPremiumReport.js");

  const noop = () => {};
  const results = await Promise.all([
    test("empty drawer refs render an empty state instead of the full ledger", () => {
      const markup = renderToStaticMarkup(
        React.createElement(RefracturedEvidenceDrawer, {
          activeRefs: [],
          evidence: report.evidenceLedger,
          onClose: noop,
          open: true,
        }),
      );

      assert.match(markup, /No evidence found/);
      assert.doesNotMatch(markup, new RegExp(report.evidenceLedger[0].label));
    }),
    test("missing drawer refs render an empty state unless full ledger is explicit", () => {
      const missingMarkup = renderToStaticMarkup(
        React.createElement(RefracturedEvidenceDrawer, {
          activeRefs: null,
          evidence: report.evidenceLedger,
          onClose: noop,
          open: true,
        }),
      );
      const allMarkup = renderToStaticMarkup(
        React.createElement(RefracturedEvidenceDrawer, {
          activeRefs: [],
          evidence: report.evidenceLedger,
          onClose: noop,
          open: true,
          showAll: true,
        }),
      );

      assert.match(missingMarkup, /No evidence found/);
      assert.doesNotMatch(missingMarkup, new RegExp(report.evidenceLedger[0].label));
      assert.match(allMarkup, new RegExp(report.evidenceLedger[0].label));
    }),
    test("Market Map makes its board primary instead of leading with a full layer stack", () => {
      const markup = renderToStaticMarkup(
        React.createElement(MarketMap, {
          marketEvidence: report.marketEvidence,
          onEvidenceOpen: noop,
          thesis: report.thesis,
        }),
      );

      assert.doesNotMatch(markup, /refractured-layer-stack/);
      assert.match(markup, /refractured-market-map-board/);
    }),
    test("Comparable Explorer makes its board primary instead of leading with a full layer stack", () => {
      const markup = renderToStaticMarkup(
        React.createElement(ComparableExplorer, {
          marketEvidence: report.marketEvidence,
          onEvidenceOpen: noop,
        }),
      );

      assert.doesNotMatch(markup, /refractured-layer-stack/);
      assert.match(markup, /refractured-comparable-board/);
    }),
    test("LayerStack generates unique panel ids for coexisting stacks", () => {
      const markup = renderToStaticMarkup(
        React.createElement(
          React.Fragment,
          null,
          React.createElement(LayerStack, { module: report.marketEvidence, onEvidenceOpen: noop }),
          React.createElement(LayerStack, { module: report.audienceSignals, onEvidenceOpen: noop }),
        ),
      );
      const ids = [...markup.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);

      assert.equal(new Set(ids).size, ids.length);
      assert.equal(countOccurrences(markup, 'aria-labelledby="layer-facts"'), 0);
    }),
    test("Evidence buttons include contextual accessible labels", () => {
      const markup = renderToStaticMarkup(
        React.createElement(EvidenceButton, {
          context: "Absolum Steam reference",
          evidenceRefs: ["absolum-steam"],
          label: "Sources",
          onEvidenceOpen: noop,
        }),
      );

      assert.match(markup, /aria-label="Sources: Absolum Steam reference"/);
    }),
    test("Review Community Themes renders a review radar surface", () => {
      const markup = renderToStaticMarkup(
        React.createElement(ReviewCommunityThemes, {
          onEvidenceOpen: noop,
          reviewCommunityThemes: report.reviewCommunityThemes,
        }),
      );

      assert.match(markup, /refractured-review-radar/);
      assert.match(markup, /aria-label="Review radar signals and gaps"/);
    }),
  ]);

  const failures = results.filter((result) => !result.ok);
  results.forEach((result) => {
    const marker = result.ok ? "PASS" : "FAIL";
    console.log(`${marker} ${result.name}`);
    if (!result.ok) {
      console.log(result.error.message);
    }
  });

  if (failures.length > 0) {
    process.exitCode = 1;
  }
} finally {
  await server.close();
}
