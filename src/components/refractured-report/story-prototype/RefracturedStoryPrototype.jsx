import { ArrowRight, Database, ExternalLink, Flame, LineChart, Lock, MousePointer2, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import refracturedPremiumReport from "../../../data/refracturedPremiumReport.js";
import "../../../styles/refractured-story-prototype.css";

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

function compactNumber(value) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(value >= 10000000 ? 0 : 1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  }

  return String(value);
}

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
        if (!node) {
          return;
        }

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

function usePointerLight(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    function handlePointerMove(event) {
      root.style.setProperty("--spot-x", `${event.clientX}px`);
      root.style.setProperty("--spot-y", `${event.clientY}px`);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [rootRef]);
}

function ChapterProgress({ activeChapterId, progress }) {
  return (
    <aside className="story-progress" aria-label="Report progress">
      <div className="story-progress__meter" aria-hidden="true">
        <span style={{ "--story-progress-value": Math.max(progress, 0.04) }} />
      </div>
      <nav>
        {chapters.map((chapter, index) => (
          <a className={chapter.id === activeChapterId ? "is-active" : ""} href={`#story-${chapter.id}`} key={chapter.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {chapter.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function ChapterSection({ chapter, index, onSetRef }) {
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
        <p className="story-label">{chapter.label}</p>
        <h2>{chapter.title}</h2>
        {chapter.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="story-chapter__signal" aria-label={`${chapter.unlock} unlock preview`}>
        <Sparkles aria-hidden="true" />
        <span>Unlocks</span>
        <strong>{chapter.unlock}</strong>
        <small>{chapter.short}</small>
      </div>
    </section>
  );
}

function RivalStories({ comparables }) {
  const [activeCategoryId, setActiveCategoryId] = useState(rivalCategories[0].id);
  const comparableById = useMemo(() => new Map(comparables.map((game) => [game.id, game])), [comparables]);
  const activeCategory = rivalCategories.find((category) => category.id === activeCategoryId) ?? rivalCategories[0];
  const knownGames = (activeCategory.items ?? []).map((id) => comparableById.get(id)).filter(Boolean);
  const researchGaps = activeCategory.researchGapItems ?? [];

  return (
    <section className="story-rival-stories" id="rival-stories">
      <div className="story-section-heading">
        <p className="story-label">Rival stories</p>
        <h2>Open games as clues, not as a spreadsheet.</h2>
        <p>
          A client should first see why a reference matters. The deeper workspace can keep the full table, but the report
          should turn each game into a decision: borrow, avoid, or refresh the data.
        </p>
      </div>
      <div className="story-rival-accordion">
        <div className="story-rival-lanes" aria-label="Comparable lanes">
          {rivalCategories.map((category, index) => (
            <button
              className={category.id === activeCategoryId ? "is-active" : ""}
              data-rival-id={category.id}
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{category.title}</strong>
              <small>{category.summary}</small>
            </button>
          ))}
        </div>
        <article className="story-rival-panel">
          <header>
            <span>Selected lens</span>
            <h3>{activeCategory.title}</h3>
            <p>{activeCategory.summary}</p>
          </header>
          <div className="story-rival-mini-reports">
            {knownGames.map((game) => (
              <section className="story-rival-mini-report" key={game.id}>
                <img alt="" src={game.imageUrl} />
                <div>
                  <span>{game.role}</span>
                  <h4>{game.title}</h4>
                  <p>{game.refracturedRead}</p>
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
                      {game.borrow}
                    </p>
                    <p>
                      <strong>Avoid</strong>
                      {game.avoid}
                    </p>
                  </div>
                  <a className="story-rival-link" href={game.steamUrl} rel="noreferrer" target="_blank">
                    Steam page <ExternalLink aria-hidden="true" size={14} />
                  </a>
                </div>
              </section>
            ))}
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

function PromiseBuilder() {
  const [activeId, setActiveId] = useState(promiseOptions[0].id);
  const activePromise = promiseOptions.find((option) => option.id === activeId) ?? promiseOptions[0];

  return (
    <section className="story-promise-builder" id="promise-builder">
      <div className="story-section-heading">
        <p className="story-label">Storefront promise</p>
        <h2>Let the promise change the proof.</h2>
        <p>
          This is where a paid report becomes a tool: choosing a public angle changes the tag stack, trailer beat, and proof
          gates instead of showing another block of advice.
        </p>
      </div>
      <div className="story-promise-lab">
        <div className="story-promise-options" aria-label="Promise options">
          {promiseOptions.map((option) => (
            <button className={option.id === activeId ? "is-active" : ""} key={option.id} onClick={() => setActiveId(option.id)}>
              <Flame aria-hidden="true" size={18} />
              {option.label}
            </button>
          ))}
        </div>
        <article className="story-store-card">
          <span>Steam first screen</span>
          <h3>{activePromise.headline}</h3>
          <div className="story-tag-row">
            {activePromise.tags.map((tag) => (
              <small key={tag}>{tag}</small>
            ))}
          </div>
          <ol>
            {activePromise.proof.map((proof) => (
              <li key={proof}>{proof}</li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}

function ProofBoard() {
  const gates = [
    ["Hook", "Players understand the fantasy before systems are explained."],
    ["Feel", "The first fight earns a 4/5 combat-feel read with low confusion."],
    ["Return", "Players ask what changes next and want another attempt."],
    ["Promise", "Steam copy names only what the playable proof can show."],
  ];

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
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DeepDiveLauncher({ comparables }) {
  const unlocks = [
    { label: "Market Map", detail: "Positioning field with stable inspector", icon: LineChart },
    { label: "Rival Stories", detail: `${comparables.length} sourced comparables`, icon: ExternalLink },
    { label: "Promise Builder", detail: "Steam page language playground", icon: MousePointer2 },
    { label: "Evidence Vault", detail: "Facts, estimates, interpretations, gaps", icon: Database },
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
        {unlocks.map(({ label, detail, icon: Icon }, index) => (
          <article key={label}>
            <Icon aria-hidden="true" />
            <span>{index < 3 ? "Unlocked" : "Audit"}</span>
            <h3>{label}</h3>
            <p>{detail}</p>
            <button type="button">
              Open later <Lock aria-hidden="true" size={15} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function RefracturedStoryPrototype() {
  const rootRef = useRef(null);
  const sectionRefs = useRef([]);
  const { activeChapterId, progress } = useScrollState(sectionRefs);
  usePointerLight(rootRef);

  const comparables = useMemo(
    () => refracturedPremiumReport.marketEvidence?.comparables ?? refracturedPremiumReport.comparables ?? [],
    [],
  );

  const handleSetRef = (index, node) => {
    sectionRefs.current[index] = node;
  };

  return (
    <main className="story-prototype" ref={rootRef}>
      <div className="story-space" aria-hidden="true">
        <span className="story-stars" />
      </div>
      <header className="story-header">
        <a href="#client-report/refractured">Indievaders</a>
        <span>Refractured report flow prototype</span>
      </header>
      <ChapterProgress activeChapterId={activeChapterId} progress={progress} />
      <section className="story-hero">
        <div className="story-hero-icon-wrapper">
          <Sparkles size={20} />
        </div>
        <p className="story-label">Client report direction</p>
        <h1>Read the market like a journey. Open the tools when the question gets interesting.</h1>
        <p>
          This prototype replaces mission rails and duplicate unlock panels with a guided report rhythm: one idea at a
          time, stronger visual moments, then optional deep dives for players who want to explore the evidence.
        </p>
        <a className="story-primary-link" href="#story-read">
          Start the report <ArrowRight aria-hidden="true" size={18} />
        </a>
      </section>
      <div className="story-thread">
        {chapters.map((chapter, index) => (
          <ChapterSection chapter={chapter} index={index} key={chapter.id} onSetRef={handleSetRef} />
        ))}
      </div>
      <RivalStories comparables={comparables} />
      <PromiseBuilder />
      <ProofBoard />
      <DeepDiveLauncher comparables={comparables} />
    </main>
  );
}

export default RefracturedStoryPrototype;
