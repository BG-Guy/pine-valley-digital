// Curved-panel cover/reveal transition: a bulging bottom edge that flattens
// as the panel grows to fully cover its container, and vice versa.
//
// Built from two transformed layers instead of redrawing one SVG path every
// frame. Safari repaints an animated SVG path on the CPU at full-screen size
// each frame (slow, esp. on retina); transforms on their own layers are
// composited on the GPU. The geometry is identical to the old path
// `M0,0 L W,0 L W,H-b  Q W/2,H+b 0,H-b Z`:
//   - `layer`: a full-size panel translated so its bottom edge sits on the
//     straight line at y = travel - bulge (where the curve's two ends are).
//   - `cap`: a fixed parabola (quadratic curve dipping to full height at its
//     middle) hanging off that edge, scaled in Y by sin(eased * PI) so it
//     dips exactly `bulge` px — the curve's midpoint lands on `travel`.

const BULGE_RATIO = 0.08

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2
}

interface CurveTransitionOptions {
  container: HTMLElement
  color?: string
  duration?: number
}

export function curveTransition({ container, color = '#4f46e5', duration = 650 }: CurveTransitionOptions) {
  const layer = document.createElement('div')
  layer.style.cssText =
    'position:absolute;inset:0;z-index:-1;pointer-events:none;will-change:transform;' +
    `background:${color};transform:translate3d(0,-100%,0);`

  // Viewbox 0..100 in both axes, stretched to the cap's box. The control
  // point at y=200 makes the curve's midpoint reach y=100 (full height).
  const cap = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  cap.setAttribute('viewBox', '0 0 100 100')
  cap.setAttribute('preserveAspectRatio', 'none')
  cap.style.cssText =
    'position:absolute;left:0;width:100%;top:calc(100% - 1px);display:block;' +
    'transform-origin:top center;will-change:transform;transform:scaleY(0);'
  const capPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  capPath.setAttribute('d', 'M0,0 L100,0 Q50,200 0,0 Z')
  capPath.setAttribute('fill', color)
  cap.appendChild(capPath)

  layer.appendChild(cap)
  container.appendChild(layer)

  function measure() {
    const { height } = container.getBoundingClientRect()
    cap.style.height = `${height * BULGE_RATIO}px`
    return height
  }

  function place(height: number, travel: number, bulgeScale: number) {
    const flat = travel - bulgeScale * height * BULGE_RATIO
    layer.style.transform = `translate3d(0,${flat - height}px,0)`
    cap.style.transform = `scaleY(${bulgeScale})`
  }

  function animate(direction: 'in' | 'out') {
    // "in"  -> panel grows to cover the container (0 -> full height)
    // "out" -> panel shrinks away, revealing new content (full -> 0)
    return new Promise<void>((resolve) => {
      const start = performance.now()
      const height = measure()

      function frame(now: number) {
        const t = Math.min((now - start) / duration, 1)
        const eased = easeInOutCubic(t)
        const travel = direction === 'in' ? eased * height : (1 - eased) * height

        place(height, travel, Math.sin(eased * Math.PI))
        t < 1 ? requestAnimationFrame(frame) : resolve()
      }

      requestAnimationFrame(frame)
    })
  }

  // Draws the fully-covered state instantly (no animation, no bulge) — for
  // starting a page load already closed, instead of animating "in" from
  // nothing.
  function setCovered() {
    const height = measure()
    place(height, height, 0)
  }

  return {
    setCovered,
    cover: () => animate('in'),
    reveal: () => animate('out'),
    destroy: () => layer.remove(),
    async run(swapContent: () => void | Promise<void>) {
      await animate('in') // cover the container
      await swapContent() // swap the DOM (or do work) while it's fully hidden
      await animate('out') // reveal the new content
      layer.remove()
    },
  }
}
