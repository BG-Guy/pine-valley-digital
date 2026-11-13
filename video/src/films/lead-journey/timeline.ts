// The film's timing: every beat of its story, in order, and
// the frame it starts on. To retime a beat, change its length here and
// everything after it moves along. Lengths are in frames, at 12 a second.
import { beachTiming } from '../../art/beach/beachTiming'
import { beatCounter } from '../../timeline/beats'

const { beat, total } = beatCounter()

export const T = {
  // Beach: the owner is relaxing. His phone buzzes and he takes it out.
  rest: beat(6),
  buzz: beat(5),
  takeOut: beat(7),
  look: beat(3),

  // The camera pushes into his phone, which then fills the frame.
  zoomIn: beat(4),
  phoneIn: beat(4),

  // Lock screen: the new lead arrives as a notification, and gets tapped.
  notify: beat(8),
  toNote: beat(4),
  clickNote: beat(3),

  // Lead screen: a time is picked and the visit is booked.
  leadScreen: beat(5),
  toSlot: beat(4),
  clickSlot: beat(3),
  toBook: beat(4),
  clickBook: beat(3),
  booked: beat(9),

  // Assign screen: the free technician gets the job and drives over.
  assignScreen: beat(5),
  toTech: beat(4),
  clickTech: beat(3),
  assigned: beat(4),
  drive: beat(12),

  // Done screen: the job is done and the invoice is paid.
  doneScreen: beat(5),
  paid: beat(13),

  // The camera pulls back out to the beach. He sees it's done, pockets the
  // phone and settles back, which is where the loop began.
  toBeach: beat(6),
  seeDone: beat(12),
  pocket: beat(7),
  settle: beat(6),
  restTail: beat(12),
}

// The whole loop, in frames, and the beach's own clock and beats.
export const TOTAL = total()
export const BEACH = beachTiming(T, TOTAL)
