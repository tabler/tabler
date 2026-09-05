# Tabler screenshots

Pictures of Tabler components and screens, made the same way every time.

We use them wherever Tabler needs to show itself: release notes, the website, the README, social posts. Each picture comes from a small page in this package, so it can be made again after any change to Tabler — with the same framing, the same fonts and the same data.

## What is in here

- `pages/` — one page per picture. A page is a component or a whole app screen, set up to look its best.
- `layouts/` — the two frames a page can use: a single component on a card, or a full app screen with sidebar and navbar.
- `captures/` — the finished PNG files. This folder is not committed; run the capture to fill it.

Every page is captured in light and dark mode, in normal and 2× size — four files per page.

## How to use it

Look at the pages in the browser:

```sh
pnpm --dir screenshots run dev
```

Make the pictures:

```sh
pnpm --dir screenshots run capture
```

To make pictures of a few pages only, name them:

```sh
pnpm --dir screenshots run capture chart-radar dashboard-crm
```

## Adding a picture

Copy one of the pages in `pages/` and change what it shows. The file name becomes the name of the pictures. Open the page in the browser in both color modes, then run the capture for that page and check the four files.

The pages use the same components as the Tabler demo, so anything the demo can show, a picture can show too.
