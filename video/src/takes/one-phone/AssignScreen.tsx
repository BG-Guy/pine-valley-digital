// The assign screen of the CRM app: the job as one line, the team, and a
// map. The pointer gives the job to the technician who is free; his van
// then drives the route.
import type { CSSProperties } from 'react'
import { useCurrentFrame } from 'remotion'
import { RouteMap } from '../../art/ui/RouteMap'
import { StatusBar } from '../../art/ui/StatusBar'
import { TechList } from '../../art/ui/TechList'
import { color } from '../../theme/theme'
import { pop } from '../../timeline/motion'
import { T } from './timeline'

// How many frames the van takes to drive the route.
const DRIVE = T.doneScreen - T.drive

export const AssignScreen: React.FC = () => {
  const frame = useCurrentFrame()
  const progress = Math.min(1, Math.max(0, (frame - T.drive + 1) / DRIVE))

  return (
    <div className="phone-page">
      <StatusBar time="2:05" />
      <div className="app-head">
        <span className="app-back">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color.ink} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </span>
        <span className="display app-title">Assign a tech</span>
      </div>

      <div className="nb-pill app-job" style={{ '--pill-bg': color.surface } as CSSProperties}>
        Sam Rivera · Today 2:00
      </div>

      <div className="mono app-label">Who's free at 2?</div>
      <TechList frame={frame} clickAt={T.clickTech} chosenAt={T.assigned} />

      {/* The map arrives once the job has a tech. */}
      <RouteMap progress={progress} style={{ marginTop: 22, scale: String(pop(frame, T.assigned)) }} />
    </div>
  )
}
