'use client';

import { useEffect, useRef, useState } from 'react';

// Dot: 5px  Ring: 26px (hover: 40px) — mix-blend-mode:difference auto-inverts on white sections
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const [show, setShow] = useState(false);

  // Effect 1: detect pointer capability — skip entirely on touch/tablet
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) setShow(true);
  }, []);

  // Effect 2: attach listeners once show=true and refs are populated
  useEffect(() => {
    if (!show) return;
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      ringEl.style.left = ring.current.x + 'px';
      ringEl.style.top = ring.current.y + 'px';
      raf.current = requestAnimationFrame(tick);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      if (el.closest('[data-hover]')) {
        ringEl.style.width = '40px';
        ringEl.style.height = '40px';
      }
    };

    const onLeave = (e: MouseEvent) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      if (el.closest('[data-hover]')) {
        ringEl.style.width = '26px';
        ringEl.style.height = '26px';
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter, { passive: true, capture: true });
    document.addEventListener('mouseleave', onLeave, { passive: true, capture: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter, { capture: true });
      document.removeEventListener('mouseleave', onLeave, { capture: true });
      cancelAnimationFrame(raf.current);
    };
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 5,
          height: 5,
          background: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 26,
          height: 26,
          border: '1.2px solid #fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          transition: 'width 280ms ease, height 280ms ease',
        }}
      />
    </>
  );
}
