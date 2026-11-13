// The phase label in the frame's bottom-left corner: which part of the
// journey is playing, with an icon. It stamps in again each time the phase
// changes, and leaves before the beach.
import type { CSSProperties } from 'react'
import { useCurrentFrame } from 'remotion'
import { color } from '../../theme/theme'
import { keyed, pop, popOut } from '../../timeline/motion'

// The icons, as line drawings in a 24-unit box.
const ICONS = {
  lead: 'M6 16.5V11a6 6 0 0 1 12 0v5.5l2 2H4z M10 21a2.2 2.2 0 0 0 4 0',
  booked: 'M4 7h16v13H4z M4 11.5h16 M8 4v5 M16 4v5',
  assigned: 'M12 12.5a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4z M4 21a8 8 0 0 1 16 0',
  done: 'M4 12.5l5.5 5.5L20 6.5',
}

// One phase: the frame it begins on, its name, its pill colour and icon.
export type Phase = { at: number; name: string; fill: string; icon: keyof typeof ICONS }

type PhaseLabelProps = {
  phases: Phase[]
  // The frame the label pops away on.
  leaveAt: number
}

export const PhaseLabel: React.FC<PhaseLabelProps> = ({ phases, leaveAt }) => {
  const frame = useCurrentFrame()
  const index = phases.findLastIndex((phase) => frame >= phase.at)
  if (index < 0 || frame >= leaveAt + 3) return null

  const phase = phases[index]
  const scale = frame >= leaveAt ? popOut(frame, leaveAt) : pop(frame, phase.at)

  return (
    <div
      className="nb-pill"
      style={
        {
          '--pill-bg': phase.fill,
          position: 'absolute',
          left: 48,
          bottom: 50,
          padding: '10px 26px 10px 10px',
          fontSize: 30,
          scale: String(scale),
          rotate: `${keyed(frame, phase.at, [-8, 4, -2, 0])}deg`,
          transformOrigin: '0 100%',
        } as CSSProperties
      }
    >
      {/* The phase's icon, on an ink chip. */}
      <span style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: '50%', background: color.ink }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={phase.fill} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS[phase.icon]} />
        </svg>
      </span>
      {phase.name}
    </div>
  )
}
