// Single source of truth for docs pages. Order here = prev/next order.
// Add a page: append an entry here, create pages/<Name>.tsx, register it in pages/index.ts.
// SEO (title, description, canonical, JSON-LD) and the sitemap are generated from this list.
export type DocMeta = {
  path: string
  title: string // <h1>; the document title becomes "<title> · Roofle"
  description: string // meta description, ~120-160 chars
  intro: string // lead paragraph under the h1
}

export const DOC_PAGES: DocMeta[] = [
  {
    path: '/docs',
    title: 'Roofle documentation',
    description: 'Install Roofle, grant permissions, connect an AI model and run your first conversation. Setup, settings, privacy and troubleshooting.',
    intro: 'Install Roofle, connect an AI model and run your first conversation. Everything below reflects the current release.',
  },
  {
    path: '/docs/start-a-meeting',
    title: 'How to start Roofle for your meeting',
    description: 'Step-by-step: start a new conversation, choose the type and goal, run Roofle during your meeting and stop it. Tips for better notes and questions.',
    intro: 'A step-by-step guide to setting up, running and finishing a conversation, so Roofle gives you useful notes and questions instead of generic ones.',
  },
  {
    path: '/docs/connect-ai-model',
    title: 'Connect an AI model',
    description: 'Connect Roofle to any OpenAI-compatible AI gateway or local model. Base URLs for OpenAI, OpenRouter, Groq, Ollama and more, plus the recommended model.',
    intro: 'Roofle works with any AI gateway and any model that speaks the OpenAI chat API, including models running on your own Mac.',
  },
]

export const docMeta = (path: string) => DOC_PAGES.find(p => p.path === path)!
