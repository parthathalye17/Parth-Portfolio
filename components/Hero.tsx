'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SphereCanvas from './SphereCanvas';

const NAME_LINES = ['PARTH', 'ATHALYE'];

export default function Hero() {
  const [ready, setReady] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const m = mouse.current;
    const onMove = (e: MouseEvent) => {
      m.x = (e.clientX / window.innerWidth - 0.5) * 8;
      m.y = (e.clientY / window.innerHeight - 0.5) * 5;
    };
    const tick = () => {
      m.tx += (m.x - m.tx) * 0.055;
      m.ty += (m.y - m.ty) * 0.055;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform =
          `perspective(1400px) rotateY(${m.tx}deg) rotateX(${-m.ty}deg)`;
      }
      m.raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    tick();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(m.raf);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 52px 64px',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SphereCanvas />

      {/* Parallax container */}
      <div ref={parallaxRef} style={{ position: 'relative', zIndex: 2, willChange: 'transform' }}>
        {/* Name — staggered letter reveal */}
        <div style={{ perspective: '900px', marginBottom: 26 }}>
          {NAME_LINES.map((line, li) => (
            <div key={line} style={{ overflow: 'hidden', lineHeight: 0.92 }}>
              <motion.div
                initial={{ rotateX: -90, opacity: 0, filter: 'blur(4px)' }}
                animate={ready ? { rotateX: 0, opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{
                  duration: 1,
                  delay: 0.22 + li * 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(64px, 9.5vw, 148px)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: '#fff',
                  display: 'block',
                  transformOrigin: 'bottom center',
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Role row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.74, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 18,
          }}
        >
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.02em' }}>
            AI Engineer
          </span>
          <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12 }}>·</span>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.02em' }}>
            Full Stack Developer
          </span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', bottom: 24, right: 52, display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
          Scroll
        </span>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={ready ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.15)', transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
