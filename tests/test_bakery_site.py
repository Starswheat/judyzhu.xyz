"""Checks that publishing the bakery cannot prematurely break its legacy URL."""

from pathlib import Path
import shutil
import tempfile
import unittest
from urllib.error import URLError

from scripts import bakery_site as migration


class MigrationTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.public = self.root / "public"
        for name in ("bakery.html", "CNAME", *migration.ASSETS):
            target = self.public / name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(migration.ROOT / "public" / name, target)
        shutil.copyfile(migration.ROOT / "LICENSE", self.root / "LICENSE")
        # Exercise cutover from the legacy page even after the real site moves.
        page = self.public / "bakery.html"
        page.write_text(migration.REDIRECT_BLOCK.sub("", page.read_text()))
        self.original = page.read_bytes()

    def published(self, url):
        files = migration.site_files(self.root)
        name = url.removeprefix(migration.TARGET) or "index.html"
        if url.startswith("http:"):
            return 200, migration.TARGET, "text/html", files["index.html"]
        types = {".html": "text/html", ".js": "application/javascript", ".css": "text/css",
                 ".ico": "image/x-icon", ".png": "image/png"}
        return 200, url, types[Path(name).suffix], files[name]

    def test_export_includes_local_assets_and_preserves_source(self):
        output = migration.build(self.root)
        self.assertEqual((output / "CNAME").read_text(), "bakery.judyzhu.xyz\n")
        self.assertEqual((self.public / "CNAME").read_text().strip(), "judyzhu.xyz")
        self.assertEqual((self.public / "bakery.html").read_bytes(), self.original)
        self.assertIn(b'href="https://judyzhu.xyz/"', (output / "index.html").read_bytes())
        for asset in migration.ASSETS:
            self.assertEqual((output / asset).read_bytes(), (self.public / asset).read_bytes())

    def test_failed_dns_or_tls_never_enables_redirect(self):
        def unavailable(url):
            raise URLError("No trusted HTTPS connection")
        with self.assertRaises(URLError):
            migration.activate(self.root, unavailable)
        self.assertEqual((self.public / "bakery.html").read_bytes(), self.original)

    def test_wrong_content_host_or_mime_never_enables_redirect(self):
        for scenario in ("content", "host", "mime", "http"):
            def invalid(url):
                status, final, mime, body = self.published(url)
                if scenario == "content":
                    body = b"a different website"
                elif scenario == "host":
                    final = "https://judyzhu.xyz/"
                elif scenario == "mime":
                    mime = "text/plain"
                elif url.startswith("http:"):
                    final = url
                return status, final, mime, body
            with self.subTest(scenario=scenario), self.assertRaises(ValueError):
                migration.activate(self.root, invalid)
            self.assertEqual((self.public / "bakery.html").read_bytes(), self.original)

    def test_successful_cutover_preserves_export_and_is_idempotent(self):
        before = migration.site_files(self.root)
        migration.activate(self.root, self.published)
        first = (self.public / "bakery.html").read_text()
        self.assertIn('location.search + location.hash', first)
        self.assertIn('<noscript><meta http-equiv="refresh"', first)
        self.assertEqual(migration.site_files(self.root), before)
        migration.activate(self.root, self.published)
        self.assertEqual((self.public / "bakery.html").read_text(), first)
        self.assertEqual(migration.REDIRECT_BLOCK.sub("", first).encode(), self.original)


if __name__ == "__main__":
    unittest.main()
