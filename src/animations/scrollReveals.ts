// Scroll reveals: fades and lifts `.reveal` elements into place as their
// section scrolls into view. Initial hidden state is in global.css.
import { gsap } from 'gsap'

// Reveals every `.reveal` element on the page. Call after the markup is in
// the DOM.
export function initScrollReveals() {
  // Repeating items (process steps) reveal together with a stagger,
  // triggered once when their section nears the viewport.
  const groups: [string, number][] = [['#process .process-step', 0.08]]

  groups.forEach(([selector, stagger]) => {
    const items = gsap.utils.toArray<HTMLElement>(selector)
    if (!items.length) return
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: items[0].closest('section') ?? items[0],
        start: 'top 80%',
      },
    })
  })

  // Everything else (headings, one-off blocks) reveals on its own.
  gsap.utils.toArray<HTMLElement>('.reveal:not(.process-step)').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    })
  })
}
