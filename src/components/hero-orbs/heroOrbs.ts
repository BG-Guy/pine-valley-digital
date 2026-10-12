// Hero orbs: two soft colour washes (purple and green) behind a hero's right
// side, each gliding to the other's spot and back, forever. Used by the home
// hero and every service page's hero. The hero must be position: relative
// with overflow: hidden, and its content position: relative so it paints
// above them. Styles live in heroOrbs.css.
import './heroOrbs.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Markup: the two orbs. Put it first inside the hero.
export const renderHeroOrbs = () => `
      <div class="hero-orb hero-orb-a" aria-hidden="true"></div>
      <div class="hero-orb hero-orb-b" aria-hidden="true"></div>`

// Starts the orbs inside `hero` moving. Only `transform` is animated
// (composited, no repaint); the travel distance is measured from layout so
// it holds at every breakpoint, and rebuilt on resize (ScrollTrigger's
// 'refresh') with the loop position preserved. Still for reduced motion.
export function initHeroOrbs(hero: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const a = hero.querySelector<HTMLElement>('.hero-orb-a')
  const b = hero.querySelector<HTMLElement>('.hero-orb-b')
  if (!a || !b) return

  // offsetLeft/Top ignore transforms, so this is the resting centre.
  const center = (el: HTMLElement) => ({
    x: el.offsetLeft + el.offsetWidth / 2,
    y: el.offsetTop + el.offsetHeight / 2,
  })
  const loop = { duration: 7.7, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 1 }

  let tweens: gsap.core.Tween[] = []
  const build = () => {
    const time = tweens[0]?.totalTime() ?? 0
    tweens.forEach((t) => t.kill())
    gsap.set([a, b], { x: 0, y: 0 })
    const ca = center(a)
    const cb = center(b)
    const dx = cb.x - ca.x
    const dy = cb.y - ca.y
    tweens = [gsap.to(a, { x: dx, y: dy, ...loop }), gsap.to(b, { x: -dx, y: -dy, ...loop })]
    tweens.forEach((t) => t.totalTime(time))
  }
  build()
  ScrollTrigger.addEventListener('refresh', build)
}
