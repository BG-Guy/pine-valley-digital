import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// On GitHub Pages a project site is served from /<repo-name>/, so built asset
// URLs need that prefix. Derived from the repo the workflow runs in, so
// renaming or forking the repo can't silently produce a blank page. Local
// dev and other hosts use '/'.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  base: process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : '/',
  plugins: [tailwindcss()],
})
