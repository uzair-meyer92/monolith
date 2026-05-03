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
      "These terms govern your use of monolith.gallery and the services offered through it. By using the site you accept these terms. If you do not accept them, please do not use the site.",
    ],
  },
  {
    label: 'Use of the site',
    body: [
      "You may browse, share, and link to pages on this site for personal, non-commercial purposes. You may not republish substantial portions of the content, attempt to access non-public areas, interfere with the site's operation, or use automated tools to scrape it.",
    ],
  },
  {
    label: 'Intellectual property',
    body: [
      "All artworks reproduced on this site remain the property of the artist who made them. Reproductions are provided for editorial and reference purposes only and may not be downloaded, redistributed, or used commercially without the written permission of the artist and the gallery.",
      "Photographs of the gallery interior, exterior, and installation views are the property of MONOLITH and its commissioned photographers. The MONOLITH wordmark, name, and visual identity are trademarks of the gallery.",
      "Press use of work images is welcomed for editorial coverage of the exhibitions presented here. Please request high-resolution files via the Press Kit page or write to the gallery.",
    ],
  },
  {
    label: 'Enquiries and sales',
    body: [
      "Information about the availability and price of works is provided on request. Submitting an enquiry through this site does not constitute a binding offer or sale. All sales are subject to a separate written agreement between the buyer and the gallery.",
      "Works marked Sold or Reserved are no longer available for sale through the gallery, regardless of any prior conversation.",
    ],
  },
  {
    label: 'Newsletter',
    body: [
      "Subscribing to the newsletter signals your consent to receive occasional emails about exhibitions and gallery news. You can unsubscribe at any time using the link at the foot of every newsletter or by writing to the gallery.",
    ],
  },
  {
    label: 'External links',
    body: [
      "The site may link to third-party services such as social platforms, map providers, and press outlets. We do not control these services and are not responsible for their content or practices. Following such links is at your own discretion.",
    ],
  },
  {
    label: 'Disclaimers',
    body: [
      "The site is provided on an as-is basis. While we make reasonable efforts to keep information accurate — exhibition dates, opening hours, admission rates — these may change without notice. We do not warrant that the site will be available without interruption or free from errors.",
    ],
  },
  {
    label: 'Liability',
    body: [
      "To the extent permitted by law, MONOLITH is not liable for any indirect, incidental, or consequential loss arising from your use of the site. Nothing in these terms limits liability for fraud, gross negligence, or any liability that cannot be excluded under South African law.",
    ],
  },
  {
    label: 'Governing law',
    body: [
      "These terms are governed by the laws of the Republic of South Africa. Any dispute arising under them is subject to the exclusive jurisdiction of the courts of the Western Cape.",
    ],
  },
  {
    label: 'Changes',
    body: [
      "We may update these terms from time to time. Material changes will be reflected in the date below. Continued use of the site after a change indicates acceptance of the revised terms.",
    ],
  },
  {
    label: 'Contact',
    body: [
      `Questions about these terms can be addressed to ${ENQ_EMAIL}, or by post to MONOLITH, 14 Sir Lowry Road, Woodstock, Cape Town, South Africa.`,
    ],
  },
];

export default function Terms() {
  const location = useLocation();
  const ref = useRef(null);
  useReveal(ref);

  useSEO({
    title: 'Terms',
    description: 'Terms of use for the MONOLITH gallery website.',
    path: '/terms',
  });

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  return (
    <div ref={ref} style={{ background: T.paper, paddingTop: 56, minHeight: '100vh' }}>
      <div className="page-pad shell">
        <div data-anim="rv" style={{
          fontFamily: T.m, fontSize: 9, letterSpacing: '.2em',
          textTransform: 'uppercase', color: T.label, marginBottom: 16,
        }}>
          Terms of Use
        </div>
        <h1 data-anim="rv" style={{
          fontFamily: T.d, fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 300,
          lineHeight: 0.95, letterSpacing: '-.02em',
          color: T.black, marginBottom: 16, fontOpticalSizing: 'auto',
        }}>
          Terms
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
