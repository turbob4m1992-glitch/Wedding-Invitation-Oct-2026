import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useI18n } from '../i18n';
import { music } from '../music';

const BackgroundMusic: React.FC = () => {
  const { t } = useI18n();
  const isPlaying = useSyncExternalStore(music.subscribe, music.isPlaying);
  const [atBottom, setAtBottom] = useState(false);

  // Step aside at the very bottom so the button never covers the credit line.
  useEffect(() => {
    const onScroll = () => {
      const remaining = document.body.scrollHeight - (window.scrollY + window.innerHeight);
      setAtBottom(remaining < 110);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className="music-btn"
      onClick={() => (isPlaying ? music.pause() : music.play())}
      aria-label={isPlaying ? t.pauseMusic : t.playMusic}
      aria-pressed={isPlaying}
      data-hidden={atBottom ? 'true' : 'false'}
    >
      {isPlaying ? <Volume2 size={21} /> : <VolumeX size={21} />}
    </button>
  );
};

export default BackgroundMusic;
