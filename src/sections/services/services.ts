// Services section ("What we do"): a morphing feature carousel — one
// expanded panel for the active service, a scrollable rail of the rest,
// arrow + keyboard navigation, and a progress bar. The list itself lives in
// pages/services/servicesLandingData.ts — the single source of truth for
// both this section and the 14 services/*.html pages, so the two can't
// drift out of sync. To add or edit a service, change that file, not this
// one. Styles live in services.css.
import './services.css'
import { gsap } from 'gsap'
import { servicesLandingData as services } from '../../pages/services/servicesLandingData'

// Cycled across services for the panel's abstract background wash —
// mirrors the brand's purple/green/gold trio (see hero.css, lab.css).
const PALETTE = [
  { a: '108 59 170', b: '59 170 153' }, // accent -> accent-2
  { a: '59 170 153', b: '217 164 65' }, // accent-2 -> gold
  { a: '217 164 65', b: '108 59 170' }, // gold -> accent
]

// Markup: heading with the service count, then the carousel shell. The
// panel/rail/controls are filled in by initServices() once the DOM exists —
// rendering 14 items' worth of interactive state as a template string here
// would duplicate what the JS already has to do on every navigation.
export const renderServices = () => `
    <section id="services" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-10">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">What we <span class="text-[var(--color-accent-2)]">do</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(${String(services.length).padStart(2, '0')})</span>
        </div>

        <div id="svc-carousel" class="svc-carousel reveal">
          <div class="svc-bg" aria-hidden="true"></div>
          <div class="svc-stage">
            <a href="#" id="svc-main" class="svc-main">
              <div>
                <span id="svc-main-index" class="svc-main-index"></span>
                <h3 id="svc-main-title" class="svc-main-title"></h3>
                <p id="svc-main-copy" class="svc-main-copy"></p>
              </div>
              <span class="svc-main-cta hero-cta inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                View service <span aria-hidden="true">&rarr;</span>
              </span>
            </a>
            <div id="svc-rail" class="svc-rail" role="list" aria-label="Other services"></div>
          </div>
          <div class="svc-controls">
            <button type="button" id="svc-prev" class="svc-arrow" aria-label="Previous service">&larr;</button>
            <div class="svc-progress"><div id="svc-progress-fill" class="svc-progress-fill"></div></div>
            <span id="svc-counter" class="svc-counter" aria-live="polite"></span>
            <button type="button" id="svc-next" class="svc-arrow" aria-label="Next service">&rarr;</button>
          </div>
        </div>
      </div>
    </section>
`

// Wires up the carousel: click-to-promote rail cards, prev/next arrows,
// left/right arrow keys, and the abstract background. Call after the
// markup is in the DOM.
export function initServices() {
  const carousel = document.getElementById('svc-carousel')
  const main = document.getElementById('svc-main') as HTMLAnchorElement | null
  const mainIndex = document.getElementById('svc-main-index')
  const mainTitle = document.getElementById('svc-main-title')
  const mainCopy = document.getElementById('svc-main-copy')
  const rail = document.getElementById('svc-rail')
  const prevBtn = document.getElementById('svc-prev')
  const nextBtn = document.getElementById('svc-next')
  const progressFill = document.getElementById('svc-progress-fill')
  const counter = document.getElementById('svc-counter')
  if (!carousel || !main || !mainIndex || !mainTitle || !mainCopy || !rail || !prevBtn || !nextBtn || !progressFill || !counter) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let activeIndex = 0

  function renderMain() {
    const s = services[activeIndex]
    main!.href = `/services/${s.slug}.html`
    mainIndex!.textContent = String(activeIndex + 1).padStart(2, '0')
    mainTitle!.textContent = s.navTitle
    mainCopy!.textContent = s.shortCopy
  }

  function renderRail() {
    rail!.innerHTML = services
      .map(
        (s, i) =>
          i === activeIndex
            ? ''
            : `<button type="button" class="svc-card" role="listitem" data-index="${i}">
                 <span class="svc-card-index">${String(i + 1).padStart(2, '0')}</span>
                 <span class="svc-card-title">${s.navTitle}</span>
               </button>`
      )
      .join('')

    rail!.querySelectorAll<HTMLButtonElement>('.svc-card').forEach((card) => {
      card.addEventListener('click', () => promote(Number(card.dataset.index)))
    })

    if (!reduceMotion) {
      gsap.from(rail!.children, { opacity: 0, y: 8, duration: 0.3, stagger: 0.02, ease: 'power2.out' })
    }
  }

  function updateProgress() {
    progressFill!.style.width = `${((activeIndex + 1) / services.length) * 100}%`
    counter!.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(services.length).padStart(2, '0')}`
  }

  function updateBackground() {
    const { a, b } = PALETTE[activeIndex % PALETTE.length]
    carousel!.style.setProperty('--svc-a', `rgb(${a})`)
    carousel!.style.setProperty('--svc-b', `rgb(${b})`)
  }

  function render() {
    renderMain()
    renderRail()
    updateProgress()
    updateBackground()
  }

  // The "morph": the main panel shrinks and fades, its content swaps while
  // hidden, then it springs back in — a cheap stand-in for a full FLIP
  // animation that reads the same way without tracking DOM positions.
  function promote(index: number) {
    if (index === activeIndex || index < 0 || index >= services.length) return
    activeIndex = index

    if (reduceMotion) {
      render()
      return
    }

    gsap
      .timeline()
      .to(main, { opacity: 0, scale: 0.96, duration: 0.16, ease: 'power2.in' })
      .call(render)
      .to(main, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)' })
  }

  prevBtn.addEventListener('click', () => promote((activeIndex - 1 + services.length) % services.length))
  nextBtn.addEventListener('click', () => promote((activeIndex + 1) % services.length))

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') promote((activeIndex - 1 + services.length) % services.length)
    if (e.key === 'ArrowRight') promote((activeIndex + 1) % services.length)
  })

  render()
}
