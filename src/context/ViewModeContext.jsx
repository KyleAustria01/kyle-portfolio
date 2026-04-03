import { createContext, useContext, useState, useEffect } from 'react';

const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('kyle-portfolio-view') || 'clean';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-view', viewMode);
    localStorage.setItem('kyle-portfolio-view', viewMode);
  }, [viewMode]);

  const toggleViewMode = () => setViewMode(prev => prev === 'clean' ? 'dev' : 'clean');

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) throw new Error('useViewMode must be used within ViewModeProvider');
  return context;
}
