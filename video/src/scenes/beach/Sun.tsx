// The sun: a coral disc whose short rays turn a notch every few frames.
import { color, line } from '../../theme/theme'

const AT = { x: 936, y: 130 }
const RADIUS = 64
const RAYS = 12

export const Sun: React.FC<{ b: number }> = ({ b }) => {
  // The rays step round by half a gap, and back, every four frames.
  const turn = (Math.floor(b / 4) % 2) * (180 / RAYS)

  return (
    <g>
      <g transform={`rotate(${turn} ${AT.x} ${AT.y})`} stroke={color.ink} strokeWidth={line.heavy} strokeLinecap="round">
        {Array.from({ length: RAYS }, (_, i) => (
          <line
            key={i}
            x1={AT.x}
            y1={AT.y - RADIUS - 20}
            x2={AT.x}
            y2={AT.y - RADIUS - 40}
            transform={`rotate(${(360 / RAYS) * i} ${AT.x} ${AT.y})`}
          />
        ))}
      </g>
      <circle cx={AT.x} cy={AT.y} r={RADIUS} fill={color.coral} stroke={color.ink} strokeWidth={line.heavy} />
    </g>
  )
}
