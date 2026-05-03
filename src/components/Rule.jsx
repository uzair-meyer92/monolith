import { T } from '../data.js';

/* Editorial top-rule + label, with optional right action. */
export default function Rule({ label, right, dark, onClick }) {
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
        <button type="button" onClick={onClick} className="link-mono"
          style={{ color: dark ? T.labelDark : T.label }}>
          {right}
        </button>
      )}
    </div>
  );
}
