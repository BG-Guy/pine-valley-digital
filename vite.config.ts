import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Multi-page site: every top-level .html file, plus every services/*.html
// file, is its own build entry. Scanned at build time instead of listed by
// hand — the services/ folder holds 14+ near-identical pages (see
// src/pages/services/), so a manual list here would be one more place to
// forget to update when a service is added.
const root = import.meta.dirname

const serviceEntries = Object.fromEntries(
  readdirSync(resolve(root, 'services'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => [`services/${f.replace('.html', '')}`, resolve(root, 'services', f)])
)

export default defineConfig({
  // The site is served from the custom domain https://pinevalleydigital.com/
  // (set in the repo's Pages settings), i.e. from the root. A '/<repo-name>/'
  // prefix would 404 every asset there and leave a blank page.
  base: '/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        lab: resolve(root, 'lab.html'),
        ...serviceEntries,
      },
    },
  },
})
