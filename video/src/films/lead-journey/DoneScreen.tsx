// The done screen of the CRM app: the lead's card turns to "Done", and the
// paid invoice stamps in under it.
import { useCurrentFrame } from 'remotion'
import { LeadCard } from '../../art/ui/LeadCard'
import { Receipt } from '../../art/ui/Receipt'
import { StatusBar } from '../../art/ui/StatusBar'
import { color } from '../../theme/theme'
import { T } from './timeline'

// The card arrives showing "Assigned" and flips to "Done" a beat later.
const DONE_AT = T.doneScreen + 4

export const DoneScreen: React.FC = () => {
  const frame = useCurrentFrame()
  const done = frame >= DONE_AT

  return (
    <div className="phone-page">
      <StatusBar time="3:10" />
      <div className="app-head">
        <span className="app-back">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color.ink} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </span>
        <span className="display app-title">Today's job</span>
      </div>

      <LeadCard frame={frame} status={done ? 3 : 2} statusAt={done ? DONE_AT : 0} />

      <div className="mono app-label">Invoice</div>
      <Receipt frame={frame} at={T.paid} />
    </div>
  )
}
