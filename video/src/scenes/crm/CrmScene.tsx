// The CRM station: the business's side of the story, in an app window. The
// booking arrives as a notification and a card; the pointer assigns it to a
// technician for that day; the job runs and ends up done and paid.
import './crm.css'
import { useCurrentFrame } from 'remotion'
import { color } from '../../theme/theme'
import { pop } from '../../timeline/motion'
import { T } from '../../timeline/timeline'
import { LeadCard } from './LeadCard'
import { TechChips } from './TechChips'
import { Toast } from './Toast'

// Where the pointer aims, in frame coordinates: the free technician's chip.
export const TECH_TARGET: [number, number] = [332, 784]

// The window's three dots, in the theme's fills.
const DOTS = [color.coral, color.lemon, color.mint]

export const CrmScene: React.FC = () => {
  const frame = useCurrentFrame()

  // The "1 new" counter shows from the notification until a tech has the
  // job.
  const waiting = frame >= T.toast + 2 && frame < T.assigned

  return (
    <>
      <div className="nb-card crm-window">
        <div className="crm-bar">
          {DOTS.map((fill) => (
            <i key={fill} className="crm-dot" style={{ background: fill }} />
          ))}
          <span className="mono crm-title">CRM · Today</span>
          {waiting && (
            <span className="mono crm-count" style={{ scale: String(pop(frame, T.toast + 2)) }}>
              1 new
            </span>
          )}
        </div>
        <div className="crm-body">
          <div className="mono crm-label">New bookings</div>
          <LeadCard />
          <div className="mono crm-label">Assign a tech</div>
          <TechChips />
        </div>
      </div>
      <Toast />
    </>
  )
}
