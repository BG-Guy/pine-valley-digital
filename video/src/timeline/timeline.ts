// The film's timing: every beat of the story, in order, and the frame it
// starts on. To retime a beat, change its length here and everything after
// it moves along. Lengths are in frames, at 12 a second.

// Hands out each beat's first frame, in the order the beats are listed.
let next = 0
const beat = (frames: number) => {
  const start = next
  next += frames
  return start
}

export const T = {
  // Beach: the owner is relaxing. His phone buzzes and he takes it out.
  rest: beat(6),
  buzz: beat(5),
  takeOut: beat(6),
  look: beat(4),

  // Phone: it drops in, held in a hand. A customer searches, opens the top
  // result and books a visit. (A scroll takes seven frames; the phone
  // starts falling while this one is still settling.)
  scrollToPhone: beat(5),
  phoneDrop: beat(7),
  typing: beat(10),
  results: beat(8),
  cursorToResult: beat(6),
  clickResult: beat(3),
  bookingPage: beat(4),
  fillName: beat(6),
  fillIssue: beat(6),
  fillTime: beat(5),
  cursorToBook: beat(5),
  clickBook: beat(3),
  booked: beat(14),

  // CRM: the booking arrives, gets a technician for that day, and is done.
  scrollToCrm: beat(7),
  toast: beat(9),
  leadCard: beat(8),
  cursorToTech: beat(6),
  clickTech: beat(3),
  assigned: beat(10),
  onTheJob: beat(8),
  done: beat(14),

  // Beach again: the owner sees the job is done, pockets the phone and
  // settles back, which is where the loop began.
  scrollToBeach: beat(7),
  seeDone: beat(16),
  pocket: beat(6),
  settle: beat(5),
  restTail: beat(14),
}

// The whole loop, in frames.
export const TOTAL = next
