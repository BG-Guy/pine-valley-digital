// The list of technicians. The pointer clicks the one who is free that day
// (Mike): his row slams into its shadow, turns mint and gets a tick.
import './ui.css'
import { color } from '../../theme/theme'
import { pop, press } from '../../timeline/motion'
import { Avatar } from './Avatar'

// The team. Only the first can take the job; the others sit back.
const TECHS = [
  { name: 'Mike', note: 'Free at 2', fill: color.lemon, hair: 'cap', away: false },
  { name: 'Dana', note: 'Busy', fill: color.lilac, hair: 'long', away: true },
  { name: 'Roy', note: 'Day off', fill: color.paperDim, hair: 'crop', away: true },
] as const

type TechListProps = {
  frame: number
  // The frame the pointer clicks Mike, and the frame he has the job.
  clickAt: number
  chosenAt: number
}

export const TechList: React.FC<TechListProps> = ({ frame, clickAt, chosenAt }) => {
  const pressed = press(frame, clickAt) * 8
  const chosen = frame >= chosenAt

  return (
    <div className="ui-techs">
      {TECHS.map((tech, i) => {
        const isPick = i === 0
        const sunk = isPick ? pressed : 0
        return (
          <div
            key={tech.name}
            className={`ui-tech${tech.away ? ' is-away' : ''}`}
            style={{
              background: isPick && chosen ? color.mint : undefined,
              translate: `${sunk}px ${sunk}px`,
              boxShadow: `${8 - sunk}px ${8 - sunk}px 0 ${color.ink}`,
            }}
          >
            <Avatar size={60} fill={tech.fill} hair={tech.hair} skin={i === 1 ? color.skinDeep : color.skin} />
            <div className="display ui-tech-name">{tech.name}</div>
            <div className="mono ui-tech-note">
              {isPick && chosen ? 'On it' : tech.note}
              {isPick && chosen && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color.ink} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" style={{ scale: String(pop(frame, chosenAt)) }}>
                  <path d="M4 12.5l5.5 5.5L20 6.5" />
                </svg>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
