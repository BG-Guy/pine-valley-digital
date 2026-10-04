# Pine Valley Digital

Marketing site for Pine Valley Digital — a single-page, fast-loading site built with Vite, vanilla TypeScript, Tailwind CSS, and GSAP.

## Stack

- [Vite](https://vite.dev/) + vanilla TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) + ScrollTrigger for the loading animation and scroll reveals

## Design system

The color theme (purple `#6C3BAA` / green `#3BAA99` on warm off-white paper,
dark ink for contrast) and several component patterns — the sliding-fill CTA
button, the offset-shadow work cards, the duotone contact heading — are
shared with [portfolio-2025](https://github.com/bg-guy/portfolio-2025), which
also hosts this content as a page (`/web-agency`) alongside the personal
portfolio.

## Project structure

Code is grouped by feature, and each piece's CSS sits next to the code that
renders it. Every file opens with a comment saying what it is.

```
src/
  main.ts          entry: renders the page, then boots animations/widgets
  global.css       design tokens + base styles only
  components/      reusable pieces, one folder each (code + its own .css)
    navbar/  footer/  marquee/  preloader/  logo/  cta-button/
    hover-carousel-link/  hover-teaser-menu/  reveal-footer/  flowing-lines/
  sections/        one folder per page section
    hero/  services/  work/  process/  contact/
  pages/           the other pages: lab/, services/ (the 14 service landing pages)
  animations/      page-wide motion: page load, page transitions, scroll reveals
```

- **Add or edit a service:** `servicesLandingData` in `src/pages/services/servicesLandingData.ts` (feeds both the "What we do" row and the landing pages).
- **Change what the banner lists:** `marqueeItems` in `src/components/marquee/marquee.ts`.
- **Add a section:** make `src/sections/<name>/<name>.ts` (+ `.css` if it needs one), export a `render…` function, and add it to the template in `main.ts`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
