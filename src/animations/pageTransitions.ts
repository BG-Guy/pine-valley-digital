// Cross-page navigation: when a link points to a DIFFERENT page (not just a
// different hash on the current page), the preloader's stripes sweep in over
// the current page — and its card shows the destination page's name —
// before the browser actually navigates there. An in-page anchor click
// (e.g. "Services" while already on the home page) is left alone: the
// browser just scrolls, no interception, no stripes. Each page's own boot
// script (pageLoad.ts, simplePageLoad.ts) plays the matching "stripes sweep
// off" half on arrival, whether that arrival was via this transition or a
// direct load/refresh.
import { coverForNavigation, uncoverPage } from '../components/preloader/preloader'
import { servicesLandingData } from '../pages/services/servicesLandingData'

// The name shown on the preloader's card while navigating TO that page. The 14
// service pages are added automatically from servicesLandingData.ts (their
// single source of truth) — add an entry here only for a genuinely new
// top-level page (not a service).
const PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/index.html': 'Home',
  '/lab.html': 'Lab',
  ...Object.fromEntries(servicesLandingData.map((s) => [`/services/${s.slug}.html`, s.navTitle])),
}

// '/' and '/index.html' serve the same page — treat them as one path so a
// link to either isn't mistaken for a "different page" navigation.
function normalizePath(pathname: string) {
  return pathname === '/index.html' ? '/' : pathname
}

function titleForPath(pathname: string) {
  return PAGE_TITLES[normalizePath(pathname)] ?? 'Pine Valley Digital'
}

// Installs the click interceptor. Call once per page, after the markup
// (including the preloader) is in the DOM.
export function initPageTransitionLinks() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let transitioning = false

  document.addEventListener('click', (e) => {
    if (transitioning || e.defaultPrevented || e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return // let modifier-clicks (open in new tab, etc.) through natively

    const link = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return

    let url: URL
    try {
      url = new URL(link.href, location.href)
    } catch {
      return
    }
    if (url.origin !== location.origin) return // external / mailto — leave to the browser

    if (normalizePath(url.pathname) === normalizePath(location.pathname)) return // same page — native anchor scroll, no stripes

    e.preventDefault()
    transitioning = true
    coverForNavigation(titleForPath(url.pathname)).then(() => {
      location.href = url.href // the destination page loads already covered, and opens on its own
    })
  })

  // Going Back can restore this page from the browser's back/forward cache
  // exactly as it was left: covered, mid-transition. Uncover it and let
  // links work again.
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return
    transitioning = false
    uncoverPage()
  })
}
