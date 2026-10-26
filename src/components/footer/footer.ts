// Footer: the "reveal" footer — fixed to the viewport bottom behind the page,
// uncovered as you scroll to the end. An ink panel with the name set huge in
// poster type, the quick links as pills, and the copyright line, over a
// pine valley where the sun comes up as the footer is uncovered
// (components/sunrise). Styles live in footer.css.
import './footer.css'
import { pinePal } from '../mascots/mascots'
import { initRevealFooter } from '../reveal-footer/revealFooter'
import { renderSunrise, initSunrise } from '../sunrise/sunrise'

const LINKS = [
  ['Services', '/#services'],
  ['Work', '/#work'],
  ['Contact', '/#contact'],
  ['Lab', '/lab.html'],
]

// Markup: the big wordmark (decorative; the logo line below names the
// studio for screen readers), then the copyright and the links, then the
// valley along the bottom edge.
export const renderFooter = () => `
  <footer id="site-footer">
    <div id="footer-shell" class="footer-shell px-6 sm:px-10 pt-12 pb-10 sm:pt-16">
      <div class="mx-auto max-w-7xl grid gap-8 sm:gap-10">
        <p class="footer-word" aria-hidden="true">Pine Valley <span>Digital</span></p>
        <div class="footer-row">
          <span class="footer-copy">${pinePal('footer-pal')}&copy; ${new Date().getFullYear()} Pine Valley Digital.</span>
          <nav class="footer-links" aria-label="Footer">
            ${LINKS.map(([label, href]) => `<a href="${href}" class="footer-pill">${label}</a>`).join('')}
          </nav>
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
