import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, EXHIBITION } from '../data.js';
import Rule from './Rule.jsx';
import { useReveal } from '../lib/useReveal.js';

export default function Programme() {
  const navigate = useNavigate();
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="programme" ref={ref} className="page-pad-x" style={{
      background: T.paper, paddingBottom: 96,
    }}>
      <div className="shell">
        <Rule label="Programme" right="Read press release →"
              onClick={() => navigate(EXHIBITION.pressRelease)} />
        <div className="split-200-1">
          <div data-anim="rv">
            <div style={{
              fontFamily: T.d, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300,
              lineHeight: 1, letterSpacing: '-.02em',
              color: T.black, marginBottom: 16, fontOpticalSizing: 'auto',
            }}>
              Events <em style={{ fontStyle: 'italic', color: T.accent }}>&amp;</em> talks
            </div>
            <div style={{
              fontFamily: T.s, fontSize: 14, fontWeight: 300, lineHeight: 1.85,
              color: T.gd, maxWidth: 280,
            }}>
              All events take place at the gallery. Walkthroughs and talks have limited capacity — please write to the gallery to reserve a seat.
            </div>
          </div>
          <div>
            {EXHIBITION.programme.map((p, i) => (
              <div key={i} data-anim="rv" style={{
                display: 'grid', gridTemplateColumns: '1fr', gap: 8,
                paddingTop: 28, paddingBottom: 28,
                borderTop: i === 0 ? `1px solid ${T.black}` : `1px solid ${T.border}`,
              }}>
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'baseline',
                }}>
                  <div style={{
                    fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
                    textTransform: 'uppercase', color: T.label,
                  }}>
                    {p.kind}
                  </div>
                  <div style={{
                    fontFamily: T.m, fontSize: 9, letterSpacing: '.08em',
                    textTransform: 'uppercase', color: T.label,
                  }}>
                    {p.date} · {p.time}
                  </div>
                </div>
                <div style={{
                  fontFamily: T.s, fontSize: 15, fontWeight: 300, lineHeight: 1.75,
                  color: T.black, maxWidth: 680,
                }}>
                  {p.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
