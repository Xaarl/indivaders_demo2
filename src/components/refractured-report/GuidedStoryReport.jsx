/* eslint-disable react-hooks/immutability */
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ArrowRight, Database, ExternalLink, LineChart, MousePointer2, Sparkles, Volume2, VolumeX } from "lucide-react";
import "../../styles/refractured-animation-sandbox.css";
import "../../styles/refractured-story-prototype.css";
import refracturedPremiumReport from "../../data/refracturedPremiumReport.js";

// Import deep-dive dashboards
import ComparableExplorer from "./ComparableExplorer.jsx";
import AudienceSignals from "./AudienceSignals.jsx";
import MarketMap from "./MarketMap.jsx";
import ReviewCommunityThemes from "./ReviewCommunityThemes.jsx";
import SteamPositioningBuilder from "./SteamPositioningBuilder.jsx";
import RogueliteLoopLab from "./RogueliteLoopLab.jsx";
import ActionPlanTimeline from "./ActionPlanTimeline.jsx";
import RefracturedEvidenceDrawer from "./RefracturedEvidenceDrawer.jsx";

const chapters = [
  {
    id: "read",
    label: "Market read",
    short: "What is worth proving first?",
    title: "Make the first fight hard to put down.",
    body: [
      "A small demo can work. A vague one usually cannot.",
      "For Refractured, the strongest commercial read is not bigger scope. It is a brutal first encounter that makes the player want one more run before the game explains everything else.",
    ],
    unlock: "Market Map",
  },
  {
    id: "pull",
    label: "Player pull",
    short: "Who comes back?",
    title: "The right player should remember a feeling, not a feature list.",
    body: [
      "This niche rewards readable danger, fast recovery, build consequence, and an addictive retry loop.",
      "It punishes mud: unclear hit feedback, generic darkness, and roguelite choices that feel like stat labels instead of changed behavior.",
    ],
    unlock: "Player DNA",
  },
  {
    id: "rivals",
    label: "Rival signals",
    short: "What can the market already read?",
    title: "Rivals are not targets. They are clues.",
    body: [
      "Absolum makes the lane legible. Dead Cells explains the retry promise. Rotwood warns what happens when co-op and content breadth become the expectation too early.",
      "The useful question is not which game to copy. It is which promise Refractured can prove faster and cleaner.",
    ],
    unlock: "Rival Stories",
  },
  {
    id: "promise",
    label: "Storefront promise",
    short: "What should Steam make obvious?",
    title: "The Steam page should sell the next run before it sells the whole game.",
    body: [
      "A good first screen tells the player what they do, why failure changes the next try, and what kind of mastery they can chase.",
      "If the page opens with systems before sensation, the strongest part of the game becomes homework.",
    ],
    unlock: "Promise Builder",
  },
  {
    id: "plan",
    label: "Proof plan",
    short: "What unlocks ambition?",
    title: "Let proof decide how big the next version should become.",
    body: [
      "The report should not tell a developer to dream smaller. It should show which proof makes a bigger bet rational.",
      "Hook comprehension, first-fight feel, and second-run desire unlock the next layer: content breadth, pricing, funding, and launch shape.",
    ],
    unlock: "Proof Board",
  },
];

const moduleCardPresentation = {
  "Market Map": {
    role: "Market lens",
    cta: "Open market board",
  },
  "Player DNA": {
    role: "Audience layer",
    cta: "Open player layer",
  },
  "Rival Stories": {
    role: "Rival signals",
    cta: "Open rival layer",
  },
  "Promise Builder": {
    role: "Storefront layer",
    cta: "Open promise lab",
  },
  "Proof Board": {
    role: "Proof plan",
    cta: "Open proof plan",
  },
  "Evidence Vault": {
    role: "Evidence layer",
    cta: "Open evidence vault",
  },
};

const fallbackModulePresentation = {
  role: "Report layer",
  cta: "Open layer",
};

const promiseOptions = [
  {
    id: "brutal-retry",
    label: "Brutal retry",
    headline: "Survive one vicious fight. Return changed.",
    tags: ["Action Roguelite", "Beat 'em up", "Dark Fantasy"],
    proof: ["first hit reads", "retry is fast", "one change alters the next fight"],
  },
  {
    id: "mastery-pressure",
    label: "Mastery pressure",
    headline: "Learn the enemy, break the rhythm, earn the next room.",
    tags: ["Action", "Difficult", "Hack and Slash"],
    proof: ["enemy tells are readable", "mistakes feel fair", "skill changes outcome"],
  },
  {
    id: "nightmare-loop",
    label: "Nightmare loop",
    headline: "Each ritual makes the next attempt more dangerous and more tempting.",
    tags: ["Rogue-lite", "Atmospheric", "Stylized Violence"],
    proof: ["choice changes behavior", "run identity is visible", "risk feels addictive"],
  },
];

const rivalCategories = [
  {
    id: "closest-lane",
    title: "Closest lane",
    summary: "Roguelite brawlers and action roguelites that make Refractured's lane legible.",
    items: ["absolum", "curse-of-the-dead-gods", "rotwood"],
  },
  {
    id: "combat-feel",
    title: "Combat feel",
    summary: "References for impact, camera, punishment, recovery, and the moment-to-moment fight.",
    researchGapItems: ["Midnight Fight Express", "Sifu", "Streets of Rage 4", "Mother Russia Bleeds", "Fight'N Rage"],
  },
  {
    id: "loop-architecture",
    title: "Loop architecture",
    summary: "Games that make retry, mastery, build consequence, and one-more-run pressure easy to understand.",
    items: ["dead-cells", "hades-ii", "curse-of-the-dead-gods"],
  },
  {
    id: "scope-pressure",
    title: "Scope pressure",
    summary: "Comparables that warn against selling breadth before Refractured has proof of the first fight.",
    items: ["rotwood", "ravenswatch"],
  },
];

const defaultSoundLibrary = [
  { name: "pixel-select.wav", url: "/sfx/pixel-select.wav" },
  { name: "pixel-burst.wav", url: "/sfx/pixel-burst.wav" },
  { name: "pixel-unlock.wav", url: "/sfx/pixel-unlock.wav" },
  { name: "DSGNBoom_BOOM-Distant_Ocular_Foundation.wav", url: "/sfx/DSGNBoom_BOOM-Distant_Ocular_Foundation.wav" },
  { name: "DSGNBoom_BOOM-Quake_Ocular_Foundation.wav", url: "/sfx/DSGNBoom_BOOM-Quake_Ocular_Foundation.wav" },
  { name: "DSGNWhsh_WHOOSH-Two Steps_Ocular_Foundation.wav", url: "/sfx/DSGNWhsh_WHOOSH-Two Steps_Ocular_Foundation.wav" },
  { name: "DSGNImpt_IMPACT-Time for Change_Ocular_Foundation.wav", url: "/sfx/DSGNImpt_IMPACT-Time for Change_Ocular_Foundation.wav" },
  { name: "DSGNImpt_IMPACT-Not What You Think_Ocular_Foundation.wav", url: "/sfx/DSGNImpt_IMPACT-Not What You Think_Ocular_Foundation.wav" },
];

const defaultSfxSettings = {
  select: { soundName: "pixel-select.wav", volume: 0.8 },
  burst: { soundName: "pixel-burst.wav", volume: 0.72 },
  unlock: { soundName: "DSGNBoom_BOOM-Distant_Ocular_Foundation.wav", volume: 0.62 },
  impact: { soundName: "DSGNBoom_BOOM-Quake_Ocular_Foundation.wav", volume: 0.72 },
  hover: { soundName: "pixel-select.wav", volume: 0.2 },
  mergerWhoosh: { soundName: "DSGNWhsh_WHOOSH-Two Steps_Ocular_Foundation.wav", volume: 0.95 },
  mergerImpact: { soundName: "DSGNImpt_IMPACT-Time for Change_Ocular_Foundation.wav", volume: 0.95 },
  mergerImpactExtra: { soundName: "DSGNImpt_IMPACT-Not What You Think_Ocular_Foundation.wav", volume: 0.95 },
};

const defaultThemeColors = {
  bg: "#000000",
  ink: "#e2e8f0",
  gold: "#73e4ce",
  blue: "#73e4ce",
  teal: "#73e4ce",
  focus: "#73e4ce",
  cardBg: "#04060a",
  cardBorder: "#73e4ce",
  cardGlow: "#73e4ce",
};

const themePresets = [
  {
    id: "solar-gold",
    label: "Solar Gold",
    colors: {
      bg: "#000000",
      ink: "#e8edf2",
      gold: "#f0c982",
      cardBg: "#050505",
    },
  },
  {
    id: "signal-teal",
    label: "Signal Teal",
    colors: {
      bg: "#000000",
      ink: "#e2e8f0",
      gold: "#73e4ce",
      cardBg: "#04060a",
    },
  },
  {
    id: "mono-white",
    label: "Mono White",
    colors: {
      bg: "#000000",
      ink: "#f1f5f9",
      gold: "#f8fafc",
      cardBg: "#030303",
    },
  },
  {
    id: "red-shift",
    label: "Red Shift",
    colors: {
      bg: "#030101",
      ink: "#f1e9e4",
      gold: "#ff9b73",
      cardBg: "#070302",
    },
  },
];

const defaultVisualSettings = {
  addOns: "off",
};

const defaultSingularityColors = {
  accretionRing: "#ffffff",
  glowInner: "#ffffff",
  glowOuter: "#ffffff",
};

const defaultSingularityStyle = {
  accretionWidth: 2.5,
  glowIntensity: 1,
  pulseIntensity: 0.5,
  nebulaIntensity: 1.0,
};

const defaultLayoutSettings = {
  contentMax: 1440,
  readerMax: 1080,
  chapterGap: 96,
  railWidth: 180,
  monoScale: 1.04,
};

const defaultStarSettings = {
  layer0Count: 340,
  layer1Count: 230,
  layer2Count: 120,
  cursorGravity: 0.22,
  baseDriftSpeed: 0.15,
  twinkleSpeed: 0.3,
  firstCollapseStars: 28,
  secondCollapseStars: 32,
  blackHoleGrowthRate: 2.5,
  blackHoleGravity: 0.45,
  blackHoleGravityReach: 0.74,
  mergerPace: 0.82,
  mergerPull: 1.08,
  mergerNearMisses: 0,
  finalGalaxySeedCount: 420,
  finalGalaxyReach: 1.35,
  finalGalaxyWarmth: 0.76,
};

const legacySparseStarDefaults = {
  layer0Count: 150,
  layer1Count: 100,
  layer2Count: 50,
};

function normalizeStarSettings(savedSettings = {}) {
  const next = { ...defaultStarSettings, ...savedSettings };
  const hadSlowPrototypeMergerDefaults =
    Number(savedSettings.mergerPace) === 0.55
    && Number(savedSettings.mergerNearMisses) === 2
    && savedSettings.mergerPull === undefined;
  if (hadSlowPrototypeMergerDefaults) {
    next.mergerPace = defaultStarSettings.mergerPace;
    next.mergerPull = defaultStarSettings.mergerPull;
    next.mergerNearMisses = defaultStarSettings.mergerNearMisses;
  }
  if (Number(savedSettings.mergerNearMisses) !== 0) {
    next.mergerNearMisses = 0;
  }

  const wasSparseDefault =
    Number(savedSettings.layer0Count) === legacySparseStarDefaults.layer0Count
    && Number(savedSettings.layer1Count) === legacySparseStarDefaults.layer1Count
    && Number(savedSettings.layer2Count) === legacySparseStarDefaults.layer2Count;

  return wasSparseDefault
    ? { ...next, ...defaultStarSettings }
    : next;
}

function deriveThemeColors(colors = {}) {
  const raw = { ...defaultThemeColors, ...colors };
  const primary = raw.gold || defaultThemeColors.gold;

  return {
    ...raw,
    gold: primary,
    blue: primary,
    teal: primary,
    focus: primary,
    cardBorder: primary,
    cardGlow: primary,
  };
}

function normalizeThemeColors(savedColors = {}) {
  const next = deriveThemeColors(savedColors);
  const legacyAccentValues = new Set(["#38bdf8", "#00f2fe", "#8fd8ff"]);

  if (!savedColors.blue || legacyAccentValues.has(String(savedColors.blue).toLowerCase())) {
    next.blue = next.gold;
  }
  if (!savedColors.teal || legacyAccentValues.has(String(savedColors.teal).toLowerCase())) {
    next.teal = next.gold;
  }
  if (!savedColors.focus || legacyAccentValues.has(String(savedColors.focus).toLowerCase())) {
    next.focus = next.gold;
  }

  return deriveThemeColors(next);
}

function compactNumber(value) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(value >= 10000000 ? 0 : 1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  }
  return String(value);
}

// Custom hook to calculate active chapter based on scroll
function useScrollState(sectionRefs) {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      document.documentElement.style.setProperty("--story-scroll", nextProgress.toFixed(4));
      setProgress(nextProgress);

      const viewportAnchor = window.innerHeight * 0.45;
      let nextActiveId = chapters[0].id;

      sectionRefs.current.forEach((node) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.top <= viewportAnchor) {
          nextActiveId = node.dataset.chapter;
        }
      });

      setActiveChapterId(nextActiveId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  return { activeChapterId, progress };
}



// ----------------- SIDEBAR PROGRESS NAVIGATION -----------------
function ChapterProgress({ activeChapterId, progress, chapters }) {
  return (
    <aside className="story-progress" aria-label="Report progress">
      <div className="story-progress__meter" aria-hidden="true">
        <span style={{ "--story-progress-value": Math.max(progress, 0.04) }} />
      </div>
      <nav>
        {chapters.map((chapter, index) => (
          <a
            className={chapter.id === activeChapterId ? "is-active" : ""}
            href={`#story-${chapter.id}`}
            key={chapter.id}
            onClick={(event) => {
              const target = document.getElementById(`story-${chapter.id}`);
              if (!target) return;
              event.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {chapter.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

// ----------------- EDITABLE TEXT HELPER -----------------
function EditableText({ id, value, onSave, isHtml = false, className = "", style = {}, editMode, textStyles, onFocus, selectedTextId, onStyleChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (document.activeElement !== ref.current) {
        if (isHtml) {
          ref.current.innerHTML = value;
        } else {
          ref.current.innerText = value;
        }
      }
    }
  }, [value, isHtml]);

  const handleBlur = () => {
    if (ref.current) {
      const text = isHtml ? ref.current.innerHTML : ref.current.innerText;
      if (text !== value) {
        onSave(text);
      }
    }
  };

  const customStyle = textStyles?.[id] || {};
  const mergedStyle = { ...style, ...customStyle };
  const isSelected = editMode && selectedTextId === id;
  const hasStyleOverrides = Object.keys(mergedStyle).length > 0;
  const wrapperStyle = editMode || isSelected || hasStyleOverrides
    ? { position: "relative", display: "inline-block", maxWidth: "100%", minHeight: mergedStyle.minHeight }
    : { display: "contents" };
  const contentStyle = editMode || isSelected
    ? { ...mergedStyle, display: "inline-block", width: "100%", minHeight: mergedStyle.minHeight }
    : (hasStyleOverrides ? mergedStyle : undefined);

  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startWidth = ref.current ? ref.current.getBoundingClientRect().width : 400;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(100, startWidth + deltaX);
      if (onStyleChange) {
        onStyleChange(id, "maxWidth", `${newWidth}px`);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <span style={wrapperStyle}>
      <span
        ref={ref}
        contentEditable={editMode}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onFocus={() => {
          if (editMode && onFocus) {
            onFocus(id);
          }
        }}
        className={`${editMode ? "editable-field-active" : ""} ${className}`}
        style={contentStyle}
      />
      {isSelected && (
        <span
          onMouseDown={startResize}
          style={{
            position: "absolute",
            right: "-12px",
            top: "0",
            bottom: "0",
            width: "8px",
            cursor: "ew-resize",
            background: "var(--story-gold)",
            boxShadow: "0 0 8px var(--story-line-strong)",
            borderRadius: "4px",
            zIndex: 10,
            display: "block"
          }}
          title="Drag to resize max width"
        />
      )}
    </span>
  );
}

// ----------------- SIGNAL CARD WITH 3D TILT & LIGHT SHINE -----------------
function SignalCard({
  chapter,
  editMode,
  index,
  onFocusText,
  onHoverSfx,
  onOpenExplorer,
  onSaveText,
  onStyleChange,
  selectedTextId,
  textStyles,
}) {
  const cardRef = useRef(null);
  const presentation = moduleCardPresentation[chapter.unlock] ?? fallbackModulePresentation;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--shine-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--shine-y', `${(y / rect.height) * 100}%`);

    const maxTilt = 10;
    const rotX = -((y / rect.height) - 0.5) * maxTilt;
    const rotY = ((x / rect.width) - 0.5) * maxTilt;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(5px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      className="story-chapter__signal"
      aria-label={`${chapter.unlock} status`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHoverSfx}
      style={{
        transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="story-signal-card-meta">
        <span>{presentation.role}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <strong>
        <EditableText
          id={`${chapter.id}-unlock`}
          value={chapter.unlock}
          editMode={editMode}
          textStyles={textStyles}
          onFocus={onFocusText}
          selectedTextId={selectedTextId}
          onStyleChange={onStyleChange}
          onSave={(val) => onSaveText(chapter.id, "unlock", val)}
        />
      </strong>
      <small>
        <EditableText
          id={`${chapter.id}-short`}
          value={chapter.short}
          editMode={editMode}
          textStyles={textStyles}
          onFocus={onFocusText}
          selectedTextId={selectedTextId}
          onStyleChange={onStyleChange}
          onSave={(val) => onSaveText(chapter.id, "short", val)}
        />
      </small>

      <button
        className="story-open-explorer-btn"
        onClick={() => onOpenExplorer(chapter.unlock)}
        type="button"
      >
        <span>{presentation.cta}</span>
        <ArrowRight size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

// ----------------- CHAPTER SECTION -----------------
function ChapterSection({ chapter, index, onSetRef, onOpenExplorer, editMode, onSaveText, onSaveBodyLine, textStyles, onFocusText, selectedTextId, onStyleChange, onHoverSfx, isActive }) {
  return (
    <section
      className={`story-chapter ${isActive ? "is-active" : "is-inactive"}`}
      data-chapter={chapter.id}
      id={`story-${chapter.id}`}
      ref={(node) => {
        onSetRef(index, node);
      }}
    >
      <div className="story-chapter__copy">
        <span className="story-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="story-label">
          <EditableText
            id={`${chapter.id}-label`}
            value={chapter.label}
            editMode={editMode}
            textStyles={textStyles}
            onFocus={onFocusText}
            selectedTextId={selectedTextId}
            onStyleChange={onStyleChange}
            onSave={(val) => onSaveText(chapter.id, "label", val)}
          />
        </p>
        <h2>
          <EditableText
            id={`${chapter.id}-title`}
            value={chapter.title}
            editMode={editMode}
            textStyles={textStyles}
            onFocus={onFocusText}
            selectedTextId={selectedTextId}
            onStyleChange={onStyleChange}
            onSave={(val) => onSaveText(chapter.id, "title", val)}
          />
        </h2>
        {chapter.body.map((line, lineIdx) => (
          <p key={lineIdx}>
            <EditableText
              id={`${chapter.id}-body-${lineIdx}`}
              value={line}
              editMode={editMode}
              textStyles={textStyles}
              onFocus={onFocusText}
              selectedTextId={selectedTextId}
              onStyleChange={onStyleChange}
              onSave={(val) => onSaveBodyLine(chapter.id, lineIdx, val)}
            />
          </p>
        ))}
      </div>

      {/* Interactive Signal Card */}
      <SignalCard
        chapter={chapter}
        editMode={editMode}
        index={index}
        onFocusText={onFocusText}
        onHoverSfx={onHoverSfx}
        onOpenExplorer={onOpenExplorer}
        onSaveText={onSaveText}
        onStyleChange={onStyleChange}
        selectedTextId={selectedTextId}
        textStyles={textStyles}
      />
    </section>
  );
}

// ----------------- INLINE WIDGET: RIVAL STORIES -----------------
function RivalStories({
  categories,
  comparables,
  editMode,
  onFocusText,
  onSaveCategoryText,
  onSaveComparableText,
  onSaveSectionText,
  onSelectSfx,
  onStyleChange,
  projectName,
  sectionText,
  selectedTextId,
  textStyles,
}) {
  const [activeCategoryId, setActiveCategoryId] = useState(rivalCategories[0].id);
  const comparableById = useMemo(() => new Map(comparables.map((game) => [game.id, game])), [comparables]);

  const formattedCategories = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      summary: cat.summary.replaceAll("Refractured", projectName)
    }));
  }, [categories, projectName]);

  const activeCategory = formattedCategories.find((category) => category.id === activeCategoryId) ?? formattedCategories[0];
  const knownGames = (activeCategory.items ?? []).map((id) => comparableById.get(id)).filter(Boolean);
  const researchGaps = activeCategory.researchGapItems ?? [];

  return (
    <section className="story-rival-stories" id="rival-stories">
      <div className="story-section-heading">
        <p className="story-label">
          <EditableText
            id="rivals-label"
            value={sectionText.label}
            editMode={editMode}
            textStyles={textStyles}
            onFocus={onFocusText}
            selectedTextId={selectedTextId}
            onStyleChange={onStyleChange}
            onSave={(val) => onSaveSectionText("label", val)}
          />
        </p>
        <h2>
          <EditableText
            id="rivals-title"
            value={sectionText.title}
            editMode={editMode}
            textStyles={textStyles}
            onFocus={onFocusText}
            selectedTextId={selectedTextId}
            onStyleChange={onStyleChange}
            onSave={(val) => onSaveSectionText("title", val)}
          />
        </h2>
        <p>
          <EditableText
            id="rivals-desc"
            value={sectionText.desc}
            editMode={editMode}
            textStyles={textStyles}
            onFocus={onFocusText}
            selectedTextId={selectedTextId}
            onStyleChange={onStyleChange}
            onSave={(val) => onSaveSectionText("desc", val)}
          />
        </p>
      </div>
      <div className="story-rival-accordion">
        <div className="story-rival-lanes" aria-label="Comparable lanes">
          {formattedCategories.map((category, index) => (
            <button
              className={category.id === activeCategoryId ? "is-active" : ""}
              data-rival-id={category.id}
              key={category.id}
              onClick={() => {
                onSelectSfx?.();
                setActiveCategoryId(category.id);
              }}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>
                <EditableText
                  id={`rival-category-${category.id}-title`}
                  value={category.title}
                  editMode={editMode}
                  textStyles={textStyles}
                  onFocus={onFocusText}
                  selectedTextId={selectedTextId}
                  onStyleChange={onStyleChange}
                  onSave={(val) => onSaveCategoryText(category.id, "title", val)}
                />
              </strong>
              <small>
                <EditableText
                  id={`rival-category-${category.id}-summary`}
                  value={category.summary}
                  editMode={editMode}
                  textStyles={textStyles}
                  onFocus={onFocusText}
                  selectedTextId={selectedTextId}
                  onStyleChange={onStyleChange}
                  onSave={(val) => onSaveCategoryText(category.id, "summary", val)}
                />
              </small>
            </button>
          ))}
        </div>
        <article className="story-rival-panel">
          <header>
            <span>Selected lens</span>
            <h3>
              <EditableText
                id={`rival-active-${activeCategory.id}-title`}
                value={activeCategory.title}
                editMode={editMode}
                textStyles={textStyles}
                onFocus={onFocusText}
                selectedTextId={selectedTextId}
                onStyleChange={onStyleChange}
                onSave={(val) => onSaveCategoryText(activeCategory.id, "title", val)}
              />
            </h3>
            <p>
              <EditableText
                id={`rival-active-${activeCategory.id}-summary`}
                value={activeCategory.summary}
                editMode={editMode}
                textStyles={textStyles}
                onFocus={onFocusText}
                selectedTextId={selectedTextId}
                onStyleChange={onStyleChange}
                onSave={(val) => onSaveCategoryText(activeCategory.id, "summary", val)}
              />
            </p>
          </header>
          <div className="story-rival-mini-reports">
            {knownGames.map((game) => {
              const readField = game.projectRead
                ? "projectRead"
                : game[`${projectName.toLowerCase()}Read`]
                  ? `${projectName.toLowerCase()}Read`
                  : game.refracturedRead
                    ? "refracturedRead"
                    : "insight";
              const useField = game.projectUse
                ? "projectUse"
                : game[`${projectName.toLowerCase()}Use`]
                  ? `${projectName.toLowerCase()}Use`
                  : game.refracturedUse
                    ? "refracturedUse"
                    : "borrow";
              const readText = game[readField] ?? "";
              const useText = game[useField] ?? "";

              return (
                <section className="story-rival-mini-report" key={game.id}>
                  <img alt="" src={game.imageUrl} />
                  <div>
                    <span>
                      <EditableText
                        id={`rival-game-${game.id}-role`}
                        value={game.role}
                        editMode={editMode}
                        textStyles={textStyles}
                        onFocus={onFocusText}
                        selectedTextId={selectedTextId}
                        onStyleChange={onStyleChange}
                        onSave={(val) => onSaveComparableText(game.id, "role", val)}
                      />
                    </span>
                    <h4>
                      <EditableText
                        id={`rival-game-${game.id}-title`}
                        value={game.title}
                        editMode={editMode}
                        textStyles={textStyles}
                        onFocus={onFocusText}
                        selectedTextId={selectedTextId}
                        onStyleChange={onStyleChange}
                        onSave={(val) => onSaveComparableText(game.id, "title", val)}
                      />
                    </h4>
                    <p>
                      <EditableText
                        id={`rival-game-${game.id}-read`}
                        value={readText}
                        editMode={editMode}
                        textStyles={textStyles}
                        onFocus={onFocusText}
                        selectedTextId={selectedTextId}
                        onStyleChange={onStyleChange}
                        onSave={(val) => onSaveComparableText(game.id, readField, val)}
                      />
                    </p>
                    <dl>
                      <div>
                        <dt>Reviews</dt>
                        <dd>{compactNumber(game.steamSnapshot.reviewsTotal)}</dd>
                      </div>
                      <div>
                        <dt>Positive</dt>
                        <dd>{game.steamSnapshot.positiveRate}</dd>
                      </div>
                      <div>
                        <dt>CCU</dt>
                        <dd>{compactNumber(game.steamSnapshot.currentPlayers)}</dd>
                      </div>
                    </dl>
                    <div className="story-rival-read">
                      <p>
                        <strong>Borrow</strong>
                        <EditableText
                          id={`rival-game-${game.id}-use`}
                          value={useText}
                          editMode={editMode}
                          textStyles={textStyles}
                          onFocus={onFocusText}
                          selectedTextId={selectedTextId}
                          onStyleChange={onStyleChange}
                          onSave={(val) => onSaveComparableText(game.id, useField, val)}
                        />
                      </p>
                      <p>
                        <strong>Avoid</strong>
                        <EditableText
                          id={`rival-game-${game.id}-avoid`}
                          value={game.avoid}
                          editMode={editMode}
                          textStyles={textStyles}
                          onFocus={onFocusText}
                          selectedTextId={selectedTextId}
                          onStyleChange={onStyleChange}
                          onSave={(val) => onSaveComparableText(game.id, "avoid", val)}
                        />
                      </p>
                    </div>
                    <a className="story-rival-link" href={game.steamUrl} rel="noreferrer" target="_blank">
                      Steam page <ExternalLink aria-hidden="true" size={14} />
                    </a>
                  </div>
                </section>
              );
            })}
            {researchGaps.length > 0 ? (
              <section className="story-rival-gap-stack">
                <span>Research refresh needed</span>
                <h4>Broaden the combat-feel set before making the final call.</h4>
                <p>
                  These are useful candidates, but they still need current Steam metadata, review themes, pricing,
                  player-count context, and positioning notes before they can be used as quantified evidence.
                </p>
                <ul>
                  {researchGaps.map((title) => (
                    <li key={title}>{title}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}

// ----------------- INLINE WIDGET: PROMISE BUILDER -----------------
function PromiseBuilder({
  editMode,
  onFocusText,
  onSaveOptionText,
  onSaveSectionText,
  onSelectSfx,
  onStyleChange,
  positioningAngles = [],
  sectionText,
  selectedTextId,
  textStyles,
}) {
  const options = positioningAngles.length > 0 ? positioningAngles : promiseOptions;
  const [activeId, setActiveId] = useState(options[0]?.id);

  const resolvedActiveId = options.some(o => o.id === activeId) ? activeId : (options[0]?.id ?? null);
  const activePromise = options.find((option) => option.id === resolvedActiveId) ?? options[0];

  if (!activePromise) return null;

  const headline = activePromise.steamPromise ?? activePromise.headline;
  const tags = activePromise.tagStack ?? activePromise.tags ?? [];
  const proof = activePromise.trailerBeats ?? activePromise.proof ?? [];

  return (
    <section className="story-promise-builder" id="promise-builder">
      <div className="story-section-heading">
        <p className="story-label">
          <EditableText
            id="promise-label"
            value={sectionText.label}
            editMode={editMode}
            textStyles={textStyles}
            onFocus={onFocusText}
            selectedTextId={selectedTextId}
            onStyleChange={onStyleChange}
            onSave={(val) => onSaveSectionText("label", val)}
          />
        </p>
        <h2>
          <EditableText
            id="promise-title"
            value={sectionText.title}
            editMode={editMode}
            textStyles={textStyles}
            onFocus={onFocusText}
            selectedTextId={selectedTextId}
            onStyleChange={onStyleChange}
            onSave={(val) => onSaveSectionText("title", val)}
          />
        </h2>
        <p>
          <EditableText
            id="promise-desc"
            value={sectionText.desc}
            editMode={editMode}
            textStyles={textStyles}
            onFocus={onFocusText}
            selectedTextId={selectedTextId}
            onStyleChange={onStyleChange}
            onSave={(val) => onSaveSectionText("desc", val)}
          />
        </p>
      </div>
      <div className="story-promise-lab">
        <div className="story-promise-options" aria-label="Promise options">
          {options.map((option, optionIndex) => (
            <button
              className={option.id === resolvedActiveId ? "is-active" : ""}
              key={option.id}
              onClick={() => {
                onSelectSfx?.();
                setActiveId(option.id);
              }}
              type="button"
            >
              <span className="story-promise-option-index">{String(optionIndex + 1).padStart(2, "0")}</span>
              <EditableText
                id={`promise-option-${option.id}-label`}
                value={option.label}
                editMode={editMode}
                textStyles={textStyles}
                onFocus={onFocusText}
                selectedTextId={selectedTextId}
                onStyleChange={onStyleChange}
                onSave={(val) => onSaveOptionText(option.id, "label", val)}
              />
            </button>
          ))}
        </div>
        <article className="story-store-card">
          <span>Steam first screen</span>
          <h3>
            <EditableText
              id={`promise-option-${activePromise.id}-headline`}
              value={headline}
              editMode={editMode}
              textStyles={textStyles}
              onFocus={onFocusText}
              selectedTextId={selectedTextId}
              onStyleChange={onStyleChange}
              onSave={(val) => onSaveOptionText(activePromise.id, activePromise.steamPromise ? "steamPromise" : "headline", val)}
            />
          </h3>
          <div className="story-tag-row">
            {tags.map((tag, tagIdx) => (
              <small key={`${activePromise.id}-tag-${tagIdx}`}>
                <EditableText
                  id={`promise-option-${activePromise.id}-tag-${tagIdx}`}
                  value={tag}
                  editMode={editMode}
                  textStyles={textStyles}
                  onFocus={onFocusText}
                  selectedTextId={selectedTextId}
                  onStyleChange={onStyleChange}
                  onSave={(val) => {
                    const nextTags = tags.map((item, idx) => idx === tagIdx ? val : item);
                    onSaveOptionText(activePromise.id, activePromise.tagStack ? "tagStack" : "tags", nextTags);
                  }}
                />
              </small>
            ))}
          </div>
          <ol>
            {proof.map((item, proofIdx) => (
              <li key={`${activePromise.id}-proof-${proofIdx}`}>
                <EditableText
                  id={`promise-option-${activePromise.id}-proof-${proofIdx}`}
                  value={item}
                  editMode={editMode}
                  textStyles={textStyles}
                  onFocus={onFocusText}
                  selectedTextId={selectedTextId}
                  onStyleChange={onStyleChange}
                  onSave={(val) => {
                    const nextProof = proof.map((entry, idx) => idx === proofIdx ? val : entry);
                    onSaveOptionText(activePromise.id, activePromise.trailerBeats ? "trailerBeats" : "proof", nextProof);
                  }}
                />
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}

// ----------------- INLINE WIDGET: PROOF BOARD -----------------
function ProofBoard({
  editMode,
  gates,
  onFocusText,
  onSaveGateText,
  onStyleChange,
  selectedTextId,
  textStyles,
}) {
  return (
    <section className="story-proof-board" id="proof-board">
      <div className="story-section-heading">
        <p className="story-label">Proof board</p>
        <h2>The report ends with choices the team can test.</h2>
      </div>
      <div className="story-proof-path">
        {gates.map(([title, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>
              <EditableText
                id={`proof-gate-${index}-title`}
                value={title}
                editMode={editMode}
                textStyles={textStyles}
                onFocus={onFocusText}
                selectedTextId={selectedTextId}
                onStyleChange={onStyleChange}
                onSave={(val) => onSaveGateText(index, 0, val)}
              />
            </h3>
            <p>
              <EditableText
                id={`proof-gate-${index}-body`}
                value={body}
                editMode={editMode}
                textStyles={textStyles}
                onFocus={onFocusText}
                selectedTextId={selectedTextId}
                onStyleChange={onStyleChange}
                onSave={(val) => onSaveGateText(index, 1, val)}
              />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

// ----------------- INLINE WIDGET: DEEP DIVE LAUNCHER -----------------
function DeepDiveLauncher({ comparables, onOpenExplorer }) {
  const unlocks = [
    { label: "Market Map", detail: "Positioning field with stable inspector", icon: LineChart, key: "Market Map" },
    { label: "Rival Stories", detail: `${comparables.length} sourced comparables`, icon: ExternalLink, key: "Rival Stories" },
    { label: "Promise Builder", detail: "Steam page language playground", icon: MousePointer2, key: "Promise Builder" },
    { label: "Evidence Vault", detail: "Facts, estimates, interpretations, gaps", icon: Database, key: "Evidence Vault" },
  ];

  return (
    <section className="story-deep-dives" id="deep-dives">
      <div className="story-section-heading">
        <p className="story-label">Unlocked workspace</p>
        <h2>After the story, give power users the controls.</h2>
        <p>
          The report can be read end-to-end first. Then the same evidence opens into deeper tools for people who want to
          compare, change hypotheses, and audit sources.
        </p>
      </div>
      <div className="story-deep-grid">
        {unlocks.map(({ label, detail, icon: Icon, key }) => {
          const presentation = moduleCardPresentation[key] ?? fallbackModulePresentation;

          return (
            <article key={label}>
              <Icon aria-hidden="true" />
              <span>{presentation.role}</span>
              <h3>{label}</h3>
              <p>{detail}</p>
              <button
                onClick={() => onOpenExplorer(key)}
                type="button"
              >
                <span>{presentation.cta}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// Helper to convert hex colors to rgba
function hexToRgba(hex, alpha) {
  if (!hex || hex === "transparent") return "rgba(0, 0, 0, 0)";
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return "rgba(0, 0, 0, 0)";
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isVisibleColor(color) {
  return Boolean(color && color !== "transparent");
}

function colorInputValue(color, fallback = "#ffffff") {
  return isVisibleColor(color) ? color : fallback;
}

// ----------------- MAIN REPORT COMPONENT -----------------
export default function GuidedStoryReport({ report = refracturedPremiumReport, forceDemoMode = false }) {
  const rootRef = useRef(null);
  const sectionRefs = useRef([]);
  const canvasRef = useRef(null);

  // Live Report Data (loaded from props, saved in localStorage for persistence)
  const [reportData, setReportData] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_live_report_data");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("localStorage read failed:", e);
    }
    return report;
  });

  const [editMode, setEditMode] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [textEditorOpen, setTextEditorOpen] = useState(false);
  const [visualEditorTab, setVisualEditorTab] = useState("web");

  // Advanced Visual Customizer States
  const [selectedTextId, setSelectedTextId] = useState(null);
  const isDemoMode = useMemo(() => {
    if (forceDemoMode) return true;
    if (typeof window === "undefined") return false;
    return (
      import.meta.env.VITE_PUBLIC_DEMO === "true"
      || window.location.hostname.includes("indievaders-demo")
      || window.location.search.includes("demo=true")
      || window.location.hash.includes("demo=true")
    );
  }, [forceDemoMode]);

  const handleSelectText = (id) => {
    if (isDemoMode) return;
    setSelectedTextId(id);
    if (id !== null) {
      setTextEditorOpen(true);
      if (typeof playCustomSfx === 'function') {
        playCustomSfx('select');
      }
    }
  };

  const [textStyles, setTextStyles] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_text_styles");
      if (saved) return JSON.parse(saved);
    } catch {
      /* ignore */
    }
    return {};
  });

  const handleTextStyleChange = (id, styleKey, value) => {
    setTextStyles(prev => {
      const next = {
        ...prev,
        [id]: {
          ...(prev[id] || {}),
          [styleKey]: value
        }
      };
      try {
        localStorage.setItem("indievaders_text_styles", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const [singularityColors, setSingularityColors] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_singularity_colors");
      if (saved) return { ...defaultSingularityColors, ...JSON.parse(saved) };
    } catch {
      /* ignore */
    }
    return defaultSingularityColors;
  });

  useEffect(() => {
    try {
      localStorage.setItem("indievaders_singularity_colors", JSON.stringify(singularityColors));
    } catch {
      /* ignore */
    }
  }, [singularityColors]);

  const [singularityStyle, setSingularityStyle] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_singularity_style");
      if (saved) return { ...defaultSingularityStyle, ...JSON.parse(saved) };
    } catch {
      /* ignore */
    }
    return defaultSingularityStyle;
  });

  useEffect(() => {
    try {
      localStorage.setItem("indievaders_singularity_style", JSON.stringify(singularityStyle));
    } catch {
      /* ignore */
    }
  }, [singularityStyle]);

  const [musicEnabled, setMusicEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_music_enabled");
      return saved !== null ? saved === "true" : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("indievaders_music_enabled", String(musicEnabled));
    } catch {
      // ignore
    }
  }, [musicEnabled]);

  const [sfxVolume, setSfxVolume] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_sfx_volume");
      return saved !== null ? parseFloat(saved) : 0.4;
    } catch {
      return 0.4;
    }
  });

  const [musicVolume, setMusicVolume] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_music_volume");
      return saved !== null ? parseFloat(saved) : 0.03;
    } catch {
      return 0.03;
    }
  });

  const [ambientLayer, setAmbientLayer] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_ambient_layer");
      return saved !== null ? saved : "procedural";
    } catch {
      return "procedural";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("indievaders_sfx_volume", String(sfxVolume));
    } catch {
      // ignore
    }
  }, [sfxVolume]);

  useEffect(() => {
    try {
      localStorage.setItem("indievaders_music_volume", String(musicVolume));
    } catch {
      // ignore
    }
  }, [musicVolume]);

  useEffect(() => {
    try {
      localStorage.setItem("indievaders_ambient_layer", ambientLayer);
    } catch {
      // ignore
    }
  }, [ambientLayer]);

  const [starSettings, setStarSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_star_settings");
      if (saved) {
        return normalizeStarSettings(JSON.parse(saved));
      }
    } catch {
      /* ignore */
    }
    return defaultStarSettings;
  });

  const soundLibrary = defaultSoundLibrary;
  const sfxSettings = defaultSfxSettings;

  const [rivalsText, setRivalsText] = useState(() => {
    const defaults = {
      label: "Rival stories",
      title: "Open games as clues, not as a spreadsheet.",
      desc: "A client should first see why a reference matters. The deeper workspace can keep the full table, but the report should turn each game into a decision: borrow, avoid, or refresh the data."
    };
    try {
      const saved = localStorage.getItem("indievaders_rivals_text");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaults;
  });

  const saveRivalsText = (field, value) => {
    setRivalsText(prev => {
      const next = { ...prev, [field]: value };
      try {
        localStorage.setItem("indievaders_rivals_text", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const [promiseText, setPromiseText] = useState(() => {
    const defaults = {
      label: "Storefront promise",
      title: "Let the promise change the proof.",
      desc: "This is where a paid report becomes a tool: choosing a public angle changes the tag stack, trailer beat, and proof gates instead of showing another block of advice."
    };
    try {
      const saved = localStorage.getItem("indievaders_promise_text");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaults;
  });

  const savePromiseText = (field, value) => {
    setPromiseText(prev => {
      const next = { ...prev, [field]: value };
      try {
        localStorage.setItem("indievaders_promise_text", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const [proofBoardGates, setProofBoardGates] = useState(() => {
    const defaults = [
      ["Hook", "Players understand the fantasy before systems are explained."],
      ["Feel", "The first fight earns a 4/5 combat-feel read with low confusion."],
      ["Return", "Players ask what changes next and want another attempt."],
      ["Promise", "Steam copy names only what the playable proof can show."],
    ];
    try {
      const saved = localStorage.getItem("indievaders_proof_board_gates");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaults;
  });

  const [rivalCategoriesState, setRivalCategoriesState] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_rival_categories");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return rivalCategories;
  });

  const [promiseOptionsState, setPromiseOptionsState] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_promise_options");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return promiseOptions;
  });

  const saveComparableText = (gameId, field, value) => {
    setReportData(prev => {
      const updateGame = (games) => games.map(g => g.id === gameId ? { ...g, [field]: value } : g);
      let next;
      if (prev.marketEvidence && prev.marketEvidence.comparables) {
        next = {
          ...prev,
          marketEvidence: {
            ...prev.marketEvidence,
            comparables: updateGame(prev.marketEvidence.comparables)
          }
        };
      } else {
        next = {
          ...prev,
          comparables: updateGame(prev.comparables || [])
        };
      }
      try {
        localStorage.setItem("indievaders_live_report_data", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const saveCategoryText = (catId, field, value) => {
    setRivalCategoriesState(prev => {
      const next = prev.map(cat => cat.id === catId ? { ...cat, [field]: value } : cat);
      try {
        localStorage.setItem("indievaders_rival_categories", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const savePromiseOptionText = (optionId, field, value) => {
    setPromiseOptionsState(prev => {
      const next = prev.map(opt => opt.id === optionId ? { ...opt, [field]: value } : opt);
      try {
        localStorage.setItem("indievaders_promise_options", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    setReportData(prev => {
      if (!Array.isArray(prev.positioningAngles) || !prev.positioningAngles.some(opt => opt.id === optionId)) {
        return prev;
      }
      const next = {
        ...prev,
        positioningAngles: prev.positioningAngles.map(opt => opt.id === optionId ? { ...opt, [field]: value } : opt),
      };
      try {
        localStorage.setItem("indievaders_live_report_data", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const saveProofBoardGateText = (gateIdx, subIdx, value) => {
    setProofBoardGates(prev => {
      const next = [...prev];
      next[gateIdx] = [...next[gateIdx]];
      next[gateIdx][subIdx] = value;
      try {
        localStorage.setItem("indievaders_proof_board_gates", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const [heroData, setHeroData] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_live_hero_data");
      if (saved) return JSON.parse(saved);
    } catch {
      /* ignore */
    }
    return {
      label: "Client report direction",
      title: "Read the market like a journey. Open the tools when the question gets interesting.",
      desc: "This unified report combines step-by-step scrollytelling with interactive storefront promise playground, and deep-dive evidence ledgers for power users."
    };
  });

  const saveHeroData = (key, val) => {
    setHeroData(prev => {
      const next = { ...prev, [key]: val };
      try {
        localStorage.setItem("indievaders_live_hero_data", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const [chaptersState, setChaptersState] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_live_chapters");
      if (saved) return JSON.parse(saved);
    } catch {
      /* ignore */
    }
    return chapters;
  });

  const saveChapterText = (chapterId, field, value) => {
    setChaptersState(prev => {
      const next = prev.map(ch => {
        if (ch.id === chapterId) {
          return { ...ch, [field]: value };
        }
        return ch;
      });
      try {
        localStorage.setItem("indievaders_live_chapters", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const saveChapterBodyLine = (chapterId, lineIndex, value) => {
    setChaptersState(prev => {
      const next = prev.map(ch => {
        if (ch.id === chapterId) {
          const nextBody = [...ch.body];
          nextBody[lineIndex] = value;
          return { ...ch, body: nextBody };
        }
        return ch;
      });
      try {
        localStorage.setItem("indievaders_live_chapters", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const [themeColors, setThemeColors] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_theme_colors");
      if (saved) return normalizeThemeColors(JSON.parse(saved));
    } catch {
      /* ignore */
    }
    return defaultThemeColors;
  });

  const [visualSettings, setVisualSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_visual_settings");
      if (saved) return { ...defaultVisualSettings, ...JSON.parse(saved) };
    } catch {
      /* ignore */
    }
    return defaultVisualSettings;
  });

  useEffect(() => {
    const liveTheme = deriveThemeColors(themeColors);
    const setStoryVar = (key, value) => {
      document.documentElement.style.setProperty(key, value);
      document.querySelectorAll(".story-prototype").forEach((node) => {
        node.style.setProperty(key, value);
      });
    };
    setStoryVar("--story-bg", liveTheme.bg);
    setStoryVar("--story-ink", liveTheme.ink);
    setStoryVar("--story-gold", liveTheme.gold);
    setStoryVar("--story-blue", liveTheme.blue);
    setStoryVar("--story-teal", liveTheme.teal);
    setStoryVar("--story-red", liveTheme.focus);
    setStoryVar("--story-line", hexToRgba(liveTheme.gold, 0.12));
    setStoryVar("--story-line-strong", hexToRgba(liveTheme.gold, 0.32));
    setStoryVar("--story-card-bg", hexToRgba(liveTheme.cardBg, 0.15));
    setStoryVar("--story-card-border", hexToRgba(liveTheme.cardBorder, 0.08));
    setStoryVar("--story-card-glow", hexToRgba(liveTheme.cardGlow, 0.06));
    try {
      localStorage.setItem("indievaders_theme_colors", JSON.stringify(liveTheme));
    } catch {
      /* ignore */
    }
  }, [themeColors]);

  const updateThemeColor = useCallback((key, value) => {
    setThemeColors(prev => deriveThemeColors({ ...prev, [key]: value }));
  }, [setThemeColors]);

  const applyThemePreset = useCallback((presetId) => {
    const preset = themePresets.find((item) => item.id === presetId);
    if (!preset) return;
    setThemeColors(deriveThemeColors(preset.colors));
  }, [setThemeColors]);

  const updateVisualSetting = useCallback((key, value) => {
    setVisualSettings(prev => ({ ...defaultVisualSettings, ...prev, [key]: value }));
  }, [setVisualSettings]);

  useEffect(() => {
    try {
      localStorage.setItem("indievaders_visual_settings", JSON.stringify({ ...defaultVisualSettings, ...visualSettings }));
    } catch {
      /* ignore */
    }
  }, [visualSettings]);

  const [layoutSettings, setLayoutSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_layout_settings");
      if (saved) return { ...defaultLayoutSettings, ...JSON.parse(saved) };
    } catch {
      /* ignore */
    }
    return defaultLayoutSettings;
  });

  useEffect(() => {
    const liveLayout = { ...defaultLayoutSettings, ...layoutSettings };
    const setStoryVar = (key, value) => {
      document.documentElement.style.setProperty(key, value);
      document.querySelectorAll(".story-prototype").forEach((node) => {
        node.style.setProperty(key, value);
      });
    };
    setStoryVar("--story-content-max", `${liveLayout.contentMax}px`);
    setStoryVar("--story-reader-max", `${liveLayout.readerMax}px`);
    setStoryVar("--story-chapter-gap", `${liveLayout.chapterGap}px`);
    setStoryVar("--story-rail-width", `${liveLayout.railWidth}px`);
    setStoryVar("--story-mono-scale", liveLayout.monoScale);
    try {
      localStorage.setItem("indievaders_layout_settings", JSON.stringify(liveLayout));
    } catch {
      /* ignore */
    }
  }, [layoutSettings]);

  const updateLayoutSetting = useCallback((key, value) => {
    setLayoutSettings(prev => ({ ...defaultLayoutSettings, ...prev, [key]: value }));
  }, [setLayoutSettings]);

  const updateSingularityColor = useCallback((key, value) => {
    setSingularityColors(prev => ({ ...defaultSingularityColors, ...prev, [key]: value }));
  }, [setSingularityColors]);

  const updateSingularityStyle = useCallback((key, value) => {
    setSingularityStyle(prev => ({ ...defaultSingularityStyle, ...prev, [key]: value }));
  }, [setSingularityStyle]);

  const updateStarSetting = useCallback((key, value) => {
    setStarSettings(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("indievaders_star_settings", JSON.stringify(next));
      return next;
    });
  }, [setStarSettings]);

  const justCollapsedRef = useRef(false);
  const feedComboRef = useRef(1);
  const lastFeedTimeRef = useRef(0);
  const lastBurstSfxTimeRef = useRef(0);
  // Deep dive drawer state
  const [activeDrawerSection, setActiveDrawerSection] = useState(null); // null, "Market Map", "Player DNA", "Rival Stories", "Promise Builder", "Evidence Vault"

  // Evidence Ledger Drawer States (for click hooks inside dashboards)
  const [activeEvidenceRefs, setActiveEvidenceRefs] = useState([]);
  const [evidenceDrawerOpen, setEvidenceDrawerOpen] = useState(false);
  const [showAllEvidence, setShowAllEvidence] = useState(false);

  // Sound effects enabled state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Animations enabled state (saved in localStorage)
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_animations_enabled");
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  });

  const animationsEnabledRef = useRef(animationsEnabled);
  const frozenScrollYRef = useRef(null);
  useEffect(() => {
    animationsEnabledRef.current = animationsEnabled;
    frozenScrollYRef.current = animationsEnabled ? null : window.scrollY;
  }, [animationsEnabled]);

  // Global listener for Escape key to close the drawer overlay and customizer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDrawerSection(null);
        setCustomizerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll logic
  const { activeChapterId, progress } = useScrollState(sectionRefs);

  const projectName = reportData.meta?.projectName ?? "Refractured";

  const comparables = useMemo(
    () => reportData.marketEvidence?.comparables ?? reportData.comparables ?? [],
    [reportData]
  );

  const handleSetRef = (index, node) => {
    sectionRefs.current[index] = node;
  };

  // Sound System oscillators
  const audioContextRef = useRef(null);
  const playSfx = useCallback((name) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const context = audioContextRef.current;
      if (context.state === 'suspended') {
        context.resume();
      }

      const now = context.currentTime;
      const osc = context.createOscillator();
      const gain = context.createGain();
      const vol = sfxVolumeRef.current;

      if (name === 'select') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.1);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.2 * vol, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(context.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (name === 'burst') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.3 * vol, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(context.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (name === 'collapse') {
        const sub = context.createOscillator();
        const subGain = context.createGain();
        const crack = context.createOscillator();
        const crackGain = context.createGain();

        sub.type = 'sine';
        sub.frequency.setValueAtTime(72, now);
        sub.frequency.exponentialRampToValueAtTime(32, now + 0.24);
        subGain.gain.setValueAtTime(0.001, now);
        subGain.gain.exponentialRampToValueAtTime(0.42 * vol, now + 0.008);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        crack.type = 'triangle';
        crack.frequency.setValueAtTime(190, now);
        crack.frequency.exponentialRampToValueAtTime(75, now + 0.1);
        crackGain.gain.setValueAtTime(0.001, now);
        crackGain.gain.exponentialRampToValueAtTime(0.12 * vol, now + 0.004);
        crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        sub.connect(subGain);
        crack.connect(crackGain);
        subGain.connect(context.destination);
        crackGain.connect(context.destination);
        sub.start(now);
        crack.start(now);
        sub.stop(now + 0.3);
        crack.stop(now + 0.14);
      } else if (name === 'unlock') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.setValueAtTime(480, now + 0.08);
        osc.frequency.setValueAtTime(640, now + 0.16);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.25 * vol, now + 0.01);
        gain.gain.setValueAtTime(0.25 * vol, now + 0.08);
        gain.gain.setValueAtTime(0.25 * vol, now + 0.16);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(context.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (name === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.04 * vol, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        osc.connect(gain);
        gain.connect(context.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch (e) {
      console.log('Synth SFX blocked or failed:', e);
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (!soundEnabled) return undefined;

    const armAudio = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
        }
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume().catch(() => {});
        }
      } catch {
        // Audio may remain blocked until the next trusted user gesture.
      }
    };

    window.addEventListener("pointerdown", armAudio, { passive: true });
    window.addEventListener("keydown", armAudio);

    return () => {
      window.removeEventListener("pointerdown", armAudio);
      window.removeEventListener("keydown", armAudio);
    };
  }, [soundEnabled]);

  // Keep singularityColors mutable reference to avoid tearing down the canvas useEffect on color shifts
  const singularityColorsRef = useRef(singularityColors);
  useEffect(() => {
    singularityColorsRef.current = singularityColors;
  }, [singularityColors]);

  const singularityStyleRef = useRef(singularityStyle);
  useEffect(() => {
    singularityStyleRef.current = singularityStyle;
  }, [singularityStyle]);

  // Keep starSettings mutable reference to avoid tearing down canvas useEffect on speed/attraction/twinkle shifts
  const starSettingsRef = useRef(starSettings);
  useEffect(() => {
    starSettingsRef.current = starSettings;
  }, [starSettings]);

  const ambientNodesRef = useRef(null);
  const ambientAudioRef = useRef(null);

  // Volume refs to avoid re-triggering audio hooks
  const sfxVolumeRef = useRef(sfxVolume);
  useEffect(() => {
    sfxVolumeRef.current = sfxVolume;
  }, [sfxVolume]);

  const musicVolumeRef = useRef(musicVolume);
  useEffect(() => {
    musicVolumeRef.current = musicVolume;
    if (ambientNodesRef.current && audioContextRef.current) {
      try {
        ambientNodesRef.current.gainNode.gain.setValueAtTime(musicVolume, audioContextRef.current.currentTime);
      } catch {
        // ignore
      }
    }
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = Math.max(0, Math.min(1, musicVolume));
    }
  }, [musicVolume]);

  const customAudioWarningKeysRef = useRef(new Set());
  const warnCustomAudioFailure = useCallback((err) => {
    const name = err?.name ?? "";
    const message = err?.message ?? String(err ?? "");
    if (name === "NotAllowedError" || message.includes("user didn't interact")) return;

    const key = `${name}:${message}`;
    if (customAudioWarningKeysRef.current.has(key)) return;
    customAudioWarningKeysRef.current.add(key);
    console.warn("Custom audio play failed:", err);
  }, []);

  const rawAudioPoolRef = useRef(new Map());
  const primeRawAudio = useCallback((url) => {
    if (!url || rawAudioPoolRef.current.has(url)) return;

    try {
      const audio = new Audio(url);
      audio.preload = "auto";
      audio.load();
      rawAudioPoolRef.current.set(url, audio);
    } catch (err) {
      warnCustomAudioFailure(err);
    }
  }, [warnCustomAudioFailure]);

  const playRawAudio = useCallback((url, volume = 1, playbackRate = 1) => {
    if (!soundEnabled || !url) return false;

    try {
      primeRawAudio(url);
      const pooled = rawAudioPoolRef.current.get(url);
      const audio = pooled?.paused ? pooled : pooled?.cloneNode(true) ?? new Audio(url);

      audio.currentTime = 0;
      audio.volume = Math.max(0, Math.min(1, volume));
      audio.playbackRate = playbackRate;
      audio.play().catch(warnCustomAudioFailure);
      return true;
    } catch (err) {
      warnCustomAudioFailure(err);
      return false;
    }
  }, [primeRawAudio, soundEnabled, warnCustomAudioFailure]);

  // playCustomSfx maps report events to the page sound library.
  const playCustomSfx = useCallback((eventName) => {
    if (!soundEnabled) return;
    if (eventName === "burst" && justCollapsedRef.current) return;

    const setting = sfxSettings[eventName] ?? defaultSfxSettings[eventName];
    if (!setting) return;
    if (setting.soundName === "") return;

    const now = performance.now();
    if (eventName === "burst") {
      if (now - lastBurstSfxTimeRef.current < 180) return;
      lastBurstSfxTimeRef.current = now;
      feedComboRef.current = now - lastFeedTimeRef.current < 800 ? Math.min(feedComboRef.current + 1, 12) : 1;
      lastFeedTimeRef.current = now;
    }

    const sound = soundLibrary.find((item) => item.name === setting.soundName);
    if (!sound?.url) {
      playSfx(eventName);
      return;
    }

    try {
      const audio = new Audio(sound.url);
      const eventVolume = Number.isFinite(setting.volume) ? setting.volume : 1;
      audio.volume = Math.max(0, Math.min(1, eventVolume * sfxVolumeRef.current));

      audio.playbackRate = eventName === "burst"
        ? Math.min(1.35, 1 + (feedComboRef.current - 1) * 0.035 + Math.random() * 0.025)
        : 0.95 + Math.random() * 0.1;

      if ((eventName === "unlock" || eventName === "impact") && sound.url.includes("DSGNBoom_BOOM")) {
        playRawAudio(sound.url, audio.volume, audio.playbackRate);
        return;
      }

      audio.play().catch(warnCustomAudioFailure);
    } catch (err) {
      warnCustomAudioFailure(err);
    }
  }, [soundEnabled, sfxSettings, soundLibrary, playSfx, playRawAudio, warnCustomAudioFailure]);

  // Procedural Deep Space ambient generator

  const startAmbientMusic = useCallback(() => {
    if (ambientNodesRef.current) return; // already playing
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const context = audioContextRef.current;
      if (context.state === 'suspended') {
        context.resume();
      }

      const osc1 = context.createOscillator();
      const osc2 = context.createOscillator();
      const filter = context.createBiquadFilter();
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();
      const gainNode = context.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, context.currentTime); // Low A1

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(55.4, context.currentTime); // detuned

      filter.type = 'lowpass';
      filter.Q.setValueAtTime(4, context.currentTime);
      filter.frequency.setValueAtTime(90, context.currentTime);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.06, context.currentTime); // slow sweep
      lfoGain.gain.setValueAtTime(40, context.currentTime);

      gainNode.gain.setValueAtTime(musicVolumeRef.current, context.currentTime); // ambient low volume

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(context.destination);

      osc1.start();
      osc2.start();
      lfo.start();

      ambientNodesRef.current = { osc1, osc2, lfo, gainNode };
    } catch (e) {
      console.warn("Ambient music init failed:", e);
    }
  }, []);

  const stopAmbientMusic = useCallback(() => {
    if (ambientNodesRef.current) {
      try {
        ambientNodesRef.current.osc1.stop();
        ambientNodesRef.current.osc2.stop();
        ambientNodesRef.current.lfo.stop();
      } catch {
        // ignore
      }
      ambientNodesRef.current = null;
    }
  }, []);

  const stopAmbientLayer = useCallback(() => {
    stopAmbientMusic();
    if (ambientAudioRef.current) {
      try {
        ambientAudioRef.current.pause();
        ambientAudioRef.current.src = "";
      } catch {
        // ignore
      }
      ambientAudioRef.current = null;
    }
  }, [stopAmbientMusic]);

  const startAmbientLayer = useCallback(() => {
    stopAmbientLayer();
    if (!ambientLayer) return;

    if (ambientLayer === "procedural") {
      startAmbientMusic();
      return;
    }

    const sound = soundLibrary.find((item) => item.name === ambientLayer);
    if (!sound?.url) return;

    try {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.volume = Math.max(0, Math.min(1, musicVolumeRef.current));
      ambientAudioRef.current = audio;
      audio.play().catch(warnCustomAudioFailure);
    } catch (err) {
      warnCustomAudioFailure(err);
    }
  }, [ambientLayer, soundLibrary, startAmbientMusic, stopAmbientLayer, warnCustomAudioFailure]);

  useEffect(() => {
    if (musicEnabled) {
      startAmbientLayer();
    } else {
      stopAmbientLayer();
    }
    return () => {
      stopAmbientLayer();
    };
  }, [musicEnabled, startAmbientLayer, stopAmbientLayer]);

  useEffect(() => {
    let unblocked = false;

    const resumeAudio = () => {
      if (unblocked) return;
      unblocked = true;

      // Resume context if suspended
      if (audioContextRef.current) {
        const context = audioContextRef.current;
        if (context.state === "suspended") {
          context.resume().catch(() => {});
        }
      }

      // Re-trigger ambient layers if music is enabled
      if (musicEnabled) {
        startAmbientLayer();
      }

      // Play a short silent buffer to unlock the HTML5 Audio engine
      try {
        const silent = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAAA");
        silent.volume = 0.001;
        silent.play().catch(() => {});
      } catch {
        // ignore
      }

      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("click", resumeAudio);
      window.removeEventListener("keydown", resumeAudio);
      window.removeEventListener("touchstart", resumeAudio);
      window.removeEventListener("focus", resumeAudio);
    };

    window.addEventListener("click", resumeAudio, { passive: true });
    window.addEventListener("keydown", resumeAudio, { passive: true });
    window.addEventListener("touchstart", resumeAudio, { passive: true });
    window.addEventListener("focus", resumeAudio, { passive: true });

    return cleanup;
  }, [musicEnabled, startAmbientLayer]);

  const playSfxRef = useRef(playSfx);
  useEffect(() => {
    playSfxRef.current = playSfx;
  }, [playSfx]);

  // Keep playCustomSfx mutable reference to avoid tearing down canvas useEffect
  const playCustomSfxRef = useRef(playCustomSfx);
  useEffect(() => {
    playCustomSfxRef.current = playCustomSfx;
  }, [playCustomSfx]);

  // Drawer open controls
  const handleOpenExplorer = (toolName) => {
    playCustomSfx('select');
    setActiveDrawerSection(toolName);
  };

  const handleCloseExplorer = () => {
    setActiveDrawerSection(null);
  };

  // Evidence open callbacks
  const openEvidenceDrawer = (refs = []) => {
    setActiveEvidenceRefs(Array.isArray(refs) ? refs : []);
    setShowAllEvidence(false);
    setEvidenceDrawerOpen(true);
  };

  const closeEvidenceDrawer = () => {
    setEvidenceDrawerOpen(false);
  };

  // Singularity state and mouse reference
  const singularityRef = useRef(null);
  const canvasMouseRef = useRef({ x: null, y: null });
  const forceFinalStageRef = useRef(null);

  // Canvas starfield + warped grid lines loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let rafId = null;
    let animationClock = performance.now();
    let previousFrameTime = animationClock;
    let stars = [];

    const resizeCanvas = () => {
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Proportional scaling of star positions to avoid black regions on resize
      if (oldWidth > 0 && oldHeight > 0 && stars.length > 0) {
        stars.forEach(star => {
          star.x = (star.x / oldWidth) * canvas.width;
          star.y = (star.y / oldHeight) * canvas.height;
        });
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Initialize Stars based on starSettings layers
    const isMobileDevice = window.innerWidth < 768;
    const starCountMultiplier = isMobileDevice ? 0.25 : 1.0;

    const layers = [
      { id: 0, count: Math.round(starSettings.layer0Count * starCountMultiplier), sizeRange: [0.15, 0.6], opacityRange: [0.15, 0.4], factor: 0.005, pullFactor: 0.05 },
      { id: 1, count: Math.round(starSettings.layer1Count * starCountMultiplier), sizeRange: [0.55, 1.25], opacityRange: [0.3, 0.65], factor: 0.016, pullFactor: 0.8 },
      { id: 2, count: Math.round(starSettings.layer2Count * starCountMultiplier), sizeRange: [1.2, 2.2], opacityRange: [0.55, 0.9], factor: 0.035, pullFactor: 1.5 },
    ];
    const baseDrift = { x: 0.22, y: -1 };
    const baseDriftLength = Math.hypot(baseDrift.x, baseDrift.y);
    const assignNaturalDrift = (star, layerId) => {
      const layerSpeed = 0.28 + layerId * 0.26;
      const speedJitter = 0.86 + Math.random() * 0.28;
      const speed = layerSpeed * speedJitter;
      star.driftX = (baseDrift.x / baseDriftLength) * speed;
      star.driftY = (baseDrift.y / baseDriftLength) * speed;
    };

    const createStar = (layerConfig, overrides = {}) => {
      const size = overrides.size ?? (Math.random() * (layerConfig.sizeRange[1] - layerConfig.sizeRange[0]) + layerConfig.sizeRange[0]);
      const baseOpacity = overrides.baseOpacity ?? (Math.random() * (layerConfig.opacityRange[1] - layerConfig.opacityRange[0]) + layerConfig.opacityRange[0]);
      const isWarm = overrides.warm ?? Math.random() > 0.75;
      const colorBase = overrides.colorBase ?? (isWarm ? "255, 240, 215" : "255, 255, 255");
      const star = {
        x: overrides.x ?? Math.random() * canvas.width,
        y: overrides.y ?? Math.random() * canvas.height,
        size,
        colorBase,
        baseOpacity,
        twinkleOffset: overrides.twinkleOffset ?? Math.random() * Math.PI * 2,
        pullFactor: layerConfig.pullFactor,
        layer: layerConfig.id,
        factor: layerConfig.factor,
        driftX: 0,
        driftY: 0,
        consumed: false,
        recycleTimer: 0,
      };

      assignNaturalDrift(star, layerConfig.id);
      return star;
    };

    layers.forEach(l => {
      for (let i = 0; i < l.count; i++) {
        stars.push(createStar(l));
      }
    });

    const createSingularityBody = (x, pageY, mass = 54, pulse = 0) => ({
      x,
      pageY,
      mass,
      targetMass: mass,
      pulse,
    });

    const seedFinalOrbitStars = (body, binaryAngle = 0) => {
      if (!body || body.finalOrbitSeeded) return;

      body.finalOrbitSeeded = true;
      const currentScrollY = window.scrollY;
      const sourceY = body.pageY - currentScrollY * 0.05;
      // Bug 7: use targetMass so explosion radius is based on final size, not starting size
      const radiusBase = Math.max(34, (body.targetMass ?? body.mass) * 0.52);
      const finalEhRadius = (body.targetMass ?? body.mass) * 0.5;
      const liveStarSettings = starSettingsRef.current || defaultStarSettings;
      const seededCount = Math.round(
        canvas.width < 768
          ? Math.min(190, (liveStarSettings.finalGalaxySeedCount ?? defaultStarSettings.finalGalaxySeedCount) * 0.52)
          : (liveStarSettings.finalGalaxySeedCount ?? defaultStarSettings.finalGalaxySeedCount),
      );
      const warmth = liveStarSettings.finalGalaxyWarmth ?? 0.76;
      const baseStarBudget = layers.reduce((sum, layer) => sum + layer.count, 0);
      const extraFinalStars = Math.min(
        canvas.width < 768 ? 70 : 180,
        Math.max(0, Math.round(seededCount * (canvas.width < 768 ? 0.16 : 0.24))),
        Math.max(0, baseStarBudget + (canvas.width < 768 ? 90 : 240) - stars.length),
      );
      for (let i = 0; i < extraFinalStars; i++) {
        const layerConfig = Math.random() < 0.68 ? layers[1] : layers[2];
        const colorSeed = Math.random();
        const isWarm = colorSeed < warmth;
        const colorBase = isWarm
          ? (Math.random() < 0.5 ? "255, 202, 128" : "255, 246, 224")
          : (Math.random() < 0.5 ? "180, 215, 255" : "255, 255, 255");
        const star = createStar(layerConfig, {
          x: body.x,
          y: sourceY,
          warm: isWarm,
          colorSeed,
          colorBase,
          baseOpacity: 0.56 + Math.random() * 0.38,
        });
        // Bug 3: match BH parallax factor for extra stars
        star.originalFactor = star.factor;
        star.factor = 0.05;
        star.y = sourceY + currentScrollY * 0.05;
        stars.push(star);
      }

      // Bug 6: Include ALL stars in the supernova explosion (but only a fraction of existing ones to keep the cosmos full)
      const originalStarsLength = stars.length - extraFinalStars;
      const spin = body.finalSpinDirection ?? 1;
      const armCount = 3;
      stars.forEach((star, index) => {
        const isExtra = index >= originalStarsLength;
        const shouldExplode = isExtra || star.consumed || Math.random() < 0.50;

        if (shouldExplode) {
          const band = index / Math.max(1, stars.length - 1);
          const arm = index % armCount;
          const spiralBand = Math.pow(band, 0.76);
          const armPhase = (arm / armCount) * Math.PI * 2;
          const angle = binaryAngle + armPhase + spin * (spiralBand * Math.PI * 2.25 + index * 0.043 + (Math.random() - 0.5) * 0.12);
          const armWave = Math.sin(spiralBand * Math.PI * 5.6 + armPhase) * 0.2;
          const radius = radiusBase * (1.1 + spiralBand * 4.5 + armWave + Math.random() * 0.2 + star.layer * 0.15);
          // Improvement 3: per-star disk inclination for visual volume
          const diskYScale = 0.22 + Math.random() * 0.14;
          // Bug 4: explosion ejecta radius (stars will animate outward to this)
          const ejectaRadius = radiusBase * (2.8 + Math.random() * 5.2);

          star.consumed = false;
          star.recycleTimer = 0;
          // Save start position for the implosion phase
          star.implodeStartX = star.x;
          star.implodeStartY = star.y;
          // Bug 3: align parallax factor with BH
          star.originalFactor = star.factor;
          star.factor = 0.05;
          star.finalOrbitOwner = body;
          star.finalOrbitSeeded = true;
          star.finalOrbitTargetRadius = radius * (0.94 + Math.random() * 0.08);
          // Bug 8: per-star minimum orbit radius to maintain disk width
          star.finalOrbitMinRadius = finalEhRadius * (1.2 + Math.random() * 2.8);
          star.finalOrbitDiskScale = diskYScale;
          star.finalOrbitBand = spiralBand;
          star.finalOrbitFront = Math.sin(angle) > 0;
          star.finalOrbitTangentX = -Math.sin(angle) * spin;
          star.finalOrbitTangentY = Math.cos(angle) * diskYScale * spin;
          star.finalOrbitCapture = 0.82 + Math.random() * 0.18;
          // Implosion & Slower Explosion animation properties
          star.implosionTimer = 0;
          star.implosionDuration = 20 + Math.random() * 8; // ~0.3-0.45s (snappier)
          star.explosionTimer = 0;
          star.explosionDuration = 75 + Math.random() * 45; // Slower explosion (1.2-2.0s)
          star.explosionAngle = angle;
          star.explosionRadius = ejectaRadius;
          star.explosionDiskYScale = diskYScale;
          // Improvement 1: temperature-based color by orbital radius
          const radiusRatio = star.finalOrbitTargetRadius / radiusBase;
          const colorSeed = Math.random();
          star.colorSeed = colorSeed;
          const isWarm = colorSeed < warmth;
          if (radiusRatio < 2) {
            star.colorBase = isWarm ? "245, 245, 255" : "210, 230, 255";
          } else if (radiusRatio < 4) {
            star.colorBase = isWarm
              ? ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "255, 240, 200" : "255, 246, 224")
              : ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "225, 240, 255" : "255, 255, 255");
          } else {
            star.colorBase = isWarm
              ? ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "255, 170, 75" : "255, 202, 128")
              : ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "160, 200, 255" : "215, 235, 255");
          }
          star.baseOpacity = Math.max(star.baseOpacity, 0.5 + Math.random() * 0.4);
          star.lastRenderX = null;
          star.lastRenderY = null;
        } else {
          // Reset finalOrbit properties so it drifts normally in the background
          star.finalOrbitOwner = null;
          star.finalOrbitSeeded = false;
          star.explosionTimer = undefined;
          if (star.originalFactor !== undefined) {
            star.factor = star.originalFactor;
            star.originalFactor = undefined;
          }
        }
      });
    };

    const triggerCollapse = (x, y) => {
      const currentScrollY = window.scrollY;
      const targetPageY = y + currentScrollY * 0.05;
      const currentSingularity = singularityRef.current;

      if (currentSingularity?.finalMerged || currentSingularity?.companion || currentSingularity?.binary?.state === "ringdown") return;

      if (currentSingularity) {
        const companionMass = 54;
        const dx = x - currentSingularity.x;
        const dy = targetPageY - currentSingularity.pageY;
        const distance = Math.hypot(dx, dy);
        const minimumBinaryDistance = Math.max(
          160,
          currentSingularity.mass * 0.46 + companionMass * 0.46 + 112,
        );
        if (distance < minimumBinaryDistance) return;

        currentSingularity.companion = {
          ...createSingularityBody(x, targetPageY, companionMass, -0.8),
        };
        currentSingularity.binary = {
          state: "inspiral",
          progress: 0,
          warmup: 0,
          angle: Math.atan2(dy, dx),
          initialDistance: distance,
          distance,
          primaryOrbitMass: currentSingularity.mass,
          secondaryOrbitMass: companionMass,
          centerX: (currentSingularity.x * currentSingularity.mass + x * companionMass) / (currentSingularity.mass + companionMass),
          centerPageY: (currentSingularity.pageY * currentSingularity.mass + targetPageY * companionMass) / (currentSingularity.mass + companionMass),
          spinDirection: dx >= 0 ? 1 : -1,
          startPrimaryX: currentSingularity.x,
          startPrimaryPageY: currentSingularity.pageY,
          startCompanionX: x,
          startCompanionPageY: targetPageY,
          waveTimer: 0,
        };
      } else {
        singularityRef.current = createSingularityBody(x, targetPageY, 54, 0);
      }

      justCollapsedRef.current = true;
      window.setTimeout(() => {
        justCollapsedRef.current = false;
      }, 1000);

      playSfxRef.current?.('collapse');
      if (playCustomSfxRef.current) {
        playCustomSfxRef.current('unlock');
        window.setTimeout(() => {
          playCustomSfxRef.current?.('impact');
        }, 120);
      }
    };

    forceFinalStageRef.current = () => {
      const currentScrollY = window.scrollY;
      const finalMass = canvas.width < 768 ? 122 : 168;
      const x = canvas.width * 0.47;
      const screenY = canvas.height * 0.52;
      const pageY = screenY + currentScrollY * 0.05;
      const body = createSingularityBody(x, pageY, 18, 0);

      stars.forEach((star) => {
        star.consumed = false;
        star.recycleTimer = 0;
        star.finalOrbitOwner = null;
        star.finalOrbitSeeded = false;
      });

      body.targetMass = finalMass;
      body.finalMerged = true;
      body.finalSpinDirection = 1;
      body.binary = {
        state: "ringdown",
        progress: 0,
        angle: -0.18,
        spinDirection: 1,
        waveTimer: 0,
      };
      singularityRef.current = body;
      seedFinalOrbitStars(body, -0.18);
      if (playCustomSfxRef.current) {
        playCustomSfxRef.current('mergerWhoosh');
        window.setTimeout(() => {
          playCustomSfxRef.current?.('mergerImpact');
          playCustomSfxRef.current?.('impact');
          playCustomSfxRef.current?.('mergerImpactExtra');
        }, 400);
      }
    };

    const glowSpriteCanvas = document.createElement("canvas");
    const glowSpriteCtx = glowSpriteCanvas.getContext("2d");
    const glowSpriteCache = {
      key: "",
      size: 0,
    };

    const getSingularityGlowSprite = (ehRadius, colors, visuals, isMobile) => {
      const bucketRadius = Math.max(8, Math.round(ehRadius / 8) * 8);
      const key = [
        bucketRadius,
        colors.glowInner,
        colors.glowOuter,
        visuals.glowIntensity,
        isMobile ? "m" : "d",
      ].join("|");

      if (glowSpriteCache.key === key) {
        return glowSpriteCache;
      }

      const maxSpriteSize = isMobile ? 760 : 1500;
      const size = Math.min(maxSpriteSize, Math.ceil(bucketRadius * 8 + 40));
      const center = size / 2;
      const glowRadius = Math.max(bucketRadius * 1.35, Math.min(size / 2 - 4, bucketRadius * 3.8));

      glowSpriteCanvas.width = size;
      glowSpriteCanvas.height = size;
      glowSpriteCtx.clearRect(0, 0, size, size);

      const glowGrad = glowSpriteCtx.createRadialGradient(center, center, bucketRadius, center, center, glowRadius);
      glowGrad.addColorStop(0, hexToRgba(colors.glowInner, 0.3 * visuals.glowIntensity));
      glowGrad.addColorStop(0.2, hexToRgba(colors.glowInner, 0.13 * visuals.glowIntensity));
      glowGrad.addColorStop(0.55, hexToRgba(colors.glowOuter, 0.035 * visuals.glowIntensity));
      glowGrad.addColorStop(0.84, hexToRgba(colors.glowOuter, 0.01 * visuals.glowIntensity));
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      glowSpriteCtx.fillStyle = glowGrad;
      glowSpriteCtx.beginPath();
      glowSpriteCtx.arc(center, center, glowRadius, 0, Math.PI * 2);
      glowSpriteCtx.fill();

      glowSpriteCache.key = key;
      glowSpriteCache.size = size;
      return glowSpriteCache;
    };

    const drawStarDot = (x, y, size, colorBase, alpha) => {
      if (alpha <= 0.02) return;

      ctx.fillStyle = `rgba(${colorBase}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawOrbitStar = (starRender, isFront = false) => {
      if (!starRender || starRender.alpha <= 0.015) return;

      const {
        x,
        y,
        prevX,
        prevY,
        size,
        colorBase,
        alpha,
        captureProgress,
        tangentX,
        tangentY,
      } = starRender;
      ctx.save();
      if (isFront) {
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.globalCompositeOperation = "screen";
      }
      ctx.lineCap = "round";

      const motionDx = Number.isFinite(prevX) ? x - prevX : tangentX;
      const motionDy = Number.isFinite(prevY) ? y - prevY : tangentY;
      const motionLength = Math.hypot(motionDx, motionDy);
      if (captureProgress > 0.34 && motionLength > 0.12 && motionLength < 28) {
        const trailScale = Math.min(1, captureProgress * 1.2);
        ctx.strokeStyle = `rgba(${colorBase}, ${alpha * 0.12 * trailScale})`;
        ctx.lineWidth = Math.max(0.18, size * 0.28);
        ctx.beginPath();
        ctx.moveTo(x - motionDx * 0.9, y - motionDy * 0.9);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      const headAlpha = alpha * (0.78 + Math.min(0.18, captureProgress * 0.28));
      const headSize = Math.max(0.22, size * (0.88 + captureProgress * 0.08));
      if (isFront) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
        ctx.shadowBlur = 3;
      }
      ctx.fillStyle = `rgba(${colorBase}, ${headAlpha})`;
      ctx.beginPath();
      ctx.arc(x, y, headSize, 0, Math.PI * 2);
      ctx.fill();
      if (isFront) {
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
      }
      ctx.restore();
    };

    const clamp01 = (value) => Math.max(0, Math.min(1, value));
    const smoothStep = (value) => {
      const t = clamp01(value);
      return t * t * (3 - 2 * t);
    };
    const getBinaryVisualState = (sing, frameDelta, motionEnabled) => {
      const binary = sing?.binary;
      if (!sing || !binary) return null;

      if (!sing.companion) {
        if (binary.state !== "ringdown") return null;
        if (motionEnabled) {
          binary.progress = clamp01((binary.progress ?? 0) + 0.0032 * frameDelta);
          binary.angle += 0.0038 * frameDelta;
          if (binary.waveTimer > 0) {
            binary.waveTimer -= frameDelta;
          } else if (binary.progress < 0.72) {
            binary.waveTimer = 34;
          }
          if (binary.progress >= 1) {
            sing.binary = null;
          }
        }

        const ringdownStrength = Math.max(0, 1 - (binary.progress ?? 0));
        return {
          state: "ringdown",
          angle: binary.angle ?? 0,
          centerX: sing.x,
          centerPageY: sing.pageY,
          distance: 0,
          strain: ringdownStrength * 0.72,
          bridgeAlpha: 0,
          ringdownStrength,
          plungeProgress: 1,
          mergeAlpha: 0,
        };
      }

      const companion = sing.companion;
      const primaryOrbitMass = binary.primaryOrbitMass ?? sing.mass;
      const secondaryOrbitMass = binary.secondaryOrbitMass ?? companion.mass;
      const totalMass = Math.max(1, primaryOrbitMass + secondaryOrbitMass);
      const currentCenterX = (sing.x * primaryOrbitMass + companion.x * secondaryOrbitMass) / totalMass;
      const currentCenterPageY = (sing.pageY * primaryOrbitMass + companion.pageY * secondaryOrbitMass) / totalMass;
      binary.centerX = binary.centerX === undefined ? currentCenterX : binary.centerX + (currentCenterX - binary.centerX) * 0.025 * frameDelta;
      binary.centerPageY = binary.centerPageY === undefined ? currentCenterPageY : binary.centerPageY + (currentCenterPageY - binary.centerPageY) * 0.025 * frameDelta;

      const primaryRadius = sing.mass * 0.46;
      const secondaryRadius = companion.mass * 0.46;
      const startDistance = binary.initialDistance ?? Math.max(180, primaryRadius + secondaryRadius + 120);
      const contactDistance = Math.max(28, (primaryRadius + secondaryRadius) * 1.04);
      const warmup = binary.warmup ?? 0;
      const activation = smoothStep(warmup);
      const binaryStarSettings = starSettingsRef.current || defaultStarSettings;
      const mergerPace = Math.max(0.2, binaryStarSettings.mergerPace ?? defaultStarSettings.mergerPace);
      const mergerPull = Math.max(0.35, binaryStarSettings.mergerPull ?? defaultStarSettings.mergerPull);
      const nearMisses = 0;

      if (motionEnabled) {
        binary.warmup = clamp01((binary.warmup ?? 0) + 0.0024 * frameDelta * Math.max(0.8, mergerPace) * Math.min(1.35, mergerPull));

        if (binary.state === "inspiral") {
          const passIndex = binary.passIndex ?? 0;
          const isNearMissPass = passIndex < nearMisses;
          binary.progress = clamp01((binary.progress ?? 0) + 0.00036 * frameDelta * Math.max(0.28, activation) * mergerPace * mergerPull);
          const passProgress = binary.progress ?? 0;
          const passWave = Math.sin(passProgress * Math.PI);
          const passEase = smoothStep(isNearMissPass ? Math.pow(passWave, 0.82) : passProgress);
          const outerDistance = Math.max(contactDistance * 2.18, startDistance * (1 - Math.min(0.46, passIndex * 0.16)));
          const nearMissTightness = nearMisses <= 0 ? 1 : passIndex / Math.max(1, nearMisses);
          const nearMissDistance = contactDistance * (2.26 - nearMissTightness * 0.62);
          const targetDistance = isNearMissPass ? nearMissDistance : contactDistance;
          binary.angle += (0.0005 + passEase * 0.00165) * frameDelta * Math.max(0.35, activation) * mergerPace;
          binary.distance = outerDistance * (1 - passEase) + targetDistance * passEase;

          if (binary.progress >= 1) {
            if (isNearMissPass) {
              binary.passIndex = passIndex + 1;
              binary.progress = 0;
              binary.waveTimer = 0;
            } else {
              binary.state = "plunge";
              binary.progress = 0;
              binary.plungeStartDistance = binary.distance;
            }
          }
        } else if (binary.state === "plunge") {
          binary.progress = clamp01((binary.progress ?? 0) + 0.00118 * frameDelta * mergerPace * mergerPull);
          const plungeCutover = 0.82;
          const plungeProgress = clamp01(binary.progress / plungeCutover);
          const eased = smoothStep(plungeProgress);
          binary.angle += (0.00135 + eased * 0.0031) * frameDelta * mergerPace;
          binary.distance = (binary.plungeStartDistance ?? contactDistance) * (1 - eased);

          if (binary.waveTimer > 0) {
            binary.waveTimer -= frameDelta;
          } else {
            binary.waveTimer = 26;
          }

          if (binary.progress >= plungeCutover) {
            const primaryMass = sing.targetMass ?? sing.mass;
            const secondaryMass = companion.targetMass ?? companion.mass;
            const mergedMass = Math.max(
              Math.sqrt(primaryMass * primaryMass + secondaryMass * secondaryMass) * 1.28,
              (primaryMass + secondaryMass) * 0.72,
            );
            const finalMassFloor = canvas.width < 768 ? 112 : 138;
            const finalMass = Math.min(235, Math.max(mergedMass * 1.12, primaryMass, secondaryMass, finalMassFloor));
            sing.x = binary.centerX;
            sing.pageY = binary.centerPageY;
            sing.mass = 18;
            sing.targetMass = finalMass;
            sing.pulse = 0;
            sing.finalMerged = true;
            sing.finalSpinDirection = binary.spinDirection ?? 1;
            sing.companion = null;
            seedFinalOrbitStars(sing, binary.angle);
            sing.binary = {
              state: "ringdown",
              progress: 0,
              angle: binary.angle,
              spinDirection: binary.spinDirection ?? 1,
              waveTimer: 0,
            };
            if (playCustomSfxRef.current) {
              playCustomSfxRef.current('mergerWhoosh');
              window.setTimeout(() => {
                playCustomSfxRef.current?.('mergerImpact');
                playCustomSfxRef.current?.('impact');
                playCustomSfxRef.current?.('mergerImpactExtra');
              }, 400);
            }
            return {
              state: "ringdown",
              angle: binary.angle,
              centerX: sing.x,
              centerPageY: sing.pageY,
              distance: 0,
              strain: 0.72,
              bridgeAlpha: 0,
              ringdownStrength: 1,
              mergeAlpha: 0,
            };
          }
        }
      }

      const distance = binary.distance ?? startDistance;
      const angle = binary.angle ?? Math.atan2(companion.pageY - sing.pageY, companion.x - sing.x);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const solvedPrimaryX = binary.centerX - dx * (secondaryOrbitMass / totalMass);
      const solvedPrimaryPageY = binary.centerPageY - dy * (secondaryOrbitMass / totalMass);
      const solvedCompanionX = binary.centerX + dx * (primaryOrbitMass / totalMass);
      const solvedCompanionPageY = binary.centerPageY + dy * (primaryOrbitMass / totalMass);
      const settle = binary.state === "plunge" ? 1 : smoothStep((binary.warmup ?? 0) * 1.35);

      if (settle < 1 && binary.startPrimaryX !== undefined) {
        sing.x = binary.startPrimaryX + (solvedPrimaryX - binary.startPrimaryX) * settle;
        sing.pageY = binary.startPrimaryPageY + (solvedPrimaryPageY - binary.startPrimaryPageY) * settle;
        companion.x = binary.startCompanionX + (solvedCompanionX - binary.startCompanionX) * settle;
        companion.pageY = binary.startCompanionPageY + (solvedCompanionPageY - binary.startCompanionPageY) * settle;
      } else {
        sing.x = solvedPrimaryX;
        sing.pageY = solvedPrimaryPageY;
        companion.x = solvedCompanionX;
        companion.pageY = solvedCompanionPageY;
      }

      const inspiralProgress = binary.state === "plunge" ? 1 : clamp01(binary.progress ?? 0);
      const plungeProgress = binary.state === "plunge" ? clamp01(binary.progress ?? 0) : 0;
      const strainActivation = binary.state === "plunge" ? 1 : activation;

      return {
        state: binary.state,
        angle,
        spinDirection: binary.spinDirection ?? 1,
        centerX: binary.centerX,
        centerPageY: binary.centerPageY,
        distance,
        strain: (0.12 + smoothStep(inspiralProgress) * 0.46 + plungeProgress * 0.46) * strainActivation,
        bridgeAlpha: 0,
        ringdownStrength: 0,
        plungeProgress,
        mergeAlpha: binary.state === "plunge" ? smoothStep((plungeProgress - 0.66) / 0.26) : 0,
      };
    };

    const getSingularityDistortion = (body, role, sing, binaryVisual) => {
      if (body?.finalMerged) return { axis: 0, amount: 0 };
      if (!binaryVisual) return { axis: 0, amount: 0 };

      if (binaryVisual.state === "ringdown" && body === sing) {
        const wobble = Math.abs(Math.sin(animationClock * 0.009)) * binaryVisual.ringdownStrength;
        return {
          axis: binaryVisual.angle + Math.sin(animationClock * 0.0025) * 0.32,
          amount: wobble * 0.36,
        };
      }

      if (!sing?.companion) return { axis: 0, amount: 0 };
      const other = role === "secondary" ? sing : sing.companion;
      if (!other) return { axis: 0, amount: 0 };

      const distance = Math.hypot(other.x - body.x, other.pageY - body.pageY);
      const initialDistance = Math.max(sing.binary?.initialDistance ?? distance, 1);
      const closeness = clamp01(1 - distance / initialDistance);
      const lateCloseness = smoothStep((closeness - 0.92) / 0.08);
      const plungeBoost = binaryVisual.state === "plunge" ? smoothStep(((binaryVisual.plungeProgress ?? 0) - 0.58) / 0.32) * 0.18 : 0;

      return {
        axis: Math.atan2(other.pageY - body.pageY, other.x - body.x),
        amount: clamp01(lateCloseness * 0.24 + plungeBoost),
      };
    };

    const drawSingularitySilhouette = (render) => {
      const distortion = render.distortion ?? { axis: 0, amount: 0 };
      const stretch = 1 + distortion.amount * 0.26;
      const squash = Math.max(0.76, 1 - distortion.amount * 0.13);

      const ringAlpha = render.ringAlpha ?? 1;

      ctx.save();
      ctx.translate(render.x, render.y);
      ctx.rotate(distortion.axis);
      ctx.scale(stretch, squash);

      if (render.sing.finalMerged) {
        // -------------------------------------------------------------
        // FINAL MERGED BLACK HOLE: Volumetric 3D Einstein Glow (Soft Light-Wrap)
        // -------------------------------------------------------------
        const pIntensity = render.singularityVisuals.pulseIntensity ?? 0.5;
        const kickScale = 1.0 + (render.sing.massKick ?? 0) * 0.08 * pIntensity;
        const ehRadius = render.ehRadius * kickScale;

        // Draw solid black Event Horizon shadow
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(0, 0, ehRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw Volumetric Einstein Ring Light-Wrap (Soft gradient overlapping the EH edge)
        // Slightly offset the center to simulate relativistic Doppler beaming
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        
        const time = animationClock * 0.001;
        const pulse = kickScale * (1.0 + Math.sin(time * 2.0) * 0.012 * pIntensity);
        const shiftX = Math.cos(time * 0.72) * 1.2 - 1.0;
        const shiftY = Math.sin(time * 0.55) * 0.8;
        const rimGrad = ctx.createRadialGradient(
          shiftX, shiftY, ehRadius * 0.84 * pulse,
          shiftX * 0.5, shiftY * 0.5, ehRadius * 1.36 * pulse
        );
        rimGrad.addColorStop(0.0, "rgba(0, 0, 0, 0)");
        rimGrad.addColorStop(0.18, `rgba(240, 185, 95, ${0.45 * ringAlpha})`); // soft gold bleed over EH edge
        rimGrad.addColorStop(0.32, `rgba(255, 255, 255, ${0.96 * ringAlpha})`); // silver-white bright peak
        rimGrad.addColorStop(0.48, `rgba(230, 235, 245, ${0.55 * ringAlpha})`); // silver-blue glow
        rimGrad.addColorStop(0.72, `rgba(240, 195, 110, ${0.22 * ringAlpha})`); // warm gold outer rim
        rimGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = rimGrad;
        ctx.beginPath();
        ctx.arc(0, 0, ehRadius * 1.36 * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      } else {
        // -------------------------------------------------------------
        // FIRST & SECOND BLACK HOLES: Simple Classic Silhouette & Flat Accretion Stroke
        // -------------------------------------------------------------
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(0, 0, render.ehRadius, 0, Math.PI * 2);
        ctx.fill();

        if (ringAlpha > 0.04 && isVisibleColor(render.colors.accretionRing) && render.singularityVisuals.accretionWidth > 0) {
          ctx.strokeStyle = hexToRgba(render.colors.accretionRing, 0.82 * ringAlpha);
          ctx.shadowColor = hexToRgba(render.colors.glowInner, 0.28 * ringAlpha);
          ctx.shadowBlur = 7;
          ctx.lineWidth = Math.max(1, render.singularityVisuals.accretionWidth * 0.74);
          ctx.beginPath();
          ctx.arc(0, 0, render.ehRadius + 1.4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      ctx.restore();
    };

    const drawBinarySpaceWarp = (visual) => {
      if (!visual || visual.strain <= 0) return;
      const screenY = visual.centerPageY - window.scrollY * 0.05;
      const radius = Math.min(980, Math.max(320, visual.distance * 1.65 + 280));

      ctx.save();
      ctx.translate(visual.centerX, screenY);
      ctx.rotate(visual.angle);
      ctx.scale(1 + visual.strain * 0.65, Math.max(0.48, 1 - visual.strain * 0.38));

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, `rgba(255,255,255,${0.11 * visual.strain})`);
      gradient.addColorStop(0.35, `rgba(255,255,255,${0.047 * visual.strain})`);
      gradient.addColorStop(0.72, `rgba(255,255,255,${0.016 * visual.strain})`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const applyBinaryRenderWarp = (x, y, visual) => {
      if (!visual || visual.strain <= 0) return { x, y };
      const centerY = visual.centerPageY - window.scrollY * 0.05;
      const reach = Math.min(980, Math.max(360, visual.distance * 2 + 260));
      const dx = x - visual.centerX;
      const dy = y - centerY;
      const dist = Math.hypot(dx, dy);
      if (dist >= reach) return { x, y };

      const falloff = Math.pow(1 - dist / reach, 1.55) * visual.strain;
      const cos = Math.cos(visual.angle);
      const sin = Math.sin(visual.angle);
      const along = dx * cos + dy * sin;
      const across = -dx * sin + dy * cos;
      const squeezedAcross = across * (1 - falloff * 0.52);
      const stretchedAlong = along * (1 + falloff * 0.26);
      const spinDirection = visual.spinDirection ?? 1;
      const twist = spinDirection * falloff * (visual.state === "plunge" ? 0.68 : 0.34);
      const twistCos = Math.cos(twist);
      const twistSin = Math.sin(twist);
      const warpedAlong = stretchedAlong * twistCos - squeezedAcross * twistSin;
      const warpedAcross = stretchedAlong * twistSin + squeezedAcross * twistCos;

      return {
        x: visual.centerX + warpedAlong * cos - warpedAcross * sin,
        y: centerY + warpedAlong * sin + warpedAcross * cos,
      };
    };

    const drawBinaryBridge = (visual, renders) => {
      if (!visual || visual.bridgeAlpha <= 0 || renders.length < 2) return;
      const [first, second] = renders;
      const midX = (first.x + second.x) / 2;
      const midY = (first.y + second.y) / 2;
      const distance = Math.hypot(second.x - first.x, second.y - first.y);
      const radius = Math.max(first.ehRadius, second.ehRadius);

      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(Math.atan2(second.y - first.y, second.x - first.x));
      const bridgeAlpha = Math.min(0.92, visual.bridgeAlpha);
      const halfDistance = distance / 2;
      const neck = radius * (0.36 + bridgeAlpha * 0.24);
      const shoulder = radius * (0.9 + bridgeAlpha * 0.5);

      ctx.fillStyle = `rgba(0,0,0,${bridgeAlpha})`;
      ctx.beginPath();
      ctx.moveTo(-halfDistance, -neck);
      ctx.bezierCurveTo(-halfDistance * 0.52, -shoulder, halfDistance * 0.52, -shoulder, halfDistance, -neck);
      ctx.bezierCurveTo(halfDistance * 0.62, neck * 1.12, -halfDistance * 0.62, neck * 1.12, -halfDistance, -neck);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawBinaryMergedHorizon = (visual, renders) => {
      const mergeAlpha = visual?.mergeAlpha ?? 0;
      if (!visual || mergeAlpha <= 0.02 || renders.length < 2) return false;

      const [first, second] = renders;
      const midX = (first.x + second.x) / 2;
      const midY = (first.y + second.y) / 2;
      const angle = Math.atan2(second.y - first.y, second.x - first.x);
      const distance = Math.hypot(second.x - first.x, second.y - first.y);
      const radius = Math.max(first.ehRadius, second.ehRadius);
      const halfDistance = distance / 2;

      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#000000";
      for (const render of renders) {
        ctx.beginPath();
        ctx.arc(render.x, render.y, render.ehRadius * (1 + mergeAlpha * 0.035), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.translate(midX, midY);
      ctx.rotate(angle);
      const neck = radius * (0.52 + mergeAlpha * 0.34);
      const shoulder = radius * (0.96 + mergeAlpha * 0.48);
      ctx.beginPath();
      ctx.moveTo(-halfDistance, -neck);
      ctx.bezierCurveTo(-halfDistance * 0.56, -shoulder, halfDistance * 0.56, -shoulder, halfDistance, -neck);
      ctx.bezierCurveTo(halfDistance * 0.56, shoulder, -halfDistance * 0.56, shoulder, -halfDistance, neck);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      return mergeAlpha > 0.05;
    };

    const drawStarfield = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const singularityVisuals = singularityStyleRef.current || defaultSingularityStyle;
      const nebMult = singularityVisuals.nebulaIntensity ?? 1.0;
      
      // Draw slow-breathing cosmic space clouds/nebula backdrops
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      const nebTime = animationClock * 0.00008;
      
      // Nebula 1: Warm Gold Dust at top-left
      const neb1X = canvas.width * (0.28 + Math.sin(nebTime) * 0.12);
      const neb1Y = canvas.height * (0.22 + Math.cos(nebTime * 0.8) * 0.08);
      const neb1Radius = Math.max(canvas.width, canvas.height) * 0.72;
      const neb1Grad = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, neb1Radius);
      neb1Grad.addColorStop(0, `rgba(235, 140, 45, ${0.18 * nebMult})`);
      neb1Grad.addColorStop(0.4, `rgba(235, 140, 45, ${0.05 * nebMult})`);
      neb1Grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb1Grad;
      ctx.beginPath();
      ctx.arc(neb1X, neb1Y, neb1Radius, 0, Math.PI * 2);
      ctx.fill();

      // Nebula 2: Silver/Teal Cosmic Dust at bottom-right
      const neb2X = canvas.width * (0.72 + Math.cos(nebTime * 0.9) * 0.1);
      const neb2Y = canvas.height * (0.78 + Math.sin(nebTime * 1.1) * 0.1);
      const neb2Radius = Math.max(canvas.width, canvas.height) * 0.8;
      const neb2Grad = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, neb2Radius);
      neb2Grad.addColorStop(0, `rgba(90, 190, 225, ${0.15 * nebMult})`);
      neb2Grad.addColorStop(0.42, `rgba(90, 190, 225, ${0.04 * nebMult})`);
      neb2Grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb2Grad;
      ctx.beginPath();
      ctx.arc(neb2X, neb2Y, neb2Radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();

      const sing = singularityRef.current;
      const mouse = canvasMouseRef.current;
      const motionEnabled = animationsEnabledRef.current;
      const now = performance.now();
      const frameDelta = motionEnabled ? Math.min(2.2, Math.max(0.35, (now - previousFrameTime) / 16.67)) : 0;
      if (motionEnabled) {
        previousFrameTime = now;
        animationClock = now;
      }
      const currentScrollY = motionEnabled ? window.scrollY : (frozenScrollYRef.current ?? window.scrollY);
      const colors = singularityColorsRef.current || {
        accretionRing: "#ffffff",
        glowInner: "#ffffff",
        glowOuter: "#ffffff",
      };

      const liveStarSettings = starSettingsRef.current || {
        cursorGravity: 0.38,
        baseDriftSpeed: 0.15,
        twinkleSpeed: 0.3
      };
      const isMobileFrame = canvas.width < 768;
      const singularityRenders = [];
      const gravitySources = [];
      const maxFeedingMass = isMobileFrame ? 120 : 180;
      const easeSingularityMass = (body) => {
        if (!body || !motionEnabled) return;
        const bodyMaxMass = body.finalMerged ? (isMobileFrame ? 150 : 235) : maxFeedingMass;
        body.targetMass = Math.min(bodyMaxMass, Math.max(body.mass, body.targetMass ?? body.mass));
        const diff = body.targetMass - body.mass;
        if (Math.abs(diff) > 0.005) {
          const ease = 1 - Math.pow(0.94, frameDelta);
          body.mass += diff * ease;
        } else {
          body.mass = body.targetMass;
        }
        body.massKick = Math.max(0, (body.massKick ?? 0) - 0.035 * frameDelta);
      };
      const addSingularityMass = (body, amount) => {
        if (!body || body.finalMerged || amount <= 0) return;
        const baseMass = body.targetMass ?? body.mass;
        const remainingMass = Math.max(0, maxFeedingMass - baseMass);
        if (remainingMass <= 0) return;
        const growthDamping = 0.18 + 0.82 * clamp01(remainingMass / maxFeedingMass);
        const controlledGrowth = amount * growthDamping * (sing?.companion ? 0.42 : 0.48);
        body.targetMass = Math.min(maxFeedingMass, baseMass + controlledGrowth);
        body.massKick = Math.min(1, (body.massKick ?? 0) + amount * 0.012);
      };

      if (sing) {
        easeSingularityMass(sing);
        if (sing.companion) {
          easeSingularityMass(sing.companion);
        }
      }

      const binaryVisual = getBinaryVisualState(sing, frameDelta, motionEnabled);

      const addSingularityRender = (body, role) => {
        const screenY = body.pageY - currentScrollY * 0.05;
        if (screenY < -150 || screenY > canvas.height + 150) return null;

        const bodyScale = body.finalMerged ? 0.5 : 0.48;
        const ehRadius = body.mass * bodyScale;
        if (motionEnabled) {
          body.pulse += 0.0035;
        }

        const plungeFade = !body.finalMerged && binaryVisual?.state === "plunge"
          ? 1 - smoothStep(((binaryVisual.plungeProgress ?? 0) - 0.36) / 0.36)
          : 1;
        const ringAlpha = body.finalMerged ? 1 : Math.max(0, plungeFade);
        const glowAlpha = body.finalMerged ? 0 : Math.max(0.22, 0.28 + plungeFade * 0.72);
        const renderColors = colors;

        const finalReach = liveStarSettings.finalGalaxyReach ?? 1.35;
        const preMergeReach = liveStarSettings.blackHoleGravityReach ?? defaultStarSettings.blackHoleGravityReach;
        const influenceRadius = body.finalMerged
          ? (isMobileFrame
            ? Math.min(460, Math.max(220, (170 + body.mass * 1.15) * finalReach))
            : Math.min(1320, Math.max(620, (480 + body.mass * 2.65) * finalReach)))
          : (isMobileFrame
            ? Math.min(190, Math.max(92, (92 + body.mass * 0.48) * preMergeReach))
            : Math.min(520, Math.max(240, (245 + body.mass * 1.18) * preMergeReach)));

        const render = {
          x: body.x,
          y: screenY,
          ehRadius,
          colors: renderColors,
          singularityVisuals,
          sing: body,
          role,
          influenceRadius,
          ringAlpha,
          glowAlpha,
          distortion: getSingularityDistortion(body, role, sing, binaryVisual),
        };
        singularityRenders.push(render);
        gravitySources.push({
          body,
          role,
          x: body.x,
          y: screenY,
          ehRadius,
          influenceRadius,
          activeFeedSingDist: isMobileFrame ? 112 : 220,
          activeFeedStarDist: isMobileFrame ? 96 : 170,
          terminal: Boolean(body.finalMerged),
        });

        if (glowAlpha > 0.01) {
          const sprite = getSingularityGlowSprite(ehRadius, renderColors, singularityVisuals, isMobileFrame);
          ctx.save();
          ctx.globalAlpha = glowAlpha;
          ctx.drawImage(
            glowSpriteCanvas,
            body.x - sprite.size / 2,
            screenY - sprite.size / 2,
          );
          ctx.restore();
        }

        return render;
      };

      // 2. Draw and grow singularity (with custom/live colors)
      if (sing) {
        addSingularityRender(sing, "primary");
        if (sing.companion) {
          addSingularityRender(sing.companion, "secondary");
        }
      }

      drawBinarySpaceWarp(binaryVisual);

      // 3. Update and Draw Stars
      let starsNearCursorCount = 0;
      let cursorClusterCount = 0;
      const terminalBackStars = [];
      const terminalFrontStars = [];
      const canCreateCollapseAtCursor = mouse.x !== null && (
        !sing || (
          !sing.finalMerged && !sing.companion && singularityRenders.every(render =>
            Math.hypot(mouse.x - render.x, mouse.y - render.y) > Math.max(130, render.ehRadius * 2.15)
          )
        )
      );

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (star.consumed) {
          if (motionEnabled) {
            star.recycleTimer++;
          }
          if (motionEnabled && star.recycleTimer > 72) {
            star.consumed = false;
            star.recycleTimer = 0;
            star.finalOrbitOwner = null;
            star.finalOrbitSeeded = false;
            star.finalOrbitFront = false;
            star.finalOrbitCapture = 0;
            star.finalOrbitTargetRadius = undefined;
            star.finalOrbitMinRadius = undefined;
            star.explosionTimer = undefined;
            // Bug 3: restore original parallax factor
            if (star.originalFactor !== undefined) {
              star.factor = star.originalFactor;
              star.originalFactor = undefined;
            }
            const edge = Math.random();
            const scrollSeed = currentScrollY * star.factor;
            if (edge < 0.82) {
              star.x = Math.random() * canvas.width;
              star.y = canvas.height + 20 + scrollSeed;
            } else {
              star.x = -20;
              star.y = Math.random() * canvas.height + scrollSeed;
            }
            assignNaturalDrift(star, star.layer);
          }
          continue;
        }

        // Scroll parallax
        const scrollParallax = currentScrollY * star.factor;
        // Bug 2: skip natural drift for captured stars to prevent line clumping
        if (motionEnabled && liveStarSettings.baseDriftSpeed > 0 && !star.finalOrbitOwner) {
          const driftSpeed = liveStarSettings.baseDriftSpeed * (0.22 + star.layer * 0.34);
          star.x += (star.driftX ?? 0) * driftSpeed;
          star.y += (star.driftY ?? -0.36) * driftSpeed;
        }
        let currentY = star.y - scrollParallax;
        let hasActiveGravity = false;

        // Singularity gravitational pull: use the nearest source only to keep the binary prototype cheap.
        if (gravitySources.length > 0) {
          let gravityTarget = null;
          for (const source of gravitySources) {
            const sourceDist = Math.hypot(source.x - star.x, source.y - currentY);
            const ownedByTerminal = source.terminal && star.finalOrbitOwner === source.body;
            

            const sourceLimit = source.terminal
              ? (ownedByTerminal ? source.influenceRadius * 1.5 : source.ehRadius * 7.5)
              : source.influenceRadius;

            if (sourceDist > sourceLimit) continue;
            const sourceWeight = (ownedByTerminal ? sourceDist * 0.35 : sourceDist) / source.influenceRadius;
            if (!gravityTarget || sourceWeight < gravityTarget.weight) {
              gravityTarget = { ...source, dist: sourceDist, weight: sourceWeight };
            }
          }
          if (gravityTarget) {
            hasActiveGravity = true;
            const {
              body,
              x: sourceX,
              y: sourceY,
              dist,
              ehRadius,
              influenceRadius,
              activeFeedSingDist,
              activeFeedStarDist,
              terminal,
            } = gravityTarget;

            // Active feed vs. passive feed consume check
            const distMouseSing = mouse.x !== null ? Math.hypot(sourceX - mouse.x, sourceY - mouse.y) : 9999;
            const distStarMouse = mouse.x !== null ? Math.hypot(mouse.x - star.x, mouse.y - currentY) : 9999;
            const isBeingFed = !terminal && distMouseSing < activeFeedSingDist && distStarMouse < activeFeedStarDist;

            // Pre-merger swallow radius: 3.0px passive, 20.0px active feed override!
            // Terminal stage never swallows.
            const consumeRadius = terminal
              ? 0
              : (ehRadius + (isBeingFed ? 20.0 : (star.layer === 0 ? 1.0 : 3.0)));

            if (terminal && motionEnabled) {
              // Implosion phase before explosion
              if (star.implosionTimer !== undefined && star.implosionTimer < (star.implosionDuration ?? 25)) {
                star.implosionTimer += frameDelta;
                const t = clamp01(star.implosionTimer / (star.implosionDuration ?? 25));
                const easeIn = Math.pow(t, 3); // cubic ease-in for acceleration

                const startX = star.implodeStartX ?? star.x;
                const startY = star.implodeStartY ?? star.y;
                const targetYCanvas = sourceY + currentScrollY * 0.05;

                star.x = startX * (1 - easeIn) + sourceX * easeIn;
                star.y = startY * (1 - easeIn) + targetYCanvas * easeIn;
                currentY = star.y - scrollParallax;
              }
              // Slower explosion animation phase
              else if (star.explosionTimer !== undefined && star.explosionTimer < (star.explosionDuration ?? 90)) {
                star.explosionTimer += frameDelta;
                const t = clamp01(star.explosionTimer / (star.explosionDuration ?? 90));
                const easeOut = 1 - Math.pow(1 - t, 3); // cubic ease-out
                const expAngle = star.explosionAngle ?? 0;
                const ejectaR = (star.explosionRadius ?? 200) * easeOut;
                const diskYS = star.explosionDiskYScale ?? 0.28;
                star.x = sourceX + Math.cos(expAngle) * ejectaR;
                star.y = (sourceY + Math.sin(expAngle) * ejectaR * diskYS) + currentScrollY * 0.05;
                currentY = star.y - scrollParallax;
              } else {
                // Normal orbital physics (post-explosion or dynamically captured)
                const ownedFinalStar = star.finalOrbitOwner === body;
                const influence = ownedFinalStar
                  ? Math.max(0.42, Math.min(1, (influenceRadius * 1.55 - dist) / (influenceRadius * 1.55)))
                  : Math.max(0.08, (influenceRadius - dist) / influenceRadius);
                const diskYScale = star.finalOrbitDiskScale ?? (0.22 + Math.random() * 0.14);
                const dxDisk = star.x - sourceX;
                const dyDisk = (currentY - sourceY) / diskYScale;
                const diskDist = Math.max(1, Math.hypot(dxDisk, dyDisk));
                const angleFromSource = Math.atan2(dyDisk, dxDisk);

                if (star.finalOrbitOwner !== body) {
                  // Dynamic capture — star drifted into gravity well
                  const warmth = liveStarSettings.finalGalaxyWarmth ?? 0.76;
                  star.finalOrbitOwner = body;
                  star.finalOrbitSeeded = false;
                  star.finalOrbitTargetRadius = diskDist;
                  star.finalOrbitDiskScale = diskYScale;
                  star.finalOrbitBand = Math.random();
                  // Bug 8: per-star minimum orbit radius
                  star.finalOrbitMinRadius = ehRadius * (1.2 + Math.random() * 2.8);
                  // Bug 3: align parallax factor with BH
                  star.originalFactor = star.factor;
                  star.y += currentScrollY * (0.05 - star.factor);
                  star.factor = 0.05;
                  currentY = star.y - currentScrollY * 0.05;
                  // Improvement 1: temperature color by distance
                  const radiusRatio = diskDist / ehRadius;
                  const colorSeed = Math.random();
                  star.colorSeed = colorSeed;
                  const isWarm = colorSeed < warmth;
                  if (radiusRatio < 2) {
                    star.colorBase = isWarm ? "245, 245, 255" : "210, 230, 255";
                  } else if (radiusRatio < 4) {
                    star.colorBase = isWarm
                      ? ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "255, 240, 200" : "255, 246, 224")
                      : ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "225, 240, 255" : "255, 255, 255");
                  } else {
                    star.colorBase = isWarm
                      ? ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "255, 170, 75" : "255, 202, 128")
                      : ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "160, 200, 255" : "215, 235, 255");
                  }
                  star.baseOpacity = Math.max(star.baseOpacity, 0.52 + Math.random() * 0.36);
                }

                if (star.finalOrbitOwner === body) {
                  // Bug 8: per-star minimum orbit radius instead of uniform ehRadius * 1.05
                  const minR = star.finalOrbitMinRadius ?? ehRadius * 1.5;
                  const targetRadius = Math.max(minR, star.finalOrbitTargetRadius ?? ehRadius * 4);
                  // Improvement 4: radial wobble oscillation for organic feel
                  const wobbleOffset = Math.sin(animationClock * 0.002 + star.twinkleOffset) * ehRadius * 0.06;
                  const effectiveTarget = targetRadius + wobbleOffset;
                  const radialError = (diskDist - effectiveTarget) / effectiveTarget;
                  const spin = body.finalSpinDirection ?? 1;
                  const tangentX = -Math.sin(angleFromSource) * spin;
                  const tangentY = Math.cos(angleFromSource) * diskYScale * spin;
                  const radialX = dxDisk / diskDist;
                  const radialY = (dyDisk / diskDist) * diskYScale;
                  // Improvement 2: Keplerian speed — inner stars orbit faster
                  const keplerBase = 0.22 + star.layer * 0.06;
                  const orbitSpeed = Math.min(1.8, keplerBase * Math.pow(ehRadius / Math.max(ehRadius * 0.8, diskDist), 0.35) * influence * (1 + body.mass * 0.002));

                  const radialCorrection = radialError > 0
                    ? Math.min(4.8, radialError * 1.5) * 0.42 * influence
                    : Math.max(-0.52, radialError) * 0.38 * influence;

                  star.x += tangentX * orbitSpeed - radialX * radialCorrection;
                  star.y += tangentY * orbitSpeed - radialY * radialCorrection;
                  star.finalOrbitFront = Math.sin(angleFromSource) > 0;
                  star.finalOrbitTangentX = tangentX;
                  star.finalOrbitTangentY = tangentY;
                  star.finalOrbitCapture = influence;
                  // Bug 8: 10× slower spiral-in, respects per-star minimum
                  star.finalOrbitTargetRadius = Math.max(
                    minR,
                    targetRadius - (0.0006 + star.layer * 0.0004) * influence * frameDelta,
                  );
                  currentY = star.y - scrollParallax;
                }
              }
            }

            // Consume check: only pre-merger black holes swallow stars
            const isSwallowed = motionEnabled && !terminal && (dist < consumeRadius);

            if (isSwallowed) {
              star.consumed = true;
              star.recycleTimer = 0;

              const passiveGrowthMultiplier = star.layer === 0 ? 0.035 : star.layer === 1 ? 0.18 : 0.28;
              if (isBeingFed && star.layer > 0) {
                addSingularityMass(body, liveStarSettings.blackHoleGrowthRate);
              } else {
                addSingularityMass(body, liveStarSettings.blackHoleGrowthRate * passiveGrowthMultiplier);
              }
              playCustomSfxRef.current?.("burst");
              continue;
            }

            if (!terminal && motionEnabled) {
              const rawInfluence = Math.max(0, (influenceRadius - dist) / influenceRadius);
              const influence = smoothStep(rawInfluence);

              const gravityStrength = (liveStarSettings.blackHoleGravity !== undefined ? liveStarSettings.blackHoleGravity : 0.45) * (isMobileFrame ? 0.65 : 1.0);
              const layerWeight = 0.55 + star.layer * 0.28;
              const force = (((body.mass * 3.45 * layerWeight) / (dist + 58)) * influence) * gravityStrength;
              const speedFallFactor = 0.18 + star.layer * 0.025;
              const speedSwirlFactor = 0.58;

              const angle = Math.atan2(sourceY - currentY, sourceX - star.x);
              const orbitAngle = angle + Math.PI / 2;
              const closeFactor = Math.max(0, Math.min(1, (ehRadius + 32 - dist) / 32));
              const speedFall = Math.min(3.2, force * (speedFallFactor + closeFactor * 0.18));
              const speedSwirl = Math.min(4.0, force * (speedSwirlFactor + closeFactor * 0.42));

              star.x += Math.cos(angle) * speedFall + Math.cos(orbitAngle) * speedSwirl;
              star.y += Math.sin(angle) * speedFall + Math.sin(orbitAngle) * speedSwirl;
              currentY = star.y - scrollParallax;
            }
          }
        }

        // Horizontal & Vertical wrapping (only for stars that are not owned and not under active gravity)
        if (!hasActiveGravity && !star.finalOrbitOwner) {
          if (star.x < -15) {
            star.x = canvas.width + 15;
          } else if (star.x > canvas.width + 15) {
            star.x = -15;
          }

          if (currentY < -15) {
            star.y = canvas.height + 15 + scrollParallax;
            currentY = star.y - scrollParallax;
          } else if (currentY > canvas.height + 15) {
            star.y = -15 + scrollParallax;
            currentY = star.y - scrollParallax;
          }
        }

        if (binaryVisual && motionEnabled) {
          const centerY = binaryVisual.centerPageY - currentScrollY * 0.05;
          const reach = Math.min(960, Math.max(320, binaryVisual.distance * 2 + 280));
          const dxBinary = star.x - binaryVisual.centerX;
          const dyBinary = currentY - centerY;
          const distBinary = Math.hypot(dxBinary, dyBinary);

          if (distBinary < reach) {
            const influence = Math.pow(1 - distBinary / reach, 1.4) * binaryVisual.strain;
            const angle = Math.atan2(dyBinary, dxBinary);
            const spin = binaryVisual.spinDirection ?? 1;
            const orbitAngle = angle + spin * Math.PI / 2;
            const orbitalDrift = Math.min(0.62, influence * (0.095 + star.layer * 0.026));
            const inwardDrift = Math.min(0.13, influence * 0.014);

            star.x += Math.cos(orbitAngle) * orbitalDrift - Math.cos(angle) * inwardDrift;
            star.y += Math.sin(orbitAngle) * orbitalDrift - Math.sin(angle) * inwardDrift;
            currentY = star.y - scrollParallax;
          }
        }

        // Cursor Attraction (Trails behind cursor, active only before the final merged singularity)
        if (mouse.x !== null && !sing?.finalMerged) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - currentY;
          const dist = Math.hypot(dx, dy);

          if (dist < 200) {
            let cursorGrip = 1.0;
            let nearestBH = null;

            if (gravitySources.length > 0) {
              let nearestSource = null;
              let minDist = 9999;
              for (const source of gravitySources) {
                const distToSource = Math.hypot(source.x - star.x, source.y - currentY);
                if (distToSource < minDist) {
                  minDist = distToSource;
                  nearestSource = source;
                }
              }
              if (nearestSource) {
                nearestBH = nearestSource;
                const distToBH = minDist;
                
                 // Bug 1: cursor grip is scaled by baseGrip — BH always wins near EH
                 const slipStart = nearestSource.ehRadius * 6.5;
                 const slipEnd = nearestSource.ehRadius * 1.25;
                 if (distToBH < slipStart) {
                   const baseGrip = clamp01((distToBH - slipEnd) / (slipStart - slipEnd));
                   const cursorCloseness = clamp01((120 - dist) / 120);
                   cursorGrip = Math.pow(baseGrip, 2.5) * (0.15 + cursorCloseness * 0.85);
                 }
               }
            }

            // Only count in cursor cluster if the cursor has a solid grip
            if (dist < 92 && cursorGrip > 0.5) {
              cursorClusterCount++;
            }

            if (motionEnabled) {
              // Attraction is regulated by cursorGravity settings, scaled by grip
              const pull = ((200 - dist) / 200) * liveStarSettings.cursorGravity;
              const safeDist = Math.max(1, dist);
              star.x += (dx / safeDist) * pull * star.pullFactor * cursorGrip;
              star.y += (dy / safeDist) * pull * star.pullFactor * cursorGrip;

              // If grip is slipping, pull star towards the event horizon in a smooth stream
              if (cursorGrip < 1.0 && nearestBH) {
                const bhAngle = Math.atan2(nearestBH.y - currentY, nearestBH.x - star.x);
                const streamSpeed = (1 - cursorGrip) * 4.5;
                star.x += Math.cos(bhAngle) * streamSpeed;
                star.y += Math.sin(bhAngle) * streamSpeed;
              }
            }

            if (dist < 28 && canCreateCollapseAtCursor && cursorGrip > 0.5) {
              starsNearCursorCount++;
            }
          }
        }

        // Twinkle calculation
        const twinkle = 1.0 + Math.sin(animationClock * 0.005 * liveStarSettings.twinkleSpeed + star.twinkleOffset) * 0.45 * liveStarSettings.twinkleSpeed;
        const currentOpacity = Math.min(1.0, Math.max(0.05, star.baseOpacity * twinkle));
        const renderY = star.y - scrollParallax;
        let captureProgress = 0;
        let projectedRenderY = renderY;
        let isInsideShadow = false;
        let captureTarget = null;

        if (singularityRenders.length > 0) {
          for (const render of singularityRenders) {
            const dxSing = star.x - render.x;
            const dySing = renderY - render.y;
            const renderDist = Math.hypot(dxSing, dySing);
            const progress = Math.max(0, Math.min(1, (render.influenceRadius - renderDist) / render.influenceRadius));
            if (!captureTarget || progress > captureTarget.progress) {
              captureTarget = { render, dxSing, dySing, renderDist, progress };
            }
          }

          if (captureTarget) {
            captureProgress = captureTarget.progress;
            const isOwnedFront = captureTarget.render.sing.finalMerged &&
                                 star.finalOrbitOwner === captureTarget.render.sing &&
                                 star.finalOrbitFront;
            if (isOwnedFront) {
              isInsideShadow = false;
            } else {
              isInsideShadow = captureTarget.renderDist < captureTarget.render.ehRadius * 0.98;
            }

            if (captureProgress > 0.08) {
              const diskFlatten = 1 - captureProgress * 0.4;
              projectedRenderY = captureTarget.render.y + captureTarget.dySing * diskFlatten;
            }
          }
        }

        const stretch = Math.pow(captureProgress, 1.28);
        const lateFade = captureProgress <= 0.72 ? 1 : Math.max(0, 1 - ((captureProgress - 0.72) / 0.28) * 0.92);
        const dotAlpha = isInsideShadow ? 0 : currentOpacity;
        const warpedStar = applyBinaryRenderWarp(star.x, projectedRenderY, binaryVisual);
        const finalOwnerCapture = captureTarget?.render?.sing?.finalMerged;
        const ownedByFinalCapture = finalOwnerCapture && star.finalOrbitOwner === captureTarget.render.sing;
        const finalCapture = finalOwnerCapture && !isInsideShadow && (captureProgress > 0.035 || ownedByFinalCapture);
        if (finalCapture) {
          const finalAlpha = currentOpacity * Math.max(ownedByFinalCapture ? 0.78 : 0.48, lateFade);

          // Implosion visual boosts
          let sizeMultiplier = 1.0;
          let alphaMultiplier = 1.0;
          if (star.implosionTimer !== undefined && star.implosionTimer < (star.implosionDuration ?? 25)) {
            const implProgress = clamp01(star.implosionTimer / (star.implosionDuration ?? 25));
            alphaMultiplier = 1.0 + implProgress * 1.5;
            sizeMultiplier = 1.0 + implProgress * 0.6;
          }

          // Gravitational lensing warp: bends light around the event horizon to create Gargantua 3D depth
          const ehRadius = captureTarget.render.ehRadius;
          const distRatio = Math.max(0, 1 - captureTarget.renderDist / (ehRadius * 3.5));
          const lensWarp = ehRadius * 0.68 * Math.pow(distRatio, 1.5);
          const warpY = star.finalOrbitFront ? lensWarp : -lensWarp;

          // Dynamically adjust colorBase based on the real-time warmth slider
          const warmth = liveStarSettings.finalGalaxyWarmth ?? 0.76;
          const seed = star.colorSeed ?? (star.colorSeed = Math.random());
          const isWarm = seed < warmth;
          const radiusRatio = captureTarget.renderDist / Math.max(1, ehRadius);
          let colorBase;
          if (radiusRatio < 2.0) {
            colorBase = isWarm ? "245, 245, 255" : "210, 230, 255";
          } else if (radiusRatio < 4.0) {
            colorBase = isWarm
              ? ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "255, 240, 200" : "255, 246, 224")
              : ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "225, 240, 255" : "255, 255, 255");
          } else {
            colorBase = isWarm
              ? ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "255, 170, 75" : "255, 202, 128")
              : ((star.twinkleOffset * 17) % 1.0 < 0.5 ? "160, 200, 255" : "215, 235, 255");
          }
          star.colorBase = colorBase;

          const starRender = {
            x: warpedStar.x,
            y: warpedStar.y + warpY,
            prevX: star.lastRenderX,
            prevY: star.lastRenderY,
            size: Math.max(0.18, star.size * (1 - stretch * 0.1) * (star.finalOrbitFront ? 1.15 : 1.0) * sizeMultiplier),
            colorBase: star.colorBase,
            alpha: finalAlpha * (0.88 + Math.min(0.18, star.finalOrbitCapture ?? 0)) * (star.finalOrbitFront ? 1.25 : 1.0) * alphaMultiplier,
            captureProgress: ownedByFinalCapture ? Math.max(captureProgress, 0.36) : captureProgress,
            tangentX: star.finalOrbitTangentX ?? 1,
            tangentY: star.finalOrbitTangentY ?? 0,
          };
          if (star.finalOrbitFront) {
            terminalFrontStars.push(starRender);
          } else {
            terminalBackStars.push(starRender);
          }
        } else {
          drawStarDot(warpedStar.x, warpedStar.y, Math.max(0.18, star.size * (1 - stretch * 0.18)), star.colorBase, dotAlpha);
        }
        star.lastRenderX = warpedStar.x;
        star.lastRenderY = warpedStar.y;
      }
      // Improvement 5: Continuous star replenishment for the vortex and background
      if (sing?.finalMerged && motionEnabled && stars.length < 1250 && Math.random() < 0.12) {
        const layerIdx = Math.floor(Math.random() * 3);
        const layerConfig = layers[layerIdx];
        const newStar = createStar(layerConfig);
        newStar.x = Math.random() < 0.5 ? -10 : canvas.width + 10;
        stars.push(newStar);
      }

      terminalBackStars.forEach(star => drawOrbitStar(star, false));

      drawBinaryBridge(binaryVisual, singularityRenders);
      const mergedBinaryHorizonDrawn = drawBinaryMergedHorizon(binaryVisual, singularityRenders);

      if (!mergedBinaryHorizonDrawn) {
        for (const render of singularityRenders) {
          drawSingularitySilhouette(render);
        }
      }

      terminalFrontStars.forEach(star => drawOrbitStar(star, true));

      const cursorNearShadow = mouse.x !== null && singularityRenders.some(render =>
        Math.hypot(mouse.x - render.x, mouse.y - render.y) < render.ehRadius * 1.45
      );

      if (mouse.x !== null && cursorClusterCount > 0 && !cursorNearShadow) {
        const clusterRadius = Math.min(42, 8 + Math.sqrt(cursorClusterCount) * 4.5);
        const clusterAlpha = Math.min(0.16, 0.025 + cursorClusterCount * 0.008);
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, clusterRadius);
        cursorGlow.addColorStop(0, hexToRgba(colors.glowInner, clusterAlpha));
        cursorGlow.addColorStop(0.45, hexToRgba(colors.accretionRing, clusterAlpha * 0.55));
        cursorGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, clusterRadius, 0, Math.PI * 2);
        ctx.fill();

        const coreRadius = Math.min(16, 2.4 + Math.sqrt(cursorClusterCount) * 0.86);
        const corePulse = 1 + Math.sin(animationClock * 0.004) * 0.075;
        ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        ctx.shadowBlur = 9;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, coreRadius * corePulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Check collapse trigger (Only interacts with player-gathered stars)
      const isMobile = canvas.width < 768;
      const isCreatingCompanion = Boolean(sing && !sing.companion && !sing.finalMerged);
      const configuredCollapseStars = isCreatingCompanion
        ? (liveStarSettings.secondCollapseStars ?? defaultStarSettings.secondCollapseStars)
        : (liveStarSettings.firstCollapseStars ?? defaultStarSettings.firstCollapseStars);
      const collapseThreshold = Math.max(3, Math.round(configuredCollapseStars * (isMobile ? 0.58 : 1)));
      if (motionEnabled && mouse.x !== null && starsNearCursorCount >= collapseThreshold) {
        triggerCollapse(mouse.x, mouse.y);
      }
 
       rafId = requestAnimationFrame(drawStarfield);
     };
 
     rafId = requestAnimationFrame(drawStarfield);
 
     const handleWindowMouseMove = (e) => {
       const rect = canvas.getBoundingClientRect();
       const scaleX = rect.width > 0 ? canvas.width / rect.width : 1;
       const scaleY = rect.height > 0 ? canvas.height / rect.height : 1;
       canvasMouseRef.current = {
         x: (e.clientX - rect.left) * scaleX,
         y: (e.clientY - rect.top) * scaleY
       };
     };
 
     const handleWindowMouseLeave = () => {
       canvasMouseRef.current = { x: null, y: null };
     };

     const handleWindowTouchStartMove = (e) => {
       if (e.touches.length === 0) return;
       const touch = e.touches[0];
       const rect = canvas.getBoundingClientRect();
       const scaleX = rect.width > 0 ? canvas.width / rect.width : 1;
       const scaleY = rect.height > 0 ? canvas.height / rect.height : 1;
       canvasMouseRef.current = {
         x: (touch.clientX - rect.left) * scaleX,
         y: (touch.clientY - rect.top) * scaleY
       };
     };

     const handleWindowTouchEnd = () => {
       canvasMouseRef.current = { x: null, y: null };
     };
 
     window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
     window.addEventListener("mouseleave", handleWindowMouseLeave, { passive: true });
     window.addEventListener("touchstart", handleWindowTouchStartMove, { passive: true });
     window.addEventListener("touchmove", handleWindowTouchStartMove, { passive: true });
     window.addEventListener("touchend", handleWindowTouchEnd, { passive: true });
     window.addEventListener("touchcancel", handleWindowTouchEnd, { passive: true });
 
     return () => {
       forceFinalStageRef.current = null;
       window.removeEventListener("resize", resizeCanvas);
       window.removeEventListener("mousemove", handleWindowMouseMove);
       window.removeEventListener("mouseleave", handleWindowMouseLeave);
       window.removeEventListener("touchstart", handleWindowTouchStartMove);
       window.removeEventListener("touchmove", handleWindowTouchStartMove);
       window.removeEventListener("touchend", handleWindowTouchEnd);
       window.removeEventListener("touchcancel", handleWindowTouchEnd);
       if (rafId) cancelAnimationFrame(rafId);
     };
   }, [starSettings.layer0Count, starSettings.layer1Count, starSettings.layer2Count]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCustomizerOpen(false);
        setActiveDrawerSection(null);
        setEvidenceDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const canEditText = !isDemoMode && (editMode || textEditorOpen);
  const promiseBuilderOptions = reportData.positioningAngles?.length ? reportData.positioningAngles : promiseOptionsState;
  const activeThemeColors = deriveThemeColors(themeColors);
  const activeSingularityColors = { ...defaultSingularityColors, ...singularityColors };
  const activeSingularityStyle = { ...defaultSingularityStyle, ...singularityStyle };
  const activeLayoutSettings = { ...defaultLayoutSettings, ...layoutSettings };
  const activeVisualSettings = { ...defaultVisualSettings, ...visualSettings };

  return (
    <main
      className="story-prototype"
      ref={rootRef}
      style={{
        background: activeThemeColors.bg,
        color: activeThemeColors.ink,
        "--story-bg": activeThemeColors.bg,
        "--story-ink": activeThemeColors.ink,
        "--story-gold": activeThemeColors.gold,
        "--story-blue": activeThemeColors.blue,
        "--story-teal": activeThemeColors.teal,
        "--story-red": activeThemeColors.focus,
        "--story-line": hexToRgba(activeThemeColors.gold, 0.12),
        "--story-line-strong": hexToRgba(activeThemeColors.gold, 0.32),
        "--story-card-bg": hexToRgba(activeThemeColors.cardBg, 0.15),
        "--story-card-border": hexToRgba(activeThemeColors.cardBorder, 0.08),
        "--story-card-glow": hexToRgba(activeThemeColors.cardGlow, 0.06),
        "--story-content-max": `${activeLayoutSettings.contentMax}px`,
        "--story-reader-max": `${activeLayoutSettings.readerMax}px`,
        "--story-chapter-gap": `${activeLayoutSettings.chapterGap}px`,
        "--story-rail-width": `${activeLayoutSettings.railWidth}px`,
        "--story-mono-scale": activeLayoutSettings.monoScale,
      }}
    >
      {/* Background space canvas (No blocking pointer events) */}
      <div className="sandbox-space" aria-hidden="true" style={{ pointerEvents: "none" }}>
        <canvas
          ref={canvasRef}
          className="sandbox-starfield-canvas"
        />
      </div>

      {/* Floating Audio, Animation & Editor controls */}
      {!isDemoMode && (
      <div
        className="story-floating-controls"
        style={{
          position: "fixed",
          top: "80px",
          right: "24px",
          zIndex: 1100,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          maxWidth: "calc(100vw - 24px)",
          overflowX: "auto",
          scrollbarWidth: "none",
          background: "rgba(6, 9, 16, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "999px",
          padding: "6px 16px",
          backdropFilter: "blur(8px)",
        }}
      >
        <button
          onClick={() => setSoundEnabled((val) => !val)}
          style={{
            background: "none",
            border: "none",
            color: soundEnabled ? activeThemeColors.blue : "rgba(255, 255, 255, 0.7)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            fontWeight: "800",
          }}
          type="button"
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span>SFX: {soundEnabled ? "On" : "Off"}</span>
        </button>

        <span style={{ color: "rgba(255, 255, 255, 0.15)", fontSize: "0.8rem" }}>|</span>

        <button
          onClick={() => setMusicEnabled((val) => !val)}
          style={{
            background: "none",
            border: "none",
            color: musicEnabled ? activeThemeColors.gold : "rgba(255, 255, 255, 0.7)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            fontWeight: "800",
          }}
          type="button"
        >
          {musicEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span>Ambient: {musicEnabled ? "On" : "Off"}</span>
        </button>

        <span style={{ color: "rgba(255, 255, 255, 0.15)", fontSize: "0.8rem" }}>|</span>

        <button
          onClick={() => {
            setAnimationsEnabled((prev) => {
              const next = !prev;
              try {
                localStorage.setItem("indievaders_animations_enabled", String(next));
              } catch (e) {
                console.warn(e);
              }
              return next;
            });
          }}
          style={{
            background: "none",
            border: "none",
            color: animationsEnabled ? activeThemeColors.blue : "rgba(255, 255, 255, 0.7)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            fontWeight: "800",
          }}
          type="button"
        >
          <Sparkles size={14} />
          <span>Animations: {animationsEnabled ? "On" : "Off"}</span>
        </button>

        <span style={{ color: "rgba(255, 255, 255, 0.15)", fontSize: "0.8rem" }}>|</span>

        <button
          onClick={() => setCustomizerOpen(prev => !prev)}
          style={{
            background: "none",
            border: "none",
            color: customizerOpen ? activeThemeColors.gold : "rgba(255, 255, 255, 0.7)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            fontWeight: "800",
          }}
          type="button"
        >
          <Database size={14} />
          <span>UX: Visuals</span>
        </button>

        <span style={{ color: "rgba(255, 255, 255, 0.15)", fontSize: "0.8rem" }}>|</span>

        <button
          onClick={() => setTextEditorOpen(prev => !prev)}
          style={{
            background: "none",
            border: "none",
            color: textEditorOpen ? activeThemeColors.blue : "rgba(255, 255, 255, 0.7)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            fontWeight: "800",
          }}
          type="button"
        >
          <MousePointer2 size={14} />
          <span>TXT: Style</span>
        </button>
      </div>
      )}

      {/* Visual Editor (UX) Panel */}
      {!isDemoMode && customizerOpen && (
        <div
          className="customizer-panel"
          style={{
            position: "fixed",
            top: "140px",
            right: "24px",
            width: "320px",
            maxHeight: "calc(100vh - 180px)",
            overflowY: "auto",
            zIndex: 1090,
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(6, 9, 16, 0.88)",
            backdropFilter: "blur(16px)",
            padding: "20px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
            fontFamily: "Inter, sans-serif"
          }}
        >
          <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
            <h3 style={{ margin: 0, fontSize: "0.9rem", textTransform: "uppercase", fontFamily: "IBM Plex Mono", color: activeThemeColors.gold }}>Visual Editor (UX)</h3>
            <button
              onClick={() => setCustomizerOpen(false)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "0.8rem" }}
            >
              [X]
            </button>
          </header>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Tryb edycji */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>Text Editing:</span>
              <button
                onClick={() => setEditMode(prev => !prev)}
                style={{
                  background: editMode ? activeThemeColors.gold : "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "4px",
                  color: editMode ? "#060910" : "#fff",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontFamily: "IBM Plex Mono"
                }}
              >
                {editMode ? "ACTIVE (Click & Type)" : "INACTIVE"}
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              {[
                ["web", "Web"],
                ["before", "Before"],
                ["after", "After"],
                ["audio", "Audio"],
              ].map(([value, label]) => {
                const active = visualEditorTab === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setVisualEditorTab(value)}
                    style={{
                      border: `1px solid ${active ? activeThemeColors.gold : "rgba(255,255,255,0.1)"}`,
                      background: active ? hexToRgba(activeThemeColors.gold, 0.16) : "rgba(255,255,255,0.035)",
                      color: active ? activeThemeColors.ink : "rgba(255,255,255,0.68)",
                      borderRadius: "6px",
                      padding: "6px 4px",
                      cursor: "pointer",
                      fontSize: "0.58rem",
                      fontWeight: 800,
                      fontFamily: "IBM Plex Mono",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                forceFinalStageRef.current?.();
                setVisualEditorTab("after");
              }}
              style={{
                border: `1px solid ${hexToRgba(activeThemeColors.gold, 0.42)}`,
                background: hexToRgba(activeThemeColors.gold, 0.12),
                color: activeThemeColors.ink,
                borderRadius: "6px",
                padding: "8px 10px",
                cursor: "pointer",
                fontSize: "0.62rem",
                fontWeight: 900,
                fontFamily: "IBM Plex Mono",
                letterSpacing: 0,
                textTransform: "uppercase",
              }}
            >
              Final Stage
            </button>

            {visualEditorTab === "web" && (
              <>
            {/* Kolory motywu */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>Theme Colors:</span>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {themePresets.map((preset) => {
                  const presetTheme = deriveThemeColors(preset.colors);
                  const isActive =
                    presetTheme.bg.toLowerCase() === activeThemeColors.bg.toLowerCase()
                    && presetTheme.gold.toLowerCase() === activeThemeColors.gold.toLowerCase()
                    && presetTheme.ink.toLowerCase() === activeThemeColors.ink.toLowerCase();

                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyThemePreset(preset.id)}
                      style={{
                        border: `1px solid ${isActive ? activeThemeColors.gold : "rgba(255,255,255,0.12)"}`,
                        background: isActive ? hexToRgba(activeThemeColors.gold, 0.16) : "rgba(255,255,255,0.035)",
                        color: isActive ? activeThemeColors.ink : "rgba(255,255,255,0.72)",
                        borderRadius: "6px",
                        padding: "7px 8px",
                        cursor: "pointer",
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        fontFamily: "IBM Plex Mono",
                        textTransform: "uppercase",
                      }}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Background:</span>
                <input
                  type="color"
                  value={activeThemeColors.bg}
                  onChange={(e) => updateThemeColor("bg", e.target.value)}
                  style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Text Ink:</span>
                <input
                  type="color"
                  value={activeThemeColors.ink}
                  onChange={(e) => updateThemeColor("ink", e.target.value)}
                  style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Primary Accent:</span>
                <input
                  type="color"
                  value={activeThemeColors.gold}
                  onChange={(e) => updateThemeColor("gold", e.target.value)}
                  style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Glass Surface:</span>
                <input
                  type="color"
                  value={activeThemeColors.cardBg}
                  onChange={(e) => updateThemeColor("cardBg", e.target.value)}
                  style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Visual Add-ons:</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
                  {[
                    ["off", "Off"],
                    ["minimal", "Minimal"],
                    ["rich", "Rich"],
                  ].map(([value, label]) => {
                    const active = activeVisualSettings.addOns === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateVisualSetting("addOns", value)}
                        style={{
                          border: `1px solid ${active ? activeThemeColors.gold : "rgba(255,255,255,0.1)"}`,
                          background: active ? hexToRgba(activeThemeColors.gold, 0.16) : "rgba(255,255,255,0.035)",
                          color: active ? activeThemeColors.ink : "rgba(255,255,255,0.68)",
                          borderRadius: "6px",
                          padding: "6px 4px",
                          cursor: "pointer",
                          fontSize: "0.58rem",
                          fontWeight: 800,
                          fontFamily: "IBM Plex Mono",
                          textTransform: "uppercase",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>Layout Scale:</span>
              {[
                ["contentMax", "Page Max Width", 1100, 1840, 20, "px"],
                ["readerMax", "Hero/Text Width", 760, 1500, 20, "px"],
                ["chapterGap", "Text/Card Gap", 32, 180, 4, "px"],
                ["railWidth", "Left Rail Width", 130, 260, 5, "px"],
                ["monoScale", "Small Label Scale", 0.9, 1.25, 0.01, ""],
              ].map(([key, label, min, max, step, suffix]) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>{label}:</span>
                    <span style={{ fontSize: "0.7rem", color: "#fff" }}>{activeLayoutSettings[key]}{suffix}</span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={activeLayoutSettings[key]}
                    onChange={(e) => updateLayoutSetting(key, key === "monoScale" ? parseFloat(e.target.value) : parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: activeThemeColors.gold }}
                  />
                </div>
              ))}
            </div>

              </>
            )}

            {visualEditorTab === "before" && (
              <>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>Black Hole Colors:</span>
              {[
                ["accretionRing", "Accretion Ring"],
                ["glowInner", "Inner Glow"],
                ["glowOuter", "Outer Glow"],
              ].map(([key, label]) => (
                <div key={key} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>{label}:</span>
                  <input
                    type="color"
                    disabled={!isVisibleColor(activeSingularityColors[key])}
                    value={colorInputValue(activeSingularityColors[key])}
                    onChange={(e) => updateSingularityColor(key, e.target.value)}
                    style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px", opacity: isVisibleColor(activeSingularityColors[key]) ? 1 : 0.34 }}
                  />
                  <button
                    onClick={() => updateSingularityColor(key, isVisibleColor(activeSingularityColors[key]) ? "transparent" : defaultSingularityColors[key])}
                    style={{
                      background: isVisibleColor(activeSingularityColors[key]) ? "rgba(255,255,255,0.05)" : activeThemeColors.gold,
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "4px",
                      color: isVisibleColor(activeSingularityColors[key]) ? "rgba(255,255,255,0.72)" : "#060910",
                      cursor: "pointer",
                      fontSize: "0.55rem",
                      fontWeight: "800",
                      padding: "4px 6px",
                      textTransform: "uppercase",
                    }}
                    type="button"
                  >
                    {isVisibleColor(activeSingularityColors[key]) ? "Transparent" : "Color"}
                  </button>
                </div>
              ))}

              {[
                ["accretionWidth", "Accretion Width", 0.5, 8, 0.1, "px"],
                ["glowIntensity", "Glow Intensity", 0, 2, 0.05, ""],
                ["pulseIntensity", "Pulsation Intensity", 0, 1, 0.05, ""],
                ["nebulaIntensity", "Space Cloud Intensity", 0, 2, 0.05, ""],
              ].map(([key, label, min, max, step, suffix]) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>{label}:</span>
                    <span style={{ fontSize: "0.7rem", color: "#fff" }}>{activeSingularityStyle[key]}{suffix}</span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={activeSingularityStyle[key]}
                    onChange={(e) => updateSingularityStyle(key, parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: activeThemeColors.gold }}
                  />
                </div>
              ))}
            </div>

            {/* Liczba Gwiazd i Fizyka */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>Starfield & Physics:</span>
              
              {[
                ["layer0Count", "Background dust (Layer 0)", 900],
                ["layer1Count", "Mid stars (Layer 1)", 620],
                ["layer2Count", "Bright feed stars (Layer 2)", 360],
              ].map(([key, label, max]) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>{label}:</span>
                    <span style={{ fontSize: "0.7rem", color: "#fff" }}>{starSettings[key]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={max}
                    value={starSettings[key]}
                    onChange={(e) => updateStarSetting(key, parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: activeThemeColors.gold }}
                  />
                </div>
              ))}

              <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.42)" }}>
                Total visible star bodies: {starSettings.layer0Count + starSettings.layer1Count + starSettings.layer2Count}
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Cursor Gravity:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{starSettings.cursorGravity}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={starSettings.cursorGravity}
                  onChange={(e) => updateStarSetting("cursorGravity", parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Galaxy Drift Speed:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{starSettings.baseDriftSpeed}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.5"
                  step="0.05"
                  value={starSettings.baseDriftSpeed}
                  onChange={(e) => updateStarSetting("baseDriftSpeed", parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Twinkle Speed:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{starSettings.twinkleSpeed}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={starSettings.twinkleSpeed}
                  onChange={(e) => updateStarSetting("twinkleSpeed", parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Black Hole Growth Speed:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>+{(starSettings.blackHoleGrowthRate * 10).toFixed(0)}% per star</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={starSettings.blackHoleGrowthRate}
                  onChange={(e) => updateStarSetting("blackHoleGrowthRate", parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>

              {[
                ["firstCollapseStars", "First Collapse Stars", 10, 70, 1, " stars"],
                ["secondCollapseStars", "Second Collapse Stars", 10, 80, 1, " stars"],
                ["blackHoleGravityReach", "Gravity Reach", 0.45, 1.25, 0.05, "x"],
                ["mergerPace", "Merger Pace", 0.2, 1.4, 0.05, "x"],
                ["mergerPull", "Merger Pull", 0.4, 1.8, 0.05, "x"],
              ].map(([key, label, min, max, step, suffix]) => {
                const isInteger = key === "firstCollapseStars" || key === "secondCollapseStars";
                const value = starSettings[key] ?? defaultStarSettings[key];
                const displayValue = isInteger ? Math.round(value) : Number(value).toFixed(2).replace(/\.?0+$/, "");
                return (
                  <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>{label}:</span>
                      <span style={{ fontSize: "0.7rem", color: "#fff" }}>{displayValue}{suffix}</span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={value}
                      onChange={(e) => updateStarSetting(key, isInteger ? parseInt(e.target.value) : parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: activeThemeColors.gold }}
                    />
                  </div>
                );
              })}

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Black Hole Gravity Pull:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>
                    {Number(starSettings.blackHoleGravity ?? defaultStarSettings.blackHoleGravity).toFixed(2).replace(/\.?0+$/, "")}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.5"
                  step="0.05"
                  value={starSettings.blackHoleGravity !== undefined ? starSettings.blackHoleGravity : 0.45}
                  onChange={(e) => updateStarSetting("blackHoleGravity", parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>
            </div>

              </>
            )}

            {visualEditorTab === "after" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>Galaxy After:</span>
                {[
                  ["finalGalaxySeedCount", "Orbiting Stars", 80, 520, 10, ""],
                  ["finalGalaxyReach", "Final Gravity Reach", 0.7, 2.2, 0.05, ""],
                  ["finalGalaxyWarmth", "Golden Star Mix", 0, 1, 0.05, ""],
                ].map(([key, label, min, max, step, suffix]) => (
                  <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>{label}:</span>
                      <span style={{ fontSize: "0.7rem", color: "#fff" }}>
                        {key === "finalGalaxyWarmth"
                          ? `${Math.round((starSettings[key] ?? defaultStarSettings[key]) * 100)}%`
                          : `${key === "finalGalaxySeedCount"
                            ? Math.round(starSettings[key] ?? defaultStarSettings[key])
                            : Number(starSettings[key] ?? defaultStarSettings[key]).toFixed(2).replace(/\.?0+$/, "")}${suffix}`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={starSettings[key] ?? defaultStarSettings[key]}
                      onChange={(e) => updateStarSetting(key, key === "finalGalaxySeedCount" ? parseInt(e.target.value) : parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: activeThemeColors.gold }}
                    />
                  </div>
                ))}
              </div>
            )}

            {visualEditorTab === "audio" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>Audio:</span>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Ambient Layer:</span>
                  <select
                    value={ambientLayer}
                    onChange={(e) => setAmbientLayer(e.target.value)}
                    style={{ background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontSize: "0.65rem", padding: "4px 6px", width: "100%" }}
                  >
                    <option value="">No ambient layer</option>
                    <option value="procedural">Procedural deep-space drone</option>
                  </select>
                </div>

                {[
                  ["sfx", "SFX Volume", sfxVolume, 0, 1, 0.05, setSfxVolume],
                  ["ambient", "Ambient Volume", musicVolume, 0, 0.2, 0.005, setMusicVolume],
                ].map(([key, label, value, min, max, step, setter]) => (
                  <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>{label}:</span>
                      <span style={{ fontSize: "0.7rem", color: "#fff" }}>{key === "ambient" ? `${Math.round((value / 0.2) * 100)}%` : `${Math.round(value * 100)}%`}</span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={value}
                      onChange={(e) => setter(parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: activeThemeColors.gold }}
                    />
                  </div>
                ))}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
                  {[
                    ["select", "Select"],
                    ["burst", "Burst"],
                    ["unlock", "Spawn"],
                    ["impact", "Impact"],
                  ].map(([eventName, label]) => (
                    <button
                      key={eventName}
                      type="button"
                      onClick={() => playCustomSfx(eventName)}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "4px",
                        color: "#fff",
                        fontSize: "0.6rem",
                        fontWeight: 800,
                        padding: "6px 8px",
                        cursor: "pointer",
                        fontFamily: "IBM Plex Mono",
                        textTransform: "uppercase",
                      }}
                    >
                      Test {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Metadane */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>Project Name:</span>
              <input
                type="text"
                value={projectName}
                onChange={(e) => {
                  const val = e.target.value;
                  setReportData(prev => {
                    const next = { ...prev, meta: { ...prev.meta, projectName: val } };
                    try {
                      localStorage.setItem("indievaders_live_report_data", JSON.stringify(next));
                    } catch {
                      /* ignore */
                    }
                    return next;
                  });
                }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  color: "#fff",
                  padding: "4px 8px",
                  fontSize: "0.75rem",
                  fontFamily: "IBM Plex Mono"
                }}
              />
            </div>

            {/* Akcje zapisu/eksportu */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <button
                onClick={() => {
                  const fullConfig = {
                    themeColors,
                    heroData,
                    chapters: chaptersState,
                    report: reportData,
                    textStyles,
                    layoutSettings,
                    singularityColors,
                    singularityStyle,
                    starSettings,
                    sfxSettings,
                    soundLibrary,
                    ambientLayer
                  };
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullConfig, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", `${projectName.toLowerCase()}-report-config.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                style={{
                  background: activeThemeColors.gold,
                  border: "none",
                  borderRadius: "4px",
                  color: "#060910",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontFamily: "IBM Plex Mono",
                  textAlign: "center"
                }}
              >
                Export Config JSON
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset all custom edits?")) {
                    try {
                      localStorage.removeItem("indievaders_live_report_data");
                      localStorage.removeItem("indievaders_live_hero_data");
                      localStorage.removeItem("indievaders_live_chapters");
                      localStorage.removeItem("indievaders_theme_colors");
                      localStorage.removeItem("indievaders_text_styles");
                      localStorage.removeItem("indievaders_layout_settings");
                      localStorage.removeItem("indievaders_singularity_colors");
                      localStorage.removeItem("indievaders_singularity_style");
                      localStorage.removeItem("indievaders_star_settings");
                      localStorage.removeItem("indievaders_sfx_settings");
                      localStorage.removeItem("indievaders_uploaded_sounds");
                      localStorage.removeItem("indievaders_sound_library");
                      localStorage.removeItem("indievaders_music_enabled");
                      localStorage.removeItem("indievaders_ambient_layer");
                      localStorage.removeItem("indievaders_rivals_text");
                      localStorage.removeItem("indievaders_promise_text");
                      localStorage.removeItem("indievaders_proof_board_gates");
                      localStorage.removeItem("indievaders_rival_categories");
                      localStorage.removeItem("indievaders_promise_options");
                    } catch {
                      /* ignore */
                    }
                    setReportData(report);
                    setHeroData({
                      label: "Client report direction",
                      title: "Read the market like a journey. Open the tools when the question gets interesting.",
                      desc: "This unified report combines step-by-step scrollytelling with interactive storefront promise playground, and deep-dive evidence ledgers for power users."
                    });
                    setChaptersState(chapters);
                    setRivalsText({
                      label: "Rival stories",
                      title: "Open games as clues, not as a spreadsheet.",
                      desc: "A client should first see why a reference matters. The deeper workspace can keep the full table, but the report should turn each game into a decision: borrow, avoid, or refresh the data."
                    });
                    setPromiseText({
                      label: "Storefront promise",
                      title: "Let the promise change the proof.",
                      desc: "This is where a paid report becomes a tool: choosing a public angle changes the tag stack, trailer beat, and proof gates instead of showing another block of advice."
                    });
                    setProofBoardGates([
                      ["Hook", "Players understand the fantasy before systems are explained."],
                      ["Feel", "The first fight earns a 4/5 combat-feel read with low confusion."],
                      ["Return", "Players ask what changes next and want another attempt."],
                      ["Promise", "Steam copy names only what the playable proof can show."],
                    ]);
                    setRivalCategoriesState(rivalCategories);
                    setPromiseOptionsState(promiseOptions);
                    setThemeColors(defaultThemeColors);
                    setVisualSettings(defaultVisualSettings);
                    setTextStyles({});
                    setLayoutSettings(defaultLayoutSettings);
                    setSingularityColors(defaultSingularityColors);
                    setSingularityStyle(defaultSingularityStyle);
                    setStarSettings(defaultStarSettings);
                    setAmbientLayer("procedural");
                    setMusicEnabled(false);
                    setSelectedTextId(null);
                    setEditMode(false);
                  }
                }}
                style={{
                  background: "rgba(255,50,50,0.15)",
                  border: "1px solid rgba(255,50,50,0.4)",
                  borderRadius: "4px",
                  color: "#ff8888",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontFamily: "IBM Plex Mono",
                  textAlign: "center"
                }}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Text Styler (TXT) Panel */}
      {!isDemoMode && textEditorOpen && (
        <div
          className="text-editor-panel"
          style={{
            position: "fixed",
            top: "140px",
            right: customizerOpen ? "360px" : "24px",
            width: "320px",
            maxHeight: "calc(100vh - 180px)",
            overflowY: "auto",
            zIndex: 1090,
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(6, 9, 16, 0.88)",
            backdropFilter: "blur(16px)",
            padding: "20px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
            fontFamily: "Inter, sans-serif",
            transition: "right 0.3s ease"
          }}
        >
          <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
            <h3 style={{ margin: 0, fontSize: "0.9rem", textTransform: "uppercase", fontFamily: "IBM Plex Mono", color: activeThemeColors.gold }}>Text Styler (TXT)</h3>
            <button
              onClick={() => setTextEditorOpen(false)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "0.8rem" }}
            >
              [X]
            </button>
          </header>

          {!selectedTextId ? (
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px 0" }}>
              Click on a text element on the page to customize its typography and size.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", fontFamily: "IBM Plex Mono" }}>Target: {selectedTextId}</span>
                <button
                  onClick={() => setSelectedTextId(null)}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "none",
                    borderRadius: "4px",
                    color: "#fff",
                    fontSize: "0.6rem",
                    padding: "2px 6px",
                    cursor: "pointer",
                    fontFamily: "IBM Plex Mono"
                  }}
                >
                  Deselect
                </button>
              </div>

              {/* Font Family */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Font Family:</span>
                <select
                  value={
                    ["Inter", "IBM Plex Mono", "Georgia", "system-ui", "Arial", "Segoe UI", "Calibri", "Trebuchet MS", "Impact", "Garamond", "Consolas"].includes(textStyles[selectedTextId]?.fontFamily)
                      ? textStyles[selectedTextId]?.fontFamily
                      : textStyles[selectedTextId]?.fontFamily ? "custom" : "Inter"
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "custom") {
                      handleTextStyleChange(selectedTextId, "fontFamily", "");
                    } else {
                      handleTextStyleChange(selectedTextId, "fontFamily", val);
                    }
                  }}
                  style={{ background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontSize: "0.7rem", padding: "4px" }}
                >
                  <option value="Inter">Inter (Sans-serif)</option>
                  <option value="IBM Plex Mono">IBM Plex Mono (Monospace)</option>
                  <option value="Georgia">Georgia (Serif)</option>
                  <option value="system-ui">System Default (system-ui)</option>
                  <option value="Arial">Arial</option>
                  <option value="Segoe UI">Segoe UI</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Trebuchet MS">Trebuchet MS</option>
                  <option value="Impact">Impact</option>
                  <option value="Garamond">Garamond</option>
                  <option value="Consolas">Consolas</option>
                  <option value="custom">Custom System Font...</option>
                </select>
                
                {(!["Inter", "IBM Plex Mono", "Georgia", "system-ui", "Arial", "Segoe UI", "Calibri", "Trebuchet MS", "Impact", "Garamond", "Consolas"].includes(textStyles[selectedTextId]?.fontFamily) || textStyles[selectedTextId]?.fontFamily === "") && (
                  <input
                    type="text"
                    value={textStyles[selectedTextId]?.fontFamily || ""}
                    placeholder="Type local system font name..."
                    onChange={(e) => handleTextStyleChange(selectedTextId, "fontFamily", e.target.value)}
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "4px",
                      color: "#fff",
                      padding: "4px 8px",
                      fontSize: "0.7rem",
                      marginTop: "4px"
                    }}
                  />
                )}
              </div>

              {/* Font Size */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Font Size:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{textStyles[selectedTextId]?.fontSize || "default"}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={parseInt(textStyles[selectedTextId]?.fontSize) || 16}
                  onChange={(e) => handleTextStyleChange(selectedTextId, "fontSize", `${e.target.value}px`)}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>

              {/* Font Weight */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Font Weight:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{textStyles[selectedTextId]?.fontWeight || "default"}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="900"
                  step="100"
                  value={parseInt(textStyles[selectedTextId]?.fontWeight) || 400}
                  onChange={(e) => handleTextStyleChange(selectedTextId, "fontWeight", e.target.value)}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>

              {/* Text Align */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Text Align:</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {["left", "center", "right", "justify"].map((align) => {
                    const active = textStyles[selectedTextId]?.textAlign === align;
                    return (
                      <button
                        key={align}
                        onClick={() => handleTextStyleChange(selectedTextId, "textAlign", align)}
                        style={{
                          flex: 1,
                          background: active ? activeThemeColors.gold : "rgba(255,255,255,0.05)",
                          border: "none",
                          borderRadius: "4px",
                          color: active ? "#060910" : "#fff",
                          fontSize: "0.65rem",
                          padding: "4px 0",
                          cursor: "pointer",
                          textTransform: "capitalize",
                          fontWeight: active ? "bold" : "normal"
                        }}
                      >
                        {align}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Letter Spacing */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Letter Spacing:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{textStyles[selectedTextId]?.letterSpacing || "default"}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="20"
                  step="0.5"
                  value={parseFloat(textStyles[selectedTextId]?.letterSpacing) || 0}
                  onChange={(e) => handleTextStyleChange(selectedTextId, "letterSpacing", `${e.target.value}px`)}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>

              {/* Line Height */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Line Height:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{textStyles[selectedTextId]?.lineHeight || "default"}</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="3"
                  step="0.05"
                  value={parseFloat(textStyles[selectedTextId]?.lineHeight) || 1.5}
                  onChange={(e) => handleTextStyleChange(selectedTextId, "lineHeight", e.target.value)}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>

              {/* Max Width */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Max Width:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{textStyles[selectedTextId]?.maxWidth || "none"}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="range"
                    min="200"
                    max="2000"
                    step="10"
                    disabled={textStyles[selectedTextId]?.maxWidth === "none"}
                    value={textStyles[selectedTextId]?.maxWidth !== "none" ? parseInt(textStyles[selectedTextId]?.maxWidth) || 800 : 800}
                    onChange={(e) => handleTextStyleChange(selectedTextId, "maxWidth", `${e.target.value}px`)}
                    style={{ flex: 1, accentColor: activeThemeColors.gold, opacity: textStyles[selectedTextId]?.maxWidth === "none" ? 0.3 : 1 }}
                  />
                  <button
                    onClick={() => {
                      const isNone = textStyles[selectedTextId]?.maxWidth === "none";
                      handleTextStyleChange(selectedTextId, "maxWidth", isNone ? "800px" : "none");
                    }}
                    style={{
                      background: textStyles[selectedTextId]?.maxWidth === "none" ? activeThemeColors.gold : "rgba(255,255,255,0.08)",
                      border: "none",
                      borderRadius: "4px",
                      color: textStyles[selectedTextId]?.maxWidth === "none" ? "#060910" : "#fff",
                      fontSize: "0.65rem",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    None
                  </button>
                </div>
              </div>

              {/* Box Min Height */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Box Min Height:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{textStyles[selectedTextId]?.minHeight || "auto"}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="range"
                    min="0"
                    max="800"
                    step="10"
                    value={parseInt(textStyles[selectedTextId]?.minHeight) || 0}
                    onChange={(e) => handleTextStyleChange(selectedTextId, "minHeight", e.target.value === "0" ? undefined : `${e.target.value}px`)}
                    style={{ flex: 1, accentColor: activeThemeColors.gold }}
                  />
                  <button
                    onClick={() => handleTextStyleChange(selectedTextId, "minHeight", undefined)}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "0.65rem",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Auto
                  </button>
                </div>
              </div>

              {/* Text Color */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Font Color:</span>
                <input
                  type="color"
                  value={textStyles[selectedTextId]?.color || "#e2e8f0"}
                  onChange={(e) => handleTextStyleChange(selectedTextId, "color", e.target.value)}
                  style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px" }}
                />
              </div>

            </div>
          )}
        </div>
      )}


      <header className="story-header">
        <a href="#client-report/refractured">{projectName}</a>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>{projectName} Unified Report Experience</span>
      </header>

      {/* Left side fixed chapter progress navigation */}
      <ChapterProgress
        activeChapterId={activeChapterId}
        progress={progress}
        chapters={chaptersState}
      />

      {/* Redesigned Centered Hero Section */}
      <section className="story-hero">
        {activeVisualSettings.addOns !== "off" && (
          <div
            className="story-hero-icon-wrapper"
            style={{
              borderColor: hexToRgba(activeThemeColors.gold, activeVisualSettings.addOns === "rich" ? 0.34 : 0.16),
              background: activeVisualSettings.addOns === "rich" ? hexToRgba(activeThemeColors.gold, 0.08) : "rgba(255,255,255,0.02)",
              color: activeThemeColors.gold,
              boxShadow: activeVisualSettings.addOns === "rich" ? `0 0 22px ${hexToRgba(activeThemeColors.gold, 0.22)}` : "none",
            }}
          >
            <Sparkles size={20} />
          </div>
        )}
      <p className="story-label">
        <EditableText
          id="hero-label"
          value={heroData.label}
          editMode={canEditText}
          textStyles={textStyles}
          onFocus={handleSelectText}
          selectedTextId={selectedTextId}
          onStyleChange={handleTextStyleChange}
          onSave={(val) => saveHeroData("label", val)}
        />
      </p>
      <h1>
        <EditableText
          id="hero-title"
          value={heroData.title}
          editMode={canEditText}
          textStyles={textStyles}
          onFocus={handleSelectText}
          selectedTextId={selectedTextId}
          onStyleChange={handleTextStyleChange}
          onSave={(val) => saveHeroData("title", val)}
        />
      </h1>
      <p>
        <EditableText
          id="hero-desc"
          value={heroData.desc}
          editMode={canEditText}
          textStyles={textStyles}
          onFocus={handleSelectText}
          selectedTextId={selectedTextId}
          onStyleChange={handleTextStyleChange}
          onSave={(val) => saveHeroData("desc", val)}
        />
      </p>
        <a
          className="story-primary-link"
          href="#story-read"
          onClick={(event) => {
            const target = document.getElementById("story-read");
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}
        >
          Start the report <ArrowRight aria-hidden="true" size={18} />
        </a>
      </section>

      {/* Chapter Sections Stack */}
      <div className="story-thread">
        {chaptersState.map((chapter, index) => (
          <ChapterSection
            chapter={chapter}
            index={index}
            key={chapter.id}
            onOpenExplorer={handleOpenExplorer}
            onSetRef={handleSetRef}
            editMode={canEditText}
            onSaveText={saveChapterText}
            onSaveBodyLine={saveChapterBodyLine}
            textStyles={textStyles}
            onFocusText={handleSelectText}
            selectedTextId={selectedTextId}
            onStyleChange={handleTextStyleChange}
            onHoverSfx={() => playCustomSfx('hover')}
            isActive={chapter.id === activeChapterId}
          />
        ))}
      </div>

      {/* Inline widgets, fully unlocked and active */}
      <div className="story-widget-wrapper" style={{ position: "relative" }}>
        <RivalStories
          categories={rivalCategoriesState}
          comparables={comparables}
          editMode={canEditText}
          onFocusText={handleSelectText}
          onSaveCategoryText={saveCategoryText}
          onSaveComparableText={saveComparableText}
          onSaveSectionText={saveRivalsText}
          onSelectSfx={() => playCustomSfx('select')}
          onStyleChange={handleTextStyleChange}
          projectName={projectName}
          sectionText={rivalsText}
          selectedTextId={selectedTextId}
          textStyles={textStyles}
        />
      </div>

      <div className="story-widget-wrapper" style={{ position: "relative" }}>
        <PromiseBuilder
          editMode={canEditText}
          onFocusText={handleSelectText}
          onSaveOptionText={savePromiseOptionText}
          onSaveSectionText={savePromiseText}
          onSelectSfx={() => playCustomSfx('select')}
          onStyleChange={handleTextStyleChange}
          positioningAngles={promiseBuilderOptions}
          sectionText={promiseText}
          selectedTextId={selectedTextId}
          textStyles={textStyles}
        />
      </div>

      <div className="story-widget-wrapper" style={{ position: "relative" }}>
        <ProofBoard
          editMode={canEditText}
          gates={proofBoardGates}
          onFocusText={handleSelectText}
          onSaveGateText={saveProofBoardGateText}
          onStyleChange={handleTextStyleChange}
          selectedTextId={selectedTextId}
          textStyles={textStyles}
        />
      </div>

      {/* Deep-dive Launcher */}
      <DeepDiveLauncher
        comparables={comparables}
        onOpenExplorer={handleOpenExplorer}
      />

      {/* Slide-out Overlay drawer panel for high-density tools */}
      {activeDrawerSection && (
        <div className="glass-overlay-portal">
          <div className="glass-overlay-container">
            <header className="glass-overlay-header">
              <h2>
                {activeDrawerSection === "Market Map" && "Comparable Market Map"}
                {activeDrawerSection === "Player DNA" && "Audience Signals & Player DNA"}
                {activeDrawerSection === "Rival Stories" && "Comparable Market Board"}
                {activeDrawerSection === "Promise Builder" && "Steam Page Positioning & Loop Lab"}
                {activeDrawerSection === "Proof Board" && "Action Plan & Timeline"}
                {activeDrawerSection === "Evidence Vault" && "Evidence Ledger"}
              </h2>
              <button className="glass-overlay-close-btn" onClick={handleCloseExplorer} type="button">
                Close [ESC]
              </button>
            </header>
            <div className="glass-overlay-content-scroll">
              <div className="glass-overlay-split-panels">
                {activeDrawerSection === "Market Map" && (
                  <>
                    <MarketMap
                      marketEvidence={reportData.marketEvidence}
                      onEvidenceOpen={openEvidenceDrawer}
                      thesis={reportData.thesis}
                    />
                    <ReviewCommunityThemes
                      onEvidenceOpen={openEvidenceDrawer}
                      reviewCommunityThemes={reportData.reviewCommunityThemes}
                    />
                  </>
                )}
                {activeDrawerSection === "Player DNA" && (
                  <AudienceSignals
                    audienceSignals={reportData.audienceSignals}
                    onEvidenceOpen={openEvidenceDrawer}
                  />
                )}
                {activeDrawerSection === "Rival Stories" && (
                  <ComparableExplorer
                    marketEvidence={reportData.marketEvidence}
                    onEvidenceOpen={openEvidenceDrawer}
                  />
                )}
                {activeDrawerSection === "Promise Builder" && (
                  <>
                    <SteamPositioningBuilder
                      onEvidenceOpen={openEvidenceDrawer}
                      steamPageLab={reportData.steamPageLab}
                    />
                    <RogueliteLoopLab
                      onEvidenceOpen={openEvidenceDrawer}
                      rogueliteLoopLab={reportData.rogueliteLoopLab}
                    />
                  </>
                )}
                {activeDrawerSection === "Proof Board" && (
                  <ActionPlanTimeline
                    actionPlan={reportData.actionPlan}
                    onEvidenceOpen={openEvidenceDrawer}
                    strategicPaths={reportData.strategicPaths}
                  />
                )}
                {activeDrawerSection === "Evidence Vault" && (
                  <ComparableExplorer
                    marketEvidence={reportData.marketEvidence}
                    onEvidenceOpen={openEvidenceDrawer}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Evidence Ledger Overlay */}
      <RefracturedEvidenceDrawer
        activeRefs={activeEvidenceRefs}
        evidence={reportData.evidenceLedger}
        onClose={closeEvidenceDrawer}
        open={evidenceDrawerOpen}
        showAll={showAllEvidence}
      />
    </main>
  );
}
