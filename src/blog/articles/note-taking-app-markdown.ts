import { sh } from '../types'
import type { Post } from '../types'

export const post: Post = {
  slug: 'note-taking-app-markdown',
  title: 'Best Note Taking App for Markdown: 3 Picks (2026)',
  date: '2026-11-18',
  description: 'Find the best note taking app for Markdown: Obsidian, Logseq and Joplin compared on storage, sync and openness, plus a template for meeting notes.',
  body: [
    'The best note taking app for Markdown is the one that keeps your notes as plain `.md` files you can open anywhere. Obsidian is the usual pick for linked notes, Logseq for outlines and Joplin for notebooks with sync and encryption. Plain text outlives apps: a Markdown note opens in any editor, survives a vendor shutting down, and is easy to search, back up and version.',
    'This guide compares three popular options, explains what to check before you commit, and covers the gap most of them leave: meetings. I build [Roofle](/), a free, open-source meeting copilot for Mac, so I have a stake in that last part. Details about the other apps come from their public pages and reviews as of 18 November 2026. Pricing and licenses change, so confirm them on each project\'s site.',
    '## What is Markdown, and why use it for notes?',
    'Markdown is a way of writing formatted text using plain characters. A `#` makes a heading, `-` makes a list item, and `**bold**` makes bold text. Because the file is just text, any editor can read it, and the formatting is still readable if you open it somewhere that does not render Markdown.',
    sh`# Heading
## Smaller heading
- A list item
- [ ] A task to tick off
**Bold**, *italic*, and [a link](https://example.com)`,
    'That small syntax is the whole reason Markdown note taking apps feel fast: you format as you type, with no toolbar.',
    '## What should a note taking app with Markdown do?',
    'Not every app that says "Markdown" treats it the same way. Four checks separate them.',
    '**Are your notes plain files?** Some apps store each note as a `.md` file in a folder you own. Others keep notes in a database and export Markdown on request. Files are easier to move, back up and open elsewhere.',
    '**Where does it sync?** Built-in sync is convenient. Syncing a folder with a service you already use also works with file-based apps.',
    '**Can you leave?** Try an export before you write a hundred notes. A good test is whether links, attachments and tags survive the move.',
    '**How open is it?** Open-source code lets you inspect what the app does and keep a working copy if the company changes direction. It is not the only way to stay safe, and file-based storage covers a lot of the same risk.',
    '## Which Markdown note taking apps are worth trying?',
    {
      head: ['App', 'How notes are stored', 'Code', 'Good fit when'],
      rows: [
        ['[Obsidian](https://obsidian.md)', 'Plain Markdown files in a folder (a vault)', 'Closed-source app, large plugin ecosystem', 'You want links between notes and plugins for most workflows'],
        ['[Logseq](https://logseq.com)', 'Local files, built around an outliner of blocks', 'Open source (AGPL-3.0 per its repository)', 'You think in bullet outlines and daily journals'],
        ['[Joplin](https://joplinapp.org)', 'Markdown notes managed by the app, with sync options and encryption', 'Open source', 'You want notebooks, sync and encryption more than a link graph'],
      ],
      note: 'Based on each project\'s public description and third-party comparisons, November 2026. Verify licenses and pricing on the official sites.',
    },
    '**Obsidian** is the usual starting point. The app is free for personal use, and Sync and Publish are paid add-ons. Its [pricing page](https://obsidian.md/pricing) is the place to check what costs money today, since third-party sites disagree on figures.',
    '**Logseq** suits people who write in outlines. It stores notes locally and its source is public. The block-based model is a different way of working, so try it for a week before you move everything over.',
    '**Joplin** is a good fit if you want notebooks, encryption and a choice of sync services. Check how it stores data before you rely on it as a folder of plain `.md` files, because that differs from Obsidian\'s model.',
    '## Why do meeting notes break a Markdown workflow?',
    'A Markdown app is great for notes you write. Meetings are different. You cannot type fast enough to capture a conversation and take part in it. You end up with half a page of fragments, and the decisions that mattered live in your memory.',
    'The usual fix is an AI note taker, and most of those keep your notes in their own cloud app. That undoes the reason you chose Markdown. Your meeting notes live in one place and everything else lives in your vault.',
    '## How do you get meeting notes into your Markdown vault?',
    'The simple route works with any app above.',
    '**Capture the meeting with a tool that keeps text you can copy.** The output has to be text you control, not a link to a web page.',
    '**Keep the useful parts.** A full transcript is long. Decisions, action items and open questions are what you will search for later. [How to organize meeting notes](/blog/how-to-organize-meeting-notes) covers what to keep and what to drop.',
    '**Paste it into a note with a consistent name.** A date plus a short title, such as `2026-11-18 vendor call`, is enough. Add a tag or link to the project it belongs to.',
    '**Link it.** In Obsidian or Logseq, link the meeting note to the project or person it concerns, and the next search finds it.',
    'A template keeps the notes consistent. Copy this into a new note and fill it in after each call:',
    sh`# 2026-11-18 Vendor call

## Decisions
- 

## Action items
- [ ] Owner: task, due date

## Open questions
- 

## Links
- Project: `,
    '## Where does Roofle fit?',
    'Roofle is a [free, open-source meeting copilot](https://github.com/roofle-ai/roofle) for Apple Silicon Macs. It captures audio on your machine, transcribes it on-device, and sends only text to the model you choose, or to nothing with a local model. No bot joins the call.',
    'It also suggests follow-up questions while the call is live, based on your role, and each suggestion links back to the transcript line behind it. See the [features page](/features) for a demo.',
    'After the call, the session is saved to your history, and you can search it and export a transcript or notes as a `.txt` file. That is plain text, not a `.md` file. In practice, pasting into Obsidian, Logseq or Joplin works fine, and Markdown is just plain text with a few symbols. It does not write to your vault for you, though, so there is a manual step. If you need automatic export into a vault, Roofle does not do that today.',
    'Roofle also records the other side\'s audio, which raises a consent question. Tell participants before you start and follow your local rules and company policy.',
    'If you take notes in your own words during calls, Roofle\'s transcript fills in what you missed. For where the audio goes and why it matters, read [do meeting notes need the cloud?](/blog/do-meeting-notes-need-the-cloud). For other tools that keep data on your machine, see [local meeting notes apps compared](/blog/local-meeting-notes-apps-compared).',
    '## How to choose',
    {
      head: ['If you want', 'Pick'],
      rows: [
        ['The biggest plugin ecosystem and linked notes', 'Obsidian'],
        ['An open-source outliner with daily journals', 'Logseq'],
        ['Notebooks with sync and encryption', 'Joplin'],
        ['Meeting notes that stay on your machine and paste into any of the above', 'Roofle plus your Markdown app'],
      ],
    },
    '## FAQ',
    '**What is the best note taking app with Markdown?** It depends on how you work. Obsidian suits linked notes and plugins, Logseq suits outlines, and Joplin suits notebooks with sync and encryption.',
    '**Is there a free Markdown note taking app?** Yes. Obsidian\'s core app is free for personal use, and Logseq and Joplin are open source. Check each site for current terms.',
    '**Are Markdown notes really portable?** Plain `.md` files are, which is the main reason to use Markdown. Apps that keep notes in a database make moving harder, so test an export first.',
    '**Can I take meeting notes in a Markdown app?** You can, but typing during a call is hard. A meeting copilot captures the conversation, and you keep the useful parts in your vault.',
    '**Does Roofle export Markdown?** Roofle exports transcripts and notes as `.txt` files. You can paste that text into a Markdown note, but it does not write `.md` files to your vault automatically.',
    '**What is the difference between Obsidian and Logseq?** Obsidian is a file-based editor built around linked notes and plugins. Logseq is an outliner where each bullet is a block. Both keep notes locally, so try each for a week on real work.',
    '**Is Roofle free?** Yes. Roofle is free and open source. You pay only your model provider, or nothing with a local model.',
    '## Keep meeting notes in the same place as the rest',
    'Pick a Markdown app you can leave, then add a meeting tool that gives you text you own. [Download Roofle](/), connect a model with the [setup guide](/docs/connect-ai-model), and paste your next meeting\'s decisions into your vault.',
  ],
}
