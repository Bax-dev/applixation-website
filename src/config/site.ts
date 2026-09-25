/** Single source of truth for everything that describes the business to search engines and social scrapers. */
export const SITE = {
  name: 'applixation',
  /** Used to build canonical and Open Graph URLs. Change this if the site ships on another domain. */
  url: 'https://applixation.com',
  defaultTitle: 'applixation — AWS cloud partners',
  description:
    'applixation is an AWS Partner helping ambitious businesses build, modernise, and scale with confidence.',
  email: 'hello@applixation.com',
  locale: 'en_ZA',
  address: {
    street: '205 Rivonia Rd',
    locality: 'Sandton',
    region: 'Gauteng',
    postalCode: '2196',
    country: 'ZA',
  },
  areaServed: 'South Africa',
  /** Square brand icon. A 1200x630 image would render larger in link previews; see twitterCard below. */
  ogImage: '/icon-512.png',
  twitterCard: 'summary',
} as const

export function titleFor(title?: string) {
  return title ? `${title} — ${SITE.name}` : SITE.defaultTitle
}

export function canonicalFor(path: string) {
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`
}
