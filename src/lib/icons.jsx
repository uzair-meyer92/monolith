import { T, SOCIALS } from '../data.js';

/* Icon library — filled-circle marks, paper-on-black for the dark Footer.
   - SocialRow:  IG / Facebook / TikTok / X with handles, used in the Footer Follow column.
   - ContactRow: location / phone / email rows under the MONOLITH wordmark.
   Glyphs are inline SVG so they sit cleanly at any size with no font dependency. */

const CIRCLE_FILL = '#F4F1EC';   /* paper */
const GLYPH_FILL  = '#0A0A0A';   /* near-black */

/* Reusable filled-circle icon shell. Glyph drawn inside a 32×32 viewBox. */
function CircleIcon({ size = 22, glyph }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"
         style={{ display: 'block', flex: '0 0 auto' }}>
      <circle cx="16" cy="16" r="16" fill={CIRCLE_FILL} />
      <g fill={GLYPH_FILL}>{glyph}</g>
    </svg>
  );
}

/* ── Social glyphs (filled) ─────────────────────────────────────── */
/* All glyphs designed in a 32×32 viewBox with their visual centre at
   (16, 16). FB and X use SVG <text> for reliable letter-shape centring. */

/* Facebook 'f' — bold upright path, centred in the 32×32 viewBox.
   Drawn as a path so the rendering is consistent across browsers
   and not affected by available system fonts. */
const FB_GLYPH = (
  <path d="M18.4 12.2h-2.5v-1.6c0-.6.4-.8.7-.8h1.7V7.5h-2.4c-2.6 0-3.2 1.9-3.2 3.2v1.5h-1.5v2.7h1.5V23h2.7v-8.1h2l.3-2.7Z" />
);

const X_GLYPH = (
  <text x="16" y="22"
        textAnchor="middle"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontSize="17"
        fontWeight="900"
        fill={GLYPH_FILL}>X</text>
);

const IG_GLYPH = (
  <>
    <path d="M11.5 7h9c2.5 0 4.5 2 4.5 4.5v9c0 2.5-2 4.5-4.5 4.5h-9C9 25 7 23 7 20.5v-9C7 9 9 7 11.5 7zm0 1.6A2.9 2.9 0 0 0 8.6 11.5v9a2.9 2.9 0 0 0 2.9 2.9h9a2.9 2.9 0 0 0 2.9-2.9v-9a2.9 2.9 0 0 0-2.9-2.9h-9z" />
    <path d="M16 11.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm0 1.6a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z" />
    <circle cx="20.6" cy="11.4" r="1" />
  </>
);

/* TikTok — J-hook with note circle, centred around (16, 16). */
const TT_GLYPH = (
  <path d="M20.5 9 C19.5 9 18.5 8 18.5 7 H15.5 V19 C15.5 20.1 14.6 21 13.5 21 C12.4 21 11.5 20.1 11.5 19 C11.5 17.9 12.4 17 13.5 17 V14 C10.7 14 8.5 16.2 8.5 19 C8.5 21.8 10.7 24 13.5 24 C16.3 24 18.5 21.8 18.5 19 V12 C20 13 21.5 13.5 23.5 13.5 V10 C22.5 10 21.5 9.5 20.5 9 Z" />
);

/* ── Contact glyphs (filled, slightly inset) ────────────────────── */

const LOC_GLYPH = (
  <path d="M16 6.5c-3.6 0-6.5 2.9-6.5 6.5 0 4.9 6.5 12 6.5 12s6.5-7.1 6.5-12c0-3.6-2.9-6.5-6.5-6.5zm0 8.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z" />
);

const TEL_GLYPH = (
  <path d="M21.7 19.2l-2.2-1c-.5-.2-1 0-1.3.4l-1 1.2a10.6 10.6 0 0 1-5-5l1.2-1c.4-.3.6-.8.4-1.3l-1-2.2A1 1 0 0 0 11.7 9l-2 .5a1 1 0 0 0-.7.9c0 4.7 3.5 11.6 12.1 12.1.5 0 .9-.3 1-.8l.5-2c.1-.5-.2-1.1-.7-1.3z" />
);

const MAIL_GLYPH = (
  <path d="M7.5 9.5h17a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V10.5a1 1 0 0 1 1-1zm.7 1.7v.2L16 16l7.8-4.6v-.2H8.2zm15.6 1.9L16 17.7l-7.8-4.6V20h15.6v-6.9z" />
);

/* ── Public components ──────────────────────────────────────────── */

const SOCIAL_GLYPHS = {
  Instagram: IG_GLYPH,
  Facebook:  FB_GLYPH,
  TikTok:    TT_GLYPH,
  X:         X_GLYPH,
};

function SocialEntry({ name, handle, href }) {
  return (
    <a
      href={href}
      aria-label={`${name} — ${handle}`}
      onClick={href === '#' ? (e) => e.preventDefault() : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        textDecoration: 'none', color: T.labelDark,
        transition: 'color 400ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
      onMouseLeave={(e) => (e.currentTarget.style.color = T.labelDark)}
    >
      <CircleIcon glyph={SOCIAL_GLYPHS[name]} />
      <span style={{
        fontFamily: T.s, fontSize: 12, fontWeight: 300,
        color: 'inherit', lineHeight: 1.2,
      }}>
        {handle}
      </span>
    </a>
  );
}

export default function SocialRow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {SOCIALS.map((s) => <SocialEntry key={s.name} {...s} />)}
    </div>
  );
}

/* Contact row — one filled-circle icon + line of text per entry.
   Used under the MONOLITH wordmark in the Footer. */
function ContactEntry({ glyph, children, href }) {
  const interactive = !!href;
  const Tag = interactive ? 'a' : 'div';
  const interactiveProps = interactive
    ? {
        href,
        style: {
          display: 'flex', alignItems: 'flex-start', gap: 12,
          textDecoration: 'none', color: T.labelDark,
          transition: 'color 400ms ease',
        },
        onMouseEnter: (e) => (e.currentTarget.style.color = T.accent),
        onMouseLeave: (e) => (e.currentTarget.style.color = T.labelDark),
      }
    : {
        style: {
          display: 'flex', alignItems: 'flex-start', gap: 12,
          color: T.labelDark,
        },
      };
  return (
    <Tag {...interactiveProps}>
      <span style={{ paddingTop: 1 }}>
        <CircleIcon glyph={glyph} size={20} />
      </span>
      <span style={{
        fontFamily: T.s, fontSize: 12, fontWeight: 300, lineHeight: 1.5,
        color: 'inherit',
      }}>
        {children}
      </span>
    </Tag>
  );
}

export function ContactRow({ address, phone, email }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <ContactEntry glyph={LOC_GLYPH}>{address}</ContactEntry>
      <ContactEntry glyph={TEL_GLYPH} href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</ContactEntry>
      <ContactEntry glyph={MAIL_GLYPH} href={`mailto:${email}`}>{email}</ContactEntry>
    </div>
  );
}
