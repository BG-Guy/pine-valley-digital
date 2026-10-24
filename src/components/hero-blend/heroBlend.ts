// Hero blend: how a hero meets the section right below it. Three takes, for
// choosing between — pick one with ?blend=<name> in the URL (default: wave):
//   wave   the section below rises in an ink-lined wave that drifts
//          slowly sideways.
//   stack  the section below slides up over the hero as a framed card (the
//          navbar's 3px ink line, rounded top), while the hero's content
//          sinks and shrinks behind it as you scroll.
//   dots   a purple-to-green halftone band (the hero orbs' colours, printed)
//          climbs up out of the section below as you scroll past the hero.
// Styles live in heroBlend.css. Motion is skipped for reduced motion.
import './heroBlend.css'
import { gsap } from 'gsap'

const BLENDS = ['wave', 'stack', 'dots'] as const
type Blend = (typeof BLENDS)[number]

// One period of the wave is 300 units wide; the path repeats it eight times
// so the strip (twice the screen wide) can slide by half and loop.
const WAVE_TOP = `M0 30 Q75 4 150 30 T300 30${' T' + Array.from({ length: 14 }, (_, i) => `${450 + i * 150} 30`).join(' T')}`
const renderWave = () => `
  <div class="blend-wave" aria-hidden="true">
    <svg viewBox="0 0 2400 60" preserveAspectRatio="none">
      <path class="blend-wave-fill" d="${WAVE_TOP} L2400 60 L0 60 Z" />
      <path class="blend-wave-line" d="${WAVE_TOP}" vector-effect="non-scaling-stroke" />
    </svg>
  </div>`

// Applies the chosen blend between `hero` and the element right after it.
// Call after the markup is in the DOM.
export function initHeroBlend(hero: HTMLElement) {
  const next = hero.nextElementSibling as HTMLElement | null
  if (!next) return
  const asked = new URLSearchParams(location.search).get('blend') as Blend | null
  const blend: Blend = asked && BLENDS.includes(asked) ? asked : 'wave'
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // The blend paints in the section's own background (paper if it has none).
  const bg = getComputedStyle(next).backgroundColor
  next.style.setProperty('--blend-bg', bg === 'rgba(0, 0, 0, 0)' ? 'var(--color-paper)' : bg)
  hero.classList.add('hero-blend')
  next.classList.add('hero-blend-next')
  hero.dataset.blend = next.dataset.blend = blend

  if (blend === 'wave') {
    next.insertAdjacentHTML('afterbegin', renderWave())
  }

  if (blend === 'dots') {
    next.insertAdjacentHTML('afterbegin', '<div class="blend-dots" aria-hidden="true"></div>')
    if (!reduceMotion) {
      // 0 → 1 as the hero scrolls away: the band climbs higher.
      gsap.fromTo(next, { '--blend-p': 0 }, {
        '--blend-p': 1,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
    }
  }

  if (blend === 'stack' && !reduceMotion) {
    const content = hero.querySelector<HTMLElement>(':scope > div.relative')
    if (content) {
      gsap.to(content, {
        y: 120,
        scale: 0.9,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
    }
  }
}
