import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { useI18n } from '../i18n';

const BackgroundMusic: React.FC = () => {
  const { t } = useI18n();
  const [isPlaying, setIsPlaying] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  useEffect(() => {
    audioRef.current = new Audio(`${import.meta.env.BASE_URL}angels-promise.m4a`);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Audio play prevented by browser', e));
    }
  };

  return (
    <button
      onClick={togglePlay}
      style={{
        position: 'fixed',
        bottom: '20px',
        insetInlineEnd: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--white)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
        zIndex: 90,
        border: '1px solid var(--primary-light)',
        transform: atBottom ? 'translateY(150%)' : 'translateY(0)',
        opacity: atBottom ? 0 : 1,
        pointerEvents: atBottom ? 'none' : 'auto',
        transition: 'transform 0.35s ease, opacity 0.35s ease',
      }}
      aria-label={isPlaying ? t.pauseMusic : t.playMusic}
    >
      {isPlaying ? <Music size={24} className="animate-spin-slow" /> : <VolumeX size={24} />}
      <style>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
};

export default BackgroundMusic;
