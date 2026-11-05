import type { Metadata } from 'next'

import { ContactChat } from '@/components/contact-chat'
import { SocialLinks } from '@/components/social-links'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have a role, a project or a question? Start a quick chat.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="overflow-x-clip px-5 pt-28 pb-12">
      <h1 className="sr-only">Contact</h1>
      <ContactChat />
      <p className="mt-6 text-center font-mono text-xs text-muted">Or reach me directly</p>
      <SocialLinks withEmail className="mt-2" />
    </div>
  )
}
