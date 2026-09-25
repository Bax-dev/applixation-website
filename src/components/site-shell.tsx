import { Link, Outlet } from 'react-router-dom'
import { ArrowUpRight, Menu } from 'lucide-react'

import { AwsLogo } from '@/components/aws-logo'

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/case-studies', label: 'Case studies' },
]

function Logo() {
  return <Link to="/" className="inline-flex items-center" aria-label="applixation — home"><img src="/Logo_White-scaled-2.8.1.png" alt="applixation" width={298} height={22} className="h-4 w-auto sm:h-[18px]" /></Link>
}

function Header() {
  const mobileLinks = links.concat({ href: '/faqs', label: 'FAQs' })
  return <header className="absolute inset-x-0 top-0 z-40"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><Logo /><nav className="hidden items-center gap-7 text-xs text-white/65 md:flex">{links.map((link) => <Link key={link.href} to={link.href} className="transition-colors hover:text-white">{link.label}</Link>)}</nav><div className="hidden items-center gap-3 md:flex"><Link to="/faqs" className="text-xs text-white/65 hover:text-white">FAQs</Link><Link to="/contact" className="group flex items-center gap-2 rounded-full bg-orange px-4 py-2.5 text-xs font-semibold text-navy transition-transform hover:-translate-y-0.5">Talk to us <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></div><details className="group relative md:hidden"><summary className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-white/15 text-white [&::-webkit-details-marker]:hidden"><Menu className="size-4" /></summary><div className="absolute right-0 top-12 w-64 rounded-2xl border border-white/10 bg-navy/95 p-4 shadow-2xl backdrop-blur"><nav className="flex flex-col gap-1">{mobileLinks.map((link) => <Link key={link.href} to={link.href} className="rounded-xl px-3 py-3 text-sm text-white/75 hover:bg-white/10 hover:text-white">{link.label}</Link>)}<Link to="/contact" className="mt-2 rounded-xl bg-orange px-3 py-3 text-center text-sm font-semibold text-navy">Talk to us</Link></nav></div></details></div></header>
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return <div><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange">{heading}</p><div className="flex flex-col gap-3 text-sm text-white/55">{children}</div></div>
}

function Footer() {
  return <footer className="bg-navy px-5 py-12 text-white lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]"><div><Logo /><p className="mt-5 max-w-xs text-sm leading-6 text-white/50">Cloud-native thinking for ambitious businesses. We are an AWS Partner in Johannesburg, working alongside teams who would rather build the right thing than the easy one.</p><div className="mt-7 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"><AwsLogo className="h-6 w-auto text-orange" /><span className="h-5 w-px bg-white/15" /><span className="max-w-[130px] text-[10px] font-semibold uppercase leading-4 tracking-[0.14em] text-white/60">Advanced Tier Services Partner</span></div></div><FooterColumn heading="Explore"><Link to="/about" className="hover:text-white">About</Link><Link to="/services" className="hover:text-white">Services</Link><Link to="/solutions" className="hover:text-white">Solutions</Link><Link to="/competencies" className="hover:text-white">Competencies</Link></FooterColumn><FooterColumn heading="Work"><Link to="/case-studies" className="hover:text-white">Case studies</Link><Link to="/clients" className="hover:text-white">Clients</Link><Link to="/faqs" className="hover:text-white">FAQs</Link></FooterColumn><FooterColumn heading="Connect"><Link to="/contact" className="hover:text-white">Start a conversation</Link><a href="mailto:hello@applixation.com" className="hover:text-white">hello@applixation.com</a><span>LinkedIn</span></FooterColumn><FooterColumn heading="Office"><p className="max-w-[170px] leading-6">205 Rivonia Rd<br />Sandton, 2196<br />South Africa</p></FooterColumn></div><div className="flex flex-col gap-4 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} applixation. All rights reserved. AWS and the AWS logo are trademarks of Amazon.com, Inc.</p><div className="flex gap-5"><Link to="/privacy" className="hover:text-white">Privacy</Link><Link to="/terms" className="hover:text-white">Terms</Link></div></div></div></footer>
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <section className="bg-navy px-5 pb-20 pt-36 text-white lg:px-8 lg:pb-28 lg:pt-44"><div className="mx-auto max-w-7xl"><p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange">{eyebrow}</p><h1 className="max-w-4xl text-5xl font-medium leading-[0.96] tracking-[-0.065em] sm:text-6xl lg:text-8xl">{title}</h1>{text && <p className="mt-8 max-w-xl text-base leading-7 text-white/55 lg:text-lg">{text}</p>}</div></section>
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link to={href} className="group inline-flex items-center gap-2 text-sm font-semibold text-orange">{children}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
}

export const sectionClass = 'mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28'

export function Stat({ value, label }: { value: string; label: string }) { return <div><p className="text-4xl font-medium tracking-[-0.05em] text-navy lg:text-5xl">{value}</p><p className="mt-2 max-w-[150px] text-sm leading-5 text-muted-foreground">{label}</p></div> }

export function CTA() { return <section className="bg-orange px-5 py-16 text-navy lg:px-8 lg:py-24"><div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-navy/55">Ready when you are</p><h2 className="max-w-2xl text-4xl font-medium leading-none tracking-[-0.06em] lg:text-6xl">Build what&apos;s next.</h2></div><Link to="/contact" className="group inline-flex w-fit items-center gap-3 rounded-full bg-navy px-5 py-3.5 text-sm font-semibold text-white">Start a conversation <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div></section> }

export function SiteFrame() { return <><Header /><Outlet /><Footer /></> }

export const capabilities = [
  {
    number: '01',
    title: 'Cloud foundation',
    image: '/images/capability-cloud.jpg',
    alt: 'The modular facade of a modern building, repeating across every floor',
    text: 'Secure, scalable AWS environments designed around how your teams actually work, not around a reference diagram.',
    points: ['Landing zones & networking', 'Migration & modernisation', 'Well-Architected reviews'],
  },
  {
    number: '02',
    title: 'Data & intelligence',
    image: '/images/capability-data.jpg',
    alt: 'An analytics dashboard of charts on a dark screen',
    text: 'Turn fragmented data into the clear signals your people need to move, with foundations that hold up as questions get harder.',
    points: ['Data lakes & warehouses', 'Streaming pipelines', 'Analytics & AI readiness'],
  },
  {
    number: '03',
    title: 'Modern applications',
    image: '/images/capability-apps.jpg',
    alt: 'A delivery team working across laptops around one table',
    text: 'Build and evolve products that are resilient, observable, and ready for change long after the first release.',
    points: ['Platform engineering', 'DevOps & CI/CD', 'Serverless & containers'],
  },
]

export const solutions = [
  {
    tag: '01 / GROW',
    title: 'Scale without the drag',
    text: 'A cloud operating model that gives fast-moving teams room to grow safely.',
    outcome: 'Teams ship without waiting on infrastructure.',
  },
  {
    tag: '02 / INSIGHT',
    title: 'Make data useful',
    text: 'Modern analytics foundations that put trustworthy answers within reach.',
    outcome: 'One version of the numbers, ready when the question is asked.',
  },
  {
    tag: '03 / TRANSFORM',
    title: 'Change with confidence',
    text: 'A pragmatic path from legacy complexity to a simpler digital core.',
    outcome: 'Change stops being the risky part of the plan.',
  },
]

export const cases = [
  { industry: 'Financial services', title: 'A new platform for a new kind of banking', metric: '40%', detail: 'faster release cycles', image: '/images/case-financial.jpg', alt: 'Glass office towers seen from street level' },
  { industry: 'Retail & consumer', title: 'Making every interaction count', metric: '3.2×', detail: 'more data points in view', image: '/images/case-retail.jpg', alt: 'A shop assistant completing a sale at a counter terminal' },
  { industry: 'Healthcare', title: 'The infrastructure behind better care', metric: '99.99%', detail: 'platform availability', image: '/images/case-healthcare.jpg', alt: 'A clinician typing on a laptop beside a stethoscope' },
]

export const clients = ['Nedbank', 'Discovery', 'MTN', 'Sanlam', 'Shoprite', 'Clicks']

export const faqs = [
  {
    q: 'What does an AWS Partner do?',
    a: 'We help organisations plan, build, and run technology on AWS. In practice that can mean a focused migration, a new data platform, or a long-term operating partnership. The partnership gives us direct access to AWS expertise and programmes, which we use to shorten the distance between your goal and a working system.',
  },
  {
    q: 'How do you typically start a project?',
    a: 'We begin with a short discovery sprint. Together we define the outcome, understand the constraints, and create a practical roadmap with clear next steps. You finish discovery with something you can act on and share internally, whether or not we build the next phase together.',
  },
  {
    q: 'What if we are not sure where to start?',
    a: 'That is a common and entirely reasonable place to begin. Most conversations start with a business problem rather than a technical brief. We help you separate what is urgent from what is important, name the trade-offs, and choose a first move small enough to learn from and large enough to matter.',
  },
  {
    q: 'Do you work with existing internal teams?',
    a: 'Absolutely. Our best work happens alongside your people. We bring specialist capability, share context openly, and leave teams stronger than we found them. Where it helps, we pair directly with your engineers so the knowledge stays in the building.',
  },
  {
    q: 'What does working together look like day to day?',
    a: 'You get a senior team, visible progress, and decisions made in the open. We work in short cycles with regular demonstrations rather than long silences followed by a big reveal, so you can change direction while changing direction is still cheap.',
  },
  {
    q: 'How do you hand over at the end of an engagement?',
    a: 'Handover is designed in from the start, not bolted on at the end. That means documented architecture decisions, infrastructure defined as code, and the runbooks your team needs to operate confidently. Our aim is that nothing we build depends on us being in the room.',
  },
  {
    q: 'Are you able to support us after launch?',
    a: 'Yes. We offer flexible support and optimisation retainers, from cloud operations and FinOps to ongoing product and data engineering. Many clients start with a defined piece of work and move into a longer partnership once the shape of the need is clear.',
  },
]

export const credentials = ['AWS Advanced Tier Services Partner', 'Migration Competency', 'Well-Architected Partner', 'DevOps Services', 'Data & Analytics Services', 'ISO 27001-aligned practices']

export const phases = [
  { step: '01', title: 'Discover', text: 'A short, sharp sprint to understand the business outcome, the constraints, and what is really in the way.', points: ['Stakeholder interviews', 'Current-state assessment', 'Outcome definition'] },
  { step: '02', title: 'Design', text: 'We turn the findings into an architecture and a roadmap your teams can actually commit to.', points: ['Target architecture', 'Phased roadmap', 'Cost & risk model'] },
  { step: '03', title: 'Build', text: 'Small, senior, embedded teams delivering in increments you can see, test, and put in front of users.', points: ['Two-week increments', 'Automated delivery', 'Shared ownership'] },
  { step: '04', title: 'Optimise', text: 'Once it is live, we keep tuning performance, cost, and capability so the platform gets better with age.', points: ['FinOps reviews', 'Reliability engineering', 'Capability handover'] },
]

export const industries = [
  { name: 'Financial services', image: '/images/industry-financial.jpg', alt: 'A hand entering a PIN at a banking terminal', text: 'Regulated platforms that still ship weekly, with auditability designed in rather than bolted on.' },
  { name: 'Retail & consumer', image: '/images/industry-retail.jpg', alt: 'A long aisle of stock in a retail distribution centre', text: 'Customer data joined up across channels so merchandising and marketing work from the same numbers.' },
  { name: 'Healthcare', image: '/images/industry-healthcare.jpg', alt: 'The reception desk of a modern hospital', text: 'Highly available systems handling sensitive data, built for continuity long before an incident happens.' },
  { name: 'Logistics & mobility', image: '/images/industry-logistics.jpg', alt: 'Shipping containers stacked across a working port', text: 'Event-driven architectures that keep pace with fleets, routes, and real-world operational chaos.' },
  { name: 'Telecommunications', image: '/images/industry-telecom.jpg', alt: 'A close view of a densely populated circuit board', text: 'Scale-heavy workloads where a percentage point of efficiency is a material line on the balance sheet.' },
  { name: 'Public sector', image: '/images/industry-public.jpg', alt: 'The stone colonnade of a civic building', text: 'Transparent, well-governed delivery with a clear path to in-house capability from day one.' },
]

export const testimonials = [
  { quote: 'They spent the first two weeks understanding our business, not our servers. Every recommendation after that landed, because it was ours as much as theirs.', name: 'Group CTO', role: 'Financial services client' },
  { quote: 'We went from a quarterly release ritual to shipping on a Tuesday afternoon without anyone losing sleep. That changed what our product team was willing to attempt.', name: 'Head of Engineering', role: 'Retail & consumer client' },
]

/** Mirrors how we talk about the AWS relationship on the solutions page: an outcome first, the service that delivers it second. */
export const awsSolutions = [
  { title: 'Data warehousing', service: 'Amazon Redshift', text: 'High-performance analytics on a warehouse your team can query without waiting for a nightly batch.' },
  { title: 'Infrastructure automation', service: 'AWS CloudFormation', text: 'Every environment defined in code, reviewed like code, and rebuilt from scratch in minutes.' },
  { title: 'Database migration', service: 'AWS DMS', text: 'Move production databases to AWS with continuous replication and minimal downtime at cutover.' },
  { title: 'Real-time streaming', service: 'Amazon Kinesis', text: 'Event pipelines that carry transactions, telemetry, and clickstream data as it happens.' },
  { title: 'Application protection', service: 'AWS WAF & Shield', text: 'Managed rules, rate limiting, and DDoS protection in front of the workloads that matter most.' },
  { title: 'Cloud readiness', service: 'Well-Architected Review', text: 'An honest assessment against the six pillars, with a remediation plan you can actually sequence.' },
  { title: 'Cost optimisation', service: 'Cost Explorer & Compute Optimizer', text: 'Rightsizing, Savings Plans, and storage tiering that cut spend without touching performance.' },
  { title: 'Serverless ETL', service: 'AWS Glue & Step Functions', text: 'Data integration that scales to the job and costs nothing while it waits for the next one.' },
  { title: 'Modernisation', service: 'Amazon ECS, EKS & Lambda', text: 'Legacy systems refactored into containerised or serverless services that scale on demand.' },
]
