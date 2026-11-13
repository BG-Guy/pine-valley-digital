// A four-point sparkle, the little star that dots the site's illustrations.
// SVG only.
import { color, line } from '../../theme/theme'

type SparkleProps = {
  // Its centre, and how far each point reaches.
  x: number
  y: number
  size: number
  fill?: string
}

export const Sparkle: React.FC<SparkleProps> = ({ x, y, size: s, fill = color.surface }) => {
  // How far in the sides are pinched between the points.
  const pinch = s * 0.16

  return (
    <path
      d={`M${x},${y - s} Q${x + pinch},${y - pinch} ${x + s},${y} Q${x + pinch},${y + pinch} ${x},${y + s} Q${x - pinch},${y + pinch} ${x - s},${y} Q${x - pinch},${y - pinch} ${x},${y - s} Z`}
      fill={fill}
      stroke={color.ink}
      strokeWidth={line.thin}
      strokeLinejoin="round"
    />
  )
}
