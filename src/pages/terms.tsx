import { FileText, Scale, Copyright } from 'lucide-react'

import { LegalPage, type LegalHighlight, type LegalSection } from '@/components/legal'

const highlights: LegalHighlight[] = [
  { icon: FileText, title: 'Information, not advice', text: 'This website describes what we do. It is not professional, technical, or legal advice for your situation.' },
  { icon: Copyright, title: 'Our words and marks', text: 'The writing, branding, and design on this site belong to applixation unless we say otherwise.' },
  { icon: Scale, title: 'Contracts come first', text: 'If you are a client, your signed services agreement governs the work. These terms cover the website only.' },
]

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Accepting these terms',
    body: [
      'These terms apply to your use of applixation.com and any content, tools, or documents available on it. By browsing the site you accept them.',
      'If you do not accept these terms, please do not use the site. We may update them from time to time, and continuing to use the site after a change means you accept the updated version.',
    ],
  },
  {
    id: 'website',
    title: 'Using this website',
    body: ['You are welcome to read, quote, and share what is here. A few things are off limits, mostly for obvious reasons.'],
    listTitle: 'Please do not',
    list: [
      'Interfere with the site — attempt to gain unauthorised access, probe for vulnerabilities without our written permission, or disrupt availability for others.',
      'Scrape at scale — use automated tools to harvest content or contact details in a way that burdens the site or fuels unsolicited marketing.',
      'Misrepresent us — imply an association, endorsement, or partnership with applixation that does not exist.',
      'Break the law — use the site for anything unlawful, or in a way that infringes the rights of others.',
    ],
  },
  {
    id: 'content',
    title: 'Content and accuracy',
    body: [
      'We write this site carefully and in good faith, but it describes our services in general terms. Case study figures, timelines, and outcomes reflect specific engagements under specific conditions, and are not a promise of comparable results elsewhere.',
      'Content may change without notice. We do not warrant that the site will be uninterrupted, error-free, or current at any given moment.',
    ],
  },
  {
    id: 'advice',
    title: 'Not professional advice',
    body: [
      'Nothing on this website constitutes professional, technical, financial, security, or legal advice, and no client relationship is created by reading it or by sending us an enquiry.',
      'Advice specific to your organisation is given under a signed engagement, where we understand your context and both parties agree what we are responsible for.',
    ],
  },
  {
    id: 'ip',
    title: 'Intellectual property',
    body: [
      'Unless stated otherwise, the content, structure, branding, logos, and design of this site are owned by applixation or licensed to us. Third-party marks, including AWS marks, remain the property of their owners and are used to describe our partnership and certifications.',
      'You may quote short extracts with attribution and a link. Reproducing substantial parts of the site, or using our branding in your own materials, needs our written permission.',
    ],
  },
  {
    id: 'links',
    title: 'Links to other sites',
    body: ['We sometimes link to third-party websites and documentation because they are useful. We do not control them, and we are not responsible for their content, availability, or privacy practices. Following an external link is at your own discretion.'],
  },
  {
    id: 'submissions',
    title: 'Anything you send us',
    body: [
      'Please do not send confidential or sensitive information through the enquiry form or by unsecured email. If we need to exchange confidential material, we will agree a secure channel and, where appropriate, a non-disclosure agreement first.',
      'Unsolicited ideas, proposals, or feedback you send us are treated as non-confidential, and we may use them without obligation or compensation.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: [
      'To the fullest extent permitted by law, applixation is not liable for any indirect, incidental, special, or consequential loss arising from your use of this website, including loss of profits, data, or business opportunity.',
      'Nothing in these terms excludes or limits liability that cannot lawfully be excluded, including liability for fraud, or any right you have under the Consumer Protection Act, 2008 where it applies to you.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: ['Our privacy policy explains how we handle personal information collected through this website, and forms part of these terms. Please read the two together.'],
  },
  {
    id: 'law',
    title: 'Governing law',
    body: ['These terms are governed by the laws of the Republic of South Africa. The courts of South Africa have exclusive jurisdiction over any dispute arising from them or from your use of this website.'],
  },
  {
    id: 'company',
    title: 'Who we are',
    body: ['applixation is a cloud consultancy registered in South Africa, with offices at 205 Rivonia Rd, Sandton, 2196. You can reach us on the details below for anything relating to these terms, including permission requests and legal notices.'],
  },
]

export default function TermsPage() {
  return <LegalPage
      title="Terms of use"
      updated="September 2026"
      summary="The rules of the road for this website: what you can do with what is here, what we stand behind, and where our responsibility ends."
      highlights={highlights}
      sections={sections}
      closing="These terms cover the website. The work itself is governed by whatever we sign together, and that agreement takes precedence wherever the two differ."
    />
}
