// Flowing bands: four ink-lined bands in the theme's flat colours that rise
// out of a panel's bottom-left corner, after FlowFest's closing card. They
// ripple as the panel scrolls through the screen — scroll-driven, so they
// only move while you do. Sized to the free corner under the panel's text,
// so they never run under a word or a field. On the lilac contact panels
// (sections/contact and the service pages' form). Styles live in
// flowBands.css.
import './flowBands.css'
import { gsap } from 'gsap'
import { cubicPts, n1, offsetPts, smooth } from '../drawing/drawing'

const FILLS = ['coral', 'lemon', 'mint', 'coral'] // outermost band first

// Markup: goes first inside the panel, which must be position: relative.
export const renderFlowBands = () => `
          <div class="flow-bands" aria-hidden="true">
            <svg class="flow-bands-art">${FILLS.map((c) => `<path style="fill:var(--color-${c})"/>`).join('')}</svg>
          </div>`

// The four bands for a w×h corner at `phase`, outermost first: each one the
// region between a wavy line and the bottom-left corner. The lines are one
// curve pushed in towards the corner a band's width at a time, so every
// band keeps the same width round the bends.
function bandPaths(w: number, h: number, phase: number) {
  const width = Math.min(h * 0.19, w * 0.1, 40)
  const a = Math.sin(phase) * h * 0.14
  const b = Math.cos(phase * 1.3) * h * 0.12
  const c = Math.sin(phase * 0.8 + 1) * w * 0.06
  // In through the left side near the top, a wave across, then down and out
  // through the bottom.
  const edge = cubicPts([-30, h * 0.1 + a * 0.4], [w * 0.38 + c, -h * 0.12 + a], [w * 0.55 - c, h * 0.7 + b], [w * 0.98, h + 30], 48)
  return FILLS.map((_, k) => `${smooth(offsetPts(edge, k * width))} L-60 ${n1(h + 60)} Z`)
}

// Wires every panel's bands on the page. Call after the markup is in the
// DOM.
export function initFlowBands() {
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.querySelectorAll<HTMLElement>('.flow-bands').forEach((box) => {
    const panel = box.parentElement!
    const svg = box.querySelector('svg')!
    const paths = Array.from(svg.querySelectorAll('path'))
    const state = { phase: 0.6, w: 0, h: 0 }

    const draw = () => {
      if (!state.w || !state.h) return
      bandPaths(state.w, state.h, state.phase).forEach((d, i) => paths[i].setAttribute('d', d))
    }

    // Fits the bands to the corner: as far right as the second column (or
    // most of the way across when the columns stack), and as tall as the
    // gap between the lowest text in that span and the panel's bottom.
    const fit = () => {
      const p = panel.getBoundingClientRect()
      const line = parseFloat(getComputedStyle(panel).borderLeftWidth)
      const left = p.left + line
      const bottom = p.bottom - line
      const [first, second] = Array.from(panel.children).filter((el) => el !== box)
      const sideBySide = second && second.getBoundingClientRect().top < first.getBoundingClientRect().bottom
      const w = sideBySide ? second.getBoundingClientRect().left - left - 24 : (p.width - line * 2) * 0.72
      let lowest = p.top
      panel.querySelectorAll<HTMLElement>('h2, p, label, legend, a, button, input, textarea').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.height && r.left < left + w && r.right > left) lowest = Math.max(lowest, r.bottom)
      })
      const h = Math.min(bottom - lowest - 14, w * 0.6)
      state.w = Math.max(0, Math.round(w))
      state.h = Math.max(0, Math.round(h))
      box.hidden = state.h < 48
      box.style.width = `${state.w}px`
      box.style.height = `${state.h}px`
      svg.setAttribute('viewBox', `0 0 ${state.w} ${state.h}`)
      draw()
    }

    fit()
    new ResizeObserver(fit).observe(panel)
    document.fonts?.ready.then(fit)

    if (still) return
    // One slow ripple's worth of phase across the panel's whole trip
    // through the screen, smoothed a little.
    gsap.fromTo(
      state,
      { phase: 0 },
      {
        phase: Math.PI * 2.4,
        ease: 'none',
        onUpdate: draw,
        scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    )
  })
}
