import { next, rewrite } from '@vercel/functions/middleware'

// Markdown negotiation: Accept: text/markdown gets the prerendered <route>/index.md
// (written at build time by vite.config.ts); everyone else gets the normal HTML.
// No local imports: Vercel runs this as unbundled Node ESM, extensionless imports fail.
export const config = { matcher: ['/((?!assets/|.*\\..*).*)'] }

export default function middleware(req: Request) {
  if (!(req.headers.get('accept') ?? '').includes('text/markdown')) return next({ headers: { Vary: 'Accept' } })
  const url = new URL(req.url)
  const path = url.pathname.replace(/\/$/, '')
  url.pathname = `${path}/index.md`
  return rewrite(url, { headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' } })
}
