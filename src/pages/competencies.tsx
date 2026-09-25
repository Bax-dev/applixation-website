import { Check } from 'lucide-react'

import { AwsPartnerBadge } from '@/components/aws-logo'
import { ParallaxFigure } from '@/components/media'
import { CTA, PageIntro, sectionClass } from '@/components/site-shell'
const groups = [
  {
    title: 'AWS architecture',
    lead: 'The structural decisions that are expensive to revisit: how environments are separated, how workloads connect, and how the whole thing is meant to grow.',
    items: ['Well-Architected reviews', 'Migration & modernisation', 'Serverless & containers', 'Networking & landing zones'],
  },
  {
    title: 'Data engineering',
    lead: 'Moving data from where it is created to where it is needed, in a shape people can trust and a form the business can question.',
    items: ['Data lakes & warehouses', 'Streaming pipelines', 'Data governance', 'Business intelligence'],
  },
  {
    title: 'Engineering excellence',
    lead: 'The practices that decide whether a good architecture stays good: how work reaches production, and how quickly you know when something is wrong.',
    items: ['DevOps & CI/CD', 'Platform engineering', 'Observability', 'SRE practices'],
  },
  {
    title: 'Security & FinOps',
    lead: 'The two disciplines that quietly determine how long a platform survives contact with the real world: what it exposes, and what it costs.',
    items: ['Identity & access', 'Threat detection', 'Cost visibility', 'Resilience testing'],
  },
]
export default function CompetenciesPage() { return <main><PageIntro eyebrow="Competencies" title="Deep where it matters." text="Our specialists bring the breadth of a partner and the depth of a focused engineering team." /><section className={sectionClass}><ParallaxFigure src="/images/capability-data.jpg" alt="An analytics dashboard of charts on a dark screen" className="mb-16 aspect-[21/9] rounded-2xl" tint="navy" /><div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">{groups.map((group, i) => <article key={group.title} className="bg-card p-8 lg:p-10"><span className="text-sm text-orange">0{i + 1}</span><h2 className="mt-14 text-2xl font-medium tracking-[-0.04em] text-navy">{group.title}</h2><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{group.lead}</p><ul className="mt-8 flex flex-col gap-4 border-t border-border pt-6">{group.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground"><Check className="size-4 text-orange" />{item}</li>)}</ul></article>)}</div><div className="mt-14 flex flex-wrap items-center gap-6 border-t border-border pt-10"><AwsPartnerBadge tone="light" /><p className="max-w-md text-sm leading-6 text-muted-foreground">Every competency above is held by named engineers with current certifications, not by the company in the abstract.</p></div></section><CTA /></main> }
