// Preloader: the full-screen dark curtain shown on first load. The pine logo
// sits behind the wordmark while the page paints, then the curtain opens to
// reveal the hero (the curtain itself is drawn by curveTransition.ts).
import './preloader.css'
import { gsap } from 'gsap'
import { curveTransition } from './curveTransition'
import { logoMark, logoWordmark } from '../logo/logo'

// Markup: the wordmark with a large, faded pine mark centered behind it, and
// the current page's name lower down, below it — shown on first load, and
// again (updated to the destination page's name) during a cross-page
// navigation; see animations/pageTransitions.ts. Both the wordmark and the
// title sit in their own masked "viewport" (overflow-hidden outer + a block
// inner) so revealPreloaderText() below can slide each up into place — the
// same technique the hero's own lines use (see sections/hero/hero.ts).
export const renderPreloader = (title: string) => `
  <div id="preloader">
    <div class="pre-word tracking-tight">
      <span class="relative inline-flex flex-col items-center justify-center text-4xl sm:text-6xl">
        <span class="absolute inset-0 -z-10 flex items-center justify-center">
          ${logoMark('w-[6em] h-[6em] opacity-20')}
        </span>
        <span class="pre-name overflow-hidden block">
          <span class="pre-name-inner block">${logoWordmark('')}</span>
        </span>
        <span class="pre-title-viewport overflow-hidden block mt-8 sm:mt-10">
          <span class="pre-title block text-[1.75rem] sm:text-[2rem] font-semibold uppercase tracking-[0.2em] opacity-60">${title}</span>
        </span>
      </span>
    </div>
  </div>
`

// Slides the wordmark up into place, the title close behind it — resolves
// once both have landed. Call after the preloader/curtain is already
// covering, so the slide-up is the first thing visible.
export function revealPreloaderText() {
  return new Promise<void>((resolve) => {
    gsap.timeline({ defaults: { ease: 'power4.out' }, onComplete: resolve })
      .to('#preloader .pre-name-inner', { yPercent: 0, duration: 0.6 })
      .to('#preloader .pre-title', { yPercent: 0, duration: 0.5 }, '<+=0.15')
  })
}

// Resets the wordmark/title below their masks, ready for
// revealPreloaderText() to slide them up again (used before a cross-page
// transition, which reuses this same preloader for a second reveal).
export function hidePreloaderText() {
  gsap.set('#preloader .pre-name-inner, #preloader .pre-title', { yPercent: 110 })
}

// A cross-page transition (animations/pageTransitions.ts) already slides the
// wordmark/title up and holds on the destination's name on the page you're
// LEAVING, right before it navigates. Without this flag, the page you land
// on would play that exact same slide-up again from scratch — the text
// visibly repeating. Set just before navigating away; read and cleared once,
// on the very next playPreloader() call.
const TRANSITION_FLAG = 'pvd:arrived-via-transition'

export function markPageTransition() {
  sessionStorage.setItem(TRANSITION_FLAG, '1')
}

// Plays the load sequence. On a normal load: 1200ms hold (wordmark/title
// slide up during it) + 300ms fade + 1000ms curtain, 2.5s total. Arriving
// via a cross-page transition instead: the text is shown already landed
// (no repeat slide-up) and the hold is a brief 300ms, since the previous
// page already held on this same name a moment ago. `onReveal` fires as the
// curtain starts opening, so the page's own intro animation can play
// underneath it.
export async function playPreloader(onReveal: () => void) {
  const preloader = document.querySelector<HTMLElement>('#preloader')
  const preWord = document.querySelector<HTMLElement>('#preloader .pre-word')

  const arrivedViaTransition = sessionStorage.getItem(TRANSITION_FLAG) === '1'
  sessionStorage.removeItem(TRANSITION_FLAG)

  gsap.set(preWord, { autoAlpha: 1, scale: 1 })

  if (!preloader) {
    onReveal()
    return
  }

  const curtain = curveTransition({ container: preloader, color: '#333333', duration: 1000 })
  curtain.setCovered() // start already closed, logo already visible — no grow-in for the curtain itself

  if (arrivedViaTransition) {
    gsap.set('#preloader .pre-name-inner, #preloader .pre-title', { yPercent: 0 }) // already landed — no repeat slide-up
    await new Promise((resolve) => setTimeout(resolve, 300))
  } else {
    hidePreloaderText()
    revealPreloaderText() // wordmark, then the title, slide up during the hold below (not awaited — doesn't extend it)
    await new Promise((resolve) => setTimeout(resolve, 1200)) // hold on the logo
  }

  await new Promise<void>((resolve) => {
    gsap.to(preWord, { autoAlpha: 0, duration: 0.3, onComplete: resolve })
  })
  onReveal()
  await curtain.reveal() // single motion: curtain opens, revealing the hero
  curtain.destroy()

  gsap.set(preloader, { display: 'none' })
}
