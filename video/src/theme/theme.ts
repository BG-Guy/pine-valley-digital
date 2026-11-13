// The site's neo-brutalist tokens (src/global.css), restated for the film.
// The film is drawn on a 1080px canvas and plays at about half that size on
// the page, so lines, shadows and corners are the site's values doubled.
import type { CSSProperties } from 'react'

// Canvas: square, and "framy" on purpose: 12 drawings a second, like
// hand-drawn animation shot on twos.
export const SIZE = 1080
export const FPS = 12

// Colours: the site's palette, then a few flat tones only the drawings use.
export const color = {
  ink: '#141210',
  paper: '#fff4dc',
  paperDim: '#f9e7bd',
  surface: '#fffaf0',
  lemon: '#ffe14d',
  lilac: '#c4a7ff',
  mint: '#7fe0b0',
  coral: '#ff7a5c',
  grid: 'rgba(20, 18, 16, 0.09)',
  skin: '#f4b58a',
  skinDeep: '#cf9068',
  sandDeep: '#efd08c',
  khaki: '#dfb86c',
  hair: '#3a2a20',
  // A shade deeper of each fill, for flat shading.
  lemonDeep: '#f3c62f',
  lilacDeep: '#a98bee',
  mintDeep: '#58cc99',
  coralDeep: '#e85f41',
}

// The heavy ink line and the hard shadow, with lighter versions for small
// parts.
export const line = { heavy: 8, mid: 6, thin: 4 }
export const drop = { heavy: 20, mid: 12, small: 8 }

// Bubbly corners: tags, then buttons and cards, then panels.
export const radius = { tag: 20, card: 36, panel: 56 }

// Graph-paper squares (the site's 28px, doubled).
export const GRID = 56

// The strip of paper between two stations. A station's closing edge sits in
// it, so that line only shows while the camera scrolls past.
export const GUTTER = 48

// Type: poster headings in condensed Bricolage capitals, Space Mono labels,
// Work Sans for running text.
export const font = {
  display: '"Bricolage Grotesque", "Arial Black", sans-serif',
  body: '"Work Sans", system-ui, sans-serif',
  mono: '"Space Mono", ui-monospace, monospace',
}

// The same tokens as CSS custom properties. The film's root sets them once,
// so the .css files next to each scene can use them.
export const cssVars = {
  '--ink': color.ink,
  '--paper': color.paper,
  '--paper-dim': color.paperDim,
  '--surface': color.surface,
  '--lemon': color.lemon,
  '--lilac': color.lilac,
  '--mint': color.mint,
  '--coral': color.coral,
  '--line-heavy': `${line.heavy}px`,
  '--line-mid': `${line.mid}px`,
  '--line-thin': `${line.thin}px`,
  '--drop-heavy': `${drop.heavy}px`,
  '--drop-mid': `${drop.mid}px`,
  '--drop-small': `${drop.small}px`,
  '--r-tag': `${radius.tag}px`,
  '--r-card': `${radius.card}px`,
  '--r-panel': `${radius.panel}px`,
  '--font-display': font.display,
  '--font-body': font.body,
  '--font-mono': font.mono,
} as CSSProperties
