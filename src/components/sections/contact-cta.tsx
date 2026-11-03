import Link from 'next/link'

import { CopyEmailButton } from '@/components/copy-email-button'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import type { SiteSetting } from '@/payload-types'

export function ContactCta({ settings }: { settings: SiteSetting }) {
  return (
    <Section id="contact" title="Contact">
      {settings.availability?.isOpen && settings.availability.text && (
        <p className="max-w-[60ch] text-lg">{settings.availability.text}</p>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button asChild>
          <Link href="/contact">Send a message</Link>
        </Button>
        {settings.email && <CopyEmailButton email={settings.email} />}
      </div>
    </Section>
  )
}
