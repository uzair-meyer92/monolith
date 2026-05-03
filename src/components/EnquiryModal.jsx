import { useRef, useState } from 'react';
import { T, ENQ_EMAIL } from '../data.js';
import { Select, DateField } from '../lib/FormFields.jsx';
import Button from '../lib/Button.jsx';
import { useFocusTrap } from '../lib/useFocusTrap.js';

function Field({ label, required, htmlFor, children }) {
  return (
    <div className="em-field" style={{ marginBottom: 20 }}>
      <label htmlFor={htmlFor} style={{
        display: 'block', fontFamily: T.m, fontSize: 9,
        letterSpacing: '.14em', textTransform: 'uppercase',
        color: T.label, marginBottom: 8,
      }}>
        {label}{required && <span style={{ color: T.accent }}> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function EnquiryModal({ work, kind = 'enquiry', onClose }) {
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg]     = useState('');
  const [visitType,     setVisitType]     = useState('Group');
  const [groupSize,     setGroupSize]     = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const panelRef = useRef(null);
  useFocusTrap(panelRef, true);

  const isGroupVisit = kind === 'group-visit';
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const baseValid = name.trim().length > 0 && emailRe.test(email.trim());
  const canSubmit = isGroupVisit
    ? baseValid && groupSize.trim().length > 0 && preferredDate.trim().length > 0
    : baseValid;

  const subject = isGroupVisit
    ? `Group visit enquiry — ${visitType}`
    : work
      ? `Enquiry: ${work.title}`
      : 'General enquiry';

  const body = isGroupVisit
    ? `Name: ${name}\n\nEmail: ${email}\n\nVisit type: ${visitType}\nGroup size: ${groupSize}\nPreferred date: ${preferredDate}\n\nMessage: ${msg}`
    : `Name: ${name}\n\nEmail: ${email}\n\nMessage: ${msg}`;

  const mailto = canSubmit
    ? `mailto:${ENQ_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : null;

  const handleSendClick = (e) => {
    if (!canSubmit) { e.preventDefault(); return; }
    setTimeout(onClose, 150);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    window.location.href = mailto;
    setTimeout(onClose, 150);
  };

  const eyebrow = isGroupVisit ? 'Group Visit' : 'Enquiry';
  const heading = isGroupVisit
    ? 'Book a group visit'
    : (work ? `Enquire — ${work.title}` : 'Enquire');

  return (
    <div className="em-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={heading}>
      <div className="em-panel" ref={panelRef} onClick={(e) => e.stopPropagation()}>
        <button className="em-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div style={{
          fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
          textTransform: 'uppercase', color: T.label, marginBottom: 16,
        }}>
          {eyebrow}
        </div>

        <h2 style={{
          fontFamily: T.d, fontSize: 'clamp(22px, 2.8vw, 32px)', fontWeight: 300,
          lineHeight: 1.1, letterSpacing: '-.02em',
          color: T.black, marginBottom: 16, fontOpticalSizing: 'auto',
        }}>
          {heading}
        </h2>

        {isGroupVisit ? (
          <p style={{
            fontFamily: T.s, fontSize: 13, fontWeight: 300,
            color: T.label, lineHeight: 1.6, marginBottom: 28,
          }}>
            Bookings are required for groups of eight or more, and for school and university visits. Please write at least two weeks in advance — we will confirm by return email.
          </p>
        ) : work ? (
          <div style={{
            fontFamily: T.m, fontSize: 10, letterSpacing: '.08em',
            textTransform: 'uppercase', color: T.label, lineHeight: 1.8,
            marginBottom: 28,
          }}>
            <div>{work.title}, {work.year}</div>
            <div>{work.metadata}</div>
          </div>
        ) : (
          <p style={{
            fontFamily: T.s, fontSize: 13, fontWeight: 300,
            color: T.label, lineHeight: 1.6, marginBottom: 28,
          }}>
            Send a message to the gallery.
          </p>
        )}

        <form onSubmit={handleFormSubmit} noValidate>
          <Field label="Name" required htmlFor="enq-name">
            <input id="enq-name" type="text" autoComplete="name"
                   value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field label="Email" required htmlFor="enq-email">
            <input id="enq-email" type="email" autoComplete="email"
                   value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>

          {isGroupVisit && (
            <>
              <Field label="Visit type">
                <Select
                  value={visitType}
                  onChange={setVisitType}
                  options={['Group', 'School', 'University', 'Curatorial / press']}
                  ariaLabel="Visit type"
                />
              </Field>
              <Field label="Group size" required htmlFor="enq-group-size">
                <input id="enq-group-size" type="text" value={groupSize}
                       onChange={(e) => setGroupSize(e.target.value)}
                       placeholder="e.g. 12 visitors" required />
              </Field>
              <Field label="Preferred date" required>
                <DateField value={preferredDate} onChange={setPreferredDate} placeholder="Choose a date" />
              </Field>
            </>
          )}

          <Field label="Message" htmlFor="enq-msg">
            <textarea id="enq-msg" value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} />
          </Field>

          <Button
            as="a"
            href={mailto || '#'}
            onClick={handleSendClick}
            aria-disabled={!canSubmit}
            variant="inverse"
            magnetic={canSubmit}
            style={{ marginTop: 8, background: canSubmit ? T.accent : undefined }}>
            {isGroupVisit ? 'Send booking request' : 'Send enquiry'}
          </Button>
        </form>
      </div>
    </div>
  );
}
