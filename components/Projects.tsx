'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, type Project } from '@/lib/data';
import VideoModal from './VideoModal';

const VIEWPORT = { once: true, amount: 0.08 };

export default function Projects() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <section
        id="projects"
        style={{ background: '#000', padding: '104px 52px 112px', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} viewport={VIEWPORT}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 }}
          >
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
              Projects
            </span>
            <RepoLink />
          </motion.div>

          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={VIEWPORT}
            >
              <ProjectRow p={p} onPlay={() => setActiveVideo(p.ytId)} />
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>
      </section>

      <VideoModal ytId={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}

function ProjectRow({ p, onPlay }: { p: Project; onPlay: () => void }) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current || open) return;
    const r = rowRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    rowRef.current.style.transform = `perspective(1100px) rotateY(${x * 2.5}deg) rotateX(${-y * 1.2}deg)`;
    rowRef.current.style.transition = 'transform 80ms linear';
  };
  const onMouseLeave = () => {
    setHov(false);
    if (!rowRef.current) return;
    rowRef.current.style.transform = 'none';
    rowRef.current.style.transition = 'transform 700ms cubic-bezier(0.34,1.56,0.64,1)';
  };

  const thumbUrl = `https://img.youtube.com/vi/${p.ytId}/mqdefault.jpg`;

  return (
    <div
      ref={rowRef}
      data-hover
      onClick={() => setOpen(o => !o)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHov(true)}
      style={{
        borderTop: `1px solid ${hov ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.07)'}`,
        padding: `${open ? 28 : 22}px 0`,
        transition: 'padding 320ms cubic-bezier(0.22,1,0.36,1), border-color 200ms',
        willChange: 'transform',
        cursor: 'pointer',
      }}
    >
      {/* Header — same 1fr/auto grid as Experience */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(20px, 2.4vw, 26px)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: hov ? '#fff' : 'rgba(255,255,255,0.88)',
              transition: 'color 200ms',
              lineHeight: 1.1,
            }}>
              {p.title}
            </span>
          </div>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.3)', display: 'block' }}>
            {p.sub}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 2 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.18)', whiteSpace: 'nowrap' }}>
            {p.year}
          </span>
          {/* Expand/collapse chevron */}
          <motion.svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: hov ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)', flexShrink: 0 }}
          >
            <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>
      </div>

      {/* Expanded content — description left, video right */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: 24,
              display: 'grid',
              gridTemplateColumns: '1fr 280px',
              gap: 36,
              alignItems: 'start',
            }}>
              {/* Left — description + stack + link */}
              <div>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.52)',
                  lineHeight: 1.82,
                  marginBottom: 18,
                }}>
                  {p.desc}
                </p>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
                  {p.stack.map(t => (
                    <span key={t} style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      letterSpacing: '.5px',
                      padding: '4px 10px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 2,
                      color: 'rgba(255,255,255,0.36)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  onClick={e => e.stopPropagation()}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.36)',
                    borderBottom: '1px solid rgba(255,255,255,0.14)',
                    paddingBottom: 2,
                  }}
                >
                  View Repository ↗
                </a>
              </div>

              {/* Right — YouTube thumbnail */}
              <div
                data-hover
                onClick={e => { e.stopPropagation(); onPlay(); }}
                style={{ position: 'relative', flexShrink: 0 }}
              >
                <img
                  src={thumbUrl}
                  alt={`${p.title} demo`}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    borderRadius: 2,
                    display: 'block',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                />
                <PlayOverlay />
                <span style={{
                  display: 'block',
                  marginTop: 8,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.2)',
                  textAlign: 'center',
                }}>
                  Watch Demo
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlayOverlay() {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hov ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.36)',
        borderRadius: 2,
        transition: 'background 200ms',
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
        <path d="M17 14l10 6-10 6V14z" fill="#fff" />
      </svg>
    </div>
  );
}

function RepoLink() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="https://github.com/parthathalye17"
      target="_blank"
      rel="noopener noreferrer"
      data-hover
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase',
        color: hov ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.16)',
        borderBottom: `1px solid ${hov ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
        paddingBottom: 2, transition: 'color 200ms, border-color 200ms',
      }}
    >
      All Repos ↗
    </a>
  );
}
