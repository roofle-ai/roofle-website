import type { UseCase } from '.'

const softwareProfessional: UseCase = {
  slug: 'software-professional',
  role: 'Software Professional',
  short: 'Requirements, standups, design reviews and 1:1s.',
  headline: 'Capture the decisions, skip the meeting minutes.',
  intro: 'Roofle listens through requirements calls, design reviews and standups, keeps live notes, and flags the vague points that cause rework later.',
  moments: [
    ['Requirements calls', 'Flags unclear scope and unstated assumptions while stakeholders are still talking.'],
    ['Design and code reviews', 'Records the decisions made and who owns each follow-up.'],
    ['Standups and 1:1s', 'Keeps blockers, commitments and action items in one short document.'],
  ],
  questions: [
    'What does done look like for this?',
    'Who owns this decision?',
    'What happens if that dependency slips?',
  ],
  outcomes: [
    ['Fewer misunderstandings', 'Open questions stay visible until they are answered.'],
    ['Decisions on record', 'Notes and action items are captured as they are made.'],
    ['Private by design', 'Speech recognition and storage stay on your Mac.'],
  ],
}
export default softwareProfessional
