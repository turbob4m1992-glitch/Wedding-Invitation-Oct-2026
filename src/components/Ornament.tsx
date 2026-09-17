import React from 'react';
import Star from './Star';

/** Thin gold rules either side of an eight-pointed star, used to separate sections. */
const Ornament: React.FC<{ className?: string; style?: React.CSSProperties; size?: number }> = ({
  className = '',
  style,
  size = 12,
}) => (
  <div className={`ornament ${className}`} style={style} aria-hidden="true">
    <span />
    <Star size={size} />
    <span />
  </div>
);

export default Ornament;
