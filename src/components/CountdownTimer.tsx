import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';

/** 9 October 2026, 19:00 Jordan time (UTC+3). */
const TARGET = new Date('2026-10-09T19:00:00+03:00').getTime();

const CountdownTimer: React.FC = () => {
  const { t } = useI18n();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const difference = TARGET - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '72px',
        height: '76px',
        backgroundColor: 'var(--white)',
        borderRadius: '10px',
        boxShadow: '0 6px 16px rgba(120, 70, 76, 0.07)',
        border: '1px solid rgba(229, 179, 184, 0.4)',
      }}
    >
      <span
        style={{
          fontSize: '1.6rem',
          fontWeight: 'bold',
          color: 'var(--primary-dark)',
          fontFamily: 'var(--font-heading)',
          lineHeight: 1.1,
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{label}</span>
    </div>
  );

  return (
    <section
      className="section-padding text-center scroll-reveal"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '2rem' }}>
        {t.countdownTitle}
      </h3>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', direction: 'ltr' }}>
        <TimeBox value={timeLeft.days} label={t.days} />
        <TimeBox value={timeLeft.hours} label={t.hours} />
        <TimeBox value={timeLeft.minutes} label={t.minutes} />
        <TimeBox value={timeLeft.seconds} label={t.seconds} />
      </div>
    </section>
  );
};

export default CountdownTimer;
