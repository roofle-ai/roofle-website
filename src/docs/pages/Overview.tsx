import DocPage, { DocSection } from '../components/DocPage'
import { AFTER_CALL, QUICK_ACTIONS } from '../content'
import Shot from '../components/Shot'
import { A, C, Code, H3, K, Note, P, Table } from '../components/ui'

const REPO = 'https://github.com/roofle-ai/roofle'
const DMG = `${REPO}/releases/latest`

export default function Overview() {
  return (
    <DocPage path="/docs">
          <DocSection id="overview" eyebrow="Getting started" title="Overview" group="Getting started">
            <P>Roofle is a macOS app, in your menu bar and Dock, that listens to your meetings and conversations, transcribes them on your Mac, and helps while they happen. It is free, open source and released under the MIT license.</P>
            <Table head={['Capability', 'What it does']} rows={[
              ['Live transcription', 'Captures your microphone and the system audio, tagged by source.'],
              ['Live notes', 'One short, continuously rewritten document: summary, key points, decisions and action items.'],
              ['Suggested questions', 'Flags a gap or vague point worth asking about, with a Source button that jumps to the exact line.'],
              ['Quick actions', 'One-click recap, key figures and dates, what to ask next, simpler explanations, and email, Slack and action-item drafts.'],
              ['Organise', 'Auto-generated titles, topics, and editable notes.'],
            ]} />
            <P>Speech recognition and storage run locally. Notes and questions use an AI model through an API key you provide.</P>
          </DocSection>

          <DocSection id="install" eyebrow="Getting started" title="Install" group="Getting started">
            <Table head={['Requirement', 'Value']} rows={[['Hardware', 'Apple Silicon Mac'], ['Operating system', 'macOS 13 or newer'], ['AI features', 'An API key for an OpenAI-compatible model (transcription works without one)']]} />
            <H3>Download</H3>
            <P>Download the <C>.dmg</C>, open it and drag Roofle to Applications. Older versions are on the <A href={DMG}>releases page</A>.</P>
            <H3>Homebrew</H3>
            <Code>brew install --cask roofle-ai/roofle/roofle</Code>
            <P>Roofle checks GitHub for new releases and can update itself from within the app.</P>
          </DocSection>

          <DocSection id="permissions" eyebrow="Getting started" title="Permissions" group="Getting started">
            <P>On first use macOS asks for two permissions. Both are needed to capture each side of a conversation.</P>
            <Table head={['Permission', 'Why Roofle needs it']} rows={[
              ['Microphone', 'Captures your own voice.'],
              ['Screen & System Audio Recording', 'Captures everyone else on the call, from any meeting app on your Mac.'],
            ]} />
            <Note title="Declined by mistake?">Re-enable both under System Settings, Privacy &amp; Security, then restart Roofle.</Note>
            <Shot name="permissions.webp" alt="macOS permission prompts for Microphone and Screen & System Audio Recording" />
            <P>The first run also downloads the on-device speech model, so keep an internet connection for that step.</P>
          </DocSection>

          <DocSection id="menu-bar" eyebrow="Using Roofle" title="Menu bar, Dock and shortcuts" group="Using Roofle">
            <P>Roofle runs in both the menu bar and the Dock. Use whichever is closer. Nothing is recorded until you start a conversation.</P>
            <Table head={['Action', 'How']} rows={[
              ['Open the window', 'Click the Dock icon, or left-click the tray icon'],
              ['Open the menu', 'Right-click the tray icon'],
              ['New conversation', <><K>⌘</K> <K>⇧</K> <K>S</K></>],
              ['Stop conversation', <><K>⌘</K> <K>⇧</K> <K>T</K></>],
              ['Quit', 'Right-click the tray icon, then Quit'],
            ]} />
            <Note title="Closing the window does not quit">Closing the window only hides it. Roofle keeps running until you choose Quit from the menu.</Note>
          </DocSection>

          <DocSection id="conversation" eyebrow="Using Roofle" title="Start Roofle for your meeting" group="Using Roofle" nav="Start for your meeting">
            <P>Start from the <C>+ New Conversation</C> button or the tray menu, pick the type and goal, then let Roofle run. Stop with <K>⌘</K> <K>⇧</K> <K>T</K>.</P>
            <P>Want the full walkthrough? Read <A href="/docs/start-a-meeting">How to start Roofle for your meeting</A>.</P>
          </DocSection>

          <DocSection id="after" eyebrow="Using Roofle" title="After the call" group="Using Roofle">
            <P>Finished sessions stay in your history. You can also use the quick actions on a finished conversation, such as drafting a follow-up email or listing action items.</P>
            <Table head={['Feature', 'What it does']} rows={AFTER_CALL} />
            <H3>Quick actions</H3>
            <Table head={['Action', 'What it does']} rows={QUICK_ACTIONS} />
            <H3>Export</H3>
            <P>Export a transcript or the notes as a <C>.txt</C> file. Roofle saves it to your Downloads folder and reveals it in Finder.</P>
          </DocSection>

          <DocSection id="ai" eyebrow="Configuration" title="Connect an AI model" group="Configuration">
            <P>Roofle works with any OpenAI-compatible gateway and model, including local ones. Set the base URL, model and API key in Settings, then run the connection test.</P>
            <P>See <A href="/docs/connect-ai-model">Connect an AI model</A> for common gateway URLs, local setup and the recommended model.</P>
          </DocSection>

          <DocSection id="live-session" eyebrow="Configuration" title="Live session" group="Configuration">
            <P>These settings tune how often Roofle generates questions and notes during a call.</P>
            <Table head={['Setting', 'Default', 'Effect']} rows={[
              ['Question trigger', '500 characters', 'New questions are generated after this much new transcript. Accepts 50 to 5000. Lower values surface questions sooner.'],
              ['Questions on screen', '2', 'The most follow-up questions shown at once, up to 5. A new one waits until one is answered, asked or goes stale.'],
              ['Notes update interval', '5 minutes', 'Notes are rewritten from each window of the transcript plus the previous notes. Accepts up to 60.'],
            ]} />
            <P>You can switch suggested questions off and on while a conversation is running, and use <C>Regenerate notes</C> to rewrite the notes at any time.</P>
          </DocSection>

          <DocSection id="profile" eyebrow="Configuration" title="Profile" group="Configuration">
            <P>Pick your role and the meetings you usually join. Roofle uses them to decide what to listen for, such as budget and timeline in sales or failure modes in engineering.</P>
            <P>The persona summary (up to 400 characters) is sent to the AI as context. Edit it freely. Clear it to return to the generated text. Changing your role or meetings rewrites it until you edit it yourself.</P>
          </DocSection>

          <DocSection id="usage" eyebrow="Configuration" title="Usage and appearance" group="Configuration">
            <P>Usage shows LLM tokens per session, by month, as reported by your provider. Cost is not tracked. Appearance sets the theme and applies immediately.</P>
            <P>Use the <C>Opacity</C> option to make the Roofle window see-through, so you can keep it on top of your meeting window without hiding what is behind it.</P>
          </DocSection>

          <DocSection id="privacy" eyebrow="Reference" title="Data and privacy" group="Reference">
            <Table head={['Data', 'Where it goes']} rows={[
              ['Audio', 'Transcribed on-device. Never leaves your Mac.'],
              ['Transcripts and notes', <>Stored locally in SQLite at <C>~/Library/Application Support/com.roofle.app/roofle.db</C>.</>],
              ['Transcript text', 'Sent to the AI provider you configure, to generate notes, questions and recaps. Roofle has no server in between.'],
              ['Speech model and updates', 'Downloaded on first run, and GitHub is checked for new releases.'],
              ['Analytics', 'None. There is no telemetry in the app.'],
            ]} />
            <Note title="Tell participants" warn>Consent rules for transcription vary by country and company. Let everyone on the call know.</Note>
            <P>For the full picture, see the <A href="/privacy">privacy page</A>.</P>
          </DocSection>

          <DocSection id="troubleshooting" eyebrow="Reference" title="Troubleshooting" group="Reference">
            <Table head={['Symptom', 'What to check']} rows={[
              ['I cannot find the Roofle window', 'Click the Dock icon, or left-click the tray icon in the menu bar.'],
              ['Only my voice is transcribed', 'Screen & System Audio Recording is probably not granted. Enable it in System Settings, Privacy & Security, then restart Roofle.'],
              ['Transcript works but no notes or questions', 'Open Settings and run the connection test. Check the base URL, model name and API key.'],
              ['Questions appear too rarely or too often', 'Adjust Question trigger and Questions on screen under Live Session.'],
              ['The window closed and Roofle is still running', 'Closing only hides it. Use Quit from the tray menu to exit.'],
            ]} />
          </DocSection>

          <DocSection id="uninstall" eyebrow="Reference" title="Uninstall" group="Reference">
            <P>With Homebrew, this removes the app and its local data:</P>
            <Code>brew uninstall --cask --zap roofle</Code>
            <P>Without Homebrew, drag Roofle to the Trash. To remove data too, delete <C>~/Library/Application Support/com.roofle.app</C>.</P>
          </DocSection>

          <DocSection id="support" eyebrow="Reference" title="Support" group="Reference">
            <P>Roofle is open source under the MIT license. Browse the code, report a bug or request a feature on <A href={REPO}>GitHub</A>. For security issues, use GitHub&apos;s private vulnerability reporting rather than a public issue. Other questions: <A href="mailto:support@roofle.app">support@roofle.app</A>.</P>
          </DocSection>
    </DocPage>
  )
}
