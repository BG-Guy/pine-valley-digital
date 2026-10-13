// Navbar: the floating pill header (logo, section links, CTA, mobile menu
// button) plus the mobile menu sheet (mobileMenu.ts). Styles live in
// navbar.css.
import './navbar.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { logoMark, logoWordmark } from '../logo/logo'
import { renderCtaButton } from '../cta-button/ctaButton'
import { renderMenuToggle, renderMobileMenu, initMobileMenu } from './mobileMenu'

// Markup: the bar (logo, desktop links, CTA, menu toggle) and, after it,
// the mobile menu sheet, which sits under the bar while open. Links are
// root-prefixed (`/#services`) so they resolve correctly from any page,
// not just the home page — same-path + hash is a same-document scroll,
// different-path is a normal navigation back to the home page's section.
// Starts hidden (opacity-0): every page's own preloader curtain fades it in
// as it opens (see components/preloader). The CTA's show-from-sm wrapper is
// a separate span on purpose: .btn-cta's own display rule (ctaButton.css)
// is unlayered CSS, which beats Tailwind v4's layered `hidden` utility if
// both sit on the same element — so the button showed (and wrapped the bar)
// on phones.
export const renderNavbar = () => `
  <header id="site-nav" class="navbar-shell fixed top-0 inset-x-0 z-40 opacity-0">
    <div id="navbar-bar" class="navbar-bar border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)]">
      <div class="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex items-center justify-between">
        <a href="/#top" class="flex items-center gap-2">
          ${logoMark('w-7 h-7 shrink-0')}
          ${logoWordmark('text-base sm:text-lg')}
        </a>
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="/#services" class="nav-link">Services</a>
          <a href="/#work" class="nav-link">Work</a>
          <a href="/#process" class="nav-link">Process</a>
          <a href="/#contact" class="nav-link">Contact</a>
          <a href="/lab.html" class="nav-link">Lab</a>
        </nav>
        <div class="flex items-center gap-3">
          <span class="hidden sm:inline-flex">${renderCtaButton({ href: '/#contact', label: 'Start a project', className: 'text-sm font-semibold' })}</span>
${renderMenuToggle()}
        </div>
      </div>
    </div>
${renderMobileMenu()}
  </header>
`

// Wires up everything interactive in the navbar. Call after the markup is in
// the DOM.
export function initNavbar() {
  initMobileMenu()
  setupNavbarMorph()
}

// Drives the navbar's scroll morph by writing a 0-1 progress value into a
// CSS custom property (consumed in navbar.css).
function setupNavbarMorph() {
  const shell = document.querySelector<HTMLElement>('#site-nav')
  if (!shell) return

  // Floating rounded pill, inset from the screen edges, at the very top of
  // the page — docking into a flush full-width rectangle over the first
  // 100px of scroll. Same technique as the shared Navbar (scroll progress
  // -> a CSS custom property, consumed via calc() per breakpoint), just
  // translated out of Framer Motion's useTransform into ScrollTrigger's
  // onUpdate — with the 0/1 ends swapped relative to the source component,
  // per this site's own direction (inset first, full-bleed on scroll).
  ScrollTrigger.create({
    start: 0,
    end: 100,
    scrub: true,
    onUpdate: (self) => {
      shell.style.setProperty('--nav-progress', String(1 - self.progress))
    },
  })
}
