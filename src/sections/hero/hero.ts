// Hero section, split in two: on the left the headline (its glitching
// "fast" stuck on a lemon highlight box, with Zap the lightning bolt on its
// corner), the intro and the two buttons; on the right a fanned stack of
// project cards that shuffles when clicked, with a "14 services" sticker.
// Styles live in hero.css.
import './hero.css'
import { projects } from '../work/work'
import { servicesLandingData } from '../../pages/services/servicesLandingData'
import { burstSticker } from '../../components/sticker/sticker'
import { zap } from '../../components/mascots/mascots'

const pad = (n: number) => String(n).padStart(2, '0')

const ARROW = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>`

// The stack's three cards, in the theme's fills, front to back.
const STACK = projects.slice(0, 3)
const FILLS = ['var(--color-lilac)', 'var(--color-mint)', 'var(--color-lemon)']

// One card: its tag and number, the project's name and its tagline. The
// whole card is the button that shuffles the stack (data-pos is its place
// in the fan, 0 = front).
const renderCard = (p: (typeof projects)[number], i: number) => `
            <button type="button" class="hero-card nb-press" data-pos="${i}" style="--nb-face: ${FILLS[i]}"
                    aria-label="${p.name}, ${p.tag}. Show the next project">
              <span class="nb-face hero-card-face">
                <span class="hero-card-top"><span class="hero-card-tag">${p.tag}</span><span class="hero-card-n">${pad(i + 1)}</span></span>
                <span class="hero-card-name">${p.name}</span>
                <span class="hero-card-foot"><span class="hero-card-title">${p.title}</span><span class="hero-card-go">${ARROW}</span></span>
              </span>
            </button>`

// Markup: eyebrow, two-line headline (with the four glitch slices for
// "fast"), intro copy and buttons; then the card stack. Each headline line
// and the eyebrow sit in a mask that the load-in (animations/pageLoad.ts)
// slides them up through.
export const renderHero = () => `
    <section id="hero" class="hero px-6 sm:px-10 pt-36 pb-28 sm:pt-44 sm:pb-32">
      <div class="hero-grid mx-auto max-w-7xl">
        <div class="hero-copy">
          <p class="hero-eyebrow"><span class="nb-pill">Web design &amp; development studio</span></p>
          <h1 class="hero-title font-display font-extrabold">
            <span class="hero-line"><span class="block">We build <span class="nb-mark hero-mark"><span class="hero-fast">
              <span class="hero-fast-base">fast</span>
              <span class="hero-fast-slice s1" aria-hidden="true">fast</span>
              <span class="hero-fast-slice s2" aria-hidden="true">fast</span>
              <span class="hero-fast-slice s3" aria-hidden="true">fast</span>
              <span class="hero-fast-slice s4" aria-hidden="true">fast</span>
            </span>${zap('hero-zap')}</span>,</span></span>
            <span class="hero-line"><span class="block">modern websites<span class="hero-dot">.</span></span></span>
          </h1>
          <div class="hero-sub">
            <p class="hero-lead">
              Pine Valley Digital designs and builds lean, high-performance websites for
              studios, founders, and small teams who need to move fast without looking cheap.
            </p>
            <div class="hero-ctas">
              <a href="#contact" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Start a project ${ARROW}</span></a>
              <a href="#work" class="nb-press nb-btn"><span class="nb-face">See our work <span aria-hidden="true">&darr;</span></span></a>
            </div>
          </div>
        </div>
        <div class="hero-stack" data-hero-stack>
          ${STACK.map(renderCard).join('')}
          ${burstSticker(['Services', String(servicesLandingData.length)], { className: 'hero-sticker', label: `${servicesLandingData.length} services` })}
        </div>
      </div>
    </section>
`

// Starts the hero's glitch and card stack. Call after the markup is in the
// DOM.
export function initHero() {
  setupHeroGlitch()
  setupHeroStack()
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

// Clicking any card in the stack sends the front card to the back and
// brings the next one forward (hero.css springs each card to its new
// place in the fan).
function setupHeroStack() {
  const stack = document.querySelector<HTMLElement>('[data-hero-stack]')
  if (!stack) return
  const cards = Array.from(stack.querySelectorAll<HTMLElement>('.hero-card'))
  stack.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('.hero-card')) return
    cards.forEach((card) => {
      const pos = Number(card.dataset.pos)
      card.dataset.pos = String((pos + cards.length - 1) % cards.length)
    })
  })
}
