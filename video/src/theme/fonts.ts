// Loads the site's three typefaces from public/fonts, so text in the film is
// set in the same fonts as the page. Rendering waits until they are ready.
import { loadFont } from '@remotion/fonts'
import { staticFile } from 'remotion'

// Bricolage Grotesque and Work Sans are variable fonts: one file covers the
// weights (and, for Bricolage, the condensed width the headings use).
export const loadFonts = () =>
  Promise.all([
    loadFont({
      family: 'Bricolage Grotesque',
      url: staticFile('fonts/bricolage-grotesque.woff2'),
      weight: '400 800',
      stretch: '75% 100%',
    }),
    loadFont({ family: 'Work Sans', url: staticFile('fonts/work-sans.woff2'), weight: '400 700' }),
    loadFont({ family: 'Space Mono', url: staticFile('fonts/space-mono-400.woff2'), weight: '400' }),
    loadFont({ family: 'Space Mono', url: staticFile('fonts/space-mono-700.woff2'), weight: '700' }),
  ])
