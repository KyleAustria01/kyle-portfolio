import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { ViewModeProvider } from './context/ViewModeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViewModeProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ViewModeProvider>
  </StrictMode>,
)
