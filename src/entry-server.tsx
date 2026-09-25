import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

import { HeadCollector } from './components/seo'
import App from './App'
import { headFor, renderHeadTags, type HeadOverride } from './config/meta'

export { indexableRoutes } from './config/routes'
export { SITE } from './config/site'

/** Renders one route to static markup plus the head tags that belong with it. */
export function render(path: string) {
  // Any <Seo /> in the tree fills this in while rendering; we read it once rendering is done.
  const collected: HeadOverride = {}

  const html = renderToString(
    <HeadCollector.Provider value={collected}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </HeadCollector.Provider>,
  )

  return { html, head: renderHeadTags(headFor(path, collected)) }
}
