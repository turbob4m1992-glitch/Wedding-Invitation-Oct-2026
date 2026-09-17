import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { starPoints } from './starPoints';

/** Where the outer arch peaks, leaving room above it for the star finial. */
const APEX = 30;

/**
 * A gently pointed arch: both arcs spring from the same line and meet at the apex.
 * The rise above the spring line is a little more than half the width, which is
 * what gives the arch its point.
 */
const archPath = (left: number, right: number, apex: number, spring: number, base: number) => {
  const half = (right - left) / 2;
  const rise = spring - apex;
  const r = (half * half + rise * rise) / (2 * half);
  return `M${left} ${base}V${spring}A${r} ${r} 0 0 1 ${left + half} ${apex}A${r} ${r} 0 0 1 ${right} ${spring}V${base}`;
};

/** The double gold arch from the card, drawn to fit whatever it wraps. */
const ArchFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const gradientId = `arch-gold-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { w, h } = size;
  const spring = APEX + (w / 2) * 1.12;

  return (
    <div ref={ref} className="arch">
      {w > 0 && (
        <svg className="arch-art" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2={h}>
              <stop offset="0" stopColor="#8e6c2c" />
              <stop offset=".25" stopColor="#c9a860" />
              <stop offset=".45" stopColor="#e4cb8a" />
              <stop offset=".62" stopColor="#a9833f" />
              <stop offset=".8" stopColor="#d5b670" />
              <stop offset="1" stopColor="#8a6828" />
            </linearGradient>
          </defs>

          <path d={`${archPath(8, w - 8, APEX + 8, spring, h)}Z`} fill="rgba(255, 253, 247, 0.55)" />

          <g fill="none" stroke={`url(#${gradientId})`}>
            <path d={archPath(1, w - 1, APEX, spring, h)} strokeWidth="1.3" />
            <path d={archPath(8, w - 8, APEX + 8, spring, h)} strokeWidth="0.6" />
            <path d={`M-12 ${h - 0.5}H${w + 12}`} strokeWidth="1.2" />
            <path d={`M-4 ${h + 4.5}H${w + 4}`} strokeWidth="0.5" />
            <polygon points={starPoints(w / 2, APEX - 17, 10)} strokeWidth="0.8" />
          </g>
          <polygon points={starPoints(w / 2, APEX - 17, 4)} fill={`url(#${gradientId})`} />
        </svg>
      )}
      <div className="arch-content">{children}</div>
    </div>
  );
};

export default ArchFrame;
