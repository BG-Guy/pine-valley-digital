// Footer: the "reveal" footer — fixed to the viewport bottom behind the page,
// uncovered as you scroll to the end, morphing from a narrow rounded card to
// a full-bleed bar. Styles live in footer.css.
import './footer.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

// Pins the footer behind the page shell and drives its scroll morph. Call
// after the markup is in the DOM.
export function initFooter() {
  const { spacer } = initRevealFooter(document.getElementById('page-shell')!, document.getElementById('site-footer')!)
  setupFooterMorph(spacer)
}

// Writes the footer's 0-1 reveal progress into a CSS custom property
// (consumed in footer.css).
function setupFooterMorph(spacer: HTMLElement) {
  const shell = document.querySelector<HTMLElement>('#footer-shell')
  if (!shell) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shell.style.setProperty('--footer-progress', '1')
    return
  }

  // progress 0 exactly when the reveal window starts (spacer's top hits the
  // viewport bottom — the same moment the footer starts peeking up from
  // behind the shell); progress 1 at max scroll, fully revealed.
  ScrollTrigger.create({
    trigger: spacer,
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      shell.style.setProperty('--footer-progress', String(self.progress))
    },
  })
}
