// The deck chair, side on: two crossed white bars and the coral sling the
// owner lies back in. Drawn behind him.
import { Limb } from '../../components/limb/Limb'
import { color } from '../../theme/theme'

// The sling hangs from the top of the back bar to the front of the seat bar.
const SLING = 'M198,560 C250,760 380,905 602,818'
const fabric = { d: SLING, fill: 'none', strokeLinecap: 'round' } as const

export const DeckChair: React.FC = () => (
  <g>
    {/* The bars: one from the seat's front edge back to the ground, one
        from the top of the backrest forward to the ground. */}
    <Limb points={[[235, 1002], [610, 812]]} width={20} fill={color.surface} />
    <Limb points={[[190, 548], [545, 1002]]} width={20} fill={color.surface} />

    {/* The sling: ink edge, coral cloth, one cream stripe. */}
    <path {...fabric} stroke={color.ink} strokeWidth={46} />
    <path {...fabric} stroke={color.coral} strokeWidth={30} />
    <path {...fabric} stroke={color.surface} strokeWidth={8} />
  </g>
)
