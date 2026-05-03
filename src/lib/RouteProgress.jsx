import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/* Slim terracotta progress line at the very top of the viewport.
   Fires for ~700ms whenever the route pathname changes. */
export default function RouteProgress() {
  const { pathname } = useLocation();
  const [state, setState] = useState('idle');
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setState('run');
    const t1 = setTimeout(() => setState('done'), 700);
    const t2 = setTimeout(() => setState('idle'), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pathname]);

  if (state === 'idle') return null;
  return <div className="route-progress" data-state={state} aria-hidden="true" />;
}
