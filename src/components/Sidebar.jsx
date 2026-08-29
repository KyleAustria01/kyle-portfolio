import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import Glitch from './Glitch';

// Grouped the way the page reads: who he is, what he's built, what he writes.
const groups = [
  [
    { id: 'summary', num: '01', label: 'summary' },
    { id: 'stack', num: '02', label: 'stack' },
  ],
  [
    { id: 'record', num: '03', label: 'record' },
    { id: 'systems', num: '04', label: 'systems' },
  ],
  [
    { id: 'blog', num: '05', label: 'blog' },
    { id: 'contact', num: '06', label: 'contact' },
  ],
];

const allLinks = groups.flat();

const themeModes = [
  { id: 'system', Icon: Monitor, label: 'Match system theme' },
  { id: 'light', Icon: Sun, label: 'Light theme' },
  { id: 'dark', Icon: Moon, label: 'Dark theme' },
];

export default function Sidebar({ onAsk, onType }) {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('summary');
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let current = allLinks[0].id;
      for (const { id } of allLinks) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile bar — takes over wherever the sidebar is hidden. */}
      <header className="mobilebar">
        <a
          href="#top"
          className="mobilebar-brand"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Kyle Austria
        </a>
        <button
          className="mobilebar-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </header>

      <nav className={`sidebar${open ? ' open' : ''} page-enter${entered ? ' entered' : ''}`}>
        <a
          href="#top"
          className="sidebar-brand"
          style={{ '--delay': '0ms' }}
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Glitch text="Kyle Austria" />
        </a>

        <div className="sidebar-nav" style={{ '--delay': '70ms' }}>
          {groups.map((group, gi) => (
            <div className="sidebar-group" key={gi}>
              {group.map(({ id, num, label }) => (
                <button
                  key={id}
                  className={`sidebar-link${active === id ? ' active' : ''}`}
                  onClick={() => go(id)}
                  aria-current={active === id ? 'true' : undefined}
                >
                  <span className="sidebar-num">{num}</span>
                  <span className="sidebar-label">{label}</span>
                  <span className="sidebar-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-shortcuts" style={{ '--delay': '160ms' }}>
          <button className="sidebar-shortcut" onClick={onAsk}>
            <span>Ask anything</span>
            <span className="keys">
              <kbd>alt</kbd>
              <kbd>A</kbd>
            </span>
          </button>
          <button className="sidebar-shortcut" onClick={onType}>
            <span>Typing test</span>
            <span className="keys">
              <kbd>alt</kbd>
              <kbd>Q</kbd>
            </span>
          </button>
        </div>

        <div className="sidebar-foot" style={{ '--delay': '230ms' }}>
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

          <p className="sidebar-contact-note">For work, collaborations, or anything else — reach me at</p>
          <a className="sidebar-email" href="mailto:kyleryanaustria@gmail.com">
            kyleryanaustria@gmail.com
          </a>
          <p className="sidebar-status">
            <span className="status-dot" />
            Available for work
          </p>
        </div>
      </nav>

      {open && <div className="sidebar-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
    </>
  );
}
