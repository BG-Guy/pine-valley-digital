// The lock screen on the owner's phone: the time over a little valley
// wallpaper. The new lead drops in as a notification with a ringing bell,
// and the pointer taps it. This is where the lead comes in.
import { useCurrentFrame } from 'remotion'
import { StatusBar } from '../../art/ui/StatusBar'
import { color, line } from '../../theme/theme'
import { keyed, press } from '../../timeline/motion'
import { T } from './timeline'

// The notification's drop, frame by frame, and its bell's swing.
const DROP_Y = [-420, -160, 20, -8, 0]
const RING = [0, 0, 0, 20, -18, 14, -10, 6, 0]

export const LockScreen: React.FC = () => {
  const frame = useCurrentFrame()

  // The tap sinks the notification into its shadow.
  const pressed = press(frame, T.clickNote) * 8

  return (
    <div className="phone-page lock">
      <StatusBar time="2:04" />
      <div className="display lock-time">2:04</div>
      <div className="mono lock-date">Tuesday · Beach day</div>

      {/* The wallpaper's valley: two hills and a pine. */}
      <svg className="lock-valley" width="444" height="250" viewBox="0 0 444 250">
        <path d="M-10,250 V150 Q110,60 250,150 T460,120 V250 Z" fill={color.mint} stroke={color.ink} strokeWidth={line.mid} />
        <path d="M-10,250 V200 Q150,130 300,200 T460,190 V250 Z" fill={color.mintDeep} stroke={color.ink} strokeWidth={line.mid} />
        <g fill={color.ink}>
          <path d="M330,60 L362,112 H298 Z M330,92 L370,150 H290 Z" />
          <rect x={323} y={148} width={14} height={30} />
        </g>
      </svg>

      {/* The notification. */}
      {frame >= T.notify && (
        <div
          className="lock-note"
          style={{
            translate: `${pressed}px ${keyed(frame, T.notify, DROP_Y) + pressed}px`,
            boxShadow: `${8 - pressed}px ${8 - pressed}px 0 ${color.ink}`,
          }}
        >
          <span className="lock-app">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill={color.surface}
              stroke={color.ink}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ rotate: `${keyed(frame, T.notify, RING)}deg`, transformOrigin: '50% 10%' }}
            >
              <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l2 2H4z" />
              <path d="M10 21a2.2 2.2 0 0 0 4 0" fill="none" />
            </svg>
          </span>
          <div>
            <div className="mono lock-note-app">CRM · now</div>
            <div className="lock-note-text">New lead: Sam Rivera</div>
            <div className="lock-note-sub">Leaky pipe · via your website</div>
          </div>
        </div>
      )}
    </div>
  )
}
