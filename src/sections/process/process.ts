// Process section ("How we work"): the four steps from kickoff to launch, as
// ticket cards (components/tickets). To change the steps, edit the
// `processSteps` array.
import { renderTickets } from '../../components/tickets/tickets'

const processSteps = [
  { title: 'Discover', copy: 'A free 20-minute call about your business, your customers and what the site has to do. You leave with a fixed quote and a launch date.' },
  { title: 'Design', copy: 'We plan each page, then design it in full. You see every stage and ask for changes before we build.' },
  { title: 'Build', copy: 'We code the site by hand and test it on phones, tablets and desktops, checking the speed with Google’s tools.' },
  { title: 'Launch', copy: 'We put it live, check every form and call button, and give you the domain, the code and every login.' },
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
