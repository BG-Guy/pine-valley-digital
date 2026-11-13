// Comic speed lines: wedges bursting out from a point. Thin and uneven,
// they are the lines behind an impact; wide and even, a sunburst. SVG only.
import { color } from '../../theme/theme'

type SpeedLinesProps = {
  // The point they burst from, and how far from it they start and end.
  cx: number
  cy: number
  from: number
  to: number
  count?: number
  // Half of each wedge's width, as an angle in radians.
  spread?: number
  // Every wedge the same (a sunburst) instead of varied (speed lines).
  even?: boolean
  // Turns them all, in radians: alternate two values to make them flicker.
  turn?: number
  fill?: string
}

export const SpeedLines: React.FC<SpeedLinesProps> = ({ cx, cy, from, to, count = 24, spread = 0.014, even = false, turn = 0, fill = color.ink }) => (
  <g fill={fill}>
    {Array.from({ length: count }, (_, i) => {
      // Uneven lines vary in width and in how close to the centre they
      // start, by their number, so every render draws the same burst.
      const angle = (i / count) * Math.PI * 2 + turn
      const half = even ? spread : spread * (1 + (i % 3) * 0.6)
      const start = even ? from : from * (1 + (i % 4) * 0.1)
      const point = (a: number, r: number) => `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`
      return <path key={i} d={`M${point(angle, start)} L${point(angle - half, to)} L${point(angle + half, to)} Z`} />
    })}
  </g>
)
