// Add a post: push an object here. Newest first.
// `body` items: a paragraph string, '## Heading', or a table { head, rows }.
export type Table = { head: string[]; rows: string[][]; note?: string }
export type Post = { slug: string; title: string; date: string; description: string; body: (string | Table)[] }

export const POSTS: Post[] = [
  {
    slug: 'what-roofle-costs',
    title: 'What Roofle costs',
    date: '2026-11-05',
    description: 'Roofle is free and open source. Here is what you pay for, and what you do not.',
    body: [
      'Roofle is a free, [open-source meeting copilot](https://github.com/roofle-ai/roofle) for your Mac. There is no subscription and no account. Speech to text runs on your Mac, so there is no transcription bill either.',
      'The only cost is the LLM that writes your notes and suggests questions. You choose it, so you control what you spend. Here is what to expect, and how to keep it low.',
      '## What you pay for, and what you do not',
      'Roofle has two jobs. First it turns speech into text, and that happens [on your Mac](/privacy), so it costs nothing. Second it sends the text to a language model that writes [live notes, suggested questions and action items](/features). That second step is the only one with a price, and you pay your model provider directly.',
      'Roofle works with any OpenAI-compatible model, including local ones, so you are not tied to one vendor. The [setup guide](/docs/connect-ai-model) shows how to connect one.',
      '## Rough cost for a 30-minute conversation',
      'These are estimates with default settings. Your real cost depends on how much is said and which model you pick.',
      {
        head: ['Model', 'Cost per 30 minutes', 'Best for'],
        rows: [
          ['Local LLM', 'Free', 'Full privacy, no API bill'],
          ['gpt-4o-mini', '0.05 to 0.10 cents', 'Everyday meetings, lowest cost'],
          ['claude-sonnet-5.5', '$0.30 to $0.50', 'High-stakes calls, best quality'],
        ],
        note: 'Estimates only. Check your provider for current pricing.',
      },
      '## What the extra cost buys you',
      'A bigger model costs more because it reads the conversation more carefully. In a meeting, that shows up in three places.',
      '**Follow-up questions.** Smaller models suggest sensible questions. Larger models are better at spotting what was left unsaid and asking the question that moves the conversation forward.',
      '**Action items and dates.** Larger models are more reliable at picking out who owns what, and by when, from a messy back and forth.',
      '**Notes.** Both write usable notes. The larger model tends to keep nuance and tone, where the smaller one stays closer to a plain summary.',
      '## Ways to keep the bill low',
      '**Use a cheaper model for routine calls.** Stand-ups and quick check-ins do not need the most capable model.',
      '**Run a local model.** A model running on your Mac has no per-meeting cost, and the text never leaves your machine. See how Roofle handles [privacy](/privacy).',
      '**Start the copilot only when you need it.** You pay for the text sent to the model, so a 30-minute call costs about half of a 60-minute one. The [quick start](/docs/start-a-meeting) covers starting a session.',
      '## Which one should you pick?',
      'Start with gpt-4o-mini. At a tenth of a cent or so per meeting it is cheap enough to use on every call, and it is good enough for most of them.',
      'Switch to claude-sonnet-5.5 for the calls that matter: a sales negotiation, a customer interview, a hiring panel. Thirty to fifty cents is small next to what a missed follow-up costs.',
      'If nothing may leave your Mac, run a local LLM. It costs nothing per meeting. Quality depends on the model and your hardware.',
      '## Who this matters for',
      'If you run many calls a week, the cost adds up, so the model choice matters most for [sales](/use-cases/sales), [recruiting](/use-cases/recruiter) and [customer success](/use-cases/customer-success), where a day can hold a dozen conversations. [Founders](/use-cases/founder) and [product managers](/use-cases/product-manager) often have fewer, higher-stakes calls, where a stronger model is easy to justify.',
      '## Get started',
      'Download Roofle, connect a model with your own API key, and run the connection test in Settings. Check the [docs](/docs) if you get stuck. Roofle needs an Apple Silicon Mac running macOS 13 or newer. Pricing from providers changes, so check their pages before you rely on these estimates.',
    ],
  },
]
