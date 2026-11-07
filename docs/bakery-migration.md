# Bakery subdomain migration

## Current status (2026-11-06)

- `https://judyzhu.xyz/bakery.html` returns HTTP 200 with a valid HTTPS connection.
- The main site uses GitHub Pages, publishing `main` / repository root from
  `Starswheat/judyzhu.xyz`. Its custom domain is `judyzhu.xyz`. The remote main
  site still serves the older site; the local React redesign has not been
  deployed there yet.
- Authoritative DNS is at Porkbun. The live record is CNAME `bakery` →
  `starswheat.github.io`, TTL 600 seconds. The authoritative nameservers,
  Cloudflare resolver `1.1.1.1`, and Google resolver `8.8.8.8` confirm the record.
- The main site's root `CNAME` remains `judyzhu.xyz`. The bakery has its own
  repository and custom domain; the migration does not replace the main domain.
- The standalone export and guarded redirect are implemented. The old bakery URL
  remains a functioning page until the new site passes verification.
- The exported site is published in the public repository
  [`Starswheat/bakery.judyzhu.xyz`](https://github.com/Starswheat/bakery.judyzhu.xyz),
  commit `8d9da48569529f89c562667a5e198ddc7c63e77b`. The local publishing checkout is
  `/Users/judyfruitee/Documents/GitHub/bakery.judyzhu.xyz`.
- GitHub Pages is enabled for the bakery repository using `main` / repository
  root, with custom domain `bakery.judyzhu.xyz`.
- The new host serves the exact exported page and local assets over HTTP.
  GitHub has requested its TLS certificate, but issuance is still pending.
  HTTPS has **not** been verified, and the old URL redirect is **not** active.
- Validation completed: four migration tests passed; all 11 exported files were
  served locally with matching bytes; the standalone browser preview completed
  the guided recipe flow and surprise recipe, rejected an empty flavor choice,
  returned to the start screen, and changed both audio-toggle states. Browser
  error/warning logs were empty. Public HTTP content and assets match the export;
  the full readiness check must still pass after certificate issuance and HTTPS
  enforcement.

## Build the standalone site

```sh
python3 scripts/bakery_site.py build
```

This produces `dist/bakery/` and `dist/bakery.zip`. Publish the **contents** of
`dist/bakery/` at the new site's root. It contains the existing bakery page as
`index.html`, its unchanged styles, scripts, mascot and four icons, the MIT
license, `.nojekyll`, and a separate `CNAME` containing `bakery.judyzhu.xyz`.

`bakery.html` remains the source of the markup. Its home link points to
`https://judyzhu.xyz/`, so it still returns to Judy's homepage from either host.
Google Fonts uses HTTPS; recipes and generated sound effects need no server,
API, account data, or cross-origin storage migration. `baking.html` is a separate
older page and is outside this migration.

## Hosting and DNS configuration

The separate `Starswheat/bakery.judyzhu.xyz` repository is populated, and its
[Pages settings](https://github.com/Starswheat/bakery.judyzhu.xyz/settings/pages)
use **Deploy from a branch**, `main`, `/ (root)`, with custom domain
`bakery.judyzhu.xyz`.

The following record is already live in Porkbun; do not add a duplicate:

| Type | Host | Answer / Value | TTL |
| --- | --- | --- | --- |
| CNAME | `bakery` | `starswheat.github.io` | 600 seconds |

The target follows the verified repository owner and GitHub's documented
subdomain setup. Preserve existing apex, `www`, mail, and verification records.

The remaining hosting step is certificate issuance. Wait for GitHub's
certificate check to pass, enable **Enforce HTTPS** in the bakery repository,
then run the verification command below. GitHub says certificate/HTTPS
availability can take up to 24 hours after DNS configuration. HTTP success
alone does not authorize redirect activation.

Sources: [GitHub custom subdomain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain),
[GitHub HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https),
[one custom domain per Pages CNAME file](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages#cname-errors).

## Verify, then activate the old URL redirect

```sh
python3 scripts/bakery_site.py verify
```

The check requires trusted HTTPS at the new host, HTTP-to-HTTPS redirection,
the exact current exported HTML, and correct bytes and MIME types for every
local asset. It rejects a different site's HTML or a redirect back to the main
site. It does not disable certificate validation or accept an arbitrary target.

Also open the new host in a browser. Check the mascot and icons, desktop/mobile
layout, home link, music/SFX toggles, recipe flow, back/start-over controls, and
the surprise option.

Once all checks pass:

```sh
python3 scripts/bakery_site.py activate-redirect
```

This **re-runs the live checks before editing** `bakery.html`. Review and publish
that file through the main site's active deployment source, following the
coordination notes below. It adds a canonical link and an
immediate JavaScript redirect using `location.replace`, preserving the query
string and fragment. A meta refresh inside `noscript` handles browsers with
JavaScript disabled (it goes to the new root). GitHub Pages does not provide a
per-path HTTP redirect configuration; this is an HTML redirect, not an HTTP 301.
The bakery content stays in the source for future exports and rollback, and the
export removes the legacy redirect block to avoid loops.

Verify both `https://judyzhu.xyz/bakery.html` and
`https://judyzhu.xyz/bakery.html?from=legacy#recipe` in a browser after deployment.

### Homepage and deployment coordination

The homepage chat owns the React redesign. Its bakery project link is currently
`href="/bakery.html"` in `src/App.tsx`. After the new host passes verification,
coordinate changing that destination to `https://bakery.judyzhu.xyz/`. Keep the
main-site mascot asset because the homepage still uses it. Existing links keep
working through the legacy page once its redirect is published.

Distinguish the local source, generated output, and live deployment:

- Local source commit `39d231b` contains the React redesign. `npm run build`
  checks TypeScript, runs Vite, and runs `scripts/prepare-portfolio.mjs` to produce
  `dist/portfolio`. Packaging copies root `bakery.html`, `bakery.css`, `bakery.js`,
  the mascot, four icons, and the unchanged main-domain `CNAME` into that output.
  Rebuild after activating or disabling the redirect so the output includes it.
- A full portfolio build requires the sibling wishlist's built `dist/client`,
  or `WISHLIST_BUILD_DIR` pointing to that build. See `design/implementation.md`.
- The prepared publishing checkout is
  `/Users/judyfruitee/Documents/GitHub/judyzhu.xyz-published`, branch `codex/pages`,
  initially at commit `d98a348`. It contains compiled React output. Its bakery
  page must be refreshed from the activated source or rebuilt `dist/portfolio`
  before that deployment is published.
- The remote main site still uses the older `main` / repository-root deployment;
  the parent chat's redesign deployment remains pending. Confirm the active
  Pages source before publishing the redirect. If the older deployment is still
  active, update its `bakery.html` without pushing the unbuilt React source root.
  If deployment has switched to the prepared React output, update the publishing
  checkout instead. Also retain the change in this source repository so a later
  build does not overwrite it.

The source-root React `index.html` loads `/src/main.tsx`; it must be built before
publication. Neither `npm run build` nor the bakery activation command deploys
the main site automatically. Coordinate the publishing branch with the homepage
chat and keep every main-site `CNAME` set to `judyzhu.xyz`.

## Future updates and rollback

Keep editing the bakery files in this repository, rebuild, and publish the
standalone output to the bakery repository. Do not edit the generated files as
the source of truth. Exporting after redirect activation keeps the same bakery
page, without its old-URL redirect block.

To restore the old URL as a complete local page:

```sh
python3 scripts/bakery_site.py disable-redirect
```

Publish the restored `bakery.html` through the active main-site deployment
source described above, refreshing the portfolio output/publishing checkout
when applicable. Revert any homepage link change as well.
Keep the new host running while DNS caches expire; removing its DNS or Pages
configuration is not needed to restore the old page.

## Local checks

```sh
python3 -m unittest discover -s scripts -p 'test_*.py'
python3 scripts/bakery_site.py build
python3 -m http.server 8931 --bind 127.0.0.1 --directory dist/bakery
```

Open `http://127.0.0.1:8931/`. The tests cover the export, unchanged main-site
CNAME, failed readiness checks leaving the source untouched, successful cutover,
query/fragment handling, repeat activation, and export stability after cutover.
