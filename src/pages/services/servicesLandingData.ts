// Content for the 14 per-service landing pages, written for small, local
// business owners. One object per service; `slug` decides the page's URL
// (services/<slug>.html) and its data-service attribute (see main.ts).
// Stats are only real, sourced figures (a page with none skips the stat
// cards), and nothing here is an invented result or client quote.

export interface ServiceLandingData {
  slug: string
  navTitle: string
  shortCopy: string // the 1-2 sentence blurb used in the home page's "What we do" list
  eyebrow: string
  headline: string
  headlineAccent: string // the word/phrase within the headline shown in the accent color
  subhead: string
  teasers: [string, string, string]
  stats: { value: string; label: string; source: string }[]
  whyItMatters: string // the paragraph under the stats: why this matters to the owner
  whatWeDo: string
  journey: { title: string; copy: string }[]
  signs: string[]
  objections: { q: string; a: string }[]
  ctaHeadline: string
  ctaSub: string
}

export const servicesLandingData: ServiceLandingData[] = [
  {
    slug: 'web-design',
    navTitle: 'Web Design',
    shortCopy: 'Pages designed around what you sell and who buys it, then checked at every screen size before launch.',
    eyebrow: 'Web Design',
    headline: 'A website that looks like it belongs to the business you actually run.',
    headlineAccent: 'belongs',
    subhead:
      'We design every page around your real services, prices and photos, so a visitor can tell in a few seconds what you do and how to hire you.',
    teasers: [
      'Pages planned around your real content before any styling starts',
      'Designed for phones first, then tablets and desktops',
      'You review every stage and ask for changes before we build',
    ],
    stats: [
      { value: '50ms', label: 'is about how long a visitor takes to form a first impression of a web page', source: 'Lindgaard et al., 2006' },
    ],
    whyItMatters:
      'Most people look at your website before they call, even when a friend recommended you. If it looks dated, or they have to hunt for your phone number, plenty of them try the next business instead.',
    whatWeDo:
      'We start with a plan for each page: what it says, in what order, and where the call and booking buttons go. Then we design the pages in full with your logo, colors and photos, and check each one at phone, tablet and desktop widths.',
    journey: [
      { title: 'Discover', copy: 'A free call about your business, your customers and what the site has to do.' },
      { title: 'Wireframe', copy: 'Simple page plans that settle the order and the wording before anything is styled.' },
      { title: 'Design', copy: 'Full page designs in your colors and photos. You comment, we revise.' },
      { title: 'Hand off', copy: 'The design files and a live, tested site, ready for your first visitors.' },
    ],
    signs: [
      'Your site was built more than 3 or 4 years ago and it shows',
      'You’d rather not send customers to your own homepage',
      'Every page looks like it came from a different template',
      'Your business has changed but your site hasn’t',
    ],
    objections: [
      { q: 'How long does a new design take?', a: 'Most sites take 3 to 6 weeks from the first call to launch. You get a date before we start.' },
      { q: 'Can you work with what I already have?', a: 'Yes. We keep your domain, your logo and any content that still works, and redesign the rest.' },
      { q: 'What happens after launch?', a: 'The site and the files are yours. If you’d like us to keep it updated, that’s our Care & Maintenance plan, and it’s optional.' },
    ],
    ctaHeadline: 'Let’s see what your site could look like.',
    ctaSub: 'Tell us a little about your business, and send your current site if you have one.',
  },
  {
    slug: 'development',
    navTitle: 'Development',
    shortCopy: 'Sites coded by hand with lean tools, so pages load fast and there’s no pile of plugins to keep updating.',
    eyebrow: 'Development',
    headline: 'A site that loads before your visitor changes their mind.',
    headlineAccent: 'loads',
    subhead:
      'We write the code by hand with lean, modern tools, so each page loads only what it uses and stays quick on a phone with a weak signal.',
    teasers: [
      'Every page measured against Google’s Core Web Vitals before launch',
      'No plugin stack to update or patch',
      'Clean code another developer can pick up later',
    ],
    stats: [
      { value: '53%', label: 'of mobile visits are abandoned when a page takes longer than 3 seconds to load', source: 'Google/DoubleClick, 2016' },
      { value: '32%', label: 'more visitors bounce when a page’s load time goes from 1 second to 3', source: 'Google/SOASTA, 2017' },
    ],
    whyItMatters:
      'Most of your visitors arrive on a phone, often away from wifi. A page that hangs for a few seconds loses them before they see a single service, however good the design is.',
    whatWeDo:
      'We build the site by hand instead of on a page builder, keep images and scripts small, and test the speed on a mid-range phone before anything goes live.',
    journey: [
      { title: 'Scope', copy: 'What the site needs to do, from forms to bookings, before we choose any tools.' },
      { title: 'Build', copy: 'Hand-coded pages, tested on phones, tablets and desktops.' },
      { title: 'Measure', copy: 'Core Web Vitals checked with Google’s tools, and fixed wherever they fall short.' },
      { title: 'Launch', copy: 'Put live, then handed over with the code and every login.' },
    ],
    signs: [
      'Your site takes more than 3 seconds to load on a phone',
      'You’ve lost count of the plugins installed',
      'A developer once called your site “a lot”',
      'Every update means hoping nothing breaks',
    ],
    objections: [
      { q: 'Do I have to rebuild everything?', a: 'Not always. We look at what you have first. Sometimes a rebuild is right, and sometimes a few targeted fixes are enough.' },
      { q: 'Will my current tools still work?', a: 'Yes. We connect the site to the email, booking and analytics tools you already use.' },
      { q: 'Who looks after it after launch?', a: 'You, your team or us. The code is yours, so you can choose, and change your mind later.' },
    ],
    ctaHeadline: 'Curious how fast your site could be?',
    ctaSub: 'Send us the address and we’ll tell you what’s slowing it down.',
  },
  {
    slug: 'brand-identity',
    navTitle: 'Brand & Identity',
    shortCopy: 'Logo, colors, fonts and a short voice guide, so your site, van, invoices and social posts look like one business.',
    eyebrow: 'Brand & Identity',
    headline: 'Look like the same business everywhere someone finds you.',
    headlineAccent: 'same business',
    subhead:
      'We tidy up or create your logo, colors, fonts and tone of voice, then write them down so anyone who makes something for you gets them right.',
    teasers: [
      'Logo files ready for print, web and social',
      'Color and font rules your printer and whoever posts your socials can follow',
      'A one-page guide to how your business sounds in writing',
    ],
    stats: [
      { value: '23%', label: 'is the revenue lift companies in one survey linked to presenting their brand consistently', source: 'Lucidpress & Demand Metric survey, 2019' },
    ],
    whyItMatters:
      'Customers meet you in a lot of places: your van, your Google listing, an invoice, your website. When the logo and colors change from one to the next, you look smaller and newer than you are.',
    whatWeDo:
      'Logo, color palette, fonts and voice, applied to the things you use every week and written up in a short guide. It also becomes the starting point for your website design.',
    journey: [
      { title: 'Audit', copy: 'We gather every version of your logo, colors and materials and see what’s worth keeping.' },
      { title: 'Define', copy: 'Logo, palette, fonts and voice, refined with you step by step.' },
      { title: 'Apply', copy: 'Templates for the things you use: invoices, social posts, signs.' },
      { title: 'Document', copy: 'A short guide anyone you hire later can follow.' },
    ],
    signs: [
      'Your logo has three slightly different versions floating around',
      'Your site, socials and invoices look like different companies',
      'You’ve never written down your brand colors',
      'Someone asks “which logo do I use?” more than once a year',
    ],
    objections: [
      { q: 'Do we need a full rebrand?', a: 'Usually not. Most of the work is tidying up and writing down what you already have.' },
      { q: 'How does this connect to the website?', a: 'Your colors, fonts and voice become the rules for the site’s design, so the two match from day one.' },
      { q: 'What do we get at the end?', a: 'Logo files in every format, your color and font rules, templates and a written voice guide.' },
    ],
    ctaHeadline: 'Let’s see what one consistent brand could look like.',
    ctaSub: 'Send us what you have now: logos, colors, anything that exists.',
  },
  {
    slug: 'seo-performance',
    navTitle: 'SEO & Performance',
    shortCopy: 'Technical SEO built into the site: fast pages, clear headings and titles, and pages Google can read and index.',
    eyebrow: 'SEO & Performance',
    headline: 'Rank because your site actually deserves to.',
    headlineAccent: 'actually deserves',
    subhead:
      'We fix the technical side of SEO, from speed and page structure to titles and indexing, so the content you already have gets a fair shot on Google.',
    teasers: [
      'Speed and Core Web Vitals fixed in the code',
      'Titles, headings and descriptions written for each page',
      'Checked in Google Search Console so every page is indexed',
    ],
    stats: [],
    whyItMatters:
      'Good content can still sit on page three if the site under it is slow, badly structured or partly hidden from Google. Fixing that foundation often does more than writing new pages.',
    whatWeDo:
      'A technical audit, then the fixes: speed, mobile layout, heading structure, titles and descriptions, internal links, structured data and a clean sitemap.',
    journey: [
      { title: 'Audit', copy: 'A full technical check of what’s holding your rankings back.' },
      { title: 'Fix the foundation', copy: 'Speed, structure and markup, the parts more content can’t fix.' },
      { title: 'Structure content', copy: 'Headings, titles and internal links that tell Google what each page is about.' },
      { title: 'Monitor', copy: 'Search Console and Core Web Vitals reports checked after the changes go live.' },
    ],
    signs: [
      'Your Core Web Vitals report is more red than green',
      'You’ve written content but your rankings haven’t moved',
      'You’re not sure Google has indexed all your pages',
      'A competitor with weaker content outranks you',
    ],
    objections: [
      { q: 'Can you guarantee a #1 ranking?', a: 'No. Nobody controls Google’s rankings, and anyone who promises #1 is guessing. We fix everything technical that’s working against you and show you the before and after.' },
      { q: 'Do I need new content too?', a: 'Sometimes. Often the bigger win is structure. We’ll tell you which matters more for your site.' },
      { q: 'How long until I see movement?', a: 'Speed fixes show up in your scores within days. Rankings usually take several weeks to move.' },
    ],
    ctaHeadline: 'Want to know what’s holding your rankings back?',
    ctaSub: 'Send us your site address and we’ll tell you what we find.',
  },
  {
    slug: 'business-automation',
    navTitle: 'Business Automation',
    shortCopy: 'Chatbots, smart forms, text follow-ups and simple CRMs connected to your tools, so every inquiry gets a reply while you’re on a job.',
    eyebrow: 'Business Automation',
    headline: 'Answer every inquiry without being the one answering it.',
    headlineAccent: 'without being the one',
    subhead:
      'We set up forms, chat and text follow-ups that reply to new leads straight away and drop them into your calendar or inbox, even when you’re mid-job.',
    teasers: [
      'A chatbot or form that asks the right questions before you call back',
      'Text follow-ups that go out within minutes, day or night',
      'A simple CRM in place of the spreadsheet nobody updates',
    ],
    stats: [
      { value: '21×', label: 'higher odds of qualifying a lead when you reply within 5 minutes instead of 30', source: 'Lead Response Management Study, 2007' },
    ],
    whyItMatters:
      'People who fill in a contact form often send the same request to two or three businesses. The first one to reply has a head start, and that’s hard to manage with a phone in one hand and a tool in the other.',
    whatWeDo:
      'Chat and form flows that collect the details you need, instant text and email replies, and a lightweight CRM, all connected to the calendar and inbox you already use.',
    journey: [
      { title: 'Map the workflow', copy: 'What happens today between a lead coming in and you replying.' },
      { title: 'Automate the routine', copy: 'Replies, qualifying questions and follow-ups, the parts that don’t need you.' },
      { title: 'Connect your tools', copy: 'Linked to your calendar, inbox or CRM, so there’s no new app to check.' },
      { title: 'Hand off control', copy: 'You see every message it sends and can change or switch off any of it.' },
    ],
    signs: [
      'Leads wait hours for a reply because you’re on a job',
      'You still track inquiries in a spreadsheet or a notebook',
      'You’ve lost a job because you forgot to follow up',
      'Every customer asks the same three questions',
    ],
    objections: [
      { q: 'Will it feel robotic to customers?', a: 'We write the messages in your voice and keep them short. Customers get a quick, useful reply, and you take over the conversation from there.' },
      { q: 'What if it gets something wrong?', a: 'It only answers what you’ve signed off on. Anything else goes straight to you.' },
      { q: 'Do I need new software?', a: 'Usually not. We build around the tools you already use.' },
    ],
    ctaHeadline: 'Want to see what could run itself in your business?',
    ctaSub: 'Tell us which task eats the most of your week.',
  },
  {
    slug: 'local-seo',
    navTitle: 'Local SEO & Google Maps',
    shortCopy: 'Google Business Profile setup, map-pack ranking and consistent local listings, so nearby customers find you and call.',
    eyebrow: 'Local SEO & Google Maps',
    headline: 'Show up when the customer nearest to you searches.',
    headlineAccent: 'nearest to you',
    subhead:
      'We set up your Google Business Profile properly, fix your listings across the web and work on the map results for the towns you serve.',
    teasers: [
      'Google Business Profile filled in completely and verified',
      'Your name, address and phone number the same on every listing',
      'Calls and direction requests from Google tracked every month',
    ],
    stats: [
      { value: '76%', label: 'of people who search on their phone for something nearby visit a business within a day', source: 'Google, 2016' },
      { value: '28%', label: 'of those nearby searches end in a purchase', source: 'Google, 2016' },
    ],
    whyItMatters:
      'When someone nearby searches for what you do, Google shows a map with three businesses above the regular results. Getting into those three is the main goal of local SEO.',
    whatWeDo:
      'Google Business Profile setup and upkeep, consistent listings on the directories that count, service-area pages on your site, and a simple way to collect reviews.',
    journey: [
      { title: 'Claim & optimize', copy: 'Your Google Business Profile filled in completely and verified.' },
      { title: 'Fix listings', copy: 'Your name, address and phone number made identical everywhere they appear.' },
      { title: 'Build local signal', copy: 'Categories, service areas and pages that tell Google where you work and what you do.' },
      { title: 'Track calls', copy: 'Monthly numbers for calls, website visits and direction requests from Google.' },
    ],
    signs: [
      'You don’t show up on the map when people search for your service',
      'A competitor with fewer reviews ranks above you',
      'Your hours or address are wrong on Google',
      'You’ve never claimed or verified your Google Business Profile',
    ],
    objections: [
      { q: 'How fast can I get onto the map?', a: 'Profile fixes can show within days. Holding a spot usually takes a few weeks as reviews and other signals build up.' },
      { q: 'Do I need reviews to rank?', a: 'They help, and they’re one factor among several. We work on all of them.' },
      { q: 'What if I serve several towns?', a: 'We set up your service area properly and give each main town its own page on your site.' },
    ],
    ctaHeadline: 'Want to see how your business looks on Google right now?',
    ctaSub: 'Send us your business name and we’ll take a look.',
  },
  {
    slug: 'care-maintenance',
    navTitle: 'Care & Maintenance',
    shortCopy: 'Monthly updates, backups, security checks and small edits, with a developer on call long after launch.',
    eyebrow: 'Care & Maintenance',
    headline: 'Stop finding out your site’s broken from a customer.',
    headlineAccent: 'from a customer',
    subhead:
      'We handle updates, backups and security every month and make your small edits, so problems get caught before your customers run into them.',
    teasers: [
      'Backups on a schedule, tested so we know they restore',
      'Uptime and security checks running in the background',
      'Small text and photo edits without a new quote each time',
    ],
    stats: [],
    whyItMatters:
      'Websites break quietly. A form stops sending, a security certificate expires, an update clashes with something else. Without someone checking, you find out when a customer mentions it, or when the calls stop.',
    whatWeDo:
      'Monthly updates, scheduled backups, uptime and security monitoring, and small edits, all handled by a developer who knows your site.',
    journey: [
      { title: 'Baseline', copy: 'A full check of where your site stands today.' },
      { title: 'Automate backups', copy: 'Scheduled backups, tested so we know they restore.' },
      { title: 'Monitor', copy: 'Uptime and security checks running in the background.' },
      { title: 'Respond', copy: 'Small edits and fixes turned around quickly, without a new project each time.' },
    ],
    signs: [
      'You don’t know when your site was last backed up',
      'Small edits sit in your inbox for weeks because there’s no one to ask',
      'You’ve had a security warning you didn’t understand',
      'Nobody would notice the site was down until a customer said something',
    ],
    objections: [
      { q: 'Is this a long contract?', a: 'No. It’s month to month, and you can leave any time.' },
      { q: 'What counts as a small edit?', a: 'Text and photo changes, small fixes and minor updates. Anything bigger gets a quote first.' },
      { q: 'What if you didn’t build my site?', a: 'That’s fine. We look after sites other people built too.' },
    ],
    ctaHeadline: 'Want someone keeping an eye on your site?',
    ctaSub: 'Tell us what it’s built on and we’ll tell you if we can help.',
  },
  {
    slug: 'ecommerce',
    navTitle: 'E-commerce',
    shortCopy: 'Shopify and WooCommerce stores with clear product pages, a short checkout, and payments and shipping set up and tested.',
    eyebrow: 'E-commerce',
    headline: 'A store that gets people to actually finish checking out.',
    headlineAccent: 'actually finish',
    subhead:
      'We build your Shopify or WooCommerce store around what you sell, with product pages that answer buyers’ questions and a checkout with as few steps as possible.',
    teasers: [
      'Shopify or WooCommerce, whichever suits your catalog',
      'A short checkout, tested on phones',
      'Payments, taxes and shipping set up and tested before launch',
    ],
    stats: [
      { value: '70%', label: 'of online shopping carts are abandoned before the order is placed, on average', source: 'Baymard Institute' },
    ],
    whyItMatters:
      'Most shoppers who add something to their cart never pay for it. Some were only browsing, but many leave because of surprise costs, a forced account or a long form, and a store can fix all three.',
    whatWeDo:
      'Store setup on Shopify or WooCommerce, product pages, a short checkout, payments, taxes and shipping, and your products moved over if you’re switching from another platform.',
    journey: [
      { title: 'Plan catalog', copy: 'How your products should be grouped and found, worked out before any pages are built.' },
      { title: 'Build storefront', copy: 'Product pages and a checkout that never make a buyer stop and wonder.' },
      { title: 'Configure payments', copy: 'Payments, taxes and shipping set up and checked with test orders.' },
      { title: 'Launch & watch', copy: 'Live, watched closely and ready for your first orders.' },
    ],
    signs: [
      'You don’t know how many carts get abandoned',
      'Checkout takes more than a couple of steps',
      'You’re not sure the store works well on a phone',
      'Adding a product takes longer than it should',
    ],
    objections: [
      { q: 'Shopify or WooCommerce: which is right for me?', a: 'It depends on how many products you sell and how much control you want. We’ll recommend one and explain why.' },
      { q: 'Can you move my existing store?', a: 'Yes. Your products, customers and order history come with you.' },
      { q: 'Who handles payment security?', a: 'The payment provider (Stripe, Shopify Payments and others) handles card security and PCI compliance. We set it up correctly on your side.' },
    ],
    ctaHeadline: 'Want to see where your store loses customers?',
    ctaSub: 'Send us the link and we’ll walk through it with you.',
  },
  {
    slug: 'booking-payments',
    navTitle: 'Booking & Payments',
    shortCopy: 'Online booking with deposits and payments, synced to your calendar, so customers book and pay without calling.',
    eyebrow: 'Booking & Payments',
    headline: 'Let customers book and pay without ever calling you.',
    headlineAccent: 'without ever calling you',
    subhead:
      'Customers pick a time on your website and pay a deposit if you want one, and the booking lands straight in the calendar you already use.',
    teasers: [
      'Live booking synced to your calendar',
      'Deposits or full payment taken at the time of booking',
      'Your cancellation policy built into the booking',
    ],
    stats: [],
    whyItMatters:
      'Plenty of people look for a service in the evening, after work. If booking means calling during business hours, some of the ones who reach voicemail book with someone else.',
    whatWeDo:
      'Online booking on your website, synced with your calendar, with deposits or payments taken at booking and your cancellation policy built in.',
    journey: [
      { title: 'Map availability', copy: 'Your services, hours and breaks turned into bookable slots.' },
      { title: 'Connect calendar', copy: 'Synced live with your calendar, so nothing gets double-booked.' },
      { title: 'Add payments', copy: 'Deposits or full payment taken at booking, set to your policy.' },
      { title: 'Go live', copy: 'Bookable from your site, and tested end to end first.' },
    ],
    signs: [
      'You lose bookings to voicemail after hours',
      'No-shows cost you money',
      'Your calendar and your booking system don’t sync',
      'Scheduling still happens over texts and phone tag',
    ],
    objections: [
      { q: 'Which calendar does it sync with?', a: 'Google Calendar, Outlook and most common booking tools. We’ll confirm yours before we start.' },
      { q: 'Can I set my own availability?', a: 'Yes. You set different hours for each service, time between appointments and days off.' },
      { q: 'What happens with refunds?', a: 'Your cancellation policy is built into the booking, so refunds follow your rules without you handling them by hand.' },
    ],
    ctaHeadline: 'Want to see booking set up for your services?',
    ctaSub: 'Tell us how scheduling works today and we’ll suggest a setup.',
  },
  {
    slug: 'analytics-tracking',
    navTitle: 'Analytics & Tracking',
    shortCopy: 'GA4, call and form tracking, and a simple dashboard that shows which channels bring in leads.',
    eyebrow: 'Analytics & Tracking',
    headline: 'Know which marketing actually brings you customers.',
    headlineAccent: 'actually brings',
    subhead:
      'We set up GA4 and track every call and form from your site, so you can see which ads, searches and posts turn into real inquiries.',
    teasers: [
      'GA4 set up around the calls and forms that matter to you',
      'Every call and form tied to the channel it came from',
      'One simple dashboard you can read in five minutes',
    ],
    stats: [],
    whyItMatters:
      'Without tracking, a marketing budget gets split by gut feeling. Once you can see which channel produced last month’s calls, you can move money toward what works and stop paying for what doesn’t.',
    whatWeDo:
      'GA4 setup, call and form tracking tied to each channel and campaign, and a one-page dashboard with the numbers you care about.',
    journey: [
      { title: 'Audit tracking', copy: 'What’s set up now, what’s broken and what’s missing.' },
      { title: 'Configure GA4', copy: 'Set up around your real goals: calls, forms and bookings.' },
      { title: 'Connect calls & forms', copy: 'Each one tied back to the channel and campaign that brought it in.' },
      { title: 'Build the dashboard', copy: 'One page with the numbers that matter, in plain terms.' },
    ],
    signs: [
      'You can’t say which channel brings in the most leads',
      'Your GA4 was set up once and never touched again',
      'Phone calls from your site aren’t tracked at all',
      'You make budget decisions on a hunch',
    ],
    objections: [
      { q: 'Is it hard to maintain?', a: 'No. Once it’s set up it runs on its own. We can check in now and then if you’d like.' },
      { q: 'Do I need an analyst to read it?', a: 'No. The dashboard is built for you to read.' },
      { q: 'Does it replace my ad platform’s reports?', a: 'It sits alongside them. Each ad platform reports on its own ads, and this shows every channel side by side.' },
    ],
    ctaHeadline: 'Want to know where your leads come from?',
    ctaSub: 'Tell us what you track today and we’ll tell you what’s missing.',
  },
  {
    slug: 'reviews-reputation',
    navTitle: 'Reviews & Reputation',
    shortCopy: 'Review requests sent automatically after every job, with monitoring and help replying to every review.',
    eyebrow: 'Reviews & Reputation',
    headline: 'Let your best customers do the convincing for you.',
    headlineAccent: 'do the convincing',
    subhead:
      'A review request goes out by text or email right after each job, new reviews land in one place, and every one gets a reply.',
    teasers: [
      'Requests sent right after the job, while it’s fresh',
      'Every new review from every platform in one place',
      'Replies written for good and bad reviews alike',
    ],
    stats: [],
    whyItMatters:
      'People compare star ratings before they call a local business, and they read the owner’s replies too. A recent review with a thoughtful answer does a lot of selling for you.',
    whatWeDo:
      'Automatic review requests after each job, monitoring across Google, Facebook and the sites for your trade, and replies to every review, good or bad.',
    journey: [
      { title: 'Set the trigger', copy: 'The right moment after a job to send the request.' },
      { title: 'Automate the ask', copy: 'Sent by text or email at that moment, without you having to remember.' },
      { title: 'Monitor', copy: 'Every new review, from every platform, in one place.' },
      { title: 'Reply', copy: 'Replies to praise and complaints, so nothing goes unanswered.' },
    ],
    signs: [
      'You have to remember to ask for reviews',
      'A bad review has sat unanswered for weeks',
      'Your star rating hasn’t moved in months',
      'You don’t know how many reviews you have across all platforms',
    ],
    objections: [
      { q: 'Isn’t asking for reviews against the rules?', a: 'Not when it’s done right. We follow each platform’s rules: every customer gets the same simple request, and nobody is paid or pressured to post.' },
      { q: 'What about bad reviews?', a: 'We help you reply calmly and fix what you can. A good reply to a bad review reassures the people reading it.' },
      { q: 'Which platforms does this cover?', a: 'Google, Facebook and the review sites for your trade. We’ll confirm which ones matter for you.' },
    ],
    ctaHeadline: 'Want more of your customers leaving reviews?',
    ctaSub: 'Tell us how you ask for reviews now and we’ll show you what to change.',
  },
  {
    slug: 'redesign-migration',
    navTitle: 'Redesign & Migration',
    shortCopy: 'Moving off a slow Wix, Squarespace or old WordPress site to a fast one, with redirects in place so your Google rankings hold.',
    eyebrow: 'Redesign & Migration',
    headline: 'Leave your slow site behind without losing your rankings.',
    headlineAccent: 'without losing your rankings',
    subhead:
      'We move you off Wix, Squarespace or an old WordPress install, redirect every old address to its new page, and watch your rankings through the switch.',
    teasers: [
      'Every old address redirected to its new page',
      'Rankings and traffic watched for weeks after launch',
      'A faster site on the other side',
    ],
    stats: [],
    whyItMatters:
      'Every page Google has indexed lives at an address that people and search engines know. Switch platforms without redirecting those addresses and visitors hit error pages, and the rankings those pages earned can slip away.',
    whatWeDo:
      'A full map of your current pages and rankings, a new site built on lean, fast tools, a redirect for every old address, and close monitoring in the weeks after launch.',
    journey: [
      { title: 'Audit current site', copy: 'Every page, address and ranking worth keeping, listed before we touch anything.' },
      { title: 'Build the new site', copy: 'Built on lean tools, so it loads fast.' },
      { title: 'Map redirects', copy: 'Every old address pointed to its new page.' },
      { title: 'Monitor the move', copy: 'Rankings and traffic watched closely in the weeks after launch.' },
    ],
    signs: [
      'You pay a monthly fee for a site builder that feels clunky',
      'You’ve outgrown what your site builder can do',
      'You’ve put off moving because you’re worried about your rankings',
      'Every small change means fighting the platform',
    ],
    objections: [
      { q: 'Will I lose my Google rankings?', a: 'Not if the move is done properly. A full redirect map and close monitoring are how we protect them.' },
      { q: 'How long does a move take?', a: 'It depends on the size of the site. Most take a few weeks, and we launch at a quiet time for your business.' },
      { q: 'What about my existing content?', a: 'It comes with you as it is, unless you’d like it refreshed.' },
    ],
    ctaHeadline: 'Ready to leave your current platform?',
    ctaSub: 'Tell us what you’re on now and we’ll plan the move.',
  },
  {
    slug: 'accessibility',
    navTitle: 'Accessibility',
    shortCopy: 'WCAG audits and fixes for keyboard use, contrast and screen readers, so more people can use your site.',
    eyebrow: 'Accessibility',
    headline: 'Let every visitor use your site, including with a keyboard or screen reader.',
    headlineAccent: 'every visitor',
    subhead:
      'We test your site the way people with disabilities use it, with a keyboard, a screen reader and enlarged text, then fix whatever gets in their way.',
    teasers: [
      'Hands-on testing alongside the automated scans',
      'Fixes for keyboard use, contrast, alt text and screen readers',
      'A retest with real assistive technology when we’re done',
    ],
    stats: [
      { value: '1 in 4', label: 'adults in the United States lives with a disability', source: 'CDC, 2018' },
    ],
    whyItMatters:
      'Some of your customers get around with a keyboard, use a screen reader or zoom text to twice its size. If your menu or contact form doesn’t work for them, they can’t hire you. In the US, an inaccessible site can also draw an ADA demand letter.',
    whatWeDo:
      'A WCAG audit with hands-on keyboard and screen-reader testing, a prioritized list of fixes, the fixes themselves, and a retest to confirm them.',
    journey: [
      { title: 'Audit', copy: 'A hands-on WCAG review alongside the automated scans.' },
      { title: 'Prioritize', copy: 'The problems that block people get fixed first.' },
      { title: 'Fix', copy: 'Keyboard use, contrast, alt text and screen-reader support, fixed and tested.' },
      { title: 'Verify', copy: 'Retested with real assistive technology.' },
    ],
    signs: [
      'You’ve only ever had an automated scan, never a full WCAG audit',
      'Your site can’t be used with a keyboard alone',
      'You’re not sure a screen reader can use your site at all',
      'You’ve received an accessibility demand letter, or worry about one',
    ],
    objections: [
      { q: 'Doesn’t an automated scan cover this?', a: 'No. Automated tools catch only some of the problems. A proper audit includes testing by hand with a keyboard and a screen reader.' },
      { q: 'How big a job is this?', a: 'It depends on what we find. Some sites need a handful of fixes, others more. You get a fixed quote after the audit.' },
      { q: 'Does this guarantee I won’t be sued?', a: 'No one can guarantee that. A documented WCAG audit and fixes put you in a much stronger position if a complaint ever comes.' },
    ],
    ctaHeadline: 'Want to know how accessible your site is?',
    ctaSub: 'Send us your site address and we’ll tell you what we find.',
  },
  {
    slug: 'ai-assistants',
    navTitle: 'AI Assistants',
    shortCopy: 'A chat assistant trained on your own services and FAQs that answers questions and takes down leads around the clock.',
    eyebrow: 'AI Assistants',
    headline: 'Answer customer questions at 2am without being awake for it.',
    headlineAccent: 'without being awake',
    subhead:
      'We train an assistant on your own services, prices and FAQs, so it answers visitors’ questions at any hour and passes every lead to you.',
    teasers: [
      'Trained on your content and nothing else',
      'Takes names and numbers while you’re closed',
      'Hands the conversation to you when it’s unsure',
    ],
    stats: [],
    whyItMatters:
      'Visitors usually have a question or two before they’re ready to call: do you cover my area, roughly what does it cost, can you come this week. An assistant that answers those at 11pm keeps them on your site.',
    whatWeDo:
      'An assistant trained on your services, pricing guidance and FAQs, with clear limits on what it answers, connected to your inbox or CRM so every conversation becomes a lead you can follow up.',
    journey: [
      { title: 'Gather content', copy: 'Your services, pricing guidance and FAQs: everything it needs to know.' },
      { title: 'Train & scope', copy: 'Trained on that content, with clear rules on what it will and won’t answer.' },
      { title: 'Wire to lead capture', copy: 'Connected to your inbox or CRM, so each chat becomes a lead.' },
      { title: 'Test & refine', copy: 'Tested against real questions before any customer talks to it.' },
    ],
    signs: [
      'You get the same handful of questions by email and phone every week',
      'Leads come in overnight and wait until morning',
      'You’ve thought about a chatbot but worried it would get things wrong',
      'Your team spends time answering questions your website should cover',
    ],
    objections: [
      { q: 'Will it give customers wrong information?', a: 'It only answers from your content. When a question falls outside that, it offers to put the visitor in touch with you.' },
      { q: 'Will it sound robotic?', a: 'We set its tone to match how you talk to customers, and it’s upfront about being an assistant.' },
      { q: 'What does it take to set up?', a: 'Your existing service pages, FAQs and pricing guidance are usually enough to start.' },
    ],
    ctaHeadline: 'Curious what an assistant trained on your business could handle?',
    ctaSub: 'Tell us the questions you get asked most.',
  },
]

export function getServiceLandingData(slug: string) {
  return servicesLandingData.find((s) => s.slug === slug)
}
