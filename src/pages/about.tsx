import { ArrowUpRight, Award, Compass, HeartHandshake, Telescope } from 'lucide-react'
import { Link } from 'react-router-dom'

import { AwsLogo } from '@/components/aws-logo'
import { Figure, ParallaxFigure } from '@/components/media'
import { Seo } from '@/components/seo'
import { ArrowLink, CTA, credentials, PageIntro, sectionClass, Stat } from '@/components/site-shell'

const principles = [
  { icon: Compass, title: 'Start with why', text: 'We find the business signal underneath the technical noise.' },
  { icon: HeartHandshake, title: 'Build together', text: 'We work openly with your people, sharing decisions and capability.' },
  { icon: Telescope, title: 'Keep looking ahead', text: 'We design for today without closing off tomorrow.' },
]

const story = [
  { year: '2014', title: 'A small team with a stubborn idea', text: 'Four engineers left large consultancies to prove that senior people, working in small numbers, deliver more than large teams working in parallel.' },
  { year: '2017', title: 'All in on AWS', text: 'We narrowed our focus to one cloud and went deep, becoming an AWS Partner and building the migration practice that still anchors our work.' },
  { year: '2020', title: 'Data earns its own practice', text: 'Clients stopped asking only how to move and started asking what their data could tell them. Our analytics and platform engineering teams grew out of that shift.' },
  { year: '2023', title: 'Built to run, not just to launch', text: 'We added FinOps and reliability engineering so the platforms we build keep improving long after the launch announcement.' },
  { year: '2026', title: 'Intelligence, applied carefully', text: 'AI readiness became part of every architecture conversation. We help clients tell the difference between a useful application and an expensive experiment.' },
]

const beliefs = [
  { title: 'Clarity beats cleverness', text: 'The best architecture is the one your team can explain to someone else on a whiteboard. We optimise for understanding first, elegance second.' },
  { title: 'Small teams, senior people', text: 'Every engagement is staffed with people who have done the work before. No pyramid, no learning on your budget.' },
  { title: 'Show it working', text: 'We would rather demonstrate something running in your environment than present another deck about what it could look like.' },
  { title: 'Leave teams stronger', text: 'Our measure of success is whether your people need us less at the end than they did at the start.' },
]

const team = [
  { name: 'Thandi Mokoena', role: 'Managing Partner', text: 'Twenty years across banking platforms and public cloud programmes.' },
  { name: 'Rohan Naidoo', role: 'Chief Architect', text: 'Designs the landing zones and operating models our delivery work sits on.' },
  { name: 'Lauren de Villiers', role: 'Head of Data', text: 'Builds analytics foundations that survive contact with real business questions.' },
  { name: 'Sipho Dlamini', role: 'Head of Delivery', text: 'Keeps increments small, honest, and visible to everyone who needs to see them.' },
]

const expectations = ['A senior lead who stays with you from first call to handover', 'A written roadmap with costs, risks, and trade-offs made explicit', 'Working software in your environment within the first six weeks', 'Weekly demos, not monthly status reports', 'Documentation and runbooks written for your team, not for us', 'A clear exit: we plan our own redundancy from day one']

function Initials({ name }: { name: string }) {
  return <span className="grid size-12 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-orange">{name.split(' ').map((part) => part[0]).join('')}</span>
}

export default function AboutPage() {
  return <><Seo title="About" description="applixation is an independent cloud consultancy for organisations ready to move with intent." />
    <main>
      <PageIntro eyebrow="About applixation" title="We make technology feel possible." text="applixation is an independent cloud consultancy for organisations ready to move with intent. We bring clarity to complexity, and momentum to good ideas." />
      <section className={sectionClass}><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><p className="eyebrow">Our point of view</p><div><h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-[-0.06em] text-navy lg:text-6xl">The best technology partners don&apos;t just deliver systems. They help teams see further.</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">We work at the intersection of strategy, engineering, and people. That means asking the awkward questions early, making the trade-offs visible, and building things that keep getting better after we leave.</p></div></div><ParallaxFigure src="/images/engineers.jpg" alt="Two engineers walking a data centre aisle" className="mt-16 aspect-[21/9] rounded-2xl" tint="navy" /><div className="mt-24 grid gap-8 border-t border-border pt-8 sm:grid-cols-3"><Stat value="01" label="One senior, accountable team" /><Stat value="100%" label="Focused on your business outcome" /><Stat value="∞" label="Curiosity about what comes next" /></div></section>
      <section className="bg-sand"><div className={sectionClass}><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">Our story</p><h2 className="mt-5 max-w-xs text-4xl font-medium leading-tight tracking-[-0.06em] text-navy lg:text-5xl">Twelve years of narrowing the focus.</h2><p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">We have grown by doing fewer things, more deeply. Each chapter below started with a client problem we could not solve well enough with what we had.</p><Figure src="/images/workshop.jpg" alt="Colleagues taking notes around a table" className="mt-10 aspect-[4/3] rounded-2xl" tint="navy" /></div><ol className="flex flex-col">{story.map((item) => <li key={item.year} className="grid gap-4 border-t border-border py-7 sm:grid-cols-[.2fr_1fr] sm:gap-8"><span className="text-sm font-semibold tabular-nums text-orange">{item.year}</span><div><h3 className="text-xl font-medium tracking-[-0.03em] text-navy">{item.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{item.text}</p></div></li>)}</ol></div></div></section>
      <section className={sectionClass}><p className="eyebrow">How we work</p><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">{principles.map(({ icon: Icon, title, text }) => <div className="bg-background p-8" key={title}><Icon className="size-7 text-orange" /><h3 className="mt-24 text-2xl font-medium tracking-[-0.04em] text-navy">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></section>
      <section className="bg-navy text-white"><div className={sectionClass}><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow text-orange">What we believe</p><h2 className="mt-5 max-w-xs text-4xl font-medium leading-tight tracking-[-0.06em] lg:text-5xl">Four things we will not trade away.</h2></div><div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">{beliefs.map((item, i) => <div key={item.title} className="bg-navy p-7 lg:p-8"><span className="text-xs font-semibold tabular-nums text-orange">{String(i + 1).padStart(2, '0')}</span><h3 className="mt-10 text-xl font-medium tracking-[-0.03em]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/55">{item.text}</p></div>)}</div></div></div></section>
      <section className={sectionClass}><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">The people</p><h2 className="mt-5 max-w-xl text-4xl font-medium leading-none tracking-[-0.06em] text-navy lg:text-6xl">Who you actually get.</h2></div><ArrowLink href="/contact">Meet the team</ArrowLink></div><div className="mt-14 grid gap-5 sm:grid-cols-2">{team.map((person) => <article key={person.name} className="flex gap-5 rounded-2xl border border-border bg-card p-6 lg:p-7"><Initials name={person.name} /><div><h3 className="text-lg font-medium tracking-[-0.03em] text-navy">{person.name}</h3><p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange">{person.role}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{person.text}</p></div></article>)}</div></section>
      <section className="bg-sand"><div className={sectionClass}><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">Working with us</p><h2 className="mt-5 max-w-xs text-4xl font-medium leading-tight tracking-[-0.06em] text-navy lg:text-5xl">What you can expect.</h2><p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">No engagement looks identical, but these are the commitments we make on every single one.</p></div><ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">{expectations.map((item) => <li key={item} className="flex gap-3 border-t border-border pt-5 text-sm leading-6 text-navy"><ArrowUpRight className="size-4 shrink-0 text-orange" />{item}</li>)}</ul></div></div></section>
      <section className={sectionClass}><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">Partnership &amp; accreditation</p><h2 className="mt-5 max-w-xs text-4xl font-medium leading-tight tracking-[-0.06em] text-navy lg:text-5xl">Certified where it counts.</h2><div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4"><AwsLogo className="h-9 w-auto text-navy" /><span className="h-7 w-px bg-border" /><span className="max-w-[120px] text-[10px] font-semibold uppercase leading-4 tracking-[0.14em] text-muted-foreground">Advanced Tier Services Partner</span></div></div><div><div className="flex flex-wrap gap-3">{credentials.map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-navy"><Award className="size-4 text-orange" />{item}</span>)}</div><p className="mt-8 max-w-xl text-sm leading-7 text-muted-foreground">Accreditation is a floor, not a finish line. It tells you our engineers have been independently assessed; the rest of this site is about what we do with that.</p><Link to="/competencies" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-navy px-5 py-3.5 text-sm font-semibold text-white">See our competencies <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div></div></section>
      <CTA />
    </main>
  </>
}
