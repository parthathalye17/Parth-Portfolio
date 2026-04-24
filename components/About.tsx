'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS, EDUCATION } from '@/lib/data';

const VIEWPORT = { once: true, amount: 0.15 };
const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const [hovSkill, setHovSkill] = useState<string | null>(null);

  return (
    <section
      id="about"
      style={{ background: '#000', padding: '104px 52px 112px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.span
          variants={FADE_UP} initial="hidden" whileInView="show" viewport={VIEWPORT}
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: 48 }}
        >
          About
        </motion.span>

        <div style={{ display: 'grid', gridTemplateColumns: '6fr 5fr', gap: 80, alignItems: 'start' }}>
          {/* Left — bio */}
          <div>
            <motion.p
              variants={FADE_UP} initial="hidden" whileInView="show" viewport={VIEWPORT}
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.62)', lineHeight: 1.82, marginBottom: 18 }}
            >
              I&apos;m Parth, an AI engineer who cares about the craft. Whether it&apos;s a RAG pipeline indexing enterprise documents or a React-Native app for a corner-shop owner in India, I build systems that hold up at every layer of the stack.
            </motion.p>
            <motion.p
              variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.11 }}
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.88 }}
            >
              Currently pursuing a Master of IT (Artificial Intelligence) at UNSW Sydney. My professional journey includes engineering semantic search pipelines on Azure at Deloitte and driving predictive maintenance research at Edgelytics. I'm also a passionate hackathon competitor—securing finalist spots in seven national and one international events, including Cambridge EduX × Microsoft Sydney and the Government of India's Bhashini-Sprint.
            </motion.p>
          </div>

          {/* Right — skills + education */}
          <motion.div
            variants={FADE_UP} initial="hidden" whileInView="show" viewport={VIEWPORT}
            transition={{ delay: 0.11 }}
          >
            {/* Technologies */}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', display: 'block', marginBottom: 14 }}>
              Technologies
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
              {SKILLS.map(s => (
                <motion.span
                  key={s}
                  data-hover
                  onHoverStart={() => setHovSkill(s)}
                  onHoverEnd={() => setHovSkill(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '.5px',
                    padding: '5px 10px',
                    borderRadius: 2,
                    border: `1px solid ${hovSkill === s ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.09)'}`,
                    color: hovSkill === s ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.35)',
                    transition: 'border-color 200ms, color 200ms',
                    cursor: 'default',
                  }}
                >
                  {s}
                </motion.span>
              ))}
            </div>

            {/* Education */}
            <div style={{ paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', display: 'block', marginBottom: 14 }}>
                Education
              </span>
              {EDUCATION.map(({ school, deg, year }) => (
                <div key={school} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <div>
                    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.55)', display: 'block' }}>{school}</span>
                    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.28)' }}>{deg}</span>
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap', marginLeft: 12 }}>{year}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
