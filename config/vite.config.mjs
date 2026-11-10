import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const publicDir = resolve(root, 'public');
const staticPages = new Set(readdirSync(publicDir, { recursive: true })
  .map(name => name.replaceAll('\\', '/'))
  .filter(name => name.endsWith('/index.html'))
  .map(name => `/${name.slice(0, -'index.html'.length)}`));

// Vite's SPA fallback only discovers directory indexes under src/. Resolve
// preserved public pages first, matching their directory URLs in production.
function configureStaticPages(server) {
  server.middlewares.use((request, response, next) => {
    if (!['GET', 'HEAD'].includes(request.method)) return next();
    const url = new URL(request.url, 'http://localhost');
    if (staticPages.has(url.pathname)) {
      request.url = `${url.pathname}index.html${url.search}`;
    } else if (staticPages.has(`${url.pathname}/`)) {
      response.writeHead(302, { Location: `${url.pathname}/${url.search}` });
      return response.end();
    }
    next();
  });
}

export default defineConfig({
  root: resolve(root, 'src'),
  plugins: [{
    name: 'static-page-routes',
    configureServer: configureStaticPages,
    configurePreviewServer: configureStaticPages,
  }, react()],
  publicDir,
  build: { outDir: resolve(root, 'dist/portfolio'), emptyOutDir: true },
  server: { host: '127.0.0.1', port: 4173, strictPort: true }
});
