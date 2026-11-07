// "Why us" section: five numbered reasons a business owner will be glad they
// hired us, each answering a worry before it's raised (cost, time, tech,
// results). Every claim is something we actually do, with no invented
// numbers. Each card carries one flat corner shape. Styles live in why.css.
import './why.css'

// Each reason's corner shape is drawn in a 400 x 300 box that why.css pins
// to the card's top-right corner, the one spot beside the big number with no
// text. The user picked these from three versions per card.
const REASONS = [
  {
    title: 'Built to win customers',
    copy: 'Every page is planned around one job: turning a visitor into a call, a booking or a sale. The design is there to make that easy.',
    corner: '<circle cx="400" cy="0" r="130"/>',
  },
  {
    title: 'Everything under one roof',
    copy: 'Strategy, copy, design, SEO and the build itself. One team and one person to call, from the first sketch to launch day.',
    corner: '<polygon points="250,0 400,0 400,150"/>',
  },
  {
    title: 'Fast and easy to find',
    copy: 'Built to Google’s own Core Web Vitals and SEO guidelines, and tested with Google’s tools before launch, so pages load quickly and Google can read every one.',
    corner: '<circle cx="400" cy="70" r="84"/>',
  },
  {
    title: 'You run your business, we handle the tech',
    copy: 'Hosting, updates, backups and fixes can all be ours to worry about, so your website never becomes your second job.',
    corner: '<polygon points="290,20 390,-80 490,20 390,120" class="why-art-round"/>',
  },
  {
    title: 'One clear price, and you own it all',
    copy: 'A fixed quote before we start, with no hidden fees or lock-in. The domain, the code and the content are yours from day one.',
    corner: '<circle cx="320" cy="0" r="74"/>',
  },
]

// The cards' flat fills, and how much ink each corner shape mixes into its
// card's fill to sit a shade deeper (less on cream, so all five read alike).
const FILLS = [
  { fill: 'var(--color-lemon)', ink: '7%' },
  { fill: 'var(--color-mint)', ink: '8%' },
  { fill: 'var(--color-lilac)', ink: '8%' },
  { fill: 'var(--color-coral)', ink: '8%' },
  { fill: 'var(--color-surface)', ink: '5%' },
]

export const renderWhy = () => `
    <section id="why" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal mb-14 grid gap-5 max-w-3xl">
          <p class="nb-pill" style="--nb-pill-bg: var(--color-mint)">Why Pine Valley</p>
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl">5 reasons you&rsquo;ll <span class="nb-mark">love</span> your new website</h2>
          <p class="why-lead">Most small-business websites look fine and do nothing. Ours are built to bring in work, and to stay out of your way while they do it.</p>
        </div>
        <ol class="why-list">
          ${REASONS.map(
            (r, i) => `
          <li class="why-item nb-card reveal" style="--nb-card-bg: ${FILLS[i].fill}; --why-ink: ${FILLS[i].ink}">
            <svg class="why-art" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMin meet" aria-hidden="true">${r.corner}</svg>
            <span class="why-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="why-title">${r.title}</h3>
            <p class="why-copy">${r.copy}</p>
          </li>`,
          ).join('')}
          <li class="why-item why-cta reveal">
            <p class="why-title">See where your site stands today</p>
            <p class="why-copy">Run our free website check in under a minute, or book a free 20-minute call.</p>
            <div class="why-cta-row">
              <a href="#audit" class="nb-press nb-btn nb-lemon"><span class="nb-face">Free website check</span></a>
              <a href="#contact" class="nb-press nb-btn"><span class="nb-face">Book a free call</span></a>
            </div>
          </li>
        </ol>
      </div>
    </section>
`
