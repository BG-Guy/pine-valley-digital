// The notification from the owner's phone: a lemon bubble saying the job is
// done and paid. The scene tells it how big to be (0 hides it), which is
// how it pops in and away.
import { color, line } from '../../theme/theme'

export const DoneBubble: React.FC<{ scale: number }> = ({ scale }) => {
  if (scale <= 0) return null

  return (
    <div className="done-bubble" style={{ scale: String(scale) }}>
      {/* The tail, tucked under the card's bottom edge and pointing down at
          the phone. */}
      <svg className="done-bubble-tail" width="80" height="70">
        <path d="M14,0 L76,0 L-30,66 Z" fill={color.lemon} stroke={color.ink} strokeWidth={line.heavy} strokeLinejoin="round" />
      </svg>
      <div className="done-bubble-card">
        <span className="done-bubble-check">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={color.ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5.5 5.5L20 6.5" />
          </svg>
        </span>
        <div>
          <div className="display done-bubble-title">Job done</div>
          <div className="mono done-bubble-note">+$240 · Paid</div>
        </div>
      </div>
    </div>
  )
}
