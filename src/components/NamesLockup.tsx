import React, { useId } from 'react';
import { NAMES_VIEWBOX as VB, NAMES_PATH, AND_PATH } from './namesArt';

const FOIL = {
  paper: [
    ['0', '#7a5a22'],
    ['.2', '#b8904a'],
    ['.36', '#e6cc8c'],
    ['.52', '#a47c3a'],
    ['.68', '#d8b972'],
    ['.84', '#8a6828'],
    ['1', '#c29e58'],
  ],
  night: [
    ['0', '#a9843f'],
    ['.22', '#d9bb76'],
    ['.38', '#f4e2ab'],
    ['.54', '#c29e58'],
    ['.7', '#ecd494'],
    ['.86', '#a9843f'],
    ['1', '#d4b26a'],
  ],
};

interface Props {
  label: string;
  tone?: 'paper' | 'night';
  /**
   * Hand-lettering entrance. `false` keeps the names hidden, `true` writes them
   * in from right to left and then lets a light sheen pass over the gold.
   * Leave undefined for a static lockup.
   */
  write?: boolean;
  className?: string;
}

/** "يوسف و مَلَك" in gold foil calligraphy, the same lettering as the printed card. */
const NamesLockup: React.FC<Props> = ({ label, tone = 'paper', write, className = '' }) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const foilId = `foil-${uid}`;
  const sheenId = `sheen-${uid}`;
  const clipId = `clip-${uid}`;
  const { x, y, width: w, height: h } = VB;

  const state = write === undefined ? '' : write ? 'is-writing' : 'is-hidden';

  return (
    <svg
      className={`names-lockup tone-${tone} ${state} ${className}`}
      viewBox={`${x} ${y} ${w} ${h}`}
      role="img"
      aria-label={label}
      style={{ '--sweep': `${-w * 1.7}px` } as React.CSSProperties}
    >
      <defs>
        <linearGradient id={foilId} gradientUnits="userSpaceOnUse" x1={x} y1={y} x2={x + w} y2={y + h}>
          {FOIL[tone].map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
        {write !== undefined && (
          <>
            <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="0.25">
              <stop offset="0" stopColor="#fffbe8" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fffbe8" stopOpacity="0.85" />
              <stop offset="1" stopColor="#fffbe8" stopOpacity="0" />
            </linearGradient>
            <clipPath id={clipId}>
              <path d={NAMES_PATH} />
            </clipPath>
          </>
        )}
      </defs>

      <path d={NAMES_PATH} fill={`url(#${foilId})`} />
      <path d={AND_PATH} className="names-and" />

      {write !== undefined && (
        <g clipPath={`url(#${clipId})`}>
          <rect
            className="names-sheen"
            x={x + w * 1.05}
            y={y}
            width={w * 0.35}
            height={h}
            fill={`url(#${sheenId})`}
          />
        </g>
      )}
    </svg>
  );
};

export default NamesLockup;
