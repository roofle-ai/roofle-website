import { renderToString } from 'react-dom/server'
import App from './App'

// Used by the prerender plugin in vite.config.ts. App reads location.pathname at render time.
export function render(path: string) {
  ;(globalThis as { location?: unknown }).location = { pathname: path, hash: '', search: '' }
  return renderToString(<App />)
}
