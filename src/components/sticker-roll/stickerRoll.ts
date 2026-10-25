// Sticker roll: now and then, while you scroll, one of the mascots rolls
// across the bottom of the screen on its round sticker — Pine Pal, Zap or
// Clicky, picked at random. It rolls the way you're scrolling, faster the
// faster you scroll, turning exactly as far as it travels, and somewhere
// along the way it may hop and says something. Just for fun: decorative,
// it never takes a click, and it stays away for reduced motion and while
// the tape's pause button is on. Styles live in stickerRoll.css.
import './stickerRoll.css'
import { gsap } from 'gsap'
import { ROLL_STICKERS, type MascotName } from '../mascots/mascots'

// What each one might say as it passes.
const QUIPS: Record<MascotName, string[]> = {
  pinePal: ['Wheee!', 'Hi there!', 'Keep scrolling!'],
  zap: ['Zoom!', 'Fast, right?', 'Speedy!'],
  clicky: ['Click click!', 'Hi!', 'Scroll on!'],
}
const NAMES = Object.keys(QUIPS) as MascotName[]

// Pacing, in screen heights of scrolling: the first roll comes after FIRST,
// each next one after a random amount in GAP, and never sooner than REST_MS
// after the last one left.
const FIRST = 1.2
const GAP = [1.8, 3.6]
const REST_MS = 7000

// Speed, in px per second: a steady roll, pushed along by scrolling.
const BASE_SPEED = 280
const PUSH = 0.8 // extra px/s for every px/s scrolled
const MAX_SPEED = 1400

const random = (min: number, max: number) => min + Math.random() * (max - min)
const pickFrom = <T>(list: T[]) => list[Math.floor(Math.random() * list.length)]
const isPaused = () => document.documentElement.dataset.motion === 'paused'

// Starts watching the scroll. Call once per page, after the markup is in
// the DOM.
export function initStickerRoll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // A strip along the bottom of the screen, inside the page shell so the
  // navbar's menu and the preloader stay on top of it.
  const layer = document.createElement('div')
  layer.className = 'roll-layer'
  layer.setAttribute('aria-hidden', 'true')
  ;(document.getElementById('page-shell') ?? document.body).append(layer)

  let lastY = window.scrollY
  let budget = window.innerHeight * FIRST
  let restUntil = 0
  let last: MascotName | null = null
  let rolling = false

  window.addEventListener(
    'scroll',
    () => {
      const dy = window.scrollY - lastY
      lastY = window.scrollY
      if (rolling || isPaused()) return
      budget -= Math.abs(dy)
      if (budget > 0 || performance.now() < restUntil) return

      rolling = true
      last = pickFrom(NAMES.filter((n) => n !== last))
      roll(layer, last, dy < 0 ? -1 : 1).then(() => {
        rolling = false
        restUntil = performance.now() + REST_MS
        budget = window.innerHeight * random(GAP[0], GAP[1])
      })
    },
    { passive: true },
  )
}

// Rolls one sticker across, left to right for `dir` 1 (scrolling down),
// right to left for -1. Resolves once it's gone.
function roll(layer: HTMLElement, name: MascotName, dir: 1 | -1) {
  const size = (window.innerWidth < 640 ? 68 : 92) * random(0.9, 1.15)
  const radius = size / 2

  const sticker = document.createElement('div')
  sticker.className = 'roller'
  sticker.style.width = `${size}px`
  sticker.innerHTML = `<div class="roller-spin">${ROLL_STICKERS[name]}</div>`
  const spin = sticker.firstElementChild as HTMLElement

  const bubble = document.createElement('span')
  bubble.className = 'roll-bubble'
  bubble.textContent = pickFrom(QUIPS[name])
  bubble.style.bottom = `calc(${size + 30}px + env(safe-area-inset-bottom))`
  layer.append(sticker, bubble)
  const bubbleWidth = bubble.offsetWidth

  const width = window.innerWidth
  let x = dir > 0 ? -size - 12 : width + 12
  const exit = dir > 0 ? width + 12 : -size - 12
  // Somewhere in the middle it says its line, and maybe hops.
  const talkAt = random(0.35, 0.6) * width
  const hops = Math.random() < 0.55
  let talked = false
  let hop = -1 // seconds into the hop, or -1
  let speed = BASE_SPEED
  let lastY = window.scrollY

  return new Promise<void>((resolve) => {
    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000
      const scrolled = Math.abs(window.scrollY - lastY) / dt
      lastY = window.scrollY
      // Pick up speed quickly when pushed, ease back slowly.
      const target = Math.min(BASE_SPEED + scrolled * PUSH, MAX_SPEED)
      speed += (target - speed) * (target > speed ? 0.25 : 0.05)
      x += dir * speed * dt

      const centre = x + radius
      if (!talked && (dir > 0 ? centre >= talkAt : centre <= talkAt)) {
        talked = true
        if (hops) hop = 0
        bubble.classList.add('is-on')
        setTimeout(() => bubble.classList.remove('is-on'), 1300)
      }

      // A hop is a half-second parabola, as high as half the sticker.
      let y = 0
      if (hop >= 0) {
        hop += dt
        const t = hop / 0.5
        if (t < 1) y = -2 * size * t * (1 - t)
        else hop = -1
      }

      // Rolling without slipping: it turns by the distance over its radius.
      sticker.style.transform = `translate(${x}px, ${y}px)`
      spin.style.transform = `rotate(${(x / radius) * (180 / Math.PI)}deg)`
      const bubbleX = Math.min(Math.max(centre - bubbleWidth / 2, 8), width - bubbleWidth - 8)
      bubble.style.transform = `translate(${bubbleX}px, ${y}px)`

      if ((dir > 0 ? x >= exit : x <= exit) || isPaused()) {
        gsap.ticker.remove(tick)
        sticker.remove()
        bubble.remove()
        resolve()
      }
    }
    gsap.ticker.add(tick)
  })
}
