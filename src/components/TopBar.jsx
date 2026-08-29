import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import Glitch from './Glitch';

const themeModes = [
  { id: 'light', Icon: Sun, label: 'Light theme' },
  { id: 'dark', Icon: Moon, label: 'Dark theme' },
  { id: 'system', Icon: Monitor, label: 'Match system theme' },
];

const links = [
  { id: 'summary', label: 'summary' },
  { id: 'stack', label: 'stack' },
  { id: 'record', label: 'record' },
  { id: 'systems', label: 'systems' },
  { id: 'contact', label: 'contact' },
];

export default function TopBar({ onAsk, onType }) {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('summary');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = links[0].id;
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };

  return (
    <header className={`topbar${scrolled ? ' scrolled' : ''}`}>
      <div className="topbar-inner">
        <a
          href="#top"
          className="topbar-brand"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Glitch text="Kyle Austria" />
        </a>

        <nav className="topbar-nav">
          {links.map(({ id, label }) => (
            <button
              key={id}
              className={`topbar-link${active === id ? ' active' : ''}`}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <button className="shortcut-btn" onClick={onAsk}>
            <span>ask anything</span>
            <kbd>alt</kbd>
            <kbd>A</kbd>
          </button>
          <button className="shortcut-btn" onClick={onType}>
            <span>typing test</span>
            <kbd>alt</kbd>
            <kbd>Q</kbd>
          </button>

          <div className="theme-switch" role="group" aria-label="Theme">
            {themeModes.map((mode) => (
              <button
                key={mode.id}
                className={`theme-opt${theme === mode.id ? ' active' : ''}`}
                onClick={() => setTheme(mode.id)}
                aria-label={mode.label}
                aria-pressed={theme === mode.id}
                title={mode.label}
              >
                <mode.Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
