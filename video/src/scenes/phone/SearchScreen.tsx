// The phone's first page: the customer types a search, the results pop in
// with the business on top, and the top result gets clicked.
import { useCurrentFrame } from 'remotion'
import { keyed, pop, press, typed } from '../../timeline/motion'
import { T } from '../../timeline/timeline'

const QUERY = 'plumber near me'

// The outline-only results under the top one: how wide their two bars are.
const GHOSTS = [
  ['72%', '46%'],
  ['60%', '38%'],
  ['68%', '52%'],
]

export const SearchScreen: React.FC = () => {
  const frame = useCurrentFrame()

  // The query types in, with a caret that blinks until the results land.
  const query = typed(QUERY, frame, T.typing, 1.5)
  const caret = frame < T.results + 4 && Math.floor(frame / 3) % 2 === 0

  // The "#1" tag stamps on a beat after its card, and ends up a bit crooked.
  const rankAt = T.results + 3
  const rankTilt = frame < rankAt ? 0 : keyed(frame, rankAt, [-18, 7, -4])

  // The click slams the top result into its shadow.
  const pressed = press(frame, T.clickResult) * 10

  return (
    <div className="phone-page">
      <div className="search-bar">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 21 21" />
        </svg>
        <span>{query}</span>
        {caret && <span className="caret" />}
      </div>

      <div className="results">
        {/* The top result: the business, with its rank, rating and name. */}
        <div
          className="result result-top"
          style={{
            scale: String(pop(frame, T.results)),
            translate: `${pressed}px ${pressed}px`,
            boxShadow: `${10 - pressed}px ${10 - pressed}px 0 var(--ink)`,
          }}
        >
          <div className="result-row">
            <span className="result-rank" style={{ scale: String(pop(frame, rankAt)), rotate: `${rankTilt}deg` }}>
              #1
            </span>
            <span className="result-stars">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--lemon)" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
                <path d="M12 2.6l2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5L2.6 9.5l6.5-.9z" />
              </svg>
              4.9
            </span>
          </div>
          <div className="display result-name">
            Ridgeline
            <br />
            Plumbing
          </div>
          <div className="result-meta">Open now · 5 min away</div>
        </div>

        {/* The also-rans. */}
        {GHOSTS.map(([first, second], i) => (
          <div key={first} className="result result-ghost" style={{ scale: String(pop(frame, T.results + 2 + i)) }}>
            <i style={{ width: first }} />
            <i style={{ width: second }} />
          </div>
        ))}
      </div>
    </div>
  )
}
