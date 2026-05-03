import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

import { T, SRCS, ARTIST, EXHIBITION } from '../data.js';
import Photo from '../lib/Photo.jsx';
import Button from '../lib/Button.jsx';

/* Hero — full-bleed Karoo plate with a line-mask H1 reveal and a
   subtle parallax on the image. Reduced-motion users get instant
   content with no transforms. */
export default function Hero() {
  const navigate = useNavigate();
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const lines = ref.current.querySelectorAll('[data-anim="hl"]');
      if (lines.length) {
        gsap.set(lines, { yPercent: 110 });
        gsap.to(lines, {
          yPercent: 0, duration: 1.2, stagger: 0.09,
          ease: 'power3.out', delay: 0.25,
        });
      }

      const meta = ref.current.querySelectorAll('[data-anim="hm"]');
      if (meta.length) {
        gsap.set(meta, { opacity: 0, y: 14 });
        gsap.to(meta, {
          opacity: 1, y: 0, duration: 1.0, stagger: 0.08,
          ease: 'power3.out', delay: 0.85,
        });
      }

      const par = ref.current.querySelector('[data-anim="par"]');
      if (par && par.parentElement) {
        gsap.to(par, {
          yPercent: 14, ease: 'none',
          scrollTrigger: { trigger: par.parentElement, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{
      position: 'relative', background: T.black, minHeight: '100vh',
      display: 'flex', alignItems: 'flex-end',
      paddingBottom: 72, paddingTop: 56, overflow: 'hidden',
    }}>
      <div data-anim="par" style={{ position: 'absolute', inset: '-15% 0 0 0', zIndex: 0 }}>
        <Photo
          src={SRCS.hero} ph="ph-dark"
          alt="Open Karoo landscape under low light, the terrain that informs Thandiwe Mokoena's Ground Truth exhibition."
          filter="grayscale(0.35) contrast(1.1) brightness(0.7)"
          eager fetchPriority="high"
          w={1800} h={1200}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(10,10,10,0.97) 38%, rgba(10,10,10,0.25) 100%)',
      }} />
      <div className="page-pad-x shell" style={{
        position: 'relative', zIndex: 2, width: '100%',
      }}>
        <div className="hero-text">
          <div data-anim="hm" style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.2em',
            textTransform: 'uppercase', color: T.labelDark, marginBottom: 24,
          }}>
            Current Exhibition
          </div>
          <h1 className="hero-h1" style={{
            fontFamily: T.d, fontSize: 'clamp(56px, 11vw, 124px)', fontWeight: 300,
            lineHeight: 0.88, letterSpacing: '-.025em',
            margin: '0 0 12px', fontOpticalSizing: 'auto',
          }}>
            <span className="word">
              <span data-anim="hl" style={{ display: 'block', color: T.paper }}>
                {EXHIBITION.titleLead}
              </span>
            </span>
            <span className="word">
              <span data-anim="hl" style={{ display: 'block' }}>
                <em style={{ fontStyle: 'italic', color: T.accent }}>{EXHIBITION.titleAccent}</em>
              </span>
            </span>
          </h1>
          <div data-anim="hm" style={{
            fontFamily: T.d, fontSize: 22, fontWeight: 300, fontStyle: 'italic',
            color: T.paper, marginBottom: 14, fontOpticalSizing: 'auto',
          }}>
            {ARTIST.name}
          </div>
          <div data-anim="hm" style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.12em',
            textTransform: 'uppercase', color: T.labelDark, marginBottom: 40,
          }}>
            {EXHIBITION.dates} · {EXHIBITION.venue}
          </div>
          <div data-anim="hm" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Button variant="primary" onClick={() => navigate('/#works')}>
              View Exhibition →
            </Button>
            <Button variant="outline-light" onClick={() => navigate('/visit')}>
              Plan Your Visit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
