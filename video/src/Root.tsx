// Root: the list of things Remotion can render from this project. The film
// itself (LeadJourney) and a review sheet of its frames (ContactSheet).
import { Composition } from 'remotion'
import './theme/theme.css'
import { loadFonts } from './theme/fonts'
import { FPS, SIZE } from './theme/theme'
import { LeadJourney } from './films/lead-journey/LeadJourney'
import { TOTAL } from './films/lead-journey/timeline'
import { ContactSheet, type ContactSheetProps } from './review/ContactSheet'

// Start loading the fonts as soon as the project opens.
loadFonts()

// The review sheet's default: sixteen frames spread across the whole loop.
const SHEET: ContactSheetProps = { from: 0, step: 10, columns: 4, rows: 4, cell: 540 }

export const Root: React.FC = () => (
  <>
    <Composition id="LeadJourney" component={LeadJourney} durationInFrames={TOTAL} fps={FPS} width={SIZE} height={SIZE} />

    {/* As long as the film, though only one still is rendered from it:
        Remotion won't freeze a cell on a frame past the composition's end. */}
    <Composition
      id="ContactSheet"
      component={ContactSheet}
      durationInFrames={TOTAL}
      fps={FPS}
      width={SHEET.columns * SHEET.cell}
      height={SHEET.rows * SHEET.cell}
      defaultProps={SHEET}
      calculateMetadata={({ props }) => ({ width: props.columns * props.cell, height: props.rows * props.cell })}
    />
  </>
)
