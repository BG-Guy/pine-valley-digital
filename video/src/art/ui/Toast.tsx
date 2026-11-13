// A notification toast: a lemon card that drops in with its bell ringing,
// then pops away. The film says when it arrives and leaves, and where it
// sits.
import './ui.css'
import type { CSSProperties } from 'react'
import { color } from '../../theme/theme'
import { keyed, popOut } from '../../timeline/motion'

// The drop, frame by frame, and the bell's swing after it lands.
const DROP_Y = [-300, -110, 18, -6, 0]
const RING = [0, 0, 0, 18, -16, 13, -9, 5, 0]

type ToastProps = {
  frame: number
  // The frames it drops in and pops away.
  at: number
  leaveAt: number
  title: string
  note: string
  // Where it sits (top, right…).
  style: CSSProperties
}

export const Toast: React.FC<ToastProps> = ({ frame, at, leaveAt, title, note, style }) => {
  if (frame < at || frame >= leaveAt + 3) return null

  return (
    <div className="ui-toast" style={{ ...style, translate: `0 ${keyed(frame, at, DROP_Y)}px`, scale: String(popOut(frame, leaveAt)) }}>
      <svg
        width="72"
        height="72"
        viewBox="0 0 24 24"
        fill={color.surface}
        stroke={color.ink}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ rotate: `${keyed(frame, at, RING)}deg`, transformOrigin: '50% 10%' }}
      >
        <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l2 2H4z" />
        <path d="M10 21a2.2 2.2 0 0 0 4 0" fill="none" />
      </svg>
      <div>
        <div className="display ui-toast-title">{title}</div>
        <div className="mono ui-toast-note">{note}</div>
      </div>
    </div>
  )
}
