// Cross-page navigation: when a link points to a DIFFERENT page (not just a
// different hash on the current page), the curtain closes over the current
// page — showing the destination page's name — before the browser actually
// navigates there. An in-page anchor click (e.g. "Services" while already on
// the home page) is left alone: the browser just scrolls, no interception,
// no curtain. Each page's own boot script (pageLoad.ts, pages/lab/main.ts)
// plays the matching "curtain opens" half on arrival, whether that arrival
// was via this transition or a direct load/refresh.
import { gsap } from 'gsap'
import { curveTransition } from '../components/preloader/curveTransition'
import { revealPreloaderText, hidePreloaderText, markPageTransition } from '../components/preloader/preloader'

// The name shown on the curtain while navigating TO that page. Add an entry
// here whenever a new top-level page is added to the site.
const PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/index.html': 'Home',
  '/lab.html': 'Lab',
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

    if (normalizePath(url.pathname) === normalizePath(location.pathname)) return // same page — native anchor scroll, no curtain

    e.preventDefault()
    transitioning = true
    closeCurtainThenNavigate(url.href, titleForPath(url.pathname))
  })
}

async function closeCurtainThenNavigate(href: string, title: string) {
  const preloader = document.querySelector<HTMLElement>('#preloader')
  const preWord = document.querySelector<HTMLElement>('#preloader .pre-word')
  const titleEl = document.querySelector<HTMLElement>('#preloader .pre-title')

  if (!preloader || !preWord) {
    location.href = href // no preloader on this page — just navigate
    return
  }

  if (titleEl) titleEl.textContent = title
  gsap.set(preloader, { display: 'flex' })
  gsap.set(preWord, { autoAlpha: 0, scale: 1 }) // kept fully hidden — icon included — until the curtain has closed
  hidePreloaderText()

  const curtain = curveTransition({ container: preloader, color: '#333333', duration: 700 })
  await curtain.cover() // the curtain closes down over the current page first

  gsap.set(preWord, { autoAlpha: 1 }) // reveal the block (the faint pine backdrop) now that the curtain is fully closed
  await revealPreloaderText() // wordmark, then the destination's name, slide up into place
  await new Promise((resolve) => setTimeout(resolve, 150)) // brief hold once both have landed
  markPageTransition() // tells the destination page not to replay this same slide-up
  location.href = href // the destination page loads already covered, and opens on its own
}
