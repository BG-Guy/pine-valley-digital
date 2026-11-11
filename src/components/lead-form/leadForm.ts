// Lead forms: sends the site's forms (homepage contact, service pages, free
// report) straight into the Pine Valley CRM on Render, its public
// POST /api/leads/submit route, which takes name, email, phone, message and
// source and needs no key. The CRM only accepts browser posts from
// pinevalleydigital.com, so to test locally run the CRM with your dev origin
// in ALLOWED_ORIGINS and point VITE_CRM_URL at it. Styles live in leadForm.css.
import './leadForm.css'

const CRM_URL = (import.meta.env.VITE_CRM_URL as string | undefined) ?? 'https://web-agency-crm.onrender.com'
const ENDPOINT = `${CRM_URL.replace(/\/+$/, '')}/api/leads/submit`
const EMAIL = 'hello@pinevalleydigital.com'

export interface Lead {
  name: string
  email: string
  // Optional; the CRM checks it looks like a phone number.
  phone: string
  message: string
  // Where the lead came from, shown in the CRM (e.g. "Service page: Web design").
  source: string
}

// Hidden field for bots: people never see it, and the CRM quietly drops any
// submission that fills it in. Put it inside each form.
export const leadHoneypot = () =>
  `<div class="lead-honeypot" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off" /></label></div>`

// Posts one lead; throws with a message safe to show the visitor (the CRM's
// own messages, like "Please enter a valid email address", pass through).
async function sendLead(lead: Lead, honeypot: string) {
  let res: Response
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, website: honeypot }),
    })
  } catch {
    throw new Error(`We couldn't send that. Check your connection and try again, or email ${EMAIL}.`)
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(res.status === 400 && body.error ? `${body.error}.` : `Something went wrong on our side. Please try again, or email ${EMAIL}.`)
  }
}

// Wires a form to the CRM: the browser checks required fields first, the
// button is disabled while sending, and the status line under the form says
// how it went. `toLead` turns the form's fields into the lead to send.
export function initLeadForm(form: HTMLFormElement, status: HTMLElement, toLead: (data: FormData) => Lead, thanks: string) {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(form)
    if (button) button.disabled = true
    status.classList.remove('is-error')
    status.textContent = 'Sending…'
    try {
      await sendLead(toLead(data), String(data.get('website') ?? ''))
      form.reset()
      status.textContent = thanks
    } catch (error) {
      status.classList.add('is-error')
      status.textContent = (error as Error).message
    } finally {
      if (button) button.disabled = false
    }
  })
}
