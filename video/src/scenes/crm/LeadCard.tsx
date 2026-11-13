// The booking's card in the CRM. It stamps into its slot as "New", then its
// status pill and progress steps move on as the job is assigned, worked and
// done, and a "Paid" starburst lands on it at the end.
import type { CSSProperties } from 'react'
import { useCurrentFrame } from 'remotion'
import { Burst } from '../../components/burst/Burst'
import { color } from '../../theme/theme'
import { keyed, pop } from '../../timeline/motion'
import { T } from '../../timeline/timeline'

// The job's statuses: the frame each begins on, its label and pill colour.
const STATUSES = [
  { at: T.leadCard, label: 'New', fill: color.lilac },
  { at: T.assigned, label: 'Assigned · Mike', fill: color.lemon },
  { at: T.onTheJob, label: 'On the job', fill: color.coral },
  { at: T.done, label: 'Done', fill: color.mint },
]

// The starburst lands a beat after the status turns to "Done".
const PAID_AT = T.done + 2

export const LeadCard: React.FC = () => {
  const frame = useCurrentFrame()
  const index = Math.max(0, STATUSES.findLastIndex((status) => frame >= status.at))
  const status = STATUSES[index]

  return (
    <div className="crm-slot">
      {/* The empty slot, until the booking arrives. */}
      {frame < T.leadCard && <div className="mono crm-slot-empty">Nothing waiting</div>}

      <div className="lead-card" style={{ scale: String(pop(frame, T.leadCard)) }}>
        <div>
          {/* The status pill stamps in again, a little crooked, on every
              change. */}
          <div
            className="nb-pill lead-status"
            style={
              {
                '--pill-bg': status.fill,
                scale: String(pop(frame, status.at)),
                rotate: `${keyed(frame, status.at, [-7, 4, -2, 0])}deg`,
                transformOrigin: '0 50%',
              } as CSSProperties
            }
          >
            {status.label}
            {status.label === 'Done' && (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12.5l5.5 5.5L20 6.5" />
              </svg>
            )}
          </div>
          <div className="display lead-name">Sam Rivera</div>
          <div className="lead-meta">Leaky pipe · via website</div>
          <div className="lead-steps">
            {STATUSES.map((step, i) => (
              <i key={step.label} className={i <= index ? 'is-on' : undefined} />
            ))}
          </div>
        </div>

        {/* The booked slot, and the starburst that stamps over it. */}
        <div className="lead-when">
          <div className="mono lead-when-day">Today</div>
          <div className="display lead-when-time">2:00</div>
          <div className="mono lead-when-pm">PM</div>
          <div
            className="lead-paid"
            style={{
              scale: String(pop(frame, PAID_AT)),
              rotate: `${frame < PAID_AT ? 0 : keyed(frame, PAID_AT, [26, 8, 15, 12])}deg`,
            }}
          >
            <Burst size={196} fill={color.lemon} small="Paid" big="$240" bigSize={31} />
          </div>
        </div>
      </div>
    </div>
  )
}
