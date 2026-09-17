/**
 * Background music shared by the envelope (which starts it on open) and the
 * floating music button (which toggles it). The audio file is only fetched on
 * the first play, so guests who never hear it never download it.
 */

type Listener = () => void;

const VOLUME = 0.45;
const listeners = new Set<Listener>();

let audio: HTMLAudioElement | null = null;
let playing = false;
let fadeTimer: number | undefined;

const setPlaying = (value: boolean) => {
  if (playing === value) return;
  playing = value;
  listeners.forEach((listener) => listener());
};

const getAudio = () => {
  if (!audio) {
    audio = new Audio(`${import.meta.env.BASE_URL}angels-promise.m4a`);
    audio.loop = true;
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
  }
  return audio;
};

export const music = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  isPlaying: () => playing,

  /** Must be called from a tap or click, or the browser will refuse to play. */
  play(fadeInMs = 0) {
    const el = getAudio();
    window.clearInterval(fadeTimer);
    el.volume = fadeInMs ? 0 : VOLUME;

    el.play()
      .then(() => {
        if (!fadeInMs) return;
        const start = performance.now();
        fadeTimer = window.setInterval(() => {
          const progress = Math.min(1, (performance.now() - start) / fadeInMs);
          el.volume = VOLUME * progress;
          if (progress === 1) window.clearInterval(fadeTimer);
        }, 50);
      })
      .catch(() => {
        // Playback refused (e.g. silent mode or autoplay policy): the music button still works.
      });
  },

  pause() {
    window.clearInterval(fadeTimer);
    audio?.pause();
  },
};
