// Counts out a film's beats. Each film lists its beats in order with their
// lengths; the counter hands back the frame each one starts on, and the
// film's total once they're all listed.
export const beatCounter = () => {
  let next = 0
  return {
    // The first frame of a beat that lasts `frames`.
    beat: (frames: number) => {
      const start = next
      next += frames
      return start
    },
    // Every beat so far, added up.
    total: () => next,
  }
}
