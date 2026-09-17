import React from 'react';
import { starPoints } from './starPoints';

interface StarProps {
  size?: number;
  /** Outlined star around a small solid one, as on the card corners. */
  outlined?: boolean;
  className?: string;
}

/** The eight-pointed star used as the finial across the card and site. */
const Star: React.FC<StarProps> = ({ size = 14, outlined = false, className = '' }) => (
  <svg
    className={`star ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {outlined ? (
      <>
        <polygon points={starPoints(12, 12, 11.2)} fill="none" stroke="currentColor" strokeWidth="0.9" />
        <polygon points={starPoints(12, 12, 4.8)} fill="currentColor" />
      </>
    ) : (
      <polygon points={starPoints(12, 12, 11)} fill="currentColor" />
    )}
  </svg>
);

export default Star;
