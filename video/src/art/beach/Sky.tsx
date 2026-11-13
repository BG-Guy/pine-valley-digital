// The sky over the beach: the sun, two clouds and a pair of gulls. The sky
// itself is left empty, so the graph paper shows through. `clock` is the
// beach's clock (beachTiming.ts). SVG only.
import { color, line } from '../../theme/theme'

const SUN = { x: 936, y: 130, r: 64 }
const RAYS = 12

// A gull, wings up or wings down.
const gull = (x: number, y: number, up: boolean) =>
  up ? `M${x - 24},${y} q12,-16 24,0 q12,-16 24,0` : `M${x - 24},${y - 8} q12,8 24,8 q12,0 24,-8`

export const Sky: React.FC<{ clock: number }> = ({ clock }) => {
  // The rays step round by half a gap and back; the clouds sit in one of
  // two places; the gulls flap every three frames and drift to the right.
  const turn = (Math.floor(clock / 4) % 2) * (180 / RAYS)
  const drift = Math.floor(clock / 8) % 2 === 0 ? 0 : 12
  const wingsUp = Math.floor(clock / 3) % 2 === 0
  const flown = clock * 2.5

  return (
    <g>
      {/* The sun: long and short rays in turn, a coral disc, a highlight. */}
      <g transform={`rotate(${turn} ${SUN.x} ${SUN.y})`} stroke={color.ink} strokeWidth={line.heavy} strokeLinecap="round">
        {Array.from({ length: RAYS }, (_, i) => (
          <line
            key={i}
            x1={SUN.x}
            y1={SUN.y - SUN.r - 20}
            x2={SUN.x}
            y2={SUN.y - SUN.r - (i % 2 === 0 ? 46 : 32)}
            transform={`rotate(${(360 / RAYS) * i} ${SUN.x} ${SUN.y})`}
          />
        ))}
      </g>
      <circle cx={SUN.x} cy={SUN.y} r={SUN.r} fill={color.coral} stroke={color.ink} strokeWidth={line.heavy} />
      <path d="M898,114 q10,-30 44,-36" fill="none" stroke={color.surface} strokeWidth={line.heavy} strokeLinecap="round" />

      {/* The clouds: a big one between the umbrella and the sun, a small
          one in the top corner. */}
      <g fill={color.surface} stroke={color.ink} strokeWidth={line.heavy} strokeLinejoin="round">
        <path transform={`translate(${drift} 0)`} d="M624,352 a28,28 0 0 1 6,-55 a42,42 0 0 1 80,-12 a32,32 0 0 1 44,32 a20,20 0 0 1 -6,35 Z" />
        <path transform={`translate(${-drift / 2} 0)`} d="M134,120 a18,18 0 0 1 4,-35 a27,27 0 0 1 52,-8 a20,20 0 0 1 28,20 a13,13 0 0 1 -4,23 Z" />
      </g>

      {/* The gulls. */}
      <g fill="none" stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" strokeLinejoin="round">
        <path d={gull(430 + flown, 172, wingsUp)} />
        <path d={gull(498 + flown, 136, !wingsUp)} />
      </g>
    </g>
  )
}
