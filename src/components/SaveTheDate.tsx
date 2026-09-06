import React from 'react';
import { Calendar as CalendarIcon, Apple } from 'lucide-react';
import Ornament from './Ornament';
import { useI18n } from '../i18n';

/* 9 Oct 2026, 19:00 Jordan time (UTC+3) -> 16:00 UTC. */
const DTSTART = '20261009T160000Z';
const DTEND = '20261009T210000Z';
const TITLE = 'Yousef & Malak | Wedding';
const PLACE = 'Sky Hall, Irbid, Jordan';
const MAP_URL = 'https://maps.app.goo.gl/EgFCS3LL5qtsw3z6A';

const googleUrl = () => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: TITLE,
    dates: `${DTSTART}/${DTEND}`,
    location: PLACE,
    details: MAP_URL,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const icsFile = () =>
  [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Keyframe Global//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:youssef-malak-20261009@keyframeglobal.com',
    `DTSTAMP:${DTSTART}`,
    `DTSTART:${DTSTART}`,
    `DTEND:${DTEND}`,
    `SUMMARY:${TITLE}`,
    `LOCATION:${PLACE}`,
    `DESCRIPTION:${MAP_URL}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

const downloadIcs = () => {
  const blob = new Blob([icsFile()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'youssef-malak-wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const buttonBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  width: '100%',
  padding: '12px 24px',
  borderRadius: '30px',
  fontSize: '1rem',
  fontWeight: 600,
  textDecoration: 'none',
};

const SaveTheDate: React.FC = () => {
  const { t } = useI18n();

  return (
    <section
      className="section-padding text-center scroll-reveal"
      style={{ backgroundColor: 'var(--white)' }}
    >
      <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
        {t.saveTheDateTitle}
      </h3>
      <Ornament style={{ marginBottom: '2.25rem' }} />

      {/* Tear-off calendar leaf */}
      <div
        style={{
          width: '180px',
          margin: '0 auto 2.25rem auto',
          backgroundColor: 'var(--white)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(229, 179, 184, 0.5)',
          boxShadow: '0 12px 30px rgba(120, 70, 76, 0.12)',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--white)',
            padding: '10px 0',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            letterSpacing: '0.06em',
          }}
        >
          {t.month}
        </div>
        <div style={{ padding: '20px 0' }}>
          <div
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              color: 'var(--primary-dark)',
              lineHeight: '1',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {t.day}
          </div>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginTop: '10px' }}>
            {t.weekday}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          maxWidth: '260px',
          margin: '0 auto',
        }}
      >
        <a
          href={googleUrl()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...buttonBase,
            backgroundColor: 'var(--primary)',
            color: 'var(--white)',
            boxShadow: '0 4px 15px rgba(192, 132, 138, 0.3)',
          }}
        >
          <CalendarIcon size={18} />
          {t.googleCalendar}
        </a>

        <button
          type="button"
          onClick={downloadIcs}
          style={{
            ...buttonBase,
            backgroundColor: 'var(--white)',
            color: 'var(--primary-dark)',
            border: '1px solid var(--primary-light)',
          }}
        >
          <Apple size={18} />
          {t.appleCalendar}
        </button>
      </div>
    </section>
  );
};

export default SaveTheDate;
