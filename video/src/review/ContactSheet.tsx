// Review sheet: a grid of frames from the film in one still, for checking
// poses and timing without playing the video. Not part of the film.
//   npx remotion still ContactSheet out/sheet.png --props='{"from":0,"step":4}'
import { AbsoluteFill, Freeze } from 'remotion'
import { LeadJourney } from '../lead-journey/LeadJourney'
import { TakeOnePhone } from '../takes/one-phone/TakeOnePhone'
import { TakeScroll } from '../takes/scroll/TakeScroll'
import { TakeSticker } from '../takes/sticker/TakeSticker'
import { color, font, SIZE } from '../theme/theme'

// The films a sheet can be made from.
const FILMS = { live: LeadJourney, scroll: TakeScroll, phone: TakeOnePhone, sticker: TakeSticker }

export type ContactSheetProps = {
  // Which film to take the frames from.
  film: keyof typeof FILMS
  // First frame shown, and how many frames apart the cells are.
  from: number
  step: number
  // Grid shape, and each cell's size in pixels.
  columns: number
  rows: number
  cell: number
  // Leave the frame numbers off (for a strip that is shown to people).
  plain?: boolean
  // Exact frames to show, in place of `from` and `step`.
  pick?: number[]
}

export const ContactSheet: React.FC<ContactSheetProps> = ({ film, from, step, columns, rows, cell, plain = false, pick }) => {
  const Film = FILMS[film]
  const frames = pick ?? Array.from({ length: columns * rows }, (_, i) => from + i * step)

  return (
    <AbsoluteFill style={{ background: color.ink }}>
      {frames.map((f, i) => (
        // One cell: the film frozen on frame f, shrunk to fit, with its
        // frame number in the corner.
        <div
          key={f}
          style={{
            position: 'absolute',
            left: (i % columns) * cell,
            top: Math.floor(i / columns) * cell,
            width: cell,
            height: cell,
            overflow: 'hidden',
            outline: `2px solid ${color.ink}`,
          }}
        >
          <div style={{ position: 'relative', width: SIZE, height: SIZE, transform: `scale(${cell / SIZE})`, transformOrigin: '0 0' }}>
            <Freeze frame={f}>
              <Film />
            </Freeze>
          </div>
          {!plain && (
            <span
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '2px 8px',
                background: color.ink,
                color: color.paper,
                font: `700 ${Math.round(cell / 22)}px ${font.mono}`,
              }}
            >
              {f}
            </span>
          )}
        </div>
      ))}
    </AbsoluteFill>
  )
}
