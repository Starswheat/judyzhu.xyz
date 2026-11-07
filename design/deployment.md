# publishing judy's sites

the source repositories and published files use separate branches. github pages must serve the compiled `codex/pages` branch at its root. the react source `index.html` is not a deployable page by itself.

## prepared release

| site | source commit | compiled commit | published worktree |
| --- | --- | --- | --- |
| judyzhu.xyz | `59546428ef48feb5cca95e8e9830bb73d4eae087` | `317fd2e6d3cc949a6d1f8af5b2d8aa098ff855b8` | `/Users/judyfruitee/Documents/GitHub/judyzhu.xyz-published` |
| wishlist.judyzhu.xyz | `5c475d6777539f7ca8954bb791aeca9782487d56` | `893380d94214719978b27467bb54451116de60d7` | `/Users/judyfruitee/Documents/GitHub/wishlist.judyzhu.xyz-published` |

both compiled worktrees are on `codex/pages`. they contain static output, the appropriate `CNAME`, and `.nojekyll`. the portfolio also contains a working copy of the wishlist at `/wishlist/`, plus the existing bakery, baking, and invitation routes. builds were made from clean committed sources. the portfolio release includes the verified bakery subdomain redirect, identical to remote main commit `52a43ba`.

## release status

verified on november 6, 2026. both sites are live with valid HTTPS certificates.

| check | current record |
| --- | --- |
| apex DNS | existing github pages A and AAAA records verified |
| wishlist DNS | `CNAME wishlist → starswheat.github.io` added through porkbun and verified with `dig @1.1.1.1` by the publishing agent |
| portfolio compiled branch pushed | verified `317fd2e` on remote `codex/pages` |
| wishlist compiled branch pushed | verified `893380d` on remote `codex/pages` |
| portfolio pages source | `codex/pages` at `/`, custom domain `judyzhu.xyz`, enforce HTTPS checked |
| wishlist pages source and custom domain | `codex/pages` at `/`, custom domain `wishlist.judyzhu.xyz`, DNS check successful, enforce HTTPS checked |
| portfolio deployment | [run 42324191081](https://github.com/Starswheat/judyzhu.xyz/actions/runs/42324191081) succeeded at `317fd2e` |
| wishlist deployment | [run 42324016072](https://github.com/Starswheat/wishlist.judyzhu.xyz/actions/runs/42324016072) succeeded at `893380d` |
| HTTPS and live site checks | both domains have valid certificates; all portfolio routes and 64 referenced assets returned 200; wishlist HTML, JS, CSS and all 18 gift images returned 200 |
| live browser checks | new portfolio rendered at the apex; wishlist gift detail, claim, and undo worked; test claim was undone |

live release previews are saved as `judy-portfolio-live.png` and `judy-wishlist-live.png` under `/Users/judyfruitee/.codex/visualizations/2026/11/06/01a1b330-c243-7281-b60a-72c7e98b5756/`.

## publish the prepared branches

publish and verify the wishlist subdomain before enabling the new portfolio release, since its production project link now points there.

1. in github desktop, select `Starswheat/judyzhu.xyz`, then choose the `judyzhu.xyz-published` worktree. verify the current branch is `codex/pages` and the commit matches the table. select **publish branch** or **push origin**. repeat for the wishlist published worktree.
2. open [portfolio pages settings](https://github.com/Starswheat/judyzhu.xyz/settings/pages). choose **deploy from a branch**, branch `codex/pages`, folder `/(root)`, and save. retain custom domain `judyzhu.xyz`.
3. open [wishlist pages settings](https://github.com/Starswheat/wishlist.judyzhu.xyz/settings/pages). choose the same branch and folder. set the custom domain to `wishlist.judyzhu.xyz` and save. the DNS target is `starswheat.github.io`, without a repository path.
4. wait for the pages deployment to succeed. verify HTTPS on both domains, then enable **enforce HTTPS** if it is available and not already enabled. a newly issued certificate can take time; do not bypass a browser certificate warning.
5. verify the homepage, `/about/`, `/studio/`, `/design-system/`, `/bakery.html`, `/baking.html`, the existing invitation route, and the wishlist's gift images and claim action. update the status table with the deployed commit and result.

github desktop has built in worktree support. its authenticated push route is used here because ordinary terminal git has no usable github credential. no credential needs to be copied out of desktop.

the portfolio's production project link is now `https://wishlist.judyzhu.xyz/`; development still uses port 4174. the bundled `/wishlist/` remains available. local browser data belongs to its origin, so existing `/wishlist/` edits do not automatically move to the new subdomain; export and import can carry them over.

## prepare a future release

commit the intended source changes first. keep unrelated changes uncommitted. these commands build archives of the selected commits in a fresh temporary directory, so working changes cannot accidentally enter a release. use a current node lts release. on this machine the verified runtime is available at the path below.

```sh
set -euo pipefail
export PATH="/Users/judyfruitee/.local/share/codex-runtime/node-v24.22.2-darwin-arm64/bin:$PATH"

portfolio_src="/Users/judyfruitee/Documents/GitHub/judyzhu.xyz"
wishlist_src="/Users/judyfruitee/Documents/GitHub/wishlist.judyzhu.xyz"
portfolio_pub="/Users/judyfruitee/Documents/GitHub/judyzhu.xyz-published"
wishlist_pub="/Users/judyfruitee/Documents/GitHub/wishlist.judyzhu.xyz-published"
portfolio_sha=$(git -C "$portfolio_src" rev-parse HEAD)
wishlist_sha=$(git -C "$wishlist_src" rev-parse HEAD)
build_root=$(mktemp -d "${TMPDIR:-/tmp}/judy-publish.XXXXXX")

mkdir "$build_root/portfolio" "$build_root/wishlist"
git -C "$portfolio_src" archive "$portfolio_sha" | tar -x -C "$build_root/portfolio"
git -C "$wishlist_src" archive "$wishlist_sha" | tar -x -C "$build_root/wishlist"

cd "$build_root/wishlist"
npm ci
npm test
npm run build

cd "$build_root/portfolio"
npm ci
WISHLIST_BUILD_DIR="$build_root/wishlist/dist/client" npm run build

printf '%s\n' 'judyzhu.xyz' > "$build_root/portfolio/dist/portfolio/CNAME"
printf '%s\n' 'wishlist.judyzhu.xyz' > "$build_root/wishlist/dist/client/CNAME"
touch "$build_root/portfolio/dist/portfolio/.nojekyll"
touch "$build_root/wishlist/dist/client/.nojekyll"

test "$(git -C "$portfolio_pub" branch --show-current)" = 'codex/pages'
test "$(git -C "$wishlist_pub" branch --show-current)" = 'codex/pages'
test -z "$(git -C "$portfolio_pub" status --porcelain)"
test -z "$(git -C "$wishlist_pub" status --porcelain)"

# review these dry runs before copying; only compiled files should change.
rsync -an --delete --exclude='.git' "$build_root/portfolio/dist/portfolio/" "$portfolio_pub/"
rsync -an --delete --exclude='.git' "$build_root/wishlist/dist/client/" "$wishlist_pub/"

# .git is a file in a linked worktree, so exclude its name without a trailing slash.
rsync -a --delete --exclude='.git' "$build_root/portfolio/dist/portfolio/" "$portfolio_pub/"
rsync -a --delete --exclude='.git' "$build_root/wishlist/dist/client/" "$wishlist_pub/"

git -C "$portfolio_pub" add --all
git -C "$portfolio_pub" diff --cached --check
if ! git -C "$portfolio_pub" diff --cached --quiet; then
  git -C "$portfolio_pub" commit -m 'Publish portfolio build' \
    -m "Portfolio source: $portfolio_sha. Bundled wishlist source: $wishlist_sha."
fi

git -C "$wishlist_pub" add --all
git -C "$wishlist_pub" diff --cached --check
if ! git -C "$wishlist_pub" diff --cached --quiet; then
  git -C "$wishlist_pub" commit -m 'Publish wishlist build' \
    -m "Wishlist source: $wishlist_sha."
fi
```

the commit guards skip unchanged projects. do not copy a source checkout, `node_modules`, `.env` files, or `.openai` state into a published worktree. keep the temporary build directory until the release is verified. repeat the desktop push and live checks above. pages settings normally stay unchanged after the first release.

## rollback

before the first portfolio release, the existing published version was source commit `52a43bac8371f60c207df2c0d571a4b7b65e2222` on remote `main`, including the verified bakery redirect. that branch has not been replaced by this workflow. an immediate first release rollback can restore the pages publishing source to `main` at `/`, retaining the `judyzhu.xyz` custom domain. verify the resulting pages deployment and live page.

after successful compiled releases, restore a known good **compiled deployment commit** in the appropriate published worktree and create a new commit. do not reset or force push shared history. for example, after selecting a real previous deployment commit:

```sh
published="/Users/judyfruitee/Documents/GitHub/judyzhu.xyz-published"
good_commit="replace_with_a_verified_compiled_commit"
test "$(git -C "$published" branch --show-current)" = 'codex/pages'
test -z "$(git -C "$published" status --porcelain)"
git -C "$published" restore --source="$good_commit" --staged --worktree -- .
git -C "$published" diff --cached --check
git -C "$published" commit -m 'Restore the last verified published build' \
  -m "Restored compiled deployment: $good_commit."
```

push through desktop and verify pages again. use the wishlist published path for its rollback. a new wishlist has no older live release to restore before its first successful deployment; do not treat its source branch as a fallback site. DNS should normally remain unchanged during a content rollback.

## references

* [github pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
* [github pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
* [github desktop worktrees](https://docs.github.com/en/desktop/making-changes-in-a-branch/managing-worktrees-in-github-desktop)
