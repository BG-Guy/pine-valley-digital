// Service landing page template (Thrive & Scale framework — see
// ~/.claude/skills/seo-landing-page-copywriter). One shared template, one
// data object per service (servicesLandingData.ts) — every services/*.html
// page renders through this, in the site's neo-brutalist theme (global.css).
// Styles live in serviceLandingPage.css.
import './serviceLandingPage.css'
import type { ServiceLandingData } from './servicesLandingData'
import { renderTape, initTape } from '../../components/tape/tape'
import { renderTickets } from '../../components/tickets/tickets'
import { circleSticker } from '../../components/sticker/sticker'

// Shared across every service — a single, honest guarantee reads as more
// credible than a different one invented per page.
const GUARANTEE =
  "If the first round of work isn't right, we revise it until it is — at no extra cost. If it's still not working for you, you don't pay for that stage. No multi-month lock-in, no cancellation fee."

const EMAIL = 'hello@pinevalleydigital.com'

const ARROW = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>`

// The stat cards' fills, in order.
const STAT_FILLS = ['var(--color-lilac)', 'var(--color-mint)', 'var(--color-lemon)']

// Section 1 — Hero: the eyebrow as a mono pill, the outcome-first headline
// (its accent phrase on a lemon highlight box), an objection-neutralizing
// subhead, the three teasers as ticked cards and the call to action, with
// a reply-time sticker. The tape (components/tape) runs across its bottom
// edge.
const renderHero = (d: ServiceLandingData) => `
    <section class="svc-hero relative px-6 sm:px-10 pt-36 pb-24 sm:pt-44 sm:pb-28">
      <div class="relative mx-auto max-w-6xl">
        ${circleSticker(['Usually', '1 day', 'to reply'], { className: 'svc-hero-sticker', label: 'Usually replies within one business day' })}
        <p class="reveal"><span class="nb-pill">${d.eyebrow}</span></p>
        <h1 class="svc-hero-title reveal font-display font-extrabold">
          ${d.headline.replace(d.headlineAccent, `<span class="nb-mark">${d.headlineAccent}</span>`)}
        </h1>
        <p class="svc-hero-sub reveal">${d.subhead}</p>
        <ul class="svc-hero-teasers reveal">
          ${d.teasers.map((t) => `<li>${t}</li>`).join('')}
        </ul>
        <div class="svc-hero-cta reveal">
          <a href="#svc-cta" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Start a project ${ARROW}</span></a>
        </div>
      </div>
    </section>
${renderTape()}
`

// Section 2 — Market Reality & Proof: a couple of real, sourced stats (never
// invented), each on a flat colour card, and the "strategic shift"
// paragraph.
const renderProof = (d: ServiceLandingData) => `
    <section class="px-6 sm:px-10 py-20 sm:py-24">
      <div class="mx-auto max-w-6xl">
        <div class="svc-stats reveal">
          ${d.stats
            .map(
              (s, i) => `
          <div class="svc-stat nb-card" style="--nb-card-bg: ${STAT_FILLS[i % STAT_FILLS.length]}">
            <div class="svc-stat-value">${s.value}</div>
            <p class="svc-stat-label">${s.label}</p>
            ${s.source ? `<p class="svc-stat-source">${s.source}</p>` : ''}
          </div>`,
            )
            .join('')}
        </div>
        <p class="svc-shift reveal">${d.strategicShift}</p>
      </div>
    </section>
`

// Section 3 — Core Offering & Process: the deliverables paragraph, then the
// 3-4 step journey as ticket cards (components/tickets, as on the home
// page's process).
const renderOffering = (d: ServiceLandingData) => `
    <section class="px-6 sm:px-10 py-20 sm:py-24">
      <div class="mx-auto max-w-6xl">
        <div class="reveal mb-14 max-w-2xl grid gap-5">
          <p class="nb-pill" style="--nb-pill-bg: var(--color-lilac)">What you get</p>
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl">What this <span class="nb-mark nb-mark-mint">actually includes</span></h2>
          <p class="svc-lead">${d.whatWeDo}</p>
        </div>
        ${renderTickets(d.journey)}
      </div>
    </section>
`

// Section 4 — Validation & Diagnostic: "signs you need this" as a live
// self-check checklist (see setupDiagnostic) on an ink panel, plus a
// reasoned, non-invented line of social proof.
const renderDiagnostic = (d: ServiceLandingData) => `
    <section class="px-6 sm:px-10 py-20 sm:py-24">
      <div class="svc-diag nb-card reveal mx-auto max-w-4xl">
        <h2 class="font-display font-extrabold text-4xl sm:text-5xl">Is this <span class="nb-mark">actually</span> a problem for you?</h2>
        <p class="svc-diag-intro">${d.diagnosticIntro}</p>
        <ul id="svc-diagnostic" class="svc-diag-list">
          ${d.signs
            .map(
              (sign, i) => `
          <li>
            <label class="svc-check">
              <input type="checkbox" class="svc-check-input" data-diagnostic-item="${i}" />
              <span>${sign}</span>
            </label>
          </li>`,
            )
            .join('')}
        </ul>
        <p id="svc-diagnostic-result" class="svc-diag-result" aria-live="polite"></p>
        <p class="svc-diag-proof">${d.socialProof}</p>
      </div>
    </section>
`

// Section 5 — Conclusion, Risk Reversal & Conversion: the objections as
// cards, the shared guarantee on a lemon card, and the closing form on a
// lilac panel (a lightweight mailto form — this site has no backend, so
// "submit" composes an email rather than posting to a hidden service).
const renderCta = (d: ServiceLandingData) => `
    <section id="svc-cta" class="px-6 sm:px-10 py-20 sm:py-24">
      <div class="mx-auto max-w-6xl grid gap-14">
        <div class="reveal">
          <h2 class="font-display font-extrabold text-3xl sm:text-4xl mb-8">Before you reach out</h2>
          <dl class="svc-faq">
            ${d.objections
              .map(
                (o) => `
            <div class="svc-faq-item">
              <dt>${o.q}</dt>
              <dd>${o.a}</dd>
            </div>`,
              )
              .join('')}
          </dl>
        </div>

        <div class="svc-promise nb-card reveal">
          <p class="svc-promise-title">The promise, in plain terms</p>
          <p>${GUARANTEE}</p>
        </div>

        <div class="svc-form-panel nb-card reveal">
          <div class="svc-form-intro">
            <h2 class="font-display font-extrabold text-4xl sm:text-5xl">${d.ctaHeadline}</h2>
            <p>${d.ctaSub}</p>
          </div>
          <form id="svc-form" class="svc-form">
            <label class="nb-field"><span class="nb-label">Your name</span><input required name="name" type="text" autocomplete="name" class="nb-input" /></label>
            <label class="nb-field"><span class="nb-label">Email</span><input required name="email" type="email" autocomplete="email" class="nb-input" /></label>
            <label class="nb-field svc-form-wide"><span class="nb-label">What do you need?</span><textarea name="message" rows="3" placeholder="What are you hoping to fix or build?" class="nb-input"></textarea></label>
            <div class="svc-form-send svc-form-wide">
              <button type="submit" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Send it over ${ARROW}</span></button>
              <p class="svc-form-note">Opens your email app, addressed to ${EMAIL}.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
`

// Markup: hero → proof → offering/process → diagnostic → risk-reversal/CTA.
// Callers assemble this between their own navbar/footer, the same way
// sections/*.ts pieces are assembled on the home page.
export const renderServiceLandingContent = (d: ServiceLandingData) => `
${renderHero(d)}
${renderProof(d)}
${renderOffering(d)}
${renderDiagnostic(d)}
${renderCta(d)}
`

// Wires up the tape under the hero, the diagnostic checklist and the
// mailto-based contact form. Call after the markup is in the DOM.
export function initServiceLandingContent(d: ServiceLandingData) {
  initTape()
  setupDiagnostic(d)
  setupForm(d)
}

// A live, non-judgmental read-out as items are checked — no fake urgency,
// just "here's roughly where you stand."
function setupDiagnostic(d: ServiceLandingData) {
  const list = document.getElementById('svc-diagnostic')
  const result = document.getElementById('svc-diagnostic-result')
  if (!list || !result) return

  const total = d.signs.length
  const messageFor = (checked: number) => {
    if (checked === 0) return ''
    if (checked === 1) return `1 of ${total} — worth keeping an eye on.`
    if (checked < total) return `${checked} of ${total} — this is probably costing you more than you think.`
    return `${total} of ${total} — this one’s overdue.`
  }

  list.addEventListener('change', () => {
    const checked = list.querySelectorAll('input[data-diagnostic-item]:checked').length
    result.textContent = messageFor(checked)
  })
}

// Builds a mailto: link from the field values instead of posting to a
// backend this static site doesn't have — an honest, no-dependency way to
// let the "form" actually reach someone.
function setupForm(d: ServiceLandingData) {
  const form = document.getElementById('svc-form') as HTMLFormElement | null
  if (!form) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = encodeURIComponent(`${d.navTitle} — enquiry from ${name || 'your site'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  })
}
