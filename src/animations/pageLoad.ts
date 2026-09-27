// Page load: the first-visit sequence — the preloader curtain plays, then the
// navbar and hero lines animate in underneath it as it opens.
import { gsap } from 'gsap'
import { playPreloader } from '../components/preloader/preloader'

// Runs the load-in. With reduced motion there is no preloader and everything
// simply appears. Call after the markup is in the DOM.
export function initPageLoad() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const nav = document.querySelector('#site-nav')
  const heroLines = gsap.utils.toArray<HTMLElement>('.hero-line > span')
  const heroEyebrow = document.querySelector('.hero-eyebrow span')
  const heroSub = document.querySelector('.hero-sub')
  const preloader = document.querySelector<HTMLElement>('#preloader')

  if (reduceMotion) {
    gsap.set([preloader], { display: 'none' })
    gsap.set([nav, heroSub], { opacity: 1 })
    gsap.set(heroLines, { y: 0 })
    if (heroEyebrow) gsap.set(heroEyebrow, { y: 0 })
    return
  }

  // Start the hero pieces hidden (lines below their mask, sub-copy faded).
  gsap.set(heroLines, { yPercent: 110 })
  gsap.set(heroEyebrow, { yPercent: 110 })
  gsap.set(heroSub, { autoAlpha: 0, y: 16 })

  // The page's own intro, played as the curtain opens.
  const revealPage = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
  revealPage
    .to(nav, { opacity: 1, duration: 0.6 })
    .to(heroEyebrow, { yPercent: 0, duration: 0.7 }, '<')
    .to(heroLines, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '<+=0.1')
    .to(heroSub, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.5')

  if (preloader) {
    playPreloader(() => revealPage.play())
  } else {
    revealPage.play()
  }
}
