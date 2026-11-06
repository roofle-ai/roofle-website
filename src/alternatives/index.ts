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
]
export const altBySlug = (slug: string) => ALTERNATIVES.find(a => a.slug === slug)
