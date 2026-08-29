import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CRTOverlay from './components/CRTOverlay';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AskModal from './components/AskModal';
import TypingTest from './components/TypingTest';
import Home from './pages/Home';
import Systems from './pages/Systems';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import CoverLetter from './pages/CoverLetter';

export default function App() {
  const [askOpen, setAskOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const { pathname } = useLocation();

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

  // Land at the top when moving between pages, unless deep-linking to a
  // section on the home page.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <CRTOverlay />
      <Sidebar onAsk={() => setAskOpen(true)} onType={() => setTypeOpen(true)} />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </main>
      <ScrollToTop />
      {askOpen && <AskModal onClose={() => setAskOpen(false)} />}
      {typeOpen && <TypingTest onClose={() => setTypeOpen(false)} />}
    </>
  );
}
