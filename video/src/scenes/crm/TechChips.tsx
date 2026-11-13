// The row of technicians under the booking. The pointer clicks the one who
// is free that day (Mike): his chip slams into its shadow, turns mint and
// gets a tick.
import { useCurrentFrame } from 'remotion'
import { color } from '../../theme/theme'
import { pop, press } from '../../timeline/motion'
import { T } from '../../timeline/timeline'

// The team. Only the first can take the job; the others sit back.
const TECHS = [
  { name: 'Mike', note: 'Free at 2', fill: color.lemon, away: false },
  { name: 'Dana', note: 'Busy', fill: color.lilac, away: true },
  { name: 'Roy', note: 'Day off', fill: color.paperDim, away: true },
]

export const TechChips: React.FC = () => {
  const frame = useCurrentFrame()

  // The click, and from the next beat the chosen tech's new look.
  const pressed = press(frame, T.clickTech) * 10
  const chosen = frame >= T.assigned

  return (
    <div className="techs">
      {TECHS.map((tech, i) => {
        const isPick = i === 0
        return (
          <div
            key={tech.name}
            className={`tech${tech.away ? ' is-away' : ''}`}
            style={{
              background: isPick && chosen ? color.mint : undefined,
              translate: isPick ? `${pressed}px ${pressed}px` : undefined,
              boxShadow: `${isPick ? 10 - pressed : 10}px ${isPick ? 10 - pressed : 10}px 0 ${color.ink}`,
            }}
          >
            <div className="display tech-face" style={{ background: tech.fill }}>
              {tech.name[0]}
              {isPick && chosen && (
                <span className="tech-check" style={{ scale: String(pop(frame, T.assigned)) }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color.ink} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12.5l5.5 5.5L20 6.5" />
                  </svg>
                </span>
              )}
            </div>
            <div>
              <div className="display tech-name">{tech.name}</div>
              <div className="mono tech-note">{isPick && chosen ? 'On it' : tech.note}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
