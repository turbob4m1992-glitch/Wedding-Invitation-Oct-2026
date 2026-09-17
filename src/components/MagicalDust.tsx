import React, { useState } from 'react';

/** A few slow motes of gold light drifting up the invitation column. */
const MagicalDust: React.FC = () => {
  const [particles] = useState(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 14 + 16,
      delay: Math.random() * -30, // Negative delay so the column is already populated
      tx: Math.random() * 40 - 20,
    })),
  );

  return (
    <div className="dust" aria-hidden="true">
      {particles.map((p) => (
        <i
          key={p.id}
          style={
            {
              left: `${p.x}%`,
              top: '104vh',
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--tx': `${p.tx}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default MagicalDust;
