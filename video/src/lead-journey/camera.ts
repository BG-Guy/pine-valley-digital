// The camera. The film is one tall strip of three stations (beach, phone,
// CRM) that the camera scrolls down, like a page. After the last station
// comes the first again, so the strip is a loop.
import { GUTTER, SIZE } from '../theme/theme'
import { keyed } from '../timeline/motion'
import { T } from '../timeline/timeline'

// Each station's place on the strip, top to bottom.
export const STATION = { beach: 0, phone: 1, crm: 2 }

// From the top of one station to the top of the next, and once round the
// whole strip.
export const STRIDE = SIZE + GUTTER
const LAP = STRIDE * Object.keys(STATION).length

// One scroll, frame by frame, as the share of the way to the next station:
// a quick flick that overshoots a touch and settles.
const SCROLL = [0.05, 0.22, 0.5, 0.78, 0.94, 1.02, 1]
const scrolled = (frame: number, start: number) => (frame < start ? 0 : keyed(frame, start, SCROLL))

// How far down the strip the camera is at this frame, in pixels.
export const cameraAt = (frame: number) =>
  STRIDE * (scrolled(frame, T.scrollToPhone) + scrolled(frame, T.scrollToCrm) + scrolled(frame, T.scrollToBeach))

// Where a station sits in the frame for that camera position: 0 fills the
// frame, a positive value is below it. The strip wraps, so each station
// takes its nearest copy.
export const stationY = (station: number, cameraY: number) => {
  const y = (station * STRIDE - cameraY) % LAP
  if (y > LAP / 2) return y - LAP
  if (y < -LAP / 2) return y + LAP
  return y
}
