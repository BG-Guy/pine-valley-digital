// Contact section: the closing ask, as a lilac form panel — the headline
// with its highlight box, the reply time and the email address on the
// left, over the flowing bands in the panel's corner (components/flow-bands);
// name, email, phone, what they need and an optional note on the right, with
// Clicky pointing at the send button. Sending puts the answers straight
// into the CRM as a new lead (components/lead-form), like the service pages'
// form. Styles live in contact.css.
import './contact.css'
import { initLeadForm, leadHoneypot } from '../../components/lead-form/leadForm'
import { renderFlowBands } from '../../components/flow-bands/flowBands'
import { clicky } from '../../components/mascots/mascots'

const EMAIL = 'hello@pinevalleydigital.com'
const TOPICS = ['New website', 'Redesign', 'SEO', 'Local SEO', 'Automation', 'Something else']

const ARROW = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" /></svg>`

export const renderContact = () => `
    <section id="contact" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="contact-panel nb-card flow-panel reveal">
          ${renderFlowBands()}
          <div class="contact-intro">
            <p class="nb-pill" style="--nb-pill-bg: var(--color-surface)">Free 20-minute call</p>
            <h2 id="contact-heading" class="contact-title font-display font-extrabold">Ready to win more <span class="nb-mark">customers?</span></h2>
            <p class="contact-reply">Tell us about your business and we&rsquo;ll set up a free call. You&rsquo;ll get an honest plan and a fixed quote, with no obligation to go ahead. We usually reply within one business day.</p>
            <p class="contact-direct">Rather write it yourself? <a class="contact-email" href="mailto:${EMAIL}">${EMAIL}</a></p>
          </div>
          <form id="contact-form" class="contact-form" aria-labelledby="contact-heading">
            <div class="contact-row">
              <label class="nb-field"><span class="nb-label">Name</span><input class="nb-input" name="name" autocomplete="name" required /></label>
              <label class="nb-field"><span class="nb-label">Email</span><input class="nb-input" type="email" name="email" autocomplete="email" required /></label>
              <label class="nb-field"><span class="nb-label">Phone <span class="nb-optional">(optional)</span></span><input class="nb-input" type="tel" name="phone" autocomplete="tel" maxlength="40" /></label>
            </div>
            <fieldset class="contact-topics">
              <legend class="nb-label">What do you need?</legend>
              <div class="contact-chips">
                ${TOPICS.map((t) => `<label class="contact-chip"><input type="checkbox" name="topic" value="${t}" /><span>${t}</span></label>`).join('')}
              </div>
            </fieldset>
            <label class="nb-field"><span class="nb-label">Anything else? <span class="nb-optional">(optional)</span></span><textarea class="nb-input" name="message" rows="3"></textarea></label>
            ${leadHoneypot()}
            <div class="contact-send">
              <span class="clicky-at"><button type="submit" class="nb-press nb-btn-lg nb-lemon"><span class="nb-face">Book my free call ${ARROW}</span></button>${clicky()}</span>
            </div>
            <p id="contact-status" class="lead-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>
`

// Sends the answers to the CRM, the topics they ticked leading the message.
// The browser checks the required name and email first. Call after the
// markup is in the DOM.
export function initContact() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null
  const status = document.getElementById('contact-status')
  if (!form || !status) return

  initLeadForm(
    form,
    status,
    (data) => {
      const topics = data.getAll('topic').map(String)
      const message = String(data.get('message') ?? '').trim()
      return {
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        phone: String(data.get('phone') ?? '').trim(),
        message: [topics.length ? `Looking for: ${topics.join(', ')}` : '', message].filter(Boolean).join('\n\n'),
        source: 'Homepage contact form',
      }
    },
    'Thanks, that’s with us. We’ll reply within one business day to set up your call.',
  )
}
