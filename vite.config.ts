import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { DOC_PAGES } from './src/docs/meta'
import { SITE_URL } from './src/site'
import { USE_CASES } from './src/use-cases'
import { ALTERNATIVES } from './src/alternatives'
import { POSTS } from './src/blog/posts'

// Builds sitemap.xml from the route lists so it never drifts from the site.
const STATIC = ['', '/features', '/privacy', '/blog', '/about', '/status']
function sitemap(): Plugin {
  const paths = [...STATIC, ...DOC_PAGES.map(p => p.path), ...USE_CASES.map(u => `/use-cases/${u.slug}`), ...ALTERNATIVES.map(a => `/alternatives/${a.slug}`)]
  const lastmod: Record<string, string> = Object.fromEntries(POSTS.map(b => [`/blog/${b.slug}`, b.date]))
  paths.push(...Object.keys(lastmod))
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p => `<url><loc>${SITE_URL}${p}</loc>${lastmod[p] ? `<lastmod>${lastmod[p]}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`
  return {
    name: 'sitemap',
    generateBundle() { this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml }) },
    configureServer(server) { server.middlewares.use('/sitemap.xml', (_, res) => { res.setHeader('Content-Type', 'application/xml'); res.end(xml) }) },
  }
}

export default defineConfig({ plugins: [react(), tailwindcss(), sitemap()] })
