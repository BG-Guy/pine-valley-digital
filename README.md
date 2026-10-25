# Pine Valley Digital

Marketing site for Pine Valley Digital — a single-page, fast-loading site built with Vite, vanilla TypeScript, Tailwind CSS, and GSAP.

## Stack

- [Vite](https://vite.dev/) + vanilla TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) + ScrollTrigger for the loading animation and scroll reveals

## Design system

Neo-brutalist, from the Neo-Brutalist Section kit in the web-component-library:
a cream graph-paper page, a heavy 4px ink line and hard 10px shadows, flat
lilac / mint / lemon fills (coral on stickers), poster headings in condensed
Bricolage capitals with Space Mono labels, and buttons and cards that lift
off their shadow on hover and press flat into it. The brand's purple
`#6C3BAA` and green `#3BAA99` stay in the logo. Tokens and notes live in
`src/global.css`; the shared parts (press buttons, pills, highlight boxes,
cards, stickers, form fields) in `src/components/press/press.css`.

The playful layer, after FlowFest: three mascots (`components/mascots`:
Pine Pal on the loading screen, Zap on the hero's "fast", Clicky pointing at
the send buttons) that now and then roll across the bottom of the screen as
you scroll (`components/sticker-roll`); tilted stripes that sweep across for
page loads and page transitions (`components/preloader`); flowing bands in
the contact panels' corner (`components/flow-bands`); and a valley sunrise
along the bottom of the footer (`components/sunrise`). All of it stops for
reduced motion, and the ambient parts with the tape's pause button. The color
theme started out shared with [portfolio-2025](https://github.com/bg-guy/portfolio-2025), which
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
    navbar/  footer/  tape/  preloader/  logo/  cta-button/
    hover-carousel-link/  reveal-footer/
    press/  sticker/  tickets/  card-art/
    mascots/  sticker-roll/  flow-bands/  sunrise/  drawing/  cta-cursor/
  sections/        one folder per page section
    hero/  services/  work/  process/  contact/
  pages/           the other pages: lab/, services/ (the 14 service landing pages)
  animations/      page-wide motion: page load, page transitions, scroll reveals
```

- **Add or edit a service:** `servicesLandingData` in `src/pages/services/servicesLandingData.ts` (feeds both the "What we do" row and the landing pages).
- **Change what the tape lists:** `ITEMS` in `src/components/tape/tape.ts`.
- **Add or edit a project in the showcase:** the `projects` array in `src/sections/work/work.ts`.
- **Add or edit a nav link:** `MENU_LINKS` in `src/components/navbar/mobileMenu.ts` for the mobile menu, and the desktop links in `src/components/navbar/navbar.ts` (a link to another page gets the menu's little diagonal arrow on its own, from its href).
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
