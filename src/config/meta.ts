import { faqs } from '@/components/site-shell'

import { routeFor } from './routes'
import { SITE, canonicalFor, titleFor } from './site'

export type Head = {
  title: string
  description: string
  canonical: string
  noindex: boolean
  jsonLd: object[]
}

/** Describes the business itself; repeated on every page so any entry point carries it. */
function organisation() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    areaServed: SITE.areaServed,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
  }
}

function faqPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/** A page may override the route table's defaults by rendering its own <Seo />. */
export type HeadOverride = { title?: string; description?: string }

export function headFor(pathname: string, override: HeadOverride = {}): Head {
  const route = routeFor(pathname)
  const jsonLd: object[] = [organisation()]
  if (route.path === '/faqs') jsonLd.push(faqPage())

  return {
    title: titleFor(override.title ?? route.title),
    description: override.description ?? route.description,
    canonical: canonicalFor(route.path === '*' ? pathname : route.path),
    noindex: Boolean(route.noindex),
    jsonLd,
  }
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Serialises a head into markup for the prerenderer, so crawlers and link scrapers see it without running JS. */
export function renderHeadTags(head: Head) {
  const meta: string[] = [
    `<title>${escapeAttribute(head.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(head.description)}" />`,
    `<link rel="canonical" href="${escapeAttribute(head.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttribute(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${escapeAttribute(head.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(head.description)}" />`,
    `<meta property="og:url" content="${escapeAttribute(head.canonical)}" />`,
    `<meta property="og:image" content="${escapeAttribute(SITE.url + SITE.ogImage)}" />`,
    `<meta name="twitter:card" content="${SITE.twitterCard}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(SITE.url + SITE.ogImage)}" />`,
    `<meta name="twitter:title" content="${escapeAttribute(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(head.description)}" />`,
  ]

  if (head.noindex) meta.push('<meta name="robots" content="noindex, follow" />')

  for (const block of head.jsonLd) {
    meta.push(
      `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`,
    )
  }

  return meta.join('\n    ')
}
