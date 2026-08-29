import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/useTheme';
import Glitch from './Glitch';

// Three destinations. The home page's own sections (summary, stack, record,
// contact) are reachable by scrolling, so they don't need nav entries.
const links = [
  { id: 'home', num: '01', label: 'home', to: '/' },
  { id: 'systems', num: '02', label: 'systems', to: '/systems' },
  { id: 'blog', num: '03', label: 'blog', to: '/blog' },
];

const themeModes = [
  { id: 'system', Icon: Monitor, label: 'Match system theme' },
  { id: 'light', Icon: Sun, label: 'Light theme' },
  { id: 'dark', Icon: Moon, label: 'Dark theme' },
];

export default function Sidebar({ onAsk, onType }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // "/" must match exactly, or home would light up on every page.
  const isActive = (link) => (link.to === '/' ? pathname === '/' : pathname.startsWith(link.to));

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
        <Link
          to="/"
          className="sidebar-brand"
          style={{ '--delay': '0ms' }}
          onClick={() => setOpen(false)}
        >
          <Glitch text="Kyle Austria" />
        </Link>

        <div className="sidebar-nav" style={{ '--delay': '70ms' }}>
          <div className="sidebar-group">
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                className={`sidebar-link${isActive(link) ? ' active' : ''}`}
                onClick={() => setOpen(false)}
                aria-current={isActive(link) ? 'page' : undefined}
              >
                <span className="sidebar-num">{link.num}</span>
                <span className="sidebar-label">{link.label}</span>
                <span className="sidebar-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
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
