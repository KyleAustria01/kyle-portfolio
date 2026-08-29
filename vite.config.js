import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path is deploy-target dependent:
//   - Vercel / custom domain  -> "/"        (the default)
//   - GitHub Pages project site -> "/kyle-portfolio/" (set via VITE_BASE in CI)
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: process.env.VITE_BASE || '/',
})
