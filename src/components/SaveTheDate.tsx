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

const SaveTheDate: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="section scroll-reveal" style={{ paddingTop: '1.5rem' }}>
      <h3 className="section-title">{t.saveTheDateTitle}</h3>
      <Ornament />

      {/* Tear-off calendar leaf */}
      <div className="leaf">
        <div className="leaf-head night">{t.month}</div>
        <div className="leaf-day foil-text">{t.day}</div>
        <div className="leaf-weekday">{t.weekday}</div>
      </div>

      <div className="cal-buttons">
        <a href={googleUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-wine">
          <CalendarIcon size={18} />
          {t.googleCalendar}
        </a>

        <button type="button" onClick={downloadIcs} className="btn btn-outline">
          <Apple size={18} />
          {t.appleCalendar}
        </button>
      </div>
    </section>
  );
};

export default SaveTheDate;
