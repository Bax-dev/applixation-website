import { ArrowLink, CTA, PageIntro, sectionClass } from '@/components/site-shell'

export default function NotFoundPage() {
  return <main><PageIntro eyebrow="404" title="This page has moved on." text="The page you were looking for is not here. Let us point you somewhere useful." /><section className={sectionClass}><ArrowLink href="/">Back to the homepage</ArrowLink></section><CTA /></main>
}
