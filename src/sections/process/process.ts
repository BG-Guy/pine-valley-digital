// Process section ("How we work"): the four steps from kickoff to launch.
// To change the steps, edit the `processSteps` array.

// One entry per step; border colors alternate purple/green.
const processSteps = [
  { n: '01', title: 'Discover', copy: 'Goals, audience, and constraints — a short, focused kickoff so we build the right thing.' },
  { n: '02', title: 'Design', copy: 'Wireframes to high-fidelity screens, reviewed together at every stage.' },
  { n: '03', title: 'Build', copy: 'Hand-coded, tested across devices, optimized before it ever ships.' },
  { n: '04', title: 'Launch', copy: 'Deployed, measured, and handed off with everything you need to run it.' },
]

// Markup: heading, then one revealing column per step.
export const renderProcess = () => `
    <section id="process" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">How we <span class="text-[var(--color-accent-2)]">work</span></h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-6">
          ${processSteps
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
`
