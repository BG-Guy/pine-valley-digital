// The booking page on the customer's phone: the business's site. The form
// fills in, the pointer picks a time slot and clicks "Book now". This is
// where the lead comes in.
import { useCurrentFrame } from 'remotion'
import { SlotChips } from '../../art/ui/SlotChips'
import { StatusBar } from '../../art/ui/StatusBar'
import { color } from '../../theme/theme'
import { press, typed } from '../../timeline/motion'
import { T } from './timeline'

// The form's fields: what each shows while empty, what gets typed, and
// when the typing starts.
const FIELDS = [
  { hint: 'Your name', value: 'Sam Rivera', at: T.fillName },
  { hint: "What's wrong?", value: 'Leaky pipe', at: T.fillIssue },
]

export const BookingPage: React.FC = () => {
  const frame = useCurrentFrame()

  // The click slams the button into its shadow.
  const pressed = press(frame, T.clickBook) * 10

  return (
    <div className="phone-page">
      <StatusBar />

      {/* The site's bar: a water-drop logo, its name, a menu icon. */}
      <div className="bk-bar">
        <span className="bk-logo">
          <svg width="26" height="26" viewBox="0 0 24 24" fill={color.surface} stroke={color.ink} strokeWidth="2.6" strokeLinejoin="round">
            <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
          </svg>
        </span>
        <span className="display bk-name">Ridgeline</span>
        <span className="bk-menu">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="display bk-title">
        Book a
        <br />
        <span className="bk-mark">visit</span>
      </div>

      <div className="bk-form">
        {FIELDS.map((field, i) => {
          // A field is active from its first keystroke until the next
          // field's (or, for the last, until the pointer comes for a slot).
          const until = FIELDS[i + 1]?.at ?? T.toSlot
          const active = frame >= field.at && frame < until
          const text = typed(field.value, frame, field.at)
          return (
            <div key={field.hint} className={`bk-field${text ? '' : ' is-empty'}${active ? ' is-active' : ''}`}>
              <span>{text || field.hint}</span>
              {active && Math.floor(frame / 2) % 2 === 0 && <span className="caret" />}
            </div>
          )
        })}

        <div className="mono bk-label">Pick a time today</div>
        <SlotChips frame={frame} clickAt={T.clickSlot} />

        <div className="display bk-button" style={{ translate: `${pressed}px ${pressed}px`, boxShadow: `${10 - pressed}px ${10 - pressed}px 0 var(--ink)` }}>
          Book now
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* Its rating, under the form. */}
      <div className="mono bk-trust">
        <svg width="24" height="24" viewBox="0 0 24 24" fill={color.lemon} stroke={color.ink} strokeWidth="2.6" strokeLinejoin="round">
          <path d="M12 2.6l2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5L2.6 9.5l6.5-.9z" />
        </svg>
        4.9 · 312 reviews
      </div>
    </div>
  )
}
