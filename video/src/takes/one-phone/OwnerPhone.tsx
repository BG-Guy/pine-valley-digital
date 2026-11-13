// The owner's phone, close up, in his own hand (the lilac blazer sleeve).
// It pops in when the camera reaches it, buzzes as the lead arrives, plays
// the CRM app's screens one after another, and shrinks away when the
// camera pulls back.
import './one-phone.css'
import { useCurrentFrame } from 'remotion'
import { Confetti } from '../../art/effects/Confetti'
import { Sparkle } from '../../art/effects/Sparkle'
import { HandWithPhone, PHONE } from '../../scenes/phone/HandWithPhone'
import { color, SIZE } from '../../theme/theme'
import { keyed } from '../../timeline/motion'
import { AssignScreen } from './AssignScreen'
import { DoneScreen } from './DoneScreen'
import { LeadScreen } from './LeadScreen'
import { LockScreen } from './LockScreen'
import { T } from './timeline'

// Where the handset rests in the frame (its top-left corner).
const REST = { x: 300, y: 36 }
const SCREEN_WIDTH = PHONE.width - PHONE.bezel * 2

// Where the pointer aims, in frame coordinates: the notification, the 2:00
// slot, the "Book it" button and the free technician's row.
export const NOTE_TARGET: [number, number] = [612, 474]
export const SLOT_TARGET: [number, number] = [556, 576]
export const BOOK_TARGET: [number, number] = [600, 672]
export const TECH_TARGET: [number, number] = [650, 352]

// The screens, in order, with the frame each slides in on.
const SCREENS = [
  { at: T.phoneIn, screen: <LockScreen /> },
  { at: T.leadScreen, screen: <LeadScreen /> },
  { at: T.assignScreen, screen: <AssignScreen /> },
  { at: T.doneScreen, screen: <DoneScreen /> },
]

// A slide from one screen to the next: how far the pages have moved, frame
// by frame, as a share of the screen's width.
const SLIDE = [0.34, 0.72, 0.95, 1]
const slid = (frame: number, at: number) => (frame < at ? 0 : keyed(frame, at, SLIDE))

// The phone's size as it pops in and as it shrinks away, and its shake
// while the notification buzzes.
const POP_IN = [0.8, 1.06, 0.98, 1]
const SHRINK = [0.92, 0.72]
const BUZZ = [0, -12, 12, -9, 9, -5, 5, 0]

// Sparkles that twinkle round the phone once the invoice is paid.
const SPARKLES: [number, number, number][] = [
  [236, 250, 34],
  [856, 196, 26],
  [884, 600, 38],
  [204, 660, 24],
]

export const OwnerPhone: React.FC = () => {
  const frame = useCurrentFrame()

  // On screen from the end of the zoom in until two frames into the zoom
  // out.
  if (frame < T.phoneIn || frame >= T.toBeach + SHRINK.length) return null

  const scale = frame >= T.toBeach ? keyed(frame, T.toBeach, SHRINK) : keyed(frame, T.phoneIn, POP_IN)
  const shake = frame >= T.notify ? keyed(frame, T.notify, BUZZ) : 0

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: REST.x,
          top: REST.y,
          transform: `translateX(${shake}px) scale(${scale})`,
          transformOrigin: '50% 60%',
        }}
      >
        <HandWithPhone sleeve={color.lilac}>
          {SCREENS.map(({ at, screen }, i) => {
            // A screen slides in from the right, and off to the left when
            // the next one arrives.
            const next = SCREENS[i + 1]?.at ?? Infinity
            if (frame < at || frame >= next + SLIDE.length) return null
            const offset = (i === 0 ? 0 : 1 - slid(frame, at)) - slid(frame, next)
            return (
              <div key={at} style={{ position: 'absolute', inset: 0, translate: `${offset * SCREEN_WIDTH}px 0` }}>
                {screen}
              </div>
            )
          })}
        </HandWithPhone>
      </div>

      {/* Over the phone: confetti when the visit is booked and when the
          invoice is paid, then sparkles. */}
      <svg width={SIZE} height={SIZE} style={{ position: 'absolute', inset: 0 }}>
        <Confetti x={540} y={520} age={frame - T.booked - 1} pieces={18} reach={380} />
        <Confetti x={540} y={560} age={frame - T.paid - 3} pieces={18} reach={380} />
        {frame >= T.paid + 4 &&
          SPARKLES.map(([x, y, size], i) => (Math.floor((frame + i * 2) / 3) % 2 === 0 ? <Sparkle key={i} x={x} y={y} size={size} /> : null))}
      </svg>
    </>
  )
}
