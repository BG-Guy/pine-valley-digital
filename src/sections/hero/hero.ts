// Hero section, split in two: on the left the headline (its glitching
// "paid" stuck on a lemon highlight box, and Zap the lightning bolt perched
// on the closing full stop, winking when you point at the headline; the
// glitch's classes are still named hero-fast after the word it first sat
// on), the intro, the two
// buttons and a line of promises; on the right the film, a looping
// animation of a lead becoming a booked, finished job (heroFilm.ts), with a
// services-count sticker on its corner. Styles live in hero.css.
import './hero.css'
import { servicesLandingData } from '../../pages/services/servicesLandingData'
import { burstSticker } from '../../components/sticker/sticker'
import { zap } from '../../components/mascots/mascots'
import { renderHeroFilm, initHeroFilm } from './heroFilm'

// The trust line under the buttons: promises we keep on every project.
const TRUST = ['Fixed quote, no hidden fees', 'Live in 3 to 6 weeks', 'You own everything']

const ARROW = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>`

// Markup: eyebrow, three-line headline (with the four glitch slices for
// "fast"), intro copy and buttons; then the film and its sticker. Each
// headline line and the eyebrow sit in a mask that the load-in
// (animations/pageLoad.ts) slides them up through.
export const renderHero = () => `
    <section id="hero" class="hero px-6 sm:px-10 pt-36 pb-28 sm:pt-44 sm:pb-32">
      <div class="hero-grid mx-auto max-w-7xl">
        <div class="hero-copy">
          <p class="hero-eyebrow"><span class="nb-pill">Web design &amp; development studio</span></p>
          <h1 class="hero-title font-display font-extrabold wink-on-hover">
            <span class="hero-line"><span class="block">From first look</span></span>
            <span class="hero-line"><span class="block">to <span class="nb-mark hero-mark"><span class="hero-fast">
              <span class="hero-fast-base">paid</span>
              <span class="hero-fast-slice s1" aria-hidden="true">paid</span>
              <span class="hero-fast-slice s2" aria-hidden="true">paid</span>
              <span class="hero-fast-slice s3" aria-hidden="true">paid</span>
              <span class="hero-fast-slice s4" aria-hidden="true">paid</span>
            </span></span> job,</span></span>
            <span class="hero-line"><span class="block">we build it all<span class="hero-dot">.${zap('hero-zap')}</span></span></span>
          </h1>
          <div class="hero-sub">
            <p class="hero-lead">
              We design how your business looks, build where customers find you, and set up the
              tools that book, assign and invoice the work.
            </p>
            <div class="hero-ctas">
              <a href="#contact" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Book a free call ${ARROW}</span></a>
              <a href="#audit" class="nb-press nb-btn"><span class="nb-face">Free website check <span aria-hidden="true">&darr;</span></span></a>
            </div>
            <ul class="hero-trust">
              ${TRUST.map((t) => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="hero-stage">${renderHeroFilm()}
          ${burstSticker(['Services', String(servicesLandingData.length)], { className: 'hero-sticker', label: `${servicesLandingData.length} services` })}
        </div>
      </div>
    </section>
`

// Starts the hero's glitch and its film. Call after the markup is in the
// DOM.
export function initHero() {
  setupHeroGlitch()
  initHeroFilm()
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
