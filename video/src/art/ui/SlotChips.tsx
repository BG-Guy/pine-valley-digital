// The time slots: three chips, of which the pointer picks the middle one
// (2:00). The picked chip sinks under the click and turns mint.
import './ui.css'
import { color } from '../../theme/theme'
import { press } from '../../timeline/motion'

const SLOTS = ['12:00', '2:00', '4:30']
const PICK = 1

type SlotChipsProps = {
  frame: number
  // The frame the pointer clicks the slot.
  clickAt: number
}

export const SlotChips: React.FC<SlotChipsProps> = ({ frame, clickAt }) => {
  const pressed = press(frame, clickAt) * 6
  const picked = frame >= clickAt

  return (
    <div className="ui-slots">
      {SLOTS.map((slot, i) => {
        const sunk = i === PICK ? pressed : 0
        return (
          <div
            key={slot}
            className="ui-slot"
            style={{
              background: i === PICK && picked ? color.mint : undefined,
              translate: `${sunk}px ${sunk}px`,
              boxShadow: `${6 - sunk}px ${6 - sunk}px 0 ${color.ink}`,
            }}
          >
            {slot}
          </div>
        )
      })}
    </div>
  )
}
