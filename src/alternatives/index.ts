// Add a competitor: push an object here. Routes, sitemap and footer pick it up.
// Keep claims factual and re-check them against the competitor's site before each release.
export type Alternative = {
  slug: string
  name: string
  headline: string
  intro: string
  rows: [string, string, string][] // [feature, competitor, Roofle]
  chooseThem: string[] // honest "stay with them if..."
  chooseRoofle: string[]
  sections?: [string, string][] // optional long-form [heading, paragraph]
  faq?: [string, string][] // optional [question, answer]
}

export const CHECKED = 'November 2026'

export const ALTERNATIVES: Alternative[] = [
  {
    slug: 'granola',
    name: 'Granola',
    headline: 'The Granola alternative built around your role, free and open source.',
    intro: 'Granola is a polished Mac notepad that works without a bot. Roofle shares that idea, then adds suggested follow-up questions during the call, local speech recognition and open source code.',
    rows: [
      ['Joins your call as a bot', 'No', 'No'],
      ['Speech recognition', 'Cloud', 'On your Mac'],
      ['Suggested follow-up questions during the call', 'No', 'Yes'],
      ['Built around your role', 'Generic summaries', 'Pick sales, recruiter, PM, founder, CS or engineer and get questions and notes tuned to that job'],
      ['AI model', 'Provided by Granola', 'Your own API key or a local model'],
      ['Open source', 'No', 'Yes'],
      ['Cost', 'Monthly subscription after the free tier', 'App is free. You pay your model provider, about $0.05 to $0.10 per 30-minute call with GPT-4o mini, or nothing with a local model'],
      ['Platforms', 'Mac, Windows and iOS', 'Apple Silicon Mac (Windows coming soon)'],
    ],
    chooseThem: ['You need Windows or iPhone today.', 'You want a managed product with team sharing and integrations.'],
    chooseRoofle: ['You want questions and notes tuned to your job, not a generic summary.', 'You want audio kept on your Mac.', 'You want questions suggested while you are still talking.', 'You want to read the code, or run a fully local model.'],
  },
  {
    slug: 'otter',
    name: 'Otter',
    headline: 'An Otter alternative tuned to your role, with no bot.',
    intro: 'Otter is a cloud transcription service built for teams, and its assistant joins your meetings. Roofle listens from your Mac menu bar instead, so nobody extra joins and your audio stays put.',
    rows: [
      ['Joins your call as a bot', 'Yes, or can capture from your device', 'No'],
      ['Speech recognition', 'Cloud', 'On your Mac'],
      ['Suggested follow-up questions during the call', 'No', 'Yes'],
      ['Built around your role', 'Generic summaries', 'Pick sales, recruiter, PM, founder, CS or engineer and get questions and notes tuned to that job'],
      ['Where transcripts live', 'Otter cloud account', 'Your Mac'],
      ['Open source', 'No', 'Yes'],
      ['Cost', 'Monthly subscription after the free tier', 'App is free. You pay your model provider, about $0.05 to $0.10 per 30-minute call with GPT-4o mini, or nothing with a local model'],
      ['Team sharing and integrations', 'Yes', 'Not yet'],
    ],
    chooseThem: ['Your team needs shared workspaces and a searchable cloud archive.', 'You need Windows, mobile or in-person recording today.'],
    chooseRoofle: ['You want help tuned to your role, not a generic transcript.', 'You do not want a bot in the room.', 'Your security team cares where recordings end up.', 'You want live coaching, not only a recap.'],
  },
  {
    slug: 'fireflies',
    name: 'Fireflies',
    headline: 'A Fireflies alternative built for your role. No bot, no upload.',
    intro: 'Fireflies sends a notetaker into your meetings and processes the recording in the cloud. Roofle runs privately on your Mac, with nothing to invite and nothing uploaded.',
    rows: [
      ['Joins your call as a bot', 'Yes', 'No'],
      ['Speech recognition', 'Cloud', 'On your Mac'],
      ['Suggested follow-up questions during the call', 'No', 'Yes'],
      ['Built around your role', 'Generic summaries', 'Pick sales, recruiter, PM, founder, CS or engineer and get questions and notes tuned to that job'],
      ['Where recordings live', 'Fireflies cloud account', 'Your Mac'],
      ['Open source', 'No', 'Yes'],
      ['Cost', 'Monthly subscription after the free tier', 'App is free. You pay your model provider, about $0.05 to $0.10 per 30-minute call with GPT-4o mini, or nothing with a local model'],
      ['CRM and team integrations', 'Yes', 'Not yet'],
    ],
    chooseThem: ['You want automatic CRM sync and team-wide analytics.', 'You record meetings you do not attend.'],
    chooseRoofle: ['You want help tuned to your role, not a generic summary.', 'Clients are uneasy about a bot on the call.', 'You want recordings to stay off third-party servers.', 'You want help asking better questions in the moment.'],
  },
  {
    slug: 'rev',
    name: 'Rev',
    headline: 'The best Rev alternative for live meetings: free, private and built around your role.',
    intro: 'Rev is a transcription company: you upload a recording and get back an AI or human-made transcript, and its AI notetaker bot can join your calls. Roofle is a free, open source Mac app that transcribes on your Mac while the meeting happens, then writes notes and suggests follow-up questions. If you searched for a Rev alternative because of price, bots in meetings or privacy, Roofle is built for exactly that.',
    rows: [
      ['What it is', 'Transcription service with an AI notetaker and a human transcript option', 'Live meeting copilot that runs from your Mac menu bar'],
      ['Joins your call as a bot', 'Yes, with its notetaker bot (it can also transcribe uploaded files)', 'No'],
      ['Speech recognition', 'Cloud', 'On your Mac'],
      ['Human-reviewed transcripts', 'Yes, paid per audio minute', 'No (AI only)'],
      ['Suggested follow-up questions during the call', 'No', 'Yes'],
      ['Built around your role', 'Generic summaries and templates', 'Pick sales, recruiter, PM, founder, CS or engineer and get questions and notes tuned to that job'],
      ['Where recordings live', 'Rev cloud account', 'Your Mac'],
      ['AI model', 'Provided by Rev', 'Your own API key or a local model'],
      ['Open source', 'No', 'Yes (MIT)'],
      ['Cost', 'Subscription plus per-minute fees for human transcripts', 'App is free. You pay your model provider, about $0.05 to $0.10 per 30-minute call with GPT-4o mini, or nothing with a local model'],
      ['Platforms', 'Web, mobile and API', 'Apple Silicon Mac (Windows coming soon)'],
    ],
    chooseThem: ['You need human-verified transcripts for legal, medical, media or captioning work.', 'You mostly transcribe files you already recorded, in many languages.', 'You need a transcription API for your own product.', 'You want a managed cloud workspace for a team.'],
    chooseRoofle: ['You want a free Rev alternative for live meetings and calls.', 'You do not want a bot joining client calls.', 'You want audio and transcripts to stay on your Mac.', 'You want questions suggested while the conversation is still happening, not just a transcript afterwards.', 'You want to read the code or run a fully local model.'],
    sections: [
      ['What is Rev, and what is it best at?', 'Rev is a transcription and captioning company. Its core products are AI transcripts, human-made transcripts, captions and foreign subtitles, plus an AI notetaker for meetings and a speech-to-text API for developers. Rev is strongest when accuracy must be certified by a person, such as legal, medical, journalism and media work. Rev is not a live copilot: it does not coach you with follow-up questions while the call is still going.'],
      ['Why do people look for a Rev alternative?', 'Three reasons come up most. First, price: per-minute human transcription and monthly subscriptions add up fast for frequent meetings. Second, bots: a notetaker bot in a client call changes the conversation and raises consent questions. Third, privacy: uploading recordings to a third-party cloud is a hard sell for security teams. Roofle answers all three by transcribing on your Mac, adding no bot and costing nothing beyond your own model usage.'],
      ['What are the key features of Roofle?', 'Roofle is a free, open source (MIT) macOS menu-bar meeting copilot. Live transcription captures your microphone and the call audio together, tagged by source, with speech recognition on your Mac. Live notes rewrite themselves as the conversation moves, holding a summary, key points, decisions and action items. Suggested follow-up questions appear as a notification while the person is still talking. One-click prompts produce a recap, follow-up or action items. Role-aware output tunes notes and questions to sales, recruiting, product, founder, customer success or engineering work. Conversations are filed by topic so you can find them later. You bring your own API key or a local model.'],
      ['Which Rev alternative is right for which job?', 'Choose Roofle for live meetings, calls and interviews on a Mac where privacy, cost and a bot-free experience matter. Stay with Rev, or pick another transcription service, when you need human-reviewed transcripts, subtitles for published video, bulk file transcription or a developer API. Many people use both: Roofle for day-to-day conversations, Rev for the occasional recording that must be certified.'],
    ],
    faq: [
      ['What is the best free alternative to Rev?', 'Roofle is a free, open source alternative to Rev for live meeting notes on Mac. The app costs nothing, and you pay only your AI model provider (about $0.05 to $0.10 per 30-minute call with GPT-4o mini) or nothing with a local model.'],
      ['Is there a Rev alternative with no bot?', 'Yes. Roofle runs from your Mac menu bar and captures audio on your device, so no notetaker joins the call and nobody needs to be invited.'],
      ['Does Roofle offer human transcription like Rev?', 'No. Roofle is AI only. If you need a human-verified transcript, Rev or another human transcription service is the better fit.'],
      ['Is Roofle private?', 'Speech recognition runs on your Mac and notes are stored locally. With a local LLM, no data leaves your machine. With a cloud model, only text is sent to the provider you choose.'],
      ['Can Roofle transcribe uploaded audio files?', 'Roofle is designed for live conversations on your Mac, not bulk file upload. For batch transcription of existing recordings, use a file-based service such as Rev.'],
      ['What does Roofle cost compared with Rev?', 'The Roofle app is free. Typical model cost is about $0.05 to $0.10 per 30-minute call with GPT-4o mini. Rev charges subscription and per-minute fees, so check rev.com for current prices.'],
      ['Does Roofle work on Windows or iPhone?', 'Not yet. Roofle currently supports Apple Silicon Macs, with Windows coming soon.'],
    ],
  },
]
export const altBySlug = (slug: string) => ALTERNATIVES.find(a => a.slug === slug)
