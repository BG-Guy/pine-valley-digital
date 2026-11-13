// The beach's own clock. The beach is on screen across the loop's seam (the
// end of one lap and the start of the next), so its drawings count frames
// from the moment the camera sets off for the beach instead of from frame
// 0. That count runs straight through the seam.
import { T, TOTAL } from '../../timeline/timeline'

// Frames since the camera began scrolling to the beach.
export const beachClock = (frame: number) => (frame - T.scrollToBeach + TOTAL) % TOTAL

// The owner's beats on that clock, in the order they play.
export const B = {
  seeDone: beachClock(T.seeDone),
  pocket: beachClock(T.pocket),
  settle: beachClock(T.settle),
  rest: beachClock(T.restTail),
  buzz: beachClock(T.buzz),
  takeOut: beachClock(T.takeOut),
}
