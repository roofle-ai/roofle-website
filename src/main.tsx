import { Analytics, track } from '@vercel/analytics/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)

document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest('a, button')
  if (el) track('click', { label: (el.textContent ?? '').trim().slice(0, 50), href: el.getAttribute('href') ?? '' })
})
