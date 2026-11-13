// The phone's last page: the booking is confirmed. A "Booked!" starburst
// stamps onto a mint screen, followed by the slot and a short note.
import { useCurrentFrame } from 'remotion'
import { Burst } from '../../components/burst/Burst'
import { pop } from '../../timeline/motion'
import { T } from '../../timeline/timeline'

export const BookedScreen: React.FC = () => {
  const frame = useCurrentFrame()

  // The starburst rocks between two tilts, like the site's stickers.
  const tilt = Math.floor((frame - T.booked) / 3) % 2 === 0 ? -9 : -3

  return (
    <div className="phone-page booked">
      <div style={{ scale: String(pop(frame, T.booked)), rotate: `${tilt}deg` }}>
        <Burst size={372} small="You're" big="Booked!" bigSize={24} />
      </div>
      <div className="nb-pill booked-when" style={{ scale: String(pop(frame, T.booked + 2)) }}>
        Today · 2:00 PM
      </div>
      <div className="booked-note" style={{ scale: String(pop(frame, T.booked + 4)) }}>
        See you soon, Sam!
      </div>
    </div>
  )
}
