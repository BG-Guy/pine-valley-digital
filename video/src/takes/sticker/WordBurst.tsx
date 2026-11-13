// A starburst with big words on it: the site's sticker shape, shouting one
// or two lines in the poster type.
import { POINTS } from '../../components/burst/Burst'
import { color, font } from '../../theme/theme'

type WordBurstProps = {
  // Its width and height on the canvas.
  size: number
  fill: string
  // One or two lines.
  lines: string[]
  // The type's size, in the star's own 100-unit box.
  type?: number
}

export const WordBurst: React.FC<WordBurstProps> = ({ size, fill, lines, type = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>
    <polygon points={POINTS} fill={fill} stroke={color.ink} strokeWidth={2.2} strokeLinejoin="round" />
    {lines.map((text, i) => (
      <text
        key={text}
        x={50}
        y={50 + (i - (lines.length - 1) / 2) * type * 0.9 + type * 0.34}
        textAnchor="middle"
        fill={color.ink}
        style={{ font: `800 ${type}px ${font.display}`, fontStretch: '75%', letterSpacing: '-0.01em' }}
      >
        {text.toUpperCase()}
      </text>
    ))}
  </svg>
)
