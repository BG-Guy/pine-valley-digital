// The "New booking" notification: a lemon toast that drops onto the CRM
// window's top corner with its bell ringing, then pops away once the
// booking's card has landed.
import { useCurrentFrame } from 'remotion'
import { color } from '../../theme/theme'
import { keyed, popOut } from '../../timeline/motion'
import { T } from '../../timeline/timeline'

// The drop, frame by frame, and the bell's swing after it lands.
const DROP_Y = [-300, -110, 18, -6, 0]
const RING = [0, 0, 0, 18, -16, 13, -9, 5, 0]

// The toast leaves a few frames after the card arrives.
const LEAVE = T.leadCard + 5

export const Toast: React.FC = () => {
  const frame = useCurrentFrame()
  if (frame < T.toast || frame >= LEAVE + 3) return null

  return (
    <div className="toast" style={{ translate: `0 ${keyed(frame, T.toast, DROP_Y)}px`, scale: String(popOut(frame, LEAVE)) }}>
      <svg
        width="72"
        height="72"
        viewBox="0 0 24 24"
        fill={color.surface}
        stroke={color.ink}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ rotate: `${keyed(frame, T.toast, RING)}deg`, transformOrigin: '50% 10%' }}
      >
        <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l2 2H4z" />
        <path d="M10 21a2.2 2.2 0 0 0 4 0" fill="none" />
      </svg>
      <div>
        <div className="display toast-title">New booking!</div>
        <div className="mono toast-note">From your website</div>
      </div>
    </div>
  )
}
