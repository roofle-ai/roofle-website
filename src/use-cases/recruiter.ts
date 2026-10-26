import type { UseCase } from '.'

const recruiter: UseCase = {
  slug: 'recruiter',
  role: 'Recruiter',
  short: 'Screens, interviews and candidate debriefs.',
  headline: 'Stay in the conversation, not in your notes.',
  intro: 'Roofle keeps track of what the candidate said while you focus on them. It nudges you toward the questions you have not covered yet.',
  moments: [
    ['Screening calls', 'Captures experience, availability and salary expectations as they come up.'],
    ['Interviews', 'Surfaces vague answers worth a follow-up question.'],
    ['Hiring manager syncs', 'Gives you clear notes and action items for the debrief.'],
  ],
  questions: [
    'What was your specific role in that project?',
    'What are you looking for in your next team?',
    'What does your notice period look like?',
  ],
  outcomes: [
    ['Consistent notes', 'Every candidate is captured the same way.'],
    ['Fewer missed topics', 'Gaps are flagged before the call ends.'],
    ['Quick debriefs', 'Notes and action items are ready straight away.'],
  ],
}
export default recruiter
