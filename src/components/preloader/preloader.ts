// Preloader: the loading screen on every page. Four tilted stripes cover the
// screen (stripeWipe.ts) with a cream card on top — Pine Pal stuck on its
// edge, the wordmark and the page's name. The card drops away and the
// stripes sweep off to the right, uncovering the page. Leaving for another
// page plays it the other way round (see animations/pageTransitions.ts):
// the stripes sweep in and the card shows the next page's name.
import './preloader.css'
import { gsap } from 'gsap'
import { renderStripes, stripeWipe } from './stripeWipe'
import { logoWordmark } from '../logo/logo'
import { pinePal } from '../mascots/mascots'

// Markup: the stripes, then the card. The wordmark and the page's name each
// sit in their own mask (overflow-hidden outer + a block inner) so they can
// slide up into place — the same technique the hero's lines use.
export const renderPreloader = (title: string) => `
  <div id="preloader">
    ${renderStripes()}
    <div class="pre-word">
      <div class="pre-card">
        ${pinePal('pre-pal')}
        <span class="pre-name overflow-hidden block">
          <span class="pre-name-inner block">${logoWordmark('text-3xl sm:text-5xl')}</span>
        </span>
        <span class="pre-title-viewport overflow-hidden block">
          <span class="pre-title block">${title}</span>
        </span>
      </div>
    </div>
  </div>
`

const TEXT = '#preloader .pre-name-inner, #preloader .pre-title'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// The card pops up with a spring, then the wordmark and the name slide up
// into place. Resolves once both have landed.
function showCard(card: HTMLElement) {
  gsap.set(TEXT, { yPercent: 110 })
  return new Promise<void>((resolve) => {
    gsap
      .timeline({ onComplete: resolve })
      .fromTo(card, { autoAlpha: 0, y: 0, scale: 0.6, rotation: -10 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' })
      .to('#preloader .pre-name-inner', { yPercent: 0, duration: 0.6, ease: 'power4.out' }, '-=0.25')
      .to('#preloader .pre-title', { yPercent: 0, duration: 0.5, ease: 'power4.out' }, '<+=0.15')
  })
}

// The card drops away, before the stripes leave.
function hideCard(card: HTMLElement) {
  return new Promise<void>((resolve) => {
    gsap.to(card, { autoAlpha: 0, y: 40, rotation: 6, scale: 0.9, duration: 0.3, ease: 'power2.in', onComplete: resolve })
  })
}

// A cross-page transition shows the next page's name on the card just
// before it navigates. Without this flag, the page you land on would play
// that same pop-in again from scratch — the card visibly repeating. Set
// just before navigating away; read and cleared once, on the very next
// playPreloader() call.
const TRANSITION_FLAG = 'pvd:arrived-via-transition'

// Plays the load sequence. On a normal load: the card pops in during a
// 1200ms hold, drops away (300ms) and the stripes sweep off (about 1.1s).
// Arriving via a cross-page transition instead, the card is already up, as
// the last page left it, so the hold is a brief 300ms. `onReveal` fires as
// the stripes start to leave, so the page's own intro plays underneath them.
export async function playPreloader(onReveal: () => void) {
  const preloader = document.querySelector<HTMLElement>('#preloader')
  const card = preloader?.querySelector<HTMLElement>('.pre-word')

  const arrivedViaTransition = sessionStorage.getItem(TRANSITION_FLAG) === '1'
  sessionStorage.removeItem(TRANSITION_FLAG)

  if (!preloader || !card) {
    onReveal()
    return
  }

  if (arrivedViaTransition) {
    await wait(300)
  } else {
    showCard(card) // not awaited: it plays during the hold
    await wait(1200)
  }

  await hideCard(card)
  onReveal()
  await stripeWipe(preloader.querySelector<HTMLElement>('.wipe')!).reveal()
  gsap.set(preloader, { display: 'none' })
}

// The way out to another page: the stripes sweep in over this one, then the
// card pops up with `title`. Resolves once it has held a moment, ready for
// the caller to navigate; the next page opens from this same picture.
export async function coverForNavigation(title: string) {
  const preloader = document.querySelector<HTMLElement>('#preloader')
  const card = preloader?.querySelector<HTMLElement>('.pre-word')
  if (!preloader || !card) return

  preloader.querySelector('.pre-title')!.textContent = title
  gsap.set(card, { autoAlpha: 0 })
  gsap.set(preloader, { display: 'flex' })
  await stripeWipe(preloader.querySelector<HTMLElement>('.wipe')!).cover()
  await showCard(card)
  await wait(150)
  sessionStorage.setItem(TRANSITION_FLAG, '1')
}

// Uncovers a page that comes back still covered — the browser's
// back/forward cache restores it exactly as it was left, mid-transition.
export async function uncoverPage() {
  const preloader = document.querySelector<HTMLElement>('#preloader')
  const card = preloader?.querySelector<HTMLElement>('.pre-word')
  if (!preloader || !card || getComputedStyle(preloader).display === 'none') return

  await hideCard(card)
  await stripeWipe(preloader.querySelector<HTMLElement>('.wipe')!).reveal()
  gsap.set(preloader, { display: 'none' })
}
