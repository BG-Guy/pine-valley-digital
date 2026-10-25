// Contact section: the closing ask, as a lilac form panel — the headline
// with its highlight box, the reply time and the email address on the
// left, over the flowing bands in the panel's corner (components/flow-bands);
// name, email, what they need and an optional note on the right, with
// Clicky pointing at the send button. The site has no backend, so sending
// opens the visitor's email app with their answers filled in, like the
// service pages' form. Styles live in contact.css.
import './contact.css'
import { renderFlowBands } from '../../components/flow-bands/flowBands'
import { clicky } from '../../components/mascots/mascots'

const EMAIL = 'hello@pinevalleydigital.com'
const TOPICS = ['Website', 'Redesign', 'SEO', 'Automation', 'Something else']

const ARROW = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>`

export const renderContact = () => `
    <section id="contact" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="contact-panel nb-card flow-panel reveal">
          ${renderFlowBands()}
          <div class="contact-intro">
            <p class="nb-pill" style="--nb-pill-bg: var(--color-surface)">Get in touch</p>
            <h2 id="contact-heading" class="contact-title font-display font-extrabold">Let&rsquo;s build something <span class="nb-mark">fast.</span></h2>
            <p class="contact-reply">Usually replies within one business day.</p>
            <p class="contact-direct">Rather write it yourself? <a class="contact-email" href="mailto:${EMAIL}">${EMAIL}</a></p>
          </div>
          <form id="contact-form" class="contact-form" aria-labelledby="contact-heading">
            <div class="contact-row">
              <label class="nb-field"><span class="nb-label">Name</span><input class="nb-input" name="name" autocomplete="name" required /></label>
              <label class="nb-field"><span class="nb-label">Email</span><input class="nb-input" type="email" name="email" autocomplete="email" required /></label>
            </div>
            <fieldset class="contact-topics">
              <legend class="nb-label">What do you need?</legend>
              <div class="contact-chips">
                ${TOPICS.map((t) => `<label class="contact-chip"><input type="checkbox" name="topic" value="${t}" /><span>${t}</span></label>`).join('')}
              </div>
            </fieldset>
            <label class="nb-field"><span class="nb-label">Anything else? <span class="nb-optional">(optional)</span></span><textarea class="nb-input" name="message" rows="3"></textarea></label>
            <div class="contact-send">
              <span class="clicky-at"><button type="submit" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Send it ${ARROW}</span></button>${clicky()}</span>
              <p class="contact-note">Opens your email app with your answers filled in.</p>
            </div>
            <p id="contact-status" class="contact-status" role="status"></p>
          </form>
        </div>
      </div>
    </section>
`

// Builds a mailto: link from the answers instead of posting to a backend
// this static site doesn't have. The browser checks the required name and
// email first. Call after the markup is in the DOM.
export function initContact() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null
  const status = document.getElementById('contact-status')
  if (!form || !status) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const topics = data.getAll('topic').map(String)
    const message = String(data.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Project enquiry from ${name}`)
    const body = encodeURIComponent(
      [topics.length ? `Looking for: ${topics.join(', ')}` : '', message, `— ${name} (${email})`].filter(Boolean).join('\n\n'),
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    status.textContent = `Your email app should open with this filled in. If it doesn't, write to ${EMAIL}.`
  })
}
