// The film itself: the lead-to-booked journey as one seamless loop. The
// camera scrolls down a strip of three stations (the beach, the phone, the
// CRM); the step label and the mouse pointer sit on top and don't scroll.
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { Cursor } from '../components/cursor/Cursor'
import { GraphPaper } from '../components/graph-paper/GraphPaper'
import { StepPill } from '../components/step-pill/StepPill'
import { BeachScene } from '../scenes/beach/BeachScene'
import { CrmScene } from '../scenes/crm/CrmScene'
import { PhoneScene } from '../scenes/phone/PhoneScene'
import { cssVars } from '../theme/theme'
import { cameraAt, STATION, stationY, STRIDE } from './camera'
import { cursorAt, cursorVisible } from './cursorPath'

// The stations, in their order down the strip.
const STATIONS = [
  { at: STATION.beach, scene: <BeachScene /> },
  { at: STATION.phone, scene: <PhoneScene /> },
  { at: STATION.crm, scene: <CrmScene /> },
]

export const LeadJourney: React.FC = () => {
  const frame = useCurrentFrame()
  const cameraY = cameraAt(frame)

  return (
    <AbsoluteFill className="film" style={cssVars}>
      <GraphPaper offsetY={-cameraY} />

      {/* Each station that is in the frame, moved to where the camera
          sees it. */}
      {STATIONS.map(({ at, scene }) => {
        const y = stationY(at, cameraY)
        if (Math.abs(y) >= STRIDE) return null
        return (
          <AbsoluteFill key={at} style={{ translate: `0 ${y}px` }}>
            {scene}
          </AbsoluteFill>
        )
      })}

      <StepPill />
      {cursorVisible(frame) && <Cursor {...cursorAt(frame)} />}
    </AbsoluteFill>
  )
}
