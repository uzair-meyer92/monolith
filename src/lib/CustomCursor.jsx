import { useEffect, useRef } from 'react';

/* Two-layer cursor (dot + lerp ring) with three variants.
   - default : terracotta dot + thin ring (mixBlendMode difference)
   - button  : ring fills, dot hides
   - input   : ring collapses to a slim caret line
   Fades out after 2.5s of no movement; reappears on the next move.
   Only attached on hover-capable, fine-pointer devices. */

const IDLE_MS = 2500;

const VARIANTS = {
  default: { dot: 6, ringW: 32, ringH: 32, fill: 'transparent',          radius: '50%' },
  button:  { dot: 0, ringW: 38, ringH: 38, fill: 'rgba(140,58,43,0.92)', radius: '50%' },
  input:   { dot: 0, ringW: 2,  ringH: 22, fill: 'rgba(10,10,10,0.85)',  radius: 0     },
};

const BUTTON_SELECTORS = 'button, a, [role="button"], [data-cursor="button"]';
const INPUT_SELECTORS  = 'input, textarea, select, [contenteditable="true"], [data-cursor="input"]';

export default function CustomCursor() {
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const target    = useRef({ x: 0, y: 0 });
  const ringPos   = useRef({ x: 0, y: 0 });
  const visibleR  = useRef(false);
  const variantR  = useRef('default');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.body.classList.add('cursor-custom-active');

    const applyVariant = (next) => {
      if (variantR.current === next) return;
      variantR.current = next;
      const v = VARIANTS[next];
      if (dotRef.current) {
        dotRef.current.style.width  = `${v.dot}px`;
        dotRef.current.style.height = `${v.dot}px`;
        dotRef.current.style.opacity = visibleR.current && v.dot > 0 ? '1' : '0';
      }
      if (ringRef.current) {
        ringRef.current.style.width  = `${v.ringW}px`;
        ringRef.current.style.height = `${v.ringH}px`;
        ringRef.current.style.background = v.fill;
        ringRef.current.style.borderRadius = typeof v.radius === 'number' ? `${v.radius}px` : v.radius;
        ringRef.current.style.border = next === 'input' ? 'none' : '1px solid rgba(140,58,43,0.55)';
        ringRef.current.style.mixBlendMode = next === 'default' ? 'difference' : 'normal';
      }
    };

    const setVisible = (v) => {
      visibleR.current = v;
      const dotV = VARIANTS[variantR.current].dot;
      if (dotRef.current)  dotRef.current.style.opacity  = v && dotV > 0 ? '1' : '0';
      if (ringRef.current) ringRef.current.style.opacity = v ? '1' : '0';
    };

    let idleTimer;
    const armIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setVisible(false), IDLE_MS);
    };

    const move = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visibleR.current) setVisible(true);
      armIdle();
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      /* Restart the lerp loop if it had settled. */
      if (raf == null) raf = requestAnimationFrame(tick);
    };

    const matchVariant = (el) => {
      if (!el || !el.closest) return 'default';
      if (el.closest(BUTTON_SELECTORS)) return 'button';
      if (el.closest(INPUT_SELECTORS))  return 'input';
      return 'default';
    };
    const over  = (e) => applyVariant(matchVariant(e.target));
    const enter = ()  => setVisible(true);
    const leave = ()  => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseenter', enter);
    document.documentElement.addEventListener('mouseleave', leave);

    let raf = null;
    const tick = () => {
      const t = target.current;
      const p = ringPos.current;
      const dx = t.x - p.x;
      const dy = t.y - p.y;
      /* Once the ring has caught the dot, stop the loop. The next
         mousemove restarts it. Saves continuous CPU when idle. */
      if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
        raf = null;
        return;
      }
      p.x += dx * 0.18;
      p.y += dy * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    applyVariant('default');

    return () => {
      document.body.classList.remove('cursor-custom-active');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseenter', enter);
      document.documentElement.removeEventListener('mouseleave', leave);
      if (raf != null) cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, width: 6, height: 6,
          background: '#8C3A2B', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 10000, opacity: 0,
          transition: 'width 220ms cubic-bezier(0.16,1,0.3,1), height 220ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, width: 32, height: 32,
          border: '1px solid rgba(140,58,43,0.55)',
          background: 'transparent', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999, opacity: 0,
          transition: 'width 260ms cubic-bezier(0.16,1,0.3,1), height 260ms cubic-bezier(0.16,1,0.3,1), background 220ms ease, border-color 220ms ease, border-radius 220ms ease, opacity 220ms ease',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
