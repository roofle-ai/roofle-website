import type { ComponentType } from 'react'
import ConnectModel from './ConnectModel'
import Overview from './Overview'
import StartMeeting from './StartMeeting'

/** path -> page component. Keep in step with ../meta.ts. */
export const DOC_ROUTES: Record<string, ComponentType> = {
  '/docs': Overview,
  '/docs/start-a-meeting': StartMeeting,
  '/docs/connect-ai-model': ConnectModel,
}
