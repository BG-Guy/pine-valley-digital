import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // The site is served from the custom domain https://pinevalleydigital.com/
  // (set in the repo's Pages settings), i.e. from the root. A '/<repo-name>/'
  // prefix would 404 every asset there and leave a blank page.
  base: '/',
  plugins: [tailwindcss()],
  build: {
    // Multi-page site: every top-level .html file is its own build entry.
    // Add a line here when adding a new page (e.g. lab.html).
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        lab: resolve(import.meta.dirname, 'lab.html'),
      },
    },
  },
})
