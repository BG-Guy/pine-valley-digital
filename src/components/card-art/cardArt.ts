// Card art: the colourful card backgrounds shared by the "What we do" row
// and the work showcase. Put a theme class (card-theme-<name>) on a card,
// and the card-art class on a positioned layer inside it (plus card-lines
// for faint wavy lines over it). Styles live in cardArt.css.
import './cardArt.css'

// The four themes, in the order cards cycle through them, so neighbouring
// cards never share one.
export const CARD_THEMES = ['purple', 'green', 'gold', 'ink'] as const
export type CardTheme = (typeof CARD_THEMES)[number]
