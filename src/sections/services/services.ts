// Services section ("What we do"): a numbered list of everything the studio
// offers, each row linking to its own landing page. The list itself lives in
// pages/services/servicesLandingData.ts — the single source of truth for
// both this section and the 14 services/*.html pages, so the two can't drift
// out of sync. To add or edit a service, change that file, not this one.
import { servicesLandingData } from '../../pages/services/servicesLandingData'

// Markup: heading with the service count, then one revealing, linked row
// per service.
export const renderServices = () => `
    <section id="services" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">What we <span class="text-[var(--color-accent-2)]">do</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(${String(servicesLandingData.length).padStart(2, '0')})</span>
        </div>
        <div class="divide-y divide-[var(--color-ink)]/10 border-t border-[var(--color-ink)]/10">
          ${servicesLandingData
            .map(
              (s, i) => `
            <a href="/services/${s.slug}.html" class="service-row reveal group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-10 items-start">
              <span class="sm:col-span-2 font-display text-ink/30 text-2xl">${String(i + 1).padStart(2, '0')}</span>
              <h3 class="sm:col-span-3 font-display font-bold text-2xl sm:text-3xl transition-colors duration-200 group-hover:text-[var(--color-accent)]">${s.navTitle}</h3>
              <p class="sm:col-span-6 text-ink/65 text-base sm:text-lg max-w-xl">${s.shortCopy}</p>
              <span class="sm:col-span-1 hidden sm:flex justify-end text-sm font-semibold text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </a>`
            )
            .join('')}
        </div>
      </div>
    </section>
`
