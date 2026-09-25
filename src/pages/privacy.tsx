import { Eye, Lock, UserCheck } from 'lucide-react'

import { LegalPage, type LegalHighlight, type LegalSection } from '@/components/legal'

const highlights: LegalHighlight[] = [
  { icon: Eye, title: 'No selling, ever', text: 'We do not sell, rent, or trade personal information. There is no advertising business hiding behind this website.' },
  { icon: UserCheck, title: 'You stay in control', text: 'You can ask us what we hold, correct it, or have it deleted. One email is enough to start.' },
  { icon: Lock, title: 'Collected sparingly', text: 'We ask for the minimum needed to answer an enquiry or deliver work, and we keep it no longer than we need to.' },
]

const sections: LegalSection[] = [
  {
    id: 'scope',
    title: 'Who this policy covers',
    body: [
      'This policy explains how applixation collects, uses, shares, and protects personal information when you visit applixation.com, contact us, or work with us as a client, supplier, or candidate.',
      'applixation is the responsible party for the information described here, as that term is used in the Protection of Personal Information Act, 2013 (POPIA). Where we process information on behalf of a client under a services agreement, that client is the responsible party and their own privacy terms apply alongside ours.',
    ],
  },
  {
    id: 'information',
    title: 'Information we collect',
    body: ['We collect only what we need, and most of it you give us directly.'],
    listTitle: 'The categories we hold',
    list: [
      'Information you provide — your name, work email address, organisation, role, and whatever you choose to tell us in an enquiry or during an engagement.',
      'Correspondence — emails, meeting notes, and proposal documents created while we discuss or deliver work.',
      'Technical information — IP address, browser type, device type, referring page, and the pages you viewed, collected automatically when you visit the site.',
      'Recruitment information — CVs, portfolios, and interview notes, where you apply to join us.',
    ],
  },
  {
    id: 'use',
    title: 'How we use it',
    body: ['We use personal information for a small number of clearly defined purposes, each with a lawful basis under POPIA.'],
    listTitle: 'Our purposes',
    list: [
      'Responding to you — answering enquiries, arranging conversations, and preparing proposals you have asked for.',
      'Delivering services — running projects, supporting platforms, and meeting our contractual obligations to clients.',
      'Improving the website — understanding which pages are useful so we can write better ones, using aggregated measurements.',
      'Meeting legal obligations — keeping the tax, accounting, and compliance records the law requires us to keep.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and analytics',
    body: [
      'This site uses privacy-friendly analytics to count page views and understand broad traffic patterns. We do not use advertising cookies, cross-site trackers, or profiling tools, and we do not build behavioural profiles of visitors.',
      'You can block or delete cookies in your browser settings at any time. The site is built to work normally if you do.',
    ],
  },
  {
    id: 'sharing',
    title: 'When we share information',
    body: ['We share personal information only where it is necessary, and never for someone else to market to you.'],
    listTitle: 'Who may receive it',
    list: [
      'Service providers — hosting, email, and analytics providers who process information on our instructions and under written agreements.',
      'Professional advisers — auditors, lawyers, and insurers, where they need it to advise us.',
      'Authorities — where we are legally required to disclose information, or need to establish or defend a legal claim.',
    ],
  },
  {
    id: 'transfers',
    title: 'Where information is stored',
    body: [
      'We host our systems in AWS regions, primarily the Africa (Cape Town) and Europe (Ireland) regions. Some of our service providers process information outside South Africa.',
      'Where information crosses a border, we rely on the transfer conditions in section 72 of POPIA, which means the recipient is bound by binding agreements or laws that give your information a comparable level of protection.',
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: [
      'Enquiries that do not become engagements are deleted within 24 months. Client project records are kept for the duration of the engagement and for seven years afterwards, in line with South African tax and company record-keeping requirements.',
      'Recruitment information is kept for 12 months after a process closes unless you ask us to keep it on file for longer.',
    ],
  },
  {
    id: 'security',
    title: 'How we protect it',
    body: [
      'We apply the same engineering practices to our own systems that we recommend to clients: least-privilege access, multi-factor authentication, encryption in transit and at rest, logging and monitoring, and regular review of who has access to what.',
      'No system is perfectly secure. If a breach affects your personal information, we will notify you and the Information Regulator as required by section 22 of POPIA.',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: ['POPIA gives you specific rights over your personal information, and we will act on a valid request within 30 days.'],
    listTitle: 'What you can ask for',
    list: [
      'Access — a copy of the personal information we hold about you.',
      'Correction — an update or amendment where something we hold is inaccurate or incomplete.',
      'Deletion — removal of information we no longer have a lawful reason to keep.',
      'Objection — an end to processing you object to on reasonable grounds, including any direct marketing.',
      'Complaint — a complaint to the Information Regulator of South Africa if you believe we have handled your information unlawfully.',
    ],
  },
  {
    id: 'children',
    title: 'Children',
    body: ['This is a business-to-business website. We do not knowingly collect personal information from anyone under 18. If you believe a child has sent us information, contact us and we will delete it.'],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: ['We update this policy when our practices, our providers, or the law change. The date at the top of this page always reflects the current version, and material changes will be signalled clearly on the website.'],
  },
]

export default function PrivacyPage() {
  return <LegalPage
      title="Privacy policy"
      updated="September 2026"
      summary="We collect as little as we can, use it only for the reasons set out below, and never sell it. This page explains exactly what that means in practice."
      highlights={highlights}
      sections={sections}
      closing="This policy is written to be read, not to be survived. If anything here is unclear, or if you want to exercise one of the rights above, write to us and a person will answer."
    />
}
