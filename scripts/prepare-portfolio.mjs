import { access, copyFile, cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist/portfolio');
const wishlist = process.env.WISHLIST_BUILD_DIR
  ? resolve(process.env.WISHLIST_BUILD_DIR)
  : resolve(root, '../wishlist.judyzhu.xyz/dist/client');

try {
  await access(resolve(wishlist, 'index.html'));
} catch {
  throw new Error(`The wishlist build is missing at ${wishlist}. Build the sibling wishlist.judyzhu.xyz repository first, or set WISHLIST_BUILD_DIR to its dist/client directory. The portfolio cannot be published with a broken wishlist link.`);
}

const html = await readFile(resolve(output, 'index.html'), 'utf8');
for (const route of ['work', 'studio', 'photography', 'paintings', 'about', 'design-system']) {
  await mkdir(resolve(output, route), { recursive: true });
  await writeFile(resolve(output, route, 'index.html'), html);
}
for (const name of ['bakery.html', 'bakery.css', 'bakery.js', 'baking.html', 'baking.css', 'baking.js', 'CNAME', 'favicon.ico', 'favicon-32x32.png', 'favicon-192x192.png', 'apple-touch-icon.png']) {
  await copyFile(resolve(root, name), resolve(output, name));
}
await mkdir(resolve(output, 'assets'), { recursive: true });
const legacyAssets = [
  'assets/bakery-mascot.png',
  'assets/iphone/Bezel.png',
  'assets/iphone/Keyboard.png',
  'assets/android/Pixel10.png',
  'assets/android/Keyboard.png',
];
for (const name of legacyAssets) {
  await mkdir(dirname(resolve(output, name)), { recursive: true });
  await copyFile(resolve(root, name), resolve(output, name));
}
// The existing invitation stylesheet uses absolute font URLs at /assets/.
for (const name of ['roboto-latin-500-normal-7RbcRiD8.woff2', 'roboto-latin-500-normal-DQZyH_nt.woff']) {
  await copyFile(resolve(root, 'm/n001-7b43f2d9c6a1/assets', name), resolve(output, 'assets', name));
}
await cp(resolve(root, 'm'), resolve(output, 'm'), { recursive: true });
await cp(wishlist, resolve(output, 'wishlist'), { recursive: true });
await writeFile(resolve(output, '.nojekyll'), '');
console.log('portfolio built with direct page routes, wishlist, and preserved bakery and invitation assets');
