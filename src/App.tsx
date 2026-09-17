import { useState } from 'react';
import Envelope from './components/Envelope';
import HeroSection from './components/HeroSection';
import CountdownTimer from './components/CountdownTimer';
import Location from './components/Location';
import NotesAndContact from './components/NotesAndContact';
import SaveTheDate from './components/SaveTheDate';
import SiteFooter from './components/SiteFooter';
import LanguageSwitch from './components/LanguageSwitch';
import BackgroundMusic from './components/BackgroundMusic';
import MagicalDust from './components/MagicalDust';
import ScrollFallback from './components/ScrollFallback';

const OPEN_KEY = 'invitation-opened';

// Keep the invitation open if the page reloads anyway (e.g. browsers that ignore overscroll-behavior).
const wasOpened = () => {
  try {
    return sessionStorage.getItem(OPEN_KEY) === '1';
  } catch {
    return false;
  }
};

function App() {
  const [isOpen, setIsOpen] = useState(wasOpened);

  const handleOpen = () => {
    setIsOpen(true);
    try {
      sessionStorage.setItem(OPEN_KEY, '1');
    } catch {
      // Storage unavailable (private mode): the invitation still opens, it just won't survive a reload.
    }
  };

  return (
    <div className="app-container">
      <ScrollFallback />
      <LanguageSwitch />
      <BackgroundMusic />

      {isOpen && <MagicalDust />}

      <Envelope isOpen={isOpen} onOpen={handleOpen} />

      <div
        style={{
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
          pointerEvents: isOpen ? 'auto' : 'none',
          height: isOpen ? 'auto' : '100vh',
          overflow: isOpen ? 'auto' : 'hidden',
        }}
      >
        <HeroSection revealed={isOpen} />
        <div className="night">
          <CountdownTimer />
        </div>
        <Location />
        <NotesAndContact />
        <SaveTheDate />
        <SiteFooter />
      </div>
    </div>
  );
}

export default App;
