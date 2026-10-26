// CTA cursor: over the main call-to-action buttons (the big lemon buttons and
// the navbar's "Start a project"), Clicky the cursor mascot takes over from
// the pointer, tip on the spot you're pointing at. On the forms' send
// buttons, the Clicky already standing beside the button comes along
// instead: he leaves his spot and chases the pointer, trailing a little and
// swinging from the tip of his arrow as he goes. Only with a mouse or
// trackpad; touch screens keep their normal taps. Decorative: the buttons
// work the same without it. Styles live in ctaCursor.css.
import './ctaCursor.css'
import { gsap } from 'gsap'
import { clicky } from '../mascots/mascots'

const TARGETS = '.nb-btn-lg, .btn-cta'

// On a send button: how far behind the pointer Clicky trails (seconds, the
// time to close most of the gap), and how far he can swing (degrees).
const TRAIL = 0.14
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

  let current: Element | null = null
  let chasing = false
  const at = { x: 0, y: 0, swing: 0 }
  const pointer = { x: 0, y: 0 }

  // While chasing, Clicky closes part of the gap every frame, and leans
  // back against the way he's moving, as if pulled along by the tip.
  gsap.ticker.add((_time, deltaMs) => {
    if (!chasing) return
    const step = 1 - Math.exp(-deltaMs / 1000 / TRAIL)
    const dx = (pointer.x - at.x) * step
    at.x += dx
    at.y += (pointer.y - at.y) * step
    at.swing += (Math.max(-MAX_SWING, Math.min(MAX_SWING, dx * 0.8)) - at.swing) * 0.2
    place(at.x, at.y, at.swing)
  })

  document.addEventListener(
    'pointermove',
    (e) => {
      const over = (e.target as Element | null)?.closest?.(TARGETS) ?? null
      pointer.x = e.clientX
      pointer.y = e.clientY
      if (over !== current) {
        current = over
        // A send button's own Clicky (.clicky-at, components/mascots): the
        // cursor starts where he stands, tip on his tip, with no pop.
        const stand = over?.closest('.clicky-at')?.querySelector<SVGElement>('.mascot')
        chasing = !!stand && !still
        cursor.classList.toggle('no-pop', !!stand)
        if (stand) {
          const r = stand.getBoundingClientRect()
          Object.assign(at, { x: r.left + r.width * 0.14, y: r.top + r.height * 0.08, swing: 0 })
          place(at.x, at.y)
        }
      }
      cursor.classList.toggle('is-on', !!over)
      if (over && !chasing) place(e.clientX, e.clientY)
    },
    { passive: true },
  )
  document.documentElement.addEventListener('pointerleave', () => {
    current = null
    chasing = false
    cursor.classList.remove('is-on')
  })
}
