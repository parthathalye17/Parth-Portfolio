'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT_FIELDS, DOCS_LINK } from '@/lib/data';

const VIEWPORT = { once: true, amount: 0.12 };
const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  return (
    <footer
      id="contact"
      className="mobile-section-padding"
      style={{ background: '#303030', padding: '80px 52px 56px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="show" viewport={VIEWPORT}
          style={{ marginBottom: 48 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: '#8f8f8f', display: 'block', marginBottom: 16 }}>
            Get in Touch
          </span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="mobile-title-text" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px,4vw,58px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'rgba(255,255,255,0.82)', lineHeight: 1 }}>
              Let&apos;s build something.
            </h2>
            <SendButton />
          </div>
        </motion.div>

        {/* Equal-weight contact grid */}
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="show" viewport={VIEWPORT}
          transition={{ delay: 0.11 }}
          className="mobile-contact-grid mobile-grid-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}
        >
          {CONTACT_FIELDS.map((f, i) => {
            const isRight = i % 2 === 1;
            const inner = (
              <FieldInner label={f.label} value={f.value} accent={f.accent} isRight={isRight} hasLink={!!f.href} />
            );
            return f.href ? (
              <a key={f.label} href={f.href} target={f.external ? '_blank' : undefined}
                rel={f.external ? 'noopener noreferrer' : undefined}
                data-hover style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit', cursor: 'none' }}>
                {inner}
              </a>
            ) : (
              <div key={f.label} style={{ height: '100%' }}>{inner}</div>
            );
          })}
        </motion.div>

        {/* All Docs link — shifted one row up */}
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="show" viewport={VIEWPORT}
          transition={{ delay: 0.15 }}
          style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            View all my certifications, project demos etc. here.
          </span>
          <DocsLink href={DOCS_LINK} />
        </motion.div>

        {/* Footer bar — name, year */}
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="show" viewport={VIEWPORT}
          transition={{ delay: 0.18 }}
          style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
            Parth Athalye
          </span>

          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.14)' }}>
            © 2026
          </span>
        </motion.div>
      </div>
    </footer>
  );
}

function DocsLink({ href }: { href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-hover
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: "'DM Mono', monospace",
        fontSize: 9,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: hov ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.22)',
        transition: 'color 200ms',
        cursor: 'none',
      }}
    >
      {/* Folder icon */}
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <path d="M1.5 3.5A1 1 0 012.5 2.5h3.086a1 1 0 01.707.293L7.5 4H13.5a1 1 0 011 1v7a1 1 0 01-1 1h-11a1 1 0 01-1-1V3.5z"
          stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      </svg>
      All Documents ↗
    </a>
  );
}

function FieldInner({ label, value, accent, isRight, hasLink }: {
  label: string; value: string; accent?: boolean; isRight: boolean; hasLink: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={isRight ? 'mobile-contact-right-col' : 'mobile-contact-left-col'}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        height: '100%',
        padding: '16px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        borderLeft: isRight ? '1px solid rgba(255,255,255,0.06)' : 'none',
        paddingLeft: isRight ? 32 : 0,
        paddingRight: isRight ? 0 : 32,
      }}
    >
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: '#666' }}>
        {label}
      </span>
      <span style={{
        fontFamily: "'Barlow', sans-serif", fontSize: value === 'View PDF ↗' ? 12 : 14, fontWeight: 400,
        color: accent ? (hov && hasLink ? '#fff' : 'rgba(218,41,28,0.85)') : (hov && hasLink ? '#fff' : 'rgba(255,255,255,0.62)'),
        transition: 'color 200ms',
      }}>
        {value}
      </span>
    </div>
  );
}

function SendButton() {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="mailto:athalyeparth@gmail.com"
      data-hover
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        background: hov ? '#B01E0A' : '#DA291C',
        color: '#fff',
        fontFamily: "'Barlow', sans-serif",
        fontSize: 16,
        fontWeight: 400,
        letterSpacing: '1.28px',
        padding: '12px 28px',
        borderRadius: 2,
        display: 'inline-block',
        transition: 'background 200ms',
        whiteSpace: 'nowrap',
        cursor: 'none',
      }}
    >
      Send Message
    </motion.a>
  );
}
