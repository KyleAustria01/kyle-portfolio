import { useState, useEffect, useMemo } from 'react';
import { ThemeContext } from './theme-context';

const STORAGE_KEY = 'kyle-portfolio-theme';
const MODES = ['light', 'dark', 'system'];

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

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
