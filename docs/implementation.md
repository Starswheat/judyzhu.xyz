# Portfolio implementation

The application lives in `src/`, with React, TypeScript, Vite, and Phosphor icons. There is no CSS framework or web-font dependency. See the [README](../README.md) for setup and build commands.

## Application and content

- `src/index.html` is the Vite entry point. Its small inline script restores an explicitly saved theme before the page paints.
- `src/main.tsx` mounts the theme provider, router, and application.
- `src/App.tsx` owns the shell and route list; `src/pages/` owns individual screens.
- `src/content.ts` holds biography paragraphs, experience, languages, links, projects, painting imports, reading, and design-system copy.
- `src/assets/paintings/` holds painting images and their preparation materials. Only imported assets enter the production bundle.
- `src/components/ProjectPlates.tsx` draws the project thumbnails.

The About page presents current work, personal background, and interests as three paragraphs. Experience and Reading share `src/components/DetailList.tsx`, with small static organization emblems beside company names. Experience also has a right-aligned date column. The entire About shell uses the prose width; list details stack below labels on small screens, with dates remaining on the right. Keep the `hello`, `experience`, and `shelf` anchor targets intact.

## Design and themes

The default palette is near-black, chalk, silver, and a restrained osmanthus-gold accent. Day mode uses warm paper, ink text, and a deeper gold. Both modes share typography, spacing, components, and thumbnail drawings.

All tokens and application styles live in `src/styles.css`. Day-mode tokens override the defaults under `:root[data-theme='light']`. The sun/moon button saves an explicit choice locally and synchronizes it across tabs. Without a valid saved choice, the page starts dark, regardless of the operating system’s appearance.

The design system reads computed CSS tokens and refreshes on theme or viewport changes. Do not copy token values into the page. Use sentence case, body-text contrast of at least 4.5:1, and touch targets of at least `--target`. The full conventions are in [AGENTS.md](../AGENTS.md).

## Routes

| URL | Screen or source |
| --- | --- |
| `/` | Work |
| `/paintings/` | Paintings and image viewer |
| `/about/` | Biography, experience, and reading |
| `/design-system/` | Live tokens and design rules |
| `/work/` | Work alias |
| `/studio/`, `/photography/` | Paintings aliases |
| `/wishlist/` | Built client from the independent wishlist repository |
| `/bakery.html`, `/baking.html`, `/m/…` | Preserved static pages |

New portfolio routes need entries in both `src/App.tsx` and `scripts/prepare-portfolio.mjs`. The latter writes an HTML entry for direct visits on a static host.

## Static files and legacy pages

Vite serves `public/` at the URL root during development and copies its contents unchanged into `dist/portfolio/`. Moving a source file into `public/` does not add `/public/` to its URL.

The Vite configuration resolves static directory indexes before the development and preview servers' SPA fallback. This keeps invitation URLs such as `/m/n001-7b43f2d9c6a1/` working locally as well as in the built site.

The bakery, baking, and compiled invitation files retain their existing content. The invitation’s CSS requests two fonts at absolute `/assets/` paths. Those files are retained in `public/assets/` as exact copies of the versions in `public/m/n001-7b43f2d9c6a1/assets/`; tests prevent the copies from drifting.

Earlier homepage components and icon studies live in `archive/`. Historical design and migration notes live in `docs/archive/`. Neither directory is deployed.

## Build and checks

`config/vite.config.mjs` sets `src/` as the app root, `public/` as the static directory, and `dist/portfolio/` as the output. `config/tsconfig.json` checks the application source.

`npm run build` type-checks, compiles with Vite, and runs `scripts/prepare-portfolio.mjs`. Packaging adds direct route entries, a prebuilt wishlist client, and `.nojekyll`. The wishlist is read from the sibling repository’s `dist/client/` or the absolute directory supplied in `WISHLIST_BUILD_DIR`.

Run `npm test` after a build. Node tests inspect the release’s routes, assets, static files, and missing-wishlist failure behavior. Python tests exercise bakery export and redirect safeguards using temporary files and simulated network responses.

The [deployment workflow](deployment.md) builds both applications and runs these checks before publishing.
