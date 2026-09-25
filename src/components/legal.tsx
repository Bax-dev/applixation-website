import type { LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'

import { SITE } from '@/config/site'

/** A single numbered clause. `list` items may use an em-dash to mark a leading term: 'Term — explanation'. */
export type LegalSection = { id: string; title: string; body: string[]; listTitle?: string; list?: string[] }

export type LegalHighlight = { icon: LucideIcon; title: string; text: string }

const legalLinks = [
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/terms', label: 'Terms of use' },
]

function Bullet({ item }: { item: string }) {
  const [term, ...rest] = item.split(' — ')
  return <li className="relative pl-6 text-[15px] leading-7 text-muted-foreground"><span className="absolute left-0 top-[11px] size-1.5 rounded-full bg-orange" />{rest.length ? <><span className="font-semibold text-navy">{term}</span> — {rest.join(' — ')}</> : item}</li>
}

function Contents({ sections }: { sections: LegalSection[] }) {
  return <nav aria-label="On this page" className="flex flex-col gap-1">
    <p className="eyebrow mb-4">On this page</p>
    {sections.map((section, i) => <a key={section.id} href={`#${section.id}`} className="group flex gap-3 rounded-lg px-3 py-2.5 text-sm leading-5 text-muted-foreground transition-colors hover:bg-sand hover:text-navy"><span className="pt-px text-[11px] font-semibold tabular-nums text-orange">{String(i + 1).padStart(2, '0')}</span>{section.title}</a>)}
  </nav>
}

export function LegalPage({ eyebrow = 'Legal', title, updated, summary, highlights, sections, closing }: { eyebrow?: string; title: string; updated: string; summary: string; highlights?: LegalHighlight[]; sections: LegalSection[]; closing?: string }) {
  const { pathname } = useLocation()
  return <main>
    <section className="relative overflow-hidden bg-navy px-5 pb-16 pt-36 text-white lg:px-8 lg:pb-20 lg:pt-44">
      <div className="grid-fade pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl">
        <p className="eyebrow mb-6 text-orange">{eyebrow}</p>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <h1 className="max-w-3xl text-5xl font-medium leading-[0.96] tracking-[-0.065em] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="max-w-lg text-base leading-7 text-white/55 lg:pb-3">{summary}</p>
        </div>
        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/60"><span className="size-1.5 rounded-full bg-orange" />Last updated {updated}</span>
          <div className="flex gap-2">{legalLinks.map((link) => <Link key={link.href} to={link.href} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${pathname === link.href ? 'bg-orange text-navy' : 'text-white/55 hover:text-white'}`}>{link.label}</Link>)}</div>
        </div>
      </div>
    </section>

    {highlights && <section className="border-b border-border bg-sand"><div className="mx-auto grid max-w-7xl gap-px overflow-hidden px-5 py-12 lg:grid-cols-3 lg:px-8">{highlights.map(({ icon: Icon, title: heading, text }) => <div key={heading} className="flex gap-4 lg:px-2"><Icon className="size-6 shrink-0 text-orange" /><div><h2 className="text-base font-semibold tracking-[-0.02em] text-navy">{heading}</h2><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{text}</p></div></div>)}</div></section>}

    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[.26fr_1fr] lg:gap-20">
        <aside className="lg:sticky lg:top-10 lg:h-fit"><Contents sections={sections} /></aside>
        <div>
          <div className="flex flex-col gap-14">
            {sections.map((section, i) => <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-border pt-8">
              <div className="flex items-baseline gap-4">
                <span className="text-xs font-semibold tabular-nums text-orange">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="text-2xl font-medium leading-tight tracking-[-0.04em] text-navy lg:text-3xl">{section.title}</h2>
              </div>
              <div className="mt-5 flex flex-col gap-5 lg:pl-10">
                {section.body.map((paragraph) => <p key={paragraph} className="max-w-2xl text-[15px] leading-7 text-muted-foreground">{paragraph}</p>)}
                {section.list && <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 lg:p-7">{section.listTitle && <p className="mb-4 text-sm font-semibold text-navy">{section.listTitle}</p>}<ul className="flex flex-col gap-3.5">{section.list.map((item) => <Bullet key={item} item={item} />)}</ul></div>}
              </div>
            </section>)}
          </div>

          {closing && <p className="mt-14 max-w-2xl border-t border-border pt-8 text-sm leading-7 text-muted-foreground">{closing}</p>}

          <div className="mt-10 grid gap-8 rounded-2xl bg-navy p-8 text-white lg:grid-cols-[1fr_auto] lg:items-end lg:p-10">
            <div>
              <p className="eyebrow text-orange">Questions about this page</p>
              <h2 className="mt-5 max-w-md text-3xl font-medium leading-tight tracking-[-0.05em]">Talk to a person, not a form.</h2>
              <div className="mt-8 flex flex-col gap-4 text-sm text-white/60 sm:flex-row sm:gap-10">
                <span className="flex items-start gap-3"><Mail className="size-4 shrink-0 text-orange" /><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></span>
                <span className="flex items-start gap-3"><MapPin className="size-4 shrink-0 text-orange" />{SITE.address.street}, {SITE.address.locality}, {SITE.address.postalCode}</span>
              </div>
            </div>
            <Link to="/contact" className="group inline-flex w-fit items-center gap-3 rounded-full bg-orange px-5 py-3.5 text-sm font-semibold text-navy">Contact us <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
          </div>
        </div>
      </div>
    </section>
  </main>
}
