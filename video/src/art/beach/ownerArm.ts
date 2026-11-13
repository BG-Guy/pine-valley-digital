// The owner's acting arm. Each pose is stored as angles and lengths (how
// far the upper arm is turned, how far the forearm is bent from it, and how
// long each looks from the side), so the arm swings from pose to pose in an
// arc, the way a real one does, instead of sliding in a straight line.
import { easeInOut } from '../../timeline/motion'

type Point = [number, number]

// [upper arm's angle, forearm's bend from it (degrees, clockwise), upper
// arm's length, forearm's length]
type Pose = [number, number, number, number]

// Where the arm joins the shoulder.
export const ARM_ROOT: Point = [290, 668]

const POSES = {
  // Holding the phone up to look at it.
  look: [38, -104, 165, 132],
  // The phone just clear of the pocket.
  lift: [87, -128, 166, 134],
  // Hand at the blazer pocket.
  pocket: [100, -129, 170, 110],
  // Held out in front, on the way up.
  fore: [19, -101, 150, 111],
  // Raised over his head.
  up: [-80, -73, 165, 77],
  // Folded behind his head (the head hides the hand).
  rest: [-119, -195, 178, 66],
} satisfies Record<string, Pose>

export type ArmPose = keyof typeof POSES

const radians = (degrees: number) => (degrees * Math.PI) / 180

// Where the elbow and the wrist are for a pose.
const joints = ([turn, bend, upper, fore]: Pose) => {
  const elbow: Point = [ARM_ROOT[0] + Math.cos(radians(turn)) * upper, ARM_ROOT[1] + Math.sin(radians(turn)) * upper]
  const wrist: Point = [elbow[0] + Math.cos(radians(turn + bend)) * fore, elbow[1] + Math.sin(radians(turn + bend)) * fore]
  return { elbow, wrist }
}

// The arm at this frame, given its script: the frame each pose is reached
// on, in order. Between two entries it swings from one pose to the next,
// easing out of the first and into the second; the same pose twice in a row
// is a hold.
export const armAt = (frame: number, script: [number, ArmPose][]) => {
  const index = Math.max(0, script.findLastIndex(([at]) => frame >= at))
  const [from, pose] = script[index]
  const next = script[index + 1]
  if (!next) return joints(POSES[pose])

  const [to, nextPose] = next
  const swing = easeInOut(Math.min(1, Math.max(0, (frame - from) / (to - from))))
  const a = POSES[pose]
  const b = POSES[nextPose]
  return joints(a.map((value, i) => value + (b[i] - value) * swing) as Pose)
}
