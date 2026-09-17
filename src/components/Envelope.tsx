import React, { useEffect, useRef, useState } from 'react';
import NamesLockup from './NamesLockup';
import Ornament from './Ornament';
import { useI18n } from '../i18n';
import sealWine from '../assets/seal-wine.png';

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

/** Total time the flap + card animation needs before the page takes over. */
const REVEAL_MS = 2150;

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onOpen }) => {
  const { lang, t } = useI18n();
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
    <div className={`envelope-screen night ${isOpen ? 'opened' : ''}`}>
      <div className="env-intro">
        <h2 className="env-kicker foil-text">{t.envelopeKicker}</h2>
        <Ornament size={10} style={{ maxWidth: 120, marginTop: '0.5rem' }} />
        <p className="env-date">{t.dateLine}</p>

        <div className="env-stage">
          <div className={`env ${isOpening ? 'is-opening' : ''}`}>
            <div className="env-back" />

            <div className="env-card">
              {lang === 'ar' ? (
                <NamesLockup label={t.namesLabel} />
              ) : (
                <span className="env-card-names-en foil-text">
                  {t.groomFirst} &amp; {t.brideFirst}
                </span>
              )}
              <Ornament size={8} />
              <span className="env-card-date">{t.dateLine}</span>
              <span className="env-card-time">{t.timeLine}</span>
            </div>

            <div className="env-body">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 100L50 52L100 100" fill="rgba(150, 115, 70, 0.07)" />
                <path
                  d="M0 100L50 52L100 100"
                  fill="none"
                  stroke="rgba(195, 162, 99, 0.7)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <div className="env-flap">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="env-flap-paper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fffdf8" />
                    <stop offset="1" stopColor="#efe3cf" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 0H100L50 100Z"
                  fill="url(#env-flap-paper)"
                  stroke="rgba(195, 162, 99, 0.85)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <button type="button" className="env-seal" onClick={handleOpen} aria-label={t.openInvitation}>
              <img src={sealWine} alt="" />
            </button>
          </div>
        </div>

        <button onClick={handleOpen} className="btn btn-gold" disabled={isOpening}>
          {t.openInvitation}
        </button>
      </div>
    </div>
  );
};

export default Envelope;
