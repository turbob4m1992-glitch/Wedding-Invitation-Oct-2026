import React from 'react';
import Ornament from './Ornament';
import { useI18n } from '../i18n';

const InvitationDetails: React.FC = () => {
  const { t } = useI18n();

  const Family: React.FC<{ label: string; line1: string; line2: string }> = ({
    label,
    line1,
    line2,
  }) => (
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
        {label}
      </p>
      <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', lineHeight: 1.6 }}>
        {line1}
        <br />
        {line2}
      </h4>
    </div>
  );

  return (
    <section
      className="section-padding text-center scroll-reveal"
      style={{ backgroundColor: 'var(--white)', paddingBottom: '4rem' }}
    >
      <div style={{ maxWidth: '360px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
          {t.detailsTitle}
        </h3>
        <Ornament />

        <p style={{ fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: '2' }}>
          {t.blessingLine1}
          <br />
          {t.blessingLine2}
        </p>

        {/* Forced LTR so the bride's family always sits on the left, in both languages. */}
        <div
          style={{
            display: 'flex',
            direction: 'ltr',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '0.5rem',
            margin: '2rem 0',
          }}
        >
          <Family
            label={t.brideFamilyLabel}
            line1={t.brideFamilyLine1}
            line2={t.brideFamilyLine2}
          />
          <div
            style={{
              width: '1px',
              alignSelf: 'stretch',
              minHeight: '60px',
              backgroundColor: 'var(--primary-light)',
            }}
          />
          <Family
            label={t.groomFamilyLabel}
            line1={t.groomFamilyLine1}
            line2={t.groomFamilyLine2}
          />
        </div>
      </div>
    </section>
  );
};

export default InvitationDetails;
