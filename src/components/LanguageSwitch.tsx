import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';

/**
 * Fixed toggle. It retreats while the guest scrolls down so it never sits on
 * top of the invitation text, and returns the moment they scroll back up.
 */
const LanguageSwitch: React.FC = () => {
  const { lang, setLang, t } = useI18n();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setHidden(false);
      else if (y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6) setHidden(false);
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={t.switchLabel}
      data-hidden={hidden ? 'true' : 'false'}
    >
      <button type="button" onClick={() => setLang('ar')} aria-pressed={lang === 'ar'} lang="ar">
        العربية
      </button>
      <button type="button" onClick={() => setLang('en')} aria-pressed={lang === 'en'} lang="en">
        English
      </button>
    </div>
  );
};

export default LanguageSwitch;
