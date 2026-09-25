import { Cloud, Database, Gauge, LockKeyhole, Workflow } from 'lucide-react'
import { AwsLogo } from '@/components/aws-logo'
import { ParallaxFigure } from '@/components/media'
import { CTA, PageIntro, sectionClass } from '@/components/site-shell'

const services = [
  {
    icon: Cloud,
    title: 'Cloud strategy & migration',
    text: 'A clear, phased path to AWS—from first workload to a cloud operating model built for scale.',
    detail: 'We start with the business case, not the inventory. That means understanding which systems carry real weight, which can be retired, and which need to change shape before they move. The result is a sequence you can fund, staff and defend.',
    includes: ['Landing zones & networking', 'Migration & modernisation', 'Well-Architected reviews'],
    aws: ['Control Tower', 'Organizations', 'Transit Gateway', 'Application Migration Service', 'DMS'],
  },
  {
    icon: Workflow,
    title: 'Modern application delivery',
    text: 'Product engineering, platform thinking, and DevOps practices that help teams ship with confidence.',
    detail: 'Shipping slowly is rarely a people problem. It is usually a path problem: too many handoffs, too little feedback, too much ceremony around release. We shorten that path and make the safe way the easy way.',
    includes: ['Platform engineering', 'DevOps & CI/CD', 'Serverless & containers'],
    aws: ['ECS', 'EKS', 'Lambda', 'Step Functions', 'CodePipeline', 'CloudFormation'],
  },
  {
    icon: Database,
    title: 'Data platforms & AI',
    text: 'Foundations for analytics and intelligent experiences that make your data useful, not just available.',
    detail: 'Most organisations do not have a data shortage. They have a trust shortage: numbers that disagree, pipelines nobody owns, reports that arrive too late to change anything. We build foundations people are willing to act on.',
    includes: ['Data lakes & warehouses', 'Streaming pipelines', 'Analytics & AI readiness'],
    aws: ['S3', 'Glue', 'Redshift', 'Athena', 'Kinesis', 'SageMaker', 'Bedrock'],
  },
  {
    icon: LockKeyhole,
    title: 'Security & resilience',
    text: 'Guardrails, observability, and tested recovery plans that protect the business while it moves fast.',
    detail: 'Security that blocks delivery gets routed around. We design guardrails teams can work inside, make failure visible early, and test recovery before the day you need it.',
    includes: ['Identity & access', 'Threat detection', 'Business continuity & resilience testing'],
    aws: ['IAM Identity Center', 'GuardDuty', 'Security Hub', 'WAF & Shield', 'Backup'],
  },
  {
    icon: Gauge,
    title: 'FinOps & optimisation',
    text: 'Practical visibility and continuous improvement to make every cloud rand work harder.',
    detail: 'Cloud spend becomes a problem when nobody can explain it. We connect cost to the teams and products that drive it, so the conversation moves from cutting back to spending deliberately.',
    includes: ['Cost visibility & accountability', 'Observability', 'Continuous optimisation'],
    aws: ['Cost Explorer', 'Budgets', 'Compute Optimizer', 'CloudWatch', 'Savings Plans'],
  },
]
export default function ServicesPage() { return <main><PageIntro eyebrow="What we offer" title="Capability that compounds." text="From first principles to final mile, we bring the people and practices that turn technology investment into business advantage." /><section className={sectionClass}><ParallaxFigure src="/images/capability-cloud.jpg" alt="Racks of networking equipment in a data centre aisle" className="mb-16 aspect-[21/9] rounded-2xl" tint="navy" /><div className="grid gap-6">{services.map(({ icon: Icon, title, text, detail, includes, aws }, index) => <article key={title} className="group grid gap-6 border-t border-border py-10 md:grid-cols-[.12fr_1fr_1fr] md:items-start"><span className="text-sm text-orange">0{index + 1}</span><div><Icon className="size-7 text-navy" /><h2 className="mt-5 max-w-xs text-2xl font-medium tracking-[-0.04em] text-navy">{title}</h2></div><div><p className="max-w-xl text-base leading-7 text-navy">{text}</p><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{detail}</p><ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">{includes.map((item) => <li key={item} className="flex items-center gap-2"><span className="size-1 rounded-full bg-orange" />{item}</li>)}</ul><div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border pt-5"><span className="mr-1 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"><AwsLogo className="h-3.5 w-auto text-orange" />built with</span>{aws.map((service) => <span key={service} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-navy">{service}</span>)}</div></div></article>)}</div></section><CTA /></main> }
