import { useRef } from 'react';
import { useReveal } from './useReveal.js';
import { T } from '../data.js';

/* Reusable editorial section header — top rule, eyebrow label, optional
   right-aligned action. Replaces the per-component handrolled headers. */
export function SectionHeader({ label, right, onClick, dark = false }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      borderTop: `1px solid ${dark ? '#2A2825' : T.border}`,
      paddingTop: 14, marginBottom: 40,
    }}>
      <div style={{
        fontFamily: T.s, fontSize: 9, fontWeight: 500,
        letterSpacing: '.16em', textTransform: 'uppercase',
        color: dark ? T.labelDark : T.label,
      }}>
        {label}
      </div>
      {right && (
        <button type="button" className="link-mono" onClick={onClick}
          style={{ color: dark ? T.labelDark : T.label }}>
          {right}
        </button>
      )}
    </div>
  );
}

/* <Section> — paper-toned vertically padded slab with reveal hook.
   Children typically render inside .shell themselves. */
export default function Section({
  id, label, right, onAction, dark = false,
  paddingTop = 56, paddingBottom = 96, scrollMargin = 56, children,
}) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section
      id={id} ref={ref} className="page-pad-x"
      style={{
        background: dark ? T.black : T.paper,
        paddingTop, paddingBottom,
        scrollMarginTop: scrollMargin,
      }}>
      <div className="shell">
        {label && <SectionHeader label={label} right={right} onClick={onAction} dark={dark} />}
        {children}
      </div>
    </section>
  );
}
