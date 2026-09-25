import type { ReactElement } from 'react'

import AboutPage from '@/pages/about'
import CaseStudiesPage from '@/pages/case-studies'
import ClientsPage from '@/pages/clients'
import CompetenciesPage from '@/pages/competencies'
import ContactPage from '@/pages/contact'
import FAQsPage from '@/pages/faqs'
import Home from '@/pages/home'
import NotFoundPage from '@/pages/not-found'
import PrivacyPage from '@/pages/privacy'
import ServicesPage from '@/pages/services'
import SolutionsPage from '@/pages/solutions'
import TermsPage from '@/pages/terms'

export type SiteRoute = {
  path: string
  /** Omitted on the home page, which uses the site's default title verbatim. */
  title?: string
  description: string
  element: ReactElement
  /** Excluded from the sitemap and marked noindex. */
  noindex?: boolean
}

/** The router, the meta tags, the prerenderer and the sitemap all read this one table. */
export const routes: SiteRoute[] = [
  {
    path: '/',
    description:
      'applixation is an AWS Partner helping ambitious businesses build, modernise, and scale with confidence. Cloud strategy, modern application delivery, data platforms, security and FinOps.',
    element: <Home />,
  },
  {
    path: '/about',
    title: 'About',
    description:
      'An independent cloud consultancy for organisations ready to move with intent. How applixation works, what we believe, and what it is like to build alongside our team.',
    element: <AboutPage />,
  },
  {
    path: '/services',
    title: 'Services',
    description:
      'Cloud strategy and migration, modern application delivery, data platforms and AI, security and resilience, and FinOps optimisation — built on ECS, EKS, Lambda, Glue, Redshift, GuardDuty and Cost Explorer by a senior AWS Advanced Tier Services Partner team.',
    element: <ServicesPage />,
  },
  {
    path: '/solutions',
    title: 'Solutions',
    description:
      'Repeatable solutions for scaling on AWS, making data useful, changing with confidence, and building a better technology core — delivered with Amazon Redshift, AWS CloudFormation, DMS, Kinesis, WAF, Glue and more.',
    element: <SolutionsPage />,
  },
  {
    path: '/case-studies',
    title: 'Case studies',
    description:
      'Results from teams who made a meaningful move: faster release cycles in financial services, sharper customer data in retail, and dependable platforms in healthcare and logistics.',
    element: <CaseStudiesPage />,
  },
  {
    path: '/clients',
    title: 'Clients',
    description:
      'We work with ambitious organisations across financial services, retail, healthcare and the public sector, from first cloud workload to long-term operating partnership.',
    element: <ClientsPage />,
  },
  {
    path: '/competencies',
    title: 'Competencies',
    description:
      'Depth in AWS architecture, data engineering, engineering excellence, and security and FinOps — the specialist capability behind every applixation engagement.',
    element: <CompetenciesPage />,
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Tell us what you are trying to change and we will bring the right people to the first conversation. Reach applixation in Sandton, Johannesburg.',
    element: <ContactPage />,
  },
  {
    path: '/faqs',
    title: 'FAQs',
    description:
      'What an AWS Partner does, how engagements start, how we work with internal teams, and what support looks like after launch.',
    element: <FAQsPage />,
  },
  {
    path: '/privacy',
    title: 'Privacy policy',
    description:
      'How applixation collects, uses, shares and protects personal information, and the rights you have under POPIA.',
    element: <PrivacyPage />,
  },
  {
    path: '/terms',
    title: 'Terms of use',
    description:
      'The terms that apply to using the applixation website, including content, intellectual property, liability and governing law.',
    element: <TermsPage />,
  },
  {
    path: '*',
    title: 'Page not found',
    description: 'The page you were looking for is not here.',
    element: <NotFoundPage />,
    noindex: true,
  },
]

export const indexableRoutes = routes.filter((route) => !route.noindex)

export function routeFor(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  return routes.find((route) => route.path === path) ?? routes[routes.length - 1]
}
