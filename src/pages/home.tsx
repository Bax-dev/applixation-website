import { Link } from 'react-router-dom'
import { ArrowUpRight, Quote } from 'lucide-react'
import { MotionConfig } from 'motion/react'

import { AwsLogo, AwsPartnerBadge } from '@/components/aws-logo'
import { HeroScene } from '@/components/hero-scene'
import { Figure, ParallaxFigure } from '@/components/media'
import { CountUp, fadeUp, hoverLift, motion, Reveal, Stagger, StaggerItem } from '@/components/motion'
import { Scene } from '@/components/scene'
import { Seo } from '@/components/seo'
import { ArrowLink, awsSolutions, CTA, capabilities, cases, clients, credentials, faqs, industries, phases, sectionClass, solutions, testimonials } from '@/components/site-shell'

/** The hero is already in view on load, so it animates on mount instead of waiting for a scroll. */
const heroStagger = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } } }

function HeroLine({ children }: { children: React.ReactNode }) {
  return <motion.div data-reveal variants={fadeUp}>{children}</motion.div>
}

/** The site-wide `<Stat>`, with the figure counted up the first time it is seen. */
function CountStat({ value, label }: { value: string; label: string }) {
  return <div><p className="text-4xl font-medium tracking-[-0.05em] text-navy lg:text-5xl"><CountUp value={value} /></p><p className="mt-2 max-w-[150px] text-sm leading-5 text-muted-foreground">{label}</p></div>
}

export default function Home() {
  return <><Seo />
    {/* `user` lets motion drop every translate for visitors who ask for reduced motion, keeping only the fades. */}
    <MotionConfig reducedMotion="user">
    <main>
    <section className="relative min-h-[760px] overflow-hidden bg-navy px-5 pb-20 pt-36 text-white lg:px-8 lg:pt-48"><HeroScene /><div className="grid-fade pointer-events-none absolute inset-0 opacity-40" /><div className="relative mx-auto max-w-7xl"><motion.div className="max-w-2xl lg:max-w-[58%]" variants={heroStagger} initial="hidden" animate="show"><HeroLine><div className="mb-8 flex flex-wrap items-center gap-3"><AwsPartnerBadge /><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45"></span></div></HeroLine><HeroLine><h1 className="text-6xl font-medium leading-[.92] tracking-[-0.07em] sm:text-7xl lg:text-[7.8rem]">Make your next move <span className="text-orange">count.</span></h1></HeroLine><HeroLine><p className="mt-10 max-w-lg text-lg leading-7 text-white/65">applixation designs and builds AWS cloud foundations, data platforms, and modern applications &mdash; from the first architecture to running them in production.</p></HeroLine><HeroLine><Link to="/contact" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-orange px-5 py-3.5 text-sm font-semibold text-navy">Start a conversation <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></HeroLine></motion.div></div>
      {/* Scroll cue: the hero runs past the fold on most screens, so it pays to say there is more. */}
      <motion.div className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center lg:flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} aria-hidden="true"><motion.span className="h-10 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" animate={{ y: [-6, 6, -6] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} /></motion.div>
    </section>

    <section className="overflow-hidden border-b border-border bg-background py-5"><div className="flex w-max animate-[marquee_46s_linear_infinite] text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{[...credentials, ...credentials].map((item, i) => <span key={i} className="flex shrink-0 items-center gap-10 pr-10"><span className="size-1 rounded-full bg-orange" />{item}</span>)}</div></section>

    <section className={sectionClass}>
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal><p className="eyebrow">The short version</p><h2 className="mt-5 max-w-sm text-4xl font-medium leading-tight tracking-[-0.06em] text-navy lg:text-5xl">Technology should create momentum.</h2></Reveal>
        <Reveal delay={0.1}><p className="max-w-2xl text-xl leading-8 text-muted-foreground">We partner with leaders who are ready to do meaningful things with technology. Together, we turn big ambition into clear architecture, useful data, and products people love to use.</p><Stagger className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-7 sm:grid-cols-4" gap={0.1}><StaggerItem><CountStat value="12+" label="years making complex things simple" /></StaggerItem><StaggerItem><CountStat value="AWS" label="partner-led cloud expertise" /></StaggerItem><StaggerItem><CountStat value="3.2×" label="average data visibility gain" /></StaggerItem><StaggerItem><CountStat value="1" label="senior team from start to finish" /></StaggerItem></Stagger></Reveal>
      </div>
      <Reveal soft className="mt-16 lg:mt-20"><ParallaxFigure src="/images/momentum.jpg" alt="A wide open studio floor of people at work" className="aspect-[21/9] w-full rounded-2xl" distance={52} /></Reveal>
    </section>

    <section className="bg-sand"><div className={sectionClass}>
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">What we offer</p><h2 className="mt-5 max-w-2xl text-4xl font-medium leading-none tracking-[-0.06em] text-navy lg:text-6xl">The right expertise, at the right moment.</h2></div><ArrowLink href="/services">Explore our services</ArrowLink></Reveal>
      <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">{capabilities.map((item) => <StaggerItem key={item.number} className="group flex flex-col bg-background"><Figure src={item.image} alt={item.alt} className="aspect-[16/10] w-full" tint="navy" zoom /><div className="flex flex-1 flex-col p-7 lg:p-9"><span className="text-xs text-orange">{item.number}</span><h3 className="mt-8 text-2xl font-medium tracking-[-0.04em] text-navy">{item.title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{item.text}</p><ul className="mt-6 flex flex-col gap-2 border-t border-border pt-5 text-sm text-navy">{item.points.map((point) => <li key={point} className="flex items-center gap-2"><span className="size-1 rounded-full bg-orange" />{point}</li>)}</ul></div></StaggerItem>)}</Stagger>
    </div></section>

    <section className="relative overflow-hidden bg-navy text-white"><div className={sectionClass}>
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal><AwsLogo className="h-11 w-auto text-orange" /><h2 className="mt-8 max-w-sm text-4xl font-medium leading-tight tracking-[-0.06em] lg:text-5xl">Built on AWS, end to end.</h2><p className="mt-6 max-w-sm text-base leading-7 text-white/55">As an Advanced Tier Services Partner we work across the whole platform, not a favourite corner of it. These are the services behind most of what we ship.</p><div className="mt-8"><ArrowLink href="/solutions">See all AWS solutions</ArrowLink></div></Reveal>
        {/* The globe carries the reach the copy claims: live routes out of Johannesburg to the regions we build in. */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]"><div className="absolute inset-8 rounded-full bg-orange/10 blur-[100px]" /><Scene name="globe" className="absolute inset-0" /></div>
      </div>
      <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>{awsSolutions.slice(0, 6).map((item) => <StaggerItem key={item.title} className="bg-navy p-6"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-orange">{item.service}</p><h3 className="mt-5 text-lg font-medium tracking-[-0.03em]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{item.text}</p></StaggerItem>)}</Stagger>
    </div></section>

    <section className={sectionClass}>
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Solutions</p><h2 className="mt-5 max-w-2xl text-4xl font-medium leading-none tracking-[-0.06em] text-navy lg:text-6xl">Practical answers to complex questions.</h2></div><ArrowLink href="/solutions">See all solutions</ArrowLink></Reveal>
      <Stagger className="mt-14 grid gap-12 lg:grid-cols-3" gap={0.1}>{solutions.map((item) => <StaggerItem key={item.tag} className="border-t-2 border-navy pt-5"><span className="text-[10px] font-bold tracking-[0.18em] text-orange">{item.tag}</span><h3 className="mt-14 text-2xl font-medium tracking-[-0.04em] text-navy">{item.title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{item.text}</p><p className="mt-5 text-sm font-medium leading-6 text-navy">{item.outcome}</p></StaggerItem>)}</Stagger>
    </section>

    <section className="relative overflow-hidden bg-navy px-5 py-16 text-white lg:px-8 lg:py-24">
      {/* A field of points under the client names, where the section would otherwise be flat navy. */}
      <Scene name="wave" className="pointer-events-none absolute inset-0 opacity-90 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_72%,transparent)]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow text-orange">Trusted by teams who move</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] lg:text-5xl">Good company.</h2></div><ArrowLink href="/clients">Meet our clients</ArrowLink></Reveal>
        <Stagger className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 text-xl font-medium tracking-[-0.04em] text-white/65 sm:grid-cols-3 lg:grid-cols-6" gap={0.07}>{clients.map((client) => <StaggerItem key={client} className="transition-colors hover:text-white">{client}</StaggerItem>)}</Stagger>
      </div>
    </section>

    <section className="bg-sand"><div className={sectionClass}>
      <Reveal><p className="eyebrow">In their words</p></Reveal>
      <div className="mt-12 grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal soft><ParallaxFigure src="/images/workshop.jpg" alt="Three colleagues taking notes around a table" className="aspect-[4/5] w-full rounded-2xl" distance={38} /></Reveal>
        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border" gap={0.12}>{testimonials.map((item) => <StaggerItem key={item.name}><figure className="flex h-full flex-col justify-between bg-background p-8 lg:p-10"><Quote className="size-7 text-orange" /><blockquote className="mt-10 text-xl font-medium leading-8 tracking-[-0.03em] text-navy lg:text-2xl lg:leading-9">{item.quote}</blockquote><figcaption className="mt-10 border-t border-border pt-5 text-sm"><span className="font-semibold text-navy">{item.name}</span><span className="text-muted-foreground"> · {item.role}</span></figcaption></figure></StaggerItem>)}</Stagger>
      </div>
    </div></section>

    <section className={sectionClass}>
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Case studies</p><h2 className="mt-5 max-w-xl text-4xl font-medium leading-none tracking-[-0.06em] text-navy lg:text-6xl">Proof, not promises.</h2></div><ArrowLink href="/case-studies">View all case studies</ArrowLink></Reveal>
      <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" gap={0.1}>{cases.map((item) => <StaggerItem key={item.title} className="h-full"><motion.div {...hoverLift} className="h-full"><Link to="/case-studies" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"><Figure src={item.image} alt={item.alt} className="aspect-[3/2] w-full" zoom /><div className="flex flex-1 flex-col p-6"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange">{item.industry}</span><ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-orange" /></div><h3 className="mt-6 text-2xl font-medium leading-tight tracking-[-0.04em] text-navy">{item.title}</h3><div className="mt-auto border-t border-border pt-4"><span className="text-3xl font-medium tracking-[-0.05em] text-navy">{item.metric}</span><p className="mt-1 text-xs text-muted-foreground">{item.detail}</p></div></div></Link></motion.div></StaggerItem>)}</Stagger>
    </section>

    <section className="bg-navy text-white"><div className={sectionClass}><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <Reveal><p className="eyebrow text-orange">How we work</p><h2 className="mt-5 max-w-sm text-4xl font-medium leading-tight tracking-[-0.06em] lg:text-5xl">Four phases. No surprises.</h2><p className="mt-6 max-w-sm text-base leading-7 text-white/55">Every engagement follows the same shape, whether it runs for six weeks or six quarters. You always know which phase you are in and what comes next.</p><ParallaxFigure src="/images/engineers.jpg" alt="Two engineers walking a data centre aisle" className="mt-10 aspect-[4/3] w-full rounded-2xl" tint="deep" distance={34} /></Reveal>
      <Stagger className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2" gap={0.09}>{phases.map((phase) => <StaggerItem key={phase.step} className="bg-navy p-7 lg:p-8"><div className="flex items-center gap-3"><span className="text-xs font-semibold tabular-nums text-orange">{phase.step}</span><span className="h-px flex-1 bg-white/15" /></div><h3 className="mt-8 text-2xl font-medium tracking-[-0.04em]">{phase.title}</h3><p className="mt-3 text-sm leading-6 text-white/55">{phase.text}</p><ul className="mt-6 flex flex-col gap-2">{phase.points.map((point) => <li key={point} className="flex items-center gap-2 text-xs text-white/45"><span className="size-1 rounded-full bg-orange" />{point}</li>)}</ul></StaggerItem>)}</Stagger>
    </div></div></section>

    <section className="bg-sand"><div className={sectionClass}>
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Industries</p><h2 className="mt-5 max-w-2xl text-4xl font-medium leading-none tracking-[-0.06em] text-navy lg:text-6xl">Context we already understand.</h2></div><ArrowLink href="/solutions">How we apply it</ArrowLink></Reveal>
      {/* Desaturated until hovered, so six photographs on one screen stay quiet enough to read past. */}
      <Stagger className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>{industries.map((item, i) => <StaggerItem key={item.name} className="group"><Figure src={item.image} alt={item.alt} className="aspect-[7/5] w-full rounded-xl grayscale transition-[filter] duration-700 group-hover:grayscale-0" zoom /><div className="mt-5 border-t border-border pt-5"><span className="text-xs font-semibold tabular-nums text-orange">{String(i + 1).padStart(2, '0')}</span><h3 className="mt-4 text-xl font-medium tracking-[-0.03em] text-navy">{item.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></div></StaggerItem>)}</Stagger>
    </div></section>

    <section className={sectionClass}><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <Reveal><p className="eyebrow">Before you ask</p><h2 className="mt-5 max-w-sm text-4xl font-medium leading-tight tracking-[-0.06em] text-navy lg:text-5xl">The questions we hear most.</h2><div className="mt-8"><ArrowLink href="/faqs">Read all FAQs</ArrowLink></div></Reveal>
      <Stagger gap={0.06}>{faqs.map((item) => <StaggerItem key={item.q}><details className="group border-t border-border"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-[-0.03em] text-navy [&::-webkit-details-marker]:hidden">{item.q}<span className="relative size-4 shrink-0"><span className="absolute inset-x-0 top-1/2 h-px bg-orange" /><span className="absolute inset-y-0 left-1/2 w-px bg-orange transition-transform group-open:rotate-90" /></span></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-muted-foreground">{item.a}</p></details></StaggerItem>)}</Stagger>
    </div></section>

    <CTA />
  </main>
  </MotionConfig></>
}
