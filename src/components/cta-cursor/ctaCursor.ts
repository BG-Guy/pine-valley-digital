// CTA cursor: over the main call-to-action buttons (the big lemon buttons and
// the navbar's "Start a project"), Clicky the cursor mascot takes over from
// the pointer, tip on the spot you're pointing at. Only with a mouse or
// trackpad; touch screens keep their normal taps. Decorative: the buttons
// work the same without it. Styles live in ctaCursor.css.
import './ctaCursor.css'
import { clicky } from '../mascots/mascots'

const TARGETS = '.nb-btn-lg, .btn-cta'

// Adds the cursor to the page. Call once per page.
export function initCtaCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

  const cursor = document.createElement('div')
  cursor.className = 'cta-cursor'
  cursor.setAttribute('aria-hidden', 'true')
  cursor.innerHTML = clicky('', 'Go!')
  document.body.append(cursor)
  // Hides the real pointer over the buttons (ctaCursor.css), only once
  // Clicky is here to replace it.
  document.documentElement.classList.add('has-cta-cursor')

  // On a send button, the Clicky already pointing at it (.clicky-at, in
  // components/mascots) hands over: the cursor starts where he stands,
  // tip on his tip, and glides to the pointer before following it.
  let current: Element | null = null
  let glideEnd = 0
  document.addEventListener(
    'pointermove',
    (e) => {
      const over = (e.target as Element | null)?.closest?.(TARGETS) ?? null
      const entering = over !== current
      const stand = entering ? over?.closest('.clicky-at')?.querySelector<SVGElement>('.mascot') : null
      if (entering) cursor.classList.remove('no-pop')
      current = over
      if (stand) {
        const r = stand.getBoundingClientRect()
        cursor.classList.remove('is-gliding')
        cursor.style.translate = `${r.left + r.width * 0.14}px ${r.top + r.height * 0.08}px`
        void cursor.offsetWidth // place him there before the glide starts
        cursor.classList.add('is-gliding', 'no-pop')
        clearTimeout(glideEnd)
        glideEnd = window.setTimeout(() => cursor.classList.remove('is-gliding'), 400)
      }
      cursor.classList.toggle('is-on', !!over)
      // Placed with `translate`, which sits outside the pop's `scale`, so
      // growing never drags it in from the corner of the screen.
      if (over) cursor.style.translate = `${e.clientX}px ${e.clientY}px`
    },
    { passive: true },
  )
  document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('is-on'))
}
