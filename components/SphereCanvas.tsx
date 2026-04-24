'use client';

import { useEffect, useRef } from 'react';

export default function SphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0, raf = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Fibonacci sphere — 280 evenly distributed points
    const N = 280;
    const PHI = Math.PI * (1 + Math.sqrt(5));
    const pts = Array.from({ length: N }, (_, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = PHI * i;
      return {
        ox: Math.sin(phi) * Math.cos(theta),
        oy: Math.cos(phi),
        oz: Math.sin(phi) * Math.sin(theta),
      };
    });

    let mX = 0, mY = 0, tmX = 0, tmY = 0;
    const onMove = (e: MouseEvent) => {
      mX = (e.clientX / window.innerWidth - 0.5) * 0.18;
      mY = (e.clientY / window.innerHeight - 0.5) * 0.12;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let rotY = 0;
    const BASE_X = 0.28;

    const render = () => {
      W = canvas.width; H = canvas.height;
      // Large radius — fills most of the hero void
      const r = Math.min(W, H) * 0.85;
      ctx.clearRect(0, 0, W, H);

      rotY += 0.0011;
      tmX += (mX - tmX) * 0.02;
      tmY += (mY - tmY) * 0.02;

      const rX = BASE_X + tmY, rY = rotY + tmX;
      const cosY = Math.cos(rY), sinY = Math.sin(rY);
      const cosX = Math.cos(rX), sinX = Math.sin(rX);
      const FOV = W * 0.9, cx = W / 2, cy = H / 2;

      const proj = pts.map(p => {
        const x1 = p.ox * cosY + p.oz * sinY;
        const z1 = -p.ox * sinY + p.oz * cosY;
        const y2 = p.oy * cosX - z1 * sinX;
        const z2 = p.oy * sinX + z1 * cosX;
        const scale = FOV / (z2 * r + FOV + r * 0.5);
        return { sx: x1 * r * scale + cx, sy: y2 * r * scale + cy, z: z2 };
      });

      proj.sort((a, b) => a.z - b.z);

      const THRESH = r * 0.2;
      const THRESH2 = THRESH * THRESH;

      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const dx = proj[i].sx - proj[j].sx;
          const dy = proj[i].sy - proj[j].sy;
          const d2 = dx * dx + dy * dy;
          if (d2 < THRESH2) {
            const t = 1 - Math.sqrt(d2) / THRESH;
            const avgZ = (proj[i].z + proj[j].z) * 0.5;
            const depth = (avgZ + 1) * 0.5;
            const alpha = t * t * (0.035 + depth * 0.05);
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }

      proj.forEach(p => {
        const depth = (p.z + 1) * 0.5;
        const alpha = 0.04 + depth * 0.14;
        const size = 0.5 + depth * 1.8;
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, display: 'block' }}
    />
  );
}
