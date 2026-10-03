// Footer: the "reveal" footer — fixed to the viewport bottom behind the page,
// uncovered as you scroll to the end. Full-width from the start. Styles live
// in footer.css.
import './footer.css'
import { logoMark } from '../logo/logo'
import { initRevealFooter } from '../reveal-footer/revealFooter'

// Markup: logo + copyright on the left, quick links on the right.
export const renderFooter = () => `
  <footer id="site-footer">
    <div id="footer-shell" class="footer-shell px-6 sm:px-10 py-10">
      <div class="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/50">
        <span class="inline-flex items-center gap-2">${logoMark('w-5 h-5 shrink-0')}&copy; ${new Date().getFullYear()} Pine Valley Digital.</span>
        <div class="flex items-center gap-6">
          <a href="/#services" class="nav-link">Services</a>
          <a href="/#work" class="nav-link">Work</a>
          <a href="/#contact" class="nav-link">Contact</a>
          <a href="/lab.html" class="nav-link">Lab</a>
        </div>
      </div>
    </div>
  </footer>
`

// Pins the footer behind the page shell so scrolling reveals it. Call after
// the markup is in the DOM.
export function initFooter() {
  initRevealFooter(document.getElementById('page-shell')!, document.getElementById('site-footer')!)
}
