import { useRef } from 'react';
import { T, ARTIST } from '../data.js';
import Photo from '../lib/Photo.jsx';
import Rule from './Rule.jsx';
import { useReveal } from '../lib/useReveal.js';

export default function ArtistBio() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="about-artist" ref={ref} className="page-pad-x" style={{ background: T.paper, paddingBottom: 96 }}>
      <div className="shell">
        <Rule label="About the Artist" />
        <div className="split-1-2">
          <Photo
            src={ARTIST.portrait} ph={ARTIST.portraitPh}
            alt={`Black-and-white studio portrait of artist ${ARTIST.name}.`}
            filter="grayscale(1) contrast(1.1)"
            w={800} h={1000}
            sizes="(max-width: 1023px) 100vw, 33vw"
            style={{ aspectRatio: '4/5', width: '100%' }}
          />
          <div>
            <h2 data-anim="rv" style={{
              fontFamily: T.d, fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 300,
              lineHeight: 1, letterSpacing: '-.02em',
              color: T.black, marginBottom: 32, fontOpticalSizing: 'auto',
            }}>
              {ARTIST.name}
            </h2>
            <p data-anim="rv" style={{
              fontFamily: T.s, fontSize: 16, fontWeight: 300, lineHeight: 1.85,
              color: T.black, marginBottom: 0, maxWidth: 680,
            }}>
              {ARTIST.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
