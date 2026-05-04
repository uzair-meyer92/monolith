import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Hero       from '../components/Hero.jsx';
import Marquee    from '../components/Marquee.jsx';
import Statement  from '../components/Statement.jsx';
import WorksGrid  from '../components/WorksGrid.jsx';
import ArtistBio  from '../components/ArtistBio.jsx';
import Programme  from '../components/Programme.jsx';
import { useSEO, useJsonLd } from '../lib/SEO.jsx';

const CURTAIN_IN_MS  = 250;
const CURTAIN_OUT_MS = 300;

export default function Home() {
  const location = useLocation();
  const [curtain, setCurtain] = useState(0);

  useSEO({
    title: 'Ground Truth · Thandiwe Mokoena',
    description: 'Ground Truth — a solo exhibition by Thandiwe Mokoena. 6 February – 28 June 2026 at MONOLITH, Cape Town.',
    path: '/',
  });

  useJsonLd('exhibition-home', {
    '@context': 'https://schema.org',
    '@type': 'VisualArtsEvent',
    name: 'Ground Truth — Thandiwe Mokoena',
    description: 'A solo exhibition by Thandiwe Mokoena at MONOLITH, Cape Town.',
    startDate: '2026-02-06',
    endDate: '2026-06-28',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'MONOLITH',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '14 Sir Lowry Road',
        addressLocality: 'Woodstock',
        addressRegion: 'Western Cape',
        addressCountry: 'ZA',
      },
    },
    performer: { '@type': 'Person', name: 'Thandiwe Mokoena' },
    organizer: { '@type': 'Organization', name: 'MONOLITH', url: 'https://monolith-flax-zeta.vercel.app' },
    image: 'https://monolith-flax-zeta.vercel.app/images/hero-landscape.jpg',
    url: 'https://monolith-flax-zeta.vercel.app/',
  });

  /* Only react to actual route changes — not modal open/close, which
     reuse the same pathname+hash with a fresh location.key. Including
     location.key here would scroll-reset whenever a modal mounts. */
  useEffect(() => {
    if (location.hash === '#works') {
      setCurtain(1);
      const jumpTimer = setTimeout(() => {
        const el = document.getElementById('works');
        if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, CURTAIN_IN_MS);
      const fadeOutTimer = setTimeout(() => setCurtain(0), CURTAIN_IN_MS + 50);
      return () => { clearTimeout(jumpTimer); clearTimeout(fadeOutTimer); };
    }
    window.scrollTo({ top: 0 });
    setCurtain(0);
  }, [location.pathname, location.hash]);

  return (
    <div>
      <div id="hero-block">
        <Hero />
        <Marquee />
      </div>
      <Statement />
      <WorksGrid />
      <ArtistBio />
      <Programme />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, background: '#F4F1EC',
          opacity: curtain, pointerEvents: curtain ? 'auto' : 'none',
          transition: `opacity ${curtain ? CURTAIN_IN_MS : CURTAIN_OUT_MS}ms cubic-bezier(0.16,1,0.3,1)`,
          zIndex: 150,
        }}
      />
    </div>
  );
}
