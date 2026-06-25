/* eslint-disable react-hooks/immutability */
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ArrowRight, Database, ExternalLink, LineChart, MousePointer2, Play, Sparkles, Volume2, VolumeX } from "lucide-react";
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
  {
    name: "MUSCKeyd_NATURAL-Natural Single Piano Note Ping A 07_Ocular_Felt.wav",
    url: "/sfx/MUSCKeyd_NATURAL-Natural Single Piano Note Ping A 07_Ocular_Felt.wav",
  },
];

const defaultSfxSettings = {
  select: { soundName: "pixel-select.wav", volume: 0.8 },
  burst: { soundName: "__piano_cascade", volume: 0.82 },
  unlock: { soundName: "DSGNBoom_BOOM-Distant_Ocular_Foundation.wav", volume: 0.62 },
  impact: { soundName: "DSGNBoom_BOOM-Quake_Ocular_Foundation.wav", volume: 0.72 },
  hover: { soundName: "pixel-select.wav", volume: 0.2 },
};

const defaultThemeColors = {
  bg: "#000000",
  ink: "#e2e8f0",
  gold: "#73e4ce",
  blue: "#73e4ce",
  teal: "#73e4ce",
  focus: "#73e4ce",
  cardBg: "#04060a",
  cardBorder: "#ffffff",
  cardGlow: "#ffffff",
};

const defaultSingularityColors = {
  accretionRing: "#ffffff",
  glowInner: "#ffffff",
  glowOuter: "#ffffff",
  lensingRing: "#ffffff",
};

const defaultSingularityStyle = {
  accretionWidth: 2.5,
  accretionSoftness: 1,
  lensingWidth: 1,
  lensingIntensity: 1,
  glowIntensity: 1,
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
  blackHoleGrowthRate: 2.5,
  blackHoleGravity: 0.45,
};

const legacySparseStarDefaults = {
  layer0Count: 150,
  layer1Count: 100,
  layer2Count: 50,
};

function normalizeStarSettings(savedSettings = {}) {
  const next = { ...defaultStarSettings, ...savedSettings };
  const wasSparseDefault =
    Number(savedSettings.layer0Count) === legacySparseStarDefaults.layer0Count
    && Number(savedSettings.layer1Count) === legacySparseStarDefaults.layer1Count
    && Number(savedSettings.layer2Count) === legacySparseStarDefaults.layer2Count;

  return wasSparseDefault
    ? { ...next, ...defaultStarSettings }
    : next;
}

function normalizeThemeColors(savedColors = {}) {
  const next = { ...defaultThemeColors, ...savedColors };
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

  return next;
}

function normalizeSfxSetting(setting, fallback) {
  if (!setting) return fallback;
  if (Object.prototype.hasOwnProperty.call(setting, "soundName")) {
    return {
      soundName: setting.soundName,
      volume: setting.volume ?? fallback.volume,
    };
  }

  const legacyValue = setting.value;
  const legacyName =
    legacyValue === "pixel-select"
      ? "pixel-select.wav"
      : legacyValue === "pixel-burst"
        ? "pixel-burst.wav"
        : legacyValue === "pixel-unlock"
          ? "pixel-unlock.wav"
          : legacyValue;

  return {
    soundName: legacyName || fallback.soundName,
    volume: setting.volume ?? fallback.volume,
  };
}

function normalizeSfxSettings(savedSettings) {
  const normalized = Object.fromEntries(
    Object.entries(defaultSfxSettings).map(([key, fallback]) => [
      key,
      normalizeSfxSetting(savedSettings?.[key], fallback),
    ]),
  );

  if (normalized.unlock?.soundName === "pixel-unlock.wav") {
    normalized.unlock = defaultSfxSettings.unlock;
  }

  return normalized;
}

function mergeDefaultSoundLibrary(savedLibrary = []) {
  const soundsByName = new Map();

  defaultSoundLibrary.forEach((sound) => {
    soundsByName.set(sound.name, sound);
  });

  if (Array.isArray(savedLibrary)) {
    savedLibrary.forEach((sound) => {
      if (sound?.name && sound?.url) {
        soundsByName.set(sound.name, sound);
      }
    });
  }

  return Array.from(soundsByName.values());
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
function ChapterSection({ chapter, index, onSetRef, onOpenExplorer, editMode, onSaveText, onSaveBodyLine, textStyles, onFocusText, selectedTextId, onStyleChange, onHoverSfx }) {
  return (
    <section
      className="story-chapter"
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

  const [currentLocalPath, setCurrentLocalPath] = useState("");
  const [selectedLocalSound, setSelectedLocalSound] = useState("");
  const [soundDropActive, setSoundDropActive] = useState(false);
  const [pianoImporting, setPianoImporting] = useState(false);
  const [soundLibraryNotice, setSoundLibraryNotice] = useState("");
  const [localDirEntries, setLocalDirEntries] = useState([]);
  const [localBrowsingLoading, setLocalBrowsingLoading] = useState(false);
  const [localBrowsingError, setLocalBrowsingError] = useState("");

  useEffect(() => {
    if (isDemoMode) return undefined;

    let active = true;
    const fetchLocalDir = async () => {
      setLocalBrowsingLoading(true);
      setLocalBrowsingError("");
      try {
        const response = await fetch(`/api/sfx-browse?dir=${encodeURIComponent(currentLocalPath)}`);
        if (!response.ok) throw new Error("Failed to load local directory");
        const data = await response.json();
        if (active) {
          setLocalDirEntries(data);
        }
      } catch (err) {
        if (active) {
          setLocalBrowsingError(err.message);
        }
      } finally {
        if (active) {
          setLocalBrowsingLoading(false);
        }
      }
    };
    fetchLocalDir();
    return () => {
      active = false;
    };
  }, [currentLocalPath, isDemoMode]);

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

  const [soundLibrary, setSoundLibrary] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_sound_library");
      if (saved) return mergeDefaultSoundLibrary(JSON.parse(saved));
    } catch {
      // ignore
    }
    return defaultSoundLibrary;
  });

  useEffect(() => {
    try {
      localStorage.setItem("indievaders_sound_library", JSON.stringify(soundLibrary));
    } catch {
      // ignore
    }
  }, [soundLibrary]);

  const [sfxSettings, setSfxSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("indievaders_sfx_settings");
      if (saved) {
        return normalizeSfxSettings(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    return defaultSfxSettings;
  });

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

  useEffect(() => {
    const liveTheme = { ...defaultThemeColors, ...themeColors };
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
    setThemeColors(prev => ({ ...defaultThemeColors, ...prev, [key]: value }));
  }, [setThemeColors]);

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
  const passiveFeedComboRef = useRef(0);
  const lastPassiveFeedSfxTimeRef = useRef(0);

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
  }, [setSoundLibrary]);

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

  useEffect(() => {
    primeRawAudio("/sfx/DSGNBoom_BOOM-Distant_Ocular_Foundation.wav");
    primeRawAudio("/sfx/DSGNBoom_BOOM-Quake_Ocular_Foundation.wav");
  }, [primeRawAudio]);

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

    const pianoCascadeSounds = soundLibrary
      .filter((item) => /piano|keyd|note|ping/i.test(item.name))
      .sort((left, right) => left.name.localeCompare(right.name, undefined, { numeric: true }));
    const usePianoCascade = eventName === "burst" && setting.soundName === "__piano_cascade";
    const sound = usePianoCascade
      ? pianoCascadeSounds[Math.min(feedComboRef.current - 1, pianoCascadeSounds.length - 1)]
        ?? soundLibrary.find((item) => item.name === "MUSCKeyd_NATURAL-Natural Single Piano Note Ping A 07_Ocular_Felt.wav")
        ?? soundLibrary.find((item) => item.name === "pixel-burst.wav")
      : soundLibrary.find((item) => item.name === setting.soundName);
    if (!sound?.url) {
      playSfx(eventName);
      return;
    }

    try {
      const audio = new Audio(sound.url);
      const eventVolume = Number.isFinite(setting.volume) ? setting.volume : 1;
      audio.volume = Math.max(0, Math.min(1, eventVolume * sfxVolumeRef.current));

      if (eventName === "burst") {
        audio.playbackRate = usePianoCascade
          ? Math.min(1.72, 1 + (feedComboRef.current - 1) * (pianoCascadeSounds.length > 1 ? 0.035 : 0.075))
          : Math.min(1.4, 1 + (feedComboRef.current - 1) * 0.06 + Math.random() * 0.035);
      } else {
        audio.playbackRate = 0.95 + Math.random() * 0.1;
      }

      if ((eventName === "unlock" || eventName === "impact") && sound.url.includes("DSGNBoom_BOOM")) {
        playRawAudio(sound.url, audio.volume, audio.playbackRate);
        return;
      }

      audio.play().catch(warnCustomAudioFailure);
    } catch (err) {
      warnCustomAudioFailure(err);
    }
  }, [soundEnabled, sfxSettings, soundLibrary, playSfx, playRawAudio, warnCustomAudioFailure]);

  const previewSound = useCallback((url, volume = 1) => {
    if (!url) return;

    try {
      const audio = new Audio(url);
      audio.volume = Math.max(0, Math.min(1, volume * sfxVolumeRef.current));
      audio.play().catch(warnCustomAudioFailure);
    } catch (err) {
      warnCustomAudioFailure(err);
    }
  }, [warnCustomAudioFailure]);

  const addSoundFilesToLibrary = useCallback((fileList) => {
    const files = Array.from(fileList || []).filter((file) =>
      file.type.startsWith("audio/") || /\.(wav|mp3|ogg|m4a|aac|flac)$/i.test(file.name),
    );

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        setSoundLibrary((prev) => (
          prev.some((sound) => sound.name === file.name)
            ? prev.map((sound) => (sound.name === file.name ? { ...sound, url } : sound))
            : [...prev, { name: file.name, url }]
        ));
      };
      reader.readAsDataURL(file);
    });
  }, [setSoundLibrary]);

  const importPianoSeries = async () => {
    setPianoImporting(true);
    setSoundLibraryNotice("");
    try {
      const folder = "Na Stronkę Indievaders/Piano";
      const response = await fetch(`/api/sfx-browse?dir=${encodeURIComponent(folder)}`);
      if (!response.ok) throw new Error("Piano folder not found");
      const entries = await response.json();
      const audioEntries = entries.filter((entry) => !entry.isDir && /\.(wav|mp3)$/i.test(entry.name));
      const copied = await Promise.all(audioEntries.map(async (entry) => {
        const filePath = `${folder}/${entry.name}`;
        const copyResponse = await fetch(`/api/sfx-copy?file=${encodeURIComponent(filePath)}`);
        if (!copyResponse.ok) return null;
        return copyResponse.json();
      }));

      const imported = copied.filter(Boolean);
      setSoundLibrary((prev) => {
        const next = [...prev];
        imported.forEach((sound) => {
          if (!next.some((item) => item.name === sound.name)) {
            next.push({ name: sound.name, url: sound.url });
          }
        });
        return next;
      });
      setSfxSettings((prev) => {
        const next = {
          ...prev,
          burst: {
            ...(prev.burst ?? defaultSfxSettings.burst),
            soundName: "__piano_cascade",
          },
        };
        localStorage.setItem("indievaders_sfx_settings", JSON.stringify(next));
        return next;
      });
      setSoundLibraryNotice(`Imported ${imported.length} piano sounds. Star feed uses rising tones.`);
    } catch (err) {
      setSoundLibraryNotice(`Piano import failed: ${err.message}`);
    } finally {
      setPianoImporting(false);
    }
  };

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
  const wavesRef = useRef([]);

  // Canvas starfield + warped grid lines loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let rafId = null;
    let animationClock = performance.now();
    let stars = [];
    const waves = wavesRef.current;

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

    layers.forEach(l => {
      for (let i = 0; i < l.count; i++) {
        const size = Math.random() * (l.sizeRange[1] - l.sizeRange[0]) + l.sizeRange[0];
        const baseOpacity = Math.random() * (l.opacityRange[1] - l.opacityRange[0]) + l.opacityRange[0];
        const isWarm = Math.random() > 0.75;
        const colorBase = isWarm ? "255, 240, 215" : "255, 255, 255";
        const star = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          colorBase,
          baseOpacity,
          twinkleOffset: Math.random() * Math.PI * 2,
          pullFactor: l.pullFactor,
          layer: l.id,
          factor: l.factor,
          driftX: 0,
          driftY: 0,
          consumed: false,
          recycleTimer: 0
        };

        assignNaturalDrift(star, l.id);
        stars.push(star);
      }
    });

    const triggerCollapse = (x, y) => {
      if (singularityRef.current) return;

      const currentScrollY = window.scrollY;
      const targetPageY = y + currentScrollY * 0.05;

      singularityRef.current = {
        x,
        pageY: targetPageY,
        mass: 10,
        pulse: 0
      };

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

      waves.push({
        x,
        pageY: targetPageY,
        radius: 6,
        maxRadius: 240,
        alpha: 1.0
      });
    };

    const drawStarfield = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sing = singularityRef.current;
      const mouse = canvasMouseRef.current;
      const motionEnabled = animationsEnabledRef.current;
      if (motionEnabled) {
        animationClock = performance.now();
      }
      const currentScrollY = motionEnabled ? window.scrollY : (frozenScrollYRef.current ?? window.scrollY);
      const colors = singularityColorsRef.current || {
        accretionRing: "#ffffff",
        glowInner: "#ffffff",
        glowOuter: "#ffffff",
        lensingRing: "#ffffff",
      };
      const singularityVisuals = singularityStyleRef.current || defaultSingularityStyle;

      const liveStarSettings = starSettingsRef.current || {
        cursorGravity: 0.38,
        baseDriftSpeed: 0.15,
        twinkleSpeed: 0.3
      };

      // 2. Draw and grow singularity (with custom/live colors)
      if (sing) {
        const screenY = sing.pageY - currentScrollY * 0.05;

        if (screenY >= -150 && screenY <= canvas.height + 150) {
          const isMobile = canvas.width < 768;
          const ehRadius = sing.mass * 0.4 * (isMobile ? 0.55 : 1.0);
          if (motionEnabled) {
            sing.pulse += 0.0035;
          }

          // Radial glow
          const glowGrad = ctx.createRadialGradient(sing.x, screenY, ehRadius, sing.x, screenY, ehRadius * 5.0);
          glowGrad.addColorStop(0, hexToRgba(colors.glowInner, 0.35 * singularityVisuals.glowIntensity));
          glowGrad.addColorStop(0.2, hexToRgba(colors.glowInner, 0.18 * singularityVisuals.glowIntensity));
          glowGrad.addColorStop(0.5, hexToRgba(colors.glowOuter, 0.06 * singularityVisuals.glowIntensity));
          glowGrad.addColorStop(0.8, hexToRgba(colors.glowOuter, 0.02 * singularityVisuals.glowIntensity));
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(sing.x, screenY, ehRadius * 5.0, 0, Math.PI * 2);
          ctx.fill();

          // Accretion boundary ring
          if (isVisibleColor(colors.accretionRing) && singularityVisuals.accretionWidth > 0) {
            const ringRadius = ehRadius + 1.5 + Math.sin(sing.pulse * 5) * 0.18;
            const softWidth = singularityVisuals.accretionWidth + singularityVisuals.accretionSoftness * 7;
            ctx.strokeStyle = hexToRgba(colors.accretionRing, 0.16 * singularityVisuals.accretionSoftness);
            ctx.shadowColor = hexToRgba(colors.glowInner, 0.32 * singularityVisuals.accretionSoftness);
            ctx.shadowBlur = 12 * singularityVisuals.accretionSoftness;
            ctx.lineWidth = softWidth;
            ctx.beginPath();
            ctx.arc(sing.x, screenY, ringRadius, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = hexToRgba(colors.accretionRing, 0.92);
            ctx.shadowColor = hexToRgba(colors.glowInner, 0.42);
            ctx.shadowBlur = 7 * singularityVisuals.accretionSoftness;
            ctx.lineWidth = singularityVisuals.accretionWidth;
            ctx.beginPath();
            ctx.arc(sing.x, screenY, ringRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }

          // Lensing rings
          if (isVisibleColor(colors.lensingRing) && singularityVisuals.lensingIntensity > 0) {
            ctx.strokeStyle = hexToRgba(colors.lensingRing, 0.12 * singularityVisuals.lensingIntensity);
            ctx.lineWidth = singularityVisuals.lensingWidth;
            ctx.beginPath();
            ctx.arc(sing.x, screenY, ehRadius * 1.6, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = hexToRgba(colors.lensingRing, 0.06 * singularityVisuals.lensingIntensity);
            ctx.lineWidth = Math.max(0.5, singularityVisuals.lensingWidth * 0.75);
            ctx.beginPath();
            ctx.arc(sing.x, screenY, ehRadius * 2.8, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Event Horizon
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(sing.x, screenY, ehRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Draw shockwaves
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        const screenY = w.pageY - currentScrollY * 0.05;

        ctx.strokeStyle = `rgba(255, 255, 255, ${w.alpha * 0.18})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(w.x, screenY, w.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (motionEnabled) {
          w.radius += 6.0;
          w.alpha = Math.max(0, 1 - w.radius / w.maxRadius);
        }

        if (w.alpha <= 0 || screenY < -150 || screenY > canvas.height + 150) {
          waves.splice(i, 1);
        }
      }

      // 4. Update and Draw Stars
      let starsNearCursorCount = 0;
      let cursorClusterCount = 0;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (star.consumed) {
          if (motionEnabled) {
            star.recycleTimer++;
          }
          if (motionEnabled && star.recycleTimer > 72) {
            star.consumed = false;
            star.recycleTimer = 0;
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
        if (motionEnabled && liveStarSettings.baseDriftSpeed > 0) {
          const driftSpeed = liveStarSettings.baseDriftSpeed * (0.22 + star.layer * 0.34);
          star.x += (star.driftX ?? 0) * driftSpeed;
          star.y += (star.driftY ?? -0.36) * driftSpeed;
        }
        let currentY = star.y - scrollParallax;

        // Horizontal wrapping
        if (star.x < -15) {
          star.x = canvas.width + 15;
        } else if (star.x > canvas.width + 15) {
          star.x = -15;
        }

        // Vertical wrapping
        if (currentY < -15) {
          star.y = canvas.height + 15 + scrollParallax;
          currentY = star.y - scrollParallax;
        } else if (currentY > canvas.height + 15) {
          star.y = -15 + scrollParallax;
          currentY = star.y - scrollParallax;
        }

        // Singularity Gravitational Pull
        if (sing) {
          const singScreenY = sing.pageY - currentScrollY * 0.05;
          const dist = Math.hypot(sing.x - star.x, singScreenY - currentY);
          const isMobile = canvas.width < 768;
          const ehRadius = sing.mass * 0.4 * (isMobile ? 0.55 : 1.0);
          const influenceRadius = isMobile
            ? Math.min(240, Math.max(120, 110 + sing.mass * 0.8))
            : Math.min(760, Math.max(340, 320 + sing.mass * 1.9));

          const consumeRadius = ehRadius + (star.layer === 0 ? 1.0 : 2.5);

          // Consume check: passive feed and cursor feed share the same event horizon.
          if (motionEnabled && dist < consumeRadius) {
            star.consumed = true;
            star.recycleTimer = 0;

            const distMouseSing = mouse.x !== null ? Math.hypot(sing.x - mouse.x, singScreenY - mouse.y) : 9999;
            const distStarMouse = mouse.x !== null ? Math.hypot(mouse.x - star.x, mouse.y - currentY) : 9999;
            const activeFeedSingDist = isMobile ? 110 : 220;
            const activeFeedStarDist = isMobile ? 100 : 200;
            const isBeingFed = distMouseSing < activeFeedSingDist && distStarMouse < activeFeedStarDist;

            if (isBeingFed && star.layer > 0) {
              sing.mass += liveStarSettings.blackHoleGrowthRate; // active player feeding grows singularity significantly
              if (star.layer === 2 && playCustomSfxRef.current) {
                playCustomSfxRef.current('burst'); // sound indicator when fed
                waves.push({
                  x: star.x,
                  pageY: currentY + currentScrollY * 0.05,
                  radius: 4,
                  maxRadius: 100,
                  alpha: 0.8
                });
              }
            } else {
              const passiveGrowthMultiplier = star.layer === 0 ? 0.035 : star.layer === 1 ? 0.18 : 0.28;
              sing.mass += liveStarSettings.blackHoleGrowthRate * passiveGrowthMultiplier;

              if (star.layer === 2 && playCustomSfxRef.current) {
                passiveFeedComboRef.current += 1;
                const now = performance.now();
                const shouldPing = passiveFeedComboRef.current >= 4 || now - lastPassiveFeedSfxTimeRef.current > 380;

                if (shouldPing) {
                  lastPassiveFeedSfxTimeRef.current = now;
                  passiveFeedComboRef.current = 0;
                  playCustomSfxRef.current('burst');
                  waves.push({
                    x: star.x,
                    pageY: currentY + currentScrollY * 0.05,
                    radius: 3,
                    maxRadius: 72,
                    alpha: 0.42
                  });
                }
              }
            }
            continue;
          }

          if (motionEnabled && dist < influenceRadius) {
            const distMouseSing = mouse.x !== null ? Math.hypot(sing.x - mouse.x, singScreenY - mouse.y) : 9999;
            const distStarMouse = mouse.x !== null ? Math.hypot(mouse.x - star.x, mouse.y - currentY) : 9999;
            const activeFeedSingDist = isMobile ? 110 : 220;
            const activeFeedStarDist = isMobile ? 100 : 200;
            const isBeingFed = distMouseSing < activeFeedSingDist && distStarMouse < activeFeedStarDist;
            const influence = Math.max(0.05, (influenceRadius - dist) / influenceRadius);

            let force, speedFallFactor, speedSwirlFactor;
            const gravityStrength = (liveStarSettings.blackHoleGravity !== undefined ? liveStarSettings.blackHoleGravity : 0.45) * (isMobile ? 0.65 : 1.0);

            if (isBeingFed && star.layer > 0) {
              // Active player feed: pulled strongly into singularity
              force = ((sing.mass * 4.8) / (dist + 35)) * gravityStrength;
              speedFallFactor = 0.88;
              speedSwirlFactor = 0.06;
            } else {
              // Passive field response: keep natural drift, then bend into an orbital vortex near the hole.
              const layerWeight = 0.55 + star.layer * 0.28;
              force = (((sing.mass * 4.1 * layerWeight) / (dist + 45)) * Math.max(0.18, influence)) * gravityStrength;
              speedFallFactor = 0.28 + star.layer * 0.04;
              speedSwirlFactor = 0.52;
            }

            const angle = Math.atan2(singScreenY - currentY, sing.x - star.x);
            const orbitAngle = angle + Math.PI / 2;

            const closeFactor = dist < ehRadius + 34 ? (ehRadius + 34 - dist) / 11 : 0;
            const speedFall = Math.min(5.5, force * (speedFallFactor + closeFactor * 0.45));
            const speedSwirl = Math.min(4.5, force * speedSwirlFactor);

            star.x += Math.cos(angle) * speedFall + Math.cos(orbitAngle) * speedSwirl;
            star.y += Math.sin(angle) * speedFall + Math.sin(orbitAngle) * speedSwirl;
          }
        }

        // Cursor Attraction (Trails behind cursor, active for interactable layer 1 & 2 stars)
        if (mouse.x !== null && star.layer > 0) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - currentY;
          const dist = Math.hypot(dx, dy);

          if (dist < 200) {
            if (dist < 92) {
              cursorClusterCount++;
            }

            let shouldPull = true;
            if (sing) {
              const singScreenY = sing.pageY - currentScrollY * 0.05;
              const distToSing = Math.hypot(sing.x - star.x, singScreenY - currentY);
              const influenceRadius = Math.min(
                760,
                Math.max(340, 320 + sing.mass * 1.9),
              );
              if (distToSing < influenceRadius) {
                shouldPull = distToSing > Math.max(150, sing.mass * 0.75);
              }
            }

            if (motionEnabled && shouldPull) {
              // Attraction is regulated by cursorGravity settings
              const pull = ((200 - dist) / 200) * liveStarSettings.cursorGravity;
              const safeDist = Math.max(1, dist);
              star.x += (dx / safeDist) * pull * star.pullFactor;
              star.y += (dy / safeDist) * pull * star.pullFactor;
            }

            if (dist < 28 && !sing) {
              starsNearCursorCount++;
            }
          }
        }

        // Twinkle calculation
        const twinkle = 1.0 + Math.sin(animationClock * 0.005 * liveStarSettings.twinkleSpeed + star.twinkleOffset) * 0.45 * liveStarSettings.twinkleSpeed;
        const currentOpacity = Math.min(1.0, Math.max(0.05, star.baseOpacity * twinkle));

        ctx.fillStyle = `rgba(${star.colorBase}, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, currentY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.x !== null && cursorClusterCount > 0) {
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
      const collapseThreshold = isMobile ? 8 : 24;
      if (motionEnabled && starsNearCursorCount >= collapseThreshold && mouse.x !== null) {
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
  const activeThemeColors = { ...defaultThemeColors, ...themeColors };
  const activeSingularityColors = { ...defaultSingularityColors, ...singularityColors };
  const activeSingularityStyle = { ...defaultSingularityStyle, ...singularityStyle };
  const activeLayoutSettings = { ...defaultLayoutSettings, ...layoutSettings };

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

            {/* Kolory motywu */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>Theme Colors:</span>
              
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
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Signal Accent:</span>
                <input
                  type="color"
                  value={activeThemeColors.gold}
                  onChange={(e) => updateThemeColor("gold", e.target.value)}
                  style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Motion Accent:</span>
                <input
                  type="color"
                  value={activeThemeColors.blue}
                  onChange={(e) => updateThemeColor("blue", e.target.value)}
                  style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Progress Glow:</span>
                <input
                  type="color"
                  value={activeThemeColors.teal}
                  onChange={(e) => updateThemeColor("teal", e.target.value)}
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

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Glass Border:</span>
                <input
                  type="color"
                  value={activeThemeColors.cardBorder}
                  onChange={(e) => updateThemeColor("cardBorder", e.target.value)}
                  style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Glass Glow:</span>
                <input
                  type="color"
                  value={activeThemeColors.cardGlow}
                  onChange={(e) => updateThemeColor("cardGlow", e.target.value)}
                  style={{ border: "none", background: "none", cursor: "pointer", width: "28px", height: "24px" }}
                />
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

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>Black Hole Colors:</span>
              {[
                ["accretionRing", "Accretion Ring"],
                ["glowInner", "Inner Glow"],
                ["glowOuter", "Outer Glow"],
                ["lensingRing", "Lensing Ring"],
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
                ["accretionSoftness", "Ring Softness", 0, 2, 0.05, ""],
                ["lensingWidth", "Lensing Width", 0.2, 4, 0.1, "px"],
                ["lensingIntensity", "Lensing Intensity", 0, 1.5, 0.05, ""],
                ["glowIntensity", "Glow Intensity", 0, 2, 0.05, ""],
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

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Black Hole Gravity Pull:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{starSettings.blackHoleGravity !== undefined ? starSettings.blackHoleGravity : 0.45}</span>
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

            {/* Audio Volume Controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>Audio Levels (Volume):</span>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Ambient Layer:</span>
                <select
                  value={ambientLayer}
                  onChange={(e) => setAmbientLayer(e.target.value)}
                  style={{ background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontSize: "0.65rem", padding: "4px 6px", width: "100%" }}
                >
                  <option value="">No ambient layer</option>
                  <option value="procedural">Procedural deep-space drone</option>
                  {soundLibrary.map((sound) => (
                    <option key={`ambient-${sound.name}`} value={sound.name}>{sound.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>SFX Volume:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{(sfxVolume * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={sfxVolume}
                  onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Ambient Volume:</span>
                  <span style={{ fontSize: "0.7rem", color: "#fff" }}>{(musicVolume / 0.2 * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.2"
                  step="0.005"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: activeThemeColors.gold }}
                />
              </div>
            </div>

            {/* SFX Mapper */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)" }}>SFX Mapper:</span>

              {[
                { key: "select", label: "Interface Click / Select" },
                { key: "burst", label: "Star Absorbed / Feed" },
                { key: "unlock", label: "Singularity Spawn / Collapse" },
                { key: "impact", label: "Singularity Shockwave / Impact" },
                { key: "hover", label: "Hover / Tile Focus" },
              ].map(({ key: evt, label: eventLabel }) => {
                const setting = sfxSettings[evt] ?? defaultSfxSettings[evt];
                return (
                  <div key={evt} style={{ display: "flex", flexDirection: "column", gap: "7px", background: "rgba(255,255,255,0.02)", padding: "8px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.04)", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: "bold", textTransform: "uppercase", color: activeThemeColors.blue }}>{eventLabel}</span>

                    <select
                      value={setting.soundName}
                      onChange={(e) => {
                        const soundName = e.target.value;
                        setSfxSettings(prev => {
                          const next = {
                            ...prev,
                            [evt]: {
                              ...(prev[evt] ?? defaultSfxSettings[evt]),
                              soundName,
                            },
                          };
                          localStorage.setItem("indievaders_sfx_settings", JSON.stringify(next));
                          return next;
                        });
                      }}
                      style={{ background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontSize: "0.65rem", padding: "4px 6px", width: "100%" }}
                    >
                      <option value="">No sound</option>
                      {evt === "burst" && (
                        <option value="__piano_cascade">Piano cascade / rising tones</option>
                      )}
                      {soundLibrary.map((sound) => (
                        <option key={`${evt}-${sound.name}`} value={sound.name}>{sound.name}</option>
                      ))}
                    </select>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.6)" }}>Volume</span>
                      <span style={{ fontSize: "0.65rem", color: "#fff" }}>{Math.round((setting.volume ?? 1) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={setting.volume ?? 1}
                      onChange={(e) => {
                        const volume = parseFloat(e.target.value);
                        setSfxSettings(prev => {
                          const next = {
                            ...prev,
                            [evt]: {
                              ...(prev[evt] ?? defaultSfxSettings[evt]),
                              volume,
                            },
                          };
                          localStorage.setItem("indievaders_sfx_settings", JSON.stringify(next));
                          return next;
                        });
                      }}
                      style={{ width: "100%", accentColor: activeThemeColors.gold }}
                    />

                    <button
                      onClick={() => playCustomSfx(evt)}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "4px",
                        color: "#fff",
                        fontSize: "0.6rem",
                        padding: "4px 8px",
                        cursor: "pointer",
                        alignSelf: "flex-end"
                      }}
                    >
                      Test SFX
                    </button>
                  </div>
                );
              })}

              {/* Sound Library Manager */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px", marginTop: "4px" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>Sound Library:</span>
                <div
                  onDragEnter={(e) => {
                    e.preventDefault();
                    setSoundDropActive(true);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setSoundDropActive(true);
                  }}
                  onDragLeave={() => setSoundDropActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setSoundDropActive(false);
                    addSoundFilesToLibrary(e.dataTransfer.files);
                  }}
                  style={{
                    display: "grid",
                    placeItems: "center",
                    minHeight: "54px",
                    border: `1px dashed ${soundDropActive ? activeThemeColors.gold : "rgba(255,255,255,0.18)"}`,
                    borderRadius: "8px",
                    background: soundDropActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.025)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.65rem",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  Drop audio files here or use the picker below
                </div>
                <button
                  onClick={importPianoSeries}
                  disabled={pianoImporting}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "6px",
                    color: "rgba(255,255,255,0.86)",
                    cursor: pianoImporting ? "wait" : "pointer",
                    fontSize: "0.62rem",
                    fontWeight: "800",
                    padding: "7px 9px",
                    textAlign: "left",
                  }}
                  type="button"
                >
                  {pianoImporting ? "Importing Piano Series..." : "Import Piano Series for Star Feed"}
                </button>
                {soundLibraryNotice && (
                  <span style={{ fontSize: "0.62rem", color: soundLibraryNotice.includes("failed") ? "#ffb3a9" : "rgba(255,255,255,0.64)", lineHeight: 1.35 }}>
                    {soundLibraryNotice}
                  </span>
                )}
                <input
                  type="file"
                  accept="audio/*"
                  multiple
                  onChange={(e) => {
                    addSoundFilesToLibrary(e.target.files);
                    e.target.value = "";
                  }}
                  style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.8)", marginBottom: "4px" }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "120px", overflowY: "auto", background: "rgba(0,0,0,0.2)", padding: "6px", borderRadius: "6px" }}>
                  {soundLibrary.map((sound) => (
                    <div key={sound.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", fontSize: "0.65rem", color: "rgba(255,255,255,0.8)" }}>
                      <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "205px" }} title={sound.name}>{sound.name}</span>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", flex: "0 0 auto" }}>
                        <button
                          aria-label={`Preview ${sound.name}`}
                          onClick={() => previewSound(sound.url)}
                          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "999px", color: activeThemeColors.gold, cursor: "pointer" }}
                          title="Preview sound"
                          type="button"
                        >
                          <Play size={10} fill="currentColor" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => {
                            setAmbientLayer((prev) => (prev === sound.name ? "procedural" : prev));
                            setSoundLibrary(prev => {
                              const next = prev.filter(item => item.name !== sound.name);
                              return next.length > 0 ? next : defaultSoundLibrary;
                            });
                            setSfxSettings(prev => {
                              const next = Object.fromEntries(
                                Object.entries(prev).map(([evt, item]) => [
                                  evt,
                                  item.soundName === sound.name
                                    ? { ...(defaultSfxSettings[evt] ?? defaultSfxSettings.select) }
                                    : item,
                                ]),
                              );
                              localStorage.setItem("indievaders_sfx_settings", JSON.stringify(next));
                              return next;
                            });
                          }}
                          style={{ background: "none", border: "none", color: "#ff8888", cursor: "pointer", fontSize: "0.6rem", fontWeight: "bold" }}
                          type="button"
                        >
                          [Delete]
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", background: "rgba(0,0,0,0.25)", padding: "8px", borderRadius: "4px", marginTop: "4px" }}>
                  <span style={{ fontSize: "0.6rem", fontWeight: "bold", color: "rgba(255,255,255,0.7)" }}>Browse Ocular Collection:</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", fontSize: "0.6rem", color: activeThemeColors.blue, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "4px", marginBottom: "4px" }}>
                    <button
                      onClick={() => {
                        setCurrentLocalPath("");
                        setSelectedLocalSound("");
                      }}
                      style={{ background: "none", border: 0, color: activeThemeColors.blue, cursor: "pointer", padding: 0, textDecoration: "underline" }}
                      type="button"
                    >
                      Root
                    </button>
                    {currentLocalPath.split('/').filter(Boolean).map((part, pIdx, arr) => {
                      const subPath = arr.slice(0, pIdx + 1).join('/');
                      return (
                        <span key={subPath}>
                          <span> &gt; </span>
                          <button
                            onClick={() => {
                              setCurrentLocalPath(subPath);
                              setSelectedLocalSound("");
                            }}
                            style={{ background: "none", border: 0, color: activeThemeColors.blue, cursor: "pointer", padding: 0, textDecoration: "underline" }}
                            type="button"
                          >
                            {part}
                          </button>
                        </span>
                      );
                    })}
                  </div>

                  {localBrowsingLoading ? (
                    <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>Loading...</span>
                  ) : localBrowsingError ? (
                    <span style={{ fontSize: "0.6rem", color: "#ff8888" }}>{localBrowsingError}</span>
                  ) : (
                    <>
                      {localDirEntries.some(e => e.isDir) && (
                        <select
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                              setCurrentLocalPath(prev => prev ? `${prev}/${val}` : val);
                              setSelectedLocalSound("");
                            }
                          }}
                          value=""
                          style={{ background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontSize: "0.65rem", padding: "3px" }}
                        >
                          <option value="">-- Go to subfolder --</option>
                          {localDirEntries.filter(e => e.isDir).map(e => (
                            <option key={e.name} value={e.name}>{e.name}</option>
                          ))}
                        </select>
                      )}
                      <select
                        value={selectedLocalSound}
                        onChange={(e) => setSelectedLocalSound(e.target.value)}
                        style={{ background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontSize: "0.65rem", padding: "3px" }}
                      >
                        <option value="">-- Choose sound to add --</option>
                        {localDirEntries.filter(e => !e.isDir).map(e => {
                          const relFilePath = currentLocalPath ? `${currentLocalPath}/${e.name}` : e.name;
                          return (
                            <option key={e.name} value={relFilePath}>{e.name}</option>
                          );
                        })}
                      </select>
                    </>
                  )}

                  {selectedLocalSound && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      <button
                        onClick={() => previewSound(`/api/sfx-file?file=${encodeURIComponent(selectedLocalSound)}`)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.16)",
                          borderRadius: "4px",
                          color: activeThemeColors.gold,
                          fontSize: "0.6rem",
                          fontWeight: "bold",
                          padding: "5px 8px",
                          cursor: "pointer",
                        }}
                        type="button"
                      >
                        <Play size={10} fill="currentColor" aria-hidden="true" />
                        Preview
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const response = await fetch(`/api/sfx-copy?file=${encodeURIComponent(selectedLocalSound)}`);
                            if (!response.ok) throw new Error("Copy failed");
                            const data = await response.json();
                            if (data.success) {
                              setSoundLibrary(prev => prev.some(sound => sound.name === data.name)
                                ? prev
                                : [...prev, { name: data.name, url: data.url }]);
                              setSelectedLocalSound("");
                            }
                          } catch (err) {
                            alert(`Error copying sound: ${err.message}`);
                          }
                        }}
                        style={{
                          background: activeThemeColors.gold,
                          border: "none",
                          borderRadius: "4px",
                          color: "#060910",
                          fontSize: "0.6rem",
                          fontWeight: "bold",
                          padding: "5px 8px",
                          cursor: "pointer",
                        }}
                        type="button"
                      >
                        Add to Page Library
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                    setTextStyles({});
                    setLayoutSettings(defaultLayoutSettings);
                    setSingularityColors(defaultSingularityColors);
                    setSingularityStyle(defaultSingularityStyle);
                    setStarSettings({
                      layer0Count: 150,
                      layer1Count: 100,
                      layer2Count: 50,
                      cursorGravity: 0.38,
                      baseDriftSpeed: 0.15,
                      twinkleSpeed: 0.3,
                      blackHoleGrowthRate: 2.5,
                    });
                    setSfxSettings(defaultSfxSettings);
                    setSoundLibrary(defaultSoundLibrary);
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


      <header className="story-header" style={{ borderBottomColor: "rgba(255,255,255,0.06)" }}>
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
        <div className="story-hero-icon-wrapper" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", color: activeThemeColors.gold }}>
          <Sparkles size={20} />
        </div>
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
        <a className="story-primary-link" href="#story-read" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}>
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
