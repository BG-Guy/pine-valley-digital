// Hero section: the headline with its glitching "fast", the intro line and
// CTA, and the two colour orbs drifting in the background
// (components/hero-orbs). Styles live in hero.css.
import './hero.css'
import { renderHeroOrbs, initHeroOrbs } from '../../components/hero-orbs/heroOrbs'

// Markup: background orbs, eyebrow, two-line headline (with the four glitch
// slices for "fast"), intro copy, and the "See our work" link.
export const renderHero = () => `
    <section id="hero" class="relative overflow-hidden px-6 sm:px-10 pt-40 pb-24 sm:pt-52 sm:pb-32">
      ${renderHeroOrbs()}
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
  const hero = document.getElementById('hero')
  if (hero) initHeroOrbs(hero)
  setupHeroGlitch()
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
