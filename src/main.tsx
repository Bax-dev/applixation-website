import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './globals.css'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Routes are prerendered to static HTML at build time, so attach to that markup when it is there.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
