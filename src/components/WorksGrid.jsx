import { useLayoutEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

import { T, ARTIST, WORKS } from '../data.js';
import Photo from '../lib/Photo.jsx';
import Rule from './Rule.jsx';

export default function WorksGrid() {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const cards = ref.current.querySelectorAll('[data-anim="wc"]');
      if (!cards.length) return;
      gsap.set(cards, { opacity: 0, y: 40 });
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0].parentElement, start: 'top 82%', once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const openWork = (work) => {
    navigate(`${location.pathname}${location.search}`, {
      state: { modalOpen: 'work', id: work.id, slug: work.slug },
    });
  };

  return (
    <section id="works" ref={ref} className="page-pad-x" style={{
      background: T.paper, paddingTop: 56, paddingBottom: 96, scrollMarginTop: 56,
    }}>
      <div className="shell">
        <Rule label="Selected Works" />
        <div className="works-grid" role="list">
          {WORKS.map((w) => (
            <button
              key={w.id} type="button" role="listitem" data-anim="wc"
              onClick={() => openWork(w)}
              style={{
                background: 'none', border: 'none', padding: 0,
                cursor: 'pointer', textAlign: 'left',
              }}
              aria-label={`Open work: ${w.title}, ${w.year}`}>
              <Photo
                src={w.src} ph={w.ph}
                alt={`${w.title} (${w.year}) by ${ARTIST.name} — ${w.metadata}`}
                filter="grayscale(0.2) contrast(1.08)" hoverable
                w={w.w} h={w.h}
                sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                style={{ aspectRatio: w.aspect, width: '100%', marginBottom: 14 }}
              />
              <div style={{
                fontFamily: T.m, fontSize: 9, letterSpacing: '.1em',
                textTransform: 'uppercase', color: T.black, marginBottom: 2,
              }}>
                {ARTIST.name}
              </div>
              <div style={{
                fontFamily: T.m, fontSize: 9, letterSpacing: '.07em',
                textTransform: 'uppercase', color: T.label, marginBottom: 1,
              }}>
                {`${w.title}, ${w.year}`}
              </div>
              <div style={{
                fontFamily: T.m, fontSize: 8, letterSpacing: '.06em',
                textTransform: 'uppercase', color: T.label,
              }}>
                {w.dim}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
