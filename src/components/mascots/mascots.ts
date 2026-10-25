// The site's three mascots, inline SVG in the theme's flat colours and ink
// line (100×100 boxes), each with its own idle motion (mascots.css):
//   - Pine Pal: the pine from the logo with a face, on a scalloped mint
//     badge. It sways. Lives on the loading screen (components/preloader).
//   - Zap: a winking lightning bolt for "we build fast". It twitches. Sits
//     on the hero's "fast".
//   - Clicky: a grinning coral cursor with a name tag. It floats. Points at
//     the forms' send buttons (coral, so it stands out on their lilac).
// All three also come as round stickers for the sticker roll
// (components/sticker-roll). Decorative: hidden from screen readers.
import './mascots.css'
import { face, paint, scallop } from '../drawing/drawing'

export type MascotName = 'pinePal' | 'zap' | 'clicky'

const svg = (className: string, inner: string) =>
  `<svg class="mascot ${className}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${inner}</svg>`

const BADGE = scallop(50, 50, 42, 5, 14)

// The figures, without their badges.
const PINE =
  `<g class="m-sway"><path d="M50 16 L64 38 H36 Z M50 30 L70 56 H30 Z M50 46 L76 76 H24 Z" ${paint('accent-2')}/>` +
  `<rect x="45" y="76" width="10" height="9" rx="1.5" style="fill:var(--color-ink)"/><g transform="translate(0 4)">${face(50, 58, 0.75)}</g></g>`

const BOLT = `<g class="m-zap"><path d="M60 4 L18 56 H45 L36 96 L82 38 H55 L66 4 Z" ${paint('lemon', 3)}/><g transform="translate(-2 2)">${face(52, 46, 0.72, { wink: true })}</g></g>`

const cursor = (tag: string) =>
  `<g class="m-float"><path d="M14 8 L14 76 L31 60 L43 87 L57 80 L45 54 L68 54 Z" ${paint('coral', 3)}/>${face(29, 42, 0.62)}` +
  `<rect x="52" y="62" width="44" height="22" rx="11" ${paint('mint')}/><text x="74" y="77.5" text-anchor="middle" style="font:700 11px var(--font-mono);fill:var(--color-ink)">${tag}</text></g>`

// A round sticker: a scalloped badge in `fill`, a cream disc, and a figure
// shrunk to fit inside it.
const roundSticker = (fill: string, figure: string, scale: number, cx = 50, cy = 50) =>
  `<path d="${BADGE}" ${paint(fill)}/><circle cx="50" cy="50" r="35" ${paint('paper')}/>` +
  `<g transform="translate(50 50) scale(${scale}) translate(${-cx} ${-cy})">${figure}</g>`

export const pinePal = (className = '') => svg(className, roundSticker('mint', PINE, 1))
export const zap = (className = '') => svg(className, BOLT)
export const clicky = (className = '', tag = 'Hi!') => svg(className, cursor(tag))

// The sticker roll's versions: every mascot on a round badge, so it can
// roll.
export const ROLL_STICKERS: Record<MascotName, string> = {
  pinePal: pinePal(),
  zap: svg('', roundSticker('lilac', BOLT, 0.6)),
  clicky: svg('', roundSticker('lemon', cursor('Hi!'), 0.56, 52, 48)),
}
