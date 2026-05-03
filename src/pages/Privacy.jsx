import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { T, ENQ_EMAIL } from '../data.js';
import { useReveal } from '../lib/useReveal.js';
import { useSEO } from '../lib/SEO.jsx';

const LAST_UPDATED = '3 May 2026';

const SECTIONS = [
  {
    label: 'Overview',
    body: [
      "MONOLITH respects your privacy. This policy describes what limited information the gallery collects when you use this site, how it is used, and the rights you have over your data.",
      "We do not sell, rent, or trade personal information. We do not run advertising trackers. The site does not set cookies for analytics or marketing.",
    ],
  },
  {
    label: 'What we collect',
    body: [
      "When you submit an enquiry, we receive the name, email address, and any message you choose to include. For group-visit bookings we additionally receive the visit type, group size, and preferred date.",
      "When you subscribe to the newsletter we receive your email address only.",
      "Standard server logs (IP address, request path, timestamp, user agent) are retained briefly by our hosting provider for security and abuse-prevention purposes.",
    ],
  },
  {
    label: 'How we use it',
    body: [
      "Enquiry messages are read by gallery staff and used only to reply to you. We retain the conversation thread for our records.",
      "Newsletter addresses are used to send occasional emails about exhibition openings and gallery news. You may unsubscribe at any time using the link at the foot of every newsletter.",
    ],
  },
  {
    label: 'Third parties',
    body: [
      "We use the following processors to operate the site. Each is bound by their own privacy commitments.",
      "· Vercel — hosts the site and serves pages from its global edge network.",
      "· Resend — delivers transactional email (enquiry replies and newsletter).",
      "· OpenStreetMap — supplies the map embed on the Visit page.",
      "We do not share data with anyone else.",
    ],
  },
  {
    label: 'Your rights',
    body: [
      "Under the Protection of Personal Information Act (POPIA, South Africa) and where applicable the General Data Protection Regulation (GDPR, European Economic Area), you have the right to access the data we hold about you, to request correction or deletion, and to withdraw consent at any time.",
      `To exercise any of these rights, write to ${ENQ_EMAIL}. We respond to all requests within 30 days.`,
    ],
  },
  {
    label: 'Cookies',
    body: [
      "This site does not currently use cookies. Should that change — for example to remember a language preference — we will update this policy and request consent before any non-essential cookie is set.",
    ],
  },
  {
    label: 'Security',
    body: [
      "We use HTTPS across the site, store enquiry messages within reputable email infrastructure, and limit staff access on a need-to-know basis.",
    ],
  },
  {
    label: 'Changes',
    body: [
      "We may update this policy from time to time. Material changes will be flagged on this page and reflected in the date below.",
    ],
  },
  {
    label: 'Contact',
    body: [
      `Questions about privacy can be addressed to ${ENQ_EMAIL}, or by post to MONOLITH, 14 Sir Lowry Road, Woodstock, Cape Town, South Africa.`,
    ],
  },
];

export default function Privacy() {
  const location = useLocation();
  const ref = useRef(null);
  useReveal(ref);

  useSEO({
    title: 'Privacy',
    description: 'How MONOLITH collects, uses, and protects your personal information.',
    path: '/privacy',
  });

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  return (
    <div ref={ref} style={{ background: T.paper, paddingTop: 56, minHeight: '100vh' }}>
      <div className="page-pad shell">
        <div data-anim="rv" style={{
          fontFamily: T.m, fontSize: 9, letterSpacing: '.2em',
          textTransform: 'uppercase', color: T.label, marginBottom: 16,
        }}>
          Privacy Policy
        </div>
        <h1 data-anim="rv" style={{
          fontFamily: T.d, fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 300,
          lineHeight: 0.95, letterSpacing: '-.02em',
          color: T.black, marginBottom: 16, fontOpticalSizing: 'auto',
        }}>
          Privacy
        </h1>
        <div data-anim="rv" style={{
          fontFamily: T.m, fontSize: 10, letterSpacing: '.14em',
          textTransform: 'uppercase', color: T.label, marginBottom: 64,
        }}>
          Last updated · {LAST_UPDATED}
        </div>

        {SECTIONS.map((s, i) => (
          <section key={s.label} data-anim="rv" className="split-200-1" style={{
            paddingTop: i === 0 ? 0 : 40, paddingBottom: 40,
            borderTop: i === 0 ? `1px solid ${T.black}` : `1px solid ${T.border}`,
          }}>
            <div style={{
              fontFamily: T.m, fontSize: 9, letterSpacing: '.14em',
              textTransform: 'uppercase', color: T.label, paddingTop: i === 0 ? 16 : 4,
            }}>
              {s.label}
            </div>
            <div style={{ paddingTop: i === 0 ? 16 : 0 }}>
              {s.body.map((p, j) => (
                <p key={j} style={{
                  fontFamily: T.s,
                  fontSize: j === 0 && i === 0 ? 18 : 15,
                  fontWeight: 300, lineHeight: 1.85,
                  color: j === 0 && i === 0 ? T.black : T.gd,
                  marginBottom: j === s.body.length - 1 ? 0 : 22, maxWidth: 720,
                }}>
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
