import { useState, useEffect } from 'react';
import CRTOverlay from './components/CRTOverlay';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Summary from './components/Summary';
import Stack from './components/Stack';
import Record from './components/Record';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AskModal from './components/AskModal';
import TypingTest from './components/TypingTest';

export default function App() {
  const [askOpen, setAskOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  // Alt+A opens the assistant, Alt+Q the typing test. Keyed off e.code so the
  // binding survives layouts where Alt produces a different character.
  useEffect(() => {
    const onKey = (e) => {
      if (!e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.code === 'KeyA') {
        e.preventDefault();
        setTypeOpen(false);
        setAskOpen((o) => !o);
      } else if (e.code === 'KeyQ') {
        e.preventDefault();
        setAskOpen(false);
        setTypeOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Both overlays capture the viewport, so lock page scrolling behind them.
  useEffect(() => {
    const locked = typeOpen || askOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [typeOpen, askOpen]);

  return (
    <>
      <CRTOverlay />
      <TopBar onAsk={() => setAskOpen(true)} onType={() => setTypeOpen(true)} />
      <main className="page">
        <Hero />
        <Summary />
        <Stack />
        <Record />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <ScrollToTop />
      {askOpen && <AskModal onClose={() => setAskOpen(false)} />}
      {typeOpen && <TypingTest onClose={() => setTypeOpen(false)} />}
    </>
  );
}
