import React from 'react';

import Ornament from './Ornament';
import { useI18n } from '../i18n';

const NotesAndContact: React.FC = () => {
  const { t } = useI18n();

  return (
    <section
      className="section-padding text-center scroll-reveal"
      style={{ backgroundColor: 'var(--white)' }}
    >
      <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
        {t.notesTitle}
      </h3>
      <Ornament style={{ marginBottom: '2.25rem' }} />

      <div style={{ maxWidth: '350px', margin: '0 auto', textAlign: 'start' }}>

        {/* Adults-only notice */}
        <div
          style={{
            margin: '0 auto',
            padding: '2rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--primary-light)',
            backgroundColor: 'var(--bg-color)',
            textAlign: 'center',
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.45rem',
              fontWeight: 700,
              lineHeight: 1.6,
              color: 'var(--primary-dark)',
              marginBottom: '1rem',
            }}
          >
            {t.adultsTitle}
          </h4>
          <p
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--text-dark)',
              lineHeight: 1.9,
              marginBottom: '0.6rem',
            }}
          >
            {t.adultsLine1}
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-dark)', lineHeight: 1.9 }}>
            {t.adultsLine2}
          </p>
        </div>

      </div>
    </section>
  );
};

export default NotesAndContact;
