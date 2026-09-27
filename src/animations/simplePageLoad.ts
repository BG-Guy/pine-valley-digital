// Shared "simple" page-load boot: plays the same preloader curtain as the
// home page, then just fades the navbar in — no hero-line stagger, no
// section-specific timeline. Used by every secondary page (Lab, each
// service landing page) that doesn't need anything fancier than that; the
// home page keeps its own richer sequence in pageLoad.ts.
import { gsap } from 'gsap'
import { playPreloader } from '../components/preloader/preloader'

export function initSimplePageLoad() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const nav = document.querySelector('#site-nav')
  const preloader = document.querySelector<HTMLElement>('#preloader')

  if (reduceMotion) {
    gsap.set(preloader, { display: 'none' })
    gsap.set(nav, { opacity: 1 })
    return
  }

  if (preloader) {
    playPreloader(() => gsap.to(nav, { opacity: 1, duration: 0.6, ease: 'power4.out' }))
  } else {
    gsap.set(nav, { opacity: 1 })
  }
}
