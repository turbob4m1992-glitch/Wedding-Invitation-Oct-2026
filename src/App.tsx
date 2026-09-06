import { useState } from 'react';
import Envelope from './components/Envelope';
import HeroSection from './components/HeroSection';
import QuranVerse from './components/QuranVerse';
import InvitationDetails from './components/InvitationDetails';
import CountdownTimer from './components/CountdownTimer';
import Schedule from './components/Schedule';
import Location from './components/Location';
import NotesAndContact from './components/NotesAndContact';
import SaveTheDate from './components/SaveTheDate';
import SiteFooter from './components/SiteFooter';
import LanguageSwitch from './components/LanguageSwitch';
import BackgroundMusic from './components/BackgroundMusic';
import MagicalDust from './components/MagicalDust';
import ScrollFallback from './components/ScrollFallback';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-container">
      <ScrollFallback />
      <LanguageSwitch />
      <BackgroundMusic />

      {isOpen && <MagicalDust />}

      <Envelope isOpen={isOpen} onOpen={() => setIsOpen(true)} />

      <div
        style={{
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
          pointerEvents: isOpen ? 'auto' : 'none',
          height: isOpen ? 'auto' : '100vh',
          overflow: isOpen ? 'auto' : 'hidden',
        }}
      >
        <HeroSection />
        <QuranVerse />
        <InvitationDetails />
        <CountdownTimer />
        <Schedule />
        <Location />
        <NotesAndContact />
        <SaveTheDate />
        <SiteFooter />
      </div>
    </div>
  );
}

export default App;
