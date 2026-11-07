// FAQ section: the questions people ask before they reach out, answered
// plainly, as open/close rows (native <details>, so it works without JS and
// with the keyboard). Styles live in faq.css.
import './faq.css'

const QUESTIONS = [
  {
    q: 'How long does a new website take?',
    a: 'Most small-business sites go from first call to launch in 3 to 6 weeks, including design, writing, building, your revisions and testing. You get a date before we start.',
  },
  {
    q: 'How much does it cost?',
    a: 'Every project gets a fixed quote after a free 20-minute call, based on what your site needs. The price we agree is the price you pay.',
  },
  {
    q: 'Will it work on phones?',
    a: 'Yes. Every page is designed and tested on phones first, since that’s where most of your visitors are, then on tablets and desktops.',
  },
  {
    q: 'Will my website show up on Google?',
    a: 'Every site we build comes with the SEO foundations: fast pages, clean structure, titles and descriptions, and a Google Business Profile check. If you want to climb further, our SEO and Local SEO services take it from there.',
  },
  {
    q: 'Who looks after it once it’s live?',
    a: 'You can, and we’ll show you how. Or our Care & Maintenance plan handles hosting, updates, backups, security and small edits for you. It’s optional and never a lock-in.',
  },
  {
    q: 'Do I own my website?',
    a: 'Completely. Your domain, your content and your code are yours. If you ever move on, you take everything with you.',
  },
  {
    q: 'What’s the catch with the free website check and report?',
    a: 'There isn’t one. The check uses Google’s own tests, and the report is a real review with a short fix plan you can hand to anyone. If you’d like us to do the fixes, great. If not, it’s still yours.',
  },
  {
    q: 'I already have a website. Do I need to start over?',
    a: 'Not always. We look at what you have first. Sometimes a redesign is right; often a few targeted fixes to speed, SEO or the contact path make the biggest difference.',
  },
]

export const renderFaq = () => `
    <section id="faq" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="faq-grid mx-auto max-w-7xl">
        <div class="faq-head reveal">
          <p class="nb-pill" style="--nb-pill-bg: var(--color-lilac)">FAQ</p>
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl">Questions, <span class="nb-mark nb-mark-mint">answered</span></h2>
          <p class="faq-lead">Still wondering about something? Ask us on a free call and we’ll give you a straight answer.</p>
          <a href="#contact" class="nb-press nb-btn nb-lemon"><span class="nb-face">Book a free call</span></a>
        </div>
        <div class="faq-list reveal">
          ${QUESTIONS.map(
            ({ q, a }) => `
          <details class="faq-item">
            <summary><span>${q}</span><i aria-hidden="true"></i></summary>
            <p>${a}</p>
          </details>`,
          ).join('')}
        </div>
      </div>
    </section>
`
