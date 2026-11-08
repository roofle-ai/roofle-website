import type { Post } from '../types'
import { sh } from '../types'

export const post: Post = {
  slug: 'do-meeting-notes-need-the-cloud',
  title: 'Do AI meeting notes really need the cloud? (Nov 2026)',
  date: '2026-11-08',
  description: 'Otter and Granola send your meeting audio or transcript to the cloud. Is that necessary? Here is what the cloud buys you, what it costs, and how to keep your data.',
  body: [
    'Last month I opted out of AI training in my notetaker settings, felt briefly responsible, and then wondered what I had actually changed. My meetings were still leaving my laptop. A switch in a menu had changed what the company may do with them, not where they go.',
    'AI meeting notes do not need the cloud. A meeting notetaker is a tool that captures audio, turns it into text, and summarizes that text into notes, and every one of those three steps can run on a modern laptop. The cloud is a design choice made for the vendor\'s convenience, and sometimes for yours.',
    '## What does the cloud actually do with your meeting?',
    'It helps to see the path your data takes. Cloud notetakers like Otter and Granola move your meeting off your machine at least once, and often twice.',
    sh`CLOUD NOTETAKER (typical)

  Your Mac            Vendor servers             AI provider
  ┌────────┐  audio   ┌────────────────┐  text   ┌──────────┐
  │ Meeting│ ───────▶ │ Transcription  │ ──────▶ │ Summary  │
  │ audio  │          │ + storage      │         │ model    │
  └────────┘          └────────────────┘         └──────────┘
                       copy 1 stored here         copy 2 sent here
                       (you cannot see it)        (under their terms)`,
    'Otter works by joining your call as a bot, so the audio is captured on their side from the start. Granola captures audio on your device, but transcription happens in the cloud, as I covered in [open source alternatives to Granola and Otter](/blog/open-source-alternatives-to-granola-and-otter). Different mechanics, same destination.',
    '## Does turning off AI training fix the problem?',
    'Partly. Opting out of training stops your meetings being used to improve the vendor\'s models. That is a real protection and you should switch it on. But it answers one question out of five.',
    {
      head: ['Question', 'Training opt-out answers it?', 'Still true after opting out'],
      rows: [
        ['Is my meeting used to train models?', 'Yes', 'Depends on the vendor\'s current terms'],
        ['Does my audio or text leave my device?', 'No', 'Yes, it is uploaded and processed'],
        ['Who can access the stored copy?', 'No', 'Vendor staff, subprocessors, anyone with a legal request'],
        ['How long is it kept?', 'No', 'Set by the vendor\'s retention policy, not you'],
        ['What happens if the vendor is breached or acquired?', 'No', 'Your archive is part of the asset'],
      ],
      note: 'Check each vendor\'s current privacy policy and data processing terms. They change, and enterprise plans often differ from personal ones.',
    },
    'Notice the pattern. Opting out is a promise about behavior. It is a policy, and policies change, get misread and get overridden by contracts. Keeping the data on your machine is a fact about physics.',
    '## Why do vendors choose the cloud anyway?',
    'Fairness first, because there are real reasons and I do not want to wave them away.',
    '**It is easier to build.** One server stack serves every platform. A local app needs to run well on whatever hardware people own.',
    '**It supports teams.** A shared archive, search across everyone\'s calls and one-click sharing all need a central copy. That is a real product benefit, and it is why Otter keeps its team users.',
    '**It gives better summaries by default.** Large hosted models write better notes than small local ones. I will come back to that, because it is the honest cost of going local.',
    '**It fits subscription revenue.** Servers, storage and model calls are a recurring cost, so the pricing model follows. Your data and your bill are tied together.',
    'None of these reasons is "your audio had to be uploaded." They are reasons the vendor prefers it.',
    '## Can the whole pipeline run on your own machine?',
    'Yes, and it has become practical. The three steps map to three local components.',
    sh`LOCAL NOTETAKER

  Your Mac only
  ┌──────────────────────────────────────────────────────┐
  │ Meeting ──▶ Speech model ──▶ Language model ──▶ Notes│
  │ audio      (Whisper,         (Ollama,           (saved│
  │            Parakeet)          LM Studio)        on disk)
  └──────────────────────────────────────────────────────┘
        nothing crosses the network boundary`,
    'Speech recognition on an Apple Silicon Mac handles clear English well in real time. Models like Whisper and Parakeet run through open tools such as whisper.cpp. Summaries come from a local language model through Ollama or LM Studio. I wrote the step-by-step in [how to run a transcription model on a Mac](/blog/run-transcription-model-on-mac-2026), including an airplane-mode test to prove nothing leaves the machine.',
    '## What do you give up by going local?',
    'Three honest costs.',
    '**Summary quality.** A small local model writes plainer notes than a large hosted one. Action items and decisions come out fine. Nuance and tone come out flatter. This is the gap you will feel most.',
    '**Team sharing.** There is no central archive. You export or paste notes where the team already works, which is more manual.',
    '**Setup and hardware.** You need a recent Mac with enough memory, and a few minutes to download models. Cloud tools work the moment you sign up.',
    'I would not pretend these costs are small. For a team that needs one shared record, they can be decisive. For one person whose calls contain client names, health details, salaries or unreleased plans, they are usually a fair price.',
    '## Where is the middle ground?',
    'You do not have to choose between all cloud and all local. Separate the two models and decide each one on its own.',
    {
      head: ['Setup', 'Where audio goes', 'Where text goes', 'Best for'],
      rows: [
        ['Cloud notetaker (Otter, Granola)', 'Vendor servers', 'Vendor and its AI providers', 'Shared team archives, zero setup'],
        ['Local speech + hosted LLM', 'Stays on your Mac', 'The provider you chose, via your own key', 'Good notes, audio never uploaded'],
        ['Local speech + local LLM', 'Stays on your Mac', 'Stays on your Mac', 'Sensitive calls, offline work'],
      ],
      note: 'Keeping raw audio local is the biggest single privacy gain. Transcript text is far less sensitive than a voice recording, though it can still contain secrets.',
    },
    'The middle row is the one most people should consider. Your voice and everyone else\'s voice never get uploaded. Only the text you choose to send reaches a model, under a provider and terms you picked yourself.',
    '## Why do open source alternatives matter here?',
    'Because they turn promises into things you can check. With closed software you trust the privacy page. With open source you, or someone you hire, can read what the app sends and where.',
    'Open source is not automatically private, and I want to be careful about that. A tool can be open source and still ship audio to a cloud API by default. What you gain is the ability to verify, plus the freedom to point it at a local model, and to keep using it if the company disappears.',
    'Three checks work for any tool, open or closed:',
    '**Where does speech recognition run?** On your device, or on their servers.',
    '**Where does text go for summarizing?** Local model, your own API key, or the vendor\'s pipeline.',
    '**What is stored, where, and for how long?** A local file you can delete beats a retention policy.',
    '## How does Roofle handle this?',
    'Roofle is a free, open source meeting copilot for Apple Silicon Macs that transcribes on your device, keeps live notes, and suggests questions while the call is still going. It fits the middle row of the table above. Speech recognition and storage run locally, with transcripts and notes in a SQLite file on your Mac. Notes and questions use any OpenAI-compatible model you point it at, either a cloud model through your own API key or a local one. Transcription works even with no model connected.',
    'It also never joins your call as a bot, so there is no extra participant and no second copy being recorded elsewhere. The [privacy page](/privacy) lists exactly what stays on the device and what is sent when you add a cloud model, and the [guide to connecting a model](/docs/connect-ai-model) covers the local setup.',
    'It is not the right choice for everyone. It needs an Apple Silicon Mac today, with Windows still to come. It does not give a team a shared archive. And if you use a hosted model, the transcript text does go to that provider, so "everything stays local" is only true when you also run a local model. If shared team search is your main need, a cloud tool is the better fit.',
    '## When is the cloud the right answer?',
    'Stay with a cloud notetaker when your whole team works from one shared archive, when the content is low sensitivity, or when you need Windows and phone support today. Those are good reasons.',
    'Move to local or open source when your calls hold client confidential material, regulated data or anything you would not email unencrypted. Also move if a bot on the line changes how people talk, or if per-seat pricing stopped making sense. If your company has a security team, ask them first. They will likely have a view on where recordings may be stored.',
    '## FAQ',
    '**Do Otter and Granola send my meetings to the cloud?** Yes. Otter joins calls as a bot and processes audio on its servers. Granola captures audio on your device but transcribes in the cloud. Both let you limit AI training use, but your data still leaves your machine.',
    '**Does disabling AI training make a meeting notetaker private?** No. It restricts one use of your data. The upload, the stored copy, the retention period and who can access it are governed by separate policies.',
    '**Can AI meeting notes run fully offline?** Yes. Pair a local speech model such as Whisper or Parakeet with a local language model through Ollama or LM Studio. Expect plainer summaries than a hosted model gives you.',
    '**Is local transcription accurate enough?** For clear English on a modern Apple Silicon Mac, usually yes. Accents, crosstalk and poor microphones reduce accuracy in every tool, cloud or local.',
    '**Is open source meeting software automatically private?** No. Open source lets you read and verify what the code does. Privacy still depends on where speech recognition runs and where text is sent.',
    '**What is the best open source alternative to Otter or Granola?** Meetily, Anarlog and Roofle all capture audio without a bot and can run locally. See the [full comparison](/blog/open-source-alternatives-to-granola-and-otter) for who each one suits.',
    '**What is the biggest privacy gain for the least effort?** Keep raw audio on your device. A recording of a voice is more sensitive than the text, so local speech recognition with a hosted model is a sensible first step.',
    '**Do I need to tell people I am transcribing a meeting?** Usually yes. Rules on consent vary by location, so tell participants and check your company policy, whichever tool you use.',
    '## Get started',
    'Open your notetaker\'s settings and answer the three questions above for the tool you use today. If the answers bother you, run one low-stakes meeting through a local setup and compare the notes with your memory. To try it, [download Roofle](/), connect a model using the [setup guide](/docs/connect-ai-model), and see [what it costs](/blog/what-roofle-costs).',
  ],
}
