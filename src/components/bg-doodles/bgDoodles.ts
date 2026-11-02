// Background doodles: a layer behind every page's content that keeps the
// graph paper lively as you scroll. Two kinds, both flat fills with the
// kit's ink line (no gradients or blur):
//  - wavy ribbons across the page between some sections, their waves
//    rolling sideways on their own;
//  - doodles in the side margins (sparkles, squiggles, rings, zigzags,
//    plus signs, dots, blobs), each drifting at its own speed as you scroll
//    (parallax) and bobbing gently.
// They stay in the margins and the gaps between sections, so they never
// sit under text. Motion stops for reduced motion and with the tape's pause
// button (html[data-motion="paused"]). Styles live in bgDoodles.css.
import './bgDoodles.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const INK = 'var(--color-ink)'
const line = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`

// A colour stroke with an ink outline: the ink drawn wide, the colour on top.
const inked = (d: string, color: string, w = 9) => `<path d="${d}" fill="none" ${line(w + 6)}/><path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`

// Each doodle in a 100×100 box.
const SHAPES: Record<string, (c: string) => string> = {
  sparkle: (c) => `<path d="M50 6 Q54 46 94 50 Q54 54 50 94 Q46 54 6 50 Q46 46 50 6Z" fill="${c}" ${line(4)}/>`,
  squiggle: (c) => inked('M10 62 C22 30 34 30 42 50 S62 72 70 50 S86 26 92 40', c),
  ring: (c) => `<circle cx="50" cy="50" r="34" fill="none" ${line(26)}/><circle cx="50" cy="50" r="34" fill="none" stroke="${c}" stroke-width="18"/>`,
  zigzag: (c) => inked('M8 64 L24 36 L40 64 L56 36 L72 64 L90 36', c),
  plus: (c) => `<path d="M38 10 H62 V38 H90 V62 H62 V90 H38 V62 H10 V38 H38Z" fill="${c}" ${line(4)}/>`,
  dots: () => [20, 50, 80].flatMap((x) => [20, 50, 80].map((y) => `<circle cx="${x}" cy="${y}" r="7" fill="${INK}"/>`)).join(''),
  blob: (c) => `<path d="M52 8 C76 8 94 26 90 50 C87 72 72 92 48 90 C24 88 8 72 10 48 C12 24 28 8 52 8Z" fill="${c}" ${line(4)}/><circle cx="38" cy="42" r="5" fill="${INK}"/><circle cx="60" cy="42" r="5" fill="${INK}"/>`,
  half: (c) => `<path d="M8 70 A42 42 0 0 1 92 70 Z" fill="${c}" ${line(4)}/><path d="M28 70 A22 22 0 0 1 72 70" fill="none" ${line(4)}/>`,
}

const COLORS = ['var(--color-lemon)', 'var(--color-coral)', 'var(--color-mint)', 'var(--color-lilac)']

// Where the margin doodles sit: a side, how far down the page (0-1), size
// (px), turn, and parallax speed (how much faster or slower than the page
// it moves; negative drifts up). `wide` ones only show on wide screens.
const PLACES: { shape: string; side: 'l' | 'r'; y: number; size: number; rot: number; speed: number; wide?: boolean }[] = [
  { shape: 'sparkle', side: 'r', y: 0.04, size: 70, rot: 8, speed: -0.25 },
  { shape: 'squiggle', side: 'l', y: 0.09, size: 120, rot: -12, speed: 0.2, wide: true },
  { shape: 'ring', side: 'l', y: 0.16, size: 90, rot: 0, speed: -0.35 },
  { shape: 'zigzag', side: 'r', y: 0.22, size: 120, rot: 18, speed: 0.3, wide: true },
  { shape: 'plus', side: 'r', y: 0.3, size: 64, rot: 14, speed: -0.2 },
  { shape: 'dots', side: 'l', y: 0.34, size: 70, rot: 0, speed: 0.15, wide: true },
  { shape: 'blob', side: 'l', y: 0.42, size: 96, rot: -8, speed: -0.3 },
  { shape: 'half', side: 'r', y: 0.48, size: 110, rot: -10, speed: 0.25, wide: true },
  { shape: 'sparkle', side: 'l', y: 0.55, size: 60, rot: -6, speed: 0.35 },
  { shape: 'squiggle', side: 'r', y: 0.61, size: 130, rot: 160, speed: -0.25 },
  { shape: 'ring', side: 'r', y: 0.69, size: 80, rot: 0, speed: 0.3, wide: true },
  { shape: 'zigzag', side: 'l', y: 0.75, size: 110, rot: -20, speed: -0.2 },
  { shape: 'plus', side: 'l', y: 0.84, size: 56, rot: -12, speed: 0.25, wide: true },
  { shape: 'sparkle', side: 'r', y: 0.9, size: 74, rot: 12, speed: -0.3 },
]

// A ribbon: three stacked wavy bands, drawn twice as wide as the screen so
// sliding it left by half loops seamlessly.
const RIBBON_COLORS = [
  ['var(--color-lemon)', 'var(--color-coral)', 'var(--color-lilac)'],
  ['var(--color-mint)', 'var(--color-lemon)', 'var(--color-coral)'],
  ['var(--color-lilac)', 'var(--color-mint)', 'var(--color-lemon)'],
]
function ribbon(colors: string[]) {
  const wave = (y: number) => {
    let d = `M0 ${y}`
    for (let x = 0; x < 2400; x += 200) d += ` q50 -18 100 0 t100 0`
    return d
  }
  return `<svg class="bgd-ribbon-art" viewBox="0 0 2400 90" preserveAspectRatio="none">${colors
    .map((c, i) => `<path d="${wave(26 + i * 19)}" fill="none" ${line(22)}/><path d="${wave(26 + i * 19)}" fill="none" stroke="${c}" stroke-width="15"/>`)
    .join('')}</svg>`
}

export function initBgDoodles() {
  const shell = document.getElementById('page-shell')
  const main = shell?.querySelector('main')
  if (!shell || !main) return

  const layer = document.createElement('div')
  layer.className = 'bgd'
  layer.setAttribute('aria-hidden', 'true')
  layer.innerHTML =
    PLACES.map(
      (p, i) => `
      <div class="bgd-item bgd-${p.side}${p.wide ? ' bgd-wide' : ''}" style="--y: ${p.y}; --size: ${p.size}px; --rot: ${p.rot}deg; --bob: ${3 + (i % 4)}s" data-speed="${p.speed}">
        <svg viewBox="0 0 100 100">${SHAPES[p.shape](COLORS[i % COLORS.length])}</svg>
      </div>`,
    ).join('') + RIBBON_COLORS.map((c) => `<div class="bgd-ribbon" hidden>${ribbon(c)}</div>`).join('')
  shell.prepend(layer)

  // Ribbons go in the gap above every other section, from the second one
  // on, and move when the page's height changes (fonts, images, resizes).
  const ribbons = Array.from(layer.querySelectorAll<HTMLElement>('.bgd-ribbon'))
  const placeRibbons = () => {
    const sections = Array.from(main.querySelectorAll<HTMLElement>(':scope > section')).filter((_, i) => i > 0 && i % 2 === 1)
    const top = shell.getBoundingClientRect().top
    ribbons.forEach((r, i) => {
      const s = sections[i]
      r.hidden = !s
      if (s) r.style.top = `${s.getBoundingClientRect().top - top}px`
    })
  }
  placeRibbons()
  let raf = 0
  new ResizeObserver(() => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      placeRibbons()
      ScrollTrigger.refresh()
    })
  }).observe(main)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Parallax: each doodle drifts by its speed times how far it travels
  // through the screen.
  layer.querySelectorAll<HTMLElement>('.bgd-item').forEach((el) => {
    const speed = Number(el.dataset.speed)
    gsap.fromTo(el, { y: () => -speed * window.innerHeight * 0.5 }, {
      y: () => speed * window.innerHeight * 0.5,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    })
  })
}
