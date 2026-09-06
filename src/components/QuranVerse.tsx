import React from 'react';
import { useI18n } from '../i18n';

const QuranVerse: React.FC = () => {
  const { lang, t } = useI18n();

  return (
    <section
      className="section-padding text-center scroll-reveal"
      style={{ backgroundColor: 'var(--white)' }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '380px',
          margin: '0 auto',
          padding: '2.75rem 1.75rem 2.25rem',
          borderRadius: '4px',
          border: '1px solid var(--primary-light)',
          background: 'linear-gradient(165deg, #fffdfd, var(--bg-color))',
          boxShadow: '0 10px 30px rgba(120, 70, 76, 0.07)',
        }}
      >
        {/* Inner hairline frame */}
        <div
          style={{
            position: 'absolute',
            inset: '7px',
            border: '1px solid rgba(229, 179, 184, 0.45)',
            borderRadius: '2px',
            pointerEvents: 'none',
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: lang === 'ar' ? '1.32rem' : '1.1rem',
            lineHeight: lang === 'ar' ? 2.1 : 1.85,
            color: 'var(--primary-dark)',
            position: 'relative',
            marginBottom: '1.5rem',
          }}
        >
          {t.verse}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            position: 'relative',
          }}
        >
          <span style={{ width: '28px', height: '1px', backgroundColor: 'var(--primary-light)' }} />
          <span
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              color: 'var(--text-light)',
            }}
          >
            {t.verseRef}
          </span>
          <span style={{ width: '28px', height: '1px', backgroundColor: 'var(--primary-light)' }} />
        </div>
      </div>
    </section>
  );
};

export default QuranVerse;
