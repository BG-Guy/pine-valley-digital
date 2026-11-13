// The "Booked!" panel: on lilac, with halftone dots in two corners, a big
// tear-off calendar shows today's slot, and a mint starburst slams onto it
// like a rubber stamp, shaking the panel. `t` is frames since the panel's
// beat began (negative while it pans in).
import { Confetti } from '../../art/effects/Confetti'
import { Sparkle } from '../../art/effects/Sparkle'
import { SpeedLines } from '../../art/effects/SpeedLines'
import { color, font, SIZE } from '../../theme/theme'
import { keyed, pop } from '../../timeline/motion'
import { WordBurst } from './WordBurst'

// The frame the stamp lands on, and how it comes down: big and twisted,
// then squashed, then settled.
const STAMP = 7
const SLAM_SIZE = [1.6, 0.9, 1.05, 1]
const SLAM_TILT = [-30, -8, -16, -12]
const SHAKE = [12, -8, 4, 0]

const SPARKLES: [number, number, number][] = [
  [170, 250, 30],
  [930, 330, 26],
  [250, 900, 24],
]

const type = (size: number, family = font.display) => ({ font: `800 ${size}px ${family}`, fontStretch: family === font.display ? '75%' : undefined })

export const BookedPanel: React.FC<{ t: number }> = ({ t }) => {
  const stamped = t >= STAMP

  return (
    <div className="panel" style={{ background: color.lilac }}>
      <svg width={SIZE} height={SIZE}>
        <circle cx={110} cy={980} r={300} fill="url(#halftone)" />
        <circle cx={1010} cy={70} r={230} fill="url(#halftone)" />
      </svg>

      {/* Everything on the panel jumps when the stamp lands. */}
      <div style={{ inset: 0, translate: `${stamped ? keyed(t, STAMP, SHAKE) : 0}px 0` }}>
        {/* The calendar: two rings, a coral header, the slot in huge type. */}
        <div className="sticker" style={{ position: 'absolute', left: 250, top: 220, scale: String(pop(t, -3)), rotate: `${keyed(t, -3, [-14, 6, 1, 3])}deg` }}>
          <svg width="520" height="600" style={{ display: 'block' }}>
            <rect x={10} y={40} width={500} height={550} rx={50} fill={color.surface} stroke={color.ink} strokeWidth={10} />
            <path d="M10,90 a50,50 0 0 1 50,-50 h400 a50,50 0 0 1 50,50 v84 h-500 Z" fill={color.coral} stroke={color.ink} strokeWidth={10} strokeLinejoin="round" />
            <rect x={150} y={2} width={40} height={88} rx={20} fill={color.ink} />
            <rect x={330} y={2} width={40} height={88} rx={20} fill={color.ink} />
            <g fill={color.ink} textAnchor="middle">
              <text x={260} y={152} style={type(74)}>
                TODAY
              </text>
              <text x={260} y={420} style={type(236)}>
                2:00
              </text>
              <text x={260} y={516} style={{ font: `700 46px ${font.mono}`, letterSpacing: '0.1em' }}>
                PM
              </text>
            </g>
          </svg>
        </div>

        {/* The stamp. */}
        {stamped && (
          <div className="sticker" style={{ position: 'absolute', left: 570, top: 590, scale: String(keyed(t, STAMP, SLAM_SIZE)), rotate: `${keyed(t, STAMP, SLAM_TILT)}deg` }}>
            <WordBurst size={440} fill={color.mint} lines={['Booked!']} type={23} />
          </div>
        )}

        {/* A tick that pops on afterwards. */}
        <div className="sticker" style={{ position: 'absolute', left: 90, top: 96, scale: String(pop(t, 11)), rotate: '-10deg' }}>
          <svg width="170" height="170" viewBox="0 0 100 100" style={{ display: 'block' }}>
            <circle cx={50} cy={50} r={45} fill={color.lemon} stroke={color.ink} strokeWidth={6} />
            <path d="M28,52 l15,15 l30,-32" fill="none" stroke={color.ink} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Impact lines for two frames, then confetti and sparkles. */}
      <svg width={SIZE} height={SIZE}>
        {t >= STAMP && t < STAMP + 2 && <SpeedLines cx={790} cy={810} from={250} to={330} count={16} spread={0.03} />}
        <Confetti x={600} y={560} age={t - STAMP - 1} pieces={18} reach={420} />
        {t >= STAMP + 2 && SPARKLES.map(([x, y, size], i) => (Math.floor((t + i * 2) / 3) % 2 === 0 ? <Sparkle key={i} x={x} y={y} size={size} /> : null))}
      </svg>
    </div>
  )
}
