// Work section ("Selected work"): a grid of project cards. Card styling lives
// in work.css. To change the projects shown, edit the `projects` array.
import './work.css'

// One entry per card.
const projects = [
  { name: 'Northfield Studio', tag: 'Architecture · 2025' },
  { name: 'Marlow & Co.', tag: 'Hospitality · 2025' },
  { name: 'Petra Fintech', tag: 'SaaS · 2024' },
  { name: 'Kiln Ceramics', tag: 'E-commerce · 2024' },
]

// Markup: heading with the project count, then the card grid.
export const renderWork = () => `
    <section id="work" class="px-6 sm:px-10 py-24 sm:py-32 bg-[var(--color-paper-dim)]">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">Selected <span class="text-[var(--color-accent-2)]">work</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(${String(projects.length).padStart(2, '0')})</span>
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
`
