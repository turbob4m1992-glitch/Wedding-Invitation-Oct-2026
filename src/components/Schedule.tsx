import React from 'react';
import Ornament from './Ornament';
import { useI18n } from '../i18n';

const Schedule: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding scroll-reveal" style={{ backgroundColor: 'var(--white)' }}>
      <h3
        className="text-center"
        style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}
      >
        {t.scheduleTitle}
      </h3>
      <Ornament style={{ marginBottom: '2.75rem' }} />

      <div style={{ position: 'relative', maxWidth: '300px', margin: '0 auto' }}>
        {/* Rail — logical inset so it follows the reading direction */}
        <div
          style={{
            position: 'absolute',
            insetInlineStart: '20px',
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'var(--primary-light)',
          }}
        />

        {t.events.map((event, index) => (
          <div
            key={index}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem', position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                insetInlineStart: '15px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                border: '2px solid var(--white)',
              }}
            />

            <div style={{ marginInlineStart: '48px', flex: 1, textAlign: 'start' }}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>
                {event.title}
              </h4>
              <span
                style={{
                  fontSize: '1rem',
                  color: 'var(--primary-dark)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {event.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Schedule;
