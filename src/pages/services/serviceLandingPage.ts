// Service landing page template (Thrive & Scale framework — see
// ~/.claude/skills/seo-landing-page-copywriter). One shared template, one
// data object per service (servicesLandingData.ts) — every services/*.html
// page renders through this. Styles live in serviceLandingPage.css.
import './serviceLandingPage.css'
import type { ServiceLandingData } from './servicesLandingData'

// Shared across every service — a single, honest guarantee reads as more
// credible than a different one invented per page.
const GUARANTEE =
  "If the first round of work isn't right, we revise it until it is — at no extra cost. If it's still not working for you, you don't pay for that stage. No multi-month lock-in, no cancellation fee."

// Section 1 — Hero: outcome-first headline (one word/phrase in the accent
// color), an objection-neutralizing subhead, and three teaser bullets.
const renderHero = (d: ServiceLandingData) => `
    <section class="svc-hero relative overflow-hidden px-6 sm:px-10 pt-40 pb-20 sm:pt-52 sm:pb-28">
      <div class="relative mx-auto max-w-4xl">
        <p class="reveal text-sm font-semibold uppercase tracking-[0.2em] text-ink/60 mb-6">${d.eyebrow}</p>
        <h1 class="reveal font-display font-extrabold tracking-tight text-[10vw] leading-[1.02] sm:text-6xl sm:leading-[1.05]">
          ${d.headline.replace(d.headlineAccent, `<span class="text-[var(--color-accent)]">${d.headlineAccent}</span>`)}
        </h1>
        <p class="reveal mt-6 text-lg text-ink/70 max-w-2xl">${d.subhead}</p>
        <ul class="reveal mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${d.teasers
            .map(
              (t) => `
          <li class="svc-teaser text-sm text-ink/75 border-t-2 border-[var(--color-accent-2)] pt-3">${t}</li>`
            )
            .join('')}
        </ul>
        <a href="#svc-cta" class="hero-cta mt-10 inline-flex items-center text-sm font-semibold uppercase tracking-wide">
          Start a project <span aria-hidden="true">&darr;</span>
        </a>
      </div>
    </section>
`

// Section 2 — Market Reality & Proof: a couple of real, sourced stats (never
// invented) and the "strategic shift" paragraph.
const renderProof = (d: ServiceLandingData) => `
    <section class="px-6 sm:px-10 py-20 sm:py-24 bg-[var(--color-paper-dim)]">
      <div class="mx-auto max-w-5xl">
        <div class="reveal grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mb-14">
          ${d.stats
            .map(
              (s) => `
          <div>
            <div class="font-display font-extrabold text-4xl sm:text-5xl text-[var(--color-accent)]">${s.value}</div>
            <p class="mt-2 text-sm text-ink/65 max-w-xs">${s.label}${s.source ? `<span class="block text-xs text-ink/40 mt-1">${s.source}</span>` : ''}</p>
          </div>`
            )
            .join('')}
        </div>
        <p class="reveal text-lg sm:text-xl font-display font-medium max-w-3xl leading-relaxed">${d.strategicShift}</p>
      </div>
    </section>
`

// Section 3 — Core Offering & Process: the deliverables paragraph, then a
// 3-4 step timeline (same alternating-border pattern as the home page's
// process section).
const renderOffering = (d: ServiceLandingData) => `
    <section class="px-6 sm:px-10 py-20 sm:py-24">
      <div class="mx-auto max-w-5xl">
        <div class="reveal mb-14 max-w-2xl">
          <h2 class="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">What this <span class="text-[var(--color-accent-2)]">actually includes</span></h2>
          <p class="text-ink/70 text-lg">${d.whatWeDo}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-6">
          ${d.journey
            .map(
              (step, i) => `
          <div class="reveal pt-5" style="border-top: 2px solid ${i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-accent-2)'}">
            <span class="font-display text-ink/30 text-xl">0${i + 1}</span>
            <h3 class="font-display font-bold text-xl mt-2 mb-2">${step.title}</h3>
            <p class="text-ink/65 text-sm leading-relaxed">${step.copy}</p>
          </div>`
            )
            .join('')}
        </div>
      </div>
    </section>
`

// Section 4 — Validation & Diagnostic: "signs you need this" as a live
// self-check checklist (see setupDiagnostic), plus a reasoned, non-invented
// line of social proof.
const renderDiagnostic = (d: ServiceLandingData) => `
    <section class="px-6 sm:px-10 py-20 sm:py-24 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div class="mx-auto max-w-3xl">
        <h2 class="reveal font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-3">Is this <span class="text-[var(--color-accent-2)]">actually</span> a problem for you?</h2>
        <p class="reveal text-[var(--color-paper)]/60 mb-8">${d.diagnosticIntro}</p>
        <ul id="svc-diagnostic" class="reveal space-y-3">
          ${d.signs
            .map(
              (sign, i) => `
          <li>
            <label class="svc-check flex items-start gap-3 cursor-pointer text-base sm:text-lg">
              <input type="checkbox" class="svc-check-input mt-1.5" data-diagnostic-item="${i}" />
              <span>${sign}</span>
            </label>
          </li>`
            )
            .join('')}
        </ul>
        <p id="svc-diagnostic-result" class="reveal mt-6 text-sm text-[var(--color-accent-2)] font-semibold min-h-[1.5em]" aria-live="polite"></p>
        <p class="reveal mt-10 text-[var(--color-paper)]/70 max-w-xl border-t border-[var(--color-paper)]/15 pt-8">${d.socialProof}</p>
      </div>
    </section>
`

// Section 5 — Conclusion, Risk Reversal & Conversion: objections, the
// shared guarantee, and the closing CTA (a lightweight mailto form — this
// site has no backend, so "submit" composes an email rather than posting to
// a hidden service).
const renderCta = (d: ServiceLandingData) => `
    <section id="svc-cta" class="px-6 sm:px-10 py-20 sm:py-24">
      <div class="mx-auto max-w-3xl">
        <div class="reveal mb-16">
          <h2 class="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-8">Before you reach out</h2>
          <dl class="space-y-6">
            ${d.objections
              .map(
                (o) => `
            <div class="border-t border-[var(--color-ink)]/10 pt-5">
              <dt class="font-display font-bold text-lg mb-1.5">${o.q}</dt>
              <dd class="text-ink/65">${o.a}</dd>
            </div>`
              )
              .join('')}
          </dl>
        </div>

        <div class="reveal border-2 border-[var(--color-ink)] rounded-2xl p-6 sm:p-8 mb-16 bg-[var(--color-paper-dim)]">
          <p class="font-display font-bold text-lg mb-2">The promise, in plain terms</p>
          <p class="text-ink/70">${GUARANTEE}</p>
        </div>

        <div class="reveal">
          <h2 class="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">${d.ctaHeadline}</h2>
          <p class="text-ink/70 mb-8">${d.ctaSub}</p>
          <form id="svc-form" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label class="block sm:col-span-1">
              <span class="sr-only">Your name</span>
              <input required name="name" type="text" placeholder="Your name" class="svc-input" />
            </label>
            <label class="block sm:col-span-1">
              <span class="sr-only">Email</span>
              <input required name="email" type="email" placeholder="Email" class="svc-input" />
            </label>
            <label class="block sm:col-span-2">
              <span class="sr-only">What do you need?</span>
              <textarea name="message" rows="3" placeholder="What are you hoping to fix or build?" class="svc-input"></textarea>
            </label>
            <div class="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <button type="submit" class="btn-cta text-sm font-semibold">
                <span class="btn-cta-clip">
                  <span class="btn-cta-bg"></span>
                  <span class="btn-cta-label">Send it over</span>
                </span>
              </button>
              <span class="text-xs text-ink/50">Opens your email client, addressed to hello@pinevalleydigital.com.</span>
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

// Wires up the diagnostic checklist and the mailto-based contact form. Call
// after the markup is in the DOM.
export function initServiceLandingContent(d: ServiceLandingData) {
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
    window.location.href = `mailto:hello@pinevalleydigital.com?subject=${subject}&body=${body}`
  })
}
