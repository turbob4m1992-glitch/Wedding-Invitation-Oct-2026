import React, { useEffect, useRef, useState } from 'react';
import SealMonogram from './SealMonogram';
import { useI18n } from '../i18n';

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

/** Total time the flap + card animation needs before the page takes over. */
const REVEAL_MS = 2150;

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onOpen }) => {
  const { t } = useI18n();
  const [isOpening, setIsOpening] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = window.setTimeout(onOpen, reduced ? 200 : REVEAL_MS);
  };

  return (
    <div className={`envelope-screen ${isOpen ? 'opened' : ''}`}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '220px',
          background: 'radial-gradient(ellipse at top, var(--primary-light), transparent 72%)',
          opacity: 0.35,
        }}
      />

      <div className="text-center animate-slide-up" style={{ zIndex: 10 }}>
        <h2
          style={{
            fontSize: '1.6rem',
            letterSpacing: '0.08em',
            marginBottom: '2.25rem',
            color: 'var(--primary)',
          }}
        >
          {t.envelopeKicker}
        </h2>

        <div className="env-stage">
          <div className={`env ${isOpening ? 'is-opening' : ''}`}>
            <div className="env-back" />

            <div className="env-card">
              <span className="env-card-names">
                {t.groomFirst} &amp; {t.brideFirst}
              </span>
              <span className="env-card-rule" />
              <span className="env-card-date">{t.dateLine}</span>
            </div>

            <div className="env-body" />
            <div className="env-flap" />

            <button
              type="button"
              className="env-seal"
              onClick={handleOpen}
              aria-label={t.openInvitation}
            >
              <SealMonogram left={t.sealLeft} right={t.sealRight} />
            </button>
          </div>
        </div>

        <button onClick={handleOpen} className="primary-button" disabled={isOpening}>
          {t.openInvitation}
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '180px',
          background: 'radial-gradient(ellipse at bottom, var(--primary-light), transparent 72%)',
          opacity: 0.3,
        }}
      />
    </div>
  );
};

export default Envelope;
