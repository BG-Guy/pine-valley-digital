// A burst of confetti: small flat pieces thrown out from a point, which
// tumble and fall, and are gone in under a second. SVG only.
import { color, line } from '../../theme/theme'

const FILLS = [color.lemon, color.lilac, color.mint, color.coral, color.surface]

// How long a burst lasts, in frames.
const LIFE = 11

type ConfettiProps = {
  // Where the burst starts.
  x: number
  y: number
  // Frames since it went off (negative: not yet).
  age: number
  pieces?: number
  // How far the pieces fly.
  reach?: number
}

export const Confetti: React.FC<ConfettiProps> = ({ x, y, age, pieces = 14, reach = 230 }) => {
  if (age < 0 || age > LIFE) return null

  // The pieces shoot out fast and slow down, then gravity takes over.
  const out = 1 - (1 - Math.min(1, age / 5)) ** 2
  const fall = Math.max(0, age - 3) ** 2 * 3.2

  return (
    <g>
      {Array.from({ length: pieces }, (_, i) => {
        // Each piece gets its own direction, distance and spin, fixed by
        // its number so every render draws the same burst.
        const angle = (i / pieces) * Math.PI * 2 + (i % 3) * 0.4
        const far = reach * (0.55 + ((i * 37) % 10) / 22) * out
        const px = x + Math.cos(angle) * far
        const py = y + Math.sin(angle) * far * 0.8 + fall
        const spin = i * 47 + age * (i % 2 ? 38 : -52)
        return (
          <rect
            key={i}
            x={px - 10}
            y={py - 6}
            width={20}
            height={12}
            rx={3}
            fill={FILLS[i % FILLS.length]}
            stroke={color.ink}
            strokeWidth={line.thin}
            transform={`rotate(${spin} ${px} ${py})`}
          />
        )
      })}
    </g>
  )
}
