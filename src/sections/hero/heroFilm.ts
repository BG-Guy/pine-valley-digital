// The hero's film: a short looping animation of a lead becoming a booked,
// finished job (a search, a booking, the CRM, a technician, done, and the
// owner on the beach). It is made with Remotion in /video (see
// video/README.md) and played here as a muted video in an ink-framed card.
// It starts once the hero's load-in has landed, plays only while it's on
// screen, and stops with the tape's pause button. With reduced motion it
// stays on its still. Styles live in heroFilm.css.
import './heroFilm.css'
import filmUrl from '../../assets/hero-film/lead-journey.mp4'
import posterUrl from '../../assets/hero-film/lead-journey-poster.webp'

// What the film shows, for people who can't see it.
const STORY =
  'Animation: a customer searches for a plumber, opens the top result and books a visit. The booking lands in the CRM, goes to a technician for that day and is marked done and paid, while the business owner relaxes on the beach with his family.'

// Markup: the card is announced as one image, with the story as its name.
// The video inside is hidden from screen readers and can't take focus. It
// loads nothing but its still until it's told to play.
export const renderHeroFilm = () => `
          <figure class="hero-film nb-card" role="img" aria-label="${STORY}">
            <video class="hero-film-video" data-hero-film muted loop playsinline preload="none"
                   disablepictureinpicture disableremoteplayback aria-hidden="true" tabindex="-1"
                   poster="${posterUrl}" width="1080" height="1080">
              <source src="${filmUrl}" type="video/mp4" />
            </video>
          </figure>`

// Plays the film whenever three things are all true: the hero's load-in has
// landed (pageLoad.ts adds .is-landed to the hero then), the film is on
// screen, and motion isn't paused (the tape's button sets data-motion on
// <html>). Call after the markup is in the DOM.
export function initHeroFilm() {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-film]')
  const hero = document.querySelector('#hero')
  if (!video || !hero) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Browsers only let a video start by itself if it is muted; set it in
  // code too, in case the attribute alone isn't honoured.
  video.muted = true

  let landed = hero.classList.contains('is-landed')
  let onScreen = false
  const paused = () => document.documentElement.dataset.motion === 'paused'

  // A refused play (some phones block it to save power) just leaves the
  // still showing.
  const sync = () => {
    if (landed && onScreen && !paused()) video.play().catch(() => {})
    else video.pause()
  }

  // On screen: at least a quarter of the film is in view.
  new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    },
    { threshold: 0.25 },
  ).observe(video)

  // The tape's pause button.
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] })

  // The hero's load-in landing.
  if (!landed) {
    const watch = new MutationObserver(() => {
      if (!hero.classList.contains('is-landed')) return
      landed = true
      watch.disconnect()
      sync()
    })
    watch.observe(hero, { attributes: true, attributeFilter: ['class'] })
  }
}
