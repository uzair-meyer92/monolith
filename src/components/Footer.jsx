import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, CONTACT } from '../data.js';
import SocialRow, { ContactRow } from '../lib/icons.jsx';

const DARK_BORDER = '#2A2825';
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
  const [done, setDone] = useState(false);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!em.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim())) return;
    setDone(true);
    setEm('');
  };

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
            <div style={{
              fontFamily: T.s, fontSize: 12, fontWeight: 300,
              fontStyle: 'italic', color: T.accent,
            }}>
              Thank you — please confirm via the email we just sent.
            </div>
          ) : (
            <form onSubmit={onSubscribe} style={{ display: 'flex' }} noValidate>
              <label htmlFor="footer-email" className="visually-hidden" style={{
                position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)',
              }}>
                Email address
              </label>
              <input
                id="footer-email" type="email" placeholder="Email address"
                value={em} onChange={(e) => setEm(e.target.value)} required
                style={{
                  flex: 1, background: 'transparent',
                  border: `1px solid ${DARK_BORDER}`, borderRight: 'none',
                  borderRadius: 0, padding: '9px 12px',
                  fontFamily: T.s, fontSize: 12, color: T.paper, outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-primary"
                style={{ padding: '9px 14px', fontSize: 8 }}>
                Subscribe
              </button>
            </form>
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
