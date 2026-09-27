// Entry point for lab.html — a secondary page, structured the same way as
// the home page (src/main.ts): render the shared chrome + this page's own
// content, then boot the pieces that need JS. Uses the same preloader
// curtain as the home page, titled "Lab" — see components/preloader and
// animations/pageTransitions for how the curtain also plays when arriving
// here from another page.
import '../../global.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { renderPreloader } from '../../components/preloader/preloader'
import { renderNavbar, initNavbar } from '../../components/navbar/navbar'
import { renderFooter, initFooter } from '../../components/footer/footer'
import { initSiteHoverCarouselLinks } from '../../components/hover-carousel-link/hoverCarouselLink'
import { renderLabHero } from './lab'
import { initScrollReveals } from '../../animations/scrollReveals'
import { initPageTransitionLinks } from '../../animations/pageTransitions'
import { initSimplePageLoad } from '../../animations/simplePageLoad'
import './lab.css'

gsap.registerPlugin(ScrollTrigger)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${renderPreloader('Lab')}

  <div id="page-shell">
  ${renderNavbar()}

  <main>
    ${renderLabHero()}
  </main>
  </div>

  ${renderFooter()}
`

initSimplePageLoad()
initScrollReveals()
initSiteHoverCarouselLinks()
initNavbar()
initFooter()
initPageTransitionLinks()
