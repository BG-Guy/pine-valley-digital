// Card art: the flat colour fills shared by the "What we do" row and the
// work showcase. Put a theme class (card-theme-<name>) on a card; it sets
// --card-fill, which the card-art class paints on a layer inside it (or the
// card uses directly). Styles live in cardArt.css.
import './cardArt.css'

// The four fills, in the order cards cycle through them, so neighbouring
// cards never share one.
export const CARD_THEMES = ['lilac', 'mint', 'lemon', 'cream'] as const
export type CardTheme = (typeof CARD_THEMES)[number]
