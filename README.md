<p align="center">
<a href="https://tabler.io">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/logo-white.svg">
<img src="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/logo.svg" alt="Tabler" width="300">
</picture>
</a>
</p>

<p align="center">
Free and open source HTML dashboard UI kit built on Bootstrap 5.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@tabler/core" target="_blank"><img src="https://img.shields.io/npm/v/@tabler/core?color=1864ab&label=Latest+version" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/@tabler/core" target="_blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@tabler/core?color=1971c2&label=Downloads"></a>
<a href="https://www.jsdelivr.com/package/npm/@tabler/core" target="_blank"><img alt="jsDelivr hits" src="https://img.shields.io/jsdelivr/npm/hm/@tabler/core?color=1c7ed6&label=jsDelivr"></a>
<a href="https://github.com/tabler/tabler/actions/workflows/build.yml" target="_blank"><img alt="Build" src="https://github.com/tabler/tabler/actions/workflows/build.yml/badge.svg"></a>
<a href="https://github.com/tabler/tabler/blob/dev/LICENSE"><img src="https://img.shields.io/npm/l/@tabler/core?label=License&color=228be6" alt="License"></a>
<a href="https://github.com/tabler/tabler" target="_blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/tabler/tabler?style=social"></a>
</p>

<p align="center">
<a href="https://preview.tabler.io">Live demo</a> · <a href="https://docs.tabler.io">Documentation</a> · <a href="https://github.com/tabler/tabler/releases">Releases</a> · <a href="https://github.com/tabler/tabler/discussions">Discussions</a>
</p>

## Table of contents

- [Preview](#-preview)
- [Quick start](#-quick-start)
- [What's included](#-whats-included)
- [Frameworks](#-frameworks)
- [Ecosystem](#-ecosystem)
- [Documentation](#-documentation)
- [Browser support](#-browser-support)
- [Contributing](#-contributing)
- [Sponsors](#-sponsors)
- [Creators](#-creators)
- [Contributors](#-contributors)
- [License](#-license)

## 🔎 Preview

Tabler is a set of ready-made layouts, components and demo pages for admin panels, dashboards and web apps. Every component is built on Bootstrap 5, works in light and dark mode, and can be customized with Sass or CSS custom properties.

<p align="center">
<a href="https://preview.tabler.io" target="_blank">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/tabler-preview-dark.png">
<img src="https://raw.githubusercontent.com/tabler/tabler/dev/shared/static/tabler-preview.png" alt="Tabler preview">
</picture>
</a>
</p>

- Bootstrap 5 ships inside the package, so you only need one CSS file and one JS file.
- There are more than 120 demo pages in the [live demo](https://preview.tabler.io): dashboards, forms, tables, auth screens, error pages, marketing layouts and more.
- Every component has a dark color scheme, and every stylesheet ships in an RTL version.
- [Tabler Icons](https://tabler.io/icons) gives you over 6,000 icons, drawn on a 24×24 grid to match the UI kit.
- More than 20 plugins are bundled in `dist/libs`: charts, date pickers, selects, sliders, editors, drag and drop and other libraries.
- The Sass sources and TypeScript types are included, so you can customize the theme with `@use … with ()` and use typed JavaScript components.

## 🚀 Quick start

Load Tabler from the CDN and start building:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tabler demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css" />
  </head>
  <body>
    <h1>Hello, Tabler!</h1>
    <button class="btn btn-primary">Primary button</button>
    <script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js"></script>
  </body>
</html>
```

Or install the package with npm or your preferred JavaScript package manager:

```sh
npm install @tabler/core
```

Then import the styles and scripts in your entry file:

```js
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'
```

You can also [download the latest release](https://github.com/tabler/tabler/releases) as a ZIP archive. If you'd rather try Tabler without installing anything, open the [tabler-starter](https://github.com/tabler/tabler-starter) template on [StackBlitz](https://stackblitz.com/github/tabler/tabler-starter), [CodeSandbox](https://codesandbox.io/s/github/tabler/tabler-starter) or [GitHub Codespaces](https://codespaces.new/tabler/tabler-starter).

See the [installation guide](https://docs.tabler.io/ui/getting-started/installation/) for more options.

## 📦 What's included

The `@tabler/core` package contains compiled and minified CSS and JavaScript, the Sass and TypeScript sources, and the third-party plugins used by the demo pages:

```text
@tabler/core/
├── dist/
│   ├── css/       tabler.css and the optional stylesheets (flags, marketing, payments, socials,
│   │              themes, vendors), each with .min and .rtl versions
│   ├── js/        tabler.js and tabler.esm.js, plus the standalone tabler-theme.js
│   ├── libs/      bundled plugins: ApexCharts, Tom Select, Litepicker, FullCalendar and others
│   ├── types/     TypeScript declarations
│   ├── fonts/
│   └── img/
├── scss/          Sass sources
└── js/            TypeScript sources
```

The stylesheets are split so that you load only what you use. `tabler.css` is enough for most projects. The other files add country flags, payment provider logos, social icons, marketing layouts or alternative gray palettes.

## 🧩 Frameworks

Tabler is plain HTML and CSS, so it works with any framework. The documentation has a setup guide for each of these:

[React](https://docs.tabler.io/ui/getting-started/frameworks/react/) · [Vue](https://docs.tabler.io/ui/getting-started/frameworks/vue/) · [Angular](https://docs.tabler.io/ui/getting-started/frameworks/angular/) · [Next.js](https://docs.tabler.io/ui/getting-started/frameworks/nextjs/) ·
[Nuxt](https://docs.tabler.io/ui/getting-started/frameworks/nuxt/) · [SvelteKit](https://docs.tabler.io/ui/getting-started/frameworks/sveltekit/) · [Astro](https://docs.tabler.io/ui/getting-started/frameworks/astro/) · [Laravel](https://docs.tabler.io/ui/getting-started/frameworks/laravel/) ·
[Django](https://docs.tabler.io/ui/getting-started/frameworks/django/) · [Rails](https://docs.tabler.io/ui/getting-started/frameworks/rails/) · [Symfony](https://docs.tabler.io/ui/getting-started/frameworks/symfony/)

## 🌍 Ecosystem

Tabler isn't only the UI kit. A few other projects share the same look and feel:

| Project                                                                | What it is                                                                               |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Tabler Icons](https://github.com/tabler/tabler-icons)                 | Over 6,000 free MIT-licensed SVG icons, with packages for React, Vue, Svelte and Angular |
| [Tabler Illustrations](https://tabler.io/illustrations)                | Customizable SVG illustrations in light and dark variants                                |
| [Tabler Emails](https://tabler.io/emails)                              | Responsive HTML email templates tested in more than 90 clients                           |
| [Tabler Avatars](https://tabler.io/avatars)                            | Avatar illustrations for user profiles and placeholders                                  |
| [Tabler Flags](https://github.com/tabler/tabler-flags)                 | Over 250 optimized SVG country flags, shipped in `tabler-flags.css`                      |
| [Tabler Payments](https://docs.tabler.io/payments/)                    | Payment provider logos in light and dark versions, shipped in `tabler-payments.css`      |
| [tabler-starter](https://github.com/tabler/tabler-starter)             | Minimal starter template, ready to open in StackBlitz, CodeSandbox or Codespaces         |
| [Tabler Icons for Figma](https://github.com/tabler/tabler-icons-figma) | Figma plugin for inserting Tabler Icons into your designs                                |

## 📖 Documentation

The full documentation is at [docs.tabler.io](https://docs.tabler.io/). It covers installation, customization, color modes, RTL, every component and plugin, and the [frequently asked questions](https://docs.tabler.io/ui/getting-started/faq/).

To see what changed in each release, check the [changelog](core/CHANGELOG.md) and the [GitHub releases](https://github.com/tabler/tabler/releases). Updating from an older version? Read the [upgrade guide](https://docs.tabler.io/ui/getting-started/upgrade/) first. It lists every breaking change with a before-and-after example.

Tabler follows [Semantic Versioning](https://semver.org/). Breaking changes only land in major releases, and every release comes with a changelog generated from changesets.

## 🌐 Browser support

Tabler works in any current browser. The minimum versions below come from the CSS features it uses without a fallback: `light-dark()`, `color-mix()`, `:has()` and `@property`.

| Browser          | Minimum version |
| ---------------- | --------------- |
| Chrome, Edge     | 123             |
| Firefox          | 128             |
| Safari           | 17.5            |
| Opera            | 109             |
| iOS Safari       | 17.5            |
| Samsung Internet | 27              |

See the [browser support page](https://docs.tabler.io/ui/getting-started/browser-support/) for details.

## 🤝 Contributing

We welcome contributions of all kinds. The [contributing guide](CONTRIBUTING.md) explains how to run the project locally (with Node.js and pnpm, Docker, or [GitHub Codespaces](https://codespaces.new/tabler/tabler)), where things live in the repository, and what a pull request needs. By participating, you agree to follow our [Code of Conduct](.github/CODE_OF_CONDUCT.md).

The short version:

```sh
git clone https://github.com/tabler/tabler.git
cd tabler
pnpm install
pnpm run dev
```

This starts the preview at [http://localhost:3000](http://localhost:3000) and the documentation at [http://localhost:3010](http://localhost:3010), both with live reload.

- Found a bug? [Open a bug report](https://github.com/tabler/tabler/issues/new?template=bug_report.yml).
- Have an idea? [Open a feature request](https://github.com/tabler/tabler/issues/new?template=feature_request.yml) or start a [discussion](https://github.com/tabler/tabler/discussions).
- Found a security issue? Please report it privately, see our [security policy](SECURITY.md).

## 💛 Sponsors

Tabler is free to use, and its development is funded by sponsors. If it saves you time, consider [becoming a sponsor on GitHub](https://github.com/sponsors/codecalm) or [donating on PayPal](https://paypal.me/codecalm).

<p align="center">
<a href="https://github.com/sponsors/codecalm">
<img src="https://raw.githubusercontent.com/tabler/sponsors/main/sponsors.svg" alt="Tabler sponsors">
</a>
</p>

## 🤓 Creators

- Paweł Kuna · [@codecalm](https://github.com/codecalm) · [codecalm.net](https://codecalm.net)
- Bartłomiej Gawęda · [@BG-Software-BG](https://github.com/BG-Software-BG)
- Bartosz Dobija · [@Bartosz-Do](https://github.com/Bartosz-Do)

Follow Tabler on [X](https://x.com/tabler_io) and [Facebook](https://www.facebook.com/tabler.io) for updates.

## 👨‍🚀 Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/tabler/tabler/graphs/contributors">
<img src="https://opencollective.com/tabler/contributors.svg?width=890&button=false" alt="Tabler contributors">
</a>

## 📄 License

Tabler is licensed under the [MIT License](LICENSE).

Third-party libraries shipped in `dist/libs` keep their own licenses. One of them deserves a closer look. ApexCharts hasn't been MIT since version 5. It's dual-licensed now. Organizations under $2M in annual revenue can use it for free under the Community license, and anyone above that threshold pays. Redistribution needs a separate OEM license. Check the [ApexCharts license options](https://apexcharts.com/license/) before you ship charts in a commercial product.


## 🌐 Web Resources & Interactive Index
- [BOLTS AND NUTS PUZZLE](https://theskillquest.pages.dev/bolts-and-nuts-puzzle.html)
- [HUNTER UNDERWATER SPEARFISHING](https://studyquests.github.io/hunter-underwater-spearfishing.html)
- [DOGE MATCH](https://quizverses.github.io/doge-match.html)
- [RIDDLEMATH](https://studyquests.pages.dev/riddlemath.html)
- [LABUBU MERGE](https://studyquests.github.io/labubu-merge.html)
- [WE WILL NOT SURVIVE](https://quizverses.github.io/we-will-not-survive.html)
- [IDLE MONEY FACTORY](https://iskillplay.web.app/idle-money-factory.html)
- [LOVELY CAT PET LIFE](https://quizverses.github.io/lovely-cat-pet-life.html)
- [FLOWER BLOCK](https://studyquests.github.io/flower-block.html)
- [WORMS](https://studyquests.pages.dev/worms.html)
- [KAWAII REALM ADVENTURE](https://studyquests.pages.dev/kawaii-realm-adventure.html)
- [CATEGORY DEFENSE176](https://learnquester.pages.dev/category-defense176.html)
- [STICKMAN SANTA](https://learnquester.pages.dev/stickman-santa.html)
- [CATEGORY CASUAL 5](https://learnquester.pages.dev/category-casual-5.html)
- [CATEGORY CONTROLLER59](https://learnquester.pages.dev/category-controller59.html)
- [SOLITAIRE QUEST](https://learnquester.pages.dev/solitaire-quest.html)
- [CATEGORY PUZZLE 4](https://learnquester.pages.dev/category-puzzle-4.html)
- [CATEGORY BIKE](https://learnquester.pages.dev/category-bike.html)
- [MOUNTAIN BUS DRIVER](https://learnquester.pages.dev/mountain-bus-driver.html)
- [FALLING MAN](https://learnquester.pages.dev/falling-man.html)
- [CATEGORY PUZZLE](https://learnquester.pages.dev/category-puzzle.html)
- [KING OF CRABS](https://learnquester.pages.dev/king-of-crabs.html)
- [CARS MERGE](https://learnquester.pages.dev/cars-merge.html)
- [CATEGORY OBSTACLE](https://learnquester.pages.dev/category-obstacle.html)
- [CATEGORY ARCHERY52](https://learnquester.pages.dev/category-archery52.html)
- [SWIPETOWN](https://learnquester.pages.dev/swipetown.html)
- [DESERT ROVER SURVIVAL](https://learnquester.pages.dev/desert-rover-survival.html)
- [TAILOR STYLIST FASHION DIARY](https://learnquester.pages.dev/tailor-stylist-fashion-diary.html)
- [CATEGORY TOOLS](https://learnquester.pages.dev/category-tools.html)
- [DARLING DOLL](https://learnquester.pages.dev/darling-doll.html)
- [CATEGORY HERO](https://learnquester.pages.dev/category-hero.html)
- [LITTLE MASTER OF ASSEMBLY](https://thelearnquester.web.app/little-master-of-assembly.html)
- [SPACE SURVIVAL RAINBOW FRIENDS MONSTER](https://learnquester.pages.dev/space-survival-rainbow-friends-monster.html)
- [SWEET AND FRUITY MAKEUP](https://learnquester.pages.dev/sweet-and-fruity-makeup.html)
- [ANIME DRESS UP DOLL DRESS UP](https://learnquester.pages.dev/anime-dress-up-doll-dress-up.html)
- [DEAR ISLAND](https://learnquester.pages.dev/dear-island.html)
- [CATEGORY MONSTER206](https://learnquester.pages.dev/category-monster206.html)
- [CATEGORY SOCCER 2](https://learnquester.pages.dev/category-soccer-2.html)
- [CATEGORY EDUCATIONAL](https://thelearnquesters.pages.dev/category-educational.html)
- [CATEGORY CASUAL 3](https://thelearnquester.web.app/category-casual-3.html)
- [ZOMBIE SURVIVAL SHOOTER](https://learnquester.pages.dev/zombie-survival-shooter.html)
- [OFFROAD JEEP GAME SIMULATOR](https://learnquester.github.io/offroad-jeep-game-simulator.html)
- [STRYKON](https://learnquester.pages.dev/strykon.html)
- [BLOCK STACKING](https://learnquester.pages.dev/block-stacking.html)
- [MARBLE BUBBLE LEGEND](https://learnquester.github.io/marble-bubble-legend.html)
- [DICTATOR SIMULATOR 1984](https://learnquester.pages.dev/dictator-simulator-1984.html)
- [FREECELL](https://learnquester.github.io/freecell.html)
- [MERGE HERO SURVIVAL TOWER DEFENSE](https://learnquester.pages.dev/merge-hero-survival-tower-defense.html)
- [SUPER NINJA BALLOON](https://learnquester.github.io/super-ninja-balloon.html)
- [CATEGORY TOWER DEFENSE 2](https://learnquester.pages.dev/category-tower-defense-2.html)
- [SOLITAIRE EMPEROR SECRETS OF FATE](https://learnquester.pages.dev/solitaire-emperor-secrets-of-fate.html)
- [KRAKAX COM](https://learnquester.pages.dev/krakax-com.html)
- [LIGHT LINE](https://learnquester.pages.dev/light-line.html)
- [CUBE DROP PUZZLE](https://learnquester.github.io/cube-drop-puzzle.html)
- [WOOL SORTING](https://learnquester.github.io/wool-sorting.html)
- [FESTIVAL VIBES MAKEUP](https://learnquester.pages.dev/festival-vibes-makeup.html)
- [SPRUNKI EASTER COLORING](https://learnquester.github.io/sprunki-easter-coloring.html)
- [TREASURE CHAMPION CHEST CAPTURE](https://learnquester.github.io/treasure-champion-chest-capture.html)
- [LEXY](https://learnquester.pages.dev/lexy.html)
- [CRAFT OF WARS](https://thelearnquester.web.app/craft-of-wars.html)
- [HEROIC KNIGHT](https://thelearnquester.web.app/heroic-knight.html)
- [LABUBU ADVENTURE](https://learnquester.pages.dev/labubu-adventure.html)
- [HYPERMARKET 3D STORE CASHIER](https://learnquester.pages.dev/hypermarket-3d-store-cashier.html)
- [MONSTER MERGE LEGENDS ALIVE](https://learnquester.pages.dev/monster-merge-legends-alive.html)
- [CUBE TO HOLE PUZZLE](https://studyplayings.web.app/cube-to-hole-puzzle.html)
- [CATEGORY MAGIC46](https://learnquester.pages.dev/category-magic46.html)
- [CATEGORY BIKE 2](https://learnquester.pages.dev/category-bike-2.html)
- [STICK HERO BATTLE](https://learnquester.pages.dev/stick-hero-battle.html)
- [CATEGORY RACING DRIVING 2](https://learnquester.pages.dev/category-racing-driving-2.html)
- [CATEGORY MAKEUP51](https://studyplaying.github.io/category-makeup51.html)
- [CATEGORY MONSTER](https://studyplaying.github.io/category-monster.html)
- [BASE JUMP WINGSUIT FLYING](https://learnquester.pages.dev/base-jump-wingsuit-flying.html)
- [GOON BALL](https://studyplayings.pages.dev/goon-ball.html)
- [CATEGORY SHOOTER 2](https://studyplaying.github.io/category-shooter-2.html)
- [CATEGORY QUIZ](https://learnquester.pages.dev/category-quiz.html)
- [ENERGY SUPERMAN 3D](https://learnquester.github.io/energy-superman-3d.html)
- [BEAT THE ZOMBIES](https://learnquester.pages.dev/beat-the-zombies.html)
- [DIAMONDZ](https://studyplayings.web.app/diamondz.html)
- [BUS JAM ESCAPE](https://learnquester.pages.dev/bus-jam-escape.html)
- [ITALIAN BRAINROT TUNG TUNG RACING](https://thelearnquester.web.app/italian-brainrot-tung-tung-racing.html)
- [CANDY MAKER DESSERT GAMES](https://learnquester.pages.dev/candy-maker-dessert-games.html)
- [PYRAMIDZ2](https://learnquester.pages.dev/pyramidz2.html)
- [STICKMAN MEGA BOSS BATTLES](https://learnquester.github.io/stickman-mega-boss-battles.html)
- [PLANE CRASH RAGDOLL SIMULATOR](https://learnquester.github.io/plane-crash-ragdoll-simulator.html)
- [CATEGORY THIRD PERSON SHOOTER80](https://learnquester.pages.dev/category-third-person-shooter80.html)
- [CATEGORY MERGE](https://studyplaying.github.io/category-merge.html)
- [CATEGORY PUZZLE 3](https://studyplaying.github.io/category-puzzle-3.html)
- [RAMP BIKE JUMPING](https://learnquester.pages.dev/ramp-bike-jumping.html)
- [CELEBRITY THANKSGIVING PREP](https://studyplaying.github.io/celebrity-thanksgiving-prep.html)
- [MATH QUEST](https://studyplaying.github.io/math-quest.html)
- [CATEGORY PUZZLE 6](https://learnquester.pages.dev/category-puzzle-6.html)
- [IDLE BASEBALL TYCOON](https://thelearnquesters.pages.dev/idle-baseball-tycoon.html)
- [CATEGORY QUIZ](https://iskillquest.pages.dev/category-quiz.html)
- [POP CULTURE HALLOWEEN MAKEUP](https://themindzone.pages.dev/pop-culture-halloween-makeup.html)
- [SLINGSHOT MASTER](https://theskillquest.pages.dev/slingshot-master.html)
- [CATEGORY CAR376](https://learnquesters.pages.dev/category-car376.html)
- [HEXAMATCH](https://studyplayings.pages.dev/hexamatch.html)
- [CRYSTAL CONNECT](https://thelearnquester.web.app/crystal-connect.html)
- [CLINIC CLEANUP CREW](https://themindzone.pages.dev/clinic-cleanup-crew.html)
- [OFFICE GOLF](https://studyplayings.web.app/office-golf.html)
- [LIQUIDS SORT PUZZLE](https://themindplays.pages.dev/liquids-sort-puzzle.html)
- [EUROPE AT WAR](https://studyplayings.web.app/europe-at-war.html)
- [CATEGORY MERGE](https://learnquesters.pages.dev/category-merge.html)
- [LURKERS IO](https://themindplay.github.io/lurkers-io.html)
- [CAPYBARA MUKBANG ASMR](https://themindzone.pages.dev/capybara-mukbang-asmr.html)
- [CATEGORY SOLITAIRE](https://learnquesters.pages.dev/category-solitaire.html)
- [CATEGORY BASKETBALL 2](https://themindplay.github.io/category-basketball-2.html)
- [RUN FROM BABA YAGA](https://thequizzone.pages.dev/run-from-baba-yaga.html)
- [PIZZA PUZZLE](https://themindplays.pages.dev/pizza-puzzle.html)
- [INDEX10](https://theskillquest.pages.dev/index10.html)
- [MONSTER COLLECT RUN](https://themindplay.github.io/monster-collect-run.html)
- [CATEGORY SHOOTER](https://learnquesters.pages.dev/category-shooter.html)
- [STARDOM ALT GIRLS FASHION DUEL](https://themindplays.pages.dev/stardom-alt-girls-fashion-duel.html)
- [CATEGORY JUMP SCARE21](https://studyplaying.github.io/category-jump-scare21.html)
- [GOAL IO](https://thelearnquesters.pages.dev/goal-io.html)
- [CATEGORY SURVIVAL365](https://theskillquest.pages.dev/category-survival365.html)
- [DIRTY MONEY THE RICH GET RICH](https://themindzone.pages.dev/dirty-money-the-rich-get-rich.html)
- [CATEGORY CASUAL 15](https://theskillquest.pages.dev/category-casual-15.html)
- [CATEGORY BYPASS](https://learnquester.pages.dev/category-bypass.html)
- [BRAWL BROS SQUAD](https://studyplayings.pages.dev/brawl-bros-squad.html)
- [EARTHQUAKE IO](https://themindplays.pages.dev/earthquake-io.html)
- [POP PARTY SUIKA WATERMELON](https://studyplayings.web.app/pop-party-suika-watermelon.html)
- [MALDIVES HIDDEN OBJECTS](https://thequizzone.pages.dev/maldives-hidden-objects.html)
- [CATEGORY MOUSE1 699](https://themindplay.github.io/category-mouse1-699.html)
- [WORD JAM ASSOCIATION PUZZLE](https://thelearnquesters.pages.dev/word-jam-association-puzzle.html)
- [SECRET GALAXY MATCH THREE](https://themindzone.pages.dev/secret-galaxy-match-three.html)
- [PARTY ANIMALS CATS EVOLUTION](https://thequizzone.pages.dev/party-animals-cats-evolution.html)
- [RESCUE SHARP TURN](https://iskillquest.pages.dev/rescue-sharp-turn.html)
- [CATEGORY MERGE224](https://themindzone.pages.dev/category-merge224.html)
- [CHIBI DOLL AVATAR CREATOR](https://themindplays.pages.dev/chibi-doll-avatar-creator.html)
