// Services section ("What we do"): an iOS-style expanding card row. Every
// service is a card in one horizontal row — the open card is wide and shows
// its details, the rest are narrow pills with a vertical title. Opening a
// card widens it while the previous one narrows and the row slides, all on
// one shared spring curve (see services.css), so the cards grow and move
// into their new positions together. Clicking the open card closes it,
// leaving every card a pill (the "overview"). The list itself lives in
// pages/services/servicesLandingData.ts, shared with the 14 service landing
// pages — edit services there, not here. Styles live in services.css.
import './services.css'
import { servicesLandingData as services, type ServiceLandingData } from '../../pages/services/servicesLandingData'
import { logoMark } from '../../components/logo/logo'

// Card art themes, cycled so neighbouring cards never share one.
const THEMES = ['purple', 'green', 'gold', 'ink']

// Two-digit service number ("01").
const pad = (n: number) => String(n).padStart(2, '0')

// Stroke arrow used by the row's buttons and each card's corner link.
const arrow = (dir: 'left' | 'right') => `
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="${dir === 'right' ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'}" />
  </svg>`

// The open card's close icon.
const closeIcon = `
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>`

// One card: a clipped, rounded layer (art, the pill's trigger with its
// vertical title, the open card's body) plus the corner link, which sits
// outside the clip (see .svc-socket in services.css). Only one half is live
// at a time — the other is inert, so it's out of the tab order and the
// accessibility tree.
const renderCard = (s: ServiceLandingData, i: number) => {
  const open = i === 0
  return `
          <li class="svc-card svc-theme-${THEMES[i % THEMES.length]}${open ? ' is-active' : ''}">
            <div class="svc-clip">
              <div class="svc-art" aria-hidden="true"></div>
              <button type="button" class="svc-trigger" aria-expanded="${open}" aria-controls="svc-body-${i}"${open ? ' inert' : ''}>
                <span class="svc-label-n" aria-hidden="true">${pad(i + 1)}</span>
                <span class="svc-label-t">${s.navTitle}</span>
              </button>
              <div class="svc-body" id="svc-body-${i}" role="region" aria-labelledby="svc-title-${i}"${open ? '' : ' inert'}>
                <div>
                  <span class="svc-body-n" aria-hidden="true">${pad(i + 1)}</span>
                  <h3 class="svc-body-title" id="svc-title-${i}" tabindex="-1">${s.navTitle}</h3>
                  <p class="svc-body-copy">${s.shortCopy}</p>
                </div>
                <ul class="svc-teasers">
                  ${s.teasers.map((t) => `<li>${t}</li>`).join('')}
                </ul>
                ${logoMark('svc-mark')}
                <button type="button" class="svc-close" aria-label="Close ${s.navTitle}">${closeIcon}</button>
              </div>
            </div>
            <div class="svc-socket"${open ? '' : ' inert'}>
              <a class="svc-go" href="/services/${s.slug}.html" aria-label="View ${s.navTitle}">${arrow('right')}</a>
            </div>
          </li>`
}

// Markup: heading with the service count, the card row, then the controls
// (counter, page dots, prev/next) and a screen-reader announcement line.
// --svc-n (the card count) feeds the overview's equal-width pill maths.
export const renderServices = () => `
    <section id="services" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-10">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">What we <span class="text-[var(--color-accent-2)]">do</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(${pad(services.length)})</span>
        </div>

        <div id="svc" class="svc reveal">
          <div id="svc-viewport" class="svc-viewport" style="--svc-n: ${services.length}">
            <ol id="svc-track" class="svc-track" style="--svc-shift: 0" aria-label="Services">
              ${services.map(renderCard).join('')}
            </ol>
          </div>

          <div class="svc-controls">
            <span id="svc-counter" class="svc-counter">01 / ${pad(services.length)}</span>
            <div class="svc-dots">
              ${services
                .map(
                  (s, i) =>
                    `<button type="button" class="svc-dot" tabindex="-1" aria-label="${s.navTitle}" aria-current="${i === 0}"></button>`
                )
                .join('')}
            </div>
            <div class="svc-arrows">
              <button type="button" id="svc-prev" class="svc-arrow" aria-label="Previous service">${arrow('left')}</button>
              <button type="button" id="svc-next" class="svc-arrow" aria-label="Next service">${arrow('right')}</button>
            </div>
          </div>
          <p id="svc-live" class="sr-only" aria-live="polite"></p>
        </div>
      </div>
    </section>
`

// Converts a CSS length read from a custom property ("2.75rem", "44px")
// to pixels.
const toPx = (value: string) => {
  const v = value.trim()
  if (v.endsWith('rem')) return parseFloat(v) * parseFloat(getComputedStyle(document.documentElement).fontSize)
  return parseFloat(v) || 0
}

// Wires up the row: opening pills, closing the open card (click, close
// button, Escape), page dots, prev/next, arrow/Home/End keys, touch
// swipes, and re-layout on resize. Call after the markup is in the DOM.
export function initServices() {
  const root = document.getElementById('svc')
  const viewport = document.getElementById('svc-viewport')
  const track = document.getElementById('svc-track')
  const counter = document.getElementById('svc-counter')
  const live = document.getElementById('svc-live')
  const prevBtn = document.getElementById('svc-prev')
  const nextBtn = document.getElementById('svc-next')
  if (!root || !viewport || !track || !counter || !live || !prevBtn || !nextBtn) return

  const cards = Array.from(track.querySelectorAll<HTMLElement>('.svc-card'))
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('.svc-dot'))
  const triggerOf = (i: number) => cards[i].querySelector<HTMLButtonElement>('.svc-trigger')!
  const count = cards.length
  let active = 0 // the current service (open, or last open while closed)
  let open = true // false = overview: every card is a pill
  let overviewShift = 0

  // How many pills sit beside the open card at this breakpoint. Set in
  // services.css (--svc-p) and read here, so CSS and JS can't disagree.
  const pillsInView = () => parseInt(getComputedStyle(viewport).getPropertyValue('--svc-p'), 10) || 1

  // Which card the row starts at: one pill of context before the open card
  // (when more than one pill fits), clamped so the row never slides past
  // its first or last card — so the open card sits left at the start and
  // right at the end, like the reference.
  const shiftFor = (index: number) => {
    const pills = pillsInView()
    const leadIn = pills > 1 ? 1 : 0
    return Math.min(Math.max(index - leadIn, 0), Math.max(count - 1 - pills, 0))
  }

  // In the overview every pill shares the row equally (desktop, tablet), or
  // keeps a minimum width and overflows (phones). This is how many
  // pill-steps the row can slide before its last card meets the right edge
  // — mirrors --svc-wo in services.css.
  function maxOverviewShift() {
    const width = viewport!.clientWidth
    const gap = parseFloat(getComputedStyle(track!).columnGap) || 0
    const minPill = toPx(getComputedStyle(viewport!).getPropertyValue('--svc-wo-min'))
    const pill = Math.max(minPill, (width - (count - 1) * gap) / count)
    const overflow = count * pill + (count - 1) * gap - width
    return overflow > 0.5 ? Math.ceil(overflow / (pill + gap)) : 0
  }

  // Open layout: slide the row to the open card, and keep only the
  // on-screen pills in the tab order (off-screen ones stay reachable via
  // arrows, keys, dots).
  function layout() {
    const shift = shiftFor(active)
    const last = shift + pillsInView()
    track!.style.setProperty('--svc-shift', String(shift))
    cards.forEach((_, i) => {
      triggerOf(i).tabIndex = i >= shift && i <= last ? 0 : -1
    })
  }

  // Overview layout: every pill is tabbable; on phones (where the row
  // overflows) slide so the given card is in view, with two before it.
  function layoutOverview(shift = active - 2) {
    overviewShift = Math.min(Math.max(shift, 0), maxOverviewShift())
    track!.style.setProperty('--svc-shift', String(overviewShift))
    cards.forEach((_, i) => {
      triggerOf(i).tabIndex = 0
    })
  }

  // Opens or closes one card: swaps which half (pill trigger vs. body and
  // corner link) is inert.
  function setOpen(card: HTMLElement, isOpen: boolean) {
    card.classList.toggle('is-active', isOpen)
    const trigger = card.querySelector('.svc-trigger')!
    trigger.toggleAttribute('inert', isOpen)
    trigger.setAttribute('aria-expanded', String(isOpen))
    card.querySelector('.svc-body')!.toggleAttribute('inert', !isOpen)
    card.querySelector('.svc-socket')!.toggleAttribute('inert', !isOpen)
  }

  // Gives a resizing card's art its own compositor layer for the length of
  // the spring, so it's moved rather than repainted every frame.
  const settleTimers = new WeakMap<HTMLElement, number>()
  function markAnimating(card: HTMLElement) {
    card.classList.add('is-animating')
    clearTimeout(settleTimers.get(card))
    settleTimers.set(card, window.setTimeout(() => card.classList.remove('is-animating'), 900))
  }

  // Opens card `index` (wrapping at either end), from either state.
  // Everything that moves — the widths and the row's slide — changes in
  // this one frame, so the CSS transitions all start together on the same
  // curve.
  function activate(index: number) {
    const target = (index + count) % count
    if (open && target === active) return
    const focusWasInRow = track!.contains(document.activeElement)

    if (open) {
      markAnimating(cards[active])
      setOpen(cards[active], false)
    }
    markAnimating(cards[target])
    setOpen(cards[target], true)
    active = target
    open = true
    root!.classList.remove('is-overview')
    layout()

    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === target)))
    counter!.textContent = `${pad(target + 1)} / ${pad(count)}`
    live!.textContent = `${services[target].navTitle}, ${target + 1} of ${count}`

    // Focus inside the row was on a card that just changed state — move it
    // to the open card's heading rather than leaving it on an inert element.
    if (focusWasInRow) cards[target].querySelector<HTMLElement>('.svc-body-title')!.focus({ preventScroll: true })
  }

  // Closes the open card back into a pill, leaving every card a pill.
  function close() {
    if (!open) return
    const focusWasInRow = track!.contains(document.activeElement)

    markAnimating(cards[active])
    setOpen(cards[active], false)
    open = false
    root!.classList.add('is-overview')
    layoutOverview()
    live!.textContent = `All ${count} services`

    // The close button (or heading) that had focus is now inert — hand
    // focus to the card's pill so Enter reopens it.
    if (focusWasInRow) triggerOf(active).focus({ preventScroll: true })
  }

  cards.forEach((card, i) => {
    triggerOf(i).addEventListener('click', () => activate(i))
    // In the overview on phones, tabbing to an off-screen pill slides it
    // into view (the row is clipped, not scrollable, so it wouldn't
    // otherwise appear).
    triggerOf(i).addEventListener('focus', () => {
      if (!open) layoutOverview(i - 2)
    })
    // Clicking anywhere on the open card closes it — unless the click was
    // the end of selecting some of its text.
    card.querySelector('.svc-body')!.addEventListener('click', () => {
      if (window.getSelection()?.toString()) return
      close()
    })
  })
  dots.forEach((dot, i) => dot.addEventListener('click', () => activate(i)))
  prevBtn.addEventListener('click', () => activate(active - 1))
  nextBtn.addEventListener('click', () => activate(active + 1))

  // Arrow keys step, Home/End jump to the ends, Escape closes the open
  // card — anywhere inside the row or its controls.
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') activate(active + 1)
    else if (e.key === 'ArrowLeft') activate(active - 1)
    else if (e.key === 'Home') activate(0)
    else if (e.key === 'End') activate(count - 1)
    else if (e.key === 'Escape' && open) close()
    else return
    e.preventDefault()
  })

  // Touch swipe: with a card open, a horizontal flick steps one card
  // (stopping at the ends rather than wrapping); in the overview it slides
  // the row a few pills. Vertical drags still scroll the page, since the
  // viewport has touch-action: pan-y.
  let startX = 0
  let startY = 0
  let tracking = false
  let swiped = false
  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return
    tracking = true
    swiped = false
    startX = e.clientX
    startY = e.clientY
  })
  viewport.addEventListener('pointerup', (e) => {
    if (!tracking) return
    tracking = false
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
    swiped = true
    const step = dx < 0 ? 1 : -1
    if (open) activate(Math.min(Math.max(active + step, 0), count - 1))
    else layoutOverview(overviewShift + step * 3)
  })
  viewport.addEventListener('pointercancel', () => {
    tracking = false
  })
  // Don't let the end of a swipe also count as a tap on the card under it.
  viewport.addEventListener(
    'click',
    (e) => {
      if (!swiped) return
      swiped = false
      e.preventDefault()
      e.stopPropagation()
    },
    true
  )

  // A breakpoint change alters how many pills fit, so re-lay out — with
  // transitions off while resizing, since every width depends on the row's
  // width and would otherwise spring on each resize step.
  let resizeTimer = 0
  new ResizeObserver(() => {
    root.classList.add('is-resizing')
    if (open) layout()
    else layoutOverview(overviewShift)
    clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => root.classList.remove('is-resizing'), 150)
  }).observe(viewport)
}
