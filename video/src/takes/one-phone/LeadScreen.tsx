// The lead screen of the CRM app: the new lead's card, a row of time slots
// and a "Book it" button. The pointer picks 2:00 and books the visit.
import { useCurrentFrame } from 'remotion'
import { LeadCard } from '../../art/ui/LeadCard'
import { SlotChips } from '../../art/ui/SlotChips'
import { StatusBar } from '../../art/ui/StatusBar'
import { color } from '../../theme/theme'
import { press } from '../../timeline/motion'
import { T } from './timeline'

export const LeadScreen: React.FC = () => {
  const frame = useCurrentFrame()

  // The lead is new until the button is clicked, then booked.
  const booked = frame >= T.booked
  const pressed = press(frame, T.clickBook) * 10

  return (
    <div className="phone-page">
      <StatusBar time="2:04" />
      <div className="app-head">
        <span className="app-back">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color.ink} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </span>
        <span className="display app-title">New lead</span>
      </div>

      <LeadCard frame={frame} status={booked ? 1 : 0} statusAt={booked ? T.booked : T.leadScreen + 2} slot={frame >= T.clickSlot} />

      <div className="mono app-label">Pick a time today</div>
      <SlotChips frame={frame} clickAt={T.clickSlot} />

      {/* The button turns mint once the visit is booked. */}
      <div
        className="display app-button"
        style={{
          background: booked ? color.mint : undefined,
          translate: `${pressed}px ${pressed}px`,
          boxShadow: `${10 - pressed}px ${10 - pressed}px 0 ${color.ink}`,
        }}
      >
        {booked ? 'Booked' : 'Book it'}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d={booked ? 'M4 12.5l5.5 5.5L20 6.5' : 'M5 12h14M13 6l6 6-6 6'} />
        </svg>
      </div>
    </div>
  )
}
