# Hero film

The looping film in the homepage hero: a lead becoming a booked, finished job, all on the owner's phone.

It is made with [Remotion](https://www.remotion.dev/), which draws React components frame by frame and encodes the frames as a video. This folder is its own small project. The site's build never touches it; the site only uses the two files it renders:

| File | What it is |
|---|---|
| `src/assets/hero-film/lead-journey.mp4` | The film: 1080×1080, about 13 seconds, about 600 KB |
| `src/assets/hero-film/lead-journey-poster.webp` | Its first frame. Shown until the film plays, and instead of it for visitors with reduced motion |

`src/sections/hero/heroFilm.ts` plays them on the page.

## The story

One loop, in the order it plays:

1. **Beach.** The business owner is lying back in a deck chair while his family plays by the water. His phone buzzes and he takes it out.
2. **Zoom in.** The camera pushes into the phone, which then fills the frame, held in his hand.
3. **New lead.** The lead arrives as a notification on the lock screen, and gets tapped.
4. **Booked.** In the CRM app a time is picked and the visit is booked.
5. **Assigned.** The technician who is free gets the job, and his van drives the route.
6. **Done.** The job is marked done and the invoice is paid.
7. **Beach again.** The camera pulls back out. The owner sees "Job done", puts the phone in his pocket and settles back, which is the frame the loop started on.

A label in the corner names the four phases (New lead, Booked, Assigned, Done) with an icon each, and a plain mouse pointer does the clicking.

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
  timeline/          helpers: beats.ts counts out a film's beats, motion.ts keys movement
  films/
    lead-journey/    the film: its timeline, the camera's zoom, the owner's phone and the app's four screens
    pointer.ts       works out the mouse pointer's path from a list of moves
  art/               drawings, posed by whatever the film passes them
    beach/           the beach scene: sky, shore, the owner's spot, the owner, his family, the foreground
    phone/           the hand-held phone
    ui/              the CRM app's parts: lead card, technician list, route map, time slots, invoice
    effects/         sparkles and confetti
  components/        small parts used all over: pointer, phase label, starburst, limb, graph paper
  review/            the contact sheet (not part of the film)
public/fonts/        the site's three typefaces, so renders don't need the network
```

- **Retime a beat:** change its length in `src/films/lead-journey/timeline.ts`. Everything after it moves along.
- **Change a colour or a line weight:** `src/theme/theme.ts`. Keep it in step with the site's `src/global.css`.
- **Change a name or a label:** they sit at the top of the file that shows them: `films/lead-journey/LockScreen.tsx` (the notification), `art/ui/LeadCard.tsx`, `art/ui/TechList.tsx`, `art/ui/Receipt.tsx`, `art/beach/DoneBubble.tsx`.

## Things to know

- **12 frames a second, on purpose.** The film is meant to look drawn frame by frame, so movement is keyed pose by pose (see `keyed` in `timeline/motion.ts`) instead of eased smoothly. Don't raise the frame rate to "fix" it.
- **The loop has to close.** The last frame leads straight into the first: the owner resting, phone in his pocket. The beach's drawings run on their own clock (`art/beach/beachTiming.ts`) so that their motion carries across that seam.
- **The film's canvas is twice the size it plays at.** Lines, shadows and type are the site's values doubled, and text smaller than about 20px on the canvas gets hard to read on a phone.
- **MP4 only.** H.264 plays in every browser, including Safari, without a second file to keep in step.
- **Earlier versions are in git history.** The first film (with a search stage) and two other takes on this one, a scrolling version and a comic-strip version, were all in the tree at commit `d265898`.
- **Licence.** Remotion is free for individuals and for companies of up to three people; larger companies need a paid licence. Check [remotion.dev/license](https://www.remotion.dev/license) for the current terms.
