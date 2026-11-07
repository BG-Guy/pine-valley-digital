// Free website check: the site's lead magnet. A visitor types their address
// and gets real scores back in about a minute, from Google's own PageSpeed
// Insights (Lighthouse, mobile): performance, accessibility, best practices
// and SEO, three speed metrics, and the handful of issues costing them the
// most. Under that, the bigger free offer: a hand-reviewed report with a fix
// plan, requested through the visitor's email app like the contact form
// (this static site has no backend). If Google's checker is busy or can't
// reach the site, the visitor gets a link to the same test on Google's own
// PageSpeed site, and the request form still works. Google's API needs a
// free key for in-page results (keyless calls share a quota that's usually
// used up): set VITE_PSI_KEY when building. Styles live in audit.css.
import './audit.css'
import { clicky } from '../../components/mascots/mascots'

const EMAIL = 'hello@pinevalleydigital.com'
const API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const KEY = import.meta.env.VITE_PSI_KEY as string | undefined
const googleReport = (url: string) => `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}&form_factor=mobile`

const CATEGORIES = [
  { id: 'performance', label: 'Speed' },
  { id: 'seo', label: 'SEO' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'best-practices', label: 'Best practices' },
] as const

const METRICS = [
  { id: 'largest-contentful-paint', label: 'Main content shows' },
  { id: 'total-blocking-time', label: 'Page is busy for' },
  { id: 'cumulative-layout-shift', label: 'Layout shift' },
]

const REPORT_COVERS = [
  'Speed and Core Web Vitals, page by page',
  'SEO: titles, headings, indexing and local search',
  'Mobile experience and accessibility',
  'How easily a visitor can call, book or buy',
  'Your 3 quickest wins, in plain English',
]

const ARROW = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>`

export const renderAudit = () => `
    <section id="audit" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="audit-panel nb-card reveal">
          <div class="audit-intro">
            <p class="nb-pill" style="--nb-pill-bg: var(--color-surface)">Free &middot; no signup</p>
            <h2 class="audit-title font-display font-extrabold">How is your website <span class="nb-mark">really</span> doing?</h2>
            <p class="audit-lead">Run the same tests Google uses to judge your site: speed, SEO, accessibility and best practices. Results in about a minute.</p>
            <form id="audit-form" class="audit-form" novalidate>
              <label class="nb-field audit-url">
                <span class="nb-label">Your website</span>
                <input class="nb-input" name="url" type="text" inputmode="url" autocomplete="url" placeholder="yourbusiness.com" required />
              </label>
              <button type="submit" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Check my site ${ARROW}</span></button>
            </form>
            <p id="audit-status" class="audit-status" role="status" aria-live="polite"></p>
          </div>
          <div id="audit-results" class="audit-results" hidden></div>
        </div>

        <div class="audit-offer reveal">
          <div class="audit-offer-copy">
            <p class="nb-pill" style="--nb-pill-bg: var(--color-mint)">Free report</p>
            <h3 class="audit-offer-title font-display font-extrabold">Want the full picture? Get a free, hand-reviewed report.</h3>
            <p>Scores tell you <em>that</em> something is wrong. We'll tell you <em>what</em> and <em>how to fix it</em>. A person on our team reviews your site and emails you a short action plan within two business days. It's yours to keep, with no obligation.</p>
            <ul class="audit-covers">
              ${REPORT_COVERS.map((c) => `<li>${c}</li>`).join('')}
            </ul>
          </div>
          <form id="audit-request" class="audit-request nb-card">
            <label class="nb-field"><span class="nb-label">Name</span><input class="nb-input" name="name" autocomplete="name" required /></label>
            <label class="nb-field"><span class="nb-label">Email</span><input class="nb-input" type="email" name="email" autocomplete="email" required /></label>
            <label class="nb-field"><span class="nb-label">Website</span><input class="nb-input" name="site" inputmode="url" placeholder="yourbusiness.com" required /></label>
            <label class="nb-field"><span class="nb-label">What should it do better? <span class="nb-optional">(optional)</span></span><input class="nb-input" name="goal" placeholder="More calls, more bookings, rank locally…" /></label>
            <span class="clicky-at"><button type="submit" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Get my free report ${ARROW}</span></button>${clicky()}</span>
            <p class="audit-note">Opens your email app with this filled in, addressed to ${EMAIL}.</p>
          </form>
        </div>
      </div>
    </section>
`

type Lighthouse = {
  categories: Record<string, { score: number | null; auditRefs: { id: string; weight: number }[] }>
  audits: Record<string, { title: string; score: number | null; scoreDisplayMode: string; displayValue?: string }>
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// Lighthouse titles carry a little markdown (links, `code`); keep the words.
const plain = (s: string) => esc(s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/`/g, ''))

// Accepts "example.com", "www.example.com/page" or a full URL.
function normalize(raw: string) {
  const value = raw.trim()
  if (!value) return null
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    return url.hostname.includes('.') ? url.href : null
  } catch {
    return null
  }
}

const band = (score: number) => (score >= 90 ? 'good' : score >= 50 ? 'ok' : 'poor')

// A score ring: the arc fills to the score, in the band's colour.
const ring = (score: number, label: string) => {
  const c = 2 * Math.PI * 40
  return `
    <div class="audit-score is-${band(score)}">
      <svg viewBox="0 0 100 100" aria-hidden="true"><circle class="track" cx="50" cy="50" r="40" /><circle class="arc" cx="50" cy="50" r="40" stroke-dasharray="${((score / 100) * c).toFixed(1)} ${c.toFixed(1)}" /></svg>
      <span class="audit-score-n">${score}</span>
      <span class="audit-score-label">${label}</span>
    </div>`
}

// The issues costing the most: failing audits, weighted by how much each
// counts toward its category's score.
function topIssues(lh: Lighthouse) {
  const seen = new Set<string>()
  const issues: { title: string; cat: string; cost: number }[] = []
  for (const { id, label } of CATEGORIES) {
    for (const ref of lh.categories[id]?.auditRefs ?? []) {
      const a = lh.audits[ref.id]
      if (!a || seen.has(ref.id) || a.score === null || a.score >= 0.9 || !['binary', 'numeric', 'metricSavings'].includes(a.scoreDisplayMode)) continue
      seen.add(ref.id)
      issues.push({ title: a.title, cat: label, cost: Math.max(ref.weight, 1) * (1 - a.score) })
    }
  }
  return issues.sort((a, b) => b.cost - a.cost).slice(0, 5)
}

export function initAudit() {
  const form = document.getElementById('audit-form') as HTMLFormElement | null
  const status = document.getElementById('audit-status')
  const results = document.getElementById('audit-results')
  const request = document.getElementById('audit-request') as HTMLFormElement | null
  if (!form || !status || !results || !request) return

  let lastScores = ''
  let busy = false

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (busy) return
    const url = normalize(String(new FormData(form).get('url') ?? ''))
    if (!url) {
      status.textContent = 'That doesn’t look like a web address. Try something like yourbusiness.com.'
      return
    }
    ;(request.elements.namedItem('site') as HTMLInputElement).value = url
    busy = true
    form.classList.add('is-busy')
    results.hidden = true
    const steps = ['Loading your site on a mid-range phone…', 'Measuring speed…', 'Checking SEO and accessibility…', 'Adding it all up…']
    let step = 0
    status.textContent = steps[0]
    const ticker = window.setInterval(() => { step = Math.min(step + 1, steps.length - 1); status.textContent = steps[step] }, 9000)

    try {
      if (!KEY) throw new Error('no key')
      const query = new URLSearchParams({ url, strategy: 'mobile', key: KEY })
      CATEGORIES.forEach((c) => query.append('category', c.id))
      const res = await fetch(`${API}?${query}`)
      if (!res.ok) throw new Error(String(res.status))
      const lh = ((await res.json()) as { lighthouseResult: Lighthouse }).lighthouseResult
      const scores = CATEGORIES.map((c) => ({ ...c, score: Math.round((lh.categories[c.id]?.score ?? 0) * 100) }))
      lastScores = scores.map((s) => `${s.label}: ${s.score}/100`).join(', ')
      const issues = topIssues(lh)
      results.innerHTML = `
        <p class="audit-for">Results for <strong>${esc(new URL(url).hostname)}</strong>, tested as a phone</p>
        <div class="audit-scores">${scores.map((s) => ring(s.score, s.label)).join('')}</div>
        <dl class="audit-metrics">
          ${METRICS.map((m) => (lh.audits[m.id]?.displayValue ? `<div><dt>${m.label}</dt><dd>${esc(lh.audits[m.id].displayValue!)}</dd></div>` : '')).join('')}
        </dl>
        ${
          issues.length
            ? `<div class="audit-issues"><p class="audit-issues-title">Top things to fix</p><ol>${issues.map((i) => `<li><span class="audit-tag">${i.cat}</span>${plain(i.title)}</li>`).join('')}</ol></div>`
            : `<p class="audit-issues-title">Nothing big to fix. The free report can still find a few quick wins.</p>`
        }
        <a href="#audit-request" class="nb-press nb-btn nb-lemon audit-next"><span class="nb-face">Get the free fix plan ${ARROW}</span></a>`
      results.hidden = false
      status.textContent = 'Done. Your results are below.'
    } catch {
      results.innerHTML = `
        <p class="audit-for">Your test for <strong>${esc(new URL(url).hostname)}</strong> is ready on Google's PageSpeed site</p>
        <p>It's the same test, run by Google: speed, SEO, accessibility and best practices, with every issue listed. It takes about a minute to load.</p>
        <a href="${googleReport(url)}" target="_blank" rel="noopener" class="nb-press nb-btn nb-lemon audit-next"><span class="nb-face">See my scores on Google ${ARROW}</span></a>
        <p>Scores alone don't say what to fix first. Ask for the free report below and we'll turn them into a short, plain-English plan.</p>`
      results.hidden = false
      status.textContent = 'Your test is ready. Open it below.'
    } finally {
      window.clearInterval(ticker)
      busy = false
      form.classList.remove('is-busy')
    }
  })

  request.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(request)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const site = String(data.get('site') ?? '').trim()
    const goal = String(data.get('goal') ?? '').trim()
    const subject = encodeURIComponent(`Free website report request: ${site}`)
    const body = encodeURIComponent(
      [`Website: ${site}`, goal && `What it should do better: ${goal}`, lastScores && `Quick check scores (mobile): ${lastScores}`, `— ${name} (${email})`]
        .filter(Boolean)
        .join('\n\n'),
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  })
}
