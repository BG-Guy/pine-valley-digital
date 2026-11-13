// A small white cloud in the gap between the umbrella and the sun. It sits
// in one of two places, swapping every few frames. `b` is the beach clock.
import { color, line } from '../../theme/theme'

export const Cloud: React.FC<{ b: number }> = ({ b }) => (
  <path
    transform={`translate(${Math.floor(b / 8) % 2 === 0 ? 0 : 12} 0)`}
    d="M624,352 a28,28 0 0 1 6,-55 a42,42 0 0 1 80,-12 a32,32 0 0 1 44,32 a20,20 0 0 1 -6,35 Z"
    fill={color.surface}
    stroke={color.ink}
    strokeWidth={line.heavy}
    strokeLinejoin="round"
  />
)
