// Hover teaser menu: each link has a color panel hidden behind it that
// slides out to the right half of the container on hover (or, on touch,
// on a second tap of the same link — the first tap only "primes" it).

import './hoverTeaserMenu.css'

// One menu entry: `color` is the teaser panel that slides out behind it.
export interface HoverTeaserLink {
  id: string
  label: string
  href: string
  color: string
}

// Builds the menu (teaser panels + link column) inside `container` and wires
// the hover / two-tap-on-touch behavior.
export function initHoverTeaserMenu(container: HTMLElement, links: HoverTeaserLink[]) {
  container.classList.add('htm-menu')

  container.innerHTML = `
    <div class="htm-teaser-layer">
      ${links.map((l) => `<div class="htm-teaser" data-teaser="${l.id}" style="background:${l.color}"></div>`).join('')}
    </div>
    <nav class="htm-nav">
      ${links
        .map(
          (l) => `
        <a href="${l.href}" class="htm-link" data-link="${l.id}">
          <span>${l.label}</span>
          <span class="htm-dot"></span>
        </a>`
        )
        .join('')}
    </nav>
  `

  let primed: { link: HTMLElement; leave: () => void } | null = null

  container.querySelectorAll<HTMLAnchorElement>('[data-link]').forEach((link) => {
    const id = link.dataset.link
    const teaser = container.querySelector<HTMLElement>(`[data-teaser="${id}"]`)
    if (!teaser) return

    const enter = () => {
      link.classList.add('is-active')
      teaser.classList.add('is-active')
    }
    const leave = () => {
      link.classList.remove('is-active')
      teaser.classList.remove('is-active')
    }

    // Detect per-interaction, not per-device: a mouse click already had a
    // real hover before it, so it can activate immediately. A touch tap
    // gets primed first and only activates on a second tap of that link.
    let lastPointerType = 'mouse'

    link.addEventListener('pointerdown', (e) => {
      lastPointerType = e.pointerType
    })

    link.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') enter()
    })
    link.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse') leave()
    })

    link.addEventListener('click', (e) => {
      if (lastPointerType !== 'touch') return

      if (primed && primed.link !== link) {
        primed.leave()
        primed = null
      }

      if (!primed) {
        e.preventDefault()
        enter()
        primed = { link, leave }
      } else {
        leave()
        primed = null
      }
    })
  })

  document.addEventListener('click', (e) => {
    if (primed && !container.contains(e.target as Node)) {
      primed.leave()
      primed = null
    }
  })
}
