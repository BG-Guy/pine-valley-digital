// Tickets: numbered steps as ticket cards — a stamped number, a punched
// perforation, the step's title and copy — joined by arrows on wide
// screens. Used by the home page's process and each service page's
// journey; animations/scrollScenes.ts stamps the numbers in, in order.
// Styles live in tickets.css.
import './tickets.css'

interface Step {
  title: string
  copy: string
}

// Stamp colours, in step order.
const STAMPS = ['var(--color-lilac)', 'var(--color-mint)', 'var(--color-lemon)', 'var(--color-coral)']

const ARROW = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>`

// Markup: an ordered list, so the order is announced; the stamped number is
// decorative. `itemClass` is added to every ticket (the home page's scroll
// reveals stagger its tickets by it).
export const renderTickets = (steps: Step[], itemClass = '') => `
        <ol class="tickets" style="--tickets: ${steps.length}">
          ${steps
            .map(
              (s, i) => `
          <li class="ticket reveal ${itemClass}">
            <span class="ticket-stamp" style="--stamp: ${STAMPS[i % STAMPS.length]}" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="ticket-title">${s.title}</h3>
            <p class="ticket-copy">${s.copy}</p>
            ${i < steps.length - 1 ? `<span class="ticket-arrow" aria-hidden="true">${ARROW}</span>` : ''}
          </li>`,
            )
            .join('')}
        </ol>`
