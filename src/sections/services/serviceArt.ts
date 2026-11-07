// Service card backgrounds: one quiet drawing per service behind the "What
// we do" cards, chosen by the user from three versions each. Styles (the
// colours and how a drawing fits the card) live in serviceArt.css.
import './serviceArt.css'

// Each drawing is in the open card's units on a wide screen (880 x 500) and
// keeps to the right half, where the card has no text. Class names set the
// colour: art-shape* is the card's fill a shade deeper, art-line* is thin
// ink.
const ART: Record<string, string> = {
  // A browser window: its three dots, the edge of the address bar and one
  // picture block, cut out of the shape.
  'web-design': `
    <rect x="520" y="70" width="420" height="330" rx="26" class="art-shape"/>
    <circle cx="556" cy="106" r="9" class="art-cut"/>
    <circle cx="586" cy="106" r="9" class="art-cut"/>
    <circle cx="616" cy="106" r="9" class="art-cut"/>
    <rect x="520" y="138" width="420" height="8" rx="0" class="art-cut"/>
    <rect x="556" y="172" width="200" height="124" rx="14" class="art-cut"/>`,
  // Code brackets, </>, in thick rounded strokes.
  'development': `
    <path d="M652 148 L540 250 L652 352" class="art-stroke" stroke-width="44"/>
    <path d="M748 118 L676 382" class="art-stroke" stroke-width="44"/>
    <path d="M772 148 L884 250 L772 352" class="art-stroke" stroke-width="44"/>`,
  // A logo construction grid: two overlapping circles in a box, with dashed
  // centre lines.
  'brand-identity': `
    <rect x="535" y="125" width="315" height="210" rx="0" class="art-guide"/>
    <path d="M500 230 H880 M640 92 V368 M745 92 V368" class="art-guide" stroke-dasharray="6 8"/>
    <circle cx="640" cy="230" r="105" class="art-line"/>
    <circle cx="745" cy="230" r="105" class="art-line"/>
    <path d="M632 230 H648 M640 222 V238 M737 230 H753 M745 222 V238" class="art-line"/>`,
  // A speed gauge: the dial, nine ticks and the needle near the top.
  'seo-performance': `
    <path d="M510.0 380.0 A180 180 0 0 1 870.0 380.0" class="art-line"/>
    <path d="M540.0 380.0 L526.0 380.0 M551.4 322.6 L538.5 317.2 M583.9 273.9 L574.0 264.0 M632.6 241.4 L627.2 228.5 M690.0 230.0 L690.0 216.0 M747.4 241.4 L752.8 228.5 M796.1 273.9 L806.0 264.0 M828.6 322.6 L841.5 317.2 M840.0 380.0 L854.0 380.0 " class="art-line"/>
    <path d="M690 380 L786 265" class="art-line"/>
    <circle cx="690" cy="380" r="12" class="art-line-filled"/>`,
  // A loop arrow: a ring that comes back round to its own start.
  'business-automation': `
    <path d="M775.0 100.1 A150 150 0 1 1 648.7 89.0" class="art-stroke" stroke-width="52"/>
    <polygon points="714.5,65.1 667.9,141.6 629.5,36.4" class="art-shape"/>`,
  // A map pin with its round hole.
  'local-seo': `
    <path d="M700 470 L580.3 272.6 A140 140 0 1 1 819.7 272.6Z" class="art-shape"/>
    <circle cx="700" cy="200" r="52" class="art-cut"/>`,
  // A first-aid plus.
  'care-maintenance': `
    <rect x="640" y="70" width="120" height="300" rx="26" class="art-shape"/>
    <rect x="550" y="160" width="300" height="120" rx="26" class="art-shape"/>`,
  // A shopping bag: its handle and the two holes it hangs from.
  'ecommerce': `
    <path d="M632 176 V138 A68 68 0 0 1 768 138 V176" class="art-stroke" stroke-width="24"/>
    <rect x="560" y="150" width="280" height="240" rx="24" class="art-shape"/>
    <circle cx="632" cy="188" r="10" class="art-cut"/>
    <circle cx="768" cy="188" r="10" class="art-cut"/>`,
  // A calendar page: its rings, the header line, a dot for each day and one
  // booked day, circled and ticked.
  'booking-payments': `
    <rect x="540" y="100" width="300" height="272" rx="16" class="art-line-filled"/>
    <path d="M540 150 H840" class="art-line"/>
    <path d="M600 84 V116 M780 84 V116" class="art-line"/>
    <circle cx="570" cy="194" r="4" class="art-point"/>
    <circle cx="630" cy="194" r="4" class="art-point"/>
    <circle cx="690" cy="194" r="4" class="art-point"/>
    <circle cx="750" cy="194" r="4" class="art-point"/>
    <circle cx="810" cy="194" r="4" class="art-point"/>
    <circle cx="570" cy="240" r="4" class="art-point"/>
    <circle cx="630" cy="240" r="4" class="art-point"/>
    <circle cx="690" cy="240" r="4" class="art-point"/>
    <circle cx="750" cy="240" r="4" class="art-point"/>
    <circle cx="810" cy="240" r="4" class="art-point"/>
    <circle cx="570" cy="286" r="4" class="art-point"/>
    <circle cx="630" cy="286" r="4" class="art-point"/>
    <circle cx="690" cy="286" r="4" class="art-point"/>
    <circle cx="810" cy="286" r="4" class="art-point"/>
    <circle cx="570" cy="332" r="4" class="art-point"/>
    <circle cx="630" cy="332" r="4" class="art-point"/>
    <circle cx="690" cy="332" r="4" class="art-point"/>
    <circle cx="750" cy="332" r="4" class="art-point"/>
    <circle cx="810" cy="332" r="4" class="art-point"/>
    <circle cx="750" cy="286" r="20" class="art-line"/>
    <path d="M741 286 L748 293 L760 279" class="art-line"/>`,
  // Four rising bars.
  'analytics-tracking': `
    <rect x="540" y="290" width="56" height="90" rx="16" class="art-shape"/>
    <rect x="620" y="220" width="56" height="160" rx="16" class="art-shape"/>
    <rect x="700" y="150" width="56" height="230" rx="16" class="art-shape"/>
    <rect x="780" y="80" width="56" height="300" rx="16" class="art-shape"/>`,
  // A star with rounded points.
  'reviews-reputation': `
    <polygon points="690.0,22.0 740.5,152.4 880.2,160.2 771.8,248.6 807.6,383.8 690.0,308.0 572.4,383.8 608.2,248.6 499.8,160.2 639.5,152.4" class="art-shape-round" stroke-width="26"/>`,
  // Two offset squares: the old site behind, the new one in front, a shade
  // deeper.
  'redesign-migration': `
    <rect x="520" y="90" width="210" height="210" rx="24" class="art-shape"/>
    <rect x="650" y="180" width="210" height="210" rx="24" class="art-shape-deep"/>`,
  // The access figure, arms out, cut out of a circle.
  'accessibility': `
    <circle cx="700" cy="230" r="190" class="art-shape"/>
    <circle cx="700" cy="138" r="28" class="art-cut"/>
    <path d="M604 196 H796" class="art-cut-stroke" stroke-width="28"/>
    <path d="M700 196 V298" class="art-cut-stroke" stroke-width="32"/>
    <path d="M700 298 L656 384 M700 298 L744 384" class="art-cut-stroke" stroke-width="30"/>`,
  // A chat: the assistant typing, the customer's reply, a short answer and a
  // sparkle.
  'ai-assistants': `
    <rect x="530" y="110" width="230" height="72" rx="36" class="art-line-filled"/>
    <circle cx="619" cy="146" r="6" class="art-point"/>
    <circle cx="645" cy="146" r="6" class="art-point"/>
    <circle cx="671" cy="146" r="6" class="art-point"/>
    <rect x="620" y="212" width="240" height="72" rx="36" class="art-line-filled"/>
    <path d="M654 240 H826 M654 262 H770" class="art-guide"/>
    <rect x="530" y="314" width="150" height="60" rx="30" class="art-line-filled"/>
    <path d="M560 344 H650" class="art-guide"/>
    <path d="M806 106 Q808.6 125.4 828 128 Q808.6 130.6 806 150 Q803.4 130.6 784 128 Q803.4 125.4 806 106Z" class="art-line"/>`,
}

// The drawing for a service's card, or nothing if it has none. It goes in
// the card's art layer (services.ts), which screen readers already skip.
export const serviceArt = (slug: string) =>
  ART[slug] ? `<svg class="svc-art-svg" viewBox="0 0 880 500" preserveAspectRatio="xMaxYMid meet">${ART[slug]}</svg>` : ''
