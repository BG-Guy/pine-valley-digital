// Scroll scenes: a few scroll-driven touches in the site's own style.
//   - The ink frame along the oval edge under the hero draws itself out
//     from the oval's peak, once, as the page opens or as it comes into
//     view.
//   - The coloured word in each section heading gets an underline, in its
//     own colour, swept in as the heading comes into view.
//   - The process / journey step lines fill in their colours, one after
//     another, as you scroll through the steps.
// It's all optional decoration, kept in this file and scrollScenes.css: drop
// the initScrollScenes() calls (src/main.ts, src/pages/services/main.ts)
// and the site looks exactly as it did, everything fully drawn. Skipped for
// reduced motion.
import './scrollScenes.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pageRevealed } from '../components/preloader/preloader'

export function initScrollScenes() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  drawOvalFrames()
  inkHeadingWords()
  fillStepLines()
}

// The oval's ink frame draws out from the peak to both sides, once: as the
// load curtain opens if the oval is already on screen, otherwise when it
// comes into view (from either side — a reload can land below it). A tween
// of the --oval-draw progress, which the CSS turns into a widening clip.
function drawOvalFrames() {
  const ovals = document.querySelectorAll<HTMLElement>('.oval-top')
  ovals.forEach((oval) => oval.style.setProperty('--oval-draw', '0'))
  pageRevealed.then(() => {
    const inView = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return
          inView.unobserve(target)
          gsap.to(target, { '--oval-draw': 1, duration: 1.4, ease: 'power3.inOut' })
        }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    ovals.forEach((oval) => inView.observe(oval))
  })
}

// The accent-coloured word in each section heading gets an underline in its
// own colour, swept in left to right the first time the heading comes into
// view.
function inkHeadingWords() {
  document.querySelectorAll<HTMLElement>('main h2 span[class*="color-accent"]').forEach((word) => {
    word.classList.add('ink-word')
    ScrollTrigger.create({
      trigger: word,
      start: 'top 82%',
      once: true,
      onEnter: () => word.classList.add('is-inked'),
    })
  })
}

// Step lines (the steps' inline 2px top borders) fill in their own colour
// over a faint track, one after another, as their row scrolls through the
// screen.
function fillStepLines() {
  const rows = new Map<HTMLElement, HTMLElement[]>()
  document.querySelectorAll<HTMLElement>('main [style*="border-top: 2px solid"]').forEach((step) => {
    const row = step.parentElement
    if (row) rows.set(row, [...(rows.get(row) ?? []), step])
  })
  rows.forEach((steps, row) => {
    steps.forEach((step) => {
      // The resolved colour, read before .step-line restyles the border: the
      // inline border is a shorthand with var(), whose longhands read back
      // empty from step.style.
      step.style.setProperty('--step-color', getComputedStyle(step).borderTopColor)
      step.classList.add('step-line')
    })
    const set = (p: number) =>
      steps.forEach((step, i) => step.style.setProperty('--step-fill', String(Math.min(1, Math.max(0, p * steps.length - i)))))
    set(0)
    ScrollTrigger.create({
      trigger: row,
      start: 'top 80%',
      end: 'bottom 55%',
      onUpdate: (self) => set(self.progress),
      onRefresh: (self) => set(self.progress),
    })
  })
}
