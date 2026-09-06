import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import Ornament from './Ornament';
import { useI18n } from '../i18n';

const MAP_URL = 'https://maps.app.goo.gl/EgFCS3LL5qtsw3z6A';

const Location: React.FC = () => {
  const { t } = useI18n();

  const Row: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
    <div
      style={{
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      {icon}
      <span style={{ fontSize: '1.05rem' }}>{children}</span>
    </div>
  );

  return (
    <section
      className="section-padding text-center scroll-reveal"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
        {t.locationTitle}
      </h3>
      <Ornament style={{ marginBottom: '2.25rem' }} />

      <div
        style={{
          backgroundColor: 'var(--white)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 8px 26px rgba(120, 70, 76, 0.07)',
          border: '1px solid rgba(229, 179, 184, 0.35)',
          maxWidth: '350px',
          margin: '0 auto',
        }}
      >
        <Row icon={<Calendar color="var(--primary)" size={20} />}>{t.dateLine}</Row>
        <Row icon={<Clock color="var(--primary)" size={20} />}>{t.timeLine}</Row>

        <div
          style={{
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <MapPin color="var(--primary)" size={22} />
          <div style={{ textAlign: 'start' }}>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '0.15rem' }}>
              {t.venue}
            </h4>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{t.city}</span>
          </div>
        </div>

        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-button"
          style={{ display: 'inline-block', width: '100%', textDecoration: 'none' }}
        >
          {t.mapButton}
        </a>
      </div>
    </section>
  );
};

export default Location;
