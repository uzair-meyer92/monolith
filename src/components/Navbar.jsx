import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { T } from '../data.js';

/* Only / has the dark hero block — every other route is opaque from the top. */
const HOME_PATHS = new Set(['/']);
const LINKS = [
  { label: 'Home',       path: '/'           },
  { label: 'Exhibition', path: '/exhibition' },
  { label: 'Journal',    path: '/journal'    },
  { label: 'Visit',      path: '/visit'      },
  { label: 'About',      path: '/about'      },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen,   setMenuOpen]   = useState(false);
  const [transparent, setTransparent] = useState(() => HOME_PATHS.has(location.pathname));

  /* Throttled scroll listener via rAF — flips navbar from transparent
     to opaque once #hero-block is fully out of view. */
  useEffect(() => {
    const onHome = HOME_PATHS.has(location.pathname);
    if (!onHome) { setTransparent(false); return; }

    let ticking = false;
    const update = () => {
      const heroBlock = document.getElementById('hero-block');
      if (!heroBlock) { setTransparent(true); return; }
      const rect = heroBlock.getBoundingClientRect();
      setTransparent(rect.bottom > 0 && rect.top < window.innerHeight);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname, location.key]);

  const fgMain      = transparent ? T.paper      : T.black;
  const fgSecondary = transparent ? T.labelDark  : T.label;
  const navBg       = transparent ? 'transparent'                : 'rgba(244,241,236,0.78)';
  const navBorder   = transparent ? '1px solid transparent'      : '1px solid rgba(10,10,10,0.08)';
  const navBlur     = transparent ? 'none'                       : 'blur(14px) saturate(120%)';
  const textShadow  = transparent ? '0 1px 2px rgba(0,0,0,0.35)' : 'none';

  const openEnquiry = () => {
    navigate(location.pathname + location.search, { state: { modalOpen: 'enquiry', id: null } });
  };

  /* Mobile menu lifecycle — close on route change, lock scroll while open. */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: navBg, borderBottom: navBorder,
      backdropFilter: navBlur, WebkitBackdropFilter: navBlur,
      transition: 'background-color 400ms cubic-bezier(0.16,1,0.3,1), border-color 400ms cubic-bezier(0.16,1,0.3,1), backdrop-filter 400ms cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div className="nav-inner" style={{
        maxWidth: 1440, margin: '0 auto',
        padding: '0 var(--shell-pad, 56px)', height: 'var(--nav-h, 56px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => navigate('/')}
          aria-label="Monolith — return to home"
          aria-current={location.pathname === '/' ? 'page' : undefined}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = fgMain)}
          style={{
            fontFamily: T.d, fontSize: 14, fontWeight: 300,
            letterSpacing: '.22em', textTransform: 'uppercase',
            color: fgMain, textShadow,
            cursor: 'pointer', fontOpticalSizing: 'none',
            transition: 'color 400ms cubic-bezier(0.16,1,0.3,1), text-shadow 400ms cubic-bezier(0.16,1,0.3,1)',
          }}>
          Monolith
        </button>

        <div className="nav-links" style={{ display: 'flex', gap: 32 }}>
          {LINKS.map((l) => (
            <DesktopLink key={l.label} link={l}
              fgMain={fgMain} fgSecondary={fgSecondary} textShadow={textShadow} />
          ))}
        </div>

        <button onClick={openEnquiry} className="nav-enquire btn btn-outline-light"
          style={{
            color: fgSecondary, borderColor: fgSecondary, textShadow,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = T.paper; e.currentTarget.style.background = T.accent; e.currentTarget.style.borderColor = T.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = fgSecondary; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = fgSecondary; }}>
          Enquire
        </button>

        <button
          className="nav-hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          style={{ color: fgMain, textShadow }}>
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && createPortal(<MobileMenu close={() => setMenuOpen(false)} openEnquiry={openEnquiry} />, document.body)}
    </nav>
  );
}

function DesktopLink({ link, fgMain, fgSecondary, textShadow }) {
  const [hov, setHov] = useState(false);
  return (
    <NavLink
      to={link.path}
      end={link.path === '/'}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={({ isActive }) => ({
        fontFamily: T.s, fontSize: 10, fontWeight: 400,
        letterSpacing: '.12em', textTransform: 'uppercase',
        textDecoration: 'none',
        color: isActive ? fgMain : hov ? T.accent : fgSecondary,
        textShadow,
        borderBottom: `1px solid ${isActive ? T.accent : 'transparent'}`,
        paddingBottom: 3,
        transition: 'color 400ms cubic-bezier(0.16,1,0.3,1), border-color 400ms cubic-bezier(0.16,1,0.3,1)',
      })}>
      {link.label}
    </NavLink>
  );
}

function MobileMenu({ close, openEnquiry }) {
  const ref = useRef(null);
  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" ref={ref}>
      <div className="mobile-menu-header">
        <button onClick={() => { close(); }} aria-label="Monolith — return to home"
          style={{
            fontFamily: T.d, fontSize: 14, fontWeight: 300,
            letterSpacing: '.22em', textTransform: 'uppercase',
            color: T.black, fontOpticalSizing: 'none',
          }}>
          Monolith
        </button>
        <button className="mobile-menu-close" aria-label="Close menu" onClick={close}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="6"  y1="6"  x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="6"  x2="6"  y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="mobile-menu-links" aria-label="Primary">
        {LINKS.map((l) => (
          <NavLink
            key={l.label}
            to={l.path}
            end={l.path === '/'}
            onClick={close}
            style={({ isActive }) => ({
              fontFamily: T.d, fontSize: 'clamp(36px, 9vw, 56px)',
              fontWeight: 300, lineHeight: 1.05, letterSpacing: '-.02em',
              color: isActive ? T.accent : T.black,
              fontOpticalSizing: 'auto', padding: '6px 0',
              textDecoration: 'none', display: 'block',
            })}>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="mobile-menu-footer">
        <button
          onClick={() => { close(); openEnquiry(); }}
          className="btn btn-inverse"
          style={{ width: '100%' }}>
          Enquire
        </button>
      </div>
    </div>
  );
}
