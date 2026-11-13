// The mouse pointer: a plain arrow in the theme's ink line, on a hard
// shadow. While pressed it shrinks a touch and throws three short click
// lines from its tip.
import { color } from '../../theme/theme'

// The arrow is drawn in a 24-unit box at four times the size; its tip sits
// at (3, 2) in that box.
const SCALE = 4
const TIP = { x: 3, y: 2 }

// The click lines: three short strokes fanning up and left of the tip.
const CLICK_LINES = ['M0.4 -0.6 L-1 -4.4', 'M-1.1 0.9 L-4.2 -1.8', 'M-1.4 2.6 L-5.2 2.2']

type CursorProps = {
  // Where the arrow's tip points, in frame coordinates.
  x: number
  y: number
  pressed: boolean
}

export const Cursor: React.FC<CursorProps> = ({ x, y, pressed }) => (
  <svg
    width={24 * SCALE}
    height={24 * SCALE}
    viewBox="0 0 24 24"
    style={{
      position: 'absolute',
      left: x - TIP.x * SCALE,
      top: y - TIP.y * SCALE,
      overflow: 'visible',
      scale: pressed ? '0.86' : '1',
      transformOrigin: `${TIP.x * SCALE}px ${TIP.y * SCALE}px`,
      filter: `drop-shadow(6px 6px 0 ${color.ink})`,
    }}
  >
    <path
      d="M3 2 L3 20 L8 15.5 L11 22.5 L14 21.2 L11 14.2 L17.5 14.2 Z"
      fill={color.surface}
      stroke={color.ink}
      strokeWidth={1.7}
      strokeLinejoin="round"
    />
    {pressed && (
      <g stroke={color.ink} strokeWidth={1.5} strokeLinecap="round">
        {CLICK_LINES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    )}
  </svg>
)
