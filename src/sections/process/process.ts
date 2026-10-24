// Process section ("How we work"): the four steps from kickoff to launch, as
// ticket cards (components/tickets). To change the steps, edit the
// `processSteps` array.
import { renderTickets } from '../../components/tickets/tickets'

const processSteps = [
  { title: 'Discover', copy: 'Goals, audience, and constraints — a short, focused kickoff so we build the right thing.' },
  { title: 'Design', copy: 'Wireframes to high-fidelity screens, reviewed together at every stage.' },
  { title: 'Build', copy: 'Hand-coded, tested across devices, optimized before it ever ships.' },
  { title: 'Launch', copy: 'Deployed, measured, and handed off with everything you need to run it.' },
]

// Markup: eyebrow and heading, then the tickets (each one a process-step,
// which the scroll reveals stagger in together).
export const renderProcess = () => `
    <section id="process" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal mb-14 grid gap-5">
          <p class="nb-pill" style="--nb-pill-bg: var(--color-lilac)">Process</p>
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl">How we <span class="nb-mark nb-mark-mint">work</span></h2>
        </div>
        ${renderTickets(processSteps, 'process-step')}
      </div>
    </section>
`
