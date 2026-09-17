import React from 'react';
import { ChevronDown } from 'lucide-react';
import ArchFrame from './ArchFrame';
import NamesLockup from './NamesLockup';
import Ornament from './Ornament';
import { useI18n } from '../i18n';
import sealWine from '../assets/seal-wine.png';

/** The invitation itself, set like the printed card inside its gold arch. */
const HeroSection: React.FC<{ revealed: boolean }> = ({ revealed }) => {
  const { lang, t } = useI18n();

  return (
    <section className="hero paper" style={{ position: 'relative' }}>
      <ArchFrame>
        <img className="hero-seal" src={sealWine} alt="" />

        <p className="hero-bism">{t.bismillah}</p>

        <p className="hero-verse">{t.verse}</p>
        <p className="verse-ref">{t.verseRef}</p>

        {/* Forced LTR so the bride's family always sits on the left, in both languages. */}
        <div className="hero-families">
          {[
            [t.brideFamilyLabel, t.brideFamilyLine1, t.brideFamilyLine2],
            [t.groomFamilyLabel, t.groomFamilyLine1, t.groomFamilyLine2],
          ].map(([label, line1, line2], i) => (
            <React.Fragment key={label}>
              {i > 0 && <i className="vrule" />}
              <div style={{ direction: t.dir }}>
                <small>{label}</small>
                <p>
                  {line1}
                  <br />
                  {line2}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        <p className="hero-intro">{t.heroIntro}</p>

        {lang === 'ar' ? (
          <div className="hero-names">
            <NamesLockup label={t.namesLabel} write={revealed} />
          </div>
        ) : (
          <h1 className="hero-names-en foil-text">
            {t.groomFirst}
            <span className="amp">&amp;</span>
            {t.brideFirst}
          </h1>
        )}

        <Ornament />

        <div className="date-block">
          <span className="side">{t.weekday}</span>
          <span className="day foil-text">{t.day}</span>
          <span className="side">{t.monthYear}</span>
        </div>
        <p className="hero-time">{t.timeLine}</p>

        <p className="venue-name">{t.venue}</p>
        <p className="venue-city">{t.city}</p>
      </ArchFrame>

      <div className="scroll-cue" aria-hidden="true">
        <span>{t.scrollCue}</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

export default HeroSection;
