// The beach: the payoff, and where every film's loop begins and ends. The
// owner lies back in a deck chair under an umbrella while his family plays
// by the water. His phone tells him the job is done; he pockets it and
// settles back. Later it buzzes and he takes it out again.
//
// This file directs the scene: it turns the beach's clock and beats (see
// beachTiming.ts) into what the owner is doing, and stacks the drawings.
import './beach.css'
import { SIZE } from '../../theme/theme'
import { pop, popOut, track } from '../../timeline/motion'
import type { BeachBeats } from './beachTiming'
import { Camp } from './Camp'
import { DoneBubble } from './DoneBubble'
import { Family } from './Family'
import { Foreground } from './Foreground'
import { Owner } from './Owner'
import { armAt } from './ownerArm'
import { Shore } from './Shore'
import { Sky } from './Sky'

type BeachSceneProps = {
  // Frames since the camera set off for the beach.
  clock: number
  // When each of the owner's beats starts, on that clock.
  beats: BeachBeats
}

export const BeachScene: React.FC<BeachSceneProps> = ({ clock: b, beats: B }) => {
  // The acting arm: holding the phone up, slipping it into the pocket,
  // folding behind his head, and later fetching the phone again.
  const arm = armAt(b, [
    [0, 'look'],
    [B.pocket, 'look'],
    [B.pocket + 2, 'lift'],
    [B.pocket + 3, 'pocket'],
    [B.settle, 'pocket'],
    [B.settle + 2, 'fore'],
    [B.settle + 3, 'up'],
    [B.settle + 5, 'rest'],
    [B.takeOut, 'rest'],
    [B.takeOut + 2, 'up'],
    [B.takeOut + 3, 'fore'],
    [B.takeOut + 4, 'pocket'],
    [B.takeOut + 5, 'pocket'],
    [B.takeOut + 6, 'lift'],
    [B.takeOut + 8, 'look'],
  ])

  // The phone is in his hand while he looks at it, slides in or out of the
  // pocket over two frames, and is out of sight in between.
  const inHand = b <= B.pocket + 2 || b >= B.takeOut + 6
  const slipping = b === B.pocket + 3 || b === B.takeOut + 5 ? 0.2 : b === B.pocket + 4 || b === B.takeOut + 4 ? 0.6 : null
  const phone = inHand ? 'hand' : (slipping ?? 'away')
  const phoneTilt = track(b, [
    [B.pocket, 24],
    [B.pocket + 2, 56],
    [B.takeOut + 6, 56],
    [B.takeOut + 8, 24],
  ])

  // His head comes up off the chair while he reads the phone, and starts
  // to as it buzzes.
  const lift = track(b, [
    [B.pocket, 1],
    [B.pocket + 3, 0.7],
    [B.settle + 2, 0.6],
    [B.settle + 5, 0],
    [B.buzz + 1, 0],
    [B.buzz + 3, 0.5],
    [B.takeOut + 4, 0.7],
    [B.takeOut + 8, 1],
  ])

  // The buzz runs until his hand reaches the pocket, flashing on alternate
  // frames. He grins from seeing "job done" until the next buzz, and taps
  // a foot while he rests.
  const buzzing = b >= B.buzz && b < B.takeOut + 4 && b % 2 === 0
  const happy = b >= B.seeDone + 2 && b < B.buzz + 2
  const toe = b >= B.rest && b < B.buzz && Math.floor(b / 5) % 2 === 0 ? -9 : 0

  // The bubble pops up a beat after the camera arrives and pops away as he
  // goes to pocket the phone.
  const bubbleFrom = B.seeDone + 1
  const bubbleUntil = B.pocket - 1
  const bubble = b < bubbleFrom ? 0 : b >= bubbleUntil ? popOut(b, bubbleUntil) : pop(b, bubbleFrom)

  return (
    <>
      {/* The drawing, back to front. */}
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <Sky clock={b} />
        <Shore clock={b} />
        <Family clock={b} />
        <Camp />
        <Owner {...arm} phone={phone} phoneTilt={phoneTilt} lift={lift} happy={happy} jolt={buzzing ? 5 : 0} buzzing={buzzing} toe={toe} />
        <Foreground clock={b} />
      </svg>
      <DoneBubble scale={bubble} />
    </>
  )
}
