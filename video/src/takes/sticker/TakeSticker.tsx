// The Sticker strip version: the journey as a comic strip. After the beach,
// the camera pans across four bold panels (New lead!, Booked!, On it!,
// Done!) made of die-cut stickers, halftone dots and speed lines, and comes
// back round to the beach. No pointer and no corner label: the panels
// shout their own names.
import './sticker.css'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { BeachScene } from '../../art/beach/BeachScene'
import { PrintDefs } from '../../art/effects/PrintDefs'
import { GraphPaper } from '../../components/graph-paper/GraphPaper'
import { cssVars } from '../../theme/theme'
import { cameraAt, stationOffset, STRIDE } from '../strip'
import { BookedPanel } from './BookedPanel'
import { DonePanel } from './DonePanel'
import { LeadPanel } from './LeadPanel'
import { OnItPanel } from './OnItPanel'
import { BEACH, T } from './timeline'

export const TakeSticker: React.FC = () => {
  const frame = useCurrentFrame()
  const camera = cameraAt(frame, [T.toLead, T.toBooked, T.toOnIt, T.toDone, T.toBeach])

  // The panels, in their order along the strip. Each counts its own frames
  // from when its beat begins.
  const panels = [
    <div key="beach" className="panel">
      <BeachScene clock={BEACH.clock(frame)} beats={BEACH.beats} />
    </div>,
    <LeadPanel key="lead" t={frame - T.lead} />,
    <BookedPanel key="booked" t={frame - T.booked} />,
    <OnItPanel key="onIt" t={frame - T.onIt} />,
    <DonePanel key="done" t={frame - T.done} />,
  ]

  return (
    <AbsoluteFill className="film" style={cssVars}>
      <GraphPaper offsetY={0} offsetX={-camera} />
      <PrintDefs />

      {/* Each panel that is in the frame, moved to where the camera sees
          it. */}
      {panels.map((panel, i) => {
        const x = stationOffset(i, camera, panels.length)
        if (Math.abs(x) >= STRIDE) return null
        return (
          <AbsoluteFill key={i} style={{ translate: `${x}px 0` }}>
            {panel}
          </AbsoluteFill>
        )
      })}
    </AbsoluteFill>
  )
}
