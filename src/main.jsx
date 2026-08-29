import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';

// Real deploys use clean paths. Preview builds (VITE_HASH_ROUTER=1) are served
// from a URL we don't control, so they fall back to hash routing.
const useHash = Boolean(import.meta.env.VITE_HASH_ROUTER);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {useHash ? (
      <HashRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HashRouter>
    ) : (
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    )}
  </StrictMode>,
);
