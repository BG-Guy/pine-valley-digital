// Brand logo pieces (pine mark + wordmark), returned as HTML strings so they
// can be dropped into any markup — the navbar, footer, preloader, and marquee.

// Pine tree nestled in a valley — the two slopes are separate strokes at
// 80% opacity with round caps that share an endpoint, so they naturally
// alpha-blend into a distinct third color right where they meet, while
// each slope stays its own clean hue everywhere else along its length.
// The tree stays in currentColor so it adapts to light/dark backgrounds.
export const logoMark = (className: string) => `
  <svg class="${className}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 18 L24 42" stroke="#6C3BAA" stroke-opacity="0.8" stroke-width="4.5" stroke-linecap="round" />
    <path d="M43 18 L24 42" stroke="#3BAA99" stroke-opacity="0.8" stroke-width="4.5" stroke-linecap="round" />
    <path d="M24 17 L35 29 L13 29 Z" fill="currentColor" />
    <path d="M24 12 L32 22 L16 22 Z" fill="currentColor" />
    <path d="M24 8 L28 16 L20 16 Z" fill="currentColor" />
    <rect x="21" y="29" width="6" height="7" rx="1" fill="currentColor" />
  </svg>
`

// Logotype: an italic serif for "Pine Valley" (the place) against the bold
// grotesque for "Digital" (the craft) — same typographic pairing as the
// body copy, deliberately contrasted for the wordmark itself.
export const logoWordmark = (sizeClass: string) => `
  <span class="inline-flex items-baseline gap-[0.3em] leading-none ${sizeClass}">
    <span class="font-logo italic font-medium">Pine Valley</span>
    <span class="font-display font-extrabold tracking-tight">Digital</span>
  </span>
`
