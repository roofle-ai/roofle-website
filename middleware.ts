import { next, rewrite } from '@vercel/functions'
import { ROUTES } from './src/routes'

// Markdown negotiation: Accept: text/markdown gets the prerendered <route>/index.md
// (written at build time by vite.config.ts); everyone else gets the normal HTML.
export const config = { matcher: ['/((?!assets/|.*\\..*).*)'] }

export default function middleware(req: Request) {
  const wantsMd = (req.headers.get('accept') ?? '').includes('text/markdown')
  if (!wantsMd) return next({ headers: { Vary: 'Accept' } })
  const url = new URL(req.url)
  const path = url.pathname.replace(/\/$/, '') || '/'
  if (!ROUTES.includes(path)) return new Response(notFound(path), { status: 404, headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' } })
  url.pathname = `${path === '/' ? '' : path}/index.md`
  return rewrite(url, { headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' } })
}

const notFound = (path: string) => `# 404: Page not found

The page \`${path.replace(/[`\n\r]/g, '')}\` does not exist on roofle.app. It may have moved or never existed. Use one of these to find what you need:

- [llms.txt](https://roofle.app/llms.txt): index of every page on the site
- [Sitemap](https://roofle.app/sitemap.xml): all URLs
- [Documentation](https://roofle.app/docs): setup and usage
- [Homepage](https://roofle.app/)
`
