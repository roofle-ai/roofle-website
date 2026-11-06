import { DOC_PAGES } from './docs/meta'
import { USE_CASES } from './use-cases'
import { ALTERNATIVES } from './alternatives'
import { POSTS } from './blog/posts'

// Every real route. Used by the sitemap, the prerenderer and the edge middleware (404s).
export const ROUTES = ['/', '/features', '/privacy', '/blog', '/about', '/status', ...DOC_PAGES.map(p => p.path), ...USE_CASES.map(u => `/use-cases/${u.slug}`), ...ALTERNATIVES.map(a => `/alternatives/${a.slug}`), ...POSTS.map(b => `/blog/${b.slug}`)]
