import { useEffect, useRef, useState } from 'react'

// Pre-production traction site: no install or download surface, only a waitlist (Google Form).
const WAITLIST_HREF = 'https://forms.gle/RbKUuNMHeTYw9ifz7'

function Logo({ size = 28 }: { size?: number }) {
  return <img src="/favicon.svg" width={size} height={size} alt="" className="rounded-lg" />
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch { /* ignore */ }
  }
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:text-ink"
    >
      {dark ? '☀' : '☾'}
    </button>
  )
}

function Button({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'ghost' }) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition'
  const styles =
    variant === 'primary'
      ? 'bg-brand-strong text-white hover:opacity-90 dark:bg-brand dark:text-slate-950'
      : 'border border-line text-ink hover:bg-surface-2'
  return <a href={href} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })} className={`${base} ${styles}`}>{children}</a>
}

function Nav() {
  const links = [['Features', '#features'], ['Review', '#review'], ['Privacy', '#privacy'], ['FAQ', '#faq']]
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-lg font-bold"><Logo />Roofle</a>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map(([l, h]) => <a key={h} href={h} className="hover:text-ink">{l}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href={WAITLIST_HREF}>Join waitlist</Button>
        </div>
      </div>
    </header>
  )
}

type Source = 'mic' | 'sys'
const transcript: [string, string, Source][] = [
  ['You', 'Thanks for jumping on. What does your current process look like?', 'mic'],
  ['Maya', 'We track everything in spreadsheets, and honestly it breaks every quarter.', 'sys'],
  ['You', 'Who owns that today, and what happens when it breaks?', 'mic'],
  ['Maya', 'Ops owns it. Budget is a question mark, though. Finance reviews in March.', 'sys'],
]
const notes = ['Spreadsheet-based process breaks quarterly', 'Ops owns the workflow', 'Budget review with Finance in March']
const questions: [string, string, string][] = [
  ['Who signs off on budget?', 'Open', 'bg-amber-soft text-amber'],
  ['How often does the process break?', 'Resolved', 'bg-green-soft text-green'],
  ['What is the timeline for March review?', 'Unanswered', 'bg-record-soft text-record'],
]

const metrics: [string, number][] = [
  ['Decisions captured', 82], ['Questions resolved', 74], ['Action items', 79],
  ['Talk–listen balance', 68], ['Engagement', 85], ['Follow-up clarity', 71],
]
const total = Math.round(metrics.reduce((a, [, v]) => a + v, 0) / metrics.length)

function AppMock() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(11); return }
    const id = setInterval(() => setStep(s => (s >= 11 ? 0 : s + 1)), 1400)
    return () => clearInterval(id)
  }, [])
  const lines = Math.min(step, 4)
  const showNotes = step >= 5
  const qs = Math.max(0, Math.min(step - 5, 3))
  const ended = step >= 10
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-brand/10" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 text-xs">
        <span className="font-semibold tracking-wide text-muted">ROOFLE</span>
        <span className="flex items-center gap-1.5 font-medium text-record">
          {ended
            ? <><span className="h-2 w-2 rounded-full bg-green" /><span className="text-green">Session ended</span></>
            : <><span className="pulse-rec h-2 w-2 rounded-full bg-record" /> Recording</>}
        </span>
      </div>
      <div className="grid gap-px bg-line md:grid-cols-2">
        <div className="min-h-72 bg-bg p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">Live transcript</p>
          <div className="space-y-3 text-sm">
            {transcript.slice(0, lines).map(([who, text, src]) => (
              <p key={text} className="fade-up">
                <b className={who === 'You' ? 'text-brand-strong dark:text-brand' : 'text-insight'}>{who}</b>{' '}
                <span className={`mr-1 inline-block rounded-full px-1.5 py-px align-middle text-[10px] font-bold uppercase tracking-wide ${src === 'mic' ? 'bg-brand-tint text-brand-strong dark:text-brand' : 'bg-insight-soft text-insight'}`}>
                  {src === 'mic' ? 'Mic' : 'System'}
                </span>
                <span className="text-muted">{text}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="min-h-72 space-y-5 bg-bg p-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">Live notes</p>
            {showNotes ? (
              <ul className="fade-up space-y-1.5 text-sm text-muted">
                {notes.map(n => <li key={n} className="flex gap-2"><span className="text-brand">•</span>{n}</li>)}
              </ul>
            ) : <p className="text-sm text-faint">Listening…</p>}
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-insight">Suggested questions</p>
            <ul className="space-y-2 text-sm">
              {questions.slice(0, qs).map(([q, s, c]) => (
                <li key={q} className="fade-up flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2">
                  <span className="text-muted">{q}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="text-xs font-semibold text-insight">Source ›</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c}`}>{s}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {ended && (
        <div className="fade-up flex items-center justify-between gap-3 border-t border-line bg-brand-tint px-4 py-3 text-sm">
          <span className="font-semibold text-brand-strong dark:text-brand">Conversation review ready</span>
          <span className="text-muted">Score <b className="text-ink">{total}</b> / 100 · Focus: ask about budget earlier</span>
        </div>
      )}
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-brand-tint to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold text-brand-strong dark:text-brand">LISTEN. NOTE. COACH.</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Never miss what matters in a meeting.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Roofle lives in your Mac's menu bar and listens to your meetings on your device — transcribing them live, writing the notes, suggesting the questions you should ask, and reviewing how the conversation went once it ends.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={WAITLIST_HREF}>Join the waitlist</Button>
            <Button href="#review" variant="ghost">See it in action</Button>
          </div>
          <p className="mt-4 text-sm text-faint">Runs on your machine. Your conversations stay yours.</p>
        </div>
        <div className="mx-auto mt-14 max-w-4xl"><AppMock /></div>
      </div>
    </section>
  )
}

function Section({ id, title, eyebrow, children, tint }: { id?: string; title: string; eyebrow?: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={tint ? 'bg-surface' : ''}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-strong dark:text-brand">{eyebrow}</p>}
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

// Loops 0..n-1 while playing; otherwise rests on the final frame (also when motion is reduced).
function useTick(playing: boolean, n = 6, ms = 1000) {
  const [t, setT] = useState(n - 1)
  useEffect(() => {
    if (!playing || matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(n - 1); return }
    setT(0)
    const id = setInterval(() => setT(x => (x + 1) % n), ms)
    return () => clearInterval(id)
  }, [playing, n, ms])
  return t
}

const chip = 'rounded-full px-1.5 py-px text-[10px] font-bold uppercase'
const demos: Record<string, (t: number) => React.ReactNode> = {
  'Live transcription': t => (
    <div className="space-y-2">
      {[['mic', 'Mic', 'What does your process look like?'], ['sys', 'System', 'Spreadsheets, and it breaks every quarter.']].slice(0, t >= 3 ? 2 : t >= 1 ? 1 : 0).map(([k, l, x]) => (
        <p key={x} className="fade-up"><span className={`${chip} mr-1 ${k === 'mic' ? 'bg-brand-tint text-brand-strong dark:text-brand' : 'bg-insight-soft text-insight'}`}>{l}</span>{x}</p>
      ))}
    </div>
  ),
  'Live notes': t => (
    <ul className="space-y-1.5">
      <li>• Spreadsheet process breaks quarterly</li>
      {t >= 3 && <li key="n" className="fade-up">• Budget review with Finance in March <span className={`${chip} bg-green-soft text-green`}>Updated</span></li>}
    </ul>
  ),
  'Suggested questions': t => (
    <div className="space-y-2">
      <p className={`rounded px-1 transition ${t >= 3 ? 'bg-insight-soft' : ''}`}>“Budget is a question mark, though.”</p>
      <div className="flex items-center justify-between rounded-lg border border-line px-2 py-1.5">
        <span>Who signs off on budget?</span>
        <span className={`font-semibold text-insight ${t >= 2 ? 'pulse-rec' : ''}`}>Source ›</span>
      </div>
    </div>
  ),
  'Recap on demand': t => (
    <div className="space-y-2">
      <span className={`inline-block rounded-full border px-2 py-0.5 font-semibold transition ${t >= 1 ? 'border-brand bg-brand-tint text-brand-strong dark:text-brand' : 'border-line'}`}>Recap · last 30s</span>
      {t >= 2 && <p key="r" className="fade-up">Ops owns the workflow. Budget review with Finance is in March.</p>}
    </div>
  ),
  'Key figures and dates': t => (
    <div className="flex flex-wrap gap-2">
      {['$40k budget', 'March 14', '3 seats', 'Q3 launch'].slice(0, Math.min(t, 4)).map(x => (
        <span key={x} className="fade-up rounded-full bg-amber-soft px-2 py-1 font-semibold text-amber">{x}</span>
      ))}
    </div>
  ),
  'Conversation review': t => (
    <div className="space-y-2">
      {[['Decisions', 82], ['Questions resolved', 74], ['Balance', 68]].map(([n, v]) => (
        <div key={n}>
          <div className="flex justify-between"><span>{n}</span><span>{t >= 1 ? v : '–'}</span></div>
          <div className="mt-0.5 h-1.5 rounded-full bg-surface-2"><div className="h-full rounded-full bg-brand transition-[width] duration-1000" style={{ width: t >= 1 ? `${v}%` : 0 }} /></div>
        </div>
      ))}
    </div>
  ),
  'Auto session titles': t => (
    <p className="font-semibold text-ink">{'Discovery call with Maya: ops workflow'.slice(0, t * 8)}<span className="pulse-rec">|</span></p>
  ),
  'Menu bar and shortcuts': t => (
    <div className="space-y-2">
      {[['⌘⇧S', 'Start recording', t < 3], ['⌘⇧T', 'Stop recording', t >= 3]].map(([k, l, on]) => (
        <p key={String(k)} className="flex items-center gap-2">
          <kbd className={`rounded border px-1.5 py-0.5 font-mono transition ${on ? 'border-brand bg-brand-tint text-brand-strong dark:text-brand' : 'border-line'}`}>{k}</kbd>{l}
        </p>
      ))}
    </div>
  ),
  'On-device': t => (
    <ul className="space-y-1.5">
      {['Speech recognition', 'Transcript storage'].slice(0, Math.min(t, 2)).map(x => (
        <li key={x} className="fade-up flex justify-between"><span>{x}</span><span className="font-semibold text-green">On your Mac ✓</span></li>
      ))}
    </ul>
  ),
}
const features: [string, string][] = [
  ['Live transcription', 'Listens to your mic and the system audio at once. Every line is tagged by source, so you know who said what.'],
  ['Live notes', 'One short notes document, rewritten as the conversation moves: summary, key points, decisions and action items.'],
  ['Suggested questions', 'Spots gaps and vague points worth asking about. Source jumps to the exact line of the transcript it came from.'],
  ['Recap on demand', 'Zoned out for a moment? Get a recap of the last 30 seconds in one click.'],
  ['Key figures and dates', 'Pulls out the numbers, dates and names that matter, so nothing important is buried in the transcript.'],
  ['Conversation review', 'An offline self-assessment once the session ends: a focus area and plain-language explanations. It says so when the transcript is too thin to judge.'],
  ['Auto session titles', 'Every finished session gets a clear title, so past conversations are easy to find.'],
  ['Menu bar and shortcuts', 'Lives in the menu bar with no Dock icon. Start and stop with a shortcut; nothing records until you do.'],
  ['On-device', 'Speech recognition and storage run locally. You bring your own LLM key for notes, questions and reviews.'],
]

const icons: Record<string, string> = {
  'Live transcription': '≋', 'Live notes': '✎', 'Suggested questions': '?', 'Recap on demand': '↺', 'Key figures and dates': '#',
  'Conversation review': '★', 'Auto session titles': 'T', 'Menu bar and shortcuts': '⌘', 'On-device': '⌂',
}
const groups: [string, number][] = [['During the call', 0], ['After the call', 5], ['Always', 7]]

function FeatureCard({ title, desc, playing, onPlay, onStop }: { title: string; desc: string; playing: boolean; onPlay: () => void; onStop: () => void }) {
  const t = useTick(playing)
  return (
    <button
      onMouseEnter={onPlay} onMouseLeave={onStop} onFocus={onPlay} onBlur={onStop}
      onClick={() => (playing ? onStop() : onPlay())}
      className={`group flex h-full flex-col rounded-2xl border bg-bg p-5 text-left transition hover:shadow-xl hover:shadow-brand/10 ${playing ? 'border-brand shadow-xl shadow-brand/10' : 'border-line'}`}
    >
      <div aria-hidden="true" className="relative mb-5 h-36 w-full overflow-hidden rounded-xl bg-brand-tint p-3 text-xs text-muted">
        {demos[title](t)}
        <span className={`absolute bottom-2 right-3 text-[10px] text-faint transition ${playing ? 'opacity-0' : 'opacity-100'}`}>Hover to play</span>
      </div>
      <span className="flex items-center gap-3">
        <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-strong text-sm font-bold text-white dark:text-slate-950">{icons[title]}</span>
        <span className="font-semibold">{title}</span>
      </span>
      <span className="mt-3 text-sm text-muted">{desc}</span>
    </button>
  )
}

function Features() {
  const [playing, setPlaying] = useState<number | null>(null)
  return (
    <Section id="features" eyebrow="Features" title="Everything you need, nothing you have to type." tint>
      <div className="space-y-12">
        {groups.map(([g, from], gi) => (
          <div key={g}>
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-strong dark:text-brand">{g}</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.slice(from, groups[gi + 1]?.[1]).map(([t, d], j) => (
                <FeatureCard key={t} title={t} desc={d} playing={playing === from + j}
                  onPlay={() => setPlaying(from + j)} onStop={() => setPlaying(x => (x === from + j ? null : x))} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}


function Review() {
  const [run, setRun] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect() } }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const replay = () => { setRun(false); setTimeout(() => setRun(true), 300) }
  return (
    <Section id="review" eyebrow="Conversation review" title="See how the call really went.">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div className="space-y-5 text-muted">
          <p className="text-lg">When the session ends, Roofle runs a self-assessment — an honest read on how it went, with a focus area and plain-language explanations.</p>
          <p className="font-semibold text-ink">Watch it score a sample session. It runs the moment you scroll here.</p>
          <p>When the transcript is too thin to judge fairly, Roofle says so instead of faking confidence.</p>
        </div>
        <div ref={ref} className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">Session review</p>
              <p className="mt-1 text-4xl font-extrabold">{run ? total : '–'}<span className="text-base font-medium text-faint"> / 100</span></p>
            </div>
            <button onClick={replay} className="rounded-full bg-brand-strong px-4 py-2 text-sm font-semibold text-white dark:bg-brand dark:text-slate-950">
              Replay
            </button>
          </div>
          <ul className="mt-6 space-y-4">
            {metrics.map(([name, v]) => (
              <li key={name}>
                <div className="mb-1 flex justify-between text-sm"><span>{name}</span><span className="text-muted">{run ? v : '–'}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-brand transition-[width] duration-1000 ease-out" style={{ width: run ? `${v}%` : '0%' }} />
                </div>
              </li>
            ))}
          </ul>
          {run && (
            <p key="focus" className="fade-up mt-5 rounded-lg bg-brand-tint px-3 py-2 text-sm text-muted">
              <b className="text-brand-strong dark:text-brand">Focus area:</b> Ask who signs off on budget earlier. It was left open until the end.
            </p>
          )}
          <p className="mt-5 text-xs text-faint">Sample session shown for illustration.</p>
        </div>
      </div>
    </Section>
  )
}

function Privacy() {
  return (
    <Section id="privacy" eyebrow="Privacy" title="Built to run locally." tint>
      <div className="max-w-2xl space-y-4 text-lg text-muted">
        <p>Speech recognition and storage run on your Mac, on-device. Notes, suggested questions, and reviews use an LLM through an API key you provide in Settings.</p>
        <p className="font-semibold text-ink">Your audio and transcripts stay on your machine.</p>
      </div>
    </Section>
  )
}

function UseCases() {
  const items = [
    ['Sales reps', 'Review talk–listen balance and discovery depth after every call.'],
    ['Managers and leaders', 'Capture decisions and track follow-ups across 1:1s and team meetings.'],
    ['Trainers and coaches', 'Turn sessions into notes and reflection points.'],
    ['Founders and consultants', 'Keep client conversations organised without a note-taker joining the call.'],
  ]
  return (
    <Section eyebrow="Use cases" title="Made for people who live in conversations.">
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-line p-6">
            <h3 className="font-semibold text-brand-strong dark:text-brand">{t}</h3>
            <p className="mt-2 text-muted">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function FAQ() {
  const items = [
    ['What is Roofle?', 'A macOS menu-bar app that listens to your meetings on your device — transcribing them live, writing notes, suggesting questions worth asking, and reviewing the session when it ends.'],
    ['Does Roofle join my calls as a bot?', 'No. It runs as a menu-bar app on your Mac, so there is no bot to explain to attendees.'],
    ['Does my audio leave my computer?', 'No. Speech recognition and storage run locally on your Mac. Notes, questions, and reviews use an LLM through an API key you provide in Settings.'],
    ['What do I need to run it?', 'An Apple Silicon Mac on macOS 13 or newer.'],
    ['When does it record?', 'Nothing is recorded until you start it. Roofle runs from the menu bar and stays out of the way until you quit.'],
    ['What if the recording is short or one-sided?', 'Roofle tells you when it is not sure instead of faking confidence.'],
  ]
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered." tint>
      <div className="max-w-3xl divide-y divide-line rounded-2xl border border-line bg-bg">
        {items.map(([q, a]) => (
          <details key={q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {q}<span className="text-brand transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-muted">{a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-strong px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold sm:text-4xl">Spend your meetings talking, not typing.</h2>
        <a href={WAITLIST_HREF} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-strong shadow-lg transition hover:opacity-90">Join the waitlist</a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2"><Logo size={20} /><b className="text-ink">Roofle</b></p>
        <p className="flex gap-5"><a href="#privacy" className="hover:text-ink">Privacy</a><a href={WAITLIST_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Join waitlist</a><a href="mailto:hello@roofle.app" className="hover:text-ink">Contact</a><span>© 2026</span></p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Review />
        <Privacy />
        <UseCases />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
