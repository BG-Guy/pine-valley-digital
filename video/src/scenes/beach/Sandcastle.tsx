// A sandcastle with a lilac flag, and the lemon bucket that made it, in the
// frame's bottom corner.
import { color, line } from '../../theme/theme'

const sand = { fill: color.sandDeep, stroke: color.ink, strokeWidth: line.mid, strokeLinejoin: 'round' as const }

// The two outer towers: each one's left edge.
const TOWERS = [838, 956]

export const Sandcastle: React.FC = () => (
  <g>
    {/* The bucket and its handle. */}
    <path d="M764,952 Q796,914 828,952" fill="none" stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
    <path d="M760,950 L832,950 L820,1006 L772,1006 Z" {...sand} fill={color.lemon} />

    {/* The keep, with its flag. */}
    <line x1={920} y1={858} x2={920} y2={792} stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
    <path d="M920,794 L960,808 L920,824 Z" {...sand} fill={color.lilac} />
    <rect x={894} y={856} width={52} height={90} {...sand} />

    {/* The two towers, each with a pair of battlements. */}
    {TOWERS.map((x) => (
      <g key={x}>
        <rect x={x} y={890} width={48} height={116} {...sand} />
        <rect x={x - 4} y={872} width={22} height={22} {...sand} />
        <rect x={x + 30} y={872} width={22} height={22} {...sand} />
      </g>
    ))}

    {/* The wall between them, and its gate. */}
    <rect x={880} y={936} width={82} height={70} {...sand} />
    <path d="M906,1006 L906,978 Q921,958 936,978 L936,1006 Z" fill={color.ink} />
  </g>
)
