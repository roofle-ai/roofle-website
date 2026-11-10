import { useEffect } from 'react'
import { setSeo } from '../seo'
import { SITE_NAME, SITE_URL } from '../site'
import { POSTS, type Post } from './posts'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const text = (body: Post['body']) => body.map(b => typeof b === 'string' ? b : 'src' in b ? b.alt : [...b.head, ...b.rows.flat()].join(' ')).join(' ')
const mins = (body: Post['body']) => Math.max(1, Math.round(text(body).split(/\s+/).length / 220))
// Renders **bold** and [text](url) inside a paragraph.
const inline = (t: string) => t.split(/(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\))/g).map((x, i) => {
  const b = x.match(/^\*\*(.+)\*\*$/), l = x.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
  if (b) return <strong key={i} className="font-semibold text-ink">{b[1]}</strong>
  if (l) return <a key={i} href={l[2]} {...(l[2].startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })} className="text-brand-strong underline underline-offset-4 hover:opacity-80 dark:text-brand">{l[1]}</a>
  return x
})
const eyebrow = 'font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand'

export function Blog() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <p className={eyebrow}>Blog</p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-tight sm:text-6xl">Notes from the Roofle team</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">Costs, releases and lessons from building an open-source meeting copilot.</p>
      <ul className="mt-14 grid gap-5">
        {POSTS.map(p => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`} className="group block rounded-2xl border border-line bg-surface p-7 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg hover:shadow-indigo-950/10">
              <p className="font-mono text-xs text-faint"><time dateTime={p.date}>{fmt(p.date)}</time> · {mins(p.body)} min read</p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight group-hover:text-brand-strong dark:group-hover:text-brand">{p.title}</h2>
              <p className="mt-2 text-muted">{p.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-strong dark:text-brand">Read →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function BlogPost({ slug }: { slug: string }) {
  const p = POSTS.find(x => x.slug === slug)
  useEffect(() => {
    if (!p) return
    const url = `${SITE_URL}/blog/${p.slug}`
    setSeo(`${p.title} · ${SITE_NAME}`, p.description, `/blog/${p.slug}`, {
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description,
      datePublished: p.date, dateModified: p.date, mainEntityOfPage: url, url,
      image: `${SITE_URL}/og.png`,
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    }, 'article')
  }, [p])
  if (!p) return <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6"><p>Post not found. <a href="/blog" className="underline">All posts</a></p></section>
  return (
    <article>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <a href="/blog" className="text-sm font-semibold text-faint hover:text-ink">← All posts</a>
          <h1 className="mt-6 text-balance font-serif text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">{p.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{p.description}</p>
          <p className="mt-6 font-mono text-xs text-faint">{SITE_NAME} team · <time dateTime={p.date}>{fmt(p.date)}</time> · {mins(p.body)} min read</p>
        </div>
      </header>
      <div className="mx-auto max-w-[42rem] px-5 py-14 sm:px-6">
        <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-ink sm:text-lg sm:leading-[1.8]">
          {p.body.map((t, i) => typeof t !== 'string' && 'src' in t
            ? <figure key={i} className="!my-10 font-sans">
                {t.src.endsWith('.webm')
                  ? <video src={t.src} aria-label={t.alt} controls muted loop playsInline preload="metadata" className="w-full rounded-2xl border border-line" />
                  : <img src={t.src} alt={t.alt} loading="lazy" className="w-full rounded-2xl border border-line" />}
                {t.caption && <figcaption className="mt-3 text-sm text-faint">{t.caption}</figcaption>}
              </figure>
            : typeof t !== 'string'
            ? <figure key={i} className="!my-10 font-sans">
                <div className="overflow-x-auto rounded-2xl border border-line">
                  <table className="w-full min-w-[32rem] text-left text-base">
                    <thead className="bg-surface text-sm text-faint"><tr>{t.head.map(h => <th key={h} scope="col" className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead>
                    <tbody className="divide-y divide-line">
                      {t.rows.map(r => <tr key={r[0]}>{r.map((c, j) => j === 0
                        ? <th key={j} scope="row" className="px-5 py-4 font-semibold">{c}</th>
                        : <td key={j} className={`px-5 py-4 ${j === 1 ? 'font-semibold text-brand-strong dark:text-brand' : 'text-muted'}`}>{c}</td>)}</tr>)}
                    </tbody>
                  </table>
                </div>
                {t.note && <figcaption className="mt-3 text-sm text-faint">{t.note}</figcaption>}
              </figure>
            : t.startsWith('### ')
              ? <h3 key={i} className="!mt-10 !mb-0 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{t.slice(4)}</h3>
            : t.startsWith('## ')
              ? <h2 key={i} id={t.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')} className="!mt-14 !mb-0 border-t border-line pt-8 text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">{t.slice(3)}</h2>
              : t.startsWith('```')
              ? <pre key={i} className="overflow-x-auto rounded-2xl border border-line bg-surface p-5 font-mono text-sm leading-relaxed"><code>{t.slice(4, -4)}</code></pre>
              : <p key={i} className={i === 0 ? 'text-xl leading-[1.65] text-muted sm:text-[1.375rem]' : ''}>{inline(t)}</p>)}
        </div>
        <aside className="mt-16 rounded-2xl border border-line bg-surface p-7">
          <p className="font-serif text-2xl font-medium">Try Roofle, free and open source.</p>
          <p className="mt-1 text-muted">A meeting copilot that lives in your Mac menu bar.</p>
          <a href="/" className="mt-4 inline-block rounded-full bg-brand-strong px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 dark:bg-brand dark:text-slate-950">Learn more</a>
        </aside>
      </div>
    </article>
  )
}
