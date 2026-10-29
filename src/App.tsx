import { useEffect, useRef, useState } from 'react';
import Docs from './Docs';
import { USE_CASES, bySlug } from './use-cases';

const DMG_HREF = 'https://github.com/roofle-ai/roofle/releases/download/v1.0.0-beta/Roofle_1.0.0-beta_aarch64.dmg'

// TODO: fill these in before sharing the About page widely; they render only when set.
const BUILDER: { name: string; note: string } | null = null
const CONTACT_EMAIL = 'support@roofle.app'

function Logo({ size = 28 }: { size?: number }) {
  return <img src="/favicon.svg" width={size} height={size} alt="" className="rounded-lg" />
}

function Apple() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="mr-2 size-4 fill-current"><path d="M16.37 1.43c0 1.14-.42 2.2-1.25 3.06-.9.94-1.99 1.48-3.17 1.39a3.2 3.2 0 0 1 1.3-2.9c.75-.6 1.8-1.02 3.12-1.55zM20.5 17.3c-.55 1.27-.82 1.84-1.53 2.96-1 1.56-2.4 3.5-4.14 3.51-1.55.02-1.95-1.01-4.05-1-2.1.01-2.54 1.02-4.09 1-1.74-.02-3.07-1.77-4.07-3.33C-.18 16.1-.47 10.99 1.25 8.35c1.22-1.88 3.15-2.98 4.97-2.98 1.85 0 3.01 1.02 4.54 1.02 1.48 0 2.38-1.02 4.52-1.02 1.62 0 3.34.88 4.56 2.4-4 2.19-3.35 7.9.66 9.53z"/></svg>
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

// The phrase Roofle picks out of each line; it becomes the live note in the side panel.
const KEY: Record<string, string> = {
  hero: 'spreadsheets, and it breaks every quarter', highlights: 'Zoom and Teams', features: 'an hour after every call',
  review: 'budget is still a question mark', privacy: 'where recordings end up', usecases: 'client calls and our weekly planning',
  faq: 'Finance reviews in March', cta: 'Send me what we agreed on',
}
const LAG = 1.4 // seconds: the phrase is picked out before Roofle reacts

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

// Hero call window: two people talking, Roofle's live notes, then a notification with the question to ask.
// Illustrated avatar: no photos to license or host. The mouth moves while speaking.
function Face({ skin, hair, long, speaking }: { skin: string; hair: string; long?: boolean; speaking: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full" aria-hidden="true">
      {long && <rect x="22" y="30" width="56" height="62" rx="26" fill={hair} />}
      <path d="M20 100c0-22 14-30 30-30s30 8 30 30z" fill={long ? '#6366f1' : '#334155'} />
      <rect x="43" y="58" width="14" height="16" fill={skin} />
      <ellipse cx="50" cy="42" rx="20" ry="23" fill={skin} />
      <path d={long ? 'M29 40c0-18 10-24 22-24s20 8 20 24c-8-4-14-12-16-16-4 8-14 14-26 16z' : 'M30 38c-2-18 10-24 21-24s20 6 19 24c-4-6-8-9-12-10-8 4-20 4-28 10z'} fill={hair} />
      <circle cx="42" cy="44" r="2.2" fill="#1e293b" /><circle cx="58" cy="44" r="2.2" fill="#1e293b" />
      <ellipse cx="50" cy="55" rx="5" ry="2.5" fill="#9f1239" className={speaking ? 'talk' : ''} style={{ transformOrigin: '50px 55px' }} />
    </svg>
  )
}

function Tile({ name, speaking, muted, tone, face }: { name: string; speaking: boolean; muted?: boolean; tone: string; face: React.ReactNode }) {
  return (
    <div className={`relative flex h-32 items-end justify-center overflow-hidden rounded-lg bg-gradient-to-br ${tone} transition ${speaking ? 'ring-2 ring-green-400' : 'ring-1 ring-white/10'}`}>
      <span className="h-[92%]">{face}</span>
      <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-medium text-white">
        {muted
          ? <svg viewBox="0 0 24 24" className="size-3 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 12 5M19 11a7 7 0 0 1-.6 2.8M12 18v3M3 3l18 18" /></svg>
          : speaking
          ? <span className="flex h-2.5 items-end gap-px">{[0, 1, 2].map(n => <i key={n} className="bar w-0.5 rounded-full bg-green-400" style={{ animationDelay: `${n * 0.15}s` }} />)}</span>
          : <i className="size-1.5 rounded-full bg-white/40" />}
        {name}
      </span>
    </div>
  )
}

function Call({ i }: { i: number }) {
  const k = ORDER[i], text = CAPTIONS[k][1], at = text.indexOf(KEY[k])
  const notes = ORDER.slice(Math.max(0, i - 2), i + 1)
  const delay = { animationDelay: `${LAG}s` }
  return (
    <div aria-hidden="true">
      <div className="bg-zinc-900 p-3">
        <div className="grid grid-cols-2 gap-2">
          <Tile name="You" muted tone="from-indigo-900 to-slate-800" speaking={false} face={<Face skin="#e8b98f" hair="#1f2937" speaking={false} />} />
          <Tile name="Maya" tone="from-cyan-900 to-slate-800" speaking face={<Face skin="#f1c9a5" hair="#7c2d12" long speaking />} />
        </div>
        <p key={k} className="fade-up mt-3 min-h-14 text-center text-sm leading-relaxed text-white/90">
          {text.slice(0, at)}
          <span className="hl cap font-semibold text-slate-900" style={{ '--d': '.9s' } as React.CSSProperties}>{KEY[k]}</span>
          {text.slice(at + KEY[k].length)}
        </p>
      </div>
      <div className="space-y-3 bg-surface p-4 md:p-5">
        <p className="flex items-center justify-between text-xs font-medium text-insight">
          <span>🔒 Live notes · only you see this</span><span className="pulse-rec size-1.5 rounded-full bg-insight" />
        </p>
        <ul className="min-h-[4.5rem] space-y-1.5 text-sm">
          {notes.map(r => (
            <li key={r} style={r === k ? delay : undefined} className={`fade-up flex gap-2 ${r === k ? 'text-ink' : 'text-muted'}`}>
              <span className={r === k ? 'text-brand' : 'text-faint'}>•</span>{INTEL[r].note}
            </li>
          ))}
        </ul>
        <div className="min-h-24">
          <div key={k} style={delay} className="fade-up rounded-xl bg-zinc-900 p-3 text-white shadow-lg">
            <p className="flex items-center justify-between text-[11px] font-medium text-white/60">
              <span className="flex items-center gap-1.5"><Logo size={14} />Roofle · Suggested question</span><span>now</span>
            </p>
            <p className="mt-1.5 text-[15px] font-medium">{INTEL[k].q}</p>
            <p className="mt-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-cyan-300">Source ›</span>
              <span className={`rounded-full px-2 py-0.5 font-semibold ${STATUS_STYLE[INTEL[k].status]}`}>{INTEL[k].status}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function UseCasesMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-bold text-ink/80 transition hover:text-ink"
      >
        Use cases
        <svg viewBox="0 0 24 24" className={`size-4 transition ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-3 w-[22rem] rounded-2xl border border-line bg-bg p-2 shadow-2xl shadow-black/10">
          <p className="px-3 pb-1 pt-2 font-mono text-[11px] uppercase tracking-widest text-faint">Built for your role</p>
          {USE_CASES.map(u => (
            <a key={u.slug} href={`/use-cases/${u.slug}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-surface-2">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-tint text-sm font-bold text-brand-strong dark:text-brand">{u.role[0]}</span>
              <span>
                <span className="block text-sm font-semibold text-ink">{u.role}</span>
                <span className="block text-xs text-muted">{u.short}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-bg/80 backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-8 lg:px-16">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2 text-lg font-bold"><Logo /><span className="font-serif text-xl font-semibold">Roofle</span></a>
          <nav className="flex items-center gap-6">
            <UseCasesMenu />
            <a href="/features" className="text-sm font-bold text-ink/80 transition hover:text-ink">Features</a>
            <a href="/docs" className="text-sm font-bold text-ink/80 transition hover:text-ink">Docs</a>
            <a href="/privacy" className="text-sm font-bold text-ink/80 transition hover:text-ink">Privacy</a>
          </nav>
        </div>
        <Button href={DMG_HREF}><Apple />Download</Button>
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
    </div>
  )
}

// Hero backdrop: a soft glow and a field of shaded dots laid on a tilted floor, receding to the horizon.
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(55% 60% at 88% 8%, var(--brand-tint), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-[55%] [perspective:640px]">
        <div
          className="absolute -left-1/2 bottom-0 h-[170%] w-[200%] opacity-[0.18] [mask-image:linear-gradient(to_top,black_10%,transparent_80%)]"
          style={{
            transform: 'rotateX(58deg)',
            transformOrigin: '50% 100%',
            backgroundImage: 'radial-gradient(circle at 35% 35%, var(--faint), var(--muted) 1.6px, transparent 2.3px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
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
    const id = setInterval(() => setI(x => (x + 1) % ORDER.length), 5000)
    return () => clearInterval(id)
  }, [paused])
  return (
    <section id="top" className="relative flex min-h-[85vh] items-center overflow-hidden">
      <HeroBackdrop />
      <div className="relative w-full px-4 py-12 sm:px-8 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 style={{ animationDelay: ".15s", fontFamily: "var(--font-display)" }} className="fade-up text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl xl:text-7xl">
            The meeting copilot <em className="not-italic text-brand-strong dark:text-brand">built for your role</em>
          </h1>
          <p style={{ animationDelay: ".3s" }} className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl sm:leading-relaxed">
            Pick who you are in the room. Roofle works quietly in the background while you stay in the conversation.
          </p>
          <div style={{ animationDelay: ".5s" }} className="fade-up mt-10 flex flex-wrap gap-3">
            <Button href={DMG_HREF}><Apple />Download</Button>
            <Button href="/features" variant="ghost">Explore features →</Button>
          </div>
          <p style={{ animationDelay: ".6s" }} className="fade-up mt-4 text-sm text-muted">Free forever.</p>
        </div>
        <div>
          <div className="meeting overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl shadow-indigo-950/20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 font-mono text-xs text-muted">
              <span className="flex items-center gap-3"><span aria-hidden="true" className="hidden gap-1.5 sm:flex"><i className="size-2.5 rounded-full bg-red-400" /><i className="size-2.5 rounded-full bg-amber-400" /><i className="size-2.5 rounded-full bg-green-400" /></span>Call with Maya · Roofle is listening</span>
              <span>00:{String(12 + i * 5).padStart(2, '0')}</span>
            </div>
            <Call i={i} />
          </div>
        </div>
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

const features: [string, string][] = [
  ['Suggested questions', 'Spots gaps and vague points worth asking about. A notification suggests the question and jumps to the exact line it came from.'],
  ['Live transcription', 'Listens to your mic and the system audio at once. Every line is tagged by source, so you know who said what.'],
  ['Live notes', 'One short notes document, rewritten as the conversation moves: summary, key points, decisions and action items.'],
  ['Recap on demand', 'Zoned out for a moment? Get a recap of the last 30 seconds in one click.'],
  ['Key figures and dates', 'Pulls out the numbers, dates and names that matter, so nothing important is buried in the transcript.'],
  ['Quick follow-up actions', 'One click turns every finished session into follow-up action items.'],
  ['Menu bar and shortcuts', 'Lives in the menu bar with no Dock icon. Start and stop with a shortcut; nothing records until you do.'],
  ['On-device', 'Speech recognition and storage run locally. You bring your own LLM key for notes and questions.'],
]

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
    ['Now', 'Open source', 'Everything on the features list works today.'],
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
      <Section eyebrow="Works today" title="What Roofle does." tint>
        <ul className="grid max-w-3xl gap-x-8 gap-y-2 text-muted sm:grid-cols-2">
          {features.map(([name]) => <li key={name} className="flex gap-2"><span className="text-green">✓</span>{name}</li>)}
        </ul>
        <p className="mt-6 text-sm text-faint">Requires an Apple Silicon Mac on macOS 13 or newer.</p>
      </Section>
    </>
  )
}

function UseCasePage({ slug }: { slug: string }) {
  const u = bySlug(slug)
  useEffect(() => { document.title = `${u?.role ?? 'Use case'} · Roofle` }, [u])
  if (!u) return <Section title="Use case not found."><a href="/" className="text-brand-strong underline dark:text-brand">Back home</a></Section>
  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">Roofle for {u.role}</p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">{u.headline}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/80">{u.intro}</p>
        </div>
      </section>
      <Section eyebrow="Where it helps" title="Moments that matter." tint>
        <ul className="grid gap-8 sm:grid-cols-3">
          {u.moments.map(([t, d], n) => (
            <li key={t} className="border-t border-ink pt-4">
              <span className="font-mono text-xs text-faint">{String(n + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="Suggested questions" title="What Roofle might suggest.">
        <ul className="max-w-2xl space-y-3">
          {u.questions.map(q => <li key={q} className="rounded-xl border border-line bg-surface px-4 py-3 text-lg">“{q}”</li>)}
        </ul>
        <p className="mt-4 text-sm text-faint">Examples for illustration. Real suggestions come from your conversation.</p>
      </Section>
      <Section eyebrow="What you get" title="Less typing, more listening." tint>
        <ul className="grid gap-8 sm:grid-cols-3">
          {u.outcomes.map(([t, d]) => (
            <li key={t}>
              <h3 className="font-semibold text-brand-strong dark:text-brand">{t}</h3>
              <p className="mt-1 text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

const FEATURE_GIF: Record<string, string> = {
  'Suggested questions': '/notification.gif',
  'Live transcription': '/live-transcription.gif',
  'Recap on demand': '/live-recap.gif',
  'Key figures and dates': '/key-dates.gif',
  'Live notes': '/live-notes.gif',
  'Quick follow-up actions': '/one-click-follow-up.gif',
}

function Features() {
  const shown = features.filter(([n]) => FEATURE_GIF[n])
  const rest = features.filter(([n]) => !FEATURE_GIF[n])
  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">Features</p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">Everything you need, nothing you have to type.</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/80">Roofle works quietly in the background, so you can stay in the conversation.</p>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-6xl space-y-20 px-4 py-12 sm:px-6">
          {shown.map(([name, desc], n) => (
            <div key={name} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={n % 2 ? 'lg:order-2' : ''}>
                <span className="font-mono text-xs text-faint">{String(n + 1).padStart(2, '0')}</span>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>{name}</h2>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">{desc}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-black/10">
                <img src={FEATURE_GIF[name]} alt={name} loading="lazy" draggable={false} className="aspect-[8/5] w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <Section eyebrow="And more" title="Built to stay out of your way." tint>
        <ul className="grid gap-8 sm:grid-cols-3">
          {rest.map(([name, desc]) => (
            <li key={name} className="rounded-2xl border border-line bg-bg p-6">
              <h3 className="flex flex-wrap items-center gap-2 text-xl font-semibold">
                {name}
              </h3>
              <p className="mt-2 text-muted">{desc}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

function HowItWorks() {
  const steps = [
    ['Pick your role', 'Tell Roofle who you are in the room, so its questions fit the conversation.'],
    ['Start your call', 'Start with a shortcut from the menu bar. Roofle listens to your mic and the call audio, on your Mac.'],
    ['Stay in the conversation', 'Live notes and suggested questions appear as you talk. No bot joins the call.'],
    ['Finish with action items', 'One click after the call and your follow-ups are ready.'],
  ]
  return (
    <Section eyebrow="How it works" title="Four steps, one conversation.">
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([t, d], n) => (
          <li key={t} className="border-t border-ink pt-4">
            <span className="font-mono text-xs text-faint">{String(n + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-muted">{d}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function PersonaShowcase() {
  const [sel, setSel] = useState(0)
  const u = USE_CASES[sel]
  return (
    <Section eyebrow="Personalised to you" title="One copilot. Shaped by your role." tint>
      <p className="-mt-2 max-w-2xl text-lg text-muted">Roofle does not ask the same questions in every call. Pick your role and it changes what it listens for, and what it suggests.</p>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose a role">
        {USE_CASES.map((c, n) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setSel(n)}
            aria-pressed={n === sel}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${n === sel ? 'border-transparent bg-brand-strong text-white dark:bg-brand dark:text-slate-950' : 'border-line bg-bg text-ink hover:bg-surface-2'}`}
          >
            {c.role}
          </button>
        ))}
      </div>
      <div key={u.slug} className="fade-up mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-bg p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-faint">Roofle listens for</p>
          <ul className="mt-4 space-y-4">
            {u.moments.map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-0.5 font-bold text-brand-strong dark:text-brand">✓</span>
                <span><b className="font-semibold">{t}.</b> <span className="text-muted">{d}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="meeting rounded-2xl bg-zinc-900 p-6 text-white shadow-xl shadow-black/10">
          <p className="flex items-center justify-between text-xs font-medium text-white/60">
            <span className="flex items-center gap-1.5"><Logo size={14} />Roofle · Suggested for {u.role}</span><span>now</span>
          </p>
          <ul className="mt-4 space-y-3">
            {u.questions.map((q, n) => (
              <li key={q} className={`rounded-xl px-4 py-3 ${n === 0 ? 'bg-white/10 text-lg font-medium' : 'text-white/70'}`}>“{q}”</li>
            ))}
          </ul>
          <a href={`/use-cases/${u.slug}`} className="mt-5 inline-block text-sm font-semibold text-cyan-300 hover:underline">See Roofle for {u.role} →</a>
        </div>
      </div>
      <p className="mt-4 text-sm text-faint">Examples for illustration. Real suggestions come from your conversation.</p>
    </Section>
  )
}

function Roles() {
  return (
    <Section eyebrow="Built for your role" title="Whatever you do, Roofle fits the conversation." tint>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.map(u => (
          <li key={u.slug}>
            <a href={`/use-cases/${u.slug}`} className="group block h-full rounded-2xl border border-line bg-bg p-6 transition hover:border-brand hover:shadow-lg hover:shadow-black/5">
              <span className="grid size-10 place-items-center rounded-lg bg-brand-tint font-bold text-brand-strong dark:text-brand">{u.role[0]}</span>
              <h3 className="mt-4 text-xl font-semibold">{u.role}</h3>
              <p className="mt-1 text-muted">{u.short}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-strong transition group-hover:translate-x-1 dark:text-brand">Learn more →</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Privacy() {
  const points = [
    ['No bots', 'Nobody extra joins your call. Roofle runs from your menu bar.'],
    ['On your device', 'Speech recognition and transcript storage stay on your Mac.'],
    ['Your choice of LLM', 'Use your own API key, or run a local LLM and keep everything on your Mac.'],
  ]
  return (
    <Section eyebrow="Private by design" title="Your conversations stay yours.">
      <ul className="grid gap-8 sm:grid-cols-3">
        {points.map(([t, d]) => (
          <li key={t}>
            <h3 className="font-semibold text-brand-strong dark:text-brand">{t}</h3>
            <p className="mt-1 text-muted">{d}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const faqs: [string, string][] = [
  ['What is Roofle?', 'A Mac app that transcribes your meetings live, takes notes, and suggests questions.'],
  ['Does my audio leave my Mac?', 'No. Speech to text runs locally. Only the text you choose to send goes to the LLM you pick, and that can be a local one.'],
  ['Which meeting tools does it work with?', 'It captures your mic and system audio, so it works with any call app on your Mac.'],
  ['Do I need to tell people I am transcribing?', 'Yes. Consent rules vary by country and company, so let participants know.'],
  ['How do I install it?', 'Download the .dmg and drag Roofle to Applications. Roofle is free and open source.'],
]

function FAQ() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }).replace(/</g, '\\u003c') }} />
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {faqs.map(([q, a]) => (
          <details key={q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {q}<span className="text-faint transition group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-2 text-muted">{a}</p>
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
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl" style={{ fontFamily: 'var(--font-sans)' }}>Spend your meetings talking, not typing.</h2>
      </div>
    </section>
  )
}

function Footer() {
  const col = 'space-y-2 text-sm text-muted'
  const head = 'mb-3 font-mono text-xs uppercase tracking-widest text-faint'
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href="/" className="flex items-center gap-2 text-lg font-bold"><Logo /><span className="font-serif text-xl font-semibold">Roofle</span></a>
          <p className="mt-3 max-w-xs text-sm text-muted">The meeting copilot built for your role. Private, on your Mac.</p>
        </div>
        <div>
          <p className={head}>Product</p>
          <ul className={col}>
            <li><a href="/features" className="hover:text-ink">Features</a></li>
            <li><a href="/docs" className="hover:text-ink">Docs</a></li>
            <li><a href="/privacy" className="hover:text-ink">Privacy</a></li>
          </ul>
        </div>
        <div>
          <p className={head}>Use cases</p>
          <ul className={col}>
            {USE_CASES.map(u => <li key={u.slug}><a href={`/use-cases/${u.slug}`} className="hover:text-ink">{u.role}</a></li>)}
          </ul>
        </div>
        <div>
          <p className={head}>Company</p>
          <ul className={col}>
            <li><a href="/about" className="hover:text-ink">About</a></li>
            <li><a href="/status" className="hover:text-ink">Status</a></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">Contact</a></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line px-4 py-5 text-center text-xs text-faint">© 2026 Roofle</p>
    </footer>
  )
}

function PrivacyPage() {
  const flow = [
    ['1', 'Speech to text', 'Local', 'A speech model runs on your Mac and turns your mic and call audio into a transcript. Audio is never uploaded.'],
    ['2', 'Intelligence', 'Your choice', 'Notes and suggested questions come from an LLM. You decide which one, and where it runs.'],
    ['3', 'Storage', 'Local', 'Transcripts and notes are stored on your Mac. Delete them there and they are gone.'],
  ]
  const modes = [
    ['Cloud LLM', 'Add your own API key in Settings. Only the text you choose to send goes to that provider, under their privacy terms. Roofle never sees it.'],
    ['Local LLM', 'Point Roofle at a model running on your own machine. Speech to text and intelligence both stay local, so nothing leaves your Mac.'],
  ]
  const never = [
    ['No bots', 'Nobody extra joins your call. Roofle runs from your menu bar.'],
    ['No recordings on our side', 'We never receive your audio, transcripts or meeting content.'],
    ['Open source', 'The code is public, so you can check what Roofle does with your data.'],
  ]
  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">Privacy</p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">Your conversations, under your control.</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/80">Speech to text runs locally on your Mac. For intelligence you pick the LLM, and that can be a local one too.</p>
        </div>
      </section>
      <Section eyebrow="How your data flows" title="Three steps, you decide the middle one." tint>
        <ol className="grid gap-4 md:grid-cols-3">
          {flow.map(([n, t, tag, d]) => (
            <li key={t} className="rounded-2xl border border-line bg-bg p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-faint">{n.padStart(2, '0')}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tag === 'Local' ? 'bg-green-soft text-green' : 'bg-brand-tint text-brand-strong dark:text-brand'}`}>{tag}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section eyebrow="Two ways to run" title="Cloud LLM or fully local. Your call.">
        <div className="grid gap-4 md:grid-cols-2">
          {modes.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-semibold text-brand-strong dark:text-brand">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm text-faint">The local LLM option works for notes and suggested questions, so you can run Roofle without any data leaving your machine.</p>
      </Section>
      <Section eyebrow="Our promise" title="What we never do." tint>
        <ul className="grid gap-8 sm:grid-cols-3">
          {never.map(([t, d]) => (
            <li key={t}>
              <h3 className="font-semibold text-brand-strong dark:text-brand">{t}</h3>
              <p className="mt-1 text-muted">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm text-faint">Consent rules vary by country and company. Let meeting participants know you are transcribing.</p>
      </Section>
    </>
  )
}

const PAGES: Record<string, [string, () => React.JSX.Element]> = {
  '/features': ['Features · Roofle', Features],
  '/docs': ['Docs · Roofle', Docs],
  '/privacy': ['Privacy · Roofle', PrivacyPage],
  '/about': ['About · Roofle', About],
  '/status': ['Status · Roofle', Status],
}

export default function App() {
  const path = location.pathname.replace(/\/$/, '')
  const page = PAGES[path]
  useEffect(() => { if (page) document.title = page[0] }, [page])
  const Page = page?.[1]
  const ucSlug = path.startsWith('/use-cases/') ? path.slice('/use-cases/'.length) : null
  return (
    <>
      <Nav />
      <main>
        {Page ? <Page /> : ucSlug ? <UseCasePage slug={ucSlug} /> : <><Hero /><PersonaShowcase /><HowItWorks /><Roles /><Privacy /><FAQ /><FinalCTA /></>}
      </main>
      <Footer />
    </>
  )
}
