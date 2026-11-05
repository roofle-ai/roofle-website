import { useState } from 'react'
import { DETAIL, features } from './data'
import { FeatureModal } from './FeatureModal'

export function Features() {
  const [sel, setSel] = useState<string | null>(null)
  const d = sel ? DETAIL[sel] : null
  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-32 sm:px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">Features</p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">Everything you need, nothing you have to type.</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/80">Roofle works quietly in the background, so you can stay in the conversation.</p>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
          <table className="w-full border-y border-line text-left">
            <tbody className="divide-y divide-line">
              {features.map(([name, desc]) => (
                <tr key={name}>
                  <td className="w-8 py-5 pr-3 align-top text-xl text-green">✓</td>
                  <th scope="row" className="w-2/5 py-5 pr-6 align-top text-lg font-semibold">{name}</th>
                  <td className="py-5 align-top text-muted">
                    {desc}{' '}
                    <button onClick={() => setSel(name)} className="whitespace-nowrap text-sm text-faint underline-offset-4 hover:text-ink hover:underline">Read more</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {sel && d && <FeatureModal name={sel} detail={d} onClose={() => setSel(null)} />}
    </>
  )
}
