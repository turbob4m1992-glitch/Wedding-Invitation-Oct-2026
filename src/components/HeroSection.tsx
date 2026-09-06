import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n';

const HeroSection: React.FC = () => {
  const { lang, t } = useI18n();

  return (
    <section
      className="section-padding text-center scroll-reveal"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '220px',
          background: 'radial-gradient(ellipse at top, var(--primary-light), transparent 70%)',
          opacity: 0.4,
        }}
      />

      <div style={{ zIndex: 10 }}>
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: lang === 'ar' ? '1.2rem' : '0.95rem',
            color: 'var(--primary)',
            marginBottom: '2.25rem',
            letterSpacing: lang === 'ar' ? 'normal' : '0.04em',
          }}
        >
          {t.bismillah}
        </p>

        <h1
          style={{
            fontSize: lang === 'ar' ? '4.5rem' : '3.4rem',
            lineHeight: '1.1',
            marginBottom: '1rem',
            color: 'var(--primary-dark)',
          }}
        >
          {t.groomFirst}
          <br />
          <span style={{ fontSize: '2.4rem', color: 'var(--primary)' }}>&amp;</span>
          <br />
          {t.brideFirst}
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-dark)',
            maxWidth: '300px',
            margin: '2rem auto 0',
            lineHeight: 1.9,
          }}
        >
          {t.heroIntro}
        </p>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'bounce 2s infinite',
        }}
      >
        <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
          {t.scrollCue}
        </span>
        <ChevronDown color="var(--primary)" size={24} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
