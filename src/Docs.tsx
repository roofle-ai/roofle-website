import { useEffect, useState } from 'react'

const REPO = 'https://github.com/roofle-ai/roofle'
const DMG = `${REPO}/releases/latest`

const NAV: [string, [string, string][]][] = [
  ['Getting started', [['overview', 'Overview'], ['install', 'Install'], ['permissions', 'Permissions']]],
  ['Using Roofle', [['menu-bar', 'Menu bar and shortcuts'], ['conversation', 'Run a conversation'], ['after', 'After the call']]],
  ['Configuration', [['ai', 'Connect an AI model'], ['live-session', 'Live session'], ['profile', 'Profile'], ['usage', 'Usage and appearance']]],
  ['Reference', [['privacy', 'Data and privacy'], ['troubleshooting', 'Troubleshooting'], ['uninstall', 'Uninstall'], ['support', 'Support']]],
]
const IDS = NAV.flatMap(([, items]) => items.map(([id]) => id))

function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => navigator.clipboard?.writeText(children).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  return (
    <div className="relative mt-4 rounded-xl border border-line bg-surface">
      <pre className="overflow-x-auto px-4 py-3 pr-20 font-mono text-sm text-ink"><code>{children}</code></pre>
      <button type="button" onClick={copy} className="absolute right-2 top-2 rounded-md border border-line bg-bg px-2 py-1 text-xs text-muted transition hover:text-ink">{copied ? 'Copied' : 'Copy'}</button>
    </div>
  )
}

function Note({ title, children, warn }: { title: string; children: React.ReactNode; warn?: boolean }) {
  return (
    <aside className={`mt-5 rounded-xl border-l-4 px-4 py-3 text-sm ${warn ? 'border-amber bg-amber-soft' : 'border-brand bg-brand-tint'}`}>
      <p className="font-semibold text-ink">{title}</p>
      <div className="mt-1 text-muted">{children}</div>
    </aside>
  )
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
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

const K = ({ children }: { children: React.ReactNode }) => <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-xs text-ink">{children}</kbd>
const C = ({ children }: { children: React.ReactNode }) => <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-ink">{children}</code>
const A = ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })} className="font-medium text-brand-strong underline underline-offset-2 dark:text-brand">{children}</a>

function H({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">{eyebrow}</p>
      <h2 id={id} className="scroll-mt-24 text-3xl font-medium tracking-tight">{children}</h2>
    </>
  )
}
const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="mt-8 font-serif text-xl font-medium">{children}</h3>
const P = ({ children }: { children: React.ReactNode }) => <p className="mt-3 leading-relaxed text-muted">{children}</p>
const Sec = ({ children }: { children: React.ReactNode }) => <section className="border-t border-line py-12 first:border-t-0 first:pt-0">{children}</section>

function NavList({ active, onPick }: { active: string; onPick?: () => void }) {
  return (
    <div className="space-y-6">
      {NAV.map(([group, items]) => (
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

export default function Docs() {
  const [active, setActive] = useState(IDS[0])
  useEffect(() => {
    const io = new IntersectionObserver(es => { const e = es.find(x => x.isIntersecting); if (e) setActive(e.target.id) }, { rootMargin: '-15% 0px -75% 0px' })
    IDS.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  const [open, setOpen] = useState(false)
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-strong dark:text-brand">Documentation</p>
          <h1 className="max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl">Roofle documentation</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">Install Roofle, connect an AI model and run your first conversation. Everything below reflects the current release.</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[14rem_minmax(0,1fr)]">
        <details open={open} onToggle={e => setOpen(e.currentTarget.open)} className="rounded-xl border border-line px-4 py-3 md:hidden">
          <summary className="cursor-pointer text-sm font-semibold">On this page</summary>
          <div className="mt-4"><NavList active={active} onPick={() => setOpen(false)} /></div>
        </details>
        <nav aria-label="Documentation" className="hidden md:sticky md:top-24 md:block md:max-h-[calc(100vh-7rem)] md:self-start md:overflow-y-auto"><NavList active={active} /></nav>

        <article className="min-w-0 max-w-3xl">
          <Sec>
            <H id="overview" eyebrow="Getting started">Overview</H>
            <P>Roofle is a macOS menu-bar app that listens to your meetings and conversations, transcribes them on your Mac, and helps while they happen. It is free, open source and released under the MIT license.</P>
            <Table head={['Capability', 'What it does']} rows={[
              ['Live transcription', 'Captures your microphone and the system audio, tagged by source.'],
              ['Live notes', 'One short, continuously rewritten document: summary, key points, decisions and action items.'],
              ['Suggested questions', 'Flags a gap or vague point worth asking about, with a Source button that jumps to the exact line.'],
              ['Recap', 'A summary of the last 30 seconds, plus key figures and dates on demand.'],
            ]} />
            <P>Speech recognition and storage run locally. Notes and questions use an AI model through an API key you provide.</P>
          </Sec>

          <Sec>
            <H id="install" eyebrow="Getting started">Install</H>
            <Table head={['Requirement', 'Value']} rows={[['Hardware', 'Apple Silicon Mac'], ['Operating system', 'macOS 13 or newer'], ['AI features', 'An API key for an OpenAI-compatible model (transcription works without one)']]} />
            <H3>Download</H3>
            <P>Download the <C>.dmg</C>, open it and drag Roofle to Applications. Older versions are on the <A href={DMG}>releases page</A>.</P>
            <H3>Homebrew</H3>
            <Code>brew install --cask roofle-ai/roofle/roofle</Code>
            <P>Roofle checks GitHub for new releases and can update itself from within the app.</P>
          </Sec>

          <Sec>
            <H id="permissions" eyebrow="Getting started">Permissions</H>
            <P>On first use macOS asks for two permissions. Both are needed to capture each side of a conversation.</P>
            <Table head={['Permission', 'Why Roofle needs it']} rows={[
              ['Microphone', 'Captures your own voice.'],
              ['Screen & System Audio Recording', 'Captures everyone else on the call, from any meeting app on your Mac.'],
            ]} />
            <Note title="Declined by mistake?">Re-enable both under System Settings, Privacy &amp; Security, then restart Roofle.</Note>
            <P>The first run also downloads the on-device speech model, so keep an internet connection for that step.</P>
          </Sec>

          <Sec>
            <H id="menu-bar" eyebrow="Using Roofle">Menu bar and shortcuts</H>
            <P>Roofle runs from the menu bar and starts hidden, with no Dock icon. Nothing is recorded until you start a conversation.</P>
            <Table head={['Action', 'How']} rows={[
              ['Open the window', 'Left-click the tray icon'],
              ['Open the menu', 'Right-click the tray icon'],
              ['New conversation', <><K>⌘</K> <K>⇧</K> <K>S</K></>],
              ['Stop conversation', <><K>⌘</K> <K>⇧</K> <K>T</K></>],
              ['Quit', 'Right-click the tray icon, then Quit'],
            ]} />
            <Note title="Closing the window does not quit">Closing the window only hides it. Roofle keeps running until you choose Quit from the menu.</Note>
          </Sec>

          <Sec>
            <H id="conversation" eyebrow="Using Roofle">Run a conversation</H>
            <H3>1. Set up the call</H3>
            <P>Starting a conversation asks what the call is about, then for your goal. Suggested goals appear as chips, and you can write your own.</P>
            <Table head={['Call type', 'Examples']} rows={[
              ['Interview', 'Taking or giving an interview'],
              ['Sales', 'Selling, or buying'],
              ['Discovery, decision, planning', 'Customer discovery, go or no-go calls, roadmap sessions'],
              ['Review, status, negotiation', 'Design reviews, stand-ups, pricing and terms'],
              ['One-on-one, training, other', 'Feedback sessions, learning sessions, anything else'],
            ]} />
            <H3>2. Let it run</H3>
            <P>While you talk, Roofle transcribes both sides, keeps the live notes current and surfaces suggested questions. Open a question&apos;s Source to see the exact transcript line behind it. Ask for a recap of the last 30 seconds, or key figures and dates, whenever you lose the thread.</P>
            <H3>3. Stop</H3>
            <P>Press <K>⌘</K> <K>⇧</K> <K>T</K> or choose Stop conversation from the tray menu. A short call is summarised when it ends.</P>
          </Sec>

          <Sec>
            <H id="after" eyebrow="Using Roofle">After the call</H>
            <P>Finished sessions stay in your history, where you can search them.</P>
            <H3>Export</H3>
            <P>Export a transcript or the notes as a <C>.txt</C> file. Roofle saves it to your Downloads folder and reveals it in Finder.</P>
          </Sec>

          <Sec>
            <H id="ai" eyebrow="Configuration">Connect an AI model</H>
            <P>Open Settings, then LLM Configuration. Roofle works with any OpenAI-compatible endpoint, including OpenAI, OpenRouter, Groq and Ollama.</P>
            <Table head={['Field', 'Description']} rows={[
              ['Base URL', <>The endpoint, for example <C>https://openrouter.ai/api/v1</C>.</>],
              ['Model', <>The model name your provider expects, for example <C>gpt-4o-mini</C>.</>],
              ['API key', 'Your key for that provider. Use Show to check what you typed.'],
            ]} />
            <P>Use the connection test in Settings to confirm the key and model work before your first call.</P>
            <Note title="Keep everything on your Mac">Point the base URL at a model you run yourself, such as one served by Ollama. Transcription is already on-device, so nothing then leaves your machine.</Note>
          </Sec>

          <Sec>
            <H id="live-session" eyebrow="Configuration">Live session</H>
            <P>These settings tune how often Roofle generates questions and notes during a call.</P>
            <Table head={['Setting', 'Default', 'Effect']} rows={[
              ['Question trigger', '500 characters', 'New questions are generated after this much new transcript. Accepts 50 to 5000. Lower values surface questions sooner.'],
              ['Questions on screen', '2', 'The most follow-up questions shown at once, up to 5. A new one waits until one is answered, asked or goes stale.'],
              ['Notes update interval', '5 minutes', 'Notes are rewritten from each window of the transcript plus the previous notes. Accepts up to 60.'],
            ]} />
          </Sec>

          <Sec>
            <H id="profile" eyebrow="Configuration">Profile</H>
            <P>Pick your role and the meetings you usually join. Roofle uses them to decide what to listen for, such as budget and timeline in sales or failure modes in engineering.</P>
            <P>The persona summary (up to 400 characters) is sent to the AI as context. Edit it freely. Clear it to return to the generated text. Changing your role or meetings rewrites it until you edit it yourself.</P>
          </Sec>

          <Sec>
            <H id="usage" eyebrow="Configuration">Usage and appearance</H>
            <P>Usage shows LLM tokens per session, by month, as reported by your provider. Cost is not tracked. Appearance sets the theme and applies immediately.</P>
          </Sec>

          <Sec>
            <H id="privacy" eyebrow="Reference">Data and privacy</H>
            <Table head={['Data', 'Where it goes']} rows={[
              ['Audio', 'Transcribed on-device. Never leaves your Mac.'],
              ['Transcripts and notes', <>Stored locally in SQLite at <C>~/Library/Application Support/com.roofle.app/roofle.db</C>.</>],
              ['Transcript text', 'Sent to the AI provider you configure, to generate notes, questions and recaps. Roofle has no server in between.'],
              ['Speech model and updates', 'Downloaded on first run, and GitHub is checked for new releases.'],
              ['Analytics', 'None. There is no telemetry in the app.'],
            ]} />
            <Note title="Tell participants" warn>Consent rules for transcription vary by country and company. Let everyone on the call know.</Note>
            <P>For the full picture, see the <A href="/privacy">privacy page</A>.</P>
          </Sec>

          <Sec>
            <H id="troubleshooting" eyebrow="Reference">Troubleshooting</H>
            <Table head={['Symptom', 'What to check']} rows={[
              ['I can see Roofle running but not in the Dock', 'That is expected. Roofle lives in the menu bar. Left-click the tray icon.'],
              ['Only my voice is transcribed', 'Screen & System Audio Recording is probably not granted. Enable it in System Settings, Privacy & Security, then restart Roofle.'],
              ['Transcript works but no notes or questions', 'Open Settings and run the connection test. Check the base URL, model name and API key.'],
              ['Questions appear too rarely or too often', 'Adjust Question trigger and Questions on screen under Live Session.'],
              ['The window closed and Roofle is still running', 'Closing only hides it. Use Quit from the tray menu to exit.'],
            ]} />
          </Sec>

          <Sec>
            <H id="uninstall" eyebrow="Reference">Uninstall</H>
            <P>With Homebrew, this removes the app and its local data:</P>
            <Code>brew uninstall --cask --zap roofle</Code>
            <P>Without Homebrew, drag Roofle to the Trash. To remove data too, delete <C>~/Library/Application Support/com.roofle.app</C>.</P>
          </Sec>

          <Sec>
            <H id="support" eyebrow="Reference">Support</H>
            <P>Roofle is open source under the MIT license. Browse the code, report a bug or request a feature on <A href={REPO}>GitHub</A>. For security issues, use GitHub&apos;s private vulnerability reporting rather than a public issue. Other questions: <A href="mailto:support@roofle.app">support@roofle.app</A>.</P>
          </Sec>
        </article>
      </div>
    </>
  )
}
