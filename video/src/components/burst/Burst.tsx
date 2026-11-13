// A starburst sticker: the same 22-point shape as the site's stickers
// (src/components/sticker), with a small mono line over a big word, on a
// hard shadow.
import { color, drop, font } from '../../theme/theme'

// The star's points, in a 100×100 box.
const POINTS =
  '50,2 60.09,12.33 74,8.43 77.58,22.42 91.57,26 87.67,39.91 98,50 87.67,60.09 91.57,74 77.58,77.58 74,91.57 60.09,87.67 50,98 39.91,87.67 26,91.57 22.42,77.58 8.43,74 12.33,60.09 2,50 12.33,39.91 8.43,26 22.42,22.42 26,8.43 39.91,12.33'

type BurstProps = {
  // Width and height on the canvas, in pixels.
  size: number
  fill?: string
  // The small line (optional) and the big word, with the big word's type
  // size in the star's own 100-unit box.
  small?: string
  big: string
  bigSize?: number
}

export const Burst: React.FC<BurstProps> = ({ size, fill = color.coral, small, big, bigSize = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{ display: 'block', overflow: 'visible', filter: `drop-shadow(${drop.small}px ${drop.small}px 0 ${color.ink})` }}
  >
    <polygon points={POINTS} fill={fill} stroke={color.ink} strokeWidth={2.2} strokeLinejoin="round" />
    {small && (
      <text x={50} y={40} textAnchor="middle" fill={color.ink} style={{ font: `700 9px ${font.mono}`, letterSpacing: '0.12em' }}>
        {small.toUpperCase()}
      </text>
    )}
    <text
      x={50}
      y={small ? 63 : 59}
      textAnchor="middle"
      fill={color.ink}
      style={{ font: `800 ${bigSize}px ${font.display}`, fontStretch: '75%', letterSpacing: '-0.01em' }}
    >
      {big.toUpperCase()}
    </text>
  </svg>
)
