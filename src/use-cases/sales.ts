import type { UseCase } from '.'

const sales: UseCase = {
  slug: 'sales',
  role: 'Sales',
  short: 'Discovery calls, demos and follow-ups.',
  headline: 'Run sharper discovery calls without taking notes.',
  intro: 'Roofle listens while you sell. It flags the vague answers and open gaps, suggests the next question, and has your follow-ups ready when the call ends.',
  moments: [
    ['Discovery calls', 'Spots budget, timeline and decision-maker gaps while the prospect is still talking.'],
    ['Demos', 'Keeps a running list of what the buyer cared about so your recap is specific.'],
    ['Pricing conversations', 'Highlights the figures and dates mentioned, so nothing gets misquoted later.'],
  ],
  questions: [
    'Who else needs to approve this?',
    'What happens if you do nothing this quarter?',
    'When does the budget review take place?',
  ],
  outcomes: [
    ['Fewer unanswered questions', 'Open items stay visible until the prospect answers them.'],
    ['Follow-ups in one click', 'Action items are ready the moment the call ends.'],
    ['No bot on the call', 'Prospects see you, not a note-taker.'],
  ],
}
export default sales
