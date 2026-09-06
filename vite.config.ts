import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built site works from any path:
// a GitHub Pages project site (user.github.io/repo/), a user site, or a custom domain.
export default defineConfig({
  base: './',
  plugins: [react()],
})
