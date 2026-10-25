// Tape: the tilted lemon caution tape that runs across the edge under a
// hero, listing the services with Pine Pal between them. It loops on
// its own, speeds up with scroll velocity, and freezes while it's off
// screen. Its pause button stops every ambient motion on the page (the
// tape and the stickers, via html[data-motion="paused"]) — moving content
// needs a way to stop it (WCAG 2.2.2). With reduced motion it stands still
// and the button stays hidden. Replaces the old marquee. Styles live in
// tape.css.
import './tape.css'
import { gsap } from 'gsap'
import { pinePal } from '../mascots/mascots'

// What the tape lists — a short version of the services.
const ITEMS = ['Web Design', 'Development', 'Brand Identity', 'SEO & Performance', 'Business Automation', 'Local SEO']

// One copy of the list; the second copy (hidden from screen readers) makes
// translating the track by -50% loop seamlessly.
const list = (hidden: boolean) => `
          <ul class="nb-tape-list"${hidden ? ' aria-hidden="true"' : ' aria-label="What we do"'}>
            ${ITEMS.map((item) => `<li>${item}${pinePal('nb-tape-pine')}</li>`).join('')}
          </ul>`

export const renderTape = () => `
    <div class="nb-tape-wrap" data-tape>
      <div class="nb-tape">
        <div class="nb-tape-track">${list(false)}${list(true)}
        </div>
      </div>
      <button type="button" class="nb-press nb-tape-pause" aria-label="Pause animations" aria-pressed="false" hidden>
        <span class="nb-face">
          <svg class="nb-icon-pause" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5v14M16 5v14" /></svg>
          <svg class="nb-icon-play" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M7 5l12 7-12 7z" /></svg>
        </span>
      </button>
    </div>
`

// Seconds per loop at rest. The theme's motion is the loud one, so it moves
// briskly; scrolling speeds it up further.
const LOOP_SECONDS = 16
const BOOST_PER_PX = 0.375 // extra timeScale per px scrolled per 60fps frame
const MAX_BOOST = 14

// Starts every tape on the page. Call after the markup is in the DOM.
export function initTape() {
  const tapes = Array.from(document.querySelectorAll<HTMLElement>('[data-tape]'))
  if (!tapes.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // One shared paused state: it stops every tape and, through the
  // attribute on <html>, the stickers too.
  let paused = false
  const loops = tapes.map((wrap) => {
    const track = wrap.querySelector<HTMLElement>('.nb-tape-track')!
    const loop = gsap.to(track, { xPercent: -50, duration: LOOP_SECONDS, ease: 'none', repeat: -1 })
    let onScreen = true
    const sync = () => (paused || !onScreen ? loop.pause() : loop.play())
    new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    }).observe(wrap)

    const button = wrap.querySelector<HTMLButtonElement>('.nb-tape-pause')!
    button.hidden = false
    button.addEventListener('click', () => {
      paused = !paused
      if (paused) document.documentElement.setAttribute('data-motion', 'paused')
      else document.documentElement.removeAttribute('data-motion')
      tapes.forEach((t) => {
        const b = t.querySelector<HTMLButtonElement>('.nb-tape-pause')!
        b.setAttribute('aria-pressed', String(paused))
        b.setAttribute('aria-label', paused ? 'Play animations' : 'Pause animations')
      })
      loops.forEach((l) => l.sync())
    })
    return { loop, sync }
  })

  // Speed up with scroll velocity. Measured per frame from scrollY (rather
  // than ScrollTrigger's velocity, which only updates on scroll events) so
  // the boost also eases back down smoothly once scrolling stops.
  let lastY = window.scrollY
  let boost = 0
  gsap.ticker.add(() => {
    const y = window.scrollY
    const pxPerFrame = Math.abs(y - lastY) / gsap.ticker.deltaRatio()
    lastY = y
    const target = Math.min(pxPerFrame * BOOST_PER_PX, MAX_BOOST)
    // Rise quickly, fall back slowly.
    boost += (target - boost) * (target > boost ? 0.2 : 0.06)
    loops.forEach((l) => l.loop.timeScale(1 + boost))
  })
}
