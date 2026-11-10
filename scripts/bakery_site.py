#!/usr/bin/env python3
"""Export the bakery and gate its old-URL redirect on a verified HTTPS deployment."""

import argparse
import hashlib
from html.parser import HTMLParser
from pathlib import Path
import re
import shutil
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit
from urllib.request import urlopen
import zipfile


ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://bakery.judyzhu.xyz"
TARGET = ORIGIN + "/"
ASSETS = (
    "bakery.css",
    "bakery.js",
    "assets/bakery-mascot.png",
    "favicon.ico",
    "favicon-32x32.png",
    "favicon-192x192.png",
    "apple-touch-icon.png",
)
BEGIN = "<!-- bakery-migration:redirect:start -->"
END = "<!-- bakery-migration:redirect:end -->"
REDIRECT_BLOCK = re.compile(re.escape(BEGIN) + r".*?" + re.escape(END) + r"\n?", re.S)


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = []
        self.home = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("script", "img") and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") in ("stylesheet", "icon", "apple-touch-icon"):
            self.assets.append(attrs["href"])
        if tag == "a" and "home-link" in attrs.get("class", "").split():
            self.home = attrs.get("href")


def site_files(root=ROOT):
    """Use the existing page as the only source of bakery markup and behavior."""
    public = root / "public"
    if (public / "CNAME").read_text().strip() != "judyzhu.xyz":
        raise ValueError("The main site's CNAME must remain judyzhu.xyz.")
    source = (public / "bakery.html").read_text()
    if source.count(BEGIN) != source.count(END) or source.count(BEGIN) > 1:
        raise ValueError("Unexpected migration markers in bakery.html.")
    if BEGIN in source and source.index(BEGIN) > source.index(END):
        raise ValueError("Migration markers are out of order in bakery.html.")
    if source.count("</head>") != 1:
        raise ValueError("bakery.html must contain exactly one </head> tag.")
    source = REDIRECT_BLOCK.sub("", source)
    source = source.replace(
        "</head>", f'  <link rel="canonical" href="{TARGET}" />\n</head>', 1
    )
    refs = References()
    refs.feed(source)
    if refs.home != "https://judyzhu.xyz/":
        raise ValueError("The bakery home link must point to https://judyzhu.xyz/.")
    for ref in refs.assets:
        url = urlsplit(urljoin(TARGET, ref))
        if url.scheme != "https":
            raise ValueError(f"Insecure asset: {ref}")
        if url.netloc == urlsplit(TARGET).netloc and url.path.lstrip("/") not in ASSETS:
            raise ValueError(f"Local asset missing from export: {ref}")
    files = {"index.html": source.encode()}
    files.update({name: (public / name).read_bytes() for name in ASSETS})
    files["CNAME"] = b"bakery.judyzhu.xyz\n"
    files[".nojekyll"] = b""
    files["LICENSE"] = (root / "LICENSE").read_bytes()
    return files


def build(root=ROOT):
    files = site_files(root)
    output = root / "dist" / "bakery"
    # Only this generated directory is replaced; never the source site.
    if output.exists():
        shutil.rmtree(output)
    output.mkdir(parents=True)
    for name, data in files.items():
        destination = output / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
    archive = output.with_suffix(".zip")
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as bundle:
        for name in sorted(files):
            bundle.write(output / name, name)
    print(f"Built {output}\nBundle: {archive}")
    return output


def fetch(url):
    # urlopen verifies the certificate and hostname using the system trust store.
    with urlopen(url, timeout=20) as response:
        return response.status, response.geturl(), response.headers.get_content_type(), response.read()


def verify(root=ROOT, fetcher=fetch):
    """Reject missing DNS, invalid TLS, wrong hosts/content, and broken assets."""
    files = site_files(root)
    for name in ("index.html", *ASSETS):
        path = "" if name == "index.html" else name
        status, final_url, content_type, actual = fetcher(TARGET + path)
        final = urlsplit(final_url)
        if status != 200 or (final.scheme, final.netloc) != ("https", "bakery.judyzhu.xyz"):
            raise ValueError(f"Unexpected response or redirect for {name}: {status} {final_url}")
        expected_types = {
            ".html": {"text/html"},
            ".css": {"text/css"},
            ".js": {"text/javascript", "application/javascript"},
            ".png": {"image/png"},
            ".ico": {"image/x-icon", "image/vnd.microsoft.icon"},
        }
        if content_type not in expected_types[Path(name).suffix]:
            raise ValueError(f"Wrong content type for {name}: {content_type}")
        if hashlib.sha256(actual).digest() != hashlib.sha256(files[name]).digest():
            raise ValueError(f"Live {name} differs from the current standalone export. Publish it first.")
        print(f"Verified HTTPS and content: {name}")
    status, final_url, _, _ = fetcher("http://bakery.judyzhu.xyz/")
    if status != 200 or final_url != TARGET:
        raise ValueError("Enable HTTPS enforcement: HTTP must redirect to the bakery HTTPS root.")
    print("Verified HTTP redirects to HTTPS.")


def activate(root=ROOT, fetcher=fetch):
    verify(root, fetcher)
    path = root / "public" / "bakery.html"
    source = REDIRECT_BLOCK.sub("", path.read_text())
    redirect = f"""{BEGIN}
  <link rel="canonical" href="{TARGET}" />
  <script>
    if (location.hostname === "judyzhu.xyz" || location.hostname === "www.judyzhu.xyz") {{
      location.replace("{TARGET}" + location.search + location.hash);
    }}
  </script>
  <noscript><meta http-equiv="refresh" content="0; url={TARGET}" /></noscript>
{END}
"""
    source = source.replace("</head>", redirect + "</head>", 1)
    path.write_text(source)
    print("Enabled the legacy-page redirect locally. Review and publish bakery.html to the main site.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("build", "verify", "activate-redirect", "disable-redirect"))
    args = parser.parse_args()
    try:
        if args.command == "build":
            build()
        elif args.command == "verify":
            verify()
        elif args.command == "activate-redirect":
            activate()
        else:
            path = ROOT / "public" / "bakery.html"
            path.write_text(REDIRECT_BLOCK.sub("", path.read_text()))
            print("Disabled the legacy-page redirect locally. Publish bakery.html to restore the old page.")
    except (ValueError, OSError, HTTPError, URLError) as error:
        print(f"Migration stopped: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
