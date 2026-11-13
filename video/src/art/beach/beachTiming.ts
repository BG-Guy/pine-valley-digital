// The beach's own clock. The beach is on screen across a film's seam (the
// end of one lap and the start of the next), so its drawings count frames
// from the moment the camera sets off for it instead of from frame 0. That
// count runs straight through the seam.

// The frames, in a film's own timeline, of the beats the beach acts out.
type BeachFrames = {
  // The camera sets off for the beach.
  toBeach: number
  seeDone: number
  pocket: number
  settle: number
  restTail: number
  buzz: number
  takeOut: number
}

// The same beats on the beach's clock, in the order they play.
export type BeachBeats = {
  seeDone: number
  pocket: number
  settle: number
  rest: number
  buzz: number
  takeOut: number
}

// A film's beach timing: a way to turn any frame into the beach's clock,
// and its beats on that clock.
export const beachTiming = (frames: BeachFrames, total: number) => {
  const clock = (frame: number) => (frame - frames.toBeach + total) % total
  const beats: BeachBeats = {
    seeDone: clock(frames.seeDone),
    pocket: clock(frames.pocket),
    settle: clock(frames.settle),
    rest: clock(frames.restTail),
    buzz: clock(frames.buzz),
    takeOut: clock(frames.takeOut),
  }
  return { clock, beats }
}
