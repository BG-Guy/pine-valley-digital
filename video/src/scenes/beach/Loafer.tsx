// A loafer, side on, toe to the right: the owner wears a pair. It hangs
// from the ankle and can be turned about it, for the foot tap.
import { color, line } from '../../theme/theme'

type LoaferProps = {
  // Where the ankle is, and how far the shoe is turned about it, in degrees.
  x: number
  y: number
  turn?: number
}

export const Loafer: React.FC<LoaferProps> = ({ x, y, turn = 0 }) => (
  <g transform={`rotate(${turn} ${x} ${y})`}>
    {/* The shoe: heel on the left, a low vamp, a rounded toe. */}
    <path
      d={`M${x - 26},${y + 32} L${x - 26},${y + 4} Q${x - 24},${y - 14} ${x},${y - 12} L${x + 32},${y - 6} Q${x + 92},${y + 2} ${x + 96},${y + 24} L${x + 96},${y + 32} Z`}
      fill={color.ink}
      stroke={color.ink}
      strokeWidth={line.mid}
      strokeLinejoin="round"
    />
    {/* A cream line for the sole. */}
    <line x1={x - 22} y1={y + 30} x2={x + 92} y2={y + 30} stroke={color.surface} strokeWidth={5} strokeLinecap="round" />
  </g>
)
