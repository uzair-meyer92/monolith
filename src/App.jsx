import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar       from './components/Navbar.jsx';
import Footer       from './components/Footer.jsx';
import WorkDetail   from './components/WorkDetail.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';
import CustomCursor from './lib/CustomCursor.jsx';
import ErrorBoundary from './lib/ErrorBoundary.jsx';
import RouteProgress from './lib/RouteProgress.jsx';

import Home       from './pages/Home.jsx';
import Exhibition from './pages/Exhibition.jsx';
import NotFound   from './pages/NotFound.jsx';

import { WORKS } from './data.js';

const KNOWN_ROUTES = new Set([
  '/', '/exhibition', '/journal', '/visit', '/about',
  '/press-release', '/press-kit', '/privacy', '/terms',
]);
const isKnownRoute = (pathname) =>
  KNOWN_ROUTES.has(pathname) || pathname.startsWith('/journal/');

/* Code-split the secondary routes to keep the home bundle slim. */
const Journal        = lazy(() => import('./pages/Journal.jsx'));
const JournalArticle = lazy(() => import('./pages/JournalArticle.jsx'));
const VisitPage      = lazy(() => import('./pages/VisitPage.jsx'));
const About          = lazy(() => import('./pages/About.jsx'));
const PressRelease   = lazy(() => import('./pages/PressRelease.jsx'));
const PressKit       = lazy(() => import('./pages/PressKit.jsx'));
const Privacy        = lazy(() => import('./pages/Privacy.jsx'));
const Terms          = lazy(() => import('./pages/Terms.jsx'));

const FADE = {
  initial:    { opacity: 0, y: 8 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -8 },
  transition: {
    opacity: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
    y:       { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
    exit:    { duration: 0.35, ease: [0.7, 0, 0.84, 0] },
  },
};

function PageMotion({ children }) {
  const reduced = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      initial={reduced ? false : FADE.initial}
      animate={FADE.animate}
      exit={reduced ? { opacity: 0 } : FADE.exit}
      transition={reduced ? { duration: 0 } : FADE.transition}
      style={{ backgroundColor: '#F4F1EC' }}>
      {children}
    </motion.div>
  );
}

function PageFallback() {
  return <div style={{ minHeight: '100vh', background: '#F4F1EC' }} aria-hidden="true" />;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  /* Modal state lives on location.state. */
  const modalOpen = location.state?.modalOpen;
  const modalId   = location.state?.id ?? null;

  const work        = modalOpen === 'work'    ? WORKS.find((w) => w.id === modalId) || null : null;
  const enquiryOpen = modalOpen === 'enquiry' || modalOpen === 'group-visit';
  const enquiryKind = modalOpen === 'group-visit' ? 'group-visit' : 'enquiry';
  const enquiryWork = enquiryOpen && modalId ? WORKS.find((w) => w.id === modalId) || null : null;

  /* Don't escape the site if the modal was opened on a deep link. */
  const closeModal = () => {
    if (window.history.state && window.history.state.idx > 0) navigate(-1);
    else navigate(location.pathname + location.search, { replace: true, state: {} });
  };

  /* Body scroll lock that preserves scroll position. Plain `overflow:hidden`
     on body causes some browsers to reset scroll-y to 0 when the modal opens
     — fixing the body in place via `position:fixed` + negative top keeps the
     page exactly where it was. On close, restore styles and scroll back. */
  useEffect(() => {
    if (!work && !enquiryOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top:      body.style.top,
      left:     body.style.left,
      right:    body.style.right,
      width:    body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top      = `-${scrollY}px`;
    body.style.left     = '0';
    body.style.right    = '0';
    body.style.width    = '100%';
    body.style.overflow = 'hidden';

    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);

    return () => {
      body.style.position = prev.position;
      body.style.top      = prev.top;
      body.style.left     = prev.left;
      body.style.right    = prev.right;
      body.style.width    = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work, enquiryOpen]);

  /* Refresh ScrollTrigger after page swaps so triggers reflect the new layout. */
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => clearTimeout(id);
  }, [location.pathname]);

  /* 404 renders standalone — no navbar, footer, cursor, grain, or progress.
     Reads as a quiet typographic dead-end. */
  if (!isKnownRoute(location.pathname)) {
    return (
      <ErrorBoundary>
        <NotFound />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="grain" />
      <RouteProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"                   element={<PageMotion><Home /></PageMotion>} />
              <Route path="/exhibition"         element={<PageMotion><Exhibition /></PageMotion>} />
              <Route path="/journal"            element={<PageMotion><Journal /></PageMotion>} />
              <Route path="/journal/:id"        element={<PageMotion><JournalArticle /></PageMotion>} />
              <Route path="/visit"              element={<PageMotion><VisitPage /></PageMotion>} />
              <Route path="/about"              element={<PageMotion><About /></PageMotion>} />
              <Route path="/press-release"      element={<PageMotion><PressRelease /></PageMotion>} />
              <Route path="/press-kit"          element={<PageMotion><PressKit /></PageMotion>} />
              <Route path="/privacy"            element={<PageMotion><Privacy /></PageMotion>} />
              <Route path="/terms"              element={<PageMotion><Terms /></PageMotion>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      {work        && <WorkDetail   work={work} onClose={closeModal} />}
      {enquiryOpen && <EnquiryModal work={enquiryWork} kind={enquiryKind} onClose={closeModal} />}
    </ErrorBoundary>
  );
}
