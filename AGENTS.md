# judyzhu.xyz

Judy's personal site. Three screens (Work, Paintings, About) and a design system page.
React, TypeScript and Vite. No CSS framework, no web fonts.

## Commands

- `npm run dev` starts the dev server on 127.0.0.1:4173.
- `npm run check` type-checks.
- `npm run build` type-checks, builds, then packages the legacy pages and the wishlist.
  The last step needs the sibling `wishlist.judyzhu.xyz` repository built first. See
  `docs/implementation.md`.
- `npm test` verifies the built site's routes and assets, then the bakery export safeguards.
  Run `npm run build` first. Tests need Python 3.9 or newer in addition to Node 24.

## Where things live

- `src/content.ts` holds every word and link on the site. Change copy there, not in components.
- `src/styles.css` holds the tokens in `:root`, then all styles. It is the only stylesheet.
- `src/App.tsx` holds the shell and the `routes` list. `src/pages/` has one file per screen.
- `src/components/ProjectPlates.tsx` draws the two project thumbnails.
- `src/index.html` is the Vite entry point; imported images are in `src/assets/`.
- `public/` holds icons, CNAME, and preserved `bakery.*`, `baking.*`, and `m/` pages.
  Vite serves and copies these files at their existing root-relative URLs. Preserve legacy
  content unless the task explicitly covers it.
- `config/` holds Vite and TypeScript configuration. Root npm scripts pass those paths.
- `scripts/` holds packaging and export tools; `tests/` verifies their output and safeguards.
- `docs/` holds current maintenance guidance. `archive/` and `docs/archive/` are historical
  material and must not be copied into the release.

## Design rules

- Every colour, type size and space comes from a token in `:root`. No literal colours elsewhere.
- One gold mark per screen (`--color-accent`). It is a seal, not a fill. Focus rings and text
  selection use it too.
- Sentence case.
- No taglines, helper text or secondary labels. If a screen needs one to make sense, change
  the layout.
- Body text contrast is at least 4.5:1. Touch targets are at least `--target` tall.
- `/design-system` reads token values from the document, so never copy a value into it.

## Do not break

- Every path in `routes` must keep working. Older paths (`/work`, `/studio`, `/photography`)
  are aliases. `scripts/prepare-portfolio.mjs` writes a static entry for each path, so a new
  path needs an entry there too.
- The ids `hello`, `experience` and `shelf` on About are link targets.
