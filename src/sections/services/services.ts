// Services section ("What we do"): a numbered list of everything the studio
// offers. To add or edit a service, change the `services` array below — the
// numbering and the (NN) counter next to the heading follow from it.

// One entry per row. `n` is the displayed number.
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
  {
    n: '05',
    title: 'Business Automation',
    copy: 'Lead-capture chatbots, smart forms, text-message follow-ups, and lightweight CRMs, all wired to your other tools — so enquiries get answered and routine work runs itself.',
  },
  {
    n: '06',
    title: 'Local SEO & Google Maps',
    copy: 'Show up when nearby customers search. Google Business Profile setup, map-pack ranking, and local listings that turn searches into calls.',
  },
  {
    n: '07',
    title: 'Care & Maintenance',
    copy: 'Monthly updates, backups, security checks, and quick edits — a developer on call so your site stays fast and fixed long after launch.',
  },
  {
    n: '08',
    title: 'E-commerce',
    copy: 'Shopify and WooCommerce stores built to convert — product pages, secure checkout, payments, and shipping set up so you can start selling.',
  },
  {
    n: '09',
    title: 'Booking & Payments',
    copy: 'Online scheduling with deposits and payments, synced to your calendar, so customers can book and pay without a phone call.',
  },
  {
    n: '10',
    title: 'Analytics & Tracking',
    copy: 'GA4, call and form tracking, and simple dashboards, so you can see exactly which channels bring in leads.',
  },
  {
    n: '11',
    title: 'Reviews & Reputation',
    copy: 'Automated review requests after every job, plus monitoring and replies — the star rating that wins local customers.',
  },
  {
    n: '12',
    title: 'Redesign & Migration',
    copy: 'Moving off a slow Wix, Squarespace, or dated WordPress site to something fast — with redirects and SEO preserved so your rankings hold.',
  },
  {
    n: '13',
    title: 'Accessibility',
    copy: 'WCAG audits and fixes — keyboard navigation, contrast, and screen-reader support — to reach more customers and reduce legal risk.',
  },
  {
    n: '14',
    title: 'AI Assistants',
    copy: 'Assistants trained on your own content that answer customer questions and capture leads around the clock.',
  },
]

// Markup: heading with the service count, then one revealing row per service.
export const renderServices = () => `
    <section id="services" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">What we <span class="text-[var(--color-accent-2)]">do</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(${String(services.length).padStart(2, '0')})</span>
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
`
