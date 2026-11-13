// The owner's family, playing at the water's edge: his partner and their
// kid toss a beach ball back and forth. They stand further off, so they're
// drawn smaller than he is. `b` is the beach clock.
import { Limb } from '../../components/limb/Limb'
import { color, line } from '../../theme/theme'

type Point = [number, number]

// The ball goes there and back in this many frames: eight in the air each
// way, with a short catch at either end.
const TOSS = 24
const FLIGHT = 8

// Where each of them catches it.
const PARTNER_HANDS: Point = [846, 524]
const KID_HANDS: Point = [928, 586]

// Where the ball is, and who is reaching for it.
const tossAt = (b: number) => {
  const t = b % TOSS
  const toKid = t < TOSS / 2
  const flown = Math.min(1, (toKid ? t : t - TOSS / 2) / FLIGHT)
  const [from, to] = toKid ? [PARTNER_HANDS, KID_HANDS] : [KID_HANDS, PARTNER_HANDS]
  return {
    ball: [from[0] + (to[0] - from[0]) * flown, from[1] + (to[1] - from[1]) * flown - Math.sin(flown * Math.PI) * 64] as Point,
    partnerReaches: t >= TOSS - 6 || t < 3,
    kidReaches: t >= TOSS / 2 - 6 && t < TOSS / 2 + 3,
  }
}

const outline = { stroke: color.ink, strokeWidth: line.mid, strokeLinejoin: 'round' as const }

export const Family: React.FC<{ b: number }> = ({ b }) => {
  const { ball, partnerReaches, kidReaches } = tossAt(b)

  return (
    <g>
      {/* The partner, facing the kid: long hair, a lemon sun hat, a coral
          dress. Her near arm reaches up for the ball. */}
      <ellipse cx={782} cy={506} rx={36} ry={48} fill={color.hair} {...outline} />
      <Limb points={[[780, 612], [778, 694]]} width={16} fill={color.skinDeep} outline={line.mid} />
      <Limb points={[[802, 612], [806, 694]]} width={16} fill={color.skinDeep} outline={line.mid} />
      <Limb points={[[772, 550], [758, 606]]} width={14} fill={color.skinDeep} outline={line.mid} />
      <rect x={764} y={526} width={56} height={98} rx={24} fill={color.coral} {...outline} />
      <Limb points={[[812, 550], partnerReaches ? [840, 528] : [846, 572]]} width={14} fill={color.skinDeep} outline={line.mid} />
      <circle cx={792} cy={490} r={30} fill={color.skinDeep} {...outline} />
      <circle cx={806} cy={488} r={3.5} fill={color.ink} />
      <path d="M800,500 q8,7 15,0" fill="none" stroke={color.ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M764,468 Q766,432 792,432 Q818,432 820,468 Z" fill={color.lemon} {...outline} />
      <ellipse cx={792} cy={468} rx={50} ry={11} fill={color.lemon} {...outline} />

      {/* The kid, facing her: a lemon tee and lilac shorts, one arm always
          up, the other reaching for the ball. */}
      <Limb points={[[966, 652], [964, 700]]} width={13} fill={color.skin} outline={line.mid} />
      <Limb points={[[984, 652], [988, 700]]} width={13} fill={color.skin} outline={line.mid} />
      <Limb points={[[992, 614], [1010, 588]]} width={12} fill={color.skin} outline={line.mid} />
      <rect x={954} y={598} width={42} height={62} rx={16} fill={color.lemon} {...outline} />
      <rect x={952} y={640} width={46} height={28} rx={10} fill={color.lilac} {...outline} />
      <Limb points={[[958, 614], kidReaches ? [934, 592] : [938, 640]]} width={12} fill={color.skin} outline={line.mid} />
      <circle cx={975} cy={568} r={25} fill={color.skin} {...outline} />
      <path d="M951,560 Q975,528 999,560 Q975,548 951,560 Z" fill={color.hair} {...outline} />
      <circle cx={964} cy={568} r={3.2} fill={color.ink} />
      <path d="M957,578 q7,6 13,0" fill="none" stroke={color.ink} strokeWidth={4} strokeLinecap="round" />

      {/* The beach ball: lemon with a coral band. */}
      <circle cx={ball[0]} cy={ball[1]} r={24} fill={color.lemon} {...outline} />
      <path
        d={`M${ball[0] - 24},${ball[1]} Q${ball[0]},${ball[1] - 17} ${ball[0] + 24},${ball[1]} Q${ball[0]},${ball[1] + 17} ${ball[0] - 24},${ball[1]} Z`}
        fill={color.coral}
        stroke={color.ink}
        strokeWidth={line.thin}
        strokeLinejoin="round"
      />
    </g>
  )
}
