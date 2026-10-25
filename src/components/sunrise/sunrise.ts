// Sunrise: the footer's closing scene — four rolling hills with pines, a
// pine valley, and a smiling sun that rises from behind them as the footer
// is uncovered, its toothed ring turning. Scroll-driven: the sun only moves while you scroll. The hills are a
// still drawing, redrawn only to fit the width; the sun is its own layer
// that slides and turns (transforms only), so nothing is redrawn as it
// moves. Styles live in sunrise.css.
import './sunrise.css'
import '../mascots/mascots.css' // the face's blink
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { face, n1, paint, smooth, teeth, type Pt } from '../drawing/drawing'

const FILLS = ['lilac', 'mint', 'coral', 'lemon'] // the back hill first

// Where the pines stand along the second hill (fractions of the width), in
// pairs of a big one and a small one.
const PINES = [0.08, 0.12, 0.42, 0.47, 0.86, 0.9]

// Markup: the sun (its toothed ring, then its face, in a 100×100 box
// centred on 0,0), with the hills drawn over it by initSunrise().
export const renderSunrise = () => `
    <div class="sunrise" aria-hidden="true">
      <div class="sunrise-sun">
        <svg class="sunrise-ring" viewBox="-50 -50 100 100"><polygon points="${teeth(0, 0, 48.5, 41.5, 26)}" ${paint('coral', 2.5)}/></svg>
        <svg class="sunrise-face" viewBox="-50 -50 100 100"><circle r="37.5" ${paint('paper', 2.5)}/><circle r="31.5" ${paint('lemon', 2.5)}/>${face(0, -2, 1.05, { round: true, smileLine: 2 })}</svg>
      </div>
      <svg class="sunrise-art"></svg>
    </div>`

// Each hill's skyline across a w×h strip: a long roll with a smaller one on
// top, each hill lower, flatter and choppier than the one behind it.
function hillLine(k: number, w: number, h: number): Pt[] {
  const base = h * (0.46 + 0.15 * k)
  const rise = h * (0.1 - 0.016 * k)
  const length = h * (2.9 - 0.35 * k)
  const pts: Pt[] = []
  for (let x = -40; x <= w + 40; x += 24) {
    pts.push([x, base + rise * Math.sin((x / length) * Math.PI * 2 + k * 1.9) + rise * 0.3 * Math.sin((x / length) * Math.PI * 4.6 + k)])
  }
  return pts
}

// The skyline's height at x, between its points.
const heightAt = (pts: Pt[], x: number) => {
  const i = Math.max(0, pts.findIndex((p) => p[0] >= x) - 1)
  const a = pts[i]
  const b = pts[i + 1] ?? a
  return a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0] || 1)
}

// A pine standing at (x, y), `s` times the size of a 58px one: the logo's
// green with the ink line, like Pine Pal's tree, so it shows against the
// footer's ink sky as well as the hills.
const pine = (x: number, y: number, s: number) => {
  const tier = (half: number, top: number, tall: number) =>
    `M${n1(x)} ${n1(y - top * s)} l${n1(half * s)} ${n1(tall * s)} h${n1(-2 * half * s)} Z`
  return `<rect x="${n1(x - 3 * s)}" y="${n1(y - 14 * s)}" width="${n1(6 * s)}" height="${n1(15 * s)}" style="fill:var(--color-ink)"/><path d="${tier(16, 58, 24)} ${tier(12, 44, 22)} ${tier(8, 30, 18)}" ${paint('accent-2', 2.5)}/>`
}

// Draws the scene in the footer and drives the sun from the scroll.
// `trigger` is the reveal footer's spacer: the scroll room that uncovers
// the footer (components/reveal-footer).
export function initSunrise(trigger: HTMLElement) {
  const box = document.querySelector<HTMLElement>('.sunrise')
  const sun = box?.querySelector<HTMLElement>('.sunrise-sun')
  const ring = box?.querySelector<SVGElement>('.sunrise-ring')
  const svg = box?.querySelector<SVGElement>('.sunrise-art')
  if (!box || !sun || !ring || !svg) return

  const state = { progress: 0, w: 0, h: 0, r: 0, x: 0, low: 0, high: 0 }

  // Puts the sun where the progress says: rising fast, then slowing as it
  // tops out, its ring turning all the way.
  const place = () => {
    const lift = 1 - (1 - state.progress) ** 3
    const y = state.low + (state.high - state.low) * lift
    sun.style.transform = `translate(${n1(state.x - state.r)}px, ${n1(y - state.r)}px)`
    ring.style.transform = `rotate(${n1(state.progress * 140)}deg)`
  }

  // Redraws the hills and pines, and sizes the sun, for the strip's
  // current size.
  const draw = () => {
    const w = box.clientWidth
    const h = box.clientHeight
    if (!w || !h || (w === state.w && h === state.h)) return
    const hills = FILLS.map((_, k) => hillLine(k, w, h))
    const r = h * 0.27
    // The sun comes up in the deepest dip of the back hill on the right-hand
    // side: it starts tucked fully behind the hills there and rises until
    // its top nearly touches the top of the strip.
    const dip = hills[0].filter(([px]) => px > w * 0.55 && px < w * 0.85).reduce<Pt>((a, b) => (b[1] > a[1] ? b : a), [w * 0.7, 0])
    const horizon = Math.min(...hills.map((pts) => heightAt(pts, dip[0])))
    Object.assign(state, { w, h, r, x: dip[0], low: horizon + r + 6, high: r + h * 0.06 })
    sun.style.width = sun.style.height = `${n1(r * 2)}px`

    let art = ''
    hills.forEach((pts, k) => {
      art += `<path d="${smooth(pts)} L${n1(w + 40)} ${n1(h + 40)} L-40 ${n1(h + 40)} Z" ${paint(FILLS[k], 3)}/>`
      if (k === 1) {
        const s = (h * 0.22) / 58
        PINES.forEach((at, i) => {
          const x = w * at
          art += pine(x, heightAt(pts, x) + 6 * s, s * (i % 2 ? 0.85 : 1.1))
        })
      }
    })
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
    svg.innerHTML = art
    place()
  }

  draw()
  new ResizeObserver(draw).observe(box)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    state.progress = 1
    place()
    return
  }

  gsap.to(state, {
    progress: 1,
    ease: 'none',
    onUpdate: place,
    scrollTrigger: { trigger, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 },
  })

  // The footer settles its height once the fonts are in, and the reveal
  // footer resizes its scroll room to match, which moves where the page
  // ends; measure the scroll again then, or the sun would stop short of the
  // top. Watches the footer itself (the reveal footer's own observer runs
  // first and has already resized the room), since resizing the room from
  // inside another observer can't be reported in the same pass.
  let height = trigger.offsetHeight
  new ResizeObserver(() => {
    if (trigger.offsetHeight === height) return
    height = trigger.offsetHeight
    ScrollTrigger.refresh()
  }).observe(box.closest('footer') ?? box)
}
