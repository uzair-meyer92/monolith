import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { T } from '../data.js';
import Button from '../lib/Button.jsx';
import { useFocusTrap } from '../lib/useFocusTrap.js';

const HOVER_DELAY_MS = 600;
const CYCLE_MS = 1800;
const FADE_MS  = 700;

export default function WorkDetail({ work, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [imgOk, setImgOk]         = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const imgRef        = useRef(null);
  const hoverTimer    = useRef(null);
  const cycleInterval = useRef(null);
  const panelRef      = useRef(null);

  useFocusTrap(panelRef, true);

  useEffect(() => {
    setImgOk(true); setImgLoaded(false); setShowDetail(false);
    return () => {
      if (hoverTimer.current)    clearTimeout(hoverTimer.current);
      if (cycleInterval.current) clearInterval(cycleInterval.current);
    };
  }, [work.id]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setImgLoaded(true);
  }, [work.id]);

  const startHover = () => {
    if (!work.detail) return;
    if (hoverTimer.current)    clearTimeout(hoverTimer.current);
    if (cycleInterval.current) clearInterval(cycleInterval.current);
    hoverTimer.current = setTimeout(() => {
      setShowDetail(true);
      cycleInterval.current = setInterval(() => setShowDetail((p) => !p), CYCLE_MS);
    }, HOVER_DELAY_MS);
  };
  const stopHover = () => {
    if (hoverTimer.current)    clearTimeout(hoverTimer.current);
    if (cycleInterval.current) clearInterval(cycleInterval.current);
    setShowDetail(false);
  };

  /* Tap-to-toggle detail for touch users — no hover available. */
  const toggleDetailTap = () => {
    if (!work.detail) return;
    if (cycleInterval.current) { clearInterval(cycleInterval.current); cycleInterval.current = null; }
    if (hoverTimer.current)    { clearTimeout(hoverTimer.current);    hoverTimer.current    = null; }
    setShowDetail((p) => !p);
  };

  const openEnquiry = () => {
    navigate(location.pathname + location.search, {
      state: { modalOpen: 'enquiry', id: work.id, slug: work.slug },
    });
  };

  const [aw, ah] = work.aspect.split('/').map(Number);
  const wrapStyle = { aspectRatio: work.aspect, maxWidth: `calc(80vh * ${aw} / ${ah})` };

  const primaryFilter = 'grayscale(0.15) contrast(1.08)';
  const detailFilter  = work.detailMono ? 'grayscale(1) contrast(1.1)' : 'contrast(1.05)';
  const toWebp = (s) => s && s.replace(/\.(jpe?g|png)$/i, '.webp');

  return (
    <div className="wd-backdrop" onClick={onClose} role="dialog" aria-modal="true"
         aria-label={`Work detail — ${work.title}`}>
      <div className="wd-panel" ref={panelRef} onClick={(e) => e.stopPropagation()}>
        <button className="wd-close" onClick={onClose} aria-label="Close work detail">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="wd-grid">
          <div
            className="wd-image-wrap"
            style={{ ...wrapStyle, position: 'relative' }}
            onMouseEnter={startHover}
            onMouseLeave={stopHover}>
            {imgOk ? (
              <>
                <picture>
                  <source srcSet={toWebp(work.src)} type="image/webp" />
                  <img
                    ref={imgRef}
                    src={work.src}
                    alt={`${work.title} (${work.year}) — ${work.metadata}`}
                    width={work.w} height={work.h}
                    loading="eager"
                    decoding="async"
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgOk(false)}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                      display: 'block',
                      filter: primaryFilter,
                      transition: `opacity ${FADE_MS}ms ease`,
                      opacity: imgLoaded ? (showDetail ? 0 : 1) : 0,
                    }}
                  />
                </picture>
                {work.detail && (
                  <>
                    <picture style={{
                      position: 'absolute', inset: 0,
                      pointerEvents: 'none',
                    }}>
                      <source srcSet={toWebp(work.detail)} type="image/webp" />
                      <img
                        src={work.detail}
                        alt={`Surface detail of ${work.title}.`}
                        loading="lazy" decoding="async"
                        aria-hidden={!showDetail}
                        style={{
                          position: 'absolute', inset: 0,
                          width: '100%', height: '100%',
                          objectFit: 'cover', objectPosition: 'center',
                          display: 'block',
                          filter: detailFilter,
                          transition: `opacity ${FADE_MS}ms ease`,
                          opacity: showDetail ? 1 : 0,
                          pointerEvents: 'none',
                        }}
                      />
                    </picture>
                    <div
                      aria-hidden={!showDetail}
                      style={{
                        position: 'absolute', left: 12, bottom: 12,
                        fontFamily: T.m, fontSize: 9, letterSpacing: '.18em',
                        textTransform: 'uppercase', color: T.paper,
                        background: 'rgba(10,10,10,0.75)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        padding: '7px 12px',
                        opacity: showDetail ? 1 : 0,
                        transition: `opacity ${FADE_MS}ms ease`,
                        pointerEvents: 'none',
                      }}>
                      Detail · {work.detailMono ? 'In black & white' : 'Colourized'} · Close up
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className={`ph ${work.ph}`} style={{ width: '100%', height: '100%' }} />
            )}
          </div>
          <div className="wd-text">
            <div style={{
              fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
              textTransform: 'uppercase', color: T.label, marginBottom: 24,
            }}>
              Work
            </div>
            <h1 style={{
              fontFamily: T.d, fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300,
              lineHeight: 1.0, letterSpacing: '-.02em', color: T.black,
              marginBottom: 28, fontOpticalSizing: 'auto',
            }}>
              {work.title}
            </h1>
            <div style={{
              fontFamily: T.m, fontSize: 10, letterSpacing: '.08em',
              textTransform: 'uppercase', color: T.label, lineHeight: 1.9,
              marginBottom: 32,
            }}>
              <div>{work.year}</div>
              <div>{work.metadata}</div>
              {work.series && <div>{work.series}</div>}
            </div>
            {(work.edition || work.availability) && (
              <div style={{
                borderTop: `1px solid ${T.border}`,
                borderBottom: `1px solid ${T.border}`,
                padding: '14px 0', marginBottom: 32,
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                {work.edition && (
                  <div style={{
                    fontFamily: T.m, fontSize: 10, letterSpacing: '.08em',
                    textTransform: 'uppercase', color: T.black,
                  }}>
                    {work.edition}
                  </div>
                )}
                {work.availability && (
                  <div style={{
                    fontFamily: T.m, fontSize: 10, letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: work.availability.startsWith('Sold') ? T.label : T.accent,
                  }}>
                    {work.availability}
                  </div>
                )}
              </div>
            )}
            <p style={{
              fontFamily: T.s, fontSize: 15, fontWeight: 300, lineHeight: 1.85,
              color: T.black, marginBottom: 16,
            }}>
              {work.desc}
            </p>
            {work.detail && (
              <button type="button"
                onClick={toggleDetailTap}
                style={{
                  fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
                  textTransform: 'uppercase', color: T.label,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0 0 14px', marginBottom: 18,
                  borderBottom: `1px solid ${T.border}`,
                  transition: 'color 400ms cubic-bezier(0.16,1,0.3,1), border-color 400ms cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = T.accent; e.currentTarget.style.borderBottomColor = T.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = T.label;  e.currentTarget.style.borderBottomColor = T.border; }}>
                {showDetail ? 'Hide surface detail' : 'View surface detail'}
              </button>
            )}
            <div>
              <Button variant="inverse" onClick={openEnquiry}>
                Enquire about this work →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
