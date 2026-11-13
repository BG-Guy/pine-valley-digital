// Root: the list of things Remotion can render from this project. The film
// that is live on the site (LeadJourney), the new versions being tried out
// (takes/), and a review sheet of any film's frames (ContactSheet).
import { Composition } from 'remotion'
import './theme/theme.css'
import { loadFonts } from './theme/fonts'
import { FPS, SIZE } from './theme/theme'
import { TOTAL } from './timeline/timeline'
import { LeadJourney } from './lead-journey/LeadJourney'
import { TakeOnePhone } from './takes/one-phone/TakeOnePhone'
import { TOTAL as PHONE_TOTAL } from './takes/one-phone/timeline'
import { TakeScroll } from './takes/scroll/TakeScroll'
import { TOTAL as SCROLL_TOTAL } from './takes/scroll/timeline'
import { TakeSticker } from './takes/sticker/TakeSticker'
import { TOTAL as STICKER_TOTAL } from './takes/sticker/timeline'
import { ContactSheet, type ContactSheetProps } from './review/ContactSheet'

// Start loading the fonts as soon as the project opens.
loadFonts()

// The review sheet's default: sixteen frames spread across the live film.
const SHEET: ContactSheetProps = { film: 'live', from: 0, step: 14, columns: 4, rows: 4, cell: 540 }

const square = { fps: FPS, width: SIZE, height: SIZE }

export const Root: React.FC = () => (
  <>
    <Composition id="LeadJourney" component={LeadJourney} durationInFrames={TOTAL} {...square} />
    <Composition id="TakeScroll" component={TakeScroll} durationInFrames={SCROLL_TOTAL} {...square} />
    <Composition id="TakeOnePhone" component={TakeOnePhone} durationInFrames={PHONE_TOTAL} {...square} />
    <Composition id="TakeSticker" component={TakeSticker} durationInFrames={STICKER_TOTAL} {...square} />

    {/* As long as the longest film, though only one still is rendered from
        it: Remotion won't freeze a cell on a frame past the composition's
        end. */}
    <Composition
      id="ContactSheet"
      component={ContactSheet}
      durationInFrames={Math.max(TOTAL, SCROLL_TOTAL, PHONE_TOTAL, STICKER_TOTAL)}
      fps={FPS}
      width={SHEET.columns * SHEET.cell}
      height={SHEET.rows * SHEET.cell}
      defaultProps={SHEET}
      calculateMetadata={({ props }) => ({ width: props.columns * props.cell, height: props.rows * props.cell })}
    />
  </>
)
