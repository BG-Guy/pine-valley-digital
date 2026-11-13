// The Scroll version's timing: every beat of its story, in order, and the
// frame it starts on. To retime a beat, change its length here and
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

  // Phone: it drops in, held in a customer's hand, already on the booking
  // page. The form fills in, a time gets picked, and the visit is booked.
  // (A scroll takes seven frames; the phone starts falling while this one
  // is still settling.)
  toPhone: beat(5),
  phoneDrop: beat(7),
  fillName: beat(6),
  fillIssue: beat(6),
  toSlot: beat(4),
  clickSlot: beat(3),
  toBook: beat(4),
  clickBook: beat(3),
  booked: beat(14),

  // CRM: the booking arrives, goes to the technician who is free, his van
  // drives over, and the job is done and paid.
  toCrm: beat(7),
  toast: beat(8),
  card: beat(7),
  toTech: beat(5),
  clickTech: beat(3),
  assigned: beat(5),
  drive: beat(12),
  done: beat(14),

  // Beach again: the owner sees the job is done, pockets the phone and
  // settles back, which is where the loop began.
  toBeach: beat(7),
  seeDone: beat(14),
  pocket: beat(7),
  settle: beat(6),
  restTail: beat(12),
}

// The whole loop, in frames, and the beach's own clock and beats.
export const TOTAL = total()
export const BEACH = beachTiming(T, TOTAL)
