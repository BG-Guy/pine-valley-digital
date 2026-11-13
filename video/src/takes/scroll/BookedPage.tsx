// The booked page on the customer's phone: a "You're booked!" starburst
// stamps onto a mint screen, followed by the slot and a short note.
import { useCurrentFrame } from 'remotion'
import { StatusBar } from '../../art/ui/StatusBar'
import { Burst } from '../../components/burst/Burst'
import { pop } from '../../timeline/motion'
import { T } from './timeline'

export const BookedPage: React.FC = () => {
  const frame = useCurrentFrame()

  // The starburst rocks between two tilts, like the site's stickers.
  const tilt = Math.floor((frame - T.booked) / 3) % 2 === 0 ? -9 : -3

  return (
    <div className="phone-page bkd">
      <StatusBar />
      <div style={{ scale: String(pop(frame, T.booked)), rotate: `${tilt}deg` }}>
        <Burst size={330} small="You're" big="Booked!" bigSize={24} />
      </div>
      <div className="bkd-when" style={{ scale: String(pop(frame, T.booked + 2)) }}>
        <div className="mono bkd-when-day">Today</div>
        <div className="display bkd-when-time">2:00 PM</div>
      </div>
      <div className="bkd-note" style={{ scale: String(pop(frame, T.booked + 4)) }}>
        See you soon, Sam!
      </div>
    </div>
  )
}
