// Entry point: renders the whole page from the section/component templates,
// then boots the animations and interactive widgets. Where to look:
//   components/  reusable pieces (navbar, footer, preloader, marquee, ...)
//   sections/    one folder per page section (hero, services, work, ...)
//   animations/  page-wide motion (load-in sequence, scroll reveals)
//   global.css   design tokens and base styles only
import './global.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { renderPreloader } from './components/preloader/preloader'
import { renderNavbar, initNavbar } from './components/navbar/navbar'
import { renderMarquee, initMarquee } from './components/marquee/marquee'
import { renderFooter, initFooter } from './components/footer/footer'
import { initHoverCarouselLink } from './components/hover-carousel-link/hoverCarouselLink'
import { renderHero, initHero } from './sections/hero/hero'
import { renderServices } from './sections/services/services'
import { renderWork } from './sections/work/work'
import { renderProcess } from './sections/process/process'
import { renderContact, initContact } from './sections/contact/contact'
import { initPageLoad } from './animations/pageLoad'
import { initScrollReveals } from './animations/scrollReveals'

gsap.registerPlugin(ScrollTrigger)

// Build the page. Everything inside #page-shell scrolls over the reveal
// footer, which sits outside it.
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${renderPreloader()}

  <div id="page-shell">
  ${renderNavbar()}

  <main id="top">
    ${renderHero()}
    ${renderMarquee()}
    ${renderServices()}
    ${renderWork()}
    ${renderProcess()}
    ${renderContact()}
  </main>
  </div>

  ${renderFooter()}
`

// Boot: start the load-in, then wire each piece that needs JS.
initPageLoad()
initScrollReveals()
initMarquee()
initHero()
initHoverCarouselLinks()
initNavbar()
initContact()
initFooter()

// Gives the nav/footer links and the hero CTA the hover-carousel effect.
function initHoverCarouselLinks() {
  document.querySelectorAll<HTMLElement>('.nav-link').forEach((link) => {
    initHoverCarouselLink(link, { color: 'var(--color-accent)' })
  })
  document.querySelectorAll<HTMLElement>('.hero-cta').forEach((link) => {
    initHoverCarouselLink(link, { color: 'var(--color-accent-2)', gap: '0.5rem' })
  })
}
