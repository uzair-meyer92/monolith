import { useEffect } from 'react';

const SITE = 'https://monolith-flax-zeta.vercel.app';

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/* useSEO — per-route document head updates.
   Pass title (rendered as "<title> — MONOLITH"), description, path,
   image (absolute URL preferred), and noindex flag. */
export function useSEO({ title, description, path = '/', image, noindex = false } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — MONOLITH` : 'MONOLITH — Ground Truth';
    const url = `${SITE}${path}`;
    const img = image || `${SITE}/images/hero-landscape.jpg`;

    document.title = fullTitle;

    if (description) setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    setMeta('property', 'og:title', fullTitle);
    if (description) setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);

    setMeta('name', 'twitter:title', fullTitle);
    if (description) setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);

    setLink('canonical', url);
  }, [title, description, path, image, noindex]);
}

/* Inject a JSON-LD <script> block keyed by id. Replaces if it exists. */
export function useJsonLd(id, data) {
  useEffect(() => {
    const elId = `jsonld-${id}`;
    let el = document.getElementById(elId);
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = elId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => { if (el && el.parentNode) el.parentNode.removeChild(el); };
  }, [id, data]);
}
