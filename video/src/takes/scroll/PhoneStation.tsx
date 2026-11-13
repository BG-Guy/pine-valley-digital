// The Scroll version's phone station: the customer's phone drops into the
// frame, held in a hand, already on the business's booking page. The form
// fills in, a slot is picked, and the visit is booked with a burst of
// confetti.
import './scroll.css'
import { useCurrentFrame } from 'remotion'
import { Confetti } from '../../art/effects/Confetti'
import { Sparkle } from '../../art/effects/Sparkle'
import { HandWithPhone } from '../../scenes/phone/HandWithPhone'
import { SIZE } from '../../theme/theme'
import { keyed } from '../../timeline/motion'
import { BookedPage } from './BookedPage'
import { BookingPage } from './BookingPage'
import { T } from './timeline'

// Where the handset rests in the frame (its top-left corner).
const REST = { x: 300, y: 36 }

// Where the pointer aims, in frame coordinates: the 2:00 slot and the
// "Book now" button.
export const SLOT_TARGET: [number, number] = [556, 644]
export const BOOK_TARGET: [number, number] = [596, 740]

// The drop, frame by frame: it falls in from above the frame, sinks a
// little as it lands, bounces and settles, rocking as it goes.
const DROP_Y = [-900, -480, -160, 0, 34, -12, 0]
const DROP_TILT = [-9, -7, -4, -1, 2, -1, 0]

// Sparkles that twinkle round the phone once it's booked.
const SPARKLES: [number, number, number][] = [
  [236, 250, 34],
  [856, 196, 26],
  [884, 600, 38],
  [204, 660, 24],
]

export const PhoneStation: React.FC = () => {
  const frame = useCurrentFrame()

  // Nothing to draw until the drop begins.
  if (frame < T.phoneDrop) return null

  const sinceBooked = frame - T.booked

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: REST.x,
          top: REST.y,
          transform: `translateY(${keyed(frame, T.phoneDrop, DROP_Y)}px) rotate(${keyed(frame, T.phoneDrop, DROP_TILT)}deg)`,
          transformOrigin: '50% 100%',
        }}
      >
        <HandWithPhone>{sinceBooked >= 0 ? <BookedPage /> : <BookingPage />}</HandWithPhone>
      </div>

      {/* Over the phone: confetti as the booking lands, then sparkles that
          take turns to show. */}
      <svg width={SIZE} height={SIZE} style={{ position: 'absolute', inset: 0 }}>
        <Confetti x={540} y={400} age={sinceBooked - 1} pieces={18} reach={380} />
        {sinceBooked >= 2 &&
          SPARKLES.map(([x, y, size], i) => (Math.floor((frame + i * 2) / 3) % 2 === 0 ? <Sparkle key={i} x={x} y={y} size={size} /> : null))}
      </svg>
    </>
  )
}
