// The route map: a few city blocks, the van's route from the shop to the
// customer's pin, and the van itself part-way along it. A chip in the
// corner counts down the minutes, then says "Arrived".
import './ui.css'
import type { CSSProperties } from 'react'
import { color } from '../../theme/theme'

type Point = [number, number]

// The map is drawn in a 400×220 box. The route runs along the streets
// between the blocks.
const ROUTE: Point[] = [
  [110, 204],
  [110, 150],
  [286, 150],
  [286, 66],
  [346, 66],
]
const BLOCKS: [number, number, number, number, string][] = [
  [-10, -10, 104, 60, color.paperDim],
  [126, -10, 144, 60, color.paperDim],
  [302, -10, 120, 60, color.paperDim],
  [-10, 82, 104, 52, color.paperDim],
  [126, 82, 144, 52, color.mint],
  [302, 82, 120, 52, color.paperDim],
  [-10, 166, 104, 70, color.paperDim],
  [126, 166, 144, 70, color.paperDim],
  [302, 166, 120, 70, color.lilac],
]

// Each leg's length, and the whole route's.
const legs = ROUTE.slice(1).map(([x, y], i) => Math.hypot(x - ROUTE[i][0], y - ROUTE[i][1]))
const LENGTH = legs.reduce((sum, leg) => sum + leg, 0)

// The route up to a share of the way along it: the corners passed, then
// the point reached.
const routeTo = (progress: number) => {
  let left = LENGTH * Math.min(1, Math.max(0, progress))
  const points: Point[] = [ROUTE[0]]
  for (let i = 0; i < legs.length; i++) {
    const [from, to] = [ROUTE[i], ROUTE[i + 1]]
    if (left >= legs[i]) {
      points.push(to)
      left -= legs[i]
    } else {
      const share = left / legs[i]
      points.push([from[0] + (to[0] - from[0]) * share, from[1] + (to[1] - from[1]) * share])
      break
    }
  }
  return points
}

const path = (points: Point[]) => `M${points.map(([x, y]) => `${x},${y}`).join(' L')}`

type RouteMapProps = {
  // How far along the route the van is, 0 to 1.
  progress: number
  style?: CSSProperties
}

export const RouteMap: React.FC<RouteMapProps> = ({ progress, style }) => {
  const driven = routeTo(progress)
  const [vanX, vanY] = driven[driven.length - 1]
  const arrived = progress >= 1

  return (
    <div className="ui-map" style={style}>
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
        {/* The blocks (one a park, one a square), with streets between. */}
        {BLOCKS.map(([x, y, width, height, fill]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={width} height={height} rx={10} fill={fill} />
        ))}
        <g fill={color.mintDeep}>
          <circle cx={164} cy={108} r={13} />
          <circle cx={204} cy={104} r={16} />
          <circle cx={240} cy={112} r={11} />
        </g>

        {/* The route: dashed ahead, a solid mint line where the van has
            been. */}
        <path d={path(ROUTE)} fill="none" stroke={color.ink} strokeWidth={5} strokeDasharray="10 9" strokeLinecap="round" strokeLinejoin="round" />
        <path d={path(driven)} fill="none" stroke={color.ink} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
        <path d={path(driven)} fill="none" stroke={color.mint} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />

        {/* The shop it leaves from, and the customer's pin. */}
        <rect x={98} y={196} width={24} height={20} rx={5} fill={color.ink} />
        <path d="M364,62 c0,0 -17,-15 -17,-28 a17,17 0 0 1 34,0 c0,13 -17,28 -17,28 Z" fill={color.coral} stroke={color.ink} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={364} cy={34} r={6} fill={color.surface} />

        {/* The van. */}
        <g transform={`translate(${vanX} ${vanY})`}>
          <rect x={-24} y={-16} width={48} height={24} rx={7} fill={color.lemon} stroke={color.ink} strokeWidth={5} />
          <rect x={6} y={-11} width={12} height={10} rx={3} fill={color.surface} stroke={color.ink} strokeWidth={3} />
          <circle cx={-12} cy={9} r={6} fill={color.ink} />
          <circle cx={13} cy={9} r={6} fill={color.ink} />
        </g>
      </svg>

      <span className="nb-pill ui-map-eta" style={{ '--pill-bg': arrived ? color.mint : color.surface } as CSSProperties}>
        {arrived ? 'Arrived' : `${Math.max(1, Math.ceil((1 - progress) * 12))} min`}
      </span>
    </div>
  )
}
