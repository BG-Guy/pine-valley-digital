// A limb: a thick, round-ended line through a few joints, drawn twice (ink
// underneath, colour on top) so it carries the same ink outline as every
// other shape. Used for arms, legs and anything else that bends. SVG only.
import { color, line } from '../../theme/theme'

type LimbProps = {
  // The joints it passes through, in order.
  points: [number, number][]
  // Its thickness inside the outline, and its colour.
  width: number
  fill: string
  outline?: number
}

export const Limb: React.FC<LimbProps> = ({ points, width, fill, outline = line.heavy }) => {
  const stroke = {
    d: `M${points.map(([x, y]) => `${x},${y}`).join(' L')}`,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const

  return (
    <>
      <path {...stroke} stroke={color.ink} strokeWidth={width + outline * 2} />
      <path {...stroke} stroke={fill} strokeWidth={width} />
    </>
  )
}
