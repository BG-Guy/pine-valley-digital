// Print effects the Sticker strip version's drawings share: a halftone dot
// pattern (fill="url(#halftone)") and a white die-cut rim round whatever
// it is applied to (filter: url(#diecut)), like the stickers on the site's
// service pages. Rendered once per film, out of sight.
import { color } from '../../theme/theme'

export const PrintDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      {/* Ink dots on a tilted grid. */}
      <pattern id="halftone" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <circle cx="11" cy="11" r="4" fill={color.ink} />
      </pattern>

      {/* The rim: the shape's outline, swollen and hardened, filled white
          and laid under the shape. */}
      <filter id="diecut" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceAlpha" stdDeviation="9" />
        <feComponentTransfer result="spread">
          <feFuncA type="linear" slope="40" intercept="-4" />
        </feComponentTransfer>
        <feFlood floodColor={color.surface} />
        <feComposite in2="spread" operator="in" result="rim" />
        <feMerge>
          <feMergeNode in="rim" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
)
