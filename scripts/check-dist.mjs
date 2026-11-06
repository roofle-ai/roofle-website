// Run after `npm run build`: asserts the agent-readiness outputs. Exits non-zero on failure.
import { readFileSync, existsSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import assert from 'node:assert/strict'

const read = f => readFileSync(`dist/${f}`, 'utf8')
const text = h => h.split('<div id="root">')[1].replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
const routes = ['', '/features', '/privacy', '/blog', '/about', '/status', '/docs', '/docs/connect-ai-model', '/use-cases/sales', '/alternatives/granola', '/blog/what-roofle-costs']

for (const r of routes) {
  const h = read(`${r}/index.html`)
  assert.equal((h.match(/<h1[\s>]/g) ?? []).length, 1, `${r}: exactly one h1`)
  assert.ok(text(h).length >= (r ? 300 : 500), `${r}: raw HTML text too short`)
  let prev = 0
  for (const [, n] of h.matchAll(/<h([1-6])[\s>]/g)) { assert.ok(+n <= prev + 1, `${r}: heading skip to h${n}`); prev = +n }
  assert.ok(read(`${r}/index.md`).length > 100, `${r}: markdown missing`)
}
const home = read('index.html')
assert.match(home, /"description":"Free/, 'JSON-LD description')
assert.match(home, /"keywords":/, 'JSON-LD keywords')
assert.match(home, /<link rel="canonical" href="https:\/\/roofle\.app" \/>/)
assert.match(read('about/index.html'), /rel="canonical" href="https:\/\/roofle\.app\/about"/)
assert.match(read('llms.txt'), /## When to use Roofle/)
assert.ok(existsSync('dist/404.html') && /Page not found/.test(read('404.html')))
assert.ok(!existsSync('vercel.json') || !/rewrites/.test(readFileSync('vercel.json', 'utf8')), 'no SPA catch-all (soft 404)')

// Middleware behaviour (bundled with rolldown, which ships with vite).
execFileSync('npx', ['--no-install', 'rolldown', 'middleware.ts', '-f', 'esm', '-o', 'dist/.mw.mjs'], { stdio: 'ignore' })
const mw = (await import(new URL('../dist/.mw.mjs', import.meta.url))).default
const call = (path, accept) => mw(new Request(`https://roofle.app${path}`, { headers: { accept } }))
let r = call('/', 'text/markdown')
assert.equal(r.headers.get('vary'), 'Accept'); assert.match(r.headers.get('content-type'), /^text\/markdown/)
assert.equal(r.headers.get('x-middleware-rewrite'), 'https://roofle.app/index.md')
r = call('/', 'text/html')
assert.equal(r.headers.get('vary'), 'Accept'); assert.ok(r.headers.get('x-middleware-next') && !r.headers.get('x-middleware-rewrite'))
r = call('/nope', 'text/markdown')
assert.equal(r.status, 404); assert.match(r.headers.get('content-type'), /^text\/markdown/); assert.equal(r.headers.get('vary'), 'Accept')
const body = await r.text(); assert.ok(body.length > 20 && /llms\.txt/.test(body) && /sitemap/i.test(body))
rmSync('dist/.mw.mjs')
console.log('agent-readiness checks passed')
