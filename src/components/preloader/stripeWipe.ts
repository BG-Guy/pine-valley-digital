// Stripe wipe: four tilted stripes — lemon, coral, mint, lilac, with the ink
// line between them — that sweep in from the left to cover the screen and
// sweep on out to the right to uncover it. The preloader (preloader.ts) sits
// on top of them, and page transitions (animations/pageTransitions.ts) use
// the same cover. The stripes only ever move sideways (transforms), so the
// browser can slide them on the GPU.
import { gsap } from 'gsap'

const FILLS = ['lemon', 'coral', 'mint', 'lilac']
const TILT = -12 // degrees; the stripes lean forward, the way they travel

// The stripes' markup, for the preloader to render.
export const renderStripes = () => `
    <div class="wipe" aria-hidden="true">
      ${FILLS.map((c) => `<i class="wipe-stripe" style="--stripe: var(--color-${c})"></i>`).join('')}
    </div>`

// Drives the stripes inside `wipe`. Until one of these runs they stay where
// the CSS puts them: in place, covering.
export function stripeWipe(wipe: HTMLElement) {
  const stripes = Array.from(wipe.querySelectorAll<HTMLElement>('.wipe-stripe'))
  // Far enough to clear the screen: the strip of stripes is wider than the
  // screen by the tilt's lean on both sides (see preloader.css).
  const travel = () => wipe.offsetWidth + 16
  // The rightmost stripe leads, so they move as one bundle with small gaps.
  const sweep = (from: number, to: number, duration: number, ease: string) =>
    new Promise<void>((resolve) => {
      gsap.fromTo(
        stripes,
        { x: from, skewX: TILT },
        { x: to, duration, ease, stagger: { each: 0.07, from: 'end' }, onComplete: resolve },
      )
    })

  return {
    // In from the left until the screen is covered.
    cover: () => sweep(-travel(), 0, 0.75, 'power3.out'),
    // On out to the right, uncovering the page.
    reveal: () => sweep(0, travel(), 0.9, 'power3.inOut'),
  }
}
