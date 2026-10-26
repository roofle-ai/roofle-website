import type { UseCase } from '.'

const productManager: UseCase = {
  slug: 'product-manager',
  role: 'Product Manager',
  short: 'User interviews, planning and stakeholder syncs.',
  headline: 'Capture what users say and ask what they did not.',
  intro: 'Roofle listens to user interviews and planning sessions, keeps live notes, and points out the claims you have not dug into yet.',
  moments: [
    ['User interviews', 'Flags the vague statements worth probing, like "it is kind of slow".'],
    ['Planning sessions', 'Keeps decisions, owners and open questions in one running document.'],
    ['Stakeholder syncs', 'Pulls out the dates and commitments that were agreed.'],
  ],
  questions: [
    'Can you walk me through the last time that happened?',
    'What did you do instead?',
    'Who owns this decision?',
  ],
  outcomes: [
    ['Cleaner research notes', 'Live notes rewritten as the conversation moves.'],
    ['Decisions on record', 'Decisions and action items captured while they are made.'],
    ['Better probing', 'Suggested questions push past surface answers.'],
  ],
}
export default productManager
