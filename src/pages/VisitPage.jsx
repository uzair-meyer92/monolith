import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { T, ENQ_EMAIL, VISIT_FAQ, CONTACT } from '../data.js';
import Button from '../lib/Button.jsx';
import { useReveal } from '../lib/useReveal.js';
import { useSEO } from '../lib/SEO.jsx';

const ROWS = [
  { label: 'Address',     body: '14 Sir Lowry Road\nWoodstock, Cape Town\nSouth Africa' },
  { label: 'Hours',       body: 'Tuesday – Friday   10:00 – 18:00\nSaturday   10:00 – 16:00\nSunday & Monday   Closed' },
  { label: 'Admission',   rich: 'admission' },
  { label: 'Bookings',    rich: 'bookings' },
  { label: 'Getting Here', body: 'Limited street parking on Sir Lowry Road. Secure parking is available at the Old Biscuit Mill, a five-minute walk from the gallery. The MyCiti bus stops at Woodstock Main, and Woodstock train station is a fifteen-minute walk.' },
  { label: 'Accessibility', body: 'The gallery is on the ground floor with a step-free entrance and one accessible bathroom. Quiet visits outside opening hours can be arranged on request — please write to the gallery in advance.' },
];

const ADMISSION = [
  ['Adults',                                  'R 120'],
  ['Students & seniors (with ID)',            'R 60'],
  ['Children under 12',                       'R 30'],
  ['Children under 6',                        'Free'],
  ['SA citizens — Wednesdays  16:00 – 18:00', 'Free'],
];

/* Approx coordinates for 14 Sir Lowry Road, Woodstock, Cape Town. */
const LAT  = -33.9290;
const LNG  =  18.4519;
const ZOOM = 0.006;
const MAP_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${LNG - ZOOM},${LAT - ZOOM/2},${LNG + ZOOM},${LAT + ZOOM/2}&layer=mapnik&marker=${LAT},${LNG}`;
const MAP_LINK = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LNG}#map=18/${LAT}/${LNG}`;
const DIRECTIONS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}&destination_place_id=Monolith+Gallery`;

export default function VisitPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  useReveal(ref);

  useSEO({
    title: 'Visit',
    description: 'Visit MONOLITH at 14 Sir Lowry Road, Woodstock, Cape Town. Open Tuesday–Saturday.',
    path: '/visit',
  });

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  const openGroupBooking = () => {
    navigate(location.pathname + location.search, { state: { modalOpen: 'group-visit' } });
  };

  return (
    <div ref={ref} style={{ background: T.paper, paddingTop: 56, minHeight: '100vh' }}>
      <div className="page-pad shell">
        {/* Heading */}
        <div data-anim="rv" style={{
          fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
          textTransform: 'uppercase', color: T.label, marginBottom: 16,
        }}>
          Plan Your Visit
        </div>
        <h1 data-anim="rv" style={{
          fontFamily: T.d, fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 300,
          lineHeight: 0.95, letterSpacing: '-.02em',
          color: T.black, marginBottom: 24, fontOpticalSizing: 'auto',
        }}>
          Visit <em style={{ fontStyle: 'italic', color: T.accent }}>Monolith</em>
        </h1>
        <p data-anim="rv" style={{
          fontFamily: T.s, fontSize: 17, fontWeight: 300, lineHeight: 1.85,
          color: T.gd, marginBottom: 64, maxWidth: 680,
        }}>
          The gallery occupies a converted industrial bay on Sir Lowry Road in Woodstock, Cape Town. Walk-ins are welcome during opening hours; bookings are required for larger groups and school visits.
        </p>

        {/* Map */}
        <section data-anim="rv" style={{ marginBottom: 80 }}>
          <div className="map-frame">
            <iframe
              title="Map of Monolith Gallery, 14 Sir Lowry Road, Woodstock, Cape Town"
              loading="lazy"
              src={MAP_SRC}
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-pin" aria-hidden="true">
              <span className="map-pin-dot" />
            </div>
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
            alignItems: 'baseline', gap: 16, marginTop: 18,
          }}>
            <div style={{
              fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
              textTransform: 'uppercase', color: T.label,
            }}>
              14 Sir Lowry Road · Woodstock · Cape Town
            </div>
            <div style={{ display: 'flex', gap: 22 }}>
              <a href={DIRECTIONS_LINK} target="_blank" rel="noopener noreferrer"
                 className="link-mono" style={{ color: T.black }}>
                Get directions →
              </a>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer"
                 className="link-mono">
                Open in OpenStreetMap →
              </a>
            </div>
          </div>
        </section>

        {/* Visit detail rows */}
        <div style={{ borderTop: `1px solid ${T.black}` }}>
          {ROWS.map((r) => (
            <div key={r.label} data-anim="rv" className="split-200-1"
              style={{ padding: '32px 0', borderBottom: `1px solid ${T.border}` }}>
              <div style={{
                fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
                textTransform: 'uppercase', color: T.label, paddingTop: 4,
              }}>
                {r.label}
              </div>
              {r.rich === 'admission' ? (
                <div style={{ maxWidth: 680 }}>
                  {ADMISSION.map(([who, fee]) => (
                    <div key={who} style={{
                      display: 'flex', justifyContent: 'space-between', gap: 24,
                      padding: '8px 0',
                      borderBottom: `1px dashed ${T.border}`,
                      fontFamily: T.s, fontSize: 14, fontWeight: 300,
                      color: T.black,
                    }}>
                      <span>{who}</span>
                      <span style={{
                        fontFamily: T.m, fontSize: 11, letterSpacing: '.06em',
                        color: fee === 'Free' ? T.accent : T.black,
                      }}>{fee}</span>
                    </div>
                  ))}
                </div>
              ) : r.rich === 'bookings' ? (
                <div style={{ maxWidth: 680 }}>
                  <p style={{
                    fontFamily: T.s, fontSize: 15, fontWeight: 300, lineHeight: 1.85,
                    color: T.black, marginBottom: 18,
                  }}>
                    Walk-ins are welcome for individuals and pairs. Bookings are required for groups of eight or more, and for school and university visits. Please write to the gallery at least two weeks in advance.
                  </p>
                  <Button magnetic variant="inverse" onClick={openGroupBooking}>
                    Book a group visit →
                  </Button>
                </div>
              ) : (
                <div style={{
                  fontFamily: T.s, fontSize: 15, fontWeight: 300, lineHeight: 1.85,
                  color: T.black, whiteSpace: 'pre-line', maxWidth: 680,
                }}>
                  {r.body}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section data-anim="rv" style={{ paddingTop: 80 }}>
          <div data-anim="rv" style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.label,
            borderTop: `1px solid ${T.border}`, paddingTop: 14, marginBottom: 32,
          }}>
            Frequently Asked
          </div>
          <div className="split-1-2" style={{ alignItems: 'start' }}>
            <h2 data-anim="rv" style={{
              fontFamily: T.d, fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 300,
              lineHeight: 1, letterSpacing: '-.02em',
              color: T.black, fontOpticalSizing: 'auto', margin: 0,
            }}>
              Before you <em style={{ fontStyle: 'italic', color: T.accent }}>arrive</em>
            </h2>
            <FAQList items={VISIT_FAQ} />
          </div>
        </section>

        {/* Contact line */}
        <div data-anim="rv" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <div style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.label, marginBottom: 12,
          }}>
            Contact
          </div>
          <div style={{
            fontFamily: T.s, fontSize: 15, fontWeight: 300, lineHeight: 1.9,
            color: T.black,
          }}>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="link-underline"
               style={{ color: 'inherit', textDecoration: 'none' }}>
              {CONTACT.phone}
            </a>
          </div>
          <a href={`mailto:${ENQ_EMAIL}`} className="link-underline"
            style={{
              fontFamily: T.s, fontSize: 15, fontWeight: 300,
              color: T.black, textDecoration: 'none',
            }}>
            {ENQ_EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}

function FAQList({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div data-anim="rv">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const triggerId = `faq-trigger-${i}`;
        return (
          <div key={i} className="faq-item">
            <button
              id={triggerId}
              type="button"
              className="faq-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}>
              <span>{item.q}</span>
              <span className="faq-icon" aria-hidden="true">+</span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="faq-panel"
              data-open={isOpen}>
              <div className="faq-answer">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
