import { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Activity, Cpu, Target, Zap, BarChart3 } from 'lucide-react';
import '../../../styles/refractured-animation-sandbox.css';

// Text scrambling effect for headers
function ScrambledHeader({ text, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@#$*&';
    let interval = null;

    const startDecrypt = () => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsDecrypted(true);
        }

        iteration += 1 / 3;
      }, 30);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isDecrypted) {
          setTimeout(startDecrypt, delay);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [text, delay, isDecrypted]);

  return (
    <h2 ref={triggerRef} className="scrambled-header-title">
      {displayText}
    </h2>
  );
}



// Magnetic Button component
function MagneticButton({ children, href = '#' }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;

      const distX = e.clientX - btnX;
      const distY = e.clientY - btnY;
      const dist = Math.hypot(distX, distY);

      const magneticRadius = 90;

      if (dist < magneticRadius) {
        const pullX = distX * 0.45;
        const pullY = distY * 0.45;
        btn.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.03)`;
      } else {
        btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
      }
    };

    const handleMouseLeave = () => {
      btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      href={href}
      className="sandbox-button-magnetic"
      style={{ transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)' }}
    >
      {children}
    </a>
  );
}

// Main Sandbox component
export default function RefracturedAnimationSandbox() {
  const shellRef = useRef(null);
  
  // Element Position References for dynamic SVG drawing
  const heroRef = useRef(null);
  const scrollytellingRef = useRef(null);
  const canvasRef = useRef(null);
  const rightPanelRef = useRef(null);
  const footerRef = useRef(null);

  // Cards Refs
  const card0Ref = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  // Floating Cues Refs (For high performance direct DOM updates on scroll)
  const cue1Ref = useRef(null);
  const cue2Ref = useRef(null);
  const cue3Ref = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Persistent single easter egg singularity (black hole) ref
  const singularityRef = useRef(null);

  // Mini-apps states
  const [shockwaves, setShockwaves] = useState([]);
  const [hoveredRival, setHoveredRival] = useState(null);

  const rivals = useMemo(() => [
    { name: 'Absolum', ccu: '3,200 Peak CCU', risk: 'Low Retention Risk', x: 60, y: 80 },
    { name: 'Dead Cells', ccu: '4,800 Peak CCU', risk: 'High Action Standard', x: 190, y: 70 },
    { name: 'Rotwood', ccu: '12,500 Peak CCU', risk: 'Genre Leader (Co-op)', x: 110, y: 170 },
  ], []);

  // Shared widget mouse position reference
  const widgetMouseRef = useRef({ x: 150, y: 65 });

  const steps = useMemo(() => [
    {
      id: 1,
      label: '01 MARKET READ',
      title: 'Analyze market patterns before writing code.',
      desc: 'Most games fail due to missing hooks. Identifying target genres, Steam statistics, and owner estimates tells you what players expect and what they will avoid.',
    },
    {
      id: 2,
      label: '02 PLAYER PULL',
      title: 'Hook players with instant game feel.',
      desc: 'A roguelite brawler needs instant readability. High-speed recovery, visceral camera recoil, and immediate feedback loop determine whether the player quits or buys.',
    },
    {
      id: 3,
      label: '03 RIVAL SIGNALS',
      title: 'Position against key genre leaders.',
      desc: 'Absolum defines the lane, Dead Cells set the retry standard, and Rotwood defines team-play expectation. Your task is to select elements to borrow or reject.',
    },
    {
      id: 4,
      label: '04 STOREFRONT PROMISE',
      title: 'Align storefront messaging with gameplay reality.',
      desc: 'A steam page should not lie. Hook players with clear capsule art, gameplay clips, and accurate tags. Test whether your storefront promise converts views into wishlists.',
    },
    {
      id: 5,
      label: '05 PROOF PLAN',
      title: 'Execute milestones to validate the hook.',
      desc: 'Set up playtests, measure key metrics (retention, session time), and build a proof plan that demonstrates organic traction before committing to full production.',
    },
  ], []);
  // ----------------------------------------------------
  // Starfield Canvas: Permanent Singularities & Waves
  // ----------------------------------------------------
  const canvasMouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let rafId = null;
    const starCount = 680;
    let stars = [];
    let waves = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Initialize Stars
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 1.5 + 0.35; // Ranges from 0.35 to 1.85
      const opacity = Math.random() * 0.75 + 0.15; // Diverse opacities: faint to bright
      const isWarm = Math.random() > 0.65;
      const color = isWarm 
        ? `rgba(255, 244, 223, ${opacity})` 
        : `rgba(255, 255, 255, ${opacity})`;

      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedY: Math.random() * 0.22 + 0.08,
        color,
        density: Math.random() * 6 + 3,
        consumed: false,
        recycleTimer: 0
      });
    }

    const triggerCollapse = (x, y) => {
      // Check if we already have a singularity active (Strictly single singularity easter egg)
      if (singularityRef.current) return;

      const currentScrollY = window.scrollY;
      const targetPageY = y + currentScrollY * 0.05; // Lock base coordinate to parallax scroll factor

      singularityRef.current = {
        x,
        pageY: targetPageY, // Store page coordinate for natural scrolling
        mass: 10, // Start mass
        pulse: 0
      };

      // Play implosion audio mix
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const context = new AudioContext();
          const now = context.currentTime;
          const osc = context.createOscillator();
          const gain = context.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(72, now);
          osc.frequency.exponentialRampToValueAtTime(32, now + 0.24);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.22, now + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.connect(gain);
          gain.connect(context.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        }

        const sfxList = [
          '/sfx/DSGNBoom_BOOM-Distant_Ocular_Foundation.wav',
          '/sfx/DSGNBoom_BOOM-Quake_Ocular_Foundation.wav',
        ];
        sfxList.forEach((src, index) => {
          const audio = new Audio(src);
          audio.volume = index === 0 ? 0.42 : 0.58;
          window.setTimeout(() => {
            audio.play().catch(err => console.log('Audio playback blocked:', err));
          }, index * 120);
        });
      } catch (e) {
        console.log('Audio play error:', e);
      }

      // Clear, transparent spacetime ripple scrolling with the page
      waves.push({
        x,
        pageY: targetPageY,
        radius: 6,
        maxRadius: 240,
        alpha: 1.0
      });
    };

    // Calculate warped coordinates for background grid (Gravitational lensing effect)
    const getWarpedPoint = (x, y, sing, currentScrollY) => {
      if (!sing) return { x, y };
      const singScreenY = sing.pageY - currentScrollY * 0.05;
      const dx = sing.x - x;
      const dy = singScreenY - y;
      const dist = Math.hypot(dx, dy);
      const ehRadius = sing.mass * 0.4;

      if (dist < ehRadius + 2.5) {
        return { x: sing.x, y: singScreenY };
      }

      // Exponential lensing distortion that bends space towards the singularity
      const warpStrength = (sing.mass * sing.mass * 4.5) / (dist + sing.mass * 1.5);
      const angle = Math.atan2(dy, dx);
      return {
        x: x + Math.cos(angle) * warpStrength,
        y: y + Math.sin(angle) * warpStrength
      };
    };

    const drawStarfield = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = canvasMouseRef.current;
      const sing = singularityRef.current;
      const currentScrollY = window.scrollY;

      // 1. Draw background spacetime grid (warped by singularity)
      ctx.strokeStyle = 'rgba(115, 228, 206, 0.018)'; // Faint teal grid lines
      ctx.lineWidth = 0.8;
      
      const gridSpacing = 70;
      
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height + 20; y += 15) {
          const p = getWarpedPoint(x, y, sing, currentScrollY);
          if (y === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width + 20; x += 15) {
          const p = getWarpedPoint(x, y, sing, currentScrollY);
          if (x === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // 2. Draw and grow permanent single singularity
      if (sing) {
        const screenY = sing.pageY - currentScrollY * 0.05;

        // Skip drawing if it is far outside the viewport to save CPU
        if (screenY >= -150 && screenY <= canvas.height + 150) {
          const ehRadius = sing.mass * 0.4;
          sing.pulse += 0.015;

          // Draw a faint gravitational well glow under the singularity to highlight warped grid lines
          const glowGrad = ctx.createRadialGradient(sing.x, screenY, ehRadius, sing.x, screenY, ehRadius * 4.5);
          glowGrad.addColorStop(0, 'rgba(115, 228, 206, 0.12)');
          glowGrad.addColorStop(0.4, 'rgba(115, 228, 206, 0.04)');
          glowGrad.addColorStop(1, 'rgba(115, 228, 206, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(sing.x, screenY, ehRadius * 4.5, 0, Math.PI * 2);
          ctx.fill();

          // Bright, thin bent light boundary ring (Interstellar accretion - monochrome white)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
          ctx.shadowBlur = 8;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(sing.x, screenY, ehRadius + 2.0 + Math.sin(sing.pulse * 10) * 0.8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0; // reset glow

          // Transparent gravitational lensing warp rings
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(sing.x, screenY, ehRadius * 1.6, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.beginPath();
          ctx.arc(sing.x, screenY, ehRadius * 2.8, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
          ctx.beginPath();
          ctx.arc(sing.x, screenY, ehRadius * 4.2, 0, Math.PI * 2);
          ctx.stroke();

          // Event Horizon Core (Black hole)
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(sing.x, screenY, ehRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Draw transparent shockwaves
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        const screenY = w.pageY - currentScrollY * 0.05;

        ctx.strokeStyle = `rgba(255, 255, 255, ${w.alpha * 0.18})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(w.x, screenY, w.radius, 0, Math.PI * 2);
        ctx.stroke();

        w.radius += 6.0;
        w.alpha = Math.max(0, 1 - w.radius / w.maxRadius);

        if (w.alpha <= 0 || screenY < -150 || screenY > canvas.height + 150) {
          waves.splice(i, 1);
        }
      }

      // 4. Stars gravity calculations
      let starsNearCursorCount = 0;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (star.consumed) {
          star.recycleTimer++;
          if (star.recycleTimer > 180) {
            star.consumed = false;
            star.recycleTimer = 0;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() > 0.5 ? canvas.height + 15 : -15;
          }
          continue;
        }

        // Drifts upward
        star.y -= star.speedY;

        // Scroll parallax
        const scrollParallax = currentScrollY * (star.size * 0.035);
        let currentY = star.y - scrollParallax;

        if (currentY < -15) {
          star.y = canvas.height + 15 + scrollParallax;
          star.x = Math.random() * canvas.width;
          currentY = star.y - scrollParallax;
        }

        // Check gravity pulls against the single active singularity
        if (sing) {
          const singScreenY = sing.pageY - currentScrollY * 0.05;
          const dist = Math.hypot(sing.x - star.x, singScreenY - currentY);
          const ehRadius = sing.mass * 0.4;

          if (dist < ehRadius + 2.5) {
             star.consumed = true;
             star.recycleTimer = 0;
             
             // Grow the singularity mass gradually when it eats a star (unlimited growth)
             sing.mass += 1.8;
             continue;
          }

          if (dist < 320) { // Increased gravity influence radius
            // Balanced cinematic gravity spiral pull (middle ground)
            const force = (sing.mass * 4.5) / (dist + 35); // Force multiplier 4.5
            const angle = Math.atan2(singScreenY - currentY, sing.x - star.x);
            const orbitAngle = angle + Math.PI / 2;

            // Boost fall-in speed exponentially as stars get very close to the event horizon
            const closeFactor = dist < ehRadius + 30 ? (ehRadius + 30 - dist) / 10 : 0;
            
            let speedFallFactor = 0.35;
            let speedSwirlFactor = 0.55;

            // Feeding logic: if mouse is near singularity and star is near mouse, accelerate directly to singularity
            if (mouse.x !== null) {
              const distMouseSing = Math.hypot(sing.x - mouse.x, singScreenY - mouse.y);
              const distStarMouse = Math.hypot(mouse.x - star.x, mouse.y - currentY);
              if (distMouseSing < 180 && distStarMouse < 180) {
                speedFallFactor = 0.95;
                speedSwirlFactor = 0.05;
              }
            }

            const speedFall = force * (speedFallFactor + closeFactor * 0.6);
            const speedSwirl = force * speedSwirlFactor;

            star.x += Math.cos(angle) * speedFall + Math.cos(orbitAngle) * speedSwirl;
            star.y += Math.sin(angle) * speedFall + Math.sin(orbitAngle) * speedSwirl;
          }
        }

        // Original natural mouse cursor attraction (always active, enabling star gathering and feeding)
        if (mouse.x !== null) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - currentY;
          const dist = Math.hypot(dx, dy);

          if (dist < 200) {
            let shouldPull = true;
            if (sing) {
              const singScreenY = sing.pageY - currentScrollY * 0.05;
              const distToSing = Math.hypot(sing.x - star.x, singScreenY - currentY);
              // If star is inside singularity gravity, let singularity dominate
              if (distToSing < 320) {
                shouldPull = distToSing > 150;
              }
            }

            if (shouldPull) {
              const pull = ((200 - dist) / 200) * 0.24;
              star.x += (dx / dist) * pull * star.density;
              star.y += (dy / dist) * pull * star.density;
            }

            if (dist < 28 && !sing) {
              starsNearCursorCount++;
            }
          }
        }

        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, currentY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Check if cluster accumulation triggers collapse (Deliberate easter egg threshold 24)
      if (starsNearCursorCount >= 24 && mouse.x !== null) {
        triggerCollapse(mouse.x, mouse.y);
      }

      rafId = requestAnimationFrame(drawStarfield);
    };

    rafId = requestAnimationFrame(drawStarfield);

    // Global window listeners for viewport-wide mouse tracking (Immune to parent offsets)
    const handleWindowMouseMove = (e) => {
      canvasMouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleWindowMouseLeave = () => {
      canvasMouseRef.current = { x: null, y: null };
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleWindowMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseleave', handleWindowMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ----------------------------------------------------
  // Scroll step and mouse tilt listener
  // ----------------------------------------------------
  useEffect(() => {
    const scrolly = scrollytellingRef.current;
    const rightPanel = rightPanelRef.current;
    let rafId = null;

    let prevActiveStep = 0;

    const updateScrollProgress = () => {
      // 1. Scrollytelling steps checks
      if (scrolly) {
        const rect = scrolly.getBoundingClientRect();
        const scrollableHeight = rect.height - window.innerHeight;
        if (scrollableHeight > 0) {
          const pinProgress = -rect.top / scrollableHeight;
          const stepFraction = 1 / steps.length;
          const currentStep = Math.max(
            0,
            Math.min(steps.length - 1, Math.floor(pinProgress / stepFraction))
          );
          if (currentStep !== prevActiveStep) {
            prevActiveStep = currentStep;
            setActiveStep(currentStep);
          }
        }
      }

      // 2. Floating Cues relative reveal using element viewport positions
      [cue1Ref, cue2Ref, cue3Ref].forEach((ref) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        
        if (rect.top < window.innerHeight - 80 && rect.bottom > 80) {
          el.classList.add('is-visible');
        } else {
          el.classList.remove('is-visible');
        }
      });

      rafId = requestAnimationFrame(updateScrollProgress);
    };

    rafId = requestAnimationFrame(updateScrollProgress);

    // Glass panel mouse tilt
    const handleRightPanelMouseMove = (e) => {
      if (!rightPanel) return;
      const rect = rightPanel.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const maxTilt = 8;
      const rotX = -y * maxTilt;
      const rotY = x * maxTilt;

      rightPanel.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
      rightPanel.style.setProperty('--shine-x', `${(e.clientX - rect.left) / rect.width * 100}%`);
      rightPanel.style.setProperty('--shine-y', `${(e.clientY - rect.top) / rect.height * 100}%`);
    };

    const handleRightPanelMouseLeave = () => {
      if (!rightPanel) return;
      rightPanel.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
    };

    if (rightPanel) {
      rightPanel.addEventListener('mousemove', handleRightPanelMouseMove, { passive: true });
      rightPanel.addEventListener('mouseleave', handleRightPanelMouseLeave, { passive: true });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (rightPanel) {
        rightPanel.removeEventListener('mousemove', handleRightPanelMouseMove);
        rightPanel.removeEventListener('mouseleave', handleRightPanelMouseLeave);
      }
    };
  }, [steps.length]);

  // 3D Glass tilt & shine for strategic cues
  useEffect(() => {
    const cleanups = [];
    const cues = [cue1Ref.current, cue2Ref.current, cue3Ref.current];
    cues.forEach(cue => {
      if (!cue) return;
      const handleMouseMove = (e) => {
        const rect = cue.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cue.style.setProperty('--shine-x', `${x / rect.width * 100}%`);
        cue.style.setProperty('--shine-y', `${y / rect.height * 100}%`);
        
        const maxTilt = 10;
        const rotX = -(y / rect.height - 0.5) * maxTilt;
        const rotY = (x / rect.width - 0.5) * maxTilt;
        cue.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(5px)`;
      };
      
      const handleMouseLeave = () => {
        cue.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
        cue.style.setProperty('--shine-x', '50%');
        cue.style.setProperty('--shine-y', '50%');
      };
      
      cue.addEventListener('mousemove', handleMouseMove, { passive: true });
      cue.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      
      cleanups.push(() => {
        cue.removeEventListener('mousemove', handleMouseMove);
        cue.removeEventListener('mouseleave', handleMouseLeave);
      });
    });
    
    return () => cleanups.forEach(fn => fn());
  }, []);

  // Flashlight tracker for cards
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--spot-x', `${x}px`);
    card.style.setProperty('--spot-y', `${y}px`);
  };

  // Shared mouse tracking inside scrollytelling widgets
  const handleWidgetMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    widgetMouseRef.current = { x, y };
  };

  // ----------------------------------------------------
  // Widget App 0: Signal Wave Canvas (Colorless)
  // ----------------------------------------------------
  const waveCanvasRef = useRef(null);
  useEffect(() => {
    if (activeStep !== 0) return;
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth || 300;
    canvas.height = canvas.offsetHeight || 130;

    let animId;
    let phase = 0;

    const renderWave = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Colorless graph grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw colorless wave reacting to X hover
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const mouseX = widgetMouseRef.current.x;

      for (let x = 0; x < canvas.width; x++) {
        const dx = Math.abs(x - mouseX);
        const force = dx < 140 ? (140 - dx) / 140 : 0;

        const amp = 14 + force * 22;
        const freq = 0.015 + force * 0.03;

        const y = canvas.height / 2 + Math.sin(x * freq - phase) * amp;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      phase += 0.045;
      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [activeStep]);

  // ----------------------------------------------------
  // Widget App 1: Calibration Reticle Spring Physics (Colorless)
  // ----------------------------------------------------
  const reticleContainerRef = useRef(null);
  const reticleRef = useRef(null);

  useEffect(() => {
    if (activeStep !== 1) return;
    const container = reticleContainerRef.current;
    const reticle = reticleRef.current;
    if (!container || !reticle) return;

    let animId;
    let current = { x: 150, y: 190 };
    let vel = { x: 0, y: 0 };
    const k = 0.07;
    const damp = 0.83;

    const updateSpring = () => {
      const target = widgetMouseRef.current || { x: 150, y: 190 };

      const dx = target.x - current.x;
      const dy = target.y - current.y;

      const ax = dx * k;
      const ay = dy * k;

      vel.x = (vel.x + ax) * damp;
      vel.y = (vel.y + ay) * damp;

      current.x += vel.x;
      current.y += vel.y;

      if (reticle) {
        reticle.style.left = `${current.x}px`;
        reticle.style.top = `${current.y}px`;

        const speed = Math.hypot(vel.x, vel.y);
        reticle.style.transform = `translate(-50%, -50%) scale(${1 + speed * 0.016})`;
      }

      animId = requestAnimationFrame(updateSpring);
    };

    updateSpring();
    return () => cancelAnimationFrame(animId);
  }, [activeStep]);

  const handleReticleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setShockwaves((prev) => [...prev, { id, x, y }]);

    // Screen Shake effect on click
    const panel = rightPanelRef.current;
    if (panel) {
      const shakeRange = 12;
      panel.style.transform = `perspective(1000px) translate3d(${(Math.random() - 0.5) * shakeRange}px, ${(Math.random() - 0.5) * shakeRange}px, 10px)`;
      setTimeout(() => {
        panel.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      }, 70);
    }

    setTimeout(() => {
      setShockwaves((prev) => prev.filter((sw) => sw.id !== id));
    }, 750);
  };

  return (
    <main ref={shellRef} className="sandbox-shell">
      {/* Space Canvas background with drag gravity black hole */}
      <div className="sandbox-space" aria-hidden="true">
        <canvas ref={canvasRef} className="sandbox-starfield-canvas" />
      </div>

      {/* Floating Strategic Questions (Direct DOM class toggling using refs for high performance) */}
      <div ref={cue1Ref} className="sandbox-floating-cue cue-1">
        <span>STRATEGIC QUESTION</span>
        <p>Czy pierwsza walka uzależnia od razu?</p>
      </div>
      <div ref={cue2Ref} className="sandbox-floating-cue cue-2">
        <span>STRATEGIC QUESTION</span>
        <p>Co gracz zapamięta: feeling czy listę feature'ów?</p>
      </div>
      <div ref={cue3Ref} className="sandbox-floating-cue cue-3">
        <span>STRATEGIC QUESTION</span>
        <p>Czy obietnica na Steam ma pokrycie w gameplayu?</p>
      </div>

      {/* Top Navigation */}
      <header className="sandbox-header">
        <a href="#client-report/refractured" className="flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Report
        </a>
        <h1>REFRACTURED ANIMATION SANDBOX</h1>
        <span>GRAVITY SYSTEM: ONLINE</span>
      </header>


      <div className="sandbox-flow-container">
        {/* Hero Welcome */}
        <section ref={heroRef} className="relative flex flex-col items-center justify-center text-center py-24 px-6 z-10">
          <div className="w-12 h-12 rounded-full border border-teal-500/20 flex items-center justify-center bg-teal-500/5 mb-4">
            <Zap className="text-teal-400" size={20} />
          </div>
          <p className="text-amber-400 uppercase tracking-widest text-xs font-bold mb-2 font-mono">
            Interactive Design Testing Ground
          </p>
          <h1 className="text-white text-4xl font-black max-w-2xl leading-tight">
            Visual Flow & Tactical Micro-interactions
          </h1>
          <p className="text-slate-400 text-base max-w-lg mt-4 leading-relaxed">
            Move the cursor anywhere on screen to attract stars. Collect 10+ stars near the cursor to tear a permanent spacetime collapse rift!
          </p>
          <MagneticButton href="#scrolly-trigger">
            Explore Sandbox <ArrowRight size={14} />
          </MagneticButton>
        </section>

        {/* Scrollytelling Pinned Section */}
        <section id="scrolly-trigger" ref={scrollytellingRef} className="sandbox-scrollytelling-wrapper">
          <div className="sandbox-sticky-container">
            <div className="sandbox-left-panel">
              {/* Vertical Step Sidebar */}
              <nav className="sandbox-sidebar-menu" aria-label="Analysis steps">
                <div className="sandbox-sidebar-track">
                  <div className="sandbox-sidebar-indicator" style={{ transform: `translateY(${activeStep * 48}px)` }} />
                </div>
                <ul className="sandbox-sidebar-list">
                  {steps.map((step, index) => (
                    <li key={step.id}>
                      <button
                        className={`sandbox-sidebar-item ${index === activeStep ? 'is-active' : ''}`}
                        onClick={() => {
                          const scrolly = document.getElementById('scrolly-trigger');
                          if (scrolly) {
                            const rect = scrolly.getBoundingClientRect();
                            const scrollableHeight = rect.height - window.innerHeight;
                            const targetScroll = window.scrollY + rect.top + (scrollableHeight * index / steps.length) + 10;
                            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                          }
                        }}
                      >
                        {step.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* Step Content */}
              <div className="sandbox-step-content">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  return (
                    <article key={step.id} className={`sandbox-scroll-step ${isActive ? 'is-active' : ''}`}>
                      <span>{step.label}</span>
                      <h2>{step.title}</h2>
                      <p>{step.desc}</p>
                    </article>
                  );
                })}
              </div>
            </div>
            
            {/* premium iOS Glassmorphism Dashboard Widget */}
            <div 
              className={`sandbox-right-panel active-step-${activeStep}`} 
              ref={rightPanelRef}
              onMouseMove={handleWidgetMouseMove}
            >
              <div className="sandbox-widget-inner">
                {activeStep === 0 && (
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="text-white animate-pulse" size={24} />
                      <strong className="text-white text-base font-mono tracking-wider">LIVE SIGNAL SCANNER</strong>
                    </div>
                    <canvas ref={waveCanvasRef} className="sandbox-wave-canvas" />
                    <span className="text-slate-500 font-mono text-xs mt-2">Frequency: Reacting to Cursor Hover</span>
                  </div>
                )}
                
                {activeStep === 1 && (
                  <div 
                    className="sandbox-reticle-container" 
                    ref={reticleContainerRef}
                    onMouseMove={handleWidgetMouseMove}
                    onClick={handleReticleClick}
                  >
                    <div className="absolute top-6 left-6 flex items-center gap-2 z-10 pointer-events-none">
                      <Target className="text-white" size={20} />
                      <strong className="text-white text-sm font-mono tracking-wider">VISCERAL FEEL TESTING</strong>
                    </div>
                    
                    <div className="sandbox-reticle-target" ref={reticleRef} />
                    
                    {shockwaves.map(sw => (
                      <div
                        key={sw.id}
                        className="sandbox-reticle-shockwave"
                        style={{ left: sw.x, top: sw.y }}
                      />
                    ))}
                    
                    <span className="absolute bottom-6 left-6 text-slate-500 font-mono text-xs pointer-events-none">
                      Click to Test Screen Shake & Visceral Impactor
                    </span>
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div className="w-full flex flex-col items-center justify-center relative">
                    <div className="absolute top-0 flex items-center gap-2 mb-4 z-15 pointer-events-none">
                      <Cpu className="text-white" size={20} />
                      <strong className="text-white text-sm font-mono tracking-wider">RIVAL RADAR MAP</strong>
                    </div>
                    
                    <div className="sandbox-radar-container">
                      <div className="sandbox-radar-sweep" />
                      {rivals.map((rival, idx) => (
                        <button
                          key={rival.name}
                          className={`sandbox-radar-node ${hoveredRival === idx ? 'is-hovered' : ''}`}
                          style={{ left: rival.x, top: rival.y }}
                          onMouseEnter={() => setHoveredRival(idx)}
                          onMouseLeave={() => setHoveredRival(null)}
                          aria-label={`Rival ${rival.name}`}
                        />
                      ))}
                      
                      {hoveredRival !== null && (
                        <div className="sandbox-radar-tooltip">
                          <strong>{rivals[hoveredRival].name}</strong><br/>
                          {rivals[hoveredRival].ccu}<br/>
                          <span className="text-slate-400">{rivals[hoveredRival].risk}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="text-white" size={20} />
                      <strong className="text-white text-sm font-mono tracking-wider">STOREFRONT CONVERSION</strong>
                    </div>
                    <div className="sandbox-storefront-widget">
                      <div className="sandbox-storefront-row">
                        <span className="sandbox-storefront-label">Capsule Art Clarity</span>
                        <div className="sandbox-storefront-bar"><div className="sandbox-storefront-fill" style={{ width: '82%' }} /></div>
                        <span className="sandbox-storefront-pct">82%</span>
                      </div>
                      <div className="sandbox-storefront-row">
                        <span className="sandbox-storefront-label">Gameplay Tag Match</span>
                        <div className="sandbox-storefront-bar"><div className="sandbox-storefront-fill" style={{ width: '91%' }} /></div>
                        <span className="sandbox-storefront-pct">91%</span>
                      </div>
                      <div className="sandbox-storefront-row">
                        <span className="sandbox-storefront-label">Trailer Hook Strength</span>
                        <div className="sandbox-storefront-bar"><div className="sandbox-storefront-fill" style={{ width: '67%' }} /></div>
                        <span className="sandbox-storefront-pct">67%</span>
                      </div>
                      <div className="sandbox-storefront-row">
                        <span className="sandbox-storefront-label">Description Scannability</span>
                        <div className="sandbox-storefront-bar"><div className="sandbox-storefront-fill" style={{ width: '74%' }} /></div>
                        <span className="sandbox-storefront-pct">74%</span>
                      </div>
                    </div>
                    <span className="text-slate-500 font-mono text-xs mt-2">Conversion Funnel Diagnostic // Views → Wishlists</span>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="text-white" size={20} />
                      <strong className="text-white text-sm font-mono tracking-wider">PROOF PLAN MILESTONES</strong>
                    </div>
                    <div className="sandbox-proof-widget">
                      <div className="sandbox-proof-item is-done">
                        <div className="sandbox-proof-check">✓</div>
                        <span>Core loop prototype playable</span>
                      </div>
                      <div className="sandbox-proof-item is-done">
                        <div className="sandbox-proof-check">✓</div>
                        <span>10-player closed alpha test</span>
                      </div>
                      <div className="sandbox-proof-item is-current">
                        <div className="sandbox-proof-check">◉</div>
                        <span>Steam page live + wishlist tracking</span>
                      </div>
                      <div className="sandbox-proof-item">
                        <div className="sandbox-proof-check">○</div>
                        <span>Public demo fest participation</span>
                      </div>
                      <div className="sandbox-proof-item">
                        <div className="sandbox-proof-check">○</div>
                        <span>50K wishlist threshold</span>
                      </div>
                    </div>
                    <span className="text-slate-500 font-mono text-xs mt-2">Milestone Tracker // Validation Pipeline</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Evidence Vault Header */}
        <section className="relative z-10 pt-24 pb-12 text-center">
          <ScrambledHeader text="INTELLIGENCE REPORT EVIDENCE VAULT" delay={100} />
          <p className="text-slate-400 mt-2 text-sm">Strategic intelligence tiles. Hover to inspect.</p>
        </section>
      </div>

      <div className="sandbox-stage">
        
        {/* Card Holder with 3 cards */}
        <section className="relative z-10">
          <div className="sandbox-card-holder">
            
            {/* Card 0 */}
            <div
              ref={card0Ref}
              className={`sandbox-card ${hoveredCard === 0 ? 'is-active' : ''}`}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="sandbox-card-shine" />
              <div className="sandbox-card-front">
                <span className="text-xs font-mono text-amber-500">AUDIT LAYER</span>
                <h3 className="text-white text-lg font-bold mt-2">Steam CCU Snapshot</h3>
                <p className="text-slate-400 mt-4 text-sm">Current peak concurrent player counts across primary roguelite brawler releases.</p>
              </div>
              
              <div className="sandbox-card-data">
                <div className="sandbox-mono-grid">
                  <div className="sandbox-mono-row"><span className="sandbox-mono-label">ROTWOOD</span><span className="sandbox-mono-value">12,500</span></div>
                  <div className="sandbox-mono-row"><span className="sandbox-mono-label">DEAD CELLS</span><span className="sandbox-mono-value">4,800</span></div>
                  <div className="sandbox-mono-row"><span className="sandbox-mono-label">ABSOLUM</span><span className="sandbox-mono-value">3,200</span></div>
                </div>
                <div className="sandbox-mono-footer">PEAK CCU // LIVE SECTOR DATA</div>
              </div>
            </div>

            {/* Card 1 */}
            <div
              ref={card1Ref}
              className={`sandbox-card ${hoveredCard === 1 ? 'is-active' : ''}`}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="sandbox-card-shine" />
              <div className="sandbox-card-front">
                <span className="text-xs font-mono text-amber-500">AUDIT LAYER</span>
                <h3 className="text-white text-lg font-bold mt-2">Player Review Themes</h3>
                <p className="text-slate-400 mt-4 text-sm">NLP processed review keywords extracted from positive vs negative player reviews.</p>
              </div>
              
              <div className="sandbox-card-data">
                <div className="sandbox-mono-grid">
                  <div className="sandbox-mono-row"><span className="sandbox-mono-label">VISCERAL FEEL</span><span className="sandbox-mono-value">84%</span></div>
                  <div className="sandbox-mono-row"><span className="sandbox-mono-label">INSTANT FLOW</span><span className="sandbox-mono-value">79%</span></div>
                  <div className="sandbox-mono-row sandbox-mono-negative"><span className="sandbox-mono-label">SLOW RECOVERY</span><span className="sandbox-mono-value">67%</span></div>
                  <div className="sandbox-mono-row sandbox-mono-negative"><span className="sandbox-mono-label">COMPLEX UI</span><span className="sandbox-mono-value">42%</span></div>
                </div>
                <div className="sandbox-mono-footer">NLP REVIEW THEMES // SENTIMENT SIGNALS</div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              ref={card2Ref}
              className={`sandbox-card ${hoveredCard === 2 ? 'is-active' : ''}`}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="sandbox-card-shine" />
              <div className="sandbox-card-front">
                <span className="text-xs font-mono text-amber-500">AUDIT LAYER</span>
                <h3 className="text-white text-lg font-bold mt-2">Wishlist Velocity</h3>
                <p className="text-slate-400 mt-4 text-sm">Average daily wishlist additions required to sustain storefront visibility.</p>
              </div>
              
              <div className="sandbox-card-data">
                <div className="sandbox-mono-grid">
                  <div className="sandbox-mono-row"><span className="sandbox-mono-label">DAILY VELOCITY</span><span className="sandbox-mono-value">+450/day</span></div>
                  <div className="sandbox-mono-row"><span className="sandbox-mono-label">TARGET</span><span className="sandbox-mono-value">50K</span></div>
                  <div className="sandbox-mono-row"><span className="sandbox-mono-label">EST. LAUNCH</span><span className="sandbox-mono-value">OCT 2026</span></div>
                </div>
                <div className="sandbox-mono-footer">WISHLIST PROJECTION // VELOCITY VECTOR</div>
              </div>
            </div>

          </div>
        </section>



        {/* Final Action / Footer */}
        <section ref={footerRef} className="relative z-10 py-16 flex flex-col items-center justify-center text-center">
          <h3 className="text-white text-xl font-bold font-mono tracking-wider mb-2">FLOW INTEGRATION SECURED</h3>
          <p className="text-slate-400 text-sm max-w-sm px-6">All strategic lanes have successfully merged. Proceed to review the full refractured intelligence analysis.</p>
          <MagneticButton href="#client-report/refractured">
            Enter Client Report <ArrowRight size={14} />
          </MagneticButton>
        </section>

      </div>
    </main>
  );
}
