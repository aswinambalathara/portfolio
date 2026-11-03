import type { Metadata } from 'next'

import { ContactChat } from '@/components/contact-chat'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have a role, a project or a question? Start a quick chat.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="px-5 pt-28 pb-12">
      <h1 className="sr-only">Contact</h1>
      <ContactChat />
    </div>
  )
}
