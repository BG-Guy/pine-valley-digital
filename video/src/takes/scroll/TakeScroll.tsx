// The Scroll version: the closest to the first film. The camera scrolls
// down a strip of three stations: the beach, a customer's phone on the
// booking page (where the lead comes in), and the CRM. The phase label and
// the mouse pointer sit on top and don't scroll.
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { BeachScene } from '../../art/beach/BeachScene'
import { Cursor } from '../../components/cursor/Cursor'
import { GraphPaper } from '../../components/graph-paper/GraphPaper'
import { PhaseLabel, type Phase } from '../../components/phase-label/PhaseLabel'
import { color, cssVars } from '../../theme/theme'
import { pointerAt, type PointerMove } from '../pointer'
import { cameraAt, stationOffset, STRIDE } from '../strip'
import { CrmStation, TECH_TARGET } from './CrmStation'
import { BOOK_TARGET, PhoneStation, SLOT_TARGET } from './PhoneStation'
import { BEACH, T } from './timeline'

// The four phases the label names.
const PHASES: Phase[] = [
  { at: T.phoneDrop + 4, name: 'New lead', fill: color.lilac, icon: 'lead' },
  { at: T.booked, name: 'Booked', fill: color.mint, icon: 'booked' },
  { at: T.assigned, name: 'Assigned', fill: color.lemon, icon: 'assigned' },
  { at: T.done, name: 'Done', fill: color.mint, icon: 'done' },
]

// The pointer: it waits off the frame's right edge, picks the slot, books,
// steps clear of the phone, assigns the tech, and leaves before the beach.
const HOME: [number, number] = [1150, 830]
const MOVES: PointerMove[] = [
  { at: T.toSlot, to: SLOT_TARGET, frames: 4 },
  { at: T.toBook, to: BOOK_TARGET, frames: 4 },
  { at: T.booked + 3, to: [910, 880], frames: 4 },
  { at: T.toTech, to: TECH_TARGET, frames: 5 },
  { at: T.assigned + 2, to: [936, 940], frames: 4 },
  { at: T.toBeach, to: [1160, 1010], frames: 4 },
]
const CLICKS = [T.clickSlot, T.clickBook, T.clickTech]

export const TakeScroll: React.FC = () => {
  const frame = useCurrentFrame()
  const camera = cameraAt(frame, [T.toPhone, T.toCrm, T.toBeach])
  const pointer = pointerAt(frame, HOME, MOVES, CLICKS)

  // The stations, in their order down the strip.
  const stations = [<BeachScene key="beach" clock={BEACH.clock(frame)} beats={BEACH.beats} />, <PhoneStation key="phone" />, <CrmStation key="crm" />]

  return (
    <AbsoluteFill className="film" style={cssVars}>
      <GraphPaper offsetY={-camera} />

      {/* Each station that is in the frame, moved to where the camera
          sees it. */}
      {stations.map((scene, i) => {
        const y = stationOffset(i, camera, stations.length)
        if (Math.abs(y) >= STRIDE) return null
        return (
          <AbsoluteFill key={i} style={{ translate: `0 ${y}px` }}>
            {scene}
          </AbsoluteFill>
        )
      })}

      <PhaseLabel phases={PHASES} leaveAt={T.toBeach} />
      {pointer.visible && <Cursor x={pointer.x} y={pointer.y} pressed={pointer.pressed} />}
    </AbsoluteFill>
  )
}
