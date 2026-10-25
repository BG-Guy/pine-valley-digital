// Preloader: the loading screen on every page. Four tilted stripes cover the
// screen (stripeWipe.ts) with a cream card on top — Pine Pal stuck on its
// edge, the wordmark and the page's name. The card drops away and the
// stripes sweep off to the right, uncovering the page. Leaving for another
// page plays it the other way round (see animations/pageTransitions.ts):
// the stripes sweep in and the card shows the next page's name.
import './preloader.css'
import { gsap } from 'gsap'
import { renderStripes, stripeWipe, CURTAIN, SWEEP } from './stripeWipe'
import { logoWordmark } from '../logo/logo'
import { pinePal } from '../mascots/mascots'

// Markup: the stripes, then the card: a small wordmark over the page's name,
// which is the big text. Each sits in its own mask (overflow-hidden outer +
// a block inner) so it can slide up into place — the same technique the
// hero's lines use.
export const renderPreloader = (title: string) => `
  <div id="preloader">
    ${renderStripes()}
    <div class="pre-word">
      <div class="pre-card">
        ${pinePal('pre-pal')}
        <span class="pre-name overflow-hidden block">
          <span class="pre-name-inner block">${logoWordmark('text-lg sm:text-xl')}</span>
        </span>
        <span class="pre-title-viewport overflow-hidden block">
          <span class="pre-title block">${title}</span>
        </span>
      </div>
    </div>
  </div>
`

const TEXT = '#preloader .pre-name-inner, #preloader .pre-title'

// The card's contents take their time: the text and Pine Pal move at half
// the stripes' speed (stripeWipe.ts), so the stripes read as the quick part.
const SLOW = CURTAIN * 2

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// The card springs up as fast as the stripes. Then, at half that speed, the
// wordmark and the page's name glide up into place and Pine Pal bounces
// onto the card's edge — and once he's landed, he winks. Resolves once the
// wink is over.
function showCard(card: HTMLElement) {
  const pal = card.querySelector<SVGElement>('.pre-pal')
  gsap.set(TEXT, { yPercent: 110 })
  return new Promise<void>((resolve) => {
    gsap
      .timeline({ onComplete: resolve })
      .fromTo(card, { autoAlpha: 0, y: 0, scale: 0.85, rotation: -6 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: CURTAIN, ease: 'back.out(1.7)' }, 0)
      .fromTo(pal, { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: SLOW, ease: 'back.out(2.2)' }, 0.05)
      .to('#preloader .pre-name-inner', { yPercent: 0, duration: SLOW, ease: 'power3.out' }, 0.1)
      .to('#preloader .pre-title', { yPercent: 0, duration: SLOW, ease: 'power3.out' }, 0.22)
      .call(() => pal?.classList.add('is-winking'), [], 0.68)
      .call(() => pal?.classList.remove('is-winking'), [], 1.06)
  })
}

// The card drops away, before the stripes leave.
function hideCard(card: HTMLElement) {
  return new Promise<void>((resolve) => {
    gsap.to(card, { autoAlpha: 0, y: 40, rotation: 6, scale: 0.9, duration: 0.21, ease: 'power2.in', onComplete: resolve })
  })
}

// A cross-page transition shows the next page's name on the card just
// before it navigates. Without this flag, the page you land on would play
// that same pop-in again from scratch — the card visibly repeating. Set
// just before navigating away; read and cleared once, on the very next
// playPreloader() call.
const TRANSITION_FLAG = 'pvd:arrived-via-transition'

// Plays the load sequence. On a normal load: the card comes in (and Pine Pal
// winks) during a 1200ms hold, drops away (210ms) and the stripes sweep off
// (about 0.5s). Arriving via a cross-page transition instead, the card is
// already up, as the last page left it, so the hold is a brief 210ms.
// `onReveal` fires as the stripes start to leave, so the page's own intro
// plays underneath them.
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
    await wait(210)
  } else {
    await Promise.all([showCard(card), wait(1200)])
  }

  await hideCard(card)
  onReveal()
  await stripeWipe(preloader.querySelector<HTMLElement>('.wipe')!).reveal()
  gsap.set(preloader, { display: 'none' })
}

// The way out to another page: the stripes sweep in over this one, and as
// the last of them lands the card comes in with `title`. Resolves once Pine
// Pal has winked and it has held a moment, ready for the caller to
// navigate; the next page opens from this same picture.
export async function coverForNavigation(title: string) {
  const preloader = document.querySelector<HTMLElement>('#preloader')
  const card = preloader?.querySelector<HTMLElement>('.pre-word')
  if (!preloader || !card) return

  preloader.querySelector('.pre-title')!.textContent = title
  gsap.set(card, { autoAlpha: 0 })
  gsap.set(preloader, { display: 'flex' })
  stripeWipe(preloader.querySelector<HTMLElement>('.wipe')!).cover()
  await wait((SWEEP - 0.1) * 1000)
  await showCard(card)
  await wait(100)
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
