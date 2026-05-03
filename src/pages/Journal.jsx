import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { T, JOURNAL_ARTICLES } from '../data.js';
import { useReveal } from '../lib/useReveal.js';
import { useSEO } from '../lib/SEO.jsx';

export default function Journal() {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);
  useReveal(ref);

  useSEO({
    title: 'Journal',
    description: "Curatorial essays, conversations, and editorial writing from MONOLITH gallery, Cape Town.",
    path: '/journal',
  });

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  const articles = JOURNAL_ARTICLES.filter((a) => Array.isArray(a.body) && a.body.length > 0);
  const featured  = articles[0];
  const secondary = articles.slice(1);

  const open = (a) => navigate(`/journal/${a.slug || a.id}`);

  return (
    <div ref={ref} style={{ background: T.paper, paddingTop: 56, minHeight: '100vh' }}>
      <div className="page-pad shell">
        <h1 data-anim="rv" style={{
          fontFamily: T.d, fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 300,
          lineHeight: 0.95, letterSpacing: '-.02em',
          color: T.black, marginBottom: 80, fontOpticalSizing: 'auto',
        }}>
          Journal
        </h1>

        {featured && (
          <button
            type="button" data-anim="rv" className="split-200-1"
            onClick={() => open(featured)}
            style={{
              display: 'grid', width: '100%', textAlign: 'left',
              background: 'none', border: 'none', padding: 0,
              marginBottom: secondary.length ? 80 : 0,
              paddingTop: 32, paddingBottom: secondary.length ? 80 : 32,
              borderTop: `1px solid ${T.black}`,
              borderBottom: secondary.length ? `1px solid ${T.border}` : 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { const h = e.currentTarget.querySelector('h2'); if (h) h.style.color = T.accent; }}
            onMouseLeave={(e) => { const h = e.currentTarget.querySelector('h2'); if (h) h.style.color = T.black; }}>
            <div>
              <div style={{ fontFamily: T.m, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: T.label, marginBottom: 8 }}>{featured.type}</div>
              <div style={{ fontFamily: T.m, fontSize: 9, letterSpacing: '.1em',  textTransform: 'uppercase', color: T.label, marginBottom: 8 }}>{featured.date}</div>
              <div style={{ fontFamily: T.m, fontSize: 9, letterSpacing: '.1em',  textTransform: 'uppercase', color: T.label }}>{featured.author}</div>
            </div>
            <div style={{ maxWidth: 680 }}>
              <h2 style={{
                fontFamily: T.d, fontSize: 'clamp(32px, 3.6vw, 52px)', fontWeight: 300,
                lineHeight: 1.05, letterSpacing: '-.02em',
                color: T.black, marginBottom: 16,
                transition: 'color 400ms cubic-bezier(0.16,1,0.3,1)',
                fontOpticalSizing: 'auto',
              }}>
                {featured.title}
              </h2>
              <div style={{
                fontFamily: T.d, fontSize: 18, fontWeight: 300, fontStyle: 'italic',
                color: T.label, marginBottom: 32,
              }}>
                {featured.subtitle}
              </div>
              <div style={{
                fontFamily: T.s, fontSize: 9, fontWeight: 500,
                letterSpacing: '.1em', textTransform: 'uppercase', color: T.black,
              }}>
                Read essay →
              </div>
            </div>
          </button>
        )}

        {secondary.length > 0 && (
          <div className="journal-secondary">
            {secondary.map((a) => (
              <button key={a.id} type="button" data-anim="rv"
                onClick={() => open(a)}
                style={{
                  display: 'block', textAlign: 'left', width: '100%',
                  background: 'none', border: 'none', padding: 0,
                  cursor: 'pointer',
                  borderTop: `1px solid ${T.border}`, paddingTop: 24,
                }}
                onMouseEnter={(e) => { const h = e.currentTarget.querySelector('h3'); if (h) h.style.color = T.accent; }}
                onMouseLeave={(e) => { const h = e.currentTarget.querySelector('h3'); if (h) h.style.color = T.black; }}>
                <div style={{
                  fontFamily: T.m, fontSize: 8, letterSpacing: '.14em',
                  textTransform: 'uppercase', color: T.label, marginBottom: 10,
                }}>
                  {`${a.type} · ${a.date}`}
                </div>
                <h3 style={{
                  fontFamily: T.d, fontSize: 22, fontWeight: 300, lineHeight: 1.1,
                  letterSpacing: '-.01em', color: T.black, marginBottom: 8,
                  transition: 'color 400ms cubic-bezier(0.16,1,0.3,1)',
                  fontOpticalSizing: 'auto',
                }}>
                  {a.title}
                </h3>
                <div style={{ fontFamily: T.s, fontSize: 12, fontWeight: 300, color: T.label }}>
                  {a.author}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
