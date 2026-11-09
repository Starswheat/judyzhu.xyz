# judyzhu.xyz

judy xīngyǐng's personal portfolio: data, art, and small hobby projects.

react, typescript, and vite. see [the implementation notes](design/implementation.md) for the visual direction, content locations, development commands, and build instructions.

```sh
npm install
npm run dev
```

build the sibling `wishlist.judyzhu.xyz` project before running `npm run build`. the complete static output is `dist/portfolio`.

Pushes to `main` automatically build and publish the portfolio with [GitHub Actions](.github/workflows/deploy-pages.yml). See [deployment notes](design/deployment.md) for the Pages configuration and rollback procedure.
