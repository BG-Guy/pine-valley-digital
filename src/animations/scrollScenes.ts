// Scroll scenes: the theme's "stamp" touches, each played once as its part
// of the page comes into view.
//   - The highlight box on each section heading's key word (.nb-mark)
//     stamps down: it drops in big and crooked, then settles.
//   - The ticket numbers (components/tickets) stamp in one after another.
// It's all optional decoration: drop the initScrollScenes() calls
// (src/main.ts, src/pages/services/main.ts) and everything simply sits in
// place. Skipped for reduced motion.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initScrollScenes() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.querySelectorAll<HTMLElement>('main h2 .nb-mark').forEach((mark) => stampOnView(mark, [mark], 'top 85%', 0.25))
  document.querySelectorAll<HTMLElement>('main .tickets').forEach((row) => {
    stampOnView(row, Array.from(row.querySelectorAll<HTMLElement>('.ticket-stamp')), 'top 75%', 0.35)
  })
}

// Hides `targets` in their stamp's starting pose, then stamps them in (one
// after another) the first time `trigger` reaches `start` — or right away
// if the page is already scrolled past it, as after a reload part-way down.
function stampOnView(trigger: HTMLElement, targets: HTMLElement[], start: string, delay: number) {
  if (!targets.length) return
  gsap.set(targets, { scale: 1.6, rotation: -14, autoAlpha: 0 })
  let played = false
  const play = () => {
    if (played) return
    played = true
    gsap.to(targets, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.2, delay })
    trigger.dataset.stamped = ''
  }
  ScrollTrigger.create({
    trigger,
    start,
    onEnter: play,
    onEnterBack: play,
    onRefresh: (self) => {
      if (self.progress > 0) play()
    },
  })
}
