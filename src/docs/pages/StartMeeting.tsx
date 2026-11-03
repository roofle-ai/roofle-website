import DocPage, { DocSection } from '../components/DocPage'
import { AFTER_CALL, QUICK_ACTIONS } from '../content'
import Shot from '../components/Shot'
import { A, C, H3, K, Note, P, Table } from '../components/ui'

export default function StartMeeting() {
  return (
    <DocPage path="/docs/start-a-meeting">

        <DocSection id="before" eyebrow="Step 0" title="Before you begin">
          <P>Check these once. After that, starting a meeting takes a click.</P>
          <Table head={['Check', 'Why']} rows={[
            ['Roofle is running', 'It shows in both the Dock and the menu bar. Either one opens the window.'],
            ['Microphone and Screen & System Audio Recording are granted', 'Without the second one, only your own voice is transcribed.'],
            ['An AI model is connected in Settings', <>Transcription works without one, but notes and questions need it. <A href="/docs/connect-ai-model#openai">Add your key</A> and run the connection test.</>],
          ]} />
          <P>Not set up yet? See <A href="/docs#install">Install</A>, <A href="/docs#permissions">Permissions</A> and <A href="/docs/connect-ai-model">Connect an AI model</A>.</P>
        </DocSection>

        <DocSection id="start" eyebrow="Step 1" title="Start a new conversation">
          <P>Start it just before the meeting begins, or as soon as you join. There are two ways:</P>
          <Table head={['From', 'How']} rows={[
            ['The app window', <>Click the <C>+ New Conversation</C> button. Open the window first from the Dock icon or the tray icon if it is hidden.</>],
            ['The tray icon', <>Right-click the tray icon in the menu bar, then choose <C>New conversation</C>.</>],
            ['Keyboard', <><K>⌘</K> <K>⇧</K> <K>S</K></>],
          ]} />
          <P>Nothing is recorded until you do this. If you join a call late, start Roofle anyway. It picks up from that moment.</P>
          <Shot name="new-conversation" alt="The New Conversation button and the tray menu entry" />
        </DocSection>

        <DocSection id="setup" eyebrow="Step 2" title="Choose the type and your goal">
          <P>Roofle opens a dialog that asks two things. This step is what lets Roofle improve its output, because it decides what to listen for.</P>
          <H3>Type of conversation</H3>
          <P>Pick the one closest to your meeting.</P>
          <Table head={['Type', 'Use it for']} rows={[
            ['Interview', 'Taking or giving an interview'],
            ['Sales', 'Selling, or buying'],
            ['Discovery, decision, planning', 'Customer discovery, go or no-go calls, roadmap sessions'],
            ['Review, status, negotiation', 'Design reviews, stand-ups, pricing and terms'],
            ['One-on-one, training, other', 'Feedback sessions, learning sessions, anything else'],
          ]} />
          <H3>Goal</H3>
          <P>Suggested goals appear as chips. Pick one, or write your own in a sentence. Say what you want out of the meeting, not what the meeting is.</P>
          <Table head={['Weak goal', 'Better goal']} rows={[
            ['Sales call', 'Find out their budget, timeline and who signs off'],
            ['Interview', 'Check how the candidate handled a failed project'],
            ['Planning', 'Agree an owner and a date for each open item'],
          ]} />
          <Note title="Why this matters">Roofle uses the type and goal to spot gaps against what you are trying to achieve. A specific goal gives sharper suggested questions and notes that focus on what you care about.</Note>
          <Shot name="setup-dialog" alt="Dialog for choosing the conversation type and goal" />
        </DocSection>

        <DocSection id="run" eyebrow="Step 3" title="Let it run during the meeting">
          <P>Once you confirm, Roofle works in the background. You can keep your meeting app in front and glance at Roofle when you need it.</P>
          <Shot name="live-session" alt="Live transcript, notes and suggested questions during a call" />
          <H3>What you will see</H3>
          <Table head={['Part', 'What it does']} rows={[
            ['Transcript', 'Both sides of the call, tagged by source: your microphone and the system audio.'],
            ['Live notes', 'One short document, rewritten continuously: summary, key points, decisions and action items.'],
            ['Suggested questions', 'A gap or vague point worth asking about. Open Source to jump to the exact transcript line.'],
          ]} />
          <H3>Quick actions</H3>
          <P>Lost the thread, or need to follow up? Use these without interrupting anyone.</P>
          <Table head={['Action', 'What it does']} rows={QUICK_ACTIONS} />
          <H3>Keep Roofle on top of your meeting window</H3>
          <P>Use the <C>Opacity</C> option to make Roofle see-through. You can then place it over your meeting window and still see what is behind it.</P>
          <H3>Working with suggested questions</H3>
          <P>You can turn suggested questions off and on at any time while the conversation is running, for example when you want a quieter screen. Only a few questions show at once. A new one appears when you answer or ask one, or when an older one goes stale. If they come too often or too rarely, change <C>Question trigger</C> and <C>Questions on screen</C> under <A href="/docs#live-session">Live session</A>.</P>
          <Note title="Closing the window does not stop the meeting">Closing the window only hides it. Roofle keeps transcribing until you stop the conversation.</Note>
        </DocSection>

        <DocSection id="stop" eyebrow="Step 4" title="Stop the conversation">
          <P>Press <K>⌘</K> <K>⇧</K> <K>T</K>, or choose <C>Stop conversation</C> from the tray menu. A short call is summarised when it ends.</P>
          <P>The session is saved to your history. You can still use the quick actions above, such as the email draft, Slack draft and action items.</P>
          <Table head={['Afterwards', 'What it does']} rows={AFTER_CALL} />
          <P>See also <A href="/docs#after">After the call</A>.</P>
        </DocSection>

        <DocSection id="tips" eyebrow="Tips" title="Getting the best results">
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted">
            <li>Write a specific goal. It is the biggest single improvement you can make.</li>
            <li>Start Roofle before the first question is asked, not halfway through.</li>
            <li>Pick the type again for each meeting. A stand-up and a negotiation need different questions.</li>
            <li>Draft your follow-up email or Slack message with one click before you leave the call, while it is fresh.</li>
            <li>Keep your role and meetings up to date in <A href="/docs#profile">Profile</A>.</li>
            <li>Tell participants you are transcribing. Consent rules vary by country and company.</li>
          </ul>
        </DocSection>

        <DocSection id="trouble" eyebrow="Help" title="If something looks wrong">
          <Table head={['Symptom', 'What to check']} rows={[
            ['Only my voice is transcribed', 'Enable Screen & System Audio Recording in System Settings, Privacy & Security, then restart Roofle.'],
            ['Transcript works but no notes or questions', 'Run the connection test in Settings. Check the base URL, model name and API key.'],
            ['I cannot find the New Conversation button', 'Click the Dock icon or the tray icon to open the window, or use the tray menu or the shortcut.'],
          ]} />
          <P>More in <A href="/docs#troubleshooting">Troubleshooting</A>.</P>
        </DocSection>
    </DocPage>
  )
}
