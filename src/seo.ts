import { SITE_URL as SITE } from './site'

function tag(sel: string, make: string, attr: string, val: string) {
  let el = document.head.querySelector(sel)
  if (!el) { el = document.createElement(make); document.head.appendChild(el) }
  el.setAttribute(attr, val)
  return el
}

/** Client-side SEO: title, description, canonical, OG/Twitter, optional JSON-LD. */
export function setSeo(title: string, description: string, path = location.pathname, jsonLd?: object, type = 'website') {
  const url = SITE + (path === '/' ? '' : path.replace(/\/$/, ''))
  document.title = title
  const m = (k: 'name' | 'property', n: string, v: string) => tag(`meta[${k}="${n}"]`, 'meta', 'content', v).setAttribute(k, n)
  m('name', 'description', description)
  m('property', 'og:type', type)
  m('property', 'og:title', title); m('property', 'og:description', description); m('property', 'og:url', url)
  m('name', 'twitter:title', title); m('name', 'twitter:description', description)
  tag('link[rel="canonical"]', 'link', 'href', url).setAttribute('rel', 'canonical')
  document.getElementById('ld-json')?.remove()
  if (jsonLd) {
    const s = document.createElement('script')
    s.id = 'ld-json'; s.type = 'application/ld+json'; s.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(s)
  }
}
