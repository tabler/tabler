# Tabler screenshots

Pictures of Tabler components and screens, made the same way every time.

We use them wherever Tabler needs to show itself: release notes, the website, the README, social posts. Each picture comes from a small page in this package, so it can be made again after any change to Tabler, with the same framing, the same fonts and the same data.

## What is in here

- `pages/` has one page per picture. A page is a component or a whole app screen, set up to look its best.
- `layouts/` has the two frames a page can use: a single component on a card, or a full app screen with sidebar and navbar.
- `captures/` holds the finished PNG files. This folder isn't committed. Run the capture to fill it.

Every page is captured in light and dark mode, and in normal and 2× size. That's four files per page.

## How to use it

Look at the pages in the browser. The root `pnpm run dev` leaves this app out on purpose; this script starts only the screenshots server and expects the core assets from a running or earlier `pnpm run dev`:

```sh
pnpm run dev-screenshots
```

Make the pictures:

```sh
pnpm --dir screenshots run capture
```

To make pictures of a few pages only, name them:

```sh
pnpm --dir screenshots run capture chart-radar dashboard-crm
```

## Making a video

Some pages can also be recorded: a short clip of the fake cursor moving, hovering and clicking, with the transitions and the loading states left on. A page is recordable when it has a script of steps in `steps/<name>.json`:

```json
[{ "move": "#save", "duration": 600 }, { "wait": 400 }, { "click": "#save" }, { "wait": 2400 }]
```

`move` glides the cursor to an element, `click` clicks it, `wait` holds for the given milliseconds. Make the clips:

```sh
pnpm --dir screenshots run record button
```

Every recorded page gives a light and a dark WebM in `captures/`, at @2x (2048×1536, 30 fps). With `ffmpeg` on the machine (`brew install ffmpeg`) it also writes an MP4 and a GIF. `RECORD_FRAMES=0.5,2` writes those seconds as JPEG stills next to the clip, for a quick look without a player.

The page itself is a normal screenshot page (`?motion` in the URL keeps its animations); the recorder only adds the cursor and the clicks.

## Adding a picture

Copy one of the pages in `pages/` and change what it shows. The file name becomes the name of the pictures. Open the page in the browser in both color modes, then run the capture for that page and check the four files.

The pages use the same components as the Tabler demo, so anything you can build in the demo can go into a picture too.
