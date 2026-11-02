// Footer: the "reveal" footer — fixed to the viewport bottom behind the page,
// uncovered as you scroll to the end. A dawn-navy panel with the name set huge in
// poster type, link columns, and the copyright line, over a
// pine valley where the sun comes up as the footer is uncovered
// (components/sunrise). Styles live in footer.css.
import './footer.css'
import { pinePal } from '../mascots/mascots'
import { initRevealFooter } from '../reveal-footer/revealFooter'
import { renderSunrise, initSunrise } from '../sunrise/sunrise'
import { servicesLandingData } from '../../pages/services/servicesLandingData'
import { serviceHref } from '../../pages/services/serviceGroups'

const EMAIL = 'hello@pinevalleydigital.com'

// The services most people come for; the full list is in the navbar menu.
const POPULAR = ['web-design', 'development', 'seo-performance', 'local-seo', 'business-automation', 'care-maintenance']

const COMPANY = [
  ['Our work', '/#work'],
  ['How we work', '/#process'],
  ['Free website check', '/#audit'],
  ['FAQ', '/#faq'],
  ['Contact', '/#contact'],
  ['Lab', '/lab.html'],
]

const column = (title: string, links: string[][]) => `
          <nav class="footer-col" aria-label="${title}">
            <p class="footer-col-title">${title}</p>
            <ul>${links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul>
          </nav>`

// Markup: the big wordmark (decorative; the logo line below names the
// studio for screen readers), then what we do with a call button and two
// columns of links (popular services, the company), then the copyright and
// email, then the valley along the bottom edge.
export const renderFooter = () => `
  <footer id="site-footer">
    <div id="footer-shell" class="footer-shell px-6 sm:px-10 pt-12 pb-10 sm:pt-16">
      <div class="mx-auto max-w-7xl grid gap-8 sm:gap-10">
        <p class="footer-word" aria-hidden="true">Pine Valley <span>Digital</span></p>
        <div class="footer-cols">
          <div class="footer-about">
            <p>Websites, SEO and automation for small businesses that want more customers from the web.</p>
            <a href="/#contact" class="footer-pill">Book a free call</a>
          </div>
          ${column('Services', POPULAR.map((slug) => [servicesLandingData.find((s) => s.slug === slug)?.navTitle ?? slug, serviceHref(slug)]))}
          ${column('Company', COMPANY)}
        </div>
        <div class="footer-row">
          <span class="footer-copy">${pinePal('footer-pal')}&copy; ${new Date().getFullYear()} Pine Valley Digital.</span>
          <a class="footer-mail" href="mailto:${EMAIL}">${EMAIL}</a>
        </div>
      </div>
    </div>
    ${renderSunrise()}
  </footer>
`

// Pins the footer behind the page shell so scrolling reveals it, and lets
// that same scroll raise the sun. Call after the markup is in the DOM.
export function initFooter() {
  const { spacer } = initRevealFooter(document.getElementById('page-shell')!, document.getElementById('site-footer')!)
  initSunrise(spacer)
}
