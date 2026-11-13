// The beach station: the payoff. The owner lies back in a deck chair under
// an umbrella while his family plays by the water. His phone tells him the
// job is done; he pockets it and settles back. Later it buzzes and he takes
// it out again, which is where the next lap starts.
import './beach.css'
import { useCurrentFrame } from 'remotion'
import { SIZE } from '../../theme/theme'
import { beachClock } from './beachClock'
import { Cloud } from './Cloud'
import { DeckChair } from './DeckChair'
import { Family } from './Family'
import { Owner } from './Owner'
import { PhoneBubble } from './PhoneBubble'
import { Sandcastle } from './Sandcastle'
import { SeaAndSand } from './SeaAndSand'
import { Sun } from './Sun'
import { Umbrella } from './Umbrella'

export const BeachScene: React.FC = () => {
  const b = beachClock(useCurrentFrame())

  return (
    <>
      {/* The drawing, back to front. */}
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <Sun b={b} />
        <Cloud b={b} />
        <SeaAndSand b={b} />
        <Umbrella />
        <Family b={b} />
        <Sandcastle />
        <DeckChair />
        <Owner b={b} />
      </svg>
      <PhoneBubble b={b} />
    </>
  )
}
