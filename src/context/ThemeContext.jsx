import { useState, useEffect, useMemo, useRef } from 'react';
import { ThemeContext } from './theme-context';

const STORAGE_KEY = 'kyle-portfolio-theme';
const MODES = ['light', 'dark', 'system'];
const GLITCH_MS = 560; // one cycle of the hover animation

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return MODES.includes(stored) ? stored : 'system';
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const apply = () => {
      const resolved = theme === 'system' ? (mq.matches ? 'dark' : 'light') : theme;
      document.documentElement.setAttribute('data-theme', resolved);
    };

    apply();
    localStorage.setItem(STORAGE_KEY, theme);

    // Only follow the OS while the user has chosen to.
    if (theme !== 'system') return undefined;
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);

  // Fire the same glitch the headings use on hover, once, on a theme change.
  // Skipped on first render — the stored theme applying on load is not a
  // change the viewer made.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return undefined;
    }
    const root = document.documentElement;
    root.classList.add('theme-glitching');
    const t = setTimeout(() => root.classList.remove('theme-glitching'), GLITCH_MS);
    return () => {
      clearTimeout(t);
      root.classList.remove('theme-glitching');
    };
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
