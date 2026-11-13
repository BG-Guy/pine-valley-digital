// The owner's family, playing at the water's edge: his partner and their
// kid toss a beach ball back and forth while the dog jumps for it. They
// stand further off, so they're drawn smaller than he is. `clock` is the
// beach's clock. SVG only.
import { Limb } from '../../components/limb/Limb'
import { color, line } from '../../theme/theme'

type Point = [number, number]

// The ball goes there and back in this many frames: eight in the air each
// way, with a short catch at either end.
const TOSS = 24
const FLIGHT = 8

// Where each of them catches it.
const PARTNER_HANDS: Point = [846, 524]
const KID_HANDS: Point = [932, 586]

// Where the ball is, how far through its flight, and who is reaching.
const tossAt = (clock: number) => {
  const t = clock % TOSS
  const toKid = t < TOSS / 2
  const flown = Math.min(1, (toKid ? t : t - TOSS / 2) / FLIGHT)
  const [from, to] = toKid ? [PARTNER_HANDS, KID_HANDS] : [KID_HANDS, PARTNER_HANDS]
  return {
    ball: [from[0] + (to[0] - from[0]) * flown, from[1] + (to[1] - from[1]) * flown - Math.sin(flown * Math.PI) * 64] as Point,
    flown,
    partnerReaches: t >= TOSS - 6 || t < 3,
    kidReaches: t >= TOSS / 2 - 6 && t < TOSS / 2 + 3,
  }
}

const outline = { stroke: color.ink, strokeWidth: line.mid, strokeLinejoin: 'round' as const }
const limb = { outline: line.mid }

export const Family: React.FC<{ clock: number }> = ({ clock }) => {
  const { ball, flown, partnerReaches, kidReaches } = tossAt(clock)

  // The dog leaps while the ball is in the air, and wags the rest of the
  // time.
  const leap = flown > 0 && flown < 1 ? Math.sin(flown * Math.PI) * 34 : 0
  const wag = Math.floor(clock / 2) % 2 === 0

  return (
    <g>
      {/* Their shadows on the wet sand. */}
      <g fill={color.khaki}>
        <ellipse cx={794} cy={700} rx={42} ry={8} />
        <ellipse cx={876} cy={708} rx={34} ry={6} />
        <ellipse cx={978} cy={706} rx={30} ry={7} />
      </g>

      {/* The partner, facing the kid: long hair, a lemon sun hat,
          sunglasses, a spotted coral dress. Her near arm reaches up for
          the ball. */}
      <ellipse cx={782} cy={506} rx={36} ry={48} fill={color.hair} {...outline} />
      <Limb points={[[780, 612], [778, 694]]} width={16} fill={color.skinDeep} {...limb} />
      <Limb points={[[802, 612], [806, 694]]} width={16} fill={color.skinDeep} {...limb} />
      <Limb points={[[772, 550], [758, 606]]} width={14} fill={color.skinDeep} {...limb} />
      <rect x={764} y={526} width={56} height={98} rx={24} fill={color.coral} {...outline} />
      <g fill={color.surface}>
        <circle cx={782} cy={556} r={5} />
        <circle cx={802} cy={576} r={5} />
        <circle cx={780} cy={598} r={5} />
      </g>
      <Limb points={[[812, 550], partnerReaches ? [840, 528] : [846, 572]]} width={14} fill={color.skinDeep} {...limb} />
      <circle cx={792} cy={490} r={30} fill={color.skinDeep} {...outline} />
      <rect x={794} y={480} width={28} height={14} rx={6} fill={color.ink} />
      <path d="M800,502 q8,7 15,0" fill="none" stroke={color.ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M764,468 Q766,432 792,432 Q818,432 820,468 Z" fill={color.lemon} {...outline} />
      <path d="M766,458 H818" fill="none" stroke={color.coral} strokeWidth={7} />
      <ellipse cx={792} cy={468} rx={50} ry={11} fill={color.lemon} {...outline} />

      {/* The dog: white, with an ink ear and a wagging tail. */}
      <g transform={`translate(0 ${-leap})`}>
        <path d={wag ? 'M850,672 q-18,-12 -12,-30' : 'M850,672 q-22,-4 -24,-22'} fill="none" stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round" />
        <g stroke={color.ink} strokeWidth={line.mid} strokeLinecap="round">
          <line x1={858} y1={688} x2={leap ? 850 : 856} y2={704} />
          <line x1={872} y1={690} x2={leap ? 866 : 872} y2={704} />
          <line x1={888} y1={690} x2={leap ? 896 : 888} y2={704} />
          <line x1={900} y1={688} x2={leap ? 910 : 902} y2={704} />
        </g>
        <rect x={846} y={662} width={62} height={30} rx={15} fill={color.surface} {...outline} />
        <circle cx={912} cy={654} r={16} fill={color.surface} {...outline} />
        <ellipse cx={903} cy={644} rx={7} ry={11} fill={color.ink} transform="rotate(-24 903 644)" />
        <circle cx={917} cy={651} r={2.8} fill={color.ink} />
        <circle cx={927} cy={656} r={4} fill={color.ink} />
      </g>

      {/* The kid, facing her: a lemon tee, lilac shorts and a striped swim
          ring, one arm always up, the other reaching for the ball. */}
      <Limb points={[[966, 652], [964, 700]]} width={13} fill={color.skin} {...limb} />
      <Limb points={[[984, 652], [988, 700]]} width={13} fill={color.skin} {...limb} />
      <Limb points={[[992, 614], [1010, 588]]} width={12} fill={color.skin} {...limb} />
      <rect x={954} y={598} width={42} height={62} rx={16} fill={color.lemon} {...outline} />
      <rect x={952} y={642} width={46} height={26} rx={10} fill={color.lilac} {...outline} />
      <ellipse cx={975} cy={636} rx={36} ry={13} fill={color.surface} {...outline} />
      <path d="M951,628 l8,18 M975,623 v26 M999,628 l-8,18" fill="none" stroke={color.coral} strokeWidth={8} />
      <ellipse cx={975} cy={636} rx={36} ry={13} fill="none" {...outline} />
      <Limb points={[[958, 614], kidReaches ? [936, 592] : [938, 636]]} width={12} fill={color.skin} {...limb} />
      <circle cx={975} cy={568} r={25} fill={color.skin} {...outline} />
      <path d="M951,560 Q975,528 999,560 Q975,548 951,560 Z" fill={color.hair} {...outline} />
      <circle cx={964} cy={568} r={3.2} fill={color.ink} />
      <path d="M957,578 q7,6 13,0" fill="none" stroke={color.ink} strokeWidth={4} strokeLinecap="round" />

      {/* The beach ball: lemon with a coral band and a white patch. */}
      <circle cx={ball[0]} cy={ball[1]} r={24} fill={color.lemon} {...outline} />
      <path
        d={`M${ball[0] - 24},${ball[1]} Q${ball[0]},${ball[1] - 17} ${ball[0] + 24},${ball[1]} Q${ball[0]},${ball[1] + 17} ${ball[0] - 24},${ball[1]} Z`}
        fill={color.coral}
        stroke={color.ink}
        strokeWidth={line.thin}
        strokeLinejoin="round"
      />
      <circle cx={ball[0] - 8} cy={ball[1] - 12} r={4} fill={color.surface} />
    </g>
  )
}
