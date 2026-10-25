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

  document.addEventListener(
    'pointermove',
    (e) => {
      const over = (e.target as Element | null)?.closest?.(TARGETS)
      cursor.classList.toggle('is-on', !!over)
      // Placed with `translate`, which sits outside the pop's `scale`, so
      // growing never drags it in from the corner of the screen.
      if (over) cursor.style.translate = `${e.clientX}px ${e.clientY}px`
    },
    { passive: true },
  )
  document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('is-on'))
}
