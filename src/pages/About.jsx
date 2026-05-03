import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { T, CURATOR_FOREWORD } from '../data.js';
import { useReveal } from '../lib/useReveal.js';
import { useSEO } from '../lib/SEO.jsx';

export default function About() {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  useReveal(ref);

  useSEO({
    title: 'About',
    description: 'MONOLITH is a contemporary art gallery in Woodstock, Cape Town, dedicated to large-scale sculpture and material-led practice.',
    path: '/about',
  });

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  return (
    <div ref={ref} style={{ background: T.paper, paddingTop: 56, minHeight: '100vh' }}>
      <div className="page-pad shell">
        <div className="split-1-2">
          <div data-anim="rv" style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.label,
            borderTop: `1px solid ${T.border}`, paddingTop: 16,
          }}>
            About
          </div>
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 24 }}>
            <p data-anim="rv" style={{
              fontFamily: T.s, fontSize: 16, fontWeight: 300, lineHeight: 1.85,
              color: T.black, marginBottom: 24, maxWidth: 680,
            }}>
              MONOLITH is a contemporary art gallery in Woodstock, Cape Town, dedicated to large-scale sculpture, installation, and material-led practice from artists working across Africa and its diaspora. The gallery presents one focused solo exhibition at a time — typically running for three to four months — alongside an ongoing programme of curatorial essays and conversations published in the Journal.
            </p>
            <p data-anim="rv" style={{
              fontFamily: T.s, fontSize: 15, fontWeight: 300, lineHeight: 1.85,
              color: T.gd, marginBottom: 24, maxWidth: 680,
            }}>
              MONOLITH was founded in 2023 by curator Bongani Sithole, formerly of the Norval Foundation, with a single editorial principle: the work should be the loudest thing in the room. The space at 14 Sir Lowry Road occupies a converted industrial bay with a single 11-metre wall and a polished concrete floor.
            </p>
            <p data-anim="rv" style={{
              fontFamily: T.s, fontSize: 15, fontWeight: 300, lineHeight: 1.85,
              color: T.gd, marginBottom: 0, maxWidth: 680,
            }}>
              For press, sales, and visitor enquiries, contact <a href="mailto:enquiries@monolith.gallery" className="link-underline" style={{ color: T.black, textDecoration: 'none' }}>enquiries@monolith.gallery</a>.
            </p>
          </div>
        </div>

        <section style={{ marginTop: 96 }}>
          <div className="split-1-2">
            <div data-anim="rv" style={{
              fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
              textTransform: 'uppercase', color: T.label,
              borderTop: `1px solid ${T.border}`, paddingTop: 16,
            }}>
              Curator's Foreword
            </div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 24 }}>
              {CURATOR_FOREWORD.paragraphs.map((p, i) => (
                <p key={i} data-anim="rv" style={{
                  fontFamily: T.s,
                  fontSize: i === 0 ? 18 : 15,
                  fontWeight: 300, lineHeight: 1.85,
                  color: i === 0 ? T.black : T.gd,
                  marginBottom: 24, maxWidth: 680,
                }}>
                  {p}
                </p>
              ))}
              <div data-anim="rv" style={{
                fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
                textTransform: 'uppercase', color: T.label, marginTop: 16,
              }}>
                — {CURATOR_FOREWORD.attribution}
              </div>
            </div>
          </div>
        </section>

        {/* Archive link — past exhibitions live on /exhibition */}
        <section style={{ marginTop: 96 }}>
          <div className="split-1-2">
            <div data-anim="rv" style={{
              fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
              textTransform: 'uppercase', color: T.label,
              borderTop: `1px solid ${T.border}`, paddingTop: 16,
            }}>
              Archive
            </div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 24 }}>
              <p data-anim="rv" style={{
                fontFamily: T.s, fontSize: 16, fontWeight: 300, lineHeight: 1.85,
                color: T.gd, marginBottom: 24, maxWidth: 680,
              }}>
                A chronological record of every exhibition presented at MONOLITH since the gallery opened in 2023, including the current show.
              </p>
              <button data-anim="rv" type="button" onClick={() => navigate('/exhibition')}
                className="link-mono" style={{ color: T.black }}>
                View past exhibitions →
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
