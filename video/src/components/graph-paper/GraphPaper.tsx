// The site's cream graph paper, filling the frame. The grid slides with the
// camera (offsetY, or offsetX for a film that pans sideways), so a move
// reads as movement even between stations.
import { AbsoluteFill } from 'remotion'
import { color, GRID } from '../../theme/theme'

export const GraphPaper: React.FC<{ offsetY: number; offsetX?: number }> = ({ offsetY, offsetX = 0 }) => (
  <AbsoluteFill
    style={{
      backgroundColor: color.paper,
      backgroundImage: `linear-gradient(${color.grid} 2px, transparent 2px), linear-gradient(90deg, ${color.grid} 2px, transparent 2px)`,
      backgroundSize: `${GRID}px ${GRID}px`,
      backgroundPosition: `${Math.round(offsetX % GRID)}px ${Math.round(offsetY % GRID)}px`,
    }}
  />
)
