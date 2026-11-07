# judy xīngyǐng | implementation

the current direction is deliberately simple: a white page, figtree, lowercase copy, useful navigation, and real paintings and project content. michelle liu's [about page](https://www.liumichelle.com/about) and [design system](https://www.liumichelle.com/design-system) are the primary layout references. the earlier generated gallery concepts are superseded by this direction.

liquid glass is an interaction on actual buttons. a small pointer tilt, a press response, a translucent surface, and a clear focus state give the material a purpose. the layout works without animation and respects reduced motion.

## pages

* `/`: a portfolio of hobby projects, including the bakery and wishlist, with source links and a compact professional introduction.
* `/studio`: the existing paintings, full image viewing, and a photography tab. photography is intentionally empty until judy adds her own collection.
* `/about`: the personal introduction, experience, offscreen interests, and books already present on the earlier site.
* `/design-system`: interactive color tokens, type, spacing, controls, glass, and motion examples shared with the site.
* `/wishlist/`: the independent wishlist application, copied from its sibling repository's built client.

the work, photography, and paintings aliases have direct static entry points. the existing bakery, baking, and invitation routes are preserved.

## development

the site uses react, typescript, vite, figtree, and phosphor icons. a standalone three.js scene is unnecessary for the selected interaction.

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

the output to publish is `dist/portfolio`. the build includes direct page entry points, the wishlist at `wishlist/`, existing bakery files, required legacy assets, and the main domain's unchanged `CNAME`. it does not deploy anything by itself.

the wishlist must be built with relative asset paths so it can run both independently and within `/wishlist/`. its current vite configuration uses `base: './'`. a different checkout location can be supplied through `WISHLIST_BUILD_DIR`, pointing to the built `dist/client` directory. a missing wishlist build stops packaging with an actionable error.

## content and maintenance

* portfolio links, experience, painting metadata, and asset imports live in `src/content.ts`.
* site layout and routes live in `src/App.tsx`.
* shared tokens and responsive layout live in `src/styles.css`.
* the reusable glass interaction lives in `src/components/GlassButton.tsx`.
* design system specimens live in `src/DesignSystem.tsx` and `src/design-system.css`.
* wishlist content and behavior belong to its independent repository. rebuild that project before packaging a new portfolio release.

the linkedin experience is based on the screenshot judy supplied. the site does not add unverified metrics or project outcomes. the bakery subdomain cutover remains separate from this redesign; the existing bakery url remains in use until the new domain is verified.

## verification

`npm run build` runs the typescript check, builds the client, and packages preserved routes and the wishlist. browser checks cover desktop and phone layouts, keyboard use, studio image viewing, design system controls, and the wishlist flow. the main agent records the final browser results separately.
