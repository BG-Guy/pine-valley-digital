// Service landing page template. One shared template, one
// data object per service (servicesLandingData.ts) — every services/*.html
// page renders through this, in the site's neo-brutalist theme (global.css).
// Styles live in serviceLandingPage.css.
import './serviceLandingPage.css'
import type { ServiceLandingData } from './servicesLandingData'
import { renderTape, initTape } from '../../components/tape/tape'
import { renderTickets } from '../../components/tickets/tickets'
import { circleSticker } from '../../components/sticker/sticker'
import { renderFlowBands, initFlowBands } from '../../components/flow-bands/flowBands'
import { clicky } from '../../components/mascots/mascots'
import { initLeadForm, leadHoneypot } from '../../components/lead-form/leadForm'
import { groupOf, servicesIn, serviceHref } from './serviceGroups'
import ctaBannerImg from '../../assets/cta-banner-before-you-reach-out.webp'
import { SERVICE_HERO_IMAGES } from './serviceHeroImages'

// Shared across every service — a single, honest guarantee reads as more
// credible than a different one invented per page.
const GUARANTEE =
  'If the first round of work isn’t right, we revise it at no extra cost until it is. If it still isn’t working for you, you don’t pay for that stage. You can stop at any point without a cancellation fee.'

const ARROW = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>`

// The stat cards' fills, in order.
const STAT_FILLS = ['var(--color-lilac)', 'var(--color-mint)', 'var(--color-lemon)']

// Section 1 — Hero, in two columns: on the left the eyebrow as a mono pill,
// the outcome-first headline (its accent phrase on a lemon highlight box),
// the subhead and the call to action; on the right the service's
// illustration (cut out, straight on the graph paper), with the reply-time
// sticker on its corner. Below 1024px the picture drops under the buttons. The tape
// (components/tape) runs across its bottom edge.
const renderHero = (d: ServiceLandingData) => {
  const img = SERVICE_HERO_IMAGES[d.slug]
  return `
    <section class="svc-hero relative px-6 sm:px-10 pt-36 pb-24 sm:pt-44 sm:pb-28">
      <div class="svc-hero-grid mx-auto max-w-6xl">
        <div class="svc-hero-copy">
          <p class="reveal"><span class="nb-pill">${d.eyebrow}</span></p>
          <h1 class="svc-hero-title reveal font-display font-extrabold">
            ${d.headline.replace(new RegExp(`${d.headlineAccent}([.,!?]?)`), (_, end) => `<span class="svc-nowrap"><span class="nb-mark">${d.headlineAccent}</span>${end}</span>`)}
          </h1>
          <p class="svc-hero-sub reveal">${d.subhead}</p>
          <div class="svc-hero-cta reveal">
            <a href="#svc-cta" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Book a free call ${ARROW}</span></a>
            <a href="/#audit" class="nb-press nb-btn"><span class="nb-face">Free website check</span></a>
          </div>
        </div>
        <div class="svc-hero-media reveal">
          ${img ? `<figure class="svc-hero-figure"><img src="${img.src}" width="${img.width}" height="${img.height}" alt="" fetchpriority="high" decoding="async" /></figure>` : ''}
          ${circleSticker(['Usually', '1 day', 'to reply'], { className: 'svc-hero-sticker', label: 'Usually replies within one business day' })}
        </div>
      </div>
    </section>
${renderTape()}
`
}

// Section 2 — Why it matters: up to a few real, sourced stats (never
// invented), each on a flat colour card, then the paragraph on why this
// matters to the owner. A page with no stats shows just the paragraph.
const renderProof = (d: ServiceLandingData) => `
    <section class="px-6 sm:px-10 py-20 sm:py-24">
      <div class="mx-auto max-w-6xl">
        ${d.stats.length ? `<div class="svc-stats reveal">
          ${d.stats
            .map(
              (s, i) => `
          <div class="svc-stat nb-card" style="--nb-card-bg: ${STAT_FILLS[i % STAT_FILLS.length]}">
            <div class="svc-stat-value">${s.value}</div>
            <p class="svc-stat-label">${s.label}</p>
            <p class="svc-stat-source">${s.source}</p>
          </div>`,
            )
            .join('')}
        </div>` : ''}
        <p class="svc-shift reveal">${d.whyItMatters}</p>
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
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl">What&rsquo;s <span class="nb-mark nb-mark-mint">included</span></h2>
          <p class="svc-lead">${d.whatWeDo}</p>
        </div>
        ${renderTickets(d.journey)}
      </div>
    </section>
`

// Section 4 — Diagnostic: "signs you need this" as a live self-check
// checklist (see setupDiagnostic) on an ink panel, ending on its score.
const renderDiagnostic = (d: ServiceLandingData) => `
    <section class="px-6 sm:px-10 py-20 sm:py-24">
      <div class="svc-diag nb-card reveal mx-auto max-w-4xl">
        <h2 class="font-display font-extrabold text-4xl sm:text-5xl">Sound <span class="nb-mark">familiar?</span></h2>
        <p class="svc-diag-intro">Tick the ones that sound like you.</p>
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
      </div>
    </section>
`

// Section 4b — Free value and related services: the free website check as
// the low-commitment next step (it lives on the home page, #audit), and the
// other services in this one's group, so a visitor who's nearly right can
// find the exact fit.
const renderFreeCheck = (d: ServiceLandingData) => {
  const group = groupOf(d.slug)
  const related = group ? servicesIn(group).filter((s) => s.slug !== d.slug) : []
  return `
    <section class="px-6 sm:px-10 py-16 sm:py-20">
      <div class="mx-auto max-w-6xl grid gap-10">
        <div class="svc-free nb-card reveal">
          <div>
            <p class="nb-pill" style="--nb-pill-bg: var(--color-surface)">Free &middot; no signup</p>
            <h2 class="font-display font-extrabold text-3xl sm:text-4xl">Not sure where to start? Get a free website check.</h2>
            <p>See your site's speed, SEO and accessibility scores in about a minute, using Google's own tests. Then get a free, hand-reviewed report with your three quickest wins.</p>
          </div>
          <a href="/#audit" class="nb-press nb-btn-lg"><span class="nb-face">Check my site ${ARROW}</span></a>
        </div>
        ${
          related.length
            ? `<div class="svc-related reveal">
          <p class="svc-related-title">Also in <strong>${group!.title}</strong></p>
          <ul>${related.map((s) => `<li><a href="${serviceHref(s.slug)}" class="nb-pill" style="--nb-pill-bg: var(--color-surface)">${s.navTitle} &rarr;</a></li>`).join('')}</ul>
        </div>`
            : ''
        }
      </div>
    </section>
`
}

// Section 5 — Conclusion, Risk Reversal & Conversion: the objections as
// cards on a framed panel over the banner image, the shared guarantee on a
// lemon card, and the closing form on a lilac panel with flowing bands in
// its corner and Clicky pointing at the send button (sending puts the lead
// straight into the CRM, see components/lead-form).
const renderCta = (d: ServiceLandingData) => `
    <section id="svc-cta" class="px-6 sm:px-10 py-20 sm:py-24">
      <div class="mx-auto max-w-6xl grid gap-14">
        <div class="nb-card reveal p-6 sm:p-10" style="background: var(--color-paper) url('${ctaBannerImg}') center / cover no-repeat">
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

        <div class="svc-form-panel nb-card flow-panel reveal">
          ${renderFlowBands()}
          <div class="svc-form-intro">
            <h2 class="font-display font-extrabold text-4xl sm:text-5xl">${d.ctaHeadline}</h2>
            <p>${d.ctaSub}</p>
            <p class="svc-form-free">Free 20-minute call &middot; fixed quote &middot; no obligation</p>
          </div>
          <form id="svc-form" class="svc-form">
            <label class="nb-field"><span class="nb-label">Your name</span><input required name="name" type="text" autocomplete="name" class="nb-input" /></label>
            <label class="nb-field"><span class="nb-label">Email</span><input required name="email" type="email" autocomplete="email" class="nb-input" /></label>
            <label class="nb-field svc-form-wide"><span class="nb-label">What do you need?</span><textarea name="message" rows="3" placeholder="What are you hoping to fix or build?" class="nb-input"></textarea></label>
            ${leadHoneypot()}
            <div class="svc-form-send svc-form-wide">
              <span class="clicky-at"><button type="submit" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Book my free call ${ARROW}</span></button>${clicky()}</span>
            </div>
            <p id="svc-form-status" class="svc-form-wide lead-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>
`

// Markup: hero → proof → offering/process → diagnostic → free check and
// related services → risk-reversal/CTA.
// Callers assemble this between their own navbar/footer, the same way
// sections/*.ts pieces are assembled on the home page.
export const renderServiceLandingContent = (d: ServiceLandingData) => `
${renderHero(d)}
${renderProof(d)}
${renderOffering(d)}
${renderDiagnostic(d)}
${renderFreeCheck(d)}
${renderCta(d)}
`

// Wires up the tape under the hero, the diagnostic checklist, and the
// contact form with its flowing bands. Call after the markup
// is in the DOM.
export function initServiceLandingContent(d: ServiceLandingData) {
  initTape()
  setupDiagnostic(d)
  setupForm(d)
  initFlowBands()
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
    if (checked === 1) return `1 of ${total}. Worth keeping an eye on.`
    if (checked < total) return `${checked} of ${total}. Worth a closer look.`
    return `All ${total}. This is where we’d start.`
  }

  list.addEventListener('change', () => {
    const checked = list.querySelectorAll('input[data-diagnostic-item]:checked').length
    result.textContent = messageFor(checked)
  })
}

// Sends the form to the CRM as a new lead, tagged with this service so
// it's clear in the CRM which page it came from.
function setupForm(d: ServiceLandingData) {
  const form = document.getElementById('svc-form') as HTMLFormElement | null
  const status = document.getElementById('svc-form-status')
  if (!form || !status) return

  initLeadForm(
    form,
    status,
    (data) => ({
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      source: `Service page: ${d.navTitle}`,
    }),
    'Thanks, that’s with us. We’ll reply within one business day to set up your call.',
  )
}
