import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { T, SRCS, ARTIST, EXHIBITION, PAST_EXHIBITIONS } from '../data.js';
import Photo from '../lib/Photo.jsx';
import Button from '../lib/Button.jsx';
import Rule from '../components/Rule.jsx';
import { useReveal } from '../lib/useReveal.js';
import { useSEO } from '../lib/SEO.jsx';

/* /exhibition — the gallery's exhibitions archive.
   - Top: featured "On view now" — the current Ground Truth show, with
     a hero crop, statement excerpt, and CTAs to the home and press release.
   - Below: chronological archive of past exhibitions, image left,
     text right, in the editorial split-200-1 rhythm. */
export default function Exhibition() {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  useReveal(ref);

  useSEO({
    title: 'Exhibitions',
    description: `Exhibitions at MONOLITH — currently on view: ${EXHIBITION.titleLead} ${EXHIBITION.titleAccent} by ${ARTIST.name}. Plus archive of past shows.`,
    path: '/exhibition',
  });

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  return (
    <div ref={ref} style={{ background: T.paper, paddingTop: 56, minHeight: '100vh' }}>
      <div className="page-pad shell">
        {/* Page heading */}
        <div data-anim="rv" style={{
          fontFamily: T.m, fontSize: 9, letterSpacing: '.2em',
          textTransform: 'uppercase', color: T.label, marginBottom: 16,
        }}>
          Exhibitions Archive
        </div>
        <h1 data-anim="rv" style={{
          fontFamily: T.d, fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 300,
          lineHeight: 0.95, letterSpacing: '-.02em',
          color: T.black, marginBottom: 24, fontOpticalSizing: 'auto',
        }}>
          Exhibitions
        </h1>
        <p data-anim="rv" style={{
          fontFamily: T.s, fontSize: 17, fontWeight: 300, lineHeight: 1.85,
          color: T.gd, marginBottom: 80, maxWidth: 680,
        }}>
          MONOLITH presents one focused solo or curated group exhibition at a time, typically running for three to four months. Each show is accompanied by a curatorial essay published in the Journal.
        </p>

        {/* Featured — On View Now */}
        <section style={{ marginBottom: 96 }}>
          <Rule label="On View Now" right="Read press release →"
                onClick={() => navigate(EXHIBITION.pressRelease)} />
          <div data-anim="rv" className="split-1-1" style={{ alignItems: 'start' }}>
            <Photo
              src={SRCS.hero} ph="ph-dark"
              alt="Open Karoo landscape — the terrain that informs Ground Truth."
              filter="grayscale(0.35) contrast(1.1) brightness(0.8)"
              w={1800} h={1200}
              sizes="(max-width: 1023px) 100vw, 50vw"
              style={{ aspectRatio: '4/3', width: '100%' }}
            />
            <div>
              <div style={{
                fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
                textTransform: 'uppercase', color: T.accent, marginBottom: 16,
              }}>
                ● On View · Solo Exhibition
              </div>
              <h2 style={{
                fontFamily: T.d, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300,
                lineHeight: 0.95, letterSpacing: '-.02em',
                color: T.black, marginBottom: 14, fontOpticalSizing: 'auto',
              }}>
                {EXHIBITION.titleLead} <em style={{ fontStyle: 'italic', color: T.accent }}>{EXHIBITION.titleAccent}</em>
              </h2>
              <div style={{
                fontFamily: T.d, fontSize: 20, fontWeight: 300, fontStyle: 'italic',
                color: T.label, marginBottom: 8,
              }}>
                {ARTIST.name}
              </div>
              <div style={{
                fontFamily: T.m, fontSize: 10, letterSpacing: '.12em',
                textTransform: 'uppercase', color: T.label, marginBottom: 24,
              }}>
                {EXHIBITION.dates} · {EXHIBITION.venue}
              </div>
              <p style={{
                fontFamily: T.s, fontSize: 16, fontWeight: 300, lineHeight: 1.85,
                color: T.gd, marginBottom: 28, maxWidth: 560,
              }}>
                {EXHIBITION.statement[0]}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Button variant="inverse" onClick={() => navigate('/#works')}>
                  View exhibition →
                </Button>
                <Button variant="outline-dark" onClick={() => navigate(EXHIBITION.pressRelease)}>
                  Press release
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Past — chronological archive */}
        <section>
          <Rule label="Archive" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PAST_EXHIBITIONS.map((ex, i) => (
              <article key={ex.slug} data-anim="rv"
                className="split-200-1 past-card"
                style={{
                  padding: '40px 0',
                  borderTop: i === 0 ? `1px solid ${T.black}` : `1px solid ${T.border}`,
                  borderBottom: i === PAST_EXHIBITIONS.length - 1 ? `1px solid ${T.border}` : 'none',
                  alignItems: 'start',
                }}>
                <div style={{ overflow: 'hidden' }}>
                  <Photo
                    src={ex.image} ph={ex.imagePh}
                    alt={`${ex.title} — ${ex.artist}, ${ex.dates}.`}
                    filter="grayscale(1) contrast(1.05)"
                    w={800} h={600}
                    sizes="(max-width: 1023px) 100vw, 200px"
                    style={{ aspectRatio: '4/3', width: '100%' }}
                  />
                </div>
                <div style={{ maxWidth: 780 }}>
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'baseline',
                    marginBottom: 14,
                  }}>
                    <span style={{
                      fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
                      textTransform: 'uppercase', color: T.label,
                    }}>
                      {ex.kind}
                    </span>
                    <span style={{ color: T.border }}>·</span>
                    <span style={{
                      fontFamily: T.m, fontSize: 9, letterSpacing: '.1em',
                      textTransform: 'uppercase', color: T.label,
                    }}>
                      {ex.dates}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: T.d, fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 300,
                    lineHeight: 1, letterSpacing: '-.02em',
                    color: T.black, marginBottom: 8, fontOpticalSizing: 'auto',
                  }}>
                    {ex.title}
                  </h3>
                  <div style={{
                    fontFamily: T.d, fontSize: 17, fontWeight: 300, fontStyle: 'italic',
                    color: T.label, marginBottom: 18,
                  }}>
                    {ex.artist}
                  </div>
                  <p style={{
                    fontFamily: T.s, fontSize: 15, fontWeight: 300, lineHeight: 1.85,
                    color: T.gd, margin: 0,
                  }}>
                    {ex.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
