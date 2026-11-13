// The Sticker strip version's timing: every beat of its story, in order,
// and the frame it starts on. To retime a beat, change its length here and
// everything after it moves along. Lengths are in frames, at 12 a second.
import { beachTiming } from '../../art/beach/beachTiming'
import { beatCounter } from '../../timeline/beats'

const { beat, total } = beatCounter()

export const T = {
  // Beach: the owner is relaxing. His phone buzzes and he takes it out.
  rest: beat(6),
  buzz: beat(5),
  takeOut: beat(7),
  look: beat(4),

  // Then four comic panels, with a pan between each. (A pan takes seven
  // frames, so each one is still settling as its panel's beat begins.)
  toLead: beat(6),
  lead: beat(22),
  toBooked: beat(6),
  booked: beat(20),
  toOnIt: beat(6),
  onIt: beat(24),
  toDone: beat(6),
  done: beat(22),

  // Beach again: the owner sees the job is done, pockets the phone and
  // settles back, which is where the loop began.
  toBeach: beat(7),
  seeDone: beat(12),
  pocket: beat(7),
  settle: beat(6),
  restTail: beat(12),
}

// The whole loop, in frames, and the beach's own clock and beats.
export const TOTAL = total()
export const BEACH = beachTiming(T, TOTAL)
