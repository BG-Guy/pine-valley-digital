// The phone, held in a hand: a sticker-style drawing like the site's
// illustrations, with the live screen (children) set into the handset.
// Three layers: the palm, wrist and sleeve cuff behind; the handset; then
// the thumb and fingers wrapped over its edges.
import './phone.css'
import { color, drop, line } from '../../theme/theme'

// The handset's size, and how thick its ink edge is around the screen.
export const PHONE = { width: 480, height: 900, bezel: 18 }

// Every part of the hand: flat skin tone inside the heavy ink line.
const skin = { fill: color.skin, stroke: color.ink, strokeWidth: line.heavy, strokeLinejoin: 'round' as const }

// Both drawings share the handset's box and spill out of it.
const layer = { position: 'absolute', left: 0, top: 0, overflow: 'visible' } as const

// The four fingers' tops, down the handset's right edge (the last is the
// little finger).
const FINGERS = [500, 584, 668, 752]

export const HandWithPhone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: 'relative',
      width: PHONE.width,
      height: PHONE.height,
      filter: `drop-shadow(${drop.heavy}px ${drop.heavy}px 0 ${color.ink})`,
    }}
  >
    {/* Behind the handset: the wrist, the palm cupping the lower half, and
        a mint sleeve cuff. */}
    <svg style={layer} width={PHONE.width} height={PHONE.height}>
      <rect x={136} y={900} width={208} height={90} {...skin} />
      <rect x={-44} y={470} width={568} height={478} rx={120} {...skin} />
      <rect x={106} y={944} width={268} height={62} rx={16} {...skin} fill={color.mint} />
    </svg>

    {/* The handset and its screen. */}
    <div className="phone">
      <div className="phone-screen">
        <span className="phone-island" />
        {children}
      </div>
    </div>

    {/* In front: the fingers curled over the right edge, and the thumb
        resting up the left one, with its nail. */}
    <svg style={layer} width={PHONE.width} height={PHONE.height}>
      {FINGERS.map((y, i) => (
        <rect key={y} x={452} y={y} width={96} height={i === 3 ? 66 : 76} rx={34} {...skin} />
      ))}
      <g transform="rotate(9 -14 730)">
        <rect x={-58} y={612} width={88} height={250} rx={44} {...skin} />
        <rect x={-36} y={630} width={46} height={56} rx={20} fill="#ffd6b8" stroke={color.ink} strokeWidth={line.thin} />
      </g>
    </svg>
  </div>
)
