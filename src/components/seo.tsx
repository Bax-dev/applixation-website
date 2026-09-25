import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { headFor, type HeadOverride } from '@/config/meta'
import { SITE } from '@/config/site'

/**
 * During prerendering there is no DOM to write to, so <Seo /> reports its values
 * through this collector instead and the server entry reads them after rendering.
 */
export const HeadCollector = createContext<HeadOverride | null>(null)

function upsert(selector: string, create: () => HTMLElement) {
  let tag = document.head.querySelector<HTMLElement>(selector)
  if (!tag) {
    tag = create()
    document.head.appendChild(tag)
  }
  return tag
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  const tag = upsert(`meta[${attribute}="${key}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute(attribute, key)
    return el
  })
  tag.setAttribute('content', content)
}

/**
 * Keeps the head in step with client-side navigation. The same values are baked into the
 * prerendered HTML at build time, so crawlers that never run JS still see them.
 */
export function Seo({ title, description }: HeadOverride = {}) {
  const { pathname } = useLocation()
  const collector = useContext(HeadCollector)

  if (collector) {
    if (title) collector.title = title
    if (description) collector.description = description
  }

  useEffect(() => {
    const head = headFor(pathname, { title, description })

    document.title = head.title
    setMeta('name', 'description', head.description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE.name)
    setMeta('property', 'og:locale', SITE.locale)
    setMeta('property', 'og:title', head.title)
    setMeta('property', 'og:description', head.description)
    setMeta('property', 'og:url', head.canonical)
    setMeta('property', 'og:image', SITE.url + SITE.ogImage)
    setMeta('name', 'twitter:card', SITE.twitterCard)
    setMeta('name', 'twitter:image', SITE.url + SITE.ogImage)
    setMeta('name', 'twitter:title', head.title)
    setMeta('name', 'twitter:description', head.description)

    const canonical = upsert('link[rel="canonical"]', () => {
      const el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      return el
    })
    canonical.setAttribute('href', head.canonical)

    const robots = document.head.querySelector('meta[name="robots"]')
    if (head.noindex) setMeta('name', 'robots', 'noindex, follow')
    else robots?.remove()

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((node) => node.remove())
    for (const block of head.jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seoJsonld = ''
      script.textContent = JSON.stringify(block)
      document.head.appendChild(script)
    }
  }, [pathname, title, description])

  return null
}
