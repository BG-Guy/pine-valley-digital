// The "New lead!" panel: on lemon, with speed lines behind it, a phone
// rings in a hand. The lead shows on it like an incoming call. A starburst
// shouts the news and an envelope flies in "from your website". `t` is
// frames since the panel's beat began (negative while it pans in).
import type { CSSProperties } from 'react'
import { Sparkle } from '../../art/effects/Sparkle'
import { SpeedLines } from '../../art/effects/SpeedLines'
import { Avatar } from '../../art/ui/Avatar'
import { StatusBar } from '../../art/ui/StatusBar'
import { HandWithPhone } from '../../scenes/phone/HandWithPhone'
import { color, SIZE } from '../../theme/theme'
import { keyed, pop } from '../../timeline/motion'
import { WordBurst } from './WordBurst'

// The envelope's flight in from the right, frame by frame.
const FLY_IN = [1120, 930, 800, 742, 760]

const SPARKLES: [number, number, number][] = [
  [650, 600, 30],
  [1004, 566, 22],
  [560, 96, 26],
  [86, 190, 28],
]

const icon = { width: 56, height: 56, viewBox: '0 0 24 24', fill: 'none', stroke: color.ink, strokeWidth: 3.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const LeadPanel: React.FC<{ t: number }> = ({ t }) => {
  // The phone rings for a while: it rocks, and arcs flash either side.
  const ringing = t >= 2 && t < 18
  const rock = ringing ? (t % 2 === 0 ? 3 : -3) : 0
  const flicker = Math.floor(t / 3) % 2 === 0 ? 0 : 0.1

  return (
    <div className="panel" style={{ background: color.lemon }}>
      <svg width={SIZE} height={SIZE}>
        <SpeedLines cx={380} cy={560} from={400} to={1400} count={30} turn={flicker} fill={color.lemonDeep} />
        {ringing && t % 2 === 0 && (
          <g fill="none" stroke={color.ink} strokeWidth={12} strokeLinecap="round">
            <path d="M150,270 q-42,44 -30,104 M100,236 q-66,66 -48,160" />
            <path d="M590,250 q42,44 30,104 M640,216 q66,66 48,160" />
          </g>
        )}
      </svg>

      {/* The phone, ringing in the owner's hand. */}
      <div className="sticker-rim" style={{ left: 130, top: 120, scale: String(0.78 * pop(t, -3)), rotate: `${-8 + rock}deg` }}>
        <HandWithPhone sleeve={color.lilac}>
          <div className="phone-page inc">
            <StatusBar time="2:04" />
            <div className="mono inc-tag">New lead</div>
            <div style={{ marginTop: 26 }}>
              <Avatar size={210} fill={color.mint} />
            </div>
            <div className="display inc-name">Sam Rivera</div>
            <div className="inc-need">Leaky pipe · needs a plumber</div>
            <div className="inc-buttons">
              <span className="inc-button" style={{ background: color.coral }}>
                <svg {...icon}>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
              <span className="inc-button" style={{ background: color.mint, scale: t % 4 < 2 ? '1.1' : '1' }}>
                <svg {...icon}>
                  <path d="M4 12.5l5.5 5.5L20 6.5" />
                </svg>
              </span>
            </div>
          </div>
        </HandWithPhone>
      </div>

      {/* The news, on a starburst that rocks. */}
      <div className="sticker" style={{ left: 580, top: 70, scale: String(pop(t, 4)), rotate: `${Math.floor(t / 3) % 2 === 0 ? 9 : 14}deg` }}>
        <WordBurst size={450} fill={color.coral} lines={['New', 'lead!']} type={28} />
      </div>

      {/* The envelope it came in, and where it came from. */}
      <div className="sticker" style={{ left: t < 9 ? FLY_IN[0] : keyed(t, 9, FLY_IN), top: 650, rotate: '10deg' }}>
        <svg width="220" height="150" style={{ display: 'block' }}>
          <rect x={6} y={6} width={208} height={138} rx={18} fill={color.surface} stroke={color.ink} strokeWidth={10} />
          <path d="M10,14 L110,88 L210,14" fill="none" stroke={color.ink} strokeWidth={10} strokeLinejoin="round" />
          <circle cx={110} cy={98} r={20} fill={color.coral} stroke={color.ink} strokeWidth={6} />
        </svg>
      </div>
      <div className="nb-pill" style={{ '--pill-bg': color.surface, left: 690, top: 850, fontSize: 26, scale: String(pop(t, 12)), rotate: '-4deg' } as CSSProperties}>
        From your website
      </div>

      <svg width={SIZE} height={SIZE}>
        {t >= 5 && SPARKLES.map(([x, y, size], i) => (Math.floor((t + i * 2) / 3) % 2 === 0 ? <Sparkle key={i} x={x} y={y} size={size} /> : null))}
      </svg>
    </div>
  )
}
