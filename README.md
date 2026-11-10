# judyzhu.xyz

Judy Xingying Zhu’s personal website: projects, paintings, a short biography, and a living design system.

**[Visit the site](https://judyzhu.xyz/)** · [Design system](https://judyzhu.xyz/design-system)

Built with React, TypeScript, and Vite. The site uses system fonts, a small set of CSS tokens, and dark mode by default. Visitors can choose day mode; their choice is saved in their browser.

## Start locally

Use **Node.js 24** and npm. Python 3.9 or newer is needed to run the legacy bakery checks.

```sh
npm ci
npm run dev
```

Open [localhost:4173](http://127.0.0.1:4173/). The portfolio and preserved static pages work without the wishlist repository. The Wishlist project link points to a separate development server on port 4174; run that project independently when working on it.

## Repository layout

```text
src/                   Portfolio application
  index.html           Vite entry point and saved-theme bootstrap
  App.tsx              Shared layout and routes
  content.ts           Biography, projects, paintings, links, and other copy
  styles.css           Design tokens, themes, and styles
  theme.tsx            Theme state and persistence
  pages/               Work, Paintings, About, and Design system
  components/          Shared controls, project illustrations, and detail lists
  assets/organizations/ Official organization logos
  assets/paintings/    Painting images and preparation materials
public/                Files served at unchanged URLs and copied into builds
  CNAME                Main domain: judyzhu.xyz
  bakery.*             Existing bakery page and redirect
  baking.*             Earlier baking page
  m/                   Preserved invitation site
  assets/              Static assets used by legacy pages
  favicon*             Site icons, alongside apple-touch-icon.png
config/                Vite and TypeScript configuration
scripts/               Portfolio packaging and bakery export tools
tests/                 Build, asset, route, and bakery migration checks
docs/                  Implementation and publishing guides
  archive/             Historical plans and verification notes
archive/               Earlier homepage code and unused icon studies
.github/workflows/     GitHub Pages build and deployment
```

The root keeps the README, agent guidance, license, and npm manifests. Generated files go into the ignored `dist/` directory.

## Common edits

| Change | File |
| --- | --- |
| Bio, languages, projects, books, or links | [`src/content.ts`](src/content.ts) |
| Colors, typography, spacing, or day mode | [`src/styles.css`](src/styles.css) |
| Page layout | [`src/pages/`](src/pages/) |
| Navigation or routes | [`src/App.tsx`](src/App.tsx) |
| Project thumbnail drawings | [`src/components/ProjectPlates.tsx`](src/components/ProjectPlates.tsx) |
| Experience and Reading lists | [`src/components/DetailList.tsx`](src/components/DetailList.tsx) |
| Icons or an existing static page | [`public/`](public/) |

Imported painting and organization logo files are bundled by Vite. Logo sources are recorded in [organization logos](docs/organization-logos.md). Files in `public/` are copied unchanged and retain their URL paths. Archived code and documentation are not published.

The design system reads live CSS values. Define colors, type sizes, and spacing in the stylesheet rather than duplicating them in components. When adding a route, update both `src/App.tsx` and `scripts/prepare-portfolio.mjs` so direct visits work on GitHub Pages.

## Build and verify

The full release includes the independent [wishlist application](https://github.com/Starswheat/wishlist.judyzhu.xyz) at `/wishlist/`. Clone that repository beside this one and build it first:

```sh
cd ../wishlist.judyzhu.xyz
npm ci
npm test
npm run build

cd ../judyzhu.xyz
npm run build
npm test
npm run preview
```

For a worktree or a different checkout layout, point to the built wishlist client:

```sh
WISHLIST_BUILD_DIR=/absolute/path/to/wishlist/dist/client npm run build
npm test
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with live updates |
| `npm run check` | Check TypeScript without producing output |
| `npm run build` | Type-check, compile, and package the complete site |
| `npm test` | Verify the built site and bakery export safeguards; build first |
| `npm run preview` | Serve the built site locally on port 4173 |

The publishable output is **`dist/portfolio/`**. It includes direct entries for portfolio routes, the wishlist, legacy pages, icons, and the main domain’s `CNAME`. A missing wishlist build stops packaging rather than producing an incomplete release.

Tests check direct routes, local asset references, unchanged static files, invitation font aliases, excluded source folders, and the bakery redirect’s verification gate.

## Publish

Pushes or merges to `main` run [Publish portfolio](.github/workflows/deploy-pages.yml). The workflow builds both repositories, runs their checks, and deploys only `dist/portfolio/` to GitHub Pages. Local builds do not deploy.

The main site uses **GitHub Actions** as its Pages source. The standalone bakery and wishlist subdomains are maintained in their own repositories.

- [Implementation and design conventions](docs/implementation.md)
- [Deployment, verification, and rollback](docs/deployment.md)
- [Bakery export and redirect tools](docs/bakery-migration.md)
- [Archived prototypes](archive/README.md)

## License

[MIT](LICENSE).
