import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Served from https://bg-guy.github.io/pine-valley-digital/ on GitHub
  // Pages, so assets need that path prefix there; local dev and other
  // hosts use '/'.
  base: process.env.GITHUB_ACTIONS ? '/pine-valley-digital/' : '/',
  plugins: [tailwindcss()],
})
