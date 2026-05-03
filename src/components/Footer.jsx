import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, CONTACT } from '../data.js';
import SocialRow, { ContactRow } from '../lib/icons.jsx';

const DARK_BORDER = '#2A2825';

const NEWSLETTER_ID  = import.meta.env.VITE_FORMSPREE_NEWSLETTER || '';
const NEWSLETTER_URL = NEWSLETTER_ID ? `https://formspree.io/f/${NEWSLETTER_ID}` : null;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAV_LINKS = [
  { label: 'Home',       path: '/'           },
  { label: 'Exhibition', path: '/exhibition' },
  { label: 'Journal',    path: '/journal'    },
  { label: 'Visit',      path: '/visit'      },
  { label: 'About',      path: '/about'      },
];

const LEGAL_LINKS = [
  { label: 'Press Kit', path: '/press-kit' },
  { label: 'Privacy',   path: '/privacy'   },
  { label: 'Terms',     path: '/terms'     },
];

export default function Footer() {
  const navigate = useNavigate();
  const [em, setEm] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus]     = useState('idle');   // idle | sending | ok | error
  const [errorMsg, setErrorMsg] = useState('');

  const onSubscribe = async (e) => {
    e.preventDefault();
    if (!em.trim() || !EMAIL_RE.test(em.trim()) || status === 'sending') return;

    /* Honeypot — silently succeed for bots */
    if (hp) { setStatus('ok'); setEm(''); return; }

    /* No Formspree configured — at least clear and acknowledge */
    if (!NEWSLETTER_URL) {
      setStatus('ok'); setEm(''); return;
    }

    setStatus('sending');
    setErrorMsg('');
    try {
      const r = await fetch(NEWSLETTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: em, _subject: 'Newsletter signup' }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || j.errors?.[0]?.message || 'Could not subscribe.');
      }
      setStatus('ok');
      setEm('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Could not subscribe.');
    }
  };

  const done = status === 'ok';

  return (
    <footer style={{ background: T.black, borderTop: `1px solid ${DARK_BORDER}` }}>
      <div className="footer-grid page-pad-x" style={{
        maxWidth: 1440, margin: '0 auto', paddingTop: 64, paddingBottom: 64,
      }}>
        <div>
          <div style={{
            fontFamily: T.d, fontSize: 20, fontWeight: 300,
            letterSpacing: '.2em', textTransform: 'uppercase',
            color: T.paper, marginBottom: 18, fontOpticalSizing: 'none',
          }}>
            Monolith
          </div>
          <ContactRow address={CONTACT.address} phone={CONTACT.phone} email={CONTACT.email} />
        </div>

        <div>
          <div style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.labelDark, marginBottom: 14,
          }}>
            Navigate
          </div>
          {NAV_LINKS.map((l) => (
            <button key={l.label} type="button" onClick={() => navigate(l.path)}
              style={{
                display: 'block',
                fontFamily: T.s, fontSize: 12, fontWeight: 300,
                color: T.labelDark, lineHeight: 2.15, textAlign: 'left',
                transition: 'color 400ms cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.labelDark)}>
              {l.label}
            </button>
          ))}
        </div>

        <div>
          <div style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.labelDark, marginBottom: 14,
          }}>
            Hours
          </div>
          {[
            ['Tue–Fri', '10:00–18:00'],
            ['Saturday', '10:00–16:00'],
            ['Sun–Mon', 'Closed'],
          ].map(([d, t]) => (
            <div key={d} style={{
              display: 'flex', justifyContent: 'space-between',
              fontFamily: T.s, fontSize: 12, fontWeight: 300,
              color: T.labelDark, padding: '5px 0',
              borderBottom: `1px solid ${DARK_BORDER}`,
            }}>
              <span>{d}</span><span>{t}</span>
            </div>
          ))}
        </div>

        <div>
          <div style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.labelDark, marginBottom: 10,
          }}>
            Newsletter
          </div>
          <div style={{
            fontFamily: T.s, fontSize: 12, fontWeight: 300,
            color: T.labelDark, lineHeight: 1.7, marginBottom: 14,
          }}>
            Exhibition openings and gallery news.
          </div>
          {done ? (
            <div role="status" aria-live="polite" style={{
              fontFamily: T.s, fontSize: 12, fontWeight: 300,
              fontStyle: 'italic', color: T.accent,
            }}>
              Thank you. You're on the list.
            </div>
          ) : (
            <>
              <form onSubmit={onSubscribe} style={{ display: 'flex' }} noValidate>
                <label htmlFor="footer-email" style={{
                  position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)',
                }}>
                  Email address
                </label>
                {/* Honeypot */}
                <input type="text" tabIndex={-1} autoComplete="off" name="_gotcha"
                  value={hp} onChange={(e) => setHp(e.target.value)} aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <input
                  id="footer-email" type="email" placeholder="Email address"
                  value={em} onChange={(e) => setEm(e.target.value)}
                  autoComplete="email" required
                  disabled={status === 'sending'}
                  style={{
                    flex: 1, background: 'transparent',
                    border: `1px solid ${DARK_BORDER}`, borderRight: 'none',
                    borderRadius: 0, padding: '9px 12px',
                    fontFamily: T.s, fontSize: 12, color: T.paper, outline: 'none',
                  }}
                />
                <button type="submit" className="btn btn-primary"
                  disabled={status === 'sending'}
                  aria-disabled={status === 'sending'}
                  style={{ padding: '9px 14px', fontSize: 8 }}>
                  {status === 'sending' ? 'Sending…' : 'Subscribe'}
                </button>
              </form>
              {status === 'error' && (
                <div role="alert" style={{
                  marginTop: 10, fontFamily: T.s, fontSize: 11, fontWeight: 300,
                  color: T.accent, lineHeight: 1.5,
                }}>
                  {errorMsg}
                </div>
              )}
            </>
          )}
        </div>

        <div>
          <div style={{
            fontFamily: T.m, fontSize: 9, letterSpacing: '.16em',
            textTransform: 'uppercase', color: T.labelDark, marginBottom: 14,
          }}>
            Follow
          </div>
          <SocialRow />
        </div>
      </div>

      <div className="page-pad-x" style={{
        maxWidth: 1440, margin: '0 auto',
        paddingTop: 18, paddingBottom: 26,
        borderTop: `1px solid ${DARK_BORDER}`,
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
        textTransform: 'uppercase', color: T.labelDark,
      }}>
        <span>© {new Date().getFullYear()} Monolith Gallery · Cape Town</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
          {LEGAL_LINKS.map((l) => (
            <button key={l.label} type="button" onClick={() => navigate(l.path)}
              style={{
                fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit',
                textTransform: 'inherit', color: T.labelDark, cursor: 'pointer',
                transition: 'color 400ms cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.labelDark)}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
