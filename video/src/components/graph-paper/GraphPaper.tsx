// The site's cream graph paper, filling the frame behind everything.
import { AbsoluteFill } from 'remotion'
import { color, GRID } from '../../theme/theme'

export const GraphPaper: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: color.paper,
      backgroundImage: `linear-gradient(${color.grid} 2px, transparent 2px), linear-gradient(90deg, ${color.grid} 2px, transparent 2px)`,
      backgroundSize: `${GRID}px ${GRID}px`,
    }}
  />
)
