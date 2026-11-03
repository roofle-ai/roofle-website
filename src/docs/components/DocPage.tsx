import { Children, isValidElement, useEffect, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { SITE_NAME, SITE_URL } from '../../site'
import { setSeo } from '../../seo'
import { DOC_PAGES, docMeta } from '../meta'

type SectionProps = {
  id: string
  title: string
  eyebrow?: string
  group?: string // sidebar group; defaults to "On this page"
  nav?: string // shorter sidebar label; defaults to title
  children: ReactNode
}

/** One section of a docs page. DocPage reads its props to build the sidebar. */
export function DocSection({ id, title, eyebrow, children }: SectionProps) {
  return (
    <section className="border-t border-line py-12 first:border-t-0 first:pt-0">
      {eyebrow && <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">{eyebrow}</p>}
      <h2 id={id} className="scroll-mt-24 text-3xl font-medium tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

type Nav = [string, [string, string][]][]

function buildNav(children: ReactNode): Nav {
  const groups = new Map<string, [string, string][]>()
  Children.forEach(children, c => {
    if (!isValidElement(c) || c.type !== DocSection) return
    const p = (c as ReactElement<SectionProps>).props
    const g = p.group ?? 'On this page'
    groups.set(g, [...(groups.get(g) ?? []), [p.id, p.nav ?? p.title]])
  })
  return [...groups]
}

function NavList({ nav, active, onPick, back }: { nav: Nav; active: string; onPick?: () => void; back: boolean }) {
  return (
    <div className="space-y-6">
      {back && <a href="/docs" className="block text-sm font-medium text-brand-strong dark:text-brand">← All documentation</a>}
      {nav.map(([group, items]) => (
        <div key={group}>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faint">{group}</p>
          <ul className="space-y-0.5 border-l border-line">
            {items.map(([id, t]) => (
              <li key={id}><a href={`#${id}`} onClick={onPick} className={`-ml-px block border-l py-1 pl-4 text-sm transition ${active === id ? 'border-brand font-semibold text-ink' : 'border-transparent text-muted hover:text-ink'}`}>{t}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function jsonLd(path: string) {
  const m = docMeta(path)
  const url = SITE_URL + path
  const crumbs = [['Home', SITE_URL], ['Docs', `${SITE_URL}/docs`], ...(path === '/docs' ? [] : [[m.title, url]])]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'TechArticle', headline: m.title, description: m.description, url, mainEntityOfPage: url, publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL } },
      { '@type': 'BreadcrumbList', itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
    ],
  }
}

/** Standard template for every docs page: header, sidebar, SEO, prev/next. Children must be <DocSection>s. */
export default function DocPage({ path, children }: { path: string; children: ReactNode }) {
  const m = docMeta(path)
  const nav = buildNav(children)
  const ids = nav.flatMap(([, items]) => items.map(([id]) => id))
  const back = path !== '/docs'
  const [active, setActive] = useState(ids[0])
  const [open, setOpen] = useState(false)

  useEffect(() => { setSeo(`${m.title} · ${SITE_NAME}`, m.description, path, jsonLd(path)) }, [path])
  useEffect(() => {
    const io = new IntersectionObserver(es => { const e = es.find(x => x.isIntersecting); if (e) setActive(e.target.id) }, { rootMargin: '-15% 0px -75% 0px' })
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [path])

  const i = DOC_PAGES.findIndex(p => p.path === path)
  const [prev, next] = [DOC_PAGES[i - 1], DOC_PAGES[i + 1]]
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">Documentation</p>
          <h1 className="max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl">{m.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{m.intro}</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[14rem_minmax(0,1fr)]">
        <details open={open} onToggle={e => setOpen(e.currentTarget.open)} className="rounded-xl border border-line px-4 py-3 md:hidden">
          <summary className="cursor-pointer text-sm font-semibold">On this page</summary>
          <div className="mt-4"><NavList nav={nav} active={active} back={back} onPick={() => setOpen(false)} /></div>
        </details>
        <nav aria-label="On this page" className="hidden md:sticky md:top-24 md:block md:max-h-[calc(100vh-7rem)] md:self-start md:overflow-y-auto"><NavList nav={nav} active={active} back={back} /></nav>
        <article className="min-w-0 max-w-3xl">
          {children}
          <nav aria-label="More documentation" className="mt-4 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? <a href={prev.path} rel="prev" className="rounded-xl border border-line p-4 transition hover:border-brand"><span className="text-xs text-faint">Previous</span><span className="mt-1 block font-medium text-ink">{prev.title}</span></a> : <span />}
            {next && <a href={next.path} rel="next" className="rounded-xl border border-line p-4 text-right transition hover:border-brand"><span className="text-xs text-faint">Next</span><span className="mt-1 block font-medium text-ink">{next.title}</span></a>}
          </nav>
        </article>
      </div>
    </>
  )
}
