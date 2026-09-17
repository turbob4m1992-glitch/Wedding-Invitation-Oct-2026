import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { localDigits } from '../digits';

/** 9 October 2026, 19:00 Jordan time (UTC+3). */
const TARGET = new Date('2026-10-09T19:00:00+03:00').getTime();

const remaining = () => {
  const difference = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};

const CountdownTimer: React.FC = () => {
  const { lang, t } = useI18n();
  const [timeLeft, setTimeLeft] = useState(remaining);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(remaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units: [number, string][] = [
    [timeLeft.days, t.days],
    [timeLeft.hours, t.hours],
    [timeLeft.minutes, t.minutes],
    [timeLeft.seconds, t.seconds],
  ];

  return (
    <section className="band scroll-reveal">
      <h3 className="section-title">{t.countdownTitle}</h3>

      <div className="countdown">
        {units.map(([value, label]) => (
          <div className="unit" key={label}>
            <span className="num">
              {/* Keyed by value so each change replays the roll-in */}
              <span key={value}>{localDigits(value, lang)}</span>
            </span>
            <span className="label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountdownTimer;
