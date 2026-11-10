# Bakery export and redirect tools

The bakery has its own repository at [Starswheat/bakery.judyzhu.xyz](https://github.com/Starswheat/bakery.judyzhu.xyz). This portfolio preserves `/bakery.html` and its redirect to `https://bakery.judyzhu.xyz/`.

## Source layout

- `public/bakery.html`, `public/bakery.css`, and `public/bakery.js` preserve the page used by the export tool.
- `public/assets/bakery-mascot.png` and the icons in `public/` are included in the export.
- `public/CNAME` belongs to the main domain, `judyzhu.xyz`.
- `scripts/bakery_site.py` builds a standalone export and verifies a deployment before enabling the legacy redirect.
- `tests/test_bakery_site.py` checks that failed verification cannot enable the redirect.

The generated bakery export has its own `CNAME` containing `bakery.judyzhu.xyz`. It does not change the main site’s domain.

## Commands

Run these from the repository root:

```sh
python3 scripts/bakery_site.py build
```

This creates `dist/bakery/` and `dist/bakery.zip` using the preserved files and root license. The export removes the legacy redirect so the standalone page does not redirect to itself.

```sh
python3 scripts/bakery_site.py verify
```

Verification checks trusted HTTPS, final host, MIME types, exact exported bytes, all local assets, and HTTP-to-HTTPS redirection. It is read-only and requires network access.

```sh
python3 scripts/bakery_site.py activate-redirect
python3 scripts/bakery_site.py disable-redirect
```

These commands edit `public/bakery.html` locally. Activation first repeats the live verification. The redirect preserves query strings and fragments. Review the change and rebuild the portfolio before publishing it through the [main-site deployment workflow](deployment.md). Neither command publishes by itself.

To run the isolated migration tests without a portfolio build:

```sh
python3 -m unittest discover -s tests -p 'test_bakery_site.py'
```

The [November 2026 migration record](archive/bakery-migration-2026-11-06.md) preserves the original deployment evidence. Its old source paths and hosting snapshots are historical; use the current source layout and deployment guide above for maintenance.
