// A phone's status bar: the time on the left, signal bars and a battery on
// the right. It sits at the top of a phone page (styles in ui.css).
import './ui.css'
import { color } from '../../theme/theme'

export const StatusBar: React.FC<{ time?: string }> = ({ time = '9:41' }) => (
  <div className="ui-status">
    <span>{time}</span>
    <span className="ui-status-icons">
      {/* Signal: four bars, each taller than the last. */}
      <svg width="30" height="22" viewBox="0 0 30 22" fill={color.ink}>
        <rect x={0} y={15} width={5} height={7} rx={1.5} />
        <rect x={8} y={10} width={5} height={12} rx={1.5} />
        <rect x={16} y={5} width={5} height={17} rx={1.5} />
        <rect x={24} y={0} width={5} height={22} rx={1.5} />
      </svg>
      {/* Battery: an outline, most of a charge, and its nub. */}
      <svg width="44" height="22" viewBox="0 0 44 22">
        <rect x={1.5} y={1.5} width={36} height={19} rx={6} fill="none" stroke={color.ink} strokeWidth={3} />
        <rect x={6} y={6} width={22} height={10} rx={3} fill={color.ink} />
        <rect x={40} y={7} width={4} height={8} rx={2} fill={color.ink} />
      </svg>
    </span>
  </div>
)
