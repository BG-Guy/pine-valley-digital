// CTA cursor: over the main call-to-action buttons (the big lemon buttons and
// the navbar's "Start a project"), Clicky the cursor mascot takes over from
// the pointer, tip on the spot you're pointing at. On the forms' send
// buttons, the Clicky already standing beside the button comes along
// instead: he leaves his spot and chases the pointer, trailing a little and
// swinging from the tip of his arrow as he goes, and when the pointer
// leaves he walks back to his spot. Only with a mouse or
// trackpad; touch screens keep their normal taps. Decorative: the buttons
// work the same without it. Styles live in ctaCursor.css.
import './ctaCursor.css'
import { gsap } from 'gsap'
import { clicky } from '../mascots/mascots'

const TARGETS = '.nb-btn-lg, .btn-cta'

// On a send button: how far behind the pointer Clicky trails (seconds, the
// time to close most of the gap), how far he can swing (degrees), and how
// long the walk home takes once the pointer leaves.
const TRAIL = 0.14
const HOME = 0.12
const MAX_SWING = 14

// Adds the cursor to the page. Call once per page.
export function initCtaCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const cursor = document.createElement('div')
  cursor.className = 'cta-cursor'
  cursor.setAttribute('aria-hidden', 'true')
  cursor.innerHTML = clicky('', 'Go!')
  document.body.append(cursor)
  const tag = cursor.querySelector('text')!
  // Hides the real pointer over the buttons (ctaCursor.css), only once
  // Clicky is here to replace it.
  document.documentElement.classList.add('has-cta-cursor')

  // Placed with `translate` (and swung with `rotate`), which sit outside the
  // pop's `scale`, so growing never drags it in from the corner of the
  // screen. The tip is the pivot (ctaCursor.css).
  const place = (x: number, y: number, swing = 0) => {
    cursor.style.translate = `${x}px ${y}px`
    cursor.style.rotate = `${swing}deg`
  }

  // A send button's own Clicky (.clicky-at, components/mascots): where his
  // tip is and how wide he is, right now (he lifts with the button).
  const standOf = (el: Element | null) => el?.closest('.clicky-at')?.querySelector<SVGElement>(':scope > .mascot') ?? null
  const spot = (stand: SVGElement) => {
    const r = stand.getBoundingClientRect()
    return { x: r.left + r.width * 0.14, y: r.top + r.height * 0.08, size: r.width }
  }
  const baseSize = () => parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.5

  let current: Element | null = null
  // 'chase': following the pointer from a send button; 'home': walking back
  // to the spot beside it; null: either not shown or on a plain button.
  let mode: 'chase' | 'home' | null = null
  let stand: SVGElement | null = null
  const at = { x: 0, y: 0, size: 0, swing: 0 }
  const pointer = { x: 0, y: 0 }

  // The send button's Clicky steps out: the cursor takes his place, size
  // and tag, and he hides, all in the same frame, so it reads as one figure.
  const pickUp = (s: SVGElement) => {
    if (stand !== s) {
      drop()
      stand = s
      Object.assign(at, spot(s), { swing: 0 })
      tag.textContent = s.querySelector('text')?.textContent ?? 'Go!'
      cursor.style.setProperty('--size', `${at.size}px`)
      place(at.x, at.y)
    }
    s.parentElement!.classList.add('is-away')
    cursor.classList.add('is-on', 'no-pop')
  }
  // ...and back: he reappears where the cursor stopped, and it vanishes.
  const drop = () => {
    if (!stand) return
    stand.parentElement!.classList.remove('is-away')
    stand = null
    mode = null
    cursor.classList.remove('is-on')
    cursor.style.removeProperty('--size')
    tag.textContent = 'Go!'
  }

  // Each frame Clicky closes part of the gap to where he's headed (the
  // pointer, or his spot), grows or shrinks to fit, and leans back against
  // the way he's moving, as if pulled along by the tip.
  gsap.ticker.add((_time, deltaMs) => {
    if (!mode || !stand) return
    const home = mode === 'home' ? spot(stand) : null
    const to = home ?? { ...pointer, size: baseSize() }
    const step = 1 - Math.exp(-deltaMs / 1000 / (home ? HOME : TRAIL))
    const dx = (to.x - at.x) * step
    at.x += dx
    at.y += (to.y - at.y) * step
    at.size += (to.size - at.size) * step
    at.swing += (Math.max(-MAX_SWING, Math.min(MAX_SWING, dx * 0.8)) - at.swing) * 0.2
    if (home && Math.hypot(to.x - at.x, to.y - at.y) < 0.5 && Math.abs(to.size - at.size) < 0.5) return drop()
    cursor.style.setProperty('--size', `${at.size}px`)
    place(at.x, at.y, at.swing)
  })

  // Leaving a send button: Clicky walks home (or, for reduced motion, is
  // simply back there).
  const leave = () => {
    if (mode === 'chase' && !still) mode = 'home'
    else drop()
  }

  document.addEventListener(
    'pointermove',
    (e) => {
      const over = (e.target as Element | null)?.closest?.(TARGETS) ?? null
      pointer.x = e.clientX
      pointer.y = e.clientY
      if (over !== current) {
        current = over
        const s = standOf(over)
        if (s) {
          pickUp(s)
          mode = still ? null : 'chase'
        } else if (stand) {
          leave()
        }
      }
      // A plain button, or a send button with reduced motion: tip right on
      // the pointer.
      if (over && (!stand || still)) {
        if (!stand) cursor.classList.remove('no-pop')
        cursor.classList.add('is-on')
        place(e.clientX, e.clientY)
      } else if (!over && !stand) {
        cursor.classList.remove('is-on')
      }
    },
    { passive: true },
  )
  document.documentElement.addEventListener('pointerleave', () => {
    current = null
    if (stand) leave()
    else cursor.classList.remove('is-on')
  })
}
