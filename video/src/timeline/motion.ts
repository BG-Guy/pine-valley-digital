// Small helpers for frame-by-frame motion. The film runs at 12 drawings a
// second, so movement is keyed pose by pose instead of eased smoothly.
import { interpolate } from 'remotion'

// The pose for each frame from `start` on. Holds the first pose before it
// starts and the last one once the list runs out.
export const keyed = (frame: number, start: number, poses: number[]) =>
  poses[Math.min(poses.length - 1, Math.max(0, frame - start))]

// A value that moves in straight lines through [frame, value] points and
// holds at both ends.
export const track = (frame: number, points: [number, number][]) =>
  interpolate(
    frame,
    points.map(([f]) => f),
    points.map(([, v]) => v),
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )

// Slow out of 0, quick through the middle, slow into 1.
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

// Stamp in: nothing before `start`, then a quick overshoot and settle. Use
// the result as a scale.
export const pop = (frame: number, start: number) => (frame < start ? 0 : keyed(frame, start, [0.55, 1.14, 0.96, 1]))

// Stamp out: full size until `start`, gone three frames later.
export const popOut = (frame: number, start: number) => (frame < start ? 1 : keyed(frame, start, [1.1, 0.55, 0]))

// How far a pressed thing has sunk into its shadow (0 to 1) around a click
// that lands on `at`: slammed flat for two frames, then springing back.
export const press = (frame: number, at: number) => (frame < at ? 0 : keyed(frame, at, [1, 1, 0.35, 0]))
