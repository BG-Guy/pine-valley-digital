// The notification from the owner's phone: a lemon bubble saying the job is
// done and paid. It pops up a beat after the camera arrives and pops away
// as he goes to pocket the phone. `b` is the beach clock.
import { color, line } from '../../theme/theme'
import { pop, popOut } from '../../timeline/motion'
import { B } from './beachClock'

const FROM = B.seeDone + 1
const UNTIL = B.pocket - 1

export const PhoneBubble: React.FC<{ b: number }> = ({ b }) => {
  if (b < FROM || b >= UNTIL + 3) return null

  return (
    <div className="bubble" style={{ scale: String(b >= UNTIL ? popOut(b, UNTIL) : pop(b, FROM)), transformOrigin: '0 100%' }}>
      {/* The tail, tucked under the card's bottom edge and pointing down at
          the phone. */}
      <svg className="bubble-tail" width="80" height="70">
        <path d="M14,0 L76,0 L-30,66 Z" fill={color.lemon} stroke={color.ink} strokeWidth={line.heavy} strokeLinejoin="round" />
      </svg>
      <div className="bubble-card">
        <span className="bubble-check">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={color.ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5.5 5.5L20 6.5" />
          </svg>
        </span>
        <div>
          <div className="display bubble-title">Job done</div>
          <div className="mono bubble-note">+$240 · Paid</div>
        </div>
      </div>
    </div>
  )
}
