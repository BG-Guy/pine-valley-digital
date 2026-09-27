// Content for the 14 per-service landing pages (Thrive & Scale framework —
// see ~/.claude/skills/seo-landing-page-copywriter). One object per service;
// `slug` decides the page's URL (services/<slug>.html) and its data-service
// attribute (see main.ts). Stats and social proof are either a real,
// well-known, sourced figure, or a plain reasoned claim — nothing here is a
// fabricated statistic or an invented client quote.

export interface ServiceLandingData {
  slug: string
  navTitle: string
  shortCopy: string // the 1-2 sentence blurb used in the home page's "What we do" list
  eyebrow: string
  headline: string
  headlineAccent: string // the word/phrase within the headline shown in the accent color
  subhead: string
  teasers: [string, string, string]
  stats: { value: string; label: string; source?: string }[]
  strategicShift: string
  whatWeDo: string
  journey: { title: string; copy: string }[]
  signs: string[]
  diagnosticIntro: string
  socialProof: string
  objections: { q: string; a: string }[]
  ctaHeadline: string
  ctaSub: string
}

export const servicesLandingData: ServiceLandingData[] = [
  {
    slug: 'web-design',
    navTitle: 'Web Design',
    shortCopy: 'Interfaces built around your content and your users, not a template — wireframed, art-directed, and refined until it feels inevitable.',
    eyebrow: 'Web Design',
    headline: 'A website that looks like it belongs to the business you actually run.',
    headlineAccent: 'belongs',
    subhead:
      "You don't need a bigger site, you need the right one — designed around what your business actually sells and who actually buys it, not a template with your logo dropped in.",
    teasers: [
      'Wireframed around your real content, not filler copy dropped into a theme',
      'Art-directed pages, not a stack of default component blocks',
      'A design your next hire can extend without redoing it',
    ],
    stats: [
      { value: '50ms', label: 'is roughly how long it takes a visitor to form a first impression of your site', source: 'Lindgaard et al., 2006' },
      { value: '94%', label: 'of that first impression comes down to design, not copy', source: 'commonly cited web-credibility research' },
      { value: '3s', label: 'is about how long most visitors give a page before they decide to leave', source: 'Google/SOASTA research' },
    ],
    strategicShift: 'Established businesses have stopped treating their site as a one-time project and started treating it as the first conversation a prospect has with them — which is why the ones scaling fastest keep it current instead of relaunching from scratch every few years.',
    whatWeDo:
      "Wireframes built around your actual content and user flow, then art-directed pages that carry your brand instead of a template's. Every page is designed to work at the width someone's actually viewing it on, not just a 1440px mockup.",
    journey: [
      { title: 'Discover', copy: 'A short, focused kickoff on your goals, audience, and constraints — so we design the right thing, not just a pretty one.' },
      { title: 'Wireframe', copy: 'Structure and content flow first, before a single pixel is styled — so the site works before it looks good.' },
      { title: 'Design', copy: 'High-fidelity screens, reviewed together at every stage, not delivered as a surprise.' },
      { title: 'Hand off', copy: 'Design files and a live build you and your team can both actually use going forward.' },
    ],
    signs: [
      'Your site was built more than 3–4 years ago and it shows',
      "You're embarrassed to send prospects your own homepage",
      'Every page looks like a different template stitched together',
      "Your brand has changed but your site hasn't",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      "Growing businesses treat their site design the same way they treat their storefront: worth getting right, because it's doing sales work with no one standing behind the counter.",
    objections: [
      { q: 'How long does a redesign actually take?', a: 'A focused, single-site redesign typically runs a few weeks from kickoff to launch, not months — scoped and confirmed with you before we start.' },
      { q: "Will it work with what I already have?", a: "Yes. We design around your existing content, tools, and domain — you're not starting your business over, just your site." },
      { q: 'What happens after launch?', a: "You get the files and a working site either way. If you want us to keep it updated, that's Care & Maintenance — never required." },
    ],
    ctaHeadline: 'Let’s see what your site could actually look like.',
    ctaSub: 'Tell us a bit about your business — no pressure, no obligation.',
  },
  {
    slug: 'development',
    navTitle: 'Development',
    shortCopy: 'Hand-built front ends with lean, modern tooling. No bloated CMS, no unnecessary dependencies — just fast, maintainable code.',
    eyebrow: 'Development',
    headline: 'A site that loads before your visitor changes their mind.',
    headlineAccent: 'loads',
    subhead:
      "You don't need more plugins, you need less weight — hand-built front ends with lean, modern tooling instead of a bloated CMS carrying code nobody uses.",
    teasers: [
      'No unnecessary dependencies — every line of code earns its place',
      'Built to pass Core Web Vitals, not just look fine in a demo',
      'Code your next developer can actually read',
    ],
    stats: [
      { value: '32%', label: 'higher bounce probability as load time goes from 1s to 3s', source: 'Google/SOASTA research' },
      { value: '53%', label: 'of mobile visits are abandoned if a page takes over 3 seconds to load', source: 'Google/DoubleClick research' },
      { value: '0', label: 'unnecessary dependencies is the actual target, not a nice-to-have' },
    ],
    strategicShift: "The businesses pulling ahead online aren't the ones with the most features — they're the ones whose site simply works, on the first try, on a phone, on bad wifi, every time.",
    whatWeDo:
      'Hand-built front ends with modern, lean tooling — no bloated CMS, no plugin stack you have to maintain forever. Fast by default, not fast after a plugin promises to fix it.',
    journey: [
      { title: 'Scope', copy: 'What the site actually needs to do, technically — before we choose a single tool.' },
      { title: 'Build', copy: 'Hand-coded, tested across devices, optimized before it ever ships — not after users complain.' },
      { title: 'Measure', copy: 'Real Core Web Vitals numbers, not guesses, before launch.' },
      { title: 'Launch', copy: 'Deployed and handed off with everything you need to keep running it.' },
    ],
    signs: [
      'Your site takes more than 3 seconds to load on mobile',
      "You've lost count of how many plugins are installed",
      'A developer once told you the codebase is "a lot"',
      "Every update means holding your breath that nothing breaks",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Teams that have already been burned by a slow, plugin-heavy build tend to be the ones most insistent on lean code the second time around — it stops being a preference once you’ve lived without it.',
    objections: [
      { q: 'Do I have to rebuild everything from scratch?', a: "Usually not — we assess what's salvageable first. Sometimes it's a rebuild, often it's a targeted rework." },
      { q: 'Will my current tools still work?', a: "We build around the tools you actually use — CRM, email, analytics — not around a CMS that dictates them." },
      { q: 'Who maintains it after launch?', a: 'You, your team, or us on an ongoing basis — your call. Nothing here locks you in.' },
    ],
    ctaHeadline: 'Curious how fast your site could actually be?',
    ctaSub: 'Tell us where it lives now — we’ll tell you honestly what’s slowing it down.',
  },
  {
    slug: 'brand-identity',
    navTitle: 'Brand & Identity',
    shortCopy: 'Logo, type system, color, voice — a visual language that holds up across the site, social, and everything after launch.',
    eyebrow: 'Brand & Identity',
    headline: 'Look like the same business everywhere someone finds you.',
    headlineAccent: 'same business',
    subhead:
      "You don't need a new logo, you need one visual language — across your site, your socials, and everything that comes after launch — so nothing you send out looks like it's from a different company.",
    teasers: [
      'A type system and color palette you can actually apply, not just admire',
      'A voice guide so your copy sounds like one business, not five',
      'Assets that hold up at a business card and a billboard',
    ],
    stats: [
      { value: '23%', label: 'average revenue lift reported by businesses with consistently presented branding', source: 'Lucidpress/Demand Metric survey' },
      { value: '1', label: 'visual language should be all it takes to recognize you, anywhere' },
    ],
    strategicShift: 'As a business grows past its founder posting everything personally, an unwritten brand stops scaling — the businesses that keep looking coherent are the ones that wrote it down before they needed to.',
    whatWeDo:
      'Logo, type system, color, and voice — a visual language that holds up across the site, social, and everything after launch, documented so anyone on your team can apply it consistently.',
    journey: [
      { title: 'Audit', copy: 'What you have now, what’s working, what’s inconsistent — before we change anything.' },
      { title: 'Define', copy: 'Logo, palette, type, and voice, refined together, not delivered as a surprise reveal.' },
      { title: 'Apply', copy: 'Real templates and examples across your actual channels, not just a PDF nobody opens.' },
      { title: 'Document', copy: 'A guide your team — and anyone you hire later — can actually follow.' },
    ],
    signs: [
      'Your logo has three slightly different versions floating around',
      'Your site, socials, and invoices all look like different companies',
      "You've never written down your brand colors as hex codes",
      "Someone on your team asks \"which logo do I use?\" more than once a year",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Businesses that invest in a documented brand system tend to spend less time relitigating design decisions later — the guide answers the question before it gets asked.',
    objections: [
      { q: 'Do we need a full rebrand?', a: "Rarely. Most of the time it's refining and documenting what already half-exists, not starting over." },
      { q: 'How does this connect to the site?', a: "It's built to feed directly into Web Design — the brand system becomes the design system." },
      { q: 'What do we actually receive?', a: 'Source files for the mark, a type and color system, and a written voice guide — usable assets, not just a mood board.' },
    ],
    ctaHeadline: 'Let’s see what one consistent brand could look like.',
    ctaSub: 'Send us what you have now — logos, colors, whatever exists.',
  },
  {
    slug: 'seo-performance',
    navTitle: 'SEO & Performance',
    shortCopy: 'Sites that load in a blink and rank because of it. Technical SEO, Core Web Vitals, and clean semantic markup from day one.',
    eyebrow: 'SEO & Performance',
    headline: 'Rank because your site actually deserves to.',
    headlineAccent: 'actually deserves',
    subhead:
      "You don't need more backlinks, you need a site that's technically sound — Core Web Vitals, clean semantic markup, and real content structure, from day one instead of bolted on after.",
    teasers: [
      'Technical SEO built into the code, not added as a plugin later',
      'Core Web Vitals that actually pass, not just report green once',
      'Semantic markup search engines can genuinely understand',
    ],
    stats: [
      { value: '53%', label: 'of mobile visits abandon a page that takes over 3 seconds to load', source: 'Google/DoubleClick research' },
      { value: '1', label: 'ranking factor Google has confirmed directly: page experience, including Core Web Vitals' },
    ],
    strategicShift: 'Content-only SEO has gotten harder to win on alone — the sites pulling ahead now are the ones that are also fast, clean, and structurally sound, because that’s become table stakes, not a bonus.',
    whatWeDo:
      'Sites that load in a blink and rank because of it — technical SEO, Core Web Vitals, and clean semantic markup from day one, not retrofitted after the fact.',
    journey: [
      { title: 'Audit', copy: 'A real technical read of what’s currently holding your rankings back.' },
      { title: 'Fix the foundation', copy: 'Speed, structure, and markup — the parts content alone can’t fix.' },
      { title: 'Structure content', copy: 'Headings, metadata, and internal links that actually help search engines understand the page.' },
      { title: 'Monitor', copy: 'Real Core Web Vitals and ranking data, checked, not assumed.' },
    ],
    signs: [
      "Your Core Web Vitals report is more red than green",
      'You’ve written content but rankings haven’t moved',
      'You’re not sure if your site is even indexed correctly',
      "A competitor with worse content outranks you"
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Businesses that fix the technical foundation first tend to see their existing content start performing better without writing a single new page — the words were fine, the plumbing wasn’t.',
    objections: [
      { q: 'Can you guarantee a #1 ranking?', a: "No one honestly can — and anyone who guarantees it is selling something else. What we can fix is everything technical that's currently working against you." },
      { q: 'Do I need new content too?', a: 'Sometimes — but often the bigger win is structural. We’ll tell you honestly which one matters more for your site.' },
      { q: 'How long until I see movement?', a: 'Technical fixes can show up in Core Web Vitals within days; ranking movement is usually measured in weeks, not overnight.' },
    ],
    ctaHeadline: 'Want an honest read on what’s holding your rankings back?',
    ctaSub: 'Send us your URL — we’ll tell you what we actually find.',
  },
  {
    slug: 'business-automation',
    navTitle: 'Business Automation',
    shortCopy: 'Lead-capture chatbots, smart forms, text-message follow-ups, and lightweight CRMs, all wired to your other tools — so enquiries get answered and routine work runs itself.',
    eyebrow: 'Business Automation',
    headline: 'Answer every enquiry without being the one answering it.',
    headlineAccent: 'without being the one',
    subhead:
      "You don't need to hire a receptionist, you need the routine work automated — chatbots, smart forms, and text follow-ups wired to the tools you already use.",
    teasers: [
      'Lead-capture chatbots that qualify before you ever see the message',
      'Text-message follow-ups that go out whether you’re at your desk or not',
      'A lightweight CRM instead of a spreadsheet no one updates',
    ],
    stats: [
      { value: '5 min', label: 'response window after which lead conversion odds drop off sharply', source: 'widely cited lead-response-time research' },
    ],
    strategicShift: 'The businesses scaling past a one-person operation aren’t the ones working more hours — they’re the ones that automated the parts of the day that didn’t need a human doing them.',
    whatWeDo:
      'Lead-capture chatbots, smart submission forms, text-message follow-ups, and lightweight CRMs, all wired to your other tools — so enquiries get answered and routine work runs itself.',
    journey: [
      { title: 'Map the workflow', copy: 'What actually happens between a lead coming in and you responding — today, honestly.' },
      { title: 'Automate the routine', copy: 'The parts that don’t need judgment — qualifying, routing, following up.' },
      { title: 'Connect your tools', copy: 'Wired to your calendar, inbox, or CRM, not a separate system to check.' },
      { title: 'Hand off control', copy: 'You see everything it’s doing and can override any of it, any time.' },
    ],
    signs: [
      'Leads sit unanswered for hours because you’re mid-job',
      'You’re still tracking enquiries in a spreadsheet or notebook',
      'You’ve lost a lead because you simply forgot to follow up',
      'The same three questions get asked by every single customer',
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Teams that automate lead follow-up tend to notice the effect immediately — not because the leads changed, but because none of them go quiet anymore.',
    objections: [
      { q: 'Will it feel robotic to customers?', a: 'Done well, no — it should feel like a fast, competent response, not a script. We tune tone to your actual voice.' },
      { q: 'What if it gets something wrong?', a: 'It’s scoped to what it can answer confidently and hands off to you for anything else — never guessing on your behalf.' },
      { q: 'Do I need new software?', a: 'Usually not — we build around what you already use rather than asking you to switch systems.' },
    ],
    ctaHeadline: 'Want to see what could run itself in your business?',
    ctaSub: 'Tell us what’s eating the most time right now.',
  },
  {
    slug: 'local-seo',
    navTitle: 'Local SEO & Google Maps',
    shortCopy: 'Show up when nearby customers search. Google Business Profile setup, map-pack ranking, and local listings that turn searches into calls.',
    eyebrow: 'Local SEO & Google Maps',
    headline: 'Show up when the customer nearest to you searches.',
    headlineAccent: 'nearest to you',
    subhead:
      "You don't need to outrank every business in the country, you need to win the map pack in your own area — Google Business Profile, reviews, and local listings done properly.",
    teasers: [
      'Google Business Profile fully optimized, not just claimed',
      'Map-pack ranking for the searches your actual customers use',
      'Local listings kept consistent, not scattered across the web',
    ],
    stats: [
      { value: '76%', label: 'of people who search for something nearby on their phone visit a business within a day', source: 'Google research' },
      { value: '28%', label: 'of local searches result in a purchase within a day', source: 'Google research' },
    ],
    strategicShift: 'For any business with a service area, ranking nationally means nothing if you’re invisible in the map pack — which is why local-first businesses are shifting SEO budget toward Maps before anything else.',
    whatWeDo:
      'Google Business Profile setup and optimization, map-pack ranking, review strategy, and local listings that turn nearby searches into calls.',
    journey: [
      { title: 'Claim & optimize', copy: 'Your Google Business Profile, fully filled out and verified — most are half-done.' },
      { title: 'Fix listings', copy: 'Your name, address, and phone number made consistent everywhere they appear online.' },
      { title: 'Build local signal', copy: 'Categories, service areas, and content that tell Google exactly where and what you serve.' },
      { title: 'Track calls', copy: 'Real numbers on how many searches turned into contact, not a vague "visibility" score.' },
    ],
    signs: [
      "You don't show up in the map pack for your own service name",
      "A competitor with fewer reviews ranks above you",
      "Your business hours or address are wrong on Google",
      "You've never claimed or verified your Google Business Profile",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Service businesses that fix their Google Business Profile first are usually the ones surprised how much changes from something that took an afternoon to set up properly.',
    objections: [
      { q: 'How fast can I rank in the map pack?', a: 'Profile fixes can show up within days; sustained ranking usually builds over a few weeks as reviews and signals accumulate.' },
      { q: 'Do I need reviews to rank?', a: 'They matter, but they’re one factor among several — we work on all of them, not just reviews.' },
      { q: 'What if I serve multiple areas?', a: 'We set up service-area targeting correctly instead of one profile trying to cover everything vaguely.' },
    ],
    ctaHeadline: 'Want to see how your business actually looks on Google right now?',
    ctaSub: 'Send us your business name — we’ll check honestly.',
  },
  {
    slug: 'care-maintenance',
    navTitle: 'Care & Maintenance',
    shortCopy: 'Monthly updates, backups, security checks, and quick edits — a developer on call so your site stays fast and fixed long after launch.',
    eyebrow: 'Care & Maintenance',
    headline: 'Stop finding out your site’s broken from a customer.',
    headlineAccent: 'from a customer',
    subhead:
      "You don't need to learn web development, you need someone already watching — monthly updates, backups, and security checks, with a developer on call for the rest.",
    teasers: [
      'Backups running before anything ever goes wrong',
      'Security checks that catch problems before customers do',
      'Quick edits handled without a formal project every time',
    ],
    stats: [
      { value: '0', label: 'is how many hours you should have to spend thinking about your site staying online' },
    ],
    strategicShift: 'Businesses that treat their site as infrastructure — not a project they finished once — are the ones that don’t go dark for a week when something breaks at the worst possible time.',
    whatWeDo:
      'Monthly updates, backups, security checks, and quick edits — a developer on call so your site stays fast and fixed long after launch.',
    journey: [
      { title: 'Baseline', copy: 'A full check of where your site actually stands today, before anything else.' },
      { title: 'Automate backups', copy: 'Scheduled, verified backups — not a folder someone forgot to update.' },
      { title: 'Monitor', copy: 'Security and uptime checks running quietly in the background.' },
      { title: 'Respond', copy: 'Quick edits and fixes turned around fast, without opening a new project every time.' },
    ],
    signs: [
      "You don't actually know when your site was last backed up",
      'Small edits sit in your inbox for weeks because there’s no one to ask',
      'You’ve had a security warning you didn’t fully understand',
      'Nobody would notice if the site went down until a customer said something',
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'The businesses that never think about their site are, almost without exception, the ones with someone already quietly maintaining it.',
    objections: [
      { q: 'Is this a long contract?', a: "It's month to month — leave any time. We'd rather earn it monthly than lock you in." },
      { q: 'What counts as a "quick edit"?', a: 'Text and image changes, small fixes, minor updates — bigger scope gets scoped and quoted honestly upfront.' },
      { q: 'What if you didn’t build my site?', a: "That's fine — we take over care and maintenance for sites we didn't originally build, too." },
    ],
    ctaHeadline: 'Want someone actually watching your site?',
    ctaSub: 'Tell us what platform it’s built on — we’ll tell you if we can help.',
  },
  {
    slug: 'ecommerce',
    navTitle: 'E-commerce',
    shortCopy: 'Shopify and WooCommerce stores built to convert — product pages, secure checkout, payments, and shipping set up so you can start selling.',
    eyebrow: 'E-commerce',
    headline: 'A store that gets people to actually finish checking out.',
    headlineAccent: 'actually finish',
    subhead:
      "You don't need more traffic yet, you need fewer people abandoning cart — product pages, checkout, and shipping built to convert, not just to exist.",
    teasers: [
      'Shopify or WooCommerce, built around what you actually sell',
      'Checkout that doesn’t lose people at the last step',
      'Payments and shipping configured correctly from day one',
    ],
    stats: [
      { value: '70%', label: 'average cart abandonment rate across e-commerce, most often from checkout friction', source: 'Baymard Institute research' },
    ],
    strategicShift: 'Businesses moving off marketplaces to sell direct are learning fast that the storefront itself is the differentiator now — the ones that get checkout right keep the margin the marketplace used to take.',
    whatWeDo:
      'Shopify and WooCommerce stores built to convert — product pages, secure checkout, payments, and shipping set up so you can start selling.',
    journey: [
      { title: 'Plan catalog', copy: 'How your products should actually be organized and found, before building a single page.' },
      { title: 'Build storefront', copy: 'Product pages and checkout designed to remove friction, not just meet a template.' },
      { title: 'Configure payments', copy: 'Payments and shipping set up correctly and tested — not discovered broken on launch day.' },
      { title: 'Launch & watch', copy: 'Live, monitored, and ready for your first real orders.' },
    ],
    signs: [
      "Your cart abandonment rate is a mystery to you",
      "Checkout takes more than a couple of steps",
      "You're not sure your store works properly on mobile",
      "Adding a new product feels harder than it should",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Store owners who simplify checkout before spending more on ads are usually the ones who find out the traffic was fine all along — it was the last step losing people.',
    objections: [
      { q: 'Shopify or WooCommerce — which is right for me?', a: 'It depends on your catalog size and how much control you want — we’ll recommend honestly, not upsell the one with better margins for us.' },
      { q: 'Can you migrate my existing store?', a: 'Yes — products, customers, and order history moved over without starting your catalog from zero.' },
      { q: 'Who handles payments compliance?', a: 'The platform (Stripe, Shopify Payments, etc.) handles PCI compliance — we configure it correctly on your end.' },
    ],
    ctaHeadline: 'Want to see where your current store loses customers?',
    ctaSub: 'Send us your store link — we’ll walk through it honestly.',
  },
  {
    slug: 'booking-payments',
    navTitle: 'Booking & Payments',
    shortCopy: 'Online scheduling with deposits and payments, synced to your calendar, so customers can book and pay without a phone call.',
    eyebrow: 'Booking & Payments',
    headline: 'Let customers book and pay without ever calling you.',
    headlineAccent: 'without ever calling you',
    subhead:
      "You don't need a receptionist for scheduling, you need online booking that's actually synced to your calendar — with deposits collected upfront, automatically.",
    teasers: [
      'Real-time scheduling synced to the calendar you already use',
      'Deposits and payments collected at the time of booking',
      'Fewer no-shows because the slot was actually paid for',
    ],
    stats: [
      { value: '24/7', label: 'is when online booking actually takes appointments, unlike a phone line' },
    ],
    strategicShift: 'Service businesses that moved booking online stopped losing after-hours enquiries the moment they went to voicemail — the phone stopped being the bottleneck.',
    whatWeDo:
      'Online scheduling with deposits and payments, synced to your calendar, so customers can book and pay without a phone call.',
    journey: [
      { title: 'Map availability', copy: 'How your actual schedule and services should translate into bookable slots.' },
      { title: 'Connect calendar', copy: 'Synced live to what you already use — no double-booking, no manual updates.' },
      { title: 'Add payments', copy: 'Deposits or full payment collected at booking, configured to your policy.' },
      { title: 'Go live', copy: 'Bookable from your site, tested end to end before real customers use it.' },
    ],
    signs: [
      "You lose bookings to voicemail after hours",
      "No-shows are a real cost to your business",
      "Your calendar and your booking system aren't actually synced",
      "Scheduling still happens over text or phone tag",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Businesses that add a deposit to online booking consistently report fewer no-shows — paying for a slot changes how seriously it’s treated.',
    objections: [
      { q: 'Which calendar does it sync with?', a: 'Google Calendar, Outlook, and most common scheduling tools — we’ll confirm compatibility with what you use.' },
      { q: 'Can I set custom availability?', a: 'Yes — different hours per service, buffer time between bookings, blackout dates, all configurable.' },
      { q: 'What happens with refunds?', a: 'Your cancellation policy is built into the flow, not handled manually after the fact.' },
    ],
    ctaHeadline: 'Want to see booking set up for your actual services?',
    ctaSub: 'Tell us how scheduling works today — we’ll show you the gap.',
  },
  {
    slug: 'analytics-tracking',
    navTitle: 'Analytics & Tracking',
    shortCopy: 'GA4, call and form tracking, and simple dashboards, so you can see exactly which channels bring in leads.',
    eyebrow: 'Analytics & Tracking',
    headline: 'Know exactly which channel actually brings you customers.',
    headlineAccent: 'exactly which channel',
    subhead:
      "You don't need more marketing spend, you need to know where the leads you already have came from — GA4, call tracking, and form tracking set up properly.",
    teasers: [
      'GA4 configured correctly, not just installed and forgotten',
      'Call and form tracking tied to the channel that generated them',
      'A simple dashboard instead of a report nobody reads',
    ],
    stats: [
      { value: '1', label: 'number that matters most: which channel actually converts, not which gets the most clicks' },
    ],
    strategicShift: 'Businesses that used to spread budget across every channel evenly are now concentrating it where the tracking actually proves it works — because guessing got too expensive not to fix.',
    whatWeDo:
      'GA4, call and form tracking, and simple dashboards, so you can see exactly which channels bring in leads.',
    journey: [
      { title: 'Audit tracking', copy: 'What’s currently set up, what’s broken, and what’s missing entirely.' },
      { title: 'Configure GA4', copy: 'Set up correctly for your actual goals, not the default template.' },
      { title: 'Connect calls & forms', copy: 'Tied back to the specific channel and campaign that generated them.' },
      { title: 'Build the dashboard', copy: 'One simple view of what’s working — no login-juggling across five tools.' },
    ],
    signs: [
      "You can't say confidently which channel brings in the most leads",
      "Your GA4 was set up once and never touched again",
      "Phone calls from your site aren't tracked at all",
      "You're making budget decisions on a hunch",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Business owners who finally see real channel data tend to redirect budget within the first month — the guesswork usually turns out to be costing more than the fix.',
    objections: [
      { q: 'Is this complicated to maintain?', a: 'No — it’s set up once, configured correctly, and left to run. We can check in periodically if you want.' },
      { q: 'Do I need a data analyst to read it?', a: 'No — the dashboard is built to be read by you, not a specialist.' },
      { q: 'Does this replace my ad platform’s own reporting?', a: 'It complements it — this is the independent, cross-channel view your ad platform can’t give you on its own.' },
    ],
    ctaHeadline: 'Want to actually know where your leads come from?',
    ctaSub: 'Tell us what you’re currently tracking — we’ll tell you what’s missing.',
  },
  {
    slug: 'reviews-reputation',
    navTitle: 'Reviews & Reputation',
    shortCopy: 'Automated review requests after every job, plus monitoring and replies — the star rating that wins local customers.',
    eyebrow: 'Reviews & Reputation',
    headline: 'Let your best customers do the convincing for you.',
    headlineAccent: 'do the convincing',
    subhead:
      "You don't need to ask for reviews manually, you need it to happen automatically after every job — with replies handled so nothing sits unanswered.",
    teasers: [
      'Automated review requests sent right after the job, not weeks later',
      'Monitoring so you see new reviews the moment they land',
      'Reply support so nothing — good or bad — goes unanswered',
    ],
    stats: [
      { value: '76%', label: 'of local searches result in a visit within a day — reviews are often the deciding factor at that moment', source: 'Google research' },
    ],
    strategicShift: 'The businesses winning local trust now aren’t the ones with zero bad reviews — they’re the ones that respond to every review, good or bad, and clearly aren’t hiding.',
    whatWeDo:
      'Automated review requests after every job, plus monitoring and replies — the star rating that wins local customers.',
    journey: [
      { title: 'Set the trigger', copy: 'The exact moment after a job when a review request actually lands well.' },
      { title: 'Automate the ask', copy: 'Sent by text or email, timed right, without you having to remember.' },
      { title: 'Monitor', copy: 'Every new review, across platforms, in one place — not five separate logins.' },
      { title: 'Reply', copy: 'A response plan for both praise and complaints, so nothing sits unanswered.' },
    ],
    signs: [
      "You have to remember to ask for reviews manually",
      "You've had a bad review sit unanswered for weeks",
      "Your star rating hasn't moved in months",
      "You don't know how many reviews you have across all platforms combined",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Businesses that automate the ask right after a job — while the experience is still fresh — consistently see request-to-review rates that manual follow-up can’t match.',
    objections: [
      { q: 'Isn’t asking for reviews against some platforms’ rules?', a: 'We follow each platform’s actual guidelines — the goal is a genuine, timely ask, not review manipulation.' },
      { q: 'What about negative reviews?', a: 'We help you respond to them professionally, not hide from them — a good response often matters more than the review itself.' },
      { q: 'Which platforms does this cover?', a: 'Google, Facebook, and industry-specific platforms relevant to your business — we’ll confirm which ones matter for you.' },
    ],
    ctaHeadline: 'Want more of your customers actually leaving a review?',
    ctaSub: 'Tell us your current process — we’ll show you what’s missing.',
  },
  {
    slug: 'redesign-migration',
    navTitle: 'Redesign & Migration',
    shortCopy: 'Moving off a slow Wix, Squarespace, or dated WordPress site to something fast — with redirects and SEO preserved so your rankings hold.',
    eyebrow: 'Redesign & Migration',
    headline: 'Leave your slow site behind without losing your rankings.',
    headlineAccent: 'without losing your rankings',
    subhead:
      "You don't need to start over, you need a move done properly — redirects and SEO preserved, so leaving Wix, Squarespace, or dated WordPress doesn't cost you what you've already built.",
    teasers: [
      'Every old URL redirected, not just left to 404',
      'Rankings monitored through the move, not abandoned to chance',
      'A faster site on the other side, not just a different one',
    ],
    stats: [
      { value: '1', label: 'redirect map is the difference between preserving your rankings and losing years of SEO overnight' },
    ],
    strategicShift: 'Businesses that outgrew their original site builder are learning that the platform that got them started is rarely the one that scales — and that moving off it doesn’t have to mean starting your SEO from zero.',
    whatWeDo:
      'Moving off a slow Wix, Squarespace, or dated WordPress site to something fast — with redirects and SEO preserved so your rankings hold.',
    journey: [
      { title: 'Audit current site', copy: 'Every page, URL, and ranking worth preserving, mapped before we touch anything.' },
      { title: 'Build the new site', copy: 'On modern, lean tooling — built to actually be fast, not just newer.' },
      { title: 'Map redirects', copy: 'Every old URL pointed correctly, so nothing you’ve built gets lost.' },
      { title: 'Monitor the move', copy: 'Rankings and traffic watched closely in the weeks after launch, not left to chance.' },
    ],
    signs: [
      "Your current platform charges you monthly for something clunky",
      "You've outgrown what your site builder can actually do",
      "You're scared to migrate because you might lose your rankings",
      "Every small change requires fighting the platform itself",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Businesses that migrate with a proper redirect map are, almost without exception, the ones that don’t see a ranking dip afterward — the risk is real, but it’s a solvable one.',
    objections: [
      { q: 'Will I lose my Google rankings?', a: 'Not if it’s done properly — a full redirect map and monitored rollout is exactly what prevents that.' },
      { q: 'How long does a migration take?', a: 'Depends on site size, but most single-site migrations are a matter of weeks, planned around a low-traffic launch window.' },
      { q: 'What about my existing content?', a: 'Migrated over, not rewritten from scratch, unless you specifically want it refreshed.' },
    ],
    ctaHeadline: 'Ready to leave your current platform behind — safely?',
    ctaSub: 'Tell us what platform you’re on now — we’ll map the move.',
  },
  {
    slug: 'accessibility',
    navTitle: 'Accessibility',
    shortCopy: 'WCAG audits and fixes — keyboard navigation, contrast, and screen-reader support — to reach more customers and reduce legal risk.',
    eyebrow: 'Accessibility',
    headline: 'Let every visitor actually use your site, not just see it.',
    headlineAccent: 'actually use',
    subhead:
      "You don't need a lawsuit to fix this, you need a real WCAG audit now — keyboard navigation, contrast, and screen-reader support that reaches customers you're currently losing.",
    teasers: [
      'A real WCAG audit, not an automated scanner’s best guess',
      'Fixes for keyboard navigation and screen-reader support, not just contrast',
      'Reduced legal exposure as web accessibility lawsuits keep rising',
    ],
    stats: [
      { value: '1 in 4', label: 'U.S. adults live with a disability that can affect how they use a website', source: 'CDC data' },
      { value: '+', label: 'ADA Title III web accessibility lawsuits have risen every year for over a decade', source: 'widely reported legal tracking data' },
    ],
    strategicShift: 'Accessibility has moved from a nice-to-have to a real legal and commercial exposure — the businesses ahead of it are fixing it deliberately, not after a demand letter forces the issue.',
    whatWeDo:
      'WCAG audits and fixes — keyboard navigation, contrast, and screen-reader support — to reach more customers and reduce legal risk.',
    journey: [
      { title: 'Audit', copy: 'A real, hands-on WCAG review — not just an automated scanner’s surface-level report.' },
      { title: 'Prioritize', copy: 'What actually blocks real users first, not a checklist in arbitrary order.' },
      { title: 'Fix', copy: 'Keyboard navigation, contrast, alt text, and screen-reader support, implemented and tested.' },
      { title: 'Verify', copy: 'Retested with real assistive technology, not just a passing automated score.' },
    ],
    signs: [
      "You've never had a real WCAG audit, only an automated scan",
      "Your site can't be fully navigated by keyboard alone",
      "You're not sure if a screen reader can use your site at all",
      "You've received — or worry about — an accessibility demand letter",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Businesses that fix accessibility proactively tend to find it improves the experience for everyone, not just the customers it was aimed at — cleaner structure and clearer contrast help every visitor.',
    objections: [
      { q: 'Does an automated scan cover this?', a: 'No — automated tools catch a fraction of real issues. A proper audit includes actual keyboard and screen-reader testing.' },
      { q: 'How big a project is this?', a: 'Scoped to your site’s actual issues — some sites need a few fixes, others a deeper rework. We’ll tell you honestly which.' },
      { q: 'Does this guarantee no lawsuit?', a: 'No one can guarantee that — but a genuine WCAG effort is your strongest, most honest defense if it ever comes up.' },
    ],
    ctaHeadline: 'Want an honest read on your site’s accessibility?',
    ctaSub: 'Send us your URL — we’ll tell you what we actually find.',
  },
  {
    slug: 'ai-assistants',
    navTitle: 'AI Assistants',
    shortCopy: 'Assistants trained on your own content that answer customer questions and capture leads around the clock.',
    eyebrow: 'AI Assistants',
    headline: 'Answer customer questions at 2am without being awake for it.',
    headlineAccent: 'without being awake',
    subhead:
      "You don't need a call center, you need an assistant trained on your own content — answering real questions and capturing leads around the clock, not reciting a generic script.",
    teasers: [
      'Trained on your actual content, not a generic script',
      'Captures leads while you’re closed, not just answers questions',
      'Hands off to you the moment it’s out of its depth',
    ],
    stats: [
      { value: '24/7', label: 'is when an AI assistant is available, unlike any single team member' },
    ],
    strategicShift: 'Businesses experimenting with AI on their site have mostly moved past chatbot novelty and toward one practical question: does it actually answer correctly and capture the lead — everything else is noise.',
    whatWeDo:
      'Assistants trained on your own content that answer customer questions and capture leads around the clock.',
    journey: [
      { title: 'Gather content', copy: 'What it should actually know — your services, pricing logic, and FAQs, not a generic dataset.' },
      { title: 'Train & scope', copy: 'Trained on that content, with clear boundaries on what it will and won’t answer.' },
      { title: 'Wire to lead capture', copy: 'Connected to your inbox or CRM so a conversation becomes a real lead.' },
      { title: 'Test & refine', copy: 'Checked against real questions before it ever talks to a real customer.' },
    ],
    signs: [
      "You get the same handful of questions asked constantly by email or phone",
      "Leads come in overnight and sit unanswered until morning",
      "You've considered a chatbot but worried it'd give wrong answers",
      "Your team spends real time on questions your website should already answer",
    ],
    diagnosticIntro: 'A quick, honest check — no signup required.',
    socialProof:
      'Businesses that scope an assistant tightly — to what it actually knows — see far fewer wrong answers than the ones that try to make it handle everything from day one.',
    objections: [
      { q: 'Will it give customers wrong information?', a: 'It’s scoped to your actual content and hands off anything outside that — it’s built to say "let me connect you" rather than guess.' },
      { q: 'Does it sound robotic?', a: 'Tuned to your voice, not a generic default — most visitors won’t realize it’s automated until they need a human.' },
      { q: 'What does it take to set up?', a: 'Your existing content — service pages, FAQs, pricing logic — is usually enough to start with.' },
    ],
    ctaHeadline: 'Curious what an assistant trained on your business could handle?',
    ctaSub: 'Tell us what questions you get asked most — we’ll show you what’s possible.',
  },
]

export function getServiceLandingData(slug: string) {
  return servicesLandingData.find((s) => s.slug === slug)
}
