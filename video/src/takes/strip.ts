// The strip of stations the camera travels in the new films: one station
// fills the frame, the next sits a stride further on, and after the last
// comes the first again. A film can lay its strip down the page or across
// it.
import { GUTTER, SIZE } from '../theme/theme'
import { keyed } from '../timeline/motion'

// From the start of one station to the start of the next.
export const STRIDE = SIZE + GUTTER

// One move to the next station, frame by frame, as the share of the way
// covered: a quick flick that overshoots a touch and settles.
const TRAVEL = [0.05, 0.22, 0.5, 0.78, 0.94, 1.02, 1]

// How far along the strip the camera is, given the frames its moves start
// on.
export const cameraAt = (frame: number, moves: number[]) =>
  STRIDE * moves.reduce((sum, start) => sum + (frame < start ? 0 : keyed(frame, start, TRAVEL)), 0)

// Where a station sits relative to the frame for that camera position: 0
// fills the frame. The strip wraps, so each station takes its nearest copy.
export const stationOffset = (station: number, camera: number, stations: number) => {
  const lap = STRIDE * stations
  const offset = (station * STRIDE - camera) % lap
  if (offset > lap / 2) return offset - lap
  if (offset < -lap / 2) return offset + lap
  return offset
}
