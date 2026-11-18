import { sh } from '../types'
import type { Post } from '../types'

export const post: Post = {
  slug: 'meeting-minutes-software-local-government',
  title: 'Meeting Minutes Software for Local Government (2026 Guide)',
  date: '2026-11-19',
  description: 'Meeting minutes software for county boards, councils and committees: what the technology can do, where official minutes still need a human, and a free template.',
  body: [
    'Every county board, city council and school committee has the same chore after a public meeting: turn two hours of discussion into meeting minutes that are accurate, neutral and ready for approval. Meeting minutes software and AI transcription now take the slowest part of that job, but they do not replace the clerk. This guide explains what the technology can and cannot do for public bodies, how to pick a tool, and gives you a minutes template you can copy.',
    'I build [Roofle](/), a free, open-source meeting copilot for Mac, so I have a stake. I am not a lawyer, and rules on public meetings and records differ by state and country. Treat this as a practical guide, and check your own records law and your body\'s bylaws before you change how official minutes are made.',
    '## What are meeting minutes, and why do public bodies need them?',
    'Meeting minutes are the written record of what a meeting decided. They are not a transcript. Good minutes record who attended, what motions were made, how people voted, and what actions were assigned. For a public body, the approved minutes are usually the official record, and residents, auditors and reporters read them later.',
    'That is why the standard is higher than for an internal team call. The record has to be neutral, accurate and consistent from one meeting to the next. [Robert\'s Rules of Order](https://robertsrules.com) is the common reference for how motions and records are handled, though your own bylaws and state law take precedence.',
    '## What can meeting minutes software and technology actually do?',
    'The technology helps in four places.',
    '**Transcription.** Speech-to-text turns the recording into searchable text, so the clerk does not have to type while listening.',
    '**Drafting.** A language model can turn the transcript into a first draft: topics discussed, motions and action items.',
    '**Finding things.** Searchable text makes it quick to check who said what when a member asks at the next meeting.',
    '**Consistency.** A fixed template stops each clerk from writing minutes in a different style.',
    'What it cannot do is decide what belongs in the official record. A model can mishear a name, miss who seconded a motion, or tidy up a vote count that was messy in the room. A person who was there must check every motion and vote before the minutes go to the body for approval.',
    '## What should you look for in meeting minutes software?',
    {
      head: ['Check', 'Why it matters for public bodies'],
      rows: [
        ['Accuracy on names and motions', 'Wrong names or votes in an official record are expensive to fix'],
        ['Where audio and text are stored', 'Public records and retention rules may apply to recordings and drafts'],
        ['Does a bot join the meeting?', 'In-person and hybrid meetings often have no video call to join'],
        ['Export format', 'You need text you can paste into your records system or template'],
        ['Human review step', 'The clerk, not the tool, owns the official minutes'],
        ['Cost', 'Public budgets are tight, and per-seat pricing adds up across boards'],
      ],
    },
    'A few of these are worth a closer look.',
    '**Check retention rules first.** Many places treat recordings and drafts as public records with retention schedules. A tool that keeps audio and drafts in a vendor\'s cloud can complicate that. [Do meeting notes need the cloud?](/blog/do-meeting-notes-need-the-cloud) covers the trade-offs of cloud versus local processing.',
    '**Ask about in-room meetings.** Many board meetings are held in a room, not on a video call. Tools that join Zoom or Teams as a participant do not help there. A tool that captures audio from your own computer does.',
    '## How can a clerk use AI without risking the official record?',
    'A simple process keeps the human in charge.',
    '**Tell people.** State at the start that the meeting is recorded and that AI is used to draft the minutes. Follow your own rules on recording and notice.',
    '**Capture the meeting.** Record or transcribe with a tool your organization has approved.',
    '**Draft from a template.** Ask the tool to fill in your fixed structure, not to invent its own. Use the template below.',
    '**Verify every motion and vote.** Check each against your own notes or the recording.',
    '**Keep the draft and final separate.** The body approves the final minutes. Keep the AI draft only as long as your retention rules say.',
    '## Free meeting minutes template',
    'Copy this into your records system or a plain text file. It covers the parts most public bodies record.',
    sh`MINUTES OF THE [BOARD NAME]
Date: 
Time called to order: 
Location: 

PRESENT: 
ABSENT: 
ALSO PRESENT: 

1. APPROVAL OF PREVIOUS MINUTES
Motion by: 
Seconded by: 
Vote: Yes __ No __ Abstain __ 
Result: 

2. [AGENDA ITEM]
Summary of discussion: 
Motion by: 
Seconded by: 
Vote: Yes __ No __ Abstain __ 
Result: 

3. ACTION ITEMS
- Owner, task, due date

4. PUBLIC COMMENT
Summary: 

ADJOURNMENT
Time: 
Minutes recorded by: `,
    'Fixed headings make the model\'s job easier and the clerk\'s review faster. For more on deciding what to keep, read [how to organize meeting notes](/blog/how-to-organize-meeting-notes).',
    '## Where does Roofle fit?',
    'Roofle is a [free, open-source meeting copilot](https://github.com/roofle-ai/roofle) for Apple Silicon Macs. It captures audio on your machine, transcribes it on-device, and sends only text to the model you choose, or to nothing if you run a local model. No bot joins, so it works for any call app, and because it listens from your Mac it can also capture a conversation in a room.',
    'After the meeting, you can search the session history and export the transcript or notes as a `.txt` file, which you can paste into the template above. See the [features page](/features) for a demo and the [setup guide](/docs/connect-ai-model) to connect a model.',
    'Its limits matter for this use. It is Mac only. It does not format official minutes for you, and it has no shared library, approval workflow or agenda tool. It is a drafting aid for one person, not a records system. It also records other people\'s speech, so tell participants before you start and follow your own recording rules.',
    'For other tools that keep data on your machine, see [local meeting notes apps compared](/blog/local-meeting-notes-apps-compared) and [open source alternatives to Granola and Otter](/blog/open-source-alternatives-to-granola-and-otter).',
    '## Which approach should you use?',
    {
      head: ['Your situation', 'Better fit'],
      rows: [
        ['One clerk drafting minutes from in-room or hybrid meetings', 'A local transcription tool like Roofle, plus your template'],
        ['Agendas, packets, votes and approvals in one system', 'A dedicated government meeting management platform'],
        ['A video-call-only committee that wants a shared archive', 'A bot-based note taker with team features'],
        ['Strict retention or confidentiality rules', 'A local tool, or one your records officer has approved'],
      ],
    },
    '## FAQ',
    '**What is meeting minutes software?** Software that helps you record, transcribe and structure the written record of a meeting. Some tools only transcribe, and others also manage agendas, votes and approvals.',
    '**Can AI write official meeting minutes?** It can draft them, but a person who attended must verify motions, votes and names before the body approves them.',
    '**What is the difference between meeting minutes and a transcript?** A transcript records everything said. Minutes record decisions, motions, votes and actions in a short, neutral form.',
    '**What should meeting minutes include?** Date, time and place, attendees, motions and who made and seconded them, votes, action items, and the time of adjournment.',
    '**Is it legal to record a public meeting with AI?** Rules vary by place, and public bodies often have their own recording and notice rules. Check your records law and bylaws, and tell participants before you start.',
    '**Do I need a bot to join the meeting?** No. A tool that captures audio from your computer works for in-room meetings and any call app.',
    '**Is Roofle free?** Yes. Roofle is free and open source. You pay only your model provider, or nothing with a local model.',
    '## Draft your next set of minutes faster',
    '[Download Roofle](/), connect a model, and run it on your next meeting. Paste the draft into the template above, then verify every motion and vote before it goes for approval.',
  ],
}
