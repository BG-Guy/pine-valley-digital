// Navbar: the floating pill header (logo, section links, CTA, mobile menu
// button) plus the mobile menu sheet (mobileMenu.ts). Styles live in
// navbar.css.
import './navbar.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pinePal } from '../mascots/mascots'
import { renderCtaButton } from '../cta-button/ctaButton'
import { renderMenuToggle, renderMobileMenu, initMobileMenu } from './mobileMenu'
import { SERVICE_GROUPS, servicesIn, serviceHref } from '../../pages/services/serviceGroups'

// The Services menu: the four groups side by side, each with its services,
// and a line under them pointing to the free website check.
const renderServicesMenu = () => `
          <div class="nav-menu" data-nav-menu>
            <button type="button" class="nav-link nav-menu-toggle" aria-expanded="false" aria-controls="nav-services-panel">
              Services <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
            </button>
            <div id="nav-services-panel" class="nav-panel" hidden>
              <div class="nav-panel-cols">
                ${SERVICE_GROUPS.map(
                  (g) => `
                <div class="nav-panel-col">
                  <p class="nav-panel-title">${g.title}</p>
                  <p class="nav-panel-blurb">${g.blurb}</p>
                  <ul>${servicesIn(g).map((s) => `<li><a href="${serviceHref(s.slug)}">${s.navTitle}</a></li>`).join('')}</ul>
                </div>`,
                ).join('')}
              </div>
              <a class="nav-panel-foot" href="/#audit"><span class="nb-pill" style="--nb-pill-bg: var(--color-mint)">Free</span> Not sure what you need? Run a free website check &rarr;</a>
            </div>
          </div>`

// Markup: the bar (logo, desktop links, CTA, menu toggle) and, after it,
// the mobile menu sheet, which sits under the bar while open. The logo is
// Pine Pal and the name in the footer's poster capitals, its last word on a
// lemon highlight box; Pine Pal winks when you point at it. Links are
// root-prefixed (`/#services`) so they resolve correctly from any page,
// not just the home page — same-path + hash is a same-document scroll,
// different-path is a normal navigation back to the home page's section.
// Starts hidden (opacity-0): every page's own preloader fades it in as the
// stripes sweep off (see components/preloader). The CTA's show-from-sm wrapper is
// a separate span on purpose: .btn-cta's own display rule (.nb-press, press.css)
// is unlayered CSS, which beats Tailwind v4's layered `hidden` utility if
// both sit on the same element — so the button showed (and wrapped the bar)
// on phones.
export const renderNavbar = () => `
  <header id="site-nav" class="navbar-shell fixed top-0 inset-x-0 z-40 opacity-0">
    <div id="navbar-bar" class="navbar-bar">
      <div class="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex items-center justify-between">
        <a href="/#top" class="navbar-logo wink-on-hover">
          ${pinePal('navbar-pal')}
          <span class="navbar-word">Pine Valley <span class="nb-mark">Digital</span></span>
        </a>
        <nav class="navbar-links hidden md:flex items-center gap-5 xl:gap-7">
${renderServicesMenu()}
          <a href="/#work" class="nav-link">Work</a>
          <a href="/#process" class="nav-link hidden xl:inline">Process</a>
          <a href="/#audit" class="nav-link hidden lg:inline">Free check</a>
          <a href="/#faq" class="nav-link hidden xl:inline">FAQ</a>
          <a href="/#contact" class="nav-link">Contact</a>
        </nav>
        <div class="flex items-center gap-3">
          <span class="hidden sm:inline-flex">${renderCtaButton({ href: '/#contact', label: 'Book a free call', className: 'text-sm font-semibold' })}</span>
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
  setupServicesMenu()
}

// The Services menu opens on hover (with a short grace period so the
// pointer can cross the gap to the panel) and on click, and closes on
// Escape, on a click elsewhere, or when focus leaves it.
function setupServicesMenu() {
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]')
  const toggle = menu?.querySelector<HTMLButtonElement>('.nav-menu-toggle')
  const panel = menu?.querySelector<HTMLElement>('.nav-panel')
  if (!menu || !toggle || !panel) return

  let timer = 0
  const set = (open: boolean) => {
    window.clearTimeout(timer)
    toggle.setAttribute('aria-expanded', String(open))
    panel.hidden = !open
    menu.classList.toggle('is-open', open)
  }
  const hoverable = window.matchMedia('(hover: hover)').matches
  toggle.addEventListener('click', () => set(hoverable || panel.hidden === true))
  if (hoverable) {
    menu.addEventListener('pointerenter', () => set(true))
    menu.addEventListener('pointerleave', () => { timer = window.setTimeout(() => set(false), 180) })
  }
  menu.addEventListener('focusout', (e) => { if (!menu.contains(e.relatedTarget as Node)) set(false) })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) { set(false); toggle.focus() }
  })
  document.addEventListener('click', (e) => { if (!menu.contains(e.target as Node)) set(false) })
  panel.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) set(false) })
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
