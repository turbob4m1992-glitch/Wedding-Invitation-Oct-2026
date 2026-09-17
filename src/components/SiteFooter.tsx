import React from 'react';
import NamesLockup from './NamesLockup';
import Ornament from './Ornament';
import { useI18n } from '../i18n';

/** Closing signature, then the studio credit. */
const SiteFooter: React.FC = () => {
  const { lang, t } = useI18n();

  return (
    <footer className="site-footer night">
      {lang === 'ar' ? (
        <NamesLockup label={t.namesLabel} tone="night" />
      ) : (
        <p className="footer-names-en foil-text">
          {t.groomFirst} &amp; {t.brideFirst}
        </p>
      )}
      <p className="footer-date">{t.dateLine}</p>

      <Ornament size={10} />

      <a className="credit" href="https://keyframeglobal.com" target="_blank" rel="noopener noreferrer">
        Crafted with love by <b>Keyframe Global</b>
      </a>
    </footer>
  );
};

export default SiteFooter;
