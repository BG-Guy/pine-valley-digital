// The phone station: the hand-held phone drops into the frame, then its
// screen plays the customer's side of the story. Search, open the top
// result, fill in the booking form, booked.
import { useCurrentFrame } from 'remotion'
import { keyed } from '../../timeline/motion'
import { T } from '../../timeline/timeline'
import { BookedScreen } from './BookedScreen'
import { BookingScreen } from './BookingScreen'
import { HandWithPhone, PHONE } from './HandWithPhone'
import { SearchScreen } from './SearchScreen'

// Where the handset rests in the frame (its top-left corner).
const REST = { x: 300, y: 36 }
const SCREEN_WIDTH = PHONE.width - PHONE.bezel * 2

// Where the pointer aims, in frame coordinates: the top search result and
// the "Book now" button.
export const RESULT_TARGET: [number, number] = [596, 392]
export const BOOK_TARGET: [number, number] = [604, 744]

// The drop, frame by frame: it falls in from above the frame, sinks a
// little as it lands, bounces and settles, rocking as it goes.
const DROP_Y = [-900, -480, -160, 0, 34, -12, 0]
const DROP_TILT = [-9, -7, -4, -1, 2, -1, 0]

// The tap-through from search to the booking page: how far the pages have
// slid, frame by frame.
const SLIDE = [0.34, 0.72, 0.95, 1]

export const PhoneScene: React.FC = () => {
  const frame = useCurrentFrame()

  // Nothing to draw until the drop begins.
  if (frame < T.phoneDrop) return null

  const slide = frame < T.bookingPage ? 0 : keyed(frame, T.bookingPage, SLIDE)

  return (
    <div
      style={{
        position: 'absolute',
        left: REST.x,
        top: REST.y,
        transform: `translateY(${keyed(frame, T.phoneDrop, DROP_Y)}px) rotate(${keyed(frame, T.phoneDrop, DROP_TILT)}deg)`,
        transformOrigin: '50% 100%',
      }}
    >
      <HandWithPhone>
        {frame >= T.booked ? (
          <BookedScreen />
        ) : (
          <>
            {/* The search page slides off to the left as the booking page
                comes in from the right. */}
            {slide < 1 && (
              <div style={{ position: 'absolute', inset: 0, translate: `${-slide * SCREEN_WIDTH}px 0` }}>
                <SearchScreen />
              </div>
            )}
            {slide > 0 && (
              <div style={{ position: 'absolute', inset: 0, translate: `${(1 - slide) * SCREEN_WIDTH}px 0` }}>
                <BookingScreen />
              </div>
            )}
          </>
        )}
      </HandWithPhone>
    </div>
  )
}
