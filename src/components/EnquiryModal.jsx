import { useRef, useState } from 'react';
import { T, ENQ_EMAIL } from '../data.js';
import { Select, DateField } from '../lib/FormFields.jsx';
import Button from '../lib/Button.jsx';
import { useFocusTrap } from '../lib/useFocusTrap.js';

const FORMSPREE_ID  = import.meta.env.VITE_FORMSPREE_ENQUIRY || '';
const FORMSPREE_URL = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null;

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
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus]     = useState('idle');   // idle | sending | ok | error
  const [errorMsg, setErrorMsg] = useState('');

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
      ? `Enquiry: ${work.title} (${work.year})`
      : 'General enquiry';

  /* Mailto fallback — used when Formspree env var is missing or the
     server returns an error, so the visitor never gets stranded. */
  const mailtoBody = isGroupVisit
    ? `Name: ${name}\n\nEmail: ${email}\n\nVisit type: ${visitType}\nGroup size: ${groupSize}\nPreferred date: ${preferredDate}\n\nMessage: ${msg}`
    : `Name: ${name}\n\nEmail: ${email}\n${work ? `\nWork: ${work.title}, ${work.year}\n` : ''}\nMessage: ${msg}`;
  const mailtoHref = `mailto:${ENQ_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || status === 'sending') return;

    /* Bots auto-fill every input; humans don't see this one. */
    if (honeypot) { setStatus('ok'); setTimeout(onClose, 1200); return; }

    /* No Formspree configured — fall back to mailto so submission still works. */
    if (!FORMSPREE_URL) {
      window.location.href = mailtoHref;
      setTimeout(onClose, 200);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    const payload = {
      name, email, message: msg, _subject: subject,
      ...(work && { work: `${work.title}, ${work.year}`, work_id: work.id }),
      ...(isGroupVisit && {
        visit_type: visitType,
        group_size: groupSize,
        preferred_date: preferredDate,
      }),
    };

    try {
      const r = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || j.errors?.[0]?.message || 'Send failed.');
      }
      setStatus('ok');
      setTimeout(onClose, 1600);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Send failed.');
    }
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

        {status === 'ok' ? (
          <div role="status" aria-live="polite" style={{
            padding: '32px 0',
            fontFamily: T.d, fontSize: 22, fontWeight: 300, fontStyle: 'italic',
            color: T.accent, lineHeight: 1.5,
          }}>
            Thank you — your message has been sent. We'll be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot — invisible to humans, irresistible to bots */}
            <input
              type="text" tabIndex={-1} autoComplete="off"
              value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
              aria-hidden="true" name="_gotcha"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />

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
              type="submit"
              variant="inverse"
              aria-disabled={!canSubmit || status === 'sending'}
              style={{ marginTop: 8, background: canSubmit ? T.accent : undefined, borderColor: canSubmit ? T.accent : undefined }}>
              {status === 'sending'
                ? 'Sending…'
                : isGroupVisit ? 'Send booking request' : 'Send enquiry'}
            </Button>

            {status === 'error' && (
              <div role="alert" style={{
                marginTop: 16, fontFamily: T.s, fontSize: 13, fontWeight: 300,
                color: T.accent, lineHeight: 1.6,
              }}>
                {errorMsg} You can also email{' '}
                <a href={mailtoHref} style={{ color: T.accent, fontWeight: 500 }}>{ENQ_EMAIL}</a>.
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
