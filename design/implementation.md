# judy xīngyǐng | implementation

The default direction is a near-black page, chalk text, silver secondary text and one gold mark per screen. An optional day mode uses warm paper, ink text and a deeper gold, with the same typography, spacing and components. The header's sun/moon button switches modes; an explicit choice is saved locally and restored before the first paint. Without a saved choice (or when storage is unavailable), the site starts dark regardless of the system appearance. The design system reads the active theme's tokens directly. Copy is in sentence case, with no taglines, helper text or secondary labels. The rules are in [AGENTS.md](../AGENTS.md) and on `/design-system`. The earlier white, lowercase, liquid glass direction is superseded.

## pages

* `/`: the projects, each with a drawn thumbnail, a title and a source link.
* `/paintings`: the paintings, with a full image viewer.
* `/about`: a short biography, experience and reading.
* `/design-system`: the colour, type and space tokens, read from the stylesheet, and the design rules.
* `/wishlist/`: the independent wishlist application, copied from its sibling repository's built client.

`/work`, `/studio` and `/photography` are aliases with direct static entry points. The existing bakery, baking and invitation routes are preserved.

## development

The site uses React, TypeScript, Vite and Phosphor icons, with the system font.

```sh
npm install
npm run dev
```

the portfolio dev server uses port 4173. run the separate wishlist dev server on port 4174 to follow its project link during development.

## building

keep the wishlist repository beside this repository, build it first, then build the portfolio:

```sh
cd ../wishlist.judyzhu.xyz
npm install
npm run build
cd ../judyzhu.xyz
npm run build
```

the output to publish is `dist/portfolio`. the build includes direct page entry points, the wishlist at `wishlist/`, existing bakery files, required legacy assets, and the main domain's unchanged `CNAME`. a local build does not deploy anything by itself. pushes to `main` run the GitHub Actions workflow, which builds both repositories and publishes this output. see [deployment notes](deployment.md).

the wishlist must be built with relative asset paths so it can run both independently and within `/wishlist/`. its current vite configuration uses `base: './'`. a different checkout location can be supplied through `WISHLIST_BUILD_DIR`, pointing to the built `dist/client` directory. a missing wishlist build stops packaging with an actionable error.

## content and maintenance

* every word, link and asset import lives in `src/content.ts`.
* the shell and routes live in `src/App.tsx`, with one file per screen in `src/pages/`.
* tokens and all styles live in `src/styles.css`.
* the project thumbnails live in `src/components/ProjectPlates.tsx`.
* wishlist content and behavior belong to its independent repository. rebuild that project before packaging a new portfolio release.

the linkedin experience is based on the screenshot judy supplied. the site does not add unverified metrics or project outcomes. the bakery subdomain cutover remains separate from this redesign; the existing bakery url remains in use until the new domain is verified.

## verification

`npm run build` runs the typescript check, builds the client, and packages preserved routes and the wishlist. browser checks cover desktop and phone layouts, keyboard use, studio image viewing, design system controls, and the wishlist flow. the main agent records the final browser results separately.
