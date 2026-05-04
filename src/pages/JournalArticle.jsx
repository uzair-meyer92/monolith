import { useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';

import { T, JOURNAL_ARTICLES } from '../data.js';
import { useReveal } from '../lib/useReveal.js';
import { useSEO, useJsonLd } from '../lib/SEO.jsx';

export default function JournalArticle({ slug }) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  useReveal(ref);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  const lookup = slug || params.id;
  const article = JOURNAL_ARTICLES.find((a) =>
    a.slug === lookup || String(a.id) === String(lookup)
  );

  useSEO({
    title: article ? article.title : 'Journal',
    description: article?.subtitle || 'A curatorial essay from MONOLITH.',
    path: article ? `/journal/${article.slug || article.id}` : '/journal',
  });

  useJsonLd('journal-article', article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.subtitle,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.date,
    publisher: { '@type': 'Organization', name: 'MONOLITH' },
    mainEntityOfPage: `https://monolith-flax-zeta.vercel.app/journal/${article.slug || article.id}`,
  } : { '@type': 'WebPage' });

  if (!article) return <Navigate to="/journal" replace />;

  return (
    <div ref={ref} style={{ background: T.paper, paddingTop: 56 }}>
      <div className="page-pad shell">
        <button onClick={() => navigate('/journal')} className="link-mono"
          style={{ marginBottom: 48, display: 'inline-block' }}>
          ← Back to Journal
        </button>
        <div className="split-200-1">
          <div>
            <div style={{ fontFamily: T.m, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: T.label, marginBottom: 8 }}>{article.type}</div>
            <div style={{ fontFamily: T.m, fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: T.label, marginBottom: 8 }}>{article.date}</div>
            <div style={{ fontFamily: T.m, fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: T.label }}>{article.author}</div>
          </div>
          <article style={{ maxWidth: 680 }}>
            <h1 data-anim="rv" style={{
              fontFamily: T.d, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300,
              lineHeight: 1.02, letterSpacing: '-.02em',
              color: T.black, marginBottom: 8, fontOpticalSizing: 'auto',
            }}>
              {article.title}
            </h1>
            <div data-anim="rv" style={{
              fontFamily: T.d, fontSize: 18, fontWeight: 300, fontStyle: 'italic',
              color: T.label, marginBottom: 40,
            }}>
              {article.subtitle}
            </div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 40 }}>
              {article.body.map((para, i) => (
                <p key={i} data-anim="rv" style={{
                  fontFamily: T.s, fontWeight: 300, lineHeight: 1.9,
                  color: i === 0 ? T.black : T.gd, marginBottom: 28,
                  fontSize: i === 0 ? 18 : 16,
                }}>
                  {para}
                </p>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
