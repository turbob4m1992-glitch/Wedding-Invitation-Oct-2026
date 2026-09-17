/**
 * Optional background music, played only when a guest taps the music button.
 * The audio file is fetched on the first play, so guests who never turn it on
 * never download it.
 */

type Listener = () => void;

const VOLUME = 0.45;
const listeners = new Set<Listener>();

let audio: HTMLAudioElement | null = null;
let playing = false;

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
  play() {
    const el = getAudio();
    el.volume = VOLUME;
    el.play().catch(() => {
      // Playback refused (e.g. silent mode): the button simply stays off.
    });
  },

  pause() {
    audio?.pause();
  },
};
