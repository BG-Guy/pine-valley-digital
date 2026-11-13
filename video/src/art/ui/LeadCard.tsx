// The lead's card: the customer's face and name, what they need, a status
// pill, the booked slot and four progress steps. The film tells it which
// status it's on and since when; the pill stamps in again on each change.
import './ui.css'
import type { CSSProperties } from 'react'
import { color } from '../../theme/theme'
import { keyed, pop } from '../../timeline/motion'
import { Avatar } from './Avatar'

// The statuses a lead moves through, in order.
const STATUSES = [
  { label: 'New lead', fill: color.lilac },
  { label: 'Booked', fill: color.mint },
  { label: 'Assigned · Mike', fill: color.lemon },
  { label: 'Done', fill: color.mint },
]

type LeadCardProps = {
  frame: number
  // Which status it's on (0 to 3), and the frame that status began.
  status: number
  statusAt: number
  // Hide the slot until there is one (a brand-new lead has no time yet).
  slot?: boolean
}

export const LeadCard: React.FC<LeadCardProps> = ({ frame, status, statusAt, slot = true }) => {
  const { label, fill } = STATUSES[status]

  return (
    <div className="ui-lead">
      <div className="ui-lead-who">
        <Avatar size={74} fill={color.mint} />
        <div>
          <div className="display ui-lead-name">Sam Rivera</div>
          <div className="ui-lead-need">Leaky pipe · via website</div>
        </div>
      </div>

      <div className="ui-lead-row">
        {/* The status pill, a little crooked as it lands. */}
        <div
          className="nb-pill ui-lead-status"
          style={{ '--pill-bg': fill, scale: String(pop(frame, statusAt)), rotate: `${keyed(frame, statusAt, [-7, 4, -2, 0])}deg` } as CSSProperties}
        >
          {label}
          {status === 3 && (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5l5.5 5.5L20 6.5" />
            </svg>
          )}
        </div>

        {/* The booked slot, as a calendar tile. */}
        <div className="ui-lead-when" style={{ visibility: slot ? 'visible' : 'hidden' }}>
          <div className="mono ui-lead-when-day">Today</div>
          <div className="display ui-lead-when-time">2:00</div>
        </div>
      </div>

      <div className="ui-lead-steps">
        {STATUSES.map((step, i) => (
          <i key={step.label} className={i <= status ? 'is-on' : undefined} />
        ))}
      </div>
    </div>
  )
}
