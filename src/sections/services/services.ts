// Services section ("What we do"): an iOS-style expanding card row. Every
// service is a card in one horizontal row — the open card is wide and shows
// its details, the rest are pills with a vertical title. Opening a card
// widens it while the previous one narrows and the row glides, so the cards
// grow and move into their new positions together. Clicking the open card
// closes it back into a pill. The section is one screen tall: scrolling
// into it glides the page until it fills the screen, then the mouse wheel /
// trackpad moves the row sideways (bouncing at the ends) until a fresh
// scroll takes the page on; on touch screens the row drags and flings. The
// open card's background lines move (components/flowing-lines), a little
// differently on each card. The list itself lives in
// pages/services/servicesLandingData.ts, shared with the 14 service landing
// pages — edit services there, not here. Styles live in services.css.
import './services.css'
import { servicesLandingData as services, type ServiceLandingData } from '../../pages/services/servicesLandingData'
import { createFlowingLines, type FlowingLinesConfig } from '../../components/flowing-lines/flowingLines'
import { CARD_THEMES } from '../../components/card-art/cardArt'

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
          <li class="svc-card card-theme-${CARD_THEMES[i % CARD_THEMES.length]}${open ? ' is-active' : ''}">
            <div class="svc-clip">
              <div class="svc-art card-art card-lines" aria-hidden="true"></div>
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
                <button type="button" class="svc-close" aria-label="Close ${s.navTitle}">${closeIcon}</button>
              </div>
            </div>
            <div class="svc-socket"${open ? '' : ' inert'}>
              <a class="svc-go" href="/services/${s.slug}.html" aria-label="View ${s.navTitle}">${arrow('right')}</a>
            </div>
          </li>`
}

// Markup: heading with the service count, the card row and its scrollbar,
// then the controls (counter, page dots, prev/next) and a screen-reader
// announcement line. The section is sized to one screen in services.css
// (.svc-section).
export const renderServices = () => `
    <section id="services" class="svc-section px-6 sm:px-10">
      <div class="mx-auto w-full max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-10">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">What we <span class="text-[var(--color-accent-2)]">do</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(${pad(services.length)})</span>
        </div>

        <div id="svc" class="svc reveal">
          <div id="svc-viewport" class="svc-viewport">
            <ol id="svc-track" class="svc-track" aria-label="Services">
              ${services.map(renderCard).join('')}
            </ol>
          </div>

          <div id="svc-scroll" class="svc-scroll" role="scrollbar" aria-controls="svc-track" aria-orientation="horizontal"
               aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Services row">
            <span class="svc-scroll-track"></span>
            <span id="svc-thumb" class="svc-scroll-thumb"></span>
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

// Spring settings. LAYOUT is SwiftUI's default spring (~1% overshoot — the
// same curve services.css samples into --svc-ease): the card widths and the
// row's glide when a card opens or closes. SCROLL is quicker and bouncier
// (~5% overshoot), for following the wheel / a fling and springing back from
// a stretched end.
interface Spring {
  response: number
  damping: number
}
const LAYOUT_SPRING: Spring = { response: 0.55, damping: 0.825 }
const SCROLL_SPRING: Spring = { response: 0.38, damping: 0.68 }

// Wheel / trackpad scroll is multiplied by this before moving the row.
const WHEEL_SENSITIVITY = 2.5
// How far (in raw scroll px) a wheel gesture can stretch the row past an
// end, and how quickly (ms) that stretch eases off between wheel events.
const MAX_OVERSCROLL = 140
const STRETCH_RELAX = 120
// A pause this long (ms) between wheel events ends a scroll gesture; the
// next wheel event starts a new one.
const GESTURE_GAP = 300

// The moving lines: the provided effect, recoloured from its neon defaults
// to light tints of the site palette so it reads on all four card themes,
// and with its angles mirrored — the snippet's comments say the lines enter
// from down-left and exit up-right, but canvas y points down, so its
// defaults actually ran top-left to bottom-right, straight through the
// card's title.
const FLOW_LINES = {
  entryAngles: [152, 111] as [number, number],
  exitAngles: [352, 302] as [number, number],
  palette: [
    [254, 249, 231],
    [190, 236, 226],
    [120, 210, 196],
    [205, 170, 255],
    [255, 222, 150],
  ] as [number, number, number][],
  accentColor: [196, 140, 255] as [number, number, number],
}

// Card `i`'s own version of the lines: the bundle's tilt, spread and pinch
// point, its ripple, pace and number of lines, and which colour leads, all
// nudged by an amount fixed per card — so no two cards' lines move quite
// alike, and a card looks the same every time it opens.
function linesFor(i: number): Partial<FlowingLinesConfig> {
  // A repeatable pseudo-random value between min and max, for this card and
  // the given setting.
  const pick = (setting: number, min: number, max: number) => {
    const x = Math.sin((i + 1) * 12.9898 + setting * 78.233) * 43758.5453
    return min + (x - Math.floor(x)) * (max - min)
  }
  const tilt = pick(1, -14, 14)
  const spread = pick(2, 0.75, 1.3)
  const fan = ([from, to]: [number, number]): [number, number] => {
    const mid = (from + to) / 2 + tilt
    const half = ((to - from) / 2) * spread
    return [mid - half, mid + half]
  }
  const lead = i % FLOW_LINES.palette.length
  return {
    ...FLOW_LINES,
    entryAngles: fan(FLOW_LINES.entryAngles),
    exitAngles: fan(FLOW_LINES.exitAngles),
    pinch: { x: pick(3, 0.56, 0.76), y: pick(4, 0.36, 0.58) },
    lineCount: Math.round(pick(5, 22, 34)),
    bunch: pick(6, 14, 32),
    curveAmount: pick(7, 10, 34),
    waveAmp: pick(8, 22, 42),
    waveFreq: pick(9, 1.8, 3.2),
    waveSpeed: pick(10, 0.35, 0.8),
    breathPeriod: pick(11, 7, 12),
    highlightPeriod: pick(12, 4, 6.5),
    palette: [...FLOW_LINES.palette.slice(lead), ...FLOW_LINES.palette.slice(0, lead)],
  }
}

// Converts a CSS length read from a custom property ("7rem", "44px") to px.
const toPx = (value: string) => {
  const v = value.trim()
  if (v.endsWith('rem')) return parseFloat(v) * parseFloat(getComputedStyle(document.documentElement).fontSize)
  return parseFloat(v) || 0
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

// iOS-style rubber band: the further past the end, the less it gives.
const rubber = (past: number, size: number) => Math.sign(past) * (1 - 1 / ((Math.abs(past) * 0.55) / size + 1)) * size

// A value animated by a damped spring: x heads for `target` each frame,
// carrying its velocity through any change of target (so an interrupted
// motion keeps its momentum instead of restarting).
interface SpringValue {
  x: number
  v: number
  target: number
  how: Spring
}

// Advances one spring by dt seconds; returns whether it's still moving. Small
// fixed sub-steps keep the integration stable at any frame rate.
function advance(s: SpringValue, dt: number) {
  if (s.x === s.target && s.v === 0) return false
  const omega = (2 * Math.PI) / s.how.response
  const stiffness = omega * omega
  const friction = 2 * s.how.damping * omega
  for (let left = dt; left > 0; left -= 1 / 240) {
    const h = Math.min(left, 1 / 240)
    s.v += (-stiffness * (s.x - s.target) - friction * s.v) * h
    s.x += s.v * h
  }
  if (Math.abs(s.x - s.target) < 0.1 && Math.abs(s.v) < 1) {
    s.x = s.target
    s.v = 0
    return false
  }
  return true
}

// Wires up the row: the motion engine, opening pills, closing the open card
// (click, close button, Escape), page dots, prev/next, arrow/Home/End keys,
// gliding the section into place, wheel and touch scrolling, the
// scrollbar, the moving lines, and re-layout on resize. Call after the
// markup is in the DOM.
export function initServices() {
  const section = document.getElementById('services')
  const root = document.getElementById('svc')
  const viewport = document.getElementById('svc-viewport')
  const track = document.getElementById('svc-track')
  const bar = document.getElementById('svc-scroll')
  const thumb = document.getElementById('svc-thumb')
  const counter = document.getElementById('svc-counter')
  const live = document.getElementById('svc-live')
  const prevBtn = document.getElementById('svc-prev')
  const nextBtn = document.getElementById('svc-next')
  if (!section || !root || !viewport || !track || !bar || !thumb || !counter || !live || !prevBtn || !nextBtn) return

  const cards = Array.from(track.querySelectorAll<HTMLElement>('.svc-card'))
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('.svc-dot'))
  const triggerOf = (i: number) => cards[i].querySelector<HTMLButtonElement>('.svc-trigger')!
  const count = cards.length
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let active = 0 // the current service (open, or last open while closed)
  let open = true // false = every card is a pill

  // ── Geometry ──────────────────────────────────────────────────────────
  // The row's final layout, worked out from the same custom properties
  // services.css sizes it with.
  function metrics() {
    const css = getComputedStyle(viewport!)
    const width = viewport!.clientWidth
    const gap = parseFloat(getComputedStyle(track!).columnGap) || 0
    const pill = toPx(css.getPropertyValue('--svc-wc'))
    const pills = parseInt(css.getPropertyValue('--svc-p'), 10) || 1
    const openWidth = width - pills * (pill + gap)
    return { width, gap, pill, pills, openWidth, step: pill + gap }
  }
  type Metrics = ReturnType<typeof metrics>

  // How far the row can slide: x runs from 0 (first card flush left) down
  // to minX (last card flush right).
  function minX(m: Metrics = metrics()) {
    const content = open ? (count - 1) * m.step + m.openWidth : count * m.pill + (count - 1) * m.gap
    return Math.min(0, m.width - content)
  }

  // Where the row sits with card `index` open: one pill of context before
  // it (when more than one pill fits beside it), within the row's ends.
  function slotFor(index: number, m: Metrics = metrics()) {
    const leadIn = m.pills > 1 ? 1 : 0
    return clamp(-(index - leadIn) * m.step, minX(m), 0)
  }

  // ── Motion engine ─────────────────────────────────────────────────────
  // Everything that moves is a spring advanced in one loop on one clock:
  // the row's position (`row`, its translateX) and every card's width. So
  // when a card opens, its growth, the closing card's shrink and the row's
  // glide share a start frame and a curve, and stay in step even when
  // interrupted. Wheel input moves the row's target; a touch drag moves the
  // row directly.
  const row: SpringValue = { x: 0, v: 0, target: 0, how: LAYOUT_SPRING }
  const widths: SpringValue[] = cards.map(() => ({ x: 0, v: 0, target: 0, how: LAYOUT_SPRING }))
  let frame = 0
  let lastTime = 0

  // Sets every card's target width for the current open/closed state.
  function aimWidths(m: Metrics = metrics()) {
    widths.forEach((w, i) => {
      w.target = open && i === active ? m.openWidth : m.pill
    })
  }

  function renderRow() {
    track!.style.transform = `translate3d(${row.x}px, 0, 0)`
    renderBar()
  }

  // ── Scrollbar ─────────────────────────────────────────────────────────
  // A themed scrollbar under the row. The thumb's length is the share of
  // the row on screen and its position how far along the row is, both
  // read from the springs every frame (so it follows opening and closing
  // too); while the row is stretched past an end the thumb squashes, as
  // iOS's does.
  let view = 0 // the viewport's width
  let gapPx = 0 // the gap between cards
  let barLength = 0 // the scrollbar's width
  let shownValue = -1

  // How far the row can scroll right now, and the thumb's unsquashed length.
  function barGeometry() {
    const content = widths.reduce((sum, w) => sum + w.x, 0) + (count - 1) * gapPx
    const range = Math.max(0, content - view)
    const length = Math.max(48, (barLength * view) / Math.max(content, view, 1))
    return { range, length }
  }

  function renderBar() {
    const { range, length } = barGeometry()
    const past = row.x > 0 ? row.x : Math.max(0, -range - row.x)
    const width = Math.max(24, length - (past * length) / Math.max(view, 1))
    const progress = range ? clamp(-row.x / range, 0, 1) : 0
    thumb!.style.width = `${width}px`
    thumb!.style.transform = `translateX(${progress * (barLength - width)}px)`
    const value = Math.round(progress * 100)
    if (value !== shownValue) {
      shownValue = value
      bar!.setAttribute('aria-valuenow', String(value))
    }
  }

  function tick(now: number) {
    // The first frame after starting moves nothing (dt 0), and everything
    // that starts together is advanced together from then on.
    const dt = lastTime ? Math.min(0.064, (now - lastTime) / 1000) : 0
    lastTime = now
    let moving = advance(row, dt)
    widths.forEach((w, i) => {
      const before = w.x
      if (advance(w, dt)) moving = true
      if (w.x !== before) cards[i].style.width = `${w.x}px`
    })
    renderRow()
    frame = moving ? requestAnimationFrame(tick) : 0
  }

  function kick() {
    if (frame) return
    lastTime = 0
    frame = requestAnimationFrame(tick)
  }

  // Jumps everything to its target with no motion (first paint, resizing,
  // reduced motion).
  function snap() {
    cancelAnimationFrame(frame)
    frame = 0
    row.x = row.target
    row.v = 0
    widths.forEach((w, i) => {
      w.x = w.target
      w.v = 0
      cards[i].style.width = `${w.x}px`
    })
    renderRow()
  }

  function moveRow(next: number, how: Spring) {
    row.target = next
    row.how = how
    if (reduceMotion) snap()
    else kick()
  }

  // Slides the row just far enough to show card `i` (keyboard focus).
  function ensureVisible(i: number) {
    const m = metrics()
    const left = i * m.step + (open && i > active ? m.openWidth - m.pill : 0)
    const right = left + (open && i === active ? m.openWidth : m.pill)
    let next = row.target
    if (left + next < 0) next = -left
    else if (right + next > m.width) next = m.width - right
    moveRow(clamp(next, minX(m), 0), LAYOUT_SPRING)
  }

  // ── Moving lines ──────────────────────────────────────────────────────
  // One canvas, moved into whichever card is open and switched to that
  // card's version of the lines, drawing only while a card is open and the
  // row is on screen.
  const flow = document.createElement('div')
  flow.className = 'svc-flow'
  flow.setAttribute('aria-hidden', 'true')
  const canvas = document.createElement('canvas')
  flow.append(canvas)
  cards[0].querySelector('.svc-art')!.after(flow)
  const lines = createFlowingLines(canvas, linesFor(0))
  let inView = false

  function updateLines() {
    if (open && inView) lines.start()
    else lines.stop()
  }

  // Moves the lines into card `index`, which is about to open, in its own
  // version. The card arrives closed (so the lines are faded out); reading
  // a layout value commits that, so the opening then fades the lines in
  // instead of popping them.
  function showLinesIn(index: number) {
    cards[index].querySelector('.svc-art')!.after(flow)
    lines.configure(linesFor(index))
    void flow.offsetWidth
  }

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    updateLines()
  }).observe(viewport)

  // ── Open / close ──────────────────────────────────────────────────────
  // Swaps which half of a card (pill trigger vs. body and corner link) is
  // inert.
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
  function activate(index: number) {
    const next = (index + count) % count
    if (open && next === active) return
    const focusWasInRow = track!.contains(document.activeElement)

    if (open) {
      markAnimating(cards[active])
      setOpen(cards[active], false)
    }
    showLinesIn(next)
    markAnimating(cards[next])
    setOpen(cards[next], true)
    active = next
    open = true
    const m = metrics()
    aimWidths(m)
    moveRow(slotFor(next, m), LAYOUT_SPRING)
    updateLines()

    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === next)))
    counter!.textContent = `${pad(next + 1)} / ${pad(count)}`
    live!.textContent = `${services[next].navTitle}, ${next + 1} of ${count}`

    // Focus inside the row was on a card that just changed state — move it
    // to the open card's heading rather than leaving it on an inert element.
    if (focusWasInRow) cards[next].querySelector<HTMLElement>('.svc-body-title')!.focus({ preventScroll: true })
  }

  // Closes the open card back into a pill. It shrinks toward its own left
  // edge (the row only slides if that would leave a gap at the end).
  function close() {
    if (!open) return
    const focusWasInRow = track!.contains(document.activeElement)

    markAnimating(cards[active])
    setOpen(cards[active], false)
    open = false
    const m = metrics()
    aimWidths(m)
    moveRow(clamp(row.target, minX(m), 0), LAYOUT_SPRING)
    updateLines()
    live!.textContent = `All ${count} services`

    // The close button (or heading) that had focus is now inert — hand
    // focus to the card's pill so Enter reopens it.
    if (focusWasInRow) triggerOf(active).focus({ preventScroll: true })
  }

  // ── Clicks and keys ───────────────────────────────────────────────────
  cards.forEach((card, i) => {
    triggerOf(i).addEventListener('click', () => activate(i))
    // Tabbing to a pill that's off-screen slides it into view (the row is
    // clipped, not natively scrollable, so it wouldn't otherwise appear).
    triggerOf(i).addEventListener('focus', () => ensureVisible(i))
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

  // ── Wheel / trackpad ──────────────────────────────────────────────────
  // Wheel scrolling is handled a gesture at a time — a run of wheel events
  // with no pause (a spin of the wheel, or a trackpad swipe and its
  // momentum) — and who handles a gesture is decided once, at its first
  // event. Browsers treat nested scrolling the same way: once a gesture's
  // first event has been let through to the page, the rest can't be held
  // back.
  //   - With the section in place, a gesture moves the row sideways (by
  //     WHEEL_SENSITIVITY × the scroll). Past either end the row stretches
  //     like a rubber band and springs back, and the rest of the gesture is
  //     used up there: the page only moves with the next one.
  //   - With the section partly on screen, a gesture toward it glides the
  //     page until the section fills the screen, and that's all it does.
  //   - Anything else scrolls the page as usual.
  // A sideways swipe over the section always moves the row (so it can't
  // trigger the browser's back/forward swipe); pinch-zoom is left alone.
  type WheelOwner = 'row' | 'glide' | 'page'
  let owner: WheelOwner = 'page'
  let lastWheelTime = -Infinity
  let trickle = false // the last event barely moved: a swipe's momentum dying out
  let wheelRaw = 0 // where the wheel is steering the row, before the rubber band
  let lastSteerTime = 0
  let wheelTimer = 0

  // Smoothly scrolls the page until the section fills the screen.
  function glideIn(top: number) {
    if (Math.abs(top) < 1) return
    window.scrollTo({ top: window.scrollY + top, behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  // Who handles the gesture that `e` starts.
  function ownerFor(e: WheelEvent): WheelOwner {
    if (e.ctrlKey) return 'page'
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return section!.contains(e.target as Node) ? 'row' : 'page'
    const down = e.deltaY > 0
    const { top, bottom } = section!.getBoundingClientRect()
    const screen = window.innerHeight
    // Too little of the section on screen to pull it in.
    if (top > screen * 0.8 || bottom < screen * 0.2) return 'page'
    const min = minX()
    const from = clamp(row.target, min, 0)
    const rowCanMove = down ? from > min + 0.5 : from < -0.5
    if (Math.abs(top) < screen * 0.15 && rowCanMove) {
      glideIn(top) // tidies the section into place while the row moves
      return 'row'
    }
    if (down ? top > 1 : top < -1) {
      glideIn(top)
      return 'glide'
    }
    return 'page'
  }

  // Moves the row with one wheel event of a gesture it owns. In range the
  // row follows the wheel; past an end it stretches with diminishing
  // returns, and the stretch keeps easing off between events, so a
  // trackpad's fading momentum lets it settle back rather than holding it
  // out. Once the wheel stops, a stretched row springs back.
  function steer(e: WheelEvent) {
    const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? viewport!.clientWidth : 1
    const delta = -(horizontal ? e.deltaX : e.deltaY) * unit * WHEEL_SENSITIVITY
    const min = minX()
    const end = clamp(wheelRaw, min, 0)
    wheelRaw = end + (wheelRaw - end) * Math.exp(-(e.timeStamp - lastSteerTime) / STRETCH_RELAX)
    lastSteerTime = e.timeStamp
    wheelRaw = clamp(wheelRaw + delta, min - MAX_OVERSCROLL, MAX_OVERSCROLL)
    const inRange = clamp(wheelRaw, min, 0)
    const past = wheelRaw - inRange
    moveRow(past ? inRange + rubber(past, viewport!.clientWidth) : wheelRaw, SCROLL_SPRING)

    clearTimeout(wheelTimer)
    wheelTimer = window.setTimeout(() => {
      const lowest = minX()
      wheelRaw = clamp(wheelRaw, lowest, 0)
      if (row.target > 0 || row.target < lowest) moveRow(clamp(row.target, lowest, 0), SCROLL_SPRING)
    }, 140)
  }

  // Listens page-wide: a gesture that starts anywhere can be the one that
  // brings the section in.
  window.addEventListener(
    'wheel',
    (e) => {
      const size = Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY))
      // A new gesture: the first scroll after a pause, or a fresh push after
      // a trackpad's momentum had died down to a trickle.
      const fresh = e.timeStamp - lastWheelTime > GESTURE_GAP || (trickle && size >= 6)
      trickle = size <= 2 || (trickle && !fresh)
      lastWheelTime = e.timeStamp
      if (fresh) {
        // An event that can't be cancelled is already the page's.
        owner = e.cancelable ? ownerFor(e) : 'page'
        wheelRaw = clamp(row.target, minX(), 0)
        lastSteerTime = e.timeStamp
      }
      if (owner === 'page') return
      if (e.cancelable) e.preventDefault()
      if (owner === 'row') steer(e)
    },
    { passive: false }
  )

  // ── Touch drag ────────────────────────────────────────────────────────
  // A horizontal drag moves the row 1:1 with the finger (rubber-banding
  // past the ends); letting go flings it on with the finger's speed and the
  // spring settles it, bouncing if it hits an end. Vertical drags still
  // scroll the page, since the viewport has touch-action: pan-y.
  let drag: 'none' | 'pending' | 'active' = 'none'
  let dragStartX = 0
  let dragStartY = 0
  let dragFromX = 0
  let dragged = false
  let samples: { t: number; x: number }[] = []

  viewport.addEventListener('pointerdown', (e) => {
    dragged = false
    if (e.pointerType === 'mouse') return
    drag = 'pending'
    dragStartX = e.clientX
    dragStartY = e.clientY
    samples = [{ t: e.timeStamp, x: e.clientX }]
  })

  viewport.addEventListener('pointermove', (e) => {
    if (drag === 'none') return
    const dx = e.clientX - dragStartX
    if (drag === 'pending') {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - dragStartY)) return
      drag = 'active'
      dragged = true
      dragFromX = row.x
      viewport.setPointerCapture(e.pointerId)
    }
    const min = minX()
    const raw = dragFromX + dx
    row.x = raw > 0 ? rubber(raw, viewport.clientWidth) : raw < min ? min + rubber(raw - min, viewport.clientWidth) : raw
    row.target = row.x
    row.v = 0
    renderRow()
    samples.push({ t: e.timeStamp, x: e.clientX })
    while (samples.length > 2 && e.timeStamp - samples[0].t > 100) samples.shift()
  })

  function endDrag() {
    if (drag !== 'active') {
      drag = 'none'
      return
    }
    drag = 'none'
    const first = samples[0]
    const last = samples[samples.length - 1]
    const speed = last.t > first.t ? ((last.x - first.x) / (last.t - first.t)) * 1000 : 0
    row.v = speed
    moveRow(clamp(row.x + speed * 0.28, minX(), 0), SCROLL_SPRING)
  }
  viewport.addEventListener('pointerup', endDrag)
  viewport.addEventListener('pointercancel', endDrag)

  // Don't let the end of a drag also count as a tap on the card under it.
  viewport.addEventListener(
    'click',
    (e) => {
      if (!dragged) return
      dragged = false
      e.preventDefault()
      e.stopPropagation()
    },
    true
  )

  // ── Scrollbar dragging ────────────────────────────────────────────────
  // The whole strip is the hit area. Pressing the thumb grabs it; pressing
  // the track jumps the row so the thumb centres there, and holds on for a
  // drag from that point. While dragging, the row follows the thumb 1:1
  // (the thumb's travel spans the row's whole range).
  let grab: { x: number; progress: number; moved: boolean } | null = null

  bar.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return
    const { range, length } = barGeometry()
    if (!range) return
    e.preventDefault()
    let progress = clamp(-row.x / range, 0, 1)
    if (e.target !== thumb) {
      const left = e.clientX - bar.getBoundingClientRect().left - length / 2
      progress = clamp(left / (barLength - length), 0, 1)
      moveRow(-progress * range, LAYOUT_SPRING)
    }
    grab = { x: e.clientX, progress, moved: false }
    bar.setPointerCapture(e.pointerId)
    bar.classList.add('is-grabbed')
  })

  bar.addEventListener('pointermove', (e) => {
    if (!grab) return
    const dx = e.clientX - grab.x
    // A press that hasn't really moved yet leaves a track jump to animate.
    if (!grab.moved && Math.abs(dx) < 3) return
    grab.moved = true
    const { range, length } = barGeometry()
    const progress = clamp(grab.progress + dx / Math.max(barLength - length, 1), 0, 1)
    row.x = row.target = -progress * range
    row.v = 0
    renderRow()
  })

  function letGo() {
    grab = null
    bar!.classList.remove('is-grabbed')
  }
  bar.addEventListener('pointerup', letGo)
  bar.addEventListener('pointercancel', letGo)

  // ── First layout + resize ─────────────────────────────────────────────
  // Every width depends on the row's width, so on a resize (and at the
  // start) everything jumps straight to its place for the new size.
  new ResizeObserver(() => {
    const m = metrics()
    view = m.width
    gapPx = m.gap
    barLength = bar.clientWidth
    aimWidths(m)
    row.target = open ? slotFor(active, m) : clamp(row.target, minX(m), 0)
    snap()
  }).observe(viewport)
}
