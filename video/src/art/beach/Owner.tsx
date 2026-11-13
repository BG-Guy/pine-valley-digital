// The business owner, side on, lying back in the deck chair: sunglasses, a
// lilac blazer over a white tee, khaki chinos and loafers. This file only
// draws him. Where his arm is, what the phone is doing and how he holds his
// head are passed in by the scene (BeachScene.tsx). SVG only.
import { Limb } from '../../components/limb/Limb'
import { color, line } from '../../theme/theme'
import { ARM_ROOT } from './ownerArm'

type Point = [number, number]

type OwnerProps = {
  // The acting arm's elbow and wrist.
  elbow: Point
  wrist: Point
  // The phone: in his hand, out of sight, or part-way into the blazer
  // pocket (0 is just above it, 1 inside).
  phone: 'hand' | 'away' | number
  // How upright he holds it, in degrees.
  phoneTilt: number
  // How far his head is lifted off the chair, 0 to 1.
  lift: number
  // Grinning, or not.
  happy: boolean
  // The phone buzzing in his pocket: how far the pocket has jolted this
  // frame, and whether the buzz lines show.
  jolt: number
  buzzing: boolean
  // The near foot's tap, in degrees.
  toe: number
}

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

// A loafer's outline, toe to the right, hanging from an ankle at (x, y).
const loafer = (x: number, y: number) =>
  `M${x - 26},${y + 32} L${x - 26},${y + 4} Q${x - 24},${y - 14} ${x},${y - 12} L${x + 32},${y - 6} Q${x + 92},${y + 2} ${x + 96},${y + 24} L${x + 96},${y + 32} Z`

const thin = { fill: 'none', stroke: color.ink, strokeWidth: line.thin, strokeLinecap: 'round' as const }

export const Owner: React.FC<OwnerProps> = ({ elbow, wrist, phone, phoneTilt, lift, happy, jolt, buzzing, toe }) => {
  // The head rises and tips forward as he lifts it.
  const head = { x: 240 + lift * 14, y: 572 - lift * 9, tilt: -20 + lift * 16 }

  // The forearm's direction, for the shirt cuff and the thumb.
  const reach = Math.hypot(wrist[0] - elbow[0], wrist[1] - elbow[1]) || 1
  const along: Point = [(wrist[0] - elbow[0]) / reach, (wrist[1] - elbow[1]) / reach]
  const forearm = (Math.atan2(along[1], along[0]) * 180) / Math.PI

  return (
    <g>
      {/* The far leg and its loafer, a little behind the near one. */}
      <Limb points={[[400, 842], [582, 812], [640, 944]]} width={56} fill={color.khaki} />
      <path d={loafer(644, 966)} fill={color.ink} stroke={color.ink} strokeWidth={line.mid} strokeLinejoin="round" />

      {/* The torso: the blazer with a deeper shade down its back, open in a
          V over the tee to its one button, a lemon pocket square, and the
          side pocket with the phone sliding into it. */}
      <g transform={`translate(${TORSO.x} ${TORSO.y}) rotate(${TORSO.lean})`}>
        <clipPath id="owner-blazer">
          <rect {...torsoShape} />
        </clipPath>
        <rect {...torsoShape} fill={color.lilac} />
        <rect x={-62} y={-170} width={26} height={340} fill={color.lilacDeep} clipPath="url(#owner-blazer)" />
        <path d="M-10,-180 L70,-180 L70,50 Z" fill={color.surface} clipPath="url(#owner-blazer)" />
        <rect {...torsoShape} fill="none" stroke={color.ink} strokeWidth={line.heavy} />
        <line x1={-4} y1={-162} x2={61} y2={25} stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
        <path d="M10,-92 l-16,10 l14,12" {...thin} />
        <circle cx={46} cy={46} r={6} fill={color.ink} />
        <path d="M-28,-62 L-17,-88 L-5,-70 L6,-88 L14,-62 Z" fill={color.lemon} stroke={color.ink} strokeWidth={5} strokeLinejoin="round" />
        <line x1={-34} y1={-62} x2={18} y2={-62} stroke={color.ink} strokeWidth={5} strokeLinecap="round" />
        {typeof phone === 'number' && <rect x={-33} y={-70 + phone * 116} width={50} height={96} rx={10} fill={color.ink} />}
        <g transform={`translate(${jolt} 0)`}>
          <rect x={-40} y={40} width={64} height={72} rx={12} fill={color.lilac} stroke={color.ink} strokeWidth={line.mid} />
          <line x1={-40} y1={57} x2={24} y2={57} stroke={color.ink} strokeWidth={5} />
        </g>
      </g>

      {/* The near leg: a bare ankle, the chinos with creases at the knee
          and a turn-up, and the loafer, which taps. */}
      <Limb points={[[688, 944], [691, 962]]} width={30} fill={color.skin} />
      <Limb points={[[405, 838], [600, 790], [686, 938]]} width={60} fill={color.khaki} />
      <path d="M588,766 q12,10 8,24 M566,772 q9,8 6,19" {...thin} />
      <line x1={654} y1={940} x2={704} y2={912} stroke={color.ink} strokeWidth={5} strokeLinecap="round" />
      <g transform={`rotate(${toe} 690 966)`}>
        <path d={loafer(690, 966)} fill={color.ink} stroke={color.ink} strokeWidth={line.mid} strokeLinejoin="round" />
        <line x1={668} y1={996} x2={782} y2={996} stroke={color.surface} strokeWidth={5} strokeLinecap="round" />
        <path d="M716,962 q14,-4 26,2" fill="none" stroke={color.surface} strokeWidth={line.thin} strokeLinecap="round" />
      </g>

      {/* The neck. */}
      <Limb points={[[286, 650], [head.x + 8, head.y + 36]]} width={40} fill={color.skin} />

      {/* The acting arm: the blazer sleeve, a white shirt cuff, the phone
          when it's in his hand (we see its back), his thumb and his hand. */}
      <Limb points={[ARM_ROOT, elbow, wrist]} width={50} fill={color.lilac} />
      <rect
        x={-11}
        y={-29}
        width={22}
        height={58}
        rx={7}
        fill={color.surface}
        stroke={color.ink}
        strokeWidth={line.mid}
        transform={`translate(${wrist[0] - along[0] * 30} ${wrist[1] - along[1] * 30}) rotate(${forearm})`}
      />
      {phone === 'hand' && (
        <g transform={`translate(${wrist[0]} ${wrist[1]}) rotate(${phoneTilt})`}>
          <rect x={-30} y={-104} width={60} height={112} rx={13} fill={color.ink} />
          <circle cx={-12} cy={-84} r={7} fill={color.lilac} />
          <circle cx={6} cy={-84} r={4} fill={color.lilac} />
        </g>
      )}
      <circle cx={wrist[0] + along[1] * 20} cy={wrist[1] - along[0] * 20} r={12} fill={color.skin} stroke={color.ink} strokeWidth={line.mid} />
      <circle cx={wrist[0]} cy={wrist[1]} r={25} fill={color.skin} stroke={color.ink} strokeWidth={line.heavy} />

      {/* The head, drawn facing right around its own centre, then placed
          and tilted: nose, face, hair, ear, sunglasses, brow and mouth. */}
      <g transform={`translate(${head.x} ${head.y}) rotate(${head.tilt})`}>
        <circle cx={57} cy={5} r={12} fill={color.skin} stroke={color.ink} strokeWidth={line.heavy} />
        <circle r={60} fill={color.skin} stroke={color.ink} strokeWidth={line.heavy} />
        <circle cx={47} cy={5} r={11} fill={color.skin} />
        <path
          d="M50,-36 A62,62 0 0 0 -60,14 L-47,36 Q-36,12 -32,-6 Q-6,-14 10,-36 Q30,-28 50,-36 Z"
          fill={color.hair}
          stroke={color.ink}
          strokeWidth={line.mid}
          strokeLinejoin="round"
        />
        <path d="M-34,-40 Q-10,-54 22,-46 M-46,-18 Q-40,-34 -26,-44" fill="none" stroke="#6b5140" strokeWidth={line.thin} strokeLinecap="round" />
        <circle cx={-12} cy={10} r={13} fill={color.skin} stroke={color.ink} strokeWidth={line.mid} />
        <path d="M-17,9 q5,-6 10,1" {...thin} />
        <line x1={8} y1={-12} x2={-12} y2={-1} stroke={color.ink} strokeWidth={line.heavy} strokeLinecap="round" />
        <rect x={6} y={-28} width={64} height={36} rx={13} fill={color.ink} />
        <line x1={46} y1={-19} x2={57} y2={-8} stroke={color.surface} strokeWidth={5} strokeLinecap="round" />
        <circle cx={36} cy={-17} r={3} fill={color.surface} />
        <path d="M14,-37 Q38,-46 64,-36" fill="none" stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
        {happy ? (
          <>
            <path d="M17,28 Q32,54 50,28 Z" fill={color.surface} stroke={color.ink} strokeWidth={5} strokeLinejoin="round" />
            <path d="M52,20 q7,6 3,14" {...thin} />
          </>
        ) : (
          <path d="M24,36 L47,34" fill="none" stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
        )}
      </g>

      {/* The buzz. */}
      {buzzing && (
        <g fill="none" stroke={color.ink} strokeWidth={line.heavy} strokeLinecap="round">
          <path d="M440,760 q22,26 2,56" />
          <path d="M474,738 q36,46 4,98" />
          <path d="M330,742 q-20,-22 -8,-50" />
        </g>
      )}
    </g>
  )
}
