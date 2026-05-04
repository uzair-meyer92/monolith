import { useEffect, useRef } from 'react';
import { T } from '../data.js';

const SEG = 'Ground Truth — Thandiwe Mokoena — Now on View — 6 February – 28 June 2026 — Monolith Gallery, Cape Town · ';
const RUN = SEG.repeat(6);

export default function Marquee() {
  const trackRef = useRef(null);

  /* Pause the CSS animation when the marquee is off-screen. Saves
     compositing work on long scrolls and helps Lighthouse mobile TBT. */
  useEffect(() => {
    const t = trackRef.current;
    if (!t || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([entry]) => {
      t.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
    }, { threshold: 0 });
    obs.observe(t);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="mq-wrap" style={{
      background: '#0C0A09', padding: '11px 0', overflow: 'hidden',
      borderTop: '1px solid #141210', borderBottom: '1px solid #141210',
    }} aria-hidden="true">
      <div className="mq-track" ref={trackRef}>
        <span style={{
          fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
          textTransform: 'uppercase', color: T.labelDark, whiteSpace: 'nowrap',
        }}>
          {RUN + RUN}
        </span>
      </div>
    </div>
  );
}
