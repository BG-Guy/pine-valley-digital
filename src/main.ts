import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { curveTransition } from './transition'
import { initRevealFooter } from './revealFooter'
import { initHoverTeaserMenu } from './hoverTeaserMenu'
import { initHoverCarouselLink } from './hoverCarouselLink'

gsap.registerPlugin(ScrollTrigger)

// Pine tree nestled in a valley — the two slopes are separate strokes at
// 80% opacity with round caps that share an endpoint, so they naturally
// alpha-blend into a distinct third color right where they meet, while
// each slope stays its own clean hue everywhere else along its length.
// The tree stays in currentColor so it adapts to light/dark backgrounds.
const logoMark = (className: string) => `
  <svg class="${className}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 18 L24 42" stroke="#6C3BAA" stroke-opacity="0.8" stroke-width="4.5" stroke-linecap="round" />
    <path d="M43 18 L24 42" stroke="#3BAA99" stroke-opacity="0.8" stroke-width="4.5" stroke-linecap="round" />
    <path d="M24 17 L35 29 L13 29 Z" fill="currentColor" />
    <path d="M24 12 L32 22 L16 22 Z" fill="currentColor" />
    <path d="M24 8 L28 16 L20 16 Z" fill="currentColor" />
    <rect x="21" y="29" width="6" height="7" rx="1" fill="currentColor" />
  </svg>
`

// Logotype: an italic serif for "Pine Valley" (the place) against the bold
// grotesque for "Digital" (the craft) — same typographic pairing as the
// body copy, deliberately contrasted for the wordmark itself.
const logoWordmark = (sizeClass: string) => `
  <span class="inline-flex items-baseline gap-[0.3em] leading-none ${sizeClass}">
    <span class="font-logo italic font-medium">Pine Valley</span>
    <span class="font-display font-extrabold tracking-tight">Digital</span>
  </span>
`

const services = [
  {
    n: '01',
    title: 'Web Design',
    copy: 'Interfaces built around your content and your users, not a template — wireframed, art-directed, and refined until it feels inevitable.',
  },
  {
    n: '02',
    title: 'Development',
    copy: 'Hand-built front ends with lean, modern tooling. No bloated CMS, no unnecessary dependencies — just fast, maintainable code.',
  },
  {
    n: '03',
    title: 'Brand & Identity',
    copy: 'Logo, type system, color, voice — a visual language that holds up across the site, social, and everything after launch.',
  },
  {
    n: '04',
    title: 'SEO & Performance',
    copy: 'Sites that load in a blink and rank because of it. Technical SEO, Core Web Vitals, and clean semantic markup from day one.',
  },
]

const projects = [
  { name: 'Northfield Studio', tag: 'Architecture · 2025' },
  { name: 'Marlow & Co.', tag: 'Hospitality · 2025' },
  { name: 'Petra Fintech', tag: 'SaaS · 2024' },
  { name: 'Kiln Ceramics', tag: 'E-commerce · 2024' },
]

const process = [
  { n: '01', title: 'Discover', copy: 'Goals, audience, and constraints — a short, focused kickoff so we build the right thing.' },
  { n: '02', title: 'Design', copy: 'Wireframes to high-fidelity screens, reviewed together at every stage.' },
  { n: '03', title: 'Build', copy: 'Hand-coded, tested across devices, optimized before it ever ships.' },
  { n: '04', title: 'Launch', copy: 'Deployed, measured, and handed off with everything you need to run it.' },
]

const marqueeItems = ['Web Design', 'Development', 'Brand Identity', 'SEO & Performance']

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="preloader">
    <div class="pre-word tracking-tight">
      <span class="relative inline-flex items-center justify-center text-4xl sm:text-6xl">
        <span class="absolute inset-0 -z-10 flex items-center justify-center">
          ${logoMark('w-[6em] h-[6em] opacity-20')}
        </span>
        ${logoWordmark('')}
      </span>
    </div>
  </div>

  <div id="page-shell">
  <header id="site-nav" class="navbar-shell fixed top-0 inset-x-0 z-40 opacity-0">
    <div id="navbar-bar" class="navbar-bar border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)]">
      <div class="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex items-center justify-between">
        <a href="#top" class="flex items-center gap-2">
          ${logoMark('w-7 h-7 shrink-0')}
          ${logoWordmark('text-base sm:text-lg')}
        </a>
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" class="nav-link">Services</a>
          <a href="#work" class="nav-link">Work</a>
          <a href="#process" class="nav-link">Process</a>
          <a href="#contact" class="nav-link">Contact</a>
        </nav>
        <div class="flex items-center gap-3">
          <a href="#contact" class="btn-cta hidden sm:inline-flex text-sm font-semibold">
            <span class="btn-cta-clip">
              <span class="btn-cta-bg"></span>
              <span class="btn-cta-label">Start a project</span>
            </span>
          </a>
          <button id="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" class="md:hidden cursor-pointer flex items-center justify-center w-10 h-10 border border-[var(--color-ink)] rounded-full">
            <span class="hamburger">
              <span class="bar"></span>
              <span class="bar"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <nav id="mobile-menu" class="md:hidden hidden px-6 pb-6">
      <div id="mobile-menu-teaser" class="w-full h-72 sm:h-80"></div>
    </nav>
  </header>

  <main id="top">
    <section id="hero" class="relative overflow-hidden px-6 sm:px-10 pt-40 pb-24 sm:pt-52 sm:pb-32">
      <div class="hero-blob hero-blob-a" aria-hidden="true"></div>
      <div class="hero-blob hero-blob-b" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-7xl">
        <p class="hero-eyebrow overflow-hidden">
          <span class="block text-sm font-semibold uppercase tracking-[0.2em] text-ink/60">Web design &amp; development studio</span>
        </p>
        <h1 class="font-display font-extrabold tracking-tight mt-6 text-[13vw] leading-[0.95] sm:text-[7.5vw] sm:leading-[0.92]">
          <span class="hero-line block overflow-hidden"><span class="block">We build
            <span class="hero-fast">
              <span class="hero-fast-base">fast</span>
              <span class="hero-fast-slice s1" aria-hidden="true">fast</span>
              <span class="hero-fast-slice s2" aria-hidden="true">fast</span>
              <span class="hero-fast-slice s3" aria-hidden="true">fast</span>
              <span class="hero-fast-slice s4" aria-hidden="true">fast</span>
            </span>,</span></span>
          <span class="hero-line block overflow-hidden"><span class="block">modern websites<span class="text-[var(--color-accent)]">.</span></span></span>
        </h1>
        <div class="hero-sub mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <p class="max-w-md text-lg text-ink/70">
            Pine Valley Digital designs and builds lean, high-performance websites for
            studios, founders, and small teams who need to move fast without looking cheap.
          </p>
          <a href="#work" class="hero-cta shrink-0 inline-flex items-center text-sm font-semibold uppercase tracking-wide">
            See our work
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>
    </section>

    <div class="marquee-wrap border-y border-[var(--color-ink)]/10 py-4 overflow-hidden">
      <div class="marquee-track font-display text-2xl sm:text-3xl font-semibold">
        ${Array(2)
          .fill(
            marqueeItems
              .map(
                (item) =>
                  `<span class="flex items-center gap-6 pr-6"><span>${item}</span>${logoMark('marquee-pine')}</span>`
              )
              .join('')
          )
          .join('')}
      </div>
    </div>

    <section id="services" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">What we <span class="text-[var(--color-accent-2)]">do</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(04)</span>
        </div>
        <div class="divide-y divide-[var(--color-ink)]/10 border-t border-[var(--color-ink)]/10">
          ${services
            .map(
              (s) => `
            <div class="service-row reveal grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-10 items-start">
              <span class="sm:col-span-2 font-display text-ink/30 text-2xl">${s.n}</span>
              <h3 class="sm:col-span-3 font-display font-bold text-2xl sm:text-3xl">${s.title}</h3>
              <p class="sm:col-span-7 text-ink/65 text-base sm:text-lg max-w-xl">${s.copy}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section id="work" class="px-6 sm:px-10 py-24 sm:py-32 bg-[var(--color-paper-dim)]">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">Selected <span class="text-[var(--color-accent-2)]">work</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(04)</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          ${projects
            .map(
              (p) => `
            <a href="#" class="project-card reveal group block">
              <div class="relative">
                <div class="project-card-shadow absolute inset-0"></div>
                <div class="project-card-face relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[var(--color-ink)] bg-[var(--color-paper)]">
                  <div class="absolute inset-0 flex items-center justify-center text-center px-6 font-display font-extrabold text-2xl sm:text-3xl group-hover:scale-105 transition-transform duration-500">
                    ${p.name}
                  </div>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="font-display font-bold text-lg">${p.name}</span>
                <span class="text-sm text-ink/50">${p.tag}</span>
              </div>
            </a>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section id="process" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">How we <span class="text-[var(--color-accent-2)]">work</span></h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-6">
          ${process
            .map(
              (p, i) => `
            <div class="process-step reveal pt-5" style="border-top: 2px solid ${i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-accent-2)'}">
              <span class="font-display text-ink/30 text-xl">${p.n}</span>
              <h3 class="font-display font-bold text-xl mt-2 mb-2">${p.title}</h3>
              <p class="text-ink/65 text-sm leading-relaxed">${p.copy}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section id="contact" class="px-6 sm:px-10 py-24 sm:py-32 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div class="mx-auto max-w-7xl">
        <p class="reveal text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-paper)]/50 mb-6">Get in touch</p>
        <h2 id="contact-heading" class="duotone-heading reveal font-display font-extrabold tracking-tight text-[10vw] leading-[0.95] sm:text-6xl sm:leading-[1.02] max-w-3xl">
          <span class="duotone-back" aria-hidden="true">Let&rsquo;s build something fast.</span>
          <span class="duotone-front">Let&rsquo;s build something fast.</span>
        </h2>
        <div class="reveal mt-12 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <a href="mailto:hello@pinevalleydigital.com" class="inline-flex items-center gap-3 text-xl sm:text-2xl font-display font-bold border-b-2 border-[var(--color-accent)] pb-1 w-fit">
            hello@pinevalleydigital.com
          </a>
          <span class="text-[var(--color-paper)]/50 text-sm">Usually replies within one business day.</span>
        </div>
      </div>
    </section>
  </main>
  </div>

  <footer id="site-footer">
    <div id="footer-shell" class="footer-shell px-6 sm:px-10 py-10">
      <div class="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/50">
        <span class="inline-flex items-center gap-2">${logoMark('w-5 h-5 shrink-0')}&copy; ${new Date().getFullYear()} Pine Valley Digital.</span>
        <div class="flex items-center gap-6">
          <a href="#services" class="nav-link">Services</a>
          <a href="#work" class="nav-link">Work</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>
      </div>
    </div>
  </footer>
`

initAnimations()
setupMobileMenu()
setupDuotoneHeading()
setupNavbarMorph()
setupHeroGlitch()

const { spacer: footerSpacer } = initRevealFooter(document.getElementById('page-shell')!, document.getElementById('site-footer')!)
setupFooterMorph(footerSpacer)

initHoverTeaserMenu(document.getElementById('mobile-menu-teaser')!, [
  { id: 'services', label: 'Services', href: '#services', color: 'var(--color-accent)' },
  { id: 'work', label: 'Work', href: '#work', color: 'var(--color-accent-2)' },
  { id: 'process', label: 'Process', href: '#process', color: '#d9a441' },
  { id: 'contact', label: 'Contact', href: '#contact', color: 'var(--color-ink)' },
])

function setupMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('#menu-toggle')
  const menu = document.querySelector<HTMLElement>('#mobile-menu')
  if (!toggle || !menu) return

  const close = () => {
    menu.classList.add('hidden')
    menu.classList.remove('flex')
    toggle.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden')
    if (isOpen) {
      close()
    } else {
      menu.classList.remove('hidden')
      menu.classList.add('flex')
      toggle.classList.add('is-open')
      toggle.setAttribute('aria-expanded', 'true')
    }
  })

  // The teaser menu's own links (data-link) may preventDefault on a first
  // touch tap to just "prime" the color teaser — only close the drawer once
  // a click is actually about to navigate.
  menu.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest('[data-link]')
    if (link && !e.defaultPrevented) close()
  })
}

async function initAnimations() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const nav = document.querySelector('#site-nav')
  const heroLines = gsap.utils.toArray<HTMLElement>('.hero-line > span')
  const heroEyebrow = document.querySelector('.hero-eyebrow span')
  const heroSub = document.querySelector('.hero-sub')
  const preloader = document.querySelector<HTMLElement>('#preloader')
  const preWord = document.querySelector<HTMLElement>('#preloader .pre-word')

  if (reduceMotion) {
    gsap.set([preloader], { display: 'none' })
    gsap.set([nav, heroSub], { opacity: 1 })
    gsap.set(heroLines, { y: 0 })
    if (heroEyebrow) gsap.set(heroEyebrow, { y: 0 })
    setupScrollReveals()
    setupMarquee()
    setupHoverCarouselLinks()
    return
  }

  gsap.set(heroLines, { yPercent: 110 })
  gsap.set(heroEyebrow, { yPercent: 110 })
  gsap.set(heroSub, { autoAlpha: 0, y: 16 })
  gsap.set(preWord, { autoAlpha: 1, scale: 1 })

  const revealPage = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
  revealPage
    .to(nav, { opacity: 1, duration: 0.6 })
    .to(heroEyebrow, { yPercent: 0, duration: 0.7 }, '<')
    .to(heroLines, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '<+=0.1')
    .to(heroSub, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.5')

  setupScrollReveals()
  setupMarquee()
  setupHeroBlobs()
  setupHoverCarouselLinks()

  if (preloader) {
    // Total load sequence: 1200ms hold + 300ms fade + 1000ms curtain = 2.5s.
    const curtain = curveTransition({ container: preloader, color: '#333333', duration: 1000 })
    curtain.setCovered() // start already closed, logo already visible — no grow-in

    await new Promise((resolve) => setTimeout(resolve, 1200)) // hold on the logo
    await new Promise<void>((resolve) => {
      gsap.to(preWord, { autoAlpha: 0, duration: 0.3, onComplete: resolve })
    })
    revealPage.play()
    await curtain.reveal() // single motion: curtain opens, revealing the hero
    curtain.destroy()

    gsap.set(preloader, { display: 'none' })
  } else {
    revealPage.play()
  }
}

function setupScrollReveals() {
  const groups: [string, number][] = [
    ['#services .service-row', 0.08],
    ['#work .project-card', 0.1],
    ['#process .process-step', 0.08],
  ]

  groups.forEach(([selector, stagger]) => {
    const items = gsap.utils.toArray<HTMLElement>(selector)
    if (!items.length) return
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: items[0].closest('section') ?? items[0],
        start: 'top 80%',
      },
    })
  })

  gsap.utils.toArray<HTMLElement>('.reveal:not(.service-row):not(.project-card):not(.process-step)').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    })
  })
}

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

function setupHeroGlitch() {
  const target = document.querySelector<HTMLElement>('.hero-fast')
  if (!target) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const fire = () => {
    target.classList.add('is-glitching')
    setTimeout(() => target.classList.remove('is-glitching'), 550)
  }

  // First burst after the hero's own load-in settles, then a slow repeat —
  // present, not a tic.
  setTimeout(fire, 3000)
  setInterval(fire, 6000)
}

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

function setupDuotoneHeading() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const heading = document.querySelector<HTMLElement>('#contact-heading')
  const back = heading?.querySelector<HTMLElement>('.duotone-back')
  if (!heading || !back) return

  heading.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = heading.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 16
    const y = ((e.clientY - top) / height - 0.5) * 16
    gsap.to(back, { x, y, duration: 0.4, ease: 'power2.out' })
  })

  heading.addEventListener('mouseleave', () => {
    gsap.to(back, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
  })
}

function setupMarquee() {
  const track = document.querySelector<HTMLElement>('.marquee-track')
  if (!track) return
  const loop = gsap.to(track, {
    xPercent: -50,
    duration: 22,
    ease: 'none',
    repeat: -1,
  })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Speed up with scroll velocity. Measured per frame from scrollY (rather
  // than ScrollTrigger's velocity, which only updates on scroll events) so
  // the boost also eases back down smoothly once scrolling stops.
  const BOOST_PER_PX = 0.375 // extra timeScale per px scrolled per 60fps frame
  const MAX_BOOST = 14
  let lastY = window.scrollY
  let boost = 0
  gsap.ticker.add(() => {
    const y = window.scrollY
    const pxPerFrame = Math.abs(y - lastY) / gsap.ticker.deltaRatio()
    lastY = y
    const target = Math.min(pxPerFrame * BOOST_PER_PX, MAX_BOOST)
    // Rise quickly, fall back slowly.
    boost += (target - boost) * (target > boost ? 0.2 : 0.06)
    loop.timeScale(1 + boost)
  })
}

// The two hero blobs glide to each other's spot and back, forever. Only
// `transform` is animated (composited, no repaint); the travel distance is
// measured from layout so it holds at every breakpoint, and rebuilt on
// resize (ScrollTrigger's 'refresh') with the loop position preserved.
function setupHeroBlobs() {
  const a = document.querySelector<HTMLElement>('.hero-blob-a')
  const b = document.querySelector<HTMLElement>('.hero-blob-b')
  if (!a || !b) return

  // offsetLeft/Top ignore transforms, so this is the resting centre.
  const center = (el: HTMLElement) => ({
    x: el.offsetLeft + el.offsetWidth / 2,
    y: el.offsetTop + el.offsetHeight / 2,
  })
  const loop = { duration: 7.7, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 1 }

  let tweens: gsap.core.Tween[] = []
  const build = () => {
    const time = tweens[0]?.totalTime() ?? 0
    tweens.forEach((t) => t.kill())
    gsap.set([a, b], { x: 0, y: 0 })
    const ca = center(a)
    const cb = center(b)
    const dx = cb.x - ca.x
    const dy = cb.y - ca.y
    tweens = [gsap.to(a, { x: dx, y: dy, ...loop }), gsap.to(b, { x: -dx, y: -dy, ...loop })]
    tweens.forEach((t) => t.totalTime(time))
  }
  build()
  ScrollTrigger.addEventListener('refresh', build)
}

// Wire the hover carousel effect onto the nav/footer links and the hero CTA.
function setupHoverCarouselLinks() {
  document.querySelectorAll<HTMLElement>('.nav-link').forEach((link) => {
    initHoverCarouselLink(link, { color: 'var(--color-accent)' })
  })
  document.querySelectorAll<HTMLElement>('.hero-cta').forEach((link) => {
    initHoverCarouselLink(link, { color: 'var(--color-accent-2)', gap: '0.5rem' })
  })
}
