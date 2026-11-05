export const features: [string, string][] = [
  ['Live transcription', 'Every word, as it is said. Your mic and the call, on one screen.'],
  ['Live notes', 'Notes write themselves while you talk. Nothing to type.'],
  ['Suggests what to ask next', 'A gentle nudge with the right question, at the right moment.'],
  ['1-click prompts', 'Recap, follow-up or action items. One tap each.'],
  ['Works for your role', 'Pick your role once. Notes and questions fit your job.'],
  ['Conversations by topic', 'Every conversation is filed under a topic. Find it in seconds.'],
]

export const DETAIL: Record<string, [string, string?]> = {
  'Live transcription': ['Roofle listens to your microphone and the system audio at the same time and shows each line as it is spoken. Every line is tagged by source, so you can tell who said what. Speech recognition runs on your Mac.', '/live-transcription.gif'],
  'Live notes': ['One short notes document that is rewritten as the conversation moves. It holds a summary, key points, decisions and action items, so you never have to take notes yourself.', '/live-notes.gif'],
  'Suggests what to ask next': ['Roofle spots gaps and vague points while the conversation is still live. A notification suggests the question and jumps to the exact line it came from.', '/notification.gif'],
  '1-click prompts': ['Ready-made prompts for the things you do most: a recap of the last 30 seconds, follow-up action items after the call, and more. One click each, nothing to write.', '/one-click-follow-up.gif'],
  'Works for your role': ['Tell Roofle your role once, such as product owner, engineer or sales. Notes, questions and follow-ups are then shaped for what matters in your job.'],
  'Conversations by topic': ['Past conversations are grouped by topic instead of one long list. Find an earlier discussion in seconds and pick up where you left off.'],
}
