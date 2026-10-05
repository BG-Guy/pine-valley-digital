// Work section ("Selected work"): the project showcase. On large screens a
// 20 / 80 split — a stack of project cards on the left, and on the right a
// stage with a browser window showing the selected project's homepage hero
// and a phone beside it. Selecting a project lifts its card, slides both
// screens over to it, and swaps the hero text. Below 1024px it stacks: the
// cards become a sideways-scrolling strip of pills above a full-width
// preview. To change the projects, edit the `projects` array. Styles live
// in work.css.
import './work.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CARD_THEMES } from '../../components/card-art/cardArt'

// One entry per project: its card (name, tag) and its preview — the site's
// address, and its homepage hero's title and description. The preview
// copy is placeholder text until the real sites go in.
const projects = [
  {
    name: 'Northfield Studio',
    tag: 'Architecture · 2025',
    url: 'northfieldstudio.com',
    title: 'Spaces shaped around the way people live',
    description: 'A calm, image-led homepage for a studio whose houses, libraries and schools speak for themselves.',
  },
  {
    name: 'Marlow & Co.',
    tag: 'Hospitality · 2025',
    url: 'marlowandco.com',
    title: 'Small plates, long tables, late nights',
    description: 'Menus, rooms and bookings for a family of local restaurants, one tap away on any phone.',
  },
  {
    name: 'Petra Fintech',
    tag: 'SaaS · 2024',
    url: 'petra.finance',
    title: 'Treasury tools for teams that move fast',
    description: 'A clear product story with live numbers, built to turn free trials into whole finance teams.',
  },
  {
    name: 'Kiln Ceramics',
    tag: 'E-commerce · 2024',
    url: 'kilnceramics.shop',
    title: 'Handmade pieces, fired in small batches',
    description: 'A quiet storefront that lets the glaze and the craft do the selling, from first look to checkout.',
  },
]
type Project = (typeof projects)[number]

// Two-digit project number ("01").
const pad = (n: number) => String(n).padStart(2, '0')

// Each project's card art theme, cycled like the "What we do" cards.
const themeOf = (i: number) => CARD_THEMES[i % CARD_THEMES.length]

// One project card — a tab: its art, number, name and tag.
const renderCard = (p: Project, i: number) => `
            <button type="button" role="tab" id="pj-tab-${i}" class="pj-card card-theme-${themeOf(i)}"
                    aria-selected="${i === 0}" aria-controls="pj-stage" tabindex="${i === 0 ? 0 : -1}">
              <span class="pj-card-art card-art card-lines" aria-hidden="true"></span>
              <span class="pj-card-n" aria-hidden="true">${pad(i + 1)}</span>
              <span class="pj-card-name">${p.name}</span>
              <span class="pj-card-tag">${p.tag}</span>
            </button>`

// One project's frame on the browser screen: its card art behind a sketch
// of the site's top bar. The hero text isn't part of the frame — it sits
// above the frames (.pj-copy), so it can swap on its own.
const renderFrame = (_: Project, i: number) => `
                  <div class="pj-frame card-theme-${themeOf(i)}">
                    <span class="pj-art card-art card-lines"></span>
                    <span class="pj-site-bar"><i></i><i></i><i></i><i></i></span>
                  </div>`

// One project's frame on the phone: its card art behind a sketch of the
// hero (heading, text and a button) — a stand-in until real screenshots.
const renderPhoneFrame = (_: Project, i: number) => `
                  <div class="pj-frame card-theme-${themeOf(i)}">
                    <span class="pj-art card-art card-lines"></span>
                    <span class="pj-sketch"><i></i><i></i><i></i><i></i><i></i></span>
                  </div>`

// Markup: heading with the project count, then the cards (a tab list) and
// the stage (their tab panel) showing the first project.
export const renderWork = () => `
    <section id="work" class="px-6 sm:px-10 py-24 sm:py-32 bg-[var(--color-paper-dim)]">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">Selected <span class="text-[var(--color-accent-2)]">work</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(${pad(projects.length)})</span>
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
                <div class="pj-track" aria-hidden="true">
                  ${projects.map(renderFrame).join('')}
                </div>
                <div class="pj-copy">
                  <div class="pj-mask"><h3 id="pj-title" class="pj-title">${projects[0].title}</h3></div>
                  <div class="pj-mask"><p id="pj-description" class="pj-description">${projects[0].description}</p></div>
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
  const title = document.getElementById('pj-title')
  const description = document.getElementById('pj-description')
  if (!list || !stage || !url || !title || !description) return

  const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
  const text = [url, title, description]
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let active = 0
  let shown = reduceMotion // whether the text has made its first entrance
  let textMotion: gsap.core.Timeline | null = null

  // The hero text slides inside overflow-hidden masks, by transform only.
  // It waits below its mask until the showcase scrolls into view, then
  // slides up — the description just after the title.
  const slideIn = () =>
    gsap
      .timeline()
      .to([url, title], { yPercent: 0, duration: 0.7, ease: 'power3.out' })
      .to(description, { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 0.14)

  if (!reduceMotion) {
    gsap.set(text, { yPercent: 110 })
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

  // Swaps the hero text to project `i`: the current text slides up and out
  // of its masks, then the new text slides up into its place. A new swap
  // takes over from wherever the last one had got to.
  function showText(i: number) {
    const p = projects[i]
    const write = () => {
      url!.textContent = p.url
      title!.textContent = p.title
      description!.textContent = p.description
    }
    textMotion?.kill()
    if (reduceMotion) return write()
    textMotion = gsap.timeline()
    if (shown) textMotion.to(text, { yPercent: -110, duration: 0.3, ease: 'power2.in', stagger: 0.04 })
    textMotion.add(write).set(text, { yPercent: 110 }).add(slideIn())
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
  // screens slide to its frame (CSS, from --pj-index) and its text swaps in.
  function select(i: number) {
    if (i === active) return
    tabs[active].setAttribute('aria-selected', 'false')
    tabs[active].tabIndex = -1
    tabs[i].setAttribute('aria-selected', 'true')
    tabs[i].tabIndex = 0
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
