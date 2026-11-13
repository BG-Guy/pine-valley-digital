// A round avatar with a simple face: a coloured disc, shoulders, a head,
// hair or a cap, two eyes and a smile.
import { color } from '../../theme/theme'

type AvatarProps = {
  // Its width and height on the canvas.
  size: number
  // The disc's colour.
  fill: string
  skin?: string
  // A short crop, long hair, or a technician's cap.
  hair?: 'crop' | 'long' | 'cap'
}

export const Avatar: React.FC<AvatarProps> = ({ size, fill, skin = color.skin, hair = 'crop' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', flex: 'none' }}>
    <clipPath id="avatar-disc">
      <circle cx={50} cy={50} r={44} />
    </clipPath>
    <circle cx={50} cy={50} r={46} fill={fill} />

    <g clipPath="url(#avatar-disc)" stroke={color.ink} strokeLinejoin="round" strokeLinecap="round">
      {/* Long hair falls behind the shoulders. */}
      {hair === 'long' && <path d="M24,52 Q20,16 50,16 Q80,16 76,52 L80,90 L20,90 Z" fill={color.hair} strokeWidth={4} />}

      {/* Shoulders and head. */}
      <path d="M12,104 Q14,72 50,72 Q86,72 88,104 Z" fill={color.surface} strokeWidth={5} />
      <circle cx={50} cy={48} r={22} fill={skin} strokeWidth={5} />

      {/* Hair or cap. */}
      {hair === 'crop' && <path d="M28,44 Q28,22 50,22 Q72,22 72,44 Q58,30 28,44 Z" fill={color.hair} strokeWidth={4} />}
      {hair === 'long' && <path d="M27,46 Q28,24 50,24 Q72,24 73,46 Q54,30 27,46 Z" fill={color.hair} strokeWidth={4} />}
      {hair === 'cap' && (
        <>
          <path d="M27,42 Q28,19 50,19 Q72,19 73,42 Z" fill={color.coral} strokeWidth={4} />
          <path d="M70,42 H90" fill="none" strokeWidth={7} />
        </>
      )}

      {/* Eyes and smile. */}
      <circle cx={42} cy={51} r={2.8} fill={color.ink} stroke="none" />
      <circle cx={58} cy={51} r={2.8} fill={color.ink} stroke="none" />
      <path d="M42,59 q8,7 16,0" fill="none" strokeWidth={3.5} />
    </g>

    <circle cx={50} cy={50} r={46} fill="none" stroke={color.ink} strokeWidth={7} />
  </svg>
)
