# Hero film

The looping film in the homepage hero: a lead becoming a booked, finished job.

It is made with [Remotion](https://www.remotion.dev/), which draws React components frame by frame and encodes the frames as a video. This folder is its own small project. The site's build never touches it; the site only uses the two files it renders:

| File | What it is |
|---|---|
| `src/assets/hero-film/lead-journey.mp4` | The film: 1080×1080, 18 seconds, about 700 KB |
| `src/assets/hero-film/lead-journey-poster.webp` | Its first frame. Shown until the film plays, and instead of it for visitors with reduced motion |

`src/sections/hero/heroFilm.ts` plays them on the page.

## The story

One loop, in the order it plays:

1. **Beach.** The business owner is lying back in a deck chair while his family plays by the water. His phone buzzes and he takes it out.
2. **Phone.** A phone drops in, held in a hand. A customer searches "plumber near me", opens the top result, fills in the booking form and books a visit.
3. **CRM.** The booking arrives as a notification and a card. It is assigned to the technician who is free that day, worked, and marked done and paid.
4. **Beach again.** The owner sees "Job done" on his phone, puts it in his pocket and settles back, which is the frame the loop started on.

A step label in the corner names the five steps (Search, Lead, Booked, Assigned, Done), and a plain mouse pointer does the clicking.

## Commands

Run these inside `video/`.

```bash
npm install        # once
npm run studio     # preview in the browser, with a timeline to scrub
npm run render     # render the film and the poster into src/assets/hero-film/
npm run sheet      # a grid of frames in out/sheet.png, for checking poses
npm run typecheck
```

`npm run sheet` takes the first frame and the gap between frames, for example every frame from 100:

```bash
npx remotion still ContactSheet out/sheet.png --props='{"from":100,"step":1,"columns":6,"rows":6,"cell":360}'
```

After `npm run render`, commit the two files in `src/assets/hero-film/` along with the changes here.

## Where things are

```
src/
  Root.tsx           the list of things Remotion can render
  theme/             the site's colours, lines, corners and fonts, at the film's size
  timeline/          timeline.ts: every beat and how long it lasts; motion.ts: helpers
  lead-journey/      the film: the camera that scrolls between stations, the pointer's path
  scenes/
    beach/           the owner, his family, the umbrella, the sea
    phone/           the hand-held phone and its three pages
    crm/             the app window, the notification, the booking card, the technicians
  components/        parts more than one scene uses: pointer, step label, starburst, limb
  review/            the contact sheet (not part of the film)
public/fonts/        the site's three typefaces, so renders don't need the network
```

- **Retime a beat:** change its length in `src/timeline/timeline.ts`. Everything after it moves along.
- **Change a colour or a line weight:** `src/theme/theme.ts`. Keep it in step with the site's `src/global.css`.
- **Change what's typed or shown:** the text sits at the top of each scene file (`SearchScreen.tsx`, `BookingScreen.tsx`, `LeadCard.tsx`, `TechChips.tsx`, `PhoneBubble.tsx`).

## Things to know

- **12 frames a second, on purpose.** The film is meant to look drawn frame by frame, so movement is keyed pose by pose (see `keyed` in `motion.ts`) instead of eased smoothly. Don't raise the frame rate to "fix" it.
- **The loop has to close.** The last frame leads straight into the first: the owner resting, phone in his pocket. The beach's drawings run on their own clock (`scenes/beach/beachClock.ts`) so that their motion carries across that seam.
- **The film's canvas is twice the size it plays at.** Lines, shadows and type are the site's values doubled, and text smaller than about 26px on the canvas gets hard to read on a phone.
- **MP4 only.** H.264 plays in every browser, including Safari, without a second file to keep in step.
- **Licence.** Remotion is free for individuals and for companies of up to three people; larger companies need a paid licence. Check [remotion.dev/license](https://www.remotion.dev/license) for the current terms.
