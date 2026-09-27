// Marquee: the endless scrolling banner of service names, separated by the
// pine logo. It speeds up with scroll velocity. Styles live in marquee.css.
import './marquee.css'
import { gsap } from 'gsap'
import { logoMark } from '../logo/logo'

// What the banner lists — a short version of the services section.
const marqueeItems = ['Web Design', 'Development', 'Brand Identity', 'SEO & Performance', 'Business Automation', 'Local SEO']

// Markup: the item list rendered twice, so translating the track by -50%
// loops seamlessly.
export const renderMarquee = () => `
    <div class="marquee-wrap border-y border-[var(--color-ink)]/10 py-4 overflow-hidden">
      <div class="marquee-track font-display text-2xl sm:text-3xl font-semibold">
        ${Array(2)
          .fill(
            marqueeItems
              .map(
                (item) =>
                  `<span class="flex items-center gap-6 pr-6"><span>${item}</span>${logoMark('marquee-pine')}</span>`
              )
              .join('')
          )
          .join('')}
      </div>
    </div>
`

// Starts the loop and, unless the user prefers reduced motion, ties its speed
// to scroll velocity. Call after the markup is in the DOM.
export function initMarquee() {
  const track = document.querySelector<HTMLElement>('.marquee-track')
  if (!track) return
  const loop = gsap.to(track, {
    xPercent: -50,
    duration: 33, // 22s when there were 4 items; scaled ×6/4 so px/s is unchanged
    ease: 'none',
    repeat: -1,
  })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Speed up with scroll velocity. Measured per frame from scrollY (rather
  // than ScrollTrigger's velocity, which only updates on scroll events) so
  // the boost also eases back down smoothly once scrolling stops.
  const BOOST_PER_PX = 0.375 // extra timeScale per px scrolled per 60fps frame
  const MAX_BOOST = 14
  let lastY = window.scrollY
  let boost = 0
  gsap.ticker.add(() => {
    const y = window.scrollY
    const pxPerFrame = Math.abs(y - lastY) / gsap.ticker.deltaRatio()
    lastY = y
    const target = Math.min(pxPerFrame * BOOST_PER_PX, MAX_BOOST)
    // Rise quickly, fall back slowly.
    boost += (target - boost) * (target > boost ? 0.2 : 0.06)
    loop.timeScale(1 + boost)
  })
}
