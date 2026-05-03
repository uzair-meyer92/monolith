# MONOLITH

A fictional contemporary art gallery website — Cape Town. Single-show focus, currently presenting *Ground Truth* by Thandiwe Mokoena.

Editorial, cinematic, museum-grade typography. Built as a portfolio piece.

## Stack

- **Vite** + **React 18** (`BrowserRouter`)
- **Framer Motion** — page transitions
- **GSAP** + ScrollTrigger — hero reveal, scroll-driven animations
- **sharp** — build-time image optimization (WebP + JPG fallback)

## Prerequisites

- Node 18+
- npm 10+

## Scripts

```bash
npm install            # install deps
npm run dev            # local dev server (Vite)
npm run build          # production build → dist/
npm run preview        # preview the production build locally
```

## Image pipeline

Drop new JPGs into `public/images/`, then:

```bash
node scripts/optimize-images.mjs
```

The script processes new files only (skips any with an existing `.webp` sibling). Originals are backed up to `public/images/_originals/` (gitignored). Pass `--force` to re-process everything.

## Folder structure

```
public/                 static assets, images, robots.txt, sitemap.xml
scripts/                build-time tooling (image optimizer)
src/
  ├── App.jsx           routes + page transitions + modals
  ├── main.jsx          React mount point + GSAP plugin registration
  ├── data.js           all copy: works, exhibitions, journal, FAQ, contact
  ├── components/       Hero, Navbar, Footer, WorkDetail, EnquiryModal, …
  ├── pages/            Home, Exhibition, Journal, Visit, About, Press*, Privacy, Terms, NotFound
  ├── lib/              SEO, Photo, Button, CustomCursor, focus-trap, error-boundary
  └── styles/           fonts.css, global.css
vercel.json             SPA rewrites + cache headers
```

## Deploy

Hosted on Vercel. Auto-deploys on push to `main`.

```bash
git push origin main
```

`vercel.json` handles:
- SPA fallback (every unknown path → `index.html`)
- Immutable caching for `/assets/*` and `/images/*`
- Standard security headers

## Environment variables

The form is currently `mailto:` — no backend, no env vars. If you wire up a real backend later (e.g. Resend via a Vercel Function at `api/enquire.js`), add:

```
RESEND_API_KEY=re_...
ENQUIRY_TO_EMAIL=enquiries@monolith.gallery
ENQUIRY_FROM_EMAIL=Monolith <enquiries@monolith.gallery>
```

See `.env.example` for the template. Set these in Vercel → Project → Settings → Environment Variables.

## License

Portfolio project. Artwork concepts and gallery name are fictional.
