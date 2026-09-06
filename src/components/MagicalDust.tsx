import React from 'react';

const MagicalDust: React.FC = () => {
  // Generate 40 random dust particles
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100 + 100, // Start below and float up
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * -20, // Negative delay
    tx: Math.random() * 50 - 25 // Random x translation
  }));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="magical-particle"
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: 'var(--primary-light)',
            borderRadius: '50%',
            opacity: 0,
            boxShadow: '0 0 10px var(--primary)',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            // Pass the random X translation as a CSS variable for the keyframe to use
            '--tx': `${p.tx}px`
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        .magical-particle {
          animation-name: floatUp;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes floatUp {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
            transform: translate(var(--tx), -75vh) scale(1.5);
          }
          100% {
            transform: translate(calc(var(--tx) * 2), -150vh) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MagicalDust;
