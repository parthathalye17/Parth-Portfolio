'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = ['about', 'experience', 'projects', 'contact'] as const;
const LINKS = ['About', 'Experience', 'Projects'] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="mobile-nav-padding"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 52px',
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'background 380ms ease, backdrop-filter 380ms ease, border-color 380ms ease',
      }}
    >
      <nav className="mobile-nav-gap" style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
        {LINKS.map(label => (
          <NavLink
            key={label}
            label={label}
            active={active === label.toLowerCase()}
            onClick={() => scrollTo(label.toLowerCase())}
          />
        ))}
        <a
          href="mailto:athalyeparth@gmail.com"
          data-hover
          style={{
            fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600,
            color: 'rgba(255,255,255,0.82)',
            borderBottom: '1px solid rgba(255,255,255,0.26)',
            paddingBottom: 2, cursor: 'none',
          }}
        >
          Say hello
        </a>
      </nav>
    </motion.header>
  );
}

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      data-hover
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600,
        letterSpacing: '0.13px', color: active ? '#fff' : hov ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.38)',
        transition: 'color 220ms', cursor: 'none', padding: '4px 0' }}
    >
      {label}
      {/* Active underline dot */}
      {active && (
        <motion.span
          layoutId="nav-dot"
          style={{
            position: 'absolute', bottom: -1, left: '50%', transform: 'translateX(-50%)',
            width: 3, height: 3, borderRadius: '50%', background: '#DA291C', display: 'block',
          }}
        />
      )}
    </button>
  );
}
