// The mouse pointer's path in the new films: where it is at each frame,
// given the moves it makes, and whether it's clicking.
type Point = [number, number]

// One move: the frame it starts on, where it glides to, how many frames the
// glide takes.
export type PointerMove = { at: number; to: Point; frames: number }

// The pointer's place and state at this frame. It starts from `home`,
// leaves each spot fast and eases into the next; a click holds the button
// down for two frames.
export const pointerAt = (frame: number, home: Point, moves: PointerMove[], clicks: number[]) => {
  let [x, y] = home
  for (const move of moves) {
    if (frame < move.at) break
    const done = Math.min(1, (frame - move.at + 1) / move.frames)
    const eased = 1 - (1 - done) ** 3
    x += (move.to[0] - x) * eased
    y += (move.to[1] - y) * eased
  }
  const last = moves[moves.length - 1]
  return {
    x,
    y,
    pressed: clicks.some((click) => frame >= click && frame < click + 2),
    visible: frame >= moves[0].at && frame < last.at + last.frames,
  }
}
