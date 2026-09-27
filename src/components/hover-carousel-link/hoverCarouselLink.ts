// Hover "carousel" link: the label is duplicated in a two-row track that
// slides up on hover (the copy rolls into view), with a dot that stretches
// into an underline. Styles live in hoverCarouselLink.css.
import './hoverCarouselLink.css'

interface HoverCarouselOptions {
  direction?: 'x' | 'y'
  color?: string
  // Space between the label's children (e.g. text + arrow icon).
  gap?: string
  // Touch: prime on the first tap (shows the hover state) and follow the
  // link on the second. Off by default — a primary CTA shouldn't need two
  // taps on a phone.
  primeOnTouch?: boolean
}

// Turns `link` into a hover carousel link (rewrites its inner HTML into the
// duplicated-label track plus the underline dot).
export function initHoverCarouselLink(
  link: HTMLElement,
  { direction = 'y', color = 'currentColor', gap = '0', primeOnTouch = false }: HoverCarouselOptions = {}
) {
  const original = link.innerHTML
  link.classList.add('hc-link')
  link.innerHTML = `
    <span class="hc-viewport">
      <span class="hc-track hc-track--${direction}">
        <span class="hc-copy" style="gap:${gap}">${original}</span>
        <span class="hc-copy" style="gap:${gap}" aria-hidden="true">${original}</span>
      </span>
    </span>
    <span class="hc-underline" style="background:${color}" aria-hidden="true"></span>
  `

  const track = link.querySelector<HTMLElement>('.hc-track')!
  const underline = link.querySelector<HTMLElement>('.hc-underline')!
  const shift = direction === 'y' ? 'translateY(-50%)' : 'translateX(-50%)'

  const enter = () => {
    track.style.transform = shift
    underline.classList.add('is-active')
  }
  const leave = () => {
    track.style.transform = ''
    underline.classList.remove('is-active')
  }

  link.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'mouse') enter()
  })
  link.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'mouse') leave()
  })
  // Keyboard users get the same state as hover. :focus-visible so a mouse
  // click (which also focuses the link) doesn't pin the underline open after
  // the pointer has left.
  link.addEventListener('focus', () => {
    if (link.matches(':focus-visible')) enter()
  })
  link.addEventListener('blur', leave)

  if (!primeOnTouch) return

  // Detect per-interaction, not per-device: a mouse click already had a real
  // hover before it; only a touch tap needs priming.
  let lastPointerType = 'mouse'
  let isPrimed = false

  link.addEventListener('pointerdown', (e) => {
    lastPointerType = e.pointerType
  })
  link.addEventListener('click', (e) => {
    if (lastPointerType !== 'touch') return
    if (!isPrimed) {
      e.preventDefault()
      enter()
      isPrimed = true
    } else {
      leave()
      isPrimed = false
    }
  })
  document.addEventListener('click', (e) => {
    if (isPrimed && !link.contains(e.target as Node)) {
      leave()
      isPrimed = false
    }
  })
}

// Applies the hover-carousel effect to every `.nav-link` and `.hero-cta` on
// the page (nav/footer links and, where present, the hero's "See our work"
// link). Shared by every page's entry script so the wiring lives in one
// place instead of being repeated per page.
export function initSiteHoverCarouselLinks() {
  document.querySelectorAll<HTMLElement>('.nav-link').forEach((link) => {
    initHoverCarouselLink(link, { color: 'var(--color-accent)' })
  })
  document.querySelectorAll<HTMLElement>('.hero-cta').forEach((link) => {
    initHoverCarouselLink(link, { color: 'var(--color-accent-2)', gap: '0.5rem' })
  })
}
