// Hero section: the headline with its glitching "fast", the intro line and
// CTA, and the two color blobs drifting in the background. Styles live in
// hero.css.
import './hero.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Markup: background blobs, eyebrow, two-line headline (with the four glitch
// slices for "fast"), intro copy, and the "See our work" link.
export const renderHero = () => `
    <section id="hero" class="relative overflow-hidden px-6 sm:px-10 pt-40 pb-24 sm:pt-52 sm:pb-32">
      <div class="hero-blob hero-blob-a" aria-hidden="true"></div>
      <div class="hero-blob hero-blob-b" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-7xl">
        <p class="hero-eyebrow overflow-hidden">
          <span class="block text-sm font-semibold uppercase tracking-[0.2em] text-ink/60">Web design &amp; development studio</span>
        </p>
        <h1 class="font-display font-extrabold tracking-tight mt-6 text-[13vw] leading-[0.95] sm:text-[7.5vw] sm:leading-[0.92]">
          <span class="hero-line block overflow-hidden"><span class="block">We build
            <span class="hero-fast">
              <span class="hero-fast-base">fast</span>
              <span class="hero-fast-slice s1" aria-hidden="true">fast</span>
              <span class="hero-fast-slice s2" aria-hidden="true">fast</span>
              <span class="hero-fast-slice s3" aria-hidden="true">fast</span>
              <span class="hero-fast-slice s4" aria-hidden="true">fast</span>
            </span>,</span></span>
          <span class="hero-line block overflow-hidden"><span class="block">modern websites<span class="text-[var(--color-accent)]">.</span></span></span>
        </h1>
        <div class="hero-sub mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <p class="max-w-md text-lg text-ink/70">
            Pine Valley Digital designs and builds lean, high-performance websites for
            studios, founders, and small teams who need to move fast without looking cheap.
          </p>
          <a href="#work" class="hero-cta shrink-0 inline-flex items-center text-sm font-semibold uppercase tracking-wide">
            See our work
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>
    </section>
`

// Starts the hero's ambient motion. Call after the markup is in the DOM.
export function initHero() {
  setupHeroBlobs()
  setupHeroGlitch()
}

// The two hero blobs glide to each other's spot and back, forever. Only
// `transform` is animated (composited, no repaint); the travel distance is
// measured from layout so it holds at every breakpoint, and rebuilt on
// resize (ScrollTrigger's 'refresh') with the loop position preserved.
function setupHeroBlobs() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const a = document.querySelector<HTMLElement>('.hero-blob-a')
  const b = document.querySelector<HTMLElement>('.hero-blob-b')
  if (!a || !b) return

  // offsetLeft/Top ignore transforms, so this is the resting centre.
  const center = (el: HTMLElement) => ({
    x: el.offsetLeft + el.offsetWidth / 2,
    y: el.offsetTop + el.offsetHeight / 2,
  })
  const loop = { duration: 7.7, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 1 }

  let tweens: gsap.core.Tween[] = []
  const build = () => {
    const time = tweens[0]?.totalTime() ?? 0
    tweens.forEach((t) => t.kill())
    gsap.set([a, b], { x: 0, y: 0 })
    const ca = center(a)
    const cb = center(b)
    const dx = cb.x - ca.x
    const dy = cb.y - ca.y
    tweens = [gsap.to(a, { x: dx, y: dy, ...loop }), gsap.to(b, { x: -dx, y: -dy, ...loop })]
    tweens.forEach((t) => t.totalTime(time))
  }
  build()
  ScrollTrigger.addEventListener('refresh', build)
}

// Fires the "fast" glitch burst on a slow interval (the CSS does the tearing;
// this just toggles the class that triggers it).
function setupHeroGlitch() {
  const target = document.querySelector<HTMLElement>('.hero-fast')
  if (!target) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const fire = () => {
    target.classList.add('is-glitching')
    setTimeout(() => target.classList.remove('is-glitching'), 550)
  }

  // First burst after the hero's own load-in settles, then a slow repeat —
  // present, not a tic.
  setTimeout(fire, 3000)
  setInterval(fire, 6000)
}
