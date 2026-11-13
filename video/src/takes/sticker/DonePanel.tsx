// The "Done!" panel: on a lemon sunburst, a big tick stamps in beside a
// wrench, and coins fly across into a "Paid" ticket whose total counts up
// as each one lands. `t` is frames since the panel's beat began (negative
// while it pans in).
import { Confetti } from '../../art/effects/Confetti'
import { SpeedLines } from '../../art/effects/SpeedLines'
import { color, font, line, SIZE } from '../../theme/theme'
import { keyed, pop } from '../../timeline/motion'
import { WordBurst } from './WordBurst'

type Point = [number, number]

// The coins: where they leave from, the top of their arc, where they land,
// how many there are, the frame the first sets off, the gap between them
// and how long each is in the air.
const FROM: Point = [470, 560]
const OVER: Point = [650, 250]
const TO: Point = [800, 690]
const COINS = 4
const FIRST = 5
const GAP = 2
const FLIGHT = 5

// What each coin adds to the ticket.
const WORTH = 60

const ink = { stroke: color.ink, strokeWidth: line.heavy, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

export const DonePanel: React.FC<{ t: number }> = ({ t }) => {
  // The sunburst flickers between two places.
  const flicker = Math.floor(t / 3) % 2 === 0 ? 0 : Math.PI / 16

  // How many coins have landed, and so what the ticket says.
  const landed = Math.min(COINS, Math.max(0, Math.floor((t - FIRST - FLIGHT) / GAP) + 1))

  return (
    <div className="panel" style={{ background: color.surface }}>
      <svg width={SIZE} height={SIZE}>
        <SpeedLines cx={540} cy={560} from={0} to={1500} count={16} spread={Math.PI / 32} even turn={flicker} fill={color.lemon} />
      </svg>

      {/* The wrench, then the tick over its handle. */}
      <div className="sticker" style={{ left: 300, top: 640, scale: String(pop(t, -1)), rotate: '-32deg' }}>
        <svg width="380" height="130" style={{ display: 'block', overflow: 'visible' }}>
          <rect x={50} y={42} width={270} height={46} rx={23} fill={color.lilac} {...ink} />
          <circle cx={50} cy={65} r={48} fill={color.lilac} {...ink} />
          <circle cx={50} cy={65} r={18} fill={color.ink} />
          <circle cx={326} cy={65} r={54} fill={color.lilac} {...ink} />
          <path d="M326,65 L392,38 L392,92 Z" fill={color.ink} />
        </svg>
      </div>
      <div className="sticker" style={{ left: 110, top: 300, scale: String(pop(t, -3)), rotate: `${keyed(t, -3, [-20, 8, -3, 0])}deg` }}>
        <svg width="400" height="400" viewBox="0 0 100 100" style={{ display: 'block' }}>
          <circle cx={50} cy={50} r={45} fill={color.mint} stroke={color.ink} strokeWidth={3} />
          <path d="M27,52 l16,16 l31,-34" fill="none" stroke={color.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* The ticket the coins pay into. */}
      <div className="sticker" style={{ left: 640, top: 610, scale: String(pop(t, 3)), rotate: '6deg' }}>
        <svg width="370" height="250" style={{ display: 'block' }}>
          <rect x={6} y={6} width={358} height={238} rx={34} fill={color.surface} {...ink} strokeWidth={10} />
          <path d="M6,84 V40 a34,34 0 0 1 34,-34 h290 a34,34 0 0 1 34,34 v44 Z" fill={color.coral} {...ink} strokeWidth={10} />
          <g fill={color.ink} textAnchor="middle">
            <text x={185} y={68} style={{ font: `800 58px ${font.display}`, fontStretch: '75%' }}>
              PAID
            </text>
            <text x={185} y={206} style={{ font: `800 122px ${font.display}`, fontStretch: '75%' }}>
              ${landed * WORTH}
            </text>
          </g>
        </svg>
      </div>

      {/* The coins, each along the same arc a little after the last. */}
      <svg width={SIZE} height={SIZE}>
        {Array.from({ length: COINS }, (_, i) => {
          const flown = (t - FIRST - i * GAP) / FLIGHT
          if (flown < 0 || flown >= 1) return null
          const back = 1 - flown
          const x = back * back * FROM[0] + 2 * back * flown * OVER[0] + flown * flown * TO[0]
          const y = back * back * FROM[1] + 2 * back * flown * OVER[1] + flown * flown * TO[1]
          // It spins: every other frame it is seen edge-on.
          const squash = (t + i) % 2 === 0 ? 1 : 0.5
          return (
            <g key={i} transform={`translate(${x} ${y}) scale(${squash} 1)`}>
              <circle r={40} fill={color.lemon} {...ink} />
              <text y={17} textAnchor="middle" fill={color.ink} style={{ font: `800 50px ${font.display}` }}>
                $
              </text>
            </g>
          )
        })}
        <Confetti x={540} y={520} age={t - FIRST - FLIGHT - COINS * GAP} pieces={20} reach={440} />
      </svg>

      {/* The shout. */}
      <div className="sticker" style={{ left: 610, top: 70, scale: String(pop(t, 7)), rotate: `${Math.floor(t / 3) % 2 === 0 ? 8 : 13}deg` }}>
        <WordBurst size={420} fill={color.coral} lines={['Done!']} type={30} />
      </div>
    </div>
  )
}
