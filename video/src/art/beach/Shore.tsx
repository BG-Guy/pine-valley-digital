// The sea and the sand: water in two flat shades with a sailboat on the
// horizon and sparkles on the swell, a line of foam that laps in and out
// over wet sand, and the dry sand below with its shells, starfish and
// footprints. `clock` is the beach's clock. SVG only.
import { color, line, SIZE } from '../../theme/theme'
import { Sparkle } from '../effects/Sparkle'

// Where the water starts and where it meets the sand.
const HORIZON = 500
const SHORE = 664

// The sand runs on a little past the frame's bottom edge.
const SAND_END = SIZE + 20

// The foam's four places as it laps in and back out.
const LAP = [0, 30, 60, 30]

// Little wave marks on the water, sparkles on it, specks on the sand, and
// the footprints leading from the chair down to the water.
const WAVES: [number, number][] = [
  [90, 548],
  [300, 572],
  [930, 566],
  [470, 618],
  [760, 628],
]
const SPARKLES: [number, number][] = [
  [176, 600],
  [556, 556],
  [384, 628],
]
const SPECKS: [number, number][] = [
  [110, 770],
  [70, 946],
  [520, 1052],
  [660, 1036],
  [905, 806],
  [1012, 884],
  [745, 884],
  [836, 1052],
]
const FOOTPRINTS: [number, number][] = [
  [632, 760],
  [656, 744],
  [684, 726],
  [708, 712],
  [734, 700],
]

// A wavy edge across the frame at height y, closed along the bottom so it
// can be filled. `shift` slides the waves sideways.
const wavyEdge = (y: number, shift: number) =>
  `M${-180 + shift},${y} ${'q45,-20 90,0 q45,20 90,0 '.repeat(8)}L${SIZE + 200},${SAND_END} L-200,${SAND_END} Z`

// A five-point star around (x, y).
const star = (x: number, y: number, outer: number, inner: number) =>
  Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI / 5) * i - Math.PI / 2
    const reach = i % 2 === 0 ? outer : inner
    return `${x + Math.cos(angle) * reach},${y + Math.sin(angle) * reach}`
  }).join(' ')

export const Shore: React.FC<{ clock: number }> = ({ clock }) => {
  const lap = LAP[Math.floor(clock / 5) % LAP.length]
  const drift = Math.floor(clock / 4) % 2 === 0 ? 0 : 14

  // The boat sails slowly to the right, out past the umbrella, and bobs.
  const boat = 84 + clock * 0.5
  const bob = Math.floor(clock / 5) % 2 === 0 ? 0 : 3

  return (
    <g>
      {/* The water: mint, a deeper swell toward the shore, the horizon. */}
      <rect x={-10} y={HORIZON} width={SIZE + 20} height={SHORE - HORIZON + 40} fill={color.mint} />
      <path d={wavyEdge(598, drift * 2)} fill={color.mintDeep} />
      <line x1={-10} y1={HORIZON} x2={SIZE + 10} y2={HORIZON} stroke={color.ink} strokeWidth={line.heavy} />

      {/* The sailboat, sitting on the horizon. */}
      <g transform={`translate(0 ${bob})`} stroke={color.ink} strokeWidth={line.mid} strokeLinejoin="round" strokeLinecap="round">
        <line x1={boat - 2} y1={486} x2={boat - 2} y2={404} />
        <path d={`M${boat + 6},412 L${boat + 6},476 L${boat + 48},476 Z`} fill={color.surface} />
        <path d={`M${boat - 10},424 L${boat - 10},476 L${boat - 40},476 Z`} fill={color.lemon} />
        <path d={`M${boat - 2},404 l18,7 l-18,7 Z`} fill={color.lilac} strokeWidth={line.thin} />
        <path d={`M${boat - 46},484 L${boat + 46},484 L${boat + 30},506 L${boat - 32},506 Z`} fill={color.coral} />
      </g>

      {/* Wave marks, and sparkles that take turns to show. */}
      <g fill="none" stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round">
        {WAVES.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x + drift},${y} q16,-14 32,0 t32,0`} />
        ))}
      </g>
      {SPARKLES.map(([x, y], i) => (Math.floor(clock / 4 + i) % 3 === 0 ? null : <Sparkle key={`${x}-${y}`} x={x} y={y} size={17} />))}

      {/* The foam, the wet sand it leaves, then the dry sand. */}
      <path d={wavyEdge(SHORE - 14, lap)} fill={color.surface} stroke={color.ink} strokeWidth={line.mid} />
      <path d={wavyEdge(SHORE + 8, lap)} fill={color.sandDeep} stroke={color.ink} strokeWidth={line.heavy} />
      <path d={wavyEdge(SHORE + 52, 60 - lap)} fill={color.paperDim} />

      {/* On the sand: footprints, specks, a starfish and a shell. */}
      <g fill={color.sandDeep}>
        {FOOTPRINTS.map(([x, y], i) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y + (i % 2) * 10} rx={10} ry={6} transform={`rotate(-28 ${x} ${y})`} />
        ))}
      </g>
      <g fill={color.ink}>
        {SPECKS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} />
        ))}
      </g>
      <polygon points={star(246, 1046, 26, 11)} fill={color.coral} stroke={color.ink} strokeWidth={line.mid} strokeLinejoin="round" />
      <g stroke={color.ink} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
        <path d="M676,1050 q22,-38 44,0 Z" fill={color.surface} />
        <path d="M698,1048 v-18 M688,1048 l-3,-12 M708,1048 l3,-12" fill="none" strokeWidth={line.thin} />
      </g>
    </g>
  )
}
