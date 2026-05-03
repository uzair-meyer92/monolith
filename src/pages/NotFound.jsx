import { useNavigate } from 'react-router-dom';
import { T } from '../data.js';
import Button from '../lib/Button.jsx';
import { useSEO } from '../lib/SEO.jsx';

export default function NotFound() {
  const navigate = useNavigate();

  useSEO({
    title: 'Page not found',
    description: "The page you're looking for doesn't exist.",
    path: '/404',
    noindex: true,
  });

  return (
    <div style={{
      background: T.paper, minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="page-pad shell" style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: T.m, fontSize: 9, letterSpacing: '.2em',
          textTransform: 'uppercase', color: T.label, marginBottom: 32,
        }}>
          Error 404
        </div>
        <h1 style={{
          fontFamily: T.d, fontSize: 'clamp(80px, 12vw, 180px)', fontWeight: 300,
          lineHeight: 0.9, letterSpacing: '-.03em',
          color: T.black, marginBottom: 24, fontOpticalSizing: 'auto',
        }}>
          Page not <em style={{ fontStyle: 'italic', color: T.accent }}>found</em>
        </h1>
        <p style={{
          fontFamily: T.s, fontSize: 16, fontWeight: 300, lineHeight: 1.85,
          color: T.gd, marginBottom: 40, maxWidth: 480,
          marginLeft: 'auto', marginRight: 'auto',
        }}>
          The page you're looking for doesn't exist or has moved. Return to the gallery to continue browsing.
        </p>
        <div style={{ display: 'inline-block' }}>
          <Button variant="inverse" onClick={() => navigate('/')}>
            Return to Monolith →
          </Button>
        </div>
      </div>
    </div>
  );
}
