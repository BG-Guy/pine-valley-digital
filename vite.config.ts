import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // The site is served from the custom domain https://pinevalleydigital.com/
  // (set in the repo's Pages settings), i.e. from the root. A '/<repo-name>/'
  // prefix would 404 every asset there and leave a blank page.
  base: '/',
  plugins: [tailwindcss()],
})
