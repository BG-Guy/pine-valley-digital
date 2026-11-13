// The phone's second page: the business's site. Its booking form fills in
// field by field, then the "Book now" button gets clicked.
import { useCurrentFrame } from 'remotion'
import { press, typed } from '../../timeline/motion'
import { T } from '../../timeline/timeline'

// The form's fields: what each shows while empty, what gets typed, when the
// typing starts and how many characters land per frame.
const FIELDS = [
  { hint: 'Your name', value: 'Sam Rivera', at: T.fillName, perFrame: 2 },
  { hint: "What's wrong?", value: 'Leaky pipe', at: T.fillIssue, perFrame: 2 },
  { hint: 'When?', value: 'Today, 2:00 PM', at: T.fillTime, perFrame: 3 },
]

export const BookingScreen: React.FC = () => {
  const frame = useCurrentFrame()

  // The click slams the button into its shadow.
  const pressed = press(frame, T.clickBook) * 10

  return (
    <div className="phone-page">
      <div className="site-bar">
        <span className="display site-logo">Ridgeline</span>
        <span className="site-menu">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="display book-title">
        Book a
        <br />
        <span className="book-mark">visit</span>
      </div>

      <div className="book-form">
        {FIELDS.map((field, i) => {
          // A field is active from its first keystroke until the next
          // field's (or, for the last, until the pointer heads for the
          // button).
          const until = FIELDS[i + 1]?.at ?? T.cursorToBook
          const active = frame >= field.at && frame < until
          const text = typed(field.value, frame, field.at, field.perFrame)
          return (
            <div key={field.hint} className={`book-field${text ? '' : ' is-empty'}${active ? ' is-active' : ''}`}>
              <span>{text || field.hint}</span>
              {active && Math.floor(frame / 2) % 2 === 0 && <span className="caret" />}
            </div>
          )
        })}
      </div>

      <div
        className="display book-button"
        style={{
          translate: `${pressed}px ${pressed}px`,
          boxShadow: `${10 - pressed}px ${10 - pressed}px 0 var(--ink)`,
        }}
      >
        Book now
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  )
}
