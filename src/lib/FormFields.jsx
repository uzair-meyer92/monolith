import { useState, useRef, useEffect } from 'react';
import { T } from '../data.js';

/* Two custom form fields used by the EnquiryModal — both share the
   site's typographic styling (Inter for body, DM Mono for captions,
   border-bottom underline that mirrors the other inputs in the form).
   - Select: triggers a paper-coloured dropdown panel on click; options
     hover terracotta with a tinted background.
   - DateField: triggers a mini-calendar in the same paper panel with
     prev/next month navigation. Past days, Sundays, and Mondays are
     disabled. Hover lights cells terracotta; the selected day is a
     filled terracotta tile. */

const CARET = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CAL_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="6" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" />
    <line x1="9"  y1="3" x2="9"  y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="3" x2="15" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ACCENT_TINT = 'rgba(140,58,43,0.10)';
const PANEL_SHADOW = '0 8px 24px rgba(10,10,10,0.08)';

/* ── Select ─────────────────────────────────────────────────────── */

export function Select({ value, onChange, options, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', textAlign: 'left',
          background: 'transparent', border: 'none',
          borderBottom: `1px solid ${open ? T.black : T.border}`,
          padding: '8px 24px 8px 0',
          fontFamily: T.s, fontSize: 14, fontWeight: 300,
          color: T.black, cursor: 'pointer',
          transition: 'border-color 200ms ease',
          outline: 'none', position: 'relative',
        }}
      >
        {value}
        <span style={{
          position: 'absolute', right: 0, top: '50%',
          transform: `translateY(-50%) ${open ? 'rotate(180deg)' : 'rotate(0)'}`,
          color: T.label, display: 'inline-flex',
          transition: 'transform 200ms ease',
        }}>
          {CARET}
        </span>
      </button>

      {open && (
        <div role="listbox"
          style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
            background: T.paper, border: `1px solid ${T.border}`,
            padding: '4px 0', zIndex: 100, boxShadow: PANEL_SHADOW,
          }}>
          {options.map((o) => {
            const selected = o === value;
            return (
              <button key={o} type="button" role="option" aria-selected={selected}
                onClick={() => { onChange(o); setOpen(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'transparent', border: 'none',
                  padding: '10px 16px',
                  fontFamily: T.s, fontSize: 13,
                  fontWeight: selected ? 500 : 300,
                  color: selected ? T.black : T.gd,
                  cursor: 'pointer',
                  transition: 'background 200ms ease, color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = ACCENT_TINT;
                  e.currentTarget.style.color = T.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = selected ? T.black : T.gd;
                }}
              >
                {o}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── DateField ──────────────────────────────────────────────────── */

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['S','M','T','W','T','F','S'];

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function fromYmd(s) {
  if (!s) return null;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return new Date(+m[1], +m[2] - 1, +m[3]);
}
function pretty(s) {
  const d = fromYmd(s);
  if (!d) return '';
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

/* closedDays: 0=Sunday, 1=Monday — those cells are disabled and struck through. */
export function DateField({ value, onChange, placeholder = 'Select a date', closedDays = [0, 1] }) {
  const [open, setOpen] = useState(false);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const initial = fromYmd(value) || today;
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const goPrev = () => setView((v) => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  const goNext = () => setView((v) => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

  const selectDay = (d) => {
    const date = new Date(view.year, view.month, d);
    onChange(ymd(date));
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button type="button" aria-haspopup="dialog" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', textAlign: 'left',
          background: 'transparent', border: 'none',
          borderBottom: `1px solid ${open ? T.black : T.border}`,
          padding: '8px 24px 8px 0',
          fontFamily: T.s, fontSize: 14, fontWeight: 300,
          color: value ? T.black : T.label, cursor: 'pointer',
          transition: 'border-color 200ms ease',
          outline: 'none', position: 'relative',
        }}
      >
        {value ? pretty(value) : placeholder}
        <span style={{
          position: 'absolute', right: 0, top: '50%',
          transform: 'translateY(-50%)',
          color: T.label, display: 'inline-flex',
        }}>
          {CAL_ICON}
        </span>
      </button>

      {open && (
        <div role="dialog" aria-label="Choose a date"
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0,
            width: 280, background: T.paper,
            border: `1px solid ${T.border}`, padding: 16,
            zIndex: 100, boxShadow: PANEL_SHADOW,
          }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 12,
          }}>
            <CalNavButton onClick={goPrev} label="Previous month" arrow="‹" />
            <div style={{
              fontFamily: T.d, fontSize: 14, fontWeight: 300,
              color: T.black, fontOpticalSizing: 'auto',
            }}>
              {MONTHS[view.month]} {view.year}
            </div>
            <CalNavButton onClick={goNext} label="Next month" arrow="›" />
          </div>

          {/* Weekday header */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2,
            marginBottom: 4,
          }}>
            {WEEKDAYS.map((w, i) => (
              <div key={i} style={{
                fontFamily: T.m, fontSize: 9, letterSpacing: '.1em',
                textAlign: 'center', color: T.label, padding: '6px 0',
              }}>{w}</div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2,
          }}>
            {cells.map((d, i) => {
              if (!d) return <span key={`b${i}`} />;
              const date = new Date(view.year, view.month, d);
              const dow = date.getDay();
              const isPast     = date < today;
              const isClosed   = closedDays.includes(dow);
              const isSelected = value === ymd(date);
              const isToday    = ymd(date) === ymd(today);
              const disabled   = isPast || isClosed;

              return (
                <CalDayCell
                  key={i}
                  day={d}
                  disabled={disabled}
                  selected={isSelected}
                  today={isToday}
                  closedNotPast={isClosed && !isPast}
                  onClick={() => !disabled && selectDay(d)}
                />
              );
            })}
          </div>

          <div style={{
            fontFamily: T.m, fontSize: 8, letterSpacing: '.14em',
            textTransform: 'uppercase', color: T.label,
            marginTop: 12, paddingTop: 12,
            borderTop: `1px solid ${T.border}`,
            textAlign: 'center',
          }}>
            Gallery closed Sunday & Monday
          </div>
        </div>
      )}
    </div>
  );
}

function CalNavButton({ onClick, label, arrow }) {
  return (
    <button type="button" onClick={onClick} aria-label={label}
      style={{
        background: 'transparent', border: 'none',
        width: 32, height: 32, cursor: 'pointer',
        color: T.label, fontFamily: T.s, fontSize: 18, lineHeight: 1,
        transition: 'color 200ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
      onMouseLeave={(e) => (e.currentTarget.style.color = T.label)}
    >
      {arrow}
    </button>
  );
}

function CalDayCell({ day, disabled, selected, today, closedNotPast, onClick }) {
  const baseColor = selected ? T.paper : disabled ? T.border : T.black;
  return (
    <button type="button" disabled={disabled} onClick={onClick}
      aria-pressed={selected}
      style={{
        width: '100%', aspectRatio: '1',
        background: selected ? T.accent : 'transparent',
        border: 'none',
        fontFamily: T.s, fontSize: 12, fontWeight: selected ? 500 : 300,
        color: baseColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        textDecoration: closedNotPast ? 'line-through' : 'none',
        transition: 'background 200ms ease, color 200ms ease',
        position: 'relative',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (disabled || selected) return;
        e.currentTarget.style.background = ACCENT_TINT;
        e.currentTarget.style.color = T.accent;
      }}
      onMouseLeave={(e) => {
        if (disabled || selected) return;
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = baseColor;
      }}
    >
      {day}
      {today && !selected && (
        <span aria-hidden="true" style={{
          position: 'absolute', bottom: 4, left: '50%',
          width: 3, height: 3, borderRadius: '50%',
          background: T.accent, transform: 'translateX(-50%)',
        }} />
      )}
    </button>
  );
}
