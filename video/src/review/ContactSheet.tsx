// Review sheet: a grid of frames from the film in one still, for checking
// poses and timing without playing the video. Not part of the film.
//   npx remotion still ContactSheet out/sheet.png --props='{"from":0,"step":4}'
import { AbsoluteFill, Freeze } from 'remotion'
import { LeadJourney } from '../lead-journey/LeadJourney'
import { color, font, SIZE } from '../theme/theme'

export type ContactSheetProps = {
  // First frame shown, and how many frames apart the cells are.
  from: number
  step: number
  // Grid shape, and each cell's size in pixels.
  columns: number
  rows: number
  cell: number
}

export const ContactSheet: React.FC<ContactSheetProps> = ({ from, step, columns, rows, cell }) => {
  const frames = Array.from({ length: columns * rows }, (_, i) => from + i * step)

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
              <LeadJourney />
            </Freeze>
          </div>
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
        </div>
      ))}
    </AbsoluteFill>
  )
}
