// The owner's spot on the beach: the umbrella and the shade it casts, a
// cooler with a drink on its lid, and the striped deck chair. Drawn behind
// the owner. SVG only.
import { Limb } from '../../components/limb/Limb'
import { color, line } from '../../theme/theme'

// The umbrella's canopy, drawn upright: its tip, the height of its hem, how
// far the hem reaches either side of the pole, and how many panels it has.
const APEX = { x: 250, y: 190 }
const HEM = 430
const REACH = 270
const PANELS = 5

// Then the whole umbrella leans this many degrees, about the hem's middle.
const LEAN = 8

// Where each rib meets the hem, left to right.
const tips = Array.from({ length: PANELS + 1 }, (_, i) => APEX.x - REACH + (i * REACH * 2) / PANELS)

// One panel: from the tip down a rib, along the scalloped hem, and back up
// the next rib.
const panel = (i: number) => {
  const [left, right] = [tips[i], tips[i + 1]]
  return `M${APEX.x},${APEX.y} Q${left},${APEX.y} ${left},${HEM} Q${(left + right) / 2},${HEM - 34} ${right},${HEM} Q${right},${APEX.y} ${APEX.x},${APEX.y} Z`
}

// The deck chair's sling hangs from the top of its back bar to the front of
// its seat bar.
const SLING = 'M198,560 C250,760 380,905 602,818'
const cloth = { d: SLING, fill: 'none' } as const

const outline = { stroke: color.ink, strokeWidth: line.heavy, strokeLinejoin: 'round' as const }

export const Camp: React.FC = () => (
  <g>
    {/* The shade on the sand. */}
    <ellipse cx={340} cy={1018} rx={310} ry={26} fill={color.sandDeep} />

    {/* The cooler: a lilac box with a deeper band, a white lid and a latch. */}
    <rect x={30} y={914} width={124} height={88} rx={12} fill={color.lilac} />
    <path d="M30,966 H154 V990 a12,12 0 0 1 -12,12 H42 a12,12 0 0 1 -12,-12 Z" fill={color.lilacDeep} />
    <rect x={30} y={914} width={124} height={88} rx={12} fill="none" {...outline} />
    <rect x={24} y={892} width={136} height={28} rx={10} fill={color.surface} {...outline} />
    <rect x={84} y={910} width={16} height={20} rx={4} fill={color.ink} />

    {/* The drink on its lid: a glass, a straw and a slice of lemon. */}
    <line x1={118} y1={872} x2={134} y2={812} stroke={color.ink} strokeWidth={13} strokeLinecap="round" />
    <line x1={118} y1={872} x2={134} y2={812} stroke={color.lemon} strokeWidth={5} strokeLinecap="round" />
    <path d="M90,836 L130,836 L124,892 L96,892 Z" fill={color.surface} stroke={color.ink} strokeWidth={line.mid} strokeLinejoin="round" />
    <path d="M94,860 L127,860 L124,889 L97,889 Z" fill={color.coral} />
    <circle cx={92} cy={834} r={13} fill={color.lemon} stroke={color.ink} strokeWidth={5} />

    {/* The umbrella: an ink pole with a collar, lemon and white panels,
        and a knob on the end of each rib. */}
    <g transform={`rotate(${LEAN} ${APEX.x} ${HEM})`} stroke={color.ink} strokeLinejoin="round" strokeLinecap="round">
      <line x1={APEX.x} y1={APEX.y} x2={APEX.x} y2={1016} strokeWidth={16} />
      <rect x={APEX.x - 14} y={HEM + 6} width={28} height={22} rx={6} fill={color.surface} strokeWidth={line.mid} />
      {Array.from({ length: PANELS }, (_, i) => (
        <path key={i} d={panel(i)} fill={i % 2 === 0 ? color.lemon : color.surface} strokeWidth={line.heavy} />
      ))}
      {tips.map((x) => (
        <circle key={x} cx={x} cy={HEM} r={7} fill={color.ink} stroke="none" />
      ))}
      <circle cx={APEX.x} cy={APEX.y - 6} r={12} fill={color.ink} stroke="none" />
    </g>

    {/* The deck chair: two crossed white bars, and a sling striped coral
        and cream. */}
    <Limb points={[[235, 1002], [610, 812]]} width={20} fill={color.surface} />
    <Limb points={[[190, 548], [545, 1002]]} width={20} fill={color.surface} />
    <path {...cloth} stroke={color.ink} strokeWidth={46} strokeLinecap="round" />
    <path {...cloth} stroke={color.coral} strokeWidth={30} strokeLinecap="round" />
    <path {...cloth} stroke={color.surface} strokeWidth={30} strokeDasharray="22 30" />
  </g>
)
