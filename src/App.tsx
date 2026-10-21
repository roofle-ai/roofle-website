import { useEffect, useRef, useState } from 'react';

// Pre-production traction site: no install or download surface, only a waitlist (Google Form).
const WAITLIST_HREF = 'https://forms.gle/RbKUuNMHeTYw9ifz7'
const DEMO_VIDEO_ID = 'yOLk_GIRneE' // TODO: replace with the real Roofle demo video ID

// TODO: fill these in before sharing the About page widely; they render only when set.
const BUILDER: { name: string; note: string } | null = null
const CONTACT_EMAIL = 'support@roofle.com'

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

// Lines for the hero meeting window.
const CAPTIONS: Record<string, [string, string]> = {
  hero: ['Maya', 'Honestly, we track everything in spreadsheets, and it breaks every quarter.'],
  highlights: ['Maya', 'We are mostly on Zoom and Teams, plus the odd Meet call.'],
  features: ['Maya', 'Follow-ups are the worst part. I spend an hour after every call writing them up.'],
  review: ['Maya', 'Ops owns the process, but the budget is still a question mark.'],
  privacy: ['Maya', 'Our security team is picky about where recordings end up.'],
  usecases: ['Maya', 'We would probably start with client calls and our weekly planning.'],
  faq: ['Maya', 'Finance reviews in March, so I would need something concrete by then.'],
  cta: ['Maya', 'That is helpful. Send me what we agreed on.'],
}

type Intel = { note: string; q: string; status: 'Open' | 'Resolved' | 'Unanswered' }
const ORDER = ['hero', 'highlights', 'features', 'review', 'privacy', 'usecases', 'faq', 'cta']
const INTEL: Record<string, Intel> = {
  hero: { note: 'Process lives in spreadsheets and breaks every quarter', q: 'What does your current process look like, and where does it break down?', status: 'Open' },
  highlights: { note: 'Team uses Zoom, Teams and Meet', q: 'Which meeting tools does your team rely on day to day?', status: 'Resolved' },
  features: { note: 'Follow-up write-ups take about an hour per call', q: 'Which part of your follow-up process costs you the most time?', status: 'Open' },
  review: { note: 'Ops owns it; budget approval unclear', q: 'Who needs to approve this, and what does their review look like?', status: 'Unanswered' },
  privacy: { note: 'Security team cares where recordings are stored', q: 'What are your requirements for where meeting data is stored?', status: 'Open' },
  usecases: { note: 'Start with client calls and weekly planning', q: 'Which conversations would you want to start with?', status: 'Open' },
  faq: { note: 'Finance reviews in March', q: 'What would need to be true for you to move forward?', status: 'Open' },
  cta: { note: 'Action item: send summary of agreed next steps', q: 'Can I send you a summary with the agreed next steps?', status: 'Open' },
}
const STATUS_STYLE = { Open: 'bg-amber-soft text-amber', Resolved: 'bg-green-soft text-green', Unanswered: 'bg-record-soft text-record' }

function Tile({ name, speaking, muted, tone, children }: { name: string; speaking: boolean; muted?: boolean; tone: string; children: React.ReactNode }) {
  return (
    <div className={`relative grid aspect-[4/3] place-items-center rounded-xl bg-gradient-to-br ${tone} transition ${speaking ? 'ring-2 ring-green' : 'ring-1 ring-line'}`}>
      {children}
      <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-medium text-white">
        {muted
          ? <svg viewBox="0 0 24 24" className="size-3 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 12 5M19 11a7 7 0 0 1-.6 2.8M12 18v3M3 3l18 18" /></svg>
          : speaking
          ? <span className="flex h-2.5 items-end gap-px">{[0, 1, 2].map(n => <i key={n} className="bar w-0.5 rounded-full bg-green" style={{ animationDelay: `${n * 0.15}s` }} />)}</span>
          : <i className="size-1.5 rounded-full bg-white/40" />}
        {name}
      </span>
    </div>
  )
}

// Private side panel of the hero meeting window: what Roofle has noticed so far.
function Panel({ k, seen }: { k: string; seen: number }) {
  const speaker = CAPTIONS[k][0] // 'Roofle' lights no tile: it is not on the call
  const avatar = 'grid size-11 place-items-center rounded-full text-base font-bold text-slate-950'
  const reached = ORDER.slice(0, seen + 1)
  return (
    <aside aria-hidden="true" className="h-full space-y-5 overflow-y-auto border-t border-line bg-surface p-4 lg:border-l lg:border-t-0">
      <div>
        <p className="mb-2 text-xs font-medium text-faint">On the call · 2</p>
        <div className="grid grid-cols-2 gap-2">
          <Tile name="You" muted tone="from-indigo-900 to-slate-800" speaking={false}><span className={`${avatar} bg-brand`}>Y</span></Tile>
          <Tile name="Maya" tone="from-cyan-900 to-slate-800" speaking={speaker === 'Maya'}><span className={`${avatar} bg-insight`}>M</span></Tile>
        </div>
      </div>
      <div className="rounded-xl border border-dashed border-insight/70 p-3">
        <p className="flex items-center justify-between text-xs font-medium text-insight">
          <span>🔒 Roofle · only you see this</span><span className="pulse-rec size-1.5 rounded-full bg-insight" />
        </p>
        <p className="mb-2 mt-4 text-xs font-medium text-faint">Suggested question</p>
        <div key={k} className="fade-up rounded-lg border border-insight bg-insight-soft/60 p-3">
          <p className="text-[15px] font-medium text-ink">{INTEL[k].q}</p>
          <p className="mt-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-insight">Source ›</span>
            <span className={`rounded-full px-2 py-0.5 font-semibold ${STATUS_STYLE[INTEL[k].status]}`}>{INTEL[k].status}</span>
          </p>
        </div>
        <p className="mb-2 mt-4 text-xs font-medium text-faint">Live notes</p>
        <ul className="space-y-2 text-sm">
          {reached.map((r, n) => (
            <li key={r} className={`fade-up flex gap-2 ${n === seen ? 'text-ink' : 'text-muted'}`}>
              <span className={n === seen ? 'text-brand' : 'text-faint'}>•</span>{INTEL[r].note}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function Toolbar() {
  const btn = 'flex h-11 min-w-16 flex-col items-center justify-center gap-0.5 rounded-md px-3 text-[11px] text-zinc-300'
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-center gap-1 bg-zinc-900 px-2 text-white">
      <span aria-hidden="true" className={`${btn} hidden sm:flex`}><span className="text-base leading-none">◉</span>Mute</span>
      <span aria-hidden="true" className={`${btn} hidden sm:flex`}><span className="text-base leading-none">▣</span>Video</span>
      <a href={WAITLIST_HREF} target="_blank" rel="noopener noreferrer" className="ml-3 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">Join waitlist</a>
    </div>
  )
}

function Nav() {
  const links = [['Features', '/#features'], ['Review', '/#review'], ['Privacy', '/#privacy'], ['FAQ', '/#faq']]
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2 text-lg font-bold"><Logo /><span className="font-serif text-xl font-semibold">Roofle</span></a>
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
  // Loops through the meeting so the panel shows Roofle working live; rests on the last beat when motion is reduced.
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setI(ORDER.length - 1); return }
    if (paused) return
    const id = setInterval(() => setI(x => (x + 1) % ORDER.length), 3500)
    return () => clearInterval(id)
  }, [paused])
  const key = ORDER[i]
  const [who, text] = CAPTIONS[key]
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p style={{ animationDelay: "0s" }} className="fade-up mb-6 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-brand-strong dark:text-brand">
            <span className="pulse-rec size-1.5 rounded-full bg-record" />00:00 · LISTEN · NOTE · COACH
          </p>
          <h1 style={{ animationDelay: ".15s" }} className="fade-up text-balance text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">
            Tired or out of ideas?{' '}
            <em className="text-brand-strong dark:text-brand">Roofle tells you what to ask, live.</em>
          </h1>
          <p style={{ animationDelay: ".3s" }} className="fade-up mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
            A meeting copilot. It <b className="hl font-semibold text-ink" style={{ '--d': '.6s' } as React.CSSProperties}>listens</b> on your device, <b className="hl font-semibold text-ink" style={{ '--d': '1.1s' } as React.CSSProperties}>writes your notes</b>, and <b className="hl font-semibold text-ink" style={{ '--d': '1.6s' } as React.CSSProperties}>reviews how you did</b>.
          </p>
          <div style={{ animationDelay: ".5s" }} className="fade-up mt-8 flex flex-wrap justify-center gap-3">
            <Button href={WAITLIST_HREF}>Join the waitlist</Button>
            <Button href="#features" variant="ghost">See it in action</Button>
          </div>
          <p style={{ animationDelay: ".7s" }} className="fade-up mt-4 text-sm text-faint">No bots. Private. Runs on your device. Works with any meeting app.</p>
        </div>
        {/* Animated product mock, kept for reference:
            <div className="mx-auto mt-14 max-w-4xl"><AppMock /></div> */}
        <div className="mx-auto mt-14 max-w-5xl">
          <div className="meeting overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl shadow-indigo-950/20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 font-mono text-xs text-muted">
              <span className="flex items-center gap-3"><span aria-hidden="true" className="hidden gap-1.5 sm:flex"><i className="size-2.5 rounded-full bg-red-400" /><i className="size-2.5 rounded-full bg-amber-400" /><i className="size-2.5 rounded-full bg-green-400" /></span>Maya is sharing their screen</span>
              <a href={`https://youtu.be/${DEMO_VIDEO_ID}`} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Shared link: Roofle demo ↗</a>
            </div>
            <div className="grid lg:grid-cols-[1fr_20rem]">
              <div>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}`}
                  title="Roofle demo video"
                  className="aspect-video w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div aria-hidden="true" className="flex min-h-14 items-center justify-between gap-4 border-t border-line px-4 py-2.5 text-sm">
                <p>
                  <b key={who} className={`fade-up mr-2 font-mono text-xs uppercase tracking-wider ${who === 'You' ? 'text-brand-strong dark:text-brand' : who === 'Roofle' ? 'text-insight' : 'text-muted'}`}>{who === 'Roofle' ? 'Roofle · only you see this' : who}</b>
                  <span className="text-ink">{text}</span>
                </p>
                <span className="flex shrink-0 gap-1.5">
                  {ORDER.map((o, n) => (
                    <button key={o} type="button" tabIndex={-1} onClick={() => setI(n)} className={`size-2 rounded-full transition ${n === i ? 'bg-brand' : 'bg-line hover:bg-faint'}`} />
                  ))}
                </span>
                </div>
              </div>
              <div className="relative min-h-80">
                <div className="absolute inset-0"><Panel k={key} seen={i} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Usps() {
  const rest = [
    ['One-click action items', 'Finish the call, click once, and your follow-up actions are ready. No retyping, no chasing.'],
    ['Notes that write themselves', 'One short document, rewritten as the conversation moves: summary, key points, decisions and action items.'],
  ]
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">What makes Roofle different</p>
        <div className="rounded-2xl bg-brand-tint p-6 sm:p-10">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">01 · The main thing</span>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl font-medium sm:text-5xl">Roofle tells you what to ask next.</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">It spots gaps and vague points while people are still talking, then suggests the follow-up question worth asking. When it gets answered, Roofle marks it resolved and shows you the line it came from.</p>
        </div>
        <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {rest.map(([t, d], n) => (
            <div key={t} className="reveal border-t border-ink pt-4">
              <span className="font-mono text-xs text-faint">{String(n + 2).padStart(2, '0')}</span>
              <h3 className="mt-2 font-serif text-2xl">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Section({ id, title, eyebrow, children, tint }: { id?: string; title: string; eyebrow?: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={tint ? 'bg-surface' : ''}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">{eyebrow}</p>}
        <h2 className="max-w-3xl text-3xl font-medium tracking-tight sm:text-5xl">{title}</h2>
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
  'Live transcription': () => (
    <img
      src="/live-transcription.gif"
      alt="Live transcription of a meeting"
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      draggable={false}
    />
  ),
  'Live notes': t => (
    <img
      src="/live-notes.gif"
      alt="Live transcription of a meeting"
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      draggable={false}
    />
  ),
  'Suggested questions': () => (
    <img
      src="/notification.gif"
      alt="Suggested question: who signs off on budget?"
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      draggable={false}
    />
  ),
  'Recap on demand': t => (
    <img
      src="/live-recap.gif"
      alt="Suggested question: who signs off on budget?"
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      draggable={false}
    />
  ),
  'Key figures and dates': t => (
    <img
      src="/key-dates.gif"
      alt="Suggested question: who signs off on budget?"
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      draggable={false}
    />
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
  'Quick follow-up actions': t => (
    <img
      src="/one-click-follow-up.gif"
      alt="One click follow actions"
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      draggable={false}
    />
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
        <li key={x} className="fade-up flex justify-between"><span>{x}</span><span className="font-semibold text-green">On your device ✓</span></li>
      ))}
    </ul>
  ),
}
const features: [string, string][] = [
  ['Suggested questions', 'Spots gaps and vague points worth asking about. A notification suggests the question and jumps to the exact line it came from.'],
  ['Live transcription', 'Listens to your mic and the system audio at once. Every line is tagged by source, so you know who said what.'],
  ['Recap on demand', 'Zoned out for a moment? Get a recap of the last 30 seconds in one click.'],
  ['Key figures and dates', 'Pulls out the numbers, dates and names that matter, so nothing important is buried in the transcript.'],
  ['Live notes', 'One short notes document, rewritten as the conversation moves: summary, key points, decisions and action items.'],
  ['Quick follow-up actions', 'One click turns every finished session into follow-up action items.'],
  ['Conversation review', 'An offline self-assessment once the session ends: a focus area and plain-language explanations. It says so when the transcript is too thin to judge.'],
  ['Menu bar and shortcuts', 'Lives in the menu bar with no Dock icon. Start and stop with a shortcut; nothing records until you do.'],
  ['On-device', 'Speech recognition and storage run locally. You bring your own LLM key for notes, questions and reviews.'],
]

const groups: [string, number][] = [['During the call', 0], ['After the call', 5], ['Always', 7]]

// Agenda list on the left; the selected item is "shared" on the stage (inline on small screens). Click works on touch.
function Features() {
  const [sel, setSel] = useState(0)
  const t = useTick(true)
  const title = features[sel][0]
  return (
    <Section id="features" eyebrow="00:12 · Features" title="Everything you need, nothing you have to type." tint>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-8">
          {groups.map(([g, from], gi) => (
            <div key={g}>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">{g}</p>
              <ul className="divide-y divide-line border-y border-line">
                {features.slice(from, groups[gi + 1]?.[1]).map(([name, desc], j) => {
                  const n = from + j
                  const on = n === sel
                  return (
                    <li key={name}>
                      <button onClick={() => setSel(n)} onMouseEnter={() => setSel(n)} aria-expanded={on} className="block w-full py-3 text-left">
                        <span className="flex items-baseline gap-4">
                          <span className={`font-mono text-xs ${on ? 'text-brand-strong dark:text-brand' : 'text-faint'}`}>{String(n + 1).padStart(2, '0')}</span>
                          <span className={`font-serif text-xl ${on ? 'text-ink' : 'text-muted'}`}>{name}</span>
                        </span>
                        {on && <span className="fade-up mt-2 block pl-9 text-sm text-muted">{desc}</span>}
                      </button>
                      {on && <div aria-hidden="true" className="meeting relative mb-4 aspect-[8/5] overflow-hidden rounded-xl border border-line bg-brand-tint p-3 text-xs text-muted lg:hidden">{demos[name](t)}</div>}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="meeting hidden overflow-hidden rounded-2xl border border-line bg-bg lg:sticky lg:top-24 lg:block">
          <p className="border-b border-line px-4 py-2.5 font-mono text-xs text-muted">Now showing · {title}</p>
          <div className="relative aspect-[8/5] bg-brand-tint p-3 text-xs text-muted">{demos[title](t)}</div>
        </div>
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
    <Section id="review" eyebrow="00:34 · Review" title="See how the call really went.">
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
    <Section id="privacy" eyebrow="00:41 · Privacy (off the record)" title="Built to run locally." tint>
      <div className="max-w-2xl space-y-4 text-lg text-muted">
        <p>Speech recognition and storage run on your device. Notes, suggested questions, and reviews use an LLM through an API key you provide in Settings.</p>
        <p className="font-semibold text-ink">Your audio and transcripts stay on your machine.</p>
      </div>
    </Section>
  )
}

function UseCases() {
  const items = [
    ['09:00', 'Client and partner conversations', 'Keep every conversation organised without a note-taker joining the call.'],
    ['11:30', 'Requirements and planning sessions', 'Capture decisions, open questions, and action items while the discussion is live.'],
    ['14:00', '1:1s and team meetings', 'Track follow-ups across standups, reviews, and check-ins, so nothing slips.'],
    ['16:30', 'Calls and interviews', 'Review talk–listen balance and question depth after every conversation.'],
  ]
  return (
    <Section eyebrow="00:48 · Today’s calendar" title="Made for people who live in conversations.">
      <ul className="max-w-3xl space-y-3">
        {items.map(([time, t, d]) => (
          <li key={t} className="flex gap-4">
            <span className="w-12 shrink-0 pt-4 font-mono text-xs text-faint">{time}</span>
            <div className="flex-1 rounded-r-xl border-l-4 border-brand bg-brand-tint px-4 py-3">
              <h3 className="font-semibold text-brand-strong dark:text-brand">{t}</h3>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function FAQ() {
  const items = [
    ['What is Roofle?', 'A macOS menu-bar app that listens to your meetings on your device — transcribing them live, writing notes, suggesting questions worth asking, and reviewing the session when it ends.'],
    ['Does Roofle join my calls as a bot?', 'No. It runs as a menu-bar app on your Mac, so there is no bot to explain to attendees.'],
    ['Does my audio leave my computer?', 'No. Speech recognition and storage run locally on your Mac. Notes, questions, and reviews use an LLM through an API key you provide in Settings.'],
    ['How much will it cost?', 'We will share pricing before launch, and people on the waitlist get early access and founding pricing. Notes, questions, and reviews use your own LLM API key, so that usage is billed by your provider, not by Roofle.'],
    ['What do I need to run it?', 'An Apple Silicon Mac on macOS 13 or newer.'],
    ['When does it record?', 'Nothing is recorded until you start it. Roofle runs from the menu bar and stays out of the way until you quit.'],
    ['What if the recording is short or one-sided?', 'Roofle tells you when it is not sure instead of faking confidence.'],
  ]
  return (
    <Section id="faq" eyebrow="00:55 · Q&A" title="Questions, answered." tint>
      <div className="max-w-2xl space-y-3">
        {items.map(([q, a]) => (
          <details key={q} className="group">
            <summary className="flex cursor-pointer list-none items-center gap-3">
              <span className="rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-2.5 font-medium">
                <span className="mr-2 font-mono text-xs uppercase tracking-wider text-muted">Maya</span>{q}
              </span>
              <span className="text-brand transition group-open:rotate-45">+</span>
            </summary>
            <p className="fade-up ml-auto mt-2 max-w-[85%] rounded-2xl rounded-br-sm bg-brand-tint px-4 py-2.5 text-muted">
              <span className="mr-2 font-mono text-xs uppercase tracking-wider text-brand-strong dark:text-brand">You</span>{a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  )
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl bg-ink px-6 py-16 text-center text-bg">
        <p className="mb-4 font-mono text-xs tracking-widest text-brand-soft">01:00 · ADJOURNED</p>
        <h2 className="font-serif text-3xl font-medium sm:text-5xl">Spend your meetings talking, not typing.</h2>
        <a href={WAITLIST_HREF} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 transition hover:opacity-90">Join the waitlist</a>
      </div>
    </section>
  )
}

const PRIVACY_QA = [
  ['Is Roofle GDPR compliant?', 'Roofle is designed to be GDPR compliant. Processing happens on your Mac, and you decide what, if anything, is sent to an LLM provider.'],
  ['Where is my audio stored?', 'Only on your device. Speech recognition and storage run locally, and we never receive your recordings or transcripts.'],
  ['What leaves my computer?', 'Only text you choose to send to the LLM provider behind the API key you add in Settings, to generate notes, questions, and reviews. That provider’s privacy terms apply.'],
  ['Do you collect personal data?', 'No recordings, transcripts, or meeting content. Joining the waitlist shares only the details you submit there.'],
  ['Can I delete my data?', 'Yes, at any time. It lives on your Mac, so deleting it there removes it.'],
  ['Should I tell meeting attendees?', 'Yes. Consent rules vary by country and company, so let participants know you are transcribing.'],
]

function Footer() {
  const ref = useRef<HTMLDialogElement>(null)
  return (
    <footer className="border-t border-line pb-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2"><Logo size={20} /><b className="font-serif text-base text-ink">Roofle</b></p>
        <p className="flex gap-5"><a href="/about" className="hover:text-ink">About</a><a href="/status" className="hover:text-ink">Status</a><button type="button" onClick={() => ref.current?.showModal()} className="hover:text-ink">Privacy</button><a href={WAITLIST_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Join waitlist</a><span>© 2026</span></p>
      </div>
      <dialog ref={ref} onClick={e => e.target === ref.current && ref.current.close()} className="m-auto w-[min(92vw,40rem)] rounded-2xl border border-line bg-bg p-0 text-ink backdrop:bg-black/50">
        <div className="max-h-[80vh] overflow-y-auto p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold">Privacy &amp; GDPR</h2>
            <button type="button" aria-label="Close" onClick={() => ref.current?.close()} className="text-2xl leading-none text-muted hover:text-ink">×</button>
          </div>
          <div className="mt-4 divide-y divide-line">
            {PRIVACY_QA.map(([q, a]) => (
              <details key={q} className="group py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{q}<span className="text-brand transition group-open:rotate-45">+</span></summary>
                <p className="mt-2 text-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </dialog>
    </footer>
  )
}

function About() {
  const points = [
    ['Questions', 'Suggests the follow-up question worth asking, while the conversation is still live.'],
    ['Action items', 'One click after the call turns it into follow-up action items.'],
    ['Notes', 'Keeps one short set of notes up to date: key points, decisions, action items.'],
  ]
  const promises = [
    ['No bot', 'Nobody extra joins your meeting.'],
    ['On your device', 'Audio and transcripts stay on your Mac.'],
    ['Honest', 'When it is unsure, it says so instead of faking confidence.'],
  ]
  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">About Roofle</p>
          <h1 className="max-w-3xl text-balance font-serif text-4xl font-medium leading-tight sm:text-6xl">
            Be in the conversation. <em className="text-brand-strong dark:text-brand">Roofle handles the rest.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted">
            Most people in a meeting are either listening or typing. Roofle lets you listen. It suggests the next question, turns the call into action items in one click, and keeps your notes.
          </p>
        </div>
      </section>
      <Section eyebrow="What it does" title="What Roofle is good at." tint>
        <ul className="grid gap-8 sm:grid-cols-3">
          {points.map(([t, d], n) => (
            <li key={t} className="border-t border-ink pt-4">
              <span className="font-mono text-xs text-faint">{String(n + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-serif text-2xl">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="Our promise" title="Built to stay out of your way.">
        <ul className="grid gap-8 sm:grid-cols-3">
          {promises.map(([t, d]) => (
            <li key={t}>
              <h3 className="font-semibold text-brand-strong dark:text-brand">{t}</h3>
              <p className="mt-1 text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="Say hello" title="Questions, ideas, or feedback?" tint>
        <div className="max-w-2xl space-y-4 text-lg text-muted">
          {BUILDER && <p><b className="text-ink">{BUILDER.name}.</b> {BUILDER.note}</p>}
          <p>Roofle is pre-launch, and early feedback shapes what we build. We read every message.</p>
          <p><a href={`mailto:${CONTACT_EMAIL}`} className="font-serif text-2xl font-medium text-brand-strong underline decoration-2 underline-offset-4 dark:text-brand">{CONTACT_EMAIL}</a></p>
        </div>
      </Section>
    </>
  )
}

function Status() {
  const stages = [
    ['Now', 'Working prototype', 'Everything on the features list runs today in our own testing.'],
    ['Next', 'Invite-only beta', 'Waitlist members get invited first, in small batches.'],
    ['Later', 'Public launch', 'Pricing is shared before launch. Waitlist members get early access and founding pricing.'],
  ]
  return (
    <>
      <Section eyebrow="Status" title="Where we are.">
        <ul className="max-w-3xl divide-y divide-line border-y border-line">
          {stages.map(([when, what, detail]) => (
            <li key={when} className="flex gap-6 py-5">
              <span className={`w-14 shrink-0 font-mono text-xs uppercase tracking-widest ${when === 'Now' ? 'text-brand-strong dark:text-brand' : 'text-faint'}`}>{when}</span>
              <div><h3 className="font-serif text-xl">{what}</h3><p className="mt-1 text-muted">{detail}</p></div>
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="Works today" title="What the prototype does." tint>
        <ul className="grid max-w-3xl gap-x-8 gap-y-2 text-muted sm:grid-cols-2">
          {features.map(([name]) => <li key={name} className="flex gap-2"><span className="text-green">✓</span>{name}</li>)}
        </ul>
        <p className="mt-6 text-sm text-faint">Requires an Apple Silicon Mac on macOS 13 or newer.</p>
      </Section>
    </>
  )
}

const PAGES: Record<string, [string, () => React.JSX.Element]> = {
  '/about': ['About · Roofle', About],
  '/status': ['Status · Roofle', Status],
}

export default function App() {
  const page = PAGES[location.pathname.replace(/\/$/, '')]
  useEffect(() => { if (page) document.title = page[0] }, [page])
  const Page = page?.[1]
  return (
    <>
      <Nav />
      <Toolbar />
      <main>
        {Page ? <Page /> : <>
        <Hero />
        <Usps />
        <Features />
        <Review />
        <Privacy />
        <UseCases />
        <FAQ />
        <FinalCTA />
        </>}
      </main>
      <Footer />
    </>
  )
}
