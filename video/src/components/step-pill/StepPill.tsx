// The step label in the frame's bottom-left corner: which of the journey's
// five steps is playing. It stamps in again each time the step changes, and
// leaves before the beach.
import type { CSSProperties } from 'react'
import { useCurrentFrame } from 'remotion'
import { color } from '../../theme/theme'
import { keyed, pop, popOut } from '../../timeline/motion'
import { T } from '../../timeline/timeline'

// The five steps: the frame each begins on, its name and its pill colour.
const STEPS = [
  { at: T.phoneDrop + 4, name: 'Search', fill: color.lemon },
  { at: T.bookingPage, name: 'Lead', fill: color.lilac },
  { at: T.booked, name: 'Booked', fill: color.mint },
  { at: T.assigned, name: 'Assigned', fill: color.lemon },
  { at: T.done, name: 'Done', fill: color.mint },
]

// The pill pops away as the camera heads for the beach.
const LEAVE = T.scrollToBeach

export const StepPill: React.FC = () => {
  const frame = useCurrentFrame()
  const index = STEPS.findLastIndex((step) => frame >= step.at)
  if (index < 0 || frame >= LEAVE + 3) return null

  const step = STEPS[index]
  const scale = frame >= LEAVE ? popOut(frame, LEAVE) : pop(frame, step.at)

  return (
    <div
      className="nb-pill"
      style={
        {
          '--pill-bg': step.fill,
          position: 'absolute',
          left: 48,
          bottom: 50,
          padding: '12px 26px 12px 12px',
          fontSize: 30,
          scale: String(scale),
          rotate: `${keyed(frame, step.at, [-8, 4, -2, 0])}deg`,
          transformOrigin: '0 100%',
        } as CSSProperties
      }
    >
      {/* The step's number, on an ink chip. */}
      <span style={{ padding: '6px 12px', borderRadius: 999, background: color.ink, color: step.fill, letterSpacing: '0.04em' }}>
        0{index + 1}
      </span>
      {step.name}
    </div>
  )
}
