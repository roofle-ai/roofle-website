import type { UseCase } from '.'

const customerSuccess: UseCase = {
  slug: 'customer-success',
  role: 'Customer Success',
  short: 'Check-ins, renewals and escalations.',
  headline: 'Hear the risk before it becomes churn.',
  intro: 'Roofle listens for hesitation and open issues during customer calls, suggests what to ask next, and turns commitments into follow-ups.',
  moments: [
    ['Check-ins', 'Keeps track of what the customer said is working and what is not.'],
    ['Renewals', 'Flags unresolved concerns and who needs to sign off.'],
    ['Escalations', 'Records the commitments you made so you can follow through.'],
  ],
  questions: [
    'What would make this more useful for your team?',
    'Who else is involved in the renewal?',
    'What is the biggest blocker right now?',
  ],
  outcomes: [
    ['Commitments tracked', 'Action items come straight from the call.'],
    ['Concerns stay visible', 'Unanswered questions do not get lost.'],
    ['Consistent follow-up', 'Notes are ready to share with your team.'],
  ],
}
export default customerSuccess
