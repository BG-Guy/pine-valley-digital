// Scroll scenes: a few scroll-driven touches in the site's own style.
//   - The coloured word in each section heading gets an underline, in its
//     own colour, swept in as the heading comes into view.
//   - The process / journey step lines fill in their colours, one after
//     another, as you scroll through the steps.
// It's all optional decoration, kept in this file and scrollScenes.css: drop
// the initScrollScenes() calls (src/main.ts, src/pages/services/main.ts)
// and the site looks exactly as it did, everything fully drawn. Skipped for
// reduced motion.
import './scrollScenes.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initScrollScenes() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  inkHeadingWords()
  fillStepLines()
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
