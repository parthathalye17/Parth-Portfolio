'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  ytId: string | null;
  onClose: () => void;
}

export default function VideoModal({ ytId, onClose }: Props) {
  useEffect(() => {
    if (!ytId) return;
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [ytId, onClose]);

  return (
    <AnimatePresence>
      {ytId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 800,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', width: 'min(900px, 92vw)' }}
          >
            <button
              onClick={onClose}
              data-hover
              style={{
                position: 'absolute',
                top: -36,
                right: 0,
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                cursor: 'none',
              }}
            >
              Close ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
              allow="autoplay; fullscreen"
              style={{ width: '100%', aspectRatio: '16/9', border: 'none', borderRadius: 2, display: 'block' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
