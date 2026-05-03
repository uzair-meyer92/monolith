import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

/* Per-section scroll reveal.
   Pass a ref; the hook scans for [data-anim="rv"] descendants, locks them
   invisible via gsap.set BEFORE first paint, then animates them in on
   ScrollTrigger. Cleanup uses gsap.context().revert() so triggers don't
   leak across route changes. */
export function useReveal(ref) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const reveals = ref.current.querySelectorAll('[data-anim="rv"]');
      if (!reveals.length) return;
      gsap.set(reveals, { opacity: 0, y: 30 });
      reveals.forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
