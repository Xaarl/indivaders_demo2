import { ArrowRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const SIGNALS = [
  {
    id: 'tags',
    pain: 'Broad tags',
    solution: 'Sharper tags',
    x: 68,
    y: 24,
    vx: 0.00024,
    vy: 0.00018,
    tone: 'cyan',
    form: 'crab',
  },
  {
    id: 'benchmark',
    pain: 'Wrong competitors',
    solution: 'True comps',
    x: 88,
    y: 30,
    vx: -0.00022,
    vy: 0.00016,
    tone: 'amber',
    form: 'squid',
  },
  {
    id: 'firstPlay',
    pain: 'Demo friction',
    solution: 'Demo risk map',
    x: 86,
    y: 57,
    vx: -0.00019,
    vy: -0.00022,
    tone: 'blue',
    form: 'octo',
  },
  {
    id: 'scope',
    pain: 'Scope illusion',
    solution: 'Scope sanity',
    x: 69,
    y: 70,
    vx: 0.0002,
    vy: -0.00017,
    tone: 'amber',
    form: 'crab',
  },
  {
    id: 'price',
    pain: 'Price mismatch',
    solution: 'Price band',
    x: 80,
    y: 82,
    vx: -0.00017,
    vy: -0.0002,
    tone: 'cyan',
    form: 'squid',
  },
  {
    id: 'hook',
    pain: 'Weak creator hook',
    solution: 'Creator angle',
    x: 75,
    y: 45,
    vx: 0.0002,
    vy: 0.00016,
    tone: 'blue',
    form: 'octo',
  },
];

const DRIFT_BOUNDS = {
  minX: 6,
  maxX: 96,
  minY: 8,
  maxY: 90,
};

const GRAVITY_CAPTURE_RATIO = 0.34;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const createInitialSignals = () =>
  SIGNALS.map((signal) => ({
    ...signal,
    state: 'active',
    gravity: 0,
    sinkX: 0,
    sinkY: 0,
  }));

function getRelativePoint(event, element) {
  const bounds = element.getBoundingClientRect();
  return {
    x: ((event.clientX - bounds.left) / bounds.width) * 100,
    y: ((event.clientY - bounds.top) / bounds.height) * 100,
    bounds,
  };
}

function getCoreGeometry(heroElement, coreElement) {
  if (!heroElement || !coreElement) {
    return null;
  }

  const hero = heroElement.getBoundingClientRect();
  const core = coreElement.getBoundingClientRect();
  return {
    x: ((core.left + core.width / 2 - hero.left) / hero.width) * 100,
    y: ((core.top + core.height / 2 - hero.top) / hero.height) * 100,
    radius: Math.max(2.8, (core.width / hero.width) * 3.8),
    field: Math.max(13, (core.width / hero.width) * 18),
    yScale: hero.height / hero.width,
  };
}

function distancePercent(a, b) {
  const yScale = b.yScale ?? 1;
  return Math.hypot(a.x - b.x, (a.y - b.y) * yScale);
}

function isInsideCore(point, core, padding = 0) {
  return distancePercent(point, core) <= core.radius + padding;
}

function PixelAlien({ form }) {
  return (
    <span className={`pixel-alien pixel-alien-${form}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function Hero({ copy, brand }) {
  const [signals, setSignals] = useState(createInitialSignals);
  const [drag, setDrag] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [phase, setPhase] = useState('dark');
  const heroRef = useRef(null);
  const coreRef = useRef(null);
  const frameRef = useRef(null);
  const sfxRef = useRef({});
  const audioContextRef = useRef(null);

  const absorbedCount = signals.filter((signal) => signal.state === 'absorbed').length;

  const getSfx = useCallback((name) => {
    const paths = {
      select: '/sfx/pixel-select.wav',
      burst: '/sfx/pixel-burst.wav',
      unlock: '/sfx/pixel-unlock.wav',
    };

    if (!paths[name] || typeof Audio === 'undefined') {
      return null;
    }

    if (!sfxRef.current[name]) {
      const audio = new Audio(paths[name]);
      audio.preload = 'auto';
      audio.volume = name === 'unlock' ? 0.58 : 0.46;
      sfxRef.current[name] = audio;
    }

    return sfxRef.current[name];
  }, []);

  const playSyntheticSfx = useCallback((name) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const context = audioContextRef.current;
    context.resume?.();

    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const frequencies = {
      select: [420, 640],
      burst: [170, 92],
      unlock: [360, 720],
    };
    const [start, end] = frequencies[name] || frequencies.select;

    oscillator.type = name === 'burst' ? 'square' : 'triangle';
    oscillator.frequency.setValueAtTime(start, now);
    oscillator.frequency.exponentialRampToValueAtTime(end, now + 0.12);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(name === 'burst' ? 0.16 : 0.09, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.18);
  }, []);

  const playSfx = useCallback(
    (name, force = false) => {
      if (!force && !soundEnabled) {
        return;
      }

      playSyntheticSfx(name);

      const audio = getSfx(name);
      if (!audio) {
        return;
      }

      audio.currentTime = 0;
      const playResult = audio.play();
      if (playResult?.catch) {
        playResult.catch(() => {});
      }
    },
    [getSfx, playSyntheticSfx, soundEnabled],
  );

  useEffect(() => {
    if (phase === 'light') {
      return undefined;
    }

    let last = performance.now();

    const tick = (now) => {
      const delta = Math.min(48, now - last);
      last = now;
      setSignals((current) =>
        current.map((signal) => {
          if (signal.state !== 'active' || signal.id === drag?.id) {
            return signal;
          }

          let nextX = signal.x + signal.vx * delta;
          let nextY = signal.y + signal.vy * delta;
          let nextVx = signal.vx;
          let nextVy = signal.vy;

          if (nextX < DRIFT_BOUNDS.minX || nextX > DRIFT_BOUNDS.maxX) {
            nextVx *= -1;
            nextX = clamp(nextX, DRIFT_BOUNDS.minX, DRIFT_BOUNDS.maxX);
          }

          if (nextY < DRIFT_BOUNDS.minY || nextY > DRIFT_BOUNDS.maxY) {
            nextVy *= -1;
            nextY = clamp(nextY, DRIFT_BOUNDS.minY, DRIFT_BOUNDS.maxY);
          }


          return {
            ...signal,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
          };
        }),
      );

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [drag, phase]);

  useEffect(() => {
    if (absorbedCount !== SIGNALS.length || phase !== 'dark') {
      return;
    }

    const burstTimer = window.setTimeout(() => {
      setPhase('burst');
      playSfx('unlock', true);
    }, 0);

    const reformTimer = window.setTimeout(() => {
      setSignals(
        SIGNALS.map((signal, index) => ({
          ...signal,
          state: 'reformed',
          x: 53 + index * 7.2,
          y: index % 2 === 0 ? 39 : 57,
          vx: signal.vx * 0.45,
          vy: signal.vy * 0.45,
          gravity: 0,
          sinkX: 0,
          sinkY: 0,
        })),
      );
      setPhase('light');
    }, 850);

    return () => {
      window.clearTimeout(burstTimer);
      window.clearTimeout(reformTimer);
    };
  }, [absorbedCount, phase, playSfx]);

  function absorbSignal(signal, core) {
    return {
      ...signal,
      state: 'absorbing',
      gravity: 1,
      sinkX: core.x - signal.x,
      sinkY: core.y - signal.y,
    };
  }

  function finalizeAbsorption(id) {
    setSignals((current) =>
      current.map((signal) =>
        signal.id === id && signal.state === 'absorbing'
          ? { ...signal, state: 'absorbed', gravity: 0 }
          : signal,
      ),
    );
  }

  function collapse(id) {
    const core = getCoreGeometry(heroRef.current, coreRef.current);
    if (!core || phase !== 'dark') {
      return;
    }

    setSignals((current) =>
      current.map((signal) => (signal.id === id && signal.state === 'active' ? absorbSignal(signal, core) : signal)),
    );
    setDrag(null);
    playSfx('burst');
    window.setTimeout(() => finalizeAbsorption(id), 430);
  }

  function repelOtherSignals(draggedId, draggedPosition, core) {
    const repulsionRadius = 5.6;

    setSignals((current) =>
      current.map((signal, index) => {
        if (signal.id === draggedId || signal.state !== 'active') {
          return signal;
        }

        let dx = signal.x - draggedPosition.x;
        let dy = signal.y - draggedPosition.y;
        let distance = Math.hypot(dx, dy);

        if (distance > repulsionRadius) {
          return signal;
        }

        if (distance < 0.1) {
          const angle = index * 1.71;
          dx = Math.cos(angle);
          dy = Math.sin(angle);
          distance = 1;
        }

        const push = ((repulsionRadius - distance) / repulsionRadius) ** 2 * 0.82;
        const pushed = {
          x: clamp(signal.x + (dx / distance) * push, DRIFT_BOUNDS.minX, DRIFT_BOUNDS.maxX),
          y: clamp(signal.y + (dy / distance) * push, DRIFT_BOUNDS.minY, DRIFT_BOUNDS.maxY),
        };

        if (core && signal.state === 'active' && isInsideCore(pushed, core, core.field * GRAVITY_CAPTURE_RATIO)) {
          playSfx('burst');
          window.setTimeout(() => finalizeAbsorption(signal.id), 430);
          return absorbSignal({ ...signal, ...pushed }, core);
        }

        return {
          ...signal,
          x: pushed.x,
          y: pushed.y,
          vx: signal.vx,
          vy: signal.vy,
        };
      }),
    );
  }

  function handlePointerMove(event) {
    const hero = heroRef.current;
    if (!hero) {
      return;
    }

    const point = getRelativePoint(event, hero);
    hero.style.setProperty('--mouse-x', `${point.x}%`);
    hero.style.setProperty('--mouse-y', `${point.y}%`);

    if (!drag || phase !== 'dark') {
      return;
    }

    const nextPosition = {
      x: clamp(point.x - drag.offsetX, DRIFT_BOUNDS.minX, DRIFT_BOUNDS.maxX),
      y: clamp(point.y - drag.offsetY, DRIFT_BOUNDS.minY, DRIFT_BOUNDS.maxY),
    };
    const core = getCoreGeometry(hero, coreRef.current);
    const distance = core ? distancePercent(nextPosition, core) : Infinity;
    const gravity = core ? clamp(1 - (distance - core.radius) / core.field, 0, 1) : 0;

    setSignals((current) =>
      current.map((signal) =>
        signal.id === drag.id
          ? {
              ...signal,
              x: nextPosition.x,
              y: nextPosition.y,
              gravity,
            }
          : signal,
      ),
    );

    repelOtherSignals(drag.id, nextPosition, core);

    if (core && distance <= core.radius + 1.2) {
      collapse(drag.id);
    }
  }

  function handleSignalDown(event, id) {
    if (phase !== 'dark') {
      return;
    }

    const signal = signals.find((item) => item.id === id);
    if (!signal || signal.state !== 'active') {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const hero = heroRef.current;
    const point = getRelativePoint(event, hero);
    setDrag({
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: point.x - signal.x,
      offsetY: point.y - signal.y,
      moved: false,
    });
    playSfx('select');
  }

  function handlePointerUp(event) {
    if (!drag) {
      return;
    }

    const moved = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 8;
    const id = drag.id;
    setDrag(null);

    if (!moved) {
      collapse(id);
      return;
    }

    const signal = signals.find((item) => item.id === id);
    const core = getCoreGeometry(heroRef.current, coreRef.current);
    if (signal && core && distancePercent(signal, core) <= core.radius + core.field * GRAVITY_CAPTURE_RATIO) {
      collapse(id);
      return;
    }

    setSignals((current) =>
      current.map((signalItem) => (signalItem.id === id ? { ...signalItem, gravity: 0 } : signalItem)),
    );
  }

  function resetSignals() {
    setDrag(null);
    setSignals(createInitialSignals());
    setPhase('dark');
  }

  return (
    <header
      ref={heroRef}
      className={`hero-section invaders-hero is-${phase}`}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => setDrag(null)}
    >
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand-lockup" href="#">
          <span className="brand-mark">IV</span>
          <span>
            <strong>{brand.name}</strong>
            <small>{brand.descriptor}</small>
          </span>
        </a>
        <div className="nav-actions">
          <a href="#sample-report">Interactive sample report</a>
          <a href="#report">Report</a>
          <a href="#early-report">Pricing</a>
          <a className="nav-button" href="#order-report">
            Request report
          </a>
        </div>
      </nav>

      <div className="hero-starfield" aria-hidden="true" />
      <div className="hero-flashlight" aria-hidden="true" />
      <div className="hero-burst" aria-hidden="true" />

      <div className="hero-copy">
        <p className="hero-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.headline}</h1>
        <p>{copy.subheadline}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#sample-report">
            {copy.primaryCta}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button button-secondary" href="#order-report">
            {copy.secondaryCta}
          </a>
        </div>
      </div>

      <div className="signal-radar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="black-hole" ref={coreRef} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="signal-field" aria-label="Interactive positioning scan">
        {signals.map((signal) => (
          <button
            className={`alien-signal alien-${signal.tone} is-${signal.state} ${
              drag?.id === signal.id ? 'is-dragging' : ''
            }`}
            key={signal.id}
            type="button"
            onPointerDown={(event) => handleSignalDown(event, signal.id)}
            style={{
              '--x': `${signal.x}%`,
              '--y': `${signal.y}%`,
              '--gravity': signal.gravity,
              '--sink-x': `${signal.sinkX}%`,
              '--sink-y': `${signal.sinkY}%`,
            }}
            aria-label={phase === 'light' ? signal.solution : signal.pain}
          >
            <PixelAlien form={signal.form} />
          </button>
        ))}
      </div>

      <div className="hero-control-panel">
        <span>
          Noise <strong>{absorbedCount}/{SIGNALS.length}</strong>
        </span>
        <p>{phase === 'light' ? 'Clearer launch signals' : 'Click or drag signals into the core'}</p>
        <button type="button" onClick={resetSignals} aria-label="Restart hero interaction">
          <RotateCcw size={16} aria-hidden="true" />
          Restart
        </button>
        <button type="button" onClick={() => { setSoundEnabled((enabled) => !enabled); playSyntheticSfx('select'); }}>
          {soundEnabled ? <Volume2 size={17} aria-hidden="true" /> : <VolumeX size={17} aria-hidden="true" />}
          Sound {soundEnabled ? 'on' : 'off'}
        </button>
      </div>
    </header>
  );
}

export default Hero;



