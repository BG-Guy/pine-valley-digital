// Where the mouse pointer is at each frame, and when it clicks. It moves in
// frame coordinates and doesn't scroll with the stations, the way a real
// pointer stays put while a page scrolls under it.
import { TECH_TARGET } from '../scenes/crm/CrmScene'
import { BOOK_TARGET, RESULT_TARGET } from '../scenes/phone/PhoneScene'
import { T } from '../timeline/timeline'

type Point = [number, number]

// The pointer waits just off the frame's right edge until it's needed.
const OFFSTAGE: Point = [1150, 830]

// The pointer's moves, in order: the frame each starts on, where it glides
// to and how many frames the glide takes.
const MOVES: { at: number; to: Point; frames: number }[] = [
  { at: T.cursorToResult, to: RESULT_TARGET, frames: 6 },
  // Out of the form's way while it fills in.
  { at: T.bookingPage + 1, to: [716, 476], frames: 3 },
  { at: T.cursorToBook, to: BOOK_TARGET, frames: 5 },
  // Clear of the phone, then across to the technicians.
  { at: T.booked + 3, to: [880, 800], frames: 4 },
  { at: T.cursorToTech, to: TECH_TARGET, frames: 6 },
  { at: T.assigned + 2, to: [800, 952], frames: 4 },
  // Off the frame before the beach.
  { at: T.scrollToBeach, to: [1160, 1010], frames: 4 },
]

// The frames it clicks on. A click holds the button down for two frames.
const CLICKS = [T.clickResult, T.clickBook, T.clickTech]

// Is the pointer on stage at this frame?
const first = MOVES[0]
const last = MOVES[MOVES.length - 1]
export const cursorVisible = (frame: number) => frame >= first.at && frame < last.at + last.frames

// The pointer's place at this frame: it starts each glide fast and eases
// into the target.
export const cursorAt = (frame: number) => {
  let [x, y] = OFFSTAGE
  for (const move of MOVES) {
    if (frame < move.at) break
    const done = Math.min(1, (frame - move.at + 1) / move.frames)
    const eased = 1 - (1 - done) ** 3
    x += (move.to[0] - x) * eased
    y += (move.to[1] - y) * eased
  }
  return { x, y, pressed: CLICKS.some((click) => frame >= click && frame < click + 2) }
}
