import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
    <div class="pre-word font-display text-5xl sm:text-6xl font-extrabold tracking-tight">
      <span>Pine&nbsp;Valley&nbsp;Digital</span>
    </div>
  </div>

  <header id="site-nav" class="fixed top-0 inset-x-0 z-40 opacity-0 bg-[var(--color-paper)]/85 backdrop-blur-sm">
    <div class="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex items-center justify-between">
      <a href="#top" class="font-display font-extrabold text-lg tracking-tight">Pine<span class="text-accent-ink bg-[var(--color-accent)] px-1 ml-0.5">Valley</span></a>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#services" class="nav-link">Services</a>
        <a href="#work" class="nav-link">Work</a>
        <a href="#process" class="nav-link">Process</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="#contact" class="btn-cta hidden sm:inline-flex text-sm font-semibold border border-[var(--color-ink)] rounded-full px-5 py-2">
          <span class="btn-cta-bg"></span>
          <span class="btn-cta-label">Start a project</span>
        </a>
        <button id="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" class="md:hidden flex flex-col justify-center items-center w-10 h-10 border border-[var(--color-ink)] rounded-full">
          <span class="menu-bar block w-4 h-[1.5px] bg-[var(--color-ink)] transition-transform"></span>
          <span class="menu-bar block w-4 h-[1.5px] bg-[var(--color-ink)] mt-1 transition-transform"></span>
        </button>
      </div>
    </div>
    <nav id="mobile-menu" class="md:hidden hidden flex-col gap-1 px-6 pb-6 text-lg font-display font-bold">
      <a href="#services" class="mobile-nav-link py-3 border-b border-[var(--color-ink)]/10">Services</a>
      <a href="#work" class="mobile-nav-link py-3 border-b border-[var(--color-ink)]/10">Work</a>
      <a href="#process" class="mobile-nav-link py-3 border-b border-[var(--color-ink)]/10">Process</a>
      <a href="#contact" class="mobile-nav-link py-3">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section id="hero" class="relative px-6 sm:px-10 pt-40 pb-24 sm:pt-52 sm:pb-32">
      <div class="mx-auto max-w-7xl">
        <p class="hero-eyebrow overflow-hidden">
          <span class="block text-sm font-semibold uppercase tracking-[0.2em] text-ink/60">Web design &amp; development studio</span>
        </p>
        <h1 class="font-display font-extrabold tracking-tight mt-6 text-[13vw] leading-[0.95] sm:text-[7.5vw] sm:leading-[0.92]">
          <span class="hero-line block overflow-hidden"><span class="block">We build fast,</span></span>
          <span class="hero-line block overflow-hidden"><span class="block">modern websites<span class="text-[var(--color-accent)]">.</span></span></span>
        </h1>
        <div class="hero-sub mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <p class="max-w-md text-lg text-ink/70">
            Pine Valley Digital designs and builds lean, high-performance websites for
            studios, founders, and small teams who need to move fast without looking cheap.
          </p>
          <a href="#work" class="shrink-0 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
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
                  `<span class="flex items-center gap-6 pr-6"><span>${item}</span><span aria-hidden="true" class="text-[var(--color-accent)]">&#10022;</span></span>`
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

  <footer class="px-6 sm:px-10 py-10 border-t border-[var(--color-ink)]/10">
    <div class="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/50">
      <span>&copy; ${new Date().getFullYear()} Pine Valley Digital.</span>
      <div class="flex items-center gap-6">
        <a href="#services" class="nav-link">Services</a>
        <a href="#work" class="nav-link">Work</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
    </div>
  </footer>
`

initAnimations()
setupMobileMenu()
setupDuotoneHeading()

function setupMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('#menu-toggle')
  const menu = document.querySelector<HTMLElement>('#mobile-menu')
  if (!toggle || !menu) return

  const close = () => {
    menu.classList.add('hidden')
    menu.classList.remove('flex')
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden')
    if (isOpen) {
      close()
    } else {
      menu.classList.remove('hidden')
      menu.classList.add('flex')
      toggle.setAttribute('aria-expanded', 'true')
    }
  })

  menu.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', close)
  })
}

function initAnimations() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const nav = document.querySelector('#site-nav')
  const heroLines = gsap.utils.toArray<HTMLElement>('.hero-line > span')
  const heroEyebrow = document.querySelector('.hero-eyebrow span')
  const heroSub = document.querySelector('.hero-sub')
  const preloader = document.querySelector('#preloader')
  const preWordSpan = document.querySelector('#preloader .pre-word span')

  if (reduceMotion) {
    gsap.set([preloader], { display: 'none' })
    gsap.set([nav, heroSub], { opacity: 1 })
    gsap.set(heroLines, { y: 0 })
    if (heroEyebrow) gsap.set(heroEyebrow, { y: 0 })
    setupScrollReveals()
    setupMarquee()
    return
  }

  gsap.set(heroLines, { yPercent: 110 })
  gsap.set(heroEyebrow, { yPercent: 110 })
  gsap.set(heroSub, { autoAlpha: 0, y: 16 })

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

  tl.to(preWordSpan, { yPercent: 0, duration: 0.9, ease: 'power4.out' })
    .to(preWordSpan, { yPercent: -110, duration: 0.6, ease: 'power3.in', delay: 0.25 })
    .to(preloader, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '-=0.2')
    .set(preloader, { display: 'none' })
    .to(nav, { opacity: 1, duration: 0.6 }, '-=0.5')
    .to(heroEyebrow, { yPercent: 0, duration: 0.7 }, '-=0.5')
    .to(heroLines, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '-=0.5')
    .to(heroSub, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.5')

  setupScrollReveals()
  setupMarquee()
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
  gsap.to(track, {
    xPercent: -50,
    duration: 22,
    ease: 'none',
    repeat: -1,
  })
}
