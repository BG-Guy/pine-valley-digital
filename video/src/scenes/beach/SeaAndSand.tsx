// The sea and the sand: a mint band of water under the horizon, a line of
// foam that laps back and forth, and the sand below it. The sky is left
// empty, so the graph paper shows through.
import { color, GUTTER, line, SIZE } from '../../theme/theme'

// Where the water starts and where it meets the sand.
const HORIZON = 500
const SHORE = 664

// The sand runs on past the frame's bottom edge and ends on an ink line in
// the gutter under this station.
const SAND_END = SIZE + GUTTER / 2

// Little wave marks on the water: where each sits.
const WAVES: [number, number][] = [
  [90, 548],
  [640, 540],
  [930, 566],
  [470, 604],
  [760, 622],
]

// Specks on the sand.
const SPECKS: [number, number][] = [
  [110, 760],
  [70, 930],
  [520, 1040],
  [660, 1030],
  [905, 800],
  [1010, 880],
  [745, 880],
]

// A wavy edge across the frame at height y, closed along the bottom so it
// can be filled. `shift` slides the waves sideways.
const wavyEdge = (y: number, shift: number) =>
  `M${-180 + shift},${y} ${'q45,-20 90,0 q45,20 90,0 '.repeat(8)}L${SIZE + 200},${SAND_END} L-200,${SAND_END} Z`

export const SeaAndSand: React.FC<{ b: number }> = ({ b }) => {
  // The foam laps: it sits in one of two places, swapping every six frames.
  // The wave marks shuffle the other way, a little faster.
  const lap = Math.floor(b / 6) % 2 === 0 ? 0 : 45
  const drift = Math.floor(b / 4) % 2 === 0 ? 0 : 14

  return (
    <g>
      {/* The water and its horizon line. */}
      <rect x={-10} y={HORIZON} width={SIZE + 20} height={SHORE - HORIZON + 40} fill={color.mint} />
      <line x1={-10} y1={HORIZON} x2={SIZE + 10} y2={HORIZON} stroke={color.ink} strokeWidth={line.heavy} />
      <g fill="none" stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round">
        {WAVES.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x + drift},${y} q16,-14 32,0 t32,0`} />
        ))}
      </g>

      {/* The foam, then the sand over its lower edge. */}
      <path d={wavyEdge(SHORE - 14, lap)} fill={color.surface} stroke={color.ink} strokeWidth={line.mid} />
      <path d={wavyEdge(SHORE + 8, lap)} fill={color.paperDim} stroke={color.ink} strokeWidth={line.heavy} />
      <g fill={color.ink}>
        {SPECKS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} />
        ))}
      </g>

      {/* The sand's closing edge, out of the frame until the camera moves. */}
      <line x1={-10} y1={SAND_END} x2={SIZE + 10} y2={SAND_END} stroke={color.ink} strokeWidth={line.heavy} />
    </g>
  )
}
