/**
 * Drawn graphics, as opposed to the photography in `media.tsx`.
 *
 * Everything here is inline SVG or plain markup so it inherits `currentColor`, stays crisp at any
 * size, themes with the palette, and costs no extra request.
 */

/** Cycled geometric marks for the client wall. Abstract on purpose: these stand in for real brand marks. */
const MARKS = [
  <><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18" className="fill-current" /></>,
  <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" className="fill-current" /><rect x="3" y="13" width="8" height="8" rx="1.5" className="fill-current" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></>,
  <><path d="M12 3 21 19H3Z" /><path d="M12 9.5 16.5 17h-9Z" className="fill-current" /></>,
  <><path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7Z" /><circle cx="12" cy="12" r="3.5" className="fill-current" /></>,
  <><path d="M4 20V9" /><path d="M10 20V4" className="stroke-[3]" /><path d="M16 20v-7" /><path d="M22 20V6" className="stroke-[3]" /></>,
  <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" className="fill-current" /></>,
]

/**
 * A stand-in wordmark for the client wall: a geometric mark plus the name, so the grid reads as a
 * logo wall rather than a list. Swap for real supplied artwork when it is cleared for use.
 */
export function LogoMark({ name, index, tone = 'light' }: { name: string; index: number; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return <span className={`inline-flex items-center gap-3 ${dark ? 'text-white/70' : 'text-navy'}`}>
    <svg viewBox="0 0 24 24" className="size-7 shrink-0 text-orange" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{MARKS[index % MARKS.length]}</svg>
    <span className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">{name}</span>
  </span>
}

/** One tier of the reference architecture: a labelled band of AWS services. */
function Tier({ label, services, accent = false }: { label: string; services: string[]; accent?: boolean }) {
  return <div className={`rounded-2xl border p-5 lg:p-6 ${accent ? 'border-orange/40 bg-orange/5' : 'border-border bg-card'}`}>
    <p className="eyebrow">{label}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {services.map((service) => <span key={service} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-navy">{service}</span>)}
    </div>
  </div>
}

/** The vertical connector drawn between two tiers. */
function Connector() {
  return <div className="flex justify-center py-2" aria-hidden="true">
    <svg width="12" height="28" viewBox="0 0 12 28" fill="none" className="text-orange/60">
      <path d="M6 0v20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M2 18l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
}

const TIERS = [
  { label: 'Edge', services: ['Route 53', 'CloudFront', 'WAF & Shield', 'Certificate Manager'] },
  { label: 'Application — inside the VPC', services: ['API Gateway', 'Application Load Balancer', 'ECS / EKS', 'Lambda', 'Step Functions'], accent: true },
  { label: 'Data', services: ['Aurora / RDS', 'S3', 'Glue', 'Redshift', 'Kinesis'] },
]

const CROSS_CUTTING = [
  { title: 'Identity', services: 'IAM Identity Center, Organizations' },
  { title: 'Observability', services: 'CloudWatch, X-Ray, OpenSearch' },
  { title: 'Security', services: 'GuardDuty, Security Hub, KMS' },
  { title: 'Delivery', services: 'CloudFormation, CodePipeline' },
]

/**
 * A reference architecture rather than a specific client's: the shape most of our engagements
 * converge on. Built from markup instead of a flat image so it stays legible at any width and
 * the service names remain selectable text.
 */
export function ReferenceArchitecture() {
  return <figure className="grid gap-6 lg:grid-cols-[1.6fr_.9fr] lg:items-stretch">
    <div>
      {TIERS.map((tier, i) => <div key={tier.label}>
        {i > 0 && <Connector />}
        <Tier {...tier} />
      </div>)}
    </div>
    <div className="rounded-2xl border border-border bg-card p-5 lg:p-6">
      <p className="eyebrow">Across every tier</p>
      <ul className="mt-5 flex flex-col gap-5">
        {CROSS_CUTTING.map((item) => <li key={item.title} className="border-l-2 border-orange/40 pl-4">
          <p className="text-sm font-semibold text-navy">{item.title}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.services}</p>
        </li>)}
      </ul>
    </div>
    <figcaption className="sr-only">
      A reference AWS architecture: an edge tier of Route 53, CloudFront and WAF in front of an
      application tier of API Gateway, load balancing, containers and Lambda inside a VPC, over a
      data tier of Aurora, S3, Glue, Redshift and Kinesis — with identity, observability, security
      and delivery tooling spanning all three.
    </figcaption>
  </figure>
}

/** Decorative concentric rings, for flat sections that need depth behind the type. */
export function PatternRings({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 400 400" className={`pointer-events-none absolute ${className}`} fill="none" aria-hidden="true">
    {[60, 110, 160, 199].map((r) => <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeWidth="1" />)}
  </svg>
}
