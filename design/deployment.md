# Publishing judyzhu.xyz

The portfolio publishes automatically from `main` through
[Publish portfolio](../.github/workflows/deploy-pages.yml). GitHub Pages must use
**GitHub Actions** as its source, with the custom domain `judyzhu.xyz` and HTTPS
enforced. Serving `main / (root)` directly exposes the uncompiled React entry
point and does not produce a working site.

## Automatic releases

Every push or merge to `main` starts the workflow. It can also be started from
Actions → Publish portfolio → Run workflow, with `main` selected.

1. Check out the portfolio commit and the public wishlist repository's `main`.
2. Use Node 24 and install both projects from their lockfiles with `npm ci`.
3. Run the wishlist tests and build its client.
4. Run the portfolio TypeScript check, Vite build, and route packaging with
   `WISHLIST_BUILD_DIR` pointing to the freshly built wishlist client.
5. Upload only `dist/portfolio`, then deploy it to the `github-pages` environment.

The output preserves `/work/`, `/studio/`, `/photography/`, `/paintings/`,
`/about/`, `/design-system/`, `/wishlist/`, and the legacy bakery, baking, and
invitation pages. Source files, dependencies, and unrelated local staged files
are not part of the published artifact.

Builds have read access. Only the deploy job receives Pages write and OpenID
Connect permissions. It only deploys `main`. Production runs share the `pages`
concurrency group and finish before the next deployment starts. No personal
access token is required.

The workflow updates the wishlist bundled under `/wishlist/`; it does not
publish the independent `wishlist.judyzhu.xyz` subdomain. That repository retains
its existing `codex/pages` publishing setup. Changes in the wishlist repository
alone do not trigger a portfolio release; run Publish portfolio manually to
refresh the bundled copy without changing portfolio source.

## Verification

Check the [workflow run](https://github.com/Starswheat/judyzhu.xyz/actions/workflows/deploy-pages.yml)
for successful build and deploy jobs. Verify the HTTPS homepage, direct page
routes, painting images, wishlist assets, and the bakery redirect. The homepage
must reference compiled `/assets/` JavaScript and CSS, never `/src/main.tsx`.

Local verification uses the same commands documented in
[implementation notes](implementation.md). A local build does not publish.

## Rollback

Revert the offending source change on `main` and push the revert. The workflow
builds and publishes the resulting source. Keep the Pages source set to GitHub
Actions and retain the custom domain; do not force-push shared history.

The former compiled branch, `codex/pages`, is retained as an emergency fallback.
Commit `317fd2e6d3cc949a6d1f8af5b2d8aa098ff855b8` was the verified November 6, 2026
release of the earlier white design. To temporarily restore that older release,
select **Deploy from a branch → codex/pages → /(root)** in Pages settings.
Restore **GitHub Actions** before the next automatic release. Do not select
`main / (root)` as a fallback: `main` now contains build inputs, not static output.

## References

- [Pages settings](https://github.com/Starswheat/judyzhu.xyz/settings/pages)
- [GitHub Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
