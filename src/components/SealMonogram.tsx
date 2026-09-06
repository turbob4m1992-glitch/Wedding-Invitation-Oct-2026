import React from 'react';

interface Props {
  left: string;
  right: string;
}

/**
 * Monogram stamped into the wax: the two initials flanking a hairline rule,
 * held in a double ring with a small diamond finial above and below. Drawn as
 * SVG so it holds its proportions at any seal size, and doubled with a dark
 * offset copy underneath so the mark reads as pressed in, not printed on.
 */
const SealMonogram: React.FC<Props> = ({ left, right }) => (
  <svg viewBox="0 0 100 100" className="seal-monogram" aria-hidden="true">
    <defs>
      <g id="seal-art">
        {/* Double ring */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />

        {/* Diamond finials on the vertical axis */}
        <path d="M50 26.5l3 3.4-3 3.4-3-3.4z" fill="currentColor" opacity="0.85" />
        <path d="M50 66.7l3 3.4-3 3.4-3-3.4z" fill="currentColor" opacity="0.85" />

        {/* Hairline rule between the initials */}
        <line x1="50" y1="36" x2="50" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.5" />

        {/* Initials */}
        <text
          x="35"
          y="58.5"
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontSize="25"
          fill="currentColor"
        >
          {left}
        </text>
        <text
          x="65"
          y="58.5"
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontSize="25"
          fill="currentColor"
        >
          {right}
        </text>
      </g>
    </defs>

    {/* Pressed shadow, then the raised face on top */}
    <use href="#seal-art" x="0.8" y="1" className="seal-press" />
    <use href="#seal-art" className="seal-face" />
  </svg>
);

export default SealMonogram;
