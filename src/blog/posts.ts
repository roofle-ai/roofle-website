// Add a post: create articles/<slug>.ts exporting `post`, then add it to the top of POSTS (newest first).
// `body` items: a paragraph string, '## Heading', a table { head, rows }, or an image { src, alt, caption }.
import type { Post } from './types'
export type { Table, Img, Post } from './types'
import { post as howToCheckTokenConsumption } from './articles/how-to-check-token-consumption-in-roofle'
import { post as localMeetingNotesAppsCompared } from './articles/local-meeting-notes-apps-compared'
import { post as whyMeetingNotesToolsImportant2026 } from './articles/why-meeting-notes-tools-became-important-in-2026'
import { post as roofleForPmsAndBas } from './articles/roofle-for-product-managers-and-business-analysts'
import { post as doMeetingNotesNeedTheCloud } from './articles/do-meeting-notes-need-the-cloud'
import { post as openSourceAlternativesToGranolaAndOtter } from './articles/open-source-alternatives-to-granola-and-otter'
import { post as howToOrganizeMeetingNotes } from './articles/how-to-organize-meeting-notes'
import { post as runTranscriptionModelOnMac2026 } from './articles/run-transcription-model-on-mac-2026'
import { post as whyAiMeetingNotesAreNotEnough } from './articles/why-ai-meeting-notes-are-not-enough'
import { post as whatRoofleCosts } from './articles/what-roofle-costs'

export const POSTS: Post[] = [howToCheckTokenConsumption, localMeetingNotesAppsCompared, whyMeetingNotesToolsImportant2026, roofleForPmsAndBas, doMeetingNotesNeedTheCloud, openSourceAlternativesToGranolaAndOtter, howToOrganizeMeetingNotes, runTranscriptionModelOnMac2026, whyAiMeetingNotesAreNotEnough, whatRoofleCosts]
