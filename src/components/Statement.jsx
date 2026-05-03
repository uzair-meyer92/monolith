import { useRef } from 'react';
import { T, ARTIST, EXHIBITION } from '../data.js';
import { useReveal } from '../lib/useReveal.js';
import Rule from './Rule.jsx';

/* When `noTitle` is set (used by /exhibition where the masthead already
   shows the title + meta), the left column is omitted and paragraphs
   align to the editorial right-column position. */
export default function Statement({ noTitle = false }) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="statement" ref={ref} className="page-pad-x" style={{
      background: T.paper, paddingTop: 96, paddingBottom: 40, scrollMarginTop: 56,
    }}>
      <div className="shell">
        <Rule label="Statement" />
        <div className="split-1-2">
          {noTitle ? (
            <div aria-hidden="true" />
          ) : (
            <div data-anim="rv">
              <div style={{
                fontFamily: T.d, fontSize: 'clamp(32px, 3.4vw, 48px)', fontWeight: 300,
                lineHeight: 1, letterSpacing: '-.02em', color: T.black,
                marginBottom: 16, fontOpticalSizing: 'auto',
              }}>
                {EXHIBITION.titleLead} <em style={{ fontStyle: 'italic', color: T.accent }}>{EXHIBITION.titleAccent}</em>
              </div>
              <div style={{
                fontFamily: T.m, fontSize: 9, letterSpacing: '.1em',
                textTransform: 'uppercase', color: T.label, lineHeight: 1.9,
              }}>
                {ARTIST.name}<br />
                {EXHIBITION.dates}<br />
                {EXHIBITION.venue}
              </div>
            </div>
          )}
          <div>
            {EXHIBITION.statement.map((para, i) => (
              <p key={i} data-anim="rv" style={{
                fontFamily: T.s, fontSize: i === 0 ? 18 : 15, fontWeight: 300,
                lineHeight: 1.85, color: i === 0 ? T.black : T.gd,
                marginBottom: 24, maxWidth: 680,
              }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
