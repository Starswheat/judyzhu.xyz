import { access, cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

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
// Vite copies public/ unchanged, preserving legacy pages and their asset URLs.
await cp(wishlist, resolve(output, 'wishlist'), { recursive: true });
await writeFile(resolve(output, '.nojekyll'), '');
console.log('portfolio built with direct page routes, wishlist, and preserved bakery and invitation assets');
