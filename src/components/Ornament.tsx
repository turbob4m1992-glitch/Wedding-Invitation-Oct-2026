import React from 'react';

/** Thin rule with a centred diamond, used to separate sections. */
const Ornament: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div className="ornament" style={style} aria-hidden="true">
    <span />
    <i />
    <span />
  </div>
);

export default Ornament;
