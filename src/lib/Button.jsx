import { forwardRef, useEffect, useRef } from 'react';

/* Magnetic effect — the button shifts toward the cursor when nearby.
   Disabled on touch / coarse pointer / reduced motion. */
function useMagnetic(ref, enabled, strength = 0.28, radius = 90) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let target = { x: 0, y: 0 };
    let pos    = { x: 0, y: 0 };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d  = Math.hypot(dx, dy);
      if (d < radius + Math.max(rect.width, rect.height) / 2) {
        target.x = dx * strength;
        target.y = dy * strength;
      } else {
        target.x = 0; target.y = 0;
      }
    };
    const onLeave = () => { target.x = 0; target.y = 0; };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      el.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
    };
  }, [enabled, ref, strength, radius]);
}

const Button = forwardRef(function Button(
  { variant = 'inverse', magnetic = false, as: Tag = 'button', className = '', children, ...rest },
  outerRef,
) {
  const innerRef = useRef(null);
  const ref = outerRef || innerRef;
  useMagnetic(ref, magnetic);

  const cls = `btn btn-${variant}${className ? ` ${className}` : ''}`;
  const tagProps = Tag === 'button' ? { type: rest.type || 'button' } : {};
  return (
    <Tag ref={ref} className={cls} {...tagProps} {...rest}>
      {children}
    </Tag>
  );
});

export default Button;
