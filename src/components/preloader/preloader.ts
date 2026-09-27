// Preloader: the full-screen dark curtain shown on first load. The pine logo
// sits behind the wordmark while the page paints, then the curtain opens to
// reveal the hero (the curtain itself is drawn by curveTransition.ts).
import './preloader.css'
import { gsap } from 'gsap'
import { curveTransition } from './curveTransition'
import { logoMark, logoWordmark } from '../logo/logo'

// Markup: the wordmark with a large, faded pine mark centered behind it.
export const renderPreloader = () => `
  <div id="preloader">
    <div class="pre-word tracking-tight">
      <span class="relative inline-flex items-center justify-center text-4xl sm:text-6xl">
        <span class="absolute inset-0 -z-10 flex items-center justify-center">
          ${logoMark('w-[6em] h-[6em] opacity-20')}
        </span>
        ${logoWordmark('')}
      </span>
    </div>
  </div>
`

// Plays the load sequence — 2.5s total: 1200ms hold + 300ms fade + 1000ms
// curtain. `onReveal` fires as the curtain starts opening, so the page's own
// intro animation can play underneath it.
export async function playPreloader(onReveal: () => void) {
  const preloader = document.querySelector<HTMLElement>('#preloader')
  const preWord = document.querySelector<HTMLElement>('#preloader .pre-word')

  gsap.set(preWord, { autoAlpha: 1, scale: 1 })

  if (!preloader) {
    onReveal()
    return
  }

  const curtain = curveTransition({ container: preloader, color: '#333333', duration: 1000 })
  curtain.setCovered() // start already closed, logo already visible — no grow-in

  await new Promise((resolve) => setTimeout(resolve, 1200)) // hold on the logo
  await new Promise<void>((resolve) => {
    gsap.to(preWord, { autoAlpha: 0, duration: 0.3, onComplete: resolve })
  })
  onReveal()
  await curtain.reveal() // single motion: curtain opens, revealing the hero
  curtain.destroy()

  gsap.set(preloader, { display: 'none' })
}
