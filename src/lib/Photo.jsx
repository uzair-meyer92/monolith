import { useState, useRef, useEffect } from 'react';
import { T } from '../data.js';

/* Photo — responsive image wrapper with:
   - <picture> auto-serving WebP to modern browsers, JPG fallback to old
   - explicit width/height to reserve aspect-ratio (no CLS)
   - loading="lazy" by default (eager when above-the-fold)
   - decoding="async"
   - fade-in on load + monochrome→colour optional hover
   - graceful fallback to a CSS gradient placeholder on error */
export default function Photo({
  src,
  alt = '',
  ph = 'ph-dark',
  style = {},
  filter = 'grayscale(0.25) contrast(1.05)',
  hoverable = false,
  eager = false,
  fetchPriority,
  sizes,
  w = 1600,
  h = 1067,
}) {
  const [ok, setOk]         = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [hov, setHov]       = useState(false);
  const imgRef = useRef(null);

  /* Already-cached images often complete before onLoad runs. */
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, [src]);

  const containerProps = {
    style: { position: 'relative', overflow: 'hidden', background: T.border, ...style },
  };
  if (hoverable) {
    containerProps.onMouseEnter = () => setHov(true);
    containerProps.onMouseLeave = () => setHov(false);
  }

  if (!ok) return <div {...containerProps} className={`ph ${ph}`} aria-label={alt} role="img" />;

  /* Sibling .webp built by scripts/optimize-images.mjs. */
  const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');

  const opacity = !loaded ? 0 : (hov ? 0.86 : 1);
  return (
    <div {...containerProps}>
      <picture>
        <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={w}
          height={h}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchpriority={fetchPriority || (eager ? 'high' : 'auto')}
          onLoad={() => setLoaded(true)}
          onError={() => setOk(false)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            filter, opacity,
            transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
            transform: hov ? 'scale(1.03)' : 'scale(1)',
          }}
        />
      </picture>
    </div>
  );
}
