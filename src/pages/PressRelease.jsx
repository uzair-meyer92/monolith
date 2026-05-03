import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { T, SRCS, EXHIBITION, ARTIST, CONTACT, PRESS_RELEASE } from '../data.js';
import { useReveal } from '../lib/useReveal.js';
import { useSEO } from '../lib/SEO.jsx';

const CV_SECTIONS = [
  ['Education',            'education'],
  ['Selected Exhibitions', 'exhibitions'],
  ['Selected Collections', 'collections'],
  ['Residencies & Awards', 'residencies'],
];

export default function PressRelease() {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  useReveal(ref);

  useSEO({
    title: 'Press Release · Ground Truth',
    description: 'Press release for Ground Truth — a solo exhibition by Thandiwe Mokoena at MONOLITH, Cape Town.',
    path: '/press-release',
  });

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  /* Press release uses a calm paper background with a faint Karoo image
     fixed in place — for performance we drop fixed attachment on touch. */
  const isCoarse = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  return (
    <div
      ref={ref}
      style={{
        paddingTop: 56, minHeight: '100vh',
        backgroundColor: T.paper,
        backgroundImage: `linear-gradient(rgba(244,241,236,0.94), rgba(244,241,236,0.94)), url(${SRCS.hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isCoarse ? 'scroll' : 'fixed',
      }}>
      <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} className="link-mono"
          style={{ marginBottom: 48, display: 'inline-block' }}>
          ← Back
        </button>

        <div data-anim="rv" style={{
          fontFamily: T.m, fontSize: 9, letterSpacing: '.2em',
          textTransform: 'uppercase', color: T.label, marginBottom: 16,
        }}>
          Press Release
        </div>
        <h1 data-anim="rv" style={{
          fontFamily: T.d, fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 300,
          lineHeight: 0.95, letterSpacing: '-.02em',
          color: T.black, marginBottom: 16, fontOpticalSizing: 'auto',
        }}>
          {EXHIBITION.titleLead} <em style={{ fontStyle: 'italic', color: T.accent }}>{EXHIBITION.titleAccent}</em>
        </h1>
        <div data-anim="rv" style={{
          fontFamily: T.d, fontSize: 18, fontWeight: 300, fontStyle: 'italic',
          color: T.label, marginBottom: 8,
        }}>
          {ARTIST.name} — Solo Exhibition
        </div>
        <div data-anim="rv" style={{
          fontFamily: T.m, fontSize: 10, letterSpacing: '.1em',
          textTransform: 'uppercase', color: T.label, marginBottom: 64,
        }}>
          {EXHIBITION.dates}
        </div>

        <section style={{ marginBottom: 64 }}>
          <div data-anim="rv" style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.label,
            borderTop: `1px solid ${T.black}`, paddingTop: 16, marginBottom: 24,
          }}>
            Exhibition Statement
          </div>
          {PRESS_RELEASE.statement.map((para, i) => (
            <p key={i} data-anim="rv" style={{
              fontFamily: T.s,
              fontSize: i === 0 ? 18 : 16,
              fontWeight: 300, lineHeight: 1.85,
              color: i === 0 ? T.black : T.gd,
              marginBottom: 24, maxWidth: 780,
            }}>
              {para}
            </p>
          ))}
        </section>

        <section style={{ marginBottom: 64 }}>
          <div data-anim="rv" style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.label,
            borderTop: `1px solid ${T.black}`, paddingTop: 16, marginBottom: 24,
          }}>
            Works in the Exhibition
          </div>
          <div data-anim="rv"
            style={{
              fontFamily: T.s, fontSize: 14, fontWeight: 300,
              color: T.black, lineHeight: 1.6,
            }}>
            <div className="pr-works-header">
              <div className="pr-h">Title</div>
              <div className="pr-h">Year</div>
              <div className="pr-h">Materials</div>
              <div className="pr-h">Dimensions</div>
            </div>
            {PRESS_RELEASE.works.map((w, i) => (
              <div key={i} className="pr-works-row">
                <div className="pr-c"><span className="pr-mob-label">Title — </span>{w.title}</div>
                <div className="pr-c pr-c-mute"><span className="pr-mob-label">Year — </span>{w.year}</div>
                <div className="pr-c pr-c-mute"><span className="pr-mob-label">Materials — </span>{w.materials}</div>
                <div className="pr-c pr-c-mute pr-c-mono"><span className="pr-mob-label">Dimensions — </span>{w.dim}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 64 }}>
          <div data-anim="rv" style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.label,
            borderTop: `1px solid ${T.black}`, paddingTop: 16, marginBottom: 24,
          }}>
            About the Artist
          </div>
          <p data-anim="rv" style={{
            fontFamily: T.s, fontSize: 16, fontWeight: 300, lineHeight: 1.85,
            color: T.gd, maxWidth: 780, marginBottom: 32,
          }}>
            {PRESS_RELEASE.artistPara}
          </p>

          {ARTIST.cv && (
            <div data-anim="rv" style={{
              borderTop: `1px solid ${T.border}`,
              paddingTop: 24, maxWidth: 880,
              display: 'flex', flexDirection: 'column', gap: 22,
            }}>
              {CV_SECTIONS
                .map(([heading, key]) => [heading, ARTIST.cv[key]])
                .filter(([, items]) => items && items.length)
                .map(([heading, items]) => (
                  <div key={heading} style={{
                    display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24,
                    alignItems: 'start',
                  }}>
                    <div style={{
                      fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
                      textTransform: 'uppercase', color: T.label, paddingTop: 2,
                    }}>
                      {heading}
                    </div>
                    <ul style={{
                      listStyle: 'none', padding: 0, margin: 0,
                      display: 'flex', flexDirection: 'column', gap: 6,
                    }}>
                      {items.map((line, i) => (
                        <li key={i} style={{
                          fontFamily: T.s, fontSize: 14, fontWeight: 300,
                          lineHeight: 1.7, color: T.gd,
                        }}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </section>

        <section style={{ marginBottom: 96 }}>
          <div data-anim="rv" style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.label,
            borderTop: `1px solid ${T.black}`, paddingTop: 16, marginBottom: 24,
          }}>
            Gallery Information
          </div>
          <div data-anim="rv" style={{
            fontFamily: T.d, fontSize: 18, fontWeight: 300,
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: T.black, marginBottom: 12, fontOpticalSizing: 'none',
          }}>
            Monolith
          </div>
          <div style={{ fontFamily: T.s, fontSize: 14, fontWeight: 300, lineHeight: 1.85, color: T.gd, marginBottom: 4 }}>
            {CONTACT.address}
          </div>
          <div style={{ fontFamily: T.s, fontSize: 14, fontWeight: 300, lineHeight: 1.85, color: T.gd, marginBottom: 4 }}>
            Tuesday – Friday: 10:00 – 18:00 · Saturday: 10:00 – 16:00
          </div>
          <div style={{ fontFamily: T.s, fontSize: 14, fontWeight: 300, lineHeight: 1.85, color: T.gd, marginBottom: 24 }}>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="link-underline" style={{ color: 'inherit', textDecoration: 'none' }}>{CONTACT.phone}</a>
            {' · '}
            <a href={`mailto:${CONTACT.email}`} className="link-underline" style={{ color: T.black, textDecoration: 'none' }}>
              {CONTACT.email}
            </a>
          </div>
          <div style={{
            fontFamily: T.s, fontSize: 13, fontStyle: 'italic', fontWeight: 300,
            color: T.label, maxWidth: 680,
          }}>
            {PRESS_RELEASE.press}
          </div>
        </section>
      </div>
    </div>
  );
}
