import { useState } from 'react'

export function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => navigator.clipboard?.writeText(children).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  return (
    <div className="relative mt-4 rounded-xl border border-line bg-surface">
      <pre className="overflow-x-auto px-4 py-3 pr-20 font-mono text-sm text-ink"><code>{children}</code></pre>
      <button type="button" onClick={copy} className="absolute right-2 top-2 rounded-md border border-line bg-bg px-2 py-1 text-xs text-muted transition hover:text-ink">{copied ? 'Copied' : 'Copy'}</button>
    </div>
  )
}

export function Note({ title, children, warn }: { title: string; children: React.ReactNode; warn?: boolean }) {
  return (
    <aside className={`mt-5 rounded-xl border-l-4 px-4 py-3 text-sm ${warn ? 'border-amber bg-amber-soft' : 'border-brand bg-brand-tint'}`}>
      <p className="font-semibold text-ink">{title}</p>
      <div className="mt-1 text-muted">{children}</div>
    </aside>
  )
}

export function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-xs uppercase tracking-wider text-faint"><tr>{head.map(h => <th key={h} className="px-4 py-2.5 font-mono font-medium">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-line">
          {rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`px-4 py-2.5 align-top ${j === 0 ? 'font-medium text-ink' : 'text-muted'}`}>{c}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  )
}

export const K = ({ children }: { children: React.ReactNode }) => <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-xs text-ink">{children}</kbd>
export const C = ({ children }: { children: React.ReactNode }) => <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-ink">{children}</code>
export const A = ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })} className="font-medium text-brand-strong underline underline-offset-2 dark:text-brand">{children}</a>

export function H({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">{eyebrow}</p>
      <h2 id={id} className="scroll-mt-24 text-3xl font-medium tracking-tight">{children}</h2>
    </>
  )
}
export const H3 = ({ id, children }: { id?: string; children: React.ReactNode }) => <h3 id={id} className="mt-8 scroll-mt-24 font-serif text-xl font-medium">{children}</h3>
export const P = ({ children }: { children: React.ReactNode }) => <p className="mt-3 leading-relaxed text-muted">{children}</p>
export const Sec = ({ children }: { children: React.ReactNode }) => <section className="border-t border-line py-12 first:border-t-0 first:pt-0">{children}</section>
