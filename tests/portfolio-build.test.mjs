import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const output = join(root, 'dist/portfolio');
const publicDir = join(root, 'public');
assert.ok(existsSync(join(output, 'index.html')), 'Run npm run build before npm test.');

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

const files = filesIn(output);

test('portfolio routes and aliases have compiled entry points', () => {
  const homepage = readFileSync(join(output, 'index.html'), 'utf8');
  assert.match(homepage, /src="\/assets\/[^"\s]+\.js"/);
  assert.doesNotMatch(homepage, /src="[^"]+\.tsx"/);
  for (const route of ['work', 'studio', 'photography', 'paintings', 'about', 'design-system']) {
    assert.equal(readFileSync(join(output, route, 'index.html'), 'utf8'), homepage, route);
  }
  assert.ok(existsSync(join(output, 'wishlist/index.html')));
  assert.equal(readFileSync(join(output, 'CNAME'), 'utf8').trim(), 'judyzhu.xyz');
  assert.ok(existsSync(join(output, '.nojekyll')));
});

test('static pages and assets retain their bytes and public URLs', () => {
  for (const source of filesIn(publicDir)) {
    const name = relative(publicDir, source);
    assert.deepEqual(readFileSync(join(output, name)), readFileSync(source), name);
  }
  for (const name of ['roboto-latin-500-normal-7RbcRiD8.woff2', 'roboto-latin-500-normal-DQZyH_nt.woff']) {
    assert.deepEqual(
      readFileSync(join(output, 'assets', name)),
      readFileSync(join(output, 'm/n001-7b43f2d9c6a1/assets', name)),
      `The invitation's absolute font alias must match ${name}`,
    );
  }
});

test('local HTML, CSS and bundled image references resolve within the published site', () => {
  for (const file of files) {
    const path = relative(output, file).replaceAll('\\', '/');
    let references = [];
    if (file.endsWith('.html')) {
      references = [...readFileSync(file, 'utf8').matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(match => match[1]);
    } else if (file.endsWith('.css')) {
      references = [...readFileSync(file, 'utf8').matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)].map(match => match[1]);
    } else if (file.endsWith('.js')) {
      references = [...readFileSync(file, 'utf8').matchAll(/["'](\/assets\/[^"'\\]+\.(?:jpg|png|webp|woff2?|css|js))["']/g)].map(match => match[1]);
    }
    for (const reference of references) {
      const url = new URL(reference, `https://portfolio.test/${path}`);
      if (url.origin !== 'https://portfolio.test') continue;
      let target = join(output, decodeURIComponent(url.pathname));
      assert.ok(existsSync(target), `${path} has a broken reference: ${reference}`);
      if (statSync(target).isDirectory()) target = join(target, 'index.html');
      assert.ok(existsSync(target), `${path} links to a directory without an entry point: ${reference}`);
    }
  }
});

test('source, configuration, documentation and archived prototypes stay out of the release', () => {
  for (const name of ['src', 'config', 'docs', 'archive', 'scripts', 'tests', 'node_modules', 'package.json', 'AGENTS.md']) {
    assert.equal(existsSync(join(output, name)), false, `${name} should not be deployed`);
  }
});

test('packaging fails before changing output when the wishlist build is missing', () => {
  const temporary = mkdtempSync(join(tmpdir(), 'portfolio-missing-wishlist-'));
  const before = readFileSync(join(output, 'index.html'));
  try {
    const result = spawnSync(process.execPath, ['scripts/prepare-portfolio.mjs'], {
      cwd: root,
      env: { ...process.env, WISHLIST_BUILD_DIR: join(temporary, 'missing-client') },
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /The wishlist build is missing/);
    assert.deepEqual(readFileSync(join(output, 'index.html')), before);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
