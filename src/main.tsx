import { Analytics, track } from '@vercel/analytics/react'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
)
// Prerendered pages ship their HTML in #root; hydrate it. Dev has an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest('a, button')
  if (el) track('click', { label: (el.textContent ?? '').trim().slice(0, 50), href: el.getAttribute('href') ?? '' })
})
