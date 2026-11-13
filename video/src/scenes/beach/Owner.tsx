// The business owner, side on, lying back in the deck chair: sunglasses, a
// lilac blazer over a white tee, khaki chinos and loafers. One arm does the
// acting. It holds the phone up, slips it into the blazer pocket, folds
// behind his head, and later fetches the phone again. `b` is the beach
// clock (see beachClock.ts).
import { Limb } from '../../components/limb/Limb'
import { color, line } from '../../theme/theme'
import { track } from '../../timeline/motion'
import { B } from './beachClock'
import { Loafer } from './Loafer'

type Point = [number, number]

// ── Body ────────────────────────────────────────────────────────────────

// The torso runs from the shoulder down to the hip, leaning back 35
// degrees. It is drawn upright around its own middle and then turned, so
// the blazer's details sit in simple coordinates: +x is his front, +y is
// toward the hip.
const TORSO = { x: 343.5, y: 750, half: 107, radius: 62, lean: -35 }
const torsoShape = {
  x: -TORSO.radius,
  y: -TORSO.half - TORSO.radius,
  width: TORSO.radius * 2,
  height: (TORSO.half + TORSO.radius) * 2,
  rx: TORSO.radius,
}

// Where the acting arm joins the shoulder.
const ARM_ROOT: Point = [290, 668]

// ── The arm's poses and script ──────────────────────────────────────────

// Each pose is where the elbow and the wrist are.
const POSE = {
  // Holding the phone up to look at it.
  look: { elbow: [420, 770], wrist: [475, 650] },
  // The phone just clear of the pocket.
  lift: { elbow: [300, 834], wrist: [400, 745] },
  // Hand at the blazer pocket.
  pocket: { elbow: [262, 836], wrist: [358, 782] },
  // Two steps between the pocket and behind his head: the arm held out in
  // front, then raised over his head.
  fore: { elbow: [432, 716], wrist: [446, 606] },
  up: { elbow: [318, 505], wrist: [250, 470] },
  // Folded behind his head (the head hides the hand).
  rest: { elbow: [205, 512], wrist: [250, 560] },
} satisfies Record<string, { elbow: Point; wrist: Point }>

// Which pose the arm is in on which frame; it holds each until the next.
const ARM: [number, keyof typeof POSE][] = [
  [0, 'look'],
  [B.pocket - 1, 'look'],
  [B.pocket, 'lift'],
  [B.pocket + 1, 'pocket'],
  [B.settle - 1, 'pocket'],
  [B.settle, 'fore'],
  [B.settle + 1, 'up'],
  [B.settle + 2, 'rest'],
  [B.takeOut - 1, 'rest'],
  [B.takeOut, 'up'],
  [B.takeOut + 1, 'fore'],
  [B.takeOut + 2, 'pocket'],
  [B.takeOut + 3, 'pocket'],
  [B.takeOut + 4, 'lift'],
  [B.takeOut + 5, 'look'],
]

const jointAt = (b: number, joint: 'elbow' | 'wrist'): Point => [
  track(b, ARM.map(([frame, pose]) => [frame, POSE[pose][joint][0]])),
  track(b, ARM.map(([frame, pose]) => [frame, POSE[pose][joint][1]])),
]

// The phone is in his hand while he looks at it, slides in or out of the
// pocket over two frames, and is out of sight in between.
const inHand = (b: number) => b <= B.pocket || b >= B.takeOut + 4
const slideAt = (b: number) => {
  if (b === B.pocket + 1 || b === B.takeOut + 3) return 0.2
  if (b === B.pocket + 2 || b === B.takeOut + 2) return 0.6
  return null
}

// How upright the phone is held: tipped back while he reads it, flatter as
// it goes to and from the pocket.
const phoneTilt = (b: number) =>
  track(b, [
    [B.pocket - 1, 24],
    [B.pocket, 56],
    [B.takeOut + 4, 56],
    [B.takeOut + 5, 24],
  ])

// ── The head ────────────────────────────────────────────────────────────

// How far the head is lifted off the chair: 1 while he reads the phone,
// 0 lying back. It comes up as the phone buzzes.
const headLift = (b: number) =>
  track(b, [
    [B.pocket, 1],
    [B.pocket + 2, 0.7],
    [B.settle, 0.6],
    [B.settle + 2, 0],
    [B.buzz + 1, 0],
    [B.buzz + 3, 0.5],
    [B.takeOut + 3, 0.7],
    [B.takeOut + 5, 1],
  ])

export const Owner: React.FC<{ b: number }> = ({ b }) => {
  const elbow = jointAt(b, 'elbow')
  const wrist = jointAt(b, 'wrist')
  const slide = slideAt(b)

  // The phone buzzes in the pocket until his hand reaches it: the pocket
  // jolts and two lines flash, on alternate frames.
  const buzzing = b >= B.buzz && b < B.takeOut + 2
  const jolt = buzzing && b % 2 === 0 ? 5 : 0

  // The head, and the grin he wears from seeing "job done" until the next
  // buzz.
  const lift = headLift(b)
  const head = { x: 240 + lift * 14, y: 575 - lift * 9, tilt: -20 + lift * 16 }
  const happy = b >= B.seeDone + 2 && b < B.buzz + 2

  // The near foot taps while he rests.
  const toe = b >= B.rest && b < B.buzz && Math.floor(b / 5) % 2 === 0 ? -9 : 0

  return (
    <g>
      {/* The far leg, a little behind the near one. */}
      <Limb points={[[400, 842], [582, 812], [640, 944]]} width={56} fill={color.khaki} />
      <Loafer x={644} y={966} />

      {/* The torso: the blazer, open in a V over the tee down to its one
          button, a lemon pocket square, and the side pocket with the phone
          sliding into it. */}
      <g transform={`translate(${TORSO.x} ${TORSO.y}) rotate(${TORSO.lean})`}>
        <clipPath id="owner-torso">
          <rect {...torsoShape} />
        </clipPath>
        <rect {...torsoShape} fill={color.lilac} />
        <path d="M-10,-180 L70,-180 L70,50 Z" fill={color.surface} clipPath="url(#owner-torso)" />
        <rect {...torsoShape} fill="none" stroke={color.ink} strokeWidth={line.heavy} />
        <line x1={-4} y1={-162} x2={61} y2={25} stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
        <circle cx={46} cy={46} r={6} fill={color.ink} />
        <path d="M-28,-62 L-17,-88 L-5,-70 L6,-88 L14,-62 Z" fill={color.lemon} stroke={color.ink} strokeWidth={5} strokeLinejoin="round" />
        <line x1={-34} y1={-62} x2={18} y2={-62} stroke={color.ink} strokeWidth={5} strokeLinecap="round" />
        {slide !== null && <rect x={-33} y={-70 + slide * 116} width={50} height={96} rx={10} fill={color.ink} />}
        <g transform={`translate(${jolt} 0)`}>
          <rect x={-40} y={40} width={64} height={72} rx={12} fill={color.lilac} stroke={color.ink} strokeWidth={line.mid} />
          <line x1={-40} y1={57} x2={24} y2={57} stroke={color.ink} strokeWidth={5} />
        </g>
      </g>

      {/* The near leg, its bare ankle and loafer. */}
      <Limb points={[[688, 944], [691, 962]]} width={30} fill={color.skin} />
      <Limb points={[[405, 838], [600, 790], [686, 938]]} width={60} fill={color.khaki} />
      <Loafer x={690} y={966} turn={toe} />

      {/* The acting arm: the blazer sleeve, the phone when it's in his
          hand (we see its back), and the hand over it. */}
      <Limb points={[ARM_ROOT, elbow, wrist]} width={50} fill={color.lilac} />
      {inHand(b) && (
        <g transform={`translate(${wrist[0]} ${wrist[1]}) rotate(${phoneTilt(b)})`}>
          <rect x={-30} y={-104} width={60} height={112} rx={13} fill={color.ink} />
          <circle cx={-12} cy={-84} r={7} fill={color.lilac} />
        </g>
      )}
      <circle cx={wrist[0]} cy={wrist[1]} r={25} fill={color.skin} stroke={color.ink} strokeWidth={line.heavy} />

      {/* The head, drawn facing right around its own centre, then placed
          and tilted: nose, face, ear, hair, sunglasses and mouth. */}
      <g transform={`translate(${head.x} ${head.y}) rotate(${head.tilt})`}>
        <circle cx={53} cy={5} r={12} fill={color.skin} stroke={color.ink} strokeWidth={line.heavy} />
        <circle r={56} fill={color.skin} stroke={color.ink} strokeWidth={line.heavy} />
        <circle cx={44} cy={5} r={11} fill={color.skin} />
        <path
          d="M46,-34 A58,58 0 0 0 -56,14 L-44,32 Q-34,10 -30,-6 Q-6,-14 8,-34 Q26,-28 46,-34 Z"
          fill={color.hair}
          stroke={color.ink}
          strokeWidth={line.mid}
          strokeLinejoin="round"
        />
        <circle cx={-10} cy={10} r={13} fill={color.skin} stroke={color.ink} strokeWidth={line.mid} />
        <line x1={8} y1={-12} x2={-12} y2={-1} stroke={color.ink} strokeWidth={line.heavy} strokeLinecap="round" />
        <rect x={6} y={-26} width={60} height={34} rx={13} fill={color.ink} />
        <line x1={44} y1={-18} x2={54} y2={-8} stroke={color.surface} strokeWidth={5} strokeLinecap="round" />
        {happy ? (
          <path d="M17,27 Q31,50 47,27 Z" fill={color.surface} stroke={color.ink} strokeWidth={5} strokeLinejoin="round" />
        ) : (
          <path d="M24,35 L45,33" fill="none" stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
        )}
      </g>

      {/* The buzz. */}
      {buzzing && b % 2 === 0 && (
        <g fill="none" stroke={color.ink} strokeWidth={line.heavy} strokeLinecap="round">
          <path d="M440,760 q22,26 2,56" />
          <path d="M474,738 q36,46 4,98" />
          <path d="M330,742 q-20,-22 -8,-50" />
        </g>
      )}
    </g>
  )
}
