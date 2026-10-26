import type { UseCase } from '.'

const founder: UseCase = {
  slug: 'founder',
  role: 'Founder',
  short: 'Customer calls, investor chats and partner meetings.',
  headline: 'Every call, covered, even when you are stretched thin.',
  intro: 'When you are in back-to-back conversations, Roofle remembers the details and suggests what to ask, so each call counts.',
  moments: [
    ['Customer discovery', 'Notices the problems people mention and suggests how to dig deeper.'],
    ['Investor conversations', 'Captures the figures, asks and next steps from each chat.'],
    ['Partner meetings', 'Keeps a clear list of who agreed to do what.'],
  ],
  questions: [
    'How are you solving this today?',
    'What would make this a must-have for you?',
    'What is the next step on your side?',
  ],
  outcomes: [
    ['Nothing slips', 'Action items are ready after every call.'],
    ['Better customer insight', 'Open questions stay visible until they are answered.'],
    ['Private by design', 'Speech recognition and storage stay on your Mac.'],
  ],
}
export default founder
