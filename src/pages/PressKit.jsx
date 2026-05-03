import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { T, SRCS, ARTIST, EXHIBITION, CONTACT } from '../data.js';
import Photo from '../lib/Photo.jsx';
import Button from '../lib/Button.jsx';
import { useReveal } from '../lib/useReveal.js';
import { useSEO } from '../lib/SEO.jsx';

const FACTSHEET = [
  ['Gallery',           'MONOLITH'],
  ['Founded',           '2023'],
  ['Founder',           'Bongani Sithole'],
  ['Address',           '14 Sir Lowry Road, Woodstock, Cape Town'],
  ['Current exhibition', `${EXHIBITION.titleLead} ${EXHIBITION.titleAccent}`],
  ['Artist',            ARTIST.name],
  ['Dates',             EXHIBITION.dates],
  ['Venue',             EXHIBITION.venue],
  ['Press contact',     CONTACT.email],
  ['Telephone',         CONTACT.phone],
];

const IMAGE_SETS = [
  {
    label: 'Exhibition',
    items: [
      { src: SRCS.hero,     caption: 'Karoo landscape — reference image',          alt: 'Open Karoo landscape under low light.' },
      { src: SRCS.install,  caption: 'Installation view, main hall',               alt: 'Sculpture on pedestal, main hall.' },
      { src: SRCS.archway,  caption: 'Visitors at MONOLITH, 2023',                 alt: 'Visitors moving through the gallery archway.' },
    ],
  },
  {
    label: 'Selected works',
    items: [
      { src: SRCS.work1,    caption: "Ground study (i), 2025",                     alt: "Ground study (i), 2025." },
      { src: SRCS.work2,    caption: "Ground study (ii), 2025",                    alt: "Ground study (ii), 2025." },
      { src: SRCS.work3,    caption: "Structural fragment, 2025",                  alt: "Structural fragment, 2025." },
    ],
  },
  {
    label: 'Artist',
    items: [
      { src: SRCS.portrait, caption: `${ARTIST.name} — studio portrait`,           alt: `Studio portrait of ${ARTIST.name}.` },
    ],
  },
  {
    label: 'Gallery',
    items: [
      { src: SRCS.exterior, caption: 'Gallery exterior — Sir Lowry Road',           alt: 'Exterior of MONOLITH gallery.' },
      { src: SRCS.entrance, caption: 'Main entrance',                              alt: 'Main entrance of the gallery.' },
      { src: SRCS.visit,    caption: 'Main hall — converted industrial bay',        alt: 'Interior of the gallery, main hall.' },
    ],
  },
];

/* The wordmark SVG — same one used in the favicon/manifest. */
const LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 200'><rect width='600' height='200' fill='%230A0A0A'/><text x='300' y='128' text-anchor='middle' font-family='Georgia,serif' font-size='84' font-weight='300' fill='%23F4F1EC' letter-spacing='12'>MONOLITH</text></svg>`;

export default function PressKit() {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  useReveal(ref);

  useSEO({
    title: 'Press Kit',
    description: 'Press release, high-resolution images, factsheet, and logos for MONOLITH and the current exhibition.',
    path: '/press-kit',
  });

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  const fileName = (src) => src.split('/').pop();

  return (
    <div ref={ref} style={{ background: T.paper, paddingTop: 56, minHeight: '100vh' }}>
      <div className="page-pad shell">
        {/* Heading */}
        <div data-anim="rv" style={{
          fontFamily: T.m, fontSize: 9, letterSpacing: '.2em',
          textTransform: 'uppercase', color: T.label, marginBottom: 16,
        }}>
          For Press
        </div>
        <h1 data-anim="rv" style={{
          fontFamily: T.d, fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 300,
          lineHeight: 0.95, letterSpacing: '-.02em',
          color: T.black, marginBottom: 24, fontOpticalSizing: 'auto',
        }}>
          Press <em style={{ fontStyle: 'italic', color: T.accent }}>Kit</em>
        </h1>
        <p data-anim="rv" style={{
          fontFamily: T.s, fontSize: 17, fontWeight: 300, lineHeight: 1.85,
          color: T.gd, marginBottom: 64, maxWidth: 720,
        }}>
          Materials below are released for editorial coverage of the current exhibition. Image use is welcomed; please credit the artist and the gallery, and write to <a href={`mailto:${CONTACT.email}`} className="link-underline" style={{ color: T.black, textDecoration: 'none' }}>{CONTACT.email}</a> if you need additional crops, higher resolutions, or interview access.
        </p>

        {/* Press release CTA */}
        <section data-anim="rv" className="split-200-1" style={{
          paddingTop: 40, paddingBottom: 40,
          borderTop: `1px solid ${T.black}`,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
            textTransform: 'uppercase', color: T.label, paddingTop: 4,
          }}>
            Press Release
          </div>
          <div>
            <p style={{
              fontFamily: T.s, fontSize: 16, fontWeight: 300, lineHeight: 1.85,
              color: T.gd, marginBottom: 24, maxWidth: 720,
            }}>
              Read the full press release for {EXHIBITION.titleLead} {EXHIBITION.titleAccent} — exhibition statement, full list of works, and artist CV.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Button variant="inverse" onClick={() => navigate('/press-release')}>
                Read press release →
              </Button>
            </div>
          </div>
        </section>

        {/* Factsheet */}
        <section data-anim="rv" className="split-200-1" style={{
          paddingTop: 40, paddingBottom: 40,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
            textTransform: 'uppercase', color: T.label, paddingTop: 4,
          }}>
            Factsheet
          </div>
          <div style={{ maxWidth: 720 }}>
            {FACTSHEET.map(([k, v], i) => (
              <div key={k} style={{
                display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24,
                padding: '12px 0',
                borderBottom: i === FACTSHEET.length - 1 ? 'none' : `1px dashed ${T.border}`,
                fontFamily: T.s, fontSize: 14, fontWeight: 300,
                color: T.black,
              }}>
                <span style={{
                  fontFamily: T.m, fontSize: 10, letterSpacing: '.1em',
                  textTransform: 'uppercase', color: T.label,
                }}>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Image sets */}
        {IMAGE_SETS.map((set) => (
          <section key={set.label} data-anim="rv" style={{
            paddingTop: 56, paddingBottom: 32,
            borderBottom: `1px solid ${T.border}`,
          }}>
            <div className="split-200-1">
              <div style={{
                fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
                textTransform: 'uppercase', color: T.label, paddingTop: 4,
              }}>
                {set.label}
              </div>
              <div className="works-grid" style={{ gap: '32px 24px' }}>
                {set.items.map((item) => (
                  <figure key={item.src} className="past-card" style={{ margin: 0, overflow: 'hidden' }}>
                    <Photo
                      src={item.src} ph="ph-mid"
                      alt={item.alt}
                      filter="grayscale(0.2) contrast(1.05)"
                      w={1200} h={900}
                      sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      style={{ aspectRatio: '4/3', width: '100%', marginBottom: 12 }}
                    />
                    <figcaption style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      gap: 12, flexWrap: 'wrap',
                    }}>
                      <span style={{
                        fontFamily: T.m, fontSize: 9, letterSpacing: '.12em',
                        textTransform: 'uppercase', color: T.label,
                      }}>
                        {item.caption}
                      </span>
                      <a
                        href={item.src} download={fileName(item.src)}
                        className="link-mono" style={{ color: T.black }}>
                        Download ↓
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Logo */}
        <section data-anim="rv" className="split-200-1" style={{
          paddingTop: 56, paddingBottom: 56,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
            textTransform: 'uppercase', color: T.label, paddingTop: 4,
          }}>
            Wordmark
          </div>
          <div style={{ maxWidth: 720 }}>
            <div style={{
              background: T.black, padding: '48px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16,
            }}>
              <img src={LOGO_SVG} alt="MONOLITH wordmark"
                width={420} height={120}
                style={{ width: '100%', maxWidth: 420, height: 'auto', display: 'block' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: T.m, fontSize: 9, letterSpacing: '.12em',
                textTransform: 'uppercase', color: T.label,
              }}>
                MONOLITH wordmark · paper on black
              </span>
              <a href={LOGO_SVG} download="monolith-wordmark.svg"
                 className="link-mono" style={{ color: T.black }}>
                Download SVG ↓
              </a>
            </div>
          </div>
        </section>

        {/* Press contact */}
        <section data-anim="rv" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.label, marginBottom: 16,
          }}>
            Press Contact
          </div>
          <div style={{
            fontFamily: T.d, fontSize: 'clamp(24px, 2.6vw, 32px)',
            fontStyle: 'italic', fontWeight: 300, color: T.black,
            marginBottom: 18, fontOpticalSizing: 'auto',
          }}>
            Bongani Sithole, Director
          </div>
          <div style={{ fontFamily: T.s, fontSize: 16, fontWeight: 300, lineHeight: 1.9, color: T.black }}>
            <a href={`mailto:${CONTACT.email}`} className="link-underline"
               style={{ color: 'inherit', textDecoration: 'none' }}>
              {CONTACT.email}
            </a>
          </div>
          <div style={{ fontFamily: T.s, fontSize: 16, fontWeight: 300, lineHeight: 1.9, color: T.black }}>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="link-underline"
               style={{ color: 'inherit', textDecoration: 'none' }}>
              {CONTACT.phone}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
