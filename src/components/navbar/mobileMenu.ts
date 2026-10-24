// Mobile menu: the toggle key in the navbar and the full-screen "poster"
// sheet it opens, below 768px only (the desktop bar has its own links).
// The sheet comes down from behind the bar as a paper curtain with a heavy
// ink line along its leading edge — the page-transition curtain's gesture
// in paper — and goes back up on close. Under the edge, the hero's reveal: the
// links stacked in big display type, each sliding up through its own mask
// as the edge passes it. Styles live in mobileMenu.css.
import './mobileMenu.css'
import { gsap } from 'gsap'
import { renderCtaButton } from '../cta-button/ctaButton'

// Root-prefixed like the desktop links (see navbar.ts), so they work from
// every page. Whether a link leaves the page you're on (and gets the little
// diagonal arrow) is worked out from its href, not set here.
const MENU_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Lab', href: '/lab.html' },
]

// Same address as the contact section (sections/contact).
const EMAIL = 'hello@pinevalleydigital.com'

// ── Motion ──────────────────────────────────────────────────────────
// The curtain's drop: the "What we do" row's spring (LAYOUT_SPRING in
// sections/services/services.ts — SwiftUI's default, 0.55s response,
// 0.825 damping; --ease-spring in global.css is the same curve for CSS).
// It sets off gently, sweeps the edge across the screen in about 0.3s and
// spends its slow, settling end out of sight below.
const DROP = 0.6
const DROP_EASE = springEase(DROP)
// Its lift: shorter, and accelerating away — the edge is drawn back up
// across the screen and eases off only once it's up behind the bar.
const LIFT = 0.36
const LIFT_EASE = 'power2.inOut'
// The gap between one link starting to rise and the next, at the least.
const STAGGER = 0.035
// Reduced motion: no movement, the sheet just fades.
const FADE = 0.14

// Index-sized up-right arrow for a link that leaves this page (its stroke
// matched to the index digits' weight), and the CTA's arrow, matched to
// its 700-weight label. Both take the text colour.
const AWAY_ARROW = `<svg class="mm-away" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.5 7.5 7.5 2.5M3.25 2.5H7.5v4.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const CTA_ARROW = `<svg class="mm-cta-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 10h12.5M11 5l5 5-5 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`

// The toggle: a round key — a paper face in a 3px ink ring, sitting on its
// own hard shadow (an ink disc 3px below). Open, it latches down into the
// shadow and floods with ink from the centre while its two bars (the lower
// one shorter) fold into an X. The bars are drawn twice: in ink on the
// face, and in paper over the flood, clipped to a circle that grows with
// it — so they're paper exactly where the ink has reached.
const TOGGLE_BARS = '<span class="mm-toggle-icon"><i></i><i></i></span>'

export const renderMenuToggle = () => `
          <button id="menu-toggle" type="button" class="mm-toggle" aria-controls="mobile-menu" aria-expanded="false" aria-label="Open menu">
            <span class="mm-toggle-face" aria-hidden="true">
              ${TOGGLE_BARS}
              <span class="mm-toggle-flood"></span>
              <span class="mm-toggle-lit">${TOGGLE_BARS}</span>
            </span>
          </button>
`

// The sheet: the curtain (paper, its ink edge at the bottom) with the
// content inside it. Inside: an eyebrow and the numbered links, then a
// lilac bottom band under a heavy ink line, with the email and the
// CTA (the bar hides its own CTA below 640px). Every piece of text that
// slides sits in a mask. Each link's word has two aria-hidden copies behind
// it for the press glitch (real elements, like the hero's "fast" slices).
export const renderMobileMenu = () => `
    <nav id="mobile-menu" aria-label="Menu" inert>
      <div class="mm-curtain">
        <div class="mm-sheet">
          <div class="mm-body">
            <div class="mm-nav">
              <p class="mm-eyebrow">
                <span class="mm-mask"><span class="mm-rise">Navigate</span></span>
                <span class="mm-eyebrow-line" aria-hidden="true"></span>
              </p>
              <ul class="mm-list">
                ${MENU_LINKS.map(
                  (link, i) => `
                <li>
                  <a href="${link.href}" class="mm-link">
                    <span class="mm-mask"><span class="mm-rise mm-line">
                      <span class="mm-word">
                        <span class="mm-glitch mm-glitch-a" aria-hidden="true">${link.label}</span>
                        <span class="mm-glitch mm-glitch-b" aria-hidden="true">${link.label}</span>
                        <span class="mm-label">${link.label}</span>
                      </span>
                      <span class="mm-meta" aria-hidden="true">
                        <span class="mm-num">${String(i + 1).padStart(2, '0')}</span>${leavesPage(link.href) ? AWAY_ARROW : ''}
                      </span>
                    </span></span>
                  </a>
                </li>`,
                ).join('')}
              </ul>
            </div>
            <div class="mm-band">
              <span class="mm-band-edge" aria-hidden="true"></span>
              <p class="mm-contact">
                <span class="mm-contact-label">Say hello</span>
                <a href="mailto:${EMAIL}" class="mm-email">${EMAIL}</a>
              </p>
              ${renderCtaButton({ href: '/#contact', label: `Start a project${CTA_ARROW}`, className: 'mm-cta' })}
            </div>
          </div>
        </div>
        <span class="mm-edge" aria-hidden="true"></span>
      </div>
    </nav>
`

// Wires the toggle and the sheet. Call once, after the navbar is in the DOM.
export function initMobileMenu() {
  const header = document.querySelector<HTMLElement>('#site-nav')
  const toggle = document.querySelector<HTMLButtonElement>('#menu-toggle')
  const menu = document.querySelector<HTMLElement>('#mobile-menu')
  if (!header || !toggle || !menu) return

  const curtain = menu.querySelector<HTMLElement>('.mm-curtain')!
  const sheet = menu.querySelector<HTMLElement>('.mm-sheet')!
  const edge = menu.querySelector<HTMLElement>('.mm-edge')!
  const eyebrow = menu.querySelector<HTMLElement>('.mm-eyebrow .mm-rise')!
  const eyebrowLine = menu.querySelector<HTMLElement>('.mm-eyebrow-line')!
  const lines = gsap.utils.toArray<HTMLElement>('.mm-line', menu)
  const band = menu.querySelector<HTMLElement>('.mm-band')!
  const bandEdge = menu.querySelector<HTMLElement>('.mm-band-edge')!
  const footItems = gsap.utils.toArray<HTMLElement>('.mm-contact, .mm-cta', menu)
  const links = gsap.utils.toArray<HTMLAnchorElement>('.mm-link', menu)
  const pressables = [...links, ...menu.querySelectorAll<HTMLElement>('.mm-cta')]
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let isOpen = false
  let timeline: gsap.core.Timeline | null = null
  let inerted: HTMLElement[] = []

  // ── The curtain ───────────────────────────────────────────────────
  // The curtain is the screen's height plus its edge strip (and a little
  // more, so the edge parks fully out of sight). It moves on its own
  // transform; the sheet inside it — the content — is moved by exactly the
  // opposite amount, so the content stays still on the screen and the edge
  // uncovers it, with no clip or layout work per frame. Every move tweens
  // both, with the same duration and ease, so they cancel at every frame.
  const drop = () => curtain.offsetHeight
  // Up out of sight, its edge tucked in above the screen.
  const park = () => {
    const travel = drop()
    gsap.set(curtain, { y: -travel })
    gsap.set(sheet, { y: travel })
  }
  park()

  // When the edge's tip, moving from where it is now to all the way down
  // (`travel`), reaches screen height `y` — as a time into a `duration`
  // tween on `ease`. 0 if it's already past.
  const timeToReach = (y: number, tip: number, travel: number, duration: number, ease: gsap.EaseString | gsap.EaseFunction) => {
    if (y <= tip) return 0
    const target = Math.min(1, (y - tip) / (travel - tip))
    const curve = gsap.parseEase(ease)
    let lo = 0
    let hi = 1
    for (let i = 0; i < 16; i++) {
      const mid = (lo + hi) / 2
      if (curve(mid) < target) lo = mid
      else hi = mid
    }
    return hi * duration
  }

  // A thing's place on the screen once the sheet is down. The curtain's and
  // the sheet's offsets cancel, so this holds mid-animation too. Read once
  // per open/close, never per frame.
  const middleOf = (el: Element) => {
    const box = el.getBoundingClientRect()
    return box.top + box.height / 2
  }

  const setExpanded = (expanded: boolean) => {
    toggle.setAttribute('aria-expanded', String(expanded))
    toggle.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu')
  }

  // The content's resting, hidden-away state, which the open animation
  // starts from (or, with reduced motion, everything already in place).
  // Opacity only, never visibility: a re-open mid-close must be able to
  // focus a link at once.
  const resetContent = () => {
    if (reduceMotion()) {
      gsap.set([eyebrow, ...lines], { yPercent: 0 })
      gsap.set(eyebrowLine, { scaleX: 1 })
      gsap.set(bandEdge, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(footItems, { opacity: 1, y: 0 })
    } else {
      gsap.set([eyebrow, ...lines], { yPercent: 110 })
      gsap.set(eyebrowLine, { scaleX: 0 })
      gsap.set(bandEdge, { clipPath: 'inset(0% 50% 0% 50%)' })
      gsap.set(footItems, { opacity: 0, y: 14 })
    }
  }
  resetContent()

  // ── Open / close ──────────────────────────────────────────────────
  // Both run from whatever state the other one left (every tween is a
  // .to() from current values, and the previous timeline is killed first),
  // so tapping the toggle mid-animation just turns it around.
  const open = () => {
    if (isOpen) return
    isOpen = true
    setExpanded(true)
    lockPage(true)
    markCurrentLink()
    // A press cut short by the menu closing under it shouldn't greet you.
    pressables.forEach((el) => el.classList.remove('is-pressed'))
    timeline?.kill()
    // From fully closed, measure afresh (the screen may have turned since).
    const fromClosed = !menu.classList.contains('is-active')
    if (fromClosed) park()
    menu.inert = false
    menu.classList.add('is-active')
    // Into the first link, without letting focus() scroll the sheet.
    links[0].focus({ preventScroll: true })

    if (reduceMotion()) {
      // No movement: everything in place, the sheet just fades in.
      resetContent()
      gsap.set([curtain, sheet], { y: 0 })
      if (fromClosed) gsap.set(menu, { opacity: 0 })
      timeline = gsap.timeline().to(menu, { opacity: 1, duration: FADE, ease: 'none' })
      return
    }
    gsap.set(menu, { opacity: 1 })

    // About 0.6s for the curtain; under it, the hero's load-in, smaller and
    // quicker, each part starting as the edge reaches it: the eyebrow and
    // its hairline, the links rising through their masks, the band's line
    // drawing out from the middle, and the CTA settling in. All done in
    // about 0.7s.
    const travel = drop()
    const tip = travel + (gsap.getProperty(curtain, 'y') as number)
    // Anything below the screen (a short screen's sheet scrolls) goes as
    // the edge reaches the bottom.
    const reachY = (y: number) => timeToReach(Math.min(y, sheet.clientHeight), tip, travel, DROP, DROP_EASE)
    const reach = (el: Element) => reachY(middleOf(el))

    // The spring's ~1% overshoot would carry the curtain's top down off the
    // top of the screen for a moment; it's held at the end point instead
    // (the edge is long out of sight below by then).
    timeline = gsap
      .timeline()
      .to(curtain, { y: 0, duration: DROP, ease: DROP_EASE, modifiers: { y: gsap.utils.unitize((y: number) => Math.min(y, 0)) } }, 0)
      .to(sheet, { y: 0, duration: DROP, ease: DROP_EASE, modifiers: { y: gsap.utils.unitize((y: number) => Math.max(y, 0)) } }, 0)
      .to(eyebrow, { yPercent: 0, duration: 0.42, ease: 'power4.out' }, reach(eyebrow))
      .to(eyebrowLine, { scaleX: 1, duration: 0.5, ease: 'expo.out' }, reach(eyebrow) + 0.04)

    let at = 0
    lines.forEach((line, i) => {
      at = Math.max(reach(line.parentElement!), i ? at + STAGGER : 0)
      timeline!.to(line, { yPercent: 0, duration: 0.42, ease: 'power4.out' }, at)
    })

    // The band's line draws only once the curtain's edge is clear of it, so
    // the two lines never cross.
    const bandClear = band.getBoundingClientRect().top + bandEdge.offsetHeight + edge.offsetHeight
    timeline.to(bandEdge, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.42, ease: 'power3.out' }, reachY(bandClear))
    // From the moment the edge starts to uncover them; the edge does most
    // of the revealing, so the fade is just a quick soften.
    footItems.forEach((item, i) => {
      const at = reachY(item.getBoundingClientRect().top) + i * 0.03
      timeline!.to(item, { y: 0, duration: 0.42, ease: 'power3.out' }, at).to(item, { opacity: 1, duration: 0.18, ease: 'power1.out' }, at)
    })
  }

  // `returnFocus`: false after a link was followed (focus belongs with
  // where the user went, not back on the button). `instant`: no animation —
  // for a resize to desktop width or leaving the page.
  const close = ({ returnFocus = true, instant = false } = {}) => {
    if (!isOpen) return
    isOpen = false
    setExpanded(false)
    // Released straight away, not after the animation: a section link's
    // jump happens right after this click, and needs the page scrollable.
    lockPage(false)
    timeline?.kill()
    menu.inert = true
    if (returnFocus) toggle.focus({ preventScroll: true })

    const finish = () => {
      menu.classList.remove('is-active')
      gsap.set(menu, { opacity: 1 })
      sheet.scrollTop = 0
      park()
      resetContent()
    }

    if (instant) return finish()

    if (reduceMotion()) {
      timeline = gsap.timeline({ onComplete: finish }).to(menu, { opacity: 0, duration: FADE, ease: 'none' })
      return
    }

    // About 0.36s: the curtain is drawn back up while the links dip about
    // a third of the way into their masks — starting at once, bottom one
    // first, each sunk by the time the edge sweeps over it — and the CTA
    // sinks a touch. Nothing fades: the content stays until the edge covers
    // it. A link still rising from a cut-short open isn't lifted to meet it.
    const travel = drop()
    const tip = travel + (gsap.getProperty(curtain, 'y') as number)
    // When the rising edge's tip passes screen height `y`.
    const covers = (y: number) => (y >= tip ? 0 : timeToReach(travel - y, travel - tip, travel, LIFT, LIFT_EASE))
    const sink = (amount: number, prop: 'yPercent' | 'y') => (_: number, el: HTMLElement) =>
      Math.max(amount, gsap.getProperty(el, prop) as number)

    timeline = gsap
      .timeline({ onComplete: finish })
      .to(curtain, { y: -travel, duration: LIFT, ease: LIFT_EASE }, 0)
      .to(sheet, { y: travel, duration: LIFT, ease: LIFT_EASE }, 0)
      .to(footItems, { y: sink(8, 'y'), duration: 0.2, ease: 'power2.inOut' }, 0)
    ;[eyebrow, ...lines].forEach((line) => {
      const at = Math.max(0, covers(middleOf(line.parentElement!)) - 0.2)
      timeline!.to(line, { yPercent: sink(30, 'yPercent'), duration: 0.22, ease: 'power2.inOut' }, at)
    })
  }

  // ── Page lock ─────────────────────────────────────────────────────
  // While open, the page behind can't scroll or take focus:
  // - overflow: hidden on the root keeps the scroll position as it is
  //   (nothing to restore, no jump); scrollbar-gutter keeps a desktop
  //   scrollbar's width so nothing shifts on a narrow desktop window.
  // - wheel and touch moves are stopped at the window, in the capture
  //   phase: the "What we do" row (services.ts) listens for the wheel
  //   page-wide and scrolls the page itself, which the overflow lock doesn't
  //   stop, and older iOS rubber-bands the page under a fixed layer. The
  //   one exception is the sheet itself, when a short screen makes it
  //   scroll.
  // - every sibling of the header and of each of its ancestors is inert, so
  //   the toggle and the sheet are all that's left for focus and assistive
  //   tech.
  // Added and removed synchronously, so a same-page hash link's anchor jump
  // (which runs right after its click closes the menu) finds the page free.
  const sheetScrolls = (target: EventTarget | null) =>
    target instanceof Node && sheet.contains(target) && sheet.scrollHeight > sheet.clientHeight

  function onWheel(e: WheelEvent) {
    e.stopPropagation()
    if (!sheetScrolls(e.target)) e.preventDefault()
  }

  function onTouchMove(e: TouchEvent) {
    if (!sheetScrolls(e.target)) e.preventDefault()
  }

  function lockPage(lock: boolean) {
    document.documentElement.classList.toggle('mm-lock', lock)
    if (lock) {
      window.addEventListener('wheel', onWheel, { capture: true, passive: false })
      window.addEventListener('touchmove', onTouchMove, { capture: true, passive: false })
    } else {
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('touchmove', onTouchMove, { capture: true })
    }
    inerted.forEach((el) => (el.inert = false))
    inerted = []
    if (!lock) return
    for (let el: HTMLElement | null = header!; el && el !== document.body; el = el.parentElement) {
      for (const sibling of Array.from(el.parentElement?.children ?? [])) {
        if (sibling !== el && sibling instanceof HTMLElement && !sibling.inert) {
          sibling.inert = true
          inerted.push(sibling)
        }
      }
    }
  }

  // Marks where you are: the link to this page (Lab, on the Lab page), or
  // the home section in the middle of the screen. The CSS gives it the
  // hero's purple full stop.
  function markCurrentLink() {
    const here = normalizePath(location.pathname)
    links.forEach((link) => {
      const url = new URL(link.href, location.href)
      let current: string | null = null
      if (normalizePath(url.pathname) === here) {
        if (!url.hash) current = 'page'
        else {
          const section = document.querySelector(url.hash)?.getBoundingClientRect()
          const mid = window.innerHeight * 0.45
          if (section && section.top <= mid && section.bottom > mid) current = 'location'
        }
      }
      if (current) link.setAttribute('aria-current', current)
      else link.removeAttribute('aria-current')
    })
  }

  // ── Input ─────────────────────────────────────────────────────────
  toggle.addEventListener('click', () => (isOpen ? close() : open()))

  // Press states come from pointer events rather than :active, which iOS
  // Safari only applies to pages with a touchstart listener.
  ;[toggle, ...pressables].forEach(pressable)

  // Clicks anywhere in the header (the bar or the sheet) while open: links
  // decide by where they go; a tap on empty space — sheet or bar — closes,
  // but only if the press also started there (a press that slides off a
  // link onto the background shouldn't count).
  let pressedOnBlank = false
  header.addEventListener('pointerdown', (e) => {
    pressedOnBlank = !(e.target as Element).closest('a, button')
  })
  header.addEventListener('click', (e) => {
    if (!isOpen) return
    const target = e.target as Element
    if (toggle.contains(target)) return
    const link = target.closest<HTMLAnchorElement>('a[href]')
    if (link) followLink(e, link)
    else if (pressedOnBlank && !target.closest('button')) close()
  })

  // Same page + hash (e.g. /#process on the home page): close and let the
  // browser's own anchor jump run — the lock is already off by then, and
  // html's scroll-behavior keeps it smooth. A link to the page you're on,
  // without a hash: just close (no reload). Another page: left alone for
  // pageTransitions' curtain (it skips clicks that are defaultPrevented, so
  // this never prevents those) and the menu resets as the page goes.
  function followLink(e: MouseEvent, link: HTMLAnchorElement) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const url = new URL(link.href, location.href)
    if (url.origin !== location.origin) return // mailto: and the like
    if (normalizePath(url.pathname) !== normalizePath(location.pathname)) return
    if (url.hash) {
      close({ returnFocus: false })
    } else {
      e.preventDefault()
      close()
    }
  }

  // Keyboard: Escape closes; Tab cycles through the toggle and the sheet's
  // links only, so focus can't wander under the sheet.
  document.addEventListener('keydown', (e) => {
    if (!isOpen) return
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      const stops = [toggle, ...menu.querySelectorAll<HTMLElement>('a[href], button')]
      const i = stops.indexOf(document.activeElement as HTMLElement)
      const next = i === -1 ? (e.shiftKey ? stops.length - 1 : 0) : (i + (e.shiftKey ? -1 : 1) + stops.length) % stops.length
      e.preventDefault()
      stops[next].focus()
    }
  })

  // Desktop width has no toggle: drop the menu without animation. Same
  // when the page is left (it would otherwise come back open from the
  // back/forward cache).
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches) close({ instant: true, returnFocus: false })
  })
  window.addEventListener('pagehide', () => close({ instant: true, returnFocus: false }))
}

// A damped spring (`response` seconds per swing, `damping` 0-1) as an ease
// for a tween `duration` seconds long. Starts from rest and overshoots a
// little before it settles; past the end of the tween it's just 1.
function springEase(duration: number, response = 0.55, damping = 0.825) {
  const omega = (2 * Math.PI) / response
  const decay = damping * omega
  const swing = omega * Math.sqrt(1 - damping * damping)
  return (p: number) => {
    if (p >= 1) return 1
    const t = p * duration
    return 1 - Math.exp(-decay * t) * (Math.cos(swing * t) + (decay / swing) * Math.sin(swing * t))
  }
}

// Adds .is-pressed while a pointer is down on `el`.
function pressable(el: HTMLElement) {
  const release = () => el.classList.remove('is-pressed')
  el.addEventListener('pointerdown', () => el.classList.add('is-pressed'))
  el.addEventListener('pointerup', release)
  el.addEventListener('pointercancel', release)
  el.addEventListener('pointerleave', release)
}

// Whether a link goes to another page than this one (rather than to a
// section of it).
function leavesPage(href: string) {
  return normalizePath(new URL(href, location.href).pathname) !== normalizePath(location.pathname)
}

// '/' and '/index.html' are the same page (as in pageTransitions.ts).
function normalizePath(pathname: string) {
  return pathname === '/index.html' ? '/' : pathname
}
