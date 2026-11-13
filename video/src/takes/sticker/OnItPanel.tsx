// The "On it!" panel: on mint, the technician's van drives in along a road
// toward the customer's house, kicking up dust. A starburst says who's on
// it, and his badge pops on. `t` is frames since the panel's beat began
// (negative while it pans in).
import type { CSSProperties } from 'react'
import { Avatar } from '../../art/ui/Avatar'
import { color, line, SIZE } from '../../theme/theme'
import { keyed, pop } from '../../timeline/motion'
import { WordBurst } from './WordBurst'

// The van's drive in from the left, frame by frame; then it holds its
// place while the road runs under it.
const DRIVE_IN = [-560, -300, -90, 40, 110, 150, 170]

const ink = { stroke: color.ink, strokeWidth: line.heavy, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

export const OnItPanel: React.FC<{ t: number }> = ({ t }) => {
  // Everything that makes it move: the van bounces, its wheels turn, the
  // road's dashes run left, the dust puffs swap, the pin bobs.
  const vanX = t < 1 ? DRIVE_IN[0] : keyed(t, 1, DRIVE_IN)
  const bounce = t % 2 === 0 ? 0 : -8
  const spin = t * 38
  const road = (t * 44) % 220
  const puff = Math.floor(t / 2) % 2 === 0
  const bob = Math.floor(t / 3) % 2 === 0 ? 0 : -14

  return (
    <div className="panel" style={{ background: color.mint }}>
      <svg width={SIZE} height={SIZE}>
        {/* Hills, and the road with its centre line. */}
        <path d="M-10,820 V700 Q160,560 360,690 T740,660 T1090,640 V820 Z" fill={color.mintDeep} {...ink} />
        <rect x={-10} y={810} width={SIZE + 20} height={300} fill={color.ink} />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={i * 220 - road} y={926} width={110} height={18} rx={9} fill={color.surface} />
        ))}

        {/* Speed lines and dust behind the van. */}
        <g stroke={color.ink} strokeWidth={10} strokeLinecap="round">
          <line x1={vanX - 150} y1={590} x2={vanX - (puff ? 40 : 70)} y2={590} />
          <line x1={vanX - 210} y1={660} x2={vanX - (puff ? 60 : 30)} y2={660} />
          <line x1={vanX - 130} y1={730} x2={vanX - (puff ? 30 : 56)} y2={730} />
        </g>
        <g fill={color.surface} {...ink}>
          <circle cx={vanX - 30} cy={790} r={puff ? 34 : 22} />
          <circle cx={vanX - 96} cy={776} r={puff ? 22 : 34} />
          <circle cx={vanX - 150} cy={800} r={puff ? 16 : 10} />
        </g>
      </svg>

      {/* The customer's house, and the pin over it. */}
      <div className="sticker" style={{ left: 790, top: 560 }}>
        <svg width="240" height="260" style={{ display: 'block', overflow: 'visible' }}>
          <rect x={30} y={110} width={180} height={140} fill={color.surface} {...ink} />
          <path d="M10,118 L120,24 L230,118 Z" fill={color.coral} {...ink} />
          <rect x={98} y={170} width={46} height={80} fill={color.lilac} {...ink} />
          <rect x={160} y={140} width={34} height={34} fill={color.lemon} {...ink} strokeWidth={line.mid} />
          <rect x={46} y={140} width={34} height={34} fill={color.lemon} {...ink} strokeWidth={line.mid} />
        </svg>
      </div>
      <div className="sticker" style={{ left: 866, top: 420 + bob }}>
        <svg width="90" height="120" viewBox="0 0 90 120" style={{ display: 'block' }}>
          <path d="M45,112 c0,0 -38,-34 -38,-66 a38,38 0 0 1 76,0 c0,32 -38,66 -38,66 Z" fill={color.coral} {...ink} />
          <circle cx={45} cy={46} r={14} fill={color.surface} />
        </svg>
      </div>

      {/* The van: a lemon box with a coral stripe and a wrench badge, the
          tech at the wheel, and two wheels that turn. */}
      <div className="sticker" style={{ left: vanX, top: 500 + bounce }}>
        <svg width="540" height="290" style={{ display: 'block', overflow: 'visible' }}>
          <rect x={20} y={30} width={320} height={190} rx={26} fill={color.lemon} {...ink} />
          <path d="M340,74 H402 Q430,74 444,100 L474,158 Q512,162 512,196 V220 H340 Z" fill={color.lemon} {...ink} />
          <rect x={24} y={150} width={312} height={30} fill={color.coral} />
          <path d="M356,92 H398 Q416,92 426,110 L446,150 H356 Z" fill={color.surface} {...ink} strokeWidth={line.mid} />
          <circle cx={392} cy={130} r={17} fill={color.skin} {...ink} strokeWidth={5} />
          <path d="M374,124 Q376,106 392,106 Q408,106 410,124 Z" fill={color.coral} {...ink} strokeWidth={5} />
          <circle cx={176} cy={96} r={46} fill={color.ink} />
          <path d="M152,116 l30,-30 a16,16 0 1 1 12,12 l-30,30 a8,8 0 0 1 -12,-12 Z" fill={color.surface} />
          <rect x={496} y={196} width={28} height={22} rx={8} fill={color.ink} />
          <circle cx={494} cy={178} r={10} fill={color.surface} {...ink} strokeWidth={5} />
          {[122, 418].map((x) => (
            <g key={x} transform={`rotate(${spin} ${x} 224)`}>
              <circle cx={x} cy={224} r={46} fill={color.ink} />
              <circle cx={x} cy={224} r={18} fill={color.surface} />
              <path d={`M${x - 34},224 H${x + 34} M${x},190 V258`} stroke={color.surface} strokeWidth={7} strokeLinecap="round" />
            </g>
          ))}
        </svg>
      </div>

      {/* Who's on it: the shout, and his badge. */}
      <div className="sticker" style={{ left: 50, top: 50, scale: String(pop(t, 6)), rotate: `${Math.floor(t / 3) % 2 === 0 ? -9 : -4}deg` }}>
        <WordBurst size={420} fill={color.coral} lines={["Mike's", 'on it!']} type={23} />
      </div>
      <div className="sticker" style={{ left: 770, top: 90, scale: String(pop(t, 10)), rotate: '6deg' }}>
        <Avatar size={190} fill={color.lemon} hair="cap" />
      </div>
      <div className="nb-pill" style={{ '--pill-bg': color.surface, left: 716, top: 296, fontSize: 28, scale: String(pop(t, 12)) } as CSSProperties}>
        Mike · 12 min
      </div>
    </div>
  )
}
