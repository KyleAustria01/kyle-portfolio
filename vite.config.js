import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages has no server-side rewrite, so a hard load of /blog or /systems
// would 404. Serving the same SPA shell as the 404 page makes deep links work
// while keeping the URL intact.
const spaFallback = () => ({
  name: 'spa-fallback',
  closeBundle() {
    copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'))
  },
})

// Base path is deploy-target dependent:
//   - custom domain / Vercel  -> "/"  (the default)
//   - GitHub Pages project site -> "/kyle-portfolio/" (set via VITE_BASE in CI)
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    spaFallback(),
  ],
  base: process.env.VITE_BASE || '/',
})
