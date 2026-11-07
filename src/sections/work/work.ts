// Work section ("Selected work"): the project showcase, one screen tall. On
// large screens a 20 / 80 split — a stack of project cards on the left, and
// on the right a stage with a browser window showing the selected project's
// homepage and a phone beside it. Selecting a project lifts its card,
// slides both screens over to it, and swaps the address. Below 1024px it
// stacks: the cards become a sideways-scrolling strip of pills above a
// full-width preview. To change the projects, edit the `projects` array.
// Styles live in work.css.
import './work.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CARD_THEMES } from '../../components/card-art/cardArt'
import handsolvedDesktop from '../../assets/work/handsolved-desktop.webp'
import handsolvedPhone from '../../assets/work/handsolved-phone.webp'
import fixwizardDesktop from '../../assets/work/fixwizard-desktop.webp'
import fixwizardPhone from '../../assets/work/fixwizard-phone.webp'
import havenDesktop from '../../assets/work/haven-desktop.webp'
import havenPhone from '../../assets/work/haven-phone.webp'
import fureverDesktop from '../../assets/work/furever-desktop.webp'
import fureverPhone from '../../assets/work/furever-phone.webp'

// One entry per project: its card (name, tag), the site's address, its
// headline (the tagline on the hero's card stack, hero.ts), and screenshots
// of its homepage (1440px desktop, 390px phone) with a line describing them.
export const projects = [
  {
    name: 'HandSolved',
    tag: 'Poker app · 2026',
    url: 'handsolved.com',
    title: 'Every hand you play, solved.',
    desktop: handsolvedDesktop,
    phone: handsolvedPhone,
    alt: 'HandSolved homepage: "Every hand you play, solved." beside a preflop chart and the app on a phone.',
  },
  {
    name: 'The Fix Wizard',
    tag: 'Chimney & handyman · 2026',
    url: 'thefixwizard.com',
    title: 'Chimney and handyman services near you',
    desktop: fixwizardDesktop,
    phone: fixwizardPhone,
    alt: 'The Fix Wizard homepage: "Chimney & Handyman Services Near You" with free quote and service area buttons.',
  },
  {
    name: 'Haven Locksmith',
    tag: 'Locksmith · 2026',
    url: 'havenlocksmith.com',
    title: 'Locked out? Help is closer than you think.',
    desktop: havenDesktop,
    phone: havenPhone,
    alt: 'Haven Locksmith homepage: "Locked out? Help is closer than you think." beside a drawing of a lock cylinder.',
  },
  {
    name: 'Furever Home',
    tag: 'Animal shelter · 2026',
    url: 'bg-guy.github.io/animal-shelter-2',
    title: 'Every paw deserves a home to run home to.',
    desktop: fureverDesktop,
    phone: fureverPhone,
    alt: 'Furever Home homepage: "Every paw deserves a home to run home to." beside a card for Buddy, a dog up for adoption.',
  },
]
type Project = (typeof projects)[number]

// Two-digit project number ("01").
const pad = (n: number) => String(n).padStart(2, '0')

// Each project's fill (components/card-art), cycled like the "What we do" cards.
const themeOf = (i: number) => CARD_THEMES[i % CARD_THEMES.length]

// One project card — a tab: its fill, number, name and tag.
const renderCard = (p: Project, i: number) => `
            <button type="button" role="tab" id="pj-tab-${i}" class="pj-card card-theme-${themeOf(i)}"
                    aria-selected="${i === 0}" aria-controls="pj-stage" tabindex="${i === 0 ? 0 : -1}">
              <span class="pj-card-n" aria-hidden="true">${pad(i + 1)}</span>
              <span class="pj-card-name">${p.name}</span>
              <span class="pj-card-tag">${p.tag}</span>
            </button>`

// One project's frame on the browser screen: its fill behind the desktop
// screenshot, or the phone one when the browser is phone-sized itself.
// Only the selected frame is shown to screen readers.
const renderFrame = (p: Project, i: number) => `
                  <div class="pj-frame card-theme-${themeOf(i)}"${i === 0 ? '' : ' aria-hidden="true"'}>
                    <span class="pj-art card-art"></span>
                    <picture>
                      <source media="(max-width: 639px)" srcset="${p.phone}">
                      <img class="pj-shot" src="${p.desktop}" alt="${p.alt}" width="1800" height="1125" loading="lazy" decoding="async">
                    </picture>
                  </div>`

// One project's frame on the phone: its fill behind the phone screenshot.
const renderPhoneFrame = (p: Project, i: number) => `
                  <div class="pj-frame card-theme-${themeOf(i)}">
                    <span class="pj-art card-art"></span>
                    <img class="pj-shot" src="${p.phone}" alt="" width="780" height="1688" loading="lazy" decoding="async">
                  </div>`

// Markup: heading with the project count, then the cards (a tab list) and
// the stage (their tab panel) showing the first project. The section is
// sized to one screen in work.css (.pj-section).
export const renderWork = () => `
    <section id="work" class="pj-section px-6 sm:px-10">
      <div class="mx-auto w-full max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-10">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl">Selected <span class="nb-mark">work</span></h2>
          <span class="hidden sm:block"><span class="nb-pill" style="--nb-pill-bg: var(--color-mint)">${pad(projects.length)} projects</span></span>
        </div>

        <div class="pj reveal">
          <div class="pj-list" role="tablist" aria-label="Projects">
            ${projects.map(renderCard).join('')}
          </div>

          <div id="pj-stage" class="pj-stage" role="tabpanel" aria-labelledby="pj-tab-0" style="--pj-index: 0">
            <div class="pj-browser">
              <div class="pj-chrome" aria-hidden="true">
                <span class="pj-lights"><i></i><i></i><i></i></span>
                <span class="pj-address"><span class="pj-mask"><span id="pj-url" class="pj-url">${projects[0].url}</span></span></span>
              </div>
              <div class="pj-screen">
                <div id="pj-track" class="pj-track">
                  ${projects.map(renderFrame).join('')}
                </div>
              </div>
            </div>
            <div class="pj-phone" aria-hidden="true">
              <div class="pj-phone-screen">
                <div class="pj-track">
                  ${projects.map(renderPhoneFrame).join('')}
                </div>
                <span class="pj-island"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
`

// Wires up the showcase: clicking a card, or the arrow / Home / End keys
// on the cards, selects a project. Call after the markup is in the DOM.
export function initWork() {
  const list = document.querySelector<HTMLElement>('#work .pj-list')
  const stage = document.getElementById('pj-stage')
  const url = document.getElementById('pj-url')
  const track = document.getElementById('pj-track')
  if (!list || !stage || !url || !track) return

  const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
  const frames = Array.from(track.children)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let active = 0
  let shown = reduceMotion // whether the address has made its first entrance
  let textMotion: gsap.core.Timeline | null = null

  // The address slides inside an overflow-hidden mask, by transform only.
  // It waits below its mask until the showcase scrolls into view, then
  // slides up.
  const slideIn = () => gsap.timeline().to(url, { yPercent: 0, duration: 0.7, ease: 'power3.out' })

  if (!reduceMotion) {
    gsap.set(url, { yPercent: 110 })
    ScrollTrigger.create({
      trigger: stage,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        if (shown) return
        shown = true
        textMotion = slideIn()
      },
    })
  }

  // Swaps the address to project `i`: the current one slides up and out of
  // its mask, then the new one slides up into its place. A new swap takes
  // over from wherever the last one had got to.
  function showText(i: number) {
    const write = () => {
      url!.textContent = projects[i].url
    }
    textMotion?.kill()
    if (reduceMotion) return write()
    textMotion = gsap.timeline()
    if (shown) textMotion.to(url, { yPercent: -110, duration: 0.3, ease: 'power2.in' })
    textMotion.add(write).set(url, { yPercent: 110 }).add(slideIn())
    shown = true
  }

  // On small screens the cards are a sideways-scrolling strip: centre the
  // selected one in it, without moving the page.
  function bringIntoView(i: number) {
    if (list!.scrollWidth <= list!.clientWidth) return
    const tab = tabs[i]
    list!.scrollTo({
      left: tab.offsetLeft - (list!.clientWidth - tab.offsetWidth) / 2,
      behavior: reduceMotion ? 'instant' : 'smooth',
    })
  }

  // Selects project `i`: its card lifts (CSS, from aria-selected), both
  // screens slide to its frame (CSS, from --pj-index) and its address swaps in.
  function select(i: number) {
    if (i === active) return
    tabs[active].setAttribute('aria-selected', 'false')
    tabs[active].tabIndex = -1
    tabs[i].setAttribute('aria-selected', 'true')
    tabs[i].tabIndex = 0
    frames[active].setAttribute('aria-hidden', 'true')
    frames[i].removeAttribute('aria-hidden')
    stage!.style.setProperty('--pj-index', String(i))
    stage!.setAttribute('aria-labelledby', tabs[i].id)
    active = i
    showText(i)
    bringIntoView(i)
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => select(i)))

  // Arrow keys on either axis (the cards stack on large screens and run
  // sideways on small ones), plus Home and End, move between projects.
  const steps: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
  list.addEventListener('keydown', (e) => {
    let next: number
    if (e.key in steps) next = (active + steps[e.key] + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    select(next)
    tabs[next].focus({ preventScroll: true })
  })
}
