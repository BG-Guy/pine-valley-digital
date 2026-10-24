// Stickers: small SVG badges with a hard drop shadow that wiggle on their
// own (styles in components/press/press.css, .nb-sticker). Decorative unless
// given a label, in which case they're announced as an image.
interface StickerOptions {
  className?: string
  // Fill colour, any CSS colour or var().
  fill?: string
  // Accessible name; omit for a purely decorative sticker.
  label?: string
}

const a11y = (label?: string) => (label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"')

// A 22-point starburst, in a 100×100 box.
const BURST =
  '50,2 60.09,12.33 74,8.43 77.58,22.42 91.57,26 87.67,39.91 98,50 87.67,60.09 91.57,74 77.58,77.58 74,91.57 60.09,87.67 50,98 39.91,87.67 26,91.57 22.42,77.58 8.43,74 12.33,60.09 2,50 12.33,39.91 8.43,26 22.42,22.42 26,8.43 39.91,12.33'

// A round sticker with a dashed inner ring: a small line, a big word, a
// small line.
export const circleSticker = (
  [top, big, bottom]: [string, string, string],
  { className = '', fill = 'var(--color-mint)', label }: StickerOptions = {},
) => `<svg class="nb-sticker ${className}" viewBox="0 0 100 100" ${a11y(label)}><circle class="base" cx="50" cy="50" r="46" style="fill:${fill}"/><circle class="ring" cx="50" cy="50" r="39"/><text class="small" x="50" y="33" text-anchor="middle">${top}</text><text x="50" y="61" text-anchor="middle">${big}</text><text class="small" x="50" y="75" text-anchor="middle">${bottom}</text></svg>`

// A starburst: a small line over a big word.
export const burstSticker = (
  [small, big]: [string, string],
  { className = '', fill = 'var(--color-coral)', label }: StickerOptions = {},
) => `<svg class="nb-sticker ${className}" viewBox="0 0 100 100" ${a11y(label)}><polygon class="base" points="${BURST}" style="fill:${fill}"/><text class="small" x="50" y="43" text-anchor="middle">${small}</text><text x="50" y="70" text-anchor="middle" style="font-size:31px">${big}</text></svg>`
