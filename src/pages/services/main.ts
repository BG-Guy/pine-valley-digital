// Entry point shared by every services/*.html page. Each of those 14 files
// only differs in its own <head> (title, description) and one
// <meta name="pvd-service" content="<slug>"> tag — this script reads that
// tag, looks the slug up in servicesLandingData.ts, and renders the one
// shared template (serviceLandingPage.ts). One script referenced identically
// from every page, so Vite/Rollup compile it once instead of 14 times.
import '../../global.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { renderPreloader } from '../../components/preloader/preloader'
import { renderNavbar, initNavbar } from '../../components/navbar/navbar'
import { renderFooter, initFooter } from '../../components/footer/footer'
import { initSiteHoverCarouselLinks } from '../../components/hover-carousel-link/hoverCarouselLink'
import { initScrollReveals } from '../../animations/scrollReveals'
import { initPageTransitionLinks } from '../../animations/pageTransitions'
import { initSimplePageLoad } from '../../animations/simplePageLoad'
import { getServiceLandingData } from './servicesLandingData'
import { renderServiceLandingContent, initServiceLandingContent } from './serviceLandingPage'

gsap.registerPlugin(ScrollTrigger)

const slug = document.querySelector('meta[name="pvd-service"]')?.getAttribute('content') ?? ''
const data = getServiceLandingData(slug)

if (!data) {
  // Every services/*.html file sets a valid slug — if this fires, a page
  // was added without its data entry (or vice versa). Fail loudly rather
  // than silently rendering a blank page.
  throw new Error(`No service landing data for slug "${slug}"`)
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${renderPreloader(data.navTitle)}

  <div id="page-shell">
  ${renderNavbar()}

  <main>
    ${renderServiceLandingContent(data)}
  </main>
  </div>

  ${renderFooter()}
`

initSimplePageLoad()
initScrollReveals()
initSiteHoverCarouselLinks()
initNavbar()
initFooter()
initServiceLandingContent(data)
initPageTransitionLinks()
