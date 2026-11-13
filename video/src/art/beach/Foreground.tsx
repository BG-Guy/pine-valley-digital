// The front of the beach: a sandcastle with a lilac flag, the lemon bucket
// and coral spade that made it, and a crab that sidles along the bottom
// edge. `clock` is the beach's clock. SVG only.
import { Limb } from '../../components/limb/Limb'
import { color, line } from '../../theme/theme'

const sand = { fill: color.sandDeep, stroke: color.ink, strokeWidth: line.mid, strokeLinejoin: 'round' as const }

// The two outer towers: each one's left edge.
const TOWERS = [838, 956]

export const Foreground: React.FC<{ clock: number }> = ({ clock }) => {
  // The crab walks to the right, legs stepping every other frame; the
  // castle's flag flaps.
  const crab = 330 + clock * 2.2
  const step = Math.floor(clock / 2) % 2 === 0 ? 0 : 7
  const flap = Math.floor(clock / 3) % 2 === 0

  return (
    <g>
      {/* The castle's shadow. */}
      <ellipse cx={916} cy={1010} rx={150} ry={12} fill={color.sandDeep} />

      {/* The bucket and its handle. */}
      <path d="M764,952 Q796,914 828,952" fill="none" stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
      <path d="M760,950 L832,950 L820,1006 L772,1006 Z" {...sand} fill={color.lemon} />
      <path d="M764,968 H828" fill="none" stroke={color.lemonDeep} strokeWidth={10} />
      <path d="M760,950 L832,950 L820,1006 L772,1006 Z" {...sand} fill="none" />

      {/* The keep, with its flag. */}
      <line x1={920} y1={858} x2={920} y2={792} stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
      <path d={flap ? 'M920,794 L960,808 L920,824 Z' : 'M920,794 L954,802 L920,820 Z'} {...sand} fill={color.lilac} />
      <rect x={894} y={856} width={52} height={90} {...sand} />
      <rect x={912} y={876} width={16} height={24} rx={8} fill={color.ink} />

      {/* The two towers, each with a pair of battlements and a slit. */}
      {TOWERS.map((x) => (
        <g key={x}>
          <rect x={x} y={890} width={48} height={116} {...sand} />
          <rect x={x - 4} y={872} width={22} height={22} {...sand} />
          <rect x={x + 30} y={872} width={22} height={22} {...sand} />
          <rect x={x + 19} y={916} width={10} height={26} rx={5} fill={color.ink} />
        </g>
      ))}

      {/* The wall between them, and its gate. */}
      <rect x={880} y={936} width={82} height={70} {...sand} />
      <path d="M906,1006 L906,978 Q921,958 936,978 L936,1006 Z" fill={color.ink} />

      {/* The spade, stuck in the sand. */}
      <Limb points={[[1040, 930], [1040, 1004]]} width={9} fill={color.coral} outline={line.mid} />
      <Limb points={[[1026, 928], [1054, 928]]} width={8} fill={color.coral} outline={line.mid} />

      {/* The crab: legs, claws, a coral shell and two eyes on stalks. */}
      <g stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" fill="none">
        <path d={`M${crab - 22},1050 l${-16 - step},10 M${crab - 24},1042 l${-18 + step},-2 M${crab + 22},1050 l${16 + step},10 M${crab + 24},1042 l${18 - step},-2`} />
        <path d={`M${crab - 12},1030 v-14 M${crab + 12},1030 v-14`} />
      </g>
      <circle cx={crab - 34} cy={1024} r={10} fill={color.coral} stroke={color.ink} strokeWidth={line.mid} />
      <circle cx={crab + 34} cy={1024} r={10} fill={color.coral} stroke={color.ink} strokeWidth={line.mid} />
      <ellipse cx={crab} cy={1044} rx={28} ry={18} fill={color.coral} stroke={color.ink} strokeWidth={line.mid} />
      <circle cx={crab - 12} cy={1014} r={6} fill={color.surface} stroke={color.ink} strokeWidth={line.thin} />
      <circle cx={crab + 12} cy={1014} r={6} fill={color.surface} stroke={color.ink} strokeWidth={line.thin} />
    </g>
  )
}
