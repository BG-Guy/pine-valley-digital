// SVG drawing helpers for the theme's hand-drawn pieces: the mascots
// (components/mascots), the flowing bands (components/flow-bands) and the
// footer's sunrise (components/sunrise). Each returns path data or markup in
// the caller's own coordinates; colours come from the theme's CSS variables.

export type Pt = [number, number]

// Rounds to one decimal place, to keep path strings short.
export const n1 = (n: number) => Math.round(n * 10) / 10

// An inline style that paints a shape in a theme colour with the ink line.
// SVG attributes can't read CSS variables, so the colours go in style.
export const paint = (fill: string, line = 2.5) =>
  `style="fill:var(--color-${fill});stroke:var(--color-ink);stroke-width:${line};stroke-linejoin:round"`

// A smooth path through points (Catmull-Rom turned into cubic Béziers).
export function smooth(pts: Pt[]) {
  let d = `M${n1(pts[0][0])} ${n1(pts[0][1])}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    d += ` C${n1(p1[0] + (p2[0] - p0[0]) / 6)} ${n1(p1[1] + (p2[1] - p0[1]) / 6)} ${n1(p2[0] - (p3[0] - p1[0]) / 6)} ${n1(p2[1] - (p3[1] - p1[1]) / 6)} ${n1(p2[0])} ${n1(p2[1])}`
  }
  return d
}

// `n + 1` points along a cubic Bézier.
export function cubicPts(p0: Pt, p1: Pt, p2: Pt, p3: Pt, n = 40): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n
    const u = 1 - t
    return [
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ]
  })
}

// The same points pushed `d` sideways along the curve's normal (to the right
// of the direction of travel), so bands built from them stay the same width
// round the bends.
export function offsetPts(pts: Pt[], d: number): Pt[] {
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)]
    const b = pts[Math.min(pts.length - 1, i + 1)]
    const tx = b[0] - a[0]
    const ty = b[1] - a[1]
    const len = Math.hypot(tx, ty) || 1
    return [p[0] - (ty / len) * d, p[1] + (tx / len) * d]
  })
}

// A toothed badge outline (a sun's ring): `n` teeth between two radii, as
// polygon points.
export function teeth(cx: number, cy: number, rOut: number, rIn: number, n: number) {
  return Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n
    const r = i % 2 ? rIn : rOut
    return `${n1(cx + r * Math.cos(a))},${n1(cy + r * Math.sin(a))}`
  }).join(' ')
}

// A scalloped badge outline: a circle with `n` soft bumps, as path data.
export function scallop(cx: number, cy: number, r: number, bump: number, n: number) {
  const steps = 120
  return (
    Array.from({ length: steps }, (_, i) => {
      const a = (Math.PI * 2 * i) / steps
      const rr = r + bump * Math.abs(Math.cos((n / 2) * a))
      return `${i ? 'L' : 'M'}${n1(cx + rr * Math.cos(a))} ${n1(cy + rr * Math.sin(a))}`
    }).join(' ') + 'Z'
  )
}

// A face centred on (cx, cy) at scale `s`: two blinking eyes and a smile.
// `wink` closes the right eye; `winkable` draws both the open eye and the
// wink, for a caller that switches between them (Pine Pal, Zap). `round`
// gives small round eyes instead of tall ovals, and `smileLine` sets the
// smile's thickness (the footer's sun has both, for a small, cute face).
export function face(cx: number, cy: number, s = 1, { wink = false, winkable = false, round = false, smileLine = 3 } = {}) {
  const [rx, ry] = round ? [2, 2] : [2.6, 3.6]
  const eye = (x: number, extra = '') =>
    `<ellipse class="m-blink${extra}" cx="${n1(x)}" cy="${n1(cy)}" rx="${n1(rx * s)}" ry="${n1(ry * s)}" style="fill:var(--color-ink)"/>`
  const lid = (extra = '') =>
    `<path class="${extra}" d="M${n1(cx + 5 * s)} ${n1(cy + 0.5 * s)} q${n1(3.5 * s)} ${n1(-3.5 * s)} ${n1(7 * s)} 0" style="fill:none;stroke:var(--color-ink);stroke-width:${n1(2.6 * s)};stroke-linecap:round"/>`
  const right = winkable ? eye(cx + 8.5 * s, ' m-eye-open') + lid('m-eye-wink') : wink ? lid() : eye(cx + 8.5 * s)
  const smile = `<path d="M${n1(cx - 9 * s)} ${n1(cy + 9 * s)} q${n1(9 * s)} ${n1(9 * s)} ${n1(18 * s)} 0" style="fill:none;stroke:var(--color-ink);stroke-width:${n1(smileLine * s)};stroke-linecap:round"/>`
  return eye(cx - 8.5 * s) + right + smile
}
