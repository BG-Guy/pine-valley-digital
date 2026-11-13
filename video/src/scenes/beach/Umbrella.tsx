// The beach umbrella behind the owner's chair: lemon and white panels on
// an ink pole, leaning toward the sun.
import { color, line } from '../../theme/theme'

// The canopy, drawn upright: its tip, the height of its hem, how far the
// hem reaches either side of the pole, and how many panels it has.
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

export const Umbrella: React.FC = () => (
  <g transform={`rotate(${LEAN} ${APEX.x} ${HEM})`} stroke={color.ink} strokeLinejoin="round" strokeLinecap="round">
    <line x1={APEX.x} y1={APEX.y} x2={APEX.x} y2={1016} strokeWidth={16} />
    {Array.from({ length: PANELS }, (_, i) => (
      <path key={i} d={panel(i)} fill={i % 2 === 0 ? color.lemon : color.surface} strokeWidth={line.heavy} />
    ))}
    <circle cx={APEX.x} cy={APEX.y - 6} r={12} fill={color.ink} />
  </g>
)
