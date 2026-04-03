import { useEffect } from 'react';
import { useViewMode } from './context/ViewModeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChatBot from './components/AIChatBot';
import DevLayout from './components/dev/DevLayout';

function App() {
  const { viewMode } = useViewMode();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [viewMode]);

  if (viewMode === 'dev') {
    return <DevLayout />;
  }

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Contact />
      </div>
      <Footer />
      <ScrollToTop />
      <AIChatBot />
    </>
  );
}

export default App;
