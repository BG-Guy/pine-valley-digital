// The One phone version: the whole job happens on the owner's own phone.
// It buzzes on the beach, he takes it out, and the camera pushes into it.
// The lead arrives as a notification, then the CRM app books it, assigns
// it and shows it done and paid. The camera pulls back out to the beach,
// and he pockets the phone.
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { BeachScene } from '../../art/beach/BeachScene'
import { Cursor } from '../../components/cursor/Cursor'
import { GraphPaper } from '../../components/graph-paper/GraphPaper'
import { PhaseLabel, type Phase } from '../../components/phase-label/PhaseLabel'
import { color, cssVars } from '../../theme/theme'
import { keyed } from '../../timeline/motion'
import { pointerAt, type PointerMove } from '../pointer'
import { BOOK_TARGET, NOTE_TARGET, OwnerPhone, SLOT_TARGET, TECH_TARGET } from './OwnerPhone'
import { BEACH, T } from './timeline'

// The four phases the label names.
const PHASES: Phase[] = [
  { at: T.notify + 2, name: 'New lead', fill: color.lilac, icon: 'lead' },
  { at: T.booked, name: 'Booked', fill: color.mint, icon: 'booked' },
  { at: T.assigned, name: 'Assigned', fill: color.lemon, icon: 'assigned' },
  { at: T.doneScreen + 4, name: 'Done', fill: color.mint, icon: 'done' },
]

// The pointer: it waits off the frame's right edge, taps the notification,
// picks the slot, books, assigns the tech, and leaves before the beach.
const HOME: [number, number] = [1150, 760]
const MOVES: PointerMove[] = [
  { at: T.toNote, to: NOTE_TARGET, frames: 4 },
  { at: T.toSlot, to: SLOT_TARGET, frames: 4 },
  { at: T.toBook, to: BOOK_TARGET, frames: 4 },
  { at: T.toTech, to: TECH_TARGET, frames: 4 },
  { at: T.assigned + 2, to: [900, 860], frames: 4 },
  { at: T.toBeach, to: [1160, 1010], frames: 3 },
]
const CLICKS = [T.clickNote, T.clickSlot, T.clickBook, T.clickTech]

// The spot in the beach scene the camera zooms on: the phone in his raised
// hand.
const PHONE_SPOT = '494px 605px'

// The beach's size, frame by frame, as the camera pushes in and as it
// pulls back out.
const PUSH_IN = [1.35, 2.2, 4.2, 8]
const PULL_OUT = [6, 3, 1.6, 1.12]

export const TakeOnePhone: React.FC = () => {
  const frame = useCurrentFrame()
  const pointer = pointerAt(frame, HOME, MOVES, CLICKS)

  // The beach is on screen until the camera has pushed all the way in, and
  // again from two frames into the pull back (the phone shrinks away
  // first).
  const backAt = T.toBeach + 2
  const beachOn = frame < T.phoneIn || frame >= backAt
  const zoom = frame >= backAt ? keyed(frame, backAt, [...PULL_OUT, 1]) : frame >= T.zoomIn ? keyed(frame, T.zoomIn, PUSH_IN) : 1

  return (
    <AbsoluteFill className="film" style={cssVars}>
      <GraphPaper offsetY={0} />

      {beachOn && (
        <AbsoluteFill style={{ scale: String(zoom), transformOrigin: PHONE_SPOT }}>
          <BeachScene clock={BEACH.clock(frame)} beats={BEACH.beats} />
        </AbsoluteFill>
      )}

      <OwnerPhone />

      <PhaseLabel phases={PHASES} leaveAt={T.toBeach} />
      {pointer.visible && <Cursor x={pointer.x} y={pointer.y} pressed={pointer.pressed} />}
    </AbsoluteFill>
  )
}
