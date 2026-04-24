'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE } from '@/lib/data';

const VIEWPORT = { once: true, amount: 0.1 };

export default function Experience() {
  return (
    <section id="experience" style={{ background: '#fff', padding: '104px 52px 112px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={VIEWPORT}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#8f8f8f',
            display: 'block',
            marginBottom: 48,
          }}
        >
          Experience
        </motion.span>

        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={e.co}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={VIEWPORT}
          >
            <ExpRow e={e} />
          </motion.div>
        ))}

        <div style={{ borderTop: '1px solid #ebebeb' }} />
      </div>
    </section>
  );
}

function ExpRow({ e }: { e: typeof EXPERIENCE[number] }) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);

  return (
    <div
      data-hover
      onClick={() => setOpen(o => !o)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderTop: `1px solid ${hov ? '#ccc' : '#ebebeb'}`,
        transition: 'border-color 200ms',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          padding: `${open ? 28 : 22}px 0`,
          transition: 'padding 300ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
          <div>
            {/* Company + role */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 5 }}>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: hov ? '#000' : '#181818',
                  letterSpacing: '-0.01em',
                  transition: 'color 200ms',
                }}
              >
                {e.co}
              </span>
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#555',
                }}
              >
                {e.role}
              </span>
            </div>

            {/* Discipline */}
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#aaa',
              }}
            >
              {e.discipline}
            </span>

            {/* Expanded description */}
            <AnimatePresence>
              {open && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    color: '#2a2a2a',
                    lineHeight: 1.82,
                    maxWidth: 680,
                    overflow: 'hidden',
                  }}
                >
                  {e.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Period + location */}
          <div style={{ textAlign: 'right', paddingTop: 2, flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: '#8f8f8f',
                letterSpacing: '.5px',
                marginBottom: 4,
                whiteSpace: 'nowrap',
              }}
            >
              {e.period}
            </div>
            <div
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: '#333',
                letterSpacing: '0.02em',
              }}
            >
              {e.loc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
