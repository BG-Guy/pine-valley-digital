// The Scroll version's CRM station: the business's side, in an app window.
// The booking arrives as a notification and a card; the pointer gives it to
// the technician who is free; his van drives the route; the job ends up
// done, with a paid invoice.
import './scroll.css'
import { useCurrentFrame } from 'remotion'
import { Confetti } from '../../art/effects/Confetti'
import { LeadCard } from '../../art/ui/LeadCard'
import { Receipt } from '../../art/ui/Receipt'
import { RouteMap } from '../../art/ui/RouteMap'
import { TechList } from '../../art/ui/TechList'
import { Toast } from '../../art/ui/Toast'
import { color, SIZE } from '../../theme/theme'
import { pop } from '../../timeline/motion'
import { T } from './timeline'

// Where the pointer aims, in frame coordinates: the free technician's row.
export const TECH_TARGET: [number, number] = [846, 306]

// The window's three dots, and the icons down its side (the first is the
// page that's open).
const DOTS = [color.coral, color.lemon, color.mint]
const NAV = [
  'M4 13l2.5-8h11L20 13v6H4z M4 13h5l1 2.5h4l1-2.5h5',
  'M4 7h16v13H4z M4 11.5h16 M8 4v5 M16 4v5',
  'M12 12.5a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4z M4 21a8 8 0 0 1 16 0',
  'M3 7h18v10H3z M12 14.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z',
]

// How many frames the van takes to drive the route.
const DRIVE = T.done - T.drive

export const CrmStation: React.FC = () => {
  const frame = useCurrentFrame()

  // The job's status: booked when it arrives, then assigned, then done.
  const status = frame >= T.done ? 3 : frame >= T.assigned ? 2 : 1
  const statusAt = [0, T.card, T.assigned, T.done][status]

  // The van sets off a beat after the job is assigned and arrives as the
  // job is marked done.
  const progress = Math.min(1, Math.max(0, (frame - T.drive + 1) / DRIVE))

  // The "1 new" counter shows from the notification until a tech has the
  // job.
  const waiting = frame >= T.toast + 2 && frame < T.assigned

  return (
    <>
      <div className="nb-card crm2-window">
        <div className="crm2-bar">
          {DOTS.map((fill) => (
            <i key={fill} className="crm2-dot" style={{ background: fill }} />
          ))}
          <span className="mono crm2-title">CRM · Today</span>
          {waiting && (
            <span className="mono crm2-count" style={{ scale: String(pop(frame, T.toast + 2)) }}>
              1 new
            </span>
          )}
        </div>

        <div className="crm2-body">
          <div className="crm2-side">
            {NAV.map((icon, i) => (
              <span key={icon} className={`crm2-nav${i === 0 ? ' is-on' : ''}`}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </span>
            ))}
          </div>

          <div className="crm2-main">
            {/* Left: the booking's card, then the map of the van's route. */}
            <div className="crm2-col">
              <div className="mono crm2-label">New bookings</div>
              <div className="crm2-slot" style={{ height: 292 }}>
                {frame < T.card && <div className="mono crm2-ghost">Nothing waiting</div>}
                <div style={{ scale: String(pop(frame, T.card)) }}>
                  <LeadCard frame={frame} status={status} statusAt={statusAt} />
                </div>
              </div>
              <div className="mono crm2-label">On the way</div>
              <div className="crm2-slot" style={{ height: 220 }}>
                {frame < T.assigned && <div className="mono crm2-ghost">No route yet</div>}
                <RouteMap progress={progress} style={{ scale: String(pop(frame, T.assigned)) }} />
              </div>
            </div>

            {/* Right: the team, then the invoice once the job is done. */}
            <div className="crm2-col">
              <div className="mono crm2-label">Assign a tech</div>
              <TechList frame={frame} clickAt={T.clickTech} chosenAt={T.assigned} />
              <div className="mono crm2-label">Invoice</div>
              <div className="crm2-slot" style={{ height: 196 }}>
                {frame < T.done + 1 && <div className="mono crm2-ghost">Not yet</div>}
                <Receipt frame={frame} at={T.done + 1} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast frame={frame} at={T.toast} leaveAt={T.card + 5} title="New booking!" note="From your website" style={{ top: 36, right: 30 }} />

      {/* Confetti as the invoice is paid. */}
      <svg width={SIZE} height={SIZE} style={{ position: 'absolute', inset: 0 }}>
        <Confetti x={800} y={700} age={frame - T.done - 3} pieces={16} reach={300} />
      </svg>
    </>
  )
}
